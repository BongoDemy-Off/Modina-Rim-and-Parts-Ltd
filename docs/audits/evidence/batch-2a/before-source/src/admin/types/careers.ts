import type { AdminStatus } from '../types';

export type CareerLanguage = 'en' | 'bn';
export type CareerDepartment = 'Manufacturing' | 'Quality' | 'Sales' | 'Operations';
export type CareerEmploymentType = 'Full-time';
export type CareerStatus = Extract<AdminStatus, 'Draft' | 'Open' | 'Closed' | 'Archived'>;

export interface CareerLocalizedText {
  en: string;
  bn: string;
}

export interface CareerListItem {
  id: string;
  content: CareerLocalizedText;
}

export interface AdminCareer {
  id: number | 'new';
  title: CareerLocalizedText;
  department: CareerDepartment | '';
  employmentType: CareerEmploymentType | '';
  location: CareerLocalizedText;
  experience: CareerLocalizedText;
  description: CareerLocalizedText;
  responsibilities: CareerListItem[];
  requirements: CareerListItem[];
  applicationDeadline: string;
  status: CareerStatus;
  sourceRecordExists: boolean;
  updatedAt: string;
  editor: string;
}

export interface CareerValidationErrors {
  title?: string;
  department?: string;
  employmentType?: string;
  location?: string;
  experience?: string;
  description?: string;
  responsibilities?: string;
  requirements?: string;
}

