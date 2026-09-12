import { LegalPage } from '@/components/LegalPage';
import { legalPages } from '@/lib/legal';

const page = legalPages.copyright;
export const metadata = page.metadata;

export default function CopyrightPage() {
  return <LegalPage page={page} />;
}
