import { absUrl, organizationJsonLd } from './seo.js';
import { audioPage, homePage, pageMetadata } from './site.jsx';
import { photoPage, reelsPage, storiesPage } from './tool-pages.jsx';

function info(path, heading, kicker, title, description, keywords) {
  return {
    path,
    heading,
    kicker,
    metadata: pageMetadata({
      metadata: {
        title,
        description,
        keywords,
        alternates: { canonical: path },
        openGraph: { title, description, url: path },
        twitter: { title, description }
      }
    })
  };
}

function breadcrumb(name, path) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absUrl('/') },
      { '@type': 'ListItem', position: 2, name, item: absUrl(path) }
    ]
  };
}

// The FAQ page gathers every tool's questions, grouped under the tool they belong to.
export const faqGroups = [
  { id: 'general', label: 'General', heading: 'General and video downloads', tool: 'Instagram Video Downloader', href: '/', items: homePage.faq.items },
  { id: 'reels', label: 'Reels', heading: 'Instagram Reels', tool: 'Instagram Reels Downloader', href: '/reels', items: reelsPage.faq.items },
  { id: 'photos', label: 'Photos', heading: 'Photos and carousels', tool: 'Instagram Photo Downloader', href: '/photo', items: photoPage.faq.items },
  { id: 'stories', label: 'Stories', heading: 'Stories and Highlights', tool: 'Instagram Story Downloader', href: '/stories', items: storiesPage.faq.items },
  { id: 'audio', label: 'Audio', heading: 'Audio and MP3', tool: 'Instagram Audio Downloader', href: '/audio', items: audioPage.faq.items }
].map((group) => ({ ...group, items: group.items.map((item) => ({ ...item, open: false })) }));

export const legalPages = {
  faq: {
    ...info('/faq', 'Instagram Downloader FAQ', 'Help',
      'FAQ – Instagram Video, Reels, Photo & Story Downloader | ReelsDl.net',
      'Answers about downloading Instagram videos, Reels, photos, carousels, Stories, and MP3 audio: quality, sound, privacy, private accounts, and where files are saved.',
      ['Instagram downloader FAQ', 'how to download Instagram videos', 'Instagram download questions']),
    jsonLd: [
      { '@context': 'https://schema.org', '@graph': [organizationJsonLd, breadcrumb('FAQ', '/faq')] },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqGroups.flatMap((group) => group.items).map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.text }
        }))
      }
    ]
  },
  howTo: {
    ...info('/how-to', 'How to Download From Instagram', 'Guide',
      'How to Download Instagram Videos on iPhone, Android & PC | ReelsDl.net',
      'Step-by-step guide to download Instagram videos, Reels, photos, Stories, and audio on iPhone, Android, Windows, and Mac — plus fixes when a download fails.',
      ['how to download Instagram videos', 'download Instagram video on iPhone', 'download Instagram video on Android', 'download Instagram video on PC']),
    jsonLd: [
      { '@context': 'https://schema.org', '@graph': [organizationJsonLd, breadcrumb('How to download', '/how-to')] }
    ]
  },
  terms: info('/terms', 'Terms of Service', 'Legal',
    'Terms of Service | ReelsDl.net',
    'Terms of Service for ReelsDl.net, the free Instagram downloader for public content.',
    ['ReelsDl.net terms']),
  dmca: info('/dmca', 'DMCA & Copyright Policy', 'Legal',
    'DMCA & Copyright Policy | ReelsDl.net',
    'How rights holders can report content and how ReelsDl.net handles copyright notices. ReelsDl.net does not host Instagram media.',
    ['ReelsDl.net DMCA', 'copyright']),
  contact: info('/contact', 'Contact Us', 'Help',
    'Contact ReelsDl.net',
    'Contact the ReelsDl.net team to report a link that does not work, send feedback, or ask a question.',
    ['contact ReelsDl.net']),
  privacy: {
    path: '/privacy',
    heading: 'Privacy Policy',
    metadata: pageMetadata({
      metadata: {
        title: 'Privacy Policy | ReelsDl.net',
        description: 'Privacy Policy for ReelsDl.net. What this Instagram downloader collects and how that information is used.',
        keywords: ['ReelsDl.net privacy', 'Instagram downloader privacy'],
        alternates: { canonical: '/privacy' },
        openGraph: {
          title: 'Privacy Policy | ReelsDl.net',
          description: 'Privacy Policy for ReelsDl.net.',
          url: '/privacy'
        },
        twitter: {
          title: 'Privacy Policy | ReelsDl.net',
          description: 'Privacy Policy for ReelsDl.net.'
        }
      }
    })
  },
  disclaimer: {
    path: '/disclaimer',
    heading: 'Disclaimer',
    metadata: pageMetadata({
      metadata: {
        title: 'Disclaimer | ReelsDl.net',
        description: 'ReelsDl.net does not host Instagram videos or images. Download links come from Instagram CDN servers.',
        keywords: ['ReelsDl.net disclaimer', 'not affiliated with Instagram'],
        alternates: { canonical: '/disclaimer' },
        openGraph: {
          title: 'Disclaimer | ReelsDl.net',
          description: 'Disclaimer for ReelsDl.net.',
          url: '/disclaimer'
        },
        twitter: {
          title: 'Disclaimer | ReelsDl.net',
          description: 'Disclaimer for ReelsDl.net.'
        }
      }
    })
  }
};
