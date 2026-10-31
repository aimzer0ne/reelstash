'use client';

import Link from './Link';
import { Logo } from './Logo';
import { PwaRegister } from './PwaRegister';
import { ThemeToggle } from './ThemeToggle';
import { Icon } from './Icons';
import { NAV } from '@/lib/nav.js';

export function Header({ active }) {
  function shareSite(event) {
    event.preventDefault();
    if (typeof navigator.share !== 'function') return;
    const url = window.location.href.split('#')[0];
    navigator.share({
      title: 'ReelsDl.net',
      text: 'Share this website!',
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
          <ThemeToggle label="Switch light / dark mode" />
          <button className="share-btn" type="button" onClick={shareSite} aria-label="Share" title="Share">
            <Icon name="share" />
          </button>
          <PwaRegister />
        </div>
      </div>
    </header>
  );
}
