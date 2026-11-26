import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from '../../config';
import { useInViewLoop } from '../../hooks/useInViewLoop';
import { TealWeddingBus } from '../svg/VehiclesSVG';
import { EventActionButtons } from './EventActionButtons';
import { EventSequenceBar } from './EventSequenceBar';

gsap.registerPlugin(ScrollTrigger);

export function S07BouBhat() {
  const event = weddingConfig.events[2];
  const { ref: viewRef, inView } = useInViewLoop();
  const sectionRef = useRef(null);
  const busRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      gsap.fromTo(
        busRef.current,
        { x: -160, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.95,
          ease: 'back.out(1.25)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', once: true },
        }
      );

      gsap.fromTo(
        cardRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={(node) => {
        viewRef.current = node;
        sectionRef.current = node;
      }}
      className={`scene-section overflow-hidden ${inView ? '' : 'is-paused'}`}
      aria-label={event.title}
    >
      <div className="relative w-full max-w-[348px]">
        <EventSequenceBar activeStep={3} />

        {/* Sliding Bus with Passengers */}
        <div ref={busRef} className="mb-2 flex justify-center">
          <TealWeddingBus />
        </div>

        {/* Modern Deep Maroon & Gold 2-Column Bento Card (No Green / No Yellow) */}
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-2xl border-[2.5px] border-[#D4AF37] bg-gradient-to-b from-[#4F0E26] via-[#3A091B] to-[#260612] px-4 py-5 text-[#FFF7EC] shadow-2xl"
        >
          <div
            className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-[#D4AF37]/40"
            aria-hidden="true"
          />

          <div className="relative z-10 flex items-center justify-between gap-2">
            <h3 className="font-display text-3xl text-[#FFF7EC]">{event.title}</h3>
            <span className="font-heading rounded-full border border-[#D4AF37]/70 bg-black/30 px-3 py-0.5 text-xs font-bold text-[#D4AF37]">
              ধাপ ৩ / ৩ • তৃতীয় পর্ব
            </span>
          </div>

          <div className="relative z-10 mt-3.5 grid grid-cols-2 gap-2.5 text-left">
            <div className="rounded-xl border border-[#D4AF37]/50 bg-black/25 p-3">
              <p className="font-heading text-[11px] font-bold text-[#D4AF37]">📅 তারিখ</p>
              <p className="font-body mt-1 text-xs font-semibold leading-snug text-[#FFF7EC]">
                {event.date}
              </p>
            </div>

            <div className="rounded-xl border border-[#D4AF37]/50 bg-black/25 p-3">
              <p className="font-heading text-[11px] font-bold text-[#D4AF37]">⏰ সময়</p>
              <p className="font-body mt-1 text-xs font-semibold leading-snug text-[#FFF7EC]">
                {event.time}
              </p>
            </div>

            <div className="col-span-2 rounded-xl border border-[#D4AF37]/50 bg-black/25 p-3">
              <p className="font-heading text-[11px] font-bold text-[#D4AF37]">📍 ভেন্যু</p>
              <p className="font-body mt-1 text-xs font-semibold leading-snug text-[#FFF7EC]">
                {event.venueName} • {event.address}
              </p>
            </div>
          </div>
        </div>

        <EventActionButtons
          mapUrl={event.mapUrl}
          icsData={event.icsData}
          icsFilename="Sakib-Easha-Bou-Bhat.ics"
        />
      </div>
    </section>
  );
}
