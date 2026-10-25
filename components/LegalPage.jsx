import { Footer } from './Footer';
import { Header } from './Header';
import { JsonLd } from './JsonLd';

export function LegalPage({ page, children }) {
  return (
    <>
      {(page.jsonLd || []).map((block, index) => (
        <JsonLd key={index} data={block} />
      ))}
      <Header active={page.path} />
      <main className="legal-main">
        <article className="legal-article">
          <p className="kicker">{page.kicker || 'Legal'}</p>
          <h1 id="hero-heading">{page.heading}</h1>
          {children}
        </article>
        <Footer />
      </main>
    </>
  );
}
