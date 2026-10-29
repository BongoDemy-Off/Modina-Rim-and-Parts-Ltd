import type { LocalizedText } from './navigation-settings';

export type FooterTarget =
  | '/about' | '/gallery' | '/faq' | '/sustainability' | '/quality' | '/news'
  | '/products' | '/products?category=Motorcycle' | '/products?category=Rims'
  | '/products?category=Hardware' | '/downloads' | '/contact' | '/privacy' | '/terms';

export interface FooterLink { id: string; label: LocalizedText; target: FooterTarget; order: number }
export interface FooterLinkGroup { id: 'company' | 'products'; title: LocalizedText; links: FooterLink[] }
export interface FooterSocialLink { platform: 'Facebook' | 'Twitter' | 'LinkedIn' | 'Instagram'; url: string; sourceWasPlaceholder: boolean }

export interface FooterSettings {
  established: LocalizedText;
  tagline: LocalizedText;
  newsletter: { heading: LocalizedText; explanatoryCopy: LocalizedText; inputPlaceholder: LocalizedText; buttonLabel: LocalizedText };
  linkGroups: FooterLinkGroup[];
  contact: { address: string; phone: string; email: string; hours: string };
  socialLinks: FooterSocialLink[];
  copyrightText: LocalizedText;
  yearBehavior: 'generated-current-year';
}
