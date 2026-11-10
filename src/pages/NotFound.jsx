import { TransitionLink } from '../context/PageTransition';
import usePageTitle from '../hooks/usePageTitle';
import { profile } from '../data/profile';
import { useLang } from '../i18n/LanguageContext';

export default function NotFound() {
  const { t, ui } = useLang();
  usePageTitle(`${ui.notFoundLabel} — ${t(profile.fullName)}`);
  return (
    <section className="wrap flex min-h-[80svh] flex-col justify-end pb-16 pt-32">
      <p className="label">{ui.notFoundLabel}</p>
      <h1 className="display mt-4 text-[clamp(4rem,14vw,12rem)] font-normal italic text-ivory">{ui.notFoundTitle}</h1>
      <p className="mt-6 max-w-[40ch] text-ivory/75">{ui.notFoundText}</p>
      <TransitionLink to="/" className="mt-8 w-fit text-ivory underline decoration-ivory/30 underline-offset-4 hover:text-electric">
        {ui.notFoundLink}
      </TransitionLink>
    </section>
  );
}
