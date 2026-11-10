/**
 * PERSONAL INFORMATION — every text field is { en, ar }.
 * Edit here and the whole site (and the résumé page) updates.
 * Images live in /public/images/profile/.
 */

export const profile = {
  firstName: { en: 'Mohamed', ar: 'محمد' },
  lastName: { en: 'Atif', ar: 'عاطف' },
  fullName: { en: 'Mohamed Atif', ar: 'محمد عاطف' },

  title: {
    en: 'Web developer & .NET backend engineer',
    ar: 'مطوّر ويب ومهندس باك إند .NET',
  },

  intro: {
    en: 'I build fast, bilingual websites and the .NET backends that run them — from online stores to CRM systems — and I use AI-assisted “vibe coding” to ship sooner without cutting corners.',
    ar: 'أبني مواقع سريعة بالعربية والإنجليزية، والأنظمة الخلفية التي تشغّلها بتقنية .NET — من المتاجر الإلكترونية إلى أنظمة إدارة العملاء — وأستخدم البرمجة بمساعدة الذكاء الاصطناعي لأسلّم أسرع دون التنازل عن الجودة.',
  },

  location: { en: 'Mansoura, Egypt', ar: 'المنصورة، مصر' },
  locationFull: { en: 'Mansoura, Dakahlia, Egypt', ar: 'المنصورة، الدقهلية، مصر' },
  timezone: 'Africa/Cairo',

  portrait: {
    src: '/images/profile/portrait.webp',
    alt: { en: 'Mohamed Atif in a black suit, holding a bound project report', ar: 'محمد عاطف ببدلة سوداء يحمل مشروع تخرجه' },
  },

  about: {
    photo: {
      src: '/images/profile/about.webp',
      alt: { en: 'Selfie of Mohamed Atif in front of sunlit mountains', ar: 'صورة سيلفي لمحمد عاطف أمام جبال تضيئها الشمس' },
      caption: { en: 'Away from the screen, for a change.', ar: 'بعيدًا عن الشاشة، للتغيير.' },
    },
    statement: {
      en: 'Good software feels simple on the surface. I take care of the hard part underneath — clean APIs, well-structured data and pages that load fast — so the people using it never have to think about it.',
      ar: 'البرمجيات الجيدة تبدو بسيطة من الخارج. أنا أتولى الجزء الصعب في الداخل — واجهات برمجية نظيفة، وبيانات منظّمة، وصفحات سريعة — حتى لا يضطر المستخدم للتفكير فيها أبدًا.',
    },
    bio: [
      {
        en: 'I’m Mohamed Atif, a web developer from Mansoura, Egypt. I work across the whole project: C# and ASP.NET Core on the backend, and modern HTML, CSS and JavaScript on the front.',
        ar: 'أنا محمد عاطف، مطوّر ويب من المنصورة. أعمل على المشروع من أوله لآخره: C# وASP.NET Core في الباك إند، وHTML وCSS وJavaScript الحديثة في الواجهات.',
      },
      {
        en: 'I’ve built websites, online stores and a custom CRM for clients in Saudi Arabia, the UAE and beyond — most of them Arabic-first and fully bilingual. I use AI-assisted development to move fast, and I review every line before it ships.',
        ar: 'نفّذت مواقع ومتاجر إلكترونية ونظام CRM مخصّصًا لعملاء في السعودية والإمارات وغيرهما، ومعظمها بالعربية أولًا ومع دعم كامل للغتين. أعتمد على التطوير بمساعدة الذكاء الاصطناعي لأنجز بسرعة، وأراجع كل سطر قبل التسليم.',
      },
    ],
    interests: [
      { en: '.NET backend architecture', ar: 'هندسة الأنظمة الخلفية بـ .NET' },
      { en: 'Arabic-first (RTL) interfaces', ar: 'واجهات عربية من اليمين لليسار' },
      { en: 'AI-assisted development', ar: 'التطوير بمساعدة الذكاء الاصطناعي' },
      { en: 'Speed & SEO', ar: 'السرعة وتحسين الظهور في البحث' },
    ],
    approach: [
      {
        title: { en: 'Business first', ar: 'الهدف قبل الكود' },
        text: {
          en: 'Before writing code I learn what the site has to achieve: more leads, more sales, or smoother operations.',
          ar: 'قبل أي سطر كود أفهم ما يجب أن يحققه الموقع: عملاء أكثر، مبيعات أكثر، أو تشغيل أسهل.',
        },
      },
      {
        title: { en: 'A backend that holds up', ar: 'باك إند متين' },
        text: {
          en: 'Clear APIs, sensible data models and secure authentication, built with ASP.NET Core.',
          ar: 'واجهات برمجية واضحة، ونماذج بيانات منطقية، وتسجيل دخول آمن، مبنية بـ ASP.NET Core.',
        },
      },
      {
        title: { en: 'Ship fast, check twice', ar: 'تسليم سريع ومراجعة دقيقة' },
        text: {
          en: 'AI speeds up the build; testing and code review keep it reliable after launch.',
          ar: 'الذكاء الاصطناعي يسرّع البناء، والاختبار ومراجعة الكود يضمنان استقراره بعد الإطلاق.',
        },
      },
    ],
    details: [
      { label: { en: 'Based in', ar: 'مقيم في' }, value: { en: 'Mansoura, Dakahlia', ar: 'المنصورة، الدقهلية' } },
      { label: { en: 'Focus', ar: 'التخصص' }, value: { en: '.NET backend & web', ar: 'باك إند .NET وتطوير الويب' } },
      { label: { en: 'Languages', ar: 'اللغات' }, value: { en: 'Arabic, English', ar: 'العربية، الإنجليزية' } },
      { label: { en: 'Work', ar: 'العمل' }, value: { en: 'Freelance & remote', ar: 'عمل حر وعن بُعد' } },
    ],
  },

  // Contact
  email: 'mohamedatif499@gmail.com',
  phone: '01093185485', // as shown on the site
  phoneIntl: '+201093185485', // used for tel: and WhatsApp links
  whatsapp: 'https://wa.me/201093185485',

  contactHeadline: {
    en: 'Have a project in mind? Let’s build it together.',
    ar: 'عندك فكرة مشروع؟ لنبنِها معًا.',
  },
  contactNote: {
    en: 'Websites, online stores, dashboards and custom systems. Tell me what you need on WhatsApp or by email.',
    ar: 'مواقع، متاجر إلكترونية، لوحات تحكم وأنظمة مخصّصة. أخبرني بما تحتاجه على واتساب أو عبر البريد.',
  },

  spokenLanguages: [
    { name: { en: 'Arabic', ar: 'العربية' }, level: { en: 'Native', ar: 'اللغة الأم' } },
    { name: { en: 'English', ar: 'الإنجليزية' }, level: { en: 'Professional working', ar: 'مستوى عمل احترافي' } },
  ],
};

/** SEO defaults, per language. */
export const site = {
  title: {
    en: 'Mohamed Atif — Web developer & .NET backend engineer',
    ar: 'محمد عاطف — مطوّر ويب ومهندس باك إند .NET',
  },
  description: profile.intro,
  url: '', // TODO — your domain once deployed, e.g. 'https://mohamedatif.dev' (shown on the résumé)
};
