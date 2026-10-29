import type { HomepageConfig, HomepageMedia } from '../types/homepage';
import facilityVideo from '@/assets/State of the Art Facility.webm';
import premiumRimsImg from '@/assets/Premium Rims.webp';
import wasarImg from '@/assets/wasar.webp';
import cngRimImg from '@/assets/CNG Rim.webp';
import bicycleRickshawImg from '@/assets/cat_motorcycle_parts.webp';

const localAsset = (src: string, name?: string): HomepageMedia => ({
  src,
  name: name ?? src.split('/').pop() ?? 'Current local project asset',
  origin: 'current-local-project',
  mediaPresent: true,
  productionReady: false,
});

export const homepageInternalDestinations = [
  { value: '/products', label: 'Products — /products' },
  { value: '/about', label: 'About — /about' },
  { value: '/downloads', label: 'Downloads — /downloads' },
  { value: '/contact', label: 'Contact — /contact' },
] as const;

export const homepageConfig: HomepageConfig = {
  status: 'Published',
  updatedAt: 'Current public Homepage source',
  hero: {
    titleLineOne: { en: 'Engineering', bn: 'প্রকৌশলগত' },
    titleLineTwo: { en: 'Excellence', bn: 'উৎকর্ষ' },
    body: { en: 'Premium automotive components manufactured in Bangladesh. Trusted by industry leaders, Delivered nationwide.', bn: '' },
    primaryCta: { id: 'hero-primary', label: { en: 'Explore Catalog', bn: '' }, destination: '/products' },
    secondaryCta: { id: 'hero-secondary', label: { en: 'Contact Us', bn: 'যোগাযোগ করুন' }, destination: '/contact' },
    slides: [
      { id: 'hero-slide-1', label: { en: 'ALLOY WHEELS', bn: '' }, sourceCategoryLabel: { en: 'CATEGORY 01', bn: '' }, alt: { en: 'ALLOY WHEELS', bn: '' }, media: localAsset('/hero_products.jpg'), order: 1, altIsFutureMetadata: true },
      { id: 'hero-slide-2', label: { en: 'MOTORCYCLE RIMS', bn: '' }, sourceCategoryLabel: { en: 'CATEGORY 02', bn: '' }, alt: { en: 'MOTORCYCLE RIMS', bn: '' }, media: localAsset('/hero_rims.jpg'), order: 2, altIsFutureMetadata: true },
      { id: 'hero-slide-3', label: { en: 'CNG AUTO PARTS', bn: '' }, sourceCategoryLabel: { en: 'CATEGORY 03', bn: '' }, alt: { en: 'CNG AUTO PARTS', bn: '' }, media: localAsset('/hero_cng_parts.jpg'), order: 3, altIsFutureMetadata: true },
      { id: 'hero-slide-4', label: { en: 'PRECISION HARDWARE', bn: '' }, sourceCategoryLabel: { en: 'CATEGORY 04', bn: '' }, alt: { en: 'PRECISION HARDWARE', bn: '' }, media: localAsset('/hero_hardware.jpg'), order: 4, altIsFutureMetadata: true },
      { id: 'hero-slide-5', label: { en: 'BICYCLE & RICKSHAW', bn: '' }, sourceCategoryLabel: { en: 'CATEGORY 05', bn: '' }, alt: { en: 'BICYCLE & RICKSHAW', bn: '' }, media: localAsset('/hero_bicycle.jpg'), order: 5, altIsFutureMetadata: true },
    ],
    trustMetrics: [
      { id: 'trust-iso', value: 'ISO 9001:2015', label: { en: 'CERTIFIED', bn: '' }, order: 1, reviewRequired: true },
      { id: 'trust-years', value: '15+', label: { en: 'YEARS EXPERIENCE', bn: '' }, order: 2, reviewRequired: true },
      { id: 'trust-products', value: '21+', label: { en: 'PRODUCTS', bn: '' }, order: 3, reviewRequired: true },
      { id: 'trust-distribution', value: 'DISTRIBUTING TO', label: { en: 'ALL OVER THE COUNTRY', bn: '' }, order: 4, reviewRequired: true },
    ],
  },
  about: {
    eyebrow: { en: '— About Modina Rim & Parts Ltd.', bn: '' },
    heading: { en: 'Forging the Backbone of Modern Mobility', bn: '' },
    body: { en: 'Modina Rim & Parts Ltd. is a premier manufacturer of automotive components in Bangladesh. Specializing in high-tensile rims for motorcycles and commercial three-wheelers, our facility in Jashore combines advanced CNC machining with rigorous quality control.', bn: 'মদিনা রিম এন্ড পার্টস লিমিটেড বাংলাদেশের একটি শীর্ষস্থানীয় অটোমোটিভ যন্ত্রাংশ প্রস্তুতকারক প্রতিষ্ঠান। মোটরসাইকেল এবং বাণিজ্যিক থ্রি-হুইলারের হাই-টেনসাইল রিম তৈরিতে বিশেষায়িত আমাদের যশোরের কারখানায় উন্নত সিএনসি মেশিনিং ও কঠোর মান নিয়ন্ত্রণের সমন্বয় ঘটানো হয়েছে।' },
    storyCta: { id: 'about-story', label: { en: 'Our Story', bn: 'আমাদের গল্প' }, destination: '/about' },
    counters: [
      { id: 'about-years', value: '20+', label: { en: 'Years of Excellence', bn: 'বছরের অভিজ্ঞতা' }, order: 1, reviewRequired: true },
      { id: 'about-clients', value: '300+', label: { en: 'B2B Clients', bn: 'বিটুবি ক্লায়েন্ট' }, order: 2, reviewRequired: true },
      { id: 'about-products', value: '100+', label: { en: 'Premium Products', bn: 'প্রিমিয়াম পণ্য' }, order: 3, reviewRequired: true },
    ],
    video: localAsset(facilityVideo, 'State of the Art Facility.webm'),
    videoHeading: { en: 'Using modern technology', bn: '' },
    videoCaption: { en: 'ISO 9001:2015 Certified', bn: '' },
  },
  categories: {
    eyebrow: { en: '— Products', bn: '' },
    heading: { en: 'New Arrival', bn: '' },
    body: { en: "We don't just manufacture parts; we engineer reliability. Every component that leaves our facility is tested to withstand the demanding conditions of South Asian roads.", bn: 'আমরা শুধু যন্ত্রাংশ তৈরি করি না; আমরা নির্ভরতা নিশ্চিত করি। আমাদের কারখানা থেকে বের হওয়া প্রতিটি পণ্য দক্ষিণ এশিয়ার রাস্তার কঠোর পরিস্থিতি মোকাবেলায় পরীক্ষিত।' },
    fullRangeLabel: { en: 'Full Range', bn: '' },
    slots: [
      { id: 'category-slot-1', slot: 1, eyebrow: { en: 'CATEGORY 01', bn: '' }, title: { en: 'MOTORCYCLE', bn: '' }, description: { en: 'Stands, Guards, Handlebars', bn: '' }, media: localAsset(premiumRimsImg, 'Premium Rims.webp'), categoryReference: 'Motorcycle' },
      { id: 'category-slot-2', slot: 2, eyebrow: { en: 'CATEGORY 02', bn: '' }, title: { en: 'PREMIUM RIMS', bn: '' }, description: { en: 'Easy Bike, Mishuk, CNG', bn: '' }, media: localAsset(cngRimImg, 'CNG Rim.webp'), categoryReference: 'Rims' },
      { id: 'category-slot-3', slot: 3, eyebrow: { en: 'CATEGORY 03', bn: '' }, title: { en: 'BICYCLE & RICKSHAW', bn: '' }, description: { en: 'Avon, Gazi, Jumbo', bn: '' }, media: localAsset(bicycleRickshawImg, 'cat_motorcycle_parts.webp'), categoryReference: 'Rims' },
      { id: 'category-slot-4', slot: 4, eyebrow: { en: 'CATEGORY 04', bn: '' }, title: { en: 'HARDWARE', bn: '' }, description: { en: 'Bearings, Spokes, Washers', bn: '' }, media: localAsset(wasarImg, 'wasar.webp'), categoryReference: 'Hardware' },
    ],
  },
  quality: {
    eyebrow: { en: 'Quality & Trust', bn: '' },
    heading: { en: 'The Trust Factor', bn: '' },
    body: { en: 'Triple ISO certified manufacturing with 100% batch testing for dimensional accuracy and tensile strength.', bn: 'ট্রিপল আইএসও সার্টিফাইড উৎপাদন এবং মাত্রাগত নির্ভুলতা ও শক্তির জন্য ১০০% ব্যাচ টেস্টিং।' },
    learnMoreLabel: { en: 'Learn More', bn: '' },
    cards: [
      { id: 'quality-card-1', order: 1, title: { en: 'Uncompromising Quality', bn: 'আপোষহীন গুণমান' }, description: { en: 'Triple ISO certified manufacturing with 100% batch testing for dimensional accuracy and tensile strength.', bn: 'ট্রিপল আইএসও সার্টিফাইড উৎপাদন এবং মাত্রাগত নির্ভুলতা ও শক্তির জন্য ১০০% ব্যাচ টেস্টিং।' } },
      { id: 'quality-card-2', order: 2, title: { en: 'Scale & Consistency', bn: 'বিস্তৃতি ও ধারাবাহিকতা' }, description: { en: 'Automated production lines ensuring consistent tolerance across high-volume orders.', bn: 'স্বয়ংক্রিয় উৎপাদন লাইনের মাধ্যমে বড় অর্ডারেও ধারাবাহিক নির্ভুলতা নিশ্চিতকরণ।' } },
      { id: 'quality-card-3', order: 3, title: { en: 'Technical Support', bn: 'কারিগরী সহায়তা' }, description: { en: 'Direct access to our engineering team for custom specifications and volume requirements.', bn: 'কাস্টম স্পেসিফিকেশন এবং ভলিউম রিকোয়ারমেন্টের জন্য আমাদের ইঞ্জিনিয়ারিং টিমের সরাসরি সহায়তা।' } },
    ],
  },
  downloads: {
    eyebrow: { en: 'Resources', bn: 'রিসোর্স' },
    heading: { en: 'Equipping Our Partners.', bn: '' },
    body: { en: "We don't just manufacture parts; we engineer reliability. Every component that leaves our facility is tested to withstand the demanding conditions of South Asian roads.", bn: 'আমরা শুধু যন্ত্রাংশ তৈরি করি না; আমরা নির্ভরতা নিশ্চিত করি। আমাদের কারখানা থেকে বের হওয়া প্রতিটি পণ্য দক্ষিণ এশিয়ার রাস্তার কঠোর পরিস্থিতি মোকাবেলায় পরীক্ষিত।' },
    catalogLabel: { en: '2026 Catalog', bn: '' },
    downloadsCta: { id: 'downloads-page', label: { en: 'Downloads', bn: 'ডাউনলোড' }, destination: '/downloads' },
    summaries: [
      { id: 'download-summary-1', order: 1, name: { en: 'Alloy Specs', bn: '' }, size: '2.4 MB', format: 'PDF', mappingState: 'review-required' },
      { id: 'download-summary-2', order: 2, name: { en: 'ISO 9001 Cert', bn: '' }, size: '1.1 MB', format: 'PDF', mappingState: 'review-required' },
      { id: 'download-summary-3', order: 3, name: { en: 'CAD Models', bn: '' }, size: '18.5 MB', format: 'ZIP', mappingState: 'review-required' },
      { id: 'download-summary-4', order: 4, name: { en: 'Warranty Terms', bn: '' }, size: '0.8 MB', format: 'PDF', mappingState: 'review-required' },
    ],
  },
  testimonials: {
    eyebrow: { en: '— Client Voices', bn: '' },
    heading: { en: 'Global Trust', bn: '' },
    selectedTestimonialIds: [1, 2, 3],
    sourceSlotLimit: 3,
  },
  closingCta: {
    eyebrow: { en: '— Get Started', bn: '' },
    heading: { en: 'Partner with Modina Rim & Parts', bn: '' },
    body: { en: 'Contact our sales team today for a comprehensive product catalog, volume pricing, and custom manufacturing inquiries.', bn: 'বিস্তৃত পণ্য ক্যাটালগ, পাইকারি মূল্য এবং কাস্টম ম্যানুফ্যাকচারিং সম্পর্কিত জিজ্ঞাসার জন্য আজই আমাদের বিক্রয় দলের সাথে যোগাযোগ করুন।' },
    cta: { id: 'closing-contact', label: { en: 'Request a Quote', bn: 'কোটেশন অনুরোধ করুন' }, destination: '/contact' },
  },
};

export const cloneHomepageConfig = (): HomepageConfig => structuredClone(homepageConfig);
