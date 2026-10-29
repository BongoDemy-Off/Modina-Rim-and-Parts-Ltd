import type { AdminStatus } from '../types';

export type ProductStatus = Extract<AdminStatus, 'Draft' | 'Published' | 'Archived'>;
export type ProductMediaRole = 'product' | 'engineering' | 'assembly' | 'additional';
export type ProductCategory = 'Motorcycle' | 'Rims' | 'Hardware';

export interface LocalizedText {
  en: string;
  bn: string;
}

export interface AdminProductMedia {
  id: string;
  src: string;
  role: ProductMediaRole;
  included: boolean;
  alt: LocalizedText;
  source: 'production' | 'local-preview';
}

export interface AdminProductSpecification {
  id: string;
  key: string;
  label: LocalizedText;
  value: LocalizedText;
  sharedValue: boolean;
}

export interface AdminProduct {
  id: number | 'new';
  sku: string;
  category: ProductCategory | '';
  content: {
    name: LocalizedText;
    shortDescription: LocalizedText;
    detailedDescription: LocalizedText;
  };
  media: AdminProductMedia[];
  specifications: AdminProductSpecification[];
  seo: {
    title: LocalizedText;
    description: LocalizedText;
  };
  status: ProductStatus;
  featured: boolean;
  updatedAt: string;
  editor: string;
}

export interface ProductValidationErrors {
  name?: string;
  sku?: string;
  category?: string;
}
