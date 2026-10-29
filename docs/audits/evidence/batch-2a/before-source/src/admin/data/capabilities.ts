import type { AdminCapability, CapabilityAction, CapabilityDomainDefinition } from '../types/governance';

const actionCopy: Record<CapabilityAction, { label: string; description: string }> = {
  view: { label: 'View', description: 'View the future Admin domain and its records.' },
  edit: { label: 'Edit', description: 'Edit local draft content and domain fields.' },
  publish: { label: 'Publish', description: 'Publish future content or configuration changes.' },
  archive: { label: 'Archive', description: 'Archive supported content records.' },
  change_status: { label: 'Change Status', description: 'Change the supported operational or lifecycle status.' },
  manage: { label: 'Manage', description: 'Create and update future governance records.' },
};

export const capabilityDomains: CapabilityDomainDefinition[] = [
  { id: 'dashboard', label: 'Dashboard', section: 'Dashboard', description: 'Operational content overview.', actions: ['view'] },
  { id: 'homepage', label: 'Homepage', section: 'Content', description: 'Fixed Homepage content structure.', actions: ['view', 'edit', 'publish'] },
  { id: 'products', label: 'Products', section: 'Content', description: 'Product content, specifications, and media.', actions: ['view', 'edit', 'publish', 'archive'] },
  { id: 'blog', label: 'Blog', section: 'Content', description: 'Long-form editorial content.', actions: ['view', 'edit', 'publish', 'archive'] },
  { id: 'news', label: 'News & Events', section: 'Content', description: 'News and event content.', actions: ['view', 'edit', 'publish', 'archive'] },
  { id: 'gallery', label: 'Gallery', section: 'Content', description: 'Gallery records, media, and order.', actions: ['view', 'edit', 'publish', 'archive'] },
  { id: 'downloads', label: 'Downloads', section: 'Content', description: 'Download metadata and document records.', actions: ['view', 'edit', 'publish', 'archive'] },
  { id: 'faq', label: 'FAQ', section: 'Content', description: 'Frequently asked questions and category order.', actions: ['view', 'edit', 'publish', 'archive'] },
  { id: 'testimonials', label: 'Testimonials', section: 'Content', description: 'Testimonial content and display order.', actions: ['view', 'edit', 'publish', 'archive'] },
  { id: 'about', label: 'About & Leadership', section: 'Company', description: 'About-page and leadership content.', actions: ['view', 'edit', 'publish'] },
  { id: 'mission', label: 'Mission & Vision', section: 'Company', description: 'Mission, vision, values, and attribution content.', actions: ['view', 'edit', 'publish'] },
  { id: 'sustainability', label: 'Sustainability / CSR', section: 'Company', description: 'Sustainability and CSR content.', actions: ['view', 'edit', 'publish'] },
  { id: 'quality', label: 'Quality', section: 'Company', description: 'Quality-process content.', actions: ['view', 'edit', 'publish'] },
  { id: 'certificates', label: 'Certificates', section: 'Company', description: 'Public certificate content records.', actions: ['view', 'edit', 'publish', 'archive'] },
  { id: 'careers', label: 'Careers', section: 'Company', description: 'Vacancy content and lifecycle state.', actions: ['view', 'edit', 'change_status', 'archive'] },
  { id: 'job_applications', label: 'Job Applications', section: 'Operations', description: 'Future private applicant submissions.', actions: ['view', 'change_status'], privacySensitive: true },
  { id: 'contact_messages', label: 'Contact Messages', section: 'Operations', description: 'Future private website enquiries.', actions: ['view', 'change_status'], privacySensitive: true },
  { id: 'navigation', label: 'Navigation', section: 'Website', description: 'Public navigation configuration.', actions: ['view', 'edit', 'publish'] },
  { id: 'footer', label: 'Footer', section: 'Website', description: 'Footer content and link configuration.', actions: ['view', 'edit', 'publish'] },
  { id: 'contact', label: 'Contact Page', section: 'Website', description: 'Public Contact-page presentation content.', actions: ['view', 'edit', 'publish'] },
  { id: 'seo', label: 'SEO', section: 'Website', description: 'Future centralized metadata configuration.', actions: ['view', 'edit', 'publish'] },
  { id: 'languages', label: 'Languages', section: 'Website', description: 'Read-only language-source and coverage information.', actions: ['view'] },
  { id: 'site_settings', label: 'Site Settings', section: 'Website', description: 'Future global website configuration.', actions: ['view', 'edit', 'publish'] },
  { id: 'users', label: 'Admin Users', section: 'System', description: 'Future synthetic Admin account records.', actions: ['view', 'manage'] },
  { id: 'roles', label: 'Roles & Permissions', section: 'System', description: 'Future role and capability bundles.', actions: ['view', 'manage'] },
  { id: 'activity_log', label: 'Activity Log', section: 'System', description: 'Read-only synthetic activity history.', actions: ['view'] },
];

export const adminCapabilities: AdminCapability[] = capabilityDomains.flatMap((domain) => domain.actions.map((action) => ({
  id: `${domain.id}.${action}`,
  section: domain.section,
  domainId: domain.id,
  domainLabel: domain.label,
  action,
  label: actionCopy[action].label,
  description: actionCopy[action].description,
  privacySensitive: domain.privacySensitive,
})));

export const allCapabilityIds = adminCapabilities.map((capability) => capability.id);

export function capabilityIdsForDomains(domainIds: string[]) {
  const allowed = new Set(domainIds);
  return adminCapabilities.filter((capability) => allowed.has(capability.domainId)).map((capability) => capability.id);
}

export function capabilitiesForRole(capabilityIds: string[]) {
  const selected = new Set(capabilityIds);
  return adminCapabilities.filter((capability) => selected.has(capability.id));
}
