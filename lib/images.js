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
  }
};

export function illustrationSrc(key, dark = false) {
  return `${ILLUSTRATION_DIR}/${ILLUSTRATIONS[key].file}${dark ? '-dark' : ''}.webp`;
}

// 1200 × 630 share images, one per page, shown by Facebook, X, WhatsApp, and Slack.
export const OG_SIZE = { width: 1200, height: 630 };

export const PAGE_OG = {
  '/': { file: 'og-instagram-video-reels-downloader', art: 'reels', title: 'Instagram Reels Downloader', sub: 'Save Reels and videos in HD with sound. Free, no login' },
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

// Step-by-step phone mockups for the "How to" section of each tool page.
// Files: /assets/steps/how-to-download-instagram-<slug>-step-<n>-<action>.webp
export const STEP_DIR = '/assets/steps';
export const STEP_SIZE = { width: 600, height: 920 };
// Same order and labels as the header tabs (NAV in lib/site.jsx).
export const STEP_TABS = ['Video & Reels', 'Photo', 'Story', 'Audio'];

export const STEP_TYPES = {
  video: { slug: 'videos-and-reels', noun: 'video or Reel', media: 'reel', tab: 'Video & Reels', heading: ['Instagram Video &', 'Reels Downloader'], button: 'Download video' },
  photo: { slug: 'photos', noun: 'photo', media: 'photo', tab: 'Photo', heading: ['Instagram Photo', 'Downloader'], button: 'Download photo' },
  stories: { slug: 'stories', noun: 'Story', media: 'story', tab: 'Story', heading: ['Instagram Story', 'Downloader'], button: 'Download video' },
  audio: { slug: 'reel-audio-mp3', noun: 'Reel audio', media: 'audio', tab: 'Audio', heading: ['Instagram Audio', 'Downloader'], button: 'Download MP3' }
};

const STEP_ACTIONS = [
  { action: 'copy-link', alt: (t) => `Step 1: tap Share on the Instagram ${t.noun} and choose Copy link` },
  { action: 'paste-link', alt: (t) => `Step 2: paste the copied link into the ReelsDl.net ${t.heading.join(' ')} and tap Paste` },
  { action: 'download', alt: (t) => `Step 3: tap ${t.button} to save the Instagram ${t.noun} to your device` }
];

export function stepImages(type) {
  const t = STEP_TYPES[type] || STEP_TYPES.video;
  return STEP_ACTIONS.map((step, index) => ({
    src: `${STEP_DIR}/how-to-download-instagram-${t.slug}-step-${index + 1}-${step.action}.webp`,
    alt: step.alt(t),
    ...STEP_SIZE
  }));
}

// Guide mockups for saving, finding, and comparing downloads. Phone scenes are
// 600 × 920; wide scenes 1200 × 800. Drawn by scripts/scene-art.mjs.
const PHONE = { width: 600, height: 920 };
const WIDE = { width: 1200, height: 800 };

export const SCENES = {
  iphoneSafariDownload: {
    file: 'iphone-safari-download-instagram-video-prompt',
    ...PHONE,
    alt: 'Safari on iPhone asking to download the Instagram video, with the Download button highlighted',
    caption: 'Safari asks before saving. Tap Download.'
  },
  iphoneFilesDownloads: {
    file: 'iphone-files-app-downloads-instagram-video',
    ...PHONE,
    alt: 'Files app on iPhone showing the downloaded Instagram video in the Downloads folder',
    caption: 'The video lands in Files → Downloads.'
  },
  iphoneSaveVideo: {
    file: 'iphone-share-save-video-to-camera-roll',
    ...PHONE,
    alt: 'iPhone share sheet with Save Video highlighted to move the Instagram video to the camera roll',
    caption: 'Share → Save Video puts it in Photos.'
  },
  androidDownloaded: {
    file: 'android-chrome-instagram-video-downloaded',
    ...PHONE,
    alt: 'Chrome on Android showing the Instagram video download complete with an Open button',
    caption: 'Chrome confirms the download. Tap Open.'
  },
  androidGallery: {
    file: 'android-gallery-download-album-instagram-video',
    ...PHONE,
    alt: 'Android Gallery app with the Download album containing the saved Instagram video',
    caption: 'It also appears in the Gallery’s Download album.'
  },
  desktopDownloads: {
    file: 'pc-mac-browser-downloads-instagram-video-mp4',
    ...WIDE,
    alt: 'Desktop browser on Windows or Mac showing the downloaded Instagram MP4 in the downloads panel',
    caption: 'On a computer the MP4 shows up in the browser’s downloads panel and your Downloads folder.'
  },
  carouselResults: {
    file: 'instagram-carousel-downloader-every-slide',
    ...PHONE,
    alt: 'Instagram carousel downloaded with ReelsDl.net, every slide listed with its own Download photo button',
    caption: 'One carousel link lists every slide, each with its own button.'
  },
  watermarkCompare: {
    file: 'instagram-reel-download-watermark-vs-no-watermark',
    ...WIDE,
    alt: 'Instagram Reel saved with the in-app Download button showing a watermark, next to a clean copy downloaded by link',
    caption: 'In-app Download adds a logo and username. A copy saved by link has none.'
  }
};

export function sceneImage(key) {
  const item = SCENES[key];
  return { src: `${ILLUSTRATION_DIR}/${item.file}.webp`, alt: item.alt, caption: item.caption, width: item.width, height: item.height };
}
