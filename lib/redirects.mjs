import { readdirSync } from 'node:fs';

// Share images used to be JPEG; old URLs point at the WebP copies.
const jpegShareRedirects = (dir, pattern) => Object.fromEntries(
  readdirSync(new URL(`../public${dir}`, import.meta.url))
    .filter((file) => pattern.test(file))
    .map((file) => [`${dir}/${file.replace(/\.webp$/, '.jpg')}`, `${dir}/${file}`])
);

// Old URL → current URL. scripts/split-output.mjs writes these as 301s for Cloudflare.
export const REDIRECTS = {
  '/audio.html': '/audio',
  '/instagram-audio-downloader.html': '/audio',
  // The audio page used to live at /instagram-audio-downloader.
  '/instagram-audio-downloader': '/audio',
  '/privacy-policy': '/privacy',
  '/terms-and-conditions': '/terms',
  '/contact-us': '/contact',
  // Reels and video downloads share the homepage.
  '/reels': '/',
  '/reels-downloader': '/',
  '/story': '/stories',
  '/photos': '/photo',
  '/copyright': '/disclaimer',
  '/reelsdl-home.jpg': '/instagram-reels-downloader-reelsdl-net.webp',
  '/reelstash-home.jpg': '/instagram-reels-downloader-reelsdl-net.webp',
  '/instagram-reels-downloader-reelsdl-net.jpg': '/instagram-reels-downloader-reelsdl-net.webp',
  '/apple-touch-icon.png': '/apple-touch-icon.webp',
  '/icon-192.png': '/icon-192.webp',
  '/icon-512.png': '/icon-512.webp',
  ...jpegShareRedirects('/assets/illustrations', /^og-.*\.webp$/),
  ...jpegShareRedirects('/assets/blog', /-og\.webp$/),
  // Page images are WebP; old AVIF names point at the WebP copies.
  '/assets/link-ReelsDownloader-io.avif': '/assets/copy-instagram-reel-link-reelsdl-net.webp',
  '/assets/paste-ReelsDownloader-io.avif': '/assets/paste-instagram-link-reelsdl-net.webp',
  '/assets/download-ReelsDownloader-io.avif': '/assets/download-instagram-reel-reelsdl-net.webp',
  '/assets/copy-instagram-reel-link-reelsdl-net.avif': '/assets/copy-instagram-reel-link-reelsdl-net.webp',
  '/assets/paste-instagram-link-reelsdl-net.avif': '/assets/paste-instagram-link-reelsdl-net.webp',
  '/assets/download-instagram-reel-reelsdl-net.avif': '/assets/download-instagram-reel-reelsdl-net.webp',
  '/assets/reelsaudiodownload-1.webp': '/assets/instagram-reel-audio-track-reelsdl-net.webp',
  '/assets/reelsaudiodownload-2.webp': '/assets/instagram-audio-copy-link-reelsdl-net.webp'
};
