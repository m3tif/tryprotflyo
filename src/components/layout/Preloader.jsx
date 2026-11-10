import { useRef, useState } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import { usePageTransition } from '../../context/PageTransition';
import { useLang } from '../../i18n/LanguageContext';
import { profile } from '../../data/profile';
import { asset } from '../../lib/asset';

/**
 * First-load intro: an exposure counter runs while fonts and the
 * hero portrait load, then the panel lifts like a darkroom blind.
 */
export default function Preloader() {
  const { setIntroDone } = usePageTransition();
  const { t, ui } = useLang();
  const root = useRef(null);
  const count = useRef(null);
  const bar = useRef(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      const finish = () => {
        setIntroDone(true);
        setGone(true);
      };
      if (prefersReducedMotion()) {
        finish();
        return;
      }

      const ready = Promise.all([
        document.fonts?.ready ?? Promise.resolve(),
        new Promise(res => {
          const img = new Image();
          img.onload = img.onerror = res;
          img.src = asset(profile.portrait.src);
        }),
      ]);

      const progress = { v: 0 };
      const tl = gsap.timeline({ paused: true });
      tl.to(progress, {
        v: 100,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (count.current) count.current.textContent = String(Math.round(progress.v)).padStart(3, '0');
        },
      })
        .to(bar.current, { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0)
        .to('[data-pre-fade]', { autoAlpha: 0, y: -20, duration: 0.5, stagger: 0.05, ease: 'power2.in' }, '+=0.1')
        .add(() => setIntroDone(true), '-=0.1')
        .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'expo.inOut' }, '-=0.15')
        .add(() => setGone(true));

      // Never hold the visitor long, even on a slow connection.
      const timeout = setTimeout(() => tl.play(), 1500);
      ready.then(() => {
        clearTimeout(timeout);
        tl.play();
      });
      return () => clearTimeout(timeout);
    },
    { scope: root }
  );

  if (gone) return null;

  return (
    <div
      ref={root}
      role="status"
      aria-label={ui.loading}
      className="fixed inset-0 z-[95] flex flex-col justify-between bg-ink wrap py-8"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      <p data-pre-fade className="label">
        {t(profile.fullName)}
      </p>
      <div className="flex items-end justify-between gap-6">
        <p data-pre-fade className="display text-[clamp(4rem,14vw,12rem)] italic tabular-nums text-ivory" dir="ltr">
          <span ref={count}>000</span>
        </p>
        <p data-pre-fade className="label max-w-[20ch] pb-3 text-end">
          {ui.loading}
        </p>
      </div>
      <div data-pre-fade className="h-px w-full bg-ivory/10">
        <div ref={bar} className="h-full scale-x-0 bg-electric ltr:origin-left rtl:origin-right" />
      </div>
    </div>
  );
}
