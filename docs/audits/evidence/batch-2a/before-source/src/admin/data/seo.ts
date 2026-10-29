import type { OrganizationSourceClaim, SeoSettings } from '../types/seo';

export const seoSettings: SeoSettings = {
  defaultTitle: 'Modina Rim & Parts Ltd. | Automotive Components Manufacturer',
  defaultDescription: 'Modina Rim & Parts Ltd. is a leading automotive rim and parts manufacturer in Bangladesh. ISO 9001:2015 and ISO 14001 certified. 21+ products, 15+ years of precision engineering excellence.',
  siteName: 'Modina Rim & Parts Ltd.',
  ogTitle: 'Modina Rim & Parts Ltd. | Automotive Components Manufacturer',
  ogDescription: 'ISO 9001:2015 certified automotive rim and parts manufacturer in Bangladesh. Precision engineering since 2010.',
  socialImage: '/hero.jpg',
  twitterTitle: 'Modina Rim & Parts Ltd.',
  twitterDescription: 'ISO 9001:2015 certified automotive parts manufacturer in Bangladesh.',
  twitterImage: '/hero.jpg',
  detectedCanonicalBase: 'https://www.modinarim.com',
};

export const organizationSourceClaims: OrganizationSourceClaim[] = [
  { label: 'Organization name', value: 'Modina Rim & Parts Ltd.' },
  { label: 'Founding date', value: '2010' },
  { label: 'Street address', value: 'Plot S1/A, BSCIC Industrial Area, Jhumjhumpur', warning: 'Privacy and Terms contain a different street address.' },
  { label: 'Locality / country', value: 'Jashore / BD' },
  { label: 'Sales email', value: 'sales@modinarim.com' },
  { label: 'Telephone', value: '+880 1234 567890', warning: 'Other public components contain different phone values.' },
];
