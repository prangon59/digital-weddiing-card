import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { weddingConfig } from '../data/content';
import { parseGuestParams, filterInvitedEvents, toBengaliNumerals, prefersReducedMotion } from '../utils/helpers';

const WeddingContext = createContext(null);

export function WeddingProvider({ children }) {
  // 1. Language state (default 'bn', remembered in localStorage)
  const [lang, setLangState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wedding_lang_pref');
      if (saved === 'en' || saved === 'bn') return saved;
    }
    return 'bn';
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wedding_lang_pref', newLang);
      // Ensure html lang attribute is synced
      document.documentElement.lang = newLang;
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  // 2. Guest personalization from URL
  const [guest, setGuest] = useState(() => parseGuestParams());

  useEffect(() => {
    const handleUrlChange = () => {
      setGuest(parseGuestParams());
    };
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Filtered invited events list
  const invitedEvents = useMemo(() => {
    return filterInvitedEvents(weddingConfig.events, guest.invitedEventLetters);
  }, [guest.invitedEventLetters]);

  // Find target event for countdown: first upcoming invited event (or wedding if none)
  const targetEvent = useMemo(() => {
    const now = new Date();
    // Sort invited events by date
    const sorted = [...invitedEvents].sort((a, b) => new Date(a.icsStartTime) - new Date(b.icsStartTime));
    const upcoming = sorted.find(ev => new Date(ev.icsStartTime) > now);
    if (upcoming) return upcoming;
    // Default to the main wedding or first event if all are past
    const weddingEvent = invitedEvents.find(ev => ev.id === 'wedding');
    return weddingEvent || invitedEvents[0] || weddingConfig.events[1];
  }, [invitedEvents]);

  // 3. Audio & Music Management
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTapForMusicPrompt, setShowTapForMusicPrompt] = useState(false);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audio = new Audio(weddingConfig.audio.src);
      audio.loop = true;
      audio.volume = 0; // start at 0 for fade in
      audioRef.current = audio;

      return () => {
        audio.pause();
        audio.src = '';
      };
    }
  }, []);

  // Fallback synthetic wedding chime generator if MP3 fails to load
  const playSyntheticAmbience = () => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
    } catch {
      // Ignore audio context creation issues
    }
  };

  const startMusic = (fadeDuration = 2000) => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    
    // Attempt playback
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setShowTapForMusicPrompt(false);
          // Smooth fade in
          let currentVol = 0;
          const targetVol = 0.45;
          const stepTime = 100;
          const stepAmount = targetVol / (fadeDuration / stepTime);
          const fadeInterval = setInterval(() => {
            currentVol = Math.min(targetVol, currentVol + stepAmount);
            if (audioRef.current) {
              audioRef.current.volume = currentVol;
            }
            if (currentVol >= targetVol) {
              clearInterval(fadeInterval);
            }
          }, stepTime);
        })
        .catch(() => {
          // Autoplay blocked by browser policy
          setIsPlaying(false);
          setShowTapForMusicPrompt(true);
          playSyntheticAmbience();
        });
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = 0.45;
      audio.play().then(() => {
        setIsPlaying(true);
        setShowTapForMusicPrompt(false);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  // 4. Card Opening State
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isOpeningAnimating, setIsOpeningAnimating] = useState(false);
  const lenisRef = useRef(null);

  // Scroll lock while card is closed
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isCardOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      if (lenisRef.current) {
        lenisRef.current.stop();
      }
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      if (lenisRef.current) {
        lenisRef.current.start();
      }
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isCardOpen]);

  const openCard = (triggeredByTap = true) => {
    if (isCardOpen || isOpeningAnimating) return;
    setIsOpeningAnimating(true);

    if (triggeredByTap) {
      startMusic(2500);
    } else {
      // Opened by scroll/swipe: do not autoplay audio unprompted, show prompt
      setShowTapForMusicPrompt(true);
    }
  };

  const completeCardOpening = () => {
    setIsCardOpen(true);
    setIsOpeningAnimating(false);
    if (typeof window !== 'undefined') {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      if (lenisRef.current) {
        lenisRef.current.start();
        lenisRef.current.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
    }
  };

  const replayOpening = () => {
    setIsCardOpen(false);
    setIsOpeningAnimating(false);
    if (typeof window !== 'undefined') {
      if (lenisRef.current) {
        lenisRef.current.stop();
        lenisRef.current.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
    }
  };

  // 5. Translation & Number helpers
  const t = (item) => {
    if (!item) return '';
    if (typeof item === 'string') return item;
    return item[lang] || item['bn'] || item['en'] || '';
  };

  const toNum = (num) => {
    if (lang === 'bn') {
      return toBengaliNumerals(num);
    }
    return String(num);
  };

  const value = {
    lang,
    setLang,
    guest,
    invitedEvents,
    targetEvent,
    isPlaying,
    showTapForMusicPrompt,
    setShowTapForMusicPrompt,
    startMusic,
    toggleMusic,
    isCardOpen,
    setIsCardOpen,
    isOpeningAnimating,
    openCard,
    completeCardOpening,
    replayOpening,
    lenisRef,
    t,
    toNum,
    weddingConfig,
  };

  return (
    <WeddingContext.Provider value={value}>
      {children}
    </WeddingContext.Provider>
  );
}

export function useWedding() {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  return context;
}
