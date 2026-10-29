import type { AdminStatus } from '../types';

export type FaqCategory = 'Products' | 'Quality' | 'Shipping' | 'Pricing' | 'Company';
export type FaqStatus = Extract<AdminStatus, 'Draft' | 'Published' | 'Archived'>;

export interface FaqLocalizedText {
  en: string;
  bn: string;
}

export interface AdminFaq {
  id: number | 'new';
  category: FaqCategory | '';
  question: FaqLocalizedText;
  answer: FaqLocalizedText;
  categoryOrder: number;
  status: FaqStatus;
  updatedAt: string;
  editor: string;
}

export interface FaqValidationErrors {
  question?: string;
  answer?: string;
  category?: string;
}
