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
  lede: 'Download any reel, photo, or carousel | get the link. click download ;) ',
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
    image: '/reelstash-home.jpg',
    alt: 'Reelstash Instagram Reels downloader — paste a public link on your phone and save the file',
    text: (
      <>
        <h2>Instagram Video Downloader</h2>
        <p>Reelstash is a simple and fast tool that helps users download Instagram content without complicated steps. With Reelstash, you can paste the link of an Instagram reel and quickly save the video to your device. The tool also supports downloading individual photos and complete carousels, making it useful for types of Instagram posts. In addition, users can extract and download the audio from reels as an MP3 file. No Instagram login is required, and the interface makes the process easy for everyone. Just copy the Instagram link, paste it into Reelstash, preview the content, and download what you need.</p>
      </>
    )
  },
  why: {
    heading: 'Why Use Reelstash?',
    items: [
      { icon: 'paste', title: 'Fast & Simple', text: 'Download Instagram content in just a few clicks. Simply copy the link, paste it into Reelstash, and download.' },
      { icon: 'reels', title: 'Download Reels', text: 'Save your favorite Instagram Reels quickly in high quality for easy offline access.' },
      { icon: 'copy', title: 'Photos & Carousels', text: 'Download individual photos or save multiple images from Instagram carousel posts.' },
      { icon: 'audio', title: 'Audio MP3', text: 'Extract and download the audio from supported Reels as an MP3 file.' },
      { icon: 'link', title: 'No Login Required', text: 'No Instagram account login is needed. Just paste a public Instagram link and get started.' },
      { icon: 'download', title: 'Free & Easy to Use', text: 'Enjoy a straightforward downloading experience without complicated steps or software installation.' },
      { icon: 'again', title: 'Works on Any Device', text: 'Use Reelstash directly from your browser on mobile, tablet, laptop, or desktop.' },
      { icon: 'mark', title: 'One Tool, Multiple Downloads', text: 'Reels • Photos • Carousels • Audio MP3 — everything you need in one simple downloader.' }
    ]
  },
  how: {
    heading: 'How to Download Insta Reels ?',
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
    heading: 'Questions',
    items: [
      {
        q: 'What is Reelstash?',
        text: 'Reelstash is an easy-to-use Instagram downloader that lets you save publicly available reels, photos, carousels, and audio from Instagram.',
        a: <>Reelstash is an easy-to-use Instagram downloader that lets you save publicly available reels, photos, carousels, and audio from Instagram.</>
      },
      {
        q: 'How do I download an Instagram Reel?',
        text: 'Copy the public Instagram Reel link, paste it into Reelstash, and click the download button. Your Reel will be ready to save in seconds.',
        a: <>Copy the public Instagram Reel link, paste it into Reelstash, and click the <strong>download</strong> button. Your Reel will be ready to save in seconds.</>
      },
      {
        q: 'Can I download Instagram photos?',
        text: 'Yes. Reelstash lets you download individual photos from publicly available Instagram posts.',
        a: <>Yes. Reelstash lets you download individual photos from publicly available Instagram posts.</>
      },
      {
        q: 'Can I download Instagram carousels?',
        text: 'Yes. You can download the photos and videos available in a public Instagram carousel.',
        a: <>Yes. You can download the photos and videos available in a public Instagram carousel.</>
      },
      {
        q: 'Can I download audio from Instagram Reels?',
        text: 'Yes. Reelstash can extract the audio from supported public Reels and let you download it as an MP3 file.',
        a: <>Yes. Reelstash can extract the audio from supported public Reels and let you download it as an MP3 file.</>
      },
      {
        q: 'Do I need to log in to Instagram?',
        text: 'No. Reelstash does not require you to log in to your Instagram account to download publicly available content.',
        a: <>No. Reelstash does not require you to log in to your Instagram account to download <strong>publicly available</strong> content.</>
      },
      {
        q: 'Is Reelstash free to use?',
        text: 'Yes, Reelstash is designed to provide a simple and fast downloading experience without requiring a paid subscription.',
        a: <>Yes, Reelstash is designed to provide a simple and <strong>free</strong> downloading experience without requiring a paid subscription.</>
      },
      {
        q: 'Can I use Reelstash on my phone?',
        text: 'Yes. Reelstash works through your web browser, so you can use it on smartphones, tablets, laptops, and desktop computers.',
        a: <>Yes. Reelstash works through your web browser, so you can use it on <strong>smartphones</strong>, tablets, laptops, and desktop computers.</>
      },
      {
        q: 'Can I download private Instagram posts?',
        text: 'No. Reelstash is intended for publicly accessible Instagram content and cannot download content from private accounts.',
        a: <>No. Reelstash is intended for publicly accessible Instagram content and cannot download content from <strong>private accounts</strong>.</>
      },
      {
        q: 'Where are my downloaded files saved?',
        text: 'Downloaded files are normally saved to your device\'s default Downloads folder, unless your browser asks you to choose another location.',
        a: <>Downloaded files are normally saved to your device&apos;s default <strong>Downloads</strong> folder, unless your browser asks you to choose another location.</>
      },
      {
        q: 'Is Reelstash affiliated with Instagram?',
        text: 'No. Reelstash is an independent third-party tool and is not affiliated with, endorsed by, or sponsored by Instagram.',
        a: <>No. Reelstash is an independent third-party tool and is not affiliated with, endorsed by, or sponsored by Instagram.</>
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
        {
          '@type': 'WebSite',
          '@id': '/#website',
          url: '/',
          name: 'Reelstash',
          description: 'A fast downloader for publicly available Instagram reels, videos, photos, and carousel posts.',
          inLanguage: 'en-US'
        },
        {
          '@type': 'WebApplication',
          '@id': '/#app',
          url: '/',
          name: 'Reelstash Instagram Media Downloader',
          applicationCategory: 'MultimediaApplication',
          operatingSystem: 'Any',
          browserRequirements: 'Requires JavaScript',
          isAccessibleForFree: true,
          description: 'Download publicly accessible Instagram reels, videos, photos, and carousel posts in the best available quality.',
          featureList: [
            'Instagram reel downloads',
            'Instagram video downloads',
            'Instagram photo downloads',
            'Instagram carousel downloads',
            'No Instagram login required'
          ],
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
        }
      ]
    }
  ],
  metadata: {
    title: 'Instagram Reels Downloader — Reelstash',
    description: 'Download public Instagram reels, videos, photos, and carousel posts in the best available quality. Fast, secure, and no Instagram login required.',
    keywords: ['Instagram reel downloader', 'Instagram video downloader', 'Instagram photo downloader', 'Instagram carousel downloader', 'download Instagram reels'],
    alternates: { canonical: '/' },
    openGraph: {
      title: 'Instagram Reels Downloader — Reelstash',
      description: 'Download public Instagram reels, photos, and carousel posts quickly in the best available quality.',
      url: '/'
    },
    twitter: {
      title: 'Instagram Reels Downloader — Reelstash',
      description: 'Save public Instagram reels, photos, and carousels in their best available quality.'
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
    defaultTitle: 'Public Instagram audio',
    one: '1 MP3 ready',
    manySuffix: ' MP3 files ready'
  },
  how: {
    heading: 'How to Download Reels Audio ?',
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
    heading: 'Questions',
    items: [
      {
        q: 'Convert Reels/Video into Audio ?',
        open: true,
        text: 'YES, You can Download Instagram Reels audio only (mp3). if you want get background Song, Music, Voice, then this feature is really helpful for you. Just Enter the URL Link into the input box, It will get the mp3 file for you.',
        a: (
          <>
            <p>
              YES, You can <b>Download Instagram Reels audio</b> only (mp3).
              if you want get <i>background Song, Music, Voice</i>, then
              this feature is really helpful for you.
            </p>
            <p>
              <b>Insta Audio Download : </b>You can download Reels/Videos
              video&apos;s <a href="/instagram-audio-downloader">audio mp3</a>. Just Enter the{' '}
              <b>&quot;URL Link&quot;</b> into the input box, It will get the mp3 file
              for you.
            </p>
          </>
        )
      },
      {
        q: 'How to Download MP3 File ?',
        open: true,
        text: 'Input the Reels URL then Click the Download Audio Button. Reels Audio MP3 file will be saved to your Downloads Folder. You can use this tool on iPhone, Android, PC & MAC.',
        a: (
          <>
            <p>
              Input the <b>Reels URL</b> then Click the{' '}
              <b>&quot;Download Audio&quot;</b> Button. <b>Reels Audio MP3</b> 😁 file
              will be saved to your &quot;Downloads Folder&quot;
            </p>
            <p>
              <b>Reels Downloader: </b>You can use this tool for Downloading
              Reels/Video into Audio in any of devices 😝 like iPhone,
              Android, PC & MAC etc. This Website [
              <a href="/">Reelstash</a>] supports all of these
              devices
            </p>
          </>
        )
      },
      {
        q: 'Limit for Reels Audio MP3 Download ?',
        text: 'There is Absolutely no limit for Downloading Reels, Stories, Videos, Photos & Audio MP3. You can download as much as you want.',
        a: (
          <p>
            <b>Reelstash :</b> There is Absolutely no limit for
            Downloading Reels, Stories, Videos, Photos & Audio MP3. You
            can download as much as you want. There is no restrictions of
            any kind at all. So Enjoy 😊
          </p>
        )
      },
      {
        q: 'Install App for Reels Audio Downloader ?',
        text: 'Yes you can install Reelstash on your smartphone for android & iOS, and directly access the Audio MP3 downloader.',
        a: (
          <>
            <p>
              Yes ! 😀 you can install our mini app for android & iOS,
              and directly access our App.
            </p>
            <p>
              <b>To Install Reelstash App :</b>
            </p>
            <p>
              <b>Reels Downloader: </b>We offer Downloading{' '}
              <b>Instagram Reels/Videos/Photos & Stories</b>. This is our
              Best #1 WebApp 😉 to save instagram Stories, Reels etc.
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
        {
          '@type': 'WebPage',
          '@id': '/instagram-audio-downloader#webpage',
          url: '/instagram-audio-downloader',
          name: 'Instagram Reel Audio Downloader',
          description: 'Download audio from public Instagram reels and videos as MP3.',
          isPartOf: { '@id': '/#website' },
          inLanguage: 'en-US'
        },
        {
          '@type': 'WebApplication',
          '@id': '/instagram-audio-downloader#app',
          url: '/instagram-audio-downloader',
          name: 'Reelstash Instagram Audio Downloader',
          applicationCategory: 'MultimediaApplication',
          operatingSystem: 'Any',
          browserRequirements: 'Requires JavaScript',
          isAccessibleForFree: true,
          description: 'Extract MP3 audio from publicly available Instagram reels and videos.',
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
            { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
            { '@type': 'ListItem', position: 2, name: 'Instagram Audio Downloader', item: '/instagram-audio-downloader' }
          ]
        }
      ]
    }
  ],
  metadata: {
    title: 'Instagram Reel Audio Downloader — Download MP3 | Reelstash',
    description: 'Download Instagram reel audio as MP3. Free Instagram audio downloader for public reels and videos — extract soundtrack only, no login required.',
    keywords: ['instagram audio downloader', 'reels audio downloader', 'instagram audio download mp3', 'download reel audio', 'instagram mp3', 'extract audio from instagram reel'],
    alternates: { canonical: '/instagram-audio-downloader' },
    openGraph: {
      title: 'Instagram Reel Audio Downloader — MP3 | Reelstash',
      description: 'Extract and download audio from public Instagram reels and videos as MP3. Fast Instagram audio downloader, no login.',
      url: '/instagram-audio-downloader'
    },
    twitter: {
      title: 'Instagram Reel Audio Downloader — MP3 | Reelstash',
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
    alternates: page.metadata.alternates,
    openGraph: {
      type: 'website',
      siteName: 'Reelstash',
      locale: 'en_US',
      ...page.metadata.openGraph
    },
    twitter: {
      card: 'summary',
      ...page.metadata.twitter
    }
  };
}
