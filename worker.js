export default {
  async fetch(request, env) {
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

  if (pathname.startsWith('/api/')) {
    headers.set('Cache-Control', 'no-store');
    headers.set('CDN-Cache-Control', 'no-store');
  } else if (pathname.startsWith('/_next/static/')) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('CDN-Cache-Control', 'public, max-age=31536000, immutable');
  } else {
    // HTML, unhashed CSS/SVG, and pages must revalidate so CF Pages/edge
    // cannot keep serving a previous deploy's styles.
    headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    headers.set('CDN-Cache-Control', 'no-store');
  }

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers
  });
}
