import Link from './Link';
import { Illustration } from './Illustration';
import { FaqList } from './ToolSections';
import { SITE_EMAIL } from '@/lib/seo';
import { NAV } from '@/lib/site.jsx';
import './page-arrange.css';

export const DEVICE_STEPS = [
  {
    id: 'iphone',
    name: 'iPhone and iPad',
    art: 'iphone',
    steps: [
      'In Instagram, open the post, Reel, or Story and tap the three dots (⋯) or the Share arrow.',
      'Tap Copy Link.',
      'Open Safari and go to reelsdl.net. Use the tab for the format you want: Video, Reels, Photo, Story, or Audio.',
      'Tap the input box, tap Paste, and wait a second for the preview.',
      'Tap Download, then Download again in the Safari pop-up.',
      'Open the Files app → Downloads. Tap the file, tap Share, and choose Save Video or Save Image to put it in Photos.'
    ]
  },
  {
    id: 'android',
    name: 'Android',
    art: 'android',
    steps: [
      'In Instagram, tap the three dots (⋮) or the Share arrow on the post, Reel, or Story.',
      'Tap Copy Link.',
      'Open Chrome, Samsung Internet, or any browser and go to reelsdl.net.',
      'Paste the link into the box and press Enter.',
      'Tap Download. The file is saved to the Download folder.',
      'Videos and photos appear in Gallery or Google Photos within a few seconds; MP3 files open in any music player.'
    ]
  },
  {
    id: 'desktop',
    name: 'Windows, Mac, and Linux',
    art: 'desktop',
    steps: [
      'Open the post on instagram.com in Chrome, Edge, Safari, or Firefox.',
      'Copy the address from the address bar, or click the three dots on the post and choose Copy link.',
      'Open reelsdl.net in a new tab and pick the right tool.',
      'Paste with Ctrl+V (Cmd+V on Mac) and press Enter.',
      'Click Download. The file is saved to your Downloads folder.'
    ]
  }
];

export function HowToCopy() {
  return (
    <div className="home-copy info-copy">
      <p className="copy-lede">
        Every ReelsDl.net tool works the same way: copy a public Instagram
        link, paste it, download the file. These are the exact steps for each
        device, and what to do when a download does not start.
      </p>

      <section className="panel" id="devices" aria-labelledby="devices-heading">
        <h2 id="devices-heading">Step by step on every device</h2>
        <ul className="device-steps">
          {DEVICE_STEPS.map(({ id, name, art, steps }) => (
            <li key={id} id={id}>
              <Illustration name={art} caption={false} />
              <h3>{name}</h3>
              <ol>
                {steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel article-panel" id="formats" aria-labelledby="formats-heading">
        <h2 id="formats-heading">Which tool to use</h2>
        <table className="copy-table">
          <tbody>
            {NAV.map((item) => (
              <tr key={item.href}>
                <th scope="row"><Link href={item.href}>{item.name}</Link></th>
                <td>{item.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="panel article-panel" id="problems" aria-labelledby="problems-heading">
        <h2 id="problems-heading">If a download does not work</h2>
        <table className="copy-table">
          <tbody>
            <tr>
              <th scope="row">&quot;We could not fetch that link&quot;</th>
              <td>The post is private, deleted, age-restricted, or the link is incomplete. Open the link in a private browser window: if Instagram asks you to log in to see it, it cannot be downloaded.</td>
            </tr>
            <tr>
              <th scope="row">Video plays without sound</th>
              <td>Check the silent switch and volume, then try VLC. Some Reels have music muted by Instagram for copyright reasons.</td>
            </tr>
            <tr>
              <th scope="row">File is not in Photos or Gallery</th>
              <td>
                On iPhone it is in Files → Downloads first. See{' '}
                <Link href="/blog/instagram-reels-not-saving-to-camera-roll">Reels not saving to your camera roll</Link>.
              </td>
            </tr>
            <tr>
              <th scope="row">Story not found</th>
              <td>Stories expire after 24 hours. Only Stories saved to a Highlight remain available.</td>
            </tr>
          </tbody>
        </table>
        <p className="copy-note">
          Still stuck? Email <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a> with the link and we will look into it.
        </p>
      </section>
    </div>
  );
}

export function FaqCopy({ groups }) {
  return (
    <div className="home-copy info-copy">
      <p className="copy-lede">
        Answers about downloading Instagram videos, Reels, photos, Stories, and
        audio with ReelsDl.net. Jump to a topic:{' '}
        {groups.map((group, index) => (
          <span key={group.id}>
            {index ? ' · ' : null}
            <a href={`#${group.id}`}>{group.label}</a>
          </span>
        ))}
      </p>
      {groups.map((group) => (
        <div key={group.id} id={group.id}>
          <FaqList heading={group.heading} items={group.items} />
          <p className="copy-note">
            Open the <Link href={group.href}>{group.tool}</Link>.
          </p>
        </div>
      ))}
    </div>
  );
}

export function TermsCopy() {
  return (
    <div className="legal-copy">
      <p>Last updated: October 25, 2026</p>
      <p>
        These terms apply to your use of <Link href="/">ReelsDl.net</Link>. By
        using the site you agree to them. If you do not agree, please do not use
        the site.
      </p>
      <h2>What the service does</h2>
      <p>
        ReelsDl.net is a free web tool that helps you save media from publicly
        available Instagram posts, Reels, Stories, and audio. We do not host
        Instagram content. Files are fetched from Instagram&apos;s own servers at
        the moment you request them.
      </p>
      <h2>Your responsibilities</h2>
      <ul>
        <li>Download only content you own or have permission to use, or that you use under a legal exception such as personal viewing.</li>
        <li>Respect the copyright, privacy, and rights of creators, and Instagram&apos;s terms of use.</li>
        <li>Do not use the site to re-upload, sell, or claim other people&apos;s work as your own.</li>
        <li>Do not abuse the service with automated requests, scraping, or attempts to bypass its limits or security.</li>
      </ul>
      <h2>Public content only</h2>
      <p>
        The service never asks for your Instagram login and cannot access
        private accounts, Close Friends content, or deleted posts.
      </p>
      <h2>No warranty</h2>
      <p>
        The site is provided &quot;as is&quot;. Instagram can change how it
        serves media at any time, so we cannot guarantee that every link will
        work. We are not liable for any loss arising from use of the site or of
        downloaded files.
      </p>
      <h2>Not affiliated with Instagram</h2>
      <p>
        ReelsDl.net is an independent tool. It is not affiliated with, endorsed
        by, or sponsored by Instagram or Meta Platforms, Inc. Instagram is a
        trademark of Meta Platforms, Inc.
      </p>
      <h2>Changes</h2>
      <p>
        We may update these terms. The date at the top shows the latest version.
        See also our <Link href="/privacy">Privacy Policy</Link>,{' '}
        <Link href="/disclaimer">Disclaimer</Link>, and{' '}
        <Link href="/dmca">DMCA policy</Link>.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
      </p>
    </div>
  );
}

export function DmcaCopy() {
  return (
    <div className="legal-copy">
      <p>
        ReelsDl.net respects the rights of creators. We do not store, host, or
        cache Instagram videos, photos, or audio on our servers. Each download
        is fetched from Instagram&apos;s servers when a user requests it.
      </p>
      <h2>If your content is involved</h2>
      <p>
        Because the media lives on Instagram, the most effective way to stop it
        from being available is to remove the post on Instagram, make your
        account private, or report it to Instagram through its{' '}
        <a href="https://help.instagram.com/contact/552695131608132" target="_blank" rel="noopener noreferrer">copyright form</a>.
      </p>
      <p>
        If you still believe ReelsDl.net is used to infringe your copyright,
        send us a notice and we will review it and, where appropriate, block the
        specific links from being processed.
      </p>
      <h2>What to include in a notice</h2>
      <ul>
        <li>Your name and contact details.</li>
        <li>The work you own and the Instagram link(s) concerned.</li>
        <li>A statement that you believe in good faith the use is not authorized by the owner, its agent, or the law.</li>
        <li>A statement that the information is accurate and that you are the owner or authorized to act for the owner.</li>
        <li>Your physical or electronic signature.</li>
      </ul>
      <p>
        Send notices to <a href={`mailto:${SITE_EMAIL}?subject=DMCA%20notice`}>{SITE_EMAIL}</a>.
      </p>
    </div>
  );
}

export function ContactCopy() {
  return (
    <div className="legal-copy">
      <p>
        Email is the fastest way to reach the ReelsDl.net team, for bug
        reports, feedback, partnership, or copyright questions.
      </p>
      <h2>Email</h2>
      <p>
        <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
      </p>
      <h2>Reporting a link that does not work</h2>
      <p>
        Include the Instagram link, the tool you used (Video, Reels, Photo,
        Story, or Audio), your device and browser, and the message you saw.
        That lets us reproduce the problem quickly.
      </p>
      <h2>Before you write</h2>
      <ul>
        <li>Private posts, Close Friends Stories, and deleted posts cannot be downloaded.</li>
        <li>Stories expire after 24 hours unless they are in a Highlight.</li>
        <li>Most other questions are answered in the <Link href="/faq">FAQ</Link> and the <Link href="/how-to">download guide</Link>.</li>
      </ul>
      <h2>Copyright</h2>
      <p>
        Rights holders, please see our <Link href="/dmca">DMCA policy</Link>.
      </p>
    </div>
  );
}
