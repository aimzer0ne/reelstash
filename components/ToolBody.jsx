import { Footer } from './Footer';
import { I18nProvider } from './I18nProvider';
import { Icon } from './Icons';
import { AudioCopy } from './AudioCopy';
import { GuideLinks } from './GuideLinks';
import { HomeCopy } from './HomeCopy';
import { PageCopy } from './PageCopy';
import { ToolCopy } from './ToolCopy';
import { ToolHub } from './ToolSections';

// Everything under the hero on a tool page. Rendered to HTML on the server and
// never hydrated: the downloader above it is the page's only island.
export function ToolBody({ page, guides = [], locale, messages }) {
  return (
    <I18nProvider locale={locale} messages={messages}>
      {page.notFound ? (
        <div className="home-copy">
          <ToolHub current={null} heading="Pick a downloader" />
          <GuideLinks guides={guides} />
        </div>
      ) : page.path === '/' ? (
        <HomeCopy page={page} guides={guides} />
      ) : page.path === '/audio' ? (
        <AudioCopy page={page} guides={guides} />
      ) : page.intro ? (
        <ToolCopy page={page} guides={guides} />
      ) : (
        <>
          {page.why ? (
            <section className="panel why-panel" id="why" aria-labelledby="why-heading">
              <h2 id="why-heading">{page.why.heading}</h2>
              <ol className="steps why-steps">
                {page.why.items.map((item) => (
                  <li key={item.title}>
                    {item.icon ? <span className="step-icon"><Icon name={item.icon} /></span> : null}
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
          <PageCopy page={page} />
        </>
      )}
      <Footer lead={page.footerLead} />
    </I18nProvider>
  );
}
