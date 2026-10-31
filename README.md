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

The website and the API deploy separately, and `npm run deploy` does both:

- **Website** (`npx wrangler deploy`): prerendered pages and assets from `dist/client`, served by Cloudflare. Deploy it after any change to a page, its copy, or its styles.
- **API** (`vercel --prod`): the `/api/*` function on Vercel. Deploy it after any change to `lib/reelstash.js` or the API guards. Its project settings need:
  - `DOWNLOAD_TOKEN_SECRET` — long random string that signs download tickets
  - `SITE_URL=https://reelsdl.net`
  - `NEXT_PUBLIC_API_URL=https://get.reelsdl.net`

After a production deploy, run `node scripts/indexnow.mjs` to tell Bing and the other IndexNow engines which pages changed (pass paths such as `/blog/new-post` to submit only those). The key file is `public/<key>.txt`.

There is a dedicated Instagram audio page at `/audio` that extracts MP3 soundtracks from public reels (ffmpeg) or downloads direct audio streams when available.

## Domains

| Host | Role |
|------|------|
| `https://reelsdl.net` | Public website (Cloudflare Worker + static assets) |
| `https://get.reelsdl.net` | API only (`/api/resolve`, `/api/download`, `/api/health`) on Vercel |

- **reelsdl.net** — Cloudflare Worker route `reelsdl.net/*` (and `www.reelsdl.net/*`). Pages are prerendered once per language: English at the public URL, the others under the internal `/i18n/<id>` folders. The Worker picks the language from the `reelsdl_lang` cookie or `Accept-Language` and serves that copy at the same URL.
- **get.reelsdl.net** — added as a domain on the Vercel project. Cloudflare DNS: **CNAME** `get` → `cname.vercel-dns.com`, **DNS only** (grey cloud).

Duplicate-content protection — every non-canonical host answers with a **301 to the same path on `https://reelsdl.net`**:

- `get.reelsdl.net/*` except the three API paths (its `robots.txt` only blocks `/api/`, so Google can see the redirects)
- `www.reelsdl.net/*`
- the `*.vercel.app` hostnames

The API only accepts traffic on `get.reelsdl.net` and only from `https://reelsdl.net`: locked CORS, a required `x-reelsdl-client` header, JSON-only resolve bodies, and HMAC download tickets. API responses carry `X-Robots-Tag: noindex`.

## Project layout

| Path | Role |
|------|------|
| `src/pages/` | Astro pages (`[...locale]/` builds each page in every language), `/api/*` endpoints, `404`, `robots.txt`, `sitemap.xml` |
| `src/layouts/` | `Base.astro` (head and meta tags); `ToolPage.astro` and `InfoPage.astro` assemble each page |
| `src/middleware.js` | API host routing and headers; language routing under `astro dev` |
| `components/` | Shared UI. Only `HeaderIsland` and `DownloaderIsland` hydrate; page bodies (`ToolBody`, `InfoBody`) are static HTML |
| `lib/site.jsx` | Page copy, SEO, and FAQ |
| `lib/nav.js` | Header tabs and footer links |
| `lib/messages.js` | UI strings in 31 languages; pages pass one language to the islands |
| `lib/reelstash.js` | Resolve/download logic (GraphQL, HTML, ffmpeg) |
| `lib/api-guard.js` | API host/origin/cookie checks |
| `lib/redirects.mjs` | Old URL → current URL (301s) |
| `worker.js` | Cloudflare Worker: serves the static site, picks the language, sets security headers |
| `public/_headers` | Cache rules for static assets |
| `scripts/` | `split-output.mjs` (separates the Cloudflare and Vercel builds), `build-images.mjs` (illustrations, share cards, blog covers), `indexnow.mjs` |

## How it works

1. The browser sends an Instagram URL to `POST /api/resolve` (optional `mode: "audio"` on the audio page).
2. The server validates the URL, resolves media (GraphQL → HTML), and returns signed download links.
3. `GET /api/download` streams photos/videos or extracts MP3 audio with ffmpeg when needed.
