/**
 * IMAGE LIBRARY — every stock visual on the site lives here.
 * ---------------------------------------------------------------
 * Temporary, professionally selected photos from Unsplash (free under
 * the Unsplash License — https://unsplash.com/license). They are served
 * from Unsplash's CDN, which is what Unsplash asks for, and resized on
 * the fly (`w=` / `fm=webp`) so each device downloads only what it needs.
 *
 * Each entry has a local `fallback` that shows if the CDN is unreachable,
 * so an image slot is never empty.
 *
 * To use your own image instead: replace an entry with a local path,
 * e.g. hero: '/images/my-hero.webp' — every component accepts either.
 */

const u = (id, page, author, width, height, alt, fallback) => ({
  provider: 'unsplash',
  id,
  page: `https://unsplash.com/photos/${page}`,
  author,
  width,
  height,
  alt,
  fallback,
});

export const images = {
  // Hero — layered navy ridges in morning mist (the "living photograph").
  hero: u('photo-1444927714506-8492d94b4e3d', 'mountain-dew-during-sunrise-xJ2tjuUHD9M', 'Paul Earle', 1600, 1060,
    { en: 'Layers of blue mountain ridges in morning mist', ar: 'طبقات من سلاسل جبلية زرقاء في ضباب الصباح' },
    '/images/hero-fallback.webp'),

  // Project visuals (temporary until real screenshots are added)
  crmCover: u('photo-1590212151175-e58edd96185b', 'black-flat-screen-tv-turned-off-lVuV7AcfOrY', 'Fernando Hernandez', 1600, 1067,
    { en: 'A dark, minimal desk with a single monitor', ar: 'مكتب داكن بسيط عليه شاشة واحدة' }, '/images/projects/ghamer-crm.webp'),
  crm1: u('photo-1617040619263-41c5a9ca7521', 'text-Gll-v69L8iA', 'Artur Shamsutdinov', 1600, 1067,
    { en: 'Code on a dark screen', ar: 'كود على شاشة داكنة' }, '/images/projects/ghamer-crm.webp'),
  crm2: u('photo-1561754825-6f9d7b82322d', 'flat-screen-tv-turned-on-near-keyboard-multimedia-speaker-and-ceramic-mug-on-table-_cX76xaZB5A', 'Ruijia Wang', 1600, 630,
    { en: 'A workstation with monitor, keyboard and mug', ar: 'مكان عمل بشاشة ولوحة مفاتيح وكوب' }, '/images/projects/ghamer-crm.webp'),

  // Real project showcase (local file)
  a2zCover: '/images/projects/a2z-business.webp',
  a2z1: u('photo-1601103968879-cf90fc279c14', 'blue-and-white-concrete-building-5jHfHYHB_6s', 'Glen Ardi', 1600, 2851,
    { en: 'Blue and white modern facade', ar: 'واجهة حديثة باللونين الأزرق والأبيض' }, '/images/projects/a2z-business.webp'),
  a2z2: u('photo-1506625361699-f5757171b16a', 'building-during-night-Vu05z1AUPyU', 'Casper Bijmans', 1600, 1067,
    { en: 'A curved building lit in blue at night', ar: 'مبنى منحني مضاء بالأزرق ليلًا' }, '/images/projects/a2z-business.webp'),

  bbCover: u('photo-1675956649101-34ee77d39c8e', 'a-white-tea-pot-with-a-black-background-0RBVf2Mvwwo', 'Hardik Monga', 1600, 2133,
    { en: 'A white ceramic object against black', ar: 'قطعة خزفية بيضاء على خلفية سوداء' }, '/images/projects/bearbrick-ae.webp'),
  bb1: u('photo-1755375551130-cf278d391d99', 'a-single-grey-stone-rests-on-a-textured-surface-n_0gDsWetzo', 'Anya Chernykh', 1600, 2400,
    { en: 'A single grey stone on a textured surface', ar: 'حجر رمادي واحد على سطح محبب' }, '/images/projects/bearbrick-ae.webp'),
  bb2: u('photo-1769708984146-11ca9c436685', 'a-small-sphere-resting-between-two-curved-surfaces-CRxVQyw-180', 'Christian Boragine', 1600, 900,
    { en: 'A small sphere between two curved surfaces', ar: 'كرة صغيرة بين سطحين منحنيين' }, '/images/projects/bearbrick-ae.webp'),

  sakCover: u('photo-1601629736795-3da639aa9f23', 'black-and-white-spiral-staircase-VU8HxMAP79U', 'Nicolas Hoizey', 1600, 1600,
    { en: 'A spiral staircase seen from above', ar: 'درج حلزوني من الأعلى' }, '/images/projects/sakansa.webp'),
  sak1: u('photo-1724582586529-62622e50c0b3', 'a-modern-living-room-with-a-large-window-vIbxvHj9m9g', 'Prydumano Design', 1600, 1000,
    { en: 'A modern living room with a large window', ar: 'غرفة معيشة حديثة بنافذة كبيرة' }, '/images/projects/sakansa.webp'),
  sak2: u('photo-1508174516034-a466529afd78', 'white-concrete-pillar-stand-building-under-night-sky-IkiQcIEFObg', 'Asya', 1600, 1067,
    { en: 'Stone columns under a night sky', ar: 'أعمدة حجرية تحت سماء الليل' }, '/images/projects/sakansa.webp'),

  lilCover: u('photo-1638303322580-5e6aacd59c0d', 'a-white-vase-sitting-on-top-of-a-table-uluH5a0sRdw', 'Mary Skrynnikova', 1600, 2133,
    { en: 'White vases in soft warm light', ar: 'مزهريات بيضاء في ضوء دافئ ناعم' }, '/images/projects/lilies-co.webp'),
  lil1: u('photo-1572450775448-4af18fd45a0d', 'red-rose-flower-in-vase-NzDZtmYWdEk', 'Zoltan Tasi', 1600, 2309,
    { en: 'A single rose in a vase', ar: 'وردة واحدة في مزهرية' }, '/images/projects/lilies-co.webp'),
  lil2: u('photo-1633944810218-b16da87bb0a9', 'a-close-up-of-a-fruit-on-a-black-background-hnpXMibeMac', 'Annie Spratt', 1600, 2400,
    { en: 'A still life on a black background', ar: 'طبيعة صامتة على خلفية سوداء' }, '/images/projects/lilies-co.webp'),

  motCover: u('photo-1693648793394-0b76b7eb042e', 'an-abstract-black-background-with-wavy-lines-5mhH4db_79I', 'Pawel Czerwinski', 1600, 1067,
    { en: 'Abstract dark waves of light', ar: 'موجات ضوء داكنة مجردة' }, '/images/projects/motaqsa.webp'),
  mot1: u('photo-1561077783-5f8e0e196fa2', 'city-buildings-at-nighttime-eJ2h8HGfo_M', 'Tatiana Rodriguez', 1600, 1094,
    { en: 'City buildings at night', ar: 'مبانٍ في المدينة ليلًا' }, '/images/projects/motaqsa.webp'),
  mot2: u('photo-1554110397-9bac083977c6', 'desert-at-night-a2kD4b0KK4s', 'Mike Iukhtenko', 1600, 1067,
    { en: 'Desert dunes at blue hour', ar: 'كثبان صحراوية في الساعة الزرقاء' }, '/images/projects/motaqsa.webp'),
};

// Gallery (temporary photographs — credited on every plate)
export const galleryImages = [
  u('photo-1548679847-1d4ff48016c7', 'aerial-photography-of-mountains-k6GpdsPJSZw', 'Fabrizio Conti', 1600, 1067,
    { en: 'Mountains above a sea of clouds', ar: 'جبال فوق بحر من السحب' }, '/images/gallery/photo-02.webp'),
  u('photo-1568405336404-1fefdca58699', 'mountain-photography-KCEwOduK8ck', 'David Billings', 1600, 2400,
    { en: 'Desert under a starry sky', ar: 'صحراء تحت سماء مليئة بالنجوم' }, '/images/gallery/photo-01.webp'),
  u('photo-1612934184079-86073385e4d9', 'grayscale-photo-of-rocky-shore-7uoepDVEdPI', 'Teng Yuhong', 1600, 1600,
    { en: 'Black and white rocky shore', ar: 'شاطئ صخري بالأبيض والأسود' }, '/images/gallery/photo-03.webp'),
  u('photo-1545243424-0ce743321e11', 'shooting-star-over-desert-dunes-MljwsnGwdOY', 'Massimiliano Morosinotto', 1600, 2400,
    { en: 'A shooting star over desert dunes', ar: 'شهاب فوق الكثبان الرملية' }, '/images/gallery/photo-04.webp'),
  u('photo-1477346611705-65d1883cee1e', 'aerial-photo-of-brown-moutains-JgOeRuGD_Y4', 'John Towner', 1600, 1067,
    { en: 'Mountain ridges at dusk', ar: 'قمم جبلية عند الغسق' }, '/images/gallery/photo-05.webp'),
  u('photo-1558908746-e040eae242b0', 'spiral-ladder-photography-zaM9LhySx_0', 'Rémy Penet', 1600, 2133,
    { en: 'Looking up a spiral staircase', ar: 'النظر لأعلى درج حلزوني' }, '/images/gallery/photo-06.webp'),
  u('photo-1699481280234-4671f02a2e7c', 'a-large-body-of-water-with-a-sky-background-Eos_Lznn8KM', 'Matt Bct', 1600, 1067,
    { en: 'Open sea under a blue sky', ar: 'بحر مفتوح تحت سماء زرقاء' }, '/images/gallery/photo-07.webp'),
  u('photo-1687343220172-f3f53eafad71', 'a-body-of-water-with-a-bridge-in-the-background-Sls-uMty3Cw', 'Kira Laktionov', 1600, 2409,
    { en: 'A bridge over water at night', ar: 'جسر فوق الماء ليلًا' }, '/images/gallery/photo-08.webp'),
  u('photo-1722906777312-2bc56e4cbf82', 'a-blurry-photo-of-a-house-at-night-LqDjvsYPP_0', 'ran liwen', 1600, 1068,
    { en: 'A house at night, softly out of focus', ar: 'منزل ليلًا بتركيز ناعم' }, '/images/gallery/photo-09.webp'),
  u('photo-1704135399144-0def03131a3a', 'a-long-brick-tunnel-with-lights-at-the-end-34eWshKIJ0E', 'Sylvester Sabo', 1600, 1067,
    { en: 'A long lit tunnel', ar: 'نفق طويل مضاء' }, '/images/gallery/photo-10.webp'),
];

const WIDTHS = [480, 800, 1200, 1600, 2200];

/** Builds src/srcSet for an image entry, or passes a local path through. */
export function imageSources(img, { maxWidth = 1600 } = {}) {
  if (!img) return {};
  if (typeof img === 'string') return { src: img };
  if (img.provider === 'unsplash') {
    const base = `https://images.unsplash.com/${img.id}?auto=format&fit=crop&q=72`;
    const widths = WIDTHS.filter(w => w <= Math.max(maxWidth, 480));
    return {
      src: `${base}&w=${Math.min(maxWidth, 1600)}`,
      srcSet: widths.map(w => `${base}&w=${w} ${w}w`).join(', '),
      width: img.width,
      height: img.height,
    };
  }
  return { src: img.src };
}
