import type { AdminStatus } from '../types';

export type ApplicationReviewStatus = Extract<AdminStatus, 'New' | 'Reviewed' | 'Shortlisted' | 'Rejected' | 'Hired'>;

export interface AdminJobApplication {
  readonly id: number;
  readonly vacancyId: number;
  readonly applicantName: string;
  readonly email: string;
  readonly phone: string;
  readonly coverNote: string;
  readonly submittedAt: string;
  readonly synthetic: true;
  reviewStatus: ApplicationReviewStatus;
}

