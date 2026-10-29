import type { DemoAdminUser } from '../types/governance';

export const demoAdminUsers: DemoAdminUser[] = [
  { id: 'demo-super-admin-01', displayName: 'Demo Super Admin 01', email: 'superadmin01@example.test', assignedRoleId: 'super-admin', status: 'Active', lastActivityAt: 'Demo timestamp · 20 Sep 2026, 15:40', createdAt: 'Demo timestamp · 01 Sep 2026, 09:00', synthetic: true },
  { id: 'demo-admin-01', displayName: 'Demo Admin 01', email: 'admin01@example.test', assignedRoleId: 'administrator', status: 'Active', lastActivityAt: 'Demo timestamp · 20 Sep 2026, 14:25', createdAt: 'Demo timestamp · 02 Sep 2026, 10:15', synthetic: true },
  { id: 'demo-editor-01', displayName: 'Demo Editor 01', email: 'editor01@example.test', assignedRoleId: 'content-editor', status: 'Active', lastActivityAt: 'Demo timestamp · 20 Sep 2026, 11:10', createdAt: 'Demo timestamp · 03 Sep 2026, 11:30', synthetic: true },
  { id: 'demo-product-manager', displayName: 'Demo Product Manager', email: 'very-long-demo-product-manager-address@example.test', assignedRoleId: 'product-manager', status: 'Active', lastActivityAt: 'Demo timestamp · 19 Sep 2026, 16:45', createdAt: 'Demo timestamp · 04 Sep 2026, 13:00', synthetic: true },
  { id: 'demo-hr-manager', displayName: 'Demo HR Manager', email: 'hrmanager01@example.test', assignedRoleId: 'hr-manager', status: 'Disabled', lastActivityAt: 'Demo timestamp · 18 Sep 2026, 10:20', createdAt: 'Demo timestamp · 05 Sep 2026, 14:10', synthetic: true },
];

export const cloneDemoAdminUsers = () => structuredClone(demoAdminUsers);

export const createEmptyDemoAdminUser = (): DemoAdminUser => ({
  id: 'new-demo-user',
  displayName: '',
  email: '',
  assignedRoleId: '',
  status: 'Active',
  lastActivityAt: 'No demo activity',
  createdAt: 'Not persisted',
  synthetic: true,
});
