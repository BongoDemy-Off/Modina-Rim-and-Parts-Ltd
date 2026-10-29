import React, { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';

const pillarsData = [
  { num: "—01", title: "Environment", desc: "We hold ISO 14001 certification for environmental management. Our facility has reduced industrial waste output by 30% since 2018 through process optimization, material recycling programs, and responsible chemical handling protocols.", label: "Target", value: "Zero Waste by 2030", img: "https://picsum.photos/seed/sustain-env/600/400" },
  { num: "—02", title: "People", desc: "Our 150+ strong workforce operates in a safe, fair, and inclusive environment. We invest in continuous skills training, provide above-market compensation, and maintain strict occupational health and safety standards across all production areas.", label: "Workforce", value: "150+ Employees", img: "https://picsum.photos/seed/sustain-people/600/400" },
  { num: "—03", title: "Community", desc: "We actively support the industrial communities around our Jashore facility through educational sponsorships, apprenticeship programs for local youth, and partnerships with vocational training institutes in the region.", label: "Impact", value: "200+ Lives", img: "https://picsum.photos/seed/sustain-community/600/400" }
];

const envInitiatives = [
  { title: "Waste Reduction Program", desc: "30% reduction in industrial waste since 2018 through material recycling and process optimization." },
  { title: "Energy Efficiency", desc: "LED lighting and optimized CNC scheduling have reduced energy consumption by 18% over three years." },
  { title: "Chemical Management", desc: "All surface treatment chemicals are handled under strict EPA-equivalent protocols with zero discharge violations." },
  { title: "Supplier Standards", desc: "We require environmental compliance documentation from all raw material suppliers before onboarding." }
];

const csrData = [
  { num: "—01", title: "Youth Apprenticeship Program", desc: "Annual intake of 20 apprentices from local vocational institutes. Participants receive 6-month paid training in CNC operation, quality inspection, and manufacturing processes, with 70% offered permanent positions upon completion.", tag: "Since 2015" },
  { num: "—02", title: "Educational Sponsorships", desc: "Modina sponsors 15 scholarships annually for children of factory workers pursuing technical education at polytechnic institutes across Bangladesh. We believe investing in the next generation is investing in the future of Bangladesh manufacturing.", tag: "15 Scholarships/Year" },
  { num: "—03", title: "Workplace Safety Initiative", desc: "Zero lost-time injury target since 2020. All production staff receive quarterly safety training, personal protective equipment is provided at no cost, and near-miss reporting is actively encouraged and rewarded.", tag: "Zero LTI Target" },
  { num: "—04", title: "Local Supplier Development", desc: "We prioritize sourcing from local Bangladeshi suppliers wherever quality standards permit. Our local procurement ratio has grown from 40% to 65% since 2018, directly supporting the domestic industrial ecosystem.", tag: "65% Local Sourcing" }
];

export default function Sustainability() {
  const letters = "SUSTAINABILITY".split("");

  const introRef = useRef(null);
  const introInView = useInView(introRef, { once: true, margin: '-80px' });

  const pillarsRef = useRef(null);
  const pillarsInView = useInView(pillarsRef, { once: true, margin: '-60px' });

  const envRef = useRef(null);
  const envInView = useInView(envRef, { once: true, margin: '-80px' });

  const csrRef = useRef(null);
  const csrInView = useInView(csrRef, { once: true, margin: '-60px' });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  return (
    <div className="min-h-screen bg-white text-modina-text pt-[112px] sm:pt-[72px]">
      <Helmet>
        <title>Sustainability &amp; CSR | Modina Rim &amp; Parts Ltd.</title>
        <meta name="description" content="Modina Rim & Parts Ltd. is ISO 14001:2015 certified. Committed to 30% waste reduction, 150+ employee welfare, youth apprenticeship programs, and responsible manufacturing in Jashore, Bangladesh." />
        <meta property="og:title" content="Sustainability &amp; CSR | Modina Rim &amp; Parts Ltd." />
        <meta property="og:description" content="ISO 14001 certified environmental management, 30% waste reduction since 2023, 200+ lives impacted through CSR programs in Jashore, Bangladesh." />
        <link rel="canonical" href="https://www.modinarim.com/sustainability" />
      </Helmet>

      {/* SECTION 1 — HERO */}
      <section className="w-full py-20 lg:py-28 flex flex-col items-center text-center bg-white border-b border-modina-divider">
        <div className="text-xs font-bold tracking-widest text-modina-subtle uppercase flex items-center gap-2 justify-center mb-10">
          <Link to="/" className="hover:text-modina-red transition-colors duration-300">Home</Link>
          <ChevronRight className="w-2.5 h-2.5 text-modina-subtle" />
          <span className="text-modina-muted">Sustainability</span>
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
          <span>People. Planet. Purpose.</span>
          <span className="text-modina-red">·</span>
          <span>Est. 2010</span>
        </p>

        <hr className="w-full max-w-md border-modina-divider mx-auto mt-10 mb-10" />

        <div className="responsive-stat-strip grid w-full max-w-xl grid-cols-[1fr_auto_1fr_auto_1fr] items-center mx-auto">
          <div className="flex min-w-0 flex-col items-center px-1 sm:px-10 md:px-14">
            <span className="text-3xl md:text-4xl font-display font-bold text-modina-red">ISO</span>
            <span className="text-xs font-bold tracking-widest text-modina-muted uppercase mt-1">14001 Certified</span>
          </div>
          <span className="w-[0.5px] h-8 bg-modina-divider" />
          <div className="flex min-w-0 flex-col items-center px-1 sm:px-10 md:px-14">
            <span className="text-3xl md:text-4xl font-display font-bold text-modina-red">30%</span>
            <span className="text-xs font-bold tracking-widest text-modina-muted uppercase mt-1">Waste Reduced</span>
          </div>
          <span className="w-[0.5px] h-8 bg-modina-divider" />
          <div className="flex min-w-0 flex-col items-center px-1 sm:px-10 md:px-14">
            <span className="text-3xl md:text-4xl font-display font-bold text-modina-red">200+</span>
            <span className="text-xs font-bold tracking-widest text-modina-muted uppercase mt-1">Lives Impacted</span>
          </div>
        </div>


      </section>

      {/* SECTION 2 — INTRO SPLIT */}
      <section className="w-full overflow-x-clip border-b border-modina-divider" ref={introRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={introInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="bg-modina-bg-alt p-10 lg:p-16 flex flex-col justify-center border-r border-modina-divider"
          >
            <p className="text-[120px] font-display font-bold text-modina-divider leading-none select-none tracking-tight">
              CSR
            </p>
            <p className="text-xs font-bold tracking-widest text-modina-red uppercase mt-2">
              — Our Commitment
            </p>
            <p className="text-xs font-bold tracking-widest text-modina-subtle uppercase mt-1">
              Beyond Manufacturing
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={introInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-10 lg:p-16 flex flex-col justify-center"
          >
            <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-8">
              — Why It Matters
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-modina-heading tracking-tight leading-tight mb-8">
              Responsible by Design.
            </h2>
            <p className="text-[14px] text-modina-muted font-light leading-relaxed max-w-lg mb-5">
              At Modina Rim &amp; Parts Ltd., sustainability is not a corporate afterthought. It is embedded in every process decision, every material choice, and every community initiative we undertake.
            </p>
            <p className="text-[14px] text-modina-muted font-light leading-relaxed max-w-lg mb-5">
              We believe a manufacturer's responsibility extends beyond the factory gate — to the environment we share, the workforce we employ, and the communities that surround us.
            </p>
            <Link to="/about" className="inline-flex items-center gap-3 mt-4 text-xs font-bold tracking-widest text-modina-muted uppercase hover:text-modina-red transition-all duration-300 ease-in-out">
              Our Story
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — THREE PILLARS */}
      <section className="w-full border-b border-modina-divider py-20 lg:py-28 bg-modina-bg-alt" ref={pillarsRef}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 mb-16">
          <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-4">— Our Approach</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-modina-heading tracking-tight">
            Three Pillars of Responsibility
          </h2>
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillarsData.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              animate={pillarsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="card-premium group cursor-default flex flex-col overflow-hidden transition-all duration-300 ease-in-out"
            >
              <div className="relative h-[200px] overflow-hidden rounded-t-xl">
                <motion.img
                  initial={{ scale: 1.05 }}
                  animate={pillarsInView ? { scale: 1 } : {}}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  src={pillar.img}
                  alt={pillar.title}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-all duration-[1200ms]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-8 lg:p-10 flex flex-col flex-grow">
                <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-4 mt-2">
                  {pillar.num}
                </p>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-modina-heading tracking-tight mb-4">
                  {pillar.title}
                </h3>
                <hr className="border-modina-border mb-4" />
                <p className="text-[14px] text-modina-muted font-light leading-relaxed flex-grow">
                  {pillar.desc}
                </p>
                <div className="mt-6 pt-4 border-t border-modina-border flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest text-modina-muted uppercase">
                    {pillar.label}
                  </span>
                  <span className="text-xs font-bold tracking-widest text-modina-red uppercase">
                    {pillar.value}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — ENVIRONMENT SHOWCASE */}
      <section className="w-full overflow-x-clip border-b border-modina-divider" ref={envRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-[400px] lg:h-[520px] overflow-hidden">
            <motion.img
              initial={{ scale: 1.08 }}
              animate={envInView ? { scale: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              src="https://picsum.photos/seed/factory-green/900/700"
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.6)_0%,transparent_40%)]" />
            <div className="absolute bottom-8 left-8">
              <p className="text-xs font-bold tracking-widest text-white/70 uppercase">
                Manufacturing Facility
              </p>
              <p className="text-xs font-bold tracking-widest text-white uppercase mt-1">
                Jashore, Bangladesh — ISO 14001 Certified
              </p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={envInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-10 lg:p-16 flex flex-col justify-center border-l border-modina-divider"
          >
            <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-8">
              — Environmental Action
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-modina-heading tracking-tight leading-tight mb-8">
              ISO 14001 Certified Operations
            </h2>
            
            <div className="flex flex-col">
              {envInitiatives.map((item, idx) => (
                <div key={idx} className="border-b border-modina-border py-5 flex items-start gap-6 group/item last:border-0">
                  <span className="text-xs text-modina-red mt-0.5">—</span>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-xs font-bold tracking-widest text-modina-muted uppercase group-hover/item:text-modina-heading transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-[13px] text-modina-muted font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — CSR INITIATIVES GRID */}
      <section className="w-full border-b border-modina-divider py-20 lg:py-28 bg-white" ref={csrRef}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 mb-20">
          <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-4">— Community Impact</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-modina-heading tracking-tight">
            CSR Initiatives
          </h2>
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col gap-20">
          {csrData.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col lg:flex-row gap-10 lg:gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="relative w-full aspect-[4/3] rounded-[12px] overflow-hidden shadow-design-sm">
                    <img 
                      src={`https://picsum.photos/seed/csrmodina${idx}/800/600`} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-500 ease-in-out hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col">
                  <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-4">
                    {item.num}
                  </p>
                  <h3 className="text-[clamp(24px,3vw,36px)] font-display font-bold text-modina-heading tracking-tight leading-tight mb-6">
                    {item.title}
                  </h3>
                  <div className="w-12 h-[1px] bg-modina-divider mb-6" />
                  <p className="text-[15px] text-modina-muted font-light leading-relaxed mb-8 max-w-lg">
                    {item.desc}
                  </p>
                  <span className="inline-block border border-modina-border rounded-full px-4 py-2 text-xs font-bold tracking-widest text-modina-muted uppercase self-start hover:border-modina-red hover:text-modina-red transition-all duration-300 ease-in-out">
                    {item.tag}
                  </span>
                </div>
              </motion.div>
            );
          })}
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
            <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-4">— Join Our Journey</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              Partner With<br />A Responsible Manufacturer
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 24 }}
            animate={ctaInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/contact" className="btn-primary flex items-center gap-4">
              Contact Us
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
