// Cloudflare Worker for https://reelsdl.net: serves the prerendered site from Workers
// Static Assets and runs the API under /api/*.
import { handleApiRequest } from './lib/reelstash.js';
import { API_SECURITY_HEADERS, SITE_SECURITY_HEADERS, applyHeaders } from './lib/security.js';

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
      const response = await handleApiRequest(request);
      const headers = applyHeaders(new Headers(response.headers), API_SECURITY_HEADERS);
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }

    return withSiteHeaders(incoming.pathname, await env.ASSETS.fetch(request));
  }
};

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
