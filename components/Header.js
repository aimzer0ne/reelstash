import Link from 'next/link';
import { NAV } from '@/lib/site';
import { Icon } from './Icons';
import { Logo } from './Logo';

export function Header({ current }) {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/">
        <Logo className="wordmark-logo" />
        Reelstash
      </Link>
      <nav className="site-nav" aria-label="Sections">
        {NAV.map((item) => (
          <Link
            key={item.href}
            className={item.href === current ? 'header-link is-active' : 'header-link'}
            href={item.href}
          >
            <Icon name={item.icon} />
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
