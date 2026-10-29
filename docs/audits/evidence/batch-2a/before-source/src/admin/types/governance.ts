export type CapabilityAction = 'view' | 'edit' | 'publish' | 'archive' | 'change_status' | 'manage';

export interface AdminCapability {
  id: string;
  section: 'Dashboard' | 'Content' | 'Company' | 'Operations' | 'Website' | 'System';
  domainId: string;
  domainLabel: string;
  action: CapabilityAction;
  label: string;
  description: string;
  privacySensitive?: boolean;
}

export interface CapabilityDomainDefinition {
  id: string;
  label: string;
  section: AdminCapability['section'];
  description: string;
  actions: CapabilityAction[];
  privacySensitive?: boolean;
}

export interface DemoRole {
  id: string;
  name: string;
  description: string;
  systemRole: boolean;
  capabilityIds: string[];
}

export type DemoAdminUserStatus = 'Active' | 'Disabled';

export interface DemoAdminUser {
  id: string;
  displayName: string;
  email: string;
  assignedRoleId: string;
  status: DemoAdminUserStatus;
  lastActivityAt: string;
  createdAt: string;
  synthetic: true;
}

export type DemoActivityAction = 'Created' | 'Updated' | 'Saved Draft' | 'Published' | 'Archived' | 'Status Changed' | 'Configuration Updated';
export type DemoActivityResult = 'Completed' | 'Not completed';

export interface DemoActivityEntry {
  id: string;
  actorUserId: string;
  actionType: DemoActivityAction;
  moduleId: string;
  moduleLabel: string;
  targetLabel: string;
  targetReference: string;
  occurredAt: string;
  result: DemoActivityResult;
  summary: string;
  synthetic: true;
}
