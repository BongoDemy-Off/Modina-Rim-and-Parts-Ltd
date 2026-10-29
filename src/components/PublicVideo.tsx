import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

/** Native controls retain the user's pause choice across visibility changes. */
export default function PublicVideo({ src, className, label }: { src: string; className?: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const automaticPause = useRef(false);
  const autoplayRejected = useRef(false);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let visible = false, disposed = false;
    const update = () => {
      if (reduceMotion || !visible || document.hidden) {
        if (!video.paused) { automaticPause.current = true; video.pause(); }
      } else if (!userPaused.current && !autoplayRejected.current && video.paused) {
        void video.play().catch(() => { if (!disposed) autoplayRejected.current = true; });
      }
    };
    const observer = new IntersectionObserver(entries => { visible = entries[0].intersectionRatio >= .2; update(); }, { threshold: .2 });
    observer.observe(video);
    document.addEventListener('visibilitychange', update);
    return () => { disposed = true; observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, [reduceMotion]);
  return <video ref={ref} src={src} controls muted playsInline loop preload="metadata" aria-label={label} className={className}
    onPlay={() => { userPaused.current = false; autoplayRejected.current = false; }}
    onPause={() => { if (automaticPause.current) automaticPause.current = false; else userPaused.current = true; }} />;
}
