import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { WeddingProvider, useWedding } from './context/WeddingContext';
import PetalsCanvas from './components/PetalsCanvas';
import FloatingControls from './components/FloatingControls';
import CardOpening from './components/CardOpening';
import Hero from './components/Hero';
import InvitationMessage from './components/InvitationMessage';
import OurStory from './components/OurStory';
import RSVP from './components/RSVP';
import EventsSchedule from './components/EventsSchedule';
import Countdown from './components/Countdown';
import VenueMap from './components/VenueMap';
import LiveStream from './components/LiveStream';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import InviteMaker from './components/InviteMaker';
import TestGuestDrawer from './components/TestGuestDrawer';

gsap.registerPlugin(ScrollTrigger);

function MainInvitation() {
  const { isCardOpen, lenisRef } = useWedding();

  // Lenis & ScrollTrigger smooth scroll initialization (Exactly ONCE, StrictMode safe)
  useEffect(() => {
    let lenis = null;
    let tickerCallback = null;
    let handleScroll = null;

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2,
      });

      lenisRef.current = lenis;

      // Connect Lenis to ScrollTrigger
      handleScroll = () => {
        ScrollTrigger.update();
      };
      lenis.on('scroll', handleScroll);

      // Connect Lenis to GSAP ticker
      tickerCallback = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      // If card is closed, stop lenis
      if (!isCardOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    } catch {
      // Lenis fallback
    }

    return () => {
      if (handleScroll && lenis) {
        lenis.off('scroll', handleScroll);
      }
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
      }
      if (lenis) {
        lenis.destroy();
      }
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="relative min-h-dvh selection:bg-marigold/30 selection:text-maroon">
      {/* Floating Canvas: Marigold Petals & Golden Fireflies */}
      <PetalsCanvas />

      {/* Floating Controls: Language & Audio */}
      <FloatingControls />

      {/* 3D Virtual Card Opening Experience */}
      <CardOpening />

      {/* Main Single-Page Sections (Reordered according to design spec) */}
      <main className="relative min-h-dvh">
        <Hero />
        <InvitationMessage />
        <OurStory />
        <RSVP />
        <EventsSchedule />
        <Countdown />
        <VenueMap />
        <LiveStream />
        <Gallery />
        <Footer />
      </main>

      {/* Discrete "Test as Guest" Switcher Drawer */}
      <TestGuestDrawer />
    </div>
  );
}

export default function App() {
  // Simple hash router for Netlify static deployment
  const [currentHash, setCurrentHash] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash;
    }
    return '';
  });

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isInviteMakerRoute = currentHash.includes('/invite-maker') || currentHash.includes('invite-maker');

  if (isInviteMakerRoute) {
    return <InviteMaker />;
  }

  return (
    <WeddingProvider>
      <MainInvitation />
    </WeddingProvider>
  );
}
