import { DownloadPage } from '@/components/DownloadPage';
import { audioPage, pageMetadata } from '@/lib/site';

export const metadata = pageMetadata(audioPage);

export default function AudioPage() {
  return <DownloadPage page={audioPage} />;
}
