import React from 'react';
import { triggerHaptic } from '../../utils/haptics';

export function SoundButton({ isMuted, hasInteracted, onToggle }) {
  const handleClick = () => {
    triggerHaptic(10);
    onToggle();
  };

  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 z-50 flex w-full max-w-[430px] -translate-x-1/2 justify-end px-4 pb-safe">
      <button
        type="button"
        onClick={handleClick}
        aria-label={isMuted ? 'সাউন্ড চালু করুন' : 'সাউন্ড বন্ধ করুন'}
        className="pointer-events-auto relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#4F0E26] text-[#FFF7EC] shadow-lg transition-transform active:scale-90"
      >
        {/* Subtle pulse until first interaction */}
        {!hasInteracted && (
          <span
            className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#D4AF37]"
            style={{ animation: 'soundPulse 1.8s ease-out infinite' }}
          />
        )}

        {isMuted ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>
    </div>
  );
}
