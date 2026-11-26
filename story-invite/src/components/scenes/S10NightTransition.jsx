import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInViewLoop } from '../../hooks/useInViewLoop';
import { NightCityAndMosque, WalkingCoupleIllustration } from '../svg/SkylineAndScenerySVG';

gsap.registerPlugin(ScrollTrigger);

const FAIRY_BULBS = Array.from({ length: 11 }, (_, i) => i);
const FIREFLIES = [
  { left: '14%', top: '34%', delay: '0s' },
  { left: '30%', top: '52%', delay: '0.7s' },
  { left: '48%', top: '28%', delay: '1.3s' },
  { left: '66%', top: '46%', delay: '0.4s' },
  { left: '84%', top: '36%', delay: '1.8s' },
  { left: '22%', top: '68%', delay: '1.1s' },
  { left: '74%', top: '64%', delay: '0.9s' },
];

export function S10NightTransition() {
  const { ref: viewRef, inView } = useInViewLoop();
  const sectionRef = useRef(null);
  const moonRef = useRef(null);
  const captionRef = useRef(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      gsap.fromTo(
        moonRef.current,
        { y: 48, opacity: 0.3, scale: 0.85 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', once: true },
        }
      );

      gsap.fromTo(
        captionRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 64%', once: true },
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
      className={`scene-section relative overflow-hidden ${inView ? '' : 'is-paused'}`}
      aria-label="গোধূলি থেকে রাত"
    >
      {/* Sagging Fairy Light Strings */}
      <div className="pointer-events-none absolute top-8 inset-x-0">
        <svg width="100%" height="58" viewBox="0 0 430 58" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,12 Q108,48 215,16 Q322,48 430,12" fill="none" stroke="#F6C945" strokeWidth="1.6" opacity="0.7" />
        </svg>
        <div className="absolute top-2 inset-x-3 flex justify-between">
          {FAIRY_BULBS.map((b) => {
            const sag = Math.sin((b / 10) * Math.PI) * 18;
            return (
              <span
                key={b}
                className="anim-fairy inline-block h-3 w-3 rounded-full"
                style={{
                  transform: `translateY(${sag}px)`,
                  backgroundColor: b % 2 === 0 ? '#FFF3A8' : '#F6C945',
                  boxShadow: '0 0 12px #F6C945',
                  animation: `fairyPulse ${1.6 + (b % 3) * 0.45}s ease-in-out infinite`,
                  animationDelay: `${b * 0.16}s`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Glowing Crescent Moon */}
      <div ref={moonRef} className="mt-8 flex flex-col items-center">
        <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden="true">
          <circle cx="44" cy="44" r="36" fill="rgba(246,201,69,0.18)" />
          <path
            d="M52,18 A24,24 0 1,0 68,58 A19,19 0 1,1 52,18 Z"
            fill="#FFF3B0"
            stroke="#F6C945"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Floating Paper Lanterns */}
      <div className="pointer-events-none absolute top-24 left-7">
        <svg width="32" height="48" viewBox="0 0 32 48" className="anim-lantern" aria-hidden="true">
          <line x1="16" y1="0" x2="16" y2="10" stroke="#D9A93B" strokeWidth="1.5" />
          <rect x="6" y="10" width="20" height="28" rx="8" fill="#E8772E" stroke="#F6C945" strokeWidth="1.8" />
          <circle cx="16" cy="24" r="5" fill="#FFF3B0" opacity="0.85" />
        </svg>
      </div>
      <div className="pointer-events-none absolute top-32 right-8">
        <svg
          width="28"
          height="42"
          viewBox="0 0 32 48"
          className="anim-lantern"
          style={{ animationDelay: '1.1s' }}
          aria-hidden="true"
        >
          <line x1="16" y1="0" x2="16" y2="10" stroke="#D9A93B" strokeWidth="1.5" />
          <rect x="6" y="10" width="20" height="28" rx="8" fill="#C8202F" stroke="#F6C945" strokeWidth="1.8" />
          <circle cx="16" cy="24" r="5" fill="#FFF3B0" opacity="0.85" />
        </svg>
      </div>

      {/* Drifting Fireflies */}
      {FIREFLIES.map((f, i) => (
        <span
          key={i}
          className="anim-twinkle pointer-events-none absolute h-2 w-2 rounded-full bg-[#FFF7A8]"
          style={{
            left: f.left,
            top: f.top,
            boxShadow: '0 0 10px #F6C945',
            animation: `twinkleStar ${2.5 + (i % 3) * 0.6}s ease-in-out infinite`,
            animationDelay: f.delay,
          }}
        />
      ))}

      {/* Bor & Bou Holding Hands & Walking Animation above the phrase */}
      <div className="relative z-10 mt-3">
        <WalkingCoupleIllustration />
      </div>

      {/* Evening-to-Night Message */}
      <div
        ref={captionRef}
        className="relative z-10 mt-2 rounded-2xl border border-[#F6C945]/55 bg-[#14105E]/75 px-6 py-4 text-center text-[#FBF3E1] shadow-xl backdrop-blur-sm"
      >
        <p className="font-heading text-xs font-bold tracking-widest text-[#F6C945]">
          গোধূলি পেরিয়ে শুভরাত্রি
        </p>
        <p className="font-display mt-1 text-2xl text-[#FFF8EA]">
          তারার আলোয় সাজুক নতুন পথচলা
        </p>
      </div>

      {/* Purple City & Mosque Dome & Bridge Silhouette */}
      <div className="pointer-events-none -mx-[18px] mt-8 -mb-10 w-[calc(100%+36px)]">
        <NightCityAndMosque />
      </div>
    </section>
  );
}
