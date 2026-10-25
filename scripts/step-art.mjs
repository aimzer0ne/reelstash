// Phone mockups for the three how-to steps: copy the link in Instagram, paste
// it on ReelsDl.net, download the file. Drawn on a 300 × 460 canvas with a
// transparent background, so they sit on both the light and the dark theme.
import { STEP_SIZE, STEP_TABS, STEP_TYPES } from '../lib/images.js';

const FONT = 'Helvetica Neue, Helvetica, Arial, sans-serif';
const INK = '#0a0a0b';
const RED = '#ef3b2d';
const L = 24;
const R = 276;
const W = R - L;

function text(x, y, value, { size = 11, weight = 400, fill = INK, anchor = 'start' } = {}) {
  return `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${value}</text>`;
}

function bar(x, y, w, h, fill) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}"/>`;
}

function play(cx, cy, r) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#000" opacity=".45"/>
    <path d="M${cx - r * .32} ${cy - r * .45}v${r * .9}l${r * .78}-${r * .45}z" fill="#fff"/>`;
}

function defs() {
  return `<defs>
    <filter id="sh" x="-30%" y="-20%" width="160%" height="140%"><feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#0a0a0b" flood-opacity=".14"/></filter>
    <filter id="sheet" x="-10%" y="-30%" width="120%" height="160%"><feDropShadow dx="0" dy="-4" stdDeviation="8" flood-color="#000" flood-opacity=".18"/></filter>
    <clipPath id="screen"><rect x="${L}" y="20" width="${W}" height="420" rx="30"/></clipPath>
    <linearGradient id="ig" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#feda75"/><stop offset=".3" stop-color="#fa7e1e"/><stop offset=".55" stop-color="#d62976"/>
      <stop offset=".8" stop-color="#962fbf"/><stop offset="1" stop-color="#4f5bd5"/>
    </linearGradient>
    <linearGradient id="g-video" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b3754"/><stop offset=".55" stop-color="#8a6458"/><stop offset="1" stop-color="#e0a86c"/></linearGradient>
    <linearGradient id="g-reel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1e2a46"/><stop offset=".55" stop-color="#5b3d6e"/><stop offset="1" stop-color="#c35d7f"/></linearGradient>
    <linearGradient id="g-photo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe0f5"/><stop offset="1" stop-color="#f6efe4"/></linearGradient>
    <linearGradient id="g-story" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f58529"/><stop offset=".5" stop-color="#dd2a7b"/><stop offset="1" stop-color="#8134af"/></linearGradient>
    <marker id="ah" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="3.4" markerHeight="3.4" orient="auto"><path d="M0 0L10 5L0 10z" fill="${RED}"/></marker>
  </defs>`;
}

function phone(inner) {
  return `<g filter="url(#sh)"><rect x="14" y="10" width="272" height="440" rx="40" fill="#fff" stroke="#dedde2" stroke-width="2"/></g>
    <g clip-path="url(#screen)">
      <rect x="${L}" y="20" width="${W}" height="420" fill="#fff"/>
      ${inner}
    </g>
    <rect x="125" y="27" width="50" height="14" rx="7" fill="${INK}"/>`;
}

function arrow(d) {
  return `<path d="${d}" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".9"/>
    <path d="${d}" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round" marker-end="url(#ah)"/>`;
}

// The picture inside a post or result card.
function media(kind, x, y, w, h) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const clip = `m${x}-${y}-${w}-${h}`.replace(/\./g, '');
  const r = Math.min(w, h);
  let body;
  if (kind === 'photo') {
    body = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#g-photo)"/>
      <circle cx="${x + w * .25}" cy="${y + h * .3}" r="${r * .1}" fill="#ffd27a"/>
      <path d="M${x} ${y + h}L${x + w * .32} ${y + h * .5}L${x + w * .55} ${y + h * .78}L${x + w * .72} ${y + h * .58}L${x + w} ${y + h * .9}V${y + h}z" fill="#5d8c72"/>
      <path d="M${x} ${y + h}L${x + w * .2} ${y + h * .78}L${x + w * .45} ${y + h}z" fill="#3f6b55"/>
      <rect x="${x + w - 38}" y="${y + 10}" width="28" height="16" rx="8" fill="#000" opacity=".55"/>
      ${text(x + w - 24, y + 21.5, '1/4', { size: 8.5, weight: 700, fill: '#fff', anchor: 'middle' })}`;
  } else if (kind === 'story') {
    body = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#g-story)"/>
      <rect x="${x + w * .18}" y="${cy - r * .22}" width="${w * .64}" height="${r * .26}" rx="10" fill="#fff" opacity=".92"/>
      ${bar(x + w * .26, cy - r * .14, w * .48, 7, '#d62976')}
      ${bar(x + w * .32, cy - r * .02, w * .36, 6, '#e7a3c3')}`;
  } else if (kind === 'audio-file') {
    const bars = [16, 30, 46, 26, 54, 38, 22, 48, 34, 18, 40, 26, 14];
    const step = w / (bars.length + 3);
    body = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f4f4f5"/>
      ${bars.map((bh, i) => `<rect x="${x + step * (i + 1.5)}" y="${cy - bh / 2}" width="${step * .55}" height="${bh}" rx="${step * .27}" fill="${i < 6 ? 'url(#ig)' : '#c9c9ce'}"/>`).join('')}
      <rect x="${x + 10}" y="${y + 10}" width="38" height="18" rx="9" fill="${INK}"/>
      ${text(x + 29, y + 22.5, 'MP3', { size: 9, weight: 700, fill: '#fff', anchor: 'middle' })}`;
  } else {
    const fill = kind === 'video' ? 'url(#g-video)' : 'url(#g-reel)';
    body = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>
      ${kind === 'video' ? `<circle cx="${x + w * .72}" cy="${y + h * .34}" r="${r * .09}" fill="#f6d29e"/>
      <path d="M${x} ${y + h}L${x + w * .3} ${y + h * .62}L${x + w * .5} ${y + h * .8}L${x + w * .75} ${y + h * .55}L${x + w} ${y + h * .85}V${y + h}z" fill="#1f2638" opacity=".85"/>` : ''}
      ${play(cx, cy, Math.max(14, r * .12))}
      ${kind === 'audio' ? `<rect x="${x + 10}" y="${y + h - 28}" width="104" height="18" rx="9" fill="#000" opacity=".45"/>
      <path d="M${x + 19} ${y + h - 14}v-7l7-1.5v7" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
      ${text(x + 32, y + h - 15.5, 'Original audio', { size: 8.5, weight: 600, fill: '#fff' })}` : ''}`;
  }
  return `<clipPath id="${clip}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${x === L ? 0 : 10}"/></clipPath>
    <g clip-path="url(#${clip})">${body}</g>`;
}

// Two interlocked chain links, centered on 0,0.
function linkIcon(stroke, scale = 1) {
  return `<g transform="scale(${scale}) rotate(-45)" fill="none" stroke="${stroke}" stroke-width="${2 / scale}">
    <rect x="-10" y="-3.6" width="12" height="7.2" rx="3.6"/><rect x="-2" y="-3.6" width="12" height="7.2" rx="3.6"/></g>`;
}

function shareSheet() {
  const items = [
    ['Copy link', linkIcon(INK)],
    ['Message', `<path d="M-8 -6h16v10h-9l-5 4v-4h-2z" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>`],
    ['Send to', `<path d="M-8 0l16-7-6 16-3-6z" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>`],
    ['More', `<circle cx="-6" r="1.8" fill="${INK}"/><circle r="1.8" fill="${INK}"/><circle cx="6" r="1.8" fill="${INK}"/>`]
  ];
  return `<rect x="${L}" y="20" width="${W}" height="420" fill="#000" opacity=".38"/>
    <g filter="url(#sheet)"><rect x="${L}" y="318" width="${W}" height="140" rx="20" fill="#fff"/></g>
    ${bar(135, 327, 30, 4, '#d4d4d8')}
    ${text(150, 350, 'Share', { size: 11, weight: 700, anchor: 'middle' })}
    ${items.map(([label, icon], i) => {
      const cx = 58 + i * 61;
      return `<circle cx="${cx}" cy="381" r="19" fill="#f2f2f4"${i === 0 ? ` stroke="${RED}" stroke-width="2.5"` : ''}/>
        <g transform="translate(${cx} 381)">${icon}</g>
        ${text(cx, 414, label, { size: 8.5, weight: i === 0 ? 700 : 500, fill: i === 0 ? INK : '#55555a', anchor: 'middle' })}`;
    }).join('')}`;
}

function instagramPost(t) {
  if (t.media === 'story') {
    return `${media('story', L, 20, W, 420)}
      ${[0, 1, 2].map((i) => bar(36 + i * 77, 50, 71, 3, i ? 'rgba(255,255,255,.45)' : '#fff')).join('')}
      <circle cx="46" cy="72" r="11" fill="none" stroke="#fff" stroke-width="2"/><circle cx="46" cy="72" r="8" fill="#ffffff" opacity=".6"/>
      ${bar(64, 68, 66, 7, '#fff')}
      ${text(258, 76, '•••', { size: 12, weight: 700, fill: '#fff', anchor: 'middle' })}
      ${shareSheet()}`;
  }
  const title = t.media === 'photo' ? 'Post' : t.media === 'video' ? 'Post' : 'Reels';
  return `${text(40, 40, '9:41', { size: 10, weight: 700 })}
    <path d="M42 58l-6 6 6 6" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    ${text(150, 68, title, { size: 13, weight: 700, anchor: 'middle' })}
    <circle cx="46" cy="96" r="12" fill="none" stroke="url(#ig)" stroke-width="2.5"/><circle cx="46" cy="96" r="8.5" fill="#e4e4e7"/>
    ${bar(64, 89, 82, 7, '#2a2a2e')}
    ${bar(64, 100, 54, 5, '#b4b4b9')}
    ${text(258, 100, '•••', { size: 12, weight: 700, anchor: 'middle' })}
    ${media(t.media, L, 116, W, 200)}
    <path d="M40 336c-4-4-8-1-8 3 0 5 8 9 8 9s8-4 8-9c0-4-4-7-8-3z" fill="none" stroke="${INK}" stroke-width="1.8"/>
    <path d="M62 329a8 8 0 1 1-3.5 15l-4 1.5 1.5-4a8 8 0 0 1 6-12.5z" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M78 331l14-3-7 14-2-6z" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
    ${shareSheet()}`;
}

function siteHeader(t) {
  // Tabs are sized by label length, like the real flex row.
  const weights = STEP_TABS.map((label) => label.length + 4);
  const unit = 226 / weights.reduce((sum, w) => sum + w, 0);
  let left = 37;
  return `${text(40, 40, '9:41', { size: 10, weight: 700 })}
    <rect x="108" y="54" width="16" height="16" rx="4.5" fill="${INK}"/><rect x="112" y="58" width="8" height="8" rx="2" fill="none" stroke="#fff" stroke-width="1.5"/>
    ${text(130, 67, 'ReelsDl.net', { size: 12.5, weight: 700 })}
    <rect x="34" y="82" width="232" height="26" rx="13" fill="#fff" stroke="#e4e4e7" stroke-width="1.5"/>
    ${STEP_TABS.map((label, i) => {
      const tw = weights[i] * unit;
      const x = left;
      left += tw;
      const active = label === t.tab;
      return `${active ? `<rect x="${x}" y="85" width="${tw}" height="20" rx="10" fill="${INK}"/>` : ''}
        ${text(x + tw / 2, 98.5, label.replace('&', '&amp;'), { size: 9, weight: 600, fill: active ? '#fff' : '#6b6b70', anchor: 'middle' })}`;
    }).join('')}`;
}

function sitePaste(t) {
  return `${siteHeader(t)}
    ${text(150, 150, t.heading[0].replace('&', '&amp;'), { size: 19, weight: 800, anchor: 'middle' })}
    ${text(150, 173, t.heading[1], { size: 19, weight: 800, anchor: 'middle' })}
    ${bar(66, 190, 168, 6, '#d9d9de')}
    ${bar(88, 202, 124, 6, '#d9d9de')}
    <rect x="34" y="224" width="232" height="46" rx="10" fill="#fff" stroke="#cfcfd4" stroke-width="1.5"/>
    <g transform="translate(50 247)">${linkIcon('#9a9aa0', .75)}</g>
    ${text(64, 251, 'Paste an Instagram URL', { size: 9.5, fill: '#9a9aa0' })}
    <rect x="203" y="230" width="57" height="34" rx="7" fill="${INK}"/>
    ${text(231.5, 251, 'Paste', { size: 11, weight: 700, fill: '#fff', anchor: 'middle' })}
    ${arrow('M168 318C200 318 228 304 231 276')}
    ${bar(90, 346, 120, 9, '#2a2a2e')}
    ${[0, 1, 2].map((i) => `<rect x="${34 + i * 80}" y="370" width="72" height="54" rx="10" fill="#f4f4f5"/>`).join('')}`;
}

function siteResult(t) {
  const thumb = t.media === 'audio' ? 'audio-file' : t.media;
  return `${siteHeader(t)}
    <rect x="34" y="122" width="232" height="300" rx="16" fill="#fff" stroke="#e4e4e7" stroke-width="1.5"/>
    <circle cx="56" cy="144" r="11" fill="${INK}"/>${text(56, 148, 'R', { size: 10, weight: 700, fill: '#fff', anchor: 'middle' })}
    ${bar(74, 137, 74, 7, '#2a2a2e')}
    ${bar(74, 148, 46, 5, '#b4b4b9')}
    ${media(thumb, 46, 166, 208, 160)}
    <rect x="46" y="340" width="208" height="36" rx="9" fill="${INK}"/>
    <path d="M${100} 351v10m-4-4 4 4 4-4m-8 7h8" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" transform="translate(-6 0)"/>
    ${text(156, 363, t.button, { size: 12, weight: 700, fill: '#fff', anchor: 'middle' })}
    <rect x="46" y="384" width="208" height="26" rx="8" fill="#fff" stroke="#e4e4e7" stroke-width="1.5"/>
    ${text(150, 401, 'Download again', { size: 9.5, weight: 600, fill: '#55555a', anchor: 'middle' })}
    ${arrow('M196 300C226 302 238 316 230 334')}`;
}

export function stepSvgs(type) {
  const t = STEP_TYPES[type];
  const wrapSvg = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" width="${STEP_SIZE.width}" height="${STEP_SIZE.height}" viewBox="0 0 300 460">${defs()}${phone(inner)}</svg>`;
  return [
    wrapSvg(`${instagramPost(t)}${arrow('M178 270C150 274 100 300 66 352')}`),
    wrapSvg(sitePaste(t)),
    wrapSvg(siteResult(t))
  ];
}

// Shared with scripts/scene-art.mjs, which draws the other guide mockups.
export { FONT, INK, RED, L, R, W, text, bar, play, defs, phone, arrow, media, linkIcon, siteHeader };
