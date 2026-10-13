import { getContent } from './content/index.js';
import { PAGE_PATHS, localePath, pageAlternates } from './i18n.js';
import { plainText } from './plain.js';
import { absUrl, organizationJsonLd, OG_IMAGE_PATH } from './seo.js';

const HOW_TO_IMAGES = {
  home: [
    '/assets/copy-instagram-reel-link-reelsdl-net.avif',
    '/assets/paste-instagram-link-reelsdl-net.avif',
    '/assets/download-instagram-reel-reelsdl-net.avif'
  ],
  audio: [
    '/assets/instagram-reel-audio-track-reelsdl-net.webp',
    '/assets/paste-instagram-link-reelsdl-net.avif',
    '/assets/download-instagram-reel-reelsdl-net.avif'
  ]
};

function inLanguage(locale) {
  return locale === 'en' ? 'en-US' : locale;
}

function faqJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a.map(plainText).join(' ') }
    }))
  };
}

function howToJsonLd(pageId, copy, url, toolName) {
  const steps = copy.ld?.steps || copy.how.steps.map((step) => ({ name: step.title, text: plainText(step.text) }));
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${url}#howto`,
    name: copy.ld?.howToName || copy.how.heading,
    description: copy.ld?.howToDescription || copy.meta.description,
    totalTime: 'PT1M',
    tool: { '@type': 'HowToTool', name: toolName },
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: absUrl(HOW_TO_IMAGES[pageId][index])
    }))
  };
}

function homeJsonLd(copy, locale, url) {
  const language = inLanguage(locale);
  const graph = [organizationJsonLd];
  // The site entity is described once, on the English home page.
  if (locale === 'en') {
    graph.push({
      '@type': 'WebSite',
      '@id': absUrl('/#website'),
      url: absUrl('/'),
      name: 'ReelsDl.net',
      alternateName: ['ReelsDl', 'ReelsDl Instagram Video Downloader', 'ReelsDl Reels Downloader'],
      description: 'Free Instagram video downloader and Reels downloader for public posts: Reels, videos, photos, carousels, and MP3 audio. No login.',
      inLanguage: language,
      publisher: { '@id': absUrl('/#organization') },
      potentialAction: {
        '@type': 'Action',
        name: 'Download public Instagram media',
        target: absUrl('/')
      }
    });
  }
  graph.push(
    {
      '@type': ['WebApplication', 'SoftwareApplication'],
      '@id': `${url}#app`,
      url,
      name: copy.ld?.appName || copy.about.heading,
      alternateName: ['Instagram Reels Downloader', 'Reels Downloader', 'Instagram Video Downloader'],
      applicationCategory: 'MultimediaApplication',
      applicationSubCategory: 'Instagram video downloader',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      isAccessibleForFree: true,
      inLanguage: language,
      image: absUrl(OG_IMAGE_PATH),
      publisher: { '@id': absUrl('/#organization') },
      description: copy.ld?.appDescription || copy.meta.description,
      featureList: copy.ld?.featureList || copy.features.items.map((item) => item.title),
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      downloadUrl: url,
      installUrl: url
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: copy.meta.title,
      isPartOf: { '@id': absUrl('/#website') },
      about: { '@id': `${url}#app` },
      inLanguage: language,
      description: copy.meta.description
    }
  );
  return [
    { '@context': 'https://schema.org', '@graph': graph },
    howToJsonLd('home', copy, url, 'ReelsDl.net'),
    faqJsonLd(copy.faq)
  ];
}

function audioJsonLd(copy, locale, url) {
  const language = inLanguage(locale);
  return [
    {
      '@context': 'https://schema.org',
      '@graph': [
        organizationJsonLd,
        {
          '@type': 'WebPage',
          '@id': `${url}#webpage`,
          url,
          name: copy.ld?.pageName || copy.about.heading,
          description: copy.ld?.pageDescription || copy.meta.description,
          isPartOf: { '@id': absUrl('/#website') },
          inLanguage: language
        },
        {
          '@type': ['WebApplication', 'SoftwareApplication'],
          '@id': `${url}#app`,
          url,
          name: copy.ld?.appName || `ReelsDl.net — ${copy.about.heading}`,
          applicationCategory: 'MultimediaApplication',
          applicationSubCategory: 'Instagram audio downloader',
          operatingSystem: 'Any',
          browserRequirements: 'Requires JavaScript',
          isAccessibleForFree: true,
          inLanguage: language,
          publisher: { '@id': absUrl('/#organization') },
          description: copy.ld?.appDescription || copy.meta.description,
          featureList: copy.ld?.featureList || copy.music.items.map(plainText),
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'ReelsDl.net', item: absUrl(localePath(locale, '/')) },
            { '@type': 'ListItem', position: 2, name: copy.breadcrumb || copy.about.heading, item: url }
          ]
        }
      ]
    },
    howToJsonLd('audio', copy, url, 'ReelsDl.net Audio Downloader'),
    faqJsonLd(copy.faq)
  ];
}

// Everything a tool page needs on the server: its copy, head tags, hreflang set, and JSON-LD.
export function toolPage(pageId, locale) {
  const content = getContent(locale);
  const copy = content[pageId];
  const path = localePath(locale, PAGE_PATHS[pageId]);
  const url = absUrl(path);
  const { meta } = copy;
  return {
    path,
    alternates: pageAlternates(pageId),
    content: { common: content.common, [pageId]: copy },
    jsonLd: pageId === 'audio' ? audioJsonLd(copy, locale, url) : homeJsonLd(copy, locale, url),
    metadata: {
      title: meta.title,
      description: meta.description,
      keywords: meta.keywords,
      ogTitle: meta.ogTitle || meta.title,
      ogDescription: meta.ogDescription || meta.description,
      twitterTitle: meta.ogTitle || meta.title,
      twitterDescription: meta.twitterDescription || meta.description
    }
  };
}
