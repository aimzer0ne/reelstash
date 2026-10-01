import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://reelsdl.net',
  output: 'server',
  adapter: vercel({
    maxDuration: 60,
    includeFiles: ['./node_modules/ffmpeg-static/ffmpeg']
  }),
  integrations: [react()],
  security: {
    checkOrigin: false
  },
  redirects: {
    '/audio.html': { status: 301, destination: '/instagram-audio-downloader' },
    '/instagram-audio-downloader.html': { status: 301, destination: '/instagram-audio-downloader' },
    '/privacy-policy': { status: 301, destination: '/privacy' },
    '/terms': { status: 301, destination: '/privacy' },
    '/copyright': { status: 301, destination: '/disclaimer' }
  },
  vite: {
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
