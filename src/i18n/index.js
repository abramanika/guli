import ka from './ka.json';
import en from './en.json';
import ru from './ru.json';

const MESSAGES = { ka, en, ru };

let currentLocale = 'ka';

/**
 * Set the active locale.
 */
export function setLocale(locale) {
  if (MESSAGES[locale]) currentLocale = locale;
}

/**
 * Get the current locale.
 */
export function getLocale() {
  return currentLocale;
}

/**
 * Translate a key, with optional interpolation.
 * @param {string} key - e.g., "map.chapters_left"
 * @param {Object} params - e.g., { count: 5 }
 * @returns {string}
 */
export function t(key, params) {
  let msg = MESSAGES[currentLocale]?.[key] || MESSAGES.ka[key] || key;
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      msg = msg.replace(`{${k}}`, v);
    });
  }
  return msg;
}
