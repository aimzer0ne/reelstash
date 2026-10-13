// Server-side only: importing this pulls every translation, so React components must not.
// They receive the one locale they render as a prop.
import en from './en.js';
import es from './es.js';
import pt from './pt.js';
import id_ from './id.js';
import tr from './tr.js';
import hi from './hi.js';
import ar from './ar.js';
import fr from './fr.js';
import de from './de.js';
import it from './it.js';
import ru from './ru.js';
import ja from './ja.js';
import ko from './ko.js';
import vi from './vi.js';
import th from './th.js';
import pl from './pl.js';

const CONTENT = { en, es, pt, id: id_, tr, hi, ar, fr, de, it, ru, ja, ko, vi, th, pl };

export function getContent(locale) {
  return CONTENT[locale] || CONTENT.en;
}

export function hasContent(locale, section) {
  return Boolean(CONTENT[locale]?.[section]);
}
