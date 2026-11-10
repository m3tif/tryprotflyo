import { useRef } from 'react';
import { profile } from '../../data/profile';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import ScrollReveal from '../reactbits/ScrollReveal';
import Print from '../ui/Print';
import { useLang } from '../../i18n/LanguageContext';

/**
 * Editorial spread: a statement that brightens word by word as you
 * read (React Bits <ScrollReveal>), then a photo set against the bio,
 * interests, approach and a short index of personal details.
 */
export default function About() {
  const { about } = profile;
  const { t, ui, isRTL } = useLang();
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray('[data-rule]').forEach(rule => {
        gsap.from(rule, {
          scaleX: 0,
          transformOrigin: isRTL ? 'right center' : 'left center',
          duration: 1.4,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: rule, start: 'top 90%', once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="about" aria-labelledby="about-title" className="room-light scroll-mt-10 py-[clamp(5rem,12vw,10rem)]">
      <div className="wrap">
        <div className="hairline flex items-baseline justify-between border-t pt-4">
          <h2 id="about-title" className="label">
            {ui.about}
          </h2>
          <p className="label">{t(profile.fullName)}</p>
        </div>

        <ScrollReveal
          as="p"
          baseOpacity={0.12}
          enableBlur={false}
          baseRotation={1.5}
          containerClassName="mt-10 max-w-[68rem]"
          textClassName="display statement text-[clamp(2.1rem,5.2vw,5.25rem)] leading-[1.02]! font-normal text-ivory"
          rotationEnd="bottom 70%"
          wordAnimationEnd="bottom 60%"
        >
          {t(about.statement)}
        </ScrollReveal>
      </div>

      <div className="wrap mt-[clamp(4rem,9vw,8rem)] grid gap-12 md:grid-cols-12 md:gap-x-8">
        <figure className="md:sticky md:top-24 md:col-span-5 md:self-start">
          <Print src={about.photo.src} alt={t(about.photo.alt)} ratio="11 / 14" parallax={0.14} sizes="(min-width: 768px) 40vw, 100vw" />
          <figcaption className="label mt-3">{t(about.photo.caption)}</figcaption>
        </figure>

        <div className="md:col-span-6 md:col-start-7">
          <div className="space-y-5 text-[1.125rem] leading-[1.75] text-ivory/85">
            {about.bio.map((p, i) => (
              <p key={i} className="max-w-[58ch]">
                {t(p)}
              </p>
            ))}
          </div>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
            <div>
              <h3 className="label">{ui.interests}</h3>
              <div data-rule className="hairline mt-3 border-t" />
              <ul className="mt-4 space-y-2">
                {about.interests.map((item, i) => (
                  <li key={i} className="display text-[1.6rem] italic text-ivory">
                    {t(item)}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="label">{ui.details}</h3>
              <div data-rule className="hairline mt-3 border-t" />
              <dl className="mt-4 space-y-3">
                {about.details.map((d, i) => (
                  <div key={i} className="grid grid-cols-[7.5rem_1fr] gap-3">
                    <dt className="label pt-0.5">{t(d.label)}</dt>
                    <dd className="text-ivory">{t(d.value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="label">{ui.howIWork}</h3>
            <div data-rule className="hairline mt-3 border-t" />
            <div className="mt-6 space-y-8">
              {about.approach.map((a, i) => (
                <div
                  key={i}
                  className="grid gap-2 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-8 md:grid-cols-1 md:gap-2 xl:grid-cols-[minmax(0,14rem)_1fr] xl:gap-8"
                >
                  <h4 className="display text-[1.75rem] font-normal text-ivory">{t(a.title)}</h4>
                  <p className="max-w-[46ch] text-ivory/75 sm:pt-1.5 md:pt-0 xl:pt-1.5">{t(a.text)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
