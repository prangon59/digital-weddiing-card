import React from 'react';
import { downloadEventIcs } from '../../utils/ics';
import { triggerHaptic } from '../../utils/haptics';

/**
 * Shared Map & Calendar road-sign buttons used across event and venue scenes.
 */
export function EventActionButtons({
  mapUrl,
  icsData,
  icsFilename = 'wedding-event.ics',
  pulse = false,
  variant = 'blue',
}) {
  const variantClass = variant === 'green' ? 'sign-btn--green' : '';

  return (
    <div className="mt-4 grid w-full grid-cols-2 gap-2.5">
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => triggerHaptic(10)}
        className={`sign-btn ${variantClass} ${pulse ? 'animate-pulse' : ''}`}
      >
        <span aria-hidden="true">📍</span>
        <span>ম্যাপে দেখুন</span>
      </a>

      <button
        type="button"
        onClick={() => {
          triggerHaptic(10);
          downloadEventIcs(icsData, icsFilename);
        }}
        className={`sign-btn ${variantClass}`}
      >
        <span aria-hidden="true">📅</span>
        <span>ক্যালেন্ডারে রাখুন</span>
      </button>
    </div>
  );
}
