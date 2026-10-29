import { Footer } from './Footer';
import { I18nProvider } from './I18nProvider';

export function LegalPage({ page, locale, messages, children }) {
  return (
    <I18nProvider locale={locale} messages={messages}>
      <main className="legal-main">
        <article className="legal-article">
          <p className="kicker">{page.kicker || 'Legal'}</p>
          <h1 id="hero-heading">{page.heading}</h1>
          {children}
        </article>
        <Footer />
      </main>
    </I18nProvider>
  );
}
