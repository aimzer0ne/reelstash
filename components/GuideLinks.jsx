import Link from './Link';
import { useI18n } from './I18nProvider';

const ARROW = (
  <svg className="guide-card-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function GuideLinks({ guides = [], copy }) {
  const { href } = useI18n();
  if (!guides.length) return null;
  return (
    <section className="panel guides-panel" id="guides" aria-labelledby="guides-heading">
      <div className="guides-head">
        <div>
          <p className="guides-kicker">{copy.kicker}</p>
          <h2 id="guides-heading">{copy.heading}</h2>
        </div>
        <Link className="guides-all" href={href('blog')}>
          {copy.all} {ARROW}
        </Link>
      </div>
      <ul className="guide-cards">
        {guides.map((guide, index) => (
          <li key={guide.href}>
            <Link className="guide-card" href={guide.href}>
              {guide.image ? (
                <span className="guide-card-thumb">
                  <img src={guide.image} alt="" width="720" height="405" loading="lazy" decoding="async" />
                </span>
              ) : null}
              <span className="guide-card-meta">
                <span className="guide-card-num">{String(index + 1).padStart(2, '0')}</span>
                <span>{guide.minutes} {copy.minRead}</span>
              </span>
              <h3>{guide.title}</h3>
              <p>{guide.excerpt}</p>
              <span className="guide-card-more">{copy.read} {ARROW}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
