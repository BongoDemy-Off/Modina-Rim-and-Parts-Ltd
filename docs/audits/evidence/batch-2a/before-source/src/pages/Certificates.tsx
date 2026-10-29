import React, { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';

const certificatesData = [
  {
    num: "—01",
    title: "ISO 9001:2015",
    yearBadge: "2023",
    certNo: "BD99166A",
    issuer: "LMS Certification Limited",
    desc: "Quality Management System certification covering design, in-process control, and customer service. Independently audited and issued 10 April 2023, confirming compliance with international quality management standards.",
    issued: "10 April 2023",
    img: "/iso/iso-9001.png"
  },
  {
    num: "—02",
    title: "ISO 14001:2015",
    yearBadge: "2023",
    certNo: "BD99166B",
    issuer: "LMS Certification Limited",
    desc: "Environmental Management System certification confirming responsible material use, industrial waste reduction, and sustainable facility operations across our Jashore manufacturing plant.",
    issued: "10 April 2023",
    img: "/iso/iso-14001.png"
  },
  {
    num: "—03",
    title: "ISO 45001:2018",
    yearBadge: "2023",
    certNo: "BD99166C-1",
    issuer: "LMS Certification Limited",
    desc: "Occupational Health & Safety Management System certification ensuring safe, hazard-controlled working conditions for all employees across our production, finishing, and dispatch operations.",
    issued: "10 April 2023",
    img: "/iso/iso-45001.png"
  }
];

const milestonesData = [
  { year: "2010", title: "Company Founded", desc: "Modina Rim & Parts Ltd. established in Jashore, Bangladesh with a focus on precision automotive components." },
  { year: "2013", title: "First International Export", desc: "Successfully expanded into South Asian export markets, meeting full international trade compliance requirements." },
  { year: "2019", title: "Factory Expansion", desc: "Commissioned new CNC machining lines and expanded the Jashore facility to support a growing product range." },
  { year: "2023", title: "Triple ISO Certified", desc: "Awarded ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018 simultaneously by LMS Certification Limited." },
  { year: "2024", title: "21-Product Line", desc: "Expanded full catalogue to 21 SKUs across motorcycle components, rims, and hardware categories." }
];

const yearOpacity = [1, 0.55, 0.38, 0.25, 0.16];

export default function Certificates() {
  const letters = "CERTIFICATES".split("");

  const introRef = useRef(null);
  const introInView = useInView(introRef, { once: true, margin: '-80px' });

  const certsRef = useRef(null);
  const certsInView = useInView(certsRef, { once: true, margin: '-60px' });

  const awardsRef = useRef(null);
  const awardsInView = useInView(awardsRef, { once: true, margin: '-60px' });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  return (
    <div className="min-h-screen bg-modina-bg text-modina-text pt-[112px] sm:pt-[72px]">
      <Helmet>
        <title>Certifications | Modina Rim &amp; Parts Ltd. — ISO 9001, 14001, 45001</title>
        <meta name="description" content="Modina Rim &amp; Parts Ltd. holds ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018 certifications issued by LMS Certification Limited, April 2023. View original certificate documents." />
        <meta property="og:title" content="Certifications | Modina Rim &amp; Parts Ltd." />
        <meta property="og:description" content="Triple ISO-certified manufacturer: ISO 9001:2015 (BD99166A), ISO 14001:2015 (BD99166B), ISO 45001:2018 (BD99166C-1) — LMS Certification Limited." />
        <link rel="canonical" href="https://www.modinarim.com/certificates" />
      </Helmet>

      {/* SECTION 1 — HERO */}
      <section className="w-full py-20 lg:py-28 flex flex-col items-center text-center bg-modina-bg">
        <div className="text-modina-red text-xs font-bold tracking-widest uppercase flex items-center gap-2 justify-center mb-10">
          <Link to="/" className="hover:text-modina-heading transition-all duration-300 ease-in-out text-modina-muted">Home</Link>
          <ChevronRight className="w-2.5 h-2.5 text-modina-subtle" />
          <span className="text-modina-muted">Certificates</span>
        </div>

        <div className="w-24 h-[2px] bg-modina-red mx-auto mb-10" />

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] font-display font-bold tracking-tight text-modina-heading uppercase leading-none flex items-center justify-center flex-wrap">
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

        <p className="text-modina-red text-xs font-bold tracking-widest uppercase flex items-center justify-center flex-wrap gap-2">
          <span>Modina Rim &amp; Parts Ltd.</span>
          <span className="text-modina-red">·</span>
          <span>Certified Excellence</span>
          <span className="text-modina-red">·</span>
          <span>Est. 2010</span>
        </p>

        <hr className="w-full max-w-md border-modina-divider mx-auto mt-10 mb-10" />

        <div className="responsive-stat-strip grid w-full max-w-xl grid-cols-[1fr_auto_1fr_auto_1fr] items-center mx-auto">
          <div className="flex min-w-0 flex-col items-center px-1 sm:px-10 md:px-14">
            <span className="text-3xl md:text-4xl font-display font-bold text-modina-red">3+</span>
            <span className="text-modina-muted text-xs font-bold tracking-widest uppercase mt-1">Certifications</span>
          </div>
          <span className="w-[0.5px] h-8 bg-modina-divider" />
          <div className="flex min-w-0 flex-col items-center px-1 sm:px-10 md:px-14">
            <span className="text-3xl md:text-4xl font-display font-bold text-modina-red">2010</span>
            <span className="text-modina-muted text-xs font-bold tracking-widest uppercase mt-1">Since</span>
          </div>
          <span className="w-[0.5px] h-8 bg-modina-divider" />
          <div className="flex min-w-0 flex-col items-center px-1 sm:px-10 md:px-14">
            <span className="text-3xl md:text-4xl font-display font-bold text-modina-red">100%</span>
            <span className="text-modina-muted text-xs font-bold tracking-widest uppercase mt-1">Compliant</span>
          </div>
        </div>


      </section>

      {/* SECTION 2 — INTRO SPLIT */}
      <section className="w-full overflow-x-clip border-t border-modina-border" ref={introRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-modina-border">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={introInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-10 lg:p-16 flex flex-col justify-center"
          >
            <p className="text-[180px] font-light text-modina-bg-alt leading-none select-none tracking-tight">
              ★
            </p>
            <p className="text-modina-red text-xs font-bold tracking-widest uppercase mt-2">
              — Our Recognition
            </p>
            <p className="text-modina-subtle text-xs font-bold tracking-widest uppercase mt-1">
              Globally Verified Standards
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={introInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-10 lg:p-16 flex flex-col justify-center"
          >
            <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-8">
              — Why It Matters
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-modina-heading tracking-tight leading-tight mb-8">
              Proof, Not a Promise
            </h2>
            <p className="text-[14px] text-modina-muted font-light leading-relaxed max-w-lg mb-5">
              Every certification we hold represents years of disciplined process improvement, rigorous auditing, and uncompromising commitment to international quality standards.
            </p>
            <p className="text-[14px] text-modina-muted font-light leading-relaxed max-w-lg mb-5">
              Our certifications are not marketing tools. They are independently verified evidence that Modina Rim &amp; Parts Ltd. manufactures to the highest global benchmarks consistently, year after year.
            </p>
            <Link to="/quality" className="inline-flex items-center gap-3 mt-4 text-modina-muted text-xs font-bold tracking-widest uppercase hover:text-modina-heading transition-all duration-300 ease-in-out">
              View Quality Process
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — CERTIFICATE CARDS */}
      <section className="w-full border-t border-modina-border py-20 lg:py-28 bg-modina-bg" ref={certsRef}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 mb-16">
          <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4">— Our Certifications</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-modina-heading tracking-tight">
            Internationally Recognized
          </h2>
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificatesData.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              animate={certsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="card-premium flex flex-col group cursor-default relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[1px] bg-modina-red transition-all duration-500 z-10" />
              
              <div className="relative h-[220px] bg-modina-bg-alt overflow-hidden">
                <motion.img
                  initial={{ scale: 1.05 }}
                  animate={certsInView ? { scale: 1 } : {}}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  src={cert.img}
                  alt={cert.title}
                  className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-[1200ms] p-2"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4">
                  <span className="text-modina-red text-xs font-bold tracking-widest uppercase border border-modina-red/40 bg-white/80 px-3 py-1 backdrop-blur-sm">
                    {cert.yearBadge}
                  </span>
                </div>
              </div>

              <div className="p-8 lg:p-10 flex flex-col flex-grow">
                <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4 mt-2">
                  {cert.num}
                </p>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-modina-heading tracking-tight mb-4">
                  {cert.title}
                </h3>
                <hr className="border-modina-divider mb-4" />
                <p className="text-modina-subtle text-xs font-bold tracking-widest uppercase mb-1">
                  Issued By
                </p>
                <p className="text-[12px] text-modina-muted font-light mb-1">
                  {cert.issuer}
                </p>
                <p className="text-modina-subtle text-xs tracking-widest uppercase mb-5">
                  Cert No. {cert.certNo}
                </p>
                <p className="text-[14px] text-modina-muted font-light leading-relaxed flex-grow">
                  {cert.desc}
                </p>
                <div className="mt-6 pt-4 border-t border-modina-divider flex items-center justify-between">
                  <span className="text-modina-subtle text-xs font-bold tracking-widest uppercase">
                    Date Issued
                  </span>
                  <span className="text-modina-red text-xs font-bold tracking-widest uppercase">
                    {cert.issued}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — AWARDS TIMELINE */}
      <section className="w-full border-t border-modina-border bg-modina-bg-section py-20 lg:py-28 overflow-hidden" ref={awardsRef}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 mb-16 flex justify-between items-end">
          <div>
            <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-3">— Recognition</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-modina-heading tracking-tight">Awards &amp; Milestones</h2>
          </div>
          <div className="hidden md:block text-modina-muted text-xs font-bold tracking-widest uppercase">
            2010 — 2026
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="w-full overflow-x-auto pb-4 no-scrollbar">
            <div className="relative min-w-[700px]">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={awardsInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left' }}
              className="absolute top-[5px] left-0 w-full h-[1px] bg-modina-red"
            />
            <div className="flex justify-between relative z-10">
              {milestonesData.map((item, idx) => (
                <div key={idx} className="flex flex-col items-start w-48 relative group">
                  <div className={`w-3 h-3 mb-6 transition-all duration-500 ease-in-out ${idx === 0 ? 'bg-modina-red' : 'bg-modina-bg-section border border-modina-border group-hover:border-modina-red'}`} />
                  <p className="font-mono text-2xl mb-3 transition-colors duration-500" style={{ color: `rgba(229, 37, 37, ${yearOpacity[idx]})` }}>
                    {item.year}
                  </p>
                  <h4 className="text-[13px] font-bold text-modina-heading uppercase tracking-tight mb-2">{item.title}</h4>
                  <p className="text-[12px] text-modina-muted font-light leading-relaxed pr-4">{item.desc}</p>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — CTA BANNER */}
      <section className="w-full border-t border-modina-border py-24 lg:py-32 bg-modina-heading" ref={ctaRef}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
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
            <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4">— Verified Quality</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
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
