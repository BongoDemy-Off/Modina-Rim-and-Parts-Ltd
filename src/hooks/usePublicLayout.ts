import { useLayoutEffect, useRef } from 'react';

/** Measure public sticky chrome after fonts, wrapping and viewport changes. */
export function usePublicToolbar<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const toolbar = ref.current;
    const page = toolbar?.closest<HTMLElement>('.public-page');
    if (!toolbar || !page) return;
    const measure = () => page.style.setProperty('--public-toolbar-height', `${toolbar.getBoundingClientRect().height}px`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(toolbar);
    return () => { observer.disconnect(); page.style.removeProperty('--public-toolbar-height'); };
  }, []);
  return ref;
}

export function scrollToPublicTarget(id: string, focus = false) {
  const target = document.getElementById(id);
  target?.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  if (focus) target?.focus({ preventScroll: true });
}
