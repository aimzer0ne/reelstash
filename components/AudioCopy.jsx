import Link from './Link';
import { HowToGuide } from './HowToGuide';
import './page-arrange.css';

export function AudioCopy({ page }) {
  return (
    <div className="home-copy">
      <p className="home-audio-cta">
        <Link href="/">+ Reels Downloader</Link>
      </p>

      <nav className="home-jump home-jump-5" aria-label="On this page">
        <a href="#about">About</a>
        <a href="#how-it-works">How to</a>
        <a href="#audio-guide">Copy link</a>
        <a href="#audio-music">Music</a>
        <a href="#faq">FAQ</a>
      </nav>

      <section className="panel article-panel" id="about" aria-labelledby="audio-intro-heading">
        <h2 id="audio-intro-heading">Instagram Reels Audio Downloader</h2>
        <div className="article-copy">
          <p>
            <b>ReelsDl.net</b> is a free Instagram audio downloader.
            Paste a public Reel or video link to extract the soundtrack and
            save it as an MP3. No Instagram login. Private posts cannot be converted.
          </p>
          <p>
            It is an easy way to convert and download{' '}
            <b>Instagram Reels videos in MP3</b> format online, on a phone,
            tablet, or computer.
          </p>
          <p>
            <a
              href="https://about.instagram.com/blog/announcements/introducing-instagram-reels-announcement"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram Reels
            </a>{' '}
            are short videos made with audio, AR effects, and more. When you
            only want the song, music, or voice from one, download the
            Instagram Reels music here. To save the video itself, use the{' '}
            <Link href="/">Reels Downloader</Link>.
          </p>
        </div>
      </section>

      <HowToGuide heading={page.how.heading} type="audio" />

      <section className="panel article-panel" id="audio-guide" aria-labelledby="audio-guide-heading">
        <h2 id="audio-guide-heading">How to copy an Instagram audio link</h2>
        <div className="article-copy">
          <p>
            Every Reel has an audio page of its own. Copying that link takes
            a few taps in the Instagram app:
          </p>
        </div>
        <ol className="guide-steps">
          <li>
            <p>
              Open the Instagram app and find the Reel whose audio you want.
              Tap the <b>song or audio name</b> in the bottom left corner.
            </p>
            <img
              className="guide-image"
              width={1440}
              height={1039}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 720px) 92vw, 400px"
              src="/assets/instagram-reel-audio-track-reelsdl-net.webp"
              alt="Instagram Reel audio track to copy before saving the MP3 on ReelsDl.net"
              title="Instagram Reel audio track on ReelsDl.net"
            />
          </li>
          <li>
            <p>
              Tap the <b>three dots (...)</b> menu. On iPhone it sits below
              the username of the person who posted the Reel; on Android it
              is in the top right corner.
            </p>
            <img
              className="guide-image"
              width={1440}
              height={920}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 720px) 92vw, 400px"
              src="/assets/instagram-audio-copy-link-reelsdl-net.webp"
              alt="Instagram audio page menu used to copy a Reel link for the ReelsDl.net MP3 downloader"
              title="Copy an Instagram audio link for ReelsDl.net"
            />
          </li>
          <li>
            <p>
              In the pop-up menu, choose <b>Copy Link</b> (or <b>Share Link</b>,
              depending on the option shown). The audio link is now on your
              clipboard.
            </p>
          </li>
          <li>
            <p>
              Paste the link into the box at the top of this page and
              press <b>Enter</b>.
            </p>
          </li>
          <li>
            <p>
              After a few seconds, click the <b>Download MP3</b> button. The
              file is saved to your Downloads folder.
            </p>
          </li>
        </ol>
        <p className="copy-note">
          <b>Important note:</b> You cannot copy the link to Reels from
          private accounts. If the Reel is from a private account, the
          &quot;Copy Link&quot; option is not available.
        </p>
      </section>

      <section className="panel article-panel" id="audio-music" aria-labelledby="audio-music-heading">
        <h2 id="audio-music-heading">Reels Music Downloader</h2>
        <div className="article-copy">
          <p>
            Heard a sound on a Reel that you want to keep? The{' '}
            <b>Reels Music Downloader</b> turns the video&apos;s sound into an
            MP3 you can download on your phone, tablet, or PC.
          </p>
          <p>
            Once you have the MP3, you can add it to your own Reels, use it
            in edits, or set it as a ringtone if your phone allows it.
          </p>
        </div>
        <ul className="copy-grid">
          <li><b>Reels to MP3.</b> Convert Reels and video clips into audio.</li>
          <li><b>Songs, music, voice.</b> Keep the full soundtrack of the clip.</li>
          <li><b>Any device.</b> iPhone, Android, PC, and Mac.</li>
          <li><b>No login.</b> Public Reels and videos only.</li>
        </ul>
        <p className="copy-note">
          Before you download anything, make sure it is okay to use. If it is
          a song and you are not sure, find some{' '}
          <a
            href="https://pixabay.com/music/"
            target="_blank"
            rel="noopener noreferrer"
          >
            royalty-free
          </a>
          {' '}music or ask the creator for permission.
        </p>
      </section>

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
