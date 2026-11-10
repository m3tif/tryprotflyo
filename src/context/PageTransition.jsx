import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';
import { useSmoothScroll } from './SmoothScroll';
import { useLang } from '../i18n/LanguageContext';

const TransitionContext = createContext({ go: () => {}, switchLang: () => {}, introDone: true, setIntroDone: () => {} });

/**
 * Route changes play a "darkroom curtain": a panel wipes up, the route
 * swaps behind it, then the panel lifts away from the new page.
 * Also holds whether the first-load intro has finished.
 */
export function PageTransitionProvider({ children }) {
  const navigate = useNavigate();
  const { lenis } = useSmoothScroll();
  const { setLang } = useLang();
  const panel = useRef(null);
  const label = useRef(null);
  const busy = useRef(false);
  const [introDone, setIntroDone] = useState(false);

  /** Wipe the curtain up, run `swap` behind it, then lift it away. */
  const curtain = useCallback(
    (swap, title = '') => {
      if (busy.current) return;
      if (prefersReducedMotion() || !panel.current) {
        swap();
        return;
      }
      busy.current = true;
      if (label.current) label.current.textContent = title;
      lenis?.stop();
      gsap
        .timeline({
          defaults: { ease: 'expo.inOut' },
          onComplete: () => {
            busy.current = false;
          },
        })
        .set(panel.current, { autoAlpha: 1, clipPath: 'inset(100% 0% 0% 0%)' })
        .to(panel.current, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8 })
        .fromTo(label.current, { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: 'expo.out' }, '-=0.25')
        .add(() => {
          swap();
          lenis?.start();
          requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
        })
        .to(label.current, { yPercent: -110, duration: 0.5, ease: 'expo.in' }, '+=0.2')
        .to(panel.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.85 }, '-=0.1')
        .set(panel.current, { autoAlpha: 0 });
    },
    [lenis]
  );

  const go = useCallback(
    (to, { state, title } = {}) => {
      curtain(() => {
        lenis?.scrollTo(0, { immediate: true, force: true });
        window.scrollTo(0, 0);
        navigate(to, { state });
      }, title);
    },
    [curtain, lenis, navigate]
  );

  /** Switch language behind the curtain, then start again from the top of the page. */
  const switchLang = useCallback(
    (next, title) => {
      curtain(() => {
        lenis?.scrollTo(0, { immediate: true, force: true });
        window.scrollTo(0, 0);
        setLang(next);
      }, title);
    },
    [curtain, lenis, setLang]
  );

  const value = useMemo(() => ({ go, switchLang, introDone, setIntroDone }), [go, switchLang, introDone]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <div
        ref={panel}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] flex items-end bg-night wrap pb-[8vh] invisible"
      >
        <span className="block overflow-hidden">
          <span ref={label} className="display block text-[clamp(2.5rem,8vw,8rem)] italic text-ivory" />
        </span>
      </div>
    </TransitionContext.Provider>
  );
}

export const usePageTransition = () => useContext(TransitionContext);

/**
 * Drop-in replacement for <Link> that plays the page transition.
 * Modifier-clicks (open in new tab, etc.) behave like a normal link.
 */
export function TransitionLink({ to, state, title, onClick, children, ...props }) {
  const { go } = usePageTransition();
  return (
    <Link
      to={to}
      state={state}
      onClick={e => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        go(to, { state, title });
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
