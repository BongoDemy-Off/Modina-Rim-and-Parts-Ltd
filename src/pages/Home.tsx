import React, { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Settings, Award, Download, Quote, Bell, UserRound, Globe as GlobeIcon, Package, CalendarClock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PublicVideo from '../components/PublicVideo';
import facilityVideo from '@/assets/State of the Art Facility.webm';
import premiumRimsImg from '@/assets/Premium Rims.webp';
import wasarImg from '@/assets/wasar.webp';
import cngRimImg from '@/assets/CNG Rim.webp';
import bicycleRickshawImg from '@/assets/cat_motorcycle_parts.webp';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest) + suffix);

  useEffect(() => {
    if (inView) {
      if (reduceMotion) { count.set(target); return; }
      const controls = animate(count, target, { duration: 2.5, ease: [0.16, 1, 0.3, 1] });
      return controls.stop;
    }
  }, [inView, target, count, reduceMotion]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Home() {
  const { t } = useTranslation();
  
  // Hero Slider State
  const [activeHeroImage, setActiveHeroImage] = useState(0);
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const heroVisible = useInView(heroRef, { amount: .2 });
  const [paused, setPaused] = useState(!!reduceMotion);
  const [userPlay, setUserPlay] = useState(false);
  const rotationPointerState = useRef(paused);
  const [hovered, setHovered] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(!document.hidden);
  const rotating = !paused && (!reduceMotion || userPlay) && !hovered && heroVisible && documentVisible;
  useEffect(() => {
    const update = () => setDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  useEffect(() => { if (reduceMotion) { setPaused(true); setUserPlay(false); } }, [reduceMotion]);
  const heroSlides = [
    { image: '/hero_products.jpg', label: 'ALLOY WHEELS', category: 'CATEGORY 01' },
    { image: '/hero_rims.jpg', label: 'MOTORCYCLE RIMS', category: 'CATEGORY 02' },
    { image: '/hero_cng_parts.jpg', label: 'CNG AUTO PARTS', category: 'CATEGORY 03' },
    { image: '/hero_hardware.jpg', label: 'PRECISION HARDWARE', category: 'CATEGORY 04' },
    { image: '/hero_bicycle.jpg', label: 'BICYCLE & RICKSHAW', category: 'CATEGORY 05' },
  ];

  useEffect(() => {
    if (!rotating) return;
    const timer = setInterval(() => {
      setActiveHeroImage((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length, rotating]);

  const nextHeroImage = () => {
    setActiveHeroImage((prev) => (prev + 1) % heroSlides.length);
  };
  const prevHeroImage = () => {
    setActiveHeroImage((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    { quote: "Modina's premium rims have significantly reduced our warranty claims. Their precision engineering is unmatched in the region.", author: 'Md. Faruk Hossain', company: 'Global Auto Corp', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80' },
    { quote: 'A reliable partner for over 10 years. Their commitment to quality and timely delivery keeps our assembly lines moving.', author: 'Supply Chain Manager', company: 'Metro Vehicles Ltd.', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80' },
    { quote: 'The durability of their motorcycle components under extreme conditions is exactly what our customers demand.', author: 'Chief Engineer', company: 'Apex Motors', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80' }
  ];

  const nextTestimonial = () => setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="flex flex-col min-h-screen bg-white text-modina-text font-sans public-page public-home">
      <Helmet>
        <title>Modina Rim &amp; Parts Ltd. | Automotive Components Manufacturer — Bangladesh</title>
        <meta name="description" content="Modina Rim &amp; Parts Ltd. is an ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018 certified manufacturer of premium motorcycle rims, rickshaw rims, and automotive hardware in Jashore, Bangladesh." />
        <meta property="og:title" content="Modina Rim &amp; Parts Ltd. | Automotive Components Manufacturer" />
        <meta property="og:description" content="Triple ISO-certified manufacturer of 21+ premium automotive rim and parts products. Supplying domestic and export markets from Jashore, Bangladesh since 2010." />
        <meta property="og:image" content="/hero.jpg" />
        <meta property="og:url" content="https://www.modinarim.com/" />
        <link rel="canonical" href="https://www.modinarim.com/" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          'name': 'Modina Rim & Parts Ltd.',
          'description': 'ISO-certified manufacturer of automotive rims and parts in Bangladesh',
          'url': 'https://www.modinarim.com',
          'foundingDate': '2010',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Plot S1/A, BSCIC Industrial Area, Jhumjhumpur',
            'addressLocality': 'Jashore',
            'addressCountry': 'BD'
          },
          'contactPoint': {
            '@type': 'ContactPoint',
            'email': 'sales@modinarim.com',
            'telephone': '+880 1234 567890',
            'contactType': 'sales'
          }
        })}</script>
      </Helmet>

      {/* ═══════════════════════════════════════════════════
          1. HERO — Premium Engineering Showcase
      ═══════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[100dvh] w-full bg-white overflow-hidden">
        
        {/* Subtle diagonal red accent lines (inspired by the motion streaks) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-1/4 -right-1/4 w-[120%] h-[150%] opacity-[0.03]" style={{
            background: 'repeating-linear-gradient(135deg, transparent, transparent 120px, #E52525 120px, #E52525 121px)',
          }} />
          <div className="absolute top-0 right-0 w-[60%] h-full opacity-[0.02]" style={{
            background: 'radial-gradient(ellipse at 80% 50%, #E52525 0%, transparent 70%)',
          }} />
        </div>

        {/* Main Content Grid */}
        <div className="public-home-grid relative z-10 flex flex-col lg:flex-row min-h-[100dvh]">
          
          {/* LEFT — Text Content (45%) */}
          <div className="public-home-copy w-full lg:w-[45%] flex flex-col justify-center px-6 sm:px-16 xl:px-24 pt-[152px] sm:pt-[120px] pb-8 lg:pb-0 lg:py-0 shrink-0 min-h-[45vh] lg:min-h-[100dvh]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
              className="inline-flex flex-col items-start w-full sm:w-max lg:mt-[72px]"
            >
              {/* Hero Title — ENGINEERING / EXCELLENCE */}
              <motion.h1
                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
                className="font-display font-black text-modina-heading leading-[0.95] tracking-tight mb-7 -ml-[3px] w-full public-home-title"
                style={{ fontSize: 'clamp(40px, 12.5vw, 84px)' }}
              >
                <span className="block uppercase break-words sm:whitespace-nowrap text-left">{t('home.hero_title_1')}</span>
                <span className="block uppercase text-modina-red break-words sm:whitespace-nowrap text-left">{t('home.hero_title_2')}</span>
              </motion.h1>

              {/* Hero Body */}
              <motion.p
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
                className="text-modina-muted leading-relaxed mb-10 max-w-lg text-left whitespace-normal public-body"

              >
                Premium automotive components manufactured in Bangladesh. Trusted by industry leaders, Delivered nationwide.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
                className="flex flex-col sm:flex-row items-stretch gap-4 w-full max-w-lg"
              >
                <Link
                  to="/products"
                  className="btn-primary flex-1 px-7 py-3.5 bg-modina-red text-white text-sm font-bold uppercase tracking-[0.15em] rounded-md hover:bg-modina-red-dark transition-all duration-300 flex items-center justify-center gap-2.5 group shadow-[0_4px_16px_rgba(229,37,37,0.25)] hover:shadow-[0_8px_24px_rgba(229,37,37,0.35)] hover:-translate-y-0.5"
                >
                  Explore Catalog
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  to="/contact"
                  className="btn-secondary flex-1 px-7 py-3.5 bg-white border-2 border-modina-heading/15 text-modina-heading text-sm font-bold uppercase tracking-[0.15em] rounded-md hover:border-modina-red hover:text-modina-red transition-all duration-300 flex items-center justify-center gap-2.5 group"
                >
                  {t('common.contact_us')}
                  <UserRound className="w-4 h-4 text-modina-muted group-hover:text-modina-red transition-colors duration-300" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT — Product Showcase Slider (55%) */}
          <div role="region" aria-roledescription="carousel" aria-label={t('public_ui.hero_label')}
            onFocusCapture={e => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(true); }}
            onMouseEnter={() => { if (matchMedia('(hover: hover) and (pointer: fine)').matches) setHovered(true); }}
            onMouseLeave={() => setHovered(false)}
            className="public-home-showcase w-full lg:w-[55%] relative min-h-[45vh] lg:min-h-[100dvh] flex-grow overflow-hidden flex items-center justify-center">
            {/* Product Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeHeroImage}
                src={heroSlides[activeHeroImage].image}
                initial={reduceMotion ? false : { opacity: 0, scale: 1.04, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, x: -20 }}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                alt={heroSlides[activeHeroImage].label}
                className="w-[88%] h-auto max-h-[75%] object-contain drop-shadow-2xl"
              />
            </AnimatePresence>

            {/* Prev / Next Arrows */}
            <button
              onClick={prevHeroImage}
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-modina-heading/10 bg-white/80 backdrop-blur-sm flex items-center justify-center text-modina-heading hover:bg-modina-red hover:border-modina-red hover:text-white transition-all duration-300 shadow-[var(--shadow-sm)] z-20"
              aria-label="Previous product"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
            </button>
            <button
              onClick={nextHeroImage}
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-modina-heading/10 bg-white/80 backdrop-blur-sm flex items-center justify-center text-modina-heading hover:bg-modina-red hover:border-modina-red hover:text-white transition-all duration-300 shadow-[var(--shadow-sm)] z-20"
              aria-label="Next product"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2} />
            </button>

            {/* Slide Indicator Bar — "01  ALLOY WHEELS  01 ——— 05" */}
            <div className="public-home-controls absolute bottom-24 lg:bottom-28 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-5">
              <span className="text-modina-heading font-mono text-sm font-bold tracking-wider">
                {String(activeHeroImage + 1).padStart(2, '0')}
              </span>
              <span className="public-home-slide-label text-modina-heading font-display text-xs font-bold tracking-[0.2em] uppercase">
                {heroSlides[activeHeroImage].label}
              </span>
              <span className="text-modina-heading font-mono text-sm font-bold">
                {String(activeHeroImage + 1).padStart(2, '0')}
              </span>
              <div className="public-rotation-row">
              <button type="button" className="public-rotation-control" onPointerDown={() => { rotationPointerState.current = paused; }} onClick={e => { setPaused(!(e.detail ? rotationPointerState.current : paused)); setUserPlay(true); }}>{paused || (reduceMotion && !userPlay) ? t('public_ui.play_rotation') : t('public_ui.pause_rotation')}</button>
              </div>
              {/* Progress segments */}
              <div className="flex items-center gap-0">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setActiveHeroImage(idx);  }}
                    className="public-selector public-hero-selector" aria-pressed={idx === activeHeroImage}
                    aria-label={`Go to slide ${idx + 1}`}><span aria-hidden="true" className={`h-[3px] rounded-full transition-all duration-500 ${
                      idx === activeHeroImage
                        ? 'w-8 sm:w-12 bg-modina-red'
                        : idx < activeHeroImage
                          ? 'w-4 sm:w-6 bg-modina-heading/30'
                          : 'w-4 sm:w-6 bg-modina-heading/10'
                    }`} /></button>
                ))}
              </div>
              <span className="text-modina-heading font-mono text-sm font-bold tracking-wider">
                {String(heroSlides.length).padStart(2, '0')}
              </span>

              <p className="sr-only" aria-live={rotating ? 'off' : 'polite'} aria-atomic="true">{activeHeroImage + 1} / {heroSlides.length}: {heroSlides[activeHeroImage].label}</p>
            </div>
          </div>
        </div>

        {/* Trust Bar — Bottom Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 right-0 z-20 border-t border-modina-border bg-white shadow-design-md"
        >
          <div className="container-premium">
            <div className="flex items-center justify-start py-5 lg:justify-center lg:py-6 overflow-x-auto scrollbar-hide">
              {[
                { icon: ShieldCheck, value: 'ISO 9001:2015', label: 'CERTIFIED' },
                { icon: CalendarClock, value: '15+', label: 'YEARS EXPERIENCE' },
                { icon: Package, value: '21+', label: 'PRODUCTS' },
                { icon: GlobeIcon, value: 'DISTRIBUTING TO', label: 'ALL OVER THE COUNTRY' },
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center gap-3 shrink-0 px-6 sm:px-10 lg:px-14 border-l border-modina-divider first:border-l-0 first:pl-0 last:pr-0">
                  <div className="w-9 h-9 rounded-lg bg-modina-red/8 flex items-center justify-center shrink-0">
                    <stat.icon className="w-[18px] h-[18px] text-modina-red" strokeWidth={1.8} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-modina-heading font-display font-bold text-base tracking-tight leading-none">{stat.value}</span>
                    <span className="text-modina-muted text-xs font-bold tracking-[0.12em] uppercase mt-0.5 public-meta">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
          2. ABOUT TEASER — Two Column
      ═══════════════════════════════════════════════════ */}
      <section className="section-py bg-modina-bg-alt">
        <div className="container-premium">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
          >
            <div className="flex flex-col">
              <motion.p
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4 public-meta"
              >
                — About Modina Rim & Parts Ltd.
              </motion.p>
              <motion.h2
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }}
                className="font-display font-bold text-modina-heading mb-6 tracking-tight leading-tight [text-wrap:balance] public-section-title"

              >
                Forging the Backbone of <span className="text-modina-red">Modern Mobility</span>
              </motion.h2>
              <motion.p
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }}
                className="text-modina-muted leading-relaxed mb-8 public-body"

              >
                {t('home.about_body_1')}
              </motion.p>
              <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
                <Link to="/about" className="inline-flex items-center gap-3 text-modina-heading font-bold text-base underline underline-offset-4 hover:text-modina-red transition-colors duration-200 group">
                  {t('common.our_story')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-8 mt-14 border-t border-modina-border pt-10 sm:grid-cols-3 sm:gap-8">
                {[
                  { target: 20, suffix: '+', label: t('home.stats_years') },
                  { target: 300, suffix: '+', label: t('home.stats_clients') },
                  { target: 100, suffix: '+', label: t('home.stats_products') }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                    className="flex flex-col gap-1.5 items-start"
                  >
                    <span className="font-display font-bold text-modina-red" style={{ fontSize: 'clamp(32px, 3vw, 48px)' }}>
                      <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                    </span>
                    <span className="text-modina-muted text-sm font-semibold uppercase tracking-wider">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Video card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative h-[450px] lg:h-[580px] rounded-[12px] overflow-hidden shadow-[var(--shadow-lg)] border border-modina-border"
            >
              <PublicVideo src={facilityVideo} label="State of the Art Facility" className="w-full h-full object-cover" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/70 to-transparent" />
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="pointer-events-none absolute top-6 left-6 right-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-modina-red rounded-lg flex items-center justify-center shrink-0">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-display font-bold text-sm">Using modern technology</p>
                    <p className="text-white/70 text-xs mt-0.5 public-body">ISO 9001:2015 Certified</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          3. PRODUCT CATEGORIES GRID
      ═══════════════════════════════════════════════════ */}
      <section className="section-py bg-white border-t border-modina-divider">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="container-premium"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <motion.p
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="text-modina-red text-xs font-bold tracking-widest uppercase mb-3 public-meta"
              >
                — Products
              </motion.p>
              <motion.h2
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="font-display font-bold text-modina-heading mb-3 tracking-tight public-section-title"

              >
                New <span className="text-modina-red">Arrival</span>
              </motion.h2>
              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="text-modina-muted text-lg leading-relaxed public-body"
              >
                {t('home.about_body_2')}
              </motion.p>
            </div>
            <motion.div variants={{ hidden: { opacity: 0, x: 16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }} className="md:mb-2">
              <Link to="/products" className="inline-flex items-center gap-3 text-modina-muted font-semibold text-sm hover:text-modina-red transition-colors duration-200 group">
                Full Range
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:h-[600px]">
            {[
              { title: 'MOTORCYCLE', subtitle: 'CATEGORY 01', desc: 'Stands, Guards, Handlebars', img: premiumRimsImg, className: 'md:col-span-2 md:row-span-2 min-h-[300px] md:min-h-0', titleSize: 'text-2xl lg:text-4xl', path: '/products?category=Motorcycle' },
              { title: 'PREMIUM RIMS', subtitle: 'CATEGORY 02', desc: 'Easy Bike, Mishuk, CNG', img: cngRimImg, className: 'md:col-span-1 min-h-[200px] md:min-h-0', titleSize: 'text-lg lg:text-xl', path: '/products?category=Rims' },
              { title: 'BICYCLE & RICKSHAW', subtitle: 'CATEGORY 03', desc: 'Avon, Gazi, Jumbo', img: bicycleRickshawImg, className: 'md:col-span-1 min-h-[200px] md:min-h-0', titleSize: 'text-lg lg:text-xl', path: '/products?category=Rims' },
              { title: 'HARDWARE', subtitle: 'CATEGORY 04', desc: 'Bearings, Spokes, Washers', img: wasarImg, className: 'md:col-span-2 min-h-[200px] md:min-h-0', titleSize: 'text-xl lg:text-2xl', path: '/products?category=Hardware' }
            ].map((category, idx) => (
              <Link
                to={category.path}
                key={idx}
                className={`block h-full ${category.className}`}
              >
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } }}
                  className="group relative bg-[#111] cursor-pointer overflow-hidden rounded-[12px] border border-[#222] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 ease-in-out hover:-translate-y-1 h-full"
                >
                  <img
                    src={category.img}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-in-out opacity-90 group-hover:opacity-100"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <span aria-hidden="true" className="absolute top-5 right-5 text-white/30 font-display text-2xl lg:text-3xl font-light group-hover:text-white/60 transition-colors duration-300">
                    0{idx + 1}
                  </span>
                  <div className="public-dark absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <p className="text-modina-red text-[10px] font-bold tracking-[0.25em] uppercase mb-2 public-meta">{category.subtitle}</p>
                    <h3 className={`${category.titleSize} font-display font-bold text-white mb-4 tracking-tight`}>{category.title}</h3>
                    <div className="w-10 h-0.5 bg-white/30 mb-3 group-hover:w-16 group-hover:bg-modina-red transition-all duration-300 ease-in-out" />
                    <p className="text-white/70 text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 public-meta">{category.desc}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-10 lg:hidden">
            <Link to="/products" className="btn-secondary gap-3">
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
          4. QUALITY ASSURANCE CARDS
      ═══════════════════════════════════════════════════ */}
      <section className="section-py bg-modina-bg-section border-t border-modina-divider">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="container-premium"
        >
          <div className="text-center max-w-2xl mx-auto mb-14">
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4 public-meta"
            >
              Quality &amp; Trust
            </motion.p>
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } }}
              className="font-display font-bold text-modina-heading mb-4 tracking-tight public-section-title"

            >
              The <span className="text-modina-red">Trust</span> Factor
            </motion.h2>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              className="text-modina-muted text-lg leading-relaxed public-body"
            >
              {t('home.features_quality_desc')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: t('home.features_quality'), desc: t('home.features_quality_desc') },
              { icon: Settings, title: t('home.features_scale'), desc: t('home.features_scale_desc') },
              { icon: Award, title: t('home.features_support'), desc: t('home.features_support_desc') }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } }}
                className="card-premium p-8 flex flex-col group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-modina-red/10 flex items-center justify-center group-hover:bg-modina-red group-hover:scale-105 transition-all duration-300 ease-in-out">
                    <feature.icon className="w-6 h-6 text-modina-red group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span aria-hidden="true" className="text-modina-divider font-display text-4xl font-bold select-none">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="text-xl font-display font-bold text-modina-heading mb-3 group-hover:text-modina-red transition-colors duration-300 public-card-title">{feature.title}</h3>
                <p className="text-modina-muted text-base leading-relaxed flex-grow public-body">{feature.desc}</p>
                <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                  <ArrowRight className="w-4 h-4 text-modina-red" />
                  <span className="text-modina-red text-sm font-bold">Learn More</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
          5. DOWNLOAD CENTER
      ═══════════════════════════════════════════════════ */}
      <section className="section-py bg-white border-t border-modina-divider">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="container-premium"
        >
          <div className="bg-modina-bg-section border border-modina-border rounded-2xl px-8 py-12 lg:px-14 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
              {/* Left */}
              <div className="flex flex-col">
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                  className="flex items-center gap-3 mb-5"
                >
                  <div className="w-8 h-0.5 bg-modina-red shrink-0" />
                  <span className="text-modina-red text-xs font-bold tracking-widest uppercase public-meta">{t('footer.resources_label')}</span>
                </motion.div>
                <motion.h2
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
                  className="font-display font-bold text-modina-heading mb-5 tracking-tight leading-tight public-section-title"

                >
                  Equipping Our <span className="text-modina-red">Partners.</span>
                </motion.h2>
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                  className="text-modina-muted text-base mb-8 max-w-md leading-relaxed public-body"
                >
                  {t('home.about_body_2')}
                </motion.p>
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                  className="flex flex-wrap items-center gap-5"
                >
                  <button className="btn-secondary gap-3 group">
                    <Download className="w-4 h-4 text-modina-red" />
                    2026 Catalog
                  </button>
                  <Link to="/downloads" className="inline-flex items-center gap-3 text-modina-muted font-bold text-sm underline underline-offset-4 hover:text-modina-red transition-colors duration-200 group">
                    {t('nav.downloads')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </motion.div>
              </div>

              {/* Right — File Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Alloy Specs', size: '2.4 MB', type: 'PDF' },
                  { name: 'ISO 9001 Cert', size: '1.1 MB', type: 'PDF' },
                  { name: 'CAD Models', size: '18.5 MB', type: 'ZIP' },
                  { name: 'Warranty Terms', size: '0.8 MB', type: 'PDF' }
                ].map((file, idx) => (
                  <motion.div
                    key={idx}
                    variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: idx * 0.08 } } }}
                    className="card-premium p-5 flex items-start gap-4 cursor-pointer group"
                  >
                    <div className="w-11 h-11 rounded-lg bg-modina-red/10 flex items-center justify-center group-hover:bg-modina-red transition-all duration-300 ease-in-out shrink-0">
                      <Download className="w-4 h-4 text-modina-red group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <span className="text-sm font-bold text-modina-heading group-hover:text-modina-red transition-colors duration-200">{file.name}</span>
                      <span className="text-xs text-modina-subtle font-mono mt-0.5 public-meta">{file.type} · {file.size}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-modina-subtle opacity-0 group-hover:opacity-100 group-hover:text-modina-red transition-all duration-200 self-center shrink-0" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
          6. TESTIMONIALS
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-modina-bg-section border-t border-modina-divider">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="container-premium"
        >
          <div className="text-center mb-10">
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="text-modina-red text-xs font-bold tracking-widest uppercase mb-3 public-meta"
            >
              — Client Voices
            </motion.p>
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
              className="font-display font-bold text-modina-heading tracking-tight public-section-title"

            >
              Global <span className="text-modina-red">Trust</span>
            </motion.h2>
          </div>

          <div className="w-full max-w-[780px] mx-auto">
            <motion.div
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
              className="bg-white border border-modina-border rounded-[12px] px-6 py-8 md:px-12 md:py-10 relative shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-300 ease-in-out"
            >
              {/* Prev/Next */}
              <button
                onClick={prevTestimonial}
                className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-modina-border flex items-center justify-center text-modina-muted hover:text-modina-red hover:border-modina-red transition-all duration-200 ease-in-out z-10 bg-white"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-modina-border flex items-center justify-center text-modina-muted hover:text-modina-red hover:border-modina-red transition-all duration-200 ease-in-out z-10 bg-white"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.99 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                  exit={{ opacity: 0, filter: 'blur(4px)', scale: 1.01 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center text-center"
                >
                  <Quote className="w-8 h-8 text-modina-border mb-4 fill-modina-border/20" />
                  <p className="text-modina-heading font-display text-lg md:text-xl font-medium leading-relaxed max-w-xl mb-6 public-body">
                    "{testimonials[activeTestimonial].quote}"
                  </p>
                  
                  <div className="flex items-center gap-4 mt-2 justify-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-modina-border shrink-0">
                      <img
                        src={testimonials[activeTestimonial].image}
                        alt={testimonials[activeTestimonial].author}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-modina-heading text-sm">{testimonials[activeTestimonial].author}</p>
                      <p className="text-modina-red text-[10px] font-bold tracking-widest uppercase mt-0.5 public-meta">{testimonials[activeTestimonial].company}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className="public-selector" aria-pressed={idx === activeTestimonial} aria-label={`Show testimonial ${idx + 1}`}><span aria-hidden="true" className={`h-1.5 rounded-full transition-all duration-300 ease-in-out ${idx === activeTestimonial ? 'w-6 bg-modina-red' : 'w-1.5 bg-modina-border hover:bg-modina-subtle'}`} /></button>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
          7. PRE-FOOTER CTA
      ═══════════════════════════════════════════════════ */}
      <section className="section-py bg-modina-heading border-t border-modina-divider public-dark">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="container-premium text-center"
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="text-modina-red text-xs font-bold tracking-widest uppercase mb-5 public-meta"
            >
              — Get Started
            </motion.p>
            <motion.h2
              variants={{ hidden: { opacity: 0, scale: 0.95, y: 24 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } }}
              className="font-display font-bold text-white mb-6 tracking-tight leading-tight [text-wrap:balance] public-section-title"

            >
              Partner with{' '}
              <span className="text-modina-red">Modina Rim &amp; Parts</span>
            </motion.h2>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
              className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl public-body"
            >
              {t('home.cta_body')}
            </motion.p>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              <Link
                to="/contact"
                className="btn-primary gap-3 text-base group"
              >
                {t('home.request_quote')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
