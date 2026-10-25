// Source drawings for the illustration images. scripts/build-images.mjs renders
// each one to light and dark .webp files; pages show those files through
// <Illustration>, which Google Images can index. The .art-* classes stand for
// the theme tokens and are swapped for fixed colors when rendering.

function Gradient({ id }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#feda75" />
        <stop offset=".25" stopColor="#fa7e1e" />
        <stop offset=".5" stopColor="#d62976" />
        <stop offset=".75" stopColor="#962fbf" />
        <stop offset="1" stopColor="#4f5bd5" />
      </linearGradient>
    </defs>
  );
}

function Phone({ children }) {
  return (
    <g>
      <rect x="40" y="20" width="150" height="260" rx="26" className="art-ink" />
      <rect x="48" y="28" width="134" height="244" rx="20" className="art-paper" />
      <rect x="95" y="36" width="40" height="8" rx="4" className="art-ink" />
      {children}
    </g>
  );
}

function SaveArrow({ id }) {
  // A straight line has a zero-height bounding box, so its gradient must use user space.
  const line = `${id}-line`;
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id={line} gradientUnits="userSpaceOnUse" x1="220" y1="0" x2="330" y2="0">
          <stop offset="0" stopColor="#fa7e1e" />
          <stop offset=".5" stopColor="#d62976" />
          <stop offset="1" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <path d="M220 150h104" stroke={`url(#${line})`} strokeWidth="8" />
      <path d="M306 128l22 22-22 22" stroke={`url(#${line})`} strokeWidth="8" />
      <circle cx="272" cy="106" r="20" className="art-paper art-line" strokeWidth="2" />
      <path d="M272 96v18m-8-7 8 8 8-8" className="art-ink-stroke" strokeWidth="3" />
    </g>
  );
}

function FileCard({ label, id, children }) {
  return (
    <g>
      <rect x="360" y="60" width="160" height="190" rx="18" className="art-paper art-line" strokeWidth="2" />
      <path d="M480 60h22a18 18 0 0 1 18 18v22" className="art-line" fill="none" strokeWidth="2" />
      {children}
      <rect x="380" y="204" width="76" height="30" rx="15" fill={`url(#${id})`} />
      <text x="418" y="224" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff" fontFamily="system-ui, sans-serif">{label}</text>
      <circle cx="490" cy="219" r="15" className="art-ink" />
      <path d="M483 219l5 5 9-10" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'var(--bg)' }} />
    </g>
  );
}

function Art({ label, children }) {
  return (
    <svg className="tool-art" viewBox="0 0 560 300" role="img" aria-label={label}>
      <title>{label}</title>
      <rect x="0" y="0" width="560" height="300" rx="28" className="art-bg" />
      {children}
    </svg>
  );
}

function PlayBadge({ cx, cy, r = 18 }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} className="art-ink" opacity=".85" />
      <path d={`M${cx - r * .3} ${cy - r * .45}v${r * .9}l${r * .75}-${r * .45}z`} style={{ fill: 'var(--bg)' }} />
    </g>
  );
}

export function VideoArt() {
  const id = 'art-g-video';
  return (
    <Art label="An Instagram video post on a phone saved as an HD MP4 file">
      <Gradient id={id} />
      <Phone>
        <circle cx="66" cy="62" r="9" fill={`url(#${id})`} />
        <rect x="80" y="57" width="60" height="9" rx="4.5" className="art-muted" />
        <rect x="48" y="80" width="134" height="110" className="art-bg" />
        <PlayBadge cx={115} cy={135} />
        <rect x="58" y="202" width="90" height="8" rx="4" className="art-muted" />
        <rect x="58" y="218" width="110" height="8" rx="4" className="art-muted" opacity=".6" />
      </Phone>
      <SaveArrow id={id} />
      <FileCard label="MP4" id={id}>
        <rect x="380" y="82" width="120" height="96" rx="10" className="art-bg" />
        <PlayBadge cx={440} cy={130} r={16} />
        <text x="380" y="196" fontSize="12" className="art-muted" fontFamily="system-ui, sans-serif">1080p · with sound</text>
      </FileCard>
    </Art>
  );
}

export function ReelsArt() {
  const id = 'art-g-reels';
  return (
    <Art label="A vertical Instagram Reel with music saved to the camera roll as MP4">
      <Gradient id={id} />
      <Phone>
        <rect x="48" y="50" width="134" height="222" className="art-bg" />
        <PlayBadge cx={115} cy={150} r={20} />
        <g className="art-muted">
          <circle cx="164" cy="170" r="7" />
          <circle cx="164" cy="196" r="7" />
          <circle cx="164" cy="222" r="7" />
        </g>
        <rect x="58" y="236" width="70" height="8" rx="4" className="art-ink" />
        <path d="M60 256h6v-8l10-2v10" fill="none" className="art-ink-stroke" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="82" y="251" width="54" height="7" rx="3.5" className="art-muted" />
      </Phone>
      <SaveArrow id={id} />
      <FileCard label="MP4" id={id}>
        <g>
          <rect x="380" y="80" width="36" height="52" rx="6" className="art-bg" />
          <rect x="422" y="80" width="36" height="52" rx="6" fill={`url(#${id})`} opacity=".9" />
          <rect x="464" y="80" width="36" height="52" rx="6" className="art-bg" />
          <rect x="380" y="138" width="36" height="52" rx="6" className="art-bg" />
          <rect x="422" y="138" width="36" height="52" rx="6" className="art-bg" />
        </g>
        <text x="466" y="168" fontSize="11" className="art-muted" fontFamily="system-ui, sans-serif">9:16</text>
      </FileCard>
    </Art>
  );
}

export function PhotoArt() {
  const id = 'art-g-photo';
  return (
    <Art label="An Instagram carousel post with several slides saved as full-size JPG photos">
      <Gradient id={id} />
      <Phone>
        <circle cx="66" cy="62" r="9" fill={`url(#${id})`} />
        <rect x="80" y="57" width="60" height="9" rx="4.5" className="art-muted" />
        <rect x="48" y="80" width="134" height="134" className="art-bg" />
        <circle cx="150" cy="134" r="12" className="art-muted" />
        <path d="M48 214l42-50 30 32 18-18 44 36z" className="art-muted" opacity=".7" />
        <rect x="140" y="88" width="34" height="18" rx="9" className="art-ink" opacity=".8" />
        <text x="157" y="101" textAnchor="middle" fontSize="10" fontWeight="700" style={{ fill: 'var(--bg)' }} fontFamily="system-ui, sans-serif">1/4</text>
        <g>
          <circle cx="101" cy="228" r="3.5" fill={`url(#${id})`} />
          <circle cx="111" cy="228" r="3.5" className="art-muted" />
          <circle cx="121" cy="228" r="3.5" className="art-muted" />
          <circle cx="131" cy="228" r="3.5" className="art-muted" />
        </g>
      </Phone>
      <SaveArrow id={id} />
      <FileCard label="JPG" id={id}>
        {[0, 1, 2, 3].map((index) => (
          <g key={index} transform={`translate(${380 + (index % 2) * 62} ${80 + Math.floor(index / 2) * 60})`}>
            <rect width="56" height="54" rx="8" className="art-bg" />
            <path d="M0 54l18-22 12 12 8-8 18 18z" className="art-muted" opacity=".7" />
            <circle cx="42" cy="14" r="6" className="art-muted" />
          </g>
        ))}
      </FileCard>
    </Art>
  );
}

export function StoriesArt() {
  const id = 'art-g-stories';
  return (
    <Art label="A public Instagram Story and Highlights saved before they expire after 24 hours">
      <Gradient id={id} />
      <Phone>
        <g>
          {[0, 1, 2].map((index) => (
            <rect key={index} x={56 + index * 42} y="52" width="38" height="4" rx="2" className={index ? 'art-muted' : 'art-ink'} />
          ))}
        </g>
        <circle cx="68" cy="74" r="10" fill="none" stroke={`url(#${id})`} strokeWidth="3" />
        <rect x="84" y="70" width="50" height="8" rx="4" className="art-muted" />
        <rect x="56" y="94" width="118" height="140" rx="12" className="art-bg" />
        <PlayBadge cx={115} cy={164} r={18} />
        <rect x="56" y="244" width="118" height="20" rx="10" className="art-line" fill="none" strokeWidth="2" />
      </Phone>
      <SaveArrow id={id} />
      <FileCard label="24h" id={id}>
        {[0, 1, 2].map((index) => (
          <g key={index}>
            <circle cx={400 + index * 40} cy="110" r="17" fill="none" stroke={`url(#${id})`} strokeWidth="3" />
            <circle cx={400 + index * 40} cy="110" r="12" className="art-bg" />
          </g>
        ))}
        <rect x="380" y="146" width="120" height="8" rx="4" className="art-muted" />
        <rect x="380" y="164" width="84" height="8" rx="4" className="art-muted" opacity=".6" />
      </FileCard>
    </Art>
  );
}

export function AudioArt() {
  const id = 'art-g-audio';
  const bars = [18, 34, 52, 30, 64, 42, 24, 56, 38, 20, 46, 28];
  return (
    <Art label="The soundtrack of an Instagram Reel extracted and saved as an MP3 audio file">
      <Gradient id={id} />
      <Phone>
        <rect x="48" y="50" width="134" height="170" className="art-bg" />
        <PlayBadge cx={115} cy={135} r={20} />
        <rect x="58" y="232" width="114" height="30" rx="15" className="art-paper art-line" strokeWidth="2" />
        <path d="M72 252h6v-10l12-2v12" fill="none" className="art-ink-stroke" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="98" y="243" width="62" height="8" rx="4" className="art-muted" />
      </Phone>
      <SaveArrow id={id} />
      <FileCard label="MP3" id={id}>
        {bars.map((height, index) => (
          <rect
            key={index}
            x={384 + index * 10}
            y={136 - height / 2}
            width="6"
            height={height}
            rx="3"
            fill={index < 5 ? `url(#${id})` : undefined}
            className={index < 5 ? undefined : 'art-muted'}
          />
        ))}
      </FileCard>
    </Art>
  );
}
