/**
 * Resolves a path inside /public against Vite's base URL, so the
 * site works whether it is deployed at the domain root or a sub-path.
 *   asset('/images/foo.webp') -> '/images/foo.webp' (or './images/foo.webp')
 */
export const asset = path => {
  if (!path || /^(https?:)?\/\//.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
};
