import React from 'react';

export function ProgressCarBar({ progressFillRef, progressCarRef }) {
  return (
    <div
      className="pointer-events-none fixed top-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 px-3 pt-safe"
      aria-hidden="true"
    >
      <div className="relative h-1.5 w-full overflow-visible rounded-full bg-black/20 backdrop-blur-sm">
        <div
          ref={progressFillRef}
          className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#F6C945] via-[#E8772E] to-[#C8202F]"
          style={{ transform: 'scaleX(0)' }}
        />
        <div
          ref={progressCarRef}
          className="absolute -top-2 left-0 w-full"
          style={{ transform: 'translate3d(0%, 0, 0)' }}
        >
          <span className="-ml-3 inline-flex h-5 w-6 items-center justify-center rounded-full bg-[#C8202F] text-[10px] shadow ring-1 ring-[#F6C945]">
            🚗
          </span>
        </div>
      </div>
    </div>
  );
}
