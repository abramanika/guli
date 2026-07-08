import { Capacitor } from '@capacitor/core';

/**
 * Check if running in a native app context.
 */
export const isNative = Capacitor.isNativePlatform();

/**
 * Trigger a light haptic tap (for answer selection).
 */
export async function hapticTap() {
  if (!isNative) return;
  const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
  await Haptics.impact({ style: ImpactStyle.Light });
}

/**
 * Trigger a success haptic (for chapter completion).
 */
export async function hapticSuccess() {
  if (!isNative) return;
  const { Haptics, NotificationType } = await import('@capacitor/haptics');
  await Haptics.notification({ type: NotificationType.Success });
}

/**
 * Share content using native share sheet.
 */
export async function nativeShare({ title, text, url, files }) {
  if (!isNative) return false;
  const { Share } = await import('@capacitor/share');
  await Share.share({ title, text, url, files });
  return true;
}

/**
 * Hide the native splash screen.
 */
export async function hideSplash() {
  if (!isNative) return;
  const { SplashScreen } = await import('@capacitor/splash-screen');
  await SplashScreen.hide({ fadeOutDuration: 300 });
}
