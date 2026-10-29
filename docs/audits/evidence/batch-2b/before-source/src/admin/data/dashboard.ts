import type { AdminStatus } from '../types';
import type { ContactMessageStatus } from '../types/contact-messages';
import { adminJobApplications } from './applications';
import { adminBlogPosts } from './blog';
import { adminCareers } from './careers';
import { certificateRecords } from './certificates';
import { adminContactMessages } from './contact-messages';
import { adminNewsItems } from './news';
import { adminProducts } from './products';

const publishedContentCount = [...adminBlogPosts, ...adminNewsItems].filter((item) => item.status === 'Published').length;
const newMessageCount = adminContactMessages.filter((message) => message.status === 'New').length;
const openJobCount = adminCareers.filter((career) => career.status === 'Open').length;

export const dashboardMetrics = [
  { label: 'Products', value: String(adminProducts.length), note: 'Static demo product records', tone: 'red' as const },
  { label: 'Published Content', value: String(publishedContentCount), note: 'Blog and News demo records', tone: 'blue' as const },
  { label: 'New Messages', value: String(newMessageCount), note: `${adminContactMessages.length} synthetic contact records`, tone: 'amber' as const },
  { label: 'Open Jobs', value: String(openJobCount), note: `${adminJobApplications.length} synthetic applications`, tone: 'green' as const },
];

export const recentActivity = [
  { id: 1, action: 'Product updated', detail: 'Motor Cycle Center Stand — engineering image and dimensions reviewed', actor: 'Demo editor', time: 'Illustrative' },
  { id: 2, action: 'Blog post published', detail: 'The Science Behind ISO 9001 and What It Means for Buyers', actor: 'Demo editor', time: 'Illustrative' },
  { id: 3, action: 'Hero slide changed', detail: 'Precision manufacturing for Bangladesh and beyond', actor: 'Demo editor', time: 'Illustrative' },
  { id: 4, action: 'Gallery image added', detail: 'Final quality inspection — powder-coated CNG rim production line', actor: 'Demo editor', time: 'Illustrative' },
];

export interface DraftRow {
  id: number;
  title: string;
  type: string;
  editor: string;
  updated: string;
  status: AdminStatus;
}

export const draftRows: DraftRow[] = [
  { id: 1, title: 'Expanded quality-control checklist for precision rim inspection and traceability', type: 'Blog', editor: 'Demo editor', updated: 'Demo snapshot', status: 'Draft' },
  { id: 2, title: 'মোটরসাইকেল সেন্টার স্ট্যান্ড — স্থায়িত্ব ও ভারসাম্যের বিস্তারিত বিবরণ', type: 'Product বাংলা', editor: 'Demo translator', updated: 'Demo snapshot', status: 'Draft' },
  { id: 3, title: 'National Manufacturing Excellence Expo — participation announcement', type: 'News & Event', editor: 'Demo editor', updated: 'Demo snapshot', status: 'Draft' },
];

export interface MessageRow {
  id: string;
  sender: string;
  subject: string;
  received: string;
  status: ContactMessageStatus;
}

export const messageRows: MessageRow[] = adminContactMessages.slice(0, 3).map((message) => ({
  id: message.id,
  sender: message.company ? `${message.name}, ${message.company}` : message.name,
  subject: `${message.subject} — synthetic demonstration record`,
  received: message.submittedAt,
  status: message.status,
}));

export const applicationRows = adminJobApplications.slice(0, 3).map((application) => ({
  id: application.id,
  applicant: application.applicantName,
  role: adminCareers.find((career) => career.id === application.vacancyId)?.title.en || 'Missing vacancy reference',
  date: application.submittedAt,
  status: application.reviewStatus as AdminStatus,
}));

export const certificateSummary = {
  recordCount: certificateRecords.length,
  publishedCount: certificateRecords.filter((record) => record.status === 'Published').length,
};
