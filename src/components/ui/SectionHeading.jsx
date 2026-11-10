import SplitText from '../reactbits/SplitText';
import { useLang } from '../../i18n/LanguageContext';

/**
 * Section opener: a short label on a hairline, then a large display
 * heading revealed piece by piece (React Bits <SplitText>). Arabic is
 * split by words so the letters stay connected.
 */
export default function SectionHeading({ label, title, aside, className = '', as = 'h2' }) {
  const { lang } = useLang();
  const ar = lang === 'ar';
  return (
    <header className={`wrap ${className}`}>
      <div className="hairline flex items-baseline justify-between gap-6 border-t pt-4">
        <p className="label">{label}</p>
        {aside && <p className="label text-end">{aside}</p>}
      </div>
      <SplitText
        key={`${lang}-${title}`}
        tag={as}
        text={title}
        textAlign="start"
        splitType={ar ? 'words' : 'chars'}
        mask
        delay={ar ? 90 : 22}
        duration={1.1}
        ease="expo.out"
        from={{ yPercent: 110 }}
        to={{ yPercent: 0 }}
        threshold={0.2}
        rootMargin="0px"
        className="display mt-8 block text-[clamp(3.25rem,10vw,10rem)] font-normal text-ivory"
      />
    </header>
  );
}
