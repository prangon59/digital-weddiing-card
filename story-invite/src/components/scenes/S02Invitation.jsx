import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from '../../config';
import { useInViewLoop } from '../../hooks/useInViewLoop';
import { BuntingStrip, BismillahBanner, FloralCorner } from '../svg/RickshawArtMotifs';

gsap.registerPlugin(ScrollTrigger);

export function S02Invitation({ guest }) {
  const { ref: viewRef, inView } = useInViewLoop();
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      gsap.fromTo(
        cardRef.current,
        { y: -75, opacity: 0, rotate: -2 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.95,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 76%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.s2-line',
        { y: 16, opacity: 0, filter: 'blur(2px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
            once: true,
          },
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
      className={`scene-section ${inView ? '' : 'is-paused'}`}
      aria-label="সাদর নিমন্ত্রণ"
    >
      {/* Royal Scalloped Billboard Frame */}
      <div className="relative w-full max-w-[356px]">
        {/* Top Hanging Ropes */}
        <div className="mx-auto flex w-48 justify-between">
          <span className="h-5 w-1.5 rounded-full bg-[#6A3E20]" />
          <span className="h-5 w-1.5 rounded-full bg-[#6A3E20]" />
        </div>

        {/* Scalloped Royal Crimson-Maroon Formal Invitation Card (inspired by final/) */}
        <div
          ref={cardRef}
          className="relative z-10 overflow-hidden rounded-t-[110px] rounded-b-2xl border-[3px] border-[#E5A93B] bg-gradient-to-b from-[#4F0E26] via-[#3A091B] to-[#260612] text-[#FFF8EB] shadow-2xl"
          style={{
            boxShadow: '0 22px 44px rgba(38, 6, 18, 0.48), 0 0 24px rgba(229, 169, 59, 0.28)',
          }}
        >
          {/* Inner Dashed Gold Arch Border */}
          <div
            className="pointer-events-none absolute inset-2.5 rounded-t-[98px] rounded-b-xl border border-dashed border-[#E5A93B]/60"
            aria-hidden="true"
          />

          <div className="anim-bunting">
            <BuntingStrip height={18} />
          </div>

          <FloralCorner className="pointer-events-none absolute top-10 left-2 opacity-90" />
          <FloralCorner className="pointer-events-none absolute top-10 right-2 -scale-x-100 opacity-90" />

          <div className="relative z-10 px-5 pt-3 pb-5 text-center">
            <div className="s2-line">
              <BismillahBanner color="#FFBE0B" />
            </div>

            {/* Quranic Verse Box */}
            <div className="s2-line mt-1 rounded-xl border border-[#E5A93B]/45 bg-black/25 px-3 py-2.5">
              <p className="font-arabic text-sm leading-relaxed text-[#FFF8EB]">
                {weddingConfig.quranVerse.arabic}
              </p>
              <p className="font-body mt-1.5 text-[11px] leading-snug text-[#FFBE0B]">
                {weddingConfig.quranVerse.bn}
              </p>
            </div>

            <h2 className="s2-line font-heading mt-3 text-xs font-bold tracking-wide text-[#FFBE0B]">
              {guest?.isPersonalized ? `প্রিয় ${guest.name}, ` : ''}
              {weddingConfig.invitationLabel}
            </h2>

            <p className="s2-line font-body mt-1.5 text-[0.84rem] leading-relaxed text-[#FFF8EB]/90">
              {weddingConfig.invitationText}
            </p>

            {/* Couple Centerpiece */}
            <div className="s2-line my-3 border-y border-[#E5A93B]/40 py-2">
              <h3 className="font-display text-2xl text-[#FFBE0B]">
                {weddingConfig.groomName}
              </h3>
              <span className="my-0.5 block font-serif-bn text-xs text-[#E5A93B]">
                ❦ ও ❦
              </span>
              <h3 className="font-display text-2xl text-[#FFBE0B]">
                {weddingConfig.brideName}
              </h3>
            </div>

            {/* Two-Column Parents & Residence Grid */}
            <div className="s2-line grid grid-cols-2 gap-2 rounded-xl border border-[#E5A93B]/30 bg-black/20 p-2.5 text-center">
              <div className="border-r border-[#E5A93B]/25 pr-1.5">
                <span className="font-heading block text-[10px] font-bold text-[#FFBE0B]">
                  বরের অভিভাবকবৃন্দ
                </span>
                <p className="font-body mt-0.5 text-[11px] font-semibold leading-snug text-[#FFF8EB]">
                  {weddingConfig.groomParents}
                </p>
                <p className="font-body mt-0.5 text-[10px] leading-tight text-[#FFF8EB]/70">
                  {weddingConfig.groomHometown}
                </p>
              </div>

              <div className="pl-1.5">
                <span className="font-heading block text-[10px] font-bold text-[#FFBE0B]">
                  কনের অভিভাবকবৃন্দ
                </span>
                <p className="font-body mt-0.5 text-[11px] font-semibold leading-snug text-[#FFF8EB]">
                  {weddingConfig.brideParents}
                </p>
                <p className="font-body mt-0.5 text-[10px] leading-tight text-[#FFF8EB]/70">
                  {weddingConfig.brideHometown}
                </p>
              </div>
            </div>

            {/* Closing Signature */}
            <p className="s2-line font-heading mt-3 text-xs font-bold text-[#FFBE0B]">
              {weddingConfig.invitationClosing}
            </p>
            <p className="s2-line font-serif-bn text-xs italic text-[#FFF8EB]/85">
              {weddingConfig.invitationSignature}
            </p>
          </div>

          <div className="anim-bunting">
            <BuntingStrip height={16} flip />
          </div>
        </div>

        {/* Wooden X-Bracing Billboard Legs */}
        <svg
          width="100%"
          height="52"
          viewBox="0 0 320 52"
          className="pointer-events-none -mt-1"
          aria-hidden="true"
        >
          <rect x="44" y="0" width="12" height="52" fill="#6A3E20" />
          <rect x="264" y="0" width="12" height="52" fill="#6A3E20" />
          <line x1="54" y1="6" x2="266" y2="44" stroke="#8B5A2B" strokeWidth="7" strokeLinecap="round" />
          <line x1="266" y1="6" x2="54" y2="44" stroke="#8B5A2B" strokeWidth="7" strokeLinecap="round" />
          <circle cx="160" cy="25" r="5" fill="#E5A93B" />
        </svg>
      </div>
    </section>
  );
}
