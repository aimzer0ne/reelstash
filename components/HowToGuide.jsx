import { stepImages } from '@/lib/images.js';
import './page-arrange.css';

const PASTE_ICON = (
  <svg className="how-guide-paste-icon" xmlns="http://www.w3.org/2000/svg" height="24" width="24" aria-hidden="true">
    <path d="M12 5.125q.375 0 .637-.263.263-.262.263-.662 0-.375-.263-.638Q12.375 3.3 12 3.3t-.637.262q-.263.263-.263.663 0 .375.263.637.262.263.637.263ZM5.3 20.5q-.75 0-1.275-.525Q3.5 19.45 3.5 18.7V5.3q0-.75.525-1.275Q4.55 3.5 5.3 3.5h4.425q.2-.725.837-1.213Q11.2 1.8 12 1.8q.825 0 1.463.487.637.488.837 1.213h4.4q.75 0 1.275.525.525.525.525 1.275v13.4q0 .75-.525 1.275-.525.525-1.275.525Zm0-1.5h13.4q.1 0 .2-.1t.1-.2V5.3q0-.1-.1-.2t-.2-.1h-2.2v.8q0 .75-.525 1.288-.525.537-1.275.537H9.3q-.75 0-1.275-.537Q7.5 6.55 7.5 5.8V5H5.3q-.1 0-.2.1t-.1.2v13.4q0 .1.1.2t.2.1Z" />
  </svg>
);

const COPY = {
  video: {
    copyTitle: 'Copy the link',
    pasteTitle: 'Paste the URL',
    downloadTitle: 'Download & save',
    copy: (
      <p>
        Open the video in Instagram, tap the Share arrow or the three dots (&#8942;), then tap <b>&quot;Copy link&quot;</b>.
      </p>
    ),
    paste: (
      <p>
        Come back here and paste the link into the box above, or tap the Paste {PASTE_ICON} button.
      </p>
    ),
    download: (
      <p>
        Tap <b>&quot;Download video&quot;</b> to save the original-quality MP4, with sound, to your device.
      </p>
    )
  },
  photo: {
    copyTitle: 'Copy the post link',
    pasteTitle: 'Paste the link',
    downloadTitle: 'Download the photos',
    copy: (
      <p>
        In Instagram, tap the three dots (&#8942;) on the photo or carousel, then tap <b>&quot;Copy Link&quot;</b>.
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
        Every photo and slide is listed. Click <b>&quot;Download Photo&quot;</b> on the ones you want to save them as JPG.
      </p>
    )
  },
  stories: {
    copyTitle: 'Copy the Story link',
    pasteTitle: 'Paste the link',
    downloadTitle: 'Download the Story',
    copy: (
      <p>
        Open the public Story or Highlight, tap the three dots (&#8942;), then tap <b>&quot;Copy Link&quot;</b>.
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
        Each Story is listed. Click <b>&quot;Download&quot;</b> to save it as MP4 video or JPG photo.
      </p>
    )
  },
  audio: {
    copyTitle: 'Copy the Reel or video link',
    pasteTitle: 'Paste the link',
    downloadTitle: 'Download the audio',
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

export function HowToGuide({ heading, type = 'video' }) {
  const copy = COPY[type] || COPY.video;
  const images = stepImages(type);
  const steps = [
    [copy.copyTitle, copy.copy],
    [copy.pasteTitle, copy.paste],
    [copy.downloadTitle, copy.download]
  ];

  return (
    <section className="panel how-guide-panel" id="how-it-works" aria-labelledby="how-heading">
      <h2 id="how-heading">{heading}</h2>
      <ol className="how-guide">
        {steps.map(([title, body], index) => (
          <li key={title} className="how-guide-step">
            <div className="how-guide-visual">
              <img
                src={images[index].src}
                alt={images[index].alt}
                width={images[index].width}
                height={images[index].height}
                loading="lazy"
                decoding="async"
              />
            </div>
            <h3>
              <span className="how-guide-num" aria-hidden="true">{index + 1}</span>
              {title}
            </h3>
            {body}
          </li>
        ))}
      </ol>
    </section>
  );
}
