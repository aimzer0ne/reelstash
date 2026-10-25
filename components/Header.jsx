'use client';

import Link from './Link';
import { Logo } from './Logo';
import { PwaRegister } from './PwaRegister';
import { ThemeToggle } from './ThemeToggle';
import { Icon } from './Icons';
import { useI18n } from './I18nProvider';
import { NAV } from '@/lib/site.jsx';

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
      <div className="header-tools header-tools-start">
        <label className="lang-select">
          <span className="sr-only">{t('language')}</span>
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
      </div>
      <Link className="wordmark" href="/">
        <Logo className="wordmark-logo" />
        ReelsDl.net
      </Link>
      <div className="header-tools header-tools-end">
        <ThemeToggle label={t('themeToggle')} />
        <button className="share-btn" type="button" onClick={shareSite} aria-label={t('share')}>
          <Icon name="share" />
        </button>
        <PwaRegister />
      </div>
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
    </header>
  );
}
