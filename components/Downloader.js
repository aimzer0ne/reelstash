'use client';

import { useRef, useState } from 'react';
import { apiUrl, withApiHost } from '@/lib/api';
import { Icon } from './Icons';

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
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const resultsRef = useRef(null);
  const inputRef = useRef(null);
  const hasUrl = Boolean(url.trim());

  async function resolveUrl(nextUrl) {
    const value = (nextUrl ?? url).trim();
    setError('');
    if (!value) return setError(messages.emptyUrl);
    if (!looksLikeInstagramUrl(value)) return setError(messages.invalidUrl);
    if (loading) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(apiUrl('/api/resolve'), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(mode === 'audio' ? { url: value, mode: 'audio' } : { url: value })
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || messages.resolveFailed);
      setUrl('');
      setResult({
        ...body,
        media: Array.isArray(body.media) ? body.media.map((item) => ({
          ...item,
          previewUrl: withApiHost(item.previewUrl),
          coverUrl: withApiHost(item.coverUrl),
          sourceUrl: item.sourceUrl?.startsWith('/') ? withApiHost(item.sourceUrl) : item.sourceUrl,
          downloadUrl: withApiHost(item.downloadUrl)
        })) : []
      });
      requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    } catch (caught) {
      setError(caught.message || messages.unexpected);
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
      setError(messages.clipboardBlocked);
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
          <span className="hero-title">{heading}</span>
        </h1>
        <p className="lede">{lede}</p>

        <form
          className="link-form"
          onSubmit={(event) => {
            event.preventDefault();
            void resolveUrl();
          }}
          noValidate
        >
          <label className="sr-only" htmlFor="instagram-url">{inputLabel}</label>
          <div className={loading ? 'input-wrap is-loading' : 'input-wrap'}>
            <Icon name="link" className="input-icon" />
            <input
              ref={inputRef}
              id="instagram-url"
              name="url"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder={placeholder}
              required
              value={url}
              disabled={loading}
              onChange={(event) => setUrl(event.target.value)}
              onPaste={onPaste}
            />
            {hasUrl ? (
              <button className="paste-button" type="button" disabled={loading} onClick={clearField}>
                <Icon name="clear" />
                Clear
              </button>
            ) : (
              <button className="paste-button" type="button" disabled={loading} onClick={() => void pasteLink()}>
                <Icon name="paste" />
                Paste
              </button>
            )}
          </div>
          <div
            className={loading ? 'ig-loading-track is-active' : 'ig-loading-track'}
            role="progressbar"
            aria-hidden={!loading}
            aria-busy={loading}
            aria-label={messages.loaderStatus}
          >
            <span className="ig-loading-bar" />
          </div>
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
                  <MediaCard key={`${item.downloadUrl}-${index}`} item={item} index={index} total={media.length} mode={mode} />
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
              Download again
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

function MediaCard({ item, index, total, mode }) {
  const itemNumber = index + 1;
  const suffix = total > 1 ? ` ${itemNumber}` : '';
  const isAudio = mode === 'audio' || item.type === 'audio';
  const isOriginalAudio = isAudio && item.original;
  const kind = item.type === 'video' ? 'video' : item.type === 'audio' ? 'audio' : 'photo';
  const label = isOriginalAudio
    ? `Download audio${suffix}`
    : isAudio
      ? `Download MP3${suffix}`
      : `Download ${kind}${suffix}`;
  const downloadName = isOriginalAudio
    ? `ReelsDl-audio-${itemNumber}`
    : isAudio
      ? `ReelsDl-audio-${itemNumber}.mp3`
      : `ReelsDl-${kind}-${itemNumber}.${kind === 'video' ? 'mp4' : 'jpg'}`;
  const [previewFailed, setPreviewFailed] = useState(false);
  const thumb = previewFailed ? null : lightPreview(item);

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
              referrerPolicy="no-referrer"
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
          href={item.downloadUrl}
          download={downloadName}
          aria-label={label}
        >
          <Icon name="download" />
          {label}
        </a>
      </div>
    </article>
  );
}

function lightPreview(item) {
  const url = item.coverUrl || item.previewUrl;
  if (!url || /\.(mp4|webm|mov|m4v|mp3|m4a)(\?|$)/i.test(url)) return null;
  return url;
}

function clearShimmer(event) {
  event.currentTarget.parentElement?.querySelector('.loading-shimmer')?.remove();
}

function looksLikeInstagramUrl(value) {
  try {
    const parsed = new URL(value.startsWith('http') ? value : `https://${value}`);
    return /^(www\.)?instagram\.com$/i.test(parsed.hostname);
  } catch {
    return /instagram\.com/i.test(value);
  }
}
