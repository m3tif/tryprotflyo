import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { gsap, SplitText, useGSAP, prefersReducedMotion, MQ } from '../../lib/gsap';
import { profile } from '../../data/profile';
import { images } from '../../data/images';
import Img from '../ui/Img';
import MagneticButton from '../ui/MagneticButton';
import { useSmoothScroll } from '../../context/SmoothScroll';
import { usePageTransition } from '../../context/PageTransition';
import { useLang } from '../../i18n/LanguageContext';

/**
 * Hero — a "living photograph".
 *
 * The stage is built from depth layers: a graded landscape (far), a
 * band of mist, Mohamed's portrait as a print floating mid-air, and
 * fine foreground marks (near). On desktop each layer follows the
 * pointer at its own depth through gsap.quickTo, the whole stage tilts
 * a few degrees in 3D, and a soft light follows the cursor. On phones
 * and tablets there is no pointer work: the stage breathes slowly and
 * drifts with scroll instead.
 *
 * The name always sits on its own layer above the stage and is never
 * masked once the entrance finishes, so it can't be hidden or clipped.
 */
export default function Hero() {
  const root = useRef(null);
  const intro = useRef(null);
  const { scrollTo } = useSmoothScroll();
  const { introDone } = usePageTransition();
  const { t, ui, lang, isRTL } = useLang();

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      if (prefersReducedMotion()) return;

      // ---- Entrance ---------------------------------------------------
      const unit = lang === 'ar' ? 'words' : 'chars';
      const splits = q('[data-hero-name]').map(el => new SplitText(el, { type: unit, mask: unit }));
      const pieces = splits.flatMap(s => s[unit]);

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'expo.out' },
        // Remove the masks once the name is in place: from then on it is
        // plain text that can never be clipped.
        onComplete: () => splits.forEach(s => s.revert()),
      });
      tl.from(q('[data-stage]'), { clipPath: 'inset(9% 7% 9% 7%)', duration: 1.6, ease: 'expo.inOut' }, 0)
        .from(q('[data-zoom]'), { scale: 1.3, duration: 2.4 }, 0)
        .from(q('[data-portrait-in]'), { yPercent: 18, rotationY: isRTL ? 14 : -14, autoAlpha: 0, duration: 1.8 }, 0.45)
        .from(pieces, { yPercent: 112, duration: 1.4, stagger: lang === 'ar' ? 0.16 : 0.04 }, 0.35)
        .from(q('[data-hero-in]'), { autoAlpha: 0, y: 20, duration: 1.1, stagger: 0.07 }, 0.9);
      intro.current = tl;
      if (introDone) tl.play();
      // Safety net: never leave the name hidden, even if the intro signal is missed.
      const failsafe = gsap.delayedCall(4, () => tl.paused() && tl.play());

      // ---- Pointer depth (desktop, fine pointer only) ----------------
      const mm = gsap.matchMedia();
      mm.add(`${MQ.desktop} and ${MQ.fine}`, () => {
        const stage = q('[data-tilt]')[0];
        const layers = q('[data-depth]').map(el => ({
          x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3' }),
          y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3' }),
          d: parseFloat(el.dataset.depth),
        }));
        const rx = gsap.quickTo(stage, 'rotationX', { duration: 1.4, ease: 'power3' });
        const ry = gsap.quickTo(stage, 'rotationY', { duration: 1.4, ease: 'power3' });
        const light = q('[data-light]')[0];
        const lx = gsap.quickTo(light, 'x', { duration: 0.9, ease: 'power3' });
        const ly = gsap.quickTo(light, 'y', { duration: 0.9, ease: 'power3' });

        let rect = root.current.getBoundingClientRect();
        const measure = () => (rect = root.current.getBoundingClientRect());
        const onMove = e => {
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          layers.forEach(l => {
            l.x(-nx * l.d * 22);
            l.y(-ny * l.d * 14);
          });
          rx(ny * -3.5);
          ry(nx * 5);
          lx(e.clientX - rect.left);
          ly(e.clientY - rect.top);
        };
        const onLeave = () => {
          layers.forEach(l => {
            l.x(0);
            l.y(0);
          });
          rx(0);
          ry(0);
        };
        const el = root.current;
        el.addEventListener('pointerenter', measure);
        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerleave', onLeave);
        window.addEventListener('resize', measure);
        gsap.set(light, { x: rect.width * 0.7, y: rect.height * 0.35 });
        return () => {
          el.removeEventListener('pointerenter', measure);
          el.removeEventListener('pointermove', onMove);
          el.removeEventListener('pointerleave', onLeave);
          window.removeEventListener('resize', measure);
        };
      });

      // ---- Touch / small screens: slow breathing instead of pointer --
      mm.add(`not all and ${MQ.fine}, not all and ${MQ.desktop}`, () => {
        gsap.to(q('[data-breathe]'), { scale: 1.06, xPercent: isRTL ? 1.5 : -1.5, duration: 9, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        gsap.to(q('[data-portrait]'), { y: -8, duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      });

      // ---- Scroll-out: layers separate as the hero leaves -------------
      const out = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to(q('[data-scroll-far]'), { yPercent: 12, ease: 'none', scrollTrigger: out });
      gsap.to(q('[data-portrait]'), { yPercent: -14, ease: 'none', scrollTrigger: out });
      mm.add(MQ.desktop, () => {
        gsap.to(q('[data-hero-copy]'), { yPercent: -25, autoAlpha: 0, ease: 'none', scrollTrigger: { ...out, end: '70% top' } });
      });

      return () => {
        failsafe.kill();
        mm.revert();
        splits.forEach(s => s.revert());
      };
    },
    { scope: root, dependencies: [lang] }
  );

  useGSAP(
    () => {
      if (introDone) intro.current?.play();
    },
    { dependencies: [introDone] }
  );

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="hero relative isolate flex flex-col overflow-hidden pt-24 md:min-h-[100svh] md:pt-32 lg:min-h-[max(100svh,680px)]"
    >
      {/* ---------- Copy (always above the stage) ---------- */}
      <div data-hero-copy className="wrap relative z-20 flex items-start justify-between gap-6 pb-6 md:pb-0">
        <p data-hero-in className="label max-w-[30ch] text-ivory">
          {t(profile.title)}
        </p>
        <p data-hero-in className="label hidden text-end sm:block">
          {ui.basedIn} {t(profile.location)}
        </p>
      </div>

      <h1
        id="hero-title"
        className="display hero-name wrap relative z-20 order-none pb-6 text-[clamp(3.6rem,17vw,6.5rem)] font-normal text-ivory md:order-2 md:mt-auto md:pb-4 md:text-[clamp(5rem,11.5vw,12.5rem)]"
      >
        <span className="block">
          <span data-hero-name className="block">
            {t(profile.firstName)}
          </span>
        </span>
        <span className="block ps-[10vw] md:ps-[8vw]">
          <span data-hero-name className="block italic text-champagne">
            {t(profile.lastName)}
          </span>
        </span>
      </h1>

      {/* ---------- Stage: the living photograph ---------- */}
      <div
        data-stage
        className="relative z-0 aspect-[4/5] w-full overflow-hidden sm:aspect-[16/11] md:absolute md:inset-0 md:aspect-auto"
        style={{ perspective: '1400px' }}
        aria-hidden="true"
      >
        <div data-tilt className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          {/* Far: landscape, graded into the palette */}
          <div data-depth="0.5" className="absolute -inset-[5%]">
            <div data-scroll-far className="absolute inset-0">
              <div data-zoom className="absolute inset-0">
                <div data-breathe className="absolute inset-0">
                  <Img image={images.hero} alt="" priority sizes="100vw" maxWidth={2200} className="h-full w-full object-cover object-[50%_40%]" />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_11_20/0.55)_0%,rgb(8_11_20/0.1)_35%,rgb(8_11_20/0.35)_65%,rgb(8_11_20/0.95)_100%)]" />
            <div className="absolute inset-0 bg-[#0b1430] opacity-35 mix-blend-multiply" />
          </div>

          {/* Light that follows the pointer */}
          <div
            data-light
            className="pointer-events-none absolute left-0 top-0 hidden h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 mix-blend-soft-light lg:block"
            style={{ background: 'radial-gradient(closest-side, rgba(214,198,165,0.55), rgba(113,137,255,0.12) 55%, transparent 75%)' }}
          />

          {/* Mid: mist band */}
          <div
            data-depth="1.1"
            className="absolute inset-x-[-10%] bottom-[18%] h-[38%]"
            style={{ background: 'radial-gradient(60% 50% at 50% 60%, rgba(166,169,178,0.22), transparent 70%)' }}
          />

          {/* Near-mid: portrait print */}
          <div
            data-depth="2.2"
            className="absolute end-[7%] top-[16%] w-[46%] max-w-[360px] sm:w-[34%] md:end-[8%] md:top-[19%] md:w-[min(23vw,360px)] lg:top-[17%]"
          >
            <div data-portrait>
              <figure data-portrait-in className="relative" style={{ transformStyle: 'preserve-3d' }}>
                <div className="relative aspect-[3/4] overflow-hidden bg-night shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-ivory/15">
                  <Img image={profile.portrait.src} alt="" priority sizes="(min-width: 768px) 24vw, 46vw" className="h-full w-full object-cover [filter:saturate(0.88)_contrast(1.04)_brightness(0.94)]" />
                  {/* grade the print into the scene */}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(11_20_48/0.18),transparent_40%,rgb(8_11_20/0.35))]" />
                </div>
                <figcaption className="mt-3 flex items-center justify-between text-[0.72rem] text-ivory/70">
                  <span>{t(profile.fullName)}</span>
                  <span dir="ltr" className="hidden sm:inline">31.04° N, 31.38° E</span>
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Near: fine frame marks */}
          <div data-depth="3.4" className="pointer-events-none absolute inset-[5%] hidden md:block">
            <span className="absolute start-0 top-0 h-6 w-6 border-s border-t border-ivory/40" />
            <span className="absolute end-0 top-0 h-6 w-6 border-e border-t border-ivory/40" />
            <span className="absolute bottom-0 start-0 h-6 w-6 border-b border-s border-ivory/40" />
            <span className="absolute bottom-0 end-0 h-6 w-6 border-b border-e border-ivory/40" />
          </div>
        </div>
        {/* bottom fade into the page */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* ---------- Intro, CTA, scroll cue ---------- */}
      <div data-hero-copy className="wrap relative z-20 order-3 grid items-end gap-7 pb-10 pt-8 md:grid-cols-12 md:pb-10 md:pt-6">
        <p data-hero-in className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-ivory/85 md:col-span-5">
          {t(profile.intro)}
        </p>
        <div data-hero-in className="md:col-span-4 md:col-start-7">
          <MagneticButton
            href="#work"
            onClick={e => {
              e.preventDefault();
              scrollTo('#work');
            }}
            icon={<ArrowDown size={18} />}
          >
            {ui.explore}
          </MagneticButton>
        </div>
        <button
          type="button"
          data-hero-in
          onClick={() => scrollTo('#work')}
          aria-label={ui.scrollToWork}
          className="group hidden items-center justify-end gap-3 text-[0.8rem] text-mist md:col-span-2 md:col-start-11 md:flex"
        >
          <span>{lang === 'ar' ? 'مرّر' : 'Scroll'}</span>
          <span className="relative block h-10 w-px overflow-hidden bg-ivory/20" aria-hidden="true">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_cubic-bezier(.76,0,.24,1)_infinite] bg-electric motion-reduce:animate-none" />
          </span>
        </button>
      </div>
    </section>
  );
}
