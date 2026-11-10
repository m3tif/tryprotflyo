import { useState } from 'react';
import { imageSources } from '../../data/images';
import { asset } from '../../lib/asset';
import { useLang } from '../../i18n/LanguageContext';

/**
 * Responsive image for both local paths and entries from data/images.js.
 * Remote images get a srcSet; if a remote image can't load, the local
 * fallback takes its place so the slot is never empty.
 */
export default function Img({ image, alt, sizes = '100vw', priority = false, maxWidth = 1600, className = '', ...rest }) {
  const { t } = useLang();
  const [failed, setFailed] = useState(false);
  const remote = image && typeof image === 'object';
  const { src, srcSet, width, height } = imageSources(image, { maxWidth });
  const fallback = remote ? image.fallback : null;
  const useFallback = failed && fallback;
  const altText = alt ?? (remote ? t(image.alt) : '');

  return (
    <img
      src={useFallback ? asset(fallback) : remote ? src : asset(src)}
      srcSet={useFallback ? undefined : srcSet}
      sizes={srcSet && !useFallback ? sizes : undefined}
      alt={altText}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      draggable={false}
      onError={() => !failed && fallback && setFailed(true)}
      className={className}
      {...rest}
    />
  );
}

/** "Photo: Name / Unsplash" credit line for a remote image. */
export function Credit({ image, className = '' }) {
  const { lang } = useLang();
  if (!image || typeof image !== 'object' || !image.author) return null;
  return (
    <a href={image.page} target="_blank" rel="noreferrer" className={`hover:text-electric ${className}`}>
      {lang === 'ar' ? 'تصوير:' : 'Photo:'} {image.author} / Unsplash
    </a>
  );
}
