import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';

const SmoothScrollContext = createContext({ lenis: null, scrollTo: () => {} });

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so Lenis and
 * ScrollTrigger always agree on the scroll position for the same frame.
 */
export function SmoothScrollProvider({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    const instance = new Lenis({
      duration: 1.15,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduce,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      autoRaf: false,
    });

    // 1. Lenis tells ScrollTrigger whenever it scrolls.
    instance.on('scroll', ScrollTrigger.update);
    // 2. GSAP's ticker drives Lenis (time is in seconds, Lenis expects ms).
    const tick = time => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    // 3. No lag smoothing — it would desync the two.
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);
    window.__lenis = instance; // handy for debugging in the console

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      instance.destroy();
      delete window.__lenis;
      setLenis(null);
    };
  }, []);

  const scrollTo = useCallback(
    (target, options = {}) => {
      const el = typeof target === 'string' && target.startsWith('#') ? document.querySelector(target) : target;
      if (el == null) return;
      if (lenis) {
        lenis.scrollTo(el, { duration: 1.6, easing: t => 1 - Math.pow(1 - t, 4), ...options });
      } else if (typeof el === 'number') {
        window.scrollTo({ top: el, behavior: options.immediate ? 'auto' : 'smooth' });
      } else {
        el.scrollIntoView({ behavior: options.immediate ? 'auto' : 'smooth' });
      }
    },
    [lenis]
  );

  const value = useMemo(() => ({ lenis, scrollTo }), [lenis, scrollTo]);
  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}

export const useSmoothScroll = () => useContext(SmoothScrollContext);
