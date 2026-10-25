import Link from './Link';
import { Icon } from './Icons';
import { NAV } from '@/lib/site.jsx';

// Cards for every other downloader, so each tool page links to the rest.
export function ToolHub({ current, heading = 'What can you download?' }) {
  const tools = NAV.filter((item) => item.href !== current);
  return (
    <section className="panel tool-hub" id="tools" aria-labelledby="tools-heading">
      <h2 id="tools-heading">{heading}</h2>
      <p className="copy-lede">
        Every tool takes a public Instagram link and works in the browser on
        iPhone, Android, Windows, and Mac. Pick the one for the format you want.
      </p>
      <ul className="tool-hub-grid">
        {tools.map((item) => (
          <li key={item.href}>
            <Link className="tool-hub-card" href={item.href}>
              <span className="tool-hub-icon" aria-hidden="true"><Icon name={item.icon} /></span>
              <h3>{item.name}</h3>
              <p>{item.text}</p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="copy-note">
        Only public posts and accounts are supported. Private, Close Friends,
        and deleted content stays protected by Instagram.
      </p>
    </section>
  );
}

const DEVICE_COPY = {
  video: { noun: 'video', file: 'MP4', save: 'Save Video' },
  reels: { noun: 'Reel', file: 'MP4', save: 'Save Video' },
  photo: { noun: 'photo', file: 'JPG', save: 'Save Image' },
  stories: { noun: 'Story', file: 'MP4 or JPG', save: 'Save Video or Save Image' },
  audio: { noun: 'Reel audio', file: 'MP3', save: 'Save to Files' }
};

export function DeviceGuide({ kind = 'video' }) {
  const copy = DEVICE_COPY[kind] || DEVICE_COPY.video;
  const toPhotos = kind !== 'audio';
  return (
    <section className="panel article-panel" id="devices" aria-labelledby="devices-heading">
      <h2 id="devices-heading">How to download on iPhone, Android, and PC</h2>
      <table className="copy-table">
        <tbody>
          <tr>
            <th scope="row">iPhone &amp; iPad</th>
            <td>
              Copy the link in Instagram, open <b>Safari</b>, paste it here, and
              tap Download. Safari saves the {copy.file} to <b>Files → Downloads</b>.
              {toPhotos ? <> Open it, tap Share, and choose <b>{copy.save}</b> to move it to Photos.</> : null}
            </td>
          </tr>
          <tr>
            <th scope="row">Android</th>
            <td>
              Copy the link, open <b>Chrome</b> or any browser, paste it here, and
              tap Download. The {copy.noun} lands in the <b>Download</b> folder
              {toPhotos ? ' and shows up in Gallery or Google Photos.' : ', where any music player can open it.'}
            </td>
          </tr>
          <tr>
            <th scope="row">Windows, Mac &amp; Linux</th>
            <td>
              Copy the address from instagram.com in your browser, paste it here,
              and click Download. The {copy.file} is saved to your
              browser&apos;s <b>Downloads</b> folder.
            </td>
          </tr>
        </tbody>
      </table>
      <p className="copy-note">
        Illustrated steps for each device are in the{' '}
        <Link href="/how-to">complete download guide</Link>.
      </p>
    </section>
  );
}

export function FaqList({ heading = 'Frequently asked questions', items }) {
  return (
    <section className="panel" id="faq" aria-labelledby="faq-heading">
      <h2 id="faq-heading">{heading}</h2>
      <div className="faq-list">
        {items.map((item) => (
          <details key={item.q} open={item.open}>
            <summary>{item.q}</summary>
            <div className="faq-answer">{item.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
