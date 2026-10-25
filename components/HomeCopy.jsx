import Link from './Link';
import { FeatureShowcase } from './FeatureShowcase';
import { GuideLinks } from './GuideLinks';
import { HowToGuide } from './HowToGuide';
import { GuideShots, Illustration } from './Illustration';
import { DeviceGuide, FaqList, ToolHub } from './ToolSections';
import { sceneImage } from '@/lib/images.js';
import './page-arrange.css';

export function HomeCopy({ page, guides }) {
  return (
    <div className="home-copy">
      <nav className="home-jump" aria-label="On this page">
        <a href="#about">About</a>
        <a href="#how-it-works">How to</a>
        <a href="#features">Features</a>
        <a href="#reels">Reels</a>
        <a href="#video">Video</a>
        <a href="#tools">Tools</a>
        <a href="#devices">Devices</a>
        <a href="#why">Why</a>
        <a href="#guides">Guides</a>
        <a href="#faq">FAQ</a>
      </nav>

      <section className="panel article-panel" id="about" aria-labelledby="home-intro-heading">
        <h2 id="home-intro-heading">Free Instagram Video &amp; Reels Downloader</h2>
        <div className="article-copy">
          <p>
            <b>ReelsDl.net</b> is a free <b>Instagram video downloader</b> and{' '}
            <b>Reels downloader</b> in one. Paste a public Instagram link to save
            videos and <a href="#reels">Reels</a> as MP4 with their music,{' '}
            <Link href="/photo">photos and carousels</Link> as JPG,{' '}
            <Link href="/stories">Stories</Link> before they expire, or{' '}
            <Link href="/audio">Reel audio as MP3</Link>. No login is required.
            Private posts cannot be downloaded.
          </p>
          <p>
            Instagram has no download button for other people&apos;s posts, and
            screen recording loses quality and sound. ReelsDl.net saves the
            original file Instagram stores, in HD, with its audio, on a phone or
            computer, with nothing to install.
          </p>
        </div>
        <Illustration name="video" />
      </section>

      <HowToGuide heading={page.how.heading} type="video" />

      <FeatureShowcase />

      <section className="panel article-panel" id="reels" aria-labelledby="reels-heading">
        <h2 id="reels-heading">Instagram Reels Downloader</h2>
        <div className="article-copy">
          <p>
            The same box works as an <b>Instagram Reels downloader</b>. Paste a
            Reel link and you get the video file Instagram streams in the app,
            with its original audio track and without the logo overlay that
            Instagram&apos;s own Download button stamps on top.
          </p>
          <p>
            Reels keep their vertical 9:16 frame, their sound, and their timing
            exactly as the creator posted them. Nothing is re-encoded, so the
            file is as sharp as the Reel you watched.
          </p>
        </div>
        <GuideShots images={[sceneImage('watermarkCompare')]} wide />
        <table className="copy-table">
          <tbody>
            <tr>
              <th scope="row">Resolution</th>
              <td>The best rendition Instagram stores, usually <b>1080 × 1920</b>. If a Reel looks blurry here, it was uploaded blurry.</td>
            </tr>
            <tr>
              <th scope="row">Music &amp; voice</th>
              <td>Kept in the MP4. Want only the song? Use the <Link href="/audio">Reel to MP3 converter</Link>.</td>
            </tr>
            <tr>
              <th scope="row">Watermark</th>
              <td>
                None added. Instagram only adds its logo when you use the in-app
                Download button. <Link href="/blog/download-instagram-reels-without-watermark">Why that happens</Link>.
              </td>
            </tr>
            <tr>
              <th scope="row">Length</th>
              <td>Short clips and long Reels both work. Longer ones take a few seconds more.</td>
            </tr>
          </tbody>
        </table>
      </section>

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

      <ToolHub current="/" />

      <DeviceGuide kind="video" />

      <section className="panel article-panel" id="why" aria-labelledby="why-heading">
        <h2 id="why-heading">Why use ReelsDl.net</h2>
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

      <FaqList heading={page.faq.heading} items={page.faq.items} />
    </div>
  );
}
