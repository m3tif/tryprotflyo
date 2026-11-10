import { useEffect } from 'react';

/** Sets document.title and the meta description for the current page. */
export default function usePageTitle(title, description) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }, [title, description]);
}
