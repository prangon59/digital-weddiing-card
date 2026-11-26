import fs from 'fs';
import path from 'path';

// Helper to wrap SVG in data
function createSvg(width, height, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <radialGradient id="creamWash" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#FFFDF9" />
      <stop offset="60%" stop-color="#FFF6E5" />
      <stop offset="100%" stop-color="#FCEFD2" />
    </radialGradient>
    <radialGradient id="goldGradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FDE8B3" />
      <stop offset="45%" stop-color="#C9A24B" />
      <stop offset="100%" stop-color="#8F6B20" />
    </radialGradient>
    <radialGradient id="maroonWash" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#9E2B3B" />
      <stop offset="70%" stop-color="#7A1F2B" />
      <stop offset="100%" stop-color="#4B0F18" />
    </radialGradient>
  </defs>
  ${content}
</svg>`;
}

// 1. Child Groom
const childGroomSvg = createSvg(600, 600, `
  <rect width="600" height="600" rx="24" fill="url(#creamWash)" />
  <!-- Watercolor blotches -->
  <circle cx="200" cy="180" r="140" fill="#E3EBE3" opacity="0.6" filter="url(#softGlow)" />
  <circle cx="420" cy="380" r="130" fill="#FFF0BF" opacity="0.7" filter="url(#softGlow)" />
  <circle cx="300" cy="460" r="100" fill="#FCEFD2" opacity="0.8" />
  
  <!-- Decorative border alpona -->
  <circle cx="300" cy="300" r="240" fill="none" stroke="#C9A24B" stroke-width="2" stroke-dasharray="8 6" opacity="0.5" />
  <circle cx="300" cy="300" r="225" fill="none" stroke="#F4A300" stroke-width="1" opacity="0.4" />

  <!-- Kite in the background -->
  <g transform="translate(420, 120) rotate(25)" opacity="0.85">
    <polygon points="0,-40 30,0 0,40 -30,0" fill="#F4A300" />
    <polygon points="0,-40 30,0 0,0" fill="#7A1F2B" opacity="0.6" />
    <path d="M0,40 Q15,70 -10,100 Q15,120 0,140" fill="none" stroke="#7A1F2B" stroke-width="2" />
    <circle cx="5" cy="80" r="4" fill="#8FA98A" />
    <circle cx="-5" cy="110" r="4" fill="#C9A24B" />
  </g>

  <!-- Little Boy Illustration -->
  <g transform="translate(300, 310)">
    <!-- Shadow -->
    <ellipse cx="0" cy="150" rx="80" ry="16" fill="#8C7478" opacity="0.2" filter="url(#softGlow)" />
    
    <!-- Kurti body -->
    <path d="M-45,30 L-65,110 L65,110 L45,30 Z" fill="#8FA98A" opacity="0.9" />
    <path d="M-30,30 L0,80 L30,30 Z" fill="#FFF6E5" />
    <path d="M0,30 L0,105" stroke="#708C6B" stroke-width="2" stroke-dasharray="3 3" />
    
    <!-- Arms holding boat -->
    <path d="M-45,40 Q-50,80 -15,90" fill="none" stroke="#E5B287" stroke-width="12" stroke-linecap="round" />
    <path d="M45,40 Q50,80 15,90" fill="none" stroke="#E5B287" stroke-width="12" stroke-linecap="round" />

    <!-- Paper boat in hands -->
    <g transform="translate(0, 95) scale(0.7)">
      <polygon points="-40,15 40,15 25,35 -25,35" fill="#FFFDF9" stroke="#C9A24B" stroke-width="2" />
      <polygon points="0,-25 35,15 -35,15" fill="#FFF6E5" stroke="#F4A300" stroke-width="2" />
      <line x1="0" y1="-25" x2="0" y2="15" stroke="#C9A24B" stroke-width="2" />
    </g>

    <!-- Head & Hair -->
    <ellipse cx="0" cy="-30" rx="46" ry="50" fill="#E5B287" />
    <!-- Cheerful big eyes -->
    <circle cx="-16" cy="-28" r="5" fill="#382226" />
    <circle cx="16" cy="-28" r="5" fill="#382226" />
    <circle cx="-14" cy="-30" r="1.5" fill="#FFFFFF" />
    <circle cx="18" cy="-30" r="1.5" fill="#FFFFFF" />
    <!-- Cheeks blushing -->
    <ellipse cx="-26" cy="-18" rx="8" ry="5" fill="#E2A2AB" opacity="0.7" />
    <ellipse cx="26" cy="-18" rx="8" ry="5" fill="#E2A2AB" opacity="0.7" />
    <!-- Smile -->
    <path d="M-12,-12 Q0,-2 12,-12" fill="none" stroke="#7A1F2B" stroke-width="3" stroke-linecap="round" />

    <!-- Cute boy haircut -->
    <path d="M-48,-35 Q-30,-75 0,-72 Q35,-75 48,-35 Q35,-50 0,-48 Q-35,-50 -48,-35 Z" fill="#2C1810" />
    <path d="M-35,-45 Q-15,-60 10,-52 Q25,-60 38,-45" fill="none" stroke="#1A0D08" stroke-width="4" stroke-linecap="round" />
  </g>

  <!-- Story Label / Marigold florals -->
  <g transform="translate(300, 520)">
    <rect x="-140" y="-22" width="280" height="44" rx="22" fill="#FFFDF9" stroke="#C9A24B" stroke-width="1.5" />
    <text x="0" y="5" font-family="'Noto Serif Bengali', serif" font-size="16" fill="#7A1F2B" font-weight="bold" text-anchor="middle">ছোট্ট সাকিব • Little Sakib</text>
  </g>
`);

// 2. Child Bride
const childBrideSvg = createSvg(600, 600, `
  <rect width="600" height="600" rx="24" fill="url(#creamWash)" />
  <!-- Watercolor blotches -->
  <circle cx="380" cy="180" r="140" fill="#F2D3D7" opacity="0.6" filter="url(#softGlow)" />
  <circle cx="180" cy="380" r="130" fill="#FFF0BF" opacity="0.7" filter="url(#softGlow)" />
  <circle cx="300" cy="460" r="100" fill="#FCEFD2" opacity="0.8" />

  <!-- Decorative border alpona -->
  <circle cx="300" cy="300" r="240" fill="none" stroke="#C9A24B" stroke-width="2" stroke-dasharray="8 6" opacity="0.5" />
  <circle cx="300" cy="300" r="225" fill="none" stroke="#7A1F2B" stroke-width="1" opacity="0.4" />

  <!-- Butterflies and petals -->
  <g transform="translate(160, 140) rotate(-20)" opacity="0.85">
    <ellipse cx="-8" cy="-5" rx="14" ry="10" fill="#F4A300" />
    <ellipse cx="8" cy="-5" rx="14" ry="10" fill="#F4A300" />
    <ellipse cx="-5" cy="8" rx="10" ry="7" fill="#C9A24B" />
    <ellipse cx="5" cy="8" rx="10" ry="7" fill="#C9A24B" />
    <line x1="0" y1="-12" x2="0" y2="14" stroke="#7A1F2B" stroke-width="2" />
  </g>

  <!-- Little Girl Illustration -->
  <g transform="translate(300, 310)">
    <!-- Shadow -->
    <ellipse cx="0" cy="150" rx="80" ry="16" fill="#8C7478" opacity="0.2" filter="url(#softGlow)" />

    <!-- Cute Frock / Dress -->
    <path d="M-30,30 L-70,120 Q0,135 70,120 L30,30 Z" fill="#F4A300" opacity="0.9" />
    <!-- Polka dots -->
    <circle cx="-25" cy="80" r="4" fill="#FFFDF9" />
    <circle cx="0" cy="70" r="4" fill="#FFFDF9" />
    <circle cx="25" cy="85" r="4" fill="#FFFDF9" />
    <circle cx="-10" cy="105" r="4" fill="#FFFDF9" />
    <circle cx="20" cy="110" r="4" fill="#FFFDF9" />

    <!-- Arms holding flowers -->
    <path d="M-30,35 Q-45,70 -10,85" fill="none" stroke="#E5B287" stroke-width="11" stroke-linecap="round" />
    <path d="M30,35 Q45,70 10,85" fill="none" stroke="#E5B287" stroke-width="11" stroke-linecap="round" />

    <!-- Flowers in hands -->
    <g transform="translate(0, 85)">
      <circle cx="-10" cy="-5" r="10" fill="#7A1F2B" />
      <circle cx="8" cy="-8" r="9" fill="#F4A300" />
      <circle cx="0" cy="2" r="8" fill="#FFFDF9" />
      <circle cx="0" cy="2" r="3" fill="#C9A24B" />
      <path d="M0,5 L0,25" stroke="#708C6B" stroke-width="3" />
    </g>

    <!-- Head & Hair -->
    <ellipse cx="0" cy="-30" rx="44" ry="48" fill="#E5B287" />
    <!-- Cheerful big eyes -->
    <circle cx="-15" cy="-28" r="5" fill="#382226" />
    <circle cx="15" cy="-28" r="5" fill="#382226" />
    <circle cx="-13" cy="-30" r="1.5" fill="#FFFFFF" />
    <circle cx="17" cy="-30" r="1.5" fill="#FFFFFF" />
    <!-- Blushing cheeks -->
    <ellipse cx="-24" cy="-18" rx="8" ry="5" fill="#E2A2AB" opacity="0.75" />
    <ellipse cx="24" cy="-18" rx="8" ry="5" fill="#E2A2AB" opacity="0.75" />
    <!-- Sweet smile -->
    <path d="M-12,-12 Q0,-1 12,-12" fill="none" stroke="#7A1F2B" stroke-width="3" stroke-linecap="round" />

    <!-- Cute twin ponytails / braids with ribbons -->
    <path d="M-45,-30 Q-28,-72 0,-70 Q28,-72 45,-30 Q30,-48 0,-45 Q-30,-48 -45,-30 Z" fill="#2C1810" />
    <!-- Left pigtail -->
    <path d="M-40,-35 Q-65,-25 -70,5 Q-60,0 -42,-15" fill="#2C1810" />
    <circle cx="-50" cy="-20" r="6" fill="#7A1F2B" />
    <!-- Right pigtail -->
    <path d="M40,-35 Q65,-25 70,5 Q60,0 42,-15" fill="#2C1810" />
    <circle cx="50" cy="-20" r="6" fill="#7A1F2B" />
    <!-- Flower in hair -->
    <circle cx="-25" cy="-55" r="7" fill="#F4A300" />
    <circle cx="-25" cy="-55" r="2.5" fill="#7A1F2B" />
  </g>

  <!-- Story Label -->
  <g transform="translate(300, 520)">
    <rect x="-140" y="-22" width="280" height="44" rx="22" fill="#FFFDF9" stroke="#C9A24B" stroke-width="1.5" />
    <text x="0" y="5" font-family="'Noto Serif Bengali', serif" font-size="16" fill="#7A1F2B" font-weight="bold" text-anchor="middle">ছোট্ট ভাবনা • Little Bhabna</text>
  </g>
`);

// 3. Adult Groom
const adultGroomSvg = createSvg(600, 600, `
  <rect width="600" height="600" rx="24" fill="url(#creamWash)" />
  <circle cx="300" cy="220" r="170" fill="#E3EBE3" opacity="0.5" filter="url(#softGlow)" />
  <circle cx="450" cy="400" r="120" fill="#FFF0BF" opacity="0.6" filter="url(#softGlow)" />

  <!-- Traditional Islamic Arch & Alpona Background -->
  <path d="M120,550 L120,280 Q300,80 480,280 L480,550" fill="none" stroke="#C9A24B" stroke-width="2" stroke-dasharray="6 4" opacity="0.6" />
  <path d="M140,550 L140,290 Q300,110 460,290 L460,550" fill="none" stroke="#F4A300" stroke-width="1" opacity="0.4" />

  <!-- Groom Portrait -->
  <g transform="translate(300, 310)">
    <!-- Shadow -->
    <ellipse cx="0" cy="210" rx="100" ry="20" fill="#8C7478" opacity="0.2" filter="url(#softGlow)" />

    <!-- Royal Panjabi / Sherwani with Gold Embellishments -->
    <path d="M-60,40 L-100,220 L100,220 L60,40 Z" fill="#FFFDF9" stroke="#C9A24B" stroke-width="2" />
    <!-- Golden collar and placket -->
    <path d="M-22,35 L0,55 L22,35" fill="none" stroke="#C9A24B" stroke-width="4" />
    <line x1="0" y1="55" x2="0" y2="220" stroke="#C9A24B" stroke-width="3" stroke-dasharray="8 4" />
    <!-- Emerald / Ruby brooch -->
    <circle cx="0" cy="85" r="7" fill="#7A1F2B" stroke="#C9A24B" stroke-width="2" />

    <!-- Silk Uttoriyo / Stole over shoulder -->
    <path d="M-60,50 Q-80,130 -50,220" fill="none" stroke="#7A1F2B" stroke-width="16" opacity="0.9" />
    <path d="M-60,50 Q-80,130 -50,220" fill="none" stroke="#C9A24B" stroke-width="2" stroke-dasharray="4 4" />

    <!-- Head & Face -->
    <ellipse cx="0" cy="-35" rx="50" ry="58" fill="#E5B287" />
    <!-- Styled hair -->
    <path d="M-52,-45 Q-30,-95 10,-90 Q45,-85 52,-45 Q35,-65 0,-60 Q-35,-65 -52,-45 Z" fill="#1C100C" />
    <!-- Neat groomed beard / jawline -->
    <path d="M-42,-25 Q-48,15 0,25 Q48,15 42,-25" fill="none" stroke="#1C100C" stroke-width="5" stroke-linecap="round" opacity="0.85" />

    <!-- Eyes & Brows -->
    <path d="M-30,-48 Q-18,-54 -6,-48" fill="none" stroke="#1C100C" stroke-width="3" stroke-linecap="round" />
    <path d="M6,-48 Q18,-54 30,-48" fill="none" stroke="#1C100C" stroke-width="3" stroke-linecap="round" />
    <ellipse cx="-18" cy="-38" rx="6" ry="4" fill="#382226" />
    <ellipse cx="18" cy="-38" rx="6" ry="4" fill="#382226" />
    <circle cx="-16" cy="-39" r="1.5" fill="#FFFFFF" />
    <circle cx="20" cy="-39" r="1.5" fill="#FFFFFF" />

    <!-- Gentle confident smile -->
    <path d="M-14,-12 Q0,-4 14,-12" fill="none" stroke="#7A1F2B" stroke-width="3" stroke-linecap="round" />
  </g>

  <!-- Name Plaque -->
  <g transform="translate(300, 540)">
    <rect x="-160" y="-22" width="320" height="44" rx="22" fill="#FFFDF9" stroke="#C9A24B" stroke-width="1.5" />
    <text x="0" y="5" font-family="'Noto Serif Bengali', serif" font-size="16" fill="#7A1F2B" font-weight="bold" text-anchor="middle">সাকিব হাসান প্রাঙ্গন • Sakib</text>
  </g>
`);

// 4. Adult Bride
const adultBrideSvg = createSvg(600, 600, `
  <rect width="600" height="600" rx="24" fill="url(#creamWash)" />
  <circle cx="300" cy="220" r="170" fill="#F2D3D7" opacity="0.6" filter="url(#softGlow)" />
  <circle cx="150" cy="400" r="120" fill="#FFF0BF" opacity="0.6" filter="url(#softGlow)" />

  <!-- Traditional Arch & Garland -->
  <path d="M120,550 L120,280 Q300,80 480,280 L480,550" fill="none" stroke="#C9A24B" stroke-width="2" stroke-dasharray="6 4" opacity="0.6" />
  <path d="M140,550 L140,290 Q300,110 460,290 L460,550" fill="none" stroke="#7A1F2B" stroke-width="1" opacity="0.4" />

  <!-- Bride Portrait -->
  <g transform="translate(300, 310)">
    <!-- Shadow -->
    <ellipse cx="0" cy="210" rx="100" ry="20" fill="#8C7478" opacity="0.2" filter="url(#softGlow)" />

    <!-- Red Bridal Saree with Gold Zari -->
    <path d="M-60,45 L-110,220 L110,220 L60,45 Z" fill="#7A1F2B" />
    <!-- Gold Zari Border on Aanchal -->
    <path d="M-60,45 Q0,110 80,220" fill="none" stroke="#C9A24B" stroke-width="12" />
    <path d="M-60,45 Q0,110 80,220" fill="none" stroke="#F4A300" stroke-width="3" stroke-dasharray="4 4" />
    
    <!-- Elaborate Bridal Gold Necklace (Saat Noli Haar) -->
    <path d="M-28,40 Q0,85 28,40" fill="none" stroke="#C9A24B" stroke-width="5" />
    <path d="M-35,42 Q0,100 35,42" fill="none" stroke="#C9A24B" stroke-width="3" />
    <circle cx="0" cy="90" r="6" fill="#7A1F2B" stroke="#C9A24B" stroke-width="2" />

    <!-- Head & Bridal Ornaments -->
    <ellipse cx="0" cy="-35" rx="48" ry="54" fill="#E5B287" />
    <!-- Bridal Hair Updo & Veil (Ourna) -->
    <path d="M-60,-45 Q0,-115 60,-45 Q80,40 60,110 L-60,110 Q-80,40 -60,-45 Z" fill="#A43444" opacity="0.75" />
    <path d="M-55,-40 Q0,-90 55,-40" fill="none" stroke="#C9A24B" stroke-width="4" stroke-dasharray="6 3" />

    <!-- Tikli (Maang Tikka) & Forehead Chandan/Kundan -->
    <circle cx="0" cy="-70" r="4" fill="#C9A24B" />
    <line x1="0" y1="-70" x2="0" y2="-52" stroke="#C9A24B" stroke-width="2" />
    <circle cx="0" cy="-52" r="6" fill="#7A1F2B" stroke="#C9A24B" stroke-width="1.5" />
    <!-- Bindi -->
    <circle cx="0" cy="-42" r="3.5" fill="#7A1F2B" />
    <circle cx="0" cy="-42" r="1.5" fill="#C9A24B" />

    <!-- Jhumka Earrings -->
    <g transform="translate(-46, -20)">
      <circle cx="0" cy="0" r="3" fill="#C9A24B" />
      <path d="M-5,4 L5,4 L3,12 L-3,12 Z" fill="#C9A24B" />
      <circle cx="0" cy="14" r="2" fill="#7A1F2B" />
    </g>
    <g transform="translate(46, -20)">
      <circle cx="0" cy="0" r="3" fill="#C9A24B" />
      <path d="M-5,4 L5,4 L3,12 L-3,12 Z" fill="#C9A24B" />
      <circle cx="0" cy="14" r="2" fill="#7A1F2B" />
    </g>

    <!-- Eyes with Kajal & Winged Liner -->
    <path d="M-30,-38 Q-16,-46 -4,-38" fill="none" stroke="#1C100C" stroke-width="3.5" stroke-linecap="round" />
    <path d="M4,-38 Q16,-46 30,-38" fill="none" stroke="#1C100C" stroke-width="3.5" stroke-linecap="round" />
    <ellipse cx="-17" cy="-34" rx="6" ry="4" fill="#382226" />
    <ellipse cx="17" cy="-34" rx="6" ry="4" fill="#382226" />
    <circle cx="-15" cy="-35" r="1.5" fill="#FFFFFF" />
    <circle cx="19" cy="-35" r="1.5" fill="#FFFFFF" />

    <!-- Cheeks & Soft Bridal Smile -->
    <ellipse cx="-25" cy="-22" rx="9" ry="5" fill="#E2A2AB" opacity="0.8" />
    <ellipse cx="25" cy="-22" rx="9" ry="5" fill="#E2A2AB" opacity="0.8" />
    <!-- Ruby lips -->
    <path d="M-13,-12 Q0,-5 13,-12" fill="none" stroke="#7A1F2B" stroke-width="3.5" stroke-linecap="round" />
  </g>

  <!-- Name Plaque -->
  <g transform="translate(300, 540)">
    <rect x="-160" y="-22" width="320" height="44" rx="22" fill="#FFFDF9" stroke="#C9A24B" stroke-width="1.5" />
    <text x="0" y="5" font-family="'Noto Serif Bengali', serif" font-size="16" fill="#7A1F2B" font-weight="bold" text-anchor="middle">এশা মাহমুদ ভাবনা • Bhabna</text>
  </g>
`);

// 5. Couple Together
const coupleTogetherSvg = createSvg(800, 600, `
  <rect width="800" height="600" rx="28" fill="url(#creamWash)" />
  <!-- Floral & Marigold Arch -->
  <circle cx="400" cy="240" r="230" fill="#FFF0BF" opacity="0.4" filter="url(#softGlow)" />
  <circle cx="280" cy="300" r="180" fill="#E3EBE3" opacity="0.5" filter="url(#softGlow)" />
  <circle cx="520" cy="300" r="180" fill="#F2D3D7" opacity="0.5" filter="url(#softGlow)" />

  <!-- Grand Floral Arch -->
  <path d="M120,550 L120,260 Q400,20 680,260 L680,550" fill="none" stroke="#C9A24B" stroke-width="3" />
  <path d="M140,550 L140,270 Q400,50 660,270 L660,550" fill="none" stroke="#F4A300" stroke-width="1.5" stroke-dasharray="8 6" />

  <!-- Hanging garlands & floating petals -->
  <g opacity="0.85">
    <circle cx="240" cy="130" r="9" fill="#F4A300" />
    <circle cx="240" cy="150" r="7" fill="#FFFDF9" />
    <circle cx="240" cy="168" r="8" fill="#7A1F2B" />
    
    <circle cx="400" cy="70" r="11" fill="#7A1F2B" />
    <circle cx="400" cy="94" r="8" fill="#F4A300" />
    <circle cx="400" cy="115" r="9" fill="#FFFDF9" />

    <circle cx="560" cy="130" r="9" fill="#F4A300" />
    <circle cx="560" cy="150" r="7" fill="#FFFDF9" />
    <circle cx="560" cy="168" r="8" fill="#7A1F2B" />
  </g>

  <!-- Couple Standing Harmoniously Together -->
  <!-- Groom (Left side, warm & loving) -->
  <g transform="translate(330, 320)">
    <!-- Sherwani body -->
    <path d="M-50,30 L-85,200 L40,200 L20,30 Z" fill="#FFFDF9" stroke="#C9A24B" stroke-width="2" />
    <path d="M-15,30 L-15,200" stroke="#C9A24B" stroke-width="2.5" stroke-dasharray="6 4" />
    <path d="M-50,40 Q-70,110 -35,200" fill="none" stroke="#7A1F2B" stroke-width="12" />

    <!-- Head & Hair -->
    <ellipse cx="-15" cy="-35" rx="42" ry="48" fill="#E5B287" />
    <path d="M-55,-40 Q-30,-85 5,-80 Q32,-75 25,-40 Q15,-60 -15,-55 Q-40,-58 -55,-40 Z" fill="#1C100C" />
    <!-- Beard -->
    <path d="M-48,-20 Q-50,15 -15,20 Q15,15 10,-20" fill="none" stroke="#1C100C" stroke-width="4" opacity="0.8" />
    <!-- Groom eye looking gently toward bride -->
    <ellipse cx="-4" cy="-35" rx="5" ry="3.5" fill="#382226" />
    <circle cx="-3" cy="-36" r="1.2" fill="#FFFFFF" />
    <path d="M-22,-12 Q-10,-5 2,-12" fill="none" stroke="#7A1F2B" stroke-width="2.5" stroke-linecap="round" />
  </g>

  <!-- Bride (Right side, glowing in bridal red) -->
  <g transform="translate(470, 325)">
    <!-- Red Bridal Saree with Gold Embellishments -->
    <path d="M-30,30 L-50,200 L85,200 L45,30 Z" fill="#7A1F2B" />
    <path d="M-30,30 Q10,100 65,200" fill="none" stroke="#C9A24B" stroke-width="10" />
    <!-- Necklace -->
    <path d="M-15,35 Q10,75 35,35" fill="none" stroke="#C9A24B" stroke-width="4" />

    <!-- Head & Veil -->
    <ellipse cx="10" cy="-35" rx="40" ry="46" fill="#E5B287" />
    <!-- Veil (Ourna) -->
    <path d="M-40,-45 Q15,-100 65,-45 Q80,25 65,100 L-40,100 Z" fill="#A43444" opacity="0.8" />
    <path d="M-35,-40 Q15,-80 60,-40" fill="none" stroke="#C9A24B" stroke-width="3" stroke-dasharray="5 3" />
    
    <!-- Tikli & Bindi -->
    <circle cx="10" cy="-50" r="4.5" fill="#7A1F2B" stroke="#C9A24B" stroke-width="1.5" />
    <circle cx="10" cy="-40" r="2.5" fill="#7A1F2B" />
    <!-- Jhumka -->
    <circle cx="48" cy="-20" r="3" fill="#C9A24B" />

    <!-- Bride eye looking lovingly toward groom -->
    <ellipse cx="-2" cy="-34" rx="5" ry="3.5" fill="#382226" />
    <circle cx="-1" cy="-35" r="1.2" fill="#FFFFFF" />
    <!-- Soft sweet smile -->
    <path d="M-2,-12 Q10,-5 22,-12" fill="none" stroke="#7A1F2B" stroke-width="2.5" stroke-linecap="round" />
  </g>

  <!-- Floating Hearts & Petals -->
  <g opacity="0.9">
    <path d="M400,210 Q400,195 385,195 Q370,195 370,210 Q370,225 400,245 Q430,225 430,210 Q430,195 415,195 Q400,195 400,210 Z" fill="#7A1F2B" />
    <circle cx="340" cy="180" r="5" fill="#F4A300" opacity="0.8" />
    <circle cx="460" cy="170" r="4" fill="#C9A24B" opacity="0.8" />
  </g>

  <!-- Bottom Couple Title Plaque -->
  <g transform="translate(400, 545)">
    <rect x="-240" y="-24" width="480" height="48" rx="24" fill="#FFFDF9" stroke="#C9A24B" stroke-width="2" />
    <text x="0" y="7" font-family="'Noto Serif Bengali', serif" font-size="18" fill="#7A1F2B" font-weight="bold" text-anchor="middle">সাকিব ও ভাবনা • Sakib &amp; Easha</text>
  </g>
`);

// 6. Card Cover
const cardCoverSvg = createSvg(600, 800, `
  <rect width="600" height="800" rx="24" fill="url(#creamWash)" stroke="#C9A24B" stroke-width="3" />
  
  <!-- Subtle handmade paper texture lines -->
  <rect x="25" y="25" width="550" height="750" rx="16" fill="none" stroke="#C9A24B" stroke-width="1.5" stroke-dasharray="10 6" opacity="0.7" />
  <rect x="35" y="35" width="530" height="730" rx="12" fill="none" stroke="#7A1F2B" stroke-width="1" opacity="0.4" />

  <!-- Corner Alpona motifs -->
  <!-- Top Left -->
  <g transform="translate(45, 45)" stroke="#C9A24B" stroke-width="2" fill="none">
    <path d="M0,40 Q0,0 40,0" />
    <path d="M0,60 Q0,0 60,0" />
    <circle cx="20" cy="20" r="4" fill="#F4A300" />
  </g>
  <!-- Top Right -->
  <g transform="translate(555, 45) scale(-1, 1)" stroke="#C9A24B" stroke-width="2" fill="none">
    <path d="M0,40 Q0,0 40,0" />
    <path d="M0,60 Q0,0 60,0" />
    <circle cx="20" cy="20" r="4" fill="#F4A300" />
  </g>
  <!-- Bottom Left -->
  <g transform="translate(45, 755) scale(1, -1)" stroke="#C9A24B" stroke-width="2" fill="none">
    <path d="M0,40 Q0,0 40,0" />
    <path d="M0,60 Q0,0 60,0" />
    <circle cx="20" cy="20" r="4" fill="#F4A300" />
  </g>
  <!-- Bottom Right -->
  <g transform="translate(555, 755) scale(-1, -1)" stroke="#C9A24B" stroke-width="2" fill="none">
    <path d="M0,40 Q0,0 40,0" />
    <path d="M0,60 Q0,0 60,0" />
    <circle cx="20" cy="20" r="4" fill="#F4A300" />
  </g>

  <!-- Central Mandala / Alpona Medallion -->
  <g transform="translate(300, 340)">
    <circle cx="0" cy="0" r="140" fill="url(#goldGradient)" opacity="0.12" filter="url(#softGlow)" />
    <circle cx="0" cy="0" r="120" fill="#FFFDF9" stroke="#C9A24B" stroke-width="2" />
    <circle cx="0" cy="0" r="110" fill="none" stroke="#F4A300" stroke-width="1.5" stroke-dasharray="5 5" />
    <circle cx="0" cy="0" r="95" fill="none" stroke="#7A1F2B" stroke-width="1" opacity="0.6" />

    <!-- Wax / Ribbon Seal Effect -->
    <circle cx="0" cy="0" r="80" fill="url(#maroonWash)" stroke="#C9A24B" stroke-width="3" filter="url(#softGlow)" />
    
    <!-- Monogram Initials S & E -->
    <text x="0" y="-12" font-family="'Cormorant Garamond', Georgia, serif" font-size="34" fill="#FFF6E5" font-weight="bold" text-anchor="middle" letter-spacing="4">S &amp; E</text>
    <text x="0" y="18" font-family="'Noto Serif Bengali', serif" font-size="14" fill="#FDE8B3" text-anchor="middle">শুভ বিবাহ</text>
    <text x="0" y="38" font-family="'Cormorant Garamond', serif" font-size="12" fill="#E7D09C" text-anchor="middle" letter-spacing="2">DECEMBER 2026</text>
  </g>

  <!-- Bismillah Arabic at Top -->
  <text x="300" y="145" font-family="'Amiri', serif" font-size="28" fill="#7A1F2B" text-anchor="middle" font-weight="bold">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</text>

  <!-- Title & Couple names below -->
  <text x="300" y="550" font-family="'Cormorant Garamond', Georgia, serif" font-size="28" fill="#7A1F2B" text-anchor="middle" font-weight="600" letter-spacing="2">Sakib &amp; Easha</text>
  <text x="300" y="585" font-family="'Noto Serif Bengali', serif" font-size="20" fill="#382226" text-anchor="middle">সাকিব হাসান প্রাঙ্গন ও এশা মাহমুদ ভাবনা</text>
  <text x="300" y="625" font-family="'Hind Siliguri', sans-serif" font-size="15" fill="#8C7478" text-anchor="middle">বিবাহের প্রীতি আমন্ত্রণপত্র</text>

  <!-- Decorative separator line -->
  <g transform="translate(300, 650)">
    <line x1="-120" y1="0" x2="120" y2="0" stroke="#C9A24B" stroke-width="1" />
    <polygon points="0,-6 6,0 0,6 -6,0" fill="#7A1F2B" />
  </g>

  <text x="300" y="710" font-family="'Hind Siliguri', sans-serif" font-size="13" fill="#A88231" text-anchor="middle" letter-spacing="1">DHAKA • BANGLADESH</text>
`);

// Write files to public/images
const imagesDir = path.join(process.cwd(), 'public', 'images');
fs.writeFileSync(path.join(imagesDir, 'child-groom.svg'), childGroomSvg);
fs.writeFileSync(path.join(imagesDir, 'child-bride.svg'), childBrideSvg);
fs.writeFileSync(path.join(imagesDir, 'adult-groom.svg'), adultGroomSvg);
fs.writeFileSync(path.join(imagesDir, 'adult-bride.svg'), adultBrideSvg);
fs.writeFileSync(path.join(imagesDir, 'couple-together.svg'), coupleTogetherSvg);
fs.writeFileSync(path.join(imagesDir, 'card-cover.svg'), cardCoverSvg);

console.log('SVG placeholder images created successfully.');

// Next: Create an actual gentle synthesized looping audio file for /public/audio/bg.mp3 (WAV format container with valid headers, perfectly supported by all browsers and audio players)
const audioDir = path.join(process.cwd(), 'public', 'audio');

function generateWeddingMelodyWav() {
  const sampleRate = 22050;
  const durationSec = 16; // 16 second soothing loop
  const totalSamples = sampleRate * durationSec;
  const numChannels = 1;
  const bytesPerSample = 2; // 16-bit
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = totalSamples * blockAlign;

  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // 'fmt ' chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // subchunk1size (16 for PCM)
  buffer.writeUInt16LE(1, 20); // audio format (1 = PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // bits per sample

  // 'data' chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Raag Yaman / Bhupali Pentatonic Frequencies (gentle sitar/flute tones)
  // C4, D4, E4, G4, A4, C5, D5, E5
  const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
  
  // Melody sequence (note index, beat length in seconds)
  const pattern = [
    { note: 0, dur: 2.0 },
    { note: 2, dur: 2.0 },
    { note: 3, dur: 2.0 },
    { note: 4, dur: 2.0 },
    { note: 5, dur: 2.0 },
    { note: 4, dur: 2.0 },
    { note: 3, dur: 2.0 },
    { note: 2, dur: 2.0 },
  ];

  let sampleOffset = 0;
  for (let s = 0; s < totalSamples; s++) {
    const t = s / sampleRate;
    const beatIndex = Math.floor(t / 2.0) % pattern.length;
    const current = pattern[beatIndex];
    const freq = notes[current.note];
    const beatTime = t % 2.0;

    // Soft harp/flute envelope (gentle attack, soft decay)
    const attack = Math.min(1, beatTime / 0.1);
    const decay = Math.exp(-beatTime * 1.5);
    const tremolo = 1 + 0.1 * Math.sin(2 * Math.PI * 4.5 * t);
    
    // Fundamental + gentle harmonics
    const sampleVal = (
      0.65 * Math.sin(2 * Math.PI * freq * t) +
      0.25 * Math.sin(2 * Math.PI * (freq * 2) * t) +
      0.10 * Math.sin(2 * Math.PI * (freq * 3) * t)
    ) * attack * decay * tremolo * 0.4;

    const int16Val = Math.max(-32768, Math.min(32767, Math.floor(sampleVal * 32767)));
    buffer.writeInt16LE(int16Val, 44 + s * 2);
  }

  return buffer;
}

const wavBuffer = generateWeddingMelodyWav();
fs.writeFileSync(path.join(audioDir, 'bg.mp3'), wavBuffer);
fs.writeFileSync(path.join(audioDir, 'bg.wav'), wavBuffer);

console.log('Background melody audio files created at /public/audio/bg.mp3 and /public/audio/bg.wav.');
