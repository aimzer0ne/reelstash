import Link from '@/components/Link';
import { GuideShots } from '@/components/Illustration';
import { illustrationJsonLd, sceneImage } from './images.js';
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

export const photoPage = {
  path: '/photo',
  mode: 'photo',
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
          own download button as a JPG. Paste a <b>Reel or video</b> link and
          you get its cover image (thumbnail) as a JPG; to save the video
          itself, use the <Link href="/">Instagram Reels downloader</Link>.
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
          <GuideShots images={[sceneImage('carouselResults')]} />
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
                <td>Photos save as JPG, and each video slide saves as its cover image.</td>
              </tr>
              <tr>
                <th scope="row">Reel or video</th>
                <td>Saves the thumbnail as a JPG. For the MP4, use the <Link href="/">Reels downloader</Link>.</td>
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
        text: 'One link lists every slide of the carousel. Each slide has its own Download button, so you can save the ones you want or all of them. Video slides are saved as their cover image.'
      },
      {
        q: 'Can I download the thumbnail of an Instagram Reel?',
        text: 'Yes. Paste a Reel or video link into the photo downloader and it returns only the cover image, saved as a JPG. To download the video itself, use the Instagram Reels downloader on the home page.'
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
