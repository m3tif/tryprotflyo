import { useRef } from 'react';
import { journey } from '../../data/experience';
import { gsap, useGSAP, MQ } from '../../lib/gsap';
import { useLang } from '../../i18n/LanguageContext';

/**
 * The timeline. On desktop the section pins and the milestones travel
 * sideways as you scroll, with a electric rule tracking progress.
 * On smaller screens it becomes a vertical line that draws itself.
 */
export default function Journey() {
  const root = useRef(null);
  const track = useRef(null);
  const progress = useRef(null);
  const { t, ui, isRTL } = useLang();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(`${MQ.desktop} and ${MQ.motion}`, () => {
        const distance = () => track.current.scrollWidth - window.innerWidth;
        const tween = gsap.to(track.current, {
          x: () => (isRTL ? distance() : -distance()),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        gsap.fromTo(
          progress.current,
          { scaleX: 0 },
          { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${distance()}`, scrub: true } }
        );
        gsap.utils.toArray('[data-milestone]').forEach(card => {
          gsap.from(card.querySelectorAll('[data-m-in]'), {
            yPercent: 60,
            autoAlpha: 0,
            stagger: 0.07,
            ease: 'expo.out',
            duration: 1,
            scrollTrigger: { trigger: card, containerAnimation: tween, start: isRTL ? 'right 15%' : 'left 85%', toggleActions: 'play none none reverse' },
          });
        });
      });

      mm.add(`not all and ${MQ.desktop}, ${MQ.reduce}`, () => {
        gsap.fromTo(
          '[data-vline]',
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: track.current, start: 'top 70%', end: 'bottom 70%', scrub: true } }
        );
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="journey" aria-labelledby="journey-title" className="relative scroll-mt-0 overflow-hidden py-24 lg:flex lg:h-[100svh] lg:flex-col lg:py-0">
      <div className="wrap lg:pt-28">
        <div className="hairline flex items-baseline justify-between border-t pt-4">
          <p className="label">{ui.journeyLabel}</p>
          <p className="label">{ui.milestones(journey.length)}</p>
        </div>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <h2 id="journey-title" className="display text-[clamp(3.25rem,8vw,8rem)] font-normal text-ivory">
            {ui.journeyTitle}
          </h2>
          <p className="label hidden max-w-[24ch] text-end lg:block">{ui.keepScrolling}</p>
        </div>
        <div className="mt-8 hidden h-px w-full bg-ivory/10 lg:block">
          <div ref={progress} className="h-full bg-electric ltr:origin-left rtl:origin-right" />
        </div>
      </div>

      <div className="relative mt-12 lg:mt-0 lg:flex lg:flex-1 lg:items-center">
        <span data-vline aria-hidden="true" className="absolute bottom-0 start-[calc(var(--gutter)+0.3rem)] top-0 w-px origin-top bg-electric lg:hidden" />
        <ol ref={track} className="wrap flex flex-col gap-14 lg:w-max lg:flex-row lg:gap-0 lg:pr-[20vw]">
          {journey.map((m, i) => (
            <li
              key={i}
              data-milestone
              className="relative ps-10 lg:w-[34vw] lg:max-w-[560px] lg:border-s lg:border-[var(--line)] lg:px-10 xl:w-[30vw]"
            >
              <span aria-hidden="true" className="absolute start-0 top-3 h-2.5 w-2.5 rounded-full bg-electric ring-4 ring-ink lg:hidden" />
              <p data-m-in className="label tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </p>
              <p data-m-in className="display mt-3 text-[clamp(3rem,6vw,6.5rem)] italic text-ivory/90">
                {t(m.period)}
              </p>
              <h3 data-m-in className="mt-4 text-[1.35rem] font-medium text-ivory">
                {t(m.title)}
              </h3>
              <p data-m-in className="label mt-1">
                {t(m.place)}
              </p>
              <p data-m-in className="mt-4 max-w-[38ch] leading-relaxed text-ivory/75">
                {t(m.text)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
