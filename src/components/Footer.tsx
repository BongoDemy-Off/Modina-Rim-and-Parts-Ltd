import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-modina-border text-modina-text">
      {/* PART 1 — TOP IDENTITY BAR */}
      <div className="border-b border-modina-divider py-10">
        <div className="container-premium flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* LEFT — Brand block */}
          <div className="flex min-w-0 items-center gap-4 sm:gap-5">
            <Link to="/" className="w-14 h-14 bg-white flex items-center justify-center shrink-0 rounded-xl border border-modina-border shadow-[var(--shadow-sm)]">
              <Logo className="w-9 h-9 object-contain" />
            </Link>
            <div className="flex min-w-0 flex-col gap-1">
              <span className="font-display font-bold text-modina-heading text-sm sm:text-base tracking-tight">MODINA RIM &amp; PARTS LTD.</span>
              <span className="text-modina-muted text-sm font-medium">{t('footer.established')}</span>
            </div>
          </div>

          {/* CENTER — Divider */}
          <div className="hidden lg:block w-px h-10 bg-modina-divider mx-6" />

          {/* RIGHT — Stats */}
          <div className="grid w-full grid-cols-[1fr_auto_1fr_auto_1fr] items-center sm:w-auto">
            <div className="flex min-w-0 flex-col items-center px-2 py-2 sm:px-8">
              <span className="text-2xl font-bold text-modina-red">ISO</span>
              <span className="text-modina-muted text-xs font-medium mt-1 public-meta">Certified</span>
            </div>
            <div className="w-px h-8 bg-modina-divider" />
            <div className="flex min-w-0 flex-col items-center px-2 py-2 sm:px-8">
              <span className="text-2xl font-bold text-modina-red">15+</span>
              <span className="text-modina-muted text-xs font-medium mt-1 public-meta">Years</span>
            </div>
            <div className="w-px h-8 bg-modina-divider" />
            <div className="flex min-w-0 flex-col items-center px-2 py-2 sm:px-8">
              <span className="text-2xl font-bold text-modina-red">21+</span>
              <span className="text-modina-muted text-xs font-medium mt-1 public-meta">Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* PART 2 — MAIN CONTENT GRID */}
      <div className="border-b border-modina-divider">
        <div className="container-premium py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

            {/* CELL 1 — Company description */}
            <div>
              <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-5 public-meta">— {t('footer.about')}</p>
              <p className="text-[15px] text-modina-muted leading-relaxed mb-8 public-copy">
                {t('footer.tagline')}
              </p>
              <div>
                <p className="text-modina-subtle text-xs font-semibold uppercase tracking-wider mb-3 public-meta">— {t('footer.stay_updated')}</p>
                <div className="flex gap-0 border border-modina-border rounded-lg overflow-hidden">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="min-w-0 flex-1 bg-transparent focus:outline-none text-base text-modina-text placeholder:text-modina-subtle py-3 px-4 transition-colors"
                  />
                  <button type="button" className="bg-modina-red px-4 py-3 text-white text-xs font-bold tracking-wider uppercase hover:bg-modina-red-dark transition-colors duration-200 public-meta">
                    {t('footer.join')}
                  </button>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-3 border-t border-modina-divider pt-6">
                {[
                  { Icon: Facebook, href: '#' },
                  { Icon: Twitter, href: '#' },
                  { Icon: Linkedin, href: '#' },
                  { Icon: Instagram, href: '#' }
                ].map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="w-9 h-9 rounded-lg border border-modina-border flex items-center justify-center text-modina-muted hover:text-modina-red hover:border-modina-red/40 hover:bg-modina-red/5 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* CELL 2 — Company links */}
            <div>
              <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-5 public-meta">— {t('footer.company')}</p>
              <div className="flex flex-col">
                {[
                  { label: t('nav.about'), path: '/about' },
                  { label: t('nav.gallery'), path: '/gallery' },
                  { label: t('nav.faq'), path: '/faq' },
                  { label: t('nav.sustainability'), path: '/sustainability' },
                  { label: t('nav.quality_dropdown'), path: '/quality' },
                  { label: t('nav.news'), path: '/news' }
                ].map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.path}
                    className="flex items-center justify-between py-3.5 border-b border-modina-divider text-[15px] text-modina-muted font-medium hover:text-modina-red transition-colors duration-200 group"
                  >
                    {link.label}
                    <ChevronRight className="w-4 h-4 text-modina-red opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* CELL 3 — Products links */}
            <div>
              <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-5 public-meta">— {t('footer.products_label')}</p>
              <div className="flex flex-col">
                {[
                  { label: t('footer.view_all'), path: '/products' },
                  { label: t('footer.motorcycle'), path: '/products?category=Motorcycle' },
                  { label: t('footer.rims'), path: '/products?category=Rims' },
                  { label: t('footer.hardware'), path: '/products?category=Hardware' },
                  { label: t('nav.downloads'), path: '/downloads' },
                  { label: t('common.contact_us'), path: '/contact' }
                ].map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.path}
                    className="flex items-center justify-between py-3.5 border-b border-modina-divider text-[15px] text-modina-muted font-medium hover:text-modina-red transition-colors duration-200 group"
                  >
                    {link.label}
                    <ChevronRight className="w-4 h-4 text-modina-red opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* CELL 4 — Contact info */}
            <div>
              <p className="text-modina-red text-xs font-bold tracking-widest uppercase mb-5 public-meta">— {t('nav.contact')}</p>
              <div className="flex flex-col gap-4">
                {[
                  { Icon: MapPin, label: 'Address', value: 'Plot S1/A, BSCIC Industrial Area, Jhumjhumpur, Jashore, Bangladesh' },
                  { Icon: Phone, label: 'Phone', value: '+880 1234 567890' },
                  { Icon: Mail, label: 'Email', value: 'sales@modinarim.com' },
                  { Icon: Clock, label: 'Hours', value: 'Sun–Thu: 9AM – 6PM' }
                ].map(({ Icon, label, value }, idx) => (
                  <div key={idx} className="flex items-start gap-4 py-3 border-b border-modina-divider last:border-0">
                    <div className="w-8 h-8 rounded-lg bg-modina-red/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-modina-red" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-modina-subtle text-xs font-semibold uppercase tracking-wider public-meta">{label}</span>
                      <span className="text-modina-text text-sm font-medium leading-snug">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PART 3 — BOTTOM BAR */}
      <div className="container-premium py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-modina-muted text-sm">
          © {new Date().getFullYear()} Modina Rim &amp; Parts Ltd. {t('footer.rights')}
        </p>
        <p className="hidden md:block text-modina-muted text-sm">
          🇧🇩 Made in Bangladesh
        </p>
        <div className="flex items-center gap-1">
          <Link to="/privacy" className="text-modina-muted text-sm font-medium hover:text-modina-red transition-colors duration-200 px-4 py-1 border-r border-modina-divider">
            {t('footer.privacy')}
          </Link>
          <Link to="/terms" className="text-modina-muted text-sm font-medium hover:text-modina-red transition-colors duration-200 px-4 py-1">
            {t('footer.terms')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
