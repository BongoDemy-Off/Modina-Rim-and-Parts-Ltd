import React, { useRef, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { Download, Search, ChevronRight, ChevronLeft, ArrowRight, Minus, FileText } from 'lucide-react';

import { filesData } from '../lib/data';

const categories = ['All', 'Catalogs', 'Certificates', 'Technical', 'Legal'];

export default function Downloads() {
  const letters = "DOWNLOADS".split("");
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const featuredRef = useRef(null);
  const featuredInView = useInView(featuredRef, { once: true, margin: '-60px' });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  const filteredFiles = useMemo(() => {
    return filesData.filter(file => {
      const matchesCat = activeCategory === 'All' || file.category === activeCategory;
      const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            file.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            file.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredFiles.length / ITEMS_PER_PAGE);
  const paginatedFiles = filteredFiles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleViewAllCatalogs = () => {
    setActiveCategory('Catalogs');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-modina-text pt-[112px] sm:pt-[72px]">
      <Helmet>
        <title>Downloads | Modina Rim &amp; Parts Ltd. — Catalogs, Certificates &amp; Technical Docs</title>
        <meta name="description" content="Download product catalogs, ISO certificates, technical specification sheets, CAD models, and legal documents from Modina Rim & Parts Ltd., Jashore, Bangladesh." />
        <meta property="og:title" content="Downloads | Modina Rim &amp; Parts Ltd." />
        <meta property="og:description" content="Free download: 2026 product catalog, ISO 9001/14001/45001 certificates, alloy spec sheets, CNC tolerance standards, and more." />
        <link rel="canonical" href="https://www.modinarim.com/downloads" />
      </Helmet>

      {/* SECTION 1 — HERO */}
      <section className="w-full py-20 lg:py-28 flex flex-col items-center text-center bg-white border-b border-modina-divider">
        <div className="text-xs font-bold tracking-widest text-modina-subtle uppercase flex items-center gap-2 justify-center mb-10">
          <Link to="/" className="hover:text-modina-red transition-colors duration-300">Home</Link>
          <ChevronRight className="w-2.5 h-2.5 text-modina-subtle" />
          <span className="text-modina-muted">Downloads</span>
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
          <span>Resource Center</span>
          <span className="text-modina-red">·</span>
          <span>Est. 2010</span>
        </p>

        <hr className="w-full max-w-md border-modina-divider mx-auto mt-10 mb-10" />

        <div className="responsive-stat-strip grid w-full max-w-xl grid-cols-[1fr_auto_1fr_auto_1fr] items-center mx-auto mb-14">
          <div className="flex min-w-0 flex-col items-center px-1 sm:px-10 md:px-14">
            <span className="text-3xl md:text-4xl font-display font-bold text-modina-red">11</span>
            <span className="text-xs font-bold tracking-widest text-modina-muted uppercase mt-1">Documents</span>
          </div>
          <span className="w-[0.5px] h-8 bg-modina-divider" />
          <div className="flex min-w-0 flex-col items-center px-1 sm:px-10 md:px-14">
            <span className="text-3xl md:text-4xl font-display font-bold text-modina-red">Free</span>
            <span className="text-xs font-bold tracking-widest text-modina-muted uppercase mt-1">Downloads</span>
          </div>
          <span className="w-[0.5px] h-8 bg-modina-divider" />
          <div className="flex min-w-0 flex-col items-center px-1 sm:px-10 md:px-14">
            <span className="text-3xl md:text-4xl font-display font-bold text-modina-red">PDF</span>
            <span className="text-xs font-bold tracking-widest text-modina-muted uppercase mt-1">Format</span>
          </div>
        </div>
      </section>

      {/* SECTION 2 — FILTER BAR */}
      <div className="sticky top-[112px] sm:top-16 z-30 bg-white/95 backdrop-blur-md border-b border-modina-divider">
        <div className="container mx-auto flex min-h-[104px] flex-col-reverse gap-2 px-4 py-2 md:px-12 xl:h-14 xl:min-h-0 xl:flex-row xl:items-center xl:justify-between xl:px-24 xl:py-0">
          <div className="flex w-full min-w-0 items-center overflow-x-auto no-scrollbar xl:w-auto">
            {categories.map((cat, idx) => (
              <React.Fragment key={cat}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-6 h-14 text-xs font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-300 ease-in-out ${
                    activeCategory === cat ? 'text-modina-heading' : 'text-modina-muted hover:text-modina-heading'
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div layoutId="activeDownloadCat" className="absolute bottom-0 left-0 w-full h-[2px] bg-modina-red" />
                  )}
                </button>
                {idx < categories.length - 1 && (
                  <span className="w-[0.5px] h-5 bg-modina-divider shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex w-full items-center gap-6 shrink-0 xl:ml-8 xl:w-auto">
            <div className="relative flex w-full items-center xl:w-auto">
              <Search className="w-3.5 h-3.5 text-modina-subtle absolute left-0" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-modina-border focus:border-modina-red outline-none text-base text-modina-text placeholder:text-modina-subtle transition-all duration-300 pl-6 pb-1 xl:w-32 xl:text-xs xl:focus:w-48"
              />
            </div>
            <p className="hidden sm:block text-xs font-bold tracking-widest text-modina-muted whitespace-nowrap">
              — {filteredFiles.length} RESULTS
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3 — FILE GRID */}
      <section className="container mx-auto px-6 md:px-12 lg:px-24 py-16 lg:py-24 min-h-[400px]">
        {filteredFiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {paginatedFiles.map((file) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={file.id}
                  className="group flex flex-col bg-white rounded-[12px] border border-modina-border shadow-design-sm hover:shadow-design-md p-6 lg:p-8 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-transparent group-hover:bg-modina-red transition-all duration-300 ease-in-out" />
                  
                  <div className="w-16 h-16 bg-modina-bg-alt rounded-[12px] flex items-center justify-center mb-6 group-hover:bg-modina-red/10 group-hover:text-modina-red transition-all duration-300 ease-in-out">
                    {file.category === 'Catalogs' ? (
                      <FileText className="w-8 h-8 text-modina-subtle group-hover:text-modina-red transition-colors duration-300" />
                    ) : (
                      <Download className="w-8 h-8 text-modina-subtle group-hover:text-modina-red transition-colors duration-300" />
                    )}
                  </div>

                  <h3 className="text-xl font-display font-bold text-modina-heading group-hover:text-modina-red transition-colors duration-300 ease-in-out mb-2 line-clamp-2 min-h-[56px]">
                    {file.name}
                  </h3>
                  
                  <p className="text-[13px] text-modina-muted font-light leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {file.description}
                  </p>

                  <div className="flex flex-col gap-5 mt-auto">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-[10px] font-bold tracking-widest text-modina-subtle uppercase bg-modina-bg-section px-2 py-1 rounded">
                        {file.format}
                      </span>
                      <span className="text-[10px] font-bold tracking-widest text-modina-subtle uppercase">
                        {file.size}
                      </span>
                      <span className="text-[10px] font-bold tracking-widest text-modina-subtle uppercase">
                        {file.pages}
                      </span>
                    </div>

                    <button className="w-full inline-flex items-center justify-center gap-2 border border-modina-border bg-white text-modina-heading text-sm font-bold py-3 rounded-[8px] group-hover:border-modina-red group-hover:text-modina-red group-hover:bg-modina-red/5 transition-all duration-300 ease-in-out">
                      Download
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <Minus className="w-8 h-8 text-modina-subtle mb-6" />
            <p className="text-xs font-bold tracking-widest text-modina-muted uppercase mb-6">
              No results found
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="border border-modina-border text-modina-muted text-xs font-bold tracking-widest uppercase px-6 py-3 hover:border-modina-red hover:text-modina-red transition-all duration-300 ease-in-out rounded-sm"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-between border-t border-modina-divider pt-8">
            <button
              type="button"
              onClick={() => {
                setCurrentPage(p => Math.max(1, p - 1));
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              disabled={currentPage === 1}
              className="text-xs font-bold tracking-widest uppercase text-modina-muted hover:text-modina-red disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 ease-in-out flex items-center gap-3"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Prev
            </button>
            <span className="text-xs font-bold tracking-widest text-modina-muted uppercase">
              Page {currentPage.toString().padStart(2, '0')} / {totalPages.toString().padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => {
                setCurrentPage(p => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              disabled={currentPage === totalPages}
              className="text-xs font-bold tracking-widest uppercase text-modina-muted hover:text-modina-red disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 ease-in-out flex items-center gap-3"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </section>

      {/* SECTION 4 — FEATURED DOWNLOAD BANNER */}
      <section className="w-full overflow-x-clip border-t border-modina-divider bg-modina-bg-alt py-20 lg:py-24" ref={featuredRef}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={featuredInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="card-premium p-10 lg:p-16 flex flex-col justify-center"
            >
              <p className="text-[80px] sm:text-[120px] font-display font-bold text-modina-divider leading-none select-none">
                2026
              </p>
              <p className="text-xs font-bold tracking-widest text-modina-red uppercase mt-2">
                — Latest Release
              </p>
              <p className="text-xs font-bold tracking-widest text-modina-subtle uppercase mt-1">
                Annual Catalog
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={featuredInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="card-premium p-10 lg:p-16 flex flex-col justify-center"
            >
              <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-8">
                — Featured Document
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-modina-heading tracking-tight mb-8">
                Product Catalog 2026
              </h2>
              <p className="text-[14px] text-modina-muted font-light leading-relaxed mb-8 max-w-lg">
                Our most comprehensive catalog to date. Covering all 21 SKUs across 4 categories with full technical specifications, material data, and ordering codes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary flex items-center justify-center gap-4">
                  Download Now
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={handleViewAllCatalogs}
                  className="btn-secondary flex items-center justify-center gap-4"
                >
                  View All Catalogs
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — CTA BANNER */}
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
            <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-4">— Need More Info?</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              Can't Find<br />What You Need?
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 24 }}
            animate={ctaInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/contact" className="btn-primary flex items-center gap-4">
              Contact Sales
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/products" className="btn-secondary flex items-center gap-4">
              View Products
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
