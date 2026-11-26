import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpColor(hex1, hex2, t) {
  const c1 = parseInt(hex1.slice(1), 16);
  const c2 = parseInt(hex2.slice(1), 16);
  const r = Math.round(lerp((c1 >> 16) & 255, (c2 >> 16) & 255, t));
  const g = Math.round(lerp((c1 >> 8) & 255, (c2 >> 8) & 255, t));
  const b = Math.round(lerp(c1 & 255, c2 & 255, t));
  return `rgb(${r}, ${g}, ${b})`;
}

function getSkyStops(progress) {
  // 0.0 -> 0.56 Champagne Ivory | 0.56 -> 0.78 Plum Dusk | 0.78 -> 1.0 Deep Midnight Maroon-Indigo
  if (progress < 0.56) {
    const t = progress / 0.56;
    const blend = Math.max(0, (t - 0.5) / 0.5);
    return {
      top: lerpColor('#F5ECE4', '#DEC2BC', blend),
      mid: lerpColor('#E6D2C7', '#B67D89', blend),
      bottom: lerpColor('#C8A5AA', '#6E324B', blend),
    };
  }
  if (progress < 0.78) {
    const t = (progress - 0.56) / 0.22;
    return {
      top: lerpColor('#DEC2BC', '#3D1429', t),
      mid: lerpColor('#B67D89', '#270A1B', t),
      bottom: lerpColor('#6E324B', '#160714', t),
    };
  }
  const t = Math.min(1, (progress - 0.78) / 0.22);
  return {
    top: lerpColor('#3D1429', '#120612', t),
    mid: lerpColor('#270A1B', '#18091E', t),
    bottom: lerpColor('#160714', '#220C29', t),
  };
}

/**
 * Coordinates Lenis smooth scroll + GSAP ScrollTrigger + 60fps imperative DOM transforms
 * for the car wheels, road dashes, sky gradient, parallax layers, and progress bar.
 */
export function useScrollEngine({
  isGateOpen,
  onFirstScroll,
  refs,
}) {
  const lenisRef = useRef(null);
  const firstScrolledRef = useRef(false);
  const wheelAngleRef = useRef(0);
  const roadOffsetRef = useRef(0);
  const smoothedVelRef = useRef(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: prefersReduced ? 0.01 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: !prefersReduced,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.15,
    });

    lenisRef.current = lenis;

    if (!isGateOpen) {
      lenis.stop();
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      lenis.start();
    }

    const updateVisuals = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollY = window.scrollY || lenis.scroll || 0;
      const progress = Math.max(0, Math.min(1, scrollY / maxScroll));

      // First scroll callback
      if (scrollY > 36 && !firstScrolledRef.current) {
        firstScrolledRef.current = true;
        onFirstScroll?.();
      }

      // Sky gradient update on shell
      const shellEl = refs.shellRef?.current;
      if (shellEl) {
        const sky = getSkyStops(progress);
        shellEl.style.setProperty('--sky-top', sky.top);
        shellEl.style.setProperty('--sky-mid', sky.mid);
        shellEl.style.setProperty('--sky-bottom', sky.bottom);
      }

      // Top progress bar & mini car
      if (refs.progressFillRef?.current) {
        refs.progressFillRef.current.style.transform = `scaleX(${progress})`;
      }
      if (refs.progressCarRef?.current) {
        refs.progressCarRef.current.style.transform = `translate3d(${progress * 100}%, 0, 0)`;
      }

      // Parallax layers (0.2x clouds, 0.4x far hills, 0.7x mid trees)
      if (!prefersReduced) {
        const shiftBase = progress * 260;
        if (refs.cloudsLayerRef?.current) {
          refs.cloudsLayerRef.current.style.transform = `translate3d(${-shiftBase * 0.25}px, ${-progress * 40}px, 0)`;
          refs.cloudsLayerRef.current.style.opacity = String(Math.max(0, 1 - progress * 1.45));
        }
        if (refs.farHillsLayerRef?.current) {
          refs.farHillsLayerRef.current.style.transform = `translate3d(${-shiftBase * 0.4}px, 0, 0)`;
          refs.farHillsLayerRef.current.style.opacity = String(Math.max(0.18, 1 - Math.max(0, progress - 0.55) * 1.4));
        }
        if (refs.midTreesLayerRef?.current) {
          refs.midTreesLayerRef.current.style.transform = `translate3d(${-shiftBase * 0.7}px, 0, 0)`;
          refs.midTreesLayerRef.current.style.opacity = String(Math.max(0.15, 1 - Math.max(0, progress - 0.58) * 1.5));
        }
      }

      // Night stars/headlights fade in from 0.68 -> 0.85
      const nightFactor = Math.max(0, Math.min(1, (progress - 0.66) / 0.18));
      if (refs.nightSkyLayerRef?.current) {
        refs.nightSkyLayerRef.current.style.opacity = String(nightFactor);
      }
      if (refs.headlightsRef?.current) {
        refs.headlightsRef.current.style.opacity = String(nightFactor * 0.92);
      }
    };

    const handleLenisScroll = () => {
      ScrollTrigger.update();
      updateVisuals();
    };

    lenis.on('scroll', handleLenisScroll);

    let lastScrollY = window.scrollY || 0;
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);

      const currentY = window.scrollY || lenis.scroll || 0;
      const rawDelta = currentY - lastScrollY;
      lastScrollY = currentY;

      // Smooth velocity decay so wheels and car settle cleanly when stopped
      smoothedVelRef.current = smoothedVelRef.current * 0.82 + rawDelta * 0.18;
      const vel = smoothedVelRef.current;

      if (!prefersReduced) {
        wheelAngleRef.current = (wheelAngleRef.current + vel * 2.6) % 360;
        roadOffsetRef.current = (roadOffsetRef.current - vel * 0.95) % 48;

        if (refs.frontWheelRef?.current) {
          refs.frontWheelRef.current.style.transform = `rotate(${wheelAngleRef.current}deg)`;
        }
        if (refs.rearWheelRef?.current) {
          refs.rearWheelRef.current.style.transform = `rotate(${wheelAngleRef.current}deg)`;
        }
        if (refs.roadDashesRef?.current) {
          refs.roadDashesRef.current.style.transform = `translate3d(${roadOffsetRef.current}px, 0, 0)`;
        }
        if (refs.carBodyRef?.current) {
          const clampedTilt = Math.max(-2.2, Math.min(2.2, -vel * 0.08));
          const idleBounce = Math.abs(vel) > 0.25 ? Math.sin(time * 18) * 1.4 : Math.sin(time * 3.2) * 0.7;
          refs.carBodyRef.current.style.transform = `translate3d(0, ${idleBounce}px, 0) rotate(${clampedTilt}deg)`;
        }
        if (refs.exhaustRef?.current) {
          const speed = Math.min(1, Math.abs(vel) / 8);
          refs.exhaustRef.current.style.opacity = String(speed > 0.08 ? 0.35 + speed * 0.55 : 0);
          refs.exhaustRef.current.style.transform = `translate3d(${-speed * 14}px, ${-speed * 5}px, 0) scale(${0.7 + speed * 0.5})`;
        }
      }
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);
    updateVisuals();

    return () => {
      lenis.off('scroll', handleLenisScroll);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isGateOpen, onFirstScroll, refs]);

  return lenisRef;
}
