import { getCollection } from 'astro:content';
import { SITE_NAME, absUrl, organizationJsonLd, OG_IMAGE_PATH } from './seo.js';

export const BLOG_PATH = '/blog';
export const BLOG_TITLE = 'Instagram Download Guides & Tips | ReelsDl.net Blog';
export const BLOG_DESCRIPTION = 'Step-by-step guides for saving Instagram Reels, photos, carousels, and Reel audio on iPhone, Android, and PC — plus fixes when a download fails.';

const TOOLS = {
  video: { href: '/', label: 'Open the Instagram Video Downloader', name: 'Instagram Video Downloader' },
  reels: { href: '/', label: 'Open the Reels Downloader', name: 'Instagram Video & Reels Downloader' },
  photo: { href: '/photo', label: 'Open the Photo Downloader', name: 'Instagram Photo Downloader' },
  stories: { href: '/stories', label: 'Open the Story Downloader', name: 'Instagram Story Downloader' },
  audio: { href: '/audio', label: 'Open the Reel Audio Downloader', name: 'Instagram Reel Audio Downloader' }
};

export function postPath(post) {
  return `${BLOG_PATH}/${post.id}`;
}

export function postTool(post) {
  return TOOLS[post.data.tool] || TOOLS.reels;
}

export const OG_SIZE = { width: 1200, height: 630 };

export function postImage(post) {
  const image = post.data.image;
  if (!image) return null;
  const base = `/assets/blog/${post.id}`;
  return {
    src: `${base}.webp`,
    thumb: `${base}-720.webp`,
    og: `${base}-og.jpg`,
    width: image.width,
    height: image.height,
    alt: image.alt
  };
}

// Newest first; drafts stay out of every listing, the sitemap, and the routes.
export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.published - a.data.published || a.id.localeCompare(b.id));
}

export async function getPost(slug) {
  return (await getPosts()).find((post) => post.id === slug) || null;
}

// Plain serializable cards, safe to pass as props into the React pages.
export async function getGuideLinks(limit = 6) {
  return (await getPosts()).slice(0, limit).map((post) => ({
    href: postPath(post),
    title: post.data.title,
    excerpt: post.data.excerpt,
    minutes: readingMinutes(post),
    image: postImage(post)?.thumb || null
  }));
}

// Plain-markdown copy of a post for AI crawlers and assistants (/blog/<slug>.md, llms-full.txt).
export function postMarkdown(post) {
  const { data } = post;
  const lines = [
    `# ${data.title}`,
    '',
    `Source: ${absUrl(postPath(post))}`,
    `Publisher: ${SITE_NAME}`,
    `Last updated: ${data.updated.toISOString().slice(0, 10)}`,
    '',
    `> ${data.description}`,
    ''
  ];
  if (data.takeaways.length) {
    lines.push('## Key takeaways', '', ...data.takeaways.map((item) => `- ${item}`), '');
  }
  // Root-relative links and images become absolute so the copy stands alone.
  lines.push((post.body || '').trim().replace(/(\]\(|(?:href|src)=")\/(?!\/)/g, `$1${absUrl('/')}`), '');
  if (data.faq.length) {
    lines.push('## Frequently asked questions', '');
    for (const item of data.faq) lines.push(`### ${item.q}`, '', item.a, '');
  }
  return lines.join('\n');
}

export function readingMinutes(post) {
  const words = (post.body || '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(date) {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

function breadcrumb(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absUrl(item.path)
    }))
  };
}

export function blogIndexJsonLd(posts) {
  return [{
    '@context': 'https://schema.org',
    '@graph': [
      organizationJsonLd,
      {
        '@type': 'Blog',
        '@id': absUrl(`${BLOG_PATH}#blog`),
        url: absUrl(BLOG_PATH),
        name: `${SITE_NAME} Blog`,
        description: BLOG_DESCRIPTION,
        inLanguage: 'en-US',
        isPartOf: { '@id': absUrl('/#website') },
        publisher: { '@id': absUrl('/#organization') },
        blogPost: posts.map((post) => ({
          '@type': 'BlogPosting',
          headline: post.data.title,
          url: absUrl(postPath(post)),
          ...(postImage(post) ? { image: absUrl(postImage(post).src) } : {}),
          datePublished: post.data.published.toISOString(),
          dateModified: post.data.updated.toISOString()
        }))
      },
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: BLOG_PATH }
      ])
    ]
  }];
}

export function postJsonLd(post) {
  const url = absUrl(postPath(post));
  const image = postImage(post);
  const blocks = [{
    '@context': 'https://schema.org',
    '@graph': [
      organizationJsonLd,
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        url,
        headline: post.data.title,
        description: post.data.description,
        ...(post.data.takeaways.length ? { abstract: post.data.takeaways.join(' ') } : {}),
        keywords: post.data.keywords.join(', '),
        image: image
          ? [
            { '@type': 'ImageObject', url: absUrl(image.src), width: image.width, height: image.height, caption: image.alt },
            { '@type': 'ImageObject', url: absUrl(image.og), ...OG_SIZE }
          ]
          : absUrl(OG_IMAGE_PATH),
        datePublished: post.data.published.toISOString(),
        dateModified: post.data.updated.toISOString(),
        inLanguage: 'en-US',
        wordCount: (post.body || '').split(/\s+/).filter(Boolean).length,
        author: { '@id': absUrl('/#organization') },
        publisher: { '@id': absUrl('/#organization') },
        isPartOf: { '@id': absUrl(`${BLOG_PATH}#blog`) }
      },
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: BLOG_PATH },
        { name: post.data.title, path: postPath(post) }
      ])
    ]
  }];
  if (post.data.faq.length) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.data.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a }
      }))
    });
  }
  return blocks;
}
