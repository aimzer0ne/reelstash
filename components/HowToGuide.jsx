import './page-arrange.css';

const PASTE_ICON = (
  <svg className="how-guide-paste-icon" xmlns="http://www.w3.org/2000/svg" height="24" width="24" aria-hidden="true">
    <path d="M12 5.125q.375 0 .637-.263.263-.262.263-.662 0-.375-.263-.638Q12.375 3.3 12 3.3t-.637.262q-.263.263-.263.663 0 .375.263.637.262.263.637.263ZM5.3 20.5q-.75 0-1.275-.525Q3.5 19.45 3.5 18.7V5.3q0-.75.525-1.275Q4.55 3.5 5.3 3.5h4.425q.2-.725.837-1.213Q11.2 1.8 12 1.8q.825 0 1.463.487.637.488.837 1.213h4.4q.75 0 1.275.525.525.525.525 1.275v13.4q0 .75-.525 1.275-.525.525-1.275.525Zm0-1.5h13.4q.1 0 .2-.1t.1-.2V5.3q0-.1-.1-.2t-.2-.1h-2.2v.8q0 .75-.525 1.288-.525.537-1.275.537H9.3q-.75 0-1.275-.537Q7.5 6.55 7.5 5.8V5H5.3q-.1 0-.2.1t-.1.2v13.4q0 .1.1.2t.2.1Z" />
  </svg>
);

const COPY = {
  reels: {
    copyTitle: 'Copy the Reel link',
    pasteTitle: 'Paste the link',
    downloadTitle: 'Download the Reel',
    downloadAlt: 'Download an Instagram Reel as MP4 on ReelsDl.net',
    copy: (
      <p>
        In Instagram, tap the three dots (&#8942;) on the Reel, then tap <b>&quot;Copy Link&quot;</b>.
      </p>
    ),
    paste: (
      <p>
        Paste the copied link into the box above, or tap the Paste {PASTE_ICON} icon.
        <br />
        Then press <kbd className="how-guide-key">Enter</kbd>
      </p>
    ),
    download: (
      <p>
        Wait a moment for the Reel to load, then click <b>&quot;Download Video&quot;</b> to save it as MP4.
      </p>
    )
  },
  audio: {
    copyTitle: 'Copy the Reel or video link',
    pasteTitle: 'Paste the link',
    downloadTitle: 'Download the audio',
    downloadAlt: 'Download Instagram Reel audio as MP3 on ReelsDl.net',
    copy: (
      <p>
        In Instagram, tap the three dots (&#8942;) on the Reel or video, then tap <b>&quot;Copy Link&quot;</b>.
      </p>
    ),
    paste: (
      <p>
        Paste the copied link into the box above, or tap the Paste {PASTE_ICON} icon.
        <br />
        Then press <kbd className="how-guide-key">Enter</kbd>
      </p>
    ),
    download: (
      <p>
        Wait a few seconds for the conversion, then click <b>&quot;Download Audio&quot;</b> to save the <b>Reel audio</b> as MP3.
      </p>
    )
  }
};

export function HowToGuide({ heading, type = 'reels' }) {
  const copy = COPY[type] || COPY.reels;

  return (
    <section className="panel how-guide-panel" id="how-it-works" aria-labelledby="how-heading">
      <h2 id="how-heading">{heading}</h2>
      <ol className="how-guide">
        <li className="how-guide-step">
          <span className="how-guide-num">01</span>
          <div className="how-guide-visual">
            <img
              src="/assets/copy-instagram-reel-link-reelsdl-net.avif"
              alt="Copy an Instagram Reel link from the share menu, then paste it on ReelsDl.net"
              title="Copy an Instagram Reel link"
              width="576"
              height="180"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 720px) 92vw, 240px"
            />
          </div>
          <h3>{copy.copyTitle}</h3>
          {copy.copy}
        </li>
        <li className="how-guide-step">
          <span className="how-guide-num">02</span>
          <div className="how-guide-visual">
            <img
              src="/assets/paste-instagram-link-reelsdl-net.avif"
              alt="Paste a public Instagram link into ReelsDl.net and press Get"
              title="Paste an Instagram link on ReelsDl.net"
              width="786"
              height="154"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 720px) 92vw, 240px"
            />
          </div>
          <h3>{copy.pasteTitle}</h3>
          {copy.paste}
        </li>
        <li className="how-guide-step">
          <span className="how-guide-num">03</span>
          <div className="how-guide-visual is-download">
            <img
              src="/assets/download-instagram-reel-reelsdl-net.avif"
              alt={copy.downloadAlt}
              title="Download an Instagram Reel on ReelsDl.net"
              width="941"
              height="187"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 720px) 92vw, 240px"
            />
          </div>
          <h3>{copy.downloadTitle}</h3>
          {copy.download}
        </li>
      </ol>
    </section>
  );
}
