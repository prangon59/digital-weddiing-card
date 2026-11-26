import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from '../../config';
import { useInViewLoop } from '../../hooks/useInViewLoop';
import { EventActionButtons } from './EventActionButtons';

gsap.registerPlugin(ScrollTrigger);

export function S09Venue() {
  const { ref: viewRef, inView } = useInViewLoop();
  const sectionRef = useRef(null);
  const boardRef = useRef(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      gsap.fromTo(
        boardRef.current,
        { y: -85, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', once: true },
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
      className={`scene-section ${inView ? '' : 'is-paused'}`}
      aria-label="অনুষ্ঠানস্থল"
    >
      <div ref={boardRef} className="anim-pendulum w-full max-w-[348px]">
        {/* Highway Sign Suspension Struts */}
        <div className="mx-auto flex w-44 justify-between">
          <span className="h-7 w-1.5 rounded-t bg-[#D4AF37]/80" />
          <span className="h-7 w-1.5 rounded-t bg-[#D4AF37]/80" />
        </div>

        {/* Modern Deep Maroon & Burnished Gold Venue Signboard */}
        <div className="rounded-t-2xl border-[2.5px] border-[#D4AF37] bg-gradient-to-b from-[#4F0E26] via-[#3A091B] to-[#260612] px-5 py-6 text-center text-[#FFF7EC] shadow-2xl">
          <span className="font-heading inline-block rounded-full border border-[#D4AF37]/70 bg-black/30 px-3.5 py-0.5 text-xs font-bold text-[#D4AF37]">
            অনুষ্ঠানস্থল • গায়ে হলুদ ও বউভাত
          </span>

          <h2 className="font-heading mt-3 text-xl font-extrabold leading-snug text-[#FFF7EC]">
            {weddingConfig.mainVenue.name}
          </h2>

          <p className="font-body mt-1.5 text-sm font-semibold text-[#E5C17B]">
            {weddingConfig.mainVenue.address}
          </p>
        </div>

        {/* Gold-Bordered Action Sub-bar */}
        <div className="mx-auto -mt-0.5 w-full rounded-b-2xl border-x-[2.5px] border-b-[2.5px] border-[#D4AF37] bg-[#260612] px-3 pt-1 pb-3 shadow-lg">
          <EventActionButtons
            mapUrl={weddingConfig.mainVenue.mapUrl}
            icsData={weddingConfig.mainVenue.icsData}
            icsFilename="Sakib-Easha-Venue.ics"
          />
        </div>
      </div>
    </section>
  );
}
