import { useEffect, useRef, useState } from 'react';

/**
 * Reveal an element once it scrolls into view.
 *
 * Uses IntersectionObserver directly, matching the pattern already used for
 * lazy section loading on the home page, rather than pulling framer-motion
 * into pages that would otherwise not need it.
 *
 * Reveals immediately (no transition) when the visitor prefers reduced motion,
 * and if IntersectionObserver is somehow unavailable — content must never be
 * left invisible because an effect did not run.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setRevealed(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        obs.disconnect();
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, revealed };
}
