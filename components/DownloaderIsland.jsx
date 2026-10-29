import { Downloader } from './Downloader';
import { I18nProvider } from './I18nProvider';

// The hero, link box, and results: the only interactive part of a tool page.
export function DownloaderIsland({ locale, messages, ...props }) {
  return (
    <I18nProvider locale={locale} messages={messages}>
      <Downloader {...props} />
    </I18nProvider>
  );
}
