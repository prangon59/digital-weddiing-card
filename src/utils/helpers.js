/**
 * Wedding Site Utility Helpers
 */

/**
 * Converts Western digits (0-9) to Bengali digits (০-৯)
 * @param {number|string} input 
 * @returns {string}
 */
export function toBengaliNumerals(input) {
  if (input === null || input === undefined) return '';
  const str = String(input);
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

/**
 * Escape HTML to prevent injection
 * @param {string} str 
 * @returns {string}
 */
export function sanitizeString(str, maxLength = 60) {
  if (!str) return '';
  const trimmed = String(str).slice(0, maxLength);
  return trimmed
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Parse personalized guest query parameters from current URL
 * Supported params:
 *   n = guest/family name in English (max 60 chars)
 *   b = name in Bengali (max 60 chars, fallback to n)
 *   e = invited events as letters: h (holud), w (wedding), r (reception). e.g. e=hr
 *   c = max number of guests (1-20, default 1)
 */
export function parseGuestParams() {
  if (typeof window === 'undefined') {
    return {
      isPersonalized: false,
      nameEn: "Dear Guest",
      nameBn: "প্রিয় অতিথি",
      rawNameEn: "",
      rawNameBn: "",
      invitedEventLetters: ["h", "w", "r"],
      maxGuests: 1,
    };
  }

  // Support both search query (?...) and hash query (#...?... or ?...#/...)
  const url = new URL(window.location.href);
  let searchParams = url.searchParams;

  // If query params are in the hash (e.g. /#/invite-maker?... or /#/?n=...)
  if (window.location.hash.includes('?')) {
    const hashQuery = window.location.hash.split('?')[1];
    searchParams = new URLSearchParams(hashQuery);
  }

  const rawN = searchParams.get('n') || '';
  const rawB = searchParams.get('b') || '';
  const rawE = (searchParams.get('e') || '').toLowerCase();
  const rawC = parseInt(searchParams.get('c') || '1', 10);

  const cleanN = rawN.trim().slice(0, 60);
  const cleanB = rawB.trim().slice(0, 60);

  const isPersonalized = Boolean(cleanN || cleanB);

  // Default names
  const nameEn = cleanN || (cleanB ? cleanB : "Dear Guest");
  const nameBn = cleanB || (cleanN ? cleanN : "প্রিয় অতিথি");

  // Parse invited events letters
  const validLetters = ['h', 'w', 'r'];
  let invitedEventLetters = [];
  if (rawE) {
    for (const char of rawE) {
      if (validLetters.includes(char) && !invitedEventLetters.includes(char)) {
        invitedEventLetters.push(char);
      }
    }
  }

  // If e is empty or had no valid letters, show all three events
  if (invitedEventLetters.length === 0) {
    invitedEventLetters = ['h', 'w', 'r'];
  }

  // Max guests clamped between 1 and 20
  const maxGuests = Number.isInteger(rawC) && rawC >= 1 && rawC <= 20 ? rawC : 1;

  return {
    isPersonalized,
    nameEn,
    nameBn,
    rawNameEn: cleanN,
    rawNameBn: cleanB,
    invitedEventLetters,
    maxGuests,
  };
}

/**
 * Filter events based on invited letter codes
 */
export function filterInvitedEvents(allEvents, invitedLetters) {
  if (!invitedLetters || invitedLetters.length === 0) return allEvents;
  return allEvents.filter(event => invitedLetters.includes(event.letter));
}

/**
 * Generates an iCalendar (.ics) download for a given event
 */
export function generateIcsFile(event, coupleConfig) {
  const formatIcsDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const startTime = formatIcsDate(event.icsStartTime);
  const endTime = formatIcsDate(event.icsEndTime);
  const title = `${event.title.en} - ${coupleConfig.groom.shortName.en} & ${coupleConfig.bride.shortName.en}'s Wedding`;
  const description = `${event.title.bn} / ${event.title.en}\\n${event.subtitle.en}\\nCouple: ${coupleConfig.groom.name.en} & ${coupleConfig.bride.name.en}`;
  const location = event.isVenueTBA ? "Venue in Khulna, Bangladesh" : `${event.venueName.en}, ${event.venueAddress.en}`;

  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sakib and Easha Wedding//Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:sakib-easha-${event.id}-2026@wedding.invitation`,
    `DTSTAMP:${formatIcsDate(new Date().toISOString())}`,
    `DTSTART:${startTime}`,
    `DTEND:${endTime}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `Sakib-Easha-${event.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Low-end device check for smooth performance & battery saving
 */
export function isLowEndDevice() {
  if (typeof navigator === 'undefined') return false;
  const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  const lowRam = navigator.deviceMemory && navigator.deviceMemory <= 4;
  return Boolean(lowCores || lowRam);
}

/**
 * Check if prefers-reduced-motion is active
 */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
