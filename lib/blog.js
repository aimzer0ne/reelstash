import { getCollection } from 'astro:content';
import { getContent } from './content/index.js';
import { DEFAULT_LOCALE, localeAlternates, localePath, pageHref } from './i18n.js';
import { SITE_NAME, absUrl, organizationJsonLd, OG_IMAGE_PATH } from './seo.js';

export const BLOG_PATH = '/blog';

// Collection ids are "<slug>" for English and "<locale>/<slug>" for a translation.
export function postLocale(post) {
  return post.id.includes('/') ? post.id.split('/')[0] : DEFAULT_LOCALE;
}

export function postSlug(post) {
  return post.id.split('/').pop();
}

export function blogCopy(locale) {
  return getContent(locale).blog || getContent(DEFAULT_LOCALE).blog;
}

export function blogPath(locale) {
  return localePath(locale, BLOG_PATH);
}

export function postPath(post) {
  return localePath(postLocale(post), `${BLOG_PATH}/${postSlug(post)}`);
}

export function postTool(post) {
  const locale = postLocale(post);
  const id = post.data.tool === 'audio' ? 'audio' : 'reels';
  return { ...blogCopy(locale).tools[id], href: pageHref(id === 'audio' ? 'audio' : 'home', locale) };
}

export const OG_SIZE = { width: 1200, height: 630 };

export function postImage(post) {
  const image = post.data.image;
  if (!image) return null;
  const base = `/assets/blog/${postSlug(post)}`;
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
async function allPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.published - a.data.published || a.id.localeCompare(b.id));
}

export async function getPosts(locale = DEFAULT_LOCALE) {
  return (await allPosts()).filter((post) => postLocale(post) === locale);
}

export async function getPost(slug, locale = DEFAULT_LOCALE) {
  return (await getPosts(locale)).find((post) => postSlug(post) === slug) || null;
}

// Locales that have at least one post, English first.
export async function blogLocales() {
  const found = new Set((await allPosts()).map(postLocale));
  return [DEFAULT_LOCALE, ...[...found].filter((locale) => locale !== DEFAULT_LOCALE).sort()];
}

export async function blogAlternates() {
  return localeAlternates(await blogLocales(), BLOG_PATH);
}

// { en: '/blog/<slug>', es: '/es/blog/<slug>', … } for the locales this post is translated into.
export async function postAlternates(slug) {
  const locales = (await allPosts()).filter((post) => postSlug(post) === slug).map(postLocale);
  return localeAlternates(await blogLocales().then((all) => all.filter((locale) => locales.includes(locale))), `${BLOG_PATH}/${slug}`);
}

// Plain serializable cards, safe to pass as props into the React pages.
export async function getGuideLinks(locale = DEFAULT_LOCALE, limit = 6) {
  return (await getPosts(locale)).slice(0, limit).map((post) => ({
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
  const copy = blogCopy(postLocale(post));
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
    lines.push(`## ${copy.takeaways}`, '', ...data.takeaways.map((item) => `- ${item}`), '');
  }
  // Root-relative links and images become absolute so the copy stands alone.
  lines.push((post.body || '').trim().replace(/(\]\(|(?:href|src)=")\/(?!\/)/g, `$1${absUrl('/')}`), '');
  if (data.faq.length) {
    lines.push(`## ${copy.faq}`, '');
    for (const item of data.faq) lines.push(`### ${item.q}`, '', item.a, '');
  }
  return lines.join('\n');
}

export function readingMinutes(post) {
  const words = (post.body || '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(date, locale = DEFAULT_LOCALE) {
  return date.toLocaleDateString(locale === DEFAULT_LOCALE ? 'en-US' : locale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
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

function inLanguage(locale) {
  return locale === DEFAULT_LOCALE ? 'en-US' : locale;
}

export function blogIndexJsonLd(posts, locale = DEFAULT_LOCALE) {
  const copy = blogCopy(locale);
  const path = blogPath(locale);
  return [{
    '@context': 'https://schema.org',
    '@graph': [
      organizationJsonLd,
      {
        '@type': 'Blog',
        '@id': absUrl(`${path}#blog`),
        url: absUrl(path),
        name: `${SITE_NAME} ${copy.blog}`,
        description: copy.description,
        inLanguage: inLanguage(locale),
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
        { name: copy.home, path: localePath(locale, '/') },
        { name: copy.blog, path }
      ])
    ]
  }];
}

export function postJsonLd(post) {
  const locale = postLocale(post);
  const copy = blogCopy(locale);
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
        inLanguage: inLanguage(locale),
        wordCount: (post.body || '').split(/\s+/).filter(Boolean).length,
        author: { '@id': absUrl('/#organization') },
        publisher: { '@id': absUrl('/#organization') },
        isPartOf: { '@id': absUrl(`${blogPath(locale)}#blog`) }
      },
      breadcrumb([
        { name: copy.home, path: localePath(locale, '/') },
        { name: copy.blog, path: blogPath(locale) },
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
