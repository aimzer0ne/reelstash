// Strips the inline tags used in translated copy (see lib/rich.jsx), for JSON-LD and meta text.
export function plainText(text) {
  return String(text)
    .replace(/<\/?(?:b|i|kbd|a(?::[a-z]+)?)>/g, '')
    .replace(/\s*\{paste\}\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
