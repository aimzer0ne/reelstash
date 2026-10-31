# ReelsDl.net

An Astro app for saving media from publicly accessible Instagram reels, photo posts, and public carousels. It never signs into Instagram and does not attempt to access private, login-gated, deleted, or otherwise unavailable content.

Media is resolved in two tiers, fastest first:

1. **Direct GraphQL** — what instagram.com itself does for a logged-out visitor: one page GET to pick up the anonymous session (LSD token + first-visit cookies, cached for 10 minutes), then one `POST` to the web GraphQL API keyed by the post's media id. Typically 1–2s.
2. **Public HTML / embed metadata** — used when Instagram still inlines post JSON into the page.

The `/api/resolve` response includes a `source` field (`graphql` or `html`). Video downloads stream the direct MP4.

Instagram occasionally rotates the GraphQL query id. If the server log starts showing `graphql fast path unavailable … soft-deleted` / `execution error`, set `INSTAGRAM_GRAPHQL_DOC_IDS` to the current `PolarisLoggedOutDesktopWWWPostRootContentQuery` doc id.

## Run locally

```bash
npm install
npm run dev
```

Then visit [http://localhost:4321](http://localhost:4321). Set a long random `DOWNLOAD_TOKEN_SECRET` for any deployment; it signs the short-lived download URLs.

## Deploy

Everything runs on one Cloudflare Worker. `npm run deploy` builds the site and deploys it with the API.

Set the signing secret once with `npx wrangler secret put DOWNLOAD_TOKEN_SECRET` (a long random string). Locally the API uses a development value.

After a production deploy, run `node scripts/indexnow.mjs` to tell Bing and the other IndexNow engines which pages changed (pass paths such as `/blog/new-post` to submit only those). The key file is `public/<key>.txt`.

There is a dedicated Instagram audio page at `/audio` that extracts MP3 soundtracks from public reels or downloads direct audio streams when available.

## Domains

`https://reelsdl.net` serves the website and the API (`/api/resolve`, `/api/download`, `/api/health`) from the Cloudflare Worker `worker.js`, on the routes `reelsdl.net/*` and `www.reelsdl.net/*`. `www` answers with a 301 to the same path on `https://reelsdl.net`.

The API only accepts calls from the website: locked origin checks, a required `x-reelsdl-client` header, JSON-only resolve bodies, and HMAC download tickets. API responses carry `X-Robots-Tag: noindex`.

## Project layout

| Path | Role |
|------|------|
| `src/pages/` | Astro pages, `404`, `robots.txt`, `sitemap.xml` |
| `src/layouts/` | `Base.astro` (head and meta tags); `ToolPage.astro` and `InfoPage.astro` assemble each page |
| `components/` | Shared UI. Only `Header` and `Downloader` hydrate; page bodies (`ToolBody`, `InfoBody`) are static HTML |
| `lib/site.jsx` | Page copy, SEO, and FAQ |
| `lib/nav.js` | Header tabs and footer links |
| `lib/reelstash.js` | Resolve/download logic (GraphQL, HTML) |
| `lib/api-guard.js` | API host/origin/cookie checks |
| `lib/redirects.mjs` | Old URL → current URL (301s) |
| `worker.js` | Cloudflare Worker: serves the static site, runs the API, sets security headers |
| `public/_headers` | Cache rules for static assets |
| `scripts/` | `write-redirects.mjs` (writes the 301s for Cloudflare), `build-images.mjs` (illustrations, share cards, blog covers), `indexnow.mjs` |

## How it works

1. The browser sends an Instagram URL to `POST /api/resolve` (optional `mode: "audio"` on the audio page).
2. The server validates the URL, resolves media (GraphQL → HTML), and returns signed download links.
3. `GET /api/download` streams photos, videos, and audio. MP3s are converted in the visitor's browser (`components/mp3.js`).
