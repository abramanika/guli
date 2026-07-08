/**
 * Error tracking for Guli.
 * Uses Sentry. Falls back to console.error if not configured.
 */

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;

let initialized = false;

/**
 * Initialize error tracking (call once at app start).
 */
export async function initErrorTracking() {
  if (!SENTRY_DSN || initialized) return;
  try {
    const Sentry = await import('https://cdn.jsdelivr.net/npm/@sentry/browser@8/+esm');
    Sentry.init({ dsn: SENTRY_DSN, environment: import.meta.env.MODE });
    initialized = true;
  } catch (e) {
    console.warn('Sentry init failed:', e);
  }
}

/**
 * Report an error manually.
 */
export function captureError(error, context) {
  console.error(error, context);
  if (initialized && window.Sentry) {
    window.Sentry.captureException(error, { extra: context });
  }
}
