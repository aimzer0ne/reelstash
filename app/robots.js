import { absUrl } from '@/lib/seo';

const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
  'GoogleOther',
  'Applebot-Extended',
  'Bytespider',
  'meta-externalagent',
  'FacebookBot',
  'Amazonbot',
  'cohere-ai',
  'YouBot',
  'DuckAssistBot'
];

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: '/api/'
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: '/api/'
      }))
    ],
    sitemap: absUrl('/sitemap.xml'),
    host: absUrl('/')
  };
}
