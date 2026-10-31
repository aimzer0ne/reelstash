import { Footer } from './Footer';

export function LegalPage({ page, children }) {
  return (
    <main className="legal-main">
      <article className="legal-article">
        <p className="kicker">{page.kicker || 'Legal'}</p>
        <h1 id="hero-heading">{page.heading}</h1>
        {children}
      </article>
      <Footer />
    </main>
  );
}
