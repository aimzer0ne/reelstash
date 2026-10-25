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

// A row of phone or browser mockups (transparent WebP drawings) with captions.
export function GuideShots({ images, wide = false }) {
  return (
    <div className={wide ? 'guide-shots is-wide' : 'guide-shots'}>
      {images.map((image) => (
        <figure key={image.src}>
          <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
          {image.caption ? <figcaption>{image.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}
