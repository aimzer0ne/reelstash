export const LANG_COOKIE = 'reelsdl_lang';

export const LOCALES = [
  { id: 'en', label: 'English', dir: 'ltr' },
  { id: 'es', label: 'Español', dir: 'ltr' },
  { id: 'pt', label: 'Português', dir: 'ltr' },
  { id: 'fr', label: 'Français', dir: 'ltr' },
  { id: 'de', label: 'Deutsch', dir: 'ltr' },
  { id: 'tr', label: 'Türkçe', dir: 'ltr' },
  { id: 'id', label: 'Indonesia', dir: 'ltr' },
  { id: 'hi', label: 'हिन्दी', dir: 'ltr' },
  { id: 'ar', label: 'العربية', dir: 'rtl' },
  { id: 'ru', label: 'Русский', dir: 'ltr' }
];

const LOCALE_IDS = new Set(LOCALES.map((item) => item.id));

export function localeFromValue(value) {
  if (!value) return null;
  const raw = String(value).trim().toLowerCase().replace('_', '-');
  const short = raw.split('-')[0];
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
