import { SITE_ORIGIN, absUrl, organizationJsonLd, homeHowToJsonLd, audioHowToJsonLd, DEFAULT_OG_IMAGE, OG_IMAGE_PATH } from './seo';
import { illustrationJsonLd } from './images.js';

// One entry per downloader page: the header tabs, the footer, and the
// "What can you download?" hub on every tool page all read from this list.
export const NAV = [
  {
    href: '/',
    label: 'Reels & Video',
    name: 'Instagram Reels & Video Downloader',
    icon: 'reels',
    text: 'Save any public Instagram video or Reel as an HD MP4 with its original sound and music, and no watermark.'
  },
  {
    href: '/photo',
    label: 'Photo',
    name: 'Instagram Photo & Carousel Downloader',
    icon: 'copy',
    text: 'Save full-resolution JPG photos instead of screenshots, and every slide of a carousel post from one link.'
  },
  {
    href: '/stories',
    label: 'Story',
    name: 'Instagram Story & Highlights Downloader',
    icon: 'again',
    text: 'Keep public Stories before they expire after 24 hours, and save whole Highlight albums as video or photo.'
  },
  {
    href: '/audio',
    label: 'Audio',
    name: 'Instagram Audio Downloader (MP3)',
    icon: 'audio',
    text: 'Convert a Reel or video to MP3, or paste an Instagram audio link to keep only the song, music, or voice.'
  }
];

export const RESOURCE_LINKS = [
  { href: '/how-to', label: 'How to download' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog & guides' },
  { href: '/contact', label: 'Contact us' }
];

export const LEGAL_LINKS = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/dmca', label: 'DMCA & copyright' }
];

export const homePage = {
  path: '/',
  mode: 'media',
  kicker: null,
  heading: 'Instagram Reels Downloader',
  lede: 'Free Instagram downloader. Paste a link to save any Reel, video, photo, or carousel.',
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
    heading: 'How to download Instagram Reels',
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
        text: 'ReelsDl.net is a free Instagram Reels downloader. It saves public Reels as MP4 with their music, and also works as an Instagram video downloader for photos, carousels, and audio.',
        a: <>ReelsDl.net is a free <strong>Instagram Reels downloader</strong>. It saves public Reels as MP4 with their music, and also works as an <strong>Instagram video downloader</strong> for photos, carousels, and audio.</>
      },
      {
        q: 'How do I download an Instagram Reel with music?',
        text: 'Copy the Reel link in Instagram, paste it into ReelsDl.net, and tap Download video. The MP4 keeps the Reel\'s original audio, including licensed music.',
        a: <>Copy the Reel link in Instagram, paste it into ReelsDl.net, and tap <strong>Download video</strong>. The MP4 keeps the Reel&apos;s original audio, including licensed music.</>
      },
      {
        q: 'How do I save an Instagram Reel or video to my iPhone camera roll?',
        text: 'Download it in Safari. It is saved to Files, Downloads. Open it, tap Share, and choose Save Video. It then appears in the Photos app.',
        a: <>Download it in Safari. It is saved to <strong>Files → Downloads</strong>. Open it, tap Share, and choose <strong>Save Video</strong>. It then appears in the Photos app. Full steps: <a href="/blog/download-instagram-videos-on-iphone">download Instagram videos on iPhone</a>.</>
      },
      {
        q: 'Why does a downloaded Reel have no sound?',
        text: 'The MP4 includes the audio track. If it plays silently, check that your phone is not on silent and try another player such as VLC. A few Reels have their music muted by Instagram for copyright reasons; those stay silent everywhere.',
        a: <>The MP4 includes the audio track. If it plays silently, check that your phone is not on silent and try another player such as VLC. A few Reels have their music muted by Instagram for copyright reasons; those stay silent everywhere.</>
      },
      {
        q: 'Does the creator know if I download their Reel or video?',
        text: 'No. ReelsDl.net fetches the public post without your Instagram account, so nothing links the download to you and the creator is not notified.',
        a: <>No. ReelsDl.net fetches the public post without your Instagram account, so nothing links the download to you and the creator is <strong>not notified</strong>.</>
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
          alternateName: ['ReelsDl', 'ReelsDl Reels Downloader', 'ReelsDl Instagram Reels Downloader'],
          description: 'Free Instagram Reels downloader and Instagram video downloader for public posts: Reels, videos, photos, carousels, and MP3 audio. No login.',
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
          name: 'ReelsDl.net Instagram Reels Downloader',
          alternateName: ['Reels Downloader', 'Instagram Reel Downloader', 'Instagram Video Downloader'],
          applicationCategory: 'MultimediaApplication',
          applicationSubCategory: 'Instagram Reels downloader',
          operatingSystem: 'Any',
          browserRequirements: 'Requires JavaScript',
          isAccessibleForFree: true,
          inLanguage: 'en-US',
          image: absUrl(OG_IMAGE_PATH),
          publisher: { '@id': absUrl('/#organization') },
          description: 'Instagram Reels downloader and Instagram video downloader. Paste a public Instagram link to save Reels and videos as MP4, or photos and carousel posts as JPG. No Instagram login.',
          featureList: [
            'Instagram Reels downloads in HD',
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
          name: 'Instagram Reels Downloader – HD, No Watermark | ReelsDl.net',
          isPartOf: { '@id': absUrl('/#website') },
          about: { '@id': absUrl('/#app') },
          primaryImageOfPage: illustrationJsonLd('video', SITE_ORIGIN),
          inLanguage: 'en-US',
          description: 'Free Instagram Reels downloader. Paste a Reel link to download Reels in HD with music and no watermark. Also an Instagram video downloader. No login, no app.'
        }
      ]
    },
    homeHowToJsonLd
  ],
  metadata: {
    title: 'Instagram Reels Downloader – HD, No Watermark | ReelsDl.net',
    description: 'Free Instagram Reels downloader. Paste a Reel link to download Reels in HD with music and no watermark. Also an Instagram video downloader. No login, no app.',
    keywords: [
      'Instagram Reels downloader',
      'Reels downloader',
      'Instagram reel downloader',
      'download Instagram Reels',
      'Instagram video downloader',
      'Instagram photo downloader',
      'Instagram carousel downloader',
      'save Instagram reels',
      'Instagram MP4 downloader',
      'ReelsDl.net',
      'download Instagram video without login'
    ],
    alternates: { canonical: '/' },
    openGraph: {
      title: 'Instagram Reels Downloader – HD, No Watermark | ReelsDl.net',
      description: 'Free Instagram Reels downloader. Paste a Reel link to download Reels in HD with music and no watermark. Also an Instagram video downloader. No login, no app.',
      url: '/'
    },
    twitter: {
      title: 'Instagram Reels Downloader – HD, No Watermark | ReelsDl.net',
      description: 'Free Instagram Reels downloader. Paste a Reel link to download Reels in HD with music and no watermark. Also an Instagram video downloader. No login, no app.'
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
  path: '/audio',
  mode: 'audio',
  heading: 'Instagram Audio Downloader – Reels to MP3',
  lede: 'Convert any Instagram Reel or video to MP3, or paste an audio link to download the sound.',
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
              <a href="/audio">Instagram audio downloader</a>{' '}
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
        q: 'Can I paste a Reel video link or an audio link?',
        text: 'Both work. Paste the link of a public Reel or video post and the tool converts the video to an MP3 audio file. Paste an Instagram audio link and it downloads that sound as an MP3.',
        a: (
          <>
            <p>
              Both work. Paste the link of a public <b>Reel or video post</b> and
              the tool <b>converts the video to an MP3</b> audio file.
            </p>
            <p>
              Paste an <b>Instagram audio link</b> (<b>/reels/audio/</b>) and it
              downloads that sound as an MP3.
            </p>
          </>
        )
      },
      {
        q: 'What quality is the Instagram MP3?',
        text: 'The MP3 is made from the audio track Instagram serves with the Reel, so it sounds the same as it does in the app. Instagram compresses audio on upload, so no tool can give you a studio-quality copy of the song.',
        a: (
          <p>
            The MP3 is made from the <b>audio track Instagram serves</b> with the
            Reel, so it sounds the same as it does in the app. Instagram
            compresses audio on upload, so no tool can give you a studio-quality
            copy of the song.
          </p>
        )
      },
      {
        q: 'Where is the MP3 saved on iPhone and Android?',
        text: 'On iPhone, Safari saves the MP3 in the Files app under Downloads. On Android, it goes to the Download folder, where music players such as VLC or Samsung Music can find it. On a computer, it is in your browser Downloads folder.',
        a: (
          <p>
            On <b>iPhone</b>, Safari saves the MP3 in the <b>Files</b> app under
            Downloads. On <b>Android</b>, it goes to the <b>Download</b> folder,
            where music players such as VLC or Samsung Music can find it. On a
            computer, it is in your browser&apos;s Downloads folder.
          </p>
        )
      },
      {
        q: 'Can I use Instagram Reel audio as a ringtone?',
        text: 'Yes. Download the Reel audio as an MP3, then add it as a ringtone in your phone settings. On iPhone the clip must be shorter than 30 seconds. The full steps are in the guide on extracting audio from an Instagram Reel.',
        a: (
          <p>
            Yes. Download the Reel audio as an MP3, then add it as a ringtone in
            your phone settings. On iPhone the clip must be shorter than 30
            seconds. The full steps are in{' '}
            <a href="/blog/extract-audio-from-instagram-reel-mp3">how to extract audio from an Instagram Reel</a>.
          </p>
        )
      },
      {
        q: 'Is there a limit on Instagram audio downloads?',
        text: 'No. There is no daily limit. You can convert as many public Reels and videos to MP3 as you want, for free.',
        a: (
          <p>
            No. There is no daily limit. You can convert as many public Reels
            and videos to MP3 as you want, for <b>free</b>.
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
          '@id': absUrl('/audio#webpage'),
          url: absUrl('/audio'),
          name: 'Instagram Audio Downloader – Reel to MP3',
          description: 'Free Instagram audio downloader. Convert any Reel or video to MP3, or download a sound from its audio link. Works on iPhone, Android and PC, no login.',
          isPartOf: { '@id': absUrl('/#website') },
          primaryImageOfPage: illustrationJsonLd('audio', SITE_ORIGIN),
          inLanguage: 'en-US'
        },
        {
          '@type': ['WebApplication', 'SoftwareApplication'],
          '@id': absUrl('/audio#app'),
          url: absUrl('/audio'),
          name: 'ReelsDl.net Instagram Audio Downloader',
          applicationCategory: 'MultimediaApplication',
          applicationSubCategory: 'Instagram audio downloader',
          operatingSystem: 'Any',
          browserRequirements: 'Requires JavaScript',
          isAccessibleForFree: true,
          inLanguage: 'en-US',
          publisher: { '@id': absUrl('/#organization') },
          description: 'Instagram audio downloader and Reel to MP3 converter. Converts public Instagram Reels and videos to MP3, or downloads a sound from its Instagram audio link. No login.',
          featureList: [
            'Instagram Reel to MP3 conversion',
            'Instagram video to MP3 conversion',
            'Download a sound from an Instagram audio link',
            'Works on iPhone, Android, Windows and Mac',
            'No Instagram login required',
            'Free with no download limit'
          ],
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Instagram Audio Downloader', item: absUrl('/audio') }
          ]
        }
      ]
    },
    audioHowToJsonLd
  ],
  metadata: {
    title: 'Instagram Audio Downloader – Reel to MP3 | ReelsDl.net',
    description: 'Free Instagram audio downloader. Convert any Reel or video to MP3, or download a sound from its audio link. Works on iPhone, Android and PC, no login.',
    keywords: [
      'instagram audio downloader',
      'instagram reel to mp3',
      'reels audio download',
      'instagram video to mp3',
      'instagram mp3 downloader',
      'download instagram audio',
      'instagram music downloader',
      'reels song download',
      'extract audio from instagram reel',
      'ReelsDl.net audio'
    ],
    alternates: { canonical: '/audio' },
    openGraph: {
      title: 'Instagram Audio Downloader – Reel to MP3 | ReelsDl.net',
      description: 'Convert any public Instagram Reel or video to MP3, or download a sound from its audio link. Free, fast, no login.',
      url: '/audio'
    },
    twitter: {
      title: 'Instagram Audio Downloader – Reel to MP3 | ReelsDl.net',
      description: 'Convert any public Instagram Reel or video to MP3. Free, no account required.'
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
