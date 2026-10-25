'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import './media-player.css';

// Custom players for the result previews. The <video>/<audio> elements carry no
// native controls; everything on top is ours, so it looks the same in every browser.

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

// Only one preview on the page plays at a time.
function pauseOthers(current) {
  for (const element of document.querySelectorAll('[data-rp-media]')) {
    if (element !== current) element.pause();
  }
}

// Shared state and actions for one media element. Sources are tried in order;
// when one fails the next is loaded, and playback resumes if the viewer had pressed play.
function useMedia(sources) {
  const ref = useRef(null);
  const wantPlay = useRef(false);
  const [index, setIndex] = useState(0);
  const [state, setState] = useState({
    playing: false,
    started: false,
    waiting: false,
    muted: false,
    failed: false,
    time: 0,
    duration: 0,
    buffered: 0
  });
  const src = sources[index] || null;
  const update = (patch) => setState((current) => ({ ...current, ...patch }));

  useEffect(() => {
    const element = ref.current;
    if (!element || !src || !wantPlay.current) return;
    element.play().catch(() => {});
  }, [src]);

  const bind = {
    'data-rp-media': '',
    onPlay: (event) => {
      pauseOthers(event.currentTarget);
      update({ playing: true, started: true });
    },
    onPause: () => update({ playing: false, waiting: false }),
    onEnded: () => {
      wantPlay.current = false;
      update({ playing: false });
    },
    onTimeUpdate: (event) => update({ time: event.currentTarget.currentTime }),
    onDurationChange: (event) => update({ duration: event.currentTarget.duration }),
    onProgress: (event) => {
      const ranges = event.currentTarget.buffered;
      update({ buffered: ranges.length ? ranges.end(ranges.length - 1) : 0 });
    },
    onWaiting: () => update({ waiting: true }),
    onPlaying: () => update({ waiting: false }),
    onCanPlay: () => update({ waiting: false }),
    onVolumeChange: (event) => update({ muted: event.currentTarget.muted }),
    onError: () => {
      if (index + 1 < sources.length) setIndex(index + 1);
      else update({ failed: true, playing: false, waiting: false });
    }
  };

  function toggle() {
    const element = ref.current;
    if (!element) return;
    if (element.paused) {
      wantPlay.current = true;
      element.play().catch(() => {});
    } else {
      wantPlay.current = false;
      element.pause();
    }
  }

  function seek(time) {
    const element = ref.current;
    if (!element || !Number.isFinite(element.duration)) return;
    element.currentTime = Math.min(Math.max(time, 0), element.duration);
    update({ time: element.currentTime });
  }

  function skip(delta) {
    if (ref.current) seek(ref.current.currentTime + delta);
  }

  function toggleMute() {
    if (ref.current) ref.current.muted = !ref.current.muted;
  }

  return { ref, src, state, bind, toggle, seek, skip, toggleMute };
}

function Seek({ state, onSeek, className, label }) {
  const max = Number.isFinite(state.duration) ? state.duration : 0;
  const played = max ? (state.time / max) * 100 : 0;
  const buffered = max ? (state.buffered / max) * 100 : 0;
  return (
    <input
      className={className}
      type="range"
      min="0"
      max={max || 1}
      step="0.05"
      value={max ? state.time : 0}
      disabled={!max}
      aria-label={label}
      aria-valuetext={`${formatTime(state.time)} of ${formatTime(state.duration)}`}
      style={{ '--p': `${played}%`, '--b': `${Math.max(buffered, played)}%` }}
      onChange={(event) => onSeek(Number(event.target.value))}
    />
  );
}

const Glyph = {
  play: <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" fill="currentColor" />,
  pause: <><rect x="6.5" y="5" width="4" height="14" rx="1.2" fill="currentColor" /><rect x="13.5" y="5" width="4" height="14" rx="1.2" fill="currentColor" /></>,
  volume: <><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" /><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></>,
  muted: <><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" /><path d="M16 9.5l5 5m0-5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></>,
  expand: <path d="M4.5 9V4.5H9M15 4.5h4.5V9M19.5 15v4.5H15M9 19.5H4.5V15" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />,
  back: <><path d="M11.5 5.5A7 7 0 1 1 5 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M11.5 2.5v6l-4-3z" fill="currentColor" /></>,
  forward: <><path d="M12.5 5.5A7 7 0 1 0 19 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M12.5 2.5v6l4-3z" fill="currentColor" /></>,
  music: <path d="M9 17.5V6.8l10-2.3v10.7M9 17.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zm10-2.3a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
};

function G({ name }) {
  return <svg className="rp-glyph" viewBox="0 0 24 24" aria-hidden="true">{Glyph[name]}</svg>;
}

export function VideoPlayer({ sources, poster, posterReferrer, label, onRatio }) {
  const media = useMedia(sources);
  const { state } = media;
  const box = useRef(null);
  const idle = useRef(null);
  const tapRevealed = useRef(false);
  const [active, setActive] = useState(true);

  // Controls fade out after a moment of playback without interaction.
  function poke() {
    setActive(true);
    clearTimeout(idle.current);
    idle.current = setTimeout(() => setActive(false), 2600);
  }
  useEffect(() => () => clearTimeout(idle.current), []);
  useEffect(() => {
    if (state.playing) poke();
    else setActive(true);
  }, [state.playing]);

  function fullscreen() {
    const video = media.ref.current;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else if (box.current?.requestFullscreen) {
      box.current.requestFullscreen().catch(() => video?.webkitEnterFullscreen?.());
    } else {
      // iPhone Safari only allows the video element itself to go fullscreen.
      video?.webkitEnterFullscreen?.();
    }
  }

  function onKeyDown(event) {
    if (event.target instanceof HTMLInputElement) return;
    const keys = {
      ' ': media.toggle,
      k: media.toggle,
      ArrowLeft: () => media.skip(-5),
      ArrowRight: () => media.skip(5),
      m: media.toggleMute,
      f: fullscreen
    };
    const action = keys[event.key];
    if (!action) return;
    event.preventDefault();
    poke();
    action();
  }

  if (!media.src || state.failed) return null;

  const className = [
    'rp-video',
    state.playing ? 'is-playing' : '',
    state.playing && !active ? 'is-idle' : ''
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={box}
      className={className}
      role="group"
      aria-label={label}
      tabIndex={0}
      onPointerMove={poke}
      onPointerDown={() => {
        // On touch screens the first tap on faded controls only brings them back.
        tapRevealed.current = state.playing && !active;
        poke();
      }}
      onKeyDown={onKeyDown}
    >
      <video
        ref={media.ref}
        src={media.src}
        preload="none"
        playsInline
        onClick={() => {
          if (tapRevealed.current) tapRevealed.current = false;
          else media.toggle();
        }}
        {...media.bind}
        onLoadedMetadata={(event) => {
          const { videoWidth, videoHeight } = event.currentTarget;
          if (videoWidth && videoHeight) onRatio?.(`${videoWidth} / ${videoHeight}`);
          media.bind.onDurationChange(event);
        }}
      />
      {poster && !state.started ? (
        // Shown until playback starts, so the CDN's referrer rules apply to the cover too.
        <img className="rp-poster" src={poster} alt="" referrerPolicy={posterReferrer} decoding="async" />
      ) : null}
      {state.waiting && state.playing ? <span className="rp-spinner" aria-hidden="true" /> : null}
      {!state.playing ? (
        <button className="rp-big-play" type="button" onClick={media.toggle} aria-label="Play video">
          <G name="play" />
        </button>
      ) : null}
      <div className="rp-bar">
        <Seek className="rp-seek" state={state} onSeek={media.seek} label="Seek video" />
        <div className="rp-row">
          <button className="rp-btn" type="button" onClick={media.toggle} aria-label={state.playing ? 'Pause' : 'Play'}>
            <G name={state.playing ? 'pause' : 'play'} />
          </button>
          <span className="rp-time">
            {formatTime(state.time)}
            <span className="rp-time-total"> / {formatTime(state.duration)}</span>
          </span>
          <span className="rp-spacer" />
          <button className="rp-btn" type="button" onClick={media.toggleMute} aria-label={state.muted ? 'Unmute' : 'Mute'}>
            <G name={state.muted ? 'muted' : 'volume'} />
          </button>
          <button className="rp-btn" type="button" onClick={fullscreen} aria-label="Full screen">
            <G name="expand" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Stable pseudo-random bar heights per track, so the waveform does not jump between renders.
function waveform(seed, count) {
  let hash = 2166136261;
  for (const char of seed) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return Array.from({ length: count }, (_, i) => {
    hash = Math.imul(hash ^ (hash >>> 13), 1274126177);
    const noise = ((hash >>> 0) % 1000) / 1000;
    const envelope = Math.sin((i / (count - 1)) * Math.PI) * .45 + .4;
    return Math.round((envelope * (.55 + noise * .6)) * 100);
  });
}

const BARS = 44;

export function AudioPlayer({ sources, cover, coverReferrer, title, subtitle, label }) {
  const media = useMedia(sources);
  const { state } = media;
  const bars = useMemo(() => waveform(sources[0] || title || 'audio', BARS), [sources, title]);
  const progress = state.duration ? state.time / state.duration : 0;

  if (!media.src || state.failed) return null;

  return (
    <div className={state.playing ? 'rp-audio is-playing' : 'rp-audio'} role="group" aria-label={label}>
      {cover ? <img className="rp-audio-backdrop" src={cover} alt="" referrerPolicy={coverReferrer} aria-hidden="true" /> : null}
      <audio ref={media.ref} src={media.src} preload="metadata" {...media.bind} />
      <div className="rp-audio-head">
        <span className="rp-cover">
          {cover ? <img src={cover} alt="" referrerPolicy={coverReferrer} decoding="async" /> : <G name="music" />}
          {state.playing ? <span className="rp-eq" aria-hidden="true"><i /><i /><i /></span> : null}
        </span>
        <span className="rp-audio-meta">
          <strong>{title}</strong>
          <span>{subtitle}</span>
        </span>
      </div>
      <div className="rp-wave">
        {bars.map((height, i) => (
          <span
            key={i}
            className={i / BARS < progress ? 'is-played' : undefined}
            style={{ height: `${height}%`, backgroundSize: `${BARS * 100}% 100%`, backgroundPosition: `${(i / (BARS - 1)) * 100}% 0` }}
          />
        ))}
        <Seek className="rp-wave-seek" state={state} onSeek={media.seek} label="Seek audio" />
      </div>
      <div className="rp-audio-controls">
        <span className="rp-time">{formatTime(state.time)}</span>
        <button className="rp-skip" type="button" onClick={() => media.skip(-10)} aria-label="Back 10 seconds">
          <G name="back" />
        </button>
        <button className="rp-audio-play" type="button" onClick={media.toggle} aria-label={state.playing ? 'Pause' : 'Play'}>
          {state.waiting && state.playing ? <span className="rp-spinner is-small" aria-hidden="true" /> : <G name={state.playing ? 'pause' : 'play'} />}
        </button>
        <button className="rp-skip" type="button" onClick={() => media.skip(10)} aria-label="Forward 10 seconds">
          <G name="forward" />
        </button>
        <span className="rp-time is-end">{formatTime(state.duration)}</span>
      </div>
    </div>
  );
}
