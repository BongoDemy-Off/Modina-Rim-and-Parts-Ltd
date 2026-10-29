import type { AdminStatus } from '../types';

export interface HomepageLocalizedText {
  en: string;
  bn: string;
}

export type HomepageMediaOrigin =
  | 'current-local-project'
  | 'remote-stock-placeholder'
  | 'local-preview'
  | 'missing';

export interface HomepageMedia {
  src: string;
  name: string;
  origin: HomepageMediaOrigin;
  mediaPresent: boolean;
  productionReady: boolean;
}

export type HomepageInternalDestination = '/products' | '/about' | '/downloads' | '/contact';
export type HomepageProductCategory = 'Motorcycle' | 'Rims' | 'Hardware';

export interface HomepageCta {
  id: string;
  label: HomepageLocalizedText;
  destination: HomepageInternalDestination;
}

export interface HomepageHeroSlide {
  id: string;
  label: HomepageLocalizedText;
  sourceCategoryLabel: HomepageLocalizedText;
  alt: HomepageLocalizedText;
  media: HomepageMedia;
  order: number;
  altIsFutureMetadata: boolean;
}

export interface HomepageMetric {
  id: string;
  value: string;
  label: HomepageLocalizedText;
  order: number;
  reviewRequired: boolean;
}

export interface HomepageCategorySlot {
  id: string;
  slot: 1 | 2 | 3 | 4;
  eyebrow: HomepageLocalizedText;
  title: HomepageLocalizedText;
  description: HomepageLocalizedText;
  media: HomepageMedia;
  categoryReference: HomepageProductCategory;
}

export interface HomepageQualityCard {
  id: string;
  order: number;
  title: HomepageLocalizedText;
  description: HomepageLocalizedText;
}

export interface HomepageDownloadSummary {
  id: string;
  order: number;
  name: HomepageLocalizedText;
  format: string;
  size: string;
  mappingState: 'review-required';
}

export interface HomepageConfig {
  status: Extract<AdminStatus, 'Draft' | 'Published'>;
  updatedAt: string;
  hero: {
    titleLineOne: HomepageLocalizedText;
    titleLineTwo: HomepageLocalizedText;
    body: HomepageLocalizedText;
    primaryCta: HomepageCta;
    secondaryCta: HomepageCta;
    slides: HomepageHeroSlide[];
    trustMetrics: HomepageMetric[];
  };
  about: {
    eyebrow: HomepageLocalizedText;
    heading: HomepageLocalizedText;
    body: HomepageLocalizedText;
    storyCta: HomepageCta;
    counters: HomepageMetric[];
    video: HomepageMedia;
    videoHeading: HomepageLocalizedText;
    videoCaption: HomepageLocalizedText;
  };
  categories: {
    eyebrow: HomepageLocalizedText;
    heading: HomepageLocalizedText;
    body: HomepageLocalizedText;
    fullRangeLabel: HomepageLocalizedText;
    slots: HomepageCategorySlot[];
  };
  quality: {
    eyebrow: HomepageLocalizedText;
    heading: HomepageLocalizedText;
    body: HomepageLocalizedText;
    learnMoreLabel: HomepageLocalizedText;
    cards: HomepageQualityCard[];
  };
  downloads: {
    eyebrow: HomepageLocalizedText;
    heading: HomepageLocalizedText;
    body: HomepageLocalizedText;
    catalogLabel: HomepageLocalizedText;
    downloadsCta: HomepageCta;
    summaries: HomepageDownloadSummary[];
  };
  testimonials: {
    eyebrow: HomepageLocalizedText;
    heading: HomepageLocalizedText;
    selectedTestimonialIds: number[];
    sourceSlotLimit: 3;
  };
  closingCta: {
    eyebrow: HomepageLocalizedText;
    heading: HomepageLocalizedText;
    body: HomepageLocalizedText;
    cta: HomepageCta;
  };
}

export interface HomepageValidationErrors {
  heroTitle?: string;
  heroBody?: string;
  heroSlides?: string;
  heroCtas?: string;
  about?: string;
  categories?: string;
  quality?: string;
  downloads?: string;
  testimonials?: string;
  closingCta?: string;
}
