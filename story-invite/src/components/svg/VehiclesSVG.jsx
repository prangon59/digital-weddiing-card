import React from 'react';

/**
 * Vintage RED open-top wedding car with bride & groom inside,
 * separate rotating wheel groups, and optional night headlights.
 */
export function VintageRedCar({
  carBodyRef,
  frontWheelRef,
  rearWheelRef,
  headlightsRef,
}) {
  return (
    <svg
      width="212"
      height="108"
      viewBox="0 0 212 108"
      className="overflow-visible select-none"
      aria-label="বর ও কনে বহনকারী লাল ভিন্টেজ বিয়ের গাড়ি"
    >
      {/* Ground Shadow */}
      <ellipse cx="104" cy="98" rx="84" ry="8" fill="rgba(0,0,0,0.38)" />

      {/* Night Headlight Beams (animated opacity via scroll) */}
      <g ref={headlightsRef} style={{ opacity: 0 }}>
        <defs>
          <linearGradient id="headlightCone" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FFF5B8" stopOpacity="0.82" />
            <stop offset="65%" stopColor="#F6C945" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#F6C945" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points="186,66 320,38 320,96 186,74" fill="url(#headlightCone)" />
        <circle cx="187" cy="70" r="7" fill="#FFF9D6" opacity="0.9" />
      </g>

      {/* Main Car Body + Passengers (tilts & bounces with scroll velocity) */}
      <g ref={carBodyRef}>
        {/* Groom (back-left passenger) */}
        <g transform="translate(76, 18)">
          {/* White Sherwani Torso */}
          <path d="M-12,24 L14,24 L18,46 L-16,46 Z" fill="#FBF3E1" stroke="#D9A93B" strokeWidth="1.5" />
          {/* Maroon Stole */}
          <path d="M-8,24 L6,44" stroke="#8B1E2D" strokeWidth="4" strokeLinecap="round" />
          {/* Face */}
          <circle cx="1" cy="14" r="9.5" fill="#E3AD82" />
          {/* Pagri / Turban */}
          <path d="M-9,11 Q1,-2 11,11 Z" fill="#FBF3E1" stroke="#D9A93B" strokeWidth="1.6" />
          <circle cx="3" cy="5" r="2.6" fill="#C8202F" />
          {/* Smile */}
          <path d="M-2,17 Q1,19.5 5,17" fill="none" stroke="#5A2B24" strokeWidth="1.4" strokeLinecap="round" />
        </g>

        {/* Bride (front-right passenger) */}
        <g transform="translate(108, 20)">
          {/* Red Bridal Saree */}
          <path d="M-12,22 L12,22 L16,44 L-16,44 Z" fill="#8B1E2D" stroke="#F6C945" strokeWidth="1.5" />
          {/* Red Dupatta / Veil */}
          <path d="M-11,12 Q0,-2 11,12 L13,34 L-13,34 Z" fill="#C8202F" opacity="0.88" />
          {/* Face */}
          <circle cx="0" cy="14" r="9" fill="#E9B790" />
          {/* Tikli & Smile */}
          <circle cx="0" cy="7.5" r="2.2" fill="#F6C945" />
          <path d="M-3,17 Q0,19.5 3,17" fill="none" stroke="#6E1E28" strokeWidth="1.3" strokeLinecap="round" />
        </g>

        {/* Windshield Frame */}
        <path d="M128,50 L141,28 L145,28 L134,50 Z" fill="#D9A93B" />
        <polygon points="129,48 140,29 143,29 133,48" fill="#D8F3FF" opacity="0.65" />

        {/* Spare Trunk / Rear Luggage */}
        <rect x="16" y="54" width="16" height="22" rx="4" fill="#8B1E2D" stroke="#D9A93B" strokeWidth="1.5" />

        {/* Car Chassis Silhouette */}
        <path
          d="M24,62 Q28,46 46,46 L128,46 L142,48 Q180,48 186,62 L188,80 Q188,86 178,86 L28,86 Q20,86 20,76 Z"
          fill="#C8202F"
          stroke="#75101A"
          strokeWidth="2"
        />

        {/* Gold Side Trim & Door Line */}
        <path d="M30,66 L180,66" stroke="#F6C945" strokeWidth="2.5" />
        <path d="M74,48 L74,80 M124,48 L124,80" stroke="#8B1E2D" strokeWidth="1.8" />

        {/* Marigold Wedding Garland draped across car door */}
        <path d="M44,54 Q76,72 114,54" fill="none" stroke="#F6C945" strokeWidth="4.5" strokeLinecap="round" strokeDasharray="3 5" />
        <path d="M44,54 Q76,72 114,54" fill="none" stroke="#E8772E" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 7" />

        {/* Wheel Arches */}
        <path d="M32,86 A22,22 0 0,1 76,86 Z" fill="#590B13" />
        <path d="M132,86 A22,22 0 0,1 176,86 Z" fill="#590B13" />

        {/* Chrome Bumpers & Headlight Lamp */}
        <rect x="14" y="76" width="14" height="7" rx="3.5" fill="#FBF3E1" stroke="#D9A93B" strokeWidth="1.2" />
        <rect x="180" y="76" width="15" height="7" rx="3.5" fill="#FBF3E1" stroke="#D9A93B" strokeWidth="1.2" />
        <circle cx="185" cy="64" r="5" fill="#FFF2A6" stroke="#D9A93B" strokeWidth="1.6" />
        <circle cx="24" cy="65" r="3.5" fill="#FF5A36" />
      </g>

      {/* Rear Wheel (rotates independently) */}
      <g transform="translate(54, 85)">
        <g ref={rearWheelRef} style={{ transformOrigin: '0px 0px' }}>
          <circle cx="0" cy="0" r="17" fill="#1D1D22" />
          <circle cx="0" cy="0" r="11.5" fill="#FBF3E1" />
          <circle cx="0" cy="0" r="7.5" fill="#C8202F" stroke="#D9A93B" strokeWidth="1.5" />
          <line x1="-7" y1="0" x2="7" y2="0" stroke="#F6C945" strokeWidth="1.6" />
          <line x1="0" y1="-7" x2="0" y2="7" stroke="#F6C945" strokeWidth="1.6" />
          <circle cx="0" cy="0" r="3" fill="#F6C945" />
        </g>
      </g>

      {/* Front Wheel (rotates independently) */}
      <g transform="translate(154, 85)">
        <g ref={frontWheelRef} style={{ transformOrigin: '0px 0px' }}>
          <circle cx="0" cy="0" r="17" fill="#1D1D22" />
          <circle cx="0" cy="0" r="11.5" fill="#FBF3E1" />
          <circle cx="0" cy="0" r="7.5" fill="#C8202F" stroke="#D9A93B" strokeWidth="1.5" />
          <line x1="-7" y1="0" x2="7" y2="0" stroke="#F6C945" strokeWidth="1.6" />
          <line x1="0" y1="-7" x2="0" y2="7" stroke="#F6C945" strokeWidth="1.6" />
          <circle cx="0" cy="0" r="3" fill="#F6C945" />
        </g>
      </g>
    </svg>
  );
}

/**
 * Passing Bangladeshi Green CNG Auto-Rickshaw
 */
export function CngAutoRickshaw({ className = '' }) {
  return (
    <svg width="118" height="72" viewBox="0 0 118 72" className={className} aria-hidden="true">
      <ellipse cx="58" cy="66" rx="46" ry="5" fill="rgba(0,0,0,0.28)" />
      {/* Black Hood */}
      <path d="M22,30 Q26,12 52,12 L84,12 Q96,12 98,32 Z" fill="#1E2421" />
      {/* Green Body */}
      <path d="M16,32 L98,32 L104,54 L14,54 Z" fill="#1F5C3A" stroke="#0F3D2A" strokeWidth="2" />
      {/* Yellow stripe */}
      <rect x="16" y="42" width="86" height="4.5" fill="#F6C945" />
      {/* Windshield & Driver */}
      <polygon points="74,16 90,16 94,32 74,32" fill="#D4F0FF" opacity="0.8" />
      <rect x="28" y="18" width="38" height="14" rx="2" fill="#2A3A33" />
      {/* Headlight */}
      <circle cx="102" cy="41" r="4" fill="#FFF0A0" />
      {/* Wheels */}
      <circle cx="30" cy="56" r="10" fill="#19191E" stroke="#FBF3E1" strokeWidth="2.5" />
      <circle cx="30" cy="56" r="3.5" fill="#F6C945" />
      <circle cx="88" cy="56" r="10" fill="#19191E" stroke="#FBF3E1" strokeWidth="2.5" />
      <circle cx="88" cy="56" r="3.5" fill="#F6C945" />
    </svg>
  );
}

/**
 * Passing Colorful Dhaka Cycle Rickshaw
 */
export function CycleRickshaw({ className = '' }) {
  return (
    <svg width="106" height="70" viewBox="0 0 106 70" className={className} aria-hidden="true">
      <ellipse cx="52" cy="64" rx="42" ry="4.5" fill="rgba(0,0,0,0.25)" />
      {/* Colorful Hood */}
      <path d="M16,32 Q18,10 46,12 L52,32 Z" fill="#C8202F" stroke="#F6C945" strokeWidth="2" />
      <path d="M22,16 L46,16 L49,26 L20,26 Z" fill="#2B3FBF" />
      {/* Seat */}
      <path d="M16,32 L54,32 L50,48 L18,48 Z" fill="#F6C945" stroke="#8B1E2D" strokeWidth="1.6" />
      {/* Frame & Handlebar */}
      <path d="M50,48 L78,48 L70,28 L82,24" fill="none" stroke="#1F5C3A" strokeWidth="3" strokeLinecap="round" />
      {/* Driver Silhouette */}
      <circle cx="66" cy="20" r="5" fill="#6E4432" />
      <path d="M64,25 L58,38 L70,40" fill="none" stroke="#2E8B8B" strokeWidth="4" strokeLinecap="round" />
      {/* Spoked Wheels */}
      <circle cx="26" cy="51" r="12" fill="none" stroke="#19191E" strokeWidth="3" />
      <circle cx="26" cy="51" r="3" fill="#C8202F" />
      <circle cx="80" cy="51" r="12" fill="none" stroke="#19191E" strokeWidth="3" />
      <circle cx="80" cy="51" r="3" fill="#C8202F" />
    </svg>
  );
}

/**
 * Teal Bus with Hijab, Topi & Ghomta Passengers gently bobbing (for S07 Bou-bhat)
 */
export function TealWeddingBus({ className = '' }) {
  const windows = [
    { x: 24, type: 'hijab' },
    { x: 64, type: 'topi' },
    { x: 104, type: 'ghomta' },
    { x: 144, type: 'topi' },
  ];

  return (
    <svg width="248" height="110" viewBox="0 0 248 110" className={className} aria-label="অতিথিদের টিল রঙের বাস">
      <ellipse cx="124" cy="100" rx="108" ry="6.5" fill="rgba(0,0,0,0.25)" />
      {/* Roof Rack + Marigold Trim */}
      <rect x="28" y="10" width="168" height="7" rx="3.5" fill="#F6C945" stroke="#8B1E2D" strokeWidth="1.5" />
      {/* Bus Body */}
      <path
        d="M14,26 Q14,16 26,16 L204,16 Q226,16 232,42 L234,82 Q234,88 224,88 L16,88 Q10,88 10,80 Z"
        fill="#2E8B8B"
        stroke="#0F3D2A"
        strokeWidth="2.5"
      />
      {/* Cream & Yellow Decorative Stripe */}
      <rect x="12" y="54" width="220" height="8" fill="#FBF3E1" />
      <rect x="12" y="62" width="220" height="4" fill="#F6C945" />

      {/* Front Windshield */}
      <path d="M188,24 L216,24 L224,48 L188,48 Z" fill="#D5F3FF" stroke="#14105E" strokeWidth="1.5" />

      {/* Passenger Windows */}
      {windows.map((w, idx) => (
        <g key={w.x}>
          <rect x={w.x} y="24" width="32" height="24" rx="5" fill="#FFF3D6" stroke="#14105E" strokeWidth="1.8" />
          <g
            className="anim-lantern"
            style={{ animationDelay: `${idx * 0.4}s` }}
          >
            {w.type === 'hijab' && (
              <g transform={`translate(${w.x + 16}, 37)`}>
                <circle cx="0" cy="-1" r="7" fill="#C8202F" />
                <circle cx="0" cy="0" r="4.5" fill="#E9B790" />
                <path d="M-8,11 Q0,3 8,11 Z" fill="#8B1E2D" />
              </g>
            )}
            {w.type === 'topi' && (
              <g transform={`translate(${w.x + 16}, 37)`}>
                <circle cx="0" cy="0" r="5" fill="#E3AD82" />
                <path d="M-5,-3 Q0,-9 5,-3 Z" fill="#FBF3E1" stroke="#D9A93B" strokeWidth="1" />
                <path d="M-7,11 Q0,4 7,11 Z" fill="#1F5C3A" />
              </g>
            )}
            {w.type === 'ghomta' && (
              <g transform={`translate(${w.x + 16}, 37)`}>
                <path d="M-8,10 Q-7,-6 0,-6 Q7,-6 8,10 Z" fill="#E8772E" />
                <circle cx="0" cy="0" r="4.3" fill="#E9B790" />
                <circle cx="0" cy="-3.5" r="1.3" fill="#F6C945" />
              </g>
            )}
          </g>
        </g>
      ))}

      {/* Headlight */}
      <circle cx="229" cy="70" r="4.5" fill="#FFF0A0" />

      {/* Wheels */}
      <circle cx="56" cy="88" r="14" fill="#1C1C22" stroke="#FBF3E1" strokeWidth="2.5" />
      <circle cx="56" cy="88" r="5.5" fill="#F6C945" />
      <circle cx="186" cy="88" r="14" fill="#1C1C22" stroke="#FBF3E1" strokeWidth="2.5" />
      <circle cx="186" cy="88" r="5.5" fill="#F6C945" />
    </svg>
  );
}
