import type { AdminStatus } from '../types';

export type CompanyStatus = Extract<AdminStatus, 'Draft' | 'Published'>;
export type CompanyLanguage = 'en' | 'bn';

export interface LocalizedContent { en: string; bn: string; }
export interface CompanyMedia {
  src: string;
  name: string;
  origin: 'current-local-project' | 'remote-stock-placeholder' | 'local-preview' | 'missing';
  mediaPresent: boolean;
}
export interface SourceSlot {
  id: string;
  order: number;
  sharedLabel?: string;
  content: { title: LocalizedContent; description: LocalizedContent; detail?: LocalizedContent };
}
export interface LeadershipSlot {
  id: string;
  order: number;
  name: string;
  role: LocalizedContent;
  portrait: CompanyMedia;
}
export interface CompanyPageConfig {
  id: 'about' | 'mission' | 'sustainability' | 'quality';
  status: CompanyStatus;
  heading: LocalizedContent;
  intro: LocalizedContent;
  slots: SourceSlot[];
  media?: CompanyMedia[];
  attribution?: LocalizedContent;
  leadership?: LeadershipSlot[];
  warnings: string[];
  updatedAt: string;
}
