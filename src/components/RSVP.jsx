import React, { useState, useEffect } from 'react';
import { useWedding } from '../context/WeddingContext';
import { Send, PhoneCall, Users, Check, HeartHandshake, CalendarClock } from 'lucide-react';
import TiltCard from './TiltCard';

export default function RSVP() {
  const { lang, guest, invitedEvents, weddingConfig, t, toNum } = useWedding();
  const { rsvpWhatsAppNumber, contactPersons, ui } = weddingConfig;

  // Form states
  const [guestName, setGuestName] = useState(
    lang === 'bn' ? (guest.rawNameBn || guest.rawNameEn || '') : (guest.rawNameEn || guest.rawNameBn || '')
  );

  // Sync with guest object
  useEffect(() => {
    if (guest.isPersonalized) {
      setGuestName(lang === 'bn' ? (guest.rawNameBn || guest.rawNameEn) : (guest.rawNameEn || guest.rawNameBn));
    }
  }, [guest, lang]);

  // Max allowed guests across invited events
  const maxAllowedGuests = guest.maxGuests || 1;

  // Per-event attendance tracking: { [eventId]: { attending: boolean, count: number } }
  const [eventAttendance, setEventAttendance] = useState(() => {
    const initial = {};
    invitedEvents.forEach(e => {
      initial[e.id] = { attending: true, count: maxAllowedGuests };
    });
    return initial;
  });

  // Sync when invitedEvents or maxAllowedGuests changes
  useEffect(() => {
    setEventAttendance(prev => {
      const updated = { ...prev };
      invitedEvents.forEach(e => {
        if (!updated[e.id]) {
          updated[e.id] = { attending: true, count: maxAllowedGuests };
        } else {
          updated[e.id] = {
            ...updated[e.id],
            count: Math.min(Math.max(1, updated[e.id].count || 1), maxAllowedGuests),
          };
        }
      });
      return updated;
    });
  }, [invitedEvents, maxAllowedGuests]);

  const toggleEvent = (eventId) => {
    setEventAttendance(prev => {
      const current = prev[eventId] || { attending: true, count: maxAllowedGuests };
      return {
        ...prev,
        [eventId]: {
          ...current,
          attending: !current.attending,
        },
      };
    });
  };

  const updateCount = (eventId, delta) => {
    setEventAttendance(prev => {
      const current = prev[eventId] || { attending: true, count: maxAllowedGuests };
      const nextCount = Math.min(maxAllowedGuests, Math.max(1, (current.count || 1) + delta));
      return {
        ...prev,
        [eventId]: {
          ...current,
          count: nextCount,
        },
      };
    });
  };

  // Build the bilingual WhatsApp RSVP text
  const handleWhatsAppRSVP = () => {
    const finalName = guestName.trim() || (lang === 'bn' ? 'সম্মানিত অতিথি' : 'Guest');

    const attendedEvents = invitedEvents.filter(ev => eventAttendance[ev.id]?.attending);
    const declinedEvents = invitedEvents.filter(ev => !eventAttendance[ev.id]?.attending);

    const messageLines = [
      `*Wedding RSVP / উপস্থিতি নিশ্চিতকরণ*`,
      `👰 Groom & Bride: Sakib & Easha (সাকিব ও ভাবনা)`,
      `👤 Guest Name: ${finalName}`,
      ``,
    ];

    if (attendedEvents.length === 0) {
      messageLines.push(
        `❌ *Status / উপস্থিতি:*`,
        `  • আন্তরিক দুঃখ প্রকাশ করছি, কোনো অনুষ্ঠানে উপস্থিত হতে পারছি না (Regretfully unable to attend)`
      );
    } else {
      messageLines.push(`✨ *Attending Ceremonies & Guests (অনুষ্ঠানভিত্তিক উপস্থিতি):*`);
      attendedEvents.forEach(ev => {
        const count = eventAttendance[ev.id]?.count || 1;
        messageLines.push(`  • ${ev.title.bn} (${ev.title.en}): ${count} জন / guest${count > 1 ? 's' : ''}`);
      });

      if (declinedEvents.length > 0) {
        messageLines.push(``, `❌ *Regrets for (যে অনুষ্ঠানে থাকতে পারছি না):*`);
        declinedEvents.forEach(ev => {
          messageLines.push(`  • ${ev.title.bn} (${ev.title.en})`);
        });
      }
    }

    messageLines.push(
      ``,
      `_Sent via Sakib & Easha Wedding E-Invitation_`
    );

    const fullMessage = messageLines.join('\n');
    const encoded = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://wa.me/${rsvpWhatsAppNumber}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="rsvp" className="relative py-24 px-4 bg-[#1A050B]">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3D101C]/80 border border-gold/40 text-xs font-semibold text-gold mb-3 shadow-md">
            <HeartHandshake className="w-3.5 h-3.5 text-yellow-400" />
            <span>{t(ui.rsvpSection.heading)}</span>
          </div>

          {/* Clean Single Language Heading */}
          <div className="mb-2">
            <h2 className={`${lang === 'bn' ? 'font-banglaHeading text-2xl sm:text-4xl' : 'font-engHeading text-3xl sm:text-4xl'} font-bold gold-foil-text tracking-tight`}>
              {lang === 'bn' ? 'উপস্থিতি ও শুভকামনা' : 'Confirm Your Presence'}
            </h2>
          </div>

          {/* Polite reservation notice with 20 Dec date */}
          <div className="mt-4 mx-auto max-w-lg p-3 rounded-2xl bg-[#2A0A12]/90 border border-gold/30 shadow-inner flex items-center justify-center gap-2 text-center">
            <CalendarClock className="w-4 h-4 text-gold flex-shrink-0" />
            <p className="font-banglaBody text-xs sm:text-sm text-cream-100 font-medium leading-relaxed">
              {t(ui.rsvpSection.subheading)}
            </p>
          </div>
        </div>

        {/* 3D RSVP Card Form */}
        <TiltCard className="bg-gradient-to-b from-[#2B0E14] via-[#350F18] to-[#1F070C] rounded-3xl p-6 sm:p-8 border-2 border-gold/50 shadow-3d-card">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleWhatsAppRSVP();
            }}
            className="space-y-6"
          >
            {/* Guest Name Input */}
            <div>
              <label htmlFor="guest-name-input" className="block text-xs font-bold uppercase tracking-wider text-gold mb-2">
                {t(ui.rsvpSection.nameLabel)}
              </label>
              <input
                id="guest-name-input"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder={t(ui.rsvpSection.namePlaceholder)}
                maxLength={60}
                className="w-full px-4 py-3.5 rounded-2xl bg-[#1C050B] border border-gold/40 text-cream-100 text-sm font-banglaBody focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all min-h-[48px]"
                required
              />
            </div>

            {/* Event Checkboxes & Per-Event Guest Count Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gold">
                  {t(ui.rsvpSection.selectEventsLabel)}
                </label>
                {maxAllowedGuests > 1 && (
                  <span className="text-[11px] text-cream-300/80 font-banglaBody">
                    {lang === 'bn' ? `সর্বোচ্চ বরাদ্দ: ${toNum(maxAllowedGuests)} জন` : `Max limit: ${maxAllowedGuests}`}
                  </span>
                )}
              </div>

              <p className="text-[11px] text-cream-300/70 font-banglaBody mb-3">
                {t(ui.rsvpSection.perEventInstruction)}
              </p>

              <div className="space-y-3">
                {invitedEvents.map((event) => {
                  const eventState = eventAttendance[event.id] || { attending: true, count: maxAllowedGuests };
                  const isChecked = eventState.attending;
                  const currentCount = eventState.count || 1;

                  return (
                    <div
                      key={event.id}
                      className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 ${
                        isChecked
                          ? 'bg-[#3A0F19]/90 border-gold text-cream-100 shadow-md'
                          : 'bg-[#1F070C]/60 border-gold/25 text-cream-200/50 hover:border-gold/40'
                      }`}
                    >
                      {/* Event Row: Checkbox, Title, and Badge */}
                      <div className="flex items-center justify-between gap-3">
                        <div
                          onClick={() => toggleEvent(event.id)}
                          className="flex items-center gap-3 cursor-pointer select-none flex-1 min-h-[40px]"
                        >
                          <div
                            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
                              isChecked
                                ? 'bg-gradient-to-r from-gold to-yellow-400 text-[#24090F] shadow-sm'
                                : 'border border-gold/40 bg-[#1C050B]'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />}
                          </div>
                          <div>
                            <p className="text-sm font-semibold font-banglaHeading text-cream-100">
                              {event.title[lang]}
                            </p>
                            <p className="text-xs text-gold/80 font-banglaBody">
                              {event.dateDisplay[lang]}
                            </p>
                          </div>
                        </div>

                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30">
                          {event.letter.toUpperCase()}
                        </span>
                      </div>

                      {/* Sub-section: Attendance details or guest counter */}
                      {isChecked ? (
                        <div className="mt-3 pt-2.5 border-t border-gold/20 flex items-center justify-between gap-2">
                          <span className="text-xs text-cream-200/90 font-banglaBody flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                            {lang === 'bn' ? 'উপস্থিত অতিথির সংখ্যা:' : 'Attending guests:'}
                          </span>

                          {maxAllowedGuests > 1 ? (
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <button
                                type="button"
                                onClick={() => updateCount(event.id, -1)}
                                disabled={currentCount <= 1}
                                className="w-8 h-8 rounded-xl bg-[#22070E] border border-gold/40 text-gold font-bold text-base flex items-center justify-center disabled:opacity-25 active:scale-95 hover:bg-[#4E1424] transition-all"
                                aria-label="Decrease attending guest count"
                              >
                                -
                              </button>

                              <div className="min-w-[42px] px-2 py-1 bg-[#1C050B] border border-gold/40 rounded-xl text-center">
                                <span className="font-banglaHeading text-sm font-bold text-cream-100">
                                  {toNum(currentCount)}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() => updateCount(event.id, 1)}
                                disabled={currentCount >= maxAllowedGuests}
                                className="w-8 h-8 rounded-xl bg-[#22070E] border border-gold/40 text-gold font-bold text-base flex items-center justify-center disabled:opacity-25 active:scale-95 hover:bg-[#4E1424] transition-all"
                                aria-label="Increase attending guest count"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-[#1C050B] border border-gold/30 text-gold">
                              {lang === 'bn' ? '১ জন' : '1 Guest'}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="mt-2 text-[11px] text-cream-300/40 italic font-banglaBody">
                          {lang === 'bn' ? '✕ এই অনুষ্ঠানে উপস্থিত হতে পারছি না' : '✕ Unable to attend this ceremony'}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Confirm on WhatsApp Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#25D366] via-[#20BA5C] to-[#128C7E] hover:from-[#20BA5C] hover:to-[#0F7569] text-white text-sm sm:text-base font-bold shadow-[0_8px_25px_rgba(37,211,102,0.4)] active:scale-95 transition-all min-h-[48px] border border-emerald-300"
              >
                <Send className="w-5 h-5 text-white" />
                <span>{t(ui.rsvpSection.btnWhatsApp)}</span>
              </button>
              <p className="text-[11px] text-center text-cream-300/70 mt-2 font-banglaBody">
                {lang === 'bn'
                  ? 'বোতামে চাপ দিলে আপনার অনুষ্ঠানভিত্তিক উপস্থিতি তথ্যসহ হোয়াটসঅ্যাপে মেসেজ প্রস্তুত হবে'
                  : 'Tapping opens WhatsApp with your pre-filled event-by-event attendance details'}
              </p>
            </div>
          </form>

          {/* Direct Call Contacts Section */}
          <div className="mt-8 pt-6 border-t border-gold/25">
            <p className="text-xs font-bold text-center text-gold/90 mb-4 uppercase tracking-wider">
              {t(ui.rsvpSection.orCallDirectly)}
            </p>

            <div className="grid grid-cols-1 max-w-sm mx-auto gap-3">
              {contactPersons.map((contact, idx) => (
                <a
                  key={idx}
                  href={`tel:${contact.phone}`}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#1C050B] hover:bg-[#2B0E14] border border-gold/30 text-cream-100 transition-all min-h-[44px]"
                >
                  <div>
                    <p className="text-xs font-bold text-gold font-banglaBody">
                      {contact.name[lang]}
                    </p>
                    <p className="text-[11px] text-cream-300/70">
                      {contact.phone}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-yellow-500 text-[#24090F] flex items-center justify-center shadow-md">
                    <PhoneCall className="w-3.5 h-3.5" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
