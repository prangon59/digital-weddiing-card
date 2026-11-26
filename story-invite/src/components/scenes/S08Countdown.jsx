import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from '../../config';
import { getCountdownParts } from '../../utils/bnFormat';
import { DhakaSkyline } from '../svg/SkylineAndScenerySVG';

gsap.registerPlugin(ScrollTrigger);

export function S08Countdown() {
  const [countdown, setCountdown] = useState(() =>
    getCountdownParts(weddingConfig.countdownTarget)
  );
  const sectionRef = useRef(null);
  const skylineRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdownParts(weddingConfig.countdownTarget));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      gsap.fromTo(
        skylineRef.current,
        { y: 24 },
        {
          y: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const boxes = [
    { label: 'দিন', value: countdown.days },
    { label: 'ঘণ্টা', value: countdown.hours },
    { label: 'মিনিট', value: countdown.minutes },
    { label: 'সেকেন্ড', value: countdown.seconds },
  ];

  return (
    <section
      ref={sectionRef}
      className="scene-section relative overflow-hidden"
      aria-label="দিন গুনছি"
    >
      {/* Parallax Dhaka Skyline */}
      <div ref={skylineRef} className="pointer-events-none absolute inset-x-0 bottom-8 opacity-65">
        <DhakaSkyline fill="#6B2B44" />
      </div>

      <div className="relative z-10 w-full max-w-[356px] rounded-3xl border-[2.5px] border-[#D4AF37] bg-gradient-to-b from-[#4F0E26] via-[#3A091B] to-[#260612] px-4 py-6 text-center text-[#FFF7EC] shadow-2xl">
        <p className="font-heading text-xs font-bold tracking-widest text-[#D4AF37]">
          শুভ ক্ষণের অপেক্ষায়
        </p>
        <h2 className="font-display mt-1 text-4xl text-[#FFF7EC]">দিন গুনছি</h2>
        <p className="font-heading mt-1 inline-block rounded-full border border-[#D4AF37]/50 bg-black/25 px-3.5 py-0.5 text-xs font-bold text-[#E5C17B]">
          শুভ বিবাহ • শুক্রবার, ২৫ ডিসেম্বর ২০২৬
        </p>

        {countdown.isPast ? (
          <div className="mt-5 rounded-2xl border border-[#D4AF37] bg-black/30 px-4 py-5 text-[#D4AF37] shadow">
            <p className="font-heading text-lg font-bold">
              আলহামদুলিল্লাহ, শুভ বিবাহ সম্পন্ন
            </p>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-4 gap-2">
            {boxes.map((b) => (
              <div key={b.label} className="flex flex-col items-center">
                {/* Maroon & Burnished Gold Dome Sign */}
                <div className="flex h-20 w-full flex-col items-center justify-center rounded-t-[28px] rounded-b-xl border border-[#D4AF37] bg-[#260612] text-[#FFF7EC] shadow-md">
                  <span
                    key={`${b.label}-${b.value}`}
                    className="font-heading inline-block text-2xl font-extrabold leading-none text-[#D4AF37]"
                    style={{ animation: 'flipTick 0.3s ease-out' }}
                  >
                    {b.value}
                  </span>
                  <span className="font-body mt-1 text-[11px] font-bold text-[#FFF7EC]/90">
                    {b.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes flipTick {
          0% { transform: rotateX(40deg) scale(0.96); }
          100% { transform: rotateX(0deg) scale(1); }
        }
      `}</style>
    </section>
  );
}
