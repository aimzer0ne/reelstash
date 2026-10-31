// Runs after `astro build`: writes the old-URL 301s where Cloudflare reads them.
import { writeFileSync } from 'node:fs';
import { REDIRECTS } from '../lib/redirects.mjs';

writeFileSync(
  new URL('../dist/_redirects', import.meta.url),
  `${Object.entries(REDIRECTS).map(([from, to]) => `${from} ${to} 301`).join('\n')}\n`
);
