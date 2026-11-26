import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from '../../config';
import { EventActionButtons } from './EventActionButtons';
import { EventSequenceBar, NextStepConnector } from './EventSequenceBar';

gsap.registerPlugin(ScrollTrigger);

export function S06Wedding() {
  const event = weddingConfig.events[1];
  const sectionRef = useRef(null);
  const wheelLeftRef = useRef(null);
  const wheelRightRef = useRef(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      gsap.fromTo(
        '.s6-panel',
        { y: -24, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 74%', once: true },
        }
      );

      gsap.fromTo(
        [wheelLeftRef.current, wheelRightRef.current],
        { rotate: -220, opacity: 0 },
        {
          rotate: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const rows = [
    { icon: '📅', label: 'তারিখ', text: event.date },
    { icon: '⏰', label: 'সময়', text: event.time },
    { icon: '📍', label: 'ভেন্যু', text: `${event.venueName} • ${event.address}` },
  ];

  return (
    <section ref={sectionRef} className="scene-section" aria-label={event.title}>
      <div className="flex w-full max-w-[348px] flex-col items-center">
        <EventSequenceBar activeStep={2} />

        {/* Modern Royal Maroon & Burnished Gold Card */}
        <div className="relative z-10 w-full overflow-hidden rounded-t-[90px] rounded-b-2xl border-[2.5px] border-[#D4AF37] bg-gradient-to-b from-[#4F0E26] via-[#3A091B] to-[#260612] p-4 text-[#FFF7EC] shadow-2xl">
          <div
            className="pointer-events-none absolute inset-2 rounded-t-[82px] rounded-b-xl border border-dashed border-[#D4AF37]/45"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center pt-1">
            <span className="font-heading rounded-full border border-[#D4AF37]/70 bg-black/30 px-4 py-0.5 text-xs font-bold text-[#D4AF37]">
              ধাপ ২ / ৩ • দ্বিতীয় পর্ব
            </span>

            <h3 className="s6-panel font-display mt-2 text-4xl leading-tight text-[#FFF7EC]">
              {event.title}
            </h3>

            <div className="my-2 h-px w-24 bg-[#D4AF37]/50" />
          </div>

          {/* Uniform Glassmorphic Maroon-Gold Info Rows */}
          <div className="relative z-10 mt-2 space-y-2">
            {rows.map((row) => (
              <div
                key={row.label}
                className="s6-panel flex items-center gap-3 rounded-xl border border-[#D4AF37]/50 bg-black/25 px-3.5 py-2.5 shadow"
              >
                <span className="text-lg leading-none" aria-hidden="true">{row.icon}</span>
                <div className="text-left">
                  <p className="font-heading text-[10px] font-bold text-[#D4AF37]">{row.label}</p>
                  <p className="font-heading text-sm font-bold leading-snug text-[#FFF7EC]">{row.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Twin Decorative Gold-Maroon Wheels + Action Buttons */}
          <div className="relative z-10 mt-3 rounded-xl border border-[#D4AF37]/40 bg-black/25 px-3 pt-2.5 pb-3">
            <div className="mb-1 flex items-center justify-between px-4">
              {[wheelLeftRef, wheelRightRef].map((refItem, idx) => (
                <div
                  key={idx}
                  ref={refItem}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#260612] shadow"
                >
                  <div className="h-3.5 w-3.5 rounded-full bg-[#D4AF37]" />
                </div>
              ))}
            </div>

            <EventActionButtons
              mapUrl={event.mapUrl}
              icsData={event.icsData}
              icsFilename="Sakib-Easha-Wedding.ics"
            />
          </div>
        </div>

        <NextStepConnector nextLabel="৩য় পর্ব • বউভাত (২৭ ডিসেম্বর)" />
      </div>
    </section>
  );
}
