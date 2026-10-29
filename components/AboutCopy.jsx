import Link from './Link';
import { SITE_EMAIL } from '@/lib/seo';

export function AboutCopy() {
  return (
    <div className="legal-copy">
      <p>
        <Link href="/">ReelsDl.net</Link> is a free, browser-based Instagram
        downloader. It started in September 2026 with one job: let anyone save a
        public Instagram video or Reel from its link, in the best quality
        Instagram offers, without installing an app or handing over an
        Instagram password.
      </p>

      <h2>What you can save</h2>
      <ul>
        <li><Link href="/">Instagram video &amp; Reels downloader</Link>: Reels, video posts, IGTV clips, and the videos inside carousels, saved as MP4 with their sound.</li>
        <li><Link href="/photo">Photo downloader</Link>: single photos and every slide of a carousel, saved as JPG.</li>
        <li><Link href="/stories">Story downloader</Link>: public Stories before they expire, and whole Highlights.</li>
        <li><Link href="/audio">Audio downloader</Link>: the soundtrack of a Reel or video, or an Instagram audio page, saved as MP3.</li>
      </ul>

      <h2>How it works</h2>
      <ol>
        <li>You paste the link of a public post, Reel, Story, or audio page.</li>
        <li>ReelsDl.net reads that post the way Instagram shows it to someone who is not logged in, and lists every photo and video in it, in the largest size Instagram serves.</li>
        <li>When you tap Download, the file streams from Instagram&apos;s servers to your device at that moment. MP3 files are converted on the fly. We do not host Instagram media or keep copies of what you download.</li>
      </ol>

      <h2>What ReelsDl.net will never do</h2>
      <ul>
        <li>Ask for your Instagram username or password, or connect to your account.</li>
        <li>Open private accounts, Close Friends Stories, or deleted posts.</li>
        <li>Add a watermark, or re-encode a video to a lower quality.</li>
        <li>Make you sign up, pay, or install anything.</li>
      </ul>

      <h2>Respecting creators</h2>
      <p>
        ReelsDl.net is made for personal use: watching a video offline, or
        keeping a recipe or tutorial for later. Re-uploading someone
        else&apos;s video or using it in your own content needs the
        creator&apos;s permission. Rights holders can ask us to block a link
        through the <Link href="/dmca">DMCA &amp; copyright page</Link>. More
        on this in{' '}
        <Link href="/blog/is-it-legal-to-download-instagram-reels">is it legal to download Instagram Reels?</Link>
      </p>

      <h2>Independent</h2>
      <p>
        ReelsDl.net is not affiliated with, endorsed by, or sponsored by
        Instagram or Meta Platforms, Inc. It is free to use and supported by
        ads.
      </p>

      <h2>Get in touch</h2>
      <p>
        Found a link that does not work, or have an idea for the site? Email{' '}
        <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a> or use the{' '}
        <Link href="/contact">contact page</Link>. Step-by-step help is in the{' '}
        <Link href="/how-to">download guide</Link>, the <Link href="/faq">FAQ</Link>,
        and the <Link href="/blog">blog</Link>.
      </p>
    </div>
  );
}
