import type { LocalizedText } from './navigation-settings';

export type ContactSubjectKey = 'general-inquiry' | 'product-inquiry' | 'partnership' | 'quality-certification' | 'other';
export interface ContactSubjectOption { key: ContactSubjectKey; sourceValue: string; label: LocalizedText }

export interface ContactSettings {
  hero: { eyebrow: LocalizedText; heading: LocalizedText; summary: LocalizedText };
  form: {
    heading: LocalizedText;
    labels: Record<'name' | 'company' | 'email' | 'phone' | 'subject' | 'message', LocalizedText>;
    subjectOptions: ContactSubjectOption[];
    submitLabel: LocalizedText;
    successHeading: LocalizedText;
    successCopy: LocalizedText;
  };
  contact: { address: string; phone: string; email: string; hours: string };
  mapUrl: string;
  offices: Array<{ id: string; city: string; address: string; type: string; sourcePlaceholder: boolean }>;
  cta: { heading: LocalizedText; primaryLabel: LocalizedText; secondaryLabel: LocalizedText };
}
