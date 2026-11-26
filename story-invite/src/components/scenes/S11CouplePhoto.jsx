import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from '../../config';
import { useInViewLoop } from '../../hooks/useInViewLoop';
import { RickshawFloralArchFrame } from '../svg/RickshawArtMotifs';
import { GroomSideSilhouette, BrideSideSilhouette } from '../svg/SkylineAndScenerySVG';

gsap.registerPlugin(ScrollTrigger);

export function S11CouplePhoto() {
  const { ref: viewRef, inView } = useInViewLoop();
  const [imgError, setImgError] = useState(false);
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const photoRef = useRef(null);
  const sweepRef = useRef(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      gsap.fromTo(
        frameRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', once: true },
        }
      );

      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { scale: 1.3 },
          {
            scale: 1.16,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      gsap.fromTo(
        sweepRef.current,
        { xPercent: -130, opacity: 0 },
        {
          xPercent: 180,
          opacity: 0.65,
          duration: 1.25,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 62%', once: true },
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
      className={`scene-section scene-section--tall relative overflow-hidden ${inView ? '' : 'is-paused'}`}
      aria-label="বর ও কনের যুগল মুহূর্ত"
    >
      {/* Side Lanterns */}
      <div className="pointer-events-none absolute top-14 left-3">
        <svg width="30" height="46" viewBox="0 0 32 48" className="anim-lantern" aria-hidden="true">
          <line x1="16" y1="0" x2="16" y2="10" stroke="#F6C945" strokeWidth="1.5" />
          <rect x="6" y="10" width="20" height="28" rx="8" fill="#F6C945" stroke="#8B1E2D" strokeWidth="1.8" />
          <circle cx="16" cy="24" r="5" fill="#FFFDF5" />
        </svg>
      </div>
      <div className="pointer-events-none absolute top-14 right-3">
        <svg
          width="30"
          height="46"
          viewBox="0 0 32 48"
          className="anim-lantern"
          style={{ animationDelay: '1.2s' }}
          aria-hidden="true"
        >
          <line x1="16" y1="0" x2="16" y2="10" stroke="#F6C945" strokeWidth="1.5" />
          <rect x="6" y="10" width="20" height="28" rx="8" fill="#F6C945" stroke="#8B1E2D" strokeWidth="1.8" />
          <circle cx="16" cy="24" r="5" fill="#FFFDF5" />
        </svg>
      </div>

      {/* Decor Side Silhouettes */}
      <div className="pointer-events-none absolute bottom-16 -left-1 opacity-80">
        <GroomSideSilhouette />
      </div>
      <div className="pointer-events-none absolute bottom-16 -right-1 opacity-80">
        <BrideSideSilhouette />
      </div>

      {/* Rickshaw-Art Arch Frame around Couple Photo */}
      <div ref={frameRef} className="relative z-10 flex w-full flex-col items-center">
        <RickshawFloralArchFrame>
          <div className="relative aspect-square w-full overflow-hidden">
            {!imgError ? (
              <img
                ref={photoRef}
                src={weddingConfig.couplePhoto}
                alt={`${weddingConfig.groomName} ও ${weddingConfig.brideName}`}
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
                style={{ objectPosition: 'center 60%', transformOrigin: '50% 56%' }}
                loading="eager"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-[#4B101D] to-[#14105E] p-4 text-center text-[#FBF3E1]">
                <div className="flex items-end justify-center gap-2">
                  <GroomSideSilhouette className="scale-90" />
                  <BrideSideSilhouette className="scale-90" />
                </div>
                <p className="font-heading mt-3 text-xs font-bold text-[#F6C945]">
                  যুগল ছবি যুক্ত করুন: public/assets/couple.jpg
                </p>
              </div>
            )}

            {/* One-shot Light Sweep */}
            <div
              ref={sweepRef}
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/55 to-transparent"
              style={{ opacity: 0 }}
            />
          </div>
        </RickshawFloralArchFrame>

        {/* Maroon & Ivory-Gold Calligraphy Names Plate */}
        <div className="mt-5 rounded-2xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#4F0E26] to-[#260612] px-6 py-3 text-center shadow-xl">
          <h2 className="font-display text-3xl text-[#FFF7EC]">
            {weddingConfig.groomShortName}
            <span className="mx-2 text-2xl text-[#D4AF37]">ও</span>
            {weddingConfig.brideShortName}
          </h2>
          <p className="font-body mt-0.5 text-xs font-semibold text-[#E5C17B]">
            সারা জীবনের ভালোবাসার অঙ্গীকার
          </p>
        </div>
      </div>
    </section>
  );
}
