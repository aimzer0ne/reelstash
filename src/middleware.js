import { defineMiddleware } from 'astro:middleware';
import { API_HOSTS, isLocalDevHost, publicHostname } from '../lib/api-guard.js';
import { API_SECURITY_HEADERS, applyHeaders } from '../lib/security.js';

const SITE_ORIGIN = 'https://reelsdl.net';

function withHeaders(response, map) {
  applyHeaders(response.headers, map);
  return response;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request } = context;

  // Pages only pass through here while building and under `astro dev`. In production worker.js serves them.
  if (context.isPrerendered) return next();

  const hostname = publicHostname(request);
  if (API_HOSTS.has(hostname)) return withHeaders(await next(), API_SECURITY_HEADERS);
  if (isLocalDevHost(hostname)) return next();

  // The raw *.vercel.app production hostname must not serve a duplicate API.
  if (hostname.endsWith('.vercel.app') && process.env.VERCEL_ENV === 'production') {
    return new Response(null, { status: 301, headers: { location: `${SITE_ORIGIN}${url.pathname}${url.search}` } });
  }
  return withHeaders(Response.json({ error: 'Use https://get.reelsdl.net' }, { status: 404 }), API_SECURITY_HEADERS);
});
