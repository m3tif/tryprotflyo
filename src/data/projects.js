/**
 * PROJECTS — text fields are { en, ar }.
 * ---------------------------------------------------------------
 * `slug` becomes the URL (/work/<slug>). Empty fields are hidden:
 * leave `year`, `sourceUrl`, `liveUrl`, `overview`… as '' or null
 * and that part simply doesn't render.
 *
 * `cover` and `gallery` use temporary visuals from data/images.js. Swap in
 * real screenshots with a local path, e.g. cover: '/images/projects/crm.webp'.
 *
 * TODO (Mohamed): add the year for each project, and confirm the
 * descriptions marked CONFIRM — those sites couldn't be read online.
 */

import { images } from './images';

export const projects = [
  {
    slug: 'ghamer-crm',
    title: { en: 'Ghamer CRM', ar: 'نظام غامر CRM' },
    category: { en: 'CRM system', ar: 'نظام إدارة عملاء' },
    year: '',
    // CONFIRM — add the real modules (leads, deals, invoices…) and stack.
    description: {
      en: 'A custom customer-relationship management system for keeping clients, follow-ups and sales activity in one place.',
      ar: 'نظام مخصّص لإدارة علاقات العملاء، يجمع بيانات العملاء والمتابعات ونشاط المبيعات في مكان واحد.',
    },
    tech: ['ASP.NET Core', 'C#', 'SQL Server'],
    liveUrl: '',
    sourceUrl: '',
    private: true,
    cover: images.crmCover,
    layout: 'wide',
    role: { en: 'Backend & full-stack development', ar: 'تطوير الباك إند والنظام كاملًا' },
    // CONFIRM — a short paragraph on what the system does for Ghamer.
    overview: '',
    challenge: '',
    outcome: '',
    gallery: [images.crm1, images.crm2],
  },
  {
    slug: 'a2z-business',
    title: { en: 'A2Z Business', ar: 'A2Z Business' },
    category: { en: 'Corporate website', ar: 'موقع شركة' },
    year: '',
    description: {
      en: 'Bilingual website for a Saudi business and legal consultancy: 20 service pages, pricing, a blog and a free-consultation request.',
      ar: 'موقع ثنائي اللغة لشركة استشارات قانونية وإدارية في السعودية: 20 صفحة خدمة، وأسعار، ومدونة، وطلب استشارة مجانية.',
    },
    tech: ['HTML', 'CSS', 'JavaScript', 'SEO'],
    liveUrl: 'https://www.a-zbusiness.com/ar',
    sourceUrl: '',
    cover: images.a2zCover,
    layout: 'tall',
    role: { en: 'Web development', ar: 'تطوير الموقع' },
    overview: {
      en: 'A2Z Business helps founders and investors set up and run companies in Saudi Arabia, with offices in Saudi Arabia, Bahrain and Egypt. The site presents its full catalogue of services — from company formation to licences, visas and consulting — in Arabic first, with a complete English version.',
      ar: 'تساعد A2Z Business روّاد الأعمال والمستثمرين على تأسيس الشركات وإدارتها في السعودية، ولها مكاتب في السعودية والبحرين ومصر. يعرض الموقع كتالوج خدماتها كاملًا — من تأسيس الشركات إلى التراخيص والتأشيرات والاستشارات — بالعربية أولًا مع نسخة إنجليزية كاملة.',
    },
    challenge: {
      en: 'Twenty services had to stay easy to browse in two languages and two reading directions, with a clear path to contact on every page.',
      ar: 'عشرون خدمة يجب أن تبقى سهلة التصفح بلغتين واتجاهين للقراءة، مع طريق واضح للتواصل من كل صفحة.',
    },
    outcome: '',
    gallery: [images.a2z1, images.a2z2],
  },
  {
    slug: 'bearbrick-ae',
    title: { en: 'Bearbrick AE', ar: 'Bearbrick AE' },
    category: { en: 'Online store', ar: 'متجر إلكتروني' },
    year: '',
    description: {
      en: 'An Arabic–English online store in the UAE for collectible Bearbrick figures, with collections, cart and WhatsApp contact.',
      ar: 'متجر إلكتروني بالعربية والإنجليزية في الإمارات لمجسّمات Bearbrick القابلة للاقتناء، مع تصنيفات وسلة شراء وتواصل عبر واتساب.',
    },
    tech: ['Shopify', 'Liquid', 'JavaScript'],
    liveUrl: 'https://bearbrickae.com/',
    sourceUrl: '',
    cover: images.bbCover,
    layout: 'offset',
    role: { en: 'Store development', ar: 'تطوير المتجر' },
    overview: {
      en: 'Bearbrick AE sells designer collectible figures to buyers across the UAE. The store is bilingual, priced in dirhams, and built around browsing collections, adding to cart and reaching the team quickly on WhatsApp.',
      ar: 'يبيع Bearbrick AE مجسّمات فنية للمقتنين في الإمارات. المتجر بلغتين، والأسعار بالدرهم، ومصمّم لتصفح التشكيلات والإضافة للسلة والتواصل السريع مع الفريق عبر واتساب.',
    },
    challenge: '',
    outcome: '',
    gallery: [images.bb1, images.bb2],
  },
  {
    slug: 'sakansa',
    title: { en: 'Sakansa', ar: 'Sakansa' },
    category: { en: 'Website', ar: 'موقع إلكتروني' }, // CONFIRM
    year: '',
    description: {
      // CONFIRM — one line on what Sakansa is and what you built.
      en: 'Website design and development for Sakansa.',
      ar: 'تصميم وتطوير موقع Sakansa.',
    },
    tech: [],
    liveUrl: 'https://sakansa.com/',
    sourceUrl: '',
    cover: images.sakCover,
    layout: 'tall',
    role: { en: 'Web development', ar: 'تطوير الموقع' },
    overview: '',
    challenge: '',
    outcome: '',
    gallery: [images.sak1, images.sak2],
  },
  {
    slug: 'lilies-co',
    title: { en: 'Lilies Co', ar: 'Lilies Co' },
    category: { en: 'Website', ar: 'موقع إلكتروني' }, // CONFIRM
    year: '',
    description: {
      // CONFIRM
      en: 'Website design and development for Lilies Co.',
      ar: 'تصميم وتطوير موقع Lilies Co.',
    },
    tech: [],
    liveUrl: 'https://lilies-co.com/',
    sourceUrl: '',
    cover: images.lilCover,
    layout: 'wide',
    role: { en: 'Web development', ar: 'تطوير الموقع' },
    overview: '',
    challenge: '',
    outcome: '',
    gallery: [images.lil1, images.lil2],
  },
  {
    slug: 'motaqsa',
    title: { en: 'Motaqsa', ar: 'Motaqsa' },
    category: { en: 'Website', ar: 'موقع إلكتروني' }, // CONFIRM
    year: '',
    description: {
      // CONFIRM
      en: 'Website design and development for Motaqsa.',
      ar: 'تصميم وتطوير موقع Motaqsa.',
    },
    tech: [],
    liveUrl: 'https://motaqsa.com/',
    sourceUrl: '',
    cover: images.motCover,
    layout: 'offset',
    role: { en: 'Web development', ar: 'تطوير الموقع' },
    overview: '',
    challenge: '',
    outcome: '',
    gallery: [images.mot1, images.mot2],
  },
];

export const getProject = slug => projects.find(p => p.slug === slug);
