import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import Works from '../components/sections/Works';
import About from '../components/sections/About';
import Photography from '../components/sections/Photography';
import Skills from '../components/sections/Skills';
import Journey from '../components/sections/Journey';
import Contact from '../components/sections/Contact';
import Marquee from '../components/ui/Marquee';
import usePageTitle from '../hooks/usePageTitle';
import { site } from '../data/profile';
import { useSmoothScroll } from '../context/SmoothScroll';
import { useLang, isolateLatin } from '../i18n/LanguageContext';

export default function Home() {
  const { t, lang } = useLang();
  usePageTitle(t(site.title), t(site.description));
  const { state } = useLocation();
  const { scrollTo, lenis } = useSmoothScroll();

  // Arriving from another page with a section to jump to (e.g. "All work").
  useEffect(() => {
    if (!state?.scrollTo || !lenis) return;
    const id = setTimeout(() => scrollTo(state.scrollTo, { immediate: true }), 50);
    return () => clearTimeout(id);
  }, [state, lenis, scrollTo]);

  return (
    <>
      <Hero />
      <Marquee
        items={
          lang === 'ar'
            ? ['تطوير الويب', 'باك إند .NET', 'متاجر إلكترونية', 'أنظمة CRM', 'Vibe Coding'].map(isolateLatin)
            : ['Web development', '.NET backend', 'Online stores', 'CRM systems', 'Vibe coding']
        }
        speed={38}
        className="border-y hairline py-5 md:py-7"
        itemClassName="display whitespace-nowrap text-[clamp(2.5rem,7vw,6.5rem)] italic text-ivory/85"
      />
      <Works />
      <About />
      <Photography />
      <Skills />
      <Journey />
      <Contact />
    </>
  );
}
