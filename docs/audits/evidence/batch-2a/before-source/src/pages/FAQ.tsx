import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Plus, Minus, Search, ArrowRight } from 'lucide-react';

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  // Products & Ordering
  { id: 1,  category: 'Products',  question: 'What products does Modina Rim & Parts Ltd. manufacture?', answer: 'Modina manufactures 21 SKUs across 3 major categories: Motorcycle Parts (center stands, double stands, foot rest rods, handlebars, leg guards, sharee guards), Premium Rims (Easy Bike, Rickshaw, CNG, Cycle, Mishuk, Nosimon, Patti, and VAN Rickshaw rims in various specifications), and Hardware (box frame bearings, van spokes, washers). All products are ISO 9001:2015 certified.' },
  { id: 2,  category: 'Products',  question: 'What is the minimum order quantity (MOQ)?', answer: 'Our standard MOQ varies by product category. For rims, the typical MOQ is 100 units per SKU. For motorcycle parts and hardware, MOQ starts at 50 units. For large distributor partnerships, we can discuss customized MOQs. Please contact our sales team at sales@modinarim.com for specific product MOQs.' },
  { id: 3,  category: 'Products',  question: 'Do you offer custom specifications or OEM manufacturing?', answer: 'Yes. We offer OEM manufacturing for registered distributors and large volume buyers. Custom dimensions, finishes (black, white, nickel plating), and packaging can be arranged. Minimum lead time for custom orders is typically 4–6 weeks from confirmed specification. Contact us with your technical drawings or specifications.' },
  { id: 4,  category: 'Products',  question: 'Are all products in stock year-round?', answer: 'Our core product range is maintained in regular inventory. However, some specialized variants (e.g., VAN Rickshaw Gold Rim, Rickshaw Japan Rim) may have longer lead times during peak seasons. We recommend placing orders at least 2–3 weeks in advance for large quantities. Our team will confirm availability upon inquiry.' },

  // Quality & Certifications
  { id: 5,  category: 'Quality',   question: 'What certifications does Modina hold?', answer: 'Modina Rim & Parts Ltd. holds three internationally recognized certifications: ISO 9001:2015 (Quality Management System), ISO 14001:2015 (Environmental Management System), and ISO 45001:2018 (Occupational Health & Safety Management System). All certifications are issued by LMS Certification Limited and are subject to annual surveillance audits.' },
  { id: 6,  category: 'Quality',   question: 'What is your quality inspection process?', answer: 'We follow a 6-stage quality assurance process: (1) Raw Material Inspection — all incoming steel and alloy verified against spec sheets; (2) Precision Cutting — CNC-guided cutting to ±0.01mm tolerance; (3) Heat Treatment — controlled furnace hardening; (4) Surface Finishing — electroplating and powder coating; (5) Dimensional QC — 100% inspection with calibrated measurement tools; (6) Final Certification — ISO 9001:2015 batch sign-off before dispatch.' },
  { id: 7,  category: 'Quality',   question: 'Can I request a product sample before placing a bulk order?', answer: 'Yes, samples are available for registered business buyers. A sample fee (cost + shipping) is charged upfront. If you proceed with a qualifying bulk order, the sample fee is deducted from your first invoice. Please submit a sample request through our Contact page, specifying the product SKU and quantity needed.' },
  { id: 8,  category: 'Quality',   question: 'What materials are used in your rim manufacturing?', answer: 'Our rims are manufactured using Premium Grade Alloy for maximum strength-to-weight ratio. Motorcycle parts use Reinforced Steel Alloy, Chromoly Steel, or Forged Steel depending on the application. Hardware components use High-Carbon Steel, High-Tensile Steel, or Galvanized Steel. All raw materials are sourced from certified suppliers and inspected upon arrival.' },

  // Shipping & Delivery
  { id: 9,  category: 'Shipping',  question: 'Do you ship across all of Bangladesh?', answer: 'Yes. We deliver to all 64 districts of Bangladesh through our logistics network. Delivery times are typically 1–3 business days for Dhaka and major cities, and 3–5 business days for more remote areas. We work with established freight partners to ensure safe and on-time delivery.' },
  { id: 10, category: 'Shipping',  question: 'Do you export internationally?', answer: 'Yes, we export to regional markets including India, Nepal, and Myanmar. For international orders, we support FOB (Free On Board) and CIF (Cost, Insurance, Freight) terms. Export documentation including Certificate of Origin, Packing List, Commercial Invoice, and Bill of Lading is provided. Please contact our export desk for current pricing and lead times.' },
  { id: 11, category: 'Shipping',  question: 'What is the standard lead time for orders?', answer: 'For in-stock products: 3–5 business days for order processing and dispatch. For large orders (500+ units): 7–14 business days. For custom/OEM orders: 4–6 weeks from confirmed specification. All lead times are estimates and may vary during peak seasons (Eid, year-end). We will confirm exact dispatch timelines upon order confirmation.' },
  { id: 12, category: 'Shipping',  question: 'How is packaging done for bulk shipments?', answer: 'Products are packed in industrial-grade corrugated cartons with foam padding for fragile items. Rims are bundled in groups of 10 with protective wrapping. All packages are clearly labeled with SKU, quantity, batch number, and destination. For export shipments, we comply with international packaging standards (ISPM 15 for wooden packaging materials).' },

  // Pricing & Payment
  { id: 13, category: 'Pricing',   question: 'How do I get a price quote?', answer: 'Submit an inquiry through our Contact page or email sales@modinarim.com with: (1) product names or SKUs, (2) required quantities, and (3) delivery location. Our sales team will respond within 24 business hours with a detailed quotation including unit price, total cost, and estimated delivery date.' },
  { id: 14, category: 'Pricing',   question: 'What payment methods do you accept?', answer: 'We accept: Bank Transfer (NPSB, BEFTN, RTGS), Mobile Banking (bKash, Nagad — for smaller orders), Letter of Credit (L/C) for export orders, and cheque payment for established accounts. For first-time buyers, we typically require advance payment or partial advance. Long-term distributor accounts may be eligible for credit terms.' },
  { id: 15, category: 'Pricing',   question: 'Do you offer distributor or volume discounts?', answer: 'Yes. We operate a tiered pricing structure based on order volume and partnership level. Authorized distributors receive preferential pricing, priority allocation during high-demand periods, and dedicated account management. Contact our sales team to discuss becoming an authorized Modina distributor.' },

  // Company & Distributors
  { id: 16, category: 'Company',   question: 'Where is Modina Rim & Parts Ltd. located?', answer: 'Our manufacturing facility and headquarters are located at Plot S1/A, BSCIC Industrial Area, Jhumjhumpur, Jashore, Bangladesh. We also maintain sales offices in Dhaka. Business hours are Sunday to Thursday, 9:00 AM – 6:00 PM.' },
  { id: 17, category: 'Company',   question: 'How long has Modina been in business?', answer: 'Modina Rim & Parts Ltd. was established in 2010, giving us over 15 years of experience in precision automotive component manufacturing. Over this period, we have grown to a team of 150+ employees and built a distribution network spanning all of Bangladesh, with growing export operations across South Asia.' },
  { id: 18, category: 'Company',   question: 'How can I become an authorized distributor?', answer: 'We are selectively expanding our authorized distributor network. To apply, submit your business profile (company registration, trade license, current product range) through our Contact page with subject "Distributor Partnership". Our business development team will evaluate your application and schedule a discussion within 5–7 business days.' },
];

const categories = ['All', 'Products', 'Quality', 'Shipping', 'Pricing', 'Company'];

export default function FAQ() {
  const letters = 'FAQ'.split('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openId, setOpenId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return faqs.filter(f => {
      const matchesCat = activeCategory === 'All' || f.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q) || f.category.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggle = (id: number) => setOpenId(prev => prev === id ? null : id);

  return (
    <div className="min-h-screen bg-modina-bg text-modina-text pt-[112px] sm:pt-[72px]">
      <Helmet>
        <title>FAQ | Modina Rim &amp; Parts Ltd. — Frequently Asked Questions</title>
        <meta name="description" content="Frequently asked questions about Modina Rim & Parts Ltd. — product specifications, minimum order quantities, ISO certifications, shipping across Bangladesh, export terms, pricing, and distributor partnerships." />
        <link rel="canonical" href="https://www.modinarim.com/faq" />
      </Helmet>

      {/* SECTION 1 — HERO */}
      <section className="w-full py-20 lg:py-28 flex flex-col items-center text-center bg-modina-bg">
        <div className="text-modina-red text-xs font-bold tracking-widest uppercase flex items-center gap-2 justify-center mb-10">
          <Link to="/" className="hover:text-modina-red transition-all duration-300 ease-in-out text-modina-muted">Home</Link>
          <ChevronRight className="w-2.5 h-2.5 text-modina-subtle" />
          <span className="text-modina-muted">FAQ</span>
        </div>
        <div className="w-24 h-[2px] bg-modina-red mx-auto mb-10" />
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] font-display font-bold tracking-tight text-modina-heading uppercase leading-none flex items-center justify-center flex-wrap">
          {letters.map((letter, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }}>
              {letter}
            </motion.span>
          ))}
        </h1>
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
          className="w-32 h-[1px] bg-modina-red mx-auto my-10"
        />
        <p className="text-modina-red text-xs font-bold tracking-widest uppercase flex items-center justify-center flex-wrap gap-2">
          <span>{faqs.length} Questions</span>
          <span className="text-modina-red">·</span>
          <span>{categories.length - 1} Categories</span>
          <span className="text-modina-red">·</span>
          <span>Modina Rim &amp; Parts Ltd.</span>
        </p>

      </section>

      {/* SECTION 2 — FILTER + SEARCH BAR */}
      <div className="sticky top-[112px] sm:top-16 z-30 w-full bg-white/90 backdrop-blur-md border-t border-modina-border border-b shadow-design-sm">
        <div className="container mx-auto flex min-h-[104px] flex-col-reverse gap-2 px-4 py-2 md:px-12 xl:h-14 xl:min-h-0 xl:flex-row xl:items-center xl:justify-between xl:px-24 xl:py-0">
          {/* Category pills */}
          <div className="flex w-full min-w-0 items-center gap-0 overflow-x-auto no-scrollbar xl:w-auto xl:shrink-0">
            {categories.map((cat, idx) => {
              const count = cat === 'All' ? faqs.length : faqs.filter(f => f.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <div key={cat} className="flex items-center h-full">
                  <button
                    type="button"
                    onClick={() => { setActiveCategory(cat); setOpenId(null); }}
                    className={`relative px-5 h-14 text-xs font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-300 ease-in-out ${isActive ? 'text-modina-heading' : 'text-modina-muted hover:text-modina-red'}`}
                  >
                    {cat} ({count})
                    {isActive && <motion.span layoutId="activeFaqCat" className="absolute bottom-0 left-0 w-full h-[1px] bg-modina-red" />}
                  </button>
                  {idx < categories.length - 1 && <span className="w-[0.5px] h-5 bg-modina-divider shrink-0" />}
                </div>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative flex w-full items-center shrink-0 xl:w-auto">
            <Search className="w-3.5 h-3.5 text-modina-subtle absolute left-0" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setOpenId(null); }}
              className="w-full bg-transparent border-b border-modina-divider focus:border-modina-red outline-none text-base text-modina-heading placeholder:text-modina-subtle transition-all pl-6 pb-1 xl:w-36 xl:text-xs xl:focus:w-52"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3 — FAQ ACCORDION */}
      <section className="container mx-auto px-6 md:px-12 lg:px-24 py-16 lg:py-24 max-w-4xl">
        {filtered.length > 0 ? (
          <div className="flex flex-col gap-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {filtered.map((faq, idx) => {
                const isOpen = openId === faq.id;
                return (
                  <motion.div
                    key={faq.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    className={`card-premium relative group ${isOpen ? 'shadow-design-md' : ''}`}
                  >
                    {/* Hover/open top line */}
                    <div className={`absolute top-0 left-0 h-[1px] bg-modina-red transition-all duration-500 ease-in-out rounded-tl-[12px] rounded-tr-[12px] ${isOpen ? 'w-full' : 'w-0 group-hover:w-full'}`} />

                    {/* Question row */}
                    <button
                      type="button"
                      onClick={() => toggle(faq.id)}
                      className="w-full text-left px-6 md:px-8 py-6 flex items-start justify-between gap-6"
                    >
                      <div className="flex-1">
                        <span className={`text-xs font-bold tracking-widest uppercase mb-2 block ${isOpen ? 'text-modina-red' : 'text-modina-subtle group-hover:text-modina-red'} transition-all duration-300 ease-in-out`}>
                          {faq.category}
                        </span>
                        <span className={`font-display font-bold text-lg md:text-xl tracking-tight leading-snug transition-all duration-300 ease-in-out ${isOpen ? 'text-modina-heading' : 'text-modina-muted group-hover:text-modina-heading'}`}>
                          {faq.question}
                        </span>
                      </div>
                      <div className={`w-6 h-6 border flex items-center justify-center shrink-0 mt-1 transition-all duration-300 ease-in-out ${isOpen ? 'border-modina-red bg-modina-red/10' : 'border-modina-border group-hover:border-modina-red'}`}>
                        {isOpen
                          ? <Minus className="w-3 h-3 text-modina-red" />
                          : <Plus className="w-3 h-3 text-modina-subtle group-hover:text-modina-red transition-all duration-300 ease-in-out" />
                        }
                      </div>
                    </button>

                    {/* Answer */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 md:px-8 pb-8 border-t border-modina-divider pt-5">
                            <p className="text-[14px] text-modina-muted leading-relaxed font-light">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Minus className="w-8 h-8 text-modina-subtle mb-6" />
            <p className="text-modina-muted text-xs font-bold tracking-widest uppercase mb-6">No results found</p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="text-modina-muted text-xs font-bold tracking-widest uppercase hover:text-modina-red transition-all duration-300 ease-in-out"
            >
              — Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* SECTION 4 — STILL HAVE QUESTIONS */}
      <section className="w-full border-t border-modina-border py-24 lg:py-32 bg-modina-heading">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 w-1 h-20 bg-modina-red" />
            <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4">— Still Have Questions?</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              Talk to Our<br />Sales Team
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact" className="btn-primary flex items-center gap-4">
              Contact Us
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/products" className="btn-secondary flex items-center gap-4">
              Browse Products
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
