import { ILLUSTRATIONS, illustrationSrc } from '@/lib/images.js';

// Real image files (indexable, with alt text) drawn in light and dark versions.
// CSS shows the one matching the theme; the hidden one is never fetched because
// lazy images with display:none are not loaded.
export function Illustration({ name, caption = true, className = '' }) {
  const item = ILLUSTRATIONS[name];
  if (!item) return null;
  const size = { width: item.width, height: item.height, loading: 'lazy', decoding: 'async' };
  return (
    <figure className={`tool-figure ${className}`.trim()}>
      <img className="art-img art-img-light" src={illustrationSrc(name)} alt={item.alt} {...size} />
      <img className="art-img art-img-dark" src={illustrationSrc(name, true)} alt="" aria-hidden="true" {...size} />
      {caption && item.caption ? <figcaption>{item.caption}</figcaption> : null}
    </figure>
  );
}
