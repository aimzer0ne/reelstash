// One entry per downloader page: the header tabs, the footer, and the
// "What can you download?" hub on every tool page all read from this list.
// Kept free of page copy so the header island does not ship it to the browser.
export const NAV = [
  {
    href: '/',
    label: 'Reels & Video',
    name: 'Instagram Video & Reels Downloader',
    icon: 'reels',
    text: 'Save any public Instagram video or Reel as an HD MP4 with its original sound and music, and no watermark.'
  },
  {
    href: '/photo',
    label: 'Photo',
    name: 'Instagram Photo & Carousel Downloader',
    icon: 'copy',
    text: 'Save full-resolution JPG photos instead of screenshots, and every slide of a carousel post from one link.'
  },
  {
    href: '/stories',
    label: 'Story',
    name: 'Instagram Story & Highlights Downloader',
    icon: 'again',
    text: 'Keep public Stories before they expire after 24 hours, and save whole Highlight albums as video or photo.'
  },
  {
    href: '/audio',
    label: 'Audio',
    name: 'Instagram Audio Downloader (MP3)',
    icon: 'audio',
    text: 'Convert a Reel or video to MP3, or paste an Instagram audio link to keep only the song, music, or voice.'
  }
];

export const RESOURCE_LINKS = [
  { href: '/how-to', label: 'How to download' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog & guides' },
  { href: '/about', label: 'About ReelsDl.net' },
  { href: '/contact', label: 'Contact us' }
];

export const LEGAL_LINKS = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/dmca', label: 'DMCA & copyright' }
];
