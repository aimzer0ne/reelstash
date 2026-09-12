export const NAV = [
  { href: '/', label: 'Reels Downloader', icon: 'reels' },
  { href: '/instagram-audio-downloader', label: 'Audio MP3', icon: 'audio' }
];

export const LEGAL_LINKS = [
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/copyright', label: 'Copyright' }
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
    heading: 'How it works',
    steps: [
      { icon: 'copy', title: 'Copy a public link', text: 'Use Share → Copy link on Instagram.' },
      { icon: 'paste', title: 'Paste it here', text: 'We find every photo and video the post makes public.' },
      { icon: 'download', title: 'Download', text: 'Preview the result and save only what you need.' }
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
  inputLabel: 'Instagram reel or video URL',
  placeholder: 'Paste a reel URL and press Enter',
  downloadLabel: 'Download MP3',
  footerLead: null,
  messages: {
    emptyUrl: 'Paste a public Instagram reel or video link first.',
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
    heading: 'How Instagram audio download works',
    steps: [
      { icon: 'link', title: 'Paste a reel link', text: 'Copy a public Instagram reel or video URL and paste it above.' },
      { icon: 'wave', title: 'We find the soundtrack', text: 'Direct audio URLs are preferred. Otherwise the video track is processed with ffmpeg.' },
      { icon: 'download', title: 'Save as MP3', text: 'Download the extracted audio file for offline listening.' }
    ]
  },
  about: {
    heading: 'What is an Instagram audio downloader?',
    text: 'Sometimes you do not want the clip — you want the song under it, the voiceover, the little hook that stuck in your head. An Instagram audio downloader pulls just that soundtrack from a public reel or video and saves it as MP3. That is this page. Reelstash listens for a direct audio stream when Instagram offers one; if the sound is baked into the video, we lift it out with ffmpeg. Still no password, still no private posts. Want the picture too? Head back to the main downloader and grab the full reel.',
    aside: 'Paste a public reel. If it has a soundtrack, we will try to bottle it as MP3.'
  },
  article: {
    heading: 'Download Instagram Reels Audio as MP3',
    text: (
      <p>
        Want to save the audio from your favorite Instagram Reels? Reelstash Instagram to MP3 Downloader makes it quick and easy to extract audio from supported <strong>public Reels</strong> and save it as a convenient <strong>MP3 file</strong>. Simply copy the Instagram Reel link, paste it into Reelstash, and download the audio in just a few clicks—<strong>no Instagram login</strong> or complicated software required.
        Whether you want to listen to a Reel&apos;s audio <strong>offline</strong>, save music for personal use, or keep an audio clip for later, Reelstash provides a simple, fast, and <strong>mobile-friendly</strong> way to convert Instagram Reels to MP3.
      </p>
    )
  },
  faq: {
    heading: 'Audio download FAQ',
    items: [
      {
        q: 'Can I download audio from an Instagram Reel?',
        text: 'Yes. Reelstash lets you extract and download the available audio from supported public Instagram Reels as an MP3 file.',
        a: <>Yes. Reelstash lets you extract and download the available audio from supported public Instagram Reels as an MP3 file.</>
      },
      {
        q: 'How do I convert an Instagram Reel to MP3?',
        text: 'Copy the Reel link from Instagram, paste it into Reelstash, select the Audio MP3 option, and click download.',
        a: <>Copy the Reel link from Instagram, paste it into Reelstash, select the Audio MP3 option, and click <strong>download</strong>.</>
      },
      {
        q: 'Is the Instagram Reel to MP3 downloader free?',
        text: 'Yes. Reelstash provides a simple and free way to download audio from supported public Reels.',
        a: <>Yes. Reelstash provides a simple and <strong>free</strong> way to download audio from supported public Reels.</>
      },
      {
        q: 'Do I need an Instagram account to download MP3?',
        text: 'No. You don\'t need to log in to Instagram. Just provide the link to a publicly accessible Reel.',
        a: <>No. You don&apos;t need to log in to Instagram. Just provide the link to a publicly accessible Reel.</>
      },
      {
        q: 'Can I download the original Reel audio?',
        text: 'If the Reel\'s audio is publicly accessible and supported, Reelstash can extract the available audio and provide it as an MP3 download.',
        a: <>If the Reel&apos;s audio is publicly accessible and supported, Reelstash can extract the available audio and provide it as an MP3 download.</>
      },
      {
        q: 'Can I download audio from a private Reel?',
        text: 'No. Reelstash works with publicly accessible Instagram content and cannot access private Reels.',
        a: <>No. Reelstash works with publicly accessible Instagram content and cannot access <strong>private Reels</strong>.</>
      },
      {
        q: 'What format is the downloaded audio?',
        text: 'The extracted audio is provided in MP3 format, making it compatible with most phones, computers, and media players.',
        a: <>The extracted audio is provided in <strong>MP3 format</strong>, making it compatible with most phones, computers, and media players.</>
      },
      {
        q: 'Can I use the downloaded Instagram audio anywhere?',
        text: 'Download and use audio only when you have the appropriate rights or permission. Respect the original creator\'s copyright and Instagram\'s terms of use.',
        a: <>Download and use audio only when you have the appropriate rights or permission. Respect the original creator&apos;s copyright and Instagram&apos;s terms of use.</>
      },
      {
        q: 'Does Reelstash store my downloaded audio?',
        text: 'Reelstash is designed to process the provided public link and give you the downloadable result without requiring an Instagram login.',
        a: <>Reelstash is designed to process the provided public link and give you the downloadable result without requiring an <strong>Instagram login</strong>.</>
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
