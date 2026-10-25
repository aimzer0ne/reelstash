import Link from '@/components/Link';
import { illustrationJsonLd } from './images.js';
import { SITE_ORIGIN, absUrl, organizationJsonLd } from './seo';

// Shared schema for a single-purpose downloader page: the page, the app,
// its breadcrumb, the three-step HowTo, and the FAQ.
function toolJsonLd(page) {
  const url = absUrl(page.path);
  return [
    {
      '@context': 'https://schema.org',
      '@graph': [
        organizationJsonLd,
        {
          '@type': 'WebPage',
          '@id': `${url}#webpage`,
          url,
          name: page.metadata.title,
          description: page.metadata.description,
          isPartOf: { '@id': absUrl('/#website') },
          about: { '@id': `${url}#app` },
          primaryImageOfPage: illustrationJsonLd(page.art, SITE_ORIGIN),
          inLanguage: 'en-US'
        },
        {
          '@type': ['WebApplication', 'SoftwareApplication'],
          '@id': `${url}#app`,
          url,
          name: `ReelsDl.net ${page.heading}`,
          applicationCategory: 'MultimediaApplication',
          applicationSubCategory: page.heading,
          operatingSystem: 'Any',
          browserRequirements: 'Requires JavaScript',
          isAccessibleForFree: true,
          inLanguage: 'en-US',
          publisher: { '@id': absUrl('/#organization') },
          description: page.metadata.description,
          featureList: page.features,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absUrl('/') },
            { '@type': 'ListItem', position: 2, name: page.heading, item: url }
          ]
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      '@id': `${url}#howto`,
      name: page.how.heading,
      totalTime: 'PT1M',
      tool: { '@type': 'HowToTool', name: 'ReelsDl.net' },
      step: page.how.steps.map((text, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        text
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faq.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.text }
      }))
    }
  ];
}

function metadata(path, title, description, keywords) {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    twitter: { title, description }
  };
}

// FAQ answers are written once as plain text (for schema) and rendered as a paragraph.
function faq(items) {
  return items.map((item) => ({ ...item, a: item.a || <p>{item.text}</p> }));
}

export const reelsPage = {
  path: '/reels',
  mode: 'media',
  translate: false,
  art: 'reels',
  kind: 'reels',
  heading: 'Instagram Reels Downloader',
  lede: 'Download any public Instagram Reel as an HD MP4 with its music. No watermark, no login, no app.',
  inputLabel: 'Instagram Reel URL',
  placeholder: 'Paste a Reel link',
  summary: { defaultTitle: 'Instagram Reel', one: '1 Reel ready', manySuffix: ' items ready' },
  jump: [['about', 'About'], ['how-it-works', 'How to'], ['quality', 'Quality'], ['devices', 'Devices'], ['tools', 'More tools'], ['faq', 'FAQ']],
  intro: {
    heading: 'Save Instagram Reels with music, in HD',
    body: (
      <>
        <p>
          The <b>ReelsDl.net Reels downloader</b> saves public Instagram Reels
          as MP4 files you can keep, watch offline, or edit. Paste the Reel
          link and you get the same video file Instagram streams in the app,
          with its original audio track and without the logo overlay that
          Instagram&apos;s own Download button stamps on top.
        </p>
        <p>
          It is built for short vertical video: the 9:16 frame, the sound, and
          the timing stay exactly as the creator posted them. Nothing is
          re-encoded, so the file is as sharp as the Reel you watched.
        </p>
      </>
    )
  },
  how: {
    heading: 'How to download Instagram Reels',
    type: 'reels',
    steps: [
      'Open the Reel in Instagram, tap the three dots or the Share arrow, and choose Copy Link.',
      'Paste the link into the box on reelsdl.net/reels and press Enter.',
      'Tap Download Video to save the Reel as MP4 to your phone or computer.'
    ]
  },
  sections: [
    {
      id: 'quality',
      heading: 'Reel quality, sound, and watermarks',
      body: (
        <>
          <div className="article-copy">
            <p>
              Instagram stores most Reels at <b>1080 × 1920</b> pixels. The Reels
              downloader picks the highest-quality version Instagram serves for
              that Reel, so no tool can give you more resolution than this one.
              If a Reel looks blurry here, it was uploaded blurry.
            </p>
          </div>
          <table className="copy-table">
            <tbody>
              <tr>
                <th scope="row">Resolution</th>
                <td>The best rendition Instagram has, usually 1080p, in the original 9:16 frame.</td>
              </tr>
              <tr>
                <th scope="row">Music &amp; voice</th>
                <td>Kept in the MP4. Want only the song? Use the <Link href="/audio">Reel to MP3 converter</Link>.</td>
              </tr>
              <tr>
                <th scope="row">Watermark</th>
                <td>
                  None added. Instagram only adds its logo when you use the in-app
                  Download button. <Link href="/blog/download-instagram-reels-without-watermark">Why that happens</Link>.
                </td>
              </tr>
              <tr>
                <th scope="row">Length</th>
                <td>Short clips and long Reels both work. Longer ones simply take a few seconds more.</td>
              </tr>
            </tbody>
          </table>
        </>
      )
    }
  ],
  features: [
    'Download Instagram Reels as MP4',
    'Original Reel audio and music kept',
    'No watermark added',
    'Works on iPhone, Android, Windows and Mac',
    'No Instagram login required'
  ],
  faq: {
    items: faq([
      {
        q: 'How do I download an Instagram Reel with music?',
        text: 'Copy the Reel link in Instagram, paste it into the ReelsDl.net Reels downloader, and tap Download Video. The MP4 keeps the Reel\'s original audio, including licensed music.'
      },
      {
        q: 'Why does a downloaded Reel have no sound?',
        text: 'The MP4 from ReelsDl.net includes the audio track. If it plays silently, check that your phone is not on silent mode, or open the file in another player such as VLC. A few Reels have their music muted by Instagram for copyright reasons; those stay silent everywhere.'
      },
      {
        q: 'How do I save a Reel to my iPhone camera roll?',
        text: 'Download the Reel in Safari. It is saved to Files, Downloads. Open it, tap Share, and choose Save Video. The Reel then appears in the Photos app.'
      },
      {
        q: 'Can I download my own Reels?',
        text: 'Yes, if your account is public. For a private account, use Instagram\'s own Download option in the Reel\'s menu, or the original file you exported before uploading.'
      },
      {
        q: 'Can I download Reels from a private account?',
        text: 'No. Reels from private accounts are only visible to approved followers, and ReelsDl.net never logs in to Instagram, so it cannot see them.'
      },
      {
        q: 'Does the creator know if I download their Reel?',
        text: 'No. ReelsDl.net fetches the public Reel without your Instagram account, so nothing links the download to you and the creator is not notified.'
      }
    ])
  },
  metadata: metadata(
    '/reels',
    'Instagram Reels Downloader – Save Reels With Music | ReelsDl.net',
    'Download Instagram Reels in HD with their music. Free Reels downloader for iPhone, Android and PC — no watermark, no login, no app. Paste a link and save MP4.',
    ['Instagram Reels downloader', 'Reels downloader', 'download Instagram Reels', 'Instagram Reel download with music', 'save Instagram Reels', 'Reels video download', 'Instagram Reels download HD', 'Reels downloader without watermark']
  )
};
reelsPage.jsonLd = toolJsonLd(reelsPage);

export const photoPage = {
  path: '/photo',
  mode: 'media',
  translate: false,
  art: 'photo',
  kind: 'photo',
  heading: 'Instagram Photo Downloader',
  lede: 'Save Instagram photos in full resolution and every slide of a carousel post from one link. Free, no login.',
  inputLabel: 'Instagram photo or carousel URL',
  placeholder: 'Paste a photo or post link',
  summary: { defaultTitle: 'Instagram post', one: '1 photo ready', manySuffix: ' items ready' },
  jump: [['about', 'About'], ['how-it-works', 'How to'], ['carousel', 'Carousels'], ['devices', 'Devices'], ['tools', 'More tools'], ['faq', 'FAQ']],
  intro: {
    heading: 'Full-size Instagram photos, not screenshots',
    body: (
      <>
        <p>
          A screenshot crops the photo, adds your status bar, and drops the
          resolution to your screen size. The <b>Instagram photo downloader</b>{' '}
          saves the actual image file Instagram stores, usually up to{' '}
          <b>1080 pixels wide</b>, as a JPG with its real colors and no
          interface around it.
        </p>
        <p>
          Paste the link of a public photo post and it is ready to save in a
          second. Paste a <b>carousel</b> link and every slide is listed with its
          own download button, photos as JPG and video slides as MP4.
        </p>
      </>
    )
  },
  how: {
    heading: 'How to download Instagram photos',
    type: 'photo',
    steps: [
      'Open the photo or carousel post in Instagram, tap the three dots or the Share arrow, and choose Copy Link.',
      'Paste the link into the box on reelsdl.net/photo and press Enter.',
      'Tap Download Photo on each image, or on each slide of the carousel, to save it as JPG.'
    ]
  },
  sections: [
    {
      id: 'carousel',
      heading: 'Instagram carousel downloader',
      body: (
        <>
          <div className="article-copy">
            <p>
              A carousel can hold up to 20 photos and videos. You do not need a
              separate link for each slide: one post link brings up all of them
              in order, so you can save just the slide you want or the whole set.
            </p>
          </div>
          <table className="copy-table">
            <tbody>
              <tr>
                <th scope="row">Single photo post</th>
                <td>Saved as one JPG in the size Instagram stores.</td>
              </tr>
              <tr>
                <th scope="row">Photo carousel</th>
                <td>Every slide listed separately, each with its own Download button.</td>
              </tr>
              <tr>
                <th scope="row">Mixed carousel</th>
                <td>Photos save as JPG, videos as MP4, from the same link.</td>
              </tr>
              <tr>
                <th scope="row">Profile picture</th>
                <td>Not supported yet. Only post photos can be saved.</td>
              </tr>
            </tbody>
          </table>
          <p className="copy-note">
            More tips, including how to keep the original colors on iPhone, are
            in <Link href="/blog/save-instagram-photos-without-screenshot">how to save Instagram photos without a screenshot</Link>.
          </p>
        </>
      )
    }
  ],
  features: [
    'Download Instagram photos as JPG',
    'Download every slide of a carousel post',
    'Full resolution, no screenshot cropping',
    'Works on iPhone, Android, Windows and Mac',
    'No Instagram login required'
  ],
  faq: {
    items: faq([
      {
        q: 'How do I download a photo from Instagram?',
        text: 'Copy the post link in Instagram, paste it into the ReelsDl.net photo downloader, and tap Download Photo. The image is saved as a JPG in full resolution.'
      },
      {
        q: 'Can I download all photos from a carousel at once?',
        text: 'One link lists every slide of the carousel. Each photo and video has its own Download button, so you can save the ones you want or all of them.'
      },
      {
        q: 'What resolution are downloaded Instagram photos?',
        text: 'The same size Instagram stores, which is up to 1080 pixels wide. That is sharper than a screenshot on most phones, and the image has no app interface around it.'
      },
      {
        q: 'Where do downloaded photos go on iPhone?',
        text: 'Safari saves them to Files, Downloads. Open the photo, tap Share, and choose Save Image to move it to the Photos app. On Android, photos go to the Download folder and appear in Gallery.'
      },
      {
        q: 'Can I download photos from a private Instagram account?',
        text: 'No. Only public posts can be downloaded. Private accounts are visible only to their approved followers.'
      }
    ])
  },
  metadata: metadata(
    '/photo',
    'Instagram Photo Downloader – Save Photos & Carousels | ReelsDl.net',
    'Download Instagram photos in full resolution and every slide of a carousel post. Free Instagram photo downloader for iPhone, Android and PC, no login.',
    ['Instagram photo downloader', 'Instagram carousel downloader', 'download Instagram photos', 'save Instagram pictures', 'Instagram image downloader', 'download Instagram carousel', 'Instagram photo download HD']
  )
};
photoPage.jsonLd = toolJsonLd(photoPage);

export const storiesPage = {
  path: '/stories',
  mode: 'media',
  translate: false,
  art: 'stories',
  kind: 'stories',
  heading: 'Instagram Story Downloader',
  lede: 'Save public Instagram Stories and Highlights as video or photo before they disappear. Anonymous, no login.',
  inputLabel: 'Instagram Story or Highlight URL',
  placeholder: 'Paste a Story or Highlight link',
  summary: { defaultTitle: 'Instagram Story', one: '1 Story ready', manySuffix: ' Stories ready' },
  jump: [['about', 'About'], ['how-it-works', 'How to'], ['links', 'Links'], ['devices', 'Devices'], ['tools', 'More tools'], ['faq', 'FAQ']],
  intro: {
    heading: 'Keep Stories after the 24 hours are up',
    body: (
      <>
        <p>
          Instagram Stories vanish 24 hours after they are posted, and the app
          only lets you save your own. The <b>Instagram Story downloader</b>{' '}
          saves Stories from <b>public accounts</b> as MP4 video or JPG photo,
          so an event date, a recipe, or a tutorial does not disappear with them.
        </p>
        <p>
          It also saves <b>Highlights</b>, the Stories an account pins to its
          profile, so you can keep a whole album at once.
        </p>
      </>
    )
  },
  how: {
    heading: 'How to download Instagram Stories',
    type: 'stories',
    steps: [
      'Open the Story in Instagram, tap the three dots, and choose Copy Link. For Highlights, open the Highlight and copy its link the same way.',
      'Paste the link into the box on reelsdl.net/stories and press Enter.',
      'Tap Download on each Story to save it as MP4 video or JPG photo.'
    ]
  },
  sections: [
    {
      id: 'links',
      heading: 'Which Story links work',
      body: (
        <table className="copy-table">
          <tbody>
            <tr>
              <th scope="row">One Story</th>
              <td>Links like <b>instagram.com/stories/username/1234…/</b> save that single Story.</td>
            </tr>
            <tr>
              <th scope="row">All current Stories</th>
              <td>Links like <b>instagram.com/stories/username/</b> list every Story the account has up right now.</td>
            </tr>
            <tr>
              <th scope="row">Highlights</th>
              <td>Links like <b>instagram.com/stories/highlights/1234…/</b> list every item in that Highlight.</td>
            </tr>
            <tr>
              <th scope="row">Expired Stories</th>
              <td>Not available. Once a Story is older than 24 hours and not in a Highlight, Instagram no longer serves it.</td>
            </tr>
          </tbody>
        </table>
      )
    }
  ],
  features: [
    'Download public Instagram Stories as MP4 or JPG',
    'Download Instagram Highlights',
    'Anonymous: no Instagram login required',
    'Works on iPhone, Android, Windows and Mac'
  ],
  faq: {
    items: faq([
      {
        q: 'Does the person know if I download their Story?',
        text: 'No. ReelsDl.net fetches public Stories without your Instagram account, so your name does not appear in the Story\'s viewer list and the owner is not notified.'
      },
      {
        q: 'Can I download Stories from a private account?',
        text: 'No. Stories from private accounts and Close Friends Stories are visible only to the people the owner approved. ReelsDl.net only works with public accounts.'
      },
      {
        q: 'Can I download a Story that has expired?',
        text: 'Only if the owner added it to a Highlight. After 24 hours, a Story that is not in a Highlight is no longer available from Instagram.'
      },
      {
        q: 'Do downloaded Stories keep their music?',
        text: 'Stories posted as video are saved as MP4 with the sound Instagram serves. If a Story appears in the results as a photo, it was served as a still image and has no audio track to save.'
      },
      {
        q: 'How do I download Instagram Highlights?',
        text: 'Open the Highlight on the profile, tap the three dots, choose Copy Link, and paste it here. Every Story in the Highlight is listed with its own Download button.'
      }
    ])
  },
  metadata: metadata(
    '/stories',
    'Instagram Story Downloader – Save Stories & Highlights | ReelsDl.net',
    'Download public Instagram Stories and Highlights anonymously as MP4 or JPG. Free Story saver for iPhone, Android and PC. No login, owner is not notified.',
    ['Instagram Story downloader', 'Instagram Story saver', 'download Instagram Stories', 'Instagram Highlights downloader', 'save Instagram Stories anonymously', 'Instagram Story download']
  )
};
storiesPage.jsonLd = toolJsonLd(storiesPage);
