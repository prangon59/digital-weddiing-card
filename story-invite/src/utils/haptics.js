/**
 * Safe subtle haptic feedback on mobile devices.
 */
export function triggerHaptic(duration = 10) {
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate(duration);
    }
  } catch {
    // Ignore unsupported platforms
  }
}
