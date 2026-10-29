import { useMemo, useState } from 'react';
import { ArrowRight, Plus, Power, PowerOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cloneDemoAdminUsers } from '../../data/admin-users';
import { demoRoles } from '../../data/roles';
import type { DemoAdminUser } from '../../types/governance';
import { GovernanceNotice } from '../../components/governance/GovernanceNotice';
import { AdminButton, adminButtonClass } from '../../ui/Button';
import { SectionCard } from '../../ui/Card';
import { AdminDialog } from '../../ui/Dialog';
import { DemoToast, EmptyState } from '../../ui/FeedbackStates';
import { PageHeader } from '../../ui/PageHeader';
import { ResponsiveDataList, type DataColumn } from '../../ui/ResponsiveDataList';
import { SearchFilterBar } from '../../ui/SearchFilterBar';
import { StatusBadge } from '../../ui/StatusBadge';

const roleName = (roleId: string) => demoRoles.find((role) => role.id === roleId)?.name ?? 'Missing Demo Role';

export default function UsersList() {
  const [users, setUsers] = useState<DemoAdminUser[]>(cloneDemoAdminUsers);
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('All');
  const [status, setStatus] = useState('All');
  const [stateTarget, setStateTarget] = useState<DemoAdminUser | null>(null);
  const [toast, setToast] = useState<DemoAdminUser | null>(null);

  const rows = useMemo(() => users.filter((user) => {
    const search = query.trim().toLowerCase();
    return (!search || `${user.displayName} ${user.email}`.toLowerCase().includes(search))
      && (role === 'All' || user.assignedRoleId === role)
      && (status === 'All' || user.status === status);
  }), [query, role, status, users]);

  const actions = (user: DemoAdminUser) => (
    <div className="flex flex-wrap gap-1">
      <Link to={`/admin/users/${user.id}`} className={adminButtonClass('secondary', 'px-3')}>View/Edit <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      <AdminButton variant="ghost" className={`px-3 ${user.status === 'Active' ? 'text-red-700' : 'text-emerald-700'}`} onClick={() => setStateTarget(user)} aria-label={`${user.status === 'Active' ? 'Disable' : 'Enable'} ${user.displayName}`}>
        {user.status === 'Active' ? <PowerOff className="h-4 w-4" aria-hidden="true" /> : <Power className="h-4 w-4" aria-hidden="true" />}
        <span className="hidden 2xl:inline">{user.status === 'Active' ? 'Disable' : 'Enable'}</span>
      </AdminButton>
    </div>
  );

  const columns: DataColumn<DemoAdminUser>[] = [
    { key: 'user', label: 'User', width: '18%', render: (user) => <p className="font-extrabold text-[var(--admin-heading)]">{user.displayName}</p> },
    { key: 'email', label: 'Email', width: '24%', render: (user) => <p className="break-all">{user.email}</p> },
    { key: 'role', label: 'Role', width: '16%', render: (user) => roleName(user.assignedRoleId) },
    { key: 'status', label: 'Account status', width: '13%', render: (user) => <StatusBadge status={user.status} /> },
    { key: 'activity', label: 'Demo last activity', width: '17%', render: (user) => <span className="text-xs leading-5">{user.lastActivityAt}</span> },
    { key: 'actions', label: 'Actions', width: '12%', render: actions },
  ];

  return (
    <div className="space-y-6 xl:space-y-8">
      <PageHeader eyebrow="System · frontend governance prototype" title="Admin Users" description="Synthetic future account records. No authentication, login, session, invitation, or real account system exists." actions={<Link to="/admin/users/new" className={adminButtonClass('primary')}><Plus className="h-4 w-4" aria-hidden="true" /> New Demo User</Link>} />
      <GovernanceNotice><strong>Frontend governance prototype — authentication and authorization are not implemented.</strong> These are synthetic governance records, not current staff accounts or signed-in identities.</GovernanceNotice>
      {toast && <DemoToast title={`${toast.displayName} is ${toast.status.toLowerCase()} in this list demo`} description={toast.status === 'Disabled' ? 'Demo only — this does not revoke access because authentication is not implemented.' : 'Demo only — this does not grant login access because authentication is not implemented.'} tone="warning" onClose={() => setToast(null)} />}
      <SearchFilterBar query={query} onQueryChange={setQuery} searchLabel="Search Demo Admin users" searchPlaceholder="Search synthetic name or example.test email…" filters={[
        { key: 'role', label: 'Role', value: role, onChange: setRole, options: [{ label: 'All roles', value: 'All' }, ...demoRoles.map((item) => ({ label: item.name, value: item.id }))] },
        { key: 'status', label: 'Account status', value: status, onChange: setStatus, options: ['All', 'Active', 'Disabled'] },
      ]} />
      <SectionCard title="Synthetic Admin users" description={`${rows.length} of ${users.length} demo users shown · one user → one role`}>
        <ResponsiveDataList rows={rows} columns={columns} getPrimaryLabel={(user) => user.displayName} empty={<EmptyState title="No matching Demo Users" description="Clear or change the local filters." />} renderMobile={(user) => <div className="space-y-4"><div className="flex min-w-0 items-start justify-between gap-3"><div className="min-w-0"><h3 className="break-words font-extrabold text-[var(--admin-heading)]">{user.displayName}</h3><p className="mt-1 break-all text-sm text-[var(--admin-muted)]">{user.email}</p></div><StatusBadge status={user.status} /></div><dl className="grid gap-3 text-sm"><div><dt className="text-xs font-extrabold uppercase text-[var(--admin-muted)]">Demo Role</dt><dd className="mt-1">{roleName(user.assignedRoleId)}</dd></div><div><dt className="text-xs font-extrabold uppercase text-[var(--admin-muted)]">Demo last activity</dt><dd className="mt-1 break-words">{user.lastActivityAt}</dd></div></dl>{actions(user)}</div>} />
      </SectionCard>
      <AdminDialog open={Boolean(stateTarget)} title={`${stateTarget?.status === 'Active' ? 'Disable' : 'Enable'} Demo User`} description={stateTarget ? `${stateTarget.status === 'Active' ? 'Disable' : 'Enable'} “${stateTarget.displayName}” in this local list only? No account, route, session, or permission enforcement will change.` : ''} confirmLabel={`${stateTarget?.status === 'Active' ? 'Disable' : 'Enable'} in Demo`} confirmVariant={stateTarget?.status === 'Active' ? 'destructive' : 'primary'} onClose={() => setStateTarget(null)} onConfirm={() => { if (!stateTarget) return; const updated = { ...stateTarget, status: stateTarget.status === 'Active' ? 'Disabled' as const : 'Active' as const }; setUsers((current) => current.map((user) => user.id === updated.id ? updated : user)); setToast(updated); }}><p className="font-semibold">Demo only — disabling does not revoke access and enabling does not grant login access because authentication is not implemented.</p></AdminDialog>
    </div>
  );
}
