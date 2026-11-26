import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { useWedding } from '../context/WeddingContext';
import { prefersReducedMotion } from '../utils/helpers';

export default function CardOpening() {
  const {
    lang,
    guest,
    weddingConfig,
    isCardOpen,
    openCard,
    completeCardOpening,
    startMusic,
    setShowTapForMusicPrompt,
    lenisRef,
  } = useWedding();

  const containerRef = useRef(null);
  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);
  const sealRef = useRef(null);
  const revealContentRef = useRef(null);
  const promptRef = useRef(null);

  const hasTriggeredRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const [doorOpened, setDoorOpened] = useState(false);

  // Keyboard accessibility (Space, Enter, Down Arrow)
  useEffect(() => {
    if (isCardOpen) return;

    const handleKeyDown = (e) => {
      if (['Enter', ' ', 'ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        triggerOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCardOpen]);

  // Touch swipe or mouse wheel to open
  useEffect(() => {
    if (isCardOpen) return;

    let startY = 0;
    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        startY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!e.touches || !e.touches[0]) return;
      const currentY = e.touches[0].clientY;
      if (Math.abs(currentY - startY) > 20) {
        triggerOpen(false);
      }
    };

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > 10) {
        triggerOpen(false);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isCardOpen]);

  // Primary opening trigger (Guarded against multiple firings)
  const triggerOpen = (isTap = true) => {
    if (hasTriggeredRef.current || isAnimatingRef.current || isCardOpen) return;
    hasTriggeredRef.current = true;
    isAnimatingRef.current = true;

    openCard(isTap);

    // Audio handling: tap starts music with smooth fade-in; swipe/scroll reveals prompt
    if (isTap) {
      startMusic(2500);
    } else {
      setShowTapForMusicPrompt(true);
    }

    // Royal gold & ruby confetti explosion
    if (!prefersReducedMotion()) {
      try {
        confetti({
          particleCount: 65,
          spread: 85,
          origin: { y: 0.55 },
          colors: ['#D4AF37', '#FCF6BA', '#F4A300', '#7A1F2B', '#E8C872'],
          disableForReducedMotion: true,
        });
      } catch {
        // Fallback
      }
    }

    const container = containerRef.current;
    const leftDoor = leftDoorRef.current;
    const rightDoor = rightDoorRef.current;
    const seal = sealRef.current;
    const prompt = promptRef.current;
    const revealContent = revealContentRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        setDoorOpened(true);
        isAnimatingRef.current = false;
        completeCardOpening();
        if (lenisRef?.current) {
          lenisRef.current.start();
          lenisRef.current.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 80);
      },
    });

    if (prefersReducedMotion()) {
      tl.to(container, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      // 1. Hide prompt & seal pops
      tl.to(prompt, { opacity: 0, y: 15, duration: 0.25, ease: 'power2.in' }, 0)
        .to(seal, { scale: 1.25, rotate: 12, opacity: 0, duration: 0.45, ease: 'back.in(1.7)' }, 0.1)
        // 2. 3D Gates swing open to the sides
        .to(leftDoor, { rotateY: -110, duration: 1.15, ease: 'power2.inOut' }, 0.2)
        .to(rightDoor, { rotateY: 110, duration: 1.15, ease: 'power2.inOut' }, 0.2)
        // 3. Reveal interior couple names with golden burst
        .fromTo(revealContent, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' }, 0.5)
        // 4. Smooth transition into main website
        .to(container, { opacity: 0, duration: 0.55, ease: 'power2.inOut' }, 1.6);
    }
  };

  if (isCardOpen && doorOpened) {
    return null;
  }

  const { groom, bride } = weddingConfig;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-[#1A050B] perspective-1200"
      style={{ height: '100dvh' }}
      onClick={() => triggerOpen(true)}
      role="button"
      tabIndex={0}
      aria-label="Royal wedding invitation. Tap or swipe to open."
    >
      {/* Desktop ambient darkened surround */}
      <div
        className="absolute inset-0 bg-[#0F0205]/80 backdrop-blur-2xl pointer-events-none hidden md:block"
        aria-hidden="true"
      />

      {/* 9:16 Royal Gate Scene (Edge-to-edge on phones, centered on desktop) */}
      <div
        className="relative w-full h-[100dvh] md:w-[calc(100dvh*9/16)] md:h-[100dvh] md:max-h-[100dvh] md:aspect-[9/16] md:rounded-3xl md:border-2 md:border-gold/60 md:shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between pt-safe pb-safe perspective-1200 bg-[#24090F]"
      >
        {/* INTERIOR REVEAL CHAMBER (Behind the double doors) */}
        <div
          ref={revealContentRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center bg-[radial-gradient(ellipse_at_center,#4A1220_0%,#24090F_70%,#150307_100%)] opacity-0 pointer-events-none"
        >
          {/* Luminous Golden Arch Motif */}
          <div className="absolute inset-6 border border-gold/40 rounded-3xl pointer-events-none" />
          <div className="absolute inset-8 border border-gold/20 rounded-2xl pointer-events-none" />

          {/* Bismillah */}
          <p className="font-arabic text-xl sm:text-2xl text-gold font-bold mb-3">
            {weddingConfig.ui.hero.bismillah}
          </p>

          {/* Personalized Guest Badge if provided */}
          {guest.isPersonalized && (
            <div className="mb-4 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 shadow-sm backdrop-blur-sm max-w-[90%]">
              <p className="text-xs sm:text-sm font-banglaBody text-gold font-medium flex items-center justify-center gap-1.5 truncate">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span className="truncate">
                  {lang === 'bn' ? `সম্মানিত ${guest.nameBn}` : `Honored Guest: ${guest.nameEn}`}
                </span>
              </p>
            </div>
          )}

          {/* Couple Names in Royal Calligraphy (Clean Single Language) */}
          <div className="my-2">
            {lang === 'en' ? (
              <h1 className="font-engHeading text-3xl sm:text-5xl font-bold gold-foil-text tracking-wide leading-tight">
                {groom.name.en} &amp; {bride.name.en}
              </h1>
            ) : (
              <h1 className="font-banglaHeading text-2xl sm:text-4xl md:text-5xl font-bold gold-foil-text tracking-tight leading-snug">
                {groom.name.bn} ও {bride.name.bn}
              </h1>
            )}
          </div>

          <div className="flex items-center justify-center gap-3 my-3 text-gold">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gold to-gold" />
            <Heart className="w-4 h-4 fill-maroon-400 text-gold animate-pulse" />
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent via-gold to-gold" />
          </div>

          <p className={`${lang === 'bn' ? 'font-banglaBody text-sm sm:text-base' : 'font-engScript text-xl sm:text-2xl'} text-cream-200 max-w-xs`}>
            {lang === 'bn'
              ? 'দুইটি হৃদয়ের পবিত্র মেলবন্ধন ও শুভ পরিণয়'
              : 'Two souls destined to unite in love'}
          </p>
        </div>

        {/* 3D DOUBLE DOORS / GATES */}

        {/* LEFT GATE DOOR */}
        <div
          ref={leftDoorRef}
          className="absolute left-0 top-0 w-1/2 h-full z-20 origin-left transform-style-3d bg-gradient-to-r from-[#24090F] via-[#3E0E1A] to-[#4A1220] border-r border-gold/60 shadow-[5px_0_25px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between p-4"
          style={{ transformOrigin: 'left center' }}
        >
          {/* JOLCHAP (WATERMARK) BACKDROP - LEFT DOOR */}
          <div className="absolute inset-0 opacity-[0.08] mix-blend-screen pointer-events-none" aria-hidden="true">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cardJolchap" width="110" height="130" patternUnits="userSpaceOnUse">
                  {/* Royal Paisley / Kalka Motifs */}
                  <path d="M 55,18 C 68,18 78,28 78,44 C 78,60 64,72 55,84 C 46,72 32,60 32,44 C 32,28 42,18 55,18 Z" fill="none" stroke="#F4D06F" stroke-width="1.4" />
                  <path d="M 55,27 C 63,27 70,34 70,44 C 70,54 60,63 55,72 C 50,63 40,54 40,44 C 40,34 47,27 55,27 Z" fill="none" stroke="#F4D06F" stroke-width="0.9" />
                  <circle cx="55" cy="44" r="4" fill="#F4D06F" />
                  {/* Floral Florets */}
                  <circle cx="18" cy="18" r="2.5" fill="#F4D06F" />
                  <circle cx="92" cy="18" r="2.5" fill="#F4D06F" />
                  <circle cx="18" cy="112" r="2.5" fill="#F4D06F" />
                  <circle cx="92" cy="112" r="2.5" fill="#F4D06F" />
                  {/* Arabesque Arch Curves */}
                  <path d="M 18,18 Q 55,0 92,18 Q 110,55 92,92 Q 55,110 18,92 Q 0,55 18,18 Z" fill="none" stroke="#F4D06F" stroke-width="0.7" stroke-dasharray="2 3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cardJolchap)" />
            </svg>
          </div>

          {/* Subtle ornate gold patterns */}
          <div className="absolute inset-2 border-l-2 border-t-2 border-b-2 border-gold/40 rounded-l-2xl pointer-events-none" />
          <div className="absolute inset-4 border-l border-t border-b border-gold/20 rounded-l-xl pointer-events-none" />
          
          {/* Left Arch filigree */}
          <div className="absolute top-8 left-4 w-16 h-16 border-t-2 border-l-2 border-gold/50 rounded-tl-full pointer-events-none" />
          <div className="absolute bottom-8 left-4 w-16 h-16 border-b-2 border-l-2 border-gold/50 rounded-bl-full pointer-events-none" />

          {/* Left Door Studs */}
          <div className="absolute top-1/4 right-3 w-3 h-3 rounded-full bg-gold/70 shadow-gold-glow pointer-events-none" />
          <div className="absolute top-2/4 right-3 w-3 h-3 rounded-full bg-gold/70 shadow-gold-glow pointer-events-none" />
          <div className="absolute top-3/4 right-3 w-3 h-3 rounded-full bg-gold/70 shadow-gold-glow pointer-events-none" />
        </div>

        {/* RIGHT GATE DOOR */}
        <div
          ref={rightDoorRef}
          className="absolute right-0 top-0 w-1/2 h-full z-20 origin-right transform-style-3d bg-gradient-to-l from-[#24090F] via-[#3E0E1A] to-[#4A1220] border-l border-gold/60 shadow-[-5px_0_25px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between p-4"
          style={{ transformOrigin: 'right center' }}
        >
          {/* JOLCHAP (WATERMARK) BACKDROP - RIGHT DOOR */}
          <div className="absolute inset-0 opacity-[0.08] mix-blend-screen pointer-events-none" aria-hidden="true">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <rect width="100%" height="100%" fill="url(#cardJolchap)" />
            </svg>
          </div>

          {/* Subtle ornate gold patterns */}
          <div className="absolute inset-2 border-r-2 border-t-2 border-b-2 border-gold/40 rounded-r-2xl pointer-events-none" />
          <div className="absolute inset-4 border-r border-t border-b border-gold/20 rounded-r-xl pointer-events-none" />
          
          {/* Right Arch filigree */}
          <div className="absolute top-8 right-4 w-16 h-16 border-t-2 border-r-2 border-gold/50 rounded-tr-full pointer-events-none" />
          <div className="absolute bottom-8 right-4 w-16 h-16 border-b-2 border-r-2 border-gold/50 rounded-br-full pointer-events-none" />

          {/* Right Door Studs */}
          <div className="absolute top-1/4 left-3 w-3 h-3 rounded-full bg-gold/70 shadow-gold-glow pointer-events-none" />
          <div className="absolute top-2/4 left-3 w-3 h-3 rounded-full bg-gold/70 shadow-gold-glow pointer-events-none" />
          <div className="absolute top-3/4 left-3 w-3 h-3 rounded-full bg-gold/70 shadow-gold-glow pointer-events-none" />
        </div>

        {/* --- FRONT OVERLAYS (Above the doors, locking them together) --- */}

        {/* TOP: Arabic Bismillah & Guest Banner on front (No background text collisions) */}
        <div className="relative z-30 pt-7 px-4 flex flex-col items-center pointer-events-none">
          <p className="font-arabic text-2xl sm:text-3xl text-gold font-bold tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {weddingConfig.ui.hero.bismillah}
          </p>

          {guest.isPersonalized ? (
            <div className="mt-3.5 px-4 py-1.5 rounded-full bg-[#1F070C]/90 border border-gold/60 shadow-lg backdrop-blur-md max-w-[92%]">
              <p className="text-xs sm:text-sm font-banglaBody text-gold font-semibold flex items-center justify-center gap-1.5 truncate">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span className="truncate">
                  {lang === 'bn' ? `সম্মানিত ${guest.nameBn}` : `Honored Guest: ${guest.nameEn}`}
                </span>
              </p>
            </div>
          ) : (
            <span className="inline-block mt-3 px-4 py-1 rounded-full bg-[#1F070C]/85 border border-gold/50 text-gold text-xs font-semibold tracking-wider shadow-md">
              {lang === 'bn' ? 'শুভ বিবাহ আমন্ত্রণ' : 'Royal Wedding Invitation'}
            </span>
          )}
        </div>

        {/* CENTER: 3D Royal Monogram Gold Wax Seal holding the doors */}
        <div
          ref={sealRef}
          className="relative z-30 my-auto py-2 flex flex-col items-center pointer-events-none"
        >
          {/* Realistic Molten Gold Wax Seal */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center animate-soft-float">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
              <defs>
                <radialGradient id="outerWaxGrad" cx="35%" cy="30%" r="75%">
                  <stop offset="0%" stop-color="#FFF2A3" />
                  <stop offset="25%" stop-color="#E5BE53" />
                  <stop offset="55%" stop-color="#B38728" />
                  <stop offset="85%" stop-color="#7A4F0D" />
                  <stop offset="100%" stop-color="#472A00" />
                </radialGradient>
                <linearGradient id="ridgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#FFE885" />
                  <stop offset="40%" stop-color="#D4AF37" />
                  <stop offset="80%" stop-color="#7A4B00" />
                  <stop offset="100%" stop-color="#3D2000" />
                </linearGradient>
                <radialGradient id="innerFaceGrad" cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stop-color="#FCE789" />
                  <stop offset="35%" stop-color="#CFA132" />
                  <stop offset="75%" stop-color="#996E14" />
                  <stop offset="100%" stop-color="#5E3902" />
                </radialGradient>
                <linearGradient id="stampTextGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#FFFAD1" />
                  <stop offset="50%" stop-color="#F2CB60" />
                  <stop offset="100%" stop-color="#8F5E0A" />
                </linearGradient>
                <linearGradient id="waxGloss" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.6" />
                  <stop offset="40%" stop-color="#FFF0A5" stop-opacity="0.15" />
                  <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
                </linearGradient>
              </defs>

              {/* 1. Molten Organic Wax Perimeter */}
              <path 
                d="M 192,100 C 193.1,113.4 192.7,130.2 186.5,141.7 C 180.3,153.2 165.8,160.3 154.9,168.8 C 144,177.3 133.9,188.2 121.1,192.6 C 108.3,197 91,199.3 78.2,195.5 C 65.4,191.7 55,178.7 44.5,169.6 C 34,160.5 21.2,152.4 15.3,140.8 C 9.4,129.2 9.5,113.8 9,100 C 8.6,86.2 6.6,69.4 12.6,57.9 C 18.6,46.4 34.1,39.6 45.1,31.2 C 56.2,22.8 66.4,10.6 78.9,7.4 C 91.4,4.3 106.5,9.4 120,12.3 C 133.5,15.2 149.9,16.7 159.9,24.9 C 169.9,33.1 174.9,48.9 180.2,61.4 C 185.5,73.9 191,86.6 192,100 Z"
                fill="url(#outerWaxGrad)"
              />

              {/* 2. Crease & 3D Bevel Ridge */}
              <circle cx="100" cy="100" r="76" fill="none" stroke="#3D2000" stroke-width="2.5" opacity="0.6" />
              <circle cx="100" cy="100" r="74" fill="none" stroke="url(#ridgeGrad)" stroke-width="5" />
              <circle cx="100" cy="100" r="71.5" fill="none" stroke="#FFE994" stroke-width="1.2" opacity="0.75" />
              <circle cx="100" cy="100" r="76.5" fill="none" stroke="#422400" stroke-width="1.5" opacity="0.8" />

              {/* 3. Sunken Inner Wax Face */}
              <circle cx="100" cy="100" r="70" fill="url(#innerFaceGrad)" />

              {/* 4. Beaded Milled Coin Rim */}
              <circle 
                cx="100" 
                cy="100" 
                r="64" 
                fill="none" 
                stroke="url(#ridgeGrad)" 
                stroke-width="2.5" 
                stroke-dasharray="1.2 4.5" 
                stroke-linecap="round" 
                opacity="0.9"
              />
              <circle cx="100" cy="100" r="59" fill="none" stroke="#7A4F0D" stroke-width="1" opacity="0.7" />
              <circle cx="100" cy="100" r="58" fill="none" stroke="#FFE994" stroke-width="0.7" opacity="0.5" />

              {/* 5. Embossed Monogram "S & E" (Deeply Stamped Relief) */}
              <text 
                x="101.5" 
                y="101.5" 
                text-anchor="middle" 
                font-family="'Cormorant Garamond', 'Cinzel', serif" 
                font-size="36" 
                font-weight="bold" 
                letter-spacing="2"
                fill="#402300"
                opacity="0.85"
              >
                S &amp; E
              </text>
              <text 
                x="99" 
                y="99" 
                text-anchor="middle" 
                font-family="'Cormorant Garamond', 'Cinzel', serif" 
                font-size="36" 
                font-weight="bold" 
                letter-spacing="2"
                fill="#FFFBD9"
                opacity="0.95"
              >
                S &amp; E
              </text>
              <text 
                x="100" 
                y="100" 
                text-anchor="middle" 
                font-family="'Cormorant Garamond', 'Cinzel', serif" 
                font-size="36" 
                font-weight="bold" 
                letter-spacing="2"
                fill="url(#stampTextGrad)"
              >
                S &amp; E
              </text>

              {/* Subtitle: "শুভ বিবাহ" */}
              <text 
                x="100.8" 
                y="122.8" 
                text-anchor="middle" 
                font-family="'Hind Siliguri', sans-serif" 
                font-size="11.5" 
                font-weight="bold" 
                letter-spacing="1"
                fill="#3D2000"
              >
                শুভ বিবাহ
              </text>
              <text 
                x="99.5" 
                y="121.5" 
                text-anchor="middle" 
                font-family="'Hind Siliguri', sans-serif" 
                font-size="11.5" 
                font-weight="bold" 
                letter-spacing="1"
                fill="#FFF9D1"
                opacity="0.9"
              >
                শুভ বিবাহ
              </text>
              <text 
                x="100" 
                y="122" 
                text-anchor="middle" 
                font-family="'Hind Siliguri', sans-serif" 
                font-size="11.5" 
                font-weight="bold" 
                letter-spacing="1"
                fill="url(#stampTextGrad)"
              >
                শুভ বিবাহ
              </text>

              {/* Decorative Stars / Dots */}
              <circle cx="78" cy="119" r="1.5" fill="#FFEAA3" />
              <circle cx="122" cy="119" r="1.5" fill="#FFEAA3" />

              {/* 6. Realistic Gloss Arc Highlight */}
              <path 
                d="M 40,65 C 55,30 90,25 130,35 C 95,38 65,55 40,65 Z" 
                fill="url(#waxGloss)" 
                opacity="0.45" 
                pointer-events="none"
              />
            </svg>
          </div>

          <div className="mt-3 px-3.5 py-1 rounded-full bg-[#1C050B]/90 border border-gold/40 text-center shadow-md">
            <p className="text-xs text-gold/95 font-medium tracking-wide">
              {lang === 'bn' ? 'সাকিব ও ভাবনা' : 'Sakib & Easha'}
            </p>
          </div>
        </div>

        {/* BOTTOM: Clear "Tap to open" prompt with pulsing glow */}
        <div
          ref={promptRef}
          className="relative z-30 pb-7 px-4 flex flex-col items-center pointer-events-none"
        >
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F4A300] to-[#C9A24B] text-[#24090F] font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(244,163,0,0.6)] animate-pulse border border-yellow-200">
            <Sparkles className="w-4 h-4 text-[#24090F] shrink-0" />
            <span>
              {lang === 'bn'
                ? 'আমন্ত্রণপত্রটি খুলতে স্পর্শ করুন'
                : 'Tap to open invitation'}
            </span>
          </div>

          <p className="text-[11px] text-cream-200/80 mt-2.5 font-banglaBody">
            {lang === 'bn'
              ? 'স্পর্শ করুন, উপরে সোয়াইপ করুন অথবা Enter চাপুন'
              : 'Tap anywhere, swipe up or press Enter'}
          </p>
        </div>
      </div>
    </div>
  );
}
