import { DownloadPage } from './DownloadPage';
import { DisclaimerCopy } from './DisclaimerCopy';
import { I18nProvider } from './I18nProvider';
import { LegalPage } from './LegalPage';
import { PrivacyCopy } from './PrivacyCopy';
import { legalPages } from '@/lib/legal.js';

export function AppRoot({ pageId = 'home', guides = [], ...i18n }) {
  return (
    <I18nProvider {...i18n}>
      {pageId === 'privacy' ? (
        <LegalPage page={legalPages.privacy}>
          <PrivacyCopy />
        </LegalPage>
      ) : null}
      {pageId === 'disclaimer' ? (
        <LegalPage page={legalPages.disclaimer}>
          <DisclaimerCopy />
        </LegalPage>
      ) : null}
      {pageId === 'audio' || pageId === 'home' ? <DownloadPage pageId={pageId} guides={guides} /> : null}
    </I18nProvider>
  );
}
