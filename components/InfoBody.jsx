import { AboutCopy } from './AboutCopy';
import { DisclaimerCopy } from './DisclaimerCopy';
import { LegalPage } from './LegalPage';
import { PrivacyCopy } from './PrivacyCopy';
import { ContactCopy, DmcaCopy, FaqCopy, HowToCopy, TermsCopy } from './InfoCopy';
import { faqGroups, legalPages } from '@/lib/legal.js';

// Help and legal pages: plain HTML, no hydration. Keys match the page files.
export const INFO_PAGES = {
  about: [legalPages.about, () => <AboutCopy />],
  faq: [legalPages.faq, () => <FaqCopy groups={faqGroups} />],
  'how-to': [legalPages.howTo, () => <HowToCopy />],
  terms: [legalPages.terms, () => <TermsCopy />],
  dmca: [legalPages.dmca, () => <DmcaCopy />],
  contact: [legalPages.contact, () => <ContactCopy />],
  privacy: [legalPages.privacy, () => <PrivacyCopy />],
  disclaimer: [legalPages.disclaimer, () => <DisclaimerCopy />]
};

export function InfoBody({ pageId }) {
  const [page, render] = INFO_PAGES[pageId];
  return (
    <LegalPage page={page}>
      {render()}
    </LegalPage>
  );
}
