import type { AdminStatus } from '../types';

export type GalleryCategory = 'Facility' | 'Machinery' | 'Production' | 'Quality' | 'Products' | 'Materials' | 'Workforce';
export type GalleryDisplayStyle = 'Normal' | 'Wide' | 'Tall';
export type GalleryStatus = Extract<AdminStatus, 'Draft' | 'Published' | 'Archived'>;

export interface GalleryLocalizedText {
  en: string;
  bn: string;
}

export interface GalleryMedia {
  src: string;
  name: string;
  size: string;
  dimensions: string;
  source: 'frontend-placeholder' | 'local-preview';
  productionReady: false;
}

export interface AdminGalleryItem {
  id: number | 'new';
  title: GalleryLocalizedText;
  alt: GalleryLocalizedText;
  altSource: 'derived-from-title' | 'editor-authored';
  category: GalleryCategory | '';
  media: GalleryMedia | null;
  displayStyle: GalleryDisplayStyle | '';
  sortOrder: number;
  status: GalleryStatus;
  sourceRecordExists: boolean;
  updatedAt: string;
  editor: string;
}

export interface GalleryValidationErrors {
  title?: string;
  category?: string;
  media?: string;
  displayStyle?: string;
}
