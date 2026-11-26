import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from './config';
import { parseGuestParams } from './utils/guestParams';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { useScrollEngine } from './hooks/useScrollEngine';
import { LoadingSpinner } from './components/persistent/LoadingSpinner';
import { ProgressCarBar } from './components/persistent/ProgressCarBar';
import { SkyParallaxBackdrop } from './components/persistent/SkyParallaxBackdrop';
import { RoadAndCarLayer } from './components/persistent/RoadAndCarLayer';
import { SoundButton } from './components/persistent/SoundButton';
import { S00Gate } from './components/scenes/S00Gate';
import { S01Names } from './components/scenes/S01Names';
import { S02Invitation } from './components/scenes/S02Invitation';
import { S03TwoFamilies } from './components/scenes/S03TwoFamilies';
import { S04ScheduleHeading } from './components/scenes/S04ScheduleHeading';
import { S05GayeHolud } from './components/scenes/S05GayeHolud';
import { S06Wedding } from './components/scenes/S06Wedding';
import { S07BouBhat } from './components/scenes/S07BouBhat';
import { S08Countdown } from './components/scenes/S08Countdown';
import { S09Venue } from './components/scenes/S09Venue';
import { S10NightTransition } from './components/scenes/S10NightTransition';
import { S11CouplePhoto } from './components/scenes/S11CouplePhoto';
import { S12Finale } from './components/scenes/S12Finale';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const guest = useMemo(() => parseGuestParams(), []);

  const shellRef = useRef(null);
  const progressFillRef = useRef(null);
  const progressCarRef = useRef(null);
  const cloudsLayerRef = useRef(null);
  const farHillsLayerRef = useRef(null);
  const midTreesLayerRef = useRef(null);
  const nightSkyLayerRef = useRef(null);
  const carBodyRef = useRef(null);
  const frontWheelRef = useRef(null);
  const rearWheelRef = useRef(null);
  const headlightsRef = useRef(null);
  const roadDashesRef = useRef(null);
  const exhaustRef = useRef(null);

  const refs = useMemo(
    () => ({
      shellRef,
      progressFillRef,
      progressCarRef,
      cloudsLayerRef,
      farHillsLayerRef,
      midTreesLayerRef,
      nightSkyLayerRef,
      carBodyRef,
      frontWheelRef,
      rearWheelRef,
      headlightsRef,
      roadDashesRef,
      exhaustRef,
    }),
    []
  );

  const { isMuted, hasInteracted, startMusic, toggleMute } = useAudioPlayer(
    weddingConfig.audioSrc
  );

  const handleFirstScroll = useCallback(() => {
    setHasScrolled(true);
  }, []);

  const lenisRef = useScrollEngine({
    isGateOpen,
    onFirstScroll: handleFirstScroll,
    refs,
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const handleGateOpened = useCallback(() => {
    setIsGateOpen(true);
    startMusic();
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }, [startMusic]);

  const handleScrollTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [lenisRef]);

  return (
    <div className="desktop-outer-backdrop">
      <div ref={shellRef} className="phone-shell">
        <LoadingSpinner visible={isLoading} />

        <ProgressCarBar
          progressFillRef={progressFillRef}
          progressCarRef={progressCarRef}
        />

        <SkyParallaxBackdrop
          cloudsLayerRef={cloudsLayerRef}
          farHillsLayerRef={farHillsLayerRef}
          midTreesLayerRef={midTreesLayerRef}
          nightSkyLayerRef={nightSkyLayerRef}
        />

        <S00Gate isOpen={isGateOpen} onOpen={handleGateOpened} guest={guest} />

        <main className="story-scenes">
          <S01Names isGateOpen={isGateOpen} hasScrolled={hasScrolled} />
          <S02Invitation guest={guest} />
          <S03TwoFamilies />
          <S04ScheduleHeading />
          {guest.invitedIds.includes('holud') && <S05GayeHolud />}
          {guest.invitedIds.includes('biye') && <S06Wedding />}
          {guest.invitedIds.includes('boubhat') && <S07BouBhat />}
          <S08Countdown />
          <S09Venue />
          <S10NightTransition />
          <S11CouplePhoto />
          <S12Finale onScrollTop={handleScrollTop} guest={guest} />
        </main>

        <RoadAndCarLayer
          isGateOpen={isGateOpen}
          carBodyRef={carBodyRef}
          frontWheelRef={frontWheelRef}
          rearWheelRef={rearWheelRef}
          headlightsRef={headlightsRef}
          roadDashesRef={roadDashesRef}
          exhaustRef={exhaustRef}
        />

        <SoundButton
          isMuted={isMuted}
          hasInteracted={hasInteracted}
          onToggle={toggleMute}
        />
      </div>
    </div>
  );
}
