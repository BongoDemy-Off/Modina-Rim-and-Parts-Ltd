import type { CertificateRecord } from '../types/certificates';

const text = (en: string, bn = '') => ({ en, bn });
const scan = (src: string, name: string) => ({ src, name, origin: 'current-local-project' as const, mediaPresent: true });

export const certificateRecords: CertificateRecord[] = [
  { id: 'iso-9001', title: text('ISO 9001:2015'), issuer: 'LMS Certification Limited', certificateNumber: 'BD99166A', issueDate: '10 April 2023', scan: scan('/iso/iso-9001.png', 'iso-9001.png'), order: 1, status: 'Published', updatedAt: 'Current Certificates page source' },
  { id: 'iso-14001', title: text('ISO 14001:2015'), issuer: 'LMS Certification Limited', certificateNumber: 'BD99166B', issueDate: '10 April 2023', scan: scan('/iso/iso-14001.png', 'iso-14001.png'), order: 2, status: 'Published', updatedAt: 'Current Certificates page source' },
  { id: 'iso-45001', title: text('ISO 45001:2018'), issuer: 'LMS Certification Limited', certificateNumber: 'BD99166C-1', issueDate: '10 April 2023', scan: scan('/iso/iso-45001.png', 'iso-45001.png'), order: 3, status: 'Published', updatedAt: 'Current Certificates page source' },
];
export const cloneCertificateRecords = () => structuredClone(certificateRecords);
export const createEmptyCertificate = (): CertificateRecord => ({ id: 'new', title: text(''), issuer: '', certificateNumber: '', issueDate: '', scan: { src: '', name: '', origin: 'missing', mediaPresent: false }, order: certificateRecords.length + 1, status: 'Draft', updatedAt: 'Not saved' });
