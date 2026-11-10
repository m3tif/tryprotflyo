import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import { profile } from '../../data/profile';
import { socials } from '../../data/socials';
import { useSmoothScroll } from '../../context/SmoothScroll';
import { useLang, isolateLatin } from '../../i18n/LanguageContext';

function LocalTime({ timeZone }) {
  const format = () =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 15000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);
  return (
    <time className="tabular-nums" dir="ltr">
      {time}
    </time>
  );
}

const year = new Date().getFullYear();

/**
 * Closing footer: the name rises out of the page edge as you reach
 * the bottom, with the essentials laid along a hairline above it.
 */
export default function Footer() {
  const root = useRef(null);
  const { scrollTo } = useSmoothScroll();
  const { t, ui, lang } = useLang();
  const name = t(profile.fullName);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('[data-piece]', {
        yPercent: 100,
        ease: 'none',
        stagger: 0.04,
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: 0.6 },
      });
    },
    { scope: root, dependencies: [lang] }
  );

  return (
    <footer ref={root} className="relative overflow-hidden pt-16">
      <div className="wrap">
        <div className="hairline grid grid-cols-2 gap-x-6 gap-y-8 border-t pt-6 md:grid-cols-4">
          <div>
            <p className="label">{ui.localTime}</p>
            <p className="mt-1 text-ivory">
              <LocalTime timeZone={profile.timezone} />
              <span className="block text-mist">{t(profile.location)}</span>
            </p>
          </div>
          <div>
            <p className="label">{ui.elsewhere}</p>
            <ul className="mt-1 flex flex-wrap gap-x-4">
              {socials.map(s => (
                <li key={s.icon}>
                  <a
                    href={s.url}
                    target={s.url.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="text-ivory transition-colors hover:text-electric"
                  >
                    {t(s.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label">{ui.colophon}</p>
            <p className="mt-1 text-ivory">{lang === 'ar' ? isolateLatin(ui.colophonText) : ui.colophonText}</p>
          </div>
          <div className="flex md:justify-end">
            <button
              type="button"
              onClick={() => scrollTo(0, { duration: 2.2 })}
              className="group flex h-fit items-center gap-2 text-ivory"
            >
              <span className="roll">
                <span>{ui.backToTop}</span>
                <span aria-hidden="true">{ui.backToTop}</span>
              </span>
              <ArrowUp size={16} className="transition-transform duration-500 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>

      <p
        data-wordmark
        aria-hidden="true"
        className="display wordmark mt-10 flex select-none justify-center gap-[0.25em] overflow-hidden whitespace-nowrap px-2 pb-[0.06em] text-[13.5vw] leading-[0.85] text-ivory/90"
      >
        {/* Latin: letter by letter. Arabic: word by word, so letters stay joined. */}
        {lang === 'ar'
          ? name.split(' ').map((w, i) => (
              <span key={i} data-piece className="inline-block">
                {w}
              </span>
            ))
          : name.split(' ').map((word, wi) => (
              <span key={wi} className="inline-flex">
                {word.split('').map((c, i) => (
                  <span key={i} data-piece className="inline-block">
                    {c}
                  </span>
                ))}
              </span>
            ))}
      </p>
      <div className="wrap flex justify-between pb-6 pt-3">
        <p className="label">
          © {year} {name}
        </p>
        <p className="label">{ui.rights}</p>
      </div>
    </footer>
  );
}
