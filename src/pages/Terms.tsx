import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface PolicySection {
  heading: string;
  body: string[];
}

const sections: PolicySection[] = [
  {
    heading: "1. Acceptance of Terms",
    body: [
      "By accessing and using the website located at www.modinarim.com ('Site'), you accept and agree to be bound by these Terms of Service ('Terms'). These Terms apply to all visitors, users, and others who access or use the Site.",
      "Modina Rim & Parts Ltd. ('Modina', 'we', 'our', 'us') reserves the right to update and change these Terms at any time without notice. Continued use of the Site after any such changes constitutes your consent to such changes.",
      "If you do not agree with any of these Terms, you are prohibited from using or accessing this Site.",
    ]
  },
  {
    heading: "2. Use of the Site",
    body: [
      "You may use the Site only for lawful purposes and in accordance with these Terms. You agree not to use the Site:",
      "• In any way that violates any applicable national or international law or regulation.",
      "• To transmit, or procure the sending of, any unsolicited or unauthorized advertising or promotional material.",
      "• To impersonate or attempt to impersonate Modina, a Modina employee, another user, or any other person or entity.",
      "• To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Site, or which may harm Modina or users of the Site.",
      "Modina reserves the right to terminate your access to the Site for any violation of these Terms.",
    ]
  },
  {
    heading: "3. Intellectual Property Rights",
    body: [
      "The Site and its original content, features, and functionality are and will remain the exclusive property of Modina Rim & Parts Ltd. and its licensors. The Site is protected by copyright, trademark, and other laws of Bangladesh and foreign countries.",
      "Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Modina. All product names, logos, and brands are property of their respective owners.",
      "You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Site without our prior written permission.",
    ]
  },
  {
    heading: "4. Disclaimer of Warranties",
    body: [
      "The Site is provided on an 'as is' and 'as available' basis, without any warranties of any kind, either express or implied. Modina does not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.",
      "Modina makes no representations or warranties about the accuracy or completeness of the content of the Site or the content of any sites linked to the Site, and assumes no liability or responsibility for any errors or omissions in the content.",
      "Product specifications, pricing, and availability displayed on the Site are subject to change without notice. Please contact our sales team for current confirmed pricing and availability.",
    ]
  },
  {
    heading: "5. Limitation of Liability",
    body: [
      "To the fullest extent permitted by applicable law, Modina Rim & Parts Ltd. shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:",
      "• Your access to or use of (or inability to access or use) the Site.",
      "• Any conduct or content of any third party on the Site.",
      "• Any content obtained from the Site.",
      "• Unauthorized access, use, or alteration of your transmissions or content.",
      "Our total liability in any matter arising out of or related to the Site will not exceed USD 100 or the amount you have paid us in the past 12 months, whichever is greater.",
    ]
  },
  {
    heading: "6. Product Orders and Quotations",
    body: [
      "Any quotation or price indication provided through the Site is not an offer to supply at those prices. All orders are subject to acceptance by Modina and to the availability of products.",
      "Modina reserves the right to refuse any order or to supply a lesser quantity than that ordered. Where we accept an order, a contract is formed when we confirm the order in writing.",
      "All product orders are subject to our standard terms and conditions of sale, which are available upon request. In the event of any conflict between these Terms of Service and our terms and conditions of sale, the terms and conditions of sale shall prevail.",
    ]
  },
  {
    heading: "7. Governing Law",
    body: [
      "These Terms and any dispute or claim arising out of, or related to, them, their subject matter, or their formation shall be governed by and construed in accordance with the laws of the People's Republic of Bangladesh.",
      "Any legal action or proceeding arising under these Terms will be brought exclusively in courts located in Jashore, Bangladesh, and you hereby consent to the personal jurisdiction and venue therein.",
    ]
  },
  {
    heading: "8. Links to Third-Party Websites",
    body: [
      "The Site may contain links to third-party websites or services that are not owned or controlled by Modina. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.",
      "We strongly advise you to read the terms and conditions and privacy policies of any third-party sites you visit. Modina shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by the use of any third-party content, goods, or services.",
    ]
  },
  {
    heading: "9. Changes to Terms",
    body: [
      "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.",
      "By continuing to access or use our Site after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Site.",
    ]
  },
  {
    heading: "10. Contact Information",
    body: [
      "If you have questions about these Terms, please contact us at:",
      "Modina Rim & Parts Ltd.",
      "House No. 18/5, Jhumjhumpur",
      "BSCIC Industrial Area",
      "Jashore, Bangladesh",
      "Email: legal@modinarim.com",
      "Phone: +880 421 72345",
    ]
  }
];

export default function Terms() {
  const letters = "TERMS".split("");

  const introRef = useRef(null);
  const introInView = useInView(introRef, { once: true, margin: '-80px' });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  return (
    <div className="min-h-screen bg-white text-modina-text pt-[112px] sm:pt-[72px] public-page">
      <Helmet>
        <title>Terms of Service | Modina Rim &amp; Parts Ltd.</title>
        <meta name="description" content="Terms of Service for Modina Rim & Parts Ltd. — governing use of our website, intellectual property, product orders, disclaimers, and applicable Bangladesh law." />
        <link rel="canonical" href="https://www.modinarim.com/terms" />
      </Helmet>

      {/* SECTION 1 — HERO */}
      <section className="w-full public-task-hero flex flex-col items-center text-center bg-white border-b border-modina-divider">
        <div className="text-xs font-bold tracking-widest text-modina-subtle uppercase flex items-center gap-2 justify-center mb-10 public-breadcrumb">
          <Link to="/" className="hover:text-modina-red transition-colors duration-300">Home</Link>
          <ChevronRight className="w-2.5 h-2.5 text-modina-subtle" />
          <span className="text-modina-muted">Terms of Service</span>
        </div>

        <div className="w-24 h-[2px] bg-modina-red mx-auto mb-10" />

        <h1 className="font-display font-bold tracking-tight text-modina-heading uppercase leading-none flex items-center justify-center flex-wrap public-hero-title">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
          className="w-32 h-[1px] bg-modina-red mx-auto my-10"
        />

        <p className="text-xs font-bold tracking-widest text-modina-muted uppercase flex items-center justify-center flex-wrap gap-2 public-meta">
          <span>Modina Rim &amp; Parts Ltd.</span>
          <span className="text-modina-red">·</span>
          <span>Terms of Service</span>
          <span className="text-modina-red">·</span>
          <span>Effective: January 2026</span>
        </p>


      </section>

      {/* SECTION 2 — INTRO STATEMENT */}
      <section className="w-full border-b border-modina-divider bg-modina-bg-alt public-section-compact" ref={introRef}>
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={introInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="container-premium max-w-3xl public-reading"
        >
          <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-6 public-meta">— Legal Agreement</p>
          <p className="text-xl md:text-2xl font-light text-modina-heading tracking-tight leading-relaxed public-body">
            These Terms of Service govern your use of the Modina Rim &amp; Parts Ltd. website and our dealings with you. Please read them carefully before engaging with us.
          </p>
        </motion.div>
      </section>

      {/* SECTION 3 — TERMS BODY */}
      <section className="w-full border-b border-modina-divider public-section bg-white">
        <div className="container-premium max-w-3xl public-reading">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-14"
            >
              <h2 className="font-display font-bold text-modina-heading text-xl md:text-2xl tracking-tight mb-6 border-b border-modina-divider pb-4 public-card-title">
                {section.heading}
              </h2>
              {section.body.map((para, pIdx) => (
                <p key={pIdx} className="text-[15px] text-modina-muted font-light leading-relaxed mb-4 public-body">
                  {para}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — CTA BANNER */}
      <section className="w-full border-t border-modina-divider public-section bg-modina-heading public-dark" ref={ctaRef}>
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
            <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-4 public-meta">— Have Questions?</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight public-section-title">
              Contact Our<br />Legal Team
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
            <Link to="/privacy" className="btn-secondary flex items-center gap-4">
              Privacy Policy
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
