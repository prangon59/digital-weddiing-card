import React from 'react';
import { useWedding } from '../context/WeddingContext';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function FloatingControls() {
  const {
    lang,
    setLang,
    isPlaying,
    toggleMusic,
    showTapForMusicPrompt,
    setShowTapForMusicPrompt,
    t,
  } = useWedding();

  return (
    <>
      {/* 1. TOP CONTROLS: English | Bangla toggle side-by-side in one row */}
      <header className="fixed top-3.5 inset-x-0 z-40 flex justify-center pointer-events-none pt-safe px-4">
        <nav
          aria-label="Language selection"
          className="pointer-events-auto flex items-center gap-1.5 p-1 rounded-full bg-[#24090F]/90 backdrop-blur-md border border-gold/50 shadow-[0_8px_25px_rgba(0,0,0,0.6)]"
        >
          {/* English Pill */}
          <button
            onClick={() => setLang('en')}
            className={`min-h-[44px] px-4 sm:px-5 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 flex items-center justify-center active:scale-95 ${
              lang === 'en'
                ? 'bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-[#24090F] font-bold shadow-[0_0_15px_rgba(201,162,75,0.5)] border border-yellow-200'
                : 'text-cream-100/85 hover:text-gold border border-gold/30 hover:border-gold/60'
            }`}
            aria-pressed={lang === 'en'}
            aria-label="View invitation in English"
          >
            English
          </button>

          {/* Divider */}
          <span className="w-[1px] h-4 bg-gold/40" />

          {/* Bangla Pill */}
          <button
            onClick={() => setLang('bn')}
            className={`min-h-[44px] px-4 sm:px-5 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 flex items-center justify-center active:scale-95 font-banglaBody ${
              lang === 'bn'
                ? 'bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-[#24090F] font-bold shadow-[0_0_15px_rgba(201,162,75,0.5)] border border-yellow-200'
                : 'text-cream-100/85 hover:text-gold border border-gold/30 hover:border-gold/60'
            }`}
            aria-pressed={lang === 'bn'}
            aria-label="বাংলা ভাষায় আমন্ত্রণপত্র দেখুন"
          >
            বাংলা
          </button>
        </nav>
      </header>

      {/* 2. SOUND BUTTON: Bottom right, round logo-shaped, very visible, touch target >= 44px */}
      <aside aria-label="Audio player control" className="fixed bottom-5 right-5 z-40 pb-safe">
        <div className="relative flex flex-col items-end">
          {/* Floating Tap for Music prompt tooltip (shows when audio autoplay was blocked) */}
          {showTapForMusicPrompt && (
            <button
              onClick={() => {
                toggleMusic();
                setShowTapForMusicPrompt(false);
              }}
              className="mb-2 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-maroon via-maroon-700 to-maroon text-cream-100 text-xs font-semibold shadow-maroon-glow border border-gold/60 animate-bounce active:scale-95 transition-transform"
              aria-label="Tap to start background wedding music"
            >
              <Music className="w-3.5 h-3.5 text-gold animate-spin" style={{ animationDuration: '4s' }} />
              <span>{t({ en: '♫ Tap for Music', bn: '♫ গান চালু করুন' })}</span>
            </button>
          )}

          {/* Round Logo-Shaped Audio Button */}
          <div className="relative">
            {/* Animated Golden Ripple when playing */}
            {isPlaying && (
              <span className="absolute -inset-1 rounded-full border-2 border-gold/60 animate-ripple pointer-events-none" />
            )}

            <button
              onClick={toggleMusic}
              className={`relative flex items-center justify-center w-[52px] h-[52px] min-w-[44px] min-h-[44px] rounded-full transition-all duration-300 active:scale-90 border-2 ${
                isPlaying
                  ? 'border-gold bg-gradient-to-br from-[#5C141E] via-[#2B0E14] to-[#1C050B] text-gold shadow-[0_8px_25px_rgba(201,162,75,0.45),0_0_15px_rgba(244,163,0,0.35)]'
                  : 'border-gold/50 bg-[#24090F]/90 text-cream-200/80 hover:text-gold hover:border-gold shadow-[0_6px_20px_rgba(0,0,0,0.6)]'
              }`}
              title={isPlaying ? t({ en: 'Mute Music', bn: 'গান বন্ধ করুন' }) : t({ en: 'Play Music', bn: 'গান চালান' })}
              aria-label={isPlaying ? 'Mute background wedding music' : 'Play background wedding music'}
            >
              {isPlaying ? (
                <Volume2 className="w-6 h-6 text-gold animate-pulse" />
              ) : (
                <VolumeX className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
