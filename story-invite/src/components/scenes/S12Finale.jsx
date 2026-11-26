import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../../config';
import { useInViewLoop } from '../../hooks/useInViewLoop';
import { toBanglaNumber } from '../../utils/bnFormat';
import { triggerHaptic } from '../../utils/haptics';

gsap.registerPlugin(ScrollTrigger);

export function S12Finale({ onScrollTop, guest }) {
  const { ref: viewRef, inView } = useInViewLoop();
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const firedRef = useRef(false);

  const invitedEvents = weddingConfig.events.filter(
    (ev) => !guest?.invitedIds || guest.invitedIds.includes(ev.id)
  );
  const maxGuests = guest?.maxGuests || 10;

  // Interactive RSVP state (from final/ Google Sheets + WhatsApp flow)
  const [guestName, setGuestName] = useState(guest?.name || '');
  const [attendance, setAttendance] = useState(() =>
    Object.fromEntries(
      weddingConfig.events.map((ev) => [ev.id, { attending: true, count: 1 }])
    )
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        gsap.fromTo(
          cardRef.current,
          { y: -36, rotate: -2, opacity: 0 },
          {
            y: 0,
            rotate: 0,
            opacity: 1,
            duration: 0.95,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 72%',
              once: true,
              onEnter: () => {
                if (!firedRef.current) {
                  firedRef.current = true;
                  confetti({
                    particleCount: 65,
                    spread: 72,
                    origin: { y: 0.55 },
                    colors: ['#D4AF37', '#FFF7EC', '#4F0E26', '#E5C17B'],
                  });
                }
              },
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleEvent = (id) => {
    triggerHaptic(10);
    setAttendance((prev) => ({
      ...prev,
      [id]: { ...prev[id], attending: !prev[id].attending },
    }));
  };

  const changeCount = (id, delta) => {
    triggerHaptic(10);
    setAttendance((prev) => {
      const next = Math.max(1, Math.min(maxGuests, prev[id].count + delta));
      return { ...prev, [id]: { ...prev[id], count: next } };
    });
  };

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    const cleanName = guestName.trim();
    if (!cleanName) return;

    triggerHaptic(10);
    setIsSubmitting(true);

    const attendingLines = [];
    const declinedLines = [];
    for (const ev of invitedEvents) {
      const state = attendance[ev.id];
      if (state?.attending) {
        attendingLines.push(`${ev.title} (${toBanglaNumber(state.count)} জন)`);
      } else {
        declinedLines.push(ev.title);
      }
    }

    const payload = {
      guestName: cleanName,
      attendingDetails:
        attendingLines.length > 0 ? attendingLines.join('; ') : 'উপস্থিত হতে পারছি না',
      declinedDetails: declinedLines.length > 0 ? declinedLines.join('; ') : 'কোনোটিই নয়',
      language: 'bn',
    };

    try {
      await fetch(weddingConfig.rsvpWebhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
    } catch {
      // Gracefully show confirmation even if offline/blocked
    } finally {
      setIsSubmitting(false);
      setSubmittedSummary({
        name: cleanName,
        attendingLines,
        declinedLines,
      });
    }
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(`${weddingConfig.shareText} ${currentUrl}`)}`;

  return (
    <section
      ref={(node) => {
        viewRef.current = node;
        sectionRef.current = node;
      }}
      className={`scene-section relative pb-12 ${inView ? '' : 'is-paused'}`}
      aria-label="সমাপনী আমন্ত্রণ ও উপস্থিতি নিশ্চিতকরণ"
    >
      <div
        ref={cardRef}
        className="flex w-full max-w-[356px] flex-col items-center rounded-t-[105px] rounded-b-3xl border-[2.5px] border-[#D4AF37] bg-gradient-to-b from-[#4F0E26] via-[#3A091B] to-[#260612] p-4 text-center text-[#FFF7EC] shadow-2xl"
      >
        {/* Main Finale Message */}
        <div className="w-full rounded-t-[90px] rounded-b-2xl border border-dashed border-[#D4AF37]/50 bg-black/20 px-4 pt-6 pb-5">
          <p className="text-xs text-[#D4AF37]" aria-hidden="true">✦ ❦ ✦</p>

          <h2 className="font-heading mt-1 text-xl font-extrabold text-[#FFF7EC]">
            {weddingConfig.finaleGreeting}
          </h2>

          <div className="mx-auto my-2.5 h-px w-24 bg-[#D4AF37]/60" />

          <p className="font-display text-3xl text-[#D4AF37]">
            {weddingConfig.groomShortName}
            <span className="mx-2 text-2xl text-[#FFF7EC]">ও</span>
            {weddingConfig.brideShortName}
          </p>

          {/* Gold-Bordered Date Badge */}
          <div className="mt-3 inline-block rounded-full border border-[#D4AF37] bg-[#260612] px-4 py-1 shadow">
            <p className="font-heading text-xs font-bold text-[#E5C17B]">
              {weddingConfig.weddingDateDisplay} • {weddingConfig.venueShortName}
            </p>
          </div>

          <p className="font-heading mt-3.5 text-xs font-bold text-[#D4AF37]">
            {weddingConfig.finaleClosing}
          </p>
          <p className="font-body mt-0.5 text-xs font-medium text-[#FFF7EC]/90">
            {weddingConfig.hostFamilyLine}
          </p>
        </div>

        {/* Interactive RSVP Section (from final/) */}
        <div className="mt-4 w-full rounded-2xl border border-[#D4AF37]/60 bg-black/25 p-3.5 text-left text-[#FFF7EC]">
          <div className="text-center">
            <span className="font-heading text-[11px] font-bold tracking-widest text-[#D4AF37]">
              উপস্থিতি নিশ্চিতকরণ (RSVP)
            </span>
            <h3 className="font-heading text-lg font-extrabold text-[#FFF7EC]">
              আপনার উপস্থিতি নিশ্চিত করুন
            </h3>
            <p className="font-body mt-0.5 text-[11px] leading-snug text-[#FFF7EC]/75">
              {weddingConfig.rsvpDeadlineText}
            </p>
          </div>

          {!submittedSummary ? (
            <form onSubmit={handleRsvpSubmit} className="mt-3 space-y-3">
              <div>
                <label
                  htmlFor="rsvp-guest-name"
                  className="font-heading mb-1 block text-xs font-bold text-[#D4AF37]"
                >
                  আপনার নাম
                </label>
                <input
                  id="rsvp-guest-name"
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="আপনার পূর্ণ নাম লিখুন"
                  className="font-body w-full rounded-xl border border-[#D4AF37]/55 bg-[#260612]/90 px-3 py-2.5 text-sm text-[#FFF7EC] placeholder-[#FFF7EC]/45 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <span className="font-heading block text-xs font-bold text-[#D4AF37]">
                  অনুষ্ঠান নির্বাচন ও সদস্য সংখ্যা
                </span>
                {invitedEvents.map((ev) => {
                  const st = attendance[ev.id];
                  return (
                    <div
                      key={ev.id}
                      className={`flex items-center justify-between rounded-xl border px-3 py-2 ${
                        st.attending
                          ? 'border-[#D4AF37] bg-[#4F0E26]/65'
                          : 'border-white/15 bg-black/25 opacity-70'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleEvent(ev.id)}
                        className="flex min-h-[36px] items-center gap-2 text-left"
                      >
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded border text-xs font-bold ${
                            st.attending
                              ? 'border-[#D4AF37] bg-[#D4AF37] text-[#260612]'
                              : 'border-white/40 text-transparent'
                          }`}
                        >
                          ✓
                        </span>
                        <span className="font-heading text-xs font-bold text-[#FFF7EC]">
                          {ev.title}
                        </span>
                      </button>

                      {st.attending && (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => changeCount(ev.id, -1)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#D4AF37]/60 bg-[#260612] text-sm font-bold text-[#D4AF37]"
                            aria-label="সদস্য কমান"
                          >
                            -
                          </button>
                          <span className="font-heading w-6 text-center text-xs font-bold text-[#FFF7EC]">
                            {toBanglaNumber(st.count)}
                          </span>
                          <button
                            type="button"
                            onClick={() => changeCount(ev.id, 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#D4AF37]/60 bg-[#260612] text-sm font-bold text-[#D4AF37]"
                            aria-label="সদস্য বাড়ান"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="sign-btn sign-btn--gold w-full"
              >
                <span>{isSubmitting ? '⏳' : '✨'}</span>
                <span>
                  {isSubmitting ? 'সংরক্ষণ হচ্ছে...' : 'উপস্থিতি নিশ্চিত করুন ✨'}
                </span>
              </button>
            </form>
          ) : (
            <div className="mt-3 space-y-2.5 rounded-xl border border-[#D4AF37] bg-[#260612] p-3 text-center">
              <p className="font-heading text-sm font-extrabold text-[#D4AF37]">
                উপস্থিতি সফলভাবে নিশ্চিত হয়েছে! ✨
              </p>
              <p className="font-body text-xs text-[#FFF7EC]/90">
                ধন্যবাদ, <strong>{submittedSummary.name}</strong>! আপনার তথ্য অতিথি তালিকায় সংরক্ষিত হয়েছে।
              </p>
              {submittedSummary.attendingLines.length > 0 && (
                <p className="font-body text-[11px] text-[#E5C17B]">
                  উপস্থিতি: {submittedSummary.attendingLines.join(' • ')}
                </p>
              )}
              <button
                type="button"
                onClick={() => setSubmittedSummary(null)}
                className="font-heading text-xs font-bold text-[#D4AF37] underline"
              >
                প্রয়োজনে তথ্য পরিবর্তন করুন ↺
              </button>
            </div>
          )}

          {/* Secondary WhatsApp Share & Direct Contact */}
          <div className="mt-3 flex flex-col gap-2 border-t border-[#D4AF37]/25 pt-3">
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => triggerHaptic(10)}
              className="sign-btn w-full"
            >
              <span aria-hidden="true">💬</span>
              <span>WhatsApp-এ শেয়ার করুন</span>
            </a>

            <a
              href={`https://wa.me/${weddingConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-center text-xs font-semibold text-[#E5C17B] underline-offset-4 hover:underline"
            >
              সরাসরি WhatsApp-এ যোগাযোগ করুন
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            triggerHaptic(10);
            onScrollTop();
          }}
          className="font-heading mt-3 min-h-[44px] px-4 text-xs font-bold text-[#D4AF37] underline-offset-4 hover:underline"
        >
          শুরু থেকে আবার দেখুন ↑
        </button>

        <p className="font-body mt-1 text-[11px] text-[#FFF7EC]/70">
          {weddingConfig.footerNote}
        </p>
      </div>
    </section>
  );
}
