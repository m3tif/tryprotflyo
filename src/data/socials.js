import { profile } from './profile';

/**
 * SOCIAL LINKS — entries with an empty `url` are hidden everywhere.
 * TODO (Mohamed): add your GitHub and LinkedIn profile URLs.
 * `icon` must match a key in components/ui/SocialIcon.jsx.
 */
const allSocials = [
  { label: { en: 'WhatsApp', ar: 'واتساب' }, icon: 'whatsapp', url: profile.whatsapp },
  { label: { en: 'GitHub', ar: 'GitHub' }, icon: 'github', url: '' },
  { label: { en: 'LinkedIn', ar: 'LinkedIn' }, icon: 'linkedin', url: '' },
  { label: { en: 'Email', ar: 'البريد' }, icon: 'mail', url: `mailto:${profile.email}` },
];

export const socials = allSocials.filter(s => s.url);

/** Main navigation (anchors on the home page). */
export const navLinks = [
  { label: { en: 'Work', ar: 'الأعمال' }, href: '#work' },
  { label: { en: 'About', ar: 'نبذة' }, href: '#about' },
  { label: { en: 'Skills', ar: 'المهارات' }, href: '#skills' },
  { label: { en: 'Journey', ar: 'الرحلة' }, href: '#journey' },
  { label: { en: 'Contact', ar: 'تواصل' }, href: '#contact' },
];
