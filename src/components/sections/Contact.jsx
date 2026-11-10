import { useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { profile } from '../../data/profile';
import { socials } from '../../data/socials';
import SplitText from '../reactbits/SplitText';
import CurvedLoop from '../reactbits/CurvedLoop';
import MagneticButton from '../ui/MagneticButton';
import SocialIcon from '../ui/SocialIcon';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useLang } from '../../i18n/LanguageContext';

/**
 * Closing invitation: a slow curved banner (React Bits <CurvedLoop>),
 * a large headline, then the three ways to reach Mohamed — WhatsApp,
 * phone and email — with WhatsApp as the primary action.
 */
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  const wide = useMediaQuery('(min-width: 768px)');
  const { t, ui, lang } = useLang();
  const mailto = `mailto:${profile.email}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = mailto;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-10 overflow-hidden pt-[clamp(4rem,10vw,8rem)]">
      <div className="text-mist/60" aria-hidden="true" dir="ltr">
        <CurvedLoop
          key={lang}
          marqueeText={ui.loop}
          separator="✦"
          separatorColor="#7189ff"
          speed={wide ? 1.2 : 0.8}
          curveAmount={wide ? 160 : 80}
          fontSize={wide ? 88 : 64}
          fontWeight={400}
          interactive={wide}
          edgeFade={0.12}
          className="font-[family-name:var(--font-display)] normal-case!"
        />
      </div>

      <div className="wrap mt-[clamp(2rem,6vw,5rem)] grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="label">{ui.contact}</p>
          <SplitText
            key={lang}
            tag="h2"
            text={t(profile.contactHeadline)}
            textAlign="start"
            splitType="words"
            mask
            delay={45}
            duration={1.2}
            ease="expo.out"
            from={{ yPercent: 110 }}
            to={{ yPercent: 0 }}
            threshold={0.2}
            rootMargin="0px"
            className="display contact-title mt-6 block max-w-[16ch] text-[clamp(2.75rem,7vw,7rem)] font-normal leading-[0.95]! text-ivory"
          />
          <p className="mt-8 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ivory/75">{t(profile.contactNote)}</p>
        </div>

        <div className="flex flex-col justify-end gap-9 lg:col-span-5">
          <div>
            <p className="label">{ui.writeToMe}</p>
            <div className="mt-2 flex items-center gap-3">
              <a
                href={mailto}
                dir="ltr"
                className="display min-w-0 text-[clamp(1.05rem,5.2vw,1.9rem)] lg:text-[clamp(1.3rem,1.9vw,2rem)] italic text-ivory underline decoration-ivory/25 decoration-1 underline-offset-[0.2em] [overflow-wrap:anywhere] transition-colors hover:text-electric hover:decoration-electric"
              >
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copy}
                aria-label={ui.copyEmail}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-electric hover:text-electric"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <p role="status" aria-live="polite" className="label mt-1 h-5">
              {copied ? ui.copied : ''}
            </p>
          </div>

          <div>
            <p className="label">{ui.callMe}</p>
            <a
              href={`tel:${profile.phoneIntl}`}
              dir="ltr"
              className="display mt-2 inline-block text-[clamp(1.6rem,2.4vw,2.4rem)] tabular-nums text-ivory transition-colors hover:text-electric"
            >
              {profile.phone}
            </a>
          </div>

          <MagneticButton
            href={profile.whatsapp}
            target="_blank"
            rel="noreferrer"
            icon={<ArrowUpRight size={18} className="rtl:-scale-x-100" />}
            cursor={ui.sayHello}
          >
            {ui.startProject}
          </MagneticButton>

          <ul className="hairline grid grid-cols-2 border-t">
            {socials.map(s => (
              <li key={s.icon} className="hairline border-b">
                <a
                  href={s.url}
                  target={s.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group flex min-h-14 items-center gap-3 py-3 text-ivory"
                >
                  <SocialIcon name={s.icon} size={16} className="text-mist transition-colors group-hover:text-electric" />
                  <span className="roll">
                    <span>{t(s.label)}</span>
                    <span aria-hidden="true">{t(s.label)}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
