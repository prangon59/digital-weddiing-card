import React from 'react';

/**
 * Rickshaw-art rotating lotus/fan wheel (used on Gate S0 and Finale S12)
 */
export function RickshawFanWheel({ size = 110, className = '' }) {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30);
  const colors = ['#C8202F', '#F6C945', '#2B3FBF', '#1F5C3A', '#E8772E', '#2E8B8B'];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="56" fill="#FBF3E1" stroke="#D9A93B" strokeWidth="4" />
      <circle cx="60" cy="60" r="50" fill="none" stroke="#8B1E2D" strokeWidth="2.5" strokeDasharray="5 4" />
      <g>
        {petals.map((deg, idx) => (
          <path
            key={deg}
            d="M60,60 L50,18 Q60,8 70,18 Z"
            fill={colors[idx % colors.length]}
            stroke="#FBF3E1"
            strokeWidth="1.5"
            transform={`rotate(${deg} 60 60)`}
          />
        ))}
      </g>
      <circle cx="60" cy="60" r="18" fill="#F6C945" stroke="#8B1E2D" strokeWidth="3" />
      <circle cx="60" cy="60" r="9" fill="#C8202F" stroke="#FBF3E1" strokeWidth="2" />
      <circle cx="60" cy="60" r="3.5" fill="#FBF3E1" />
    </svg>
  );
}

/**
 * Red, yellow, and green triangular rickshaw-art bunting border strip
 */
export function BuntingStrip({ width = 320, height = 22, flip = false, className = '' }) {
  const count = 16;
  const step = width / count;
  const colors = ['#C8202F', '#F6C945', '#1F5C3A', '#E8772E'];

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
    >
      <line x1="0" y1="2" x2={width} y2="2" stroke="#8B1E2D" strokeWidth="2.5" />
      {Array.from({ length: count }, (_, i) => {
        const x1 = i * step;
        const x2 = x1 + step;
        const xm = x1 + step / 2;
        return (
          <polygon
            key={i}
            points={`${x1},2 ${x2},2 ${xm},${height - 2}`}
            fill={colors[i % colors.length]}
            stroke="#FBF3E1"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}

/**
 * Ornate floral corner flourish for cards
 */
export function FloralCorner({ className = '' }) {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" className={className} aria-hidden="true">
      <path d="M4,32 Q4,8 28,4" fill="none" stroke="#D9A93B" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="11" cy="11" r="4.5" fill="#C8202F" />
      <circle cx="11" cy="11" r="2" fill="#F6C945" />
      <circle cx="20" cy="7" r="3" fill="#1F5C3A" />
      <circle cx="7" cy="20" r="3" fill="#E8772E" />
    </svg>
  );
}

/**
 * Bismillah Calligraphy Banner
 */
export function BismillahBanner({ color = '#D4AF37', className = '' }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg width="200" height="44" viewBox="0 0 220 48" aria-label="বিসমিল্লাহির রাহমানির রাহীম">
        <text
          x="110"
          y="28"
          textAnchor="middle"
          fill={color}
          style={{
            fontFamily: "'Amiri', serif",
            fontSize: '21px',
            fontWeight: 700,
          }}
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </text>
        <line x1="54" y1="40" x2="98" y2="40" stroke="#D4AF37" strokeWidth="1" opacity="0.65" />
        <polygon points="110,36 114,40 110,44 106,40" fill="#D4AF37" opacity="0.9" />
        <line x1="122" y1="40" x2="166" y2="40" stroke="#D4AF37" strokeWidth="1" opacity="0.65" />
      </svg>
    </div>
  );
}

/**
 * Bangladeshi Truck-Art Fan Arch with Peacock/Floral Motif (for S06 Biye & S12 Finale)
 */
export function TruckArtFanArch({ width = 300, className = '' }) {
  const rays = Array.from({ length: 15 }, (_, i) => -84 + i * 12);
  const colors = ['#C8202F', '#F6C945', '#2E8B8B', '#E8772E', '#2B3FBF', '#1F5C3A'];

  return (
    <svg
      width="100%"
      viewBox="0 0 300 105"
      className={className}
      style={{ maxWidth: width }}
      aria-hidden="true"
    >
      {/* Semi-circular fan backdrop */}
      <path d="M18,102 A132,96 0 0,1 282,102 Z" fill="#14105E" stroke="#F6C945" strokeWidth="4" />
      <path d="M30,102 A120,84 0 0,1 270,102 Z" fill="#FBF3E1" />

      {/* Fan petals */}
      <g clipPath="url(#archFanClip)">
        <defs>
          <clipPath id="archFanClip">
            <path d="M32,102 A118,82 0 0,1 268,102 Z" />
          </clipPath>
        </defs>
        {rays.map((angle, idx) => (
          <path
            key={angle}
            d="M150,102 L139,14 L161,14 Z"
            fill={colors[idx % colors.length]}
            opacity="0.92"
            transform={`rotate(${angle} 150 102)`}
          />
        ))}
      </g>

      {/* Center Lotus & Twin Bird/Peacock Silhouette */}
      <circle cx="150" cy="96" r="34" fill="#8B1E2D" stroke="#F6C945" strokeWidth="3.5" />
      <circle cx="150" cy="96" r="24" fill="#F6C945" />
      {/* Twin decorative peacocks facing center flower */}
      <path d="M116,96 Q104,76 118,68 Q128,66 130,78 Q126,88 134,96 Z" fill="#2E8B8B" stroke="#FBF3E1" strokeWidth="1.2" />
      <path d="M184,96 Q196,76 182,68 Q172,66 170,78 Q174,88 166,96 Z" fill="#2E8B8B" stroke="#FBF3E1" strokeWidth="1.2" />
      <circle cx="150" cy="84" r="9" fill="#C8202F" stroke="#FBF3E1" strokeWidth="1.5" />
      <circle cx="150" cy="84" r="4" fill="#F6C945" />
    </svg>
  );
}

/**
 * Rickshaw-Art Floral Arch Frame (for S11 Couple Photo)
 */
export function RickshawFloralArchFrame({ children }) {
  const dots = Array.from({ length: 19 }, (_, i) => i);
  return (
    <div className="relative mx-auto w-[78%] max-w-[300px]">
      {/* Outer Glow */}
      <div
        className="pointer-events-none absolute -inset-3 rounded-t-[160px] rounded-b-[28px]"
        style={{
          background: 'radial-gradient(circle at 50% 38%, rgba(246,201,69,0.42), rgba(217,169,59,0.12) 65%, transparent 78%)',
        }}
      />

      {/* Arch Card */}
      <div
        className="relative overflow-hidden rounded-t-[155px] rounded-b-[22px] border-[5px] border-[#D9A93B] bg-[#14105E] p-2 shadow-2xl"
        style={{ boxShadow: '0 18px 44px rgba(0,0,0,0.55), 0 0 28px rgba(246,201,69,0.35)' }}
      >
        {/* Rickshaw-art scalloped inner rim */}
        <div className="relative overflow-hidden rounded-t-[146px] rounded-b-[16px] border-[3px] border-[#C8202F] bg-[#2a0b12]">
          {children}
        </div>

        {/* Decorative Rickshaw-art beads along bottom */}
        <div className="mt-1.5 flex items-center justify-around px-2">
          {dots.map((d) => (
            <span
              key={d}
              className="inline-block h-2 w-2 rounded-full"
              style={{
                background: d % 3 === 0 ? '#F6C945' : d % 3 === 1 ? '#C8202F' : '#8CC9A0',
              }}
            />
          ))}
        </div>
      </div>

      {/* Hanging Top Floral Crown */}
      <svg
        width="136"
        height="42"
        viewBox="0 0 136 42"
        className="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <path d="M10,36 Q68,2 126,36" fill="none" stroke="#F6C945" strokeWidth="3" />
        <circle cx="68" cy="14" r="10" fill="#C8202F" stroke="#F6C945" strokeWidth="2.5" />
        <circle cx="68" cy="14" r="4" fill="#F6C945" />
        <circle cx="42" cy="20" r="6" fill="#2E8B8B" stroke="#FBF3E1" strokeWidth="1.5" />
        <circle cx="94" cy="20" r="6" fill="#2E8B8B" stroke="#FBF3E1" strokeWidth="1.5" />
        <circle cx="22" cy="29" r="4.5" fill="#E8772E" />
        <circle cx="114" cy="29" r="4.5" fill="#E8772E" />
      </svg>
    </div>
  );
}
