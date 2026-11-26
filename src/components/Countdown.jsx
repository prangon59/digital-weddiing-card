import React, { useState, useEffect } from 'react';
import { useWedding } from '../context/WeddingContext';
import { Clock, Heart, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';

export default function Countdown() {
  const { lang, targetEvent, weddingConfig, t, toNum } = useWedding();
  const { ui } = weddingConfig;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    if (!targetEvent || !targetEvent.icsStartTime) return;

    const targetDate = new Date(targetEvent.icsStartTime).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetEvent]);

  return (
    <section id="countdown" className="relative py-20 px-4 bg-gradient-to-b from-[#1C050B] via-[#24090F] to-[#1C050B]">
      <div className="max-w-xl mx-auto text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3D101C]/80 border border-gold/40 text-xs font-semibold text-gold mb-3 shadow-md">
          <Clock className="w-3.5 h-3.5 text-yellow-400" />
          <span>{t(ui.countdown.heading)}</span>
        </div>

        {/* Clean Single-Language Header */}
        <div className="mb-2">
          <h2 className={`${lang === 'bn' ? 'font-banglaHeading text-2xl sm:text-4xl' : 'font-engHeading text-3xl sm:text-5xl'} font-bold gold-foil-text tracking-tight`}>
            {lang === 'bn' ? 'শুভ ক্ষণের ক্ষণগণনা' : 'Counting Down the Moments'}
          </h2>
        </div>

        {/* Target Event Title (Single Language) */}
        <div className="my-2">
          <h3 className={`${lang === 'bn' ? 'font-banglaHeading text-lg sm:text-xl' : 'font-engHeading text-xl sm:text-2xl'} font-bold text-cream-100`}>
            {lang === 'bn' ? `বাকি আর মাত্র: ${targetEvent.title.bn}` : `Until ${targetEvent.title.en}`}
          </h3>
        </div>
        <p className={`text-xs sm:text-sm text-cream-200/80 mb-8 ${lang === 'bn' ? 'font-banglaBody' : 'font-serif'}`}>
          {targetEvent.dateDisplay[lang]} • {targetEvent.timeDisplay[lang]}
        </p>

        {timeLeft.isExpired ? (
          /* "We are married!" State */
          <TiltCard className="p-8 rounded-3xl bg-[#2B0E14] border-2 border-gold shadow-3d-gold animate-fade-in">
            <Heart className="w-12 h-12 fill-maroon text-gold mx-auto mb-3 animate-bounce" />
            <h4 className="font-banglaHeading text-2xl font-bold gold-foil-text">
              {t(ui.countdown.marriedState)}
            </h4>
            <p className="font-banglaBody text-sm text-cream-200 mt-2 max-w-md mx-auto">
              {t(ui.countdown.marriedSubtext)}
            </p>
          </TiltCard>
        ) : (
          /* Live 4-Block 3D Countdown Grid */
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
            {[
              { label: t(ui.countdown.days), val: timeLeft.days },
              { label: t(ui.countdown.hours), val: timeLeft.hours },
              { label: t(ui.countdown.minutes), val: timeLeft.minutes },
              { label: t(ui.countdown.seconds), val: timeLeft.seconds },
            ].map((unit, index) => (
              <TiltCard
                key={index}
                className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-[#2B0E14] to-[#1A050B] border border-gold/50 shadow-3d-card"
              >
                <span className="font-mono text-2xl sm:text-4xl font-bold gold-foil-text leading-none tracking-tight">
                  {toNum(unit.val)}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-gold/90 mt-1 uppercase tracking-wider">
                  {unit.label}
                </span>
              </TiltCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
