import { pageMetadata } from './site';

const UPDATED = '12 September 2026';

export const legalPages = {
  terms: {
    path: '/terms',
    heading: 'Terms of use',
    updated: UPDATED,
    metadata: pageMetadata({
      metadata: {
        title: 'Terms of Use | Reelstash',
        description: 'Terms for using Reelstash to save publicly available Instagram reels, photos, and audio.',
        keywords: ['Reelstash terms', 'Instagram downloader terms'],
        alternates: { canonical: '/terms' },
        openGraph: {
          title: 'Terms of Use | Reelstash',
          description: 'The rules for using Reelstash.',
          url: '/terms'
        },
        twitter: {
          title: 'Terms of Use | Reelstash',
          description: 'The rules for using Reelstash.'
        }
      }
    }),
    sections: [
      {
        heading: 'The short version',
        paragraphs: [
          'Reelstash is a free tool for fetching media that Instagram already shows to a logged-out visitor. You paste a public link. We try to hand you the file. That is the whole product.',
          'By using the site you agree to these terms. If you do not agree, close the tab.'
        ]
      },
      {
        heading: 'What you may use it for',
        paragraphs: [
          'Save public reels, photos, carousels, or audio that you own, or that you have permission to keep. School notes, your own campaign, a client who said yes — that kind of thing.',
          'You may not use Reelstash to take private, deleted, or login-gated posts, to harass anyone, to strip watermarks for resale, or to build a competing scrape farm off our endpoints.'
        ]
      },
      {
        heading: 'Your responsibility',
        paragraphs: [
          'You are the one hitting Download. Copyright, publicity rights, and Instagram’s own rules stay with you. If a creator did not grant you a right to keep the file, do not keep it.',
          'We do not grant you a license to the media. Instagram and the original authors do. We only move a public file from their servers to yours when the link is public.'
        ]
      },
      {
        heading: 'How the service works',
        paragraphs: [
          'Resolve and download requests go through our servers. We rate-limit abuse, sign short-lived download links, and may refuse traffic that looks automated or harmful.',
          'The tool can fail. Instagram changes their pages. A post can vanish between preview and save. We do not promise uptime, quality, or that every public link will resolve.'
        ]
      },
      {
        heading: 'Accounts and age',
        paragraphs: [
          'Reelstash does not create user accounts. You do not sign in here, and you should never type Instagram passwords into this site.',
          'You must be old enough to form a binding contract in your country, and at least 13. Do not use the tool to collect content that involves children in a way the law forbids.'
        ]
      },
      {
        heading: 'Our liability',
        paragraphs: [
          'The site is provided as-is. To the fullest extent the law allows, Reelstash is not liable for lost files, blocked downloads, copyright claims against you, or anything you do with a saved file.',
          'If a court still finds us liable, that amount is capped at zero because we do not charge you.'
        ]
      },
      {
        heading: 'Changes',
        paragraphs: [
          'We can update these terms when the product changes. The date at the top is the latest version. Keeping the tab open after that date means you are on the new terms.'
        ]
      }
    ]
  },
  privacy: {
    path: '/privacy',
    heading: 'Privacy policy',
    updated: UPDATED,
    metadata: pageMetadata({
      metadata: {
        title: 'Privacy Policy | Reelstash',
        description: 'How Reelstash handles the little data it sees when you paste a public Instagram link.',
        keywords: ['Reelstash privacy', 'Instagram downloader privacy'],
        alternates: { canonical: '/privacy' },
        openGraph: {
          title: 'Privacy Policy | Reelstash',
          description: 'What Reelstash collects and what it does not.',
          url: '/privacy'
        },
        twitter: {
          title: 'Privacy Policy | Reelstash',
          description: 'What Reelstash collects and what it does not.'
        }
      }
    }),
    sections: [
      {
        heading: 'We do not want your account',
        paragraphs: [
          'Reelstash has no sign-in. We do not ask for an Instagram username, password, email, or phone number. Do not send us those things.'
        ]
      },
      {
        heading: 'What we see',
        paragraphs: [
          'When you paste a link, our server receives that URL, your IP address, and a normal browser user-agent. We use the IP only to slow down people who hammer the API.',
          'Download links are signed tokens. They expire in a few minutes. They point at a public media URL we already resolved; they are not a profile of you.'
        ]
      },
      {
        heading: 'What we do not do',
        paragraphs: [
          'We do not sell data. We do not run ad pixels. We do not drop tracking cookies for marketing. We do not build a history of the reels you saved.',
          'If you set SITE_URL or other server environment variables, those stay on the host. They are not your personal data.'
        ]
      },
      {
        heading: 'Cookies and storage',
        paragraphs: [
          'The site does not need an account cookie. Your browser may keep the last thing you typed in the input field until you leave. That stays on your device.',
          'A host such as Vercel or Cloudflare may log requests for security and uptime. Those logs are theirs, used to keep the lights on, not to profile you.'
        ]
      },
      {
        heading: 'Third parties',
        paragraphs: [
          'To resolve a public post we contact Instagram’s public pages or media CDN. They see the same kind of request a logged-out browser would. We are not Instagram. Their privacy policy applies to what they collect on their side.',
          'Fonts may load from the host we ship with the app. We prefer self-hosted fonts through Next.js so your browser is not pinging extra companies just to draw letters.'
        ]
      },
      {
        heading: 'Children',
        paragraphs: [
          'This tool is not aimed at children under 13. We do not knowingly store information about them.'
        ]
      },
      {
        heading: 'Questions',
        paragraphs: [
          'If you think we have data we should not, or you want a log deleted on a host we control, open the site’s repository contact or the email listed on the deployment you are using. There is no user database to export.'
        ]
      }
    ]
  },
  disclaimer: {
    path: '/disclaimer',
    heading: 'Disclaimer',
    updated: UPDATED,
    metadata: pageMetadata({
      metadata: {
        title: 'Disclaimer | Reelstash',
        description: 'Reelstash is not Instagram. We only work with public posts and do not bypass privacy controls.',
        keywords: ['Reelstash disclaimer', 'not affiliated with Instagram'],
        alternates: { canonical: '/disclaimer' },
        openGraph: {
          title: 'Disclaimer | Reelstash',
          description: 'Reelstash is an independent tool for public Instagram media.',
          url: '/disclaimer'
        },
        twitter: {
          title: 'Disclaimer | Reelstash',
          description: 'Reelstash is an independent tool for public Instagram media.'
        }
      }
    }),
    sections: [
      {
        heading: 'Not Instagram, not Meta',
        paragraphs: [
          'Reelstash is an independent site. It is not endorsed, sponsored, or approved by Instagram, Meta Platforms, or any of their affiliates. Instagram and related marks belong to them.',
          'If something breaks because Instagram changed a page, that is their garden. We are a guest walking the public path.'
        ]
      },
      {
        heading: 'Public posts only',
        paragraphs: [
          'The downloader does not log in as you. It cannot open private accounts, close-friends lists, or content Instagram hides from a logged-out visitor. If a link fails, the post is probably not public — we will not try to sneak around that.'
        ]
      },
      {
        heading: 'No legal advice',
        paragraphs: [
          'Nothing on this site is legal advice. Saving a public file is not the same as owning it. When in doubt, ask the creator or a lawyer in your country.'
        ]
      },
      {
        heading: 'Accuracy',
        paragraphs: [
          'Previews, captions, and usernames come from public metadata. They can be truncated, stale, or wrong. Check the original Instagram post before you treat a caption as fact.'
        ]
      }
    ]
  },
  copyright: {
    path: '/copyright',
    heading: 'Copyright',
    updated: UPDATED,
    metadata: pageMetadata({
      metadata: {
        title: 'Copyright | Reelstash',
        description: 'How Reelstash treats copyrighted Instagram media and how to send a takedown notice.',
        keywords: ['Reelstash copyright', 'DMCA', 'takedown'],
        alternates: { canonical: '/copyright' },
        openGraph: {
          title: 'Copyright | Reelstash',
          description: 'Copyright and takedown notes for Reelstash.',
          url: '/copyright'
        },
        twitter: {
          title: 'Copyright | Reelstash',
          description: 'Copyright and takedown notes for Reelstash.'
        }
      }
    }),
    sections: [
      {
        heading: 'We do not host your reels',
        paragraphs: [
          'Reelstash does not keep a library of Instagram videos. A resolve looks up a public post. A download streams or converts that file for you. We are not a mirror and we are not a warehouse.'
        ]
      },
      {
        heading: 'Respect the people who made it',
        paragraphs: [
          'Reels, photos, audio, and captions belong to their authors or licensors unless a license says otherwise. Fair use is a courtroom word, not a download button. If you would not post it as your own, do not treat the file as yours.'
        ]
      },
      {
        heading: 'If this is your work',
        paragraphs: [
          'If you believe someone is using Reelstash to take your copyrighted work in a way that is not allowed, you can send a notice that includes: your contact email, the Instagram URL, a description of the work, a statement that you own the rights or act for the owner, and a statement that the notice is accurate.',
          'We cannot delete a file from someone else’s phone. We can refuse to resolve that public URL on this deployment if the notice is complete and we operate the server. Send it to the operator of the site you are using. Repeat abuse can get an IP blocked.'
        ]
      },
      {
        heading: 'Counter-notice',
        paragraphs: [
          'If we block a URL and you believe that was a mistake, write back with the same URL and why you have a right to use the tool on it. We may restore the resolve path or leave it blocked.'
        ]
      }
    ]
  }
};
