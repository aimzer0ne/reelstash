// Renders the site's illustrations to image files:
//   public/assets/illustrations/*.webp      tool and device illustrations, light + dark
//   public/assets/illustrations/og-*.webp   1200 × 630 share images, one per page
//   public/assets/blog/<slug>*.webp          covers for posts that use a drawn cover
//   public/assets/steps/*.webp              three how-to phone mockups per tool
//   public/assets/illustrations/<scene>.webp guide mockups (saving on iPhone, Android, desktop, …)
// Run after changing components/Illustrations.jsx or lib/images.js:
//   node scripts/build-images.mjs
// Or build only some groups (illustrations, og, steps, scenes, blog):
//   node scripts/build-images.mjs blog og
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import sharp from 'sharp';
import { ILLUSTRATIONS, ILLUSTRATION_DIR, OG_SIZE, PAGE_OG, SCENES, STEP_DIR, STEP_TYPES, stepImages } from '../lib/images.js';
import { stepSvgs } from './step-art.mjs';
import { sceneSvgs } from './scene-art.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT = join(ROOT, 'public', ILLUSTRATION_DIR);
const BLOG_OUT = join(ROOT, 'public/assets/blog');
const FONT = 'Helvetica Neue, Helvetica, Arial, sans-serif';
// Every page image is WebP. Lossy at maximum effort beats lossless on these flat
// drawings (about 20% smaller than quality 88, and half the size of lossless).
const WEBP = { quality: 78, alphaQuality: 80, effort: 6, smartSubsample: true };

// Same values as the tokens in src/styles/globals.css.
const THEMES = {
  light: { bg: '#ffffff', paper: '#ffffff', surface: '#f5f5f4', line: '#e9e9e7', text: '#0a0a0b', subtle: '#8e8e93' },
  dark: { bg: '#0a0a0b', paper: '#111113', surface: '#18181b', line: '#242427', text: '#f5f5f6', subtle: '#6c6c73' }
};

async function loadComponents() {
  // Inside node_modules so the bundle can import the project's own react packages.
  mkdirSync(join(ROOT, 'node_modules/.cache'), { recursive: true });
  const dir = mkdtempSync(join(ROOT, 'node_modules/.cache/reelsdl-art-'));
  const outfile = join(dir, 'art.mjs');
  await build({
    stdin: {
      contents: `
        import { renderToStaticMarkup } from 'react-dom/server';
        import { createElement } from 'react';
        import * as art from './components/Illustrations.jsx';
        export function render(name) { return renderToStaticMarkup(createElement(art[name])); }
      `,
      resolveDir: ROOT,
      loader: 'jsx'
    },
    bundle: true,
    format: 'esm',
    platform: 'node',
    packages: 'external',
    jsx: 'automatic',
    outfile,
    logLevel: 'warning'
  });
  const mod = await import(pathToFileURL(outfile).href);
  return { render: mod.render, cleanup: () => rmSync(dir, { recursive: true, force: true }) };
}

// Swap the CSS classes and variables the page uses for fixed colors.
function themed(markup, theme, { width, height } = {}) {
  const c = THEMES[theme];
  const style = `<style>
    .art-bg{fill:${c.surface}} .art-paper{fill:${c.paper}} .art-line{stroke:${c.line}}
    .art-ink{fill:${c.text}} .art-ink-stroke{stroke:${c.text}} .art-muted{fill:${c.subtle}}
  </style>`;
  let svg = markup
    .replaceAll('var(--bg)', c.bg)
    .replaceAll('system-ui, sans-serif', FONT)
    .replace(/<title>.*?<\/title>/, '')
    .replace(/<svg([^>]*)>/, (_, attrs) => `<svg${attrs} xmlns="http://www.w3.org/2000/svg"${width ? ` width="${width}" height="${height}"` : ''}>${style}`);
  return svg;
}

function innerOf(svg) {
  return svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
}

function wrap(text, max) {
  const lines = [];
  for (const word of text.split(' ')) {
    const last = lines[lines.length - 1];
    if (last && `${last} ${word}`.length <= max) lines[lines.length - 1] = `${last} ${word}`;
    else lines.push(word);
  }
  return lines;
}

function ogSvg(og, sceneMarkup) {
  const c = THEMES.light;
  const lines = wrap(og.title, 18);
  const size = Math.max(...lines.map((line) => line.length)) > 15 ? 52 : 60;
  const titleY = 250 - (lines.length - 2) * 34;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_SIZE.width}" height="${OG_SIZE.height}" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="og-ig" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#feda75"/><stop offset=".25" stop-color="#fa7e1e"/><stop offset=".5" stop-color="#d62976"/>
      <stop offset=".75" stop-color="#962fbf"/><stop offset="1" stop-color="#4f5bd5"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#fbfbfa"/>
  <rect x="0" y="0" width="1200" height="8" fill="url(#og-ig)"/>
  <rect x="72" y="72" width="44" height="44" rx="12" fill="${c.text}"/>
  <rect x="84" y="84" width="20" height="20" rx="5" fill="none" stroke="#fff" stroke-width="3"/>
  <text x="132" y="104" font-family="${FONT}" font-size="28" font-weight="700" fill="${c.text}">ReelsDl.net</text>
  ${lines.map((line, i) => `<text x="72" y="${titleY + i * 68}" font-family="${FONT}" font-size="${size}" font-weight="800" letter-spacing="-1.5" fill="${c.text}">${line.replace('&', '&amp;')}</text>`).join('')}
  ${wrap(og.sub, 30).map((line, i) => `<text x="72" y="${titleY + lines.length * 68 + 22 + i * 38}" font-family="${FONT}" font-size="28" fill="#55555a">${line}</text>`).join('')}
  <rect x="72" y="504" width="252" height="54" rx="27" fill="${c.text}"/>
  <text x="198" y="539" text-anchor="middle" font-family="${FONT}" font-size="22" font-weight="700" fill="#fff">Free · No login</text>
  <svg x="610" y="150" width="560" height="300" viewBox="0 0 560 300">${innerOf(sceneMarkup)}</svg>
</svg>`;
}

// --- Blog covers drawn for specific posts (1536 × 1024) ---

const BLOG_DEFS = `<defs>
  <linearGradient id="ig" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#feda75"/><stop offset=".25" stop-color="#fa7e1e"/>
    <stop offset=".5" stop-color="#d62976"/><stop offset=".75" stop-color="#962fbf"/><stop offset="1" stop-color="#4f5bd5"/>
  </linearGradient>
  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbfbfa"/><stop offset="1" stop-color="#efeeec"/></linearGradient>
  <filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#0a0a0b" flood-opacity=".16"/></filter>
</defs>`;

function phone(x, y, w, h, inner) {
  return `<g filter="url(#sh)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * .16}" fill="#0a0a0b"/>
  <rect x="${x + 14}" y="${y + 14}" width="${w - 28}" height="${h - 28}" rx="${w * .13}" fill="#ffffff"/>
  <rect x="${x + w / 2 - 50}" y="${y + 30}" width="100" height="26" rx="13" fill="#0a0a0b"/></g>${inner}`;
}

function arrow(x, y) {
  // A straight line has a zero-height bounding box, so its gradient must use user space.
  return `<linearGradient id="line${x}" gradientUnits="userSpaceOnUse" x1="${x}" y1="0" x2="${x + 210}" y2="0">
    <stop offset="0" stop-color="#fa7e1e"/><stop offset=".5" stop-color="#d62976"/><stop offset="1" stop-color="#4f5bd5"/></linearGradient>
  <g fill="none" stroke="url(#line${x})" stroke-width="22" stroke-linecap="round" stroke-linejoin="round">
    <path d="M${x} ${y}h200"/><path d="M${x + 150} ${y - 56}l56 56-56 56"/></g>`;
}

function check(cx, cy) {
  return `<circle cx="${cx}" cy="${cy}" r="40" fill="#0a0a0b"/><path d="M${cx - 18} ${cy}l12 12 24-26" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function cross(cx, cy) {
  return `<circle cx="${cx}" cy="${cy}" r="40" fill="#e9e9e7"/><path d="M${cx - 15} ${cy - 15}l30 30M${cx + 15} ${cy - 15}l-30 30" fill="none" stroke="#0a0a0b" stroke-width="9" stroke-linecap="round"/>`;
}

// Android-style phone: a punch-hole camera instead of the iPhone's pill.
function android(x, y, w, h, inner) {
  return `<g filter="url(#sh)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * .1}" fill="#0a0a0b"/>
  <rect x="${x + 14}" y="${y + 14}" width="${w - 28}" height="${h - 28}" rx="${w * .08}" fill="#ffffff"/>
  <circle cx="${x + w / 2}" cy="${y + 42}" r="11" fill="#0a0a0b"/></g>${inner}`;
}

function reel(x, y, w, h) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="url(#ig)" opacity=".9"/>
  ${play(x + w / 2, y + h / 2, 58)}
  <circle cx="${x + 46}" cy="${y + h - 52}" r="22" fill="#ffffff" opacity=".9"/>
  <rect x="${x + 80}" y="${y + h - 64}" width="140" height="22" rx="11" fill="#ffffff" opacity=".85"/>`;
}

function play(cx, cy, r) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#0a0a0b" opacity=".88"/><path d="M${cx - r * .3} ${cy - r * .45}v${r * .9}l${r * .75}-${r * .45}z" fill="#fff"/>`;
}

const BLOG_COVERS = {
  'download-instagram-stories-anonymously': `<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024">${BLOG_DEFS}
<rect width="1536" height="1024" fill="url(#bg)"/>
${phone(250, 112, 440, 800, `
  ${[0, 1, 2, 3].map((i) => `<rect x="${300 + i * 88}" y="186" width="78" height="9" rx="4.5" fill="${i ? '#d6d5d2' : '#0a0a0b'}"/>`).join('')}
  <circle cx="330" cy="246" r="28" fill="none" stroke="url(#ig)" stroke-width="7"/><circle cx="330" cy="246" r="19" fill="#e9e9e7"/>
  <rect x="374" y="234" width="150" height="22" rx="11" fill="#c9c8c4"/>
  <rect x="298" y="300" width="344" height="480" rx="30" fill="#f2f1ef"/>
  ${play(470, 540, 62)}
  <rect x="298" y="810" width="344" height="54" rx="27" fill="none" stroke="#e1e0dd" stroke-width="4"/>`)}
${arrow(770, 512)}
<g filter="url(#sh)"><rect x="1050" y="250" width="300" height="524" rx="40" fill="#ffffff"/></g>
${[0, 1, 2].map((i) => `<circle cx="${1118 + i * 82}" cy="350" r="34" fill="none" stroke="url(#ig)" stroke-width="7"/><circle cx="${1118 + i * 82}" cy="350" r="24" fill="#e9e9e7"/>`).join('')}
<rect x="1088" y="430" width="224" height="200" rx="22" fill="#f2f1ef"/>${play(1200, 530, 44)}
<rect x="1088" y="664" width="120" height="58" rx="29" fill="url(#ig)"/>
<text x="1148" y="703" text-anchor="middle" font-family="${FONT}" font-size="30" font-weight="700" fill="#fff">MP4</text>
${check(1278, 693)}
<g transform="translate(1180 160)"><circle r="58" fill="#ffffff" filter="url(#sh)"/><circle r="40" fill="none" stroke="#0a0a0b" stroke-width="7"/><path d="M0 -24v26l16 10" fill="none" stroke="#0a0a0b" stroke-width="7" stroke-linecap="round"/></g>
</svg>`,
  'download-instagram-videos-on-iphone': `<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024">${BLOG_DEFS}
<rect width="1536" height="1024" fill="url(#bg)"/>
${phone(200, 112, 440, 800, `
  <circle cx="290" cy="216" r="24" fill="url(#ig)"/><rect x="328" y="204" width="170" height="24" rx="12" fill="#c9c8c4"/>
  <rect x="214" y="266" width="412" height="412" fill="#f2f1ef"/>${play(420, 472, 66)}
  <rect x="250" y="712" width="240" height="22" rx="11" fill="#c9c8c4"/><rect x="250" y="752" width="320" height="22" rx="11" fill="#e1e0dd"/>`)}
${arrow(700, 512)}
${phone(960, 112, 440, 800, `
  <rect x="1010" y="196" width="340" height="56" rx="28" fill="#f2f1ef"/>
  <text x="1040" y="233" font-family="${FONT}" font-size="26" font-weight="600" fill="#0a0a0b">Photos</text>
  ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
    const x = 1010 + (i % 3) * 116;
    const y = 290 + Math.floor(i / 3) * 150;
    return i === 4
      ? `<rect x="${x}" y="${y}" width="104" height="138" rx="14" fill="url(#ig)"/>${play(x + 52, y + 69, 26)}`
      : `<rect x="${x}" y="${y}" width="104" height="138" rx="14" fill="#ecebe8"/>`;
  }).join('')}
  ${check(1180, 800)}`)}
</svg>`,
  'download-instagram-videos-on-android': `<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024">${BLOG_DEFS}
<rect width="1536" height="1024" fill="url(#bg)"/>
${android(200, 112, 440, 800, reel(240, 190, 360, 640))}
${arrow(700, 512)}
${android(960, 112, 440, 800, `
  <text x="1010" y="230" font-family="${FONT}" font-size="30" font-weight="700" fill="#0a0a0b">Gallery</text>
  <rect x="1010" y="262" width="164" height="164" rx="18" fill="url(#ig)"/>${play(1092, 344, 30)}
  <rect x="1186" y="262" width="164" height="164" rx="18" fill="#ecebe8"/>
  <rect x="1010" y="438" width="164" height="164" rx="18" fill="#ecebe8"/>
  <rect x="1186" y="438" width="164" height="164" rx="18" fill="#ecebe8"/>
  <path d="M1010 650h70l18 20h234a18 18 0 0 1 18 18v70a18 18 0 0 1-18 18H1028a18 18 0 0 1-18-18z" fill="#f2f1ef"/>
  <text x="1040" y="728" font-family="${FONT}" font-size="28" font-weight="600" fill="#0a0a0b">Download</text>
  ${check(1300, 718)}`)}
</svg>`,
  'is-it-legal-to-download-instagram-reels': `<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024">${BLOG_DEFS}
<rect width="1536" height="1024" fill="url(#bg)"/>
${phone(180, 112, 440, 800, reel(220, 190, 360, 640))}
<g filter="url(#sh)"><rect x="720" y="236" width="660" height="552" rx="40" fill="#ffffff"/></g>
${check(810, 346)}<text x="878" y="358" font-family="${FONT}" font-size="36" font-weight="700" fill="#0a0a0b">Watch offline</text>
${check(810, 512)}<text x="878" y="524" font-family="${FONT}" font-size="36" font-weight="700" fill="#0a0a0b">Save your own Reels</text>
${cross(810, 678)}<text x="878" y="690" font-family="${FONT}" font-size="36" font-weight="700" fill="#0a0a0b">Repost without asking</text>
<rect x="760" y="420" width="580" height="4" rx="2" fill="#efeeec"/><rect x="760" y="586" width="580" height="4" rx="2" fill="#efeeec"/>
</svg>`,
  'download-instagram-reels-in-hd': `<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024">${BLOG_DEFS}
<rect width="1536" height="1024" fill="url(#bg)"/>
${phone(200, 112, 440, 800, `
  ${Array.from({ length: 42 }, (_, i) => {
    const col = i % 6;
    const row = Math.floor(i / 6);
    const tone = ['#d9d7d3', '#c9c6c1', '#e4e2de', '#bdb9b3'][(col * 3 + row * 5) % 4];
    return `<rect x="${240 + col * 60}" y="${190 + row * 83}" width="60" height="83" fill="${tone}"/>`;
  }).join('')}
  <rect x="300" y="790" width="240" height="58" rx="29" fill="#ffffff" stroke="#e1e0dd" stroke-width="4"/>
  <text x="420" y="829" text-anchor="middle" font-family="${FONT}" font-size="26" font-weight="700" fill="#8e8e93">Blurry</text>`)}
${arrow(700, 512)}
${phone(960, 112, 440, 800, `
  ${reel(1000, 190, 360, 580)}
  <rect x="1060" y="790" width="240" height="58" rx="29" fill="#0a0a0b"/>
  <text x="1180" y="829" text-anchor="middle" font-family="${FONT}" font-size="28" font-weight="800" fill="#ffffff">HD MP4</text>`)}
</svg>`
};

// --- Output ---

mkdirSync(OUT, { recursive: true });
mkdirSync(BLOG_OUT, { recursive: true });
mkdirSync(join(ROOT, 'public', STEP_DIR), { recursive: true });
const { render, cleanup } = await loadComponents();
const GROUPS = process.argv.slice(2);
const want = (group) => !GROUPS.length || GROUPS.includes(group);

try {
  for (const [key, item] of want('illustrations') ? Object.entries(ILLUSTRATIONS) : []) {
    const markup = render(item.component);
    for (const theme of ['light', 'dark']) {
      const svg = themed(markup, theme, item);
      const name = `${item.file}${theme === 'dark' ? '-dark' : ''}.webp`;
      await sharp(Buffer.from(svg)).webp(WEBP).toFile(join(OUT, name));
    }
    console.log('illustration', key);
  }

  for (const [path, og] of want('og') ? Object.entries(PAGE_OG) : []) {
    const scene = themed(render(ILLUSTRATIONS[og.art].component), 'light');
    await sharp(Buffer.from(ogSvg(og, scene))).webp(WEBP).toFile(join(OUT, `${og.file}.webp`));
    console.log('og', path);
  }

  for (const type of want('steps') ? Object.keys(STEP_TYPES) : []) {
    const files = stepImages(type);
    const svgs = stepSvgs(type);
    for (let i = 0; i < svgs.length; i += 1) {
      await sharp(Buffer.from(svgs[i])).webp(WEBP).toFile(join(ROOT, 'public', files[i].src));
    }
    console.log('steps', type);
  }

  for (const [key, svg] of want('scenes') ? sceneSvgs() : []) {
    await sharp(Buffer.from(svg)).webp(WEBP).toFile(join(OUT, `${SCENES[key].file}.webp`));
    console.log('scene', key);
  }

  for (const [slug, svg] of want('blog') ? Object.entries(BLOG_COVERS) : []) {
    const buf = Buffer.from(svg);
    await sharp(buf).webp(WEBP).toFile(join(BLOG_OUT, `${slug}.webp`));
    await sharp(buf).resize(720).webp(WEBP).toFile(join(BLOG_OUT, `${slug}-720.webp`));
    await sharp(buf).resize(OG_SIZE.width, OG_SIZE.height, { fit: 'cover' }).webp(WEBP).toFile(join(BLOG_OUT, `${slug}-og.webp`));
    console.log('blog cover', slug);
  }
} finally {
  cleanup();
}
