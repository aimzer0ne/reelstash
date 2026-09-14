'use client';

import { useEffect, useRef, useState } from 'react';
import { apiUrl, withApiHost } from '@/lib/api';
import { SITE_EMAIL } from '@/lib/seo';
import { Icon } from './Icons';
import { useI18n } from './I18nProvider';

export function Downloader({
  mode,
  kicker,
  heading,
  lede,
  inputLabel,
  placeholder,
  messages,
  summary
}) {
  const { t } = useI18n();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const resultsRef = useRef(null);
  const inputRef = useRef(null);
  const hasUrl = Boolean(url.trim());
  const audio = mode === 'audio';
  const headingText = t(audio ? 'audioHeading' : 'mediaHeading');
  const ledeText = t(audio ? 'audioLede' : 'mediaLede');
  const placeholderText = t(audio ? 'audioPlaceholder' : 'mediaPlaceholder');
  const inputLabelText = t(audio ? 'audioInputLabel' : 'mediaInputLabel');
  const copy = {
    emptyUrl: t(audio ? 'emptyUrlAudio' : 'emptyUrl'),
    invalidUrl: t('invalidUrl'),
    resolveFailed: t(audio ? 'resolveFailedAudio' : 'resolveFailed'),
    unexpected: t(audio ? 'unexpectedAudio' : 'unexpected'),
    clipboardBlocked: t('clipboardBlocked')
  };

  useEffect(() => {
    const desktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!desktop) return;
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  async function resolveUrl(nextUrl) {
    const value = (nextUrl ?? url).trim();
    setError('');
    if (!value) return setError(copy.emptyUrl);
    if (!looksLikeInstagramUrl(value)) return setError(copy.invalidUrl);
    if (loading) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(apiUrl('/api/resolve'), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
          'x-reelsdl-client': 'web'
        },
        body: JSON.stringify(mode === 'audio' ? { url: value, mode: 'audio' } : { url: value })
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || copy.resolveFailed);
      setUrl('');
      setResult({
        ...body,
        media: Array.isArray(body.media) ? body.media.map((item) => ({
          ...item,
          previewUrl: withApiHost(item.previewUrl),
          coverUrl: withApiHost(item.coverUrl),
          sourceUrl: item.sourceUrl?.startsWith('/') ? withApiHost(item.sourceUrl) : item.sourceUrl,
          downloadUrl: withApiHost(item.downloadUrl),
          directUrl: item.directUrl && /^https:\/\//i.test(item.directUrl) ? item.directUrl : null
        })) : []
      });
      requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    } catch (caught) {
      setError(caught.message || copy.unexpected);
    } finally {
      setLoading(false);
    }
  }

  async function pasteLink() {
    try {
      const text = await navigator.clipboard.readText();
      if (!text?.trim()) return;
      const next = text.trim();
      setUrl(next);
      await resolveUrl(next);
    } catch {
      setError(copy.clipboardBlocked);
    }
  }

  function clearField() {
    setUrl('');
    setError('');
    inputRef.current?.focus();
  }

  function onPaste(event) {
    const text = event.clipboardData?.getData('text')?.trim();
    if (!text || !looksLikeInstagramUrl(text)) return;
    setUrl(text);
    requestAnimationFrame(() => void resolveUrl(text));
  }

  const media = Array.isArray(result?.media) ? result.media : [];
  const count = media.length === 1 ? summary.one : `${media.length}${summary.manySuffix}`;

  return (
    <>
      <section className="hero" aria-labelledby="hero-heading">
        {kicker ? <p className="kicker">{kicker}</p> : null}
        <h1 id="hero-heading">
          <span className="hero-title">{headingText}</span>
        </h1>
        <p className="lede">{ledeText}</p>

        <form
          className="link-form"
          autoComplete="off"
          suppressHydrationWarning
          onSubmit={(event) => {
            event.preventDefault();
            void resolveUrl();
          }}
          noValidate
        >
          <label className="sr-only" htmlFor="instagram-url">{inputLabelText}</label>
          <div
            className={loading ? 'input-wrap is-loading' : 'input-wrap'}
            aria-busy={loading}
            onClick={(event) => {
              if (event.target.closest('button, a')) return;
              inputRef.current?.focus();
            }}
          >
            <Icon name="link" className="input-icon" />
            <input
              ref={inputRef}
              id="instagram-url"
              name="ig-link"
              type="text"
              inputMode="url"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              data-1p-ignore="true"
              data-lpignore="true"
              placeholder={placeholderText}
              required
              value={url}
              disabled={loading}
              suppressHydrationWarning
              onChange={(event) => setUrl(event.target.value)}
              onPaste={onPaste}
            />
            {hasUrl ? (
              <button className="paste-button" type="button" disabled={loading} onClick={clearField}>
                <Icon name="clear" />
                {t('clear')}
              </button>
            ) : (
              <button className="paste-button" type="button" disabled={loading} onClick={() => void pasteLink()}>
                <Icon name="paste" />
                {t('paste')}
              </button>
            )}
          </div>
          <a className="report-issue" href={reportIssueHref(url, mode, t('reportIssue'))}>
            {t('reportIssue')}
          </a>
        </form>

        {error ? (
          <div className="error-message" role="alert">
            <Icon name="alert" />
            <span>{error}</span>
          </div>
        ) : null}
      </section>

      <section className="results-section" ref={resultsRef} aria-live="polite" hidden={!result}>
        {result ? (
          <>
            <article className={media.length === 1 ? 'ig-post is-single' : 'ig-post'}>
              <PostByline result={result} fallbackTitle={summary.defaultTitle} />
              <div className={media.length === 1 ? 'media-grid is-single' : 'media-grid'}>
                {media.map((item, index) => (
                  <MediaCard key={`${item.downloadUrl}-${index}`} item={item} index={index} total={media.length} mode={mode} t={t} />
                ))}
              </div>
              {postCaption(result) ? (
                <p className="ig-caption">
                  {postUsername(result) ? (
                    <a
                      className="ig-username"
                      href={profileHref(result)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {postUsername(result)}
                    </a>
                  ) : null}
                  {' '}
                  {postCaption(result)}
                </p>
              ) : null}
            </article>
            <a className="clear-button" href="/">
              <Icon name="again" />
              {t('downloadAgain')}
            </a>
          </>
        ) : null}
      </section>
    </>
  );
}

function PostByline({ result, fallbackTitle }) {
  const username = postUsername(result);
  if (!username) {
    return (
      <header className="ig-post-head">
        <span className="ig-avatar" aria-hidden="true">R</span>
        <strong className="ig-username">{fallbackTitle}</strong>
      </header>
    );
  }

  return (
    <header className="ig-post-head">
      <span className="ig-avatar" aria-hidden="true">{username.slice(0, 1).toUpperCase()}</span>
      <div className="ig-post-meta">
        <a className="ig-username" href={profileHref(result)} target="_blank" rel="noopener noreferrer">
          {username}
        </a>
        <span className="ig-handle">@{username}</span>
      </div>
    </header>
  );
}

function postUsername(result) {
  if (result.username && /^[A-Za-z0-9._]{1,30}$/.test(result.username)) return result.username;
  const match = String(result.title || '').match(/(?:by |^)([A-Za-z0-9._]{1,30})(?:\s+[—–-]|\s+on Instagram|$)/i);
  return match?.[1] && !/^(video|photo|post|reel|public)$/i.test(match[1]) ? match[1] : null;
}

function postCaption(result) {
  if (result.caption) return result.caption;
  const title = String(result.title || '');
  const parts = title.split(/\s+[—–-]\s+/);
  return parts.length > 1 ? parts.slice(1).join(' — ').replace(/…$/, '').trim() : '';
}

function profileHref(result) {
  const username = postUsername(result);
  if (result.profileUrl) return result.profileUrl;
  return username ? `https://www.instagram.com/${username}/` : 'https://www.instagram.com/';
}

function MediaCard({ item, index, total, mode, t }) {
  const itemNumber = index + 1;
  const suffix = total > 1 ? ` ${itemNumber}` : '';
  const isAudio = mode === 'audio' || item.type === 'audio';
  const isOriginalAudio = isAudio && item.original;
  const kind = item.type === 'video' ? 'video' : item.type === 'audio' ? 'audio' : 'photo';
  const label = `${isOriginalAudio ? t('downloadAudio') : isAudio ? t('downloadMp3') : kind === 'video' ? t('downloadVideo') : t('downloadPhoto')}${suffix}`;
  const downloadName = isOriginalAudio
    ? `ReelsDl-audio-${itemNumber}`
    : isAudio
      ? `ReelsDl-audio-${itemNumber}.mp3`
      : `ReelsDl-${kind}-${itemNumber}.${kind === 'video' ? 'mp4' : 'jpg'}`;
  const [previewFailed, setPreviewFailed] = useState(false);
  const thumb = previewFailed ? null : lightPreview(item);
  const isPhoto = kind === 'photo';
  const primaryUrl = isPhoto && item.directUrl ? item.directUrl : item.downloadUrl;
  const showDirect = Boolean(item.directUrl) && !isPhoto;

  return (
    <article className="media-card">
      <div className={kind === 'video' ? 'media-preview is-video' : isAudio ? 'media-preview is-audio' : 'media-preview'}>
        {thumb ? (
          <>
            <div className="loading-shimmer" />
            <img
              src={thumb}
              alt={isAudio ? `Instagram reel cover ${itemNumber}` : kind === 'video' ? `Instagram video cover ${itemNumber}` : `Instagram photo ${itemNumber}`}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              referrerPolicy={isApiAsset(thumb) ? 'origin' : 'no-referrer'}
              onLoad={clearShimmer}
              onError={() => setPreviewFailed(true)}
            />
          </>
        ) : (
          <div className="media-placeholder" aria-hidden="true">
            <Icon name={isAudio ? 'audio' : kind === 'video' ? 'reels' : 'download'} />
          </div>
        )}
        {kind === 'video' ? <span className="media-kind">Video</span> : null}
        {isAudio ? <span className="media-kind">MP3</span> : null}
      </div>
      <div className="media-footer">
        <a
          className="download-button"
          href={primaryUrl}
          download={downloadName}
          aria-label={label}
          {...(isPhoto && item.directUrl ? { rel: 'noreferrer', referrerPolicy: 'no-referrer' } : {})}
        >
          <Icon name="download" />
          {label}
        </a>
        {showDirect ? (
          <a
            className="download-direct"
            href={item.directUrl}
            rel="noreferrer"
            referrerPolicy="no-referrer"
          >
            <Icon name="link" />
            {t('directFile')}
          </a>
        ) : null}
      </div>
    </article>
  );
}

function isApiAsset(url) {
  return /\/api\/download(?:\?|$)/.test(url) || /(?:^|\/\/)get\.reelsdl\.net\//i.test(url);
}

function lightPreview(item) {
  const url = item.coverUrl || item.previewUrl;
  if (!url || /\.(mp4|webm|mov|m4v|mp3|m4a)(\?|$)/i.test(url)) return null;
  return url;
}

function clearShimmer(event) {
  event.currentTarget.parentElement?.querySelector('.loading-shimmer')?.remove();
}

function reportIssueHref(url, mode, subjectLabel) {
  const page = mode === 'audio' ? 'Audio MP3' : 'Reels Downloader';
  const subject = `ReelsDl.net — ${subjectLabel || page}`;
  const parts = ['What went wrong:', ''];
  const trimmed = url.trim();
  if (trimmed) parts.push(`Instagram link: ${trimmed}`, '');
  return `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(parts.join('\n'))}`;
}

function looksLikeInstagramUrl(value) {
  try {
    const parsed = new URL(value.startsWith('http') ? value : `https://${value}`);
    return /^(www\.)?instagram\.com$/i.test(parsed.hostname);
  } catch {
    return /instagram\.com/i.test(value);
  }
}
