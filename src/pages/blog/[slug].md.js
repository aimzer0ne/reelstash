import { getPosts, postMarkdown } from '../../../lib/blog.js';

export async function getStaticPaths() {
  const posts = await getPosts();
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

// The Worker (worker.js) adds the canonical link and noindex headers.
export function GET({ props }) {
  return new Response(postMarkdown(props.post), {
    headers: { 'content-type': 'text/markdown; charset=utf-8' }
  });
}
