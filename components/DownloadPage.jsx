import { Footer } from './Footer';
import { Header } from './Header';
import { Icon } from './Icons';
import { JsonLd } from './JsonLd';
import { AudioCopy } from './AudioCopy';
import { HomeCopy } from './HomeCopy';
import { PageCopy } from './PageCopy';
import { ToolCopy } from './ToolCopy';
import { Downloader } from './Downloader';
import { Engage } from './Engage';

export function DownloadPage({ page, guides = [] }) {
  return (
    <>
      {page.jsonLd.map((block, index) => (
        <JsonLd key={index} data={block} />
      ))}
      <Header active={page.path} />
      <Engage />
      <main id="home">
        <Downloader
          mode={page.mode}
          kicker={page.kicker}
          heading={page.heading}
          lede={page.lede}
          translate={page.translate !== false}
          inputLabel={page.inputLabel}
          placeholder={page.placeholder}
          messages={page.messages}
          summary={page.summary}
        />
        {page.path === '/' ? (
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
      </main>
    </>
  );
}
