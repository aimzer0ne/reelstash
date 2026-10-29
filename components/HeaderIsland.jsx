import { Header } from './Header';
import { I18nProvider } from './I18nProvider';

// The site header hydrates on its own (language, theme, share, install), so the
// page copy below it can stay plain HTML with no JavaScript.
export function HeaderIsland({ active, locale, messages }) {
  return (
    <I18nProvider locale={locale} messages={messages}>
      <Header active={active} />
    </I18nProvider>
  );
}
