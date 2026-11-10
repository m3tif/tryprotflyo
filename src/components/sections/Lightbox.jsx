import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';
import Img, { Credit } from '../ui/Img';
import { imageSources } from '../../data/images';
import { useSmoothScroll } from '../../context/SmoothScroll';
import { useLang } from '../../i18n/LanguageContext';

const roman = n => ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'][n] ?? String(n + 1);

/**
 * Full-screen viewer. Opens by growing out of the clicked thumbnail
 * (a hand-rolled FLIP), crossfades between plates, and closes back
 * into the grid. Keyboard: ← → to browse, Esc to close. Swipe on touch.
 */
export default function Lightbox({ photos, index, setIndex, originRef, onClose }) {
  const root = useRef(null);
  const stage = useRef(null);
  const img = useRef(null);
  const closeBtn = useRef(null);
  const shown = useRef(index);
  const animating = useRef(false);
  const { lenis } = useSmoothScroll();
  const { t, ui, isRTL } = useLang();
  const photo = photos[index];
  const reduce = prefersReducedMotion();

  // Distance from the thumbnail to the image's final position.
  const flipFrom = useCallback(
    i => {
      const thumb = originRef.current?.[i];
      const el = img.current;
      if (!thumb || !el) return null;
      const a = thumb.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      if (!b.width || a.bottom < 0 || a.top > window.innerHeight) return null;
      return {
        x: a.left + a.width / 2 - (b.left + b.width / 2),
        y: a.top + a.height / 2 - (b.top + b.height / 2),
        scale: a.width / b.width,
      };
    },
    [originRef]
  );

  // Open
  useLayoutEffect(() => {
    lenis?.stop();
    const prevFocus = document.activeElement;
    closeBtn.current?.focus({ preventScroll: true });
    if (!reduce) {
      const from = flipFrom(index);
      const tl = gsap.timeline({ defaults: { ease: 'expo.inOut' } });
      tl.fromTo(root.current, { backgroundColor: 'rgba(8,11,20,0)' }, { backgroundColor: 'rgba(8,11,20,0.97)', duration: 0.8 }, 0);
      if (from) tl.from(img.current, { ...from, duration: 1.0 }, 0);
      else tl.from(img.current, { autoAlpha: 0, scale: 0.92, duration: 0.8 }, 0);
      tl.from('[data-lb-ui]', { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.04, ease: 'expo.out' }, 0.45);
    }
    return () => {
      lenis?.start();
      if (prevFocus instanceof HTMLElement) prevFocus.focus({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = useCallback(() => {
    if (animating.current) return;
    if (reduce) return onClose();
    animating.current = true;
    const to = flipFrom(shown.current);
    const tl = gsap.timeline({ defaults: { ease: 'expo.inOut' }, onComplete: onClose });
    tl.to('[data-lb-ui]', { autoAlpha: 0, duration: 0.3 }, 0);
    if (to) tl.to(img.current, { ...to, duration: 0.9 }, 0);
    else tl.to(img.current, { autoAlpha: 0, scale: 0.94, duration: 0.6 }, 0);
    tl.to(root.current, { backgroundColor: 'rgba(8,11,20,0)', duration: 0.7 }, 0.15);
  }, [flipFrom, onClose, reduce]);

  const step = useCallback(
    dir => {
      if (animating.current) return;
      const next = (shown.current + dir + photos.length) % photos.length;
      if (reduce) {
        shown.current = next;
        setIndex(next);
        return;
      }
      animating.current = true;
      gsap
        .timeline({ onComplete: () => (animating.current = false) })
        .to(img.current, { autoAlpha: 0, xPercent: -6 * dir, duration: 0.35, ease: 'power2.in' })
        .add(() => {
          shown.current = next;
          setIndex(next);
        })
        .fromTo(img.current, { autoAlpha: 0, xPercent: 6 * dir }, { autoAlpha: 1, xPercent: 0, duration: 0.8, ease: 'expo.out' }, '+=0.05');
    },
    [photos.length, setIndex, reduce]
  );

  // Preload neighbours so browsing never waits on the network.
  useEffect(() => {
    [1, -1].forEach(d => {
      const p = photos[(index + d + photos.length) % photos.length];
      const im = new Image();
      const { src, srcSet } = imageSources(p.image, { maxWidth: 2200 });
      if (srcSet) im.srcset = srcSet;
      im.sizes = '90vw';
      im.src = src;
    });
  }, [index, photos]);

  // Keyboard + focus trap
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(isRTL ? -1 : 1);
      else if (e.key === 'ArrowLeft') step(isRTL ? 1 : -1);
      else if (e.key === 'Tab') {
        const f = root.current.querySelectorAll('button');
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close, step, isRTL]);

  // Swipe
  const touch = useRef(null);
  const onPointerDown = e => {
    if (e.pointerType !== 'mouse') touch.current = e.clientX;
  };
  const onPointerUp = e => {
    if (touch.current == null) return;
    const dx = e.clientX - touch.current;
    touch.current = null;
    if (Math.abs(dx) > 50) step((dx < 0 ? 1 : -1) * (isRTL ? -1 : 1));
  };

  return createPortal(
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={`${t(photo.title)} — ${index + 1} ${ui.of} ${photos.length}`}
      className="fixed inset-0 z-[110] flex flex-col bg-ink/97"
      data-lenis-prevent
    >
      <div className="wrap flex items-center justify-between py-5">
        <p data-lb-ui className="label tabular-nums">
          {ui.plate} {roman(index)} <span className="text-mist/60">/ {photos.length}</span>
        </p>
        <button
          ref={closeBtn}
          data-lb-ui
          type="button"
          onClick={close}
          className="flex h-11 items-center gap-2 text-ivory"
        >
          {ui.close} <X size={18} />
        </button>
      </div>

      <div
        ref={stage}
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onClick={e => e.target === stage.current && close()}
      >
        <Img
          ref={img}
          image={photo.image}
          alt={t(photo.alt)}
          priority
          sizes="90vw"
          maxWidth={2200}
          className="max-h-full max-w-full object-contain will-change-transform"
          style={{ maxHeight: 'calc(100svh - 11rem)', width: 'auto', height: 'auto' }}
        />
        <button
          data-lb-ui
          type="button"
          onClick={() => step(-1)}
          aria-label={ui.prev}
          className="absolute start-2 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-electric hover:text-electric md:start-6 md:grid"
        >
          <ArrowLeft size={20} className="rtl:-scale-x-100" />
        </button>
        <button
          data-lb-ui
          type="button"
          onClick={() => step(1)}
          aria-label={ui.nextImage}
          className="absolute end-2 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-electric hover:text-electric md:end-6 md:grid"
        >
          <ArrowRight size={20} className="rtl:-scale-x-100" />
        </button>
      </div>

      <div className="wrap flex items-end justify-between gap-6 py-5">
        <div data-lb-ui>
          <p className="display text-2xl italic text-ivory">{t(photo.title)}</p>
          <p className="label">
            <Credit image={photo.image} />
          </p>
        </div>
        <div data-lb-ui className="flex gap-2 md:hidden">
          <button type="button" onClick={() => step(-1)} aria-label={ui.prev} className="grid h-12 w-12 place-items-center rounded-full border border-ivory/20 text-ivory">
            <ArrowLeft size={18} className="rtl:-scale-x-100" />
          </button>
          <button type="button" onClick={() => step(1)} aria-label={ui.nextImage} className="grid h-12 w-12 place-items-center rounded-full border border-ivory/20 text-ivory">
            <ArrowRight size={18} className="rtl:-scale-x-100" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
