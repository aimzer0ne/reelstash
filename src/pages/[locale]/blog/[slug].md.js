import { absUrl } from '../../../../lib/seo.js';
import { DEFAULT_LOCALE } from '../../../../lib/i18n.js';
import { getPost, postMarkdown, postPath } from '../../../../lib/blog.js';

export async function GET({ params }) {
  const post = params.locale === DEFAULT_LOCALE ? null : await getPost(params.slug, params.locale);
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
