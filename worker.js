// Cloudflare Worker for https://reelsdl.net: serves the prerendered site from Workers
// Static Assets, choosing each page's language per request. No request reaches Vercel.
// The API lives on https://get.reelsdl.net, which points at Vercel directly (DNS only).
import { isPagePath, LOCALE_PREFIX, localizedPath, requestLocale } from './lib/i18n.js';
import { SITE_SECURITY_HEADERS, applyHeaders } from './lib/security.js';

const SITE_HOST = 'reelsdl.net';
const SITE_ORIGIN = `https://${SITE_HOST}`;

export default {
  async fetch(request, env) {
    const incoming = new URL(request.url);

    // www, get.reelsdl.net (if ever routed here) and any other host → canonical site, same path.
    if (incoming.hostname.toLowerCase() !== SITE_HOST || incoming.protocol !== 'https:') {
      return new Response(null, {
        status: 301,
        headers: { location: `${SITE_ORIGIN}${incoming.pathname}${incoming.search}` }
      });
    }

    if (incoming.pathname.startsWith('/api/')) {
      return Response.json({ error: 'Use https://get.reelsdl.net' }, {
        status: 404,
        headers: { 'x-robots-tag': 'noindex', 'cache-control': 'no-store' }
      });
    }

    const { pathname } = incoming;
    const response = isPagePath(pathname)
      ? await servePage(request, incoming, env)
      : await env.ASSETS.fetch(request);
    return withSiteHeaders(pathname, response);
  }
};

async function servePage(request, incoming, env) {
  const locale = requestLocale(request.headers);
  // The language folders are internal: their pages are only served at the public URLs.
  const internal = incoming.pathname.startsWith(LOCALE_PREFIX);
  const target = localizedPath(locale, internal ? '/no-such-page' : incoming.pathname);
  let response = await env.ASSETS.fetch(new Request(new URL(target, incoming), request));

  if (locale !== 'en' && response.status === 404) {
    // Old URLs only have redirect rules at their public path.
    const fallback = internal ? response : await env.ASSETS.fetch(request);
    if (fallback.status === 404) {
      const notFound = await env.ASSETS.fetch(new URL(localizedPath(locale, '/404'), incoming));
      response = new Response(notFound.body, { status: 404, headers: notFound.headers });
    } else {
      response = fallback;
    }
  }

  const headers = new Headers(response.headers);
  headers.append('vary', 'accept-language, cookie');
  // A trailing-slash redirect from a language folder must not reveal the folder.
  const location = headers.get('location');
  if (location) headers.set('location', location.replace(`${LOCALE_PREFIX}${locale}`, '') || '/');
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

function withSiteHeaders(pathname, response) {
  const headers = new Headers(response.headers);
  applyHeaders(headers, SITE_SECURITY_HEADERS);

  // The HTML article stays the canonical page for search engines.
  if (pathname.endsWith('.md')) {
    headers.set('link', `<${SITE_ORIGIN}${pathname.slice(0, -3)}>; rel="canonical"`);
    headers.set('x-robots-tag', 'noindex, follow');
  }

  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
