import React, { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';

const coreValues = [
  { num: "—01", title: "Precision", desc: "Every component is engineered to micro-millimeter accuracy. We believe precision is not optional — it is the foundation of trust between manufacturer and customer.", badge: "Tolerance: ±0.01mm" },
  { num: "—02", title: "Integrity", desc: "We hold ourselves to the highest standards of transparency in every transaction, every audit, and every product that leaves our facility. Our word is our warranty.", badge: "ISO 9001:2015 Verified" },
  { num: "—03", title: "Innovation", desc: "We continuously invest in new technologies, processes, and people. Standing still in manufacturing means falling behind — and we refuse to fall behind.", badge: "15+ Years of R&D" },
  { num: "—04", title: "Responsibility", desc: "We are accountable to our customers, our employees, and the communities we operate in. Responsible manufacturing means doing things right even when no one is watching.", badge: "ISO 14001 Certified" },
  { num: "—05", title: "Excellence", desc: "Good enough is never enough at Modina. We pursue excellence in every dimension — from raw material selection to final dispatch inspection — without exception.", badge: "Zero Defect Policy" },
  { num: "—06", title: "Partnership", desc: "We view every distributor, supplier, and customer as a long-term partner. Our success is measured not just by what we produce but by the relationships we build.", badge: "3+ Export Markets" }
];

export default function Mission() {
  const letters = "OUR MISSION".split("");

  const missionRef = useRef(null);
  const missionInView = useInView(missionRef, { once: true, margin: '-80px' });

  const visionRef = useRef(null);
  const visionInView = useInView(visionRef, { once: true, margin: '-60px' });

  const leaderRef = useRef(null);
  const leaderInView = useInView(leaderRef, { once: true, margin: '-80px' });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  return (
    <div className="min-h-screen bg-white text-modina-text pt-[112px] sm:pt-[72px]">
      <Helmet>
        <title>Our Mission &amp; Values | Modina Rim &amp; Parts Ltd.</title>
        <meta name="description" content="Modina Rim & Parts Ltd. is guided by five core values: precision, integrity, reliability, sustainability, and excellence. Discover the philosophy behind our manufacturing standards." />
        <meta property="og:title" content="Mission &amp; Values | Modina Rim &amp; Parts Ltd." />
        <meta property="og:description" content="Five pillars drive every decision at Modina: Precision, Integrity, Reliability, Sustainability, Excellence. Our commitment to quality extends beyond the factory floor." />
        <link rel="canonical" href="https://www.modinarim.com/mission" />
      </Helmet>

      {/* SECTION 1 — HERO */}
      <section className="w-full py-20 lg:py-28 flex flex-col items-center text-center bg-white border-b border-modina-divider">
        <div className="text-xs font-bold tracking-widest text-modina-subtle uppercase flex items-center gap-2 justify-center mb-10">
          <Link to="/" className="hover:text-modina-red transition-colors duration-300">Home</Link>
          <ChevronRight className="w-2.5 h-2.5 text-modina-subtle" />
          <span className="text-modina-muted">Mission</span>
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

        <p className="text-xs font-bold tracking-widest text-modina-muted uppercase flex items-center justify-center flex-wrap gap-2">
          <span>Modina Rim &amp; Parts Ltd.</span>
          <span className="text-modina-red">·</span>
          <span>Purpose &amp; Values</span>
          <span className="text-modina-red">·</span>
          <span>Est. 2010</span>
        </p>

        <hr className="w-full max-w-md border-modina-divider mx-auto mt-10 mb-10" />

        <div className="responsive-stat-strip grid w-full max-w-xl grid-cols-[1fr_auto_1fr_auto_1fr] items-center mx-auto">
          <div className="flex min-w-0 flex-col items-center px-1 sm:px-10 md:px-14">
            <span className="text-3xl md:text-4xl font-display font-bold text-modina-red">3</span>
            <span className="text-xs font-bold tracking-widest text-modina-muted uppercase mt-1">Core Values</span>
          </div>
          <span className="w-[0.5px] h-8 bg-modina-divider" />
          <div className="flex min-w-0 flex-col items-center px-1 sm:px-10 md:px-14">
            <span className="text-3xl md:text-4xl font-display font-bold text-modina-red">15+</span>
            <span className="text-xs font-bold tracking-widest text-modina-muted uppercase mt-1">Years of Purpose</span>
          </div>
          <span className="w-[0.5px] h-8 bg-modina-divider" />
          <div className="flex min-w-0 flex-col items-center px-1 sm:px-10 md:px-14">
            <span className="text-3xl md:text-4xl font-display font-bold text-modina-red">ISO</span>
            <span className="text-xs font-bold tracking-widest text-modina-muted uppercase mt-1">Certified</span>
          </div>
        </div>
      </section>

      {/* SECTION 2 — MISSION STATEMENT SPLIT */}
      <section className="w-full overflow-x-clip border-b border-modina-divider" ref={missionRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={missionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="bg-modina-bg-alt p-10 lg:p-16 flex flex-col justify-center border-r border-modina-divider"
          >
            <p className="text-[200px] font-display font-bold text-modina-divider leading-none select-none tracking-tight">
              M
            </p>
            <p className="text-xs font-bold tracking-widest text-modina-red uppercase mt-2">
              — Our Purpose
            </p>
            <p className="text-xs font-bold tracking-widest text-modina-subtle uppercase mt-1">
              Why We Exist
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={missionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-10 lg:p-16 flex flex-col justify-center"
          >
            <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-8">
              — Mission Statement
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-modina-heading tracking-tight leading-tight mb-8">
              Engineering Trust. Delivering Excellence.
            </h2>
            <p className="text-[14px] text-modina-muted font-light leading-relaxed max-w-lg mb-5">
              Our mission is to manufacture automotive components that exceed international quality standards, empowering mobility across Bangladesh and beyond. We exist to prove that precision engineering and uncompromising quality can originate from Bangladesh.
            </p>
            <p className="text-[14px] text-modina-muted font-light leading-relaxed max-w-lg mb-5">
              Every rim we forge, every component we machine, and every standard we uphold is a direct expression of our founding belief — that Bangladesh can and should compete at the highest level of global manufacturing.
            </p>
            <Link to="/about" className="inline-flex items-center gap-3 mt-4 text-xs font-bold tracking-widest text-modina-muted uppercase hover:text-modina-red transition-all duration-300 ease-in-out">
              Our Full Story
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — VISION STATEMENT */}
      <section className="w-full border-b border-modina-divider bg-modina-bg-section py-20 lg:py-28" ref={visionRef}>
        <motion.div 
          initial={{ opacity: 0, y: 32 }}
          animate={visionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="container mx-auto px-6 md:px-12 lg:px-24 max-w-4xl text-center"
        >
          <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-6">— Vision</p>
          <p className="text-2xl md:text-3xl lg:text-4xl font-light text-modina-heading tracking-tight leading-relaxed mb-10">
            "To be South Asia's most trusted automotive components manufacturer — recognized not just for what we make, but for how we make it."
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={visionInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'center' }}
            className="w-24 h-[1px] bg-modina-red mx-auto mb-10"
          />
          <p className="text-xs font-bold tracking-widest text-modina-muted uppercase">
            Modina Rim &amp; Parts Ltd. — 2026 Vision Statement
          </p>
        </motion.div>
      </section>

      {/* SECTION 4 — CORE VALUES */}
      <section className="w-full border-b border-modina-divider py-20 lg:py-28 bg-modina-bg-section">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 mb-16">
          <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-4">— What We Stand For</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-modina-heading tracking-tight">
            Core Values
          </h2>
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          {coreValues.map((value, idx) => {
            // Create a bento grid effect by making some cards span more columns or rows on larger screens
            const isWide = idx === 0 || idx === 3;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group cursor-default flex flex-col bg-white rounded-[12px] shadow-design-sm hover:shadow-design-md border border-modina-border p-8 lg:p-10 transition-all duration-300 ease-in-out hover:-translate-y-1 relative overflow-hidden ${isWide ? 'lg:col-span-2' : ''}`}
              >
                <div className="absolute -top-4 -right-4 text-[120px] font-display font-black text-modina-bg-alt opacity-50 select-none z-0 group-hover:scale-110 group-hover:text-modina-border transition-all duration-500 ease-in-out">
                  {value.num.replace('—', '')}
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <p className="text-[48px] font-display font-extrabold text-modina-subtle leading-none mb-6 group-hover:text-modina-red transition-colors duration-300 ease-in-out">
                    {value.num.replace('—', '')}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-modina-heading tracking-tight mb-4">
                    {value.title}
                  </h3>
                  <hr className="border-modina-divider mb-4 w-12" />
                  <p className="text-[15px] text-modina-muted leading-relaxed font-light flex-grow max-w-md">
                    {value.desc}
                  </p>
                  <div className="mt-8 flex items-center">
                    <span className="text-xs font-bold tracking-widest text-modina-muted uppercase bg-modina-bg-alt px-3 py-1.5 rounded-md border border-modina-border group-hover:border-modina-red/30 transition-colors duration-300 ease-in-out">
                      {value.badge}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 5 — LEADERSHIP PHILOSOPHY SPLIT */}
      <section className="w-full overflow-x-clip border-b border-modina-divider bg-modina-bg-alt" ref={leaderRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 group">
          <div className="relative h-[400px] lg:h-[560px] overflow-hidden">
            <motion.div
              initial={{ scale: 1.08 }}
              animate={leaderInView ? { scale: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full"
            >
              <img
                src="https://picsum.photos/seed/mission-leader/900/700"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                loading="lazy"
                referrerPolicy="no-referrer"
                alt="Founder"
              />
            </motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.6)_0%,transparent_40%)] pointer-events-none" />
            <div className="absolute bottom-8 left-8 pointer-events-none">
              <p className="text-xs font-bold tracking-widest text-white/70 uppercase">
                Leadership Philosophy
              </p>
              <p className="text-xs font-bold tracking-widest text-white uppercase mt-1">
                Mohammed Rafiqul Islam — Founder
              </p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={leaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-10 lg:p-16 flex flex-col justify-center border-l border-modina-divider transition-colors duration-500 group-hover:bg-red-50/30"
          >
            <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-8">
              — Founder's Note
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-modina-heading tracking-tight leading-tight mb-8 group-hover:text-modina-red transition-colors duration-300">
              Built on Conviction.
            </h2>
            
            <blockquote className="border-l-2 border-modina-red pl-6 mb-8 text-[15px] text-modina-muted font-light leading-relaxed italic group-hover:text-modina-heading transition-colors duration-300">
              "We started Modina with a single conviction — that quality is not a luxury reserved for large multinationals. It is a discipline available to anyone willing to commit to it absolutely."
            </blockquote>

            <p className="text-[14px] text-modina-muted font-light leading-relaxed mb-4 max-w-lg">
              Fifteen years later, that conviction has never wavered. Every ISO certification we earn, every zero-defect audit we pass, and every international market we enter is proof that our founding belief was right.
            </p>
            <p className="text-[14px] text-modina-muted font-light leading-relaxed mb-4 max-w-lg">
              Our values are not written on walls. They are built into every product we ship and every decision we make.
            </p>
            
            <p className="text-xs font-bold tracking-widest text-modina-muted uppercase mt-6">
              — Mohammed Rafiqul Islam, Founder &amp; MD
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6 — CTA BANNER */}
      <section className="w-full border-t border-modina-divider py-24 lg:py-32 bg-modina-heading" ref={ctaRef}>
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
            <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-4">— Live Our Values</p>
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
            <Link to="/about" className="btn-secondary flex items-center gap-4">
              Our Story
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
