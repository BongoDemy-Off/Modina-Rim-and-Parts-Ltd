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
    heading: "1. Introduction",
    body: [
      "Modina Rim & Parts Ltd. ('Modina', 'we', 'our', 'us') is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard the information we receive from users of our website, located at www.modinarim.com ('Site').",
      "Please read this policy carefully. By using our Site, you consent to the data practices described in this policy. If you do not agree with the terms of this privacy policy, please do not access the Site.",
    ]
  },
  {
    heading: "2. Information We Collect",
    body: [
      "We may collect information about you in a variety of ways. The information we may collect on the Site includes:",
      "Personal Data: Personally identifiable information, such as your name, company name, email address, telephone number, and country, that you voluntarily give to us when you fill in our contact form or request a quotation.",
      "Usage Data: Information our servers automatically collect when you access the Site, such as your IP address, browser type, referring/exit pages, and the dates/times you access the Site.",
      "Cookies Data: We may use cookies, web beacons, and other tracking technologies to collect information about your activity on our Site. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.",
    ]
  },
  {
    heading: "3. Use of Your Information",
    body: [
      "Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:",
      "• Respond to your enquiries and provide information or quotations you request.",
      "• Send you our product catalog, technical documentation, or newsletters if you have opted in.",
      "• Monitor and analyse usage and trends to improve your experience with the Site.",
      "• Compile anonymous statistical data and analysis for use internally.",
      "• Investigate and prevent fraudulent transactions, unauthorized access to the Site, and other illegal activities.",
      "We do not sell, trade, or rent your personal information to third parties for marketing purposes.",
    ]
  },
  {
    heading: "4. Disclosure of Your Information",
    body: [
      "We may share information we have collected about you in certain situations. Your information may be disclosed as follows:",
      "By Law or to Protect Rights: If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.",
      "Business Transfers: We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.",
      "Third-Party Service Providers: We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance. These third parties are required to maintain appropriate data security and may not use your information for their own marketing purposes.",
    ]
  },
  {
    heading: "5. Security of Your Information",
    body: [
      "We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.",
      "Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.",
    ]
  },
  {
    heading: "6. Retention of Your Information",
    body: [
      "We retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.",
    ]
  },
  {
    heading: "7. Your Rights",
    body: [
      "Depending on your location, you may have the following rights in relation to your personal information:",
      "• The right to access — You have the right to request copies of your personal data.",
      "• The right to rectification — You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.",
      "• The right to erasure — You have the right to request that we erase your personal data, under certain conditions.",
      "• The right to restrict processing — You have the right to request that we restrict the processing of your personal data, under certain conditions.",
      "• The right to object to processing — You have the right to object to our processing of your personal data, under certain conditions.",
      "To exercise any of these rights, please contact us using the details in Section 9.",
    ]
  },
  {
    heading: "8. Third-Party Websites",
    body: [
      "The Site may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the Site, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information.",
      "We encourage you to review the privacy policies of any third-party sites you visit.",
    ]
  },
  {
    heading: "9. Contact Us",
    body: [
      "If you have questions or comments about this Privacy Policy, please contact us at:",
      "Modina Rim & Parts Ltd.",
      "House No. 18/5, Jhumjhumpur",
      "BSCIC Industrial Area",
      "Jashore, Bangladesh",
      "Email: privacy@modinarim.com",
      "Phone: +880 421 72345",
    ]
  }
];

export default function Privacy() {
  const letters = "PRIVACY".split("");
  
  const introRef = useRef(null);
  const introInView = useInView(introRef, { once: true, margin: '-80px' });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  return (
    <div className="min-h-screen bg-white text-modina-text pt-[112px] sm:pt-[72px] public-page">
      <Helmet>
        <title>Privacy Policy | Modina Rim &amp; Parts Ltd.</title>
        <meta name="description" content="Privacy Policy for Modina Rim & Parts Ltd. — how we collect, use, and protect your personal information on our website and in our business dealings." />
        <link rel="canonical" href="https://www.modinarim.com/privacy" />
      </Helmet>

      {/* SECTION 1 — HERO */}
      <section className="w-full public-section flex flex-col items-center text-center bg-white border-b border-modina-divider">
        <div className="text-xs font-bold tracking-widest text-modina-subtle uppercase flex items-center gap-2 justify-center mb-10 public-breadcrumb">
          <Link to="/" className="hover:text-modina-red transition-colors duration-300">Home</Link>
          <ChevronRight className="w-2.5 h-2.5 text-modina-subtle" />
          <span className="text-modina-muted">Privacy Policy</span>
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
          <span>Privacy Policy</span>
          <span className="text-modina-red">·</span>
          <span>Effective: January 2026</span>
        </p>

        <div className="flex flex-col items-center gap-3 mt-14">
          <motion.div 
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top' }}
            className="w-[0.5px] h-10 bg-modina-divider" 
          />
          <span className="text-xs font-bold tracking-widest text-modina-red uppercase public-meta">Scroll</span>
        </div>
      </section>

      {/* SECTION 2 — INTRO STATEMENT */}
      <section className="w-full border-b border-modina-divider bg-modina-bg-alt py-16 lg:py-20" ref={introRef}>
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={introInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="container-premium max-w-3xl public-reading"
        >
          <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-6 public-meta">— Our Commitment</p>
          <p className="text-xl md:text-2xl font-light text-modina-heading tracking-tight leading-relaxed public-body">
            Modina Rim &amp; Parts Ltd. treats your personal data with the same precision and care that we apply to every component we manufacture. Your privacy is our responsibility.
          </p>
        </motion.div>
      </section>

      {/* SECTION 3 — POLICY BODY */}
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
              Get in Touch<br />With Our Team
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
            <Link to="/terms" className="btn-secondary flex items-center gap-4">
              Terms of Service
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
