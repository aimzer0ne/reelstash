'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LOCALE, LANG_COOKIE, LOCALES, localeFromValue, localeMeta, pageHref } from '@/lib/i18n';
import { MESSAGES } from '@/lib/messages';

const I18nContext = createContext(null);

function persistLocale(id) {
  try {
    localStorage.setItem(LANG_COOKIE, id);
  } catch {
    /* ignore */
  }
  document.cookie = `${LANG_COOKIE}=${id}; path=/; max-age=31536000; samesite=lax`;
  const meta = localeMeta(id);
  document.documentElement.lang = id;
  document.documentElement.dir = meta.dir;
}

const ENGLISH_ONLY = { [DEFAULT_LOCALE]: null };

// pageLocale is the language of the URL (/es → 'es'). alternates maps each locale this page
// is translated into to its path; picking one of those navigates instead of swapping strings.
export function I18nProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
  pageLocale = DEFAULT_LOCALE,
  alternates = ENGLISH_ONLY,
  blogHref = '/blog',
  content = null
}) {
  const [locale, setLocaleState] = useState(initialLocale);

  useEffect(() => {
    // A translated URL always renders in its own language.
    if (pageLocale !== DEFAULT_LOCALE) return;
    // Locales with their own URL stay English here; the server redirects returning visitors.
    const uiOnly = (id) => (id && alternates[id] !== undefined ? DEFAULT_LOCALE : id);
    let saved = null;
    try {
      saved = localeFromValue(localStorage.getItem(LANG_COOKIE));
    } catch {
      /* ignore */
    }
    if (saved) {
      const stored = uiOnly(saved);
      setLocaleState(stored);
      if (stored === saved) persistLocale(stored);
      return;
    }
    const nav = navigator.languages?.length ? navigator.languages : [navigator.language];
    let detected = null;
    for (const lang of nav) {
      detected = localeFromValue(lang);
      if (detected) break;
    }
    if (!detected || uiOnly(detected) !== detected) return;
    setLocaleState(detected);
    persistLocale(detected);
  }, [pageLocale, alternates]);

  const value = useMemo(() => {
    const dict = MESSAGES[locale] || MESSAGES.en;
    return {
      locale,
      locales: LOCALES,
      pageLocale,
      content,
      dir: localeMeta(locale).dir,
      t(key) {
        return dict[key] || MESSAGES.en[key] || key;
      },
      href(target) {
        return target === 'blog' ? blogHref : pageHref(target, pageLocale);
      },
      setLocale(id) {
        const next = localeFromValue(id) || DEFAULT_LOCALE;
        persistLocale(next);
        // Leaving a translated URL for a language without one falls back to the English page.
        const target = alternates[next] || (pageLocale !== DEFAULT_LOCALE ? alternates[DEFAULT_LOCALE] : null);
        if (target && target !== window.location.pathname.replace(/(.)\/$/, '$1')) {
          window.location.assign(target);
          return;
        }
        setLocaleState(next);
      }
    };
  }, [locale, pageLocale, alternates, blogHref, content]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return {
      locale: 'en',
      locales: LOCALES,
      pageLocale: DEFAULT_LOCALE,
      content: null,
      dir: 'ltr',
      t: (key) => MESSAGES.en[key] || key,
      href: (target) => (target === 'blog' ? '/blog' : pageHref(target, DEFAULT_LOCALE)),
      setLocale() {}
    };
  }
  return ctx;
}
