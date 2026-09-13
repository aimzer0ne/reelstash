import { NextResponse } from 'next/server';
import { attachSiteLockCookie, isAllowedApiPath, isLocalDevHost } from './lib/api-guard.js';
import { API_SECURITY_HEADERS, SITE_SECURITY_HEADERS, applyHeaders } from './lib/security.js';

const SITE_ORIGIN = 'https://reelsdl.net';

function hostnameOf(request) {
  const host = request.headers.get('host') || '';
  return host.split(':')[0].toLowerCase();
}

function withHeaders(response, map) {
  applyHeaders(response.headers, map);
  return response;
}

export function proxy(request) {
  const hostname = hostnameOf(request);
  const { pathname } = request.nextUrl;

  if (hostname === 'get.reelsdl.net') {
    if (pathname === '/robots.txt') {
      return withHeaders(new NextResponse('User-agent: *\nDisallow: /\n', {
        headers: { 'content-type': 'text/plain; charset=utf-8' }
      }), API_SECURITY_HEADERS);
    }
    if (!isAllowedApiPath(pathname)) {
      return withHeaders(NextResponse.redirect(new URL('/', SITE_ORIGIN), 302), API_SECURITY_HEADERS);
    }
    return withHeaders(NextResponse.next(), API_SECURITY_HEADERS);
  }

  if (pathname.startsWith('/api/') && (hostname === 'reelsdl.net' || hostname === 'www.reelsdl.net')) {
    return withHeaders(NextResponse.json({ error: 'Use https://get.reelsdl.net' }, { status: 404 }), API_SECURITY_HEADERS);
  }

  const response = NextResponse.next();
  applyHeaders(response.headers, SITE_SECURITY_HEADERS);
  if (hostname === 'reelsdl.net' || hostname === 'www.reelsdl.net') {
    attachSiteLockCookie(response);
  } else if (isLocalDevHost(hostname)) {
    attachSiteLockCookie(response, { local: true });
  }
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
