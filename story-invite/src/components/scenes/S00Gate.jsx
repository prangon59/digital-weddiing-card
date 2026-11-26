import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { weddingConfig } from '../../config';
import { triggerHaptic } from '../../utils/haptics';
import {
  RickshawFanWheel,
  BismillahBanner,
} from '../svg/RickshawArtMotifs';

export function S00Gate({ isOpen, onOpen, guest }) {
  const [isOpening, setIsOpening] = useState(false);
  const overlayRef = useRef(null);
  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);
  const cardRef = useRef(null);
  const roadRef = useRef(null);

  if (isOpen) return null;

  const handleOpenTap = () => {
    if (isOpening) return;
    setIsOpening(true);
    triggerHaptic(10);

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      onOpen();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => onOpen(),
    });

    tl.to(cardRef.current, {
      y: -240,
      scale: 0.88,
      opacity: 0,
      duration: 0.65,
      ease: 'power2.in',
    })
      .to(
        leftDoorRef.current,
        {
          rotateY: -96,
          duration: 0.9,
          ease: 'power3.inOut',
        },
        '-=0.35'
      )
      .to(
        rightDoorRef.current,
        {
          rotateY: 96,
          duration: 0.9,
          ease: 'power3.inOut',
        },
        '<'
      )
      .to(
        roadRef.current,
        {
          scale: 1.45,
          y: 40,
          duration: 0.85,
          ease: 'power2.in',
        },
        '<'
      )
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.35,
          ease: 'power1.out',
        },
        '-=0.25'
      );
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-y-0 left-1/2 z-40 flex w-full max-w-[430px] -translate-x-1/2 flex-col justify-between overflow-hidden bg-gradient-to-b from-[#2B0613] via-[#4A0D23] to-[#1A040C] px-4 pt-safe pb-6"
      style={{ perspective: '1100px' }}
    >
      {/* Ambient Radial Gold Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, rgba(212, 175, 55, 0.16), transparent 62%)',
        }}
        aria-hidden="true"
      />

      {/* Top Royal Gate Arch Beam */}
      <div className="relative flex flex-col items-center pt-2">
        <div className="anim-fan-spin z-20 drop-shadow-[0_6px_16px_rgba(212,175,55,0.35)]">
          <RickshawFanWheel size={86} />
        </div>
        <div className="relative z-10 -mt-4 flex h-5 w-[98%] items-center justify-between rounded-full border border-[#D4AF37] bg-gradient-to-r from-[#3A091B] via-[#5C112C] to-[#3A091B] px-4 shadow-lg">
          <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
          <span className="h-2 w-2 rounded-full bg-[#FFF7EC]/80" />
          <span className="h-2 w-2 rounded-full bg-[#FFF7EC]/80" />
          <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
        </div>
      </div>

      {/* 3D Royal Carved Gate Doors Frame */}
      <div
        className="relative my-2 flex flex-1 items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Left Carved Door */}
        <div
          ref={leftDoorRef}
          className="pointer-events-none absolute inset-y-2 left-0 flex w-1/2 origin-left items-center justify-end overflow-hidden rounded-l-xl border-y-2 border-l-[6px] border-[#D4AF37] bg-gradient-to-br from-[#520E27] via-[#3A091B] to-[#20040F] pr-2"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: 'inset -10px 0 24px rgba(0,0,0,0.45)',
          }}
        >
          <div className="h-[84%] w-[82%] rounded-l-2xl border border-dashed border-[#D4AF37]/50 bg-black/15" />
          <span className="absolute right-2.5 h-3.5 w-3.5 rounded-full border border-[#FFF7EC] bg-[#D4AF37] shadow" />
        </div>

        {/* Right Carved Door */}
        <div
          ref={rightDoorRef}
          className="pointer-events-none absolute inset-y-2 right-0 flex w-1/2 origin-right items-center justify-start overflow-hidden rounded-r-xl border-y-2 border-r-[6px] border-[#D4AF37] bg-gradient-to-bl from-[#520E27] via-[#3A091B] to-[#20040F] pl-2"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: 'inset 10px 0 24px rgba(0,0,0,0.45)',
          }}
        >
          <div className="h-[84%] w-[82%] rounded-r-2xl border border-dashed border-[#D4AF37]/50 bg-black/15" />
          <span className="absolute left-2.5 h-3.5 w-3.5 rounded-full border border-[#FFF7EC] bg-[#D4AF37] shadow" />
        </div>

        {/* Hanging Swinging Maroon & Ivory-Gold Arch Card */}
        <div ref={cardRef} className="anim-pendulum relative z-20 w-[86%] max-w-[332px]">
          <div className="mx-auto flex w-44 justify-between">
            <span className="h-6 w-1 rounded-full bg-gradient-to-b from-[#D4AF37] to-[#4F0E26]" />
            <span className="h-6 w-1 rounded-full bg-gradient-to-b from-[#D4AF37] to-[#4F0E26]" />
          </div>

          <div
            className="relative overflow-hidden rounded-t-[120px] rounded-b-3xl border-[2.5px] border-[#D4AF37] bg-gradient-to-b from-[#541029] via-[#3A091B] to-[#230510] text-[#FFF7EC] shadow-2xl"
            style={{
              boxShadow: '0 24px 48px rgba(0, 0, 0, 0.58), 0 0 32px rgba(212, 175, 55, 0.28)',
            }}
          >
            {/* Clean solid gold hairline inner arch */}
            <div
              className="pointer-events-none absolute inset-2.5 rounded-t-[110px] rounded-b-2xl border border-[#D4AF37]/45"
              aria-hidden="true"
            />

            {/* Soft top radial gold glow */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-32"
              style={{
                background: 'radial-gradient(circle at 50% 20%, rgba(212, 175, 55, 0.18), transparent 72%)',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 px-5 pt-7 pb-6 text-center">
              <BismillahBanner color="#E5C17B" className="mb-2" />

              {guest?.isPersonalized && (
                <p className="font-heading mb-2 text-xs font-bold text-[#FFF7EC]/90">
                  সম্মানিত অতিথি: <span className="text-[#D4AF37]">{guest.name}</span>
                </p>
              )}

              {/* Standout Focal Banner: বিয়ের নিমন্ত্রণ */}
              <div className="my-1.5 inline-flex items-center gap-2 rounded-full border border-[#FFF7EC]/70 bg-gradient-to-r from-[#C89B42] via-[#E5C17B] to-[#C89B42] px-6 py-1.5 shadow-[0_0_22px_rgba(212,175,55,0.45)]">
                <span className="text-xs text-[#260612]" aria-hidden="true">✦</span>
                <span className="font-heading text-base font-extrabold tracking-wide text-[#260612]">
                  বিয়ের নিমন্ত্রণ
                </span>
                <span className="text-xs text-[#260612]" aria-hidden="true">✦</span>
              </div>

              <h1 className="font-display mt-3 text-[2.05rem] leading-tight text-[#FFF7EC]">
                {weddingConfig.groomShortName}
                <span className="mx-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37] bg-[#260612] font-serif-bn text-base text-[#D4AF37] align-middle">
                  ও
                </span>
                {weddingConfig.brideShortName}
              </h1>

              <p className="font-body mt-1 text-xs font-medium text-[#E5C17B]">
                {weddingConfig.groomName} ও {weddingConfig.brideName}
              </p>

              <div className="mx-auto my-3 flex w-3/4 items-center gap-2">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/70" />
                <span className="text-[10px] text-[#D4AF37]">❦</span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/70" />
              </div>

              <div className="inline-block rounded-full border border-[#D4AF37]/65 bg-black/30 px-4 py-1.5">
                <p className="font-heading text-xs font-bold text-[#FFF7EC]">
                  {weddingConfig.weddingDateDisplay} • {weddingConfig.venueShortName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Royal Gold-Trimmed Pathway + High-Contrast Ivory-Gold Open CTA */}
      <div className="relative flex flex-col items-center">
        <div ref={roadRef} className="pointer-events-none -mb-3 w-full overflow-hidden">
          <svg width="100%" height="76" viewBox="0 0 360 76" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="royalPath" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6B1230" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8C1D42" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            <polygon points="150,0 210,0 326,76 34,76" fill="url(#royalPath)" />
            <line x1="150" y1="0" x2="34" y2="76" stroke="#D4AF37" strokeWidth="2.5" />
            <line x1="210" y1="0" x2="326" y2="76" stroke="#D4AF37" strokeWidth="2.5" />
            <line x1="180" y1="6" x2="180" y2="72" stroke="#FFF7EC" strokeWidth="2.5" strokeDasharray="6 8" opacity="0.85" />
          </svg>
        </div>

        <button
          type="button"
          onClick={handleOpenTap}
          className="relative z-20 inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full border-2 border-[#D4AF37] bg-[#FFF7EC] px-9 py-3 font-heading text-base font-extrabold tracking-wide text-[#260612] shadow-[0_0_28px_rgba(255,247,236,0.35),0_6px_0_#9E7B2F] transition-transform active:translate-y-1 active:scale-95"
        >
          <span>নিমন্ত্রণ খুলুন</span>
          <span className="text-[#4F0E26]" aria-hidden="true">➜</span>
        </button>
      </div>
    </div>
  );
}
