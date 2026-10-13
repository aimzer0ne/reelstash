import { Rich } from '@/lib/rich';
import './page-arrange.css';

const VISUALS = [
  { src: '/assets/copy-instagram-reel-link-reelsdl-net.avif', width: 576, height: 180 },
  { src: '/assets/paste-instagram-link-reelsdl-net.avif', width: 786, height: 154 },
  { src: '/assets/download-instagram-reel-reelsdl-net.avif', width: 941, height: 187, className: 'how-guide-visual is-download' }
];

export function HowToGuide({ how }) {
  return (
    <section className="panel how-guide-panel" id="how-it-works" aria-labelledby="how-heading">
      <h2 id="how-heading">{how.heading}</h2>
      <ol className="how-guide">
        {how.steps.map((step, index) => {
          const visual = VISUALS[index];
          return (
            <li className="how-guide-step" key={step.title}>
              <span className="how-guide-num">{String(index + 1).padStart(2, '0')}</span>
              <div className={visual.className || 'how-guide-visual'}>
                <img
                  src={visual.src}
                  alt={step.alt}
                  title={step.imgTitle || step.alt}
                  width={visual.width}
                  height={visual.height}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 720px) 92vw, 240px"
                />
              </div>
              <h3>{step.title}</h3>
              <p><Rich text={step.text} /></p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
