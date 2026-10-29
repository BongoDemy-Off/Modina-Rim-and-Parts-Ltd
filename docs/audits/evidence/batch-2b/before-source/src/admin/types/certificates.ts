import type { AdminStatus } from '../types';
import type { CompanyMedia, LocalizedContent } from './company';

export type CertificateStatus = Extract<AdminStatus, 'Draft' | 'Published' | 'Archived'>;
export interface CertificateRecord {
  id: string | 'new';
  title: LocalizedContent;
  issuer: string;
  certificateNumber: string;
  issueDate: string;
  scan: CompanyMedia;
  order: number;
  status: CertificateStatus;
  updatedAt: string;
}
export interface CertificateValidationErrors {
  title?: string;
  issuer?: string;
  certificateNumber?: string;
  issueDate?: string;
  scan?: string;
}
