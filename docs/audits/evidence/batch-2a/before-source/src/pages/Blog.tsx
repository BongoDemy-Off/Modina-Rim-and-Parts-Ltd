import React, { useRef, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Search, Minus } from 'lucide-react';

import { type Post, postsData } from '../lib/data';

const categories = ['All', 'Engineering', 'Quality', 'Industry', 'Company', 'Manufacturing'];

export default function Blog() {
  const letters = "OUR BLOG".split("");
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredRef = useRef(null);
  const featuredInView = useInView(featuredRef, { once: true, margin: '-80px' });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  const filteredPosts = useMemo(() => {
    return postsData.filter(post => {
      const matchesCat = activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white text-modina-text pt-[112px] sm:pt-[72px]">
      <Helmet>
        <title>Blog | Modina Rim &amp; Parts Ltd. — Engineering &amp; Industry Insights</title>
        <meta name="description" content="Engineering insights, manufacturing deep-dives, and industry analysis from Modina Rim &amp; Parts Ltd. Topics: CNC machining, ISO standards, heat treatment, Bangladesh auto parts market." />
        <meta property="og:title" content="Blog | Modina Rim &amp; Parts Ltd." />
        <meta property="og:description" content="Technical blog covering automotive rim engineering, manufacturing processes, quality standards, and Bangladesh's auto parts industry." />
        <link rel="canonical" href="https://www.modinarim.com/blog" />
      </Helmet>

      {/* SECTION 1 — HERO */}
      <section className="w-full py-20 lg:py-28 flex flex-col items-center text-center bg-white border-b border-modina-divider">
        <div className="text-xs font-bold tracking-widest text-modina-subtle uppercase flex items-center gap-2 justify-center mb-10">
          <Link to="/" className="hover:text-modina-red transition-colors duration-300">Home</Link>
          <ChevronRight className="w-2.5 h-2.5 text-modina-subtle" />
          <span className="text-modina-muted">Blog</span>
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
          <span>Insights &amp; Engineering</span>
          <span className="text-modina-red">·</span>
          <span>Est. 2010</span>
        </p>

        <hr className="w-full max-w-md border-modina-divider mx-auto mt-10 mb-10" />

        <div className="responsive-stat-strip grid w-full max-w-xl grid-cols-[1fr_auto_1fr_auto_1fr] items-center mx-auto">
          <div className="flex min-w-0 flex-col items-center px-1 sm:px-10 md:px-14">
            <span className="text-3xl md:text-4xl font-display font-bold text-modina-red">10+</span>
            <span className="text-xs font-bold tracking-widest text-modina-muted uppercase mt-1">Articles</span>
          </div>
          <span className="w-[0.5px] h-8 bg-modina-divider" />
          <div className="flex min-w-0 flex-col items-center px-1 sm:px-10 md:px-14">
            <span className="text-3xl md:text-4xl font-display font-bold text-modina-red">5</span>
            <span className="text-xs font-bold tracking-widest text-modina-muted uppercase mt-1">Topics</span>
          </div>
          <span className="w-[0.5px] h-8 bg-modina-divider" />
          <div className="flex min-w-0 flex-col items-center px-1 sm:px-10 md:px-14">
            <span className="text-3xl md:text-4xl font-display font-bold text-modina-red">2026</span>
            <span className="text-xs font-bold tracking-widest text-modina-muted uppercase mt-1">Latest Post</span>
          </div>
        </div>


      </section>

      {/* SECTION 2 — FEATURED POST */}
      <section className="w-full overflow-x-clip border-b border-modina-divider" ref={featuredRef}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
          <div className="relative h-[300px] lg:h-[560px] overflow-hidden rounded-none">
            <motion.img
              initial={{ scale: 1.08 }}
              animate={featuredInView ? { scale: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              src="https://picsum.photos/seed/blog-featured/900/700"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.5)_0%,transparent_40%)]" />
            <div className="absolute top-6 left-6">
              <span className="text-xs font-bold tracking-widest text-modina-red uppercase border border-modina-red/40 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-sm">
                Editor's Pick
              </span>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={featuredInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="bg-modina-bg-alt p-10 lg:p-16 flex flex-col justify-center border-l border-modina-divider"
          >
            <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-4">— Featured Post</p>
            <p className="text-xs font-bold tracking-widest text-modina-muted uppercase mb-4">April 2026</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-modina-heading tracking-tight leading-tight mb-6">
              Why Precision Tolerance Is the Most Underrated Factor in Auto Parts Manufacturing
            </h2>
            <p className="text-[14px] text-modina-muted font-light leading-relaxed mb-6 max-w-lg">
              Across the automotive supply chain, tolerance specifications are often treated as an afterthought. At Modina, we argue that ±0.01mm is not a number on a datasheet — it is the difference between a part that lasts and a part that fails. This article breaks down why precision matters at every stage of manufacturing.
            </p>
            <div className="flex gap-2 mb-8">
              <span className="text-xs font-bold tracking-widest text-modina-muted uppercase border border-modina-border px-3 py-1 rounded-sm">
                Engineering
              </span>
              <span className="text-xs font-bold tracking-widest text-modina-muted uppercase border border-modina-border px-3 py-1 rounded-sm">
                Quality
              </span>
            </div>
            <Link to="/blog/featured" className="inline-flex items-center gap-3 text-xs font-bold tracking-widest text-modina-muted uppercase hover:text-modina-red transition-all duration-300 ease-in-out">
              Read Article
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — FILTER BAR */}
      <div className="sticky top-[112px] sm:top-16 z-30 bg-white/95 backdrop-blur-md border-b border-modina-divider">
        <div className="container mx-auto flex min-h-[104px] flex-col-reverse gap-2 px-4 py-2 md:px-12 xl:h-14 xl:min-h-0 xl:flex-row xl:items-center xl:justify-between xl:px-24 xl:py-0">
          <div className="flex w-full min-w-0 items-center overflow-x-auto no-scrollbar xl:w-auto">
            {categories.map((cat, idx) => (
              <React.Fragment key={cat}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-6 h-14 text-xs font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-300 ease-in-out ${
                    activeCategory === cat ? 'text-modina-red' : 'text-modina-muted hover:text-modina-red'
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div layoutId="activeBlogCat" className="absolute bottom-0 left-0 w-full h-[2px] bg-modina-red" />
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
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-modina-border focus:border-modina-red outline-none text-base text-modina-text placeholder:text-modina-subtle transition-all duration-300 pl-6 pb-1 xl:w-32 xl:text-xs xl:focus:w-48"
              />
            </div>
            <p className="hidden sm:block text-xs font-bold tracking-widest text-modina-muted whitespace-nowrap">
              — {filteredPosts.length} RESULTS
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4 — POSTS GRID */}
      <section className="container mx-auto px-6 md:px-12 lg:px-24 py-16 lg:py-24 min-h-[400px]">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  key={post.id}
                  className="card-premium group cursor-pointer flex flex-col overflow-hidden transition-all duration-300 ease-in-out"
                >
                  <Link to={`/blog/${post.id}`} className="flex flex-col h-full">
                    <div className="relative h-[200px] overflow-hidden shrink-0">
                      <img
                        src={post.img}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-all duration-[1200ms]"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="text-xs font-bold tracking-widest text-modina-red uppercase border border-modina-red/30 bg-white/90 px-2 py-1 backdrop-blur-sm rounded-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col gap-3 border-t border-modina-border flex-grow">
                      <p className="text-xs font-bold tracking-widest text-modina-muted uppercase">{post.date}</p>
                      <h3 className="text-[14px] font-display font-bold text-modina-heading leading-snug group-hover:text-modina-red transition-colors duration-300 ease-in-out line-clamp-2">{post.title}</h3>
                      <p className="text-[12px] text-modina-muted font-light leading-relaxed line-clamp-3 mt-1">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-xs font-bold tracking-widest text-modina-muted border border-modina-border px-2 py-0.5 uppercase group-hover:border-modina-red group-hover:text-modina-red transition-all duration-300 ease-in-out rounded-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto pt-4 border-t border-modina-border flex items-center justify-between">
                        <span className="text-xs text-modina-subtle group-hover:text-modina-muted transition-colors uppercase">{post.readTime}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-modina-red opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out" />
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
            <p className="text-xs font-bold tracking-widest text-modina-muted uppercase mb-6">
              No posts found
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="border border-modina-border text-modina-muted text-xs font-bold tracking-widest uppercase px-6 py-3 hover:border-modina-red hover:text-modina-red transition-all duration-300 ease-in-out rounded-sm"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
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
            <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-4">— Explore Further</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              See What<br />We Make
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
