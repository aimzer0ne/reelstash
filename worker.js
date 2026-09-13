const SITE_ORIGIN = 'https://reelsdl.net';
const API_HOST = 'get.reelsdl.net';
const API_PATHS = new Set(['/api/resolve', '/api/download', '/api/health']);

export default {
  async fetch(request, env) {
    const incoming = new URL(request.url);
    const host = incoming.hostname.toLowerCase();

    if (host === API_HOST) {
      if (incoming.pathname === '/robots.txt') {
        return new Response('User-agent: *\nDisallow: /\n', {
          headers: { 'content-type': 'text/plain; charset=utf-8', 'x-robots-tag': 'noindex' }
        });
      }
      if (!API_PATHS.has(incoming.pathname)) {
        return Response.redirect(new URL('/', SITE_ORIGIN), 302);
      }
    } else if (incoming.pathname.startsWith('/api/')) {
      return Response.json({ error: 'Use https://get.reelsdl.net' }, { status: 404 });
    }

    return proxyToOrigin(request, env.API_ORIGIN);
  }
};

async function proxyToOrigin(request, configuredOrigin) {
  let origin;
  try {
    origin = new URL(configuredOrigin);
    if (origin.protocol !== 'https:' || origin.username || origin.password) throw new Error();
  } catch {
    return Response.json({
      error: 'Cloudflare proxy is not configured. Set API_ORIGIN to the production Vercel URL.'
    }, { status: 503 });
  }

  const incoming = new URL(request.url);
  const target = new URL(`${incoming.pathname}${incoming.search}`, origin);
  const headers = new Headers(request.headers);
  headers.set('x-reelsdl-proxy', 'cloudflare');
  headers.set('x-forwarded-host', incoming.hostname);
  headers.delete('host');

  const hashedAsset = incoming.pathname.startsWith('/_next/static/');

  try {
    const upstream = await fetch(new Request(target, {
      method: request.method,
      headers,
      body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body,
      redirect: 'manual',
      cf: {
        cacheEverything: hashedAsset,
        cacheTtl: hashedAsset ? 31_536_000 : 0
      }
    }));

    return cachedResponse(incoming.pathname, upstream);
  } catch {
    return Response.json({
      error: 'The site is temporarily unavailable.'
    }, { status: 502 });
  }
}

function cachedResponse(pathname, upstream) {
  const headers = new Headers(upstream.headers);
  headers.delete('age');
  headers.delete('cf-cache-status');
  headers.set('x-content-type-options', 'nosniff');
  headers.set('x-frame-options', 'DENY');
  headers.set('strict-transport-security', 'max-age=63072000; includeSubDomains; preload');

  if (pathname.startsWith('/api/')) {
    headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    headers.set('CDN-Cache-Control', 'no-store');
    headers.set('x-robots-tag', 'noindex, nofollow, noarchive');
  } else if (pathname.startsWith('/_next/static/')) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('CDN-Cache-Control', 'public, max-age=31536000, immutable');
  } else {
    headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    headers.set('CDN-Cache-Control', 'no-store');
    headers.set('referrer-policy', 'origin');
  }

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers
  });
}
