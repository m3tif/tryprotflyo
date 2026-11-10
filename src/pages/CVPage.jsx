import { useRef } from 'react';
import { Download, Globe, Mail, MapPin, Phone } from 'lucide-react';
import { profile, site } from '../data/profile';
import { projects } from '../data/projects';
import { skillGroups } from '../data/skills';
import { journey } from '../data/experience';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import usePageTitle from '../hooks/usePageTitle';
import { useLang } from '../i18n/LanguageContext';
import SocialIcon from '../components/ui/SocialIcon';

/**
 * Résumé page (/cv). Built from the same data as the portfolio, in the
 * current language. "Save as PDF" opens the print dialog; print styles
 * (see .cv-sheet in index.css) turn it into a clean one-to-two page A4
 * document on white paper.
 */
export default function CVPage() {
  const { t, ui, lang } = useLang();
  const root = useRef(null);
  usePageTitle(`${ui.cvTitle} — ${t(profile.fullName)}`, t(profile.intro));

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('[data-cv-in]', { autoAlpha: 0, y: 24, duration: 1, stagger: 0.05, ease: 'expo.out', delay: 0.4 });
    },
    { scope: root, dependencies: [lang] }
  );

  const contacts = [
    { icon: <Phone size={14} />, text: profile.phone, href: `tel:${profile.phoneIntl}`, ltr: true },
    { icon: <SocialIcon name="whatsapp" size={14} />, text: 'WhatsApp', href: profile.whatsapp },
    { icon: <Mail size={14} />, text: profile.email, href: `mailto:${profile.email}`, ltr: true },
    { icon: <MapPin size={14} />, text: t(profile.locationFull) },
    { icon: <Globe size={14} />, text: site.url.replace(/^https?:\/\//, ''), href: site.url, ltr: true },
  ].filter(c => c.text);

  const Section = ({ title, children }) => (
    <section data-cv-in className="cv-section grid gap-4 border-t border-[var(--line)] pt-6 md:grid-cols-[11rem_1fr] md:gap-10">
      <h2 className="label cv-label pt-1">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );

  return (
    <div ref={root} className="wrap pb-10 pt-28 md:pt-36">
      <div data-noprint className="mx-auto mb-8 flex max-w-[60rem] flex-wrap items-center justify-between gap-4">
        <p className="label">{ui.cvHint}</p>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ivory px-6 text-[0.95rem] font-medium text-ink transition-colors hover:bg-electric"
        >
          <Download size={16} /> {ui.cvDownload}
        </button>
      </div>

      <article className="cv-sheet mx-auto max-w-[60rem] space-y-10 bg-night px-[clamp(1.25rem,5vw,4rem)] py-[clamp(2rem,6vw,4.5rem)]">
        <header data-cv-in className="space-y-5">
          <h1 className="display cv-name text-[clamp(3rem,8vw,6rem)] font-normal text-ivory">{t(profile.fullName)}</h1>
          <p className="cv-accent text-[1.25rem] text-electric">{t(profile.title)}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-ivory/85">
            {contacts.map(c => (
              <li key={c.text} className="inline-flex items-center gap-2">
                <span className="text-mist" aria-hidden="true">
                  {c.icon}
                </span>
                {c.href ? (
                  <a href={c.href} dir={c.ltr ? 'ltr' : undefined} className="hover:text-electric">
                    {c.text}
                  </a>
                ) : (
                  <span>{c.text}</span>
                )}
              </li>
            ))}
          </ul>
        </header>

        <Section title={ui.cvSummary}>
          <div className="max-w-[62ch] space-y-3 leading-relaxed text-ivory/85">
            <p>{t(profile.intro)}</p>
            <p>{t(profile.about.bio[1])}</p>
          </div>
        </Section>

        <Section title={ui.cvSkills}>
          <dl className="space-y-3">
            {skillGroups.map(g => (
              <div key={g.id} className="grid gap-1 sm:grid-cols-[13rem_1fr] sm:gap-4">
                <dt className="font-medium text-ivory">{t(g.name)}</dt>
                <dd className="text-ivory/75" dir="ltr" style={{ textAlign: 'start' }}>
                  {g.skills.join(' · ')}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title={ui.cvProjects}>
          <ul className="space-y-5">
            {projects.map(p => (
              <li key={p.slug} className="cv-item">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="display text-[1.5rem] font-normal text-ivory">{t(p.title)}</h3>
                  <p className="label">
                    {[t(p.category), p.year].filter(Boolean).join(', ')}
                  </p>
                </div>
                <p className="mt-1 max-w-[62ch] text-ivory/80">{t(p.description)}</p>
                <p className="label mt-1 flex flex-wrap gap-x-4">
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" dir="ltr" className="text-electric cv-accent hover:underline">
                      {p.liveUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                    </a>
                  )}
                  {p.private && <span>{ui.privateProject}</span>}
                  {p.tech?.length > 0 && <span dir="ltr">{p.tech.join(', ')}</span>}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title={ui.cvExperience}>
          <ol className="space-y-4">
            {journey.map((m, i) => (
              <li key={i} className="cv-item grid gap-1 sm:grid-cols-[6rem_1fr] sm:gap-4">
                <p className="display text-[1.15rem] italic text-electric cv-accent">{t(m.period)}</p>
                <div>
                  <p className="font-medium text-ivory">
                    {t(m.title)} <span className="label">— {t(m.place)}</span>
                  </p>
                  <p className="text-ivory/75">{t(m.text)}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section title={ui.cvLanguages}>
          <ul className="flex flex-wrap gap-x-10 gap-y-2">
            {profile.spokenLanguages.map((l, i) => (
              <li key={i} className="text-ivory">
                {t(l.name)} <span className="label">— {t(l.level)}</span>
              </li>
            ))}
          </ul>
        </Section>
      </article>
    </div>
  );
}
