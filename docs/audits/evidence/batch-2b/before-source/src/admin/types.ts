import type { LucideIcon } from 'lucide-react';

export type AdminSection =
  | 'Dashboard'
  | 'Content'
  | 'Company'
  | 'Communication'
  | 'Website'
  | 'System';

export interface AdminRouteMeta {
  path: string;
  title: string;
  section: AdminSection;
  description: string;
  icon: LucideIcon;
}

export type AdminStatus =
  | 'Draft'
  | 'Published'
  | 'Scheduled'
  | 'Archived'
  | 'Open'
  | 'Closed'
  | 'New'
  | 'Read'
  | 'Resolved'
  | 'Reviewed'
  | 'Shortlisted'
  | 'Rejected'
  | 'Hired'
  | 'Active'
  | 'Disabled'
  | 'Completed'
  | 'Not completed'
  | 'Expiring Soon'
  | 'Valid';
