import { Fraunces, Inter } from 'next/font/google';
import './globals.css?v=9';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap'
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-fraunces',
  display: 'swap'
});

export const metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  applicationName: 'Reelstash',
  appleWebApp: {
    capable: true,
    title: 'Reelstash',
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
  authors: [{ name: 'Reelstash' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true }
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
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
