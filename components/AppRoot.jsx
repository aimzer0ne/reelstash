import { DownloadPage } from './DownloadPage';
import { DisclaimerCopy } from './DisclaimerCopy';
import { I18nProvider } from './I18nProvider';
import { LegalPage } from './LegalPage';
import { PrivacyCopy } from './PrivacyCopy';
import { ContactCopy, DmcaCopy, FaqCopy, HowToCopy, TermsCopy } from './InfoCopy';
import { faqGroups, legalPages } from '@/lib/legal.js';
import { audioPage, homePage } from '@/lib/site.jsx';
import { photoPage, reelsPage, storiesPage } from '@/lib/tool-pages.jsx';

const INFO_PAGES = {
  faq: [legalPages.faq, () => <FaqCopy groups={faqGroups} />],
  'how-to': [legalPages.howTo, () => <HowToCopy />],
  terms: [legalPages.terms, () => <TermsCopy />],
  dmca: [legalPages.dmca, () => <DmcaCopy />],
  contact: [legalPages.contact, () => <ContactCopy />]
};

const TOOL_PAGES = { home: homePage, audio: audioPage, reels: reelsPage, photo: photoPage, stories: storiesPage };

export function AppRoot({ pageId = 'home', initialLocale = 'en', guides = [] }) {
  return (
    <I18nProvider initialLocale={initialLocale}>
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
      {INFO_PAGES[pageId] ? (
        <LegalPage page={INFO_PAGES[pageId][0]}>
          {INFO_PAGES[pageId][1]()}
        </LegalPage>
      ) : null}
      {TOOL_PAGES[pageId] ? <DownloadPage page={TOOL_PAGES[pageId]} guides={guides} /> : null}
    </I18nProvider>
  );
}
