import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import { navLinks, socials } from '../../data/socials';
import { profile } from '../../data/profile';
import { useSmoothScroll } from '../../context/SmoothScroll';
import { usePageTransition, TransitionLink } from '../../context/PageTransition';
import { useLang } from '../../i18n/LanguageContext';

/** Arabic ⇄ English switch. */
function LangSwitch({ className = '' }) {
  const { lang, ui } = useLang();
  const { switchLang } = usePageTransition();
  const next = lang === 'ar' ? 'en' : 'ar';
  return (
    <button
      type="button"
      onClick={() => switchLang(next, ui.switchTo)}
      aria-label={ui.switchLabel}
      lang={next}
      className={`group inline-flex h-11 items-center rounded-full border border-ivory/30 px-4 text-[0.9rem] text-ivory transition-colors hover:border-electric hover:text-electric ${className}`}
    >
      {ui.switchTo}
    </button>
  );
}

/**
 * Fixed header that tucks away on scroll down and returns on scroll up.
 * On small screens the links move into a full-screen menu.
 */
export default function Navbar() {
  const header = useRef(null);
  const menu = useRef(null);
  const toggle = useRef(null);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { lenis, scrollTo } = useSmoothScroll();
  const { go, introDone } = usePageTransition();
  const { t, ui } = useLang();
  const isHome = pathname === '/';

  // Hide on scroll down, reveal on scroll up.
  useGSAP(
    () => {
      const show = gsap.quickTo(header.current, 'yPercent', { duration: 0.6, ease: 'expo.out' });
      const st = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: self => {
          header.current.classList.toggle('nav-solid', self.scroll() > 60);
          if (open) return;
          show(self.direction === 1 && self.scroll() > 200 ? -110 : 0);
        },
      });
      return () => st.kill();
    },
    { dependencies: [open] }
  );

  // Entrance once the intro finishes.
  useGSAP(
    () => {
      if (!introDone || prefersReducedMotion()) return;
      gsap.from(header.current.querySelectorAll('[data-nav-in]'), {
        yPercent: 120,
        autoAlpha: 0,
        duration: 1.1,
        stagger: 0.06,
        ease: 'expo.out',
        delay: 0.6,
      });
    },
    { dependencies: [introDone], scope: header }
  );

  // Mobile menu open / close.
  useGSAP(
    () => {
      if (!menu.current) return;
      const items = menu.current.querySelectorAll('[data-menu-item]');
      if (open) {
        lenis?.stop();
        gsap
          .timeline()
          .set(menu.current, { autoAlpha: 1 })
          .fromTo(menu.current, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'expo.inOut' })
          .fromTo(items, { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.05, ease: 'expo.out' }, '-=0.35');
      } else {
        lenis?.start();
        gsap.to(menu.current, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.6,
          ease: 'expo.inOut',
          onComplete: () => gsap.set(menu.current, { autoAlpha: 0 }),
        });
      }
    },
    { dependencies: [open] }
  );

  // Close with Escape; return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const navigateTo = (e, href) => {
    e.preventDefault();
    setOpen(false);
    if (isHome) {
      setTimeout(() => scrollTo(href), open ? 350 : 0);
    } else {
      go('/', { state: { scrollTo: href } });
    }
  };

  const goHome = e => {
    e.preventDefault();
    setOpen(false);
    if (isHome) scrollTo(0);
    else go('/');
  };

  return (
    <>
      <a
        href="#main"
        className="fixed start-4 top-4 z-[120] -translate-y-24 rounded-full bg-ivory px-4 py-2 text-sm text-ink focus:translate-y-0"
      >
        {ui.skip}
      </a>

      <header ref={header} data-site-header className="fixed inset-x-0 top-0 z-[80] transition-[background-color,border-color] duration-500 border-b border-transparent [&.nav-solid]:border-[var(--line)] [&.nav-solid]:bg-ink/90">
        <nav aria-label="Primary" className="wrap flex items-center justify-between gap-6 py-4 md:py-5">
          <a
            href="/"
            onClick={goHome}
            data-nav-in
            className="group flex items-baseline gap-2 text-ivory"
            aria-label={t(profile.fullName)}
          >
            <span className="display text-2xl not-italic">{t(profile.firstName)}</span>
            <span className="display text-2xl italic">{t(profile.lastName)}</span>
          </a>

          <div className="flex items-center gap-8">
            <ul className="hidden items-center gap-7 lg:flex">
              {navLinks.map(link => (
                <li key={link.href} data-nav-in>
                  <a href={link.href} onClick={e => navigateTo(e, link.href)} className="group text-[0.95rem] text-ivory">
                    <span className="roll">
                      <span>{t(link.label)}</span>
                      <span aria-hidden="true">{t(link.label)}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li data-nav-in>
                <TransitionLink to="/cv" title={ui.cv} className="group text-[0.95rem] text-electric">
                  <span className="roll">
                    <span>{ui.cv}</span>
                    <span aria-hidden="true">{ui.cv}</span>
                  </span>
                </TransitionLink>
              </li>
            </ul>
            <div data-nav-in>
              <LangSwitch className="h-10 bg-ink/40 backdrop-blur-sm" />
            </div>

            <button
              ref={toggle}
              type="button"
              data-nav-in
              onClick={() => setOpen(v => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative z-10 flex h-11 items-center gap-3 text-ivory lg:hidden"
            >
              <span className="text-[0.95rem]">{open ? ui.close : ui.menu}</span>
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span className={`absolute start-0 h-px w-full bg-ivory transition-transform duration-500 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute start-0 h-px w-full bg-ivory transition-transform duration-500 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div
        ref={menu}
        id="mobile-menu"
        className="invisible fixed inset-0 z-[75] flex flex-col justify-between bg-night wrap pb-10 pt-28 lg:hidden"
        aria-hidden={!open}
        inert={!open || undefined}
      >
        <ul className="flex flex-col gap-1">
          {navLinks.map(link => (
            <li key={link.href} className="overflow-hidden">
              <a
                href={link.href}
                onClick={e => navigateTo(e, link.href)}
                data-menu-item
                className="display block py-1 text-[clamp(2.75rem,12vw,5rem)] text-ivory active:text-electric"
              >
                {t(link.label)}
              </a>
            </li>
          ))}
          <li className="overflow-hidden">
            <TransitionLink
              to="/cv"
              title={ui.cv}
              onClick={() => setOpen(false)}
              data-menu-item
              className="display block py-1 text-[clamp(2.75rem,12vw,5rem)] italic text-electric"
            >
              {ui.cv}
            </TransitionLink>
          </li>
        </ul>
        <div className="flex flex-col gap-4">
          <a href={`mailto:${profile.email}`} className="text-lg text-ivory underline decoration-ivory/30 underline-offset-4" dir="ltr">
            {profile.email}
          </a>
          <ul className="flex flex-wrap gap-5">
            {socials.map(s => (
              <li key={s.icon}>
                <a href={s.url} target={s.url.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="label hover:text-ivory">
                  {t(s.label)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
