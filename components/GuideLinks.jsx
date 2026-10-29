import Link from './Link';
import { Icon } from './Icons';

export function GuideLinks({ guides = [] }) {
  if (!guides.length) return null;
  return (
    <section className="panel guides-panel" id="guides" aria-labelledby="guides-heading">
      <div className="guides-head">
        <h2 id="guides-heading">Instagram download guides</h2>
        <Link className="guides-all" href="/blog">
          All guides <Icon name="arrow" className="guide-card-arrow" />
        </Link>
      </div>
      <ul className="guide-cards">
        {guides.map((guide) => (
          <li key={guide.href}>
            <Link className="guide-card" href={guide.href}>
              {guide.image ? (
                <span className="guide-card-thumb">
                  <img src={guide.image} alt="" width="720" height="480" loading="lazy" decoding="async" />
                </span>
              ) : null}
              <h3>{guide.title}</h3>
              <p>{guide.excerpt}</p>
              <span className="guide-card-meta">{guide.minutes} min read</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
