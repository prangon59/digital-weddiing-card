import React from 'react';
import { useWedding } from '../context/WeddingContext';
import { MapPin, Navigation, Phone, Train, Bus, Hotel } from 'lucide-react';
import TiltCard from './TiltCard';

export default function VenueMap() {
  const { lang, weddingConfig, t } = useWedding();
  const { travelNotes, ui } = weddingConfig;

  return (
    <section id="venue" className="relative py-20 sm:py-24 px-4 bg-[#1C050B]">
      <div className="max-w-4xl mx-auto">
        {/* Header (Clean Single Language) */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3D101C]/80 border border-gold/40 text-xs font-semibold text-gold mb-3 shadow-md">
            <MapPin className="w-3.5 h-3.5 text-yellow-400" />
            <span>{t(ui.venueMap.heading)}</span>
          </div>

          <h2 className={`${lang === 'bn' ? 'font-banglaHeading text-2xl sm:text-4xl' : 'font-engHeading text-3xl sm:text-5xl'} font-bold gold-foil-text tracking-tight`}>
            {t(ui.venueMap.heading)}
          </h2>

          <p className="font-banglaBody text-xs sm:text-sm text-cream-200/80 mt-2 max-w-lg mx-auto">
            {t(ui.venueMap.subheading)}
          </p>
        </div>

        {/* Interactive Google Map Embedding Card */}
        <TiltCard className="bg-gradient-to-b from-[#2B0E14] via-[#350F18] to-[#1F070C] rounded-3xl p-5 sm:p-7 border-2 border-gold/45 shadow-3d-card mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold border border-gold/40 bg-[#1C050B] text-gold mb-1">
                {lang === 'bn' ? 'অনুষ্ঠানস্থল' : 'Event Location'}
              </span>
              <h3 className={`${lang === 'bn' ? 'font-banglaHeading' : 'font-engHeading'} text-lg sm:text-xl font-bold text-cream-100`}>
                {lang === 'bn' ? 'পারিবারিক বাসভবন • খুলনা, বাংলাদেশ' : 'Family Residence • Khulna, Bangladesh'}
              </h3>
              <p className="text-xs text-cream-300/80 font-mono mt-0.5">
                22.8088° N, 89.5471° E
              </p>
            </div>

            <a
              href={travelNotes.mapDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-[#24090F] text-xs font-bold shadow-md hover:shadow-lg active:scale-95 transition-all border border-yellow-200 self-start sm:self-auto shrink-0"
            >
              <Navigation className="w-4 h-4" />
              <span>{t(ui.venueMap.getDirections)}</span>
            </a>
          </div>

          {/* Embedded Google Map iframe */}
          <div className="overflow-hidden rounded-2xl border-2 border-gold/30 shadow-inner bg-[#150307]">
            <iframe
              src={`https://maps.google.com/maps?q=${travelNotes.coordinates.lat},${travelNotes.coordinates.lng}&hl=${lang}&z=16&output=embed`}
              width="100%"
              height="340"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Khulna Venue Location Map"
              className="w-full h-64 sm:h-80"
            />
          </div>
        </TiltCard>

        {/* Travel Guide for Out-of-town & Far-Away Guests */}
        <TiltCard className="bg-[#24090F] rounded-3xl p-6 sm:p-8 border border-gold/30 shadow-3d-card">
          <h3 className={`${lang === 'bn' ? 'font-banglaHeading' : 'font-engHeading'} text-lg sm:text-2xl font-bold gold-foil-text mb-5 flex items-center gap-2.5`}>
            <Bus className="w-5 h-5 text-gold shrink-0" />
            <span>{t(ui.venueMap.travelGuideTitle)}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            {/* Bus Stands */}
            <div className="p-4 rounded-2xl bg-[#1C050B] border border-gold/25 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-gold font-semibold mb-2">
                  <Bus className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span className="font-semibold">{t(ui.venueMap.busLabel)}</span>
                </div>
                <p className="text-cream-200/90 font-banglaBody text-xs sm:text-sm leading-relaxed">
                  {travelNotes.bus[lang]}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-gold/15">
                <span className="text-[11px] text-yellow-300/80 font-medium">
                  {lang === 'bn' ? 'সোনাডাঙ্গা • রয়েল • শিববাড়ি • গল্লামারি' : 'Sonadanga • Royal • Shibbari • Gollamari'}
                </span>
              </div>
            </div>

            {/* Railway Station */}
            <div className="p-4 rounded-2xl bg-[#1C050B] border border-gold/25 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-gold font-semibold mb-2">
                  <Train className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span className="font-semibold">{t(ui.venueMap.railwayLabel)}</span>
                </div>
                <p className="text-cream-200/90 font-banglaBody text-xs sm:text-sm leading-relaxed">
                  {travelNotes.railway[lang]}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-gold/15">
                <span className="text-[11px] text-yellow-300/80 font-medium">
                  {lang === 'bn' ? 'খুলনা স্টেশন থেকে ইজিবাইক/রিকশা সহজলভ্য' : 'Easy transit from station to venue'}
                </span>
              </div>
            </div>

            {/* Stay & Accommodation */}
            <div className="p-4 rounded-2xl bg-[#1C050B] border border-gold/25 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-gold font-semibold mb-2">
                  <Hotel className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span className="font-semibold">{t(ui.venueMap.stayLabel)}</span>
                </div>
                <p className="text-cream-200/90 font-banglaBody text-xs sm:text-sm leading-relaxed">
                  {travelNotes.accommodation[lang]}
                </p>
              </div>

              <a
                href={`tel:${travelNotes.stayContactPhone}`}
                className="inline-flex items-center justify-center gap-2 p-2.5 rounded-xl bg-gold/15 hover:bg-gold/25 border border-gold/40 text-xs text-yellow-300 font-semibold mt-3 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>{travelNotes.stayContactPhone}</span>
              </a>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
