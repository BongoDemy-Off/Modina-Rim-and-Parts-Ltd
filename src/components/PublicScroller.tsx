import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

/** Keep intentional inner scrollers keyboard reachable only while they overflow. */
export default function PublicScroller({ labelledBy, className = '', axis = 'inline', children }: { labelledBy: string; className?: string; axis?: 'inline' | 'block'; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [overflowing, setOverflowing] = useState(false);
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const measure = () => setOverflowing(axis === 'block' ? node.scrollHeight > node.clientHeight + 1 : node.scrollWidth > node.clientWidth + 1);
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    if (node.firstElementChild) observer.observe(node.firstElementChild);
    measure();
    return () => observer.disconnect();
  }, [axis]);
  return <div ref={ref} role={overflowing ? 'region' : undefined} aria-labelledby={overflowing ? labelledBy : undefined} tabIndex={overflowing ? 0 : undefined} className={`public-timeline-scroll ${className}`}>{children}</div>;
}
