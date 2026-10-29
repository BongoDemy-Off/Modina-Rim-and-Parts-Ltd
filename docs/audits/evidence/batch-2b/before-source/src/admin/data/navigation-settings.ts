import type { NavigationSettings, NavigationTarget } from '../types/navigation-settings';

export const navigationTargets: NavigationTarget[] = ['/', '/products', '/quality', '/certificates', '/sustainability', '/about', '/mission', '/careers', '/faq', '/downloads', '/gallery', '/news', '/blog', '/contact'];

export const navigationSettings: NavigationSettings = {
  items: [
    { id: 'home', kind: 'link', label: { en: 'Home', bn: 'হোম' }, target: '/', order: 1, children: [] },
    { id: 'products', kind: 'link', label: { en: 'Products', bn: 'পণ্যসমূহ' }, target: '/products', order: 2, children: [] },
    { id: 'quality', kind: 'group', label: { en: 'Quality', bn: 'মান নিয়ন্ত্রণ' }, order: 3, children: [
      { id: 'quality-assurance', label: { en: 'Quality Assurance Process', bn: 'গুণমান নিশ্চয়তা প্রক্রিয়া' }, target: '/quality', order: 1 },
      { id: 'certificates', label: { en: 'Certificates & Awards', bn: 'সনদপত্র ও পুরস্কার' }, target: '/certificates', order: 2 },
      { id: 'sustainability', label: { en: 'Sustainability & CSR', bn: 'টেকসই উন্নয়ন ও সিএসআর' }, target: '/sustainability', order: 3 },
    ] },
    { id: 'company', kind: 'group', label: { en: 'Company', bn: 'কোম্পানি' }, order: 4, children: [
      { id: 'about', label: { en: 'About Us', bn: 'আমাদের সম্পর্কে' }, target: '/about', order: 1 },
      { id: 'mission', label: { en: 'Mission & Core Values', bn: 'মিশন ও মূল্যবোধ' }, target: '/mission', order: 2 },
      { id: 'careers', label: { en: 'Careers', bn: 'ক্যারিয়ার' }, target: '/careers', order: 3 },
      { id: 'faq', label: { en: 'FAQ', bn: 'সাধারণ জিজ্ঞাসা' }, target: '/faq', order: 4 },
      { id: 'downloads', label: { en: 'Downloads', bn: 'ডাউনলোড' }, target: '/downloads', order: 5 },
    ] },
    { id: 'media', kind: 'group', label: { en: 'Media', bn: 'মিডিয়া' }, order: 5, children: [
      { id: 'gallery', label: { en: 'Gallery', bn: 'গ্যালারি' }, target: '/gallery', order: 1 },
      { id: 'news', label: { en: 'News & Events', bn: 'সংবাদ ও ইভেন্ট' }, target: '/news', order: 2 },
      { id: 'blog', label: { en: 'Blog', bn: 'ব্লগ' }, target: '/blog', order: 3 },
    ] },
  ],
  contactCta: { label: { en: 'Contact', bn: 'যোগাযোগ' }, target: '/contact', structuralRole: 'special-contact-cta' },
  fixedControls: ['logo-and-brand', 'search', 'language-switch', 'phone-cta'],
  phoneSources: { desktopAndCompact: '+8801321234510', mobileDrawer: '+8801234567890' },
};
