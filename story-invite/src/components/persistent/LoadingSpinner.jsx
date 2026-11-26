import React from 'react';
import { RickshawFanWheel } from '../svg/RickshawArtMotifs';

export function LoadingSpinner({ visible }) {
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F3D2A] text-[#FBF3E1] transition-opacity duration-500"
      role="status"
      aria-live="polite"
    >
      <div className="anim-fan-spin">
        <RickshawFanWheel size={96} />
      </div>
      <p className="font-heading mt-4 text-lg font-bold tracking-wide text-[#F6C945]">
        আমন্ত্রণপত্র সাজানো হচ্ছে...
      </p>
      <p className="font-body mt-1 text-xs text-[#8CC9A0]">অনুগ্রহ করে একটু অপেক্ষা করুন</p>
    </div>
  );
}
