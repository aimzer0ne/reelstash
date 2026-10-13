import { Footer } from './Footer';
import { Header } from './Header';
import { AudioCopy } from './AudioCopy';
import { HomeCopy } from './HomeCopy';
import { Downloader } from './Downloader';
import { useI18n } from './I18nProvider';

export function DownloadPage({ pageId, guides = [] }) {
  const { content } = useI18n();
  const audio = pageId === 'audio';
  return (
    <>
      <Header />
      <main id="home">
        <Downloader
          mode={audio ? 'audio' : 'media'}
          defaultTitle={content.common.defaultTitle[audio ? 'audio' : 'media']}
        />
        {audio ? (
          <AudioCopy copy={content.audio} common={content.common} guides={guides} />
        ) : (
          <HomeCopy copy={content.home} common={content.common} guides={guides} />
        )}
        <Footer />
      </main>
    </>
  );
}
