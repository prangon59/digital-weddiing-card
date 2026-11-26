import { useEffect, useRef, useState } from 'react';

/**
 * Tracks whether a scene is near/inside the viewport so idle CSS animations
 * pause automatically when offscreen.
 */
export function useInViewLoop(rootMargin = '160px 0px') {
  const ref = useRef(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setInView(entry.isIntersecting);
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
