import React from 'react';
import { MorningHillsAndLake, PineTree } from '../svg/SkylineAndScenerySVG';

const STARS = [
  { left: '10%', top: '8%', size: 3, delay: '0.2s' },
  { left: '22%', top: '14%', size: 4, delay: '1.1s' },
  { left: '37%', top: '6%', size: 2.5, delay: '0.6s' },
  { left: '54%', top: '12%', size: 3.5, delay: '1.8s' },
  { left: '68%', top: '7%', size: 4, delay: '0.4s' },
  { left: '84%', top: '15%', size: 3, delay: '1.4s' },
  { left: '16%', top: '24%', size: 2.5, delay: '2.1s' },
  { left: '46%', top: '22%', size: 3.5, delay: '0.9s' },
  { left: '76%', top: '26%', size: 3, delay: '1.6s' },
  { left: '91%', top: '29%', size: 2.5, delay: '0.7s' },
];

export function SkyParallaxBackdrop({
  cloudsLayerRef,
  farHillsLayerRef,
  midTreesLayerRef,
  nightSkyLayerRef,
}) {
  return (
    <div
      className="pointer-events-none fixed inset-y-0 left-1/2 z-0 w-full max-w-[430px] -translate-x-1/2 overflow-hidden"
      aria-hidden="true"
    >
      {/* Night Stars Layer (0 -> 1 opacity as night falls) */}
      <div ref={nightSkyLayerRef} className="absolute inset-0" style={{ opacity: 0 }}>
        {STARS.map((s, idx) => (
          <span
            key={idx}
            className="anim-twinkle absolute rounded-full bg-[#FFF7C8]"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              boxShadow: '0 0 8px #F6C945',
              animation: `twinkleStar ${2.2 + (idx % 3) * 0.7}s ease-in-out infinite`,
              animationDelay: s.delay,
            }}
          />
        ))}
      </div>

      {/* Layer 1: Drifting Clouds (0.2x) */}
      <div ref={cloudsLayerRef} className="absolute inset-x-0 top-6 flex justify-between px-4">
        <svg width="96" height="40" viewBox="0 0 96 40" className="anim-cloud opacity-85">
          <path d="M16,32 Q6,32 6,23 Q6,14 16,14 Q21,4 36,6 Q48,4 54,14 Q68,14 70,24 Q70,32 58,32 Z" fill="#FFFFFF" />
        </svg>
        <svg
          width="84"
          height="36"
          viewBox="0 0 96 40"
          className="anim-cloud mt-8 opacity-75"
          style={{ animationDelay: '2.5s' }}
        >
          <path d="M16,32 Q6,32 6,23 Q6,14 16,14 Q21,4 36,6 Q48,4 54,14 Q68,14 70,24 Q70,32 58,32 Z" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Layer 2: Far Hills & Lake (0.4x) */}
      <div
        ref={farHillsLayerRef}
        className="absolute inset-x-0 bottom-[22dvh] w-[145%]"
      >
        <MorningHillsAndLake />
      </div>

      {/* Layer 3: Mid Pine Trees (0.7x) */}
      <div
        ref={midTreesLayerRef}
        className="absolute inset-x-0 bottom-[22dvh] flex w-[160%] items-end justify-between px-4"
      >
        <PineTree height={72} color="#1F5C3A" className="anim-tree" />
        <PineTree height={58} color="#286F47" className="anim-tree" />
        <PineTree height={78} color="#1F5C3A" className="anim-tree" />
        <PineTree height={64} color="#286F47" className="anim-tree" />
        <PineTree height={70} color="#1F5C3A" className="anim-tree" />
      </div>
    </div>
  );
}
