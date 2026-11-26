/**
 * Parses personalized guest query parameters from URL:
 *   ?n=<guest name>
 *   ?e=<invited event codes: h (holud), w (wedding/biye), b (boubhat)>
 *   ?c=<max guest count 1..10>
 */
export function parseGuestParams() {
  if (typeof window === 'undefined') {
    return {
      isPersonalized: false,
      name: '',
      invitedIds: ['holud', 'biye', 'boubhat'],
      maxGuests: 10,
    };
  }

  const params = new URLSearchParams(window.location.search);
  const rawName = (params.get('n') || params.get('b') || '').trim().slice(0, 60);
  const rawEvents = (params.get('e') || '').toLowerCase();
  const rawCount = parseInt(params.get('c') || '', 10);

  const codeToId = {
    h: 'holud',
    w: 'biye',
    b: 'boubhat',
    r: 'boubhat', // alias from final/
  };

  const invitedSet = new Set();
  for (const ch of rawEvents) {
    if (codeToId[ch]) invitedSet.add(codeToId[ch]);
  }

  const invitedIds =
    invitedSet.size > 0 ? Array.from(invitedSet) : ['holud', 'biye', 'boubhat'];

  const maxGuests =
    Number.isInteger(rawCount) && rawCount >= 1 && rawCount <= 10 ? rawCount : 10;

  return {
    isPersonalized: Boolean(rawName),
    name: rawName,
    invitedIds,
    maxGuests,
  };
}
