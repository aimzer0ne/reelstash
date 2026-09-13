import { pageMetadata } from './site';

export const legalPages = {
  privacy: {
    path: '/privacy',
    heading: 'Privacy Policy',
    metadata: pageMetadata({
      metadata: {
        title: 'Privacy Policy | Reelstash',
        description: 'Privacy Policy for Reelstash. What this Instagram downloader collects and how that information is used.',
        keywords: ['Reelstash privacy', 'Instagram downloader privacy'],
        alternates: { canonical: '/privacy' },
        openGraph: {
          title: 'Privacy Policy | Reelstash',
          description: 'Privacy Policy for Reelstash.',
          url: '/privacy'
        },
        twitter: {
          title: 'Privacy Policy | Reelstash',
          description: 'Privacy Policy for Reelstash.'
        }
      }
    })
  },
  disclaimer: {
    path: '/disclaimer',
    heading: 'Disclaimer',
    metadata: pageMetadata({
      metadata: {
        title: 'Disclaimer | Reelstash',
        description: 'Reelstash does not host Instagram videos or images. Download links come from Instagram CDN servers.',
        keywords: ['Reelstash disclaimer', 'not affiliated with Instagram'],
        alternates: { canonical: '/disclaimer' },
        openGraph: {
          title: 'Disclaimer | Reelstash',
          description: 'Disclaimer for Reelstash.',
          url: '/disclaimer'
        },
        twitter: {
          title: 'Disclaimer | Reelstash',
          description: 'Disclaimer for Reelstash.'
        }
      }
    })
  }
};
