import { Footer } from './Footer';
import { Header } from './Header';
import { I18nProvider } from './I18nProvider';

export function BlogShell({ children, ...i18n }) {
  return (
    <I18nProvider {...i18n}>
      <Header />
      <main className="blog-main">
        {children}
        <Footer />
      </main>
    </I18nProvider>
  );
}
