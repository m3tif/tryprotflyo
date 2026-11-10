import { galleryImages } from './images';

/**
 * GALLERY — temporary photographs from Unsplash, each credited on its
 * plate. Replace with your own: { image: '/images/gallery/my-photo.webp',
 * width, height, title, place, year, span } (local paths work too).
 * `span`: 'portrait' | 'landscape' | 'square' | 'feature' (full width).
 */

const titles = [
  { en: 'Above the clouds', ar: 'فوق السحاب' },
  { en: 'Night desert', ar: 'صحراء الليل' },
  { en: 'Shoreline', ar: 'الشاطئ' },
  { en: 'Falling star', ar: 'شهاب' },
  { en: 'Ridges at dusk', ar: 'قمم عند الغسق' },
  { en: 'Spiral', ar: 'دوامة' },
  { en: 'Open water', ar: 'مياه مفتوحة' },
  { en: 'Bridge at night', ar: 'جسر في الليل' },
  { en: 'Blue hour', ar: 'الساعة الزرقاء' },
  { en: 'Tunnel', ar: 'النفق' },
];

const spanFor = (img, i) => (i === 4 ? 'feature' : img.height > img.width * 1.1 ? 'portrait' : img.width > img.height * 1.1 ? 'landscape' : 'square');

export const photos = galleryImages.map((image, i) => ({
  image,
  width: image.width,
  height: image.height,
  span: spanFor(image, i),
  title: titles[i],
  alt: image.alt,
}));
