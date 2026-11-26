import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from '../../config';
import { useInViewLoop } from '../../hooks/useInViewLoop';
import { PineTree } from '../svg/SkylineAndScenerySVG';
import { CngAutoRickshaw } from '../svg/VehiclesSVG';

gsap.registerPlugin(ScrollTrigger);

export function S03TwoFamilies() {
  const { ref: viewRef, inView } = useInViewLoop();
  const sectionRef = useRef(null);
  const groomSignRef = useRef(null);
  const brideSignRef = useRef(null);
  const cngRef = useRef(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      gsap.fromTo(
        '.s3-heading',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      );

      gsap.fromTo(
        groomSignRef.current,
        { x: -160, opacity: 0, rotate: -6 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.9,
          ease: 'back.out(1.6)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        }
      );

      gsap.fromTo(
        brideSignRef.current,
        { x: 160, opacity: 0, rotate: 6 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.9,
          delay: 0.14,
          ease: 'back.out(1.6)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        }
      );

      gsap.fromTo(
        cngRef.current,
        { x: 340, opacity: 0.95 },
        {
          x: -220,
          duration: 3.6,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={(node) => {
        viewRef.current = node;
        sectionRef.current = node;
      }}
      className={`scene-section overflow-hidden ${inView ? '' : 'is-paused'}`}
      aria-label="দুই ঘর, এক উৎসব"
    >
      <h2 className="s3-heading font-heading mb-6 rounded-full border border-[#D4AF37] bg-[#3A091B] px-5 py-1.5 text-lg font-bold text-[#FFF7EC] shadow-lg">
        দুই ঘর, এক উৎসব
      </h2>

      {/* Road-sign Pole + Pine Trees */}
      <div className="relative flex w-full max-w-[356px] flex-col items-center py-2">
        <PineTree height={88} color="#3A091B" className="anim-tree pointer-events-none absolute bottom-0 -left-3 opacity-80" />
        <PineTree height={88} color="#3A091B" className="anim-tree pointer-events-none absolute bottom-0 -right-3 opacity-80" />

        {/* Central Gold-Trimmed Pole */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 rounded-full border border-[#D4AF37]/60 bg-gradient-to-r from-[#260612] via-[#5C112C] to-[#260612]" />

        {/* Top MAROON & GOLD Arrow Sign — Groom */}
        <div
          ref={groomSignRef}
          className="relative z-10 mr-auto mb-5 w-[86%] rounded-xl rounded-r-3xl border-[2.5px] border-[#D4AF37] bg-gradient-to-r from-[#4F0E26] via-[#3A091B] to-[#260612] px-4 py-3 text-[#FFF7EC] shadow-xl"
          style={{
            clipPath: 'polygon(0 0, 91% 0, 100% 50%, 91% 100%, 0 100%)',
          }}
        >
          <span className="font-heading inline-block rounded border border-[#D4AF37]/60 bg-black/30 px-2.5 py-0.5 text-[11px] font-bold text-[#D4AF37]">
            বর পক্ষ
          </span>
          <h3 className="font-display mt-1 text-2xl text-[#FFF7EC]">
            {weddingConfig.groomName}
          </h3>
          <p className="font-body mt-0.5 pr-4 text-xs text-[#FFF7EC]/85">
            {weddingConfig.groomParents}
          </p>
          <p className="font-body text-[11px] text-[#E5C17B]">{weddingConfig.groomHometown}</p>
        </div>

        {/* Gold 'ও' Badge on the Pole */}
        <div className="relative z-20 -my-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#260612] font-serif-bn text-base font-bold text-[#D4AF37] shadow-md">
          ও
        </div>

        {/* Bottom ESPRESSO-MAROON & GOLD Arrow Sign — Bride (matching S1/S2 palette) */}
        <div
          ref={brideSignRef}
          className="relative z-10 ml-auto mt-3 w-[86%] rounded-xl rounded-l-3xl border-[2.5px] border-[#D4AF37] bg-gradient-to-l from-[#4F0E26] via-[#3A091B] to-[#260612] py-3 pr-4 pl-7 text-right text-[#FFF7EC] shadow-xl"
          style={{
            clipPath: 'polygon(9% 0, 100% 0, 100% 100%, 9% 100%, 0 50%)',
          }}
        >
          <span className="font-heading inline-block rounded border border-[#D4AF37]/60 bg-black/30 px-2.5 py-0.5 text-[11px] font-bold text-[#D4AF37]">
            কনে পক্ষ
          </span>
          <h3 className="font-display mt-1 text-2xl text-[#FFF7EC]">
            {weddingConfig.brideName}
          </h3>
          <p className="font-body mt-0.5 pl-2 text-xs text-[#FFF7EC]/85">
            {weddingConfig.brideParents}
          </p>
          <p className="font-body text-[11px] text-[#E5C17B]">{weddingConfig.brideHometown}</p>
        </div>

        {/* Passing CNG Auto-Rickshaw */}
        <div ref={cngRef} className="pointer-events-none mt-4 self-end opacity-90">
          <CngAutoRickshaw className="scale-90" />
        </div>
      </div>
    </section>
  );
}
