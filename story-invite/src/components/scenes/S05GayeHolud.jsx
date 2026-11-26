import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from '../../config';
import { EventActionButtons } from './EventActionButtons';
import { EventSequenceBar, NextStepConnector } from './EventSequenceBar';

gsap.registerPlugin(ScrollTrigger);

export function S05GayeHolud() {
  const event = weddingConfig.events[0];
  const sectionRef = useRef(null);
  const stallRef = useRef(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      gsap.fromTo(
        stallRef.current,
        { scale: 0.92, rotate: -2, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', once: true },
        }
      );

      gsap.fromTo(
        '.s5-chalk-line',
        { clipPath: 'inset(0 100% 0 0)', opacity: 0.3 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 0.75,
          stagger: 0.14,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="scene-section" aria-label={event.title}>
      <div ref={stallRef} className="w-full max-w-[348px]">
        <EventSequenceBar activeStep={1} />

        {/* Gold-Trimmed Maroon Arch Header */}
        <div className="relative z-10 mx-auto w-[96%] rounded-t-2xl border-2 border-[#D4AF37] bg-gradient-to-r from-[#3A091B] via-[#5C112C] to-[#3A091B] px-4 py-2.5 shadow-md">
          <div className="flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
            <span className="font-heading text-xs font-bold tracking-widest text-[#D4AF37]">
              ধাপ ১ / ৩ • প্রথম পর্ব
            </span>
            <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
          </div>
        </div>

        {/* Modern Deep Maroon & Gold Card */}
        <div className="relative rounded-b-2xl border-x-[2.5px] border-b-[2.5px] border-[#D4AF37] bg-gradient-to-b from-[#4F0E26] via-[#3A091B] to-[#260612] px-5 pt-5 pb-5 text-center text-[#FFF7EC] shadow-2xl">
          <div
            className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-[#D4AF37]/40"
            aria-hidden="true"
          />

          <h3 className="s5-chalk-line font-display text-4xl text-[#D4AF37] drop-shadow">
            {event.title}
          </h3>

          <div className="mx-auto my-2.5 h-px w-28 bg-[#D4AF37]/50" />

          <p className="s5-chalk-line font-heading text-lg font-bold text-[#FFF7EC]">
            {event.date}
          </p>
          <p className="s5-chalk-line font-body mt-1 text-sm font-medium text-[#E5C17B]">
            সময়: {event.time}
          </p>
          <p className="s5-chalk-line font-body mt-2 text-sm text-[#FFF7EC]">
            {event.venueName}
          </p>
          <p className="s5-chalk-line font-body text-xs text-[#E5C17B]/90">
            {event.address}
          </p>
        </div>

        <EventActionButtons
          mapUrl={event.mapUrl}
          icsData={event.icsData}
          icsFilename="Sakib-Easha-Gaye-Holud.ics"
        />

        <NextStepConnector nextLabel="২য় পর্ব • বিয়ে (২৫ ডিসেম্বর)" />
      </div>
    </section>
  );
}
