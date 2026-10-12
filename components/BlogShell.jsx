import { Footer } from './Footer';
import { Header } from './Header';
import { I18nProvider } from './I18nProvider';

export function BlogShell({ initialLocale = 'en', children }) {
  return (
    <I18nProvider initialLocale={initialLocale}>
      <Header />
      <main className="blog-main">
        {children}
        <Footer />
      </main>
    </I18nProvider>
  );
}
