import { useRef } from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';
import { projects } from '../../data/projects';
import SectionHeading from '../ui/SectionHeading';
import Print from '../ui/Print';
import { TransitionLink } from '../../context/PageTransition';
import { useLang } from '../../i18n/LanguageContext';
import { gsap, useGSAP, MQ, prefersReducedMotion } from '../../lib/gsap';

/**
 * Six-step choreography for the asymmetric exhibition grid (12 columns
 * on desktop). The pattern repeats if more projects are added; `layout`
 * in the data sets each image's proportions. Columns mirror in Arabic.
 */
const PLACEMENT = [
  'lg:col-start-1 lg:col-span-7',
  'lg:col-start-9 lg:col-span-4 lg:mt-48',
  'lg:col-start-2 lg:col-span-5 lg:mt-10',
  'lg:col-start-8 lg:col-span-5 lg:mt-36',
  'lg:col-start-1 lg:col-span-6 lg:mt-6',
  'lg:col-start-8 lg:col-span-5 lg:mt-40',
];
const RATIO = { wide: '16 / 10', tall: '4 / 5', offset: '5 / 4' };

export function ExternalLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="group/link relative inline-flex min-h-11 items-center gap-1.5 text-[0.95rem] text-ivory"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 start-0 h-px w-full bg-ivory/30" />
        <span className="absolute -bottom-0.5 start-0 h-px w-full scale-x-0 bg-electric transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/link:scale-x-100 ltr:origin-left rtl:origin-right" />
      </span>
      <ArrowUpRight size={15} className="transition-transform duration-500 group-hover/link:-translate-y-0.5 rtl:-scale-x-100" />
    </a>
  );
}

const num = i => String(i + 1).padStart(2, '0');

function ProjectCard({ project, index }) {
  const { t, ui } = useLang();
  const to = `/work/${project.slug}`;
  const title = t(project.title);
  return (
    <article className={`${index % 2 ? 'md:mt-28 lg:mt-0' : ''} ${PLACEMENT[index % PLACEMENT.length]}`}>
      <TransitionLink to={to} title={title} className="group block" aria-label={`${title} — ${ui.viewProject}`}>
        <div className="relative overflow-hidden bg-night">
          <div data-drift>
            <div className="transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]">
            <Print
              image={project.cover}
              alt=""
              ratio={RATIO[project.layout] ?? RATIO.wide}
              parallax={0.1}
              sizes="(min-width: 1024px) 55vw, (min-width: 768px) 50vw, 100vw"
            />
            </div>
          </div>
          {/* Hover reveal (desktop): what it is, then the action */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/85 via-ink/20 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 md:p-7">
            <div className="translate-y-4 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-y-0">
              {project.tech?.length > 0 && (
                <p className="text-[0.85rem] text-ivory/80" dir="ltr" style={{ textAlign: 'start' }}>
                  {project.tech.join(' / ')}
                </p>
              )}
              <p className="mt-2 inline-flex items-center gap-2 text-[0.95rem] font-medium text-ivory">
                {ui.viewProject} <ArrowUpRight size={16} className="rtl:-scale-x-100" />
              </p>
            </div>
          </div>
          <span className="absolute start-4 top-4 font-[family-name:var(--font-display)] text-[0.95rem] italic text-ivory mix-blend-difference md:start-6 md:top-5">
            № {num(index)}
          </span>
        </div>

        <div className="mt-5 flex items-baseline justify-between gap-4">
          <p className="label">{t(project.category)}</p>
          {project.year && <p className="label tabular-nums">{project.year}</p>}
        </div>
        <h3 className="display mt-2 text-[clamp(2.1rem,4.2vw,4rem)] font-normal text-ivory">
          <span className="roll">
            <span>{title}</span>
            <span aria-hidden="true" className="text-electric">
              {title}
            </span>
          </span>
        </h3>
      </TransitionLink>

      <p className="mt-3 max-w-[50ch] text-ivory/75">{t(project.description)}</p>

      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
        {project.liveUrl && (
          <ExternalLink href={project.liveUrl} label={`${ui.live}: ${title}`}>
            {ui.live}
          </ExternalLink>
        )}
        {project.sourceUrl && (
          <ExternalLink href={project.sourceUrl} label={`${ui.source}: ${title}`}>
            {ui.source}
          </ExternalLink>
        )}
        {project.private && (
          <p className="label inline-flex min-h-11 items-center gap-2">
            <Lock size={14} aria-hidden="true" /> {ui.privateProject}
          </p>
        )}
      </div>
    </article>
  );
}

export default function Works() {
  const { ui } = useLang();
  const root = useRef(null);

  // Desktop: the image inside each frame drifts gently toward the pointer.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add(`${MQ.desktop} and ${MQ.fine}`, () => {
        const offs = gsap.utils.toArray('[data-drift]').map(el => {
          const host = el.parentElement;
          gsap.set(el, { scale: 1.02 });
          const x = gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3' });
          const y = gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3' });
          const move = e => {
            const r = host.getBoundingClientRect();
            x(((e.clientX - r.left) / r.width - 0.5) * 18);
            y(((e.clientY - r.top) / r.height - 0.5) * 14);
          };
          const leave = () => {
            x(0);
            y(0);
          };
          host.addEventListener('pointermove', move);
          host.addEventListener('pointerleave', leave);
          return () => {
            host.removeEventListener('pointermove', move);
            host.removeEventListener('pointerleave', leave);
          };
        });
        return () => offs.forEach(off => off());
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="work" aria-label={ui.workTitle} className="scroll-mt-10 py-[clamp(6rem,14vw,12rem)]">
      <SectionHeading label={ui.workLabel} title={ui.workTitle} aside={ui.projects(projects.length)} />
      <div className="wrap mt-[clamp(3rem,8vw,7rem)] grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-20 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-24">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
