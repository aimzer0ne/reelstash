'use client';

import Link from './Link';
import { Logo } from './Logo';
import { PwaRegister } from './PwaRegister';
import { ThemeToggle } from './ThemeToggle';
import { Icon } from './Icons';
import { useI18n } from './I18nProvider';
import { NAV } from '@/lib/nav.js';

export function Header({ active }) {
  const { t, locale, locales, setLocale } = useI18n();

  function shareSite(event) {
    event.preventDefault();
    if (typeof navigator.share !== 'function') return;
    const url = window.location.href.split('#')[0];
    navigator.share({
      title: 'ReelsDl.net',
      text: t('shareText'),
      url
    }).catch((error) => {
      if (error?.name === 'AbortError') return;
      navigator.share({ url }).catch(() => {});
    });
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="wordmark" href="/">
          <Logo className="wordmark-logo" />
          ReelsDl.net
        </Link>
        <nav className="tool-nav" aria-label="Instagram downloaders">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              title={item.name}
              aria-current={item.href === active ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-tools">
          {/* The native select stays on top (invisible) so the picker is the browser's own. */}
          <label className="lang-select" title={t('language')}>
            <Icon name="globe" />
            <span className="lang-code" aria-hidden="true">{locale.toUpperCase()}</span>
            <select
              value={locale}
              onChange={(event) => setLocale(event.target.value)}
              aria-label={t('language')}
            >
              {locales.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </label>
          <ThemeToggle label={t('themeToggle')} />
          <button className="share-btn" type="button" onClick={shareSite} aria-label={t('share')} title={t('share')}>
            <Icon name="share" />
          </button>
          <PwaRegister />
        </div>
      </div>
    </header>
  );
}
