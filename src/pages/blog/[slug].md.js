import { absUrl } from '../../../lib/seo.js';
import { getPost, postMarkdown, postPath } from '../../../lib/blog.js';

export async function GET({ params }) {
  const post = await getPost(params.slug);
  if (!post) return new Response('Not found', { status: 404 });
  return new Response(postMarkdown(post), {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      // The HTML article stays the canonical page for search engines.
      link: `<${absUrl(postPath(post))}>; rel="canonical"`,
      'x-robots-tag': 'noindex, follow'
    }
  });
}
