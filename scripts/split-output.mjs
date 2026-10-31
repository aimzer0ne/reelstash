// Runs after `astro build`. The build holds both halves of the site; this separates them:
//   dist/client     every prerendered page and asset, deployed to Cloudflare (wrangler.toml)
//   .vercel/output  only the /api/* function, deployed to Vercel (get.reelsdl.net)
import { readFileSync, rmSync, mkdirSync, writeFileSync } from 'node:fs';
import { REDIRECTS } from '../lib/redirects.mjs';

const SITE_ORIGIN = 'https://reelsdl.net';
const VERCEL_OUTPUT = new URL('../.vercel/output/', import.meta.url);
const VERCEL_STATIC = new URL('static/', VERCEL_OUTPUT);
const VERCEL_CONFIG = new URL('config.json', VERCEL_OUTPUT);

writeFileSync(
  new URL('../dist/client/_redirects', import.meta.url),
  `${Object.entries(REDIRECTS).map(([from, to]) => `${from} ${to} 301`).join('\n')}\n`
);

rmSync(VERCEL_STATIC, { recursive: true, force: true });
mkdirSync(VERCEL_STATIC);
// Crawling is allowed (except /api/) so Google can see the 301s to reelsdl.net.
writeFileSync(new URL('robots.txt', VERCEL_STATIC), 'User-agent: *\nDisallow: /api/\n');

// Everything except the API moves to the website, so no other hostname serves a duplicate site.
const config = JSON.parse(readFileSync(VERCEL_CONFIG, 'utf8'));
config.routes.unshift({
  src: '^/(?!api/(?:resolve|download|health)$|robots\\.txt$)(.*)$',
  headers: { Location: `${SITE_ORIGIN}/$1` },
  status: 301
});
writeFileSync(VERCEL_CONFIG, JSON.stringify(config, null, 2));
