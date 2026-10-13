import { absUrl } from '../../lib/seo.js';
import { DEFAULT_LOCALE, pageAlternates } from '../../lib/i18n.js';
import { blogAlternates, blogLocales, getPosts, postAlternates, postImage, postPath, postSlug } from '../../lib/blog.js';

const LEGAL = [
  { path: '/privacy', priority: '0.3' },
  { path: '/disclaimer', priority: '0.3' }
];

// One <url> per language version, each listing every version (itself included) as hreflang.
function localized(alternates, entry) {
  return Object.values(alternates).map((path) => ({ ...entry, path, alternates }));
}

function hreflangLinks(alternates) {
  const entries = Object.entries(alternates);
  if (entries.length < 2) return '';
  return [...entries, ['x-default', alternates[DEFAULT_LOCALE]]]
    .map(([code, path]) => `\n    <xhtml:link rel="alternate" hreflang="${code}" href="${absUrl(path)}"/>`)
    .join('');
}

export async function GET() {
  const now = new Date().toISOString();
  const entries = [
    ...localized(pageAlternates('home'), { priority: '1.0', lastmod: now, changefreq: 'weekly' }),
    ...localized(pageAlternates('audio'), { priority: '0.9', lastmod: now, changefreq: 'weekly' }),
    ...LEGAL.map((item) => ({ ...item, lastmod: now, changefreq: 'weekly' }))
  ];
  const blogPaths = await blogAlternates();
  for (const locale of await blogLocales()) {
    const posts = await getPosts(locale);
    entries.push({
      path: blogPaths[locale],
      alternates: blogPaths,
      priority: '0.7',
      changefreq: 'weekly',
      lastmod: posts.length ? new Date(Math.max(...posts.map((post) => post.data.updated))).toISOString() : now
    });
    // Posts report their real edit date, so crawlers only refetch what changed.
    for (const post of posts) {
      entries.push({
        path: postPath(post),
        alternates: await postAlternates(postSlug(post)),
        priority: '0.6',
        changefreq: 'monthly',
        lastmod: post.data.updated.toISOString(),
        image: postImage(post)?.src
      });
    }
  }
  const urls = entries.map(({ path, alternates, priority, lastmod, changefreq, image }) => `  <url>
    <loc>${absUrl(path)}</loc>${alternates ? hreflangLinks(alternates) : ''}${image ? `
    <image:image>
      <image:loc>${absUrl(image)}</image:loc>
    </image:image>` : ''}
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
  return new Response(body, {
    headers: { 'content-type': 'application/xml; charset=utf-8' }
  });
}
