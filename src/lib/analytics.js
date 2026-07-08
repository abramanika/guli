/**
 * Privacy-first analytics for Guli.
 * Uses Plausible (no cookies, GDPR-compliant).
 * Falls back to no-op if not configured.
 */

const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN;

/**
 * Track a custom event.
 * @param {string} name - Event name
 * @param {Object} props - Event properties
 */
export function trackEvent(name, props = {}) {
  if (!PLAUSIBLE_DOMAIN) return;
  if (typeof window.plausible === 'function') {
    window.plausible(name, { props });
  }
}

// Key funnel events
export const Events = {
  ONBOARDING_START: 'Onboarding Start',
  ONBOARDING_COMPLETE: 'Onboarding Complete',
  CHAPTER_START: 'Chapter Start',
  CHAPTER_COMPLETE: 'Chapter Complete',
  PORTRAIT_VIEW: 'Portrait View',
  SHARE_CREATE: 'Share Create',
  INVITE_SEND: 'Invite Send',
  FRIEND_ADD: 'Friend Add',
  DAILY_ANSWER: 'Daily Answer',
};
