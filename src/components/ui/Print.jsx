import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import Img from './Img';

/**
 * The site's image frame. As it enters the viewport the frame opens
 * (clip-path) while the picture settles from a slight zoom; on larger
 * screens it also drifts with scroll (parallax). Only transform and
 * clip-path are animated — no filters — so it stays cheap.
 *
 * `image` is a local path or an entry from data/images.js.
 */
export default function Print({
  image,
  src,
  alt,
  ratio,
  parallax = 0.12,
  priority = false,
  reveal = true,
  className = '',
  imgClassName = '',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  maxWidth,
}) {
  const frame = useRef(null);
  const inner = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      if (reveal) {
        gsap
          .timeline({ scrollTrigger: { trigger: frame.current, start: 'top 90%', once: true } })
          .from(frame.current, { clipPath: 'inset(14% 10% 14% 10%)', duration: 1.4, ease: 'expo.inOut' })
          .from(inner.current, { scale: 1.25, duration: 1.8, ease: 'expo.out' }, 0.1);
      }
      if (parallax) {
        mm.add('(min-width: 768px)', () => {
          gsap.fromTo(
            inner.current.firstElementChild,
            { yPercent: -parallax * 50 },
            {
              yPercent: parallax * 50,
              ease: 'none',
              scrollTrigger: { trigger: frame.current, start: 'top bottom', end: 'bottom top', scrub: true },
            }
          );
        });
      }
      return () => mm.revert();
    },
    { scope: frame }
  );

  return (
    <div
      ref={frame}
      className={`print relative max-w-full overflow-hidden bg-night ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <div ref={inner} className="absolute inset-0">
        <div className="absolute inset-x-0" style={{ top: `-${parallax * 50}%`, bottom: `-${parallax * 50}%` }}>
          <Img
            image={image ?? src}
            alt={alt}
            sizes={sizes}
            priority={priority}
            maxWidth={maxWidth}
            className={`h-full w-full object-cover ${imgClassName}`}
          />
        </div>
      </div>
    </div>
  );
}
