import { useRef, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { photos } from '../../data/photography';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion, MQ } from '../../lib/gsap';
import SectionHeading from '../ui/SectionHeading';
import Img, { Credit } from '../ui/Img';
import Lightbox from './Lightbox';
import { useLang } from '../../i18n/LanguageContext';

const roman = n => ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'][n] ?? String(n + 1);

// Each plate hangs at a slightly different width inside its column,
// like prints of different sizes on a gallery wall.
const HANG = ['', 'md:ps-[12%]', 'md:pe-[8%]', 'md:ps-[5%] md:pe-[5%]', 'md:pe-[16%]', 'md:ps-[9%]'];

/**
 * Photography as an exhibition wall: a masonry hang with museum-style
 * placards and one feature plate across the whole wall.
 *
 * Hover (desktop): a soft spotlight follows the pointer across the
 * print while the photo leans gently away from it — like moving a lamp
 * over a framed picture. Click opens the full-screen viewer.
 */
export default function Photography() {
  const root = useRef(null);
  const thumbs = useRef([]);
  const [active, setActive] = useState(null);
  const { t, ui } = useLang();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const plates = gsap.utils.toArray('[data-plate]');
      gsap.set(plates, { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(plates.map(p => p.querySelector('[data-lean]')), { scale: 1.25 });
      ScrollTrigger.batch(plates, {
        start: 'top 92%',
        once: true,
        onEnter: batch => {
          gsap.to(batch, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', stagger: 0.1 });
          gsap.to(batch.map(p => p.querySelector('[data-lean]')), { scale: 1.04, duration: 2, ease: 'expo.out', stagger: 0.1, delay: 0.15 });
        },
      });

      const mm = gsap.matchMedia();
      mm.add(`${MQ.desktop} and ${MQ.fine}`, () => {
        const offs = plates.map(plate => {
          const lean = plate.querySelector('[data-lean]');
          const x = gsap.quickTo(lean, 'x', { duration: 1, ease: 'power3' });
          const y = gsap.quickTo(lean, 'y', { duration: 1, ease: 'power3' });
          const move = e => {
            const r = plate.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;
            plate.style.setProperty('--sx', `${px * 100}%`);
            plate.style.setProperty('--sy', `${py * 100}%`);
            x((0.5 - px) * 16);
            y((0.5 - py) * 12);
          };
          const leave = () => {
            x(0);
            y(0);
          };
          plate.addEventListener('pointermove', move);
          plate.addEventListener('pointerleave', leave);
          return () => {
            plate.removeEventListener('pointermove', move);
            plate.removeEventListener('pointerleave', leave);
          };
        });
        return () => offs.forEach(off => off());
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="photography" aria-label={ui.galleryTitle} className="scroll-mt-10 py-[clamp(6rem,14vw,12rem)]">
      <SectionHeading label={ui.galleryLabel} title={ui.galleryTitle} aside={ui.plates(photos.length)} />

      <p className="wrap mt-8 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ivory/75">{ui.galleryIntro}</p>

      <div className="wrap mt-[clamp(3rem,7vw,6rem)] columns-1 gap-x-[clamp(1.5rem,4vw,4rem)] sm:columns-2 lg:columns-3">
        {photos.map((photo, i) => {
          const feature = photo.span === 'feature';
          return (
            <figure
              key={i}
              className={`mb-[clamp(2.5rem,6vw,5.5rem)] break-inside-avoid ${feature ? '[column-span:all] lg:px-[10%]' : HANG[i % HANG.length]}`}
            >
              <button
                type="button"
                ref={el => (thumbs.current[i] = el)}
                onClick={() => setActive(i)}
                aria-label={`${ui.enlarge}: ${t(photo.title)}`}
                className="group block w-full"
              >
                <div
                  data-plate
                  className="relative overflow-hidden bg-night"
                  style={{ aspectRatio: `${photo.width} / ${photo.height}`, '--sx': '50%', '--sy': '40%' }}
                >
                  <div data-lean className="absolute inset-0">
                    <Img
                      image={photo.image}
                      alt={t(photo.alt)}
                      sizes={feature ? '80vw' : '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw'}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {/* spotlight */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(circle at var(--sx) var(--sy), rgba(242,240,233,0.16), transparent 38%), radial-gradient(circle at var(--sx) var(--sy), transparent 30%, rgba(8,11,20,0.45) 85%)',
                    }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute end-3 top-3 grid h-9 w-9 scale-75 place-items-center rounded-full bg-ink/60 text-ivory opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
                  >
                    <Maximize2 size={15} />
                  </span>
                </div>
              </button>
              <figcaption className="mt-3 grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-2">
                <span className="display text-sm italic text-champagne">{roman(i)}</span>
                <span className="text-[0.95rem] text-ivory">{t(photo.title)}</span>
                <Credit image={photo.image} className="label" />
              </figcaption>
            </figure>
          );
        })}
      </div>

      {active !== null && (
        <Lightbox photos={photos} index={active} setIndex={setActive} originRef={thumbs} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
