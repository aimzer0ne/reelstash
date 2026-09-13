import Link from 'next/link';
import { HowToGuide } from './HowToGuide';

export function HomeCopy({ page }) {
  return (
    <div className="home-copy">
      <p className="home-audio-cta">
        <Link href="/instagram-audio-downloader">+ Reels Audio - mp3 Download</Link>
      </p>

      <section className="panel article-panel" aria-labelledby="home-intro-heading">
        <h2 id="home-intro-heading" className="sr-only">About ReelsDl.net</h2>
        <div className="article-copy">
          <p>
            <b>ReelsDl.net</b> is a free Instagram Reels downloader.
            Paste a public Instagram link to save Reels as MP4, photos as JPG,
            carousel posts, or convert Reel audio to MP3. No Instagram login
            is required. Private posts cannot be downloaded.
          </p>
          <p>
            <b>ReelsDl.net :</b> Are you one of those people who posts
            Photos & Reels videos and spent time on Instagram on a daily basis?
            If so. Well, there&apos;s good news: there are ways to{' '}
            <b>Download Instagram Reels</b> so you can watch them offline!
            [<Link href="/">ReelsDl.net</Link>],
          </p>
          <p>
            we&apos;ll show
            you how to <i>Save Instagram Reels Videos </i>. Download videos{' '}
            <b>Instagram to MP4</b> So, Stay tuned!
          </p>
        </div>
      </section>

      <HowToGuide heading={page.how.heading} type="reels" />

      <section className="home-feature" aria-labelledby="reels-downloader-heading">
        <div className="home-feature-copy article-copy">
          <h2 id="reels-downloader-heading">Reels Downloader :</h2>
          <p>
            Have you ever wanted to save Instagram Videos/Reels/Photos etc. from{' '}
            <a
              href="https://about.instagram.com/blog/announcements/introducing-instagram-reels-announcement"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            , so you can watch them offline? Or maybe you just want to have a
            collection of all of your favorite videos to share with friends?
            Either way, there&apos;s an easy way to do it – & 😉 I&apos;m going to show
            you how. Keep reading for instructions on how to use the{' '}
            <b>Instagram Reels Downloader</b>. Also Instagram video download MP4
          </p>
        </div>
      </section>

      <section className="panel article-panel" aria-labelledby="why-heading">
        <h2 id="why-heading">Why ReelsDl.net is Best ?</h2>
        <div className="article-copy">
          <p>
            <b>ReelsDl.net : </b> is the best #1 WebApp for Fast
            Downloading or <b>save Instagram videos</b>{' '}
            <i> Reels, Photos, videos & Stories</i> etc. on one place 😜 -
            ReelsDl.net
          </p>
          <ul>
            <li>We Get & Download Reels Videos as fast as possible.</li>
            <li>Download Instagram Reels Videos without watermark.</li>
            <li>Instagram Reels Download by link</li>
            <li>We offer convert Video to Audio (mp3) Feature Also !</li>
            <li>NO Login Needed !</li>
            <li>Download Anonymously Reels/Video/Stories etc.</li>
            <li>HD Quality Videos & Photos</li>
            <li>Much More... 😜</li>
          </ul>
        </div>
      </section>

      <section className="panel article-panel" aria-labelledby="offers-heading">
        <h2 id="offers-heading">What ReelsDl.net offers ?</h2>
        <div className="article-copy">
          <p>
            <b>ReelsDl.net : </b> offers everything you want to
            download from &quot;Instagram&quot; in <b>HD</b> quality 😜 You can
            download Instagram Reels | Videos | Photos | Carousel etc.
          </p>
          <p>
            <b>Carousel / Multiple Posts : </b> Download posts with
            multiple photos/videos in a post or mixed content in a post on
            instagram
          </p>
          <ul>
            <li>
              <Link href="/">Reels Downloader</Link>
            </li>
            <li>
              <Link href="/">Photos &amp; Carousel Downloader</Link>
            </li>
            <li>
              <Link href="/">Instagram Videos Downloader</Link>
            </li>
            <li>
              <Link href="/instagram-audio-downloader">Convert video to audio (mp3)</Link>
            </li>
          </ul>
        </div>
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
