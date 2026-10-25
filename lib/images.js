// Image files made by scripts/build-images.mjs. Pages, schema, and the sitemap
// read names, sizes, and alt text from here, so they always match the files.

export const ILLUSTRATION_DIR = '/assets/illustrations';

// Light and dark files exist for each; `${file}.webp` and `${file}-dark.webp`.
export const ILLUSTRATIONS = {
  video: {
    file: 'instagram-video-downloader-save-mp4',
    component: 'VideoArt',
    width: 1120,
    height: 600,
    alt: 'Instagram video post on a phone being saved as an HD MP4 file with sound',
    caption: 'Paste a public video link and save the original MP4, with sound and no watermark.'
  },
  reels: {
    file: 'instagram-reels-downloader-save-reel-with-music',
    component: 'ReelsArt',
    width: 1120,
    height: 600,
    alt: 'Vertical Instagram Reel with music being downloaded to the camera roll as MP4',
    caption: 'Reels keep their 9:16 frame and their music when you save them by link.'
  },
  photo: {
    file: 'instagram-photo-carousel-downloader-save-jpg',
    component: 'PhotoArt',
    width: 1120,
    height: 600,
    alt: 'Instagram carousel post with four slides being saved as full-size JPG photos',
    caption: 'One carousel link lists every slide, each with its own download button.'
  },
  stories: {
    file: 'instagram-story-highlights-downloader',
    component: 'StoriesArt',
    width: 1120,
    height: 600,
    alt: 'Public Instagram Story being saved as MP4 before it expires after 24 hours',
    caption: 'Save public Stories before the 24 hours run out, and whole Highlights at any time.'
  },
  audio: {
    file: 'instagram-reel-to-mp3-audio-downloader',
    component: 'AudioArt',
    width: 1120,
    height: 600,
    alt: 'Soundtrack of an Instagram Reel being extracted and saved as an MP3 audio file',
    caption: 'Keep only the song, music, or voice from a Reel as an MP3.'
  },
  iphone: {
    file: 'download-instagram-video-on-iphone-safari',
    component: 'IphoneArt',
    width: 440,
    height: 360,
    alt: 'iPhone downloading an Instagram video in Safari'
  },
  android: {
    file: 'download-instagram-video-on-android-chrome',
    component: 'AndroidArt',
    width: 440,
    height: 360,
    alt: 'Android phone downloading an Instagram video in Chrome'
  },
  desktop: {
    file: 'download-instagram-video-on-pc-mac-browser',
    component: 'DesktopArt',
    width: 440,
    height: 360,
    alt: 'Computer downloading an Instagram video in a web browser on Windows or Mac'
  }
};

export function illustrationSrc(key, dark = false) {
  return `${ILLUSTRATION_DIR}/${ILLUSTRATIONS[key].file}${dark ? '-dark' : ''}.webp`;
}

// 1200 × 630 share images, one per page, shown by Facebook, X, WhatsApp, and Slack.
export const OG_SIZE = { width: 1200, height: 630 };

export const PAGE_OG = {
  '/': { file: 'og-instagram-video-downloader', art: 'video', title: 'Instagram Video Downloader', sub: 'Save videos, Reels, photos and Stories in HD' },
  '/reels': { file: 'og-instagram-reels-downloader', art: 'reels', title: 'Instagram Reels Downloader', sub: 'Save Reels with music. No watermark, no login' },
  '/photo': { file: 'og-instagram-photo-downloader', art: 'photo', title: 'Instagram Photo Downloader', sub: 'Full-size photos and every carousel slide' },
  '/stories': { file: 'og-instagram-story-downloader', art: 'stories', title: 'Instagram Story Downloader', sub: 'Save public Stories and Highlights anonymously' },
  '/audio': { file: 'og-instagram-audio-downloader', art: 'audio', title: 'Instagram Audio Downloader', sub: 'Convert any Reel or video to MP3' },
  '/how-to': { file: 'og-how-to-download-from-instagram', art: 'video', title: 'How to Download From Instagram', sub: 'Steps for iPhone, Android, Windows and Mac' },
  '/faq': { file: 'og-instagram-downloader-faq', art: 'reels', title: 'Instagram Downloader FAQ', sub: 'Quality, sound, privacy and where files go' },
  '/blog': { file: 'og-instagram-download-guides', art: 'photo', title: 'Instagram Download Guides', sub: 'Tested how-tos for Reels, photos, Stories and audio' }
};

export function pageOgImage(path) {
  const og = PAGE_OG[path];
  if (!og) return null;
  return {
    src: `${ILLUSTRATION_DIR}/${og.file}.jpg`,
    alt: `${og.title} — ${og.sub} | ReelsDl.net`,
    ...OG_SIZE
  };
}

// schema.org ImageObject for a page's main illustration (light version).
export function illustrationJsonLd(key, origin) {
  const item = ILLUSTRATIONS[key];
  return {
    '@type': 'ImageObject',
    url: `${origin}${illustrationSrc(key)}`,
    width: item.width,
    height: item.height,
    caption: item.alt
  };
}
