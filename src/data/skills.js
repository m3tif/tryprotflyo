/**
 * SKILLS — each category becomes a tab in the Skills section and a
 * group on the résumé page. Skill names are kept in English (they are
 * product names); category names and notes are { en, ar }.
 * TODO (Mohamed): add or remove anything that isn't part of your stack.
 */

export const skillGroups = [
  {
    id: 'backend',
    name: { en: 'Backend (.NET)', ar: 'الباك إند (.NET)' },
    note: {
      en: 'APIs, data and business logic — the part users never see but always feel.',
      ar: 'الواجهات البرمجية والبيانات ومنطق العمل — الجزء الذي لا يراه المستخدم لكنه يشعر به دائمًا.',
    },
    skills: ['C#', 'ASP.NET Core', 'Web API', 'Entity Framework Core', 'SQL Server', 'LINQ', 'Authentication'],
  },
  {
    id: 'frontend',
    name: { en: 'Frontend development', ar: 'تطوير الواجهات' },
    note: {
      en: 'Responsive, bilingual interfaces that read as well in Arabic as in English.',
      ar: 'واجهات متجاوبة وثنائية اللغة، تُقرأ بالعربية بنفس جودة الإنجليزية.',
    },
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'RTL layouts', 'Responsive design'],
  },
  {
    id: 'ai',
    name: { en: 'Vibe coding & AI', ar: 'البرمجة بالذكاء الاصطناعي' },
    note: {
      en: 'Pairing with AI tools to prototype and build faster — with human review on every change.',
      ar: 'العمل مع أدوات الذكاء الاصطناعي للنمذجة والبناء بسرعة أكبر — مع مراجعة بشرية لكل تعديل.',
    },
    skills: ['AI pair programming', 'Prompt engineering', 'Rapid prototyping', 'Code review'],
  },
  {
    id: 'languages',
    name: { en: 'Programming languages', ar: 'لغات البرمجة' },
    note: {
      en: 'The languages I write every day.',
      ar: 'اللغات التي أكتب بها يوميًا.',
    },
    skills: ['C#', 'JavaScript', 'SQL', 'HTML', 'CSS'],
  },
  {
    id: 'tools',
    name: { en: 'Tools & platforms', ar: 'الأدوات والمنصات' },
    note: {
      en: 'What keeps projects moving from first commit to launch.',
      ar: 'ما يحرّك المشروع من أول سطر حتى الإطلاق.',
    },
    skills: ['Git', 'GitHub', 'Visual Studio', 'VS Code', 'Postman', 'Shopify', 'SEO'],
  },
];
