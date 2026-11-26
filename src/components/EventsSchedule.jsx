import React from 'react';
import { useWedding } from '../context/WeddingContext';
import { generateIcsFile } from '../utils/helpers';
import { Calendar, Clock, MapPin, ExternalLink, Download, Sparkles, Heart, Crown } from 'lucide-react';
import TiltCard from './TiltCard';

export default function EventsSchedule() {
  const { lang, invitedEvents, weddingConfig, t } = useWedding();
  const { ui } = weddingConfig;

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-yellow-400" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-rose-400" />;
      case 'Crown':
        return <Crown className="w-5 h-5 text-gold" />;
      default:
        return <Calendar className="w-5 h-5 text-gold" />;
    }
  };

  return (
    <section id="schedule" className="relative py-24 px-4 bg-[#1C050B]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header (Clean Single Language) */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3D101C]/80 border border-gold/40 text-xs font-semibold text-gold mb-3 shadow-md">
            <Calendar className="w-3.5 h-3.5 text-yellow-400" />
            <span>{t(ui.events.heading)}</span>
          </div>

          <h2 className={`${lang === 'bn' ? 'font-banglaHeading text-2xl sm:text-4xl' : 'font-engHeading text-3xl sm:text-5xl'} font-bold gold-foil-text tracking-tight`}>
            {t(ui.events.heading)}
          </h2>

          <p className="font-banglaBody text-xs sm:text-sm text-cream-200/80 mt-2 max-w-lg mx-auto">
            {t(ui.events.subheading)}
          </p>
        </div>

        {/* 3D Filtered Invited Event Cards Grid (Only shows events included in guest's link!) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {invitedEvents.map((event) => {
            return (
              <TiltCard
                key={event.id}
                className="relative flex flex-col justify-between bg-gradient-to-b from-[#2B0E14] via-[#350F18] to-[#1C050B] rounded-3xl p-6 border-2 border-gold/45 shadow-3d-card transition-all duration-300 hover:border-gold"
              >
                <div>
                  {/* Top Badge & Letter */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border border-gold/50 bg-[#1C050B] text-gold shadow-sm">
                      {renderIcon(event.icon)}
                      <span>{event.title[lang]}</span>
                    </span>
                    <span className="text-[11px] font-mono text-gold/80 px-2 py-0.5 rounded-full bg-gold/10 border border-gold/30">
                      {event.date}
                    </span>
                  </div>

                  {/* Event Title (Language decides Primary Headline / Secondary Subheading) */}
                  <div className="mb-2">
                    {lang === 'en' ? (
                      <div>
                        <h3 className="font-engHeading text-2xl font-bold gold-foil-text leading-tight">
                          {event.title.en}
                        </h3>
                        <p className="font-banglaHeading text-sm text-gold mt-0.5 leading-normal">
                          {event.title.bn}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-banglaHeading text-xl font-bold gold-foil-text leading-snug">
                          {event.title.bn}
                        </h3>
                        <p className="font-engHeading text-sm text-gold mt-0.5 tracking-wide">
                          {event.title.en}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Subtitle */}
                  <p className="text-xs text-yellow-300/85 font-serif italic mb-5">
                    {t(event.subtitle)}
                  </p>

                  {/* Date & Time with Icons */}
                  <div className="space-y-3 text-xs sm:text-sm text-cream-100 mb-6 p-4 rounded-2xl bg-[#1C050B]/80 border border-gold/25">
                    <div className="flex items-start gap-2.5">
                      <Calendar className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">{event.dateDisplay[lang]}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-cream-200 font-banglaBody">
                          {event.timeDisplay[lang]}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <p className={`font-semibold ${event.isVenueTBA ? 'text-yellow-300 italic' : 'text-cream-100'}`}>
                          {event.venueName[lang]}
                        </p>
                        <p className="text-xs text-cream-300/70 mt-0.5">
                          {event.venueAddress[lang]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Add to Calendar & Google Maps */}
                <div className="space-y-2 pt-4 border-t border-gold/20">
                  {/* Add to Calendar (.ics) */}
                  <button
                    onClick={() => generateIcsFile(event, weddingConfig)}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#3D101C] hover:bg-[#4E1424] text-cream-100 text-xs font-semibold border border-gold/35 active:scale-95 transition-all min-h-[44px]"
                  >
                    <Download className="w-3.5 h-3.5 text-gold" />
                    <span>{t(ui.events.addToCalendar)}</span>
                  </button>

                  {/* Google Maps Link / TBA badge */}
                  {event.isVenueTBA ? (
                    <div className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#1C050B] text-yellow-300 text-xs font-medium border border-gold/20 min-h-[44px]">
                      <span>{t(ui.events.venueTBA)}</span>
                    </div>
                  ) : (
                    <a
                      href={event.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-[#24090F] text-xs font-bold border border-yellow-200 active:scale-95 transition-all min-h-[44px] shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{t(ui.events.openMaps)}</span>
                    </a>
                  )}
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
