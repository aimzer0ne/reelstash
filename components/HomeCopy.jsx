import Link from './Link';
import { FeatureShowcase } from './FeatureShowcase';
import { GuideLinks } from './GuideLinks';
import { HowToGuide } from './HowToGuide';
import './page-arrange.css';

export function HomeCopy({ page, guides }) {
  return (
    <div className="home-copy">
      <p className="home-audio-cta">
        <Link href="/audio">+ Reels Audio - mp3 Download</Link>
      </p>

      <nav className="home-jump" aria-label="On this page">
        <a href="#about">About</a>
        <a href="#how-it-works">How to</a>
        <a href="#features">Features</a>
        <a href="#video">Video</a>
        <a href="#formats">Formats</a>
        <a href="#why">Why</a>
        <a href="#guides">Guides</a>
        <a href="#faq">FAQ</a>
      </nav>

      <section className="panel article-panel" id="about" aria-labelledby="home-intro-heading">
        <h2 id="home-intro-heading">Free Instagram Reels Downloader</h2>
        <div className="article-copy">
          <p>
            <b>ReelsDl.net</b> is a free <b>Instagram Reels downloader</b> and{' '}
            <b>Instagram video downloader</b>. Paste a public Instagram link to
            save Reels and videos as MP4, photos as JPG, carousel posts, or
            convert Reel audio to MP3. No login is required. Private posts
            cannot be downloaded.
          </p>
          <p>
            Use the <b>Reels downloader</b> to watch Reels offline or to keep a
            collection you can share later. The three steps below show how to{' '}
            <b>download Instagram Reels</b> and save any{' '}
            <b>Instagram video as MP4</b> on a phone or computer.
          </p>
        </div>
      </section>

      <HowToGuide heading={page.how.heading} type="reels" />

      <FeatureShowcase />

      <section className="panel article-panel" id="video" aria-labelledby="video-heading">
        <h2 id="video-heading">Instagram Video Downloader</h2>
        <div className="article-copy">
          <p>
            Not every Instagram video is a Reel. The <b>Instagram video downloader</b>{' '}
            also saves ordinary video posts and the video clips inside
            carousels. Paste the post link and each video is listed as an MP4
            with its own download button.
          </p>
          <p>
            Videos are saved in the quality Instagram serves, with their sound
            and without an added watermark. Long videos work the same way as
            short Reels; they only take a little longer to load.
          </p>
        </div>
        <table className="copy-table">
          <tbody>
            <tr>
              <th scope="row">Reels downloader</th>
              <td>Links that contain <b>/reel/</b> or <b>/reels/</b>. Vertical short videos, saved as MP4.</td>
            </tr>
            <tr>
              <th scope="row">Video post downloader</th>
              <td>Links that contain <b>/p/</b>. Feed videos and video slides in carousels, saved as MP4.</td>
            </tr>
            <tr>
              <th scope="row">Audio only</th>
              <td>
                Use the <Link href="/audio">Reel audio downloader</Link>{' '}
                to keep the sound as MP3.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="panel article-panel" id="formats" aria-labelledby="formats-heading">
        <h2 id="formats-heading">What you can download from Instagram</h2>
        <div className="article-copy">
          <p>
            The <b>Reels downloader</b> saves public posts in{' '}
            <b>HD</b>, in the same quality{' '}
            <a
              href="https://about.instagram.com/blog/announcements/introducing-instagram-reels-announcement"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>{' '}
            shows them. One link covers every format below.
          </p>
        </div>
        <table className="copy-table">
          <tbody>
            <tr>
              <th scope="row">Reels</th>
              <td>Saved as MP4 video, without a watermark.</td>
            </tr>
            <tr>
              <th scope="row">Instagram videos</th>
              <td><b>Instagram video download MP4</b> for any public video post.</td>
            </tr>
            <tr>
              <th scope="row">Photos</th>
              <td>Single photo posts, saved as JPG.</td>
            </tr>
            <tr>
              <th scope="row">Carousel posts</th>
              <td>Several photos, several videos, or a mix of both from one post.</td>
            </tr>
            <tr>
              <th scope="row">Stories</th>
              <td>Public Stories, saved as video or photo.</td>
            </tr>
            <tr>
              <th scope="row">Reel audio</th>
              <td>
                <Link href="/audio">Convert video to audio (MP3)</Link>{' '}
                to keep only the soundtrack.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="panel article-panel" id="why" aria-labelledby="why-heading">
        <h2 id="why-heading">Why use the ReelsDl Reels Downloader</h2>
        <div className="article-copy">
          <p>
            <b>ReelsDl.net</b> is a fast way to <b>save Instagram videos</b> —
            Reels, photos, videos, and Stories — in one place.
          </p>
        </div>
        <ul className="copy-grid">
          <li><b>Fast.</b> Download Reels as fast as the link allows.</li>
          <li><b>No watermark.</b> Save Instagram Reels without a watermark.</li>
          <li><b>By link.</b> Instagram Reels download by link, nothing to install.</li>
          <li><b>No login.</b> Your Instagram account is never needed.</li>
          <li><b>Anonymous.</b> Download Reels, videos, and Stories anonymously.</li>
          <li><b>Free.</b> No sign-up and no paid plan.</li>
        </ul>
        <div className="article-copy copy-follow">
          <p>
            Once the video is saved, a lot of people still rewrite the caption
            or bio before they post again. A{' '}
            <a href="https://cursivee.app" target="_blank" rel="noopener noreferrer">
              cursive text generator
            </a>{' '}
            turns ordinary typing into script you can paste into Instagram.
          </p>
        </div>
      </section>

      <GuideLinks guides={guides} />

      <section className="panel" id="faq" aria-labelledby="faq-heading">
        <h2 id="faq-heading">{page.faq.heading}</h2>
        <div className="faq-list">
          {page.faq.items.map((item) => (
            <details key={item.q} open={item.open}>
              <summary>{item.q}</summary>
              <div className="faq-answer">{item.a}</div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
