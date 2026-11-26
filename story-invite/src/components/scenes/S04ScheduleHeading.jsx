import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function S04ScheduleHeading() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      gsap.fromTo(
        stageRef.current,
        { y: 70, rotateX: 25, opacity: 0 },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 76%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const chapters = [
    { step: '১ম পর্ব', label: 'গায়ে হলুদ', date: '২৩ ডিসেম্বর' },
    { step: '২য় পর্ব', label: 'বিয়ে', date: '২৫ ডিসেম্বর' },
    { step: '৩য় পর্ব', label: 'বউভাত', date: '২৭ ডিসেম্বর' },
  ];

  return (
    <section
      ref={sectionRef}
      className="scene-section scene-section--compact"
      style={{ perspective: '900px' }}
      aria-label="অনুষ্ঠানসূচি"
    >
      <div
        ref={stageRef}
        className="relative w-full max-w-[348px] overflow-hidden rounded-3xl border-[2.5px] border-[#D4AF37] bg-gradient-to-b from-[#4F0E26] via-[#3A091B] to-[#260612] px-5 py-7 text-center text-[#FFF7EC] shadow-2xl"
        style={{ transformOrigin: 'bottom center' }}
      >
        <div
          className="pointer-events-none absolute inset-2 rounded-2xl border border-dashed border-[#D4AF37]/45"
          aria-hidden="true"
        />

        <p className="font-heading text-xs font-bold tracking-widest text-[#D4AF37]">
          আনন্দের তিন দিন
        </p>
        <h2 className="font-display mt-1 text-4xl text-[#FFF7EC]">অনুষ্ঠানসূচি</h2>
        <p className="font-body mt-1.5 text-sm text-[#E5C17B]">
          গায়ে হলুদ, শুভ বিবাহ ও বউভাতের সাদর সময়সূচি
        </p>

        {/* Three Modern Maroon & Gold Chapter Pills */}
        <div className="relative z-10 mt-5 grid grid-cols-3 gap-2">
          {chapters.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center rounded-2xl border border-[#D4AF37]/70 bg-black/30 px-2 py-3 shadow"
            >
              <span className="font-heading rounded-full bg-[#D4AF37] px-2 py-0.5 text-[10px] font-bold text-[#260612]">
                {item.step}
              </span>
              <span className="font-heading mt-1.5 text-sm font-bold text-[#FFF7EC]">
                {item.label}
              </span>
              <span className="font-body mt-0.5 text-[10px] text-[#E5C17B]">
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
