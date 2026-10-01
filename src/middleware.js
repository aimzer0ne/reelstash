import { defineMiddleware } from 'astro:middleware';
import { isAllowedApiPath, isLocalDevHost, publicHostname, SITE_HOSTS, siteLockCookieHeader } from '../lib/api-guard.js';
import { API_SECURITY_HEADERS, SITE_SECURITY_HEADERS, applyHeaders } from '../lib/security.js';

const SITE_ORIGIN = 'https://reelsdl.net';

function withHeaders(response, map) {
  applyHeaders(response.headers, map);
  return response;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const hostname = publicHostname(context.request);

  if (hostname === 'get.reelsdl.net') {
    if (pathname === '/robots.txt') {
      return withHeaders(new Response('User-agent: *\nDisallow: /\n', {
        headers: { 'content-type': 'text/plain; charset=utf-8' }
      }), API_SECURITY_HEADERS);
    }
    if (!isAllowedApiPath(pathname)) {
      return withHeaders(Response.redirect(new URL('/', SITE_ORIGIN), 302), API_SECURITY_HEADERS);
    }
    const response = await next();
    return withHeaders(response, API_SECURITY_HEADERS);
  }

  if (pathname.startsWith('/api/') && SITE_HOSTS.has(hostname)) {
    return withHeaders(Response.json({ error: 'Use https://get.reelsdl.net' }, { status: 404 }), API_SECURITY_HEADERS);
  }

  const response = await next();
  if (import.meta.env.PROD) {
    applyHeaders(response.headers, SITE_SECURITY_HEADERS);
    if (pathname === '/sw.js') {
      response.headers.set('cache-control', 'public, max-age=0, must-revalidate');
      response.headers.set('service-worker-allowed', '/');
    } else if (pathname.startsWith('/_astro/')) {
      response.headers.set('cache-control', 'public, max-age=31536000, immutable');
    } else if (!pathname.startsWith('/api/')) {
      response.headers.set('cache-control', 'public, max-age=0, must-revalidate');
    }
  }
  if (SITE_HOSTS.has(hostname)) {
    response.headers.append('set-cookie', siteLockCookieHeader());
  } else if (isLocalDevHost(hostname)) {
    response.headers.append('set-cookie', siteLockCookieHeader({ local: true }));
  }
  return response;
});
