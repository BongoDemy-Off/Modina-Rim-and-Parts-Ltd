import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop
 * 1. Disables the browser's native scroll restoration so it doesn't
 *    remember and jump to a previous scroll position on page refresh.
 * 2. Scrolls to the top on initial mount (handles F5 / hard refresh).
 * 3. Scrolls to the top on every client-side route change.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  // Run once on mount: disable browser scroll restoration + handle refresh
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Run on every route change: handle in-app navigation
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
