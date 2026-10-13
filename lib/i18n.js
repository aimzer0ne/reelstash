export const LANG_COOKIE = 'reelsdl_lang';

export const LOCALES = [
  { id: 'en', label: 'English', dir: 'ltr' },
  { id: 'es', label: 'Español', dir: 'ltr' },
  { id: 'zh', label: '简体中文', dir: 'ltr' },
  { id: 'zh-tw', label: '繁體中文', dir: 'ltr' },
  { id: 'hi', label: 'हिन्दी', dir: 'ltr' },
  { id: 'ar', label: 'العربية', dir: 'rtl' },
  { id: 'pt', label: 'Português', dir: 'ltr' },
  { id: 'bn', label: 'বাংলা', dir: 'ltr' },
  { id: 'ru', label: 'Русский', dir: 'ltr' },
  { id: 'ja', label: '日本語', dir: 'ltr' },
  { id: 'fr', label: 'Français', dir: 'ltr' },
  { id: 'de', label: 'Deutsch', dir: 'ltr' },
  { id: 'ko', label: '한국어', dir: 'ltr' },
  { id: 'it', label: 'Italiano', dir: 'ltr' },
  { id: 'tr', label: 'Türkçe', dir: 'ltr' },
  { id: 'vi', label: 'Tiếng Việt', dir: 'ltr' },
  { id: 'id', label: 'Indonesia', dir: 'ltr' },
  { id: 'th', label: 'ไทย', dir: 'ltr' },
  { id: 'pl', label: 'Polski', dir: 'ltr' },
  { id: 'uk', label: 'Українська', dir: 'ltr' },
  { id: 'nl', label: 'Nederlands', dir: 'ltr' },
  { id: 'fa', label: 'فارسی', dir: 'rtl' },
  { id: 'ro', label: 'Română', dir: 'ltr' },
  { id: 'el', label: 'Ελληνικά', dir: 'ltr' },
  { id: 'cs', label: 'Čeština', dir: 'ltr' },
  { id: 'sv', label: 'Svenska', dir: 'ltr' },
  { id: 'hu', label: 'Magyar', dir: 'ltr' },
  { id: 'he', label: 'עברית', dir: 'rtl' },
  { id: 'ms', label: 'Melayu', dir: 'ltr' },
  { id: 'fil', label: 'Filipino', dir: 'ltr' },
  { id: 'ur', label: 'اردو', dir: 'rtl' }
];

const LOCALE_IDS = new Set(LOCALES.map((item) => item.id));

export function localeFromValue(value) {
  if (!value) return null;
  const raw = String(value).trim().toLowerCase().replace(/_/g, '-');
  const short = raw.split('-')[0];
  if (raw.startsWith('zh-hant') || raw.startsWith('zh-tw') || raw.startsWith('zh-hk') || raw.startsWith('zh-mo')) {
    return 'zh-tw';
  }
  if (short === 'zh') return 'zh';
  if (short === 'tl') return 'fil';
  if (LOCALE_IDS.has(raw)) return raw;
  if (LOCALE_IDS.has(short)) return short;
  return null;
}

export function localeFromAccept(header) {
  if (!header) return 'en';
  for (const part of header.split(',')) {
    const matched = localeFromValue(part.split(';')[0]);
    if (matched) return matched;
  }
  return 'en';
}

export function localeMeta(id) {
  return LOCALES.find((item) => item.id === id) || LOCALES[0];
}

export const DEFAULT_LOCALE = 'en';

// Locales that have their own URL (/es, /pt …) and fully translated copy, per page.
// Every other entry in LOCALES only swaps the UI strings on the English URL.
// Blog locales are not listed here: a post is available wherever a translated file exists.
export const PAGE_PATHS = {
  home: '/',
  audio: '/audio'
};

export const PAGE_LOCALES = {
  home: ['en', 'es', 'pt', 'id', 'tr', 'hi', 'ar', 'fr', 'de', 'it', 'ru', 'ja', 'ko', 'vi', 'th', 'pl'],
  audio: ['en', 'es', 'pt', 'id', 'tr', 'hi', 'ar', 'fr', 'de', 'it', 'ru', 'ja', 'ko', 'vi', 'th', 'pl']
};

const OG_LOCALES = {
  en: 'en_US', es: 'es_ES', pt: 'pt_BR', id: 'id_ID', tr: 'tr_TR', hi: 'hi_IN', ar: 'ar_AR', fr: 'fr_FR',
  de: 'de_DE', it: 'it_IT', ru: 'ru_RU', ja: 'ja_JP', ko: 'ko_KR', vi: 'vi_VN', th: 'th_TH', pl: 'pl_PL'
};

export function isUrlLocale(id) {
  return PAGE_LOCALES.home.includes(id);
}

export function ogLocale(id) {
  return OG_LOCALES[id] || OG_LOCALES.en;
}

export function localePath(locale, path = '/') {
  if (!locale || locale === DEFAULT_LOCALE) return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

// { en: '/', es: '/es', … } for every locale the page exists in.
export function localeAlternates(locales, path) {
  return Object.fromEntries(locales.map((locale) => [locale, localePath(locale, path)]));
}

export function pageAlternates(pageId) {
  return localeAlternates(PAGE_LOCALES[pageId], PAGE_PATHS[pageId]);
}

// Link to a tool page in the reader's language, or the English page when it is not translated.
export function pageHref(pageId, locale) {
  return localePath(PAGE_LOCALES[pageId].includes(locale) ? locale : DEFAULT_LOCALE, PAGE_PATHS[pageId]);
}

// On an English URL: a visitor who already picked a language that has its own URL is sent
// there. Languages without one keep swapping only the UI strings, as before.
export function resolveDefaultRoute({ cookie, accept, alternates }) {
  const saved = localeFromValue(cookie);
  if (saved && saved !== DEFAULT_LOCALE && alternates[saved]) return { redirect: alternates[saved] };
  const locale = saved || localeFromAccept(accept);
  return { locale: alternates[locale] ? DEFAULT_LOCALE : locale };
}
