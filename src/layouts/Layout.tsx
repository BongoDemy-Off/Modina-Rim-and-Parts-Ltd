import React, { useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MotionConfig } from 'motion/react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import BackToTop from '../components/BackToTop';

export default function Layout({ introActive = false }: { introActive?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  useLayoutEffect(() => {
    const header = root.current?.querySelector('header');
    if (!header) return;
    const measure = () => root.current?.style.setProperty('--public-header-height', `${header.getBoundingClientRect().height}px`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);
  return (
    <MotionConfig reducedMotion="user">
    <div ref={root} inert={introActive} className="public-site min-h-screen flex flex-col bg-modina-bg text-modina-text selection:bg-modina-red/20 selection:text-modina-heading">
      <a href="#public-main" className="public-skip-link" onClick={() => document.getElementById('public-main')?.focus({ preventScroll: true })}>{t('public_ui.skip_main')}</a>
      <Navbar />
      <main id="public-main" data-public-main tabIndex={-1} className="flex-grow public-anchor">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
      <BackToTop />
    </div>
    </MotionConfig>
  );
}
