'use client';

import { createContext, useContext, useMemo } from 'react';
import { LANG_COOKIE, LOCALES, localeFromValue, localeMeta } from '@/lib/i18n';

const I18nContext = createContext(null);

// The server picks the language (saved cookie, else Accept-Language) and passes
// that locale's strings in `messages`. Choosing another language saves the
// cookie and reloads, so every part of the page re-renders in it.
function persistLocale(id) {
  document.cookie = `${LANG_COOKIE}=${id}; path=/; max-age=31536000; samesite=lax`;
}

export function I18nProvider({ children, locale = 'en', messages = {} }) {
  const value = useMemo(() => ({
    locale,
    locales: LOCALES,
    dir: localeMeta(locale).dir,
    t(key) {
      return messages[key] || key;
    },
    setLocale(id) {
      const next = localeFromValue(id) || 'en';
      if (next === locale) return;
      persistLocale(next);
      window.location.reload();
    }
  }), [locale, messages]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>.');
  return ctx;
}
