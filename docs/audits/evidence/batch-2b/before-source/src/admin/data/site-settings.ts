import type { SiteSettings } from '../types/site-settings';

export const siteSettings: SiteSettings = {
  companyName: 'Modina Rim & Parts Ltd.', foundingYear: '2010', siteUrl: 'https://www.modinarim.com',
  candidatePhone: '+880 1234 567890', candidateAddress: 'Plot S1/A, BSCIC Industrial Area, Jhumjhumpur, Jashore, Bangladesh', candidateHours: 'Sun–Thu: 9:00 AM – 6:00 PM',
  salesEmail: 'sales@modinarim.com', privacyEmail: 'privacy@modinarim.com', legalEmail: 'legal@modinarim.com', careersEmail: 'careers@modinarim.com',
  socialLinks: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((platform) => ({ platform: platform as 'Facebook' | 'Twitter' | 'LinkedIn' | 'Instagram', candidateUrl: '', currentSource: '#' as const })),
  phoneOccurrences: [
    { location: 'Navbar desktop / compact', value: '+8801321234510' }, { location: 'Navbar mobile drawer / Products CTA', value: '+8801234567890' },
    { location: 'Footer / Contact / Home JSON-LD', value: '+880 1234 567890' }, { location: 'Privacy / Terms', value: '+880 421 72345' },
  ],
  addressOccurrences: [
    { location: 'Footer / Contact / Home JSON-LD', value: 'Plot S1/A, BSCIC Industrial Area, Jhumjhumpur, Jashore' },
    { location: 'Privacy / Terms', value: 'House No. 18/5, Jhumjhumpur, Jashore' },
    { location: 'Contact office cards', value: 'Two records say “Placeholder — to be updated”' },
  ],
  hoursOccurrences: [
    { location: 'Footer', value: 'Sun–Thu: 9AM – 6PM' }, { location: 'Contact / FAQ', value: 'Sun–Thu: 9:00 AM – 6:00 PM' },
  ],
  logoReference: 'src/assets/logo.png — 239 × 255 — 47,975 bytes',
  faviconReference: 'public/logo.jpg — 12,500 × 12,500 — 7,935,555 bytes (~7.9 MB)',
};
