import { useRef, useState } from 'react';
import { skillGroups } from '../../data/skills';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import SectionHeading from '../ui/SectionHeading';
import { useLang } from '../../i18n/LanguageContext';

/**
 * A typographic index. Categories form a tab list; the chosen one
 * sets its skills in large display type that rises line by line.
 * Hover (or arrow keys) to browse — no progress bars.
 */
export default function Skills() {
  const root = useRef(null);
  const panel = useRef(null);
  const tabs = useRef([]);
  const seen = useRef(false);
  const { t, ui, isRTL } = useLang();
  const [active, setActive] = useState(0);
  const group = skillGroups[active];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // First reveal waits for the panel to scroll into view; later
      // category switches animate immediately.
      const first = !seen.current;
      seen.current = true;
      gsap.fromTo(
        panel.current.querySelectorAll('[data-skill]'),
        { yPercent: 110, rotate: 3 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          stagger: 0.04,
          ease: 'expo.out',
          scrollTrigger: first ? { trigger: panel.current, start: 'top 85%', once: true } : undefined,
        }
      );
      gsap.fromTo(panel.current.querySelector('[data-note]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 });
    },
    { dependencies: [active], scope: root }
  );

  const onKeyDown = e => {
    const keys = { ArrowDown: 1, ArrowUp: -1, ArrowRight: isRTL ? -1 : 1, ArrowLeft: isRTL ? 1 : -1 };
    if (e.key in keys) {
      e.preventDefault();
      const next = (active + keys[e.key] + skillGroups.length) % skillGroups.length;
      setActive(next);
      tabs.current[next]?.focus();
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      const next = e.key === 'Home' ? 0 : skillGroups.length - 1;
      setActive(next);
      tabs.current[next]?.focus();
    }
  };

  return (
    <section ref={root} id="skills" aria-label={ui.skillsLabel} className="scroll-mt-10 py-[clamp(6rem,14vw,12rem)]">
      <SectionHeading label={ui.skillsLabel} title={ui.skillsTitle} aside={ui.disciplines(skillGroups.length)} />

      <div className="wrap mt-[clamp(3rem,7vw,6rem)] grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div
          role="tablist"
          aria-label={ui.skillCategories}
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="-mx-[var(--gutter)] flex snap-x gap-6 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none] lg:col-span-5 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0"
        >
          {skillGroups.map((g, i) => {
            const selected = i === active;
            return (
              <button
                key={g.id}
                ref={el => (tabs.current[i] = el)}
                role="tab"
                id={`tab-${g.id}`}
                aria-selected={selected}
                aria-controls="skills-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={`hairline group flex shrink-0 snap-start items-baseline gap-4 py-3 text-left transition-colors duration-500 lg:border-b lg:py-5 ${
                  selected ? 'text-ivory' : 'text-mist hover:text-ivory/80'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`hidden h-2 w-2 shrink-0 -translate-y-1 rounded-full bg-electric transition-transform duration-500 lg:block ${selected ? 'scale-100' : 'scale-0'}`}
                />
                <span className={`display whitespace-nowrap text-[clamp(1.6rem,3.2vw,2.9rem)] transition-[font-style] ${selected ? 'italic' : ''}`}>
                  {t(g.name)}
                </span>
              </button>
            );
          })}
        </div>

        <div
          ref={panel}
          id="skills-panel"
          role="tabpanel"
          aria-labelledby={`tab-${group.id}`}
          className="min-h-[22rem] lg:col-span-6 lg:col-start-7"
        >
          <p data-note className="label max-w-[40ch]">
            {t(group.note)}
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-[0.5em] gap-y-1 text-[clamp(2rem,4.6vw,4.5rem)] leading-[1.1]" dir="ltr" style={{ justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
            {group.skills.map((skill, i) => (
              <li key={`${group.id}-${skill}`} className="overflow-hidden pb-[0.08em]">
                <span data-skill className="display inline-block text-ivory transition-colors duration-300 hover:text-electric">
                  {skill}
                  {i < group.skills.length - 1 && <span className="text-mist/50">,</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
