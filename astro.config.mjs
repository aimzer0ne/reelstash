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
    '/audio.html': { status: 301, destination: '/audio' },
    '/instagram-audio-downloader.html': { status: 301, destination: '/audio' },
    // The audio page used to live at /instagram-audio-downloader.
    '/instagram-audio-downloader': { status: 301, destination: '/audio' },
    '/privacy-policy': { status: 301, destination: '/privacy' },
    '/terms-and-conditions': { status: 301, destination: '/terms' },
    '/contact-us': { status: 301, destination: '/contact' },
    // Reels and video downloads share the homepage.
    '/reels': { status: 301, destination: '/' },
    '/reels-downloader': { status: 301, destination: '/' },
    '/story': { status: 301, destination: '/stories' },
    '/photos': { status: 301, destination: '/photo' },
    '/copyright': { status: 301, destination: '/disclaimer' },
    '/reelsdl-home.jpg': { status: 301, destination: '/instagram-reels-downloader-reelsdl-net.jpg' },
    '/reelstash-home.jpg': { status: 301, destination: '/instagram-reels-downloader-reelsdl-net.jpg' },
    // Page images are WebP; old AVIF names point at the WebP copies.
    '/assets/link-ReelsDownloader-io.avif': { status: 301, destination: '/assets/copy-instagram-reel-link-reelsdl-net.webp' },
    '/assets/paste-ReelsDownloader-io.avif': { status: 301, destination: '/assets/paste-instagram-link-reelsdl-net.webp' },
    '/assets/download-ReelsDownloader-io.avif': { status: 301, destination: '/assets/download-instagram-reel-reelsdl-net.webp' },
    '/assets/copy-instagram-reel-link-reelsdl-net.avif': { status: 301, destination: '/assets/copy-instagram-reel-link-reelsdl-net.webp' },
    '/assets/paste-instagram-link-reelsdl-net.avif': { status: 301, destination: '/assets/paste-instagram-link-reelsdl-net.webp' },
    '/assets/download-instagram-reel-reelsdl-net.avif': { status: 301, destination: '/assets/download-instagram-reel-reelsdl-net.webp' },
    '/assets/reelsaudiodownload-1.webp': { status: 301, destination: '/assets/instagram-reel-audio-track-reelsdl-net.webp' },
    '/assets/reelsaudiodownload-2.webp': { status: 301, destination: '/assets/instagram-audio-copy-link-reelsdl-net.webp' }
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
