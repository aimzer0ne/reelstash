'use client';

import Link from './Link';
import { Logo } from './Logo';
import { useI18n } from './I18nProvider';
import { SITE_EMAIL } from '@/lib/seo';

export function Footer({ lead }) {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  const reportHref = `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(`ReelsDl.net — ${t('reportIssue')}`)}&body=${encodeURIComponent('What went wrong:\n\nInstagram link (if any):\n')}`;
  return (
    <footer>
      <Link className="footer-brand" href="/">
        <Logo className="footer-logo" />
        ReelsDl.net
      </Link>
      <nav className="legal-nav" aria-label={t('legal')}>
        <Link href="/blog">{t('blog')}</Link>
        <Link href="/privacy">{t('privacy')}</Link>
        <Link href="/disclaimer">{t('disclaimer')}</Link>
        <a href={reportHref}>{t('reportIssue')}</a>
      </nav>
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
    </footer>
  );
}
