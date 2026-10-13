import { useI18n } from '@/components/I18nProvider';

const EXTERNAL = {
  instagram: 'https://about.instagram.com/blog/announcements/introducing-instagram-reels-announcement',
  cursive: 'https://cursivee.app',
  pixabay: 'https://pixabay.com/music/'
};

const PASTE_ICON = (
  <svg className="how-guide-paste-icon" xmlns="http://www.w3.org/2000/svg" height="24" width="24" aria-hidden="true">
    <path d="M12 5.125q.375 0 .637-.263.263-.262.263-.662 0-.375-.263-.638Q12.375 3.3 12 3.3t-.637.262q-.263.263-.263.663 0 .375.263.637.262.263.637.263ZM5.3 20.5q-.75 0-1.275-.525Q3.5 19.45 3.5 18.7V5.3q0-.75.525-1.275Q4.55 3.5 5.3 3.5h4.425q.2-.725.837-1.213Q11.2 1.8 12 1.8q.825 0 1.463.487.637.488.837 1.213h4.4q.75 0 1.275.525.525.525.525 1.275v13.4q0 .75-.525 1.275-.525.525-1.275.525Zm0-1.5h13.4q.1 0 .2-.1t.1-.2V5.3q0-.1-.1-.2t-.2-.1h-2.2v.8q0 .75-.525 1.288-.525.537-1.275.537H9.3q-.75 0-1.275-.537Q7.5 6.55 7.5 5.8V5H5.3q-.1 0-.2.1t-.1.2v13.4q0 .1.1.2t.2.1Z" />
  </svg>
);

const TOKEN = /<(b|i|kbd|a:[a-z]+)>([\s\S]*?)<\/(?:b|i|kbd|a)>|\{paste\}|\n/g;

// Translated copy keeps its inline markup as flat tags: <b>, <i>, <kbd>, <a:home>, <a:audio>,
// <a:instagram>, <a:cursive>, <a:pixabay>, plus {paste} for the paste icon and \n for a line break.
export function Rich({ text }) {
  const { href } = useI18n();
  const nodes = [];
  let last = 0;
  let key = 0;
  for (const match of String(text).matchAll(TOKEN)) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    last = match.index + match[0].length;
    key += 1;
    const [whole, tag, inner] = match;
    if (whole === '{paste}') nodes.push(<span key={key}>{PASTE_ICON}</span>);
    else if (whole === '\n') nodes.push(<br key={key} />);
    else if (tag === 'b') nodes.push(<b key={key}>{inner}</b>);
    else if (tag === 'i') nodes.push(<i key={key}>{inner}</i>);
    else if (tag === 'kbd') nodes.push(<kbd key={key} className="how-guide-key">{inner}</kbd>);
    else {
      const target = tag.slice(2);
      nodes.push(EXTERNAL[target]
        ? <a key={key} href={EXTERNAL[target]} target="_blank" rel="noopener noreferrer">{inner}</a>
        : <a key={key} href={href(target)}>{inner}</a>);
    }
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}
