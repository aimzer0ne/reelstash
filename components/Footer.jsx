import Link from './Link';
import { Logo } from './Logo';
import { SITE_EMAIL } from '@/lib/seo';
import { LEGAL_LINKS, NAV, RESOURCE_LINKS } from '@/lib/nav.js';

export function Footer({ lead }) {
  const year = new Date().getFullYear();
  const reportHref = `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(`ReelsDl.net — Report an issue`)}&body=${encodeURIComponent('What went wrong:\n\nInstagram link (if any):\n')}`;
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand-col">
          <Link className="footer-brand" href="/">
            <Logo className="footer-logo" />
            ReelsDl.net
          </Link>
          <p className="footer-about">
            Free Instagram downloader for public videos, Reels, photos, carousels, Stories, and audio. No login, no app.
          </p>
        </div>
        <div className="footer-cols">
          <nav aria-label="Tools">
            <h2>Tools</h2>
            <ul>
              {NAV.map((item) => (
                <li key={item.href}><Link href={item.href}>{item.name}</Link></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Resources">
            <h2>Resources</h2>
            <ul>
              {RESOURCE_LINKS.map((item) => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
              <li><a href={reportHref}>Report an issue</a></li>
            </ul>
          </nav>
          <nav aria-label="Legal">
            <h2>Legal</h2>
            <ul>
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          More free tools:{' '}
          <a href="https://vatculator.com/" rel="noopener">VAT calculator</a>
          {' · '}
          <a href="https://cursivee.app/" rel="noopener">Cursive text generator</a>
          {' · '}
          <a href="https://capcutx.app/" rel="noopener">CapCut APK guide</a>
        </p>
        <p>
          {lead ? (
            <>
              <Link href={lead.href}>{lead.label}</Link>
              {' · '}
            </>
          ) : null}
          Not affiliated with Instagram or Meta · © {year} ReelsDl.net
        </p>
      </div>
    </footer>
  );
}
