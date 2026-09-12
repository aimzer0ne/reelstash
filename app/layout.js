import { Fraunces, Inter } from 'next/font/google';
import './globals.css?v=1';

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
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/logo.svg'
  },
  authors: [{ name: 'Reelstash' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true }
  },
  other: {
    'format-detection': 'telephone=no'
  }
};

export const viewport = {
  themeColor: '#0395f6'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
