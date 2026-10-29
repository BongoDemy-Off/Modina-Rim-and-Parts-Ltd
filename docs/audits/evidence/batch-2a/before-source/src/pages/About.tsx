import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import companyImg from '@/assets/company.webp';
import faruqImg from '@/assets/Md. Faruq Hossain.webp';
import facilityVideo from '@/assets/State of the Art Facility.webm';

function CountUp({ target, suffix = '', duration = 2, delay = 0 }: { target: number; suffix?: string; duration?: number; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v) + suffix);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      const c = animate(count, target, { duration, ease: 'easeOut' });
      return c.stop;
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [inView, count, target, duration, delay]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function About() {
  const { t, i18n } = useTranslation();
  t('i18n_lang', { defaultValue: i18n.language });
  const segmenter = new Intl.Segmenter(i18n.language, { granularity: 'grapheme' });
  const letters = Array.from(segmenter.segment(t('about.hero_title') || '')).map((s) => s.segment);

  const milestones = [
    { year: t('i18n_lang') === 'bn' ? '২০১০' : '2010', title: t('about.ms_1_title'), desc: t('about.ms_1_desc') },
    { year: t('i18n_lang') === 'bn' ? '২০১৩' : '2013', title: t('about.ms_2_title'), desc: t('about.ms_2_desc') },
    { year: t('i18n_lang') === 'bn' ? '২০১৯' : '2019', title: t('about.ms_3_title'), desc: t('about.ms_3_desc') },
    { year: t('i18n_lang') === 'bn' ? '২০২৩' : '2023', title: t('about.ms_4_title'), desc: t('about.ms_4_desc') },
    { year: t('i18n_lang') === 'bn' ? '২০২৪' : '2024', title: t('about.ms_5_title'), desc: t('about.ms_5_desc') },
  ];

  const values = [
    { num: t('i18n_lang') === 'bn' ? '—০১' : '—01', title: t('about.val_1_title'), desc: t('about.val_1_desc'), detail: t('about.val_1_detail') },
    { num: t('i18n_lang') === 'bn' ? '—০২' : '—02', title: t('about.val_2_title'), desc: t('about.val_2_desc'), detail: t('about.val_2_detail') },
    { num: t('i18n_lang') === 'bn' ? '—০৩' : '—03', title: t('about.val_3_title'), desc: t('about.val_3_desc'), detail: t('about.val_3_detail') },
  ];

  const stats = [
    { value: 21, suffix: '+', label: t('about.stat_1_label') },
    { value: 15, suffix: '+', label: t('about.stat_2_label') },
    { value: 3, suffix: '+', label: t('about.stat_3_label') },
    { value: 100, suffix: '%', label: t('about.stat_4_label') },
  ];

  const team = [
    { name: t('about.team_1_name'), title: t('about.team_1_title'), img: faruqImg },
    { name: t('about.team_2_name'), title: t('about.team_2_title'), img: 'https://picsum.photos/seed/leader-02/400/500' },
    { name: t('about.team_3_name'), title: t('about.team_3_title'), img: 'https://picsum.photos/seed/leader-03/400/500' },
  ];

  const foundingRef = useRef(null);
  const foundingInView = useInView(foundingRef, { once: true, margin: '-80px' });
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: '-60px' });
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  const yearOpacity = [1, 0.55, 0.4, 0.3, 0.2];

  return (
    <div className="min-h-screen bg-white text-modina-text pt-[112px] sm:pt-[72px]">
      <Helmet>
        <title>About Us | Modina Rim &amp; Parts Ltd. — Since 2010, Jashore Bangladesh</title>
        <meta name="description" content="Founded in 2010, Modina Rim &amp; Parts Ltd. is a triple ISO-certified automotive component manufacturer in Jashore with 15+ years of precision engineering and 21+ product SKUs." />
        <meta property="og:title" content="About Us | Modina Rim &amp; Parts Ltd." />
        <meta property="og:description" content="Founded 2010 in Jashore, Bangladesh. Triple ISO-certified manufacturer of automotive rims and parts with 15+ years of precision manufacturing." />
        <link rel="canonical" href="https://www.modinarim.com/about" />
      </Helmet>

      {/* ─── HERO ─── */}
      <section className="w-full py-20 lg:py-28 flex flex-col items-center text-center bg-white border-b border-modina-divider">
        <div className="flex items-center gap-2 justify-center mb-10 text-sm text-modina-muted">
          <Link to="/" className="hover:text-modina-red transition-colors duration-200 font-medium">{t('nav.home')}</Link>
          <ChevronRight className="w-4 h-4 text-modina-subtle" />
          <span className="text-modina-heading font-semibold">{t('about.hero_subtitle')}</span>
        </div>
        <div className="w-16 h-0.5 bg-modina-red mx-auto mb-10" />
        <h1 className="font-display font-bold text-modina-heading uppercase leading-none flex items-center justify-center flex-wrap tracking-tight" style={{ fontSize: 'clamp(52px, 9vw, 120px)' }}>
          {letters.map((letter, i) =>
            letter === ' ' ? (
              <span key={i} className="w-[0.3em]">&nbsp;</span>
            ) : (
              <motion.span key={i} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}>
                {letter}
              </motion.span>
            )
          )}
        </h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ transformOrigin: 'left' }} className="w-24 h-0.5 bg-modina-red mx-auto my-10" />
        <p className="text-modina-muted text-sm font-medium">{t('about.hero_banner_desc')}</p>
        <hr className="w-full max-w-md border-modina-border mx-auto mt-10 mb-10" />
        <div className="responsive-stat-strip grid w-full max-w-xl grid-cols-[1fr_auto_1fr_auto_1fr] items-center mx-auto">
          {[
            { value: t('i18n_lang') === 'bn' ? '২০১০' : '2010', label: t('about.est') },
            { value: null, label: t('about.experience'), countTarget: 15, suffix: '+' },
            { value: 'ISO', label: t('about.certification') }
          ].map((item, idx, arr) => (
            <React.Fragment key={idx}>
              <div className="flex min-w-0 flex-col items-center px-1 py-2 sm:px-10 md:px-14">
                <span className="font-display font-bold text-modina-red" style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>
                  {item.value ?? <CountUp target={item.countTarget!} suffix={item.suffix} />}
                </span>
                <span className="text-modina-muted text-xs font-semibold uppercase tracking-widest mt-1">{item.label}</span>
              </div>
              {idx < arr.length - 1 && <span className="w-px h-8 bg-modina-divider" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ─── FOUNDING STORY ─── */}
      <section className="w-full overflow-x-clip border-b border-modina-divider bg-white" ref={foundingRef}>
        <div className="container-premium py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-0">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={foundingInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col justify-center pr-0 lg:pr-16 border-r-0 lg:border-r border-modina-border py-10 lg:py-0">
            <p className="font-display font-bold text-modina-divider leading-none select-none tracking-tight" style={{ fontSize: 'clamp(80px, 14vw, 180px)' }}>
              2010
            </p>
            <p className="text-modina-red text-xs font-bold tracking-widest uppercase mt-2">— {t('about.founded')}</p>
            <p className="text-modina-muted text-sm font-medium uppercase tracking-wider mt-1">Jashore, Bangladesh</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={foundingInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col justify-center pl-0 lg:pl-16 py-10 lg:py-0">
            <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-6">{t('about.our_beginning')}</p>
            <h2 className="font-display font-bold text-modina-heading tracking-tight leading-tight mb-6" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
              {t('about.intro_title')}
            </h2>
            <p className="text-modina-muted text-base leading-relaxed mb-5 max-w-lg">{t('about.intro_body_1')}</p>
            <p className="text-modina-muted text-base leading-relaxed mb-5 max-w-lg">{t('about.intro_body_2')}</p>
            <Link to="/products" className="inline-flex items-center gap-3 mt-2 text-modina-heading font-bold text-base underline underline-offset-4 hover:text-modina-red transition-colors duration-200 group">
              {t('common.view_products')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="w-full border-b border-modina-divider bg-modina-bg-alt py-20 lg:py-28 overflow-hidden" ref={timelineRef}>
        <div className="container-premium">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-3">— {t('about.timeline_subtitle')}</p>
              <h2 className="font-display font-bold text-modina-heading tracking-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
                {t('about.timeline_title')}
              </h2>
            </div>
            <p className="text-modina-muted text-sm font-medium hidden md:block">
              {t('i18n_lang') === 'bn' ? '২০১০ — ২০২৬' : '2010 — 2026'}
            </p>
          </div>
          <div className="relative overflow-x-auto pb-4">
            <div className="absolute top-[28px] left-0 right-0 h-px bg-modina-border" />
            <motion.div initial={{ scaleX: 0 }} animate={timelineInView ? { scaleX: 1 } : {}} transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} style={{ transformOrigin: 'left' }} className="absolute top-[28px] left-0 right-0 h-px bg-modina-red" />
            <div className="flex items-start gap-0 min-w-[700px] relative">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }} animate={timelineInView ? { scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.3 + idx * 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-3 h-3 rounded-full border-2 z-10 mb-6 mt-[22px] ${idx === 0 ? 'bg-modina-red border-modina-red' : 'bg-white border-modina-border hover:border-modina-red'} transition-colors duration-300`}
                  />
                  <div className="flex flex-col items-center text-center px-2">
                    <p style={{ opacity: yearOpacity[idx] }} className="text-modina-red text-[10px] font-bold tracking-widest uppercase mb-2">{milestone.year}</p>
                    <p className="text-modina-heading text-xs font-bold uppercase mb-2 leading-tight">{milestone.title}</p>
                    <p className="text-modina-muted text-xs leading-relaxed max-w-[120px]">{milestone.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── MISSION & VALUES ─── */}
      <section className="w-full border-b border-modina-divider bg-white section-py">
        <div className="max-w-lg mx-auto text-center mb-16 px-6">
          <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4">— {t('about.what_we_stand_for')}</p>
          <h2 className="font-display font-bold text-modina-heading tracking-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
            {t('about.mission_values')}
          </h2>
        </div>
        <div className="container-premium grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, idx) => (
            <motion.div
              key={idx} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="card-premium p-8 lg:p-10 flex flex-col group cursor-default"
            >
              <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-5">{value.num}</p>
              <h3 className="font-display font-bold text-modina-heading mb-5 tracking-tight" style={{ fontSize: 'clamp(20px, 2vw, 26px)' }}>{value.title}</h3>
              <hr className="border-modina-border mb-5" />
              <p className="text-modina-muted text-base leading-relaxed flex-grow">{value.desc}</p>
              <p className="text-modina-subtle text-xs font-semibold uppercase tracking-wider mt-5 group-hover:text-modina-red transition-colors duration-200">{value.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── MANUFACTURING SHOWCASE ─── */}
      <section className="w-full border-b border-modina-divider bg-modina-bg-section">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-[400px] lg:h-[560px] overflow-hidden">
            <motion.img
              initial={{ scale: 1.08 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              src={companyImg} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-8">
              <p className="text-white/70 text-xs uppercase tracking-widest">{t('about.manufacturing_facility')}</p>
              <p className="text-white text-sm font-semibold uppercase tracking-wider mt-1">{t('about.facility_location')}</p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            {stats.map((stat, idx) => (
              <div key={idx} className={`flex flex-col justify-center px-10 lg:px-12 py-14 lg:py-16 group cursor-default ${idx % 2 === 0 ? 'bg-white' : 'bg-modina-bg-alt'} border border-modina-border`}>
                <p className="font-display font-bold text-modina-red mb-2" style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-modina-muted text-xs font-bold uppercase tracking-widest group-hover:text-modina-heading transition-colors duration-300">{stat.label}</p>
                <div className="w-0 group-hover:w-8 h-0.5 bg-modina-red mt-4 transition-all duration-300 ease-in-out" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FACTORY VIDEO ─── */}
      <section className="w-full border-b border-modina-divider bg-white">
        <div className="container-premium py-16 lg:py-24">
          <div className="mb-10">
            <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4">— {t('about.video_subtitle')}</p>
            <h2 className="font-display font-bold text-modina-heading tracking-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
              {t('about.video_title')}
            </h2>
          </div>
          <div className="relative w-full aspect-video rounded-[12px] overflow-hidden shadow-[var(--shadow-lg)] border border-modina-border">
            <video src={facilityVideo} autoPlay muted loop playsInline className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-8">
              <p className="text-white/70 text-xs uppercase tracking-widest">{t('about.manufacturing_facility')}</p>
              <p className="text-white text-sm font-semibold uppercase tracking-wider mt-1">Jhumjhumpur, Jashore, Bangladesh</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LEADERSHIP TEAM ─── */}
      <section className="w-full border-b border-modina-divider bg-modina-bg-alt section-py">
        <div className="container-premium">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-3">— {t('about.team_subtitle')}</p>
              <h2 className="font-display font-bold text-modina-heading tracking-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
                {t('about.team_title')}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="card-premium overflow-hidden group cursor-default"
              >
                <div className="aspect-[3/4] bg-modina-bg-section overflow-hidden">
                  <img src={member.img} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-in-out" referrerPolicy="no-referrer" loading="lazy" />
                </div>
                <div className="p-6 border-t border-modina-border">
                  <p className="text-base font-display font-bold text-modina-heading group-hover:text-modina-red transition-colors duration-300 mb-1">{member.name}</p>
                  <p className="text-modina-muted text-xs font-semibold uppercase tracking-wider">{member.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="w-full section-py bg-modina-heading" ref={ctaRef}>
        <div className="container-premium flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={ctaInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4">— {t('about.what_we_make')}</p>
            <h2 className="font-display font-bold text-white tracking-tight leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              {t('about.explore_product_range')}
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} animate={ctaInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col sm:flex-row gap-4">
            <Link to="/products" className="btn-primary gap-3"><ArrowRight className="w-4 h-4" />{t('common.view_catalog')}</Link>
            <Link to="/contact" className="btn-secondary gap-3">{t('common.contact_us')}<ArrowRight className="w-4 h-4" /></Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
