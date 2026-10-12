import { SITE_ORIGIN, absUrl, organizationJsonLd, homeHowToJsonLd, audioHowToJsonLd, DEFAULT_OG_IMAGE, OG_IMAGE_PATH } from './seo';

export const NAV = [
  { href: '/', label: 'Reels Downloader', icon: 'reels' },
  { href: '/instagram-audio-downloader', label: 'Audio MP3', icon: 'audio' }
];

export const LEGAL_LINKS = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/disclaimer', label: 'Disclaimer' }
];

export const homePage = {
  path: '/',
  mode: 'media',
  kicker: null,
  heading: 'Instagram Reels Downloader',
  lede: 'Free Instagram video downloader. Paste a link to save any Reel, video, photo, or carousel.',
  inputLabel: 'Instagram reel or post URL',
  placeholder: 'Paste an Instagram URL',
  downloadLabel: 'Download',
  footerLead: null,
  messages: {
    emptyUrl: 'Paste a public Instagram reel or post link first.',
    invalidUrl: 'NOT an Instagram link ;(',
    resolveFailed: 'We could not fetch that link right now.',
    unexpected: 'Something went wrong while fetching that link.',
    clipboardBlocked: 'Clipboard access was blocked. Paste the Instagram link into the field instead.',
    loaderStatus: 'Finding media…'
  },
  summary: {
    defaultTitle: 'Public Instagram post',
    one: '1 item ready',
    manySuffix: ' items ready'
  },
  feature: {
    image: OG_IMAGE_PATH,
    alt: 'Instagram Reels downloader on ReelsDl.net — paste a public link on your phone and save the video',
    text: (
      <>
        <h2>Instagram Video Downloader</h2>
        <p>ReelsDl.net is a simple and fast tool that helps users download Instagram content without complicated steps. With ReelsDl.net, you can paste the link of an Instagram reel and quickly save the video to your device. The tool also supports downloading individual photos and complete carousels, making it useful for types of Instagram posts. In addition, users can extract and download the audio from reels as an MP3 file. No Instagram login is required, and the interface makes the process easy for everyone. Just copy the Instagram link, paste it into ReelsDl.net, preview the content, and download what you need.</p>
      </>
    )
  },
  why: {
    heading: 'Why Use ReelsDl.net?',
    items: [
      { icon: 'paste', title: 'Fast & Simple', text: 'Download Instagram content in just a few clicks. Simply copy the link, paste it into ReelsDl.net, and download.' },
      { icon: 'reels', title: 'Download Reels', text: 'Save your favorite Instagram Reels quickly in high quality for easy offline access.' },
      { icon: 'copy', title: 'Photos & Carousels', text: 'Download individual photos or save multiple images from Instagram carousel posts.' },
      { icon: 'audio', title: 'Audio MP3', text: 'Extract and download the audio from supported Reels as an MP3 file.' },
      { icon: 'link', title: 'No Login Required', text: 'No Instagram account login is needed. Just paste a public Instagram link and get started.' },
      { icon: 'download', title: 'Free & Easy to Use', text: 'Enjoy a straightforward downloading experience without complicated steps or software installation.' },
      { icon: 'again', title: 'Works on Any Device', text: 'Use ReelsDl.net directly from your browser on mobile, tablet, laptop, or desktop.' },
      { icon: 'mark', title: 'One Tool, Multiple Downloads', text: 'Reels • Photos • Carousels • Audio MP3 — everything you need in one simple downloader.' }
    ]
  },
  how: {
    heading: 'How to use the Instagram Reels Downloader',
    steps: [
      {
        icon: 'copy',
        title: 'Copy Reels Link',
        text: <>Copy Reels Video Link from instagram by taping on 3 Dots Button (&#8942;) and then Click on <b>&quot;Copy Link&quot;</b></>
      },
      {
        icon: 'paste',
        title: 'Paste Reels Link',
        text: <>Paste the &quot;copied link&quot; in Input Box</>
      },
      {
        icon: 'download',
        title: 'Download Reels',
        text: <>Wait a bit to get Reels Video & then Click <b>&quot;Download Video&quot;</b> to Save Reels (mp4) video</>
      }
    ]
  },
  faq: {
    heading: 'Frequently asked questions',
    items: [
      {
        q: 'What is ReelsDl.net?',
        text: 'ReelsDl.net is an easy-to-use Instagram downloader that lets you save publicly available reels, photos, carousels, and audio from Instagram.',
        a: <>ReelsDl.net is an easy-to-use Instagram downloader that lets you save publicly available reels, photos, carousels, and audio from Instagram.</>
      },
      {
        q: 'How do I download an Instagram Reel?',
        text: 'Copy the public Instagram Reel link, paste it into ReelsDl.net, and click the download button. Your Reel will be ready to save in seconds.',
        a: <>Copy the public Instagram Reel link, paste it into ReelsDl.net, and click the <strong>download</strong> button. Your Reel will be ready to save in seconds.</>
      },
      {
        q: 'Is this an Instagram video downloader or a Reels downloader?',
        text: 'Both. ReelsDl.net is an Instagram video downloader and a Reels downloader in one tool. Paste the link of a public Reel or a public video post and it saves the MP4. The same box also handles photos and carousels.',
        a: <>Both. ReelsDl.net is an <strong>Instagram video downloader</strong> and a <strong>Reels downloader</strong> in one tool. Paste the link of a public Reel or a public video post and it saves the MP4. The same box also handles photos and carousels.</>
      },
      {
        q: 'What quality does the Instagram video downloader save?',
        text: 'The Instagram video downloader saves the highest-quality MP4 that Instagram serves for that post, with its original sound. Most Reels are 1080 pixels wide. No tool can give you a higher resolution than the one Instagram stores.',
        a: <>The Instagram video downloader saves the <strong>highest-quality MP4</strong> that Instagram serves for that post, with its original sound. Most Reels are 1080 pixels wide. No tool can give you a higher resolution than the one Instagram stores.</>
      },
      {
        q: 'Does the Reels downloader need an app or extension?',
        text: 'No. The Reels downloader runs in your browser on iPhone, Android, Windows, and Mac. There is nothing to install, and you never enter your Instagram password.',
        a: <>No. The Reels downloader runs in your browser on iPhone, Android, Windows, and Mac. There is <strong>nothing to install</strong>, and you never enter your Instagram password.</>
      },
      {
        q: 'Can I download Instagram photos?',
        text: 'Yes. ReelsDl.net lets you download individual photos from publicly available Instagram posts.',
        a: <>Yes. ReelsDl.net lets you download individual photos from publicly available Instagram posts.</>
      },
      {
        q: 'Can I download Instagram carousels?',
        text: 'Yes. You can download the photos and videos available in a public Instagram carousel.',
        a: <>Yes. You can download the photos and videos available in a public Instagram carousel.</>
      },
      {
        q: 'Can I download audio from Instagram Reels?',
        text: 'Yes. ReelsDl.net can extract the audio from supported public Reels and let you download it as an MP3 file.',
        a: <>Yes. ReelsDl.net can extract the audio from supported public Reels and let you download it as an MP3 file.</>
      },
      {
        q: 'Do I need to log in to Instagram?',
        text: 'No. ReelsDl.net does not require you to log in to your Instagram account to download publicly available content.',
        a: <>No. ReelsDl.net does not require you to log in to your Instagram account to download <strong>publicly available</strong> content.</>
      },
      {
        q: 'Is ReelsDl.net free to use?',
        text: 'Yes, ReelsDl.net is designed to provide a simple and fast downloading experience without requiring a paid subscription.',
        a: <>Yes, ReelsDl.net is designed to provide a simple and <strong>free</strong> downloading experience without requiring a paid subscription.</>
      },
      {
        q: 'Can I use ReelsDl.net on my phone?',
        text: 'Yes. ReelsDl.net works through your web browser, so you can use it on smartphones, tablets, laptops, and desktop computers.',
        a: <>Yes. ReelsDl.net works through your web browser, so you can use it on <strong>smartphones</strong>, tablets, laptops, and desktop computers.</>
      },
      {
        q: 'Can I download private Instagram posts?',
        text: 'No. ReelsDl.net is intended for publicly accessible Instagram content and cannot download content from private accounts.',
        a: <>No. ReelsDl.net is intended for publicly accessible Instagram content and cannot download content from <strong>private accounts</strong>.</>
      },
      {
        q: 'Where are my downloaded files saved?',
        text: 'Downloaded files are normally saved to your device\'s default Downloads folder, unless your browser asks you to choose another location.',
        a: <>Downloaded files are normally saved to your device&apos;s default <strong>Downloads</strong> folder, unless your browser asks you to choose another location.</>
      },
      {
        q: 'Is ReelsDl.net affiliated with Instagram?',
        text: 'No. ReelsDl.net is an independent third-party tool and is not affiliated with, endorsed by, or sponsored by Instagram.',
        a: <>No. ReelsDl.net is an independent third-party tool and is not affiliated with, endorsed by, or sponsored by Instagram.</>
      },
      {
        q: 'Is downloading Instagram content allowed?',
        text: 'Only download content you have permission to use. Respect the original creator\'s copyright, privacy, and Instagram\'s terms when using downloaded content.',
        a: <>Only download content you have permission to use. Respect the original creator&apos;s copyright, privacy, and Instagram&apos;s terms when using downloaded content.</>
      }
    ]
  },
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@graph': [
        organizationJsonLd,
        {
          '@type': 'WebSite',
          '@id': absUrl('/#website'),
          url: absUrl('/'),
          name: 'ReelsDl.net',
          alternateName: ['ReelsDl', 'ReelsDl Instagram Video Downloader', 'ReelsDl Reels Downloader'],
          description: 'Free Instagram video downloader and Reels downloader for public posts: Reels, videos, photos, carousels, and MP3 audio. No login.',
          inLanguage: 'en-US',
          publisher: { '@id': absUrl('/#organization') },
          potentialAction: {
            '@type': 'Action',
            name: 'Download public Instagram media',
            target: absUrl('/')
          }
        },
        {
          '@type': ['WebApplication', 'SoftwareApplication'],
          '@id': absUrl('/#app'),
          url: absUrl('/'),
          name: 'ReelsDl.net Instagram Video Downloader',
          alternateName: ['Instagram Reels Downloader', 'Reels Downloader', 'Instagram Video Downloader'],
          applicationCategory: 'MultimediaApplication',
          applicationSubCategory: 'Instagram video downloader',
          operatingSystem: 'Any',
          browserRequirements: 'Requires JavaScript',
          isAccessibleForFree: true,
          inLanguage: 'en-US',
          image: absUrl(OG_IMAGE_PATH),
          publisher: { '@id': absUrl('/#organization') },
          description: 'Instagram video downloader and Reels downloader. Paste a public Instagram link to save Reels and videos as MP4, or photos and carousel posts as JPG. No Instagram login.',
          featureList: [
            'Instagram reel downloads',
            'Instagram video downloads',
            'Instagram photo downloads',
            'Instagram carousel downloads',
            'Instagram audio to MP3',
            'No Instagram login required',
            'Public posts only'
          ],
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          downloadUrl: absUrl('/'),
          installUrl: absUrl('/')
        },
        {
          '@type': 'WebPage',
          '@id': absUrl('/#webpage'),
          url: absUrl('/'),
          name: 'Instagram Video Downloader – Reels Downloader | ReelsDl.net',
          isPartOf: { '@id': absUrl('/#website') },
          about: { '@id': absUrl('/#app') },
          inLanguage: 'en-US',
          description: 'Free Instagram video downloader and Reels downloader. Paste a link to save Reels, videos, photos, and carousels in HD — no login, no app, no watermark.'
        }
      ]
    },
    homeHowToJsonLd
  ],
  metadata: {
    title: 'Instagram Video Downloader – Reels Downloader | ReelsDl.net',
    description: 'Free Instagram video downloader and Reels downloader. Paste a link to save Reels, videos, photos, and carousels in HD — no login, no app, no watermark.',
    keywords: [
      'Instagram video downloader',
      'Instagram Reels downloader',
      'Reels downloader',
      'Instagram reel downloader',
      'Instagram photo downloader',
      'Instagram carousel downloader',
      'download Instagram reels',
      'save Instagram reels',
      'Instagram MP4 downloader',
      'ReelsDl.net',
      'download Instagram video without login'
    ],
    alternates: { canonical: '/' },
    openGraph: {
      title: 'Instagram Video Downloader – Reels Downloader | ReelsDl.net',
      description: 'Free Instagram video downloader and Reels downloader. Paste a link to save Reels, videos, photos, and carousels in HD — no login, no app, no watermark.',
      url: '/'
    },
    twitter: {
      title: 'Instagram Video Downloader – Reels Downloader | ReelsDl.net',
      description: 'Free Instagram video downloader and Reels downloader. Paste a link to save Reels, videos, photos, and carousels in HD — no login, no app, no watermark.'
    }
  }
};

homePage.jsonLd.push({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homePage.faq.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.text || item.a }
  }))
});

export const audioPage = {
  path: '/instagram-audio-downloader',
  mode: 'audio',
  heading: 'Download reels audio - mp3',
  lede: 'Convert Reel video to MP3 audio. Paste direct link to get audio file ...',
  inputLabel: 'Instagram reel, video, or audio URL',
  placeholder: 'Paste a reel or audio URL and press Enter',
  downloadLabel: 'Download MP3',
  footerLead: null,
  messages: {
    emptyUrl: 'Paste a public Instagram reel, video, or audio link first.',
    invalidUrl: 'That does not look like an Instagram link.',
    resolveFailed: 'We could not extract audio from that link.',
    unexpected: 'Something went wrong while extracting audio.',
    clipboardBlocked: 'Clipboard access was blocked. Paste the Instagram link into the field instead.',
    loaderStatus: 'Extracting audio…'
  },
  summary: {
    defaultTitle: 'Instagram audio',
    one: '1 MP3 ready',
    manySuffix: ' MP3 files ready'
  },
  how: {
    heading: 'How to download Instagram Reel audio as MP3',
    steps: [
      {
        icon: 'copy',
        title: 'Copy Reels/Video Link',
        text: <>Copy Reels/Video Link for Audio from instagram by taping on 3 Dots Button (&#8942;) and then Click on <b>&quot;Copy Link&quot;</b></>
      },
      {
        icon: 'paste',
        title: 'Paste Reels/Video Link',
        text: <>Paste the &quot;copied link&quot; in Input Box</>
      },
      {
        icon: 'download',
        title: 'Download Audio',
        text: <>Wait a Few seconds to convert audio File & then Click <b>&quot;Download Audio&quot;</b> to Save <b>Reels Video to Audio </b> (mp3) file</>
      }
    ]
  },
  faq: {
    heading: 'Frequently asked questions',
    items: [
      {
        q: 'Can I convert an Instagram Reel or video into audio?',
        open: true,
        text: 'Yes. You can download only the audio of an Instagram Reel as an MP3. It is useful when you want the background song, music, or voice. Enter the Reel or video link in the input box and the tool gets the MP3 file for you.',
        a: (
          <>
            <p>
              Yes. You can <b>download Instagram Reels audio</b> only, as an
              MP3. It is useful when you want the <i>background song, music,
              or voice</i>.
            </p>
            <p>
              Enter the Reel or video link in the input box of the{' '}
              <a href="/instagram-audio-downloader">Instagram audio downloader</a>{' '}
              and the tool gets the MP3 file for you.
            </p>
          </>
        )
      },
      {
        q: 'How do I download the MP3 file?',
        open: true,
        text: 'Paste the Reel URL, then click the Download Audio button. The Reel audio MP3 file is saved to your Downloads folder. The tool works on iPhone, Android, PC, and Mac.',
        a: (
          <>
            <p>
              Paste the <b>Reel URL</b>, then click the{' '}
              <b>&quot;Download Audio&quot;</b> button. The <b>Reel audio MP3</b>{' '}
              file is saved to your Downloads folder.
            </p>
            <p>
              The tool works on iPhone, Android, PC, and Mac. To save the
              video instead, use the <a href="/">Reels Downloader</a>.
            </p>
          </>
        )
      },
      {
        q: 'Is there a limit on Reels audio MP3 downloads?',
        text: 'No. There is no limit for downloading Reels, Stories, videos, photos, or audio MP3. You can download as much as you want.',
        a: (
          <p>
            No. There is no limit for downloading Reels, Stories, videos,
            photos, or audio MP3. You can download as much as you want.
          </p>
        )
      },
      {
        q: 'Can I install the Reels audio downloader as an app?',
        text: 'Yes. You can install ReelsDl.net as a web app on Android and iOS and open the audio MP3 downloader directly. Use the Install button when your browser offers it, or choose Add to Home Screen from the browser menu.',
        a: (
          <>
            <p>
              Yes. You can install ReelsDl.net as a web app on Android and
              iOS and open the audio MP3 downloader directly.
            </p>
            <p>
              <b>To install the ReelsDl.net app:</b> use the{' '}
              <b>Install</b> button when your browser offers it, or choose{' '}
              <b>Add to Home Screen</b> from the browser menu.
            </p>
          </>
        )
      }
    ]
  },
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@graph': [
        organizationJsonLd,
        {
          '@type': 'WebPage',
          '@id': absUrl('/instagram-audio-downloader#webpage'),
          url: absUrl('/instagram-audio-downloader'),
          name: 'Instagram Reel Audio Downloader',
          description: 'Download audio from public Instagram reels and videos as MP3.',
          isPartOf: { '@id': absUrl('/#website') },
          inLanguage: 'en-US'
        },
        {
          '@type': ['WebApplication', 'SoftwareApplication'],
          '@id': absUrl('/instagram-audio-downloader#app'),
          url: absUrl('/instagram-audio-downloader'),
          name: 'ReelsDl.net Instagram Audio Downloader',
          applicationCategory: 'MultimediaApplication',
          applicationSubCategory: 'Instagram audio downloader',
          operatingSystem: 'Any',
          browserRequirements: 'Requires JavaScript',
          isAccessibleForFree: true,
          inLanguage: 'en-US',
          publisher: { '@id': absUrl('/#organization') },
          description: 'Extract MP3 audio from publicly available Instagram reels and videos. No login.',
          featureList: [
            'Instagram reel audio download',
            'Instagram audio to MP3',
            'Direct audio stream download',
            'ffmpeg audio extraction',
            'No Instagram login required'
          ],
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Instagram Audio Downloader', item: absUrl('/instagram-audio-downloader') }
          ]
        }
      ]
    },
    audioHowToJsonLd
  ],
  metadata: {
    title: 'Instagram Reel Audio Downloader — Download MP3 | ReelsDl.net',
    description: 'Download Instagram reel audio as MP3. Free Instagram audio downloader for public reels and videos — extract soundtrack only, no login required.',
    keywords: [
      'instagram audio downloader',
      'reels audio downloader',
      'instagram audio download mp3',
      'download reel audio',
      'instagram mp3',
      'extract audio from instagram reel',
      'ReelsDl.net audio',
      'instagram reel to mp3'
    ],
    alternates: { canonical: '/instagram-audio-downloader' },
    openGraph: {
      title: 'Instagram Reel Audio Downloader — MP3 | ReelsDl.net',
      description: 'Extract and download audio from public Instagram reels and videos as MP3. Fast Instagram audio downloader, no login.',
      url: '/instagram-audio-downloader'
    },
    twitter: {
      title: 'Instagram Reel Audio Downloader — MP3 | ReelsDl.net',
      description: 'Download Instagram reel audio as MP3 from public posts. No account required.'
    }
  }
};

audioPage.jsonLd.push({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: audioPage.faq.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.text || item.a }
  }))
});

export function pageMetadata(page) {
  return {
    title: page.metadata.title,
    description: page.metadata.description,
    keywords: page.metadata.keywords,
    authors: [{ name: 'ReelsDl.net', url: SITE_ORIGIN }],
    creator: 'ReelsDl.net',
    publisher: 'ReelsDl.net',
    category: 'utilities',
    alternates: page.metadata.alternates,
    openGraph: {
      type: 'website',
      siteName: 'ReelsDl.net',
      locale: 'en_US',
      images: [DEFAULT_OG_IMAGE],
      ...page.metadata.openGraph
    },
    twitter: {
      card: 'summary_large_image',
      ...page.metadata.twitter
    }
  };
}
