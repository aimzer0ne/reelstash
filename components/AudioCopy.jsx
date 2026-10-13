import Link from './Link';
import { GuideLinks } from './GuideLinks';
import { FaqList } from './HomeCopy';
import { HowToGuide } from './HowToGuide';
import { useI18n } from './I18nProvider';
import { Rich } from '@/lib/rich';
import './page-arrange.css';

const GUIDE_IMAGES = [
  { src: '/assets/instagram-reel-audio-track-reelsdl-net.webp', height: 1039 },
  { src: '/assets/instagram-audio-copy-link-reelsdl-net.webp', height: 920 }
];

export function AudioCopy({ copy, common, guides }) {
  const { href } = useI18n();
  const { jump } = common;
  return (
    <div className="home-copy">
      <p className="home-audio-cta">
        <Link href={href('home')}>{copy.reelsCta}</Link>
      </p>

      <nav className="home-jump home-jump-5" aria-label={common.onThisPage}>
        <a href="#about">{jump.about}</a>
        <a href="#how-it-works">{jump.howTo}</a>
        <a href="#audio-guide">{jump.copyLink}</a>
        <a href="#audio-music">{jump.music}</a>
        <a href="#faq">{jump.faq}</a>
      </nav>

      <section className="panel article-panel" id="about" aria-labelledby="audio-intro-heading">
        <h2 id="audio-intro-heading">{copy.about.heading}</h2>
        <div className="article-copy">
          {copy.about.p.map((text) => <p key={text}><Rich text={text} /></p>)}
        </div>
      </section>

      <HowToGuide how={copy.how} />

      <section className="panel article-panel" id="audio-guide" aria-labelledby="audio-guide-heading">
        <h2 id="audio-guide-heading">{copy.guide.heading}</h2>
        <div className="article-copy">
          <p>{copy.guide.intro}</p>
        </div>
        <ol className="guide-steps">
          {copy.guide.steps.map((text, index) => {
            const image = GUIDE_IMAGES[index];
            const label = copy.guide.images[index];
            return (
              <li key={text}>
                <p><Rich text={text} /></p>
                {image ? (
                  <img
                    className="guide-image"
                    width={1440}
                    height={image.height}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 720px) 92vw, 400px"
                    src={image.src}
                    alt={label.alt}
                    title={label.imgTitle || label.alt}
                  />
                ) : null}
              </li>
            );
          })}
        </ol>
        <p className="copy-note"><Rich text={copy.guide.note} /></p>
      </section>

      <section className="panel article-panel" id="audio-music" aria-labelledby="audio-music-heading">
        <h2 id="audio-music-heading">{copy.music.heading}</h2>
        <div className="article-copy">
          {copy.music.p.map((text) => <p key={text}><Rich text={text} /></p>)}
        </div>
        <ul className="copy-grid">
          {copy.music.items.map((text) => <li key={text}><Rich text={text} /></li>)}
        </ul>
        <p className="copy-note"><Rich text={copy.music.note} /></p>
      </section>

      <GuideLinks guides={guides} copy={common.guides} />

      <FaqList heading={common.faqHeading} items={copy.faq} />
    </div>
  );
}
