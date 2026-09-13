import { PrivacyCopy } from '@/components/PrivacyCopy';
import { LegalPage } from '@/components/LegalPage';
import { legalPages } from '@/lib/legal';

const page = legalPages.privacy;
export const metadata = page.metadata;

export default function PrivacyPage() {
  return (
    <LegalPage page={page}>
      <PrivacyCopy />
    </LegalPage>
  );
}
