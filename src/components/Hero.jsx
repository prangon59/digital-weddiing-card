import React from 'react';
import { useWedding } from '../context/WeddingContext';
import { Heart, Sparkles, Calendar, MapPin, ChevronDown } from 'lucide-react';
import TiltCard from './TiltCard';

export default function Hero() {
  const { lang, guest, weddingConfig, t } = useWedding();
  const { groom, bride, ui } = weddingConfig;

  return (
    <section className="relative min-h-[90svh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden bg-gradient-to-b from-[#1C050B] via-[#2B0E14] to-[#1C050B]">
      {/* 3D Background Decorative Alpona & Mandala Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[520px] sm:h-[520px] rounded-full border border-gold/20 pointer-events-none animate-spin" style={{ animationDuration: '60s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[440px] sm:h-[440px] rounded-full border border-dashed border-gold/25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] sm:w-[350px] sm:h-[350px] rounded-full bg-radial-gradient from-gold/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Arabic Bismillah */}
        <p className="font-arabic text-2xl sm:text-3xl text-gold font-bold tracking-wide mb-3 animate-fade-in drop-shadow-[0_2px_12px_rgba(201,162,75,0.4)]">
          {ui.hero.bismillah}
        </p>

        {/* Celebration Tag Badge (Strict Single Language) */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3D101C]/80 border border-gold/40 text-gold text-xs sm:text-sm font-semibold tracking-wider mb-6 shadow-md backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>
            {lang === 'en'
              ? 'The Wedding Celebration'
              : 'শুভ বিবাহ ও শুভ পরিণয়'}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
        </div>

        {/* Personalized Guest Honor Card (3D Tilt) */}
        {guest.isPersonalized && (
          <TiltCard className="mb-6 px-5 py-2.5 rounded-2xl bg-[#3A0F19]/90 border border-gold/60 shadow-3d-card backdrop-blur-md max-w-sm">
            <p className="text-[11px] uppercase tracking-widest text-gold/80 font-semibold">
              {lang === 'bn' ? 'সম্মানিত অতিথি' : 'Specially Invited For'}
            </p>
            <p className={`text-base sm:text-lg font-bold text-cream-100 mt-0.5 ${lang === 'bn' ? 'font-banglaHeading' : 'font-engHeading'}`}>
              {lang === 'bn' ? guest.nameBn : guest.nameEn}
            </p>
          </TiltCard>
        )}

        {/* 3D Couple Names Crest (Strict Single Language & Pure Typography) */}
        <div className="flex flex-col items-center gap-2 my-2 w-full">
          {/* Groom Name */}
          <div className="text-center">
            {lang === 'en' ? (
              <h1 className="font-engHeading text-4xl sm:text-6xl md:text-7xl font-bold gold-foil-text tracking-tight leading-tight drop-shadow-lg">
                {groom.name.en}
              </h1>
            ) : (
              <h1 className="font-banglaHeading text-3xl sm:text-5xl md:text-6xl font-bold gold-foil-text tracking-tight leading-snug drop-shadow-lg">
                {groom.name.bn}
              </h1>
            )}
          </div>

          {/* 3D Weds Heart Divider */}
          <div className="flex items-center justify-center gap-3 my-1">
            <span className="w-12 sm:w-20 h-[1.5px] bg-gradient-to-r from-transparent via-gold to-gold" />
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5C141E] to-[#2B0E14] border border-gold flex items-center justify-center shadow-3d-gold">
              <Heart className="w-4 h-4 fill-maroon text-gold animate-pulse" />
            </div>
            <span className="w-12 sm:w-20 h-[1.5px] bg-gradient-to-l from-transparent via-gold to-gold" />
          </div>

          {/* Bride Name */}
          <div className="text-center">
            {lang === 'en' ? (
              <h1 className="font-engHeading text-4xl sm:text-6xl md:text-7xl font-bold gold-foil-text tracking-tight leading-tight drop-shadow-lg">
                {bride.name.en}
              </h1>
            ) : (
              <h1 className="font-banglaHeading text-3xl sm:text-5xl md:text-6xl font-bold gold-foil-text tracking-tight leading-snug drop-shadow-lg">
                {bride.name.bn}
              </h1>
            )}
          </div>
        </div>

        {/* Date and Location Badges (Khulna Location Updated) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mt-8 text-xs sm:text-sm text-cream-200">
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3A0F19]/80 border border-gold/40 shadow-sm">
            <Calendar className="w-4 h-4 text-gold" />
            <span className="font-medium">{t(ui.hero.dateBadge)}</span>
          </div>
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3A0F19]/80 border border-gold/40 shadow-sm">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span className="font-medium">{lang === 'bn' ? 'খুলনা, বাংলাদেশ' : 'Khulna, Bangladesh'}</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#invitation"
          className="inline-flex flex-col items-center gap-1 mt-12 text-gold/80 hover:text-gold transition-colors text-xs font-semibold animate-bounce"
        >
          <span>{lang === 'bn' ? 'আমন্ত্রণপত্র দেখুন' : 'View Invitation'}</span>
          <ChevronDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
