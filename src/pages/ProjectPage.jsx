import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import { getProject, projects } from '../data/projects';
import { profile } from '../data/profile';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import usePageTitle from '../hooks/usePageTitle';
import { TransitionLink } from '../context/PageTransition';
import { useLang } from '../i18n/LanguageContext';
import SplitText from '../components/reactbits/SplitText';
import Print from '../components/ui/Print';
import Img, { Credit } from '../components/ui/Img';
import { ExternalLink } from '../components/sections/Works';
import NotFound from './NotFound';

/**
 * Case study page: title and facts, a full-bleed cover that develops
 * in, the story (only the parts that have text), supporting images,
 * and a large link through to the next project.
 */
export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  const root = useRef(null);
  const { t, ui, lang } = useLang();
  usePageTitle(
    project ? `${t(project.title)} — ${t(profile.fullName)}` : `${ui.notFoundLabel} — ${t(profile.fullName)}`,
    project ? t(project.description) : undefined
  );

  useGSAP(
    () => {
      if (!project || prefersReducedMotion()) return;
      gsap.from('[data-p-in]', { autoAlpha: 0, y: 24, duration: 1.1, stagger: 0.06, ease: 'expo.out', delay: 0.5 });
    },
    { scope: root, dependencies: [slug] }
  );

  if (!project) return <NotFound />;

  const i = projects.findIndex(p => p.slug === project.slug);
  const next = projects[(i + 1) % projects.length];
  const title = t(project.title);

  const facts = [
    { label: ui.role, value: t(project.role) },
    { label: ui.category, value: t(project.category) },
    { label: ui.year, value: project.year },
    { label: ui.tech, value: project.tech?.join(', '), ltr: true },
  ].filter(f => f.value);
  const story = [
    { label: ui.overview, text: t(project.overview) },
    { label: ui.challenge, text: t(project.challenge) },
    { label: ui.outcome, text: t(project.outcome) },
  ].filter(s => s.text);

  return (
    <article ref={root} key={slug} className="pt-28 md:pt-36">
      <div className="wrap">
        <TransitionLink
          to="/"
          state={{ scrollTo: '#work' }}
          title={ui.workTitle}
          data-p-in
          className="group inline-flex min-h-11 items-center gap-2 text-ivory"
        >
          <ArrowLeft size={16} className="transition-transform duration-500 group-hover:-translate-x-1 rtl:-scale-x-100 rtl:group-hover:translate-x-1" />
          <span className="roll">
            <span>{ui.allWork}</span>
            <span aria-hidden="true">{ui.allWork}</span>
          </span>
        </TransitionLink>

        <div className="hairline mt-8 flex items-baseline justify-between border-t pt-4" data-p-in>
          <p className="label">{t(project.category)}</p>
          {project.year && <p className="label tabular-nums">{project.year}</p>}
        </div>

        <SplitText
          key={`${lang}-${slug}`}
          tag="h1"
          text={title}
          textAlign="start"
          splitType={lang === 'ar' ? 'words' : 'chars'}
          mask
          delay={30}
          duration={1.3}
          ease="expo.out"
          from={{ yPercent: 110 }}
          to={{ yPercent: 0 }}
          trigger="load"
          className="display mt-6 block text-[clamp(3.5rem,13vw,13rem)] font-normal text-ivory"
        />

        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <p data-p-in className="text-[clamp(1.2rem,1.8vw,1.5rem)] leading-snug text-ivory/85 md:col-span-6">
            {t(project.description)}
          </p>
          <dl data-p-in className="grid grid-cols-2 gap-x-6 gap-y-5 md:col-span-5 md:col-start-8">
            {facts.map(f => (
              <div key={f.label}>
                <dt className="label">{f.label}</dt>
                <dd className="mt-1 text-ivory" dir={f.ltr ? 'ltr' : undefined} style={f.ltr ? { textAlign: 'start' } : undefined}>
                  {f.value}
                </dd>
              </div>
            ))}
            <div className="col-span-2 flex flex-wrap gap-x-6">
              {project.liveUrl && <ExternalLink href={project.liveUrl}>{ui.live}</ExternalLink>}
              {project.sourceUrl && <ExternalLink href={project.sourceUrl}>{ui.source}</ExternalLink>}
              {project.private && (
                <p className="label inline-flex min-h-11 items-center gap-2">
                  <Lock size={14} aria-hidden="true" /> {ui.privateProject}
                </p>
              )}
            </div>
          </dl>
        </div>
      </div>

      <figure className="mt-[clamp(3rem,8vw,7rem)] px-[calc(var(--gutter)/2)]">
        <Print image={project.cover} alt={title} ratio="16 / 9" parallax={0.16} priority sizes="100vw" maxWidth={2200} className="max-md:aspect-[4/3]!" />
        <figcaption className="wrap mt-3 flex justify-end">
          <Credit image={project.cover} className="label" />
        </figcaption>
      </figure>

      {story.length > 0 && (
        <div className="wrap mt-[clamp(4rem,10vw,9rem)] space-y-16">
          {story.map(s => (
            <section key={s.label} className="hairline grid gap-4 border-t pt-6 md:grid-cols-12">
              <h2 className="label md:col-span-3">{s.label}</h2>
              <p className="display story-text max-w-[34ch] text-[clamp(1.6rem,3vw,2.75rem)] font-normal leading-[1.2] text-ivory md:col-span-8 md:col-start-5">
                {s.text}
              </p>
            </section>
          ))}
        </div>
      )}

      {project.gallery?.length > 0 && (
        <div className="wrap mt-[clamp(5rem,10vw,9rem)] grid gap-8 md:grid-cols-12">
          {project.gallery.map((image, idx) => (
            <figure key={idx} className={idx % 2 ? 'md:col-span-5 md:col-start-8 md:mt-40' : 'md:col-span-7'}>
              <Print image={image} ratio={idx % 2 ? '4 / 5' : '16 / 10'} sizes="(min-width: 768px) 60vw, 100vw" />
              <figcaption className="mt-3 flex items-baseline justify-between gap-4">
                <span className="display text-sm italic text-champagne">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <Credit image={image} className="label" />
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <nav aria-label={ui.nextProject} className="wrap mt-[clamp(6rem,12vw,11rem)]">
        <TransitionLink to={`/work/${next.slug}`} title={t(next.title)} className="group hairline block border-t pt-6">
          <p className="label">{ui.nextProject}</p>
          <div className="mt-4 flex items-end justify-between gap-6">
            <p className="display text-[clamp(3rem,10vw,10rem)] font-normal text-ivory">
              <span className="roll">
                <span>{t(next.title)}</span>
                <span aria-hidden="true" className="text-electric">
                  {t(next.title)}
                </span>
              </span>
            </p>
            <div className="mb-3 hidden aspect-[4/3] w-[18vw] max-w-[280px] shrink-0 overflow-hidden md:block">
              <Img
                image={next.cover}
                alt=""
                sizes="280px"
                maxWidth={800}
                className="h-full w-full object-cover opacity-70 transition-[transform,opacity] duration-1000 group-hover:scale-105 group-hover:opacity-100"
              />
            </div>
          </div>
        </TransitionLink>
      </nav>
    </article>
  );
}
