// Guide mockups beyond the three how-to steps: where a download goes on iPhone,
// Android, and desktop, the carousel result, and the watermark comparison.
// Same drawing kit as step-art.mjs, so every mockup on the site matches.
import { SCENES } from '../lib/images.js';
import { FONT, INK, RED, L, W, text, bar, play, defs, phone, arrow, media, siteHeader } from './step-art.mjs';

const BLUE = '#0a84ff';

function svg(width, height, viewW, viewH, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${viewW} ${viewH}">${defs()}${inner}</svg>`;
}

function ring(x, y, w, h, rx = 10) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="none" stroke="${RED}" stroke-width="2.5"/>`;
}

function statusBar(fill = INK) {
  return text(40, 40, '9:41', { size: 10, weight: 700, fill });
}

function fileIcon(x, y, kind) {
  if (kind === 'video') return media('reel', x, y, 40, 40).replace(/r="1\d(\.\d+)?"/, 'r="10"');
  const label = kind === 'photo' ? 'JPG' : 'MP3';
  const fill = kind === 'photo' ? '#5d8c72' : '#962fbf';
  return `<rect x="${x}" y="${y}" width="40" height="40" rx="8" fill="${fill}"/>
    ${text(x + 20, y + 24, label, { size: 9, weight: 700, fill: '#fff', anchor: 'middle' })}`;
}

// --- iPhone ---

function iphoneSafariDownload() {
  return phone(`${statusBar()}
    ${siteHeader({ tab: 'Video & Reels' })}
    ${media('reel', 46, 130, 208, 150)}
    <rect x="46" y="292" width="208" height="34" rx="9" fill="${INK}"/>
    ${text(150, 314, 'Download video', { size: 11.5, weight: 700, fill: '#fff', anchor: 'middle' })}
    <rect x="${L}" y="20" width="${W}" height="420" fill="#000" opacity=".4"/>
    <rect x="48" y="176" width="204" height="124" rx="14" fill="#f2f2f7"/>
    ${text(150, 204, 'Do you want to download', { size: 11, weight: 700, anchor: 'middle' })}
    ${text(150, 220, '“instagram-reel.mp4”?', { size: 11, weight: 700, anchor: 'middle' })}
    ${text(150, 240, '2.4 MB', { size: 9.5, fill: '#6b6b70', anchor: 'middle' })}
    <path d="M48 256h204M150 256v44" stroke="#d1d1d6" stroke-width="1"/>
    ${text(99, 283, 'View', { size: 12, fill: BLUE, anchor: 'middle' })}
    ${text(201, 283, 'Download', { size: 12, weight: 700, fill: BLUE, anchor: 'middle' })}
    ${ring(158, 262, 86, 32, 8)}
    ${arrow('M232 374C254 352 246 318 216 300')}
    <rect x="44" y="404" width="212" height="26" rx="13" fill="#f2f2f7"/>
    ${text(150, 421, 'reelsdl.net', { size: 10, weight: 600, fill: '#3a3a3c', anchor: 'middle' })}`);
}

function iphoneFilesDownloads() {
  const rows = [
    ['video', 'instagram-reel.mp4', 'Today, 9:41 · 2.4 MB'],
    ['photo', 'instagram-photo.jpg', 'Yesterday · 310 KB'],
    ['audio', 'reel-audio.mp3', 'Oct 20 · 1.1 MB']
  ];
  return phone(`${statusBar()}
    ${text(36, 72, '‹ Browse', { size: 12, fill: BLUE })}
    ${text(36, 106, 'Downloads', { size: 24, weight: 800 })}
    <rect x="36" y="118" width="228" height="26" rx="8" fill="#ececf0"/>
    ${text(50, 135, 'Search', { size: 10, fill: '#8e8e93' })}
    ${rows.map(([kind, name, meta], i) => {
      const y = 160 + i * 60;
      return `${fileIcon(36, y, kind)}
        ${text(88, y + 17, name, { size: 11, weight: 600 })}
        ${text(88, y + 32, meta, { size: 9, fill: '#8e8e93' })}
        <path d="M88 ${y + 50}h176" stroke="#ececf0" stroke-width="1"/>`;
    }).join('')}
    ${ring(30, 154, 240, 52, 10)}
    ${arrow('M236 300C262 276 260 236 248 212')}`);
}

function iphoneSaveVideo() {
  const actions = ['Copy', 'Save Video', 'Save to Files', 'Add to Album'];
  return phone(`${media('reel', L, 20, W, 420)}
    <rect x="${L}" y="20" width="${W}" height="420" fill="#000" opacity=".45"/>
    <rect x="${L}" y="120" width="${W}" height="340" rx="20" fill="#f2f2f7"/>
    ${media('reel', 38, 136, 36, 36)}
    ${text(84, 151, 'instagram-reel.mp4', { size: 11, weight: 700 })}
    ${text(84, 166, 'Video · 2.4 MB', { size: 9, fill: '#8e8e93' })}
    <circle cx="252" cy="152" r="11" fill="#e3e3e8"/>${text(252, 156, '×', { size: 13, fill: '#6b6b70', anchor: 'middle' })}
    ${['Nearby', 'Messages', 'Mail', 'Notes'].map((label, i) => `<circle cx="${62 + i * 58}" cy="208" r="20" fill="#fff"/>${text(62 + i * 58, 243, label, { size: 8.5, fill: '#3a3a3c', anchor: 'middle' })}`).join('')}
    <rect x="36" y="262" width="228" height="148" rx="12" fill="#fff"/>
    ${actions.map((label, i) => {
      const y = 262 + i * 37;
      return `${text(50, y + 23, label, { size: 11.5, weight: label === 'Save Video' ? 700 : 400 })}
        <rect x="236" y="${y + 11}" width="14" height="14" rx="3" fill="none" stroke="${INK}" stroke-width="1.5"/>
        ${i ? `<path d="M50 ${y}h214" stroke="#ececf0" stroke-width="1"/>` : ''}`;
    }).join('')}
    ${ring(40, 301, 220, 33, 8)}`);
}

// --- Android ---

function androidDownloaded() {
  return phone(`${statusBar()}
    ${siteHeader({ tab: 'Video & Reels' })}
    <rect x="34" y="122" width="232" height="240" rx="16" fill="#fff" stroke="#e4e4e7" stroke-width="1.5"/>
    ${media('reel', 46, 136, 208, 160)}
    <rect x="46" y="310" width="208" height="36" rx="9" fill="${INK}"/>
    ${text(150, 333, 'Download video', { size: 12, weight: 700, fill: '#fff', anchor: 'middle' })}
    <rect x="34" y="378" width="232" height="44" rx="10" fill="#303134"/>
    <path d="M50 392v10m-4-4 4 4 4-4m-8 7h8" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    ${text(66, 404, 'instagram-reel.mp4 downloaded', { size: 9.5, fill: '#fff' })}
    ${text(243, 404, 'Open', { size: 11, weight: 700, fill: '#8ab4f8', anchor: 'middle' })}
    ${ring(222, 386, 42, 28, 8)}
    ${arrow('M168 362C198 360 222 366 234 382')}`);
}

function androidGallery() {
  const tiles = [['Camera', '1,204', 'photo'], ['Download', '3', 'reel'], ['Screenshots', '86', 'story'], ['Instagram', '52', 'video']];
  return phone(`${statusBar()}
    ${text(36, 92, 'Albums', { size: 22, weight: 800 })}
    ${tiles.map(([label, count, kind], i) => {
      const x = 36 + (i % 2) * 118;
      const y = 110 + Math.floor(i / 2) * 150;
      return `${media(kind, x, y, 110, 110)}
        ${text(x, y + 126, label, { size: 11, weight: 700 })}
        ${text(x, y + 140, count, { size: 9, fill: '#8e8e93' })}`;
    }).join('')}
    ${ring(149, 104, 122, 146, 12)}`);
}

// --- Photo carousel result ---

function carouselResults() {
  const slides = [['photo', 'Download photo'], ['story', 'Download photo'], ['video', 'Download photo'], ['reel', 'Download video']];
  return phone(`${statusBar()}
    ${siteHeader({ tab: 'Photo' })}
    <rect x="34" y="122" width="232" height="306" rx="16" fill="#fff" stroke="#e4e4e7" stroke-width="1.5"/>
    <circle cx="56" cy="144" r="11" fill="${INK}"/>${text(56, 148, 'R', { size: 10, weight: 700, fill: '#fff', anchor: 'middle' })}
    ${bar(74, 137, 74, 7, '#2a2a2e')}
    ${text(74, 156, '4 items ready', { size: 9, weight: 600, fill: '#6b6b70' })}
    ${slides.map(([kind, label], i) => {
      const x = 46 + (i % 2) * 108;
      const y = 170 + Math.floor(i / 2) * 124;
      return `${media(kind, x, y, 100, 84)}
        <rect x="${x}" y="${y + 90}" width="100" height="22" rx="6" fill="${INK}"/>
        ${text(x + 50, y + 104.5, label, { size: 8.5, weight: 700, fill: '#fff', anchor: 'middle' })}`;
    }).join('')}
    ${ring(150, 380, 108, 30, 8)}`);
}

// --- Wide scenes ---

function desktopDownloads() {
  return svg(1200, 800, 600, 400, `
    <g filter="url(#sh)"><rect x="30" y="26" width="540" height="348" rx="14" fill="#fff" stroke="#dedde2" stroke-width="1.5"/></g>
    <path d="M30 40a14 14 0 0 1 14-14h512a14 14 0 0 1 14 14v26H30z" fill="#f2f2f4"/>
    <circle cx="48" cy="46" r="5" fill="#ff5f57"/><circle cx="64" cy="46" r="5" fill="#febc2e"/><circle cx="80" cy="46" r="5" fill="#28c840"/>
    <rect x="160" y="35" width="250" height="22" rx="11" fill="#fff"/>
    ${text(285, 50, 'reelsdl.net', { size: 10, fill: '#3a3a3c', anchor: 'middle' })}
    <circle cx="538" cy="46" r="11" fill="#fff"/>
    <path d="M538 40v9m-4-3.5 4 4 4-4m-8 6h8" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    ${text(190, 104, 'Instagram Video &amp; Reels Downloader', { size: 17, weight: 800, anchor: 'middle' })}
    <rect x="70" y="122" width="240" height="34" rx="8" fill="#fff" stroke="#cfcfd4" stroke-width="1.2"/>
    ${text(84, 143, 'Paste an Instagram URL', { size: 9.5, fill: '#9a9aa0' })}
    <rect x="262" y="127" width="42" height="24" rx="6" fill="${INK}"/>${text(283, 143, 'Paste', { size: 9, weight: 700, fill: '#fff', anchor: 'middle' })}
    <rect x="70" y="172" width="240" height="186" rx="12" fill="#fff" stroke="#e4e4e7" stroke-width="1.2"/>
    ${media('reel', 82, 184, 216, 120)}
    <rect x="82" y="314" width="216" height="32" rx="8" fill="${INK}"/>
    ${text(190, 334, 'Download video', { size: 11, weight: 700, fill: '#fff', anchor: 'middle' })}
    <g filter="url(#sh)"><rect x="344" y="70" width="210" height="122" rx="12" fill="#fff" stroke="#e4e4e7" stroke-width="1"/></g>
    ${text(358, 92, 'Recent downloads', { size: 10.5, weight: 700 })}
    ${fileIcon(358, 104, 'video')}
    ${text(406, 121, 'instagram-reel.mp4', { size: 10.5, weight: 600 })}
    ${text(406, 136, '2.4 MB · Done', { size: 9, fill: '#8e8e93' })}
    <path d="M358 156h182" stroke="#ececf0" stroke-width="1"/>
    <path d="M360 168h6l2 2h8v8h-16z" fill="none" stroke="#3a3a3c" stroke-width="1.3" stroke-linejoin="round"/>
    ${text(382, 178, 'Show in folder', { size: 9.5, fill: '#3a3a3c' })}
    ${ring(352, 100, 194, 48, 9)}
    ${arrow('M302 330C332 300 326 150 346 126')}`);
}

function miniPhone(x, inner) {
  return `<g transform="translate(${x} 14) scale(.72)">${phone(inner)}</g>`;
}

function watermarkCompare() {
  const reel = `${media('reel', L, 20, W, 420)}
    ${bar(40, 396, 110, 8, '#fff')}
    ${bar(40, 412, 74, 6, 'rgba(255,255,255,.7)')}`;
  const watermark = `
    <g opacity=".92">
      <rect x="44" y="74" width="122" height="34" rx="10" fill="#000" opacity=".35"/>
      <rect x="54" y="81" width="20" height="20" rx="6" fill="none" stroke="#fff" stroke-width="2.2"/>
      <circle cx="64" cy="91" r="4.5" fill="none" stroke="#fff" stroke-width="2.2"/>
      ${text(82, 96, '@creator', { size: 12, weight: 700, fill: '#fff' })}
    </g>
    <g opacity=".85">
      <rect x="150" y="300" width="106" height="28" rx="9" fill="#000" opacity=".35"/>
      <rect x="158" y="306" width="16" height="16" rx="5" fill="none" stroke="#fff" stroke-width="2"/>
      <circle cx="166" cy="314" r="3.6" fill="none" stroke="#fff" stroke-width="2"/>
      ${text(180, 318, '@creator', { size: 10, weight: 700, fill: '#fff' })}
    </g>`;
  const label = (cx, ok, title) => `
    <circle cx="${cx - 74}" cy="372" r="11" fill="${ok ? '#1f9d55' : RED}"/>
    ${ok
      ? `<path d="M${cx - 79} 372l4 4 7-8" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`
      : `<path d="M${cx - 78} 368l8 8m0-8-8 8" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`}
    ${text(cx - 56, 377, title, { size: 14, weight: 700 })}`;
  return svg(1200, 800, 600, 400, `
    ${miniPhone(52, reel + watermark)}
    ${miniPhone(332, reel)}
    ${label(160, false, 'In-app Download')}
    ${label(440, true, 'Saved by link')}`);
}

const DRAW = {
  iphoneSafariDownload: () => svg(600, 920, 300, 460, iphoneSafariDownload()),
  iphoneFilesDownloads: () => svg(600, 920, 300, 460, iphoneFilesDownloads()),
  iphoneSaveVideo: () => svg(600, 920, 300, 460, iphoneSaveVideo()),
  androidDownloaded: () => svg(600, 920, 300, 460, androidDownloaded()),
  androidGallery: () => svg(600, 920, 300, 460, androidGallery()),
  carouselResults: () => svg(600, 920, 300, 460, carouselResults()),
  desktopDownloads,
  watermarkCompare
};

export function sceneSvgs() {
  return Object.keys(SCENES).map((key) => [key, DRAW[key]()]);
}
