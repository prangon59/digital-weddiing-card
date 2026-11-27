/**
 * MASTER APPLICATION CONTROLLER (FINAL VERSION)
 * Sakib Hassan Prangon & Easha Mahmud Bhabna
 * =========================================================
 * Combines v1's 3D Royal Double-Door Gates, floating petals canvas,
 * v2's unified top controls, hybrid hero with mandala & lanterns,
 * 4 event programs filtering (?e=...), standalone countdown,
 * travel transit guide, and WhatsApp RSVP.
 */

import { weddingConfig, toBengaliNumerals } from './content.js';
import { PetalsCanvas } from './petals.js';

class WeddingFinalApp {
  constructor() {
    this.currentLang = 'bn'; // Default to Bengali
    this.guest = this.parseGuestParams();
    this.invitedEvents = this.filterEvents();
    this.audio = null;
    this.isPlaying = false;
    this.isCardOpened = false;
    this.countdownTimer = null;
    this.eventAttendance = {}; // { [eventId]: { attending: true, count: number } }
    this.petals = null;
    this.storySlideIndex = 0;
    this.storyDesktopStage = 0;
    this.storyViewMode = 'carousel'; // 'carousel' or 'stage'

    this.initAttendanceState();
  }

  /**
   * Parse Guest Query Parameters:
   *   n = guest name in English
   *   b = guest name in Bengali
   *   e = invited events (e.g. e=r, e=gh,r, e=hr, e=hwr, e=all)
   *   c = max attendees (1 to 20, default 1)
   */
  parseGuestParams() {
    const url = new URL(window.location.href);
    let params = url.searchParams;

    if (window.location.hash.includes('?')) {
      const hashQuery = window.location.hash.split('?')[1];
      params = new URLSearchParams(hashQuery);
    }

    const hasIncomingParams = Boolean(
      params.get('to') || params.get('name') || params.get('guest') || params.get('n') ||
      params.get('b') || params.get('bn') || params.get('e') || params.get('event') ||
      params.get('events') || params.get('g') || params.get('c') || params.get('lang')
    );

    let rawN = '';
    let rawB = '';
    let rawE = '';
    let rawCParam = null;
    let langParam = '';

    const isHost = Boolean(params.get('host') || params.get('admin') || params.get('generator'));
    if (isHost) {
      try { sessionStorage.setItem('wedding_is_host', '1'); } catch (err) {}
    }
    this.isHost = isHost || (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('wedding_is_host') === '1');

    if (hasIncomingParams) {
      rawN = (params.get('to') || params.get('name') || params.get('guest') || params.get('n') || '').trim().slice(0, 60);
      rawB = (params.get('b') || params.get('bn') || '').trim().slice(0, 60);
      rawE = (params.get('e') || params.get('event') || params.get('events') || '').toLowerCase().trim();
      rawCParam = params.get('g') || params.get('c') || params.get('guests') || params.get('count') || params.get('max');
      langParam = (params.get('lang') || '').toLowerCase();

      // Save to sessionStorage for persistent session security
      try {
        sessionStorage.setItem('wedding_guest_session', JSON.stringify({
          rawN, rawB, rawE, rawCParam, langParam
        }));
      } catch (err) {}

      // Clean address bar so guests cannot see or tamper with URL parameters
      try {
        if (window.history && window.history.replaceState) {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } catch (err) {}
    } else {
      // Check for existing locked session in sessionStorage
      try {
        const saved = sessionStorage.getItem('wedding_guest_session');
        if (saved) {
          const parsed = JSON.parse(saved);
          rawN = parsed.rawN || '';
          rawB = parsed.rawB || '';
          rawE = parsed.rawE || '';
          rawCParam = parsed.rawCParam || null;
          langParam = parsed.langParam || '';
        }
      } catch (err) {}
    }
    
    // Check for guest limit parameter: g, c, guests, count, max
    const hasExplicitLimit = Boolean(rawCParam);
    const parsedC = hasExplicitLimit ? parseInt(rawCParam, 10) : null;
    const maxGuests = Number.isInteger(parsedC) && parsedC >= 1 && parsedC <= 50 ? parsedC : (hasExplicitLimit ? 1 : 10);

    if (langParam === 'en') {
      this.currentLang = 'en';
    }

    const isPersonalized = Boolean(rawN || rawB);
    const nameEn = rawN || (rawB ? rawB : "Dear Guest");
    const nameBn = rawB || (rawN ? rawN : "সম্মানিত অতিথি");

    // Parse event letters. Supports comma-separated, words, or concatenated letters.
    // e.g. "w", "wedding", "r", "reception", "gh,r", "hr", "all"
    let requestedLetters = [];
    if (rawE) {
      if (rawE === 'all') {
        requestedLetters = ['gh', 'bh', 'w', 'r'];
      } else {
        const tokens = rawE.split(',').map(s => s.trim());
        const mappedTokens = [];
        for (const token of tokens) {
          if (['w', 'wedding', 'akd', 'biye', 'marriage'].includes(token)) {
            mappedTokens.push('w');
          } else if (['r', 'reception', 'walima', 'boubhat'].includes(token)) {
            mappedTokens.push('r');
          } else if (['gh', 'grooms_holud', 'groomsholud', 'groomholud'].includes(token)) {
            mappedTokens.push('gh');
          } else if (['bh', 'brides_holud', 'bridesholud', 'brideholud'].includes(token)) {
            mappedTokens.push('bh');
          } else if (token === 'h') {
            mappedTokens.push('gh');
          } else {
            let str = token;
            if (str.includes('gh')) { mappedTokens.push('gh'); str = str.replace(/gh/g, ''); }
            if (str.includes('bh')) { mappedTokens.push('bh'); str = str.replace(/bh/g, ''); }
            for (const ch of str) {
              if (['h', 'w', 'r'].includes(ch)) {
                mappedTokens.push(ch);
              }
            }
          }
        }
        requestedLetters = [...new Set(mappedTokens)];
      }
    }

    // Default Fallback if no specific events requested (e.g. Public Homepage / Social Media):
    // All 4 celebration ceremonies are displayed proudly!
    if (requestedLetters.length === 0) {
      requestedLetters = ['gh', 'bh', 'w', 'r'];
    }

    return {
      isPersonalized,
      nameEn,
      nameBn,
      rawNameEn: rawN,
      rawNameBn: rawB,
      requestedLetters,
      maxGuests,
      hasExplicitLimit,
    };
  }

  filterEvents() {
    return weddingConfig.events.filter(ev => {
      // Match against event's letter or any alias (e.g. 'h' matches 'gh')
      return this.guest.requestedLetters.some(req =>
        ev.letter === req || (ev.aliasLetters && ev.aliasLetters.includes(req))
      );
    });
  }

  initAttendanceState() {
    this.invitedEvents.forEach(ev => {
      this.eventAttendance[ev.id] = {
        attending: true,
        count: 1, // Start initial attendee count at 1
      };
    });
  }

  init() {
    this.setupPetals();
    this.setupAudio();
    this.setupTopControls();
    this.setupGateOpening();
    this.setupCountdown();
    this.setupTimeline();
    this.setupOurStory();
    this.setupRSVPForm();
    this.setupScrollAnimations();
    this.setupReplayButton();
    this.setupHostTrigger();
    this.applyLanguage();
    this.initAllCards3DTilt();
  }

  // --- HOST SECRET TRIGGER ---
  setupHostTrigger() {
    const hostBtn = document.getElementById('host-generator-link');
    if (this.isHost && hostBtn) {
      hostBtn.style.display = 'inline-flex';
    }

    // Secret easter-egg: Tap the footer gratitude paragraph 3 times quickly to reveal generator button
    const footerText = document.getElementById('footer-gratitude-text');
    if (footerText && hostBtn) {
      let tapCount = 0;
      let lastTap = 0;
      footerText.style.cursor = 'pointer';
      footerText.addEventListener('click', () => {
        const now = Date.now();
        if (now - lastTap < 700) {
          tapCount++;
          if (tapCount >= 3) {
            hostBtn.style.display = 'inline-flex';
            try { sessionStorage.setItem('wedding_is_host', '1'); } catch (e) {}
            hostBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        } else {
          tapCount = 1;
        }
        lastTap = now;
      });
    }
  }

  // --- FLOATING PETALS CANVAS ENGINE ---
  setupPetals() {
    this.petals = new PetalsCanvas('petals-canvas');
    this.petals.init();
  }

  // --- AUDIO CONTROLLER ---
  setupAudio() {
    this.audio = new Audio();
    this.audio.loop = true;
    this.audio.preload = 'auto';

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

  startMusicWithFade(targetVolume = 0.65, durationMs = 2500) {
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
      this.isPlaying = false;
      this.updateAudioButtonUI();
    });
  }

  toggleMusic() {
    if (!this.audio) return;
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
      this.updateAudioButtonUI();
    } else {
      this.audio.volume = 0.65;
      this.audio.play().then(() => {
        this.isPlaying = true;
        this.updateAudioButtonUI();
      }).catch(err => {
        console.warn('Audio play prevented:', err);
        this.isPlaying = false;
        this.updateAudioButtonUI();
      });
    }
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
        <div class="music-eq-bars" aria-label="Playing audio">
          <span class="music-bar music-bar-1"></span>
          <span class="music-bar music-bar-2"></span>
          <span class="music-bar music-bar-3"></span>
          <span class="music-bar music-bar-4"></span>
        </div>
      `;
      if (ripple) ripple.style.display = 'block';
    } else {
      audioBtn.classList.remove('playing');
      audioBtn.setAttribute('aria-label', this.t('musicPlay'));
      audioBtn.title = this.t('musicPlay');
      audioIcon.innerHTML = `
        <svg class="w-4 h-4 text-[#FFF6E5]/75 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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

    if (btnEn) btnEn.addEventListener('click', () => this.setLanguage('en'));
    if (btnBn) btnBn.addEventListener('click', () => this.setLanguage('bn'));

    if (audioBtn) {
      audioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
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

    // Toggle button active state
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

    // Set html element lang attribute
    document.documentElement.lang = this.currentLang;

    // Text translations
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = this.t(key);
    });

    // Wax seal subtitle in SVG
    const waxSealEl = document.getElementById('wax-seal-sub');
    if (waxSealEl) {
      waxSealEl.textContent = this.currentLang === 'bn' ? 'শুভ বিবাহ' : 'ROYAL WEDDING';
    }

    // Countdown target event label
    const countdownTargetEl = document.getElementById('countdown-target-event');
    if (countdownTargetEl && this.invitedEvents.length > 0) {
      countdownTargetEl.textContent = `${this.t('countdownTargetPrefix')} ${this.invitedEvents[0].title[this.currentLang]}`;
    }

    // Groom and Bride Name elements
    const groomName = weddingConfig.groom.name[this.currentLang];
    const brideName = weddingConfig.bride.name[this.currentLang];

    const heroGroomEl = document.getElementById('hero-groom-name');
    const heroBrideEl = document.getElementById('hero-bride-name');
    const formalGroomEl = document.getElementById('formal-groom-name');
    const formalBrideEl = document.getElementById('formal-bride-name');
    const groomParentsEl = document.getElementById('formal-groom-parents');
    const brideParentsEl = document.getElementById('formal-bride-parents');
    const groomHomeEl = document.getElementById('formal-groom-hometown');
    const brideHomeEl = document.getElementById('formal-bride-hometown');
    const heroGuestBadgeEl = document.getElementById('hero-guest-badge');
    const gateGuestBadgeEl = document.getElementById('gate-guest-badge');

    if (heroGroomEl) heroGroomEl.textContent = groomName;
    if (heroBrideEl) heroBrideEl.textContent = brideName;
    if (formalGroomEl) formalGroomEl.textContent = groomName;
    if (formalBrideEl) formalBrideEl.textContent = brideName;

    if (groomParentsEl) groomParentsEl.innerHTML = weddingConfig.groom.parents[this.currentLang];
    if (brideParentsEl) brideParentsEl.innerHTML = weddingConfig.bride.parents[this.currentLang];
    if (groomHomeEl) groomHomeEl.textContent = weddingConfig.groom.hometown[this.currentLang];
    if (brideHomeEl) brideHomeEl.textContent = weddingConfig.bride.hometown[this.currentLang];

    // Personalized Guest Badges
    const guestName = this.currentLang === 'bn' ? this.guest.nameBn : this.guest.nameEn;
    if (this.guest.isPersonalized) {
      if (heroGuestBadgeEl) {
        heroGuestBadgeEl.innerHTML = `
          <div class="inline-flex flex-col items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-[#2A0912]/90 via-[#451220]/90 to-[#2A0912]/90 border border-[#D4AF37]/60 shadow-[0_2px_12px_rgba(212,175,55,0.3)] my-1 max-w-[90vw]">
            <p class="text-[10px] font-semibold text-[#D4AF37] tracking-widest uppercase">
              ✦ ${this.t('guestBadgePrefix')} ✦
            </p>
            <p class="text-base sm:text-lg font-bold font-serif gold-foil-text tracking-wide drop-shadow leading-tight mt-0.5">
              ${guestName}
            </p>
          </div>
        `;
        heroGuestBadgeEl.style.display = 'block';
      }
      if (gateGuestBadgeEl) {
        gateGuestBadgeEl.innerHTML = `
          <div class="inline-flex flex-col items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-[#24090F]/90 via-[#3D101C]/90 to-[#24090F]/90 border border-[#D4AF37]/70 shadow-[0_2px_14px_rgba(212,175,55,0.4)] backdrop-blur-sm text-center max-w-[90vw]">
            <p class="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
              ✦ ${this.t('honoredGuestLabel')} ✦
            </p>
            <p class="text-base sm:text-lg font-bold font-serif gold-foil-text tracking-wider drop-shadow-md leading-tight mt-0.5">
              ${guestName}
            </p>
          </div>
        `;
        gateGuestBadgeEl.style.display = 'block';
      }
    } else {
      if (heroGuestBadgeEl) heroGuestBadgeEl.style.display = 'none';
      if (gateGuestBadgeEl) gateGuestBadgeEl.style.display = 'none';
    }

    // Refresh sub-views
    this.renderTimeline();
    this.renderRSVPEvents();
    this.setupRSVPForm();
    this.renderOurStory();
    this.updateCountdownNumbers();
    this.initAllCards3DTilt();
  }

  // --- SCENE 1: ROYAL DOUBLE GATES OPENING (v1) ---
  setupGateOpening() {
    const gateModal = document.getElementById('gate-modal');
    const sealBtn = document.getElementById('gate-wax-seal');
    const leftDoor = document.getElementById('gate-left-door');
    const rightDoor = document.getElementById('gate-right-door');
    const revealChamber = document.getElementById('gate-reveal-chamber');
    const gatePrompt = document.getElementById('gate-tap-prompt');

    if (!gateModal) return;

    const triggerOpen = () => {
      if (this.isCardOpened) return;
      this.isCardOpened = true;

      // Start music with gentle fade on first tap
      if (!this.isPlaying) {
        this.startMusicWithFade(0.65, 2500);
      }

      // Check prefers-reduced-motion
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced) {
        gateModal.style.transition = 'opacity 0.5s ease-out';
        gateModal.style.opacity = '0';
        setTimeout(() => {
          gateModal.style.display = 'none';
        }, 500);
        return;
      }

      // 1. Hide prompt & trigger golden shockwave + light beam
      if (gatePrompt) gatePrompt.style.opacity = '0';

      const shockwave = document.getElementById('gate-seal-shockwave');
      const lightSlit = document.getElementById('gate-light-slit');
      if (shockwave) shockwave.classList.add('active');
      if (lightSlit) lightSlit.classList.add('active');

      if (sealBtn) sealBtn.classList.add('seal-break');

      // 2. 3D Doors swing open outward with momentum
      setTimeout(() => {
        if (leftDoor) leftDoor.classList.add('left-door-opened');
        if (rightDoor) rightDoor.classList.add('right-door-opened');
      }, 160);

      // 3. Reveal interior couple names with golden burst
      setTimeout(() => {
        if (revealChamber) revealChamber.classList.add('chamber-revealed');
        this.launchGlitterConfetti();
      }, 380);

      // 4. Smooth fade out of gate overlay
      setTimeout(() => {
        gateModal.classList.add('gate-dismiss');
        setTimeout(() => {
          gateModal.style.display = 'none';
        }, 700);
      }, 1800);
    };

    if (sealBtn) {
      sealBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerOpen();
      });
    }

    gateModal.addEventListener('click', () => triggerOpen());

    window.addEventListener('keydown', (e) => {
      if (!this.isCardOpened && ['Enter', ' ', 'ArrowDown'].includes(e.key)) {
        triggerOpen();
      }
    });
  }

  setupReplayButton() {
    const replayBtn = document.getElementById('replay-gate-btn');
    if (!replayBtn) return;

    replayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const gateModal = document.getElementById('gate-modal');
      const leftDoor = document.getElementById('gate-left-door');
      const rightDoor = document.getElementById('gate-right-door');
      const sealBtn = document.getElementById('gate-wax-seal');
      const revealChamber = document.getElementById('gate-reveal-chamber');
      const gatePrompt = document.getElementById('gate-tap-prompt');

      if (!gateModal) return;

      this.isCardOpened = false;
      gateModal.style.display = 'flex';
      gateModal.style.opacity = '1';
      gateModal.classList.remove('gate-dismiss');

      const shockwave = document.getElementById('gate-seal-shockwave');
      const lightSlit = document.getElementById('gate-light-slit');
      if (shockwave) shockwave.classList.remove('active');
      if (lightSlit) lightSlit.classList.remove('active');

      if (leftDoor) leftDoor.classList.remove('left-door-opened');
      if (rightDoor) rightDoor.classList.remove('right-door-opened');
      if (sealBtn) sealBtn.classList.remove('seal-break');
      if (revealChamber) revealChamber.classList.remove('chamber-revealed');
      if (gatePrompt) gatePrompt.style.opacity = '1';

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  launchGlitterConfetti() {
    if (typeof window.confetti === 'function') {
      window.confetti({
        particleCount: 65,
        spread: 85,
        origin: { y: 0.55 },
        colors: ['#D4AF37', '#FCF6BA', '#F4A300', '#7A1F2B', '#E8C872'],
        disableForReducedMotion: true,
      });
    }
  }

  // --- SCENE 3: OUR STORY (EXACT RE-CREATION FROM v1 OurStory.jsx) ---
  setupOurStory() {
    // 1. View Toggle Switch: 3D Carousel vs Story Stage
    const carouselBtn = document.getElementById('story-toggle-carousel');
    const stageBtn = document.getElementById('story-toggle-stage');
    const mobileView = document.getElementById('story-mobile-view');
    const desktopView = document.getElementById('story-desktop-view');

    if (carouselBtn && stageBtn && mobileView && desktopView) {
      carouselBtn.addEventListener('click', () => {
        this.storyViewMode = 'carousel';
        carouselBtn.classList.add('active');
        stageBtn.classList.remove('active');
        mobileView.classList.remove('hidden');
        desktopView.classList.add('hidden');
        this.setStorySlide(this.storySlideIndex);
      });

      stageBtn.addEventListener('click', () => {
        this.storyViewMode = 'stage';
        stageBtn.classList.add('active');
        carouselBtn.classList.remove('active');
        desktopView.classList.remove('hidden');
        mobileView.classList.add('hidden');
        this.renderStoryDesktopStage();
      });
    }

    // 2. Mobile Carousel Navigation Buttons (44px min targets)
    const prevBtn = document.getElementById('story-carousel-prev');
    const nextBtn = document.getElementById('story-carousel-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.storySlideIndex > 0) {
          this.setStorySlide(this.storySlideIndex - 1);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.storySlideIndex < weddingConfig.storySlides.length - 1) {
          this.setStorySlide(this.storySlideIndex + 1);
        }
      });
    }

    // 3. Touch / Pointer Swipe Gesture Handling for Mobile Carousel
    const container = document.getElementById('story-carousel-container');
    if (container) {
      let touchStartX = 0;
      let touchEndX = 0;
      let isSwiping = false;

      container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        isSwiping = true;
      }, { passive: true });

      container.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        touchEndX = e.changedTouches[0].screenX;
        isSwiping = false;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 40) {
          if (diff < 0 && this.storySlideIndex < weddingConfig.storySlides.length - 1) {
            this.setStorySlide(this.storySlideIndex + 1);
          } else if (diff > 0 && this.storySlideIndex > 0) {
            this.setStorySlide(this.storySlideIndex - 1);
          }
        }
      }, { passive: true });
    }

    // 4. Desktop Stage Controls
    const stagePrevBtn = document.getElementById('story-stage-prev');
    const stageNextBtn = document.getElementById('story-stage-next');

    if (stagePrevBtn) {
      stagePrevBtn.addEventListener('click', () => {
        if (this.storyDesktopStage > 0) {
          this.setStoryStage(this.storyDesktopStage - 1);
        }
      });
    }

    if (stageNextBtn) {
      stageNextBtn.addEventListener('click', () => {
        if (this.storyDesktopStage < weddingConfig.storyDesktopStages.length - 1) {
          this.setStoryStage(this.storyDesktopStage + 1);
        }
      });
    }

    // 5. Desktop Tilt Card initialization
    const desktopCard = document.getElementById('story-desktop-tilt-card');
    if (desktopCard) {
      this.setupStoryTilt(desktopCard);
    }

    // 6. Keyboard Arrow Navigation (v1 lines 136-149)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        if (this.storyViewMode === 'carousel') {
          if (this.storySlideIndex > 0) this.setStorySlide(this.storySlideIndex - 1);
        } else {
          if (this.storyDesktopStage > 0) this.setStoryStage(this.storyDesktopStage - 1);
        }
      } else if (e.key === 'ArrowRight') {
        if (this.storyViewMode === 'carousel') {
          if (this.storySlideIndex < weddingConfig.storySlides.length - 1) this.setStorySlide(this.storySlideIndex + 1);
        } else {
          if (this.storyDesktopStage < weddingConfig.storyDesktopStages.length - 1) this.setStoryStage(this.storyDesktopStage + 1);
        }
      }
    });

    this.renderOurStory();
  }

  renderOurStory() {
    this.renderStoryMobileCarousel();
    this.renderStoryDesktopStage();
  }

  renderStoryMobileCarousel() {
    const track = document.getElementById('story-carousel-track');
    const dotsContainer = document.getElementById('story-carousel-dots');
    if (!track) return;

    track.innerHTML = '';
    if (dotsContainer) dotsContainer.innerHTML = '';

    weddingConfig.storySlides.forEach((slide, idx) => {
      const slideEl = document.createElement('div');
      slideEl.className = 'story-carousel-slide';

      // Clean single language title (no mixed EN/BN blocks)
      const titleText = slide.title[this.currentLang];
      const titleHtml = `
        <div class="mb-2">
          <h3 class="font-bold text-xl sm:text-2xl gold-foil-text leading-tight">${titleText}</h3>
        </div>
      `;

      slideEl.innerHTML = `
        <div class="tilt-card story-tilt-inner shadow-3d-card">
          <!-- Stage Badge (v1 line 200) -->
          <span class="inline-block px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold mb-3 shadow-sm">
            ${slide.tag[this.currentLang]}
          </span>

          <!-- Image with 3D Border (v1 line 205) -->
          <div class="story-slide-img-box shadow-3d-gold">
            <img
              src="${slide.img}"
              alt="${slide.alt}"
              loading="lazy"
              onerror="this.src='${slide.fallbackImg}'"
            />
          </div>

          <!-- Slide Title (v1 lines 218-236) -->
          ${titleHtml}

          <!-- Tagline (v1 line 239) -->
          <p class="text-xs font-medium text-yellow-300 mb-2">
            ${slide.tagline[this.currentLang]}
          </p>

          <!-- Description (v1 line 244) -->
          <p class="text-xs sm:text-sm text-[#FFF6E5]/85 leading-relaxed max-w-xs font-serif">
            ${slide.description[this.currentLang]}
          </p>
        </div>
      `;

      // Attach 3D Tilt interaction
      const tiltCard = slideEl.querySelector('.tilt-card');
      if (tiltCard) {
        this.setupStoryTilt(tiltCard);
      }

      track.appendChild(slideEl);

      // Create Dot Indicator
      if (dotsContainer) {
        const dot = document.createElement('button');
        dot.className = `story-carousel-dot ${this.storySlideIndex === idx ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
        dot.innerHTML = `<span class="story-dot-core"></span>`;
        dot.addEventListener('click', () => {
          this.setStorySlide(idx);
        });
        dotsContainer.appendChild(dot);
      }
    });

    this.setStorySlide(this.storySlideIndex);
  }

  setStorySlide(index) {
    this.storySlideIndex = index;
    const track = document.getElementById('story-carousel-track');
    if (track) {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    // Update dots
    const dots = document.querySelectorAll('.story-carousel-dot');
    dots.forEach((dot, idx) => {
      if (idx === index) dot.classList.add('active');
      else dot.classList.remove('active');
    });

    this.updateCarouselControls();

    // Confetti on final slide (Sakib & Easha Together) - v1 lines 120-132
    if (index === weddingConfig.storySlides.length - 1) {
      this.fireConfetti();
    }
  }

  updateCarouselControls() {
    const prevBtn = document.getElementById('story-carousel-prev');
    const nextBtn = document.getElementById('story-carousel-next');

    if (prevBtn) {
      prevBtn.disabled = this.storySlideIndex === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = this.storySlideIndex === weddingConfig.storySlides.length - 1;
      if (!nextBtn.disabled) {
        nextBtn.classList.add('next-gold-glow');
      } else {
        nextBtn.classList.remove('next-gold-glow');
      }
    }
  }

  renderStoryDesktopStage() {
    // 1. Render Steppers
    const steppersContainer = document.getElementById('story-desktop-steppers');
    if (steppersContainer) {
      steppersContainer.innerHTML = '';
      weddingConfig.storyDesktopStages.forEach((stage, idx) => {
        const btn = document.createElement('button');
        btn.className = `story-stage-tab-btn ${this.storyDesktopStage === idx ? 'active' : ''}`;
        btn.innerHTML = `<span>${stage.label[this.currentLang]}</span>`;
        btn.addEventListener('click', () => {
          this.setStoryStage(idx);
        });
        steppersContainer.appendChild(btn);
      });
    }

    // 2. Move Vine Heart Indicator (v1 lines 334-340)
    const heart = document.getElementById('story-vine-heart');
    if (heart) {
      const pct = (this.storyDesktopStage / 2) * 82 + 9;
      heart.style.left = `${pct}%`;
    }

    // 3. Render Visual Stage (v1 lines 344-426)
    const visual = document.getElementById('story-stage-visual');
    const stage = weddingConfig.storyDesktopStages[this.storyDesktopStage];
    if (!visual || !stage) return;

    if (this.storyDesktopStage === 2) {
      // Stage 3: Sakib & Easha Together
      visual.innerHTML = `
        <div class="flex flex-col items-center py-2 animate-fade-in">
          <div class="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-3d-gold bg-[#150307]">
            <img
              src="${stage.togetherImg}"
              alt="Sakib and Easha Together"
              class="w-full h-full object-cover"
              onerror="this.src='${stage.togetherFallback}'"
            />
          </div>
          <div class="mt-3 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-yellow-400 to-[#D4AF37] text-[#24090F] text-xs font-bold shadow-md">
            ${stage.togetherBadge[this.currentLang]}
          </div>
        </div>
      `;
    } else {
      // Stage 0 & 1: Groom & Bride walking towards each other
      const groomTranslate = this.storyDesktopStage * 18;
      const brideTranslate = -this.storyDesktopStage * 18;

      visual.innerHTML = `
        <div class="story-desktop-avatars-row">
          <!-- Groom -->
          <div class="flex flex-col items-center transition-all duration-700" style="transform: translateX(${groomTranslate}px)">
            <div class="story-avatar-box">
              <img
                src="${stage.groomImg}"
                alt="Groom"
                onerror="this.src='${stage.groomFallback}'"
              />
            </div>
            <span class="mt-2 text-xs font-semibold text-[#D4AF37]">
              ${stage.groomName[this.currentLang]}
            </span>
          </div>

          <!-- Sparkle motif in center -->
          <div class="flex flex-col items-center text-[#D4AF37]">
            <svg class="w-6 h-6 text-yellow-400 animate-spin" style="animation-duration: 8s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            </svg>
            <span class="text-[10px] text-[#FFF6E5]/80 italic mt-1 font-serif">
              ${stage.centerBadge[this.currentLang]}
            </span>
          </div>

          <!-- Bride -->
          <div class="flex flex-col items-center transition-all duration-700" style="transform: translateX(${brideTranslate}px)">
            <div class="story-avatar-box">
              <img
                src="${stage.brideImg}"
                alt="Bride"
                onerror="this.src='${stage.brideFallback}'"
              />
            </div>
            <span class="mt-2 text-xs font-semibold text-[#D4AF37]">
              ${stage.brideName[this.currentLang]}
            </span>
          </div>
        </div>
      `;
    }

    // 4. Render Stage Description
    const desc = document.getElementById('story-stage-desc');
    if (desc) {
      desc.innerHTML = `
        <h3 class="font-bold text-base sm:text-lg gold-foil-text font-serif">
          ${stage.title[this.currentLang]}
        </h3>
        <p class="text-xs text-[#FFF6E5]/85 mt-1 leading-relaxed font-serif">
          ${stage.description[this.currentLang]}
        </p>
      `;
    }

    // 5. Update Desktop Nav Buttons & Counter
    const prevBtn = document.getElementById('story-stage-prev');
    const nextBtn = document.getElementById('story-stage-next');
    const prevTxt = document.getElementById('story-stage-prev-txt');
    const nextTxt = document.getElementById('story-stage-next-txt');
    const counter = document.getElementById('story-stage-counter');

    if (prevBtn) prevBtn.disabled = this.storyDesktopStage === 0;
    if (nextBtn) {
      nextBtn.disabled = this.storyDesktopStage === weddingConfig.storyDesktopStages.length - 1;
      if (!nextBtn.disabled) nextBtn.classList.add('next-gold-glow');
      else nextBtn.classList.remove('next-gold-glow');
    }

    const prevWord = this.currentLang === 'bn' ? 'পূর্ববর্তী' : 'Previous';
    const nextWord = this.currentLang === 'bn' ? 'পরবর্তী' : 'Next';
    if (prevTxt) prevTxt.textContent = prevWord;
    if (nextTxt) nextTxt.textContent = nextWord;

    if (counter) {
      const num = this.currentLang === 'bn' ? toBengaliNumerals(this.storyDesktopStage + 1) : (this.storyDesktopStage + 1);
      const total = this.currentLang === 'bn' ? '৩' : '3';
      const hint = this.currentLang === 'bn' ? '← / → কি চাপুন' : 'Use ← / → keys';
      counter.textContent = `${num} / ${total} • ${hint}`;
    }
  }

  setStoryStage(index) {
    this.storyDesktopStage = index;
    this.renderStoryDesktopStage();

    if (index === 2) {
      this.fireConfetti();
    }
  }

  setupUniversal3DTilt(card, maxTilt = 8) {
    if (!card || card.dataset.tiltBound) return;
    card.dataset.tiltBound = 'true';
    card.style.transformStyle = 'preserve-3d';
    card.style.willChange = 'transform';
    card.style.transition = 'transform 0.15s ease-out';

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);
      if (clientX === undefined || clientY === undefined) return;
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const onLeave = () => {
      card.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.15s ease-out';
    });
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    card.addEventListener('touchmove', onMove, { passive: true });
    card.addEventListener('touchend', onLeave);
  }

  setupStoryTilt(card) {
    this.setupUniversal3DTilt(card, 8);
  }

  initAllCards3DTilt() {
    // 1. Story cards
    document.querySelectorAll('.story-tilt-inner, #story-desktop-tilt-card').forEach(el => {
      this.setupUniversal3DTilt(el, 8);
    });
    // 2. Timeline program ceremony cards
    document.querySelectorAll('.timeline-card').forEach(el => {
      this.setupUniversal3DTilt(el, 7);
    });
    // 3. Parents cards & Formal card
    document.querySelectorAll('.formal-parent-card, #formal-invitation-card').forEach(el => {
      this.setupUniversal3DTilt(el, 6);
    });
    // 4. Countdown card
    const countdownInner = document.querySelector('.countdown-glass-card');
    if (countdownInner) this.setupUniversal3DTilt(countdownInner, 6);
    // 5. Transit cards
    document.querySelectorAll('.transit-card').forEach(el => {
      this.setupUniversal3DTilt(el, 6);
    });
    // 6. RSVP card
    const rsvpCard = document.querySelector('#rsvp-form, #public-wishes-card');
    if (rsvpCard) this.setupUniversal3DTilt(rsvpCard, 5);
  }

  fireConfetti() {
    if (typeof confetti === 'function') {
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#D4AF37', '#FCF6BA', '#F4A300', '#7A1F2B'],
          disableForReducedMotion: true,
        });
      } catch (err) {
        // Fallback
      }
    }
  }

  // --- EVENTS TIMELINE (v2 stem, filtered) ---
  setupTimeline() {
    this.renderTimeline();
  }

  renderTimeline() {
    const container = document.getElementById('timeline-events-container');
    if (!container) return;

    // Reset container with the continuous liquid gold stem preserved
    container.innerHTML = '<div id="timeline-liquid-stem" class="timeline-liquid-stem" aria-hidden="true"></div>';

    this.invitedEvents.forEach((ev) => {
      const card = document.createElement('div');
      card.className = 'timeline-node relative flex items-start gap-4 mb-8';

      let iconSvg = '';
      if (ev.icon === 'sparkles') {
        iconSvg = `<svg class="w-5 h-5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>`;
      } else if (ev.icon === 'flower') {
        iconSvg = `<svg class="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M12 2a4 4 0 0 0-4 4c0 2 2 3 4 5 2-2 4-3 4-5a4 4 0 0 0-4-4Z"></path><path d="M12 22a4 4 0 0 0 4-4c0-2-2-3-4-5-2 2-4 3-4-5a4 4 0 0 0 4 4Z"></path></svg>`;
      } else if (ev.icon === 'heart') {
        iconSvg = `<svg class="w-5 h-5 text-rose-300 fill-rose-900/40" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`;
      } else {
        iconSvg = `<svg class="w-5 h-5 text-yellow-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path></svg>`;
      }

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
            <p class="flex items-start gap-2">
              <span class="text-[#D4AF37] mt-0.5">📍</span>
              <span class="${ev.isVenueTBA ? 'text-yellow-300 italic' : ''}">
                ${ev.venueName[this.currentLang]}<br/>
                <span class="text-[11px] text-[#FFF6E5]/65">${ev.venueAddress[this.currentLang]}</span>
              </span>
            </p>
          </div>

          <div class="mt-3.5 pt-2">
            <button
              class="ics-download-btn w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#3D101C] hover:bg-[#4E1424] text-[#FFF6E5] text-xs font-semibold border border-[#D4AF37]/40 transition-colors min-h-[44px]"
              data-event-id="${ev.id}"
            >
              <span>📥</span>
              <span>${this.t('addToCalendarBtn')}</span>
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    container.querySelectorAll('.ics-download-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const evId = btn.getAttribute('data-event-id');
        const ev = this.invitedEvents.find(item => item.id === evId);
        if (ev) this.downloadIcsFile(ev);
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
    const groomTitle = weddingConfig.groom.name[this.currentLang];
    const brideTitle = weddingConfig.bride.name[this.currentLang];
    const title = `${event.title[this.currentLang]} - ${groomTitle} & ${brideTitle}`;
    const description = `${event.title[this.currentLang]}\\n${event.subtitle[this.currentLang]}\\n${groomTitle} & ${brideTitle}`;
    const location = `${event.venueName[this.currentLang]}, ${event.venueAddress[this.currentLang]}`;

    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Sakib & Easha Wedding//Final Invitation//EN',
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

  // --- STANDALONE COUNTDOWN (v1) ---
  setupCountdown() {
    this.updateCountdownNumbers();
    if (this.countdownTimer) clearInterval(this.countdownTimer);
    this.countdownTimer = setInterval(() => this.updateCountdownNumbers(), 1000);
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
    const targetNameEl = document.getElementById('countdown-target-event');

    if (targetNameEl) {
      targetNameEl.textContent = `${this.t('countdownTargetPrefix')} ${primaryEvent.title[this.currentLang]}`;
    }

    if (diff <= 0) {
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

  // --- RSVP FORM & DIRECT SHEET WEBHOOK / PUBLIC WISHES ---
  setupRSVPForm() {
    const isPersonalized = this.guest.isPersonalized;
    const rsvpForm = document.getElementById('rsvp-form');
    const publicWishesCard = document.getElementById('public-wishes-card');
    const headerBadge = document.getElementById('rsvp-header-badge');
    const headerTitle = document.getElementById('rsvp-header-title');
    const headerSubtitle = document.getElementById('rsvp-header-subtitle');

    if (isPersonalized) {
      // 1. Personalized Invited Guest -> Seat Reservation RSVP
      if (rsvpForm) rsvpForm.classList.remove('hidden');
      if (publicWishesCard) publicWishesCard.classList.add('hidden');

      if (headerBadge) headerBadge.textContent = this.t('rsvpBadge');
      if (headerTitle) headerTitle.textContent = this.t('rsvpHeading');
      if (headerSubtitle) headerSubtitle.textContent = this.t('rsvpSubheading');

      const nameInput = document.getElementById('rsvp-guest-name');
      if (nameInput) {
        const defaultName = this.currentLang === 'bn'
          ? (this.guest.rawNameBn || this.guest.rawNameEn || '')
          : (this.guest.rawNameEn || this.guest.rawNameBn || '');
        nameInput.value = defaultName;
      }

      this.renderRSVPEvents();

      if (rsvpForm && !rsvpForm.dataset.bound) {
        rsvpForm.dataset.bound = 'true';
        rsvpForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          await this.submitSheetRSVP();
        });
      }

      const modifyBtn = document.getElementById('btn-rsvp-modify');
      if (modifyBtn && !modifyBtn.dataset.bound) {
        modifyBtn.dataset.bound = 'true';
        modifyBtn.addEventListener('click', () => {
          const formEl = document.getElementById('rsvp-form');
          const successCard = document.getElementById('rsvp-success-card');
          if (formEl && successCard) {
            successCard.classList.add('hidden');
            formEl.classList.remove('hidden');
            formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      }
    } else {
      // 2. Public / Social Media Visitor -> Wishes & Prayers Box (Idea 1)
      if (rsvpForm) rsvpForm.classList.add('hidden');
      if (publicWishesCard) publicWishesCard.classList.remove('hidden');

      if (headerBadge) headerBadge.textContent = this.t('publicWishesBadge');
      if (headerTitle) headerTitle.textContent = this.t('publicWishesHeading');
      if (headerSubtitle) headerSubtitle.textContent = this.t('publicWishesSubheading');

      const wishesForm = document.getElementById('public-wishes-form');
      if (wishesForm && !wishesForm.dataset.bound) {
        wishesForm.dataset.bound = 'true';
        wishesForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          await this.submitPublicWishes();
        });
      }

      const sendAnotherBtn = document.getElementById('btn-send-another-wish');
      if (sendAnotherBtn && !sendAnotherBtn.dataset.bound) {
        sendAnotherBtn.dataset.bound = 'true';
        sendAnotherBtn.addEventListener('click', () => {
          const wishesSuccess = document.getElementById('public-wishes-success');
          const wishesFormEl = document.getElementById('public-wishes-form');
          const wishesText = document.getElementById('public-wishes-text');
          if (wishesSuccess && wishesFormEl) {
            wishesSuccess.classList.add('hidden');
            wishesFormEl.classList.remove('hidden');
            if (wishesText) wishesText.value = '';
            wishesFormEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      }
    }
  }

  async submitPublicWishes() {
    const nameInput = document.getElementById('public-wishes-name');
    const textInput = document.getElementById('public-wishes-text');
    const isBn = this.currentLang === 'bn';

    const rawName = (nameInput?.value || '').trim();
    const visitorName = rawName || (isBn ? 'শুভাকাঙ্ক্ষী' : 'Well-wisher');
    const wishText = (textInput?.value || '').trim();

    if (!wishText) {
      if (textInput) textInput.focus();
      return;
    }

    const submitBtn = document.getElementById('btn-public-wishes-submit');
    const submitText = document.getElementById('btn-public-wishes-text');
    const submitIcon = document.getElementById('btn-public-wishes-icon');

    if (submitBtn) submitBtn.disabled = true;
    if (submitIcon) submitIcon.textContent = '⏳';
    if (submitText) submitText.textContent = this.t('publicWishesSubmitting');

    const attendingLabel = isBn ? 'শুভেচ্ছা বার্তা (সোশ্যাল মিডিয়া)' : 'Social Media Well-wisher';
    const totalGuestsLabel = isBn ? '০ জন' : '0 guests';

    const payload = {
      timestamp: new Date().toISOString(),
      email: "-",
      fullName: visitorName,
      guestName: visitorName,
      attendingEvents: attendingLabel,
      totalGuests: totalGuestsLabel,
      totalSum: 0,
      holudGuests: "-",
      borHoludCount: 0,
      konerHoludCount: 0,
      boubhatGuests: "-",
      receptionCount: 0,
      weddingCount: 0,
      wishes: wishText,
      // Compatibility mapping for Google Apps Script:
      attendingDetails: visitorName,
      declinedDetails: wishText, // Keeps wishes visible even with legacy Apps Script!
      language: totalGuestsLabel
    };

    try {
      const webhookUrl = weddingConfig.rsvpWebhookUrl || "https://script.google.com/macros/s/AKfycbzI2-GVXi36DCBrPBCh5ral62uAbDUbsHHeMQKGxiFzw8jYPz_Sv95xUZywj0ZWHLvS/exec";
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });
      this.showPublicWishesSuccess();
    } catch (err) {
      console.error('Error submitting public wishes:', err);
      this.showPublicWishesSuccess();
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (submitIcon) submitIcon.textContent = '💖';
      if (submitText) submitText.textContent = this.t('publicWishesSubmitBtn');
    }
  }

  showPublicWishesSuccess() {
    const formEl = document.getElementById('public-wishes-form');
    const successCard = document.getElementById('public-wishes-success');
    if (formEl) formEl.classList.add('hidden');
    if (successCard) {
      successCard.classList.remove('hidden');
      successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    this.launchGlitterConfetti();
  }

  async submitSheetRSVP() {
    const nameInput = document.getElementById('rsvp-guest-name');
    const isBn = this.currentLang === 'bn';
    const guestName = (nameInput?.value || '').trim();

    if (!guestName) {
      alert(this.t('rsvpNameAlert'));
      if (nameInput) nameInput.focus();
      return;
    }

    const attended = this.invitedEvents.filter(ev => this.eventAttendance[ev.id]?.attending);
    const declined = this.invitedEvents.filter(ev => !this.eventAttendance[ev.id]?.attending);

    const attendingLines = attended.map(ev => {
      const count = this.eventAttendance[ev.id]?.count || 1;
      const countStr = isBn ? `${toBengaliNumerals(count)} জন` : `${count} guest${count > 1 ? 's' : ''}`;
      return `${ev.title[this.currentLang]} (${ev.dateDisplay[this.currentLang]}): ${countStr}`;
    });

    const declinedLines = declined.map(ev => {
      return `${ev.title[this.currentLang]} (${ev.dateDisplay[this.currentLang]})`;
    });

    // 1. Clean list of attending ceremony titles
    const attendingEventNames = attended.length > 0
      ? attended.map(ev => ev.title[this.currentLang]).join(', ')
      : (isBn ? 'কোনোটিই নয়' : 'None');

    // 2. Individual ceremony attendee counts & Total Guests as SUM (Bor Holud, Koner Holud, Biye, Boubhat)
    let borHoludCount = 0;
    let konerHoludCount = 0;
    let weddingCount = 0;
    let receptionCount = 0;

    attended.forEach(ev => {
      const c = this.eventAttendance[ev.id]?.count || 1;
      if (ev.id === 'grooms_holud') borHoludCount = c;
      else if (ev.id === 'brides_holud') konerHoludCount = c;
      else if (ev.id === 'wedding') weddingCount = c;
      else if (ev.id === 'reception') receptionCount = c;
    });

    const totalSum = borHoludCount + konerHoludCount + weddingCount + receptionCount;
    const totalGuestsStr = isBn
      ? `${toBengaliNumerals(totalSum)} জন`
      : `${totalSum} guest${totalSum > 1 ? 's' : ''}`;

    // 3. Holud guests string (handles Bor Holud only, Koner Holud only, or both)
    let holudGuestsStr = "-";
    if (borHoludCount > 0 && konerHoludCount > 0) {
      const holudTotal = borHoludCount + konerHoludCount;
      holudGuestsStr = isBn
        ? `${toBengaliNumerals(holudTotal)} জন (বর: ${toBengaliNumerals(borHoludCount)}, কনে: ${toBengaliNumerals(konerHoludCount)})`
        : `${holudTotal} (Groom: ${borHoludCount}, Bride: ${konerHoludCount})`;
    } else if (borHoludCount > 0) {
      holudGuestsStr = isBn ? `${toBengaliNumerals(borHoludCount)} জন` : `${borHoludCount}`;
    } else if (konerHoludCount > 0) {
      holudGuestsStr = isBn ? `${toBengaliNumerals(konerHoludCount)} জন` : `${konerHoludCount}`;
    }

    // 4. Boubhat guests string
    const boubhatGuestsStr = receptionCount > 0
      ? (isBn ? `${toBengaliNumerals(receptionCount)} জন` : `${receptionCount}`)
      : "-";

    // 5. Optional wishes / blessings
    const wishesInput = document.getElementById('rsvp-guest-wishes');
    const guestWishes = (wishesInput?.value || '').trim();

    const submitBtn = document.getElementById('btn-rsvp-submit');
    const submitText = document.getElementById('btn-rsvp-text');
    const submitIcon = document.getElementById('btn-rsvp-icon');

    if (submitBtn) submitBtn.disabled = true;
    if (submitIcon) submitIcon.textContent = '⏳';
    if (submitText) submitText.textContent = this.t('submittingRSVP');

    // Mapped precisely with individual event counts & total sum
    const payload = {
      timestamp: new Date().toISOString(),
      email: "-",
      fullName: guestName,
      guestName: guestName,
      attendingEvents: attendingEventNames,
      totalGuests: totalGuestsStr,
      totalSum: totalSum,
      holudGuests: holudGuestsStr,
      borHoludCount: borHoludCount,
      konerHoludCount: konerHoludCount,
      boubhatGuests: boubhatGuestsStr,
      receptionCount: receptionCount,
      weddingCount: weddingCount,
      wishes: guestWishes,
      // Compatibility mapping with currently deployed Apps Script:
      attendingDetails: guestName,
      declinedDetails: attendingEventNames,
      language: totalGuestsStr
    };

    try {
      const webhookUrl = weddingConfig.rsvpWebhookUrl || "https://script.google.com/macros/s/AKfycbzI2-GVXi36DCBrPBCh5ral62uAbDUbsHHeMQKGxiFzw8jYPz_Sv95xUZywj0ZWHLvS/exec";
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      this.showRSVPSuccess(guestName, attendingLines, declinedLines);
    } catch (err) {
      console.error('Error submitting RSVP:', err);
      // Gracefully show success
      this.showRSVPSuccess(guestName, attendingLines, declinedLines);
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (submitIcon) submitIcon.textContent = '✨';
      if (submitText) submitText.textContent = this.t('submitRSVPBtn');
    }
  }

  showRSVPSuccess(guestName, attendingLines, declinedLines) {
    const formEl = document.getElementById('rsvp-form');
    const successCard = document.getElementById('rsvp-success-card');
    const nameEl = document.getElementById('rsvp-summary-name');
    const attendingEl = document.getElementById('rsvp-summary-attending');
    const declinedEl = document.getElementById('rsvp-summary-declined');
    const declinedRow = document.getElementById('rsvp-summary-declined-row');

    if (nameEl) nameEl.textContent = guestName;

    if (attendingEl) {
      if (attendingLines.length > 0) {
        attendingEl.innerHTML = attendingLines.map(line => `<div class="py-0.5">• ${line}</div>`).join('');
      } else {
        attendingEl.innerHTML = `<div class="py-0.5 italic text-[#FFF6E5]/60">${this.t('rsvpNoneSelected')}</div>`;
      }
    }

    if (declinedEl && declinedRow) {
      if (declinedLines.length > 0) {
        declinedRow.classList.remove('hidden');
        declinedEl.innerHTML = declinedLines.map(line => `<div class="py-0.5">• ${line}</div>`).join('');
      } else {
        declinedRow.classList.add('hidden');
      }
    }

    if (formEl) formEl.classList.add('hidden');
    if (successCard) {
      successCard.classList.remove('hidden');
      successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
              <div class="flex flex-col items-end">
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    class="stepper-btn stepper-minus w-9 h-9 rounded-xl bg-[#22070E] border border-[#D4AF37]/50 text-[#D4AF37] font-bold text-lg flex items-center justify-center active:scale-95 transition-transform"
                    data-event-id="${ev.id}"
                    ${count <= 1 ? 'disabled style="opacity:0.3;cursor:not-allowed"' : ''}
                    aria-label="Decrease attendee count"
                  >-</button>

                  <div class="min-w-[42px] px-2 py-1 bg-[#1C050B] border border-[#D4AF37]/40 rounded-xl text-center">
                    <span class="text-sm font-bold text-[#FFF6E5]">
                      ${this.currentLang === 'bn' ? toBengaliNumerals(count) : count}
                    </span>
                  </div>

                  <button
                    type="button"
                    class="stepper-btn stepper-plus w-9 h-9 rounded-xl bg-[#22070E] border border-[#D4AF37]/50 text-[#D4AF37] font-bold text-lg flex items-center justify-center active:scale-95 transition-transform"
                    data-event-id="${ev.id}"
                    ${count >= maxAllowed ? 'disabled style="opacity:0.3;cursor:not-allowed"' : ''}
                    aria-label="Increase attendee count"
                  >+</button>
                </div>
                ${this.guest.hasExplicitLimit ? `
                  <span class="text-[10px] text-[#D4AF37]/70 mt-1">
                    ${this.currentLang === 'bn' ? `সর্বোচ্চ ${toBengaliNumerals(maxAllowed)} জন বরাদ্দ` : `Max ${maxAllowed} guests allotted`}
                  </span>
                ` : ''}
              </div>
            ` : `
              <span class="text-xs font-semibold px-2.5 py-1 rounded-xl bg-[#1C050B] border border-[#D4AF37]/30 text-[#D4AF37]">
                ${this.currentLang === 'bn' ? '১ জন (বরাদ্দকৃত)' : '1 Guest (Allotted)'}
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

    container.querySelectorAll('.event-attendance-checkbox').forEach(box => {
      box.addEventListener('change', () => {
        const evId = box.getAttribute('data-event-id');
        this.eventAttendance[evId].attending = box.checked;
        this.renderRSVPEvents();
      });
    });

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
    const isBn = this.currentLang === 'bn';
    const guestName = (nameInput?.value || '').trim() || (isBn ? 'সম্মানিত অতিথি' : 'Guest');

    const attended = this.invitedEvents.filter(ev => this.eventAttendance[ev.id]?.attending);
    const declined = this.invitedEvents.filter(ev => !this.eventAttendance[ev.id]?.attending);

    const coupleStr = isBn ? 'সাকিব ও ভাবনা' : 'Sakib & Easha';
    const headerTitle = isBn ? '*উপস্থিতি নিশ্চিতকরণ (RSVP)*' : '*Wedding RSVP Confirmation*';
    const coupleLabel = isBn ? '👰 বর ও কনে:' : '👰 Couple:';
    const guestLabel = isBn ? '👤 অতিথির নাম:' : '👤 Guest Name:';

    const lines = [
      headerTitle,
      `${coupleLabel} ${coupleStr}`,
      `${guestLabel} ${guestName}`,
      ``,
    ];

    if (attended.length === 0) {
      lines.push(
        isBn ? `❌ *উপস্থিতি:*` : `❌ *Attendance:*`,
        isBn
          ? `  • আন্তরিক দুঃখ প্রকাশ করছি, কোনো অনুষ্ঠানে উপস্থিত হতে পারছি না`
          : `  • Regretfully unable to attend the ceremonies`
      );
    } else {
      lines.push(isBn ? `✨ *অনুষ্ঠানভিত্তিক উপস্থিতি:*` : `✨ *Attending Ceremonies & Guests:*`);
      attended.forEach(ev => {
        const count = this.eventAttendance[ev.id]?.count || 1;
        const countStr = isBn ? `${toBengaliNumerals(count)} জন` : `${count} guest${count > 1 ? 's' : ''}`;
        lines.push(`  • ${ev.title[this.currentLang]}: ${countStr}`);
      });

      if (declined.length > 0) {
        lines.push(``, isBn ? `❌ *যে অনুষ্ঠানে থাকতে পারছি না:*` : `❌ *Unable to Attend:*`);
        declined.forEach(ev => {
          lines.push(`  • ${ev.title[this.currentLang]}`);
        });
      }
    }

    lines.push(
      ``,
      isBn
        ? `_সাকিব ও ভাবনা এর শুভ বিবাহ ডিজিটাল কার্ডের মাধ্যমে প্রেরিত_`
        : `_Sent via Sakib & Easha Wedding E-Invitation_`
    );

    const message = lines.join('\n');
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${weddingConfig.rsvpWhatsAppNumber}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  }

  // --- SCROLL ANIMATIONS & DYNAMICS ---
  setupScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Force all scenes visible immediately if reduced motion is requested
      document.querySelectorAll('.scroll-scene').forEach(s => s.classList.add('scene-visible'));
      return;
    }

    // 1. 3D Parchment Unfold Intersection Observer
    const scenes = document.querySelectorAll('.scroll-scene');
    const sceneObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scene-visible');
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px',
    });
    scenes.forEach(scene => sceneObserver.observe(scene));

    // 2. Elements for Scroll Progress & Parallax
    const sealContainer = document.getElementById('scroll-seal-container');
    const sealBtn = document.getElementById('floating-scroll-seal');
    const sealProgressBar = document.getElementById('seal-progress-bar');
    const timelineContainer = document.getElementById('timeline-events-container');
    const heroSection = document.getElementById('hero');
    const lanternLeft = heroSection ? heroSection.querySelector('.lantern-left') : null;
    const lanternRight = heroSection ? heroSection.querySelector('.lantern-right') : null;
    const mandala = heroSection ? heroSection.querySelector('.mandala-ring-outer') : null;

    // SVG Ring circumference: 2 * PI * 23 = 144.513
    const ringCircumference = 144.51;
    if (sealProgressBar) {
      sealProgressBar.style.strokeDasharray = `${ringCircumference}`;
      sealProgressBar.style.strokeDashoffset = `${ringCircumference}`;
    }

    // Floating seal tap -> Smooth scroll back to top
    if (sealBtn) {
      sealBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    }

    // 3. High Performance 60/120fps Scroll Loop
    let isTicking = false;

    const onScroll = () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset || 0;
          const docHeight = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
          const scrollProgress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;

          // A. Floating Mini Wax Seal Visibility & Ring Fill
          if (sealContainer && sealProgressBar) {
            if (scrollY > 260) {
              sealContainer.classList.add('seal-visible');
              const offset = ringCircumference - (scrollProgress * ringCircumference);
              sealProgressBar.style.strokeDashoffset = `${offset.toFixed(2)}`;
            } else {
              sealContainer.classList.remove('seal-visible');
            }
          }

          // B. Liquid Gold Timeline Stem & Node Glow Activation
          if (timelineContainer) {
            const liquidStem = document.getElementById('timeline-liquid-stem');
            if (liquidStem) {
              const rect = timelineContainer.getBoundingClientRect();
              const screenH = window.innerHeight;
              const triggerStart = screenH * 0.72;
              const currentTravel = triggerStart - rect.top;
              const totalTravel = rect.height + screenH * 0.15;
              const timelinePct = Math.min(1, Math.max(0, currentTravel / totalTravel));

              liquidStem.style.height = `${(timelinePct * 100).toFixed(1)}%`;

              // Check each timeline event node
              const nodes = timelineContainer.querySelectorAll('.timeline-node');
              nodes.forEach(node => {
                const nodeRect = node.getBoundingClientRect();
                if (nodeRect.top + nodeRect.height * 0.35 <= triggerStart) {
                  node.classList.add('node-activated');
                } else {
                  node.classList.remove('node-activated');
                }
              });
            }
          }

          // C. Parallax Lanterns & Archway Depth (when Hero is visible)
          if (heroSection) {
            const heroRect = heroSection.getBoundingClientRect();
            if (heroRect.bottom > 0) {
              if (lanternLeft && lanternRight) {
                const translateY_L = scrollY * 0.16;
                const translateY_R = scrollY * 0.22;
                lanternLeft.style.transform = `translateY(${translateY_L.toFixed(1)}px)`;
                lanternRight.style.transform = `translateY(${translateY_R.toFixed(1)}px)`;
              }
              if (mandala) {
                const scale = 1 + scrollY * 0.0003;
                mandala.style.transform = `translate(-50%, -50%) rotate(${(scrollY * 0.1).toFixed(1)}deg) scale(${scale.toFixed(3)})`;
              }
            }
          }

          isTicking = false;
        });
        isTicking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Trigger once on initial load
    onScroll();
  }
}

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  const app = new WeddingFinalApp();
  app.init();
});
