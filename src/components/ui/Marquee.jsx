import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../../lib/gsap';

/**
 * An endless band of words. Scroll speed pushes it faster and
 * scroll direction flips it, then it eases back to cruising speed.
 */
export default function Marquee({ items, speed = 40, className = '', itemClassName = '', separator = '✦' }) {
  const root = useRef(null);
  const track = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const loop = gsap.to(track.current, { xPercent: -50, duration: speed, ease: 'none', repeat: -1 });
      let direction = 1;
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: self => {
          if (self.direction !== direction) direction = self.direction;
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6);
          gsap.to(loop, { timeScale: boost * direction, duration: 0.2, overwrite: true });
          gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.2, ease: 'power2.out' });
        },
        onToggle: self => (self.isActive ? loop.play() : loop.pause()),
      });
      return () => st.kill();
    },
    { scope: root, dependencies: [speed] }
  );

  const row = (copy) => (
    <div className="flex shrink-0 items-center" aria-hidden={copy > 0 || undefined}>
      {items.map((item, i) => (
        <span key={`${copy}-${i}`} className="flex items-center">
          <span className={itemClassName}>{item}</span>
          <span className="mx-[0.35em] text-[0.4em] text-electric" aria-hidden="true">
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div ref={root} dir="ltr" className={`overflow-hidden ${className}`}>
      <div ref={track} className="flex w-max will-change-transform">
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}
