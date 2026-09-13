import Link from 'next/link';
import { HowToGuide } from './HowToGuide';

export function AudioCopy({ page }) {
  return (
    <div className="home-copy">
      <p className="home-audio-cta">
        <Link href="/">+ Reels Downloader</Link>
      </p>

      <section className="panel article-panel" aria-labelledby="audio-intro-heading">
        <h2 id="audio-intro-heading" className="sr-only">Instagram Reels Audio Downloader</h2>
        <div className="article-copy">
          <p>
            <b>Reelstash</b> is a webApp that offers an easy way to
            convert and download <b>Instagram Reels Videos in mp3</b> format
            online without any hassle!
          </p>
          <p>
            Instagram has launched a new feature that allows users to create
            videos with audio, AR effects and more. The length of these clips
            can be as short as 1 Min clip - they&apos;re called{' '}
            <a
              href="https://about.instagram.com/blog/announcements/introducing-instagram-reels-announcement"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram Reels
            </a>{' '}
            for good reason! ;) So Feel Free Download Instagram reels music on{' '}
            <Link href="/">Reelstash</Link>
          </p>
        </div>
      </section>

      <section className="panel article-panel" aria-labelledby="audio-guide-heading">
        <h2 id="audio-guide-heading">Reels Audio Download</h2>
        <div className="article-copy">
          <p>
            Copying the link to an Instagram Audio Reel is a simple process.
            Here&apos;s how to do it:
          </p>
          <ul>
            <li>
              1. Open the Instagram app & find the Reel you want to{' '}
              <Link href="/instagram-audio-downloader">Download Instagrma Audio</Link> for. Click on the &quot;Song/Audio&quot; in
              the bottom left corner
            </li>
          </ul>
          <img
            className="guide-image"
            width={400}
            height={400}
            loading="lazy"
            sizes="(max-width: 720px) 92vw, 400px"
            src="/assets/reelsaudiodownload-1.webp"
            alt="Reels Audio Download"
            title="Reels Audio Downloader"
          />
          <ul>
            <li>
              2. Look for the three dots &quot;...&quot; menu either below the username of
              the person who posted the Reel (on iPhone) or on the top right
              corner of the Reel (on Android).
            </li>
            <li>3. Tap on the three dots &quot;...&quot; menu to open a pop-up menu.</li>
          </ul>
          <img
            className="guide-image"
            width={400}
            height={400}
            loading="lazy"
            sizes="(max-width: 720px) 92vw, 400px"
            src="/assets/reelsaudiodownload-2.webp"
            alt="Reels Audio Download"
            title="Reels Audio Downloader"
          />
          <ul>
            <li>
              4. In the pop-up menu, select &quot;Copy Link&quot; or &quot;Share Link&quot;
              (depending on the option available).
            </li>
            <li>
              5. This will copy the Link URL of the Reel Audio to your
              clipboard.
            </li>
            <li>
              Now visit <Link href="/instagram-audio-downloader">Reelstash Audio MP3</Link>{' '}
              Paste the Link/URL and click &quot;GET&quot; Button Boom !!
            </li>
            <li>
              After Few sec. Click on the <b>Download Mp3</b> Button
            </li>
          </ul>
          <p>
            <b>Important Note: </b> You cannot copy the link to Reels from
            private accounts. If the Reel you want to share is from a private
            account, you won&apos;t see the &quot;Copy Link&quot; option available.
          </p>
        </div>
      </section>

      <section className="panel article-panel" aria-labelledby="audio-music-heading">
        <h2 id="audio-music-heading">Reels Music Downloader</h2>
        <div className="article-copy">
          <p>
            <b>Reels Music Downloader :</b> Want to download a video into Audio
            on Instagram? If so, we have the perfect solution for downloading
            Reels videos into mp3 audio on your phone, tablet, PC! Mentioning
            some benefits of our service such as being able easily convert
            Reels, video clips into mp3 & more - just follow these steps:
          </p>
          <ul>
            <li>Get the Reels video link</li>
            <li>
              Go to &quot;<Link href="/instagram-audio-downloader">Reelstash Audio MP3</Link>&quot;
            </li>
            <li>Paste link into input Box</li>
            <li>Click &quot;GET&quot; Button</li>
            <li>Wait a bit to Convert Video into mp3 format</li>
            <li>
              Click <b>&quot;Download Audio&quot;</b> button
            </li>
            <li>mp3 File will be saved in your downloads folder</li>
            <li>Now Enjoy ;) </li>
          </ul>
          <p>## Snag that Reel audio for your next masterpiece! </p>
          <p>
            Ever heard a sound on a Reel that&apos;s just FIRE? Now you can grab it
            and use it in your own Reels!{' '}
          </p>
          <p>
            These Instagram Reel audio downloaders are basically magic. ✨ All
            you gotta do is copy the link of the Reel and paste it into a
            website. Poof! The website turns the video&apos;s sound into an MP3 you
            can download.
          </p>
          <p>
            Once you have that MP3, the possibilities are endless! Add it to
            your Reels, use it in edits, or even make it your ringtone (if
            your phone&apos;s cool with that). It&apos;s a super way to get creative and
            share the sounds you love.{' '}
          </p>
          <p>
            But remember, before you download anything, make sure it&apos;s okay to
            use. If it&apos;s a song and you&apos;re not sure, find some{' '}
            <a
              href="https://pixabay.com/music/"
              target="_blank"
              rel="noopener noreferrer"
            >
              royalty-free
            </a>
            {' '}music or ask the creator for permission.
          </p>
          <p>
            So next time you hear an epic sound on a Reel, don&apos;t just watch –
            grab it and use it to create your own masterpiece!{' '}
          </p>
          <p>
            <b>#InstagramReelsMusic #MusicDownloader #GoodVibesOnly</b>
          </p>
        </div>
      </section>

      <HowToGuide heading={page.how.heading} type="audio" />

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
