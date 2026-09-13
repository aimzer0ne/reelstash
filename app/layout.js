import { Fraunces, Inter, Yellowtail } from 'next/font/google';
import './globals.css?v=11';
import './logo-type.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-inter',
  display: 'swap'
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-fraunces',
  display: 'swap'
});

const logo = Yellowtail({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-logo',
  display: 'swap'
});

export const metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://reelsdl.net'),
  applicationName: 'ReelsDl.net',
  appleWebApp: {
    capable: true,
    title: 'ReelsDl.net',
    statusBarStyle: 'default'
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png'
  },
  authors: [{ name: 'ReelsDl.net', url: 'https://reelsdl.net' }],
  creator: 'ReelsDl.net',
  publisher: 'ReelsDl.net',
  category: 'utilities',
  keywords: [
    'Instagram reel downloader',
    'Instagram video downloader',
    'Instagram audio downloader',
    'download Instagram reels',
    'ReelsDl.net'
  ],
  alternates: {
    types: {
      'text/plain': '/llms.txt'
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
  other: {
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes'
  }
};

export const viewport = {
  themeColor: '#0395f6',
  viewportFit: 'cover'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${logo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
