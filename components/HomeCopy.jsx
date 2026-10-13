import Link from './Link';
import { FeatureShowcase } from './FeatureShowcase';
import { GuideLinks } from './GuideLinks';
import { HowToGuide } from './HowToGuide';
import { useI18n } from './I18nProvider';
import { Rich } from '@/lib/rich';
import './page-arrange.css';

function Paragraphs({ items }) {
  return items.map((text) => <p key={text}><Rich text={text} /></p>);
}

function Rows({ rows }) {
  return (
    <table className="copy-table">
      <tbody>
        {rows.map(([label, text]) => (
          <tr key={label}>
            <th scope="row">{label}</th>
            <td><Rich text={text} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function FaqList({ heading, items }) {
  return (
    <section className="panel" id="faq" aria-labelledby="faq-heading">
      <h2 id="faq-heading">{heading}</h2>
      <div className="faq-list">
        {items.map((item) => (
          <details key={item.q} open={item.open}>
            <summary>{item.q}</summary>
            <div className="faq-answer">
              {item.a.length > 1 ? <Paragraphs items={item.a} /> : <Rich text={item.a[0]} />}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export function HomeCopy({ copy, common, guides }) {
  const { href } = useI18n();
  const { jump } = common;
  return (
    <div className="home-copy">
      <p className="home-audio-cta">
        <Link href={href('audio')}>{copy.audioCta}</Link>
      </p>

      <nav className="home-jump" aria-label={common.onThisPage}>
        <a href="#about">{jump.about}</a>
        <a href="#how-it-works">{jump.howTo}</a>
        <a href="#features">{jump.features}</a>
        <a href="#video">{jump.video}</a>
        <a href="#formats">{jump.formats}</a>
        <a href="#why">{jump.why}</a>
        {guides.length ? <a href="#guides">{jump.guides}</a> : null}
        <a href="#faq">{jump.faq}</a>
      </nav>

      <section className="panel article-panel" id="about" aria-labelledby="home-intro-heading">
        <h2 id="home-intro-heading">{copy.about.heading}</h2>
        <div className="article-copy">
          <Paragraphs items={copy.about.p} />
        </div>
      </section>

      <HowToGuide how={copy.how} />

      <FeatureShowcase features={copy.features} />

      <section className="panel article-panel" id="video" aria-labelledby="video-heading">
        <h2 id="video-heading">{copy.video.heading}</h2>
        <div className="article-copy">
          <Paragraphs items={copy.video.p} />
        </div>
        <Rows rows={copy.video.rows} />
      </section>

      <section className="panel article-panel" id="formats" aria-labelledby="formats-heading">
        <h2 id="formats-heading">{copy.formats.heading}</h2>
        <div className="article-copy">
          <Paragraphs items={copy.formats.p} />
        </div>
        <Rows rows={copy.formats.rows} />
      </section>

      <section className="panel article-panel" id="why" aria-labelledby="why-heading">
        <h2 id="why-heading">{copy.why.heading}</h2>
        <div className="article-copy">
          <Paragraphs items={copy.why.p} />
        </div>
        <ul className="copy-grid">
          {copy.why.items.map((text) => <li key={text}><Rich text={text} /></li>)}
        </ul>
        <div className="article-copy copy-follow">
          <p><Rich text={copy.why.follow} /></p>
        </div>
      </section>

      <GuideLinks guides={guides} copy={common.guides} />

      <FaqList heading={common.faqHeading} items={copy.faq} />
    </div>
  );
}
