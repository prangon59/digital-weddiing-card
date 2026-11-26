import React from 'react';

/**
 * Layered green hills, swaying pine trees & calm lake with tiny boat (Morning Backdrop)
 */
export function MorningHillsAndLake({ className = '' }) {
  return (
    <svg
      width="100%"
      viewBox="0 0 430 220"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      {/* Far soft hills */}
      <path
        d="M0,130 Q75,62 165,112 T330,96 T430,118 L430,220 L0,220 Z"
        fill="#8CC9A0"
        opacity="0.7"
      />
      {/* Mid green hills */}
      <path
        d="M0,152 Q110,98 220,145 T430,136 L430,220 L0,220 Z"
        fill="#4A9367"
        opacity="0.78"
      />
      {/* Calm blue-teal lake strip */}
      <path
        d="M0,176 Q140,164 280,178 T430,172 L430,220 L0,220 Z"
        fill="#2E8B8B"
        opacity="0.55"
      />
      {/* Tiny wooden boat on lake */}
      <g transform="translate(290, 173)">
        <path d="M0,4 L26,4 L21,10 L5,10 Z" fill="#8B1E2D" />
        <line x1="13" y1="4" x2="13" y2="-8" stroke="#FBF3E1" strokeWidth="1.5" />
        <polygon points="13,-8 22,1 13,1" fill="#F6C945" />
      </g>
    </svg>
  );
}

/**
 * Swaying Pine Tree SVG
 */
export function PineTree({ height = 96, color = '#1F5C3A', className = '' }) {
  return (
    <svg width={height * 0.56} height={height} viewBox="0 0 56 100" className={className} aria-hidden="true">
      <rect x="24" y="76" width="8" height="24" rx="2" fill="#5D3722" />
      <polygon points="28,6 48,40 8,40" fill={color} />
      <polygon points="28,26 51,60 5,60" fill="#174A2E" />
      <polygon points="28,44 54,80 2,80" fill={color} />
    </svg>
  );
}

/**
 * Dhaka Skyline Silhouette (Pink/Lavender for S08 Countdown)
 */
export function DhakaSkyline({ fill = '#EFA9BA', className = '' }) {
  return (
    <svg width="100%" viewBox="0 0 430 130" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path
        d="M0,130 L0,86 L28,86 L28,62 L46,62 L46,84 L64,84 L64,52 L82,42 L100,52 L100,88 L122,88 L122,40 L148,40 L148,74 L172,74 L172,56 Q198,20 224,56 L224,78 L244,78 L244,34 L262,34 L262,68 L284,68 L284,48 L302,48 L302,82 L322,82 L322,52 Q342,32 362,52 L362,76 L388,76 L388,44 L410,44 L410,84 L430,84 L430,130 Z"
        fill={fill}
      />
      {/* Tiny Dome Finial */}
      <line x1="198" y1="22" x2="198" y2="12" stroke={fill} strokeWidth="2" />
      <circle cx="198" cy="11" r="2.2" fill={fill} />
    </svg>
  );
}

/**
 * Purple Dusk/Night City Skyline with Mosque Dome & Bridge (for S10)
 */
export function NightCityAndMosque({ className = '' }) {
  return (
    <svg width="100%" viewBox="0 0 430 160" preserveAspectRatio="none" className={className} aria-hidden="true">
      {/* Purple buildings + Mosque Dome */}
      <path
        d="M0,160 L0,104 L30,104 L30,72 L56,72 L56,96 L82,96 L82,60 L92,42 L102,60 L102,96 L128,96 L128,80 Q162,36 196,80 L196,98 L216,98 L216,58 L224,42 L232,58 L232,96 L264,96 L264,66 L294,66 L294,102 L326,102 L326,74 L354,74 L354,96 L390,96 L390,64 L418,64 L418,100 L430,100 L430,160 Z"
        fill="#2C1D6B"
        opacity="0.9"
      />
      {/* Glowing Crescent on Mosque Dome */}
      <path d="M162,48 L162,36" stroke="#F6C945" strokeWidth="2" />
      <circle cx="162" cy="34" r="3.5" fill="#F6C945" />
      {/* Suspension Bridge Silhouette */}
      <path d="M240,136 Q335,88 430,136" fill="none" stroke="#14105E" strokeWidth="4" />
      <line x1="275" y1="114" x2="275" y2="138" stroke="#14105E" strokeWidth="2.5" />
      <line x1="335" y1="100" x2="335" y2="138" stroke="#14105E" strokeWidth="2.5" />
      <line x1="395" y1="114" x2="395" y2="138" stroke="#14105E" strokeWidth="2.5" />
      <rect x="236" y="136" width="194" height="6" fill="#14105E" />
    </svg>
  );
}

/**
 * Illustrated Groom (white sherwani + pagri) & Bride (red saree) side silhouettes for S11
 */
export function GroomSideSilhouette({ className = '' }) {
  return (
    <svg width="72" height="140" viewBox="0 0 72 140" className={className} aria-hidden="true">
      <circle cx="36" cy="24" r="12" fill="#E3AD82" />
      <path d="M23,20 Q36,3 49,20 Z" fill="#FBF3E1" stroke="#D9A93B" strokeWidth="1.6" />
      <circle cx="38" cy="11" r="3" fill="#C8202F" />
      <path d="M18,40 L54,40 L60,132 L12,132 Z" fill="#FBF3E1" stroke="#D9A93B" strokeWidth="1.8" />
      <path d="M24,40 L46,84" stroke="#8B1E2D" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function BrideSideSilhouette({ className = '' }) {
  return (
    <svg width="72" height="140" viewBox="0 0 72 140" className={className} aria-hidden="true">
      <path d="M20,24 Q36,4 52,24 L58,86 L14,86 Z" fill="#C8202F" opacity="0.9" />
      <circle cx="36" cy="24" r="11.5" fill="#E9B790" />
      <circle cx="36" cy="15" r="2.5" fill="#F6C945" />
      <path d="M20,40 L52,40 L62,132 L10,132 Z" fill="#8B1E2D" stroke="#F6C945" strokeWidth="1.8" />
      <path d="M24,42 Q36,56 48,42" fill="none" stroke="#F6C945" strokeWidth="3" />
    </svg>
  );
}

/**
 * Animated Bor & Bou holding hands and walking together under the night sky (for S10)
 */
export function WalkingCoupleIllustration({ className = '' }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        width="176"
        height="128"
        viewBox="0 0 176 128"
        className="overflow-visible drop-shadow-[0_8px_18px_rgba(255,190,11,0.35)]"
        aria-label="হাত ধরে হাঁটতে থাকা বর ও কনে"
      >
        {/* Soft Ground Glow */}
        <ellipse cx="88" cy="120" rx="64" ry="6" fill="rgba(255, 190, 11, 0.25)" />

        {/* Walking Couple Group with gentle stroll bob */}
        <g style={{ animation: 'coupleWalkBob 1.3s ease-in-out infinite' }}>
          {/* GROOM (Left) */}
          <g transform="translate(56, 12)">
            {/* Walking Legs */}
            <line
              x1="-6"
              y1="82"
              x2="-12"
              y2="106"
              stroke="#FFF8EB"
              strokeWidth="6"
              strokeLinecap="round"
              style={{ transformOrigin: '-6px 82px', animation: 'legSwingA 1.3s ease-in-out infinite' }}
            />
            <line
              x1="6"
              y1="82"
              x2="12"
              y2="106"
              stroke="#E6D7B9"
              strokeWidth="6"
              strokeLinecap="round"
              style={{ transformOrigin: '6px 82px', animation: 'legSwingB 1.3s ease-in-out infinite' }}
            />
            {/* White Sherwani */}
            <path d="M-14,32 L14,32 L18,84 L-18,84 Z" fill="#FFF8EB" stroke="#FFBE0B" strokeWidth="1.8" />
            {/* Maroon Dupatta / Stole */}
            <path d="M-10,32 L10,72" stroke="#9E1946" strokeWidth="4.5" strokeLinecap="round" />
            {/* Head & Pagri */}
            <circle cx="0" cy="18" r="10.5" fill="#E3AD82" />
            <path d="M-11,14 Q0,0 11,14 Z" fill="#FFF8EB" stroke="#FFBE0B" strokeWidth="1.6" />
            <circle cx="2" cy="7" r="2.8" fill="#E11D48" />
            {/* Groom's Right Arm reaching to Bride's hand */}
            <path d="M12,40 Q24,52 31,56" fill="none" stroke="#FFF8EB" strokeWidth="5" strokeLinecap="round" />
          </g>

          {/* BRIDE (Right) */}
          <g transform="translate(116, 15)">
            {/* Subtle Step Feet under Lehenga/Saree */}
            <ellipse
              cx="-6"
              cy="103"
              rx="5"
              ry="3"
              fill="#FFBE0B"
              style={{ animation: 'legSwingB 1.3s ease-in-out infinite' }}
            />
            <ellipse
              cx="6"
              cy="103"
              rx="5"
              ry="3"
              fill="#FFBE0B"
              style={{ animation: 'legSwingA 1.3s ease-in-out infinite' }}
            />
            {/* Bridal Veil / Ourna */}
            <path d="M-14,16 Q0,0 14,16 L20,66 L-18,66 Z" fill="#E11D48" opacity="0.9" />
            {/* Red & Gold Saree / Lehenga */}
            <path d="M-12,32 L12,32 L22,102 L-22,102 Z" fill="#9E1946" stroke="#FFBE0B" strokeWidth="1.8" />
            <path d="M-18,95 L18,95" stroke="#FFBE0B" strokeWidth="2.5" strokeDasharray="3 3" />
            {/* Head & Tikli */}
            <circle cx="0" cy="18" r="10" fill="#E9B790" />
            <circle cx="0" cy="10" r="2.3" fill="#FFBE0B" />
            {/* Bride's Left Arm reaching to Groom's hand */}
            <path d="M-11,40 Q-22,52 -29,53" fill="none" stroke="#E11D48" strokeWidth="4.5" strokeLinecap="round" />
          </g>

          {/* Joined Hands & Floating Heart */}
          <circle cx="87" cy="68" r="4" fill="#E9B790" stroke="#FFBE0B" strokeWidth="1.2" />
          <path
            d="M87,44 Q87,39 82,39 Q77,39 77,44 Q77,49 87,55 Q97,49 97,44 Q97,39 92,39 Q87,39 87,44 Z"
            fill="#FFBE0B"
            style={{ animation: 'heartFloat 1.8s ease-in-out infinite' }}
          />
        </g>
      </svg>

      <style>{`
        @keyframes coupleWalkBob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3.5px); }
        }
        @keyframes legSwingA {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
        @keyframes legSwingB {
          0%, 100% { transform: rotate(10deg); }
          50% { transform: rotate(-10deg); }
        }
        @keyframes heartFloat {
          0%, 100% { transform: translateY(0px) scale(0.95); opacity: 0.85; }
          50% { transform: translateY(-4px) scale(1.1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
