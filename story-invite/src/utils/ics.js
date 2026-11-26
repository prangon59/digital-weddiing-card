function toIcsTimestamp(iso) {
  return new Date(iso).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function escapeIcsText(value) {
  return String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

/**
 * Generate and download a valid .ics calendar file for an event.
 */
export function downloadEventIcs(icsData, filename = 'wedding-event.ics') {
  if (!icsData) return;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sakib Easha Wedding//Bangla Story Invite//BN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${filename}-${Date.now()}@wedding.sakib-easha`,
    `DTSTAMP:${toIcsTimestamp(new Date().toISOString())}`,
    `DTSTART:${toIcsTimestamp(icsData.startISO)}`,
    `DTEND:${toIcsTimestamp(icsData.endISO)}`,
    `SUMMARY:${escapeIcsText(icsData.title)}`,
    `DESCRIPTION:${escapeIcsText(icsData.description)}`,
    `LOCATION:${escapeIcsText(icsData.location)}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
