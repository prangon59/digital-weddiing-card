const bnFormatter = new Intl.NumberFormat('bn-BD', {
  useGrouping: false,
});

const bnGroupedFormatter = new Intl.NumberFormat('bn-BD');

/**
 * Format any integer or numeric string into Bangla digits (০-৯).
 */
export function toBanglaNumber(value, { pad = 0, group = false } = {}) {
  const num = Number(value);
  if (!Number.isFinite(num)) return String(value ?? '');
  const formatted = group ? bnGroupedFormatter.format(num) : bnFormatter.format(num);
  if (pad > 0) {
    const zero = bnFormatter.format(0);
    return formatted.padStart(pad, zero);
  }
  return formatted;
}

/**
 * Replace Western digits inside a freeform string with Bangla digits.
 */
export function localizeDigits(text) {
  if (!text) return '';
  return String(text).replace(/[0-9]/g, (d) => bnFormatter.format(Number(d)));
}

/**
 * Compute remaining days/hours/minutes/seconds until target ISO date.
 */
export function getCountdownParts(targetISO) {
  const targetMs = new Date(targetISO).getTime();
  const nowMs = Date.now();
  const diff = targetMs - nowMs;

  if (!Number.isFinite(targetMs) || diff <= 0) {
    return {
      isPast: true,
      days: '০০',
      hours: '০০',
      minutes: '০০',
      seconds: '০০',
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    isPast: false,
    days: toBanglaNumber(days, { pad: 2 }),
    hours: toBanglaNumber(hours, { pad: 2 }),
    minutes: toBanglaNumber(minutes, { pad: 2 }),
    seconds: toBanglaNumber(seconds, { pad: 2 }),
  };
}
