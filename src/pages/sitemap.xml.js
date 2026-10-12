import { absUrl } from '../../lib/seo.js';
import { BLOG_PATH, getPosts, postImage, postPath } from '../../lib/blog.js';

const PATHS = [
  { path: '/', priority: '1.0' },
  { path: '/instagram-audio-downloader', priority: '0.9' },
  { path: '/privacy', priority: '0.3' },
  { path: '/disclaimer', priority: '0.3' }
];

export async function GET() {
  const now = new Date().toISOString();
  const posts = await getPosts();
  const entries = [
    ...PATHS.map((item) => ({ ...item, lastmod: now, changefreq: 'weekly' })),
    {
      path: BLOG_PATH,
      priority: '0.7',
      changefreq: 'weekly',
      lastmod: posts.length ? new Date(Math.max(...posts.map((post) => post.data.updated))).toISOString() : now
    },
    // Posts report their real edit date, so crawlers only refetch what changed.
    ...posts.map((post) => ({
      path: postPath(post),
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: post.data.updated.toISOString(),
      image: postImage(post)?.src
    }))
  ];
  const urls = entries.map(({ path, priority, lastmod, changefreq, image }) => `  <url>
    <loc>${absUrl(path)}</loc>${image ? `
    <image:image>
      <image:loc>${absUrl(image)}</image:loc>
    </image:image>` : ''}
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
  return new Response(body, {
    headers: { 'content-type': 'application/xml; charset=utf-8' }
  });
}
