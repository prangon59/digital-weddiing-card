import React from 'react';
import { useWedding } from '../context/WeddingContext';
import TiltCard from './TiltCard';

export default function InvitationMessage() {
  const { lang, weddingConfig, t } = useWedding();
  const { groom, bride, invitationLetter } = weddingConfig;

  return (
    <section id="invitation" className="relative py-16 sm:py-24 px-4 bg-[#1C050B]">
      <div className="max-w-2xl mx-auto">
        {/* 3D Parchment Royal Card */}
        <TiltCard className="relative bg-gradient-to-b from-[#2B0E14] via-[#350F18] to-[#24090F] rounded-3xl p-5 sm:p-10 border-2 border-gold/50 shadow-3d-card text-center overflow-hidden">
          
          {/* Ornate Corner Filigrees */}
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-gold/60 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-gold/60 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-gold/60 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-gold/60 rounded-br-lg pointer-events-none" />

          {/* Bismillah Header */}
          <p className="font-arabic text-xl sm:text-2xl text-gold font-bold mb-3 sm:mb-4 drop-shadow-sm tracking-wide">
            {invitationLetter.bismillah}
          </p>

          {/* Quranic Verse (Sleek, Card-less & Elegant) */}
          <div className="mb-4 sm:mb-5 px-2">
            <p className="font-arabic text-sm sm:text-base text-cream-100/95 leading-relaxed">
              {invitationLetter.quranVerse.arabic}
            </p>
            <p className={`text-[11px] sm:text-xs text-gold/85 italic mt-1.5 leading-snug ${lang === 'bn' ? 'font-banglaBody' : 'font-serif'}`}>
              {lang === 'bn' ? invitationLetter.quranVerse.bn : invitationLetter.quranVerse.en}
            </p>
          </div>

          {/* Delicate Hairline Gold Divider */}
          <div className="flex items-center justify-center gap-3 my-3 sm:my-4 opacity-75">
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold text-[10px] sm:text-xs">✦</span>
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-gold" />
          </div>

          {/* Salutation & General Universal Guest Greeting */}
          <div className="mb-2 sm:mb-3">
            <h2 className={`${lang === 'bn' ? 'font-banglaHeading text-base sm:text-lg' : 'font-engHeading text-lg sm:text-xl'} font-bold text-yellow-300`}>
              {t(invitationLetter.salutation)}
            </h2>
            <p className={`${lang === 'bn' ? 'font-banglaHeading text-base sm:text-lg' : 'font-engHeading text-lg sm:text-xl'} font-bold text-gold-bright mt-1 drop-shadow-sm`}>
              {lang === 'bn' ? 'সম্মানিত সুধী,' : 'Dear Guest,'}
            </p>
          </div>

          {/* General Universal Invitation Body (Not tied to specific program) */}
          <p className={`${lang === 'bn' ? 'font-banglaBody' : 'font-serif'} text-xs sm:text-sm text-cream-100/90 leading-relaxed max-w-lg mx-auto mb-4 sm:mb-5`}>
            {t(invitationLetter.bodyGeneral)}
          </p>

          {/* Delicate Hairline Divider */}
          <div className="flex items-center justify-center gap-3 my-2 sm:my-3 opacity-75">
            <div className="h-[1px] w-14 sm:w-20 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold text-xs">❦</span>
            <div className="h-[1px] w-14 sm:w-20 bg-gradient-to-l from-transparent to-gold" />
          </div>

          {/* HERO COUPLE NAMES DISPLAY (Strict Single Language) */}
          <div className="my-3 sm:my-5 py-1">
            {/* Groom Name */}
            <div>
              <h3 className={`${lang === 'bn' ? 'font-banglaHeading text-xl sm:text-3xl' : 'font-engHeading text-2xl sm:text-4xl'} font-bold gold-foil-text tracking-wide`}>
                {groom.name[lang]}
              </h3>
            </div>

            {/* Romantic Royal Ampersand / ও */}
            <div className="my-1.5 sm:my-2 flex items-center justify-center gap-2 sm:gap-3">
              <div className="w-8 sm:w-12 h-[1px] bg-gold/30" />
              <span className={`${lang === 'bn' ? 'font-banglaHeading text-lg text-yellow-300 font-bold' : 'font-engScript text-2xl sm:text-3xl text-yellow-300'} drop-shadow-[0_0_10px_rgba(201,162,75,0.4)]`}>
                {lang === 'bn' ? 'ও' : '&'}
              </span>
              <div className="w-8 sm:w-12 h-[1px] bg-gold/30" />
            </div>

            {/* Bride Name */}
            <div>
              <h3 className={`${lang === 'bn' ? 'font-banglaHeading text-xl sm:text-3xl' : 'font-engHeading text-2xl sm:text-4xl'} font-bold gold-foil-text tracking-wide`}>
                {bride.name[lang]}
              </h3>
            </div>
          </div>

          {/* Delicate Hairline Divider */}
          <div className="flex items-center justify-center gap-3 my-3 sm:my-4 opacity-75">
            <div className="h-[1px] w-14 sm:w-20 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold text-xs">❦</span>
            <div className="h-[1px] w-14 sm:w-20 bg-gradient-to-l from-transparent to-gold" />
          </div>

          {/* Parents' Section (Accurate names & Khulna location) */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4 text-center my-3 sm:my-4 py-2 border-y border-gold/20 max-w-lg mx-auto">
            {/* Groom's Family */}
            <div className="border-r border-gold/20 pr-2">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gold block">
                {lang === 'bn' ? 'বরের অভিভাবকবৃন্দ' : "Groom's Parents"}
              </span>
              <p className={`text-xs sm:text-sm font-semibold text-cream-100 mt-1 leading-snug ${lang === 'bn' ? 'font-banglaBody' : 'font-serif'}`}>
                {groom.parents[lang]}
              </p>
              <p className="text-[10px] sm:text-xs text-cream-300/60 mt-0.5">
                {groom.hometown[lang]}
              </p>
            </div>

            {/* Bride's Family */}
            <div className="pl-2">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gold block">
                {lang === 'bn' ? 'কনের অভিভাবকবৃন্দ' : "Bride's Parents"}
              </span>
              <p className={`text-xs sm:text-sm font-semibold text-cream-100 mt-1 leading-snug ${lang === 'bn' ? 'font-banglaBody' : 'font-serif'}`}>
                {bride.parents[lang]}
              </p>
              <p className="text-[10px] sm:text-xs text-cream-300/60 mt-0.5">
                {bride.hometown[lang]}
              </p>
            </div>
          </div>

          {/* Blessing Closing Line (Strict Single Language) */}
          <div className="mt-4 pt-1">
            <p className={`${lang === 'bn' ? 'font-banglaHeading text-sm font-bold' : 'font-engHeading text-base font-bold'} text-cream-100`}>
              {t(invitationLetter.blessingClosing)}
            </p>
            <p className={`${lang === 'bn' ? 'font-banglaBody text-xs text-gold/90 mt-1' : 'font-engScript text-xl text-gold mt-1'}`}>
              {lang === 'bn' ? 'স্নেহ, শ্রদ্ধা ও দোয়ায়' : 'With Love & Prayers'}
            </p>
          </div>

        </TiltCard>
      </div>
    </section>
  );
}
