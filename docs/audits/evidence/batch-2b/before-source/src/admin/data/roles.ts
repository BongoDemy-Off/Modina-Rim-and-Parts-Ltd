import type { DemoRole } from '../types/governance';
import { allCapabilityIds, capabilityIdsForDomains } from './capabilities';

export const SUPER_ADMIN_ROLE_ID = 'super-admin';

export const demoRoles: DemoRole[] = [
  {
    id: SUPER_ADMIN_ROLE_ID,
    name: 'Super Admin',
    description: 'Future system-role preset with every currently modeled Admin capability.',
    systemRole: true,
    capabilityIds: [...allCapabilityIds],
  },
  {
    id: 'administrator',
    name: 'Administrator',
    description: 'Broad content, website-configuration, contact-message, and governance visibility without applicant-data access or governance management.',
    systemRole: false,
    capabilityIds: capabilityIdsForDomains([
      'dashboard', 'homepage', 'products', 'blog', 'news', 'gallery', 'downloads', 'faq', 'testimonials',
      'about', 'mission', 'sustainability', 'quality', 'certificates', 'careers', 'contact_messages',
      'navigation', 'footer', 'contact', 'seo', 'languages', 'site_settings', 'users', 'roles', 'activity_log',
    ]).filter((id) => id !== 'users.manage' && id !== 'roles.manage'),
  },
  {
    id: 'content-editor',
    name: 'Content Editor',
    description: 'Editorial and company-content management without Products, private operational submissions, website configuration, or governance access.',
    systemRole: false,
    capabilityIds: capabilityIdsForDomains([
      'dashboard', 'homepage', 'blog', 'news', 'gallery', 'downloads', 'faq', 'testimonials',
      'about', 'mission', 'sustainability', 'quality', 'certificates', 'languages',
    ]),
  },
  {
    id: 'product-manager',
    name: 'Product Manager',
    description: 'Product-catalog content management only, plus Dashboard visibility.',
    systemRole: false,
    capabilityIds: capabilityIdsForDomains(['dashboard', 'products']),
  },
  {
    id: 'hr-manager',
    name: 'HR Manager',
    description: 'Careers management and privacy-sensitive Job Application review.',
    systemRole: false,
    capabilityIds: capabilityIdsForDomains(['dashboard', 'careers', 'job_applications']),
  },
];

export const cloneDemoRoles = () => structuredClone(demoRoles);

export const createEmptyDemoRole = (): DemoRole => ({
  id: 'new-demo-role',
  name: '',
  description: '',
  systemRole: false,
  capabilityIds: [],
});
