import type { AdminStatus } from '../types';

export type DownloadCategory = 'Catalogs' | 'Certificates' | 'Technical' | 'Legal';
export type DownloadFormat = 'PDF' | 'ZIP';
export type DownloadStatus = Extract<AdminStatus, 'Draft' | 'Published' | 'Archived'>;

export interface DownloadLocalizedText {
  en: string;
  bn: string;
}

export interface LocalDocumentSelection {
  name: string;
  extension: 'pdf' | 'zip';
  format: DownloadFormat;
  sizeBytes: number;
  sizeLabel: string;
}

export interface DownloadSourceMetadata {
  sizeLabel: string;
  format: DownloadFormat | '';
  extentLabel: string;
  sourceYear: string;
}

export interface AdminDownload {
  id: number | 'new';
  title: DownloadLocalizedText;
  description: DownloadLocalizedText;
  category: DownloadCategory | '';
  sourceMetadata: DownloadSourceMetadata;
  selectedFile: LocalDocumentSelection | null;
  sourceRecordExists: boolean;
  migrationRequired: boolean;
  sortOrder: number;
  status: DownloadStatus;
  updatedAt: string;
  editor: string;
}

export interface DownloadValidationErrors {
  title?: string;
  category?: string;
  file?: string;
}
