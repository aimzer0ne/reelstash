import { Icon } from './Icons';

const ICONS = ['reels', 'download', 'audio', 'link', 'unlock', 'device'];

export function FeatureShowcase({ features }) {
  return (
    <section className="feature-showcase" id="features" aria-labelledby="features-heading">
      <p className="feature-showcase-kicker">{features.kicker}</p>
      <h2 id="features-heading">{features.heading}</h2>
      <ul className="feature-showcase-grid">
        {features.items.map((item, index) => (
          <li key={item.title}>
            <span className="feature-showcase-icon" aria-hidden="true">
              <Icon name={ICONS[index]} />
            </span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
