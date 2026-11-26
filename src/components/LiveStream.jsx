import React from 'react';
import { useWedding } from '../context/WeddingContext';
import { Radio, Video, ExternalLink } from 'lucide-react';
import TiltCard from './TiltCard';

export default function LiveStream() {
  const { lang, weddingConfig, t } = useWedding();
  const { liveStream, ui } = weddingConfig;

  if (!liveStream.enabled) return null;

  return (
    <section id="live" className="relative py-20 px-4 bg-[#1A050B]">
      <div className="max-w-2xl mx-auto text-center">
        {/* Section Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3D101C]/80 border border-gold/40 text-xs font-semibold text-gold mb-3 shadow-md">
          <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>{t(ui.liveStreamSection.heading)}</span>
        </div>

        {/* Heading (Clean Single Language) */}
        <div className="mb-2">
          <h2 className={`${lang === 'bn' ? 'font-banglaHeading text-2xl sm:text-4xl' : 'font-engHeading text-3xl sm:text-4xl'} font-bold gold-foil-text tracking-tight`}>
            {t(ui.liveStreamSection.heading)}
          </h2>
        </div>

        <p className="font-banglaBody text-xs sm:text-sm text-cream-200/80 max-w-lg mx-auto mb-8">
          {t(liveStream.description)}
        </p>

        {/* 3D Live Broadcast Card */}
        <TiltCard className="relative bg-gradient-to-b from-[#2B0E14] via-[#350F18] to-[#1F070C] rounded-3xl p-6 sm:p-8 border-2 border-gold/45 shadow-3d-card overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C050B] border border-gold/40 text-xs font-semibold text-gold mb-4 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span>{t(liveStream.badgeText)}</span>
          </div>

          <div className="my-4">
            <Video className="w-12 h-12 text-gold mx-auto mb-3 opacity-90 drop-shadow-md" />
            <p className="font-banglaBody text-sm sm:text-base font-semibold text-cream-100">
              {lang === 'bn'
                ? 'অনুষ্ঠানের দিন এই লিংকে সরাসরি লাইভ সম্প্রচার উপভোগ করতে পারবেন'
                : 'The ceremony live stream link will be activated here on the wedding days.'}
            </p>
          </div>

          <a
            href={liveStream.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-[#24090F] font-bold text-xs sm:text-sm shadow-3d-gold active:scale-95 transition-all mt-4 border border-yellow-200"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{t(ui.liveStreamSection.btnWatch)}</span>
          </a>
        </TiltCard>
      </div>
    </section>
  );
}
