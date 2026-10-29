import type { ContactMessage } from '../types/contact-messages';

export const adminContactMessages: ContactMessage[] = [
  { id: 'demo-contact-01', name: 'Demo Contact 01', company: 'Demo Company 01', email: 'contact01@example.test', phone: '+880 0000 000001', subject: 'General Inquiry', message: 'Synthetic demonstration message for reviewing the contact inbox layout. This is not a real enquiry.', submittedAt: '20 Sep 2026, 10:15', status: 'New' },
  { id: 'demo-contact-02', name: 'Demo Contact 02', company: 'Demo Company 02', email: 'contact02@example.test', phone: '', subject: 'Product Inquiry', message: 'Demo-only product enquiry content used to test a longer read-only message. No person or business submitted this record.', submittedAt: '19 Sep 2026, 15:40', status: 'Read' },
  { id: 'demo-contact-03', name: 'Demo Contact 03', company: '', email: 'contact03@example.test', phone: '+880 0000 000003', subject: 'Partnership', message: 'Fictitious partnership message for interface verification only.', submittedAt: '18 Sep 2026, 09:05', status: 'Resolved' },
  { id: 'demo-contact-04', name: 'Demo Contact 04', company: 'Demo Company 04', email: 'contact04@example.test', phone: '', subject: 'Quality Certification', message: 'Synthetic quality-certification question. No reply history, attachment, or customer profile exists.', submittedAt: '17 Sep 2026, 12:20', status: 'New' },
  { id: 'demo-contact-05', name: 'Demo Contact 05', company: '', email: 'contact05@example.test', phone: '+880 0000 000005', subject: 'Other', message: 'Demo record with unmistakably fictitious contact details.', submittedAt: '16 Sep 2026, 16:55', status: 'Read' },
];

export const contactMessageDemoNotice = 'Demo contact data — no real submissions.';
export const contactMessageStatusNotice = 'Demo only — no contact record was persisted and no email was sent.';
