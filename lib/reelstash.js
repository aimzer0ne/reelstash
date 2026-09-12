import { createReadStream, existsSync, mkdtempSync, readdirSync, rmSync, writeFileSync, createWriteStream } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { createRequire } from 'node:module';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { spawn } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TOKEN_SECRET = process.env.DOWNLOAD_TOKEN_SECRET || 'replace-this-local-development-secret';
const MAX_BODY_BYTES = 16_000;
const MAX_MEDIA_BYTES = 500 * 1024 * 1024;
const REQUEST_WINDOW_MS = 10 * 60 * 1000;
const REQUEST_LIMIT = 12;
const rateLimits = new Map();
const pageCache = new Map();
const CACHE_MS = 2 * 60 * 1000;
const YTDLP_OUTPUT_LIMIT = 8 * 1024 * 1024;
const SKIP_WALK_KEYS = new Set(['owner', 'user', 'caption', 'user_tags', 'sponsor_tags', 'coauthor_producers', 'biography', 'edge_followed_by', 'edge_follow']);
const YTDLP_RESOLVE_TIMEOUT_MS = 25_000;
const YTDLP_DOWNLOAD_TIMEOUT_MS = 50_000;
const require = createRequire(import.meta.url);

export async function handleApiRequest(request) {
  const requestUrl = new URL(request.url);
  if (request.method === 'GET' && requestUrl.pathname === '/api/health') return healthResponse();
  if (request.method === 'POST' && requestUrl.pathname === '/api/resolve') return resolveHandler(request);
  if (request.method === 'GET' && requestUrl.pathname === '/api/download') return downloadHandler(requestUrl);
  return jsonResponse(405, { error: 'Method not allowed.' });
}

export function healthResponse() {
  return jsonResponse(200, {
    ok: true,
    extractor: 'yt-dlp',
    ytdlp: resolveYtDlpBin(),
    ffmpeg: Boolean(resolveFfmpegPath()),
    sessionFallbackConfigured: hasSessionFallback()
  });
}

async function resolveHandler(request) {
  const ip = getClientIp(request);
  if (!allowRequest(ip)) return jsonResponse(429, { error: 'Please wait a moment before trying more links.' });

  let body;
  try {
    body = await readJson(request);
  } catch (error) {
    return jsonResponse(400, { error: error.message });
  }

  const suppliedUrl = typeof body.url === 'string' ? body.url.trim() : '';
  if (!suppliedUrl) return jsonResponse(400, { error: 'Paste an Instagram URL first.' });
  const mode = body.mode === 'audio' ? 'audio' : 'media';

  let postUrl;
  try {
    postUrl = validateInstagramUrl(suppliedUrl);
  } catch (error) {
    return jsonResponse(400, { error: error.message });
  }

  try {
    const canonical = await followInstagramRedirect(postUrl);
    if (!isSupportedPostPath(canonical.pathname)) {
      return jsonResponse(400, { error: 'That link did not resolve to a public Instagram reel or post.' });
    }
    const cacheKey = canonical.toString();
    const cached = pageCache.get(cacheKey);
    const parsed = cached && cached.expiresAt > Date.now() ? cached.value : await fetchPublicPost(canonical);
    if (!cached || cached.expiresAt <= Date.now()) pageCache.set(cacheKey, { value: parsed, expiresAt: Date.now() + CACHE_MS });
    let items = mode === 'audio'
      ? parsed.media.filter((item) => item.type === 'video' && item.hasAudio !== false)
      : parsed.media;
    if (mode === 'audio' && items.length) {
      // Drop muted carousel clips whose progressive MP4 has no audio stream.
      items = await filterVideosWithAudioStream(items);
    }
    if (mode === 'audio' && !items.length) {
      return jsonResponse(404, { error: 'No video with downloadable audio was found in that public post.' });
    }
    const media = items.map((item, index) => {
      const kind = mode === 'audio' ? 'audio' : item.type;
      const originalIndex = mode === 'audio'
        ? parsed.media.findIndex((candidate) => candidate.sourceUrl === item.sourceUrl)
        : index;
      const downloadUrl = `/api/download?ticket=${encodeTicket({
        pageUrl: canonical.toString(),
        url: item.sourceUrl,
        audioUrl: item.audioUrl || null,
        kind,
        index: originalIndex >= 0 ? originalIndex : index,
        hasAudio: item.hasAudio,
        exp: Date.now() + 5 * 60 * 1000
      })}`;
      const proxied = `${downloadUrl}&inline=1`;
      if (mode === 'audio') {
        return {
          type: 'audio',
          previewUrl: item.previewUrl || proxied,
          sourceUrl: item.sourceUrl,
          downloadUrl
        };
      }
      return {
        type: item.type,
        previewUrl: item.type === 'photo' ? proxied : (item.previewUrl || proxied),
        sourceUrl: item.type === 'photo' ? proxied : item.sourceUrl,
        downloadUrl
      };
    });
    const identity = postIdentity(parsed);
    return jsonResponse(200, {
      title: identity.title,
      username: identity.username,
      caption: identity.caption,
      profileUrl: identity.profileUrl,
      source: parsed.source || 'html',
      mode,
      media
    });
  } catch (error) {
    console.warn('Instagram resolver:', error.message);
    return jsonResponse(502, { error: publicFetchMessage(error) });
  }
}

async function downloadHandler(requestUrl) {
  const ticket = requestUrl.searchParams.get('ticket');
  const payload = ticket && decodeTicket(ticket);
  if (!payload || !payload.exp || payload.exp < Date.now()) {
    return jsonResponse(403, { error: 'This download link has expired. Fetch the post again.' });
  }

  const inline = requestUrl.searchParams.get('inline') === '1';
  try {
    if (payload.kind === 'audio') return await downloadAudio(payload, inline);
    if (payload.kind === 'video') return await downloadVideo(payload, inline);
    return await downloadPhoto(payload, inline);
  } catch (error) {
    console.warn('Download error:', error.message);
    if (/no soundtrack|does not contain any stream/i.test(error.message)) {
      return jsonResponse(422, { error: 'This video has no soundtrack to download.' });
    }
    return jsonResponse(502, { error: 'The original media file is no longer available.' });
  }
}

async function downloadAudio(payload, inline = false) {
  const pageUrl = payload.pageUrl && validateInstagramUrl(payload.pageUrl).toString();
  const directAudio = payload.audioUrl && isMediaUrl(payload.audioUrl) ? payload.audioUrl : null;
  const directVideo = payload.url && isMediaUrl(payload.url) ? payload.url : null;

  // Prefer a standalone audio stream when Instagram/yt-dlp exposed one.
  if (directAudio) {
    try {
      const converted = await extractAudioToMp3(directAudio);
      return fileResponse(converted, payload, 'audio/mpeg', inline);
    } catch (error) {
      console.warn('Direct audio conversion failed:', error.message);
      try {
        return await proxyMedia({ ...payload, url: directAudio, kind: 'audio' }, inline);
      } catch (proxyError) {
        console.warn('Direct audio proxy failed:', proxyError.message);
      }
    }
  }

  // Extract MP3 from a progressive video URL with ffmpeg.
  if (directVideo) {
    try {
      const converted = await extractAudioToMp3(directVideo);
      return fileResponse(converted, payload, 'audio/mpeg', inline);
    } catch (error) {
      console.warn('Video-to-MP3 extraction failed, falling back to yt-dlp:', error.message);
      // Video-only progressive files (muted carousel clips) have no soundtrack — do not waste a yt-dlp pass.
      if (/no soundtrack|does not contain any stream/i.test(error.message)) {
        throw new Error('This video has no soundtrack to download.');
      }
    }
  }

  if (!pageUrl) throw new Error('Missing media URL.');
  try {
    const downloaded = await downloadWithYtDlp(pageUrl, Number(payload.index || 0), 'audio');
    return fileResponse(downloaded, payload, 'audio/mpeg', inline);
  } catch (error) {
    if (/no soundtrack|does not contain any stream|Postprocessing|Requested format is not available|audio codec/i.test(error.message)) {
      throw new Error('This video has no soundtrack to download.');
    }
    throw error;
  }
}

async function extractAudioToMp3(sourceUrl) {
  const ffmpeg = resolveFfmpegPath();
  if (!ffmpeg) throw new Error('ffmpeg is not available for audio extraction.');
  if (!isAllowedMediaHost(new URL(sourceUrl).hostname)) throw new Error('Untrusted media host.');

  const dir = mkdtempSync(join(tmpdir(), 'reelstash-audio-'));
  const inputPath = join(dir, 'source.bin');
  const outputPath = join(dir, 'audio.mp3');
  try {
    const response = await safeFetch(new URL(sourceUrl), isAllowedMediaHost, {
      headers: mediaHeaders(),
      maxRedirects: 3
    });
    if (!response.ok || !response.body) throw new Error(`Media server responded with ${response.status}.`);
    const length = Number(response.headers.get('content-length') || 0);
    if (length && length > MAX_MEDIA_BYTES) throw new Error('Media file is too large.');
    await writeResponseToFile(response, inputPath);
    await runFfmpeg([
      '-y',
      '-i', inputPath,
      '-vn',
      '-map', '0:a:0',
      '-acodec', 'libmp3lame',
      '-q:a', '2',
      outputPath
    ], ffmpeg);
    if (!existsSync(outputPath)) throw new Error('ffmpeg did not write an MP3 file.');
    return { dir, filePath: outputPath };
  } catch (error) {
    rmSync(dir, { recursive: true, force: true });
    throw error;
  }
}

async function filterVideosWithAudioStream(items) {
  const results = await Promise.all(items.map(async (item) => {
    if (item.audioUrl && isMediaUrl(item.audioUrl)) return item;
    if (item.hasAudio === false) return null;
    if (!item.sourceUrl || !isMediaUrl(item.sourceUrl)) return null;
    try {
      const hasStream = await mediaFileHasAudioStream(item.sourceUrl);
      return hasStream ? item : null;
    } catch (error) {
      console.warn('Audio stream probe failed, keeping candidate:', error.message);
      return item;
    }
  }));
  return results.filter(Boolean);
}

async function mediaFileHasAudioStream(sourceUrl) {
  const ffmpeg = resolveFfmpegPath();
  if (!ffmpeg) return true;
  if (!isAllowedMediaHost(new URL(sourceUrl).hostname)) return true;

  const dir = mkdtempSync(join(tmpdir(), 'reelstash-probe-'));
  const inputPath = join(dir, 'source.bin');
  try {
    const response = await safeFetch(new URL(sourceUrl), isAllowedMediaHost, {
      headers: mediaHeaders(),
      maxRedirects: 3
    });
    if (!response.ok || !response.body) return true;
    const length = Number(response.headers.get('content-length') || 0);
    // Skip expensive probes for large reels; download path still validates the soundtrack.
    if (length > 25 * 1024 * 1024) return true;
    await writeResponseToFile(response, inputPath);
    return probeLocalFileHasAudio(inputPath, ffmpeg);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function probeLocalFileHasAudio(filePath, ffmpegPath) {
  return new Promise((resolve) => {
    const child = spawn(/* turbopackIgnore: true */ ffmpegPath, ['-hide_banner', '-i', filePath], {
      stdio: ['ignore', 'ignore', 'pipe'],
      windowsHide: true
    });
    let stderr = '';
    const timeout = setTimeout(() => {
      child.kill('SIGTERM');
      resolve(true);
    }, 12_000);
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
      if (stderr.length > 32_000) child.kill('SIGTERM');
    });
    child.on('error', () => {
      clearTimeout(timeout);
      resolve(true);
    });
    child.on('close', () => {
      clearTimeout(timeout);
      resolve(/Stream #\d+:\d+.*Audio:/i.test(stderr));
    });
  });
}

async function writeResponseToFile(response, filePath) {
  await pipeline(Readable.fromWeb(response.body), createWriteStream(filePath));
}

function runFfmpeg(args, ffmpegPath) {
  return new Promise((resolve, reject) => {
    const child = spawn(/* turbopackIgnore: true */ ffmpegPath, args, { stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
    let stderr = '';
    let finished = false;
    const finish = (callback, value) => {
      if (finished) return;
      finished = true;
      clearTimeout(timeout);
      callback(value);
    };
    const timeout = setTimeout(() => {
      child.kill('SIGTERM');
      finish(reject, new Error('ffmpeg timed out while extracting audio.'));
    }, YTDLP_DOWNLOAD_TIMEOUT_MS);
    child.on('error', (error) => finish(reject, new Error(`ffmpeg could not start: ${error.message}`)));
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    child.on('close', (code) => {
      if (code === 0) return finish(resolve);
      const detail = stderr.replace(/\s+/g, ' ').slice(-400);
      if (/does not contain any stream|Stream map.*matches no streams|matches no streams/i.test(stderr)) {
        return finish(reject, new Error('This video has no soundtrack to download.'));
      }
      finish(reject, new Error(`ffmpeg audio extraction failed${detail ? `: ${detail}` : '.'}`));
    });
  });
}

async function downloadVideo(payload, inline = false) {
  const hasDirectUrl = Boolean(payload.url && isMediaUrl(payload.url));

  // Fast path: progressive MP4 that already carries audio (GraphQL / page metadata). Just stream it through.
  if (hasDirectUrl && payload.hasAudio !== false) {
    try {
      return await proxyMedia(payload, inline);
    } catch (error) {
      console.warn('Direct video proxy failed, falling back to yt-dlp:', error.message);
    }
  }

  // Backup: let yt-dlp fetch + mux best video and audio.
  const pageUrl = payload.pageUrl && validateInstagramUrl(payload.pageUrl).toString();
  if (pageUrl) {
    try {
      const downloaded = await downloadWithYtDlp(pageUrl, Number(payload.index || 0), 'video');
      return fileResponse(downloaded, payload, 'video/mp4', inline);
    } catch (error) {
      console.warn('yt-dlp muxed download failed:', error.message);
      if (!hasDirectUrl) throw error;
    }
  }
  if (!hasDirectUrl) throw new Error('Missing media URL.');
  // Last resort: whatever direct URL we have, even if it may be video-only.
  return proxyMedia(payload, inline);
}

async function downloadPhoto(payload, inline = false) {
  if (payload.url && isMediaUrl(payload.url)) {
    try {
      return await proxyMedia(payload, inline);
    } catch (error) {
      console.warn('Photo proxy failed:', error.message);
    }
  }
  const pageUrl = payload.pageUrl && validateInstagramUrl(payload.pageUrl).toString();
  if (!pageUrl) throw new Error('Missing media URL.');
  const downloaded = await downloadWithYtDlp(pageUrl, Number(payload.index || 0), 'photo');
  return fileResponse(downloaded, payload, 'image/jpeg', inline);
}

function brandedFilename(payload, contentType) {
  const kind = payload.kind === 'audio' ? 'audio' : payload.kind === 'video' ? 'video' : 'photo';
  return `Reelstash-${kind}-${Number(payload.index || 0) + 1}.${extensionFor(contentType, kind)}`;
}

function fileResponse(downloaded, payload, fallbackType, inline) {
  const stream = createReadStream(downloaded.filePath);
  const cleanup = () => rmSync(downloaded.dir, { recursive: true, force: true });
  stream.on('close', cleanup);
  stream.on('error', cleanup);
  const contentType = fallbackType;
  const filename = brandedFilename(payload, contentType);
  return new Response(Readable.toWeb(stream), {
    headers: {
      'content-type': contentType,
      'content-disposition': `${inline ? 'inline' : 'attachment'}; filename="${filename}"`,
      'cache-control': 'private, max-age=300',
      'x-content-type-options': 'nosniff'
    }
  });
}

async function proxyMedia(payload, inline = false) {
  if (!payload.url || payload.url.startsWith('/')) throw new Error('Missing media URL.');
  const mediaUrl = new URL(payload.url);
  if (!isAllowedMediaHost(mediaUrl.hostname)) throw new Error('Untrusted media host.');
  const response = await safeFetch(mediaUrl, isAllowedMediaHost, { headers: mediaHeaders(), maxRedirects: 3 });
  if (!response.ok || !response.body) throw new Error(`Media server responded with ${response.status}.`);
  const length = Number(response.headers.get('content-length') || 0);
  if (length && length > MAX_MEDIA_BYTES) throw new Error('Media file is too large.');
  const contentType = cleanContentType(response.headers.get('content-type'))
    || (payload.kind === 'audio' ? 'audio/mpeg' : payload.kind === 'video' ? 'video/mp4' : 'image/jpeg');
  const filename = brandedFilename(payload, contentType);
  return new Response(response.body, {
    headers: {
      'content-type': contentType,
      'content-disposition': `${inline ? 'inline' : 'attachment'}; filename="${filename}"`,
      'cache-control': 'private, max-age=300',
      'x-content-type-options': 'nosniff'
    }
  });
}

async function fetchPublicPost(url) {
  const failures = [];
  const started = Date.now();

  // 1. Fast path: one anonymous GraphQL request (what the Instagram web client itself sends).
  try {
    const direct = await fetchWithGraphQL(url);
    if (direct.media.length) {
      console.info(`Instagram resolver: graphql ok in ${Date.now() - started}ms (${direct.media.length} item(s))`);
      return direct;
    }
  } catch (error) {
    console.warn('Instagram resolver: graphql fast path unavailable, falling back:', error.message);
    failures.push(`graphql: ${error.message}`);
  }

  // 2. Public HTML / embed metadata (cheap, works when Instagram still inlines post JSON).
  const htmlResults = await Promise.allSettled([fetchPageMetadata(url), fetchEmbedMetadata(url)]);
  const htmlParsed = htmlResults
    .filter((result) => result.status === 'fulfilled')
    .map((result) => result.value)
    .filter((value) => value.media?.length);
  if (htmlParsed.length) {
    console.info(`Instagram resolver: html ok in ${Date.now() - started}ms`);
    return pickBestParsed(htmlParsed);
  }
  for (const result of htmlResults) {
    if (result.status === 'rejected') failures.push(result.reason?.message || 'Unknown extractor failure');
  }

  // 3. Backup: yt-dlp (slowest, spawns a process).
  try {
    const viaYtDlp = await fetchWithYtDlp(url);
    console.info(`Instagram resolver: yt-dlp ok in ${Date.now() - started}ms`);
    return viaYtDlp;
  } catch (error) {
    failures.push(error.message);
  }

  throw new Error(failures.join(' | ') || 'No publicly available media was found.');
}

// --- Direct (no yt-dlp) extractor -------------------------------------------------------------
// Mirrors what instagram.com does for a logged-out visitor: bootstrap a session (LSD token +
// csrftoken cookie), convert the shortcode to a numeric media id, then ask the web GraphQL API
// for the post. One page GET (cached) + one POST, no cookies from any real account.

const IG_BASE = 'https://www.instagram.com';
const GRAPHQL_ENDPOINT = `${IG_BASE}/api/graphql`;
const GRAPHQL_APP_ID = '936619743392459';
const GRAPHQL_TIMEOUT_MS = 8_000;
const GRAPHQL_QUERY_NAME = 'PolarisLoggedOutDesktopWWWPostRootContentQuery';
const DEFAULT_GRAPHQL_DOC_IDS = ['27130156389949648'];
const SESSION_TTL_MS = 10 * 60 * 1000;
const SHORTCODE_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
let igSession = null; // { lsd, csrf, expiresAt }

function graphqlDocIds() {
  const configured = String(process.env.INSTAGRAM_GRAPHQL_DOC_IDS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  return [...new Set([...configured, ...DEFAULT_GRAPHQL_DOC_IDS])];
}

const POST_KINDS = new Set(['p', 'reel', 'reels', 'tv']);

function parsePostPath(pathname) {
  const parts = String(pathname || '').split('/').filter(Boolean);
  if (!parts.length) return null;
  const first = parts[0].toLowerCase();
  const second = (parts[1] || '').toLowerCase();
  if (POST_KINDS.has(first) && parts[1]) {
    return { kind: first === 'reels' ? 'reel' : first, shortcode: parts[1] };
  }
  if (first === 'share' && POST_KINDS.has(second) && parts[2]) {
    return { kind: second === 'reels' ? 'reel' : second, shortcode: parts[2] };
  }
  // Profile-prefixed links: /ciara/p/DcvjhliEcc4/
  if (POST_KINDS.has(second) && parts[2] && !POST_KINDS.has(first) && first !== 'share') {
    return { kind: second === 'reels' ? 'reel' : second, shortcode: parts[2] };
  }
  return null;
}

function canonicalizePostUrl(url) {
  const parsed = parsePostPath(url.pathname);
  if (!parsed || !/^[A-Za-z0-9_-]{5,60}$/.test(parsed.shortcode)) return null;
  const canonical = new URL(url.toString());
  canonical.hostname = 'www.instagram.com';
  canonical.pathname = `/${parsed.kind}/${parsed.shortcode}/`;
  canonical.search = '';
  canonical.hash = '';
  return canonical;
}

function shortcodeFromUrl(url) {
  return parsePostPath(url.pathname)?.shortcode || null;
}

function shortcodeToMediaId(shortcode) {
  // Private posts append 28 extra characters to the public shortcode.
  const code = shortcode.length > 28 ? shortcode.slice(0, -28) : shortcode;
  let value = 0n;
  for (const character of code) {
    const digit = SHORTCODE_ALPHABET.indexOf(character);
    if (digit < 0) throw new Error('Invalid Instagram shortcode.');
    value = value * 64n + BigInt(digit);
  }
  return value.toString();
}

function apiHeaders(extra = {}) {
  return {
    'user-agent': pageHeaders()['user-agent'],
    'accept-language': pageHeaders()['accept-language'],
    accept: '*/*',
    origin: IG_BASE,
    'sec-ch-ua': '"Chromium";v="126", "Google Chrome";v="126", "Not-A.Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'x-ig-app-id': GRAPHQL_APP_ID,
    'x-asbd-id': '359341',
    'x-ig-www-claim': '0',
    'x-requested-with': 'XMLHttpRequest',
    ...extra
  };
}

function setCookiesOf(response) {
  return typeof response.headers.getSetCookie === 'function' ? response.headers.getSetCookie() : [];
}

function mergeCookies(jar, setCookieHeaders) {
  for (const header of setCookieHeaders) {
    const [pair] = header.split(';');
    const eq = pair.indexOf('=');
    if (eq <= 0) continue;
    const name = pair.slice(0, eq).trim();
    const value = pair.slice(eq + 1).trim();
    if (!name) continue;
    if (value === '' || value === '""') jar.delete(name);
    else jar.set(name, value);
  }
  return jar;
}

function cookieHeader(jar) {
  return [...jar.entries()].map(([name, value]) => `${name}=${value}`).join('; ');
}

async function getInstagramSession(shortcode) {
  if (igSession && igSession.expiresAt > Date.now()) return igSession;

  const response = await fetch(`${IG_BASE}/p/${shortcode}/`, {
    headers: pageHeaders(),
    redirect: 'follow',
    signal: AbortSignal.timeout(GRAPHQL_TIMEOUT_MS)
  });
  const finalUrl = new URL(response.url);
  if (!isInstagramHost(finalUrl.hostname)) throw new Error('Unexpected redirect while starting an Instagram session.');
  if (/^\/accounts\/login/.test(finalUrl.pathname)) {
    throw new Error('accounts/login redirect: Instagram is rate-limiting anonymous access from this server.');
  }
  const html = await response.text();
  const eqmc = html.match(/<script\b[^>]*\bid="__eqmc"[^>]*>(\{.*?\})<\/script>/s);
  let lsd = null;
  if (eqmc) {
    try { lsd = JSON.parse(eqmc[1]).l || null; } catch { /* fall through to regex */ }
  }
  if (!lsd) lsd = html.match(/\["LSD",\[\],\{"token":"([^"]+)"/)?.[1] || null;
  if (!lsd) throw new Error('Could not find an Instagram LSD token.');

  // Keep every anonymous cookie Instagram hands a first-time visitor (csrftoken, mid, datr, ig_did, ...).
  const jar = mergeCookies(new Map(), setCookiesOf(response));
  igSession = { lsd, jar, expiresAt: Date.now() + SESSION_TTL_MS };
  return igSession;
}

async function checkRuling(mediaId, session) {
  // Same call the web client makes before loading a post; also tops up the anonymous cookie jar.
  try {
    const response = await fetch(`${IG_BASE}/api/v1/web/get_ruling_for_content/?content_type=MEDIA&target_id=${mediaId}`, {
      headers: apiHeaders({ cookie: cookieHeader(session.jar), referer: `${IG_BASE}/` }),
      redirect: 'manual',
      signal: AbortSignal.timeout(GRAPHQL_TIMEOUT_MS)
    });
    mergeCookies(session.jar, setCookiesOf(response));
    if (!response.ok) return null;
    return parseMetaJson(await response.text());
  } catch {
    return null;
  }
}

async function fetchWithGraphQL(url) {
  const shortcode = shortcodeFromUrl(url);
  if (!shortcode || !/^[A-Za-z0-9_-]{5,60}$/.test(shortcode)) throw new Error('Could not read a post shortcode from that link.');
  const mediaId = shortcodeToMediaId(shortcode);
  const pageUrl = `${IG_BASE}/p/${shortcode}/`;

  const session = await getInstagramSession(shortcode);
  const ruling = await checkRuling(mediaId, session);
  if (ruling && ruling.status && ruling.status !== 'ok') {
    const detail = [ruling.title, ruling.description].filter(Boolean).join(': ');
    if (/restricted/i.test(detail)) throw new Error(`Instagram API is not granting access: ${detail}`);
  }

  const errors = [];
  for (const docId of graphqlDocIds()) {
    const body = new URLSearchParams({
      lsd: session.lsd,
      fb_api_caller_class: 'RelayModern',
      fb_api_req_friendly_name: GRAPHQL_QUERY_NAME,
      server_timestamps: 'true',
      variables: JSON.stringify({ media_id: mediaId }),
      doc_id: docId
    });

    let response;
    try {
      response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: apiHeaders({
          'content-type': 'application/x-www-form-urlencoded',
          'x-fb-friendly-name': GRAPHQL_QUERY_NAME,
          'x-fb-lsd': session.lsd,
          ...(session.jar.get('csrftoken') ? { 'x-csrftoken': session.jar.get('csrftoken') } : {}),
          cookie: cookieHeader(session.jar),
          referer: pageUrl
        }),
        body: body.toString(),
        redirect: 'manual',
        signal: AbortSignal.timeout(GRAPHQL_TIMEOUT_MS)
      });
    } catch (error) {
      errors.push(`doc ${docId}: ${error.message}`);
      continue;
    }

    if (response.status === 401 || response.status === 403) {
      igSession = null;
      throw new Error('Instagram API is not granting access to this post anonymously.');
    }
    if (!response.ok) {
      errors.push(`doc ${docId}: HTTP ${response.status}`);
      continue;
    }

    const raw = await response.text();
    let json;
    try {
      json = parseMetaJson(raw);
    } catch {
      const contentType = response.headers.get('content-type') || 'unknown type';
      errors.push(`doc ${docId}: non-JSON response (${contentType}; starts "${raw.slice(0, 80).replace(/\s+/g, ' ')}")`);
      continue;
    }

    const product = json?.data?.xig_polaris_media?.if_not_gated_logged_out
      || json?.data?.xdt_shortcode_media
      || json?.data?.shortcode_media;
    if (!product) {
      const message = json?.errors?.[0]?.message
        || (json?.data?.xig_polaris_media ? 'empty media response (post is gated for logged-out viewers)' : 'empty media response');
      errors.push(`doc ${docId}: ${message}`);
      if (/soft-deleted|execution error|missing_required/i.test(message)) continue; // rotated doc_id → try next
      break;
    }
    return parseDirectMedia(product);
  }
  throw new Error(errors.join(' / ') || 'Instagram graphql returned nothing.');
}

function parseMetaJson(raw) {
  // Meta APIs prefix JSON with an anti-hijacking guard such as `for (;;);`.
  const trimmed = raw.replace(/^\s*for\s*\(;;\);?/, '').trim();
  return JSON.parse(trimmed);
}

function parseDirectMedia(product) {
  const media = [];
  collectInstagramMedia(product, media);
  const username = product.user?.username || product.owner?.username;
  const caption = String(product.caption?.text || product.edge_media_to_caption?.edges?.[0]?.node?.text || '')
    .replace(/\s+/g, ' ')
    .trim();
  const isCarousel = Array.isArray(product.carousel_media) || Boolean(product.edge_sidecar_to_children);
  const isVideo = product.media_type === 2 || product.is_video || /video/i.test(product.__typename || '');
  const kindLabel = isCarousel ? 'Post' : isVideo ? 'Video' : 'Photo';
  let title = username ? `${kindLabel} by ${username}` : 'Public Instagram post';
  if (caption) title = `${title} — ${caption.length > 90 ? `${caption.slice(0, 87)}…` : caption}`;
  return {
    title,
    username: sanitizeUsername(username),
    caption,
    media: dedupeMedia(media).slice(0, 10),
    source: 'graphql'
  };
}

function sanitizeUsername(value) {
  const raw = String(value || '').trim().replace(/^@/, '');
  return /^[A-Za-z0-9._]{1,30}$/.test(raw) ? raw : null;
}

function identityFromTitle(title, description = '') {
  const text = String(title || '');
  const byMatch = text.match(/^(?:Video|Photo|Post|Reel)s? by ([A-Za-z0-9._]+)/i);
  const onMatch = text.match(/^([A-Za-z0-9._]+) on Instagram:\s*[“"']?([\s\S]+)/i);
  const dashMatch = text.match(/^(?:Video|Photo|Post|Reel)s? by ([A-Za-z0-9._]+)\s+[—–-]\s+([\s\S]+)/i);
  const username = sanitizeUsername(dashMatch?.[1] || byMatch?.[1] || onMatch?.[1]);
  const caption = String(dashMatch?.[2] || onMatch?.[2] || description || '')
    .replace(/\s+/g, ' ')
    .replace(/[…]+$/, '')
    .trim();
  return { username, caption };
}

function postIdentity(parsed) {
  const fromFields = {
    username: sanitizeUsername(parsed.username),
    caption: String(parsed.caption || '').replace(/\s+/g, ' ').trim()
  };
  const fromTitle = identityFromTitle(parsed.title, fromFields.caption);
  const username = fromFields.username || fromTitle.username;
  const caption = fromFields.caption || fromTitle.caption || '';
  return {
    title: parsed.title || (username ? `@${username}` : 'Public Instagram post'),
    username,
    caption,
    profileUrl: username ? `https://www.instagram.com/${username}/` : null
  };
}

function pickBestParsed(parsed) {
  const titled = parsed.find((item) => item.title && item.title !== 'Public Instagram post');
  const best = [...parsed].sort((a, b) => scoreParsed(b) - scoreParsed(a))[0];
  return {
    title: titled?.title || best.title,
    username: titled?.username || best.username || null,
    caption: titled?.caption || best.caption || '',
    media: best.media
  };
}

function scoreParsed(parsed) {
  const photos = parsed.media.filter((item) => item.type === 'photo').length;
  const videos = parsed.media.filter((item) => item.type === 'video').length;
  return parsed.media.length * 100 + videos * 15 + photos * 10;
}

async function fetchPageMetadata(url) {
  const response = await safeFetch(url, isInstagramHost, { headers: pageHeaders(), maxRedirects: 4 });
  if (!response.ok) throw new Error(`Instagram returned ${response.status}.`);
  const html = await response.text();
  if (html.length < 250) throw new Error('Instagram returned an incomplete page.');
  const parsed = parsePublicMedia(html);
  if (!parsed.media.length) throw new Error('No publicly available media was found.');
  return parsed;
}

async function fetchEmbedMetadata(url) {
  const embedUrl = toEmbedUrl(url);
  const response = await safeFetch(embedUrl, isInstagramHost, { headers: pageHeaders(), maxRedirects: 4 });
  if (!response.ok) throw new Error(`Instagram embed returned ${response.status}.`);
  const html = await response.text();
  if (html.length < 250) throw new Error('Instagram returned an incomplete embed.');
  const parsed = parsePublicMedia(html);
  if (!parsed.media.length) throw new Error('No publicly available media was found in the embed.');
  return parsed;
}

async function fetchWithYtDlp(url) {
  const args = [
    '--dump-json',
    '--skip-download',
    '--no-warnings',
    '--ignore-no-formats-error',
    '--no-abort-on-error',
    '--yes-playlist',
    '--socket-timeout', '15',
    '--retries', '1',
    '--user-agent', pageHeaders()['user-agent'],
    ...cookieArgs(),
    '--',
    url.toString()
  ];
  const output = await runYtDlp(args, YTDLP_RESOLVE_TIMEOUT_MS);
  let info;
  try {
    info = parseYtDlpStdout(output);
  } catch {
    throw new Error('yt-dlp returned an invalid media response.');
  }
  const parsed = parseYtDlpInfo(info);
  if (!parsed.media.length) throw new Error('yt-dlp did not find downloadable media.');
  return parsed;
}

async function downloadWithYtDlp(pageUrl, index, kind = 'video') {
  const dir = mkdtempSync(join(tmpdir(), 'reelstash-'));
  const ffmpeg = resolveFfmpegPath();
  const args = [
    '--no-warnings',
    '--ignore-no-formats-error',
    '--no-abort-on-error',
    '--socket-timeout', '20',
    '--retries', '2',
    '--user-agent', pageHeaders()['user-agent'],
    '-o', join(dir, 'media.%(ext)s'),
    '--restrict-filenames',
    '--no-mtime',
    ...cookieArgs()
  ];
  if (kind === 'photo') {
    args.push('--write-thumbnail', '--convert-thumbnails', 'jpg', '--skip-download');
  } else if (kind === 'audio') {
    args.push('-f', 'ba/b', '-x', '--audio-format', 'mp3', '--audio-quality', '0');
    if (ffmpeg) args.push('--ffmpeg-location', ffmpeg);
  } else {
    args.push('-f', ffmpeg ? 'bv*+ba/b' : 'b/best[acodec!=none][vcodec!=none]/best', '--merge-output-format', 'mp4');
    if (ffmpeg) args.push('--ffmpeg-location', ffmpeg);
  }
  if (ffmpeg && kind === 'photo') args.push('--ffmpeg-location', ffmpeg);
  if (Number.isInteger(index) && index >= 0) args.push('--playlist-items', String(index + 1));
  args.push('--', pageUrl);
  try {
    await runYtDlp(args, YTDLP_DOWNLOAD_TIMEOUT_MS);
    const files = readdirSync(dir).sort((a, b) => b.length - a.length);
    const name = files.find((file) => {
      if (kind === 'photo') return /\.(jpg|jpeg|png|webp)$/i.test(file);
      if (kind === 'audio') return /\.mp3$/i.test(file) || file.startsWith('media.');
      return file.startsWith('media.');
    });
    if (!name) throw new Error('yt-dlp did not write a media file.');
    return { dir, filePath: join(dir, name) };
  } catch (error) {
    rmSync(dir, { recursive: true, force: true });
    throw error;
  }
}

function runYtDlp(args, timeoutMs) {
  return new Promise((resolve, reject) => {
    const child = spawn(/* turbopackIgnore: true */ resolveYtDlpBin(), args, { stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
    let stdout = '';
    let stderr = '';
    let finished = false;
    const finish = (callback, value) => {
      if (finished) return;
      finished = true;
      clearTimeout(timeout);
      callback(value);
    };
    const timeout = setTimeout(() => {
      child.kill('SIGTERM');
      finish(reject, new Error('yt-dlp timed out while contacting Instagram.'));
    }, timeoutMs);
    child.on('error', (error) => finish(reject, new Error(`yt-dlp could not start: ${error.message}`)));
    child.stdout.on('data', (chunk) => {
      stdout += chunk;
      if (stdout.length > YTDLP_OUTPUT_LIMIT) {
        child.kill('SIGTERM');
        finish(reject, new Error('yt-dlp returned too much data.'));
      }
    });
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    child.on('close', (code) => {
      if (code === 0) return finish(resolve, stdout.trim());
      const detail = stderr.replace(/\s+/g, ' ').slice(-500);
      finish(reject, new Error(`yt-dlp extraction failed${detail ? `: ${detail}` : '.'}`));
    });
  });
}

function parseYtDlpInfo(info) {
  const entries = Array.isArray(info.entries) ? info.entries : [info];
  const media = [];
  for (const entry of entries.flatMap(flattenYtDlpEntries)) {
    const selected = selectYtDlpMedia(entry);
    if (!selected) continue;
    media.push(selected);
  }
  const title = String(info.title || info.fulltitle || 'Public Instagram post').trim();
  const caption = String(info.description || '').replace(/\s+/g, ' ').trim();
  return {
    title,
    username: sanitizeUsername(info.uploader || info.channel || info.uploader_id),
    caption,
    media: dedupeMedia(media).slice(0, 10),
    source: 'yt-dlp'
  };
}

function parseYtDlpStdout(output) {
  const lines = output.trim().split('\n').map((line) => line.trim()).filter(Boolean);
  const parsed = [];
  for (const line of lines) {
    try { parsed.push(JSON.parse(line)); } catch { /* ignore non-JSON log lines */ }
  }
  if (!parsed.length) throw new Error('yt-dlp returned an invalid media response.');
  if (parsed.length === 1) return parsed[0];
  return {
    title: parsed[0].playlist_title || parsed[0].title || 'Public Instagram post',
    entries: parsed
  };
}

function flattenYtDlpEntries(entry) {
  return Array.isArray(entry?.entries) ? entry.entries.flatMap(flattenYtDlpEntries) : entry ? [entry] : [];
}

function selectYtDlpMedia(entry) {
  if (!entry || entry._type === 'playlist') return null;
  const formats = Array.isArray(entry.formats) ? entry.formats : [];
  const combined = formats.filter(isCombinedFormat).sort(compareQuality);
  const videoOnly = formats.filter(isVideoFormat).sort(compareQuality);
  const ext = String(entry.ext || '').toLowerCase();
  const hasVideo = combined.length || videoOnly.length || isVideoFormat(entry) || /^(mp4|webm|mov|mkv)$/i.test(ext);
  if (hasVideo) {
    const audioOnly = formats
      .filter((format) => isAudioFormat(format) && (!format.vcodec || format.vcodec === 'none'))
      .sort((a, b) => (b.abr || b.tbr || 0) - (a.abr || a.tbr || 0));
    const combinedUrl = [combined[0]?.url, isCombinedFormat(entry) ? entry.url : null].find(isMediaUrl);
    const videoUrl = [combinedUrl, videoOnly[0]?.url, entry.url].find(isMediaUrl);
    const audioUrl = [audioOnly[0]?.url].find(isMediaUrl) || null;
    if (!videoUrl) return pickPhotoMedia(entry);
    const thumbnail = pickPhotoUrl(entry) || videoUrl;
    return {
      type: 'video',
      sourceUrl: combinedUrl || videoUrl,
      previewUrl: thumbnail,
      hasAudio: Boolean(combinedUrl || audioUrl),
      audioUrl
    };
  }
  return pickPhotoMedia(entry);
}

function pickPhotoMedia(entry) {
  const photoUrl = pickPhotoUrl(entry);
  if (!photoUrl) return null;
  return { type: 'photo', sourceUrl: photoUrl, previewUrl: photoUrl, hasAudio: false };
}

function pickPhotoUrl(entry) {
  const thumbs = [...(entry.thumbnails || [])]
    .filter((thumb) => isMediaUrl(thumb.url) && !isLowResImage(thumb.url))
    .sort((a, b) => (b.width || 0) * (b.height || 0) - (a.width || 0) * (a.height || 0) || (b.preference || 0) - (a.preference || 0));
  return [thumbs[0]?.url, entry.thumbnail, entry.url].find((url) => isMediaUrl(url) && !isVideoFileUrl(url));
}

function isVideoFileUrl(value) {
  return /\.(mp4|webm|mov|mkv)(\?|$)/i.test(value);
}

function isLowResImage(value) {
  return /s150x150|s240x240|s320x320|s60x60|p150x150|p240x240/i.test(value);
}

function isVideoFormat(format) {
  return Boolean(format?.url) && format.vcodec && format.vcodec !== 'none';
}

function isAudioFormat(format) {
  return Boolean(format?.acodec) && format.acodec !== 'none';
}

function isCombinedFormat(format) {
  return isVideoFormat(format) && isAudioFormat(format);
}

function compareQuality(a, b) {
  return (b.height || 0) - (a.height || 0) || (b.tbr || 0) - (a.tbr || 0);
}

function dedupeMedia(media) {
  const seen = new Set();
  return media.filter((item) => {
    if (seen.has(item.sourceUrl)) return false;
    seen.add(item.sourceUrl);
    return true;
  });
}

async function followInstagramRedirect(url) {
  // Canonical post links (including /username/p/shortcode) need no extra hop.
  const alreadyCanonical = canonicalizePostUrl(url);
  if (alreadyCanonical) return alreadyCanonical;
  const response = await safeFetch(url, isInstagramHost, { headers: pageHeaders(), maxRedirects: 4 });
  if (!response.ok && response.status !== 401 && response.status !== 403) {
    throw new Error(`Instagram returned ${response.status}.`);
  }
  try {
    const finalUrl = new URL(response.url);
    const normalized = canonicalizePostUrl(finalUrl);
    if (normalized) return normalized;
    if (isSupportedPostPath(finalUrl.pathname)) return finalUrl;
  } catch {
    // Keep the submitted post URL when Instagram bounces to login.
  }
  if (isSupportedPostPath(url.pathname)) return canonicalizePostUrl(url) || url;
  throw new Error('That link did not resolve to a public Instagram reel or post.');
}

function parsePublicMedia(html) {
  const metas = getMetaTags(html);
  const title = decodeHtml(metas.get('og:title') || metas.get('twitter:title') || 'Public Instagram post')
    .replace(/\s*•\s*Instagram.*$/i, '').trim() || 'Public Instagram post';
  const description = decodeHtml(metas.get('og:description') || metas.get('twitter:description') || '')
    .replace(/\s+/g, ' ')
    .trim();
  const identity = identityFromTitle(title, description);
  const walked = extractMediaFromHtml(html);
  if (walked.length) {
    return { title, ...identity, media: dedupeMedia(walked).slice(0, 10), source: 'html' };
  }

  const videoUrls = uniqueUrls([
    metas.get('og:video:secure_url'), metas.get('og:video'), metas.get('twitter:player:stream'),
    ...getJsonStringValues(html, ['video_url', 'videoUrl', 'contentUrl'])
  ]).filter(isMediaUrl);
  const photoUrls = uniqueUrls([
    metas.get('og:image:secure_url'), metas.get('og:image'), metas.get('twitter:image'),
    ...getJsonStringValues(html, ['display_url', 'displayUrl', 'thumbnail_src', 'image_url', 'imageUrl'])
  ]).filter((url) => isMediaUrl(url) && !isLowResImage(url));
  const media = [];
  const used = new Set();
  for (const sourceUrl of videoUrls.slice(0, 10)) {
    used.add(sourceUrl);
    media.push({ type: 'video', sourceUrl, previewUrl: photoUrls[0] || sourceUrl, hasAudio: true });
  }
  for (const sourceUrl of photoUrls.slice(0, 10)) {
    if (used.has(sourceUrl)) continue;
    media.push({ type: 'photo', sourceUrl, previewUrl: sourceUrl, hasAudio: false });
  }
  return { title, ...identity, media: media.slice(0, 10), source: 'html' };
}

function toEmbedUrl(url) {
  const embed = new URL(url.toString());
  const parts = embed.pathname.split('/').filter(Boolean);
  if (parts.includes('embed')) {
    embed.search = '';
    embed.hash = '';
    return embed;
  }
  if (parts[0] === 'share' && parts[1] && parts[2]) embed.pathname = `/${parts[1]}/${parts[2]}/embed/`;
  else if (parts[0] && parts[1]) embed.pathname = `/${parts[0]}/${parts[1]}/embed/`;
  else embed.pathname = `${embed.pathname.replace(/\/+$/, '')}/embed/`;
  embed.search = '';
  embed.hash = '';
  return embed;
}

function extractMediaFromHtml(html) {
  const media = [];
  for (const blob of extractJsonBlobs(html)) collectInstagramMedia(blob, media);
  for (const match of html.matchAll(/<(?:img|image|video|source)[^>]+(?:src|content)=["'](https:[^"']+)["']/gi)) {
    const sourceUrl = decodeHtml(match[1]);
    if (!isMediaUrl(sourceUrl) || isLowResImage(sourceUrl)) continue;
    const isVideo = /<video|<source/i.test(match[0]) || isVideoFileUrl(sourceUrl);
    media.push(isVideo
      ? { type: 'video', sourceUrl, previewUrl: sourceUrl, hasAudio: true }
      : { type: 'photo', sourceUrl, previewUrl: sourceUrl, hasAudio: false });
  }
  return dedupeMedia(media);
}

function extractJsonBlobs(html) {
  const blobs = [];
  for (const match of html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)) {
    if (blobs.length >= 24) break;
    const text = match[1].trim().replace(/^<!--/, '').replace(/-->$/, '').trim();
    if (!text) continue;
    if (text.startsWith('{') || text.startsWith('[')) {
      try {
        blobs.push(JSON.parse(text));
        continue;
      } catch {
        // Instagram often wraps JSON in JS calls.
      }
    }
    for (const jsonMatch of text.matchAll(/\{(?:"require"|'require'|"(?:xdt_|gql_|shortcode_media|items|entry_data))/g)) {
      const slice = extractBalancedJson(text, jsonMatch.index);
      if (!slice) continue;
      try { blobs.push(JSON.parse(slice)); } catch { /* ignore incomplete JSON islands */ }
      if (blobs.length >= 24) break;
    }
  }
  return blobs;
}

function extractBalancedJson(text, start) {
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < text.length; index++) {
    const character = text[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (character === '\\') escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') inString = true;
    else if (character === '{') depth += 1;
    else if (character === '}') {
      depth -= 1;
      if (depth === 0) return text.slice(start, index + 1);
    }
  }
  return null;
}

function collectInstagramMedia(value, media, depth = 0) {
  if (!value || typeof value !== 'object' || depth > 14) return;
  if (Array.isArray(value)) {
    if (value.length && value.every((item) => isInstagramMediaNode(item))) {
      for (const item of value) {
        const parsed = mediaFromInstagramNode(item);
        if (parsed) media.push(parsed);
      }
      return;
    }
    for (const item of value) collectInstagramMedia(item, media, depth + 1);
    return;
  }
  if (Array.isArray(value.edge_sidecar_to_children?.edges)) {
    for (const edge of value.edge_sidecar_to_children.edges) {
      const parsed = mediaFromInstagramNode(edge?.node);
      if (parsed) media.push(parsed);
    }
    return;
  }
  if (Array.isArray(value.carousel_media)) {
    for (const item of value.carousel_media) {
      const parsed = mediaFromInstagramNode(item);
      if (parsed) media.push(parsed);
    }
    return;
  }
  if (isInstagramMediaNode(value)) {
    const parsed = mediaFromInstagramNode(value);
    if (parsed) media.push(parsed);
    return;
  }
  if (value['@type'] === 'ImageObject' && isMediaUrl(value.contentUrl)) {
    media.push({ type: 'photo', sourceUrl: value.contentUrl, previewUrl: value.contentUrl, hasAudio: false });
  }
  if (value['@type'] === 'VideoObject' && isMediaUrl(value.contentUrl)) {
    media.push({ type: 'video', sourceUrl: value.contentUrl, previewUrl: value.thumbnailUrl || value.contentUrl, hasAudio: true });
  }
  for (const [key, child] of Object.entries(value)) {
    if (SKIP_WALK_KEYS.has(key)) continue;
    collectInstagramMedia(child, media, depth + 1);
  }
}

function isInstagramMediaNode(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  return Boolean(
    value.image_versions2
    || value.video_versions
    || value.video_url
    || value.videoUrl
    || value.display_url
    || value.displayUrl
    || ('is_video' in value && (value.original_width || value.original_height || value.pk || value.id))
  );
}

function mediaFromInstagramNode(node) {
  if (!node) return null;
  const bestVideoVersions = [...(node.video_versions || [])]
    .filter((version) => version?.url)
    .sort((a, b) => (b.width || 0) * (b.height || 0) - (a.width || 0) * (a.height || 0))
    .map((version) => version.url);
  const videoUrl = firstMediaUrl([
    node.video_url,
    node.videoUrl,
    ...bestVideoVersions
  ]);
  const largestResource = [...(node.display_resources || [])]
    .filter((resource) => resource?.src)
    .sort((a, b) => (b.config_width || 0) * (b.config_height || 0) - (a.config_width || 0) * (a.config_height || 0))[0]?.src;
  const largestCandidate = [...(node.image_versions2?.candidates || [])]
    .filter((candidate) => candidate?.url)
    .sort((a, b) => (b.width || 0) * (b.height || 0) - (a.width || 0) * (a.height || 0))
    .map((candidate) => candidate.url);
  const photoUrl = firstMediaUrl([
    largestResource,
    node.display_url,
    node.displayUrl,
    ...largestCandidate,
    node.thumbnail_src,
    node.thumbnail_url,
    node.thumbnailUrl
  ].filter((url) => !isLowResImage(String(url || ''))));
  if (node.is_video || node.media_type === 2 || videoUrl) {
    if (!videoUrl) return photoUrl ? { type: 'photo', sourceUrl: photoUrl, previewUrl: photoUrl, hasAudio: false } : null;
    const audioUrl = firstMediaUrl([
      node.audio_url,
      node.music_metadata?.audio_asset_info?.progressive_download_url,
      node.clips_metadata?.original_sound_info?.progressive_download_url,
      node.clips_metadata?.music_info?.music_asset_info?.progressive_download_url
    ]) || null;
    // Prefer explicit has_audio / music metadata. Undefined usually means a normal reel with sound;
    // muted carousel clips typically set has_audio=false.
    const hasAudioFlag = node.has_audio;
    const hasMusicMeta = Boolean(
      audioUrl
      || node.clips_metadata?.original_sound_info
      || node.clips_metadata?.music_info
      || node.music_metadata
    );
    let hasAudio = true;
    if (hasAudioFlag === false || hasAudioFlag === 0) hasAudio = false;
    else if (hasAudioFlag === true || hasAudioFlag === 1 || hasMusicMeta) hasAudio = true;
    return {
      type: 'video',
      sourceUrl: videoUrl,
      previewUrl: photoUrl || videoUrl,
      hasAudio,
      audioUrl
    };
  }
  if (!photoUrl) return null;
  return { type: 'photo', sourceUrl: photoUrl, previewUrl: photoUrl, hasAudio: false };
}

function firstMediaUrl(values) {
  return values.find(isMediaUrl);
}

function getMetaTags(html) {
  const tags = new Map();
  for (const tag of html.match(/<meta\b[^>]*>/gi) || []) {
    const attributes = {};
    for (const [, name, quote, value] of tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gi)) {
      attributes[name.toLowerCase()] = decodeHtml(value);
    }
    const key = (attributes.property || attributes.name || '').toLowerCase();
    if (key && attributes.content && !tags.has(key)) tags.set(key, attributes.content);
  }
  return tags;
}

function getJsonStringValues(html, keys) {
  const values = [];
  for (const key of keys) {
    const expression = new RegExp(`(?:["']${key}["'])\\s*:\\s*["']((?:\\\\.|[^"'])*)["']`, 'gi');
    for (const match of html.matchAll(expression)) {
      const decoded = decodeJsString(match[1]);
      if (decoded) values.push(decoded);
    }
  }
  return values;
}

function decodeJsString(value) {
  try {
    return JSON.parse(`"${value.replace(/"/g, '\\"')}"`);
  } catch {
    return value.replace(/\\\//g, '/').replace(/\\u0026/gi, '&').replace(/\\u0025/gi, '%').replace(/&amp;/g, '&');
  }
}

function uniqueUrls(values) {
  const seen = new Set();
  return values.map((value) => decodeHtml(String(value || '')).trim()).filter((value) => {
    if (!value || seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

function isMediaUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || !isAllowedMediaHost(url.hostname)) return false;
    if (/rsrc\.php|\.css$|\.js$|\/rsrc\//i.test(url.pathname)) return false;
    return true;
  } catch {
    return false;
  }
}

function validateInstagramUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error('Enter a complete Instagram URL, starting with https://.');
  }
  if (url.protocol !== 'https:' || !isInstagramHost(url.hostname)) throw new Error('Use a link from instagram.com.');
  return url;
}

function isInstagramHost(hostname) {
  const host = hostname.toLowerCase();
  return host === 'instagram.com' || host.endsWith('.instagram.com');
}

function isAllowedMediaHost(hostname) {
  const host = hostname.toLowerCase();
  if (host === 'static.cdninstagram.com') return false;
  return host === 'cdninstagram.com' || host.endsWith('.cdninstagram.com') || host === 'fbcdn.net' || host.endsWith('.fbcdn.net');
}

function hasSessionFallback() {
  return Boolean(process.env.INSTAGRAM_COOKIES_FILE || process.env.INSTAGRAM_COOKIES || process.env.INSTAGRAM_COOKIES_FROM_BROWSER);
}

function isSupportedPostPath(pathname) {
  return Boolean(parsePostPath(pathname));
}

async function safeFetch(initialUrl, allowHost, { headers, maxRedirects }) {
  let url = new URL(initialUrl);
  for (let redirects = 0; redirects <= maxRedirects; redirects++) {
    if (url.protocol !== 'https:' || !allowHost(url.hostname)) throw new Error('Unsafe redirect was blocked.');
    const response = await fetch(url, { redirect: 'manual', headers, signal: AbortSignal.timeout(15_000) });
    if (![301, 302, 303, 307, 308].includes(response.status)) return response;
    const location = response.headers.get('location');
    if (!location) throw new Error('Redirect had no destination.');
    url = new URL(location, url);
  }
  throw new Error('Too many redirects.');
}

function pageHeaders() {
  return {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'accept-language': 'en-US,en;q=0.9',
    referer: 'https://www.instagram.com/',
    origin: 'https://www.instagram.com'
  };
}

function mediaHeaders() {
  return {
    ...pageHeaders(),
    accept: 'image/avif,image/webp,image/apng,image/*,video/mp4,video/*,*/*;q=0.8'
  };
}

function cookieArgs() {
  if (process.env.INSTAGRAM_COOKIES_FILE) return ['--cookies', process.env.INSTAGRAM_COOKIES_FILE];
  if (process.env.INSTAGRAM_COOKIES) {
    const cookiePath = join(tmpdir(), `instagram-cookies-${randomUUID()}.txt`);
    writeFileSync(cookiePath, process.env.INSTAGRAM_COOKIES);
    return ['--cookies', cookiePath];
  }
  if (process.env.INSTAGRAM_COOKIES_FROM_BROWSER && !process.env.VERCEL) {
    return ['--cookies-from-browser', process.env.INSTAGRAM_COOKIES_FROM_BROWSER];
  }
  return [];
}

function resolveYtDlpBin() {
  if (process.env.YTDLP_BIN) return process.env.YTDLP_BIN;
  const vendorName = process.platform === 'win32' ? 'yt-dlp.exe' : 'yt-dlp';
  const vendorPath = join(ROOT, 'vendor', vendorName);
  if (existsSync(vendorPath)) return vendorPath;
  return 'yt-dlp';
}

function resolveFfmpegPath() {
  if (process.env.FFMPEG_PATH && existsSync(process.env.FFMPEG_PATH)) return process.env.FFMPEG_PATH;
  try {
    const ffmpegPath = require('ffmpeg-static');
    if (ffmpegPath && existsSync(ffmpegPath)) return ffmpegPath;
  } catch {
    return undefined;
  }
  return undefined;
}

function cleanContentType(value) { return value?.split(';')[0].trim().toLowerCase(); }
function extensionFor(type, kind) {
  if (type === 'audio/mpeg' || type === 'audio/mp3') return 'mp3';
  if (type === 'audio/mp4' || type === 'audio/aac') return 'm4a';
  if (type === 'image/png') return 'png';
  if (type === 'image/webp') return 'webp';
  if (type === 'image/gif') return 'gif';
  if (kind === 'audio') return 'mp3';
  return kind === 'video' ? 'mp4' : 'jpg';
}
function decodeHtml(value) {
  return String(value).replace(/&amp;/gi, '&').replace(/&#x27;/gi, "'").replace(/&#39;/g, "'").replace(/&quot;/gi, '"').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>');
}
function publicFetchMessage(error) {
  if (/yt-dlp could not start/i.test(error.message)) {
    return 'The yt-dlp extractor is not available on this server. Install yt-dlp or redeploy so the bundled binary is included.';
  }
  if (!hasSessionFallback() && /No publicly|API is not granting access|empty media response|accounts\/login/i.test(error.message)) {
    return 'Instagram is requiring a logged-in session for automated retrieval of this public post. For a personal local install, restart with INSTAGRAM_COOKIES_FROM_BROWSER=chrome (see README).';
  }
  if (/No publicly|incomplete/i.test(error.message)) return 'No downloadable public media was found. The post may be private, login-gated, or no longer available.';
  if (/Instagram returned 4(01|03|04)/.test(error.message)) return 'Instagram could not make that public post available. Check the link and try again.';
  return 'Instagram did not return public media for this link. Try again shortly, or make sure the post is publicly accessible.';
}

function allowRequest(ip) {
  const now = Date.now();
  const active = (rateLimits.get(ip) || []).filter((time) => now - time < REQUEST_WINDOW_MS);
  if (active.length >= REQUEST_LIMIT) return false;
  active.push(now);
  rateLimits.set(ip, active);
  return true;
}

function getClientIp(request) {
  return String(request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown').split(',')[0].trim();
}

function encodeTicket(payload) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = createHmac('sha256', TOKEN_SECRET).update(encoded).digest('base64url');
  return `${encoded}.${signature}`;
}

function decodeTicket(ticket) {
  const [encoded, signature] = ticket.split('.');
  if (!encoded || !signature) return null;
  const expected = createHmac('sha256', TOKEN_SECRET).update(encoded).digest('base64url');
  const received = Buffer.from(signature);
  const actual = Buffer.from(expected);
  if (received.length !== actual.length || !timingSafeEqual(received, actual)) return null;
  try { return JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')); } catch { return null; }
}

async function readJson(request) {
  const raw = await request.text();
  if (Buffer.byteLength(raw) > MAX_BODY_BYTES) throw new Error('Request is too large.');
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error('Invalid JSON request.');
  }
}

function jsonResponse(status, payload) {
  const body = JSON.stringify(payload);
  return new Response(body, {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'content-length': String(Buffer.byteLength(body)),
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff'
    }
  });
}
