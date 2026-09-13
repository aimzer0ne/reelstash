import { absUrl } from '@/lib/seo';

export default function sitemap() {
  const lastModified = new Date();
  return [
    {
      url: absUrl('/'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: absUrl('/instagram-audio-downloader'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: absUrl('/privacy'),
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3
    },
    {
      url: absUrl('/disclaimer'),
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3
    }
  ];
}
