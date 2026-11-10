import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { ui } from './ui';

/**
 * Bilingual support (Arabic / English).
 *
 * Content in src/data is written as { en: '…', ar: '…' }. Components call
 * t(value) to pick the current language; plain strings pass through as-is.
 * The <html> element gets the matching lang and dir, so the whole layout
 * mirrors for Arabic.
 */

const STORAGE_KEY = 'lang';
const LANGS = ['ar', 'en'];

const initialLang = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGS.includes(saved)) return saved;
  } catch {
    /* storage unavailable */
  }
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (LANGS.includes(fromUrl)) return fromUrl;
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'ar';
};

/**
 * In Arabic text, Latin runs that start or end with punctuation
 * (".NET", "C#", "ASP.NET Core") get reordered by the browser's
 * bidi algorithm ("NET.", "#C"). Wrapping every Latin run in a
 * left-to-right isolate (U+2066 … U+2069) keeps them intact.
 */
const WORD = String.raw`\.?[A-Za-z0-9](?:[A-Za-z0-9.#+\-]*[A-Za-z0-9#+])?`;
const LATIN_RUN = new RegExp(`${WORD}(?:\\s+${WORD})*`, 'g');
export const isolateLatin = str =>
  /[A-Za-z]/.test(str) ? str.replace(LATIN_RUN, m => (/[A-Za-z]/.test(m) ? `\u2066${m}\u2069` : m)) : str;

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable */
    }
  }, [lang, dir]);

  const t = useCallback(
    value => {
      if (value == null) return '';
      if (typeof value === 'object' && !Array.isArray(value) && ('en' in value || 'ar' in value)) {
        const out = value[lang] ?? value.en ?? value.ar;
        return lang === 'ar' && typeof out === 'string' ? isolateLatin(out) : out;
      }
      return value;
    },
    [lang]
  );

  const value = useMemo(
    () => ({ lang, dir, isRTL: dir === 'rtl', t, ui: ui[lang], setLang: setLangState }),
    [lang, dir, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);
