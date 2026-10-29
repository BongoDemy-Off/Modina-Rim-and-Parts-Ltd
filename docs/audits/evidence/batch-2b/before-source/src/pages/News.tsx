import React, { useRef, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Search, Minus } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readTime: string;
  img: string;
}

const articlesData: Article[] = [
  { id: 1, title: 'ISO 9001:2015 Certification Successfully Renewed for 2025–2026', category: 'Company News', date: 'March 2026', excerpt: 'Modina Rim & Parts Ltd. has completed its annual ISO 9001:2015 surveillance audit with zero non-conformances, reaffirming our commitment to world-class quality management.', readTime: '3 min read', img: 'https://picsum.photos/seed/news-01/600/400' },
  { id: 2, title: 'New CNG Rim Variant Released for Commercial Fleet Operators', category: 'Product Updates', date: 'February 2026', excerpt: 'Following market demand from commercial operators, Modina has introduced a reinforced CNG rim variant engineered for higher load ratings and extended service life.', readTime: '4 min read', img: 'https://picsum.photos/seed/news-02/600/400' },
  { id: 3, title: 'Modina Participates in Dhaka International Trade Expo 2026', category: 'Events', date: 'January 2026', excerpt: 'Our team showcased the full 2026 product range at the Dhaka International Trade Expo, connecting with over 200 distributors and manufacturers from across South Asia.', readTime: '5 min read', img: 'https://picsum.photos/seed/news-03/600/400' },
  { id: 4, title: 'Bangladesh Automotive Parts Sector Grows 18% in FY2025', category: 'Industry', date: 'December 2025', excerpt: 'The Bangladesh automotive components manufacturing sector recorded strong growth in fiscal year 2025, driven by rising domestic demand and increased export volumes to neighboring markets.', readTime: '6 min read', img: 'https://picsum.photos/seed/news-04/600/400' },
  { id: 5, title: 'Modina Expands Distribution Network to Chittagong and Sylhet', category: 'Company News', date: 'November 2025', excerpt: 'To better serve our regional clients, Modina has established two new distribution centers in Chittagong and Sylhet, reducing delivery times by up to 40% for customers in those regions.', readTime: '3 min read', img: 'https://picsum.photos/seed/news-05/600/400' },
  { id: 6, title: 'New Motorcycle Handlebar Range Passes Stress Testing at 200% Load', category: 'Product Updates', date: 'October 2025', excerpt: 'Our latest motorcycle handlebar range has completed rigorous stress testing at 200% of rated load capacity, setting a new benchmark for durability in the Bangladeshi market.', readTime: '4 min read', img: 'https://picsum.photos/seed/news-06/600/400' },
  { id: 7, title: 'South Asian Auto Parts Summit — Modina Keynote Speaker', category: 'Events', date: 'September 2025', excerpt: 'Modina Managing Director Mohammed Rafiqul Islam delivered the keynote address at the South Asian Auto Parts Summit in Colombo, speaking on precision manufacturing and regional supply chains.', readTime: '5 min read', img: 'https://picsum.photos/seed/news-07/600/400' },
  { id: 8, title: 'Rising Steel Costs and the Case for Domestic Manufacturing', category: 'Industry', date: 'August 2025', excerpt: 'As global steel prices continue to fluctuate, Bangladeshi manufacturers who have invested in domestic supply chains are proving more resilient than those dependent on imports.', readTime: '7 min read', img: 'https://picsum.photos/seed/news-08/600/400' }
];

const categories = ['All', 'Company News', 'Product Updates', 'Industry', 'Events'];

export default function News() {
  const letters = "NEWS & EVENTS".split("");
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredRef = useRef(null);
  const featuredInView = useInView(featuredRef, { once: true, margin: '-80px' });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  const filteredArticles = useMemo(() => {
    return articlesData.filter(article => {
      const matchesCat = activeCategory === 'All' || article.category === activeCategory;
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            article.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-modina-bg text-modina-text pt-[112px] sm:pt-[72px] public-page">
      <Helmet>
        <title>News &amp; Events | Modina Rim &amp; Parts Ltd.</title>
        <meta name="description" content="Latest news, product launches, industry updates, and events from Modina Rim & Parts Ltd. — Bangladesh's ISO-certified automotive component manufacturer." />
        <meta property="og:title" content="News &amp; Events | Modina Rim &amp; Parts Ltd." />
        <meta property="og:description" content="Company news, product updates, trade events, and industry insights from Modina Rim & Parts Ltd., Jashore, Bangladesh." />
        <link rel="canonical" href="https://www.modinarim.com/news" />
      </Helmet>

      {/* SECTION 1 — HERO */}
      <section className="w-full public-section flex flex-col items-center text-center bg-modina-bg">
        <div className="text-modina-red text-xs font-bold tracking-widest uppercase flex items-center gap-2 justify-center mb-10 public-breadcrumb">
          <Link to="/" className="hover:text-modina-red transition-all duration-300 ease-in-out text-modina-muted">Home</Link>
          <ChevronRight className="w-2.5 h-2.5 text-modina-subtle" />
          <span className="text-modina-muted">News</span>
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
          <span>Latest Updates</span>
          <span className="text-modina-red">·</span>
          <span>Est. 2010</span>
        </p>

        <hr className="w-full max-w-md border-modina-divider mx-auto mt-10 mb-10" />

        <div className="responsive-stat-strip grid w-full max-w-xl grid-cols-[1fr_auto_1fr_auto_1fr] items-center mx-auto">
          <div className="flex min-w-0 flex-col items-center px-1 sm:px-10 md:px-14">
            <span className="text-3xl md:text-4xl font-display font-bold text-modina-red">2026</span>
            <span className="text-modina-muted text-xs font-bold tracking-widest uppercase mt-1 public-meta">Latest Year</span>
          </div>
          <span className="w-[0.5px] h-8 bg-modina-divider" />
          <div className="flex min-w-0 flex-col items-center px-1 sm:px-10 md:px-14">
            <span className="text-3xl md:text-4xl font-display font-bold text-modina-red">12+</span>
            <span className="text-modina-muted text-xs font-bold tracking-widest uppercase mt-1 public-meta">Articles</span>
          </div>
          <span className="w-[0.5px] h-8 bg-modina-divider" />
          <div className="flex min-w-0 flex-col items-center px-1 sm:px-10 md:px-14">
            <span className="text-3xl md:text-4xl font-display font-bold text-modina-red">4</span>
            <span className="text-modina-muted text-xs font-bold tracking-widest uppercase mt-1 public-meta">Categories</span>
          </div>
        </div>

      </section>

      {/* SECTION 2 — FEATURED ARTICLE (HERO CARD) */}
      <section className="w-full overflow-x-clip border-t border-modina-border" ref={featuredRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-modina-border">
          <div className="relative h-[320px] lg:h-[520px] bg-modina-bg-alt overflow-hidden">
            <motion.img
              initial={{ scale: 1.08 }}
              animate={featuredInView ? { scale: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              src="https://picsum.photos/seed/news-featured/900/700"
              className="w-full h-full object-cover opacity-70"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute top-6 left-6">
              <span className="text-modina-red text-xs font-bold tracking-widest uppercase border border-modina-red/40 bg-white/80 px-3 py-1.5 backdrop-blur-md rounded-sm public-meta">
                Featured
              </span>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={featuredInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-10 lg:p-16 flex flex-col justify-center"
          >
            <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4 public-meta">— Latest News</p>
            <p className="text-modina-muted text-xs font-bold tracking-widest uppercase mb-4 public-meta">April 2026</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-modina-heading tracking-tight leading-tight mb-6 public-section-title">
              Modina Launches 2026 Product Catalog With 21 New SKUs
            </h2>
            <p className="text-[14px] text-modina-muted font-light leading-relaxed mb-8 max-w-lg public-body">
              Modina Rim &amp; Parts Ltd. has officially released its most comprehensive product catalog to date, featuring 21 SKUs across 4 major categories. The new range includes expanded motorcycle components, premium rim variants, and updated hardware specifications for 2026.
            </p>
            <Link to={`/news/${articlesData[0].id}`} className="inline-flex items-center gap-3 text-modina-muted text-xs font-bold tracking-widest uppercase hover:text-modina-red transition-all duration-300 ease-in-out public-inline-action">
              Read Article
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — FILTER BAR */}
      <div className="sticky top-[112px] sm:top-16 z-30 bg-white/90 backdrop-blur-md border-t border-modina-border border-b shadow-design-sm">
        <div className="container-premium flex min-h-[104px] flex-col-reverse gap-2 py-2 xl:h-14 xl:min-h-0 xl:flex-row xl:items-center xl:justify-between xl:py-0">
          <div className="flex w-full min-w-0 items-center overflow-x-auto no-scrollbar xl:w-auto">
            {categories.map((cat, idx) => (
              <React.Fragment key={cat}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`public-filter relative px-6 h-14 text-xs font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-300 ease-in-out ${
                    activeCategory === cat ? 'text-modina-red' : 'text-modina-muted hover:text-modina-red'
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div layoutId="activeNewsCat" className="absolute bottom-0 left-0 w-full h-[1px] bg-modina-red" />
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
              <Search className="w-3.5 h-3.5 text-modina-muted absolute left-0" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-modina-divider focus:border-modina-red outline-none text-base text-modina-heading placeholder:text-modina-subtle transition-all pl-6 pb-1 xl:w-40 xl:focus:w-48"
              />
            </div>
            <p className="hidden sm:block text-modina-muted text-xs font-bold tracking-widest uppercase whitespace-nowrap public-meta">
              — {filteredArticles.length} RESULTS
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4 — ARTICLES GRID */}
      <section className="container-premium py-16 lg:py-24 min-h-[400px]">
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article) => (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  key={article.id}
                  className="card-premium group cursor-default flex flex-col overflow-hidden relative"
                >
                  <Link to={`/news/${article.id}`} className="flex flex-col h-full">
                    <div className="relative h-[200px] bg-modina-bg-alt overflow-hidden shrink-0">
                      <img 
                        src={article.img} 
                        alt={article.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-[1200ms] scale-100 group-hover:scale-[1.04]"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="text-modina-red text-xs font-bold tracking-widest uppercase border border-modina-red/40 bg-white/80 px-2 py-1 backdrop-blur-sm rounded-sm public-meta">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col gap-3 border-t border-modina-divider flex-grow">
                      <p className="text-modina-subtle text-xs font-bold tracking-widest uppercase public-meta">
                        {article.date}
                      </p>
                      <h3 className="text-[14px] font-display font-bold text-modina-muted tracking-tight leading-snug group-hover:text-modina-red transition-all duration-300 ease-in-out line-clamp-2 public-card-title">
                        {article.title}
                      </h3>
                      <p className="text-[12px] text-modina-muted font-light leading-relaxed line-clamp-3 mt-1 flex-grow public-copy">
                        {article.excerpt}
                      </p>
                      <div className="mt-auto pt-4 border-t border-modina-divider flex items-center justify-between">
                        <span className="text-modina-subtle text-xs font-bold tracking-widest uppercase public-meta">
                          {article.readTime}
                        </span>
                        <ArrowRight className="w-3 h-3 text-modina-subtle opacity-0 group-hover:opacity-100 group-hover:text-modina-red transition-all duration-300 ease-in-out" />
                      </div>
                    </div>
                  </Link>
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
            <p className="text-modina-muted text-xs font-bold tracking-widest uppercase mb-6 public-meta">
              No results found
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="border border-modina-border text-modina-muted text-xs font-bold tracking-widest uppercase px-6 py-3 hover:border-modina-red hover:text-modina-red transition-all duration-300 ease-in-out rounded-none"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
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
            <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4 public-meta">— Stay Updated</p>
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
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link to="/contact" className="btn-secondary flex items-center gap-4">
              Contact Us
              <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
