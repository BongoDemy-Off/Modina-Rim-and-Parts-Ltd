import PublicScroller from '../components/PublicScroller';
import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import PublicModal from '../components/PublicModal';
import { Link } from 'react-router-dom';
import { ChevronRight, X, ZoomIn } from 'lucide-react';

import { type GalleryItem, galleryItems } from '../lib/data';

const categories = ['All', 'Facility', 'Machinery', 'Production', 'Quality', 'Products', 'Materials', 'Workforce'];

export default function Gallery() {
  const letters = 'GALLERY'.split('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(g => g.category === activeCategory);

  return (
    <div className="min-h-screen bg-modina-bg text-modina-text pt-[112px] sm:pt-[72px] public-page">
      <Helmet>
        <title>Gallery | Modina Rim &amp; Parts Ltd. — Factory Tour</title>
        <meta name="description" content="Take a virtual tour of Modina Rim & Parts Ltd.'s ISO-certified manufacturing facility in Jashore, Bangladesh. View our factory floor, CNC machinery, quality labs, and finished products." />
        <link rel="canonical" href="https://www.modinarim.com/gallery" />
      </Helmet>

      {/* SECTION 1 — HERO */}
      <section className="w-full public-task-hero flex flex-col items-center text-center bg-modina-bg">
        <div className="text-modina-red text-xs font-bold tracking-widest uppercase flex items-center gap-2 justify-center mb-10 public-breadcrumb">
          <Link to="/" className="hover:text-modina-red transition-all duration-300 ease-in-out text-modina-muted">Home</Link>
          <ChevronRight className="w-2.5 h-2.5 text-modina-subtle" />
          <span className="text-modina-muted">Gallery</span>
        </div>

        <div className="w-24 h-[2px] bg-modina-red mx-auto mb-10" />

        <h1 className="font-display font-bold tracking-tight text-modina-heading uppercase leading-none flex items-center justify-center flex-wrap public-hero-title">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
          className="w-32 h-[1px] bg-modina-red mx-auto my-10"
        />

        <p className="text-modina-red text-xs font-bold tracking-widest uppercase flex items-center justify-center flex-wrap gap-2 public-meta">
          <span>Factory Tour</span>
          <span className="text-modina-red">·</span>
          <span>{galleryItems.length} Photos</span>
          <span className="text-modina-red">·</span>
          <span>Jashore, Bangladesh</span>
        </p>
      </section>

      {/* SECTION 2 — FILTER BAR */}
      <div className="public-sticky-toolbar sticky z-30 w-full bg-white/90 backdrop-blur-md border-t border-modina-border border-b shadow-design-sm">
        <div className="container mx-auto px-4 md:px-12 lg:px-24 h-14 flex items-center justify-between overflow-x-auto no-scrollbar">
          <div className="flex items-center h-full gap-0 shrink-0">
            {categories.map((cat, idx) => {
              const count = cat === 'All' ? galleryItems.length : galleryItems.filter(g => g.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <div key={cat} className="flex items-center h-full">
                  <button
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={isActive}
                    className={`public-filter relative px-5 h-14 text-xs font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-300 ease-in-out ${isActive ? 'text-modina-red' : 'text-modina-muted hover:text-modina-red'}`}
                  >
                    {cat} ({count})
                    {isActive && <motion.span layoutId="activeGalCat" className="absolute bottom-0 left-0 w-full h-[1px] bg-modina-red" />}
                  </button>
                  {idx < categories.length - 1 && <span className="w-[0.5px] h-5 bg-modina-divider shrink-0" />}
                </div>
              );
            })}
          </div>
          <span className="text-modina-subtle text-xs font-bold tracking-widest uppercase shrink-0 ml-8 hidden sm:block public-meta">
            — {filtered.length} Photos
          </span>
        </div>
      </div>

      {/* SECTION 3 — MASONRY GRID */}
      <section className="container-premium py-16 lg:py-24">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[260px] gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((item, idx) => (
              <motion.button
                key={item.id}
                type="button"
                aria-label={`View image: ${item.title}`}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.04 }}
                onClick={() => { setLightboxItem(item); setIsLightboxOpen(true); }}
                className={`group relative text-left overflow-hidden bg-modina-bg-alt cursor-pointer rounded-xl shadow-design-sm hover:shadow-design-hover transition-all duration-300 ease-in-out
                  ${item.span === 'wide' ? 'sm:col-span-2' : ''}
                  ${item.span === 'tall' ? 'row-span-2' : ''}
                `}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-[1000ms] ease-out scale-100 group-hover:scale-[1.04]"
                />
                {/* Gradient */}
                <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Zoom icon */}
                <span className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 ease-in-out">
                  <span className="w-8 h-8 border border-white/30 bg-white/20 backdrop-blur-sm flex items-center justify-center rounded">
                    <ZoomIn className="w-3.5 h-3.5 text-modina-red" />
                  </span>
                </span>

                {/* Category badge */}
                <span className="absolute top-4 left-4">
                  <span className="text-modina-red text-xs font-bold tracking-widest uppercase border border-modina-red/40 bg-white/80 px-2 py-1 backdrop-blur-sm rounded public-meta">
                    {item.category}
                  </span>
                </span>

                {/* Caption */}
                <span className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-300 ease-in-out">
                  <span className="block text-white/70 text-xs font-bold tracking-widest uppercase mb-1 public-meta">#{String(item.id).padStart(2, '0')}</span>
                  <span className="block font-display font-bold text-white text-base tracking-tight leading-tight">
                    {item.title}
                  </span>
                </span>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* LIGHTBOX */}
      <PublicModal open={isLightboxOpen} onRequestClose={() => setIsLightboxOpen(false)} labelledBy="gallery-lightbox-title" initialFocusRef={closeButton} exitDuration={0.3}>
        {lightboxItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
              data-public-backdrop
              className="fixed inset-0 bg-black/90 z-[9000] backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.94 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="public-dark fixed inset-0 z-[9001] flex flex-col items-center justify-center p-4 md:p-10 pointer-events-none"
            >
              <div className="public-lightbox-frame relative w-full max-w-4xl max-h-full pointer-events-auto">
                {/* Close button */}
                <button
                  type="button"
                  ref={closeButton}
                  onClick={() => setIsLightboxOpen(false)}
                  className="ml-auto mb-2 flex h-11 items-center gap-2 px-2 text-white text-xs font-bold tracking-widest uppercase hover:text-white/80 transition-all duration-300 ease-in-out z-10"
                >
                  Close <X className="w-3 h-3" />
                </button>

                {/* Image */}
                <img
                  src={lightboxItem.src.replace('/600/600', '/1200/800').replace('/600/800', '/900/1200').replace('/1200/600', '/1600/800')}
                  alt={lightboxItem.title}
                  className="w-full max-h-[calc(100dvh-12rem)] object-contain"
                  referrerPolicy="no-referrer"
                />

                {/* Caption */}
                <PublicScroller axis="block" labelledBy="gallery-lightbox-title" className="flex flex-wrap items-center justify-between gap-3 mt-4 border-t border-white/20 pt-4">
                  <div>
                    <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-1 public-meta">{lightboxItem.category}</p>
                    <p id="gallery-lightbox-title" className="font-display font-bold text-white text-lg tracking-tight">{lightboxItem.title}</p>
                  </div>
                  <p className="text-white/50 text-xs font-bold tracking-widest uppercase public-meta">
                    #{String(lightboxItem.id).padStart(2, '0')} / {String(galleryItems.length).padStart(2, '0')}
                  </p>
                </PublicScroller>
              </div>
            </motion.div>
          </>
        )}
      </PublicModal>

      {/* SECTION 4 — CTA */}
      <section className="w-full border-t border-modina-border public-section bg-modina-heading public-dark">
        <div className="container-premium flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 w-1 h-20 bg-modina-red" />
            <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4 public-meta">— Visit Us</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight public-section-title">
              See It For<br />Yourself
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact" className="btn-primary flex items-center gap-4">
              Contact Us
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/products" className="btn-secondary flex items-center gap-4">
              View Products
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
