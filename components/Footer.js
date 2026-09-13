import Link from 'next/link';
import { LEGAL_LINKS } from '@/lib/site';
import { Logo } from './Logo';

export function Footer({ lead }) {
  const year = new Date().getFullYear();
  return (
    <footer>
      <Link className="footer-brand" href="/">
        <Logo className="footer-logo" />
        ReelsDl.net
      </Link>
      <nav className="legal-nav" aria-label="Legal">
        {LEGAL_LINKS.map((item) => (
          <Link key={item.href} href={item.href}>{item.label}</Link>
        ))}
      </nav>
      <p>
        {lead ? (
          <>
            <Link href={lead.href}>{lead.label}</Link>
            {' · '}
          </>
        ) : null}
        Not affiliated with Instagram or Meta · © {year} ReelsDl.net
      </p>
    </footer>
  );
}
