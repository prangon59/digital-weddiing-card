import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useWedding } from '../context/WeddingContext';
import { prefersReducedMotion } from '../utils/helpers';
import TiltCard from './TiltCard';

export default function OurStory() {
  const { lang, t } = useWedding();

  const slides = [
    {
      id: 'child-groom',
      tag: { en: 'Childhood Memories', bn: 'শৈশবের স্মৃতি' },
      title: { en: 'Little Sakib', bn: 'ছোট্ট সাকিব' },
      tagline: { en: 'Paper boats, colorful kites & endless daydreams', bn: 'কাগজের নৌকা, রঙিন ঘুড়ি আর ডানপিটে শৈশব' },
      description: {
        en: 'A gentle little prince whose childhood was painted with sunshine, paper boats, and dreaming under golden skies.',
        bn: 'এক যে ছিল শান্ত দুষ্টু এক রাজপুত্র, যার শৈশব কেটেছিল রঙিন ঘুড়ি আর কাগজের নৌকার রঙিন স্বপ্নে।',
      },
      img: '/images/child-groom.svg',
      fallbackImg: '/images/child-groom.webp',
      alt: 'Little Sakib in childhood',
    },
    {
      id: 'child-bride',
      tag: { en: 'Childhood Innocence', bn: 'শৈশবের সারল্য' },
      title: { en: 'Little Easha (Bhabna)', bn: 'ছোট্ট ভাবনা (এশা)' },
      tagline: { en: 'Sweet smiles, dollhouses & laughter', bn: 'মিষ্টি হাসি, পুতুলের বিয়ে আর অফুরন্ত উচ্ছ্বাস' },
      description: {
        en: 'A spirited little princess whose sweet laughter lit up every home, surrounded by blooming blossoms and storybooks.',
        bn: 'আর দূরে এক চঞ্চল রাজকন্যা, যার মিষ্টি হাসিতে চারপাশ উজ্জ্বল হয়ে উঠত আর পুতুল খেলার স্বপ্ন ছিল যার সারাবেলা।',
      },
      img: '/images/child-bride.svg',
      fallbackImg: '/images/child-bride.webp',
      alt: 'Little Easha in childhood',
    },
    {
      id: 'adult-groom',
      tag: { en: 'Youth & Ambition', bn: 'তারুণ্য ও দীপ্তি' },
      title: { en: 'Sakib Hassan Prangon', bn: 'সাকিব হাসান প্রাঙ্গন' },
      tagline: { en: 'Integrity, dedication & walking his destined path', bn: 'তারুণ্যের দীপ্তি, গভীর নিষ্ঠা ও জীবনের স্বপ্ন' },
      description: {
        en: 'Years drifted by as childhood innocence transformed into quiet strength, wisdom, and an unwavering heart ready for life.',
        bn: 'শৈশব পেরিয়ে এলো তারুণ্যের দিন। বইয়ের পাতা আর ব্যস্ত পথচলায় নিজেকে গড়ে তুলল এক আত্মবিশ্বাসী ও দায়িত্বশীল মানুষ হিসেবে।',
      },
      img: '/images/adult-groom.svg',
      fallbackImg: '/images/adult-groom.webp',
      alt: 'Sakib Hassan Prangon in adulthood',
    },
    {
      id: 'adult-bride',
      tag: { en: 'Grace & Elegance', bn: 'কমনীয়তা ও স্নিগ্ধতা' },
      title: { en: 'Easha Mahmud Bhabna', bn: 'এশা মাহমুদ ভাবনা' },
      tagline: { en: 'Grace, compassion & warmth that brightens every day', bn: 'স্নিগ্ধ কমনীয়তা, গভীর আন্তরিকতা ও মাধুর্য' },
      description: {
        en: 'Blossoming into a radiant woman adorned with gentle grace, wisdom, and a beautiful soul ready for love’s greatest voyage.',
        bn: 'কমনীয়তা ও স্নিগ্ধতায় উজ্জ্বল এক অনন্যা নারী, যার হৃদয় ভালোবাসায় পূর্ণ এবং নতুন জীবনের শুভ প্রত্যাশায় উদ্ভাসিত।',
      },
      img: '/images/adult-bride.svg',
      fallbackImg: '/images/adult-bride.webp',
      alt: 'Easha Mahmud Bhabna in adulthood',
    },
    {
      id: 'together',
      tag: { en: 'Forever Destined', bn: 'চিরন্তন পরিণয়' },
      title: { en: 'Sakib & Easha Together', bn: 'সাকিব ও ভাবনা: শুভ পরিণয়' },
      tagline: { en: 'Two childhood stories finally becoming one forever', bn: 'দুইটি পৃথক গল্পের নদী এসে মিশল একই মোহনায়' },
      description: {
        en: 'What started as separate childhood dreams has united into a sacred bond of love, trust, and lifelong friendship. With parents’ blessings, we unite.',
        bn: 'দুইটি ছোট মনের বেড়ে ওঠা ও এক হওয়া। পিতা-মাতা ও প্রিয়জনদের দোয়া আর ভালোবাসায় সিক্ত হয়ে তারা বাঁধতে চলেছে সারাজীবনের বন্ধন।',
      },
      img: '/images/couple-together.svg',
      fallbackImg: '/images/couple-together.webp',
      alt: 'Sakib and Easha Together',
    },
  ];

  // Mobile Carousel with Embla
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Desktop active stage (0: Children, 1: Adults, 2: Together)
  const [desktopStage, setDesktopStage] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());

    if (index <= 1) setDesktopStage(0);
    else if (index <= 3) setDesktopStage(1);
    else setDesktopStage(2);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Confetti when reaching the final together slide
  useEffect(() => {
    if ((selectedIndex === slides.length - 1 || desktopStage === 2) && !prefersReducedMotion()) {
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#D4AF37', '#FCF6BA', '#F4A300', '#7A1F2B'],
          disableForReducedMotion: true,
        });
      } catch {
        // Fallback
      }
    }
  }, [selectedIndex, desktopStage, slides.length]);

  // Keyboard navigation on desktop
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        if (emblaApi) emblaApi.scrollPrev();
        setDesktopStage((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        if (emblaApi) emblaApi.scrollNext();
        setDesktopStage((prev) => Math.min(2, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [emblaApi]);

  const scrollTo = (index) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  };

  return (
    <section
      id="our-story"
      className="relative py-24 px-4 bg-gradient-to-b from-[#1C050B] via-[#26080F] to-[#1C050B] overflow-hidden"
    >
      {/* Background Watercolor Transitions */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#1C050B] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#1C050B] to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section Heading (Clean Single Language) */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3D101C]/80 border border-gold/40 text-xs font-semibold text-gold mb-3 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>{lang === 'bn' ? 'আমাদের ভালোবাসার গল্প' : 'Our Storybook Journey'}</span>
          </div>

          <h2 className={`${lang === 'bn' ? 'font-banglaHeading text-2xl sm:text-4xl md:text-5xl' : 'font-engHeading text-3xl sm:text-4xl md:text-5xl'} font-bold gold-foil-text tracking-tight`}>
            {lang === 'bn' ? 'শৈশব থেকে শুভ পরিণয়' : 'Growing Up Together Into Forever'}
          </h2>

          <p className={`${lang === 'bn' ? 'font-banglaBody text-sm text-gold/90 mt-2' : 'font-engScript text-xl sm:text-2xl text-cream-200 mt-2'}`}>
            {lang === 'bn' ? 'ভাগ্যের নিখুঁত গাঁথুনিতে এক ভালোবাসার গল্প' : 'A Fairytale Written by Destiny'}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE & TOUCH: 3D SWIPEABLE CAROUSEL (Embla Carousel)                   */}
        {/* ========================================================================= */}
        <div className="block md:hidden">
          <div
            className="overflow-hidden w-full touch-pan-y perspective-1000"
            ref={emblaRef}
            style={{ touchAction: 'pan-y' }}
          >
            <div className="flex">
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="flex-[0_0_100%] min-w-0 px-2 flex flex-col items-center"
                >
                  <TiltCard className="w-full bg-gradient-to-b from-[#2B0E14] to-[#1F070C] rounded-3xl p-6 border-2 border-gold/45 shadow-3d-card flex flex-col items-center text-center">
                    {/* Stage Badge */}
                    <span className="inline-block px-3.5 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-bold mb-4 shadow-sm">
                      {slide.tag[lang]}
                    </span>

                    {/* Image with 3D Border */}
                    <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-gold/50 shadow-3d-gold bg-[#150307] flex items-center justify-center mb-5">
                      <img
                        src={slide.img}
                        alt={slide.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = slide.fallbackImg;
                        }}
                      />
                    </div>

                    {/* Slide Title */}
                    {lang === 'en' ? (
                      <div className="mb-2">
                        <h3 className="font-engHeading text-2xl font-bold gold-foil-text leading-tight">
                          {slide.title.en}
                        </h3>
                        <p className="font-banglaHeading text-sm text-gold mt-0.5 leading-normal">
                          {slide.title.bn}
                        </p>
                      </div>
                    ) : (
                      <div className="mb-2">
                        <h3 className="font-banglaHeading text-xl font-bold gold-foil-text leading-snug">
                          {slide.title.bn}
                        </h3>
                        <p className="font-engHeading text-sm text-gold mt-0.5 tracking-wide">
                          {slide.title.en}
                        </p>
                      </div>
                    )}

                    {/* Tagline */}
                    <p className="text-xs font-medium text-yellow-300 mb-3">
                      {slide.tagline[lang]}
                    </p>

                    {/* Description */}
                    <p className="font-banglaBody text-xs sm:text-sm text-cream-100/85 leading-relaxed max-w-sm">
                      {slide.description[lang]}
                    </p>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Carousel Controls: Arrows + Glowing Dots */}
          <div className="flex items-center justify-between w-full mt-6 px-4">
            {/* Prev Button (44px touch target) */}
            <button
              onClick={() => emblaApi && emblaApi.scrollPrev()}
              disabled={!canScrollPrev}
              className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition-all ${
                canScrollPrev
                  ? 'bg-[#3D101C] text-gold hover:bg-[#4E1424] border border-gold/50 active:scale-95 shadow-md'
                  : 'bg-[#1F070C] text-cream-300/30 border border-gold/20 opacity-30 cursor-not-allowed'
              }`}
              aria-label="Previous story chapter"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dot Indicators */}
            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollTo(idx)}
                  className={`transition-all duration-300 rounded-full min-h-[24px] min-w-[24px] flex items-center justify-center ${
                    selectedIndex === idx
                      ? 'w-7 h-2.5 bg-gradient-to-r from-gold to-yellow-400 shadow-[0_0_10px_rgba(201,162,75,0.7)]'
                      : 'w-2.5 h-2.5 bg-gold/30 hover:bg-gold/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next Button (44px touch target) */}
            <button
              onClick={() => emblaApi && emblaApi.scrollNext()}
              disabled={!canScrollNext}
              className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition-all ${
                canScrollNext
                  ? 'bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-[#24090F] font-bold border border-yellow-200 active:scale-95 shadow-3d-gold'
                  : 'bg-[#1F070C] text-cream-300/30 border border-gold/20 opacity-30 cursor-not-allowed'
              }`}
              aria-label="Next story chapter"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP VIEW: 3D STEPPER & STAGE                                          */}
        {/* ========================================================================= */}
        <div className="hidden md:block">
          {/* Stage Navigation Stepper */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {[
              { id: 0, labelEn: '1. Childhood Dreams', labelBn: '১. শৈশবের দিনগুলো' },
              { id: 1, labelEn: '2. Growing & Destiny', labelBn: '২. তারুণ্যের পথচলা' },
              { id: 2, labelEn: '3. Destined to Unite', labelBn: '৩. চিরন্তন শুভ পরিণয়' },
            ].map((stage) => (
              <button
                key={stage.id}
                onClick={() => setDesktopStage(stage.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 min-h-[44px] ${
                  desktopStage === stage.id
                    ? 'bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-[#24090F] font-bold shadow-3d-gold scale-105 border border-yellow-200'
                    : 'bg-[#2B0E14]/80 text-cream-100 hover:text-gold border border-gold/30 hover:bg-[#3D101C]'
                }`}
                aria-label={lang === 'bn' ? stage.labelBn : stage.labelEn}
              >
                <span>{lang === 'bn' ? stage.labelBn : stage.labelEn}</span>
              </button>
            ))}
          </div>

          {/* Main 3D Stage Card */}
          <TiltCard className="relative bg-gradient-to-b from-[#2B0E14] to-[#1C050B] rounded-3xl p-10 border-2 border-gold/50 shadow-3d-card">
            {/* Connecting Gold Vine across top */}
            <div className="relative w-full h-8 flex items-center justify-center mb-8">
              <div className="w-full h-1 bg-gradient-to-r from-gold/30 via-yellow-400 to-gold/30 rounded-full" />
              {/* Moving Heart Indicator on the vine */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#3D101C] border border-gold flex items-center justify-center shadow-3d-gold transition-all duration-700"
                style={{
                  left: `${(desktopStage / 2) * 88 + 6}%`,
                }}
              >
                <Heart className="w-4 h-4 fill-maroon text-gold animate-pulse" />
              </div>
            </div>

            {/* Stage Visuals */}
            <div className="w-full min-h-[340px] flex items-center justify-center py-4">
              {desktopStage === 2 ? (
                /* Stage 3: Sakib & Easha Together */
                <div className="flex flex-col items-center animate-fade-in">
                  <div className="relative w-72 h-72 rounded-2xl overflow-hidden border-2 border-gold shadow-3d-gold">
                    <img
                      src="/images/couple-together.svg"
                      alt="Sakib and Easha Together"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/images/couple-together.webp';
                      }}
                    />
                  </div>
                  <div className="mt-4 px-5 py-2 rounded-full bg-gradient-to-r from-gold via-yellow-400 to-gold text-[#24090F] text-sm font-bold shadow-md">
                    {lang === 'bn' ? 'আর এখন, তাদের বিয়ে! ❤' : 'And Now, They Are Getting Married! ❤'}
                  </div>
                </div>
              ) : (
                /* Stages 0 and 1: Groom and Bride walking towards each other */
                <div className="flex items-center justify-around w-full max-w-xl gap-8">
                  {/* Groom */}
                  <div
                    className="flex flex-col items-center transition-all duration-700"
                    style={{
                      transform: `translateX(${desktopStage * 28}px)`,
                    }}
                  >
                    <div className="w-44 h-44 rounded-2xl overflow-hidden border-2 border-gold/50 shadow-md bg-[#150307]">
                      <img
                        src={desktopStage === 0 ? '/images/child-groom.svg' : '/images/adult-groom.svg'}
                        alt="Groom"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = desktopStage === 0 ? '/images/child-groom.webp' : '/images/adult-groom.webp';
                        }}
                      />
                    </div>
                    <span className="mt-3 text-sm font-semibold text-gold font-banglaBody">
                      {desktopStage === 0
                        ? (lang === 'bn' ? 'ছোট্ট সাকিব' : 'Little Sakib')
                        : (lang === 'bn' ? 'সাকিব হাসান' : 'Sakib Hassan')}
                    </span>
                  </div>

                  {/* Sparkle motif in center */}
                  <div className="flex flex-col items-center text-gold">
                    <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" style={{ animationDuration: '8s' }} />
                    <span className="text-xs text-cream-200/80 italic mt-1 font-serif">
                      {desktopStage === 0 && (lang === 'bn' ? 'শৈশবের স্বপ্ন' : 'Dreams')}
                      {desktopStage === 1 && (lang === 'bn' ? 'ভাগ্যের পথচলা' : 'Destiny')}
                    </span>
                  </div>

                  {/* Bride */}
                  <div
                    className="flex flex-col items-center transition-all duration-700"
                    style={{
                      transform: `translateX(-${desktopStage * 28}px)`,
                    }}
                  >
                    <div className="w-44 h-44 rounded-2xl overflow-hidden border-2 border-gold/50 shadow-md bg-[#150307]">
                      <img
                        src={desktopStage === 0 ? '/images/child-bride.svg' : '/images/adult-bride.svg'}
                        alt="Bride"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = desktopStage === 0 ? '/images/child-bride.webp' : '/images/adult-bride.webp';
                        }}
                      />
                    </div>
                    <span className="mt-3 text-sm font-semibold text-gold font-banglaBody">
                      {desktopStage === 0
                        ? (lang === 'bn' ? 'ছোট্ট ভাবনা' : 'Little Bhabna')
                        : (lang === 'bn' ? 'এশা মাহমুদ' : 'Easha Mahmud')}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Stage Description */}
            <div className="text-center max-w-xl mx-auto mt-6">
              {desktopStage === 0 && (
                <div>
                  <h3 className="font-banglaHeading text-2xl font-bold gold-foil-text">
                    {lang === 'bn' ? 'শৈশবের দূরন্তপনা ও রঙিন দিন' : 'Childhood Innocence & Endless Daydreams'}
                  </h3>
                  <p className="font-banglaBody text-sm text-cream-100/85 mt-2 leading-relaxed">
                    {lang === 'bn'
                      ? 'এক শান্ত দুষ্টু ছেলে যার দিন কাটত রঙিন ঘুড়ি আর কাগজের নৌকায়, আর দূরে এক চঞ্চল রাজকন্যা যার মিষ্টি হাসিতে চারপাশ উজ্জ্বল হয়ে উঠত।'
                      : 'A world made of paper boats and endless summer afternoons where little Sakib dreamed big, and spirited little Easha filled every room with sunshine.'}
                  </p>
                </div>
              )}
              {desktopStage === 1 && (
                <div>
                  <h3 className="font-banglaHeading text-2xl font-bold gold-foil-text">
                    {lang === 'bn' ? 'দিনবদলের সুর ও ভাগ্যের পথচলা' : 'Growing Up & Walking Destined Paths'}
                  </h3>
                  <p className="font-banglaBody text-sm text-cream-100/85 mt-2 leading-relaxed">
                    {lang === 'bn'
                      ? 'শৈশব পেরিয়ে এলো তারুণ্যের দিন। বইয়ের পাতা আর ব্যস্ত পথচলায় নিজেদের গড়ে তোলার সাথে সাথে ভাগ্য তাদের নিঃশব্দে এক মোহনার দিকে নিয়ে এলো।'
                      : 'As years drifted by, they grew into passionate souls with shared values—unaware that destiny was quietly weaving their paths closer together.'}
                  </p>
                </div>
              )}
              {desktopStage === 2 && (
                <div>
                  <h3 className="font-banglaHeading text-2xl font-bold gold-foil-text">
                    {lang === 'bn' ? 'আর এখন, তাদের চিরন্তন বিয়ে!' : 'And Now, A Lifelong Fairytale Begins'}
                  </h3>
                  <p className="font-banglaBody text-sm text-cream-100/85 mt-2 leading-relaxed">
                    {lang === 'bn'
                      ? 'দুইটি পৃথক নদীর মিলন হলো একই মোহনায়। পিতা-মাতা ও প্রিয়জনদের দোয়া আর ভালোবাসায় সিক্ত হয়ে তারা বাঁধতে চলেছে সারাজীবনের বন্ধন।'
                      : 'Two childhood stories have merged into one beautiful fairytale. With the blessings of our parents, we take our steps together into forever.'}
                  </p>
                </div>
              )}
            </div>

            {/* Desktop Navigation Arrows */}
            <div className="flex items-center justify-between w-full mt-8 pt-4 border-t border-gold/20">
              <button
                onClick={() => setDesktopStage((prev) => Math.max(0, prev - 1))}
                disabled={desktopStage === 0}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold transition-all min-h-[44px] ${
                  desktopStage === 0
                    ? 'opacity-30 cursor-not-allowed text-cream-300'
                    : 'bg-[#3D101C] text-gold hover:bg-[#4E1424] active:scale-95 border border-gold/40 shadow-sm'
                }`}
                aria-label="Previous story stage"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{lang === 'bn' ? 'পূর্ববর্তী অধ্যায়' : 'Previous Chapter'}</span>
              </button>

              <span className="text-xs text-gold/70 font-mono">
                {desktopStage + 1} / 3 • {lang === 'bn' ? 'কীবোর্ড এরোর মাধ্যমে পরিবর্তন করুন' : 'Use ← / → keys'}
              </span>

              <button
                onClick={() => setDesktopStage((prev) => Math.min(2, prev + 1))}
                disabled={desktopStage === 2}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold transition-all min-h-[44px] ${
                  desktopStage === 2
                    ? 'opacity-30 cursor-not-allowed text-cream-300'
                    : 'bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-[#24090F] font-bold active:scale-95 border border-yellow-200 shadow-3d-gold'
                }`}
                aria-label="Next story stage"
              >
                <span>{lang === 'bn' ? 'পরবর্তী অধ্যায়' : 'Next Chapter'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
