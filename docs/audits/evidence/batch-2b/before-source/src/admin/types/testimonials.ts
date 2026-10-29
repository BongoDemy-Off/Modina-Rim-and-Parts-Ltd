import type { AdminStatus } from '../types';
import type { HomepageLocalizedText, HomepageMedia } from './homepage';

export type TestimonialStatus = Extract<AdminStatus, 'Draft' | 'Published' | 'Archived'>;
export type TestimonialReadiness = 'Verification required' | 'Demo review noted';

export interface AdminTestimonial {
  id: number | 'new';
  quote: HomepageLocalizedText;
  displayAttribution: HomepageLocalizedText;
  organization: string;
  portraitAlt: HomepageLocalizedText;
  portrait: HomepageMedia;
  order: number;
  status: TestimonialStatus;
  readiness: TestimonialReadiness;
  sourceReviewWarning?: string;
  updatedAt: string;
  editor: string;
}

export interface TestimonialValidationErrors {
  quote?: string;
  displayAttribution?: string;
  organization?: string;
  portrait?: string;
}
