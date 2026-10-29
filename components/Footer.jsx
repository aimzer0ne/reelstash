import Link from './Link';
import { Logo } from './Logo';
import { I18nProvider, useI18n } from './I18nProvider';
import { SITE_EMAIL } from '@/lib/seo';
import { LEGAL_LINKS, NAV, RESOURCE_LINKS } from '@/lib/nav.js';

// For pages that render the footer on its own (blog), outside any page body.
export function SiteFooter({ locale, messages, lead }) {
  return (
    <I18nProvider locale={locale} messages={messages}>
      <Footer lead={lead} />
    </I18nProvider>
  );
}

export function Footer({ lead }) {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  const reportHref = `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(`ReelsDl.net — ${t('reportIssue')}`)}&body=${encodeURIComponent('What went wrong:\n\nInstagram link (if any):\n')}`;
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
              <li><a href={reportHref}>{t('reportIssue')}</a></li>
            </ul>
          </nav>
          <nav aria-label={t('legal')}>
            <h2>{t('legal')}</h2>
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
          {t('moreTools')}:{' '}
          <a href="https://vatculator.com/" rel="noopener">{t('vatCalculator')}</a>
          {' · '}
          <a href="https://cursivee.app/" rel="noopener">{t('cursiveGenerator')}</a>
          {' · '}
          <a href="https://capcutx.app/" rel="noopener">{t('capcutGuide')}</a>
        </p>
        <p>
          {lead ? (
            <>
              <Link href={lead.href}>{lead.label}</Link>
              {' · '}
            </>
          ) : null}
          {t('notAffiliated')} · © {year} ReelsDl.net
        </p>
      </div>
    </footer>
  );
}
