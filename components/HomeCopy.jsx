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

      <section className="panel article-panel" id="about" aria-labelledby="home-intro-heading">
        <h2 id="home-intro-heading">Free Instagram video downloader and Reels downloader</h2>
        <div className="article-copy">
          <p>
            <b>ReelsDl.net</b> is a free <b>Instagram video downloader</b> and{' '}
            <b>Reels downloader</b> that works in any browser. Paste the link of a
            public Reel or video post and download it as an MP4 in HD, with its
            original sound and no watermark. The same box saves{' '}
            <Link href="/photo">photos and carousels</Link> as JPG, and the other
            tabs save <Link href="/stories">Stories and Highlights</Link> or{' '}
            <Link href="/audio">Reel audio as MP3</Link>. No login, no app, no
            sign-up. Private posts cannot be downloaded.
          </p>
          <p>
            Instagram only offers its own Download button on some Reels, and
            stamps its logo on the file. Screen recording loses quality and
            captures the interface. ReelsDl.net saves the original file Instagram
            stores, on a phone or a computer, in a few seconds.
          </p>
        </div>
        <Illustration name="video" />
      </section>

      <HowToGuide heading={page.how.heading} type="video" />

      <FeatureShowcase />

      <section className="panel article-panel" id="reels" aria-labelledby="reels-heading">
        <h2 id="reels-heading">Download Instagram Reels in HD with music</h2>
        <div className="article-copy">
          <p>
            As a <b>Reels downloader</b>, ReelsDl.net gives you the actual Reel
            file. Paste a Reel link and you get the video Instagram streams in the app,
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
              <td>The largest version Instagram serves, up to <b>1080 × 1920</b>. If a Reel looks blurry here, it was uploaded or stored that way. <Link href="/blog/download-instagram-reels-in-hd">Getting the sharpest copy</Link>.</td>
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
        <h2 id="video-heading">Instagram video downloader for posts, carousels, and IGTV</h2>
        <div className="article-copy">
          <p>
            Not every Instagram video is a Reel. The <b>Instagram video downloader</b>{' '}
            also saves ordinary video posts, older IGTV videos, and the video
            clips inside carousels. Paste the post link and each video is listed
            as an MP4 with its own download button.
          </p>
          <p>
            Videos are saved in the quality Instagram serves, with their sound
            and without an added watermark. Long videos work the same way as
            short Reels; they only take a little longer to load. Links copied
            from the app work as they are, including the <b>?igsh=</b> part at
            the end.
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
              <th scope="row">IGTV downloader</th>
              <td>Links that contain <b>/tv/</b>. Long videos posted before IGTV merged into Reels, saved as MP4.</td>
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

      <section className="panel article-panel" id="compare" aria-labelledby="compare-heading">
        <h2 id="compare-heading">Reels downloader vs. Instagram&apos;s Download button</h2>
        <div className="article-copy">
          <p>
            There are three ways to keep an Instagram video on your phone. Only
            one gives you the original file for every public post.
          </p>
        </div>
        <div className="copy-table-scroll">
          <table className="copy-table copy-table-compare">
            <thead>
              <tr>
                <th scope="col"><span className="sr-only">Feature</span></th>
                <th scope="col">Instagram Download button</th>
                <th scope="col">Screen recording</th>
                <th scope="col">ReelsDl.net</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Works on</th>
                <td>Some public Reels, when the creator allows it</td>
                <td>Anything on your screen</td>
                <td>Any public Reel, video, photo, carousel, or Story</td>
              </tr>
              <tr>
                <th scope="row">Watermark</th>
                <td>Instagram logo and username</td>
                <td>Captures the app interface and notifications</td>
                <td>None</td>
              </tr>
              <tr>
                <th scope="row">Quality</th>
                <td>Re-encoded copy with the logo burned in</td>
                <td>Your screen resolution, re-encoded</td>
                <td>The original file Instagram serves</td>
              </tr>
              <tr>
                <th scope="row">Music</th>
                <td>Sometimes missing</td>
                <td>Recorded live if your phone is not muted</td>
                <td>Kept in the MP4</td>
              </tr>
              <tr>
                <th scope="row">Time</th>
                <td>Seconds</td>
                <td>As long as the video</td>
                <td>Seconds</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="copy-note">
          Saving your own Reels? Instagram&apos;s download keeps the watermark
          there too. See{' '}
          <Link href="/blog/download-instagram-reels-without-watermark">how to download Reels without a watermark</Link>.
        </p>
      </section>

      <ToolHub current="/" />

      <DeviceGuide kind="video" />

      <section className="panel article-panel" id="why" aria-labelledby="why-heading">
        <h2 id="why-heading">Why use ReelsDl.net</h2>
        <div className="article-copy">
          <p>
            <b>ReelsDl.net</b> is one place to <b>save Instagram videos</b>,
            Reels, photos, and Stories, from any phone or computer.
          </p>
        </div>
        <ul className="copy-grid">
          <li><b>Fast.</b> Most links are ready to save in a second or two.</li>
          <li><b>No watermark.</b> Nothing is added to the file.</li>
          <li><b>Original quality.</b> The file Instagram stores, not a screen copy.</li>
          <li><b>No login.</b> Your Instagram account is never needed.</li>
          <li><b>Anonymous.</b> The creator is not notified when you download.</li>
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
