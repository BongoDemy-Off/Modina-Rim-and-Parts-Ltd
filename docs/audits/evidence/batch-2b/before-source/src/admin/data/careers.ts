import type { AdminCareer, CareerDepartment, CareerEmploymentType, CareerListItem } from '../types/careers';

export const careerDepartments: CareerDepartment[] = ['Manufacturing', 'Quality', 'Sales', 'Operations'];
export const careerEmploymentTypes: CareerEmploymentType[] = ['Full-time'];

const items = (prefix: string, values: string[]): CareerListItem[] => values.map((value, index) => ({
  id: `${prefix}-${index + 1}`,
  content: { en: value, bn: '' },
}));

export const adminCareers: AdminCareer[] = [
  {
    id: 1,
    title: { en: 'CNC Machine Operator', bn: '' },
    department: 'Manufacturing',
    employmentType: 'Full-time',
    location: { en: 'Jashore Factory', bn: '' },
    experience: { en: '2–4 years', bn: '' },
    description: { en: 'Operate and maintain CNC lathes and milling machines for precision-cut automotive rim components. Ensure dimensional accuracy to ±0.01mm tolerance.', bn: '' },
    responsibilities: items('career-1-responsibility', ['Set up, operate and monitor CNC machines as per production schedule', 'Perform routine maintenance and minor repairs', 'Inspect finished parts using calibrated measurement tools', 'Maintain production logs and quality records']),
    requirements: items('career-1-requirement', ['Diploma or certification in Mechanical Technology or CNC Operation', '2+ years hands-on CNC machine experience', 'Ability to read engineering drawings and technical specifications', 'Knowledge of ISO 9001:2015 quality procedures preferred']),
    applicationDeadline: '', status: 'Open', sourceRecordExists: true, updatedAt: 'Current public Careers source', editor: 'Demo editor',
  },
  {
    id: 2,
    title: { en: 'Quality Assurance Inspector', bn: '' },
    department: 'Quality',
    employmentType: 'Full-time',
    location: { en: 'Jashore Factory', bn: '' },
    experience: { en: '3–5 years', bn: '' },
    description: { en: 'Conduct in-process and final inspections of automotive components to uphold our ISO 9001:2015 zero-defect standard.', bn: '' },
    responsibilities: items('career-2-responsibility', ['Perform dimensional and visual inspections at each production stage', 'Document non-conformances and initiate corrective action reports', 'Calibrate and maintain inspection instruments', 'Participate in internal ISO surveillance audits']),
    requirements: items('career-2-requirement', ['B.Sc. or Diploma in Mechanical or Industrial Engineering', '3+ years QA experience in a manufacturing environment', 'Proficiency with micrometers, verniers, and CMM equipment', 'ISO 9001:2015 internal auditor certification is a plus']),
    applicationDeadline: '', status: 'Open', sourceRecordExists: true, updatedAt: 'Current public Careers source', editor: 'Demo editor',
  },
  {
    id: 3,
    title: { en: 'Sales & Business Development Executive', bn: '' },
    department: 'Sales',
    employmentType: 'Full-time',
    location: { en: 'Dhaka / Remote', bn: '' },
    experience: { en: '2–5 years', bn: '' },
    description: { en: 'Drive B2B sales growth by acquiring new distributor and dealer accounts across Bangladesh and regional export markets.', bn: '' },
    responsibilities: items('career-3-responsibility', ['Identify and develop new distributor and dealer relationships', 'Prepare and present product proposals and pricing to clients', 'Maintain CRM records and weekly sales reporting', 'Coordinate with factory on lead times, MOQ and special orders']),
    requirements: items('career-3-requirement', ['Bachelor\'s degree in Business, Marketing or related field', '2+ years B2B sales experience in automotive or hardware sector', 'Excellent communication in Bengali and English', 'Willingness to travel across Bangladesh']),
    applicationDeadline: '', status: 'Open', sourceRecordExists: true, updatedAt: 'Current public Careers source', editor: 'Demo editor',
  },
  {
    id: 4,
    title: { en: 'Logistics & Supply Chain Coordinator', bn: '' },
    department: 'Operations',
    employmentType: 'Full-time',
    location: { en: 'Jashore Factory', bn: '' },
    experience: { en: '2–3 years', bn: '' },
    description: { en: 'Manage inbound raw materials and outbound finished goods logistics to ensure on-time delivery to domestic and export customers.', bn: '' },
    responsibilities: items('career-4-responsibility', ['Coordinate with steel and raw material suppliers for timely inbound shipments', 'Plan and manage outbound dispatch schedules', 'Prepare shipping documentation for domestic and export orders', 'Track and resolve logistics disruptions proactively']),
    requirements: items('career-4-requirement', ['Diploma or Bachelor\'s in Supply Chain, Logistics or related field', '2+ years experience in logistics or warehouse management', 'Familiarity with export documentation (HS codes, LC, B/L) preferred', 'Strong organizational and communication skills']),
    applicationDeadline: '', status: 'Open', sourceRecordExists: true, updatedAt: 'Current public Careers source', editor: 'Demo editor',
  },
];

export function createEmptyCareer(): AdminCareer {
  return {
    id: 'new', title: { en: '', bn: '' }, department: '', employmentType: 'Full-time', location: { en: '', bn: '' }, experience: { en: '', bn: '' },
    description: { en: '', bn: '' }, responsibilities: [], requirements: [], applicationDeadline: '', status: 'Draft', sourceRecordExists: false,
    updatedAt: 'Not saved', editor: 'Demo editor',
  };
}

export const cloneCareer = (career: AdminCareer): AdminCareer => structuredClone(career);
