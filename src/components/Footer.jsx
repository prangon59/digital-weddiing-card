import React from 'react';
import { useWedding } from '../context/WeddingContext';
import { Heart, RotateCcw, ArrowUp, Sparkles } from 'lucide-react';

export default function Footer() {
  const { lang, weddingConfig, replayOpening, t } = useWedding();
  const { groom, bride, hashtag, ui } = weddingConfig;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#180407] text-cream-100 py-16 px-4 pb-safe border-t-2 border-gold/40 overflow-hidden">
      {/* Decorative ambient gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gold/5 blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
        {/* Decorative Alpona Floral Icon with 3D ring */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/20 via-maroon to-gold/10 border-2 border-gold/50 shadow-3d-gold flex items-center justify-center mb-5 transform hover:scale-105 transition-transform duration-300">
          <Heart className="w-6 h-6 fill-gold text-gold animate-pulse" />
        </div>

        {/* Couple Names (Clean Single Language) */}
        <div className="my-2">
          {lang === 'en' ? (
            <h3 className="font-engHeading text-3xl sm:text-5xl font-bold tracking-wide gold-foil-text drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {groom.name.en} &amp; {bride.name.en}
            </h3>
          ) : (
            <h3 className="font-banglaHeading text-2xl sm:text-4xl font-bold gold-foil-text leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {groom.name.bn} ও {bride.name.bn}
            </h3>
          )}
        </div>

        {/* Royal Gold Hashtag */}
        <div className="my-4 px-5 py-1.5 rounded-full bg-gradient-to-r from-gold/10 via-gold/20 to-gold/10 border border-gold/50 text-xs sm:text-sm font-mono text-gold-300 tracking-widest shadow-inner">
          {hashtag}
        </div>

        {/* Gratitude note */}
        <p className="font-banglaBody text-xs sm:text-sm text-cream-200/90 max-w-lg leading-relaxed mt-2">
          {t(ui.footer.gratitude)}
        </p>

        {/* Replay Opening & Back to Top Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            onClick={replayOpening}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold/25 via-gold/35 to-gold/20 hover:from-gold/40 hover:to-gold/30 text-gold-200 border border-gold/60 text-xs font-bold transition-all duration-200 active:scale-95 shadow-3d-gold min-h-[44px]"
            aria-label="Replay 3D wedding card opening animation"
          >
            <RotateCcw className="w-4 h-4 text-gold-300" />
            <span>{t(ui.footer.replayOpening)}</span>
          </button>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-maroon-dark/80 hover:bg-maroon-light/50 text-cream-200 border border-gold/30 text-xs font-medium transition-all duration-200 active:scale-95 min-h-[44px]"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4 text-gold-400" />
            <span>{t(ui.footer.backToTop)}</span>
          </button>
        </div>

        {/* Made with Love line */}
        <div className="mt-12 pt-6 border-t border-gold/20 w-full text-[11px] text-cream-300/60 font-serif flex items-center justify-center gap-2">
          <span>{t(ui.footer.madeWithLove)}</span>
          <span>•</span>
          <span className="font-mono text-gold/70">December 2026</span>
        </div>
      </div>
    </footer>
  );
}
