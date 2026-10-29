import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, ChevronRight, MapPin, Phone, Mail, Clock, Download } from 'lucide-react';
import { productsData } from '../lib/data';

export default function Contact() {
  const letters = 'GET IN TOUCH'.split('');
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '', subject: '', message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const edited = useRef({ subject: false, message: false });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const product = productsData.find(item => item.name === params.get('product'));
    setFormData((prev) => ({
      ...prev,
      subject: edited.current.subject ? prev.subject : product ? 'Product Inquiry' : '',
      message: edited.current.message ? prev.message : product
        ? `Hello,\n\nI am interested in the following product:\n${product.name}\n\nPlease send me pricing, MOQ, and lead time information.` : ''
    }));
  }, [location.search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target.name === 'subject' || e.target.name === 'message') edited.current[e.target.name] = true;
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  const contactDetails = [
    { icon: MapPin, label: 'Office Address', value: 'Plot S1/A, BSCIC Industrial Area, Jhumjhumpur, Jashore, Bangladesh' },
    { icon: Phone, label: 'Phone', value: '+880 1234 567890' },
    { icon: Mail, label: 'Email', value: 'sales@modinarim.com' },
    { icon: Clock, label: 'Business Hours', value: 'Sun–Thu: 9:00 AM – 6:00 PM' },
  ];

  const offices = [
    { num: '—01', city: 'Warehouse', address: 'Plot S1/A, BSCIC Industrial Area, Jhumjhumpur, Jashore', type: 'Headquarters & Manufacturing' },
    { num: '—02', city: 'Jashore Office', address: 'Placeholder — to be updated', type: 'Sales & Distribution' },
    { num: '—03', city: 'Jashore Factory', address: 'Placeholder — to be updated', type: 'Manufacturing' },
  ];

  const inputClass = 'w-full bg-white border border-modina-border rounded-lg px-4 py-3.5 text-base text-modina-text focus:outline-none focus:border-modina-red focus:ring-2 focus:ring-modina-red/20 transition-all duration-200 placeholder:text-modina-subtle';

  return (
    <div className="min-h-screen bg-white text-modina-text pt-[112px] sm:pt-[72px]">
      <Helmet>
        <title>Contact Us | Modina Rim &amp; Parts Ltd. — Jashore, Bangladesh</title>
        <meta name="description" content="Contact Modina Rim &amp; Parts Ltd. for product inquiries, distributor partnerships, and export orders. Plot S1/A, BSCIC Industrial Area, Jhumjhumpur, Jashore, Bangladesh." />
        <meta property="og:title" content="Contact | Modina Rim &amp; Parts Ltd." />
        <meta property="og:description" content="Reach our sales team at sales@modinarim.com or +880 1234 567890." />
        <link rel="canonical" href="https://www.modinarim.com/contact" />
      </Helmet>

      {/* ─── HERO ─── */}
      <section className="w-full py-20 lg:py-28 flex flex-col items-center text-center bg-white border-b border-modina-divider">
        <div className="flex items-center gap-2 justify-center mb-10 text-sm text-modina-muted">
          <Link to="/" className="hover:text-modina-red transition-colors duration-200 font-medium">Home</Link>
          <ChevronRight className="w-4 h-4 text-modina-subtle" />
          <span className="text-modina-heading font-semibold">Contact</span>
        </div>
        <div className="w-16 h-0.5 bg-modina-red mx-auto mb-10" />
        <h1 className="font-display font-bold text-modina-heading uppercase leading-none flex items-center justify-center flex-wrap tracking-tight" style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}>
          {letters.map((letter, i) =>
            letter === ' ' ? <span key={i} className="w-[0.25em]">&nbsp;</span> : (
              <motion.span key={i} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.045, ease: [0.16, 1, 0.3, 1] }}>{letter}</motion.span>
            )
          )}
        </h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.5 }} style={{ transformOrigin: 'left' }} className="w-24 h-0.5 bg-modina-red mx-auto my-10" />
        <p className="text-modina-muted text-sm font-medium flex items-center gap-2 flex-wrap justify-center">
          <span>Modina Rim &amp; Parts Ltd.</span><span className="text-modina-red">·</span>
          <span>Est. 2010</span><span className="text-modina-red">·</span>
          <span>Jashore, Bangladesh</span>
        </p>
        <hr className="w-full max-w-md border-modina-border mx-auto mt-10 mb-10" />
        <div className="responsive-stat-strip grid w-full max-w-xl grid-cols-[1fr_auto_1fr_auto_1fr] items-center mx-auto">
          {[
            { value: '24H', label: 'Response Time' },
            { value: '+880', label: 'Phone' },
            { value: '3', label: 'Offices' }
          ].map(({ value, label }, idx, arr) => (
            <React.Fragment key={label}>
              <div className="flex min-w-0 flex-col items-center px-1 py-2 sm:px-10 md:px-14">
                <span className="font-display font-bold text-modina-red" style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>{value}</span>
                <span className="text-modina-muted text-xs font-semibold uppercase tracking-widest mt-1">{label}</span>
              </div>
              {idx < arr.length - 1 && <span className="w-px h-8 bg-modina-divider" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ─── CONTACT SPLIT ─── */}
      <section className="w-full border-b border-modina-divider">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT: Form */}
          <div className="bg-white p-10 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-modina-border">
            <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4">— Send a Message</p>
            <h2 className="font-display font-bold text-modina-heading tracking-tight mb-10" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>Let's Talk</h2>

            {isSubmitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-start">
                <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4">— Message Sent</p>
                <p className="text-modina-muted text-base mb-8">We'll respond within 24 business hours.</p>
                <button
                  onClick={() => { setIsSubmitted(false); edited.current = { subject: false, message: false }; setFormData({ name: '', company: '', email: '', phone: '', subject: '', message: '' }); }}
                  className="btn-secondary"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }} className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-modina-muted text-xs font-bold uppercase tracking-wider">Full Name *</label>
                  <input required type="text" id="contact-name" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Your full name" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.13 }} className="flex flex-col gap-1.5">
                  <label htmlFor="contact-company" className="text-modina-muted text-xs font-bold uppercase tracking-wider">Company Name</label>
                  <input type="text" id="contact-company" name="company" value={formData.company} onChange={handleChange} className={inputClass} placeholder="Your company" />
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.16 }} className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-modina-muted text-xs font-bold uppercase tracking-wider">Email *</label>
                    <input required type="email" id="contact-email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.19 }} className="flex flex-col gap-1.5">
                    <label htmlFor="contact-phone" className="text-modina-muted text-xs font-bold uppercase tracking-wider">Phone</label>
                    <input type="tel" id="contact-phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+880 ..." />
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.22 }} className="flex flex-col gap-1.5">
                  <label htmlFor="contact-subject" className="text-modina-muted text-xs font-bold uppercase tracking-wider">Subject *</label>
                  <select required id="contact-subject" name="subject" value={formData.subject} onChange={handleChange} className={`${inputClass} cursor-pointer`}>
                    <option value="" disabled>Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Product Inquiry">Product Inquiry</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Quality Certification">Quality Certification</option>
                    <option value="Other">Other</option>
                  </select>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.25 }} className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-modina-muted text-xs font-bold uppercase tracking-wider">Message *</label>
                  <textarea required id="contact-message" name="message" value={formData.message} onChange={handleChange} rows={5} className={`${inputClass} resize-none`} placeholder="Tell us what you need..." />
                </motion.div>
                <motion.button
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.28 }}
                  type="submit"
                  className="btn-primary w-full justify-center gap-3 text-base mt-2 group"
                >
                  Send Message
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </form>
            )}
          </div>

          {/* RIGHT: Map & Details */}
          <div className="bg-modina-bg-alt flex flex-col">
            <div className="relative h-[280px] overflow-hidden rounded-none">
              <iframe
                title="Modina Rim &amp; Parts Ltd. — Factory Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.6!2d89.2182!3d23.1721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe7558b8c19bff%3A0x9e0ef7bfed2ab2f4!2sBSCIC%20Industrial%20Area%2C%20Jashore!5e0!3m2!1sen!2sbd!4v1715000000000!5m2!1sen!2sbd"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-10 flex flex-col gap-0 flex-grow">
              <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-6">— Reach Us</p>
              {contactDetails.map((detail, idx) => {
                const Icon = detail.icon;
                return (
                  <div key={idx} className="flex items-start gap-5 py-5 border-b border-modina-border last:border-0">
                    <div className="w-9 h-9 rounded-lg bg-modina-red/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-modina-red" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-modina-subtle text-xs font-bold uppercase tracking-wider">{detail.label}</p>
                      <p className="text-modina-text text-base font-medium">{detail.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── OFFICES ─── */}
      <section className="w-full border-b border-modina-divider bg-modina-bg-section section-py">
        <div className="container-premium mb-12">
          <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4">— Our Locations</p>
          <h2 className="font-display font-bold text-modina-heading tracking-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>Where to Find Us</h2>
        </div>
        <div className="container-premium grid grid-cols-1 md:grid-cols-3 gap-8">
          {offices.map((office, idx) => (
            <motion.div
              key={idx} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="card-premium p-8 lg:p-10 flex flex-col group cursor-default"
            >
              <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-5">{office.num}</p>
              <h3 className="font-display font-bold text-modina-heading mb-4" style={{ fontSize: 'clamp(20px, 2vw, 26px)' }}>{office.city}</h3>
              <hr className="border-modina-border mb-4" />
              <p className="text-modina-muted text-base leading-relaxed flex-grow">{office.address}</p>
              <p className="text-modina-subtle text-xs font-bold uppercase tracking-wider mt-6 group-hover:text-modina-red transition-colors duration-200">{office.type}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="w-full section-py bg-modina-heading" ref={ctaRef}>
        <div className="container-premium flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={ctaInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4">— Quick Response</p>
            <h2 className="font-display font-bold text-white tracking-tight leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Need Help Now?<br />Talk to Our Team
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} animate={ctaInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col sm:flex-row gap-4">
            <Link to="/products" className="btn-primary gap-3">View Products<ArrowRight className="w-4 h-4" /></Link>
            <Link to="/downloads" className="btn-secondary gap-3">Download Catalog<Download className="w-4 h-4" /></Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
