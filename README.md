# ReelsDl.net

A Next.js app for saving media from publicly accessible Instagram reels, photo posts, and public carousels. It never signs into Instagram and does not attempt to access private, login-gated, deleted, or otherwise unavailable content.

Media is resolved in three tiers, fastest first:

1. **Direct GraphQL** — what instagram.com itself does for a logged-out visitor: one page GET to pick up the anonymous session (LSD token + first-visit cookies, cached for 10 minutes), then one `POST` to the web GraphQL API keyed by the post's media id. Typically 1–2s, versus 10–15s for yt-dlp.
2. **Public HTML / embed metadata** — used when Instagram still inlines post JSON into the page.
3. **`yt-dlp` backup** — spawns [`yt-dlp`](https://github.com/yt-dlp/yt-dlp) and muxes audio + video with `ffmpeg`. `npm install` downloads a platform-specific binary into `vendor/` (also used on Vercel).

The `/api/resolve` response includes a `source` field (`graphql`, `html`, or `yt-dlp`). Video downloads stream the direct MP4 when one is available and only fall back to yt-dlp muxing if that fails.

Instagram occasionally rotates the GraphQL query id. If the server log starts showing `graphql fast path unavailable … soft-deleted` / `execution error`, set `INSTAGRAM_GRAPHQL_DOC_IDS` to the current `PolarisLoggedOutDesktopWWWPostRootContentQuery` doc id.

## Run locally

```bash
npm install
npm run dev
```

Then visit [http://localhost:3000](http://localhost:3000). Set a long random `DOWNLOAD_TOKEN_SECRET` for any deployment; it signs the short-lived download URLs.

## Deploy on Vercel

1. Install the [Vercel CLI](https://vercel.com/docs/cli) and log in.
2. From this folder: `vercel` for a preview, or `vercel --prod` for production.
3. In the Vercel project settings add:
   - `DOWNLOAD_TOKEN_SECRET` — long random string that signs download tickets
   - `SITE_URL=https://reelsdl.net`
   - `NEXT_PUBLIC_API_URL=https://get.reelsdl.net`

The deploy bundles `vendor/yt-dlp` into the serverless functions. Video downloads can take up to 60 seconds while yt-dlp merges audio and video.

There is a dedicated Instagram audio page at `/instagram-audio-downloader` that extracts MP3 soundtracks from public reels (ffmpeg) or downloads direct audio streams when available.

## Domains

| Host | Role |
|------|------|
| `https://reelsdl.net` | Public website (Cloudflare Worker → Vercel) |
| `https://get.reelsdl.net` | API only (`/api/resolve`, `/api/download`, `/api/health`) |

Add `get.reelsdl.net` as a domain on the same Vercel project. In Cloudflare DNS create a **CNAME** `get` → `cname.vercel-dns.com` and leave the proxy **DNS only** (grey cloud) so API traffic hits Vercel directly.

The API only accepts traffic on `get.reelsdl.net` and only from `https://reelsdl.net`: locked CORS, a signed `__Secure-` site cookie, a required `x-reelsdl-client` header, JSON-only resolve bodies, and HMAC download tickets scoped to this API. Other websites, the Vercel hostname, and raw `curl` calls are rejected. Health does not expose internals.

Cloudflare Workers cannot run `yt-dlp`/ffmpeg. The included Worker proxies the public site to the Vercel origin. Keep `API_ORIGIN` in **Cloudflare → Workers & Pages → reelsdl → Settings → Variables and Secrets** as the Vercel URL (`https://reelstash-three.vercel.app`), never `https://reelsdl.net` (that loops). If `get.reelsdl.net` is accidentally routed through the Worker, non-`/api` paths redirect to the site.

Do not set `INSTAGRAM_COOKIES_FROM_BROWSER` on Vercel. If Instagram blocks anonymous extraction, you can store Netscape-format cookies in the `INSTAGRAM_COOKIES` environment variable on a private deployment only.

## When Instagram requires a session

```bash
INSTAGRAM_COOKIES_FROM_BROWSER=chrome npm run dev
```

Or point it at your own Netscape-format cookie file:

```bash
INSTAGRAM_COOKIES_FILE=/absolute/path/to/instagram-cookies.txt npm run dev
```

This is intended for a personal computer only. Never set either option on a shared or public deployment.

## Project layout

| Path | Role |
|------|------|
| `app/` | Next.js App Router: shared layout, pages, `/api/*` route handlers, `robots.js` |
| `components/` | Shared UI (`DownloadPage`, `Downloader`, header, footer, FAQ) |
| `lib/site.js` | Page copy, SEO, and FAQ — the only per-page differences |
| `lib/reelstash.js` | Resolve/download logic (GraphQL, HTML, yt-dlp, ffmpeg) |
| `worker.js` | Cloudflare reverse proxy to the Vercel Next.js app |

Both `/` and `/instagram-audio-downloader` render the same `DownloadPage`. Only the config in `lib/site.js` changes.

## How it works

1. The browser sends an Instagram URL to `POST /api/resolve` (optional `mode: "audio"` on the audio page).
2. The server validates the URL, resolves media (GraphQL → HTML → yt-dlp), and returns signed download links.
3. `GET /api/download` streams photos/videos or extracts MP3 audio with ffmpeg when needed.
