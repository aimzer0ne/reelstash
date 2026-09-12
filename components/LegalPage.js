import { Footer } from './Footer';
import { Header } from './Header';

export function LegalPage({ page }) {
  return (
    <>
      <Header current={page.path} />
      <main className="legal-main">
        <article className="legal-article">
          <p className="kicker">Legal</p>
          <h1 id="hero-heading">{page.heading}</h1>
          <p className="legal-updated">Updated {page.updated}</p>
          {page.sections.map((section) => (
            <section key={section.heading} className="legal-section">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </section>
          ))}
        </article>
        <Footer />
      </main>
    </>
  );
}
