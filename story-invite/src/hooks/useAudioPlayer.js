import { useEffect, useRef, useState, useCallback } from 'react';

const MUTE_STORAGE_KEY = 'wedding_story_muted';

export function useAudioPlayer(src) {
  const audioRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    try {
      return localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.55;
    audio.muted = isMuted;
    audioRef.current = audio;

    const handleVisibility = () => {
      if (!audioRef.current) return;
      if (document.hidden) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else if (hasInteracted && !audioRef.current.muted) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    const handlePageHide = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pagehide', handlePageHide);
      audio.pause();
      audio.src = '';
    };
  }, [src]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
    try {
      localStorage.setItem(MUTE_STORAGE_KEY, String(isMuted));
    } catch {
      // Ignore storage error
    }
  }, [isMuted]);

  const startMusic = useCallback(() => {
    setHasInteracted(true);
    const audio = audioRef.current;
    if (!audio || isMuted) return;
    audio.play().then(() => setIsPlaying(true)).catch(() => {});
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setHasInteracted(true);
    const audio = audioRef.current;
    if (!audio) return;

    setIsMuted((prev) => {
      const next = !prev;
      audio.muted = next;
      if (!next) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        audio.pause();
        setIsPlaying(false);
      }
      return next;
    });
  }, []);

  return {
    isMuted,
    isPlaying,
    hasInteracted,
    startMusic,
    toggleMute,
  };
}
