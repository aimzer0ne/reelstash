import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';
import { isPagePath, localizedPath, requestLocale } from './lib/i18n.js';

// `astro dev` stands in for the Worker's language routing (worker.js).
const devLocaleRouting = {
  name: 'dev-locale-routing',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const { pathname, search } = new URL(req.url, 'http://localhost');
      if (isPagePath(pathname) && !/^\/(@|_|api\/|i18n\/)/.test(pathname)) {
        const locale = requestLocale({ get: (name) => req.headers[name] });
        req.url = `${localizedPath(locale, pathname)}${search}`;
      }
      next();
    });
  }
};

export default defineConfig({
  site: 'https://reelsdl.net',
  // Pages are prerendered and served by Cloudflare (worker.js). Only the /api/*
  // routes run on Vercel; scripts/split-output.mjs separates the two after the build.
  output: 'static',
  build: {
    // Removes render-blocking stylesheet requests on first load.
    inlineStylesheets: 'always'
  },
  adapter: vercel({
    maxDuration: 60,
    includeFiles: ['./node_modules/ffmpeg-static/ffmpeg']
  }),
  integrations: [react()],
  security: {
    checkOrigin: false
  },
  vite: {
    plugins: [devLocaleRouting],
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV === 'production' ? 'production' : 'development'),
      'process.env.NEXT_PUBLIC_API_URL': JSON.stringify(process.env.NEXT_PUBLIC_API_URL || ''),
      'process.env.SITE_URL': JSON.stringify(process.env.SITE_URL || 'https://reelsdl.net')
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./', import.meta.url))
      }
    }
  }
});
