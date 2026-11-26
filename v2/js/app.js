/**
 * MASTER APPLICATION CONTROLLER (v2)
 * Sakib Hassan Prangon & Easha Mahmud Bhabna Wedding Invitation
 * ============================================================
 * Handles envelope 3D opening, audio autoplay compliance, language toggling,
 * scratch card, countdown, invited events filtering, and WhatsApp RSVP.
 */

import { weddingConfig, toBengaliNumerals } from './content.js';
import { ScratchCardManager } from './scratch-card.js';

class WeddingApp {
  constructor() {
    this.currentLang = 'bn'; // Default to Bengali or detect
    this.guest = this.parseGuestParams();
    this.invitedEvents = this.filterEvents();
    this.audio = null;
    this.isPlaying = false;
    this.hasUserInteracted = false;
    this.isEnvelopeOpened = false;
    this.scratchManager = null;
    this.countdownTimer = null;
    this.eventAttendance = {}; // { [eventId]: { attending: true, count: number } }

    this.initAttendanceState();
  }

  // Parse URL parameters (e.g., ?n=John&b=জন&e=hw&c=2)
  parseGuestParams() {
    const url = new URL(window.location.href);
    let params = url.searchParams;

    if (window.location.hash.includes('?')) {
      const hashQuery = window.location.hash.split('?')[1];
      params = new URLSearchParams(hashQuery);
    }

    const rawN = (params.get('n') || '').trim().slice(0, 60);
    const rawB = (params.get('b') || '').trim().slice(0, 60);
    const rawE = (params.get('e') || '').toLowerCase();
    const rawC = parseInt(params.get('c') || '1', 10);
    const langParam = (params.get('lang') || '').toLowerCase();

    if (langParam === 'en') {
      this.currentLang = 'en';
    }

    const isPersonalized = Boolean(rawN || rawB);
    const nameEn = rawN || (rawB ? rawB : "Dear Guest");
    const nameBn = rawB || (rawN ? rawN : "সম্মানিত অতিথি");

    // Valid event letters: h (holud), w (wedding), r (reception)
    const validLetters = ['h', 'w', 'r'];
    let invitedEventLetters = [];
    if (rawE) {
      for (const ch of rawE) {
        if (validLetters.includes(ch) && !invitedEventLetters.includes(ch)) {
          invitedEventLetters.push(ch);
        }
      }
    }

    // Default to all 3 events if empty
    if (invitedEventLetters.length === 0) {
      invitedEventLetters = ['h', 'w', 'r'];
    }

    const maxGuests = Number.isInteger(rawC) && rawC >= 1 && rawC <= 20 ? rawC : 1;

    return {
      isPersonalized,
      nameEn,
      nameBn,
      rawNameEn: rawN,
      rawNameBn: rawB,
      invitedEventLetters,
      maxGuests,
    };
  }

  filterEvents() {
    return weddingConfig.events.filter(ev =>
      this.guest.invitedEventLetters.includes(ev.letter)
    );
  }

  initAttendanceState() {
    this.invitedEvents.forEach(ev => {
      this.eventAttendance[ev.id] = {
        attending: true,
        count: this.guest.maxGuests,
      };
    });
  }

  init() {
    this.setupAudio();
    this.setupTopControls();
    this.setupEnvelope();
    this.setupScratchCard();
    this.setupCountdown();
    this.setupTimeline();
    this.setupRSVPForm();
    this.setupScrollAnimations();
    this.setupReplayButton();
    this.applyLanguage();
  }

  // --- AUDIO CONTROLLER ---
  setupAudio() {
    this.audio = new Audio();
    this.audio.loop = true;
    this.audio.preload = 'auto';

    // Source with fallback
    const src1 = document.createElement('source');
    src1.src = weddingConfig.audio.src;
    src1.type = 'audio/mp3';
    this.audio.appendChild(src1);

    const src2 = document.createElement('source');
    src2.src = weddingConfig.audio.fallbackSrc;
    src2.type = 'audio/mp3';
    this.audio.appendChild(src2);

    this.audio.volume = 0; // for smooth fade-in
  }

  startMusicWithFade(targetVolume = 0.6, durationMs = 2000) {
    if (!this.audio) return;
    this.audio.play().then(() => {
      this.isPlaying = true;
      this.updateAudioButtonUI();

      let currentVol = 0;
      const step = 0.05;
      const intervalTime = durationMs / (targetVolume / step);

      const fadeInterval = setInterval(() => {
        currentVol += step;
        if (currentVol >= targetVolume) {
          this.audio.volume = targetVolume;
          clearInterval(fadeInterval);
        } else {
          this.audio.volume = currentVol;
        }
      }, intervalTime);
    }).catch(() => {
      // Autoplay blocked; user can tap audio button
      this.isPlaying = false;
      this.updateAudioButtonUI();
    });
  }

  toggleMusic() {
    if (!this.audio) return;
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    } else {
      this.audio.volume = 0.6;
      this.audio.play().then(() => {
        this.isPlaying = true;
      }).catch(err => {
        console.warn('Audio play prevented:', err);
      });
    }
    this.updateAudioButtonUI();
  }

  updateAudioButtonUI() {
    const audioBtn = document.getElementById('music-toggle-btn');
    const audioIcon = document.getElementById('music-icon');
    const ripple = document.getElementById('music-ripple');

    if (!audioBtn || !audioIcon) return;

    if (this.isPlaying) {
      audioBtn.classList.add('playing');
      audioBtn.setAttribute('aria-label', this.t('musicMute'));
      audioBtn.title = this.t('musicMute');
      audioIcon.innerHTML = `
        <svg class="w-5 h-5 text-[#D4AF37] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
      `;
      if (ripple) ripple.style.display = 'block';
    } else {
      audioBtn.classList.remove('playing');
      audioBtn.setAttribute('aria-label', this.t('musicPlay'));
      audioBtn.title = this.t('musicPlay');
      audioIcon.innerHTML = `
        <svg class="w-5 h-5 text-[#FFF6E5]/75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      `;
      if (ripple) ripple.style.display = 'none';
    }
  }

  // --- TOP CONTROLS SETUP ---
  setupTopControls() {
    const btnEn = document.getElementById('lang-btn-en');
    const btnBn = document.getElementById('lang-btn-bn');
    const audioBtn = document.getElementById('music-toggle-btn');

    if (btnEn) {
      btnEn.addEventListener('click', () => {
        this.setLanguage('en');
      });
    }

    if (btnBn) {
      btnBn.addEventListener('click', () => {
        this.setLanguage('bn');
      });
    }

    if (audioBtn) {
      audioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.hasUserInteracted = true;
        this.toggleMusic();
      });
    }
  }

  setLanguage(lang) {
    if (this.currentLang === lang) return;
    this.currentLang = lang;
    this.applyLanguage();
  }

  t(key) {
    const trans = weddingConfig.translations[key];
    if (!trans) return key;
    return trans[this.currentLang] || trans.en || key;
  }

  applyLanguage() {
    document.documentElement.lang = this.currentLang;

    // Update active state in top control buttons
    const btnEn = document.getElementById('lang-btn-en');
    const btnBn = document.getElementById('lang-btn-bn');
    if (btnEn && btnBn) {
      if (this.currentLang === 'en') {
        btnEn.classList.add('active');
        btnBn.classList.remove('active');
        btnEn.setAttribute('aria-pressed', 'true');
        btnBn.setAttribute('aria-pressed', 'false');
      } else {
        btnBn.classList.add('active');
        btnEn.classList.remove('active');
        btnBn.setAttribute('aria-pressed', 'true');
        btnEn.setAttribute('aria-pressed', 'false');
      }
    }

    // Dynamic data-i18n replacements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = this.t(key);
    });

    // Groom and Bride Name elements
    const groomEl = document.getElementById('groom-name');
    const brideEl = document.getElementById('bride-name');
    const groomHeroEl = document.getElementById('hero-groom-name');
    const brideHeroEl = document.getElementById('hero-bride-name');
    const groomParentsEl = document.getElementById('groom-parents');
    const brideParentsEl = document.getElementById('bride-parents');
    const guestBadgeEl = document.getElementById('hero-guest-badge');

    const groomName = weddingConfig.groom.name[this.currentLang];
    const brideName = weddingConfig.bride.name[this.currentLang];

    if (groomEl) groomEl.textContent = groomName;
    if (brideEl) brideEl.textContent = brideName;
    if (groomHeroEl) groomHeroEl.textContent = groomName;
    if (brideHeroEl) brideHeroEl.textContent = brideName;

    if (groomParentsEl) groomParentsEl.textContent = weddingConfig.groom.parents[this.currentLang];
    if (brideParentsEl) brideParentsEl.textContent = weddingConfig.bride.parents[this.currentLang];

    if (guestBadgeEl) {
      if (this.guest.isPersonalized) {
        const guestName = this.currentLang === 'bn' ? this.guest.nameBn : this.guest.nameEn;
        guestBadgeEl.innerHTML = `
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#FCF6BA] text-xs font-semibold">
            ✦ ${this.t('guestBadgePrefix')} <strong class="text-white">${guestName}</strong>
          </span>
        `;
        guestBadgeEl.style.display = 'block';
      } else {
        guestBadgeEl.style.display = 'none';
      }
    }

    const envelopeGuestBadgeEl = document.getElementById('envelope-guest-badge');
    if (envelopeGuestBadgeEl) {
      if (this.guest.isPersonalized) {
        const guestName = this.currentLang === 'bn' ? this.guest.nameBn : this.guest.nameEn;
        envelopeGuestBadgeEl.innerHTML = `
          <span class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1C050B]/90 border border-[#D4AF37]/60 text-[#D4AF37] text-xs font-semibold shadow-md">
            ✦ ${guestName}
          </span>
        `;
        envelopeGuestBadgeEl.style.display = 'block';
      } else {
        envelopeGuestBadgeEl.style.display = 'none';
      }
    }

    // Update scratch cards underneath
    if (this.scratchManager) {
      const primaryEvent = this.invitedEvents.find(e => e.id === 'wedding') || this.invitedEvents[0];
      const dayVal = this.currentLang === 'bn' ? toBengaliNumerals(primaryEvent.dayNumber) : primaryEvent.dayNumber;
      const monthVal = primaryEvent.monthName[this.currentLang];
      const yearVal = this.currentLang === 'bn' ? toBengaliNumerals(primaryEvent.yearNumber) : primaryEvent.yearNumber;

      const scratchTitleEl = document.getElementById('date-scratch-main-title');
      if (scratchTitleEl) {
        scratchTitleEl.textContent = `✦ ${dayVal} ${monthVal} ${yearVal} ✦`;
      }

      this.scratchManager.updateLanguage([
        { value: dayVal, label: this.t('labelDay') },
        { value: monthVal, label: this.t('labelMonth') },
        { value: yearVal, label: this.t('labelYear') },
      ]);
    }

    // Refresh Timeline & RSVP with localized text
    this.renderTimeline();
    this.renderRSVPEvents();
    this.updateCountdownNumbers();
  }

  // --- ENVELOPE OPENING ANIMATION (Scene 1) ---
  setupEnvelope() {
    const envelopeModal = document.getElementById('envelope-modal');
    const sealBtn = document.getElementById('wax-seal-btn');
    const flapTop = document.getElementById('envelope-flap-top');
    const goldenBurst = document.getElementById('golden-flare-burst');

    if (!envelopeModal) return;

    const triggerOpen = () => {
      if (this.isEnvelopeOpened) return;
      this.isEnvelopeOpened = true;

      // Start music on first tap
      if (!this.isPlaying) {
        this.startMusicWithFade(0.65, 2000);
      }

      // Check prefers-reduced-motion
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced) {
        envelopeModal.style.transition = 'opacity 0.5s ease-out';
        envelopeModal.style.opacity = '0';
        setTimeout(() => {
          envelopeModal.style.display = 'none';
        }, 500);
        return;
      }

      // Step 1: Seal pop & pulse
      if (sealBtn) {
        sealBtn.classList.add('seal-break');
      }

      // Step 2: Light flare burst animation
      if (goldenBurst) {
        goldenBurst.classList.add('flare-burst-active');
      }

      // Step 3: Top flap folds open in 3D
      if (flapTop) {
        flapTop.classList.add('flap-opened');
      }

      // Confetti burst
      this.launchGlitterConfetti();

      // Step 4: Fade envelope out smoothly
      setTimeout(() => {
        envelopeModal.classList.add('envelope-dismiss');
        setTimeout(() => {
          envelopeModal.style.display = 'none';
        }, 700);
      }, 950);
    };

    if (sealBtn) {
      sealBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerOpen();
      });
    }

    envelopeModal.addEventListener('click', () => {
      triggerOpen();
    });

    // Keyboard support
    window.addEventListener('keydown', (e) => {
      if (!this.isEnvelopeOpened && ['Enter', ' ', 'ArrowDown'].includes(e.key)) {
        triggerOpen();
      }
    });
  }

  setupReplayButton() {
    const replayBtn = document.getElementById('replay-envelope-btn');
    if (!replayBtn) return;

    replayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const envelopeModal = document.getElementById('envelope-modal');
      const flapTop = document.getElementById('envelope-flap-top');
      const sealBtn = document.getElementById('wax-seal-btn');
      const goldenBurst = document.getElementById('golden-flare-burst');

      if (!envelopeModal) return;

      this.isEnvelopeOpened = false;
      envelopeModal.style.display = 'flex';
      envelopeModal.style.opacity = '1';
      envelopeModal.classList.remove('envelope-dismiss');

      if (flapTop) flapTop.classList.remove('flap-opened');
      if (sealBtn) sealBtn.classList.remove('seal-break');
      if (goldenBurst) goldenBurst.classList.remove('flare-burst-active');

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  launchGlitterConfetti() {
    // If canvas-confetti library is available via script or window
    if (typeof window.confetti === 'function') {
      window.confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#FCF6BA', '#F4A300', '#7A1F2B', '#E8C872'],
        disableForReducedMotion: true,
      });
    }
  }

  // --- SCRATCH CARD SETUP (Scene 3) ---
  setupScratchCard() {
    const primaryEvent = this.invitedEvents.find(e => e.id === 'wedding') || this.invitedEvents[0];
    const dayVal = this.currentLang === 'bn' ? toBengaliNumerals(primaryEvent.dayNumber) : primaryEvent.dayNumber;
    const monthVal = primaryEvent.monthName[this.currentLang];
    const yearVal = this.currentLang === 'bn' ? toBengaliNumerals(primaryEvent.yearNumber) : primaryEvent.yearNumber;

    this.scratchManager = new ScratchCardManager({
      cardsContainerId: 'scratch-cards-grid',
      onRevealComplete: () => {
        this.launchGlitterConfetti();
        const hintEl = document.getElementById('scratch-card-hint');
        if (hintEl) {
          hintEl.textContent = '✦ ' + (this.currentLang === 'bn' ? 'তারিখ উন্মোচিত হয়েছে' : 'Date Revealed!') + ' ✦';
          hintEl.classList.add('text-gold');
        }
      }
    });

    this.scratchManager.init([
      { value: dayVal, label: this.t('labelDay') },
      { value: monthVal, label: this.t('labelMonth') },
      { value: yearVal, label: this.t('labelYear') },
    ]);

    const revealBtn = document.getElementById('scratch-reveal-btn');
    if (revealBtn) {
      revealBtn.addEventListener('click', () => {
        this.scratchManager.revealAll();
      });
    }
  }

  // --- TIMELINE SETUP (Scene 5) ---
  setupTimeline() {
    this.renderTimeline();
  }

  renderTimeline() {
    const timelineContainer = document.getElementById('timeline-events-container');
    if (!timelineContainer) return;

    timelineContainer.innerHTML = '';

    this.invitedEvents.forEach((ev, idx) => {
      const isEven = idx % 2 === 0;
      const card = document.createElement('div');
      card.className = 'timeline-node relative flex items-start gap-4 mb-8';

      const iconSvg = ev.id === 'holud'
        ? `<svg class="w-5 h-5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>`
        : ev.id === 'wedding'
        ? `<svg class="w-5 h-5 text-rose-300 fill-rose-900/40" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`
        : `<svg class="w-5 h-5 text-yellow-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path></svg>`;

      card.innerHTML = `
        <div class="timeline-badge flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-[#3D101C] to-[#1C050B] border-2 border-[#D4AF37] flex items-center justify-center shadow-md shadow-black/50 z-10">
          ${iconSvg}
        </div>

        <div class="timeline-card flex-1 bg-gradient-to-b from-[#2B0E14] via-[#350F18] to-[#1F070C] p-4 sm:p-5 rounded-2xl border border-[#D4AF37]/40 shadow-lg">
          <div class="flex items-center justify-between gap-2 mb-2">
            <h3 class="text-base sm:text-lg font-bold gold-foil-text font-serif">${ev.title[this.currentLang]}</h3>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">${ev.letter.toUpperCase()}</span>
          </div>

          <p class="text-xs text-yellow-200/80 italic mb-3 font-serif">${ev.subtitle[this.currentLang]}</p>

          <div class="space-y-1.5 text-xs text-[#FFF6E5]/90 border-t border-[#D4AF37]/20 pt-2.5">
            <p class="flex items-center gap-2">
              <span class="text-[#D4AF37]">📅</span>
              <strong>${ev.dateDisplay[this.currentLang]}</strong>
            </p>
            <p class="flex items-center gap-2">
              <span class="text-[#D4AF37]">⏰</span>
              <span>${ev.timeDisplay[this.currentLang]}</span>
            </p>
            <p class="flex items-center gap-2">
              <span class="text-[#D4AF37]">📍</span>
              <span>${ev.venueName[this.currentLang]}, ${ev.venueAddress[this.currentLang]}</span>
            </p>
          </div>

          <div class="mt-3.5 pt-2 flex items-center gap-2">
            <button
              class="ics-download-btn flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#3D101C] hover:bg-[#4E1424] text-[#FFF6E5] text-xs font-semibold border border-[#D4AF37]/40 transition-colors min-h-[44px]"
              data-event-id="${ev.id}"
            >
              <span>📥</span>
              <span>${this.t('addToCalendarBtn')}</span>
            </button>
          </div>
        </div>
      `;

      timelineContainer.appendChild(card);
    });

    // Bind iCalendar download buttons
    timelineContainer.querySelectorAll('.ics-download-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const eventId = btn.getAttribute('data-event-id');
        const ev = this.invitedEvents.find(item => item.id === eventId);
        if (ev) {
          this.downloadIcsFile(ev);
        }
      });
    });
  }

  downloadIcsFile(event) {
    const formatIcsDate = (isoString) => {
      const date = new Date(isoString);
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const startTime = formatIcsDate(event.icsStartTime);
    const endTime = formatIcsDate(event.icsEndTime);
    const title = `${event.title.en} - Sakib & Easha's Wedding`;
    const description = `${event.title.bn} / ${event.title.en}\\n${event.subtitle.en}\\nCouple: Sakib Hassan Prangon & Easha Mahmud Bhabna`;
    const location = `${event.venueName.en}, ${event.venueAddress.en}`;

    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Sakib & Easha Wedding//Invitation v2//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:sakib-easha-${event.id}-2026@wedding.invitation`,
      `DTSTAMP:${formatIcsDate(new Date().toISOString())}`,
      `DTSTART:${startTime}`,
      `DTEND:${endTime}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Sakib-Easha-${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // --- COUNTDOWN TIMER SETUP ---
  setupCountdown() {
    this.updateCountdownNumbers();
    if (this.countdownTimer) clearInterval(this.countdownTimer);
    this.countdownTimer = setInterval(() => {
      this.updateCountdownNumbers();
    }, 1000);
  }

  updateCountdownNumbers() {
    const primaryEvent = this.invitedEvents.find(e => e.id === 'wedding') || this.invitedEvents[0];
    if (!primaryEvent) return;

    const targetDate = new Date(primaryEvent.icsStartTime).getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');
    const countdownTargetNameEl = document.getElementById('countdown-target-event');

    if (countdownTargetNameEl) {
      countdownTargetNameEl.textContent = `${this.t('countdownTargetPrefix')} ${primaryEvent.title[this.currentLang]}`;
    }

    if (diff <= 0) {
      // Event reached
      const expiredBlock = document.getElementById('countdown-expired-block');
      const activeBlock = document.getElementById('countdown-active-block');
      if (expiredBlock) expiredBlock.style.display = 'block';
      if (activeBlock) activeBlock.style.display = 'none';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const formatVal = (v) => {
      const padded = v < 10 ? `0${v}` : `${v}`;
      return this.currentLang === 'bn' ? toBengaliNumerals(padded) : padded;
    };

    if (daysEl) daysEl.textContent = formatVal(days);
    if (hoursEl) hoursEl.textContent = formatVal(hours);
    if (minutesEl) minutesEl.textContent = formatVal(minutes);
    if (secondsEl) secondsEl.textContent = formatVal(seconds);
  }

  // --- RSVP & WHATSAPP CONFIRMATION ---
  setupRSVPForm() {
    const nameInput = document.getElementById('rsvp-guest-name');
    if (nameInput) {
      const defaultName = this.currentLang === 'bn'
        ? (this.guest.rawNameBn || this.guest.rawNameEn || '')
        : (this.guest.rawNameEn || this.guest.rawNameBn || '');
      nameInput.value = defaultName;
    }

    this.renderRSVPEvents();

    const form = document.getElementById('rsvp-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitWhatsAppRSVP();
      });
    }
  }

  renderRSVPEvents() {
    const container = document.getElementById('rsvp-events-list');
    if (!container) return;

    container.innerHTML = '';
    const maxAllowed = this.guest.maxGuests || 1;

    this.invitedEvents.forEach(ev => {
      const state = this.eventAttendance[ev.id] || { attending: true, count: maxAllowed };
      const isAttending = state.attending;
      const count = state.count || 1;

      const row = document.createElement('div');
      row.className = `p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 ${
        isAttending
          ? 'bg-[#3A0F19]/90 border-[#D4AF37] text-[#FFF6E5]'
          : 'bg-[#1F070C]/60 border-[#D4AF37]/25 text-[#FFF6E5]/40'
      }`;

      row.innerHTML = `
        <div class="flex items-center justify-between gap-3">
          <label class="flex items-center gap-3 cursor-pointer select-none flex-1 min-h-[44px]">
            <input
              type="checkbox"
              class="event-attendance-checkbox w-5 h-5 rounded accent-[#D4AF37] cursor-pointer"
              data-event-id="${ev.id}"
              ${isAttending ? 'checked' : ''}
            />
            <div>
              <p class="text-sm font-semibold font-serif text-[#FFF6E5]">${ev.title[this.currentLang]}</p>
              <p class="text-xs text-[#D4AF37]/80">${ev.dateDisplay[this.currentLang]}</p>
            </div>
          </label>
          <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
            ${ev.letter.toUpperCase()}
          </span>
        </div>

        ${isAttending ? `
          <div class="mt-3 pt-2.5 border-t border-[#D4AF37]/20 flex items-center justify-between gap-2">
            <span class="text-xs text-[#FFF6E5]/90 flex items-center gap-1.5">
              <span>👥</span>
              <span>${this.t('guestsCountLabel')}</span>
            </span>

            ${maxAllowed > 1 ? `
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="stepper-btn stepper-minus w-9 h-9 rounded-xl bg-[#22070E] border border-[#D4AF37]/50 text-[#D4AF37] font-bold text-lg flex items-center justify-center active:scale-95 transition-transform"
                  data-event-id="${ev.id}"
                  ${count <= 1 ? 'disabled style="opacity:0.3"' : ''}
                  aria-label="Decrease attendee count"
                >-</button>

                <div class="min-w-[40px] px-2 py-1 bg-[#1C050B] border border-[#D4AF37]/40 rounded-xl text-center">
                  <span class="text-sm font-bold text-[#FFF6E5]">
                    ${this.currentLang === 'bn' ? toBengaliNumerals(count) : count}
                  </span>
                </div>

                <button
                  type="button"
                  class="stepper-btn stepper-plus w-9 h-9 rounded-xl bg-[#22070E] border border-[#D4AF37]/50 text-[#D4AF37] font-bold text-lg flex items-center justify-center active:scale-95 transition-transform"
                  data-event-id="${ev.id}"
                  ${count >= maxAllowed ? 'disabled style="opacity:0.3"' : ''}
                  aria-label="Increase attendee count"
                >+</button>
              </div>
            ` : `
              <span class="text-xs font-semibold px-2.5 py-1 rounded-xl bg-[#1C050B] border border-[#D4AF37]/30 text-[#D4AF37]">
                ${this.currentLang === 'bn' ? '১ জন' : '1 Guest'}
              </span>
            `}
          </div>
        ` : `
          <div class="mt-2 text-[11px] text-[#FFF6E5]/40 italic">
            ${this.currentLang === 'bn' ? '✕ এই অনুষ্ঠানে উপস্থিত হতে পারছি না' : '✕ Unable to attend this ceremony'}
          </div>
        `}
      `;

      container.appendChild(row);
    });

    // Checkbox toggles
    container.querySelectorAll('.event-attendance-checkbox').forEach(box => {
      box.addEventListener('change', (e) => {
        const evId = box.getAttribute('data-event-id');
        this.eventAttendance[evId].attending = box.checked;
        this.renderRSVPEvents();
      });
    });

    // Stepper buttons
    container.querySelectorAll('.stepper-minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const evId = btn.getAttribute('data-event-id');
        const cur = this.eventAttendance[evId].count || 1;
        if (cur > 1) {
          this.eventAttendance[evId].count = cur - 1;
          this.renderRSVPEvents();
        }
      });
    });

    container.querySelectorAll('.stepper-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const evId = btn.getAttribute('data-event-id');
        const cur = this.eventAttendance[evId].count || 1;
        if (cur < maxAllowed) {
          this.eventAttendance[evId].count = cur + 1;
          this.renderRSVPEvents();
        }
      });
    });
  }

  submitWhatsAppRSVP() {
    const nameInput = document.getElementById('rsvp-guest-name');
    const guestName = (nameInput?.value || '').trim() || (this.currentLang === 'bn' ? 'সম্মানিত অতিথি' : 'Guest');

    const attended = this.invitedEvents.filter(ev => this.eventAttendance[ev.id]?.attending);
    const declined = this.invitedEvents.filter(ev => !this.eventAttendance[ev.id]?.attending);

    const lines = [
      `*Wedding RSVP / উপস্থিতি নিশ্চিতকরণ*`,
      `👰 Groom & Bride: Sakib & Easha (সাকিব ও ভাবনা)`,
      `👤 Guest Name: ${guestName}`,
      ``,
    ];

    if (attended.length === 0) {
      lines.push(
        `❌ *Status / উপস্থিতি:*`,
        `  • আন্তরিক দুঃখ প্রকাশ করছি, কোনো অনুষ্ঠানে উপস্থিত হতে পারছি না (Regretfully unable to attend)`
      );
    } else {
      lines.push(`✨ *Attending Ceremonies & Guests (অনুষ্ঠানভিত্তিক উপস্থিতি):*`);
      attended.forEach(ev => {
        const count = this.eventAttendance[ev.id]?.count || 1;
        lines.push(`  • ${ev.title.bn} (${ev.title.en}): ${count} জন / guest${count > 1 ? 's' : ''}`);
      });

      if (declined.length > 0) {
        lines.push(``, `❌ *Regrets for (যে অনুষ্ঠানে থাকতে পারছি না):*`);
        declined.forEach(ev => {
          lines.push(`  • ${ev.title.bn} (${ev.title.en})`);
        });
      }
    }

    lines.push(
      ``,
      `_Sent via Sakib & Easha Wedding E-Invitation (v2)_`
    );

    const message = lines.join('\n');
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${weddingConfig.rsvpWhatsAppNumber}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  }

  // --- SCROLL ANIMATIONS ---
  setupScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const scenes = document.querySelectorAll('.scroll-scene');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scene-visible');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    });

    scenes.forEach(scene => observer.observe(scene));
  }
}

// Bootstrap once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new WeddingApp();
  app.init();
});
