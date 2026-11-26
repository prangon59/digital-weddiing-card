import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { weddingConfig } from '../../config';
import { useInViewLoop } from '../../hooks/useInViewLoop';
import { PineTree } from '../svg/SkylineAndScenerySVG';

export function S01Names({ isGateOpen, hasScrolled }) {
  const { ref: viewRef, inView } = useInViewLoop();
  const containerRef = useRef(null);
  const crestRef = useRef(null);
  const groomRef = useRef(null);
  const brideRef = useRef(null);
  const shimmerRef = useRef(null);

  useEffect(() => {
    if (!isGateOpen) return undefined;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set([groomRef.current, brideRef.current], { clipPath: 'inset(0 0% 0 0)', opacity: 1 });
        return;
      }

      const tl = gsap.timeline({ delay: 0.12 });
      tl.fromTo(
        crestRef.current,
        { y: 28, scale: 0.94, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.75, ease: 'back.out(1.3)' }
      )
        .fromTo(
          '.s1-family-tag',
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          '-=0.35'
        )
        .fromTo(
          groomRef.current,
          { clipPath: 'inset(0 100% 0 0)', opacity: 0.25 },
          { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.85, ease: 'power3.out' },
          '-=0.2'
        )
        .fromTo(
          '.s1-amp',
          { scale: 0.4, opacity: 0, rotate: -20 },
          { scale: 1, opacity: 1, rotate: 0, duration: 0.5, ease: 'back.out(1.6)' },
          '-=0.35'
        )
        .fromTo(
          brideRef.current,
          { clipPath: 'inset(0 100% 0 0)', opacity: 0.25 },
          { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.85, ease: 'power3.out' },
          '-=0.25'
        )
        .fromTo(
          shimmerRef.current,
          { xPercent: -120, opacity: 0 },
          { xPercent: 180, opacity: 0.5, duration: 0.95, ease: 'power2.inOut' },
          '-=0.45'
        )
        .fromTo(
          '.s1-date-pill',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.4'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [isGateOpen]);

  return (
    <section
      ref={(node) => {
        viewRef.current = node;
        containerRef.current = node;
      }}
      className={`scene-section relative overflow-hidden pt-12 ${inView ? '' : 'is-paused'}`}
      aria-label="বর ও কনের পরিচয়"
    >
      {/* Subtle Framing Trees */}
      <div className="pointer-events-none absolute bottom-10 left-0 opacity-75">
        <PineTree height={82} color="#3A091B" className="anim-tree" />
      </div>
      <div className="pointer-events-none absolute bottom-10 right-0 opacity-75">
        <PineTree height={78} color="#3A091B" className="anim-tree" />
      </div>

      {/* Modern Luxury Maroon & Ivory-Gold Arched Monogram Card */}
      <div
        ref={crestRef}
        className="relative z-10 w-full max-w-[346px] overflow-hidden rounded-t-[130px] rounded-b-3xl border-[2.5px] border-[#D4AF37] bg-gradient-to-b from-[#4F0E26] via-[#3A091B] to-[#260612] px-5 pt-10 pb-6 text-center text-[#FFF7EC] shadow-2xl"
        style={{ boxShadow: '0 24px 48px rgba(38, 6, 18, 0.5), 0 0 30px rgba(212, 175, 55, 0.22)' }}
      >
        {/* Inner Gold Hairline Arch */}
        <div
          className="pointer-events-none absolute inset-2.5 rounded-t-[118px] rounded-b-[18px] border border-[#D4AF37]/45"
          aria-hidden="true"
        />

        {/* Minimalist Gold Top Ornament & Header */}
        <div className="s1-family-tag relative z-10 flex flex-col items-center">
          <span className="text-sm text-[#D4AF37]" aria-hidden="true">✦ ❦ ✦</span>
          <div className="mt-1 flex items-center justify-center gap-2.5">
            <span className="h-px w-8 bg-[#D4AF37]/60" />
            <span className="font-heading text-xs font-bold tracking-wider text-[#E5C17B]">
              দুই পরিবারের পক্ষ থেকে
            </span>
            <span className="h-px w-8 bg-[#D4AF37]/60" />
          </div>
        </div>

        {/* Couple Names */}
        <div className="relative z-10 mt-5 overflow-hidden py-1">
          <div
            ref={shimmerRef}
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#FFF7EC]/35 to-transparent"
            style={{ opacity: 0 }}
          />

          <h2
            ref={groomRef}
            className="font-display text-[2.15rem] leading-snug text-[#FFF7EC]"
          >
            {weddingConfig.groomName}
          </h2>

          {/* Refined Gold Monogram Divider */}
          <div className="my-2.5 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <div className="s1-amp flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37] bg-[#260612] font-serif-bn text-base font-bold text-[#D4AF37] shadow">
              ও
            </div>
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          <h2
            ref={brideRef}
            className="font-display text-[2.15rem] leading-snug text-[#FFF7EC]"
          >
            {weddingConfig.brideName}
          </h2>
        </div>

        {/* Frosted Gold-Bordered Date & Location Footer */}
        <div className="s1-date-pill relative z-10 mx-auto mt-5 inline-block rounded-full border border-[#D4AF37]/75 bg-black/30 px-5 py-2 backdrop-blur-sm">
          <p className="font-heading text-xs font-bold tracking-wide text-[#E5C17B]">
            {weddingConfig.weddingDateDisplay} • {weddingConfig.venueShortName}
          </p>
        </div>
      </div>

      {/* Scroll Hint Pill */}
      <div
        className={`relative z-10 mt-6 flex items-center gap-2 rounded-full border border-[#D4AF37] bg-[#3A091B] px-5 py-2 text-xs font-bold text-[#FFF7EC] shadow-lg transition-opacity duration-500 ${
          hasScrolled ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <span>স্ক্রল করে এগিয়ে চলুন</span>
        <span className="anim-bounce-cue inline-block text-[#D4AF37]" aria-hidden="true">
          ▼
        </span>
      </div>
    </section>
  );
}
