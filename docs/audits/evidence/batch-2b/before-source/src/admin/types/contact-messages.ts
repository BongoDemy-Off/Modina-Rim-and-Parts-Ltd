export type ContactMessageStatus = 'New' | 'Read' | 'Resolved';

export interface ContactMessage {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: ContactMessageStatus;
}
