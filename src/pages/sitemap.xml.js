import { absUrl } from '../../lib/seo.js';
import { BLOG_PATH, getPosts, postImage, postPath } from '../../lib/blog.js';
import { illustrationSrc, pageOgImage, sceneImage, stepImages } from '../../lib/images.js';

// lastmod is the date the page's content last changed. Bump it when you edit a
// page; a value that changes on every request teaches crawlers to ignore it.
const PATHS = [
  { path: '/', priority: '1.0', updated: '2026-10-29', art: ['video'], scenes: ['watermarkCompare', 'iphoneSaveVideo', 'androidGallery'], steps: 'video' },
  { path: '/photo', priority: '0.9', updated: '2026-10-25', art: ['photo'], scenes: ['carouselResults'], steps: 'photo' },
  { path: '/stories', priority: '0.9', updated: '2026-10-25', art: ['stories'], steps: 'stories' },
  { path: '/audio', priority: '0.9', updated: '2026-10-25', art: ['audio'], steps: 'audio' },
  { path: '/how-to', priority: '0.8', updated: '2026-10-29', scenes: ['iphoneSafariDownload', 'iphoneFilesDownloads', 'iphoneSaveVideo', 'androidDownloaded', 'androidGallery', 'desktopDownloads'], steps: 'video' },
  { path: '/faq', priority: '0.8', updated: '2026-10-29' },
  { path: '/about', priority: '0.5', updated: '2026-10-29' },
  { path: '/contact', priority: '0.4', updated: '2026-10-25' },
  { path: '/privacy', priority: '0.3', updated: '2026-10-14' },
  { path: '/terms', priority: '0.3', updated: '2026-10-25' },
  { path: '/disclaimer', priority: '0.3', updated: '2026-10-14' },
  { path: '/dmca', priority: '0.3', updated: '2026-10-25' }
];

export async function GET() {
  const now = new Date().toISOString();
  const posts = await getPosts();
  const entries = [
    ...PATHS.map(({ updated, art = [], scenes = [], steps, ...item }) => ({
      ...item,
      lastmod: new Date(updated).toISOString(),
      changefreq: 'weekly',
      images: [
        ...art.map((key) => illustrationSrc(key)),
        ...(steps ? stepImages(steps).map((image) => image.src) : []),
        ...scenes.map((key) => sceneImage(key).src),
        pageOgImage(item.path)?.src
      ].filter(Boolean)
    })),
    {
      path: BLOG_PATH,
      priority: '0.7',
      changefreq: 'weekly',
      lastmod: posts.length ? new Date(Math.max(...posts.map((post) => post.data.updated))).toISOString() : now,
      images: [pageOgImage(BLOG_PATH)?.src].filter(Boolean)
    },
    // Posts report their real edit date, so crawlers only refetch what changed.
    ...posts.map((post) => ({
      path: postPath(post),
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: post.data.updated.toISOString(),
      images: [postImage(post)?.src].filter(Boolean)
    }))
  ];
  const urls = entries.map(({ path, priority, lastmod, changefreq, images = [] }) => `  <url>
    <loc>${absUrl(path)}</loc>${images.map((image) => `
    <image:image>
      <image:loc>${absUrl(image)}</image:loc>
    </image:image>`).join('')}
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
