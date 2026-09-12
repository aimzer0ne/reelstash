import { DownloadPage } from '@/components/DownloadPage';
import { homePage, pageMetadata } from '@/lib/site';

export const metadata = pageMetadata(homePage);

export default function HomePage() {
  return <DownloadPage page={homePage} />;
}
