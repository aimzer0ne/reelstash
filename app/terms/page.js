import { LegalPage } from '@/components/LegalPage';
import { legalPages } from '@/lib/legal';

const page = legalPages.terms;
export const metadata = page.metadata;

export default function TermsPage() {
  return <LegalPage page={page} />;
}
