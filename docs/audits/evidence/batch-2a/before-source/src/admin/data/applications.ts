import type { AdminJobApplication, ApplicationReviewStatus } from '../types/applications';

export const applicationReviewStatuses: ApplicationReviewStatus[] = ['New', 'Reviewed', 'Shortlisted', 'Rejected', 'Hired'];

export const adminJobApplications: AdminJobApplication[] = [
  { id: 1, vacancyId: 2, applicantName: 'Demo Applicant 01', email: 'applicant01@example.test', phone: 'DEMO-PHONE-01', coverNote: 'Synthetic cover note for application-detail layout testing. This does not describe a real person.', submittedAt: 'Demo timestamp · 14 Sep 2026, 10:30', reviewStatus: 'New', synthetic: true },
  { id: 2, vacancyId: 1, applicantName: 'Demo Applicant 02', email: 'applicant02@example.test', phone: 'DEMO-PHONE-02', coverNote: 'Synthetic manufacturing-role cover note used only to demonstrate wrapping and read-only presentation.', submittedAt: 'Demo timestamp · 13 Sep 2026, 15:45', reviewStatus: 'Reviewed', synthetic: true },
  { id: 3, vacancyId: 3, applicantName: 'Demo Applicant 03', email: 'applicant03@example.test', phone: 'Not provided', coverNote: 'Synthetic application text. No personal history or real-world event is represented.', submittedAt: 'Demo timestamp · 12 Sep 2026, 09:15', reviewStatus: 'Shortlisted', synthetic: true },
  { id: 4, vacancyId: 4, applicantName: 'Demo Applicant 04', email: 'very-long-demo-applicant-address-04@example.test', phone: 'DEMO-PHONE-04', coverNote: '', submittedAt: 'Demo timestamp · 11 Sep 2026, 17:20', reviewStatus: 'Rejected', synthetic: true },
  { id: 5, vacancyId: 999, applicantName: 'Demo Applicant 05', email: 'applicant05@example.test', phone: 'Not provided', coverNote: 'Synthetic record with an intentionally unresolved vacancy reference for safe-state verification.', submittedAt: 'Demo timestamp · 10 Sep 2026, 11:00', reviewStatus: 'New', synthetic: true },
];

export const cloneApplication = (application: AdminJobApplication): AdminJobApplication => structuredClone(application);

