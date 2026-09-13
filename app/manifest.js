export default function manifest() {
  return {
    id: '/',
    name: 'ReelsDl.net',
    short_name: 'ReelsDl',
    description: 'Download public Instagram reels, photos, carousels, and audio as MP3.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#f2f6fa',
    theme_color: '#0395f6',
    lang: 'en',
    dir: 'ltr',
    categories: ['utilities', 'photo', 'entertainment'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
    ],
    shortcuts: [
      {
        name: 'Reels Downloader',
        short_name: 'Reels',
        url: '/',
        icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }]
      },
      {
        name: 'Audio MP3',
        short_name: 'Audio',
        url: '/instagram-audio-downloader',
        icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }]
      }
    ]
  };
}
