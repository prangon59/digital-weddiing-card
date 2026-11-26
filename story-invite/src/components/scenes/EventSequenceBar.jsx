import React from 'react';

const STEPS = [
  { step: 1, numBn: '১', label: '১ম পর্ব', title: 'গায়ে হলুদ', date: '২৩ ডিসে' },
  { step: 2, numBn: '২', label: '২য় পর্ব', title: 'বিয়ে', date: '২৫ ডিসে' },
  { step: 3, numBn: '৩', label: '৩য় পর্ব', title: 'বউভাত', date: '২৭ ডিসে' },
];

/**
 * Sequential 3-step milestone tracker (১ম পর্ব -> ২য় পর্ব -> ৩য় পর্ব)
 * styled in modern Deep Maroon, Ivory & Burnished Gold.
 */
export function EventSequenceBar({ activeStep }) {
  return (
    <div
      className="mb-3.5 w-full rounded-2xl border border-[#D4AF37]/70 bg-gradient-to-r from-[#3A091B] via-[#4F0E26] to-[#3A091B] px-3 py-2.5 shadow-lg"
      aria-label={`অনুষ্ঠান ক্রম: ধাপ ${activeStep} এর ৩`}
    >
      <div className="flex items-center justify-between gap-1">
        {STEPS.map((item, idx) => {
          const isDone = item.step < activeStep;
          const isActive = item.step === activeStep;

          return (
            <React.Fragment key={item.step}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border font-heading text-xs font-extrabold transition-transform ${
                    isActive
                      ? 'scale-110 border-[#FFF7EC] bg-[#D4AF37] text-[#260612] shadow'
                      : isDone
                      ? 'border-[#D4AF37] bg-[#6B1230] text-[#D4AF37]'
                      : 'border-[#D4AF37]/40 bg-[#260612] text-[#FFF7EC]/55'
                  }`}
                >
                  {isDone ? '✓' : item.numBn}
                </div>
                <span
                  className={`font-heading mt-1 text-[10px] leading-none font-bold ${
                    isActive ? 'text-[#D4AF37]' : isDone ? 'text-[#FFF7EC]' : 'text-[#FFF7EC]/55'
                  }`}
                >
                  {item.label}
                </span>
                <span
                  className={`font-body mt-0.5 text-[10px] leading-none ${
                    isActive ? 'font-bold text-[#FFF7EC]' : 'text-[#FFF7EC]/65'
                  }`}
                >
                  {item.title} ({item.date})
                </span>
              </div>

              {idx < STEPS.length - 1 && (
                <div className="mb-4 flex flex-1 items-center px-0.5" aria-hidden="true">
                  <div
                    className={`h-0.5 w-full rounded-full ${
                      item.step < activeStep ? 'bg-[#D4AF37]' : 'bg-[#D4AF37]/30'
                    }`}
                  />
                  <span
                    className={`ml-0.5 text-[10px] font-bold ${
                      item.step < activeStep ? 'text-[#D4AF37]' : 'text-[#D4AF37]/50'
                    }`}
                  >
                    ➜
                  </span>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Downward connector arrow to visually link sequential events while scrolling.
 */
export function NextStepConnector({ nextLabel }) {
  return (
    <div className="mt-4 flex flex-col items-center" aria-hidden="true">
      <div className="h-5 w-0.5 border-l-2 border-dashed border-[#D4AF37]/70" />
      <span className="font-heading rounded-full border border-[#D4AF37]/70 bg-[#3A091B] px-3.5 py-0.5 text-[11px] font-bold text-[#D4AF37] shadow">
        পরবর্তী: {nextLabel} ↓
      </span>
    </div>
  );
}
