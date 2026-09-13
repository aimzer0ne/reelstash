import { DisclaimerCopy } from '@/components/DisclaimerCopy';
import { LegalPage } from '@/components/LegalPage';
import { legalPages } from '@/lib/legal';

const page = legalPages.disclaimer;
export const metadata = page.metadata;

export default function DisclaimerPage() {
  return (
    <LegalPage page={page}>
      <DisclaimerCopy />
    </LegalPage>
  );
}
