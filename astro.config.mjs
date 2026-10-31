import { Readable } from 'node:stream';
import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';


// `astro dev` serves the API too; in production worker.js does.
const devApi = {
  name: 'dev-api',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (!req.url.startsWith('/api/')) return next();
      const { handleApiRequest } = await server.ssrLoadModule('/lib/reelstash.js');
      const hasBody = !['GET', 'HEAD'].includes(req.method);
      const response = await handleApiRequest(new Request(`http://${req.headers.host}${req.url}`, {
        method: req.method,
        headers: Object.entries(req.headers).filter(([, value]) => typeof value === 'string'),
        ...(hasBody ? { body: Readable.toWeb(req), duplex: 'half' } : {})
      }));
      res.writeHead(response.status, Object.fromEntries(response.headers));
      if (response.body) Readable.fromWeb(response.body).pipe(res);
      else res.end();
    });
  }
};

export default defineConfig({
  site: 'https://reelsdl.net',
  // worker.js serves these prerendered pages and runs /api/*.
  output: 'static',
  build: {
    // Removes render-blocking stylesheet requests on first load.
    inlineStylesheets: 'always'
  },
  integrations: [react()],
  security: {
    checkOrigin: false
  },
  vite: {
    plugins: [devApi],
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV === 'production' ? 'production' : 'development'),
      'process.env.SITE_URL': JSON.stringify(process.env.SITE_URL || 'https://reelsdl.net')
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./', import.meta.url))
      }
    }
  }
});
