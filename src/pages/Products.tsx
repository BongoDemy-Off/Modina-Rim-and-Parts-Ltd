import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search, ArrowRight, X, Send, Download,
  ChevronRight, ChevronLeft, LayoutGrid, Minus
} from 'lucide-react';
import { ProductImageCarousel } from '../components/ProductImageCarousel';
import PublicModal from '../components/PublicModal';
import { useTranslation } from 'react-i18next';
import { scrollToPublicTarget, usePublicToolbar } from '../hooks/usePublicLayout';

import { type Product, productsData } from '../lib/data';

const categories = ['All', 'Motorcycle', 'Rims', 'Hardware'];

export default function Products() {
  const { t } = useTranslation();
  const letters = 'PRODUCTS'.split('');
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [localProduct, setSelectedProduct] = useState<Product | null>(null);
  const [localDrawerOpen, setIsDrawerOpen] = useState(false);
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const productId = params.get('product');
  const queryProduct = productId && /^\d+$/.test(productId) ? productsData.find(p => String(p.id) === productId) : undefined;
  const selectedProduct = queryProduct ?? localProduct;
  const isDrawerOpen = !!queryProduct || localDrawerOpen;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 9;
  const productHeading = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();
  const toolbar = usePublicToolbar<HTMLElement>();
  const focusFrame = useRef(0);
  const closingQuery = useRef(false);
  const restoreProduct = useRef<number | null>(null);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    if (!queryProduct) return;
    closingQuery.current = true;
    restoreProduct.current = queryProduct.id;
    const next = new URLSearchParams(location.search);
    next.delete('product');
    navigate({ pathname: '/products', search: next.toString() }, { replace: true });
  };
  useEffect(() => () => cancelAnimationFrame(focusFrame.current), []);

  useEffect(() => {
    const categoryParam = params.get('category');
    setIsDrawerOpen(false);
    if (queryProduct) {
      setActiveCategory(queryProduct.category);
      setSearchQuery('');
      const index = productsData.filter(p => p.category === queryProduct.category).findIndex(p => p.id === queryProduct.id);
      setCurrentPage(Math.floor(index / ITEMS_PER_PAGE) + 1);
      if (categoryParam !== queryProduct.category) {
        const normalized = new URLSearchParams(location.search);
        normalized.set('category', queryProduct.category);
        navigate({ pathname: '/products', search: normalized.toString() }, { replace: true });
      }
    } else {
      if (closingQuery.current) {
        closingQuery.current = false;
        // The keyed modal first releases native modality and its fallback focus.
        // Restore catalogue focus after that commit and queued native close event.
        focusFrame.current = requestAnimationFrame(() => {
          focusFrame.current = requestAnimationFrame(() => {
            const button = document.querySelector<HTMLButtonElement>(`[data-product-details="${restoreProduct.current}"]`);
            button?.scrollIntoView({ block: 'center', behavior: 'instant' });
            button?.focus({ preventScroll: true });
            restoreProduct.current = null;
          });
        });
        return;
      }
      setActiveCategory(categories.find(c => c.toLowerCase() === categoryParam?.toLowerCase()) ?? 'All');
      setCurrentPage(1);
    }
  }, [location.key]);

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `SKU-${product.id.toString().padStart(3, '0')}`.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-white text-modina-text pt-[112px] sm:pt-[72px] public-page">
      <Helmet>
        <title>Products | Modina Rim &amp; Parts Ltd. — 21 SKUs, Bangladesh</title>
        <meta name="description" content="Browse 21 automotive rim and parts products from Modina Rim &amp; Parts Ltd. — motorcycle rims, rickshaw rims, CNG rims, Easy Bike rims, and hardware. ISO-certified, Jashore Bangladesh." />
        <meta property="og:title" content="Products | Modina Rim &amp; Parts Ltd." />
        <meta property="og:description" content="21 SKUs of precision-manufactured automotive components. Motorcycle, rickshaw, CNG, Easy Bike rims and hardware." />
        <link rel="canonical" href="https://www.modinarim.com/products" />
      </Helmet>

      {/* ─── HERO ─── */}
      <section className="w-full public-task-hero flex flex-col items-center text-center bg-white border-b border-modina-divider">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 justify-center mb-10 text-sm text-modina-muted public-breadcrumb">
          <Link to="/" className="hover:text-modina-red transition-colors duration-200 font-medium">Home</Link>
          <ChevronRight className="w-4 h-4 text-modina-subtle" />
          <span className="text-modina-heading font-semibold">Products</span>
          <ChevronRight className="w-4 h-4 text-modina-subtle" />
          <span className="text-modina-muted">Catalog 2026</span>
        </div>

        <div className="w-16 h-0.5 bg-modina-red mx-auto mb-10" />

        <h1 className="font-display font-bold text-modina-heading uppercase leading-none flex items-center justify-center flex-wrap tracking-tight public-hero-title" >
          {letters.map((letter, i) =>
            letter === ' ' ? (
              <span key={i} className="w-[0.3em]">&nbsp;</span>
            ) : (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                {letter}
              </motion.span>
            )
          )}
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
          className="w-24 h-0.5 bg-modina-red mx-auto my-10"
        />

        <p className="text-modina-muted text-sm font-medium flex items-center justify-center flex-wrap gap-2 public-copy">
          <span>Modina Rim &amp; Parts Ltd.</span>
          <span className="text-modina-red">·</span>
          <span>Est. 2010</span>
          <span className="text-modina-red">·</span>
          <span>ISO 9001:2015</span>
        </p>

        <hr className="w-full max-w-md border-modina-border mx-auto mt-10 mb-10" />

        {/* Stats strip */}
        <div className="responsive-stat-strip grid w-full max-w-xl grid-cols-[1fr_auto_1fr_auto_1fr] items-center mx-auto">
          {[
            { value: '21', label: 'Products' },
            { value: '4', label: 'Categories' },
            { value: 'ISO', label: 'Certified' }
          ].map(({ value, label }, idx, arr) => (
            <React.Fragment key={label}>
              <div className="flex min-w-0 flex-col items-center px-1 py-2 sm:px-10">
                <span className="font-display font-bold text-modina-red" style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>{value}</span>
                <span className="text-center text-modina-muted text-[11px] sm:text-xs font-semibold uppercase tracking-wider sm:tracking-widest mt-1 break-words public-meta">{label}</span>
              </div>
              {idx < arr.length - 1 && <span className="w-px h-8 bg-modina-divider" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ─── FILTER BAR ─── */}
      <section ref={toolbar} className="public-sticky-toolbar sticky z-30 w-full bg-white/95 backdrop-blur-md border-b border-modina-border shadow-[var(--shadow-sm)]">
        <div className="container-premium flex min-h-[104px] flex-col-reverse gap-2 py-2 md:h-14 md:min-h-0 md:flex-row md:items-center md:justify-between md:py-0">
          {/* Category Filters */}
          <div className="flex w-full min-w-0 items-center gap-1 overflow-x-auto scrollbar-none md:w-auto">
            {categories.map((cat) => {
              const count = cat === 'All' ? productsData.length : productsData.filter((p) => p.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                  aria-label={`Filter by ${cat}`}
                  aria-pressed={isActive}
                  className={`public-filter px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out whitespace-nowrap ${
                    isActive
                      ? 'bg-modina-red text-white'
                      : 'text-modina-muted hover:text-modina-red hover:bg-modina-red/5'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Search + Count */}
          <div className="flex w-full items-center gap-5 shrink-0 md:w-auto">
            <span className="text-modina-muted text-sm font-medium hidden sm:block">
              {filteredProducts.length} Results
            </span>
            <div className="relative group w-full md:w-auto">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-modina-subtle group-focus-within:text-modina-red transition-colors duration-200" />
              <input
                type="text"
                placeholder="Search products..."
                aria-label="Search products"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-modina-bg-alt border border-modina-border rounded-lg py-2.5 pl-10 pr-4 text-base text-modina-text focus:outline-none focus:border-modina-red focus:ring-2 focus:ring-modina-red/20 transition-all duration-200 placeholder:text-modina-subtle md:w-36 md:text-sm md:focus:w-52"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRODUCT GRID ─── */}
      <section className="container-premium public-task-content">
        <h2 id="product-catalogue" tabIndex={-1} className="font-display font-bold public-section-title public-anchor mb-6">{t('public_ui.catalogue')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => {
                const isSelected = selectedProduct?.id === product.id && isDrawerOpen;
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35 }}
                    className={`card-premium flex flex-col overflow-hidden group ${isSelected ? 'ring-2 ring-modina-red' : ''}`}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden bg-modina-bg-alt aspect-[4/3]">
                      <ProductImageCarousel 
                        productId={product.id} 
                        productName={product.name} 
                        imageWidth={600} 
                        imageHeight={400} 
                        imageClassName="group-hover:scale-[1.04] transition-transform duration-500 ease-in-out"
                        images={product.images}
                      />
                      <span className="absolute top-4 right-4 bg-white/90 border border-modina-border rounded-full px-3 py-1 text-xs font-bold text-modina-muted z-20 pointer-events-none public-meta">
                        {product.category}
                      </span>
                    </div>

                    {/* Card Footer */}
                    <div className="p-6 flex flex-col gap-3 flex-1">
                      <h3 className="text-base font-display font-bold text-modina-heading group-hover:text-modina-red transition-colors duration-300  leading-snug public-card-title public-product-name">
                        {product.name}
                      </h3>
                      <p className="text-modina-muted text-sm leading-relaxed line-clamp-2 flex-1 public-copy">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-modina-divider mt-auto">
                        <span className="text-modina-subtle text-xs font-mono public-meta public-meta">
                          SKU–{product.id.toString().padStart(3, '0')}
                        </span>
                        <button
                          type="button"
                          data-product-details={product.id}
                          aria-label={`View details: ${product.name}`}
                          onClick={() => { setSelectedProduct(product); setIsDrawerOpen(true); }}
                          className="public-inline-action min-h-11 px-2 text-modina-red text-xs font-bold flex items-center gap-1.5 transition-all duration-300 ease-in-out"
                        >
                          View Details
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-32">
                <Minus className="w-8 h-8 text-modina-subtle mb-6" />
                <span className="text-modina-muted font-semibold text-base">No results found</span>
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); setCurrentPage(1); }}
                  className="mt-5 text-modina-red font-bold text-sm hover:underline transition-all"
                >
                  Clear Filter
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 grid grid-cols-2 items-center gap-3 border-t border-modina-border pt-8 sm:flex sm:justify-between">
            <button
              type="button"
              onClick={() => { setCurrentPage((p) => Math.max(1, p - 1)); scrollToPublicTarget('product-catalogue', true); }}
              disabled={currentPage === 1}
              className="btn-secondary w-full justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed sm:w-auto"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <span className="order-first col-span-2 text-center text-modina-muted font-semibold text-sm sm:order-none">
              Page {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => { setCurrentPage((p) => Math.min(totalPages, p + 1)); scrollToPublicTarget('product-catalogue', true); }}
              disabled={currentPage === totalPages}
              className="btn-secondary w-full justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed sm:w-auto"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* ─── PRODUCT DETAIL DRAWER ─── */}
      <PublicModal key={location.key} open={isDrawerOpen} onRequestClose={closeDrawer} labelledBy="product-detail-title" initialFocusRef={productHeading}>
        {selectedProduct && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
              data-public-backdrop
              className="fixed inset-0 bg-modina-heading/40 backdrop-blur-sm z-[70]"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: reduceMotion ? 0 : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: reduceMotion ? 0 : '100%' }}
              transition={{ type: 'tween', duration: reduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 h-full w-full max-w-[480px] md:max-w-[520px] bg-white z-[80] flex flex-col overflow-hidden border-l border-modina-border shadow-[var(--shadow-lg)]"
            >
              {/* Drawer Header */}
              <div className="sticky top-0 bg-white z-10 flex min-w-0 items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-5 border-b border-modina-border">
                <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
                  <span className="inline-flex items-center px-3 py-1 bg-modina-red/10 text-modina-red text-xs font-bold rounded-full uppercase tracking-wider public-meta">
                    {selectedProduct.category}
                  </span>
                  <span className="text-modina-subtle text-xs font-mono public-meta">
                    SKU–{selectedProduct.id.toString().padStart(3, '0')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="flex h-11 shrink-0 items-center gap-2 px-2 text-modina-muted hover:text-modina-red transition-colors duration-200 text-sm font-semibold"
                >
                  Close <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="min-h-0 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                {/* Product Image */}
                <div className="w-full aspect-[4/3] bg-modina-bg-alt overflow-hidden">
                  <ProductImageCarousel 
                    productId={selectedProduct.id} 
                    productName={selectedProduct.name} 
                    imageWidth={800} 
                    imageHeight={600}
                    images={selectedProduct.images}
                  />
                </div>

                {/* Content Block */}
                <div className="px-4 py-6 sm:px-8 sm:py-8 flex flex-col gap-0">
                  <h2 id="product-detail-title" ref={productHeading} tabIndex={-1} className="text-2xl font-display font-bold text-modina-heading leading-tight tracking-tight mb-2 public-section-title">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-modina-muted text-base leading-relaxed mb-8 mt-1 public-copy">
                    {selectedProduct.description}
                  </p>

                  {/* Spec Table */}
                  <div className="border border-modina-border rounded-[8px] overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        {[
                          { key: 'Material', value: selectedProduct.material },
                          { key: 'Certification', value: selectedProduct.certification },
                          { key: 'Min. Order', value: '50–100 Units' },
                          { key: 'Lead Time', value: '3–5 Business Days' },
                          { key: 'Category', value: selectedProduct.category },
                          { key: 'Availability', value: 'In Stock', highlight: true }
                        ].map(({ key, value, highlight }, idx) => (
                          <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-modina-bg-alt'}>
                            <td className="text-modina-muted text-sm font-semibold py-3.5 px-5 w-2/5">{key}</td>
                            <td className={`text-sm py-3.5 px-5 text-right font-medium ${highlight ? 'text-modina-success' : 'text-modina-text'}`}>{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Key Specs */}
                  <div className="mt-8 border-t border-modina-border pt-6">
                    <p className="text-modina-muted text-xs font-bold uppercase tracking-widest mb-5 public-meta">Key Specifications</p>
                    {[
                      'CNC-machined to ±0.01mm tolerance for perfect OEM fitment',
                      'Heat-treated high-carbon steel or premium alloy construction',
                      'ISO 9001:2015 certified manufacturing process throughout'
                    ].map((spec, i) => (
                      <div key={i} className="flex items-start gap-3 mb-4">
                        <span className="text-modina-red mt-1.5">—</span>
                        <span className="text-modina-muted text-sm leading-relaxed">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="public-drawer-actions sticky bottom-0 bg-white px-4 py-4 sm:px-8 sm:py-6 border-t border-modina-border flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate(`/contact?product=${encodeURIComponent(selectedProduct.name)}`);
                  }}
                  className="btn-primary w-full justify-center gap-3 group"
                >
                  Request Inquiry
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <Link
                  to="/downloads"
                  onClick={() => setIsDrawerOpen(false)}
                  className="btn-secondary w-full justify-center gap-3"
                >
                  Download Spec Sheet
                  <Download className="w-4 h-4" />
                </Link>
                <p className="text-modina-subtle text-xs text-center public-copy">Response within 24 business hours</p>
              </div>
            </motion.div>
          </>
        )}
      </PublicModal>

      {/* ─── BOTTOM CTA ─── */}
      <section className="w-full border-t border-modina-divider section-py bg-modina-bg-section">
        <div className="container-premium flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div>
            <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4 public-meta">— Partner With Us</p>
            <h2 className="font-display font-bold text-modina-heading tracking-tight leading-tight public-section-title" >
              Ready to Place<br />an Order?
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:+8801234567890" className="btn-primary gap-3 group">
              Contact Sales
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <Link to="/downloads" className="btn-secondary gap-3">
              Download Catalog
              <Download className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
