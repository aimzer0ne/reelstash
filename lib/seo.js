export const SITE_ORIGIN = (process.env.SITE_URL || 'https://reelsdl.net').replace(/\/+$/, '');
export const SITE_NAME = 'ReelsDl.net';
export const SITE_EMAIL = 'hello@reelsdl.net';

export function absUrl(path = '/') {
  if (!path) return SITE_ORIGIN;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}

export const OG_IMAGE_PATH = '/instagram-reels-downloader-reelsdl-net.jpg';

export const DEFAULT_OG_IMAGE = {
  url: absUrl(OG_IMAGE_PATH),
  width: 682,
  height: 1024,
  alt: 'Instagram video downloader and Reels downloader on ReelsDl.net — paste a public link and save the video'
};

export const organizationJsonLd = {
  '@type': 'Organization',
  '@id': absUrl('/#organization'),
  name: SITE_NAME,
  legalName: SITE_NAME,
  url: absUrl('/'),
  email: SITE_EMAIL,
  logo: {
    '@type': 'ImageObject',
    url: absUrl('/icon-512.png'),
    width: 512,
    height: 512
  },
  image: absUrl(OG_IMAGE_PATH),
  description: 'Free web tool to download public Instagram Reels, photos, carousel posts, and reel audio as MP3. No Instagram login. Public posts only.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: SITE_EMAIL,
    contactType: 'customer support'
  }
};

export function pageMetadata(page) {
  return {
    title: page.metadata.title,
    description: page.metadata.description,
    keywords: page.metadata.keywords,
    authors: [{ name: 'ReelsDl.net', url: SITE_ORIGIN }],
    creator: 'ReelsDl.net',
    publisher: 'ReelsDl.net',
    category: 'utilities',
    alternates: page.metadata.alternates,
    openGraph: {
      type: 'website',
      siteName: 'ReelsDl.net',
      locale: 'en_US',
      images: [DEFAULT_OG_IMAGE],
      ...page.metadata.openGraph
    },
    twitter: {
      card: 'summary_large_image',
      ...page.metadata.twitter
    }
  };
}
