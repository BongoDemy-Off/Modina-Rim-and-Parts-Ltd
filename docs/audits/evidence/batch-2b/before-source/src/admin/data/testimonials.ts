import type { AdminTestimonial, TestimonialReadiness } from '../types/testimonials';

export const testimonialReadinessOptions: TestimonialReadiness[] = ['Verification required', 'Demo review noted'];

export const adminTestimonials: AdminTestimonial[] = [
  {
    id: 1,
    quote: { en: "Modina's premium rims have significantly reduced our warranty claims. Their precision engineering is unmatched in the region.", bn: '' },
    displayAttribution: { en: 'Md. Faruk Hossain', bn: '' },
    organization: 'Global Auto Corp',
    portraitAlt: { en: 'Md. Faruk Hossain', bn: '' },
    portrait: { src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80', name: 'Unsplash remote portrait', origin: 'remote-stock-placeholder', mediaPresent: true, productionReady: false },
    order: 1,
    status: 'Published',
    readiness: 'Verification required',
    sourceReviewWarning: 'Source review required: similar names elsewhere on the site use different spelling.',
    updatedAt: 'Current public Homepage source',
    editor: 'Demo editor',
  },
  {
    id: 2,
    quote: { en: 'A reliable partner for over 10 years. Their commitment to quality and timely delivery keeps our assembly lines moving.', bn: '' },
    displayAttribution: { en: 'Supply Chain Manager', bn: '' },
    organization: 'Metro Vehicles Ltd.',
    portraitAlt: { en: 'Supply Chain Manager', bn: '' },
    portrait: { src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80', name: 'Unsplash remote portrait', origin: 'remote-stock-placeholder', mediaPresent: true, productionReady: false },
    order: 2,
    status: 'Published',
    readiness: 'Verification required',
    updatedAt: 'Current public Homepage source',
    editor: 'Demo editor',
  },
  {
    id: 3,
    quote: { en: 'The durability of their motorcycle components under extreme conditions is exactly what our customers demand.', bn: '' },
    displayAttribution: { en: 'Chief Engineer', bn: '' },
    organization: 'Apex Motors',
    portraitAlt: { en: 'Chief Engineer', bn: '' },
    portrait: { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80', name: 'Unsplash remote portrait', origin: 'remote-stock-placeholder', mediaPresent: true, productionReady: false },
    order: 3,
    status: 'Published',
    readiness: 'Verification required',
    updatedAt: 'Current public Homepage source',
    editor: 'Demo editor',
  },
];

export function createEmptyTestimonial(): AdminTestimonial {
  return {
    id: 'new',
    quote: { en: '', bn: '' },
    displayAttribution: { en: '', bn: '' },
    organization: '',
    portraitAlt: { en: '', bn: '' },
    portrait: { src: '', name: '', origin: 'missing', mediaPresent: false, productionReady: false },
    order: adminTestimonials.length + 1,
    status: 'Draft',
    readiness: 'Verification required',
    updatedAt: 'Not saved',
    editor: 'Demo editor',
  };
}

export const cloneTestimonial = (testimonial: AdminTestimonial): AdminTestimonial => structuredClone(testimonial);
export const cloneTestimonialCollection = (): AdminTestimonial[] => structuredClone(adminTestimonials);
