import { createHmac, timingSafeEqual } from 'node:crypto';
import { API_SECURITY_HEADERS } from './security.js';

export const SITE_COOKIE_LOCAL = 'reelsdl_site';
export const SITE_COOKIE = '__Secure-reelsdl_site';
export const CLIENT_HEADER = 'x-reelsdl-client';
export const CLIENT_HEADER_VALUE = 'web';
export const SITE_HOSTS = new Set(['reelsdl.net', 'www.reelsdl.net']);
export const API_HOSTS = new Set(['get.reelsdl.net']);
export const API_PATHS = new Set(['/api/resolve', '/api/download', '/api/health']);

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

function siteLockToken() {
  const secret = process.env.DOWNLOAD_TOKEN_SECRET || 'replace-this-local-development-secret';
  return createHmac('sha256', secret).update('reelsdl-site-lock').digest('hex').slice(0, 32);
}

function cookieName() {
  return isProduction() ? SITE_COOKIE : SITE_COOKIE_LOCAL;
}

function requestHostname(request) {
  const host = (request.headers.get('host') || '').split(',')[0].trim().split(':')[0].toLowerCase();
  if (API_HOSTS.has(host) || SITE_HOSTS.has(host) || isLocalDevHost(host)) return host;

  if (request.headers.get('x-reelsdl-proxy') === 'cloudflare') {
    const forwarded = (request.headers.get('x-forwarded-host') || '').split(',')[0].trim().split(':')[0].toLowerCase();
    if (API_HOSTS.has(forwarded) || SITE_HOSTS.has(forwarded)) return forwarded;
  }
  return host;
}

export function isLocalDevHost(hostname) {
  return hostname === 'localhost' || hostname === '127.0.0.1';
}

export function isAllowedWebOrigin(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    if (isLocalDevHost(host)) {
      return url.protocol === 'http:' && !isProduction();
    }
    return url.protocol === 'https:' && SITE_HOSTS.has(host);
  } catch {
    return false;
  }
}

export function isAllowedApiHost(request) {
  const hostname = requestHostname(request);
  if (API_HOSTS.has(hostname)) return true;
  return !isProduction() && isLocalDevHost(hostname);
}

export function isAllowedApiPath(pathname) {
  return API_PATHS.has(pathname);
}

export function hasValidSiteCookie(request) {
  const name = cookieName().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = (request.headers.get('cookie') || '').match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  if (!match) return false;
  const got = Buffer.from(match[1].trim());
  const expected = Buffer.from(siteLockToken());
  if (got.length !== expected.length) return false;
  return timingSafeEqual(got, expected);
}

export function hasClientHeader(request) {
  return (request.headers.get(CLIENT_HEADER) || '').toLowerCase() === CLIENT_HEADER_VALUE;
}

export function hasJsonContentType(request) {
  const type = (request.headers.get('content-type') || '').toLowerCase();
  return type.startsWith('application/json');
}

export function allowApiPreflight(request) {
  if (!isAllowedApiHost(request)) return false;
  const origin = request.headers.get('origin');
  return Boolean(origin && isAllowedWebOrigin(origin));
}

export function allowApiCaller(request) {
  if (!isAllowedApiHost(request)) return false;

  const hostname = requestHostname(request);
  if (isLocalDevHost(hostname) && !isProduction()) {
    const origin = request.headers.get('origin');
    if (origin) return isAllowedWebOrigin(origin);
    const referer = request.headers.get('referer');
    if (referer) return isAllowedWebOrigin(referer);
    return true;
  }

  if (!hasValidSiteCookie(request)) return false;

  const origin = request.headers.get('origin');
  if (origin) return isAllowedWebOrigin(origin);

  const referer = request.headers.get('referer');
  if (referer) return isAllowedWebOrigin(referer);

  const fetchSite = (request.headers.get('sec-fetch-site') || '').toLowerCase();
  return fetchSite === 'same-site' || fetchSite === 'same-origin';
}

export function corsHeaders(request) {
  const origin = request?.headers?.get('origin') || '';
  const headers = {
    'access-control-allow-methods': 'GET, POST, OPTIONS',
    'access-control-allow-headers': `${CLIENT_HEADER}, content-type`,
    'access-control-max-age': '600',
    vary: 'origin'
  };
  if (origin && isAllowedWebOrigin(origin)) {
    headers['access-control-allow-origin'] = origin;
    headers['access-control-allow-credentials'] = 'true';
  }
  return headers;
}

export function apiResponseHeaders(request) {
  return {
    ...API_SECURITY_HEADERS,
    ...corsHeaders(request)
  };
}

export function attachSiteLockCookie(response, { local = false } = {}) {
  response.cookies.set({
    name: local ? SITE_COOKIE_LOCAL : SITE_COOKIE,
    value: siteLockToken(),
    domain: local ? undefined : '.reelsdl.net',
    path: '/',
    secure: !local,
    sameSite: 'lax',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 400
  });
  return response;
}
