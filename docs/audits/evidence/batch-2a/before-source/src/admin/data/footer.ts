import type { FooterSettings } from '../types/footer';

export const footerSettings: FooterSettings = {
  established: { en: 'Est. 2010 — Jashore, Bangladesh', bn: 'প্রতিষ্ঠা ২০১০ — যশোর, বাংলাদেশ' },
  tagline: { en: 'Precision-engineered automotive components for domestic and international markets.', bn: 'দেশীয় ও আন্তর্জাতিক বাজারের জন্য নির্ভুল প্রকৌশলে তৈরি অটোমোটিভ যন্ত্রাংশ।' },
  newsletter: {
    heading: { en: 'Stay Updated', bn: 'আপডেট থাকুন' },
    explanatoryCopy: { en: '', bn: '' },
    inputPlaceholder: { en: 'your@email.com', bn: 'your@email.com' },
    buttonLabel: { en: 'Join', bn: 'যুক্ত হোন' },
  },
  linkGroups: [
    { id: 'company', title: { en: 'Company', bn: 'কোম্পানি' }, links: [
      { id: 'about', label: { en: 'About Us', bn: 'আমাদের সম্পর্কে' }, target: '/about', order: 1 },
      { id: 'gallery', label: { en: 'Gallery', bn: 'গ্যালারি' }, target: '/gallery', order: 2 },
      { id: 'faq', label: { en: 'FAQ', bn: 'সাধারণ জিজ্ঞাসা' }, target: '/faq', order: 3 },
      { id: 'sustainability', label: { en: 'Sustainability & CSR', bn: 'টেকসই উন্নয়ন ও সিএসআর' }, target: '/sustainability', order: 4 },
      { id: 'quality', label: { en: 'Quality', bn: 'মান নিয়ন্ত্রণ' }, target: '/quality', order: 5 },
      { id: 'news', label: { en: 'News & Events', bn: 'সংবাদ ও ইভেন্ট' }, target: '/news', order: 6 },
    ] },
    { id: 'products', title: { en: 'Products', bn: 'পণ্যসমূহ' }, links: [
      { id: 'all-products', label: { en: 'View All Products', bn: 'সকল পণ্য দেখুন' }, target: '/products', order: 1 },
      { id: 'motorcycle', label: { en: 'Motorcycle Parts', bn: 'মোটরসাইকেল যন্ত্রাংশ' }, target: '/products?category=Motorcycle', order: 2 },
      { id: 'rims', label: { en: 'Rim Products', bn: 'রিম পণ্য' }, target: '/products?category=Rims', order: 3 },
      { id: 'hardware', label: { en: 'Hardware', bn: 'হার্ডওয়্যার' }, target: '/products?category=Hardware', order: 4 },
      { id: 'downloads', label: { en: 'Downloads', bn: 'ডাউনলোড' }, target: '/downloads', order: 5 },
      { id: 'contact', label: { en: 'Contact Us', bn: 'যোগাযোগ করুন' }, target: '/contact', order: 6 },
    ] },
  ],
  contact: { address: 'Plot S1/A, BSCIC Industrial Area, Jhumjhumpur, Jashore, Bangladesh', phone: '+880 1234 567890', email: 'sales@modinarim.com', hours: 'Sun–Thu: 9AM – 6PM' },
  socialLinks: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((platform) => ({ platform: platform as 'Facebook' | 'Twitter' | 'LinkedIn' | 'Instagram', url: '#', sourceWasPlaceholder: true })),
  copyrightText: { en: 'Modina Rim & Parts Ltd. All rights reserved.', bn: 'Modina Rim & Parts Ltd. সর্বস্বত্ব সংরক্ষিত।' },
  yearBehavior: 'generated-current-year',
};
