import { API_SECURITY_HEADERS, SITE_SECURITY_HEADERS, headerList } from './lib/security.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  async redirects() {
    return [
      { source: '/audio.html', destination: '/instagram-audio-downloader', permanent: true },
      { source: '/instagram-audio-downloader.html', destination: '/instagram-audio-downloader', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/terms', destination: '/privacy', permanent: true },
      { source: '/copyright', destination: '/disclaimer', permanent: true }
    ];
  },
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
          { key: 'Service-Worker-Allowed', value: '/' }
        ]
      },
      {
        source: '/((?!_next/static|_next/image|api/).*)',
        headers: headerList(SITE_SECURITY_HEADERS).concat([
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }
        ])
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'X-Content-Type-Options', value: 'nosniff' }
        ]
      },
      {
        source: '/api/:path*',
        headers: headerList(API_SECURITY_HEADERS)
      }
    ];
  }
};

export default nextConfig;
