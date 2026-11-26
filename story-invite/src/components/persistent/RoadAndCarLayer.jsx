import React, { useEffect, useState } from 'react';
import { VintageRedCar, CngAutoRickshaw, CycleRickshaw } from '../svg/VehiclesSVG';

export function RoadAndCarLayer({
  isGateOpen,
  carBodyRef,
  frontWheelRef,
  rearWheelRef,
  headlightsRef,
  roadDashesRef,
  exhaustRef,
}) {
  const [passingType, setPassingType] = useState(null);

  // Periodically send a passing Bangladeshi vehicle across the background lane
  useEffect(() => {
    if (!isGateOpen) return undefined;
    let toggle = 0;

    const triggerPass = () => {
      toggle = (toggle + 1) % 2;
      setPassingType(toggle === 0 ? 'cng' : 'rickshaw');
      setTimeout(() => setPassingType(null), 5200);
    };

    const initialTimer = setTimeout(triggerPass, 4500);
    const interval = setInterval(triggerPass, 14000);
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isGateOpen]);

  return (
    <div
      className={`pointer-events-none fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 transition-transform duration-700 ${
        isGateOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ height: 'var(--road-height)' }}
      aria-hidden="true"
    >
      {/* Green Shoulder / Verge */}
      <div className="h-[22%] w-full bg-gradient-to-b from-[#1F5C3A] to-[#0F3D2A]" />

      {/* Black-and-white Kerb */}
      <div
        className="h-2.5 w-full"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #FBF3E1 0 18px, #222228 18px 36px)',
        }}
      />

      {/* Asphalt Road */}
      <div className="relative h-[74%] w-full overflow-hidden bg-gradient-to-b from-[#33353E] via-[#282A32] to-[#1D1E24]">
        {/* Passing Vehicles Lane */}
        {passingType && (
          <div
            className="absolute bottom-[54%] left-0 z-10 origin-bottom"
            style={{
              animation: 'passingVehicleSlide 4.8s linear forwards',
            }}
          >
            {passingType === 'cng' ? (
              <CngAutoRickshaw className="origin-bottom scale-75 opacity-90" />
            ) : (
              <CycleRickshaw className="origin-bottom scale-75 opacity-90" />
            )}
          </div>
        )}

        {/* Scroll-linked White Dashed Center Line */}
        <div
          ref={roadDashesRef}
          className="absolute top-[42%] -left-16 flex w-[160%] items-center gap-6"
        >
          {Array.from({ length: 22 }, (_, i) => (
            <span
              key={i}
              className="h-1.5 w-7 shrink-0 rounded-full bg-[#FBF3E1]/85"
            />
          ))}
        </div>

        {/* Exhaust Puffs behind car */}
        <div
          ref={exhaustRef}
          className="absolute bottom-[46%] left-[12%] z-20 flex items-center gap-1.5"
          style={{ opacity: 0 }}
        >
          <span className="h-3 w-3 rounded-full bg-[#FBF3E1]/65 blur-[1px]" />
          <span className="h-4 w-4 rounded-full bg-[#FBF3E1]/45 blur-[1.5px]" />
        </div>

        {/* Fixed Vintage Red Wedding Car */}
        <div
          className={`absolute bottom-[16%] left-[14%] z-20 transition-transform duration-1000 ${
            isGateOpen ? 'translate-x-0' : '-translate-x-52'
          }`}
        >
          <VintageRedCar
            carBodyRef={carBodyRef}
            frontWheelRef={frontWheelRef}
            rearWheelRef={rearWheelRef}
            headlightsRef={headlightsRef}
          />
        </div>
      </div>

      <style>{`
        @keyframes passingVehicleSlide {
          0% { transform: translate3d(460px, 0, 0); }
          100% { transform: translate3d(-150px, 0, 0); }
        }
      `}</style>
    </div>
  );
}
