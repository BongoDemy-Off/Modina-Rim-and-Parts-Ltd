import React, { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';

import cert9001 from '../assets/ISO/Certificate.png';
import cert14001 from '../assets/ISO/Certificate-02.png';
import cert45001 from '../assets/ISO/Certificate-03.png';

const steps = [
  { num: '01', title: 'Raw Material Inspection', desc: 'All incoming steel and alloy verified against spec sheets.' },
  { num: '02', title: 'Precision Cutting', desc: 'CNC-guided cutting to ±0.01mm tolerance.' },
  { num: '03', title: 'Heat Treatment', desc: 'Controlled furnace hardening for maximum durability.' },
  { num: '04', title: 'Surface Finishing', desc: 'Electroplating and powder coating for corrosion resistance.' },
  { num: '05', title: 'Dimensional QC', desc: '100% inspection with calibrated measurement tools.' },
  { num: '06', title: 'Final Certification', desc: 'ISO 9001:2015 batch sign-off before dispatch.' },
];

const certifications = [
  {
    num: '—01',
    title: 'ISO 9001:2015',
    desc: 'Quality Management System certification covering design, in-process control, and customer service. Issued by LMS Certification Limited, Certificate No. BD99166A.',
    detail: 'Issued April 2023',
    image: cert9001
  },
  {
    num: '—02',
    title: 'ISO 14001:2015',
    desc: 'Environmental Management System certification confirming responsible material use, waste reduction, and sustainable facility operations. Certificate No. BD99166B.',
    detail: 'Issued April 2023',
    image: cert14001
  },
  {
    num: '—03',
    title: 'ISO 45001:2018',
    desc: 'Occupational Health & Safety Management System certification ensuring safe working conditions for all 150+ employees. Certificate No. BD99166C-1.',
    detail: 'Issued April 2023',
    image: cert45001
  },
];

export default function Quality() {
  const letters = "OUR QUALITY".split("");
  
  const qualityRef = useRef(null);
  const qualityInView = useInView(qualityRef, { once: true, margin: '-80px' });

  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: true, margin: '-60px' });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });


  return (
    <div className="min-h-screen bg-modina-bg text-modina-text pt-[112px] sm:pt-[72px] public-page">
      <Helmet>
        <title>Quality Assurance | Modina Rim &amp; Parts Ltd. — ISO 9001:2015 Certified</title>
        <meta name="description" content="Modina Rim &amp; Parts Ltd. operates a zero-defect quality policy with 6-stage manufacturing QC, ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018 certifications from LMS Certification Limited." />
        <meta property="og:title" content="Quality Assurance | Modina Rim &amp; Parts Ltd." />
        <meta property="og:description" content="ISO 9001:2015 certified QC process with 6 stages from raw material inspection to final dispatch. Zero-defect manufacturing standard." />
        <link rel="canonical" href="https://www.modinarim.com/quality" />
      </Helmet>

      {/* SECTION 1 — HERO */}
      <section className="w-full public-section flex flex-col items-center text-center bg-modina-bg">
        <div className="text-modina-red text-xs font-bold tracking-widest uppercase flex items-center gap-2 justify-center mb-10 public-breadcrumb">
          <Link to="/" className="hover:text-modina-heading transition-all duration-300 ease-in-out text-modina-muted">Home</Link>
          <ChevronRight className="w-2.5 h-2.5 text-modina-subtle" />
          <span className="text-modina-muted">Quality</span>
        </div>

        <div className="w-24 h-[2px] bg-modina-red mx-auto mb-10" />

        <h1 className="font-display font-bold tracking-tight text-modina-heading uppercase leading-none flex items-center justify-center flex-wrap public-hero-title">
          {letters.map((letter, i) => (
            letter === " " ? (
              <span key={i} className="w-[0.3em]">&nbsp;</span>
            ) : (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }}
              >
                {letter}
              </motion.span>
            )
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
          <span>Modina Rim &amp; Parts Ltd.</span>
          <span className="text-modina-red">·</span>
          <span>ISO 9001:2015</span>
          <span className="text-modina-red">·</span>
          <span>Jashore, Bangladesh</span>
        </p>

        <hr className="w-full max-w-md border-modina-divider mx-auto mt-10 mb-10" />

        <div className="responsive-stat-strip grid w-full max-w-xl grid-cols-[1fr_auto_1fr_auto_1fr] items-center mx-auto mb-10">
          <div className="flex min-w-0 flex-col items-center px-1 sm:px-10 md:px-14">
            <span className="text-[clamp(32px,4vw,48px)] font-display font-bold text-modina-red">ISO</span>
            <span className="text-modina-muted text-xs font-bold tracking-widest uppercase mt-2 public-meta">Certified</span>
          </div>
          <span className="w-[0.5px] h-12 bg-modina-divider" />
          <div className="flex min-w-0 flex-col items-center px-1 sm:px-10 md:px-14">
            <span className="text-[clamp(32px,4vw,48px)] font-display font-bold text-modina-red">100%</span>
            <span className="text-modina-muted text-xs font-bold tracking-widest uppercase mt-2 public-meta">Pass Rate</span>
          </div>
          <span className="w-[0.5px] h-12 bg-modina-divider" />
          <div className="flex min-w-0 flex-col items-center px-1 sm:px-10 md:px-14">
            <span className="text-[clamp(32px,4vw,48px)] font-display font-bold text-modina-red">15+</span>
            <span className="text-modina-muted text-xs font-bold tracking-widest uppercase mt-2 public-meta">Years QA</span>
          </div>
        </div>
      </section>

      {/* SECTION 2 — QUALITY PHILOSOPHY SPLIT */}
      <section className="w-full overflow-x-clip border-t border-modina-border" ref={qualityRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-modina-border">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={qualityInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-10 lg:p-16 flex flex-col justify-center"
          >
            <p aria-hidden="true" className="text-[120px] md:text-[160px] lg:text-[200px] font-display font-bold text-modina-bg-alt leading-none select-none tracking-tight">
              100
            </p>
            <p className="text-modina-red text-xs font-bold tracking-widest uppercase mt-2 public-meta">
              — Our Standard
            </p>
            <p className="text-modina-subtle text-xs font-bold tracking-widest uppercase mt-1 public-meta">
              Zero Defect Policy
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={qualityInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-10 lg:p-16 flex flex-col justify-center"
          >
            <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-8 public-meta">
              — Quality First
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-modina-heading tracking-tight leading-tight mb-8 public-section-title">
              Precision Is Not Optional
            </h2>
            <p className="text-[14px] text-modina-muted leading-relaxed font-light mb-5 max-w-lg public-body">
              At Modina Rim &amp; Parts Ltd., quality is not just a department—it is the foundation of our entire manufacturing process. From raw material sourcing to final dispatch, every component undergoes rigorous testing to ensure it meets our exacting standards.
            </p>
            <p className="text-[14px] text-modina-muted leading-relaxed font-light mb-5 max-w-lg public-body">
              Our zero-defect policy means we do not compromise. We continuously invest in advanced measurement tools, automated inspection systems, and ongoing training for our quality assurance team to maintain our ISO 9001:2015 certification.
            </p>
            <Link to="/certificates" className="group inline-flex items-center gap-3 mt-4 text-modina-muted text-xs font-bold tracking-widest uppercase hover:text-modina-heading transition-all duration-300 ease-in-out">
              View Certificates
              <ArrowRight className="w-3 h-3 text-modina-subtle group-hover:text-modina-heading transition-all duration-300 ease-in-out" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — PROCESS TIMELINE */}
      <section className="w-full border-t border-modina-border bg-modina-bg-section public-section overflow-hidden" ref={processRef}>
        <div className="container-premium">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-3 public-meta">— Our Process</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-modina-heading tracking-tight public-section-title">
                From Raw Material to Delivery
              </h2>
            </div>
            <p className="text-modina-muted text-xs font-bold tracking-widest uppercase hidden md:block public-meta">
              Step 01 — 06
            </p>
          </div>

          <div className="relative overflow-x-auto pb-4">
            <div className="absolute top-[28px] left-0 right-0 h-[0.5px] bg-modina-divider" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={processInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left' }}
              className="absolute top-[28px] left-0 right-0 h-[0.5px] bg-modina-red"
            />
            
            <div className="flex items-start gap-0 min-w-[700px] relative">
              {steps.map((step, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={processInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + idx * 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-3 h-3 border z-10 mb-6 mt-[22px] transition-all duration-300 ease-in-out cursor-pointer ${idx === 0 ? 'bg-modina-red border-modina-red' : 'bg-modina-bg-section border-modina-border hover:border-modina-red'}`}
                  />
                  <div className="flex flex-col items-center text-center px-2">
                    <p  className="text-modina-red text-xs font-bold tracking-widest uppercase mb-2 public-meta">{step.num}</p>
                    <p className="text-modina-heading text-xs font-bold tracking-widest uppercase mb-2 leading-tight cursor-pointer hover:text-modina-red transition-all duration-300 ease-in-out public-meta">
                      {step.title}
                    </p>
                    <p className="text-[12px] text-modina-muted leading-relaxed max-w-[120px] font-light public-copy">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — CERTIFICATIONS GRID */}
      <section className="w-full border-t border-modina-border public-section bg-modina-bg">
        <div className="container-premium mb-16">
          <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4 public-meta">— What We Stand For</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-modina-heading tracking-tight public-section-title">
            Certifications &amp; Standards
          </h2>
        </div>

        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-default flex flex-col bg-white rounded-[12px] shadow-design-sm hover:shadow-design-md border border-modina-border transition-all duration-300 ease-in-out hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative w-full h-48 md:h-56 bg-modina-bg-alt overflow-hidden border-b border-modina-border p-4">
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-full object-contain transition-all duration-300 ease-in-out group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-300 ease-in-out pointer-events-none" />
                </div>
                <div className="p-8 flex flex-col flex-grow relative">
                  <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[2px] bg-modina-red transition-all duration-500 ease-out" />
                  <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4 public-meta">{cert.num}</p>
                  <h3 className="text-2xl font-display font-bold text-modina-heading tracking-tight mb-4 public-card-title">
                    {cert.title}
                  </h3>
                  <hr className="border-modina-divider mb-4" />
                  <p className="text-[14px] text-modina-muted leading-relaxed font-light flex-grow public-body">
                    {cert.desc}
                  </p>
                  <p className="text-modina-subtle text-xs font-bold tracking-widest uppercase mt-6 group-hover:text-modina-red transition-all duration-300 ease-in-out public-meta">
                    {cert.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — CTA BANNER */}
      <section className="w-full border-t border-modina-border public-section bg-modina-heading public-dark" ref={ctaRef}>
        <div className="container-premium flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -24 }}
            animate={ctaInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative pl-6"
          >
            <motion.div
              initial={{ scaleY: 0 }}
              animate={ctaInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top' }}
              className="absolute left-0 top-0 w-1 h-20 bg-modina-red"
            />
            <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4 public-meta">— Verified Quality</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight public-section-title">
              Explore Our<br />Product Range
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 24 }}
            animate={ctaInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/products" className="btn-primary flex items-center gap-4">
              View Catalog
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/contact" className="btn-secondary flex items-center gap-4">
              Contact Us
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
