import { useMemo, useState } from 'react';
import { ArrowRight, LockKeyhole, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GovernanceNotice } from '../../components/governance/GovernanceNotice';
import { capabilitiesForRole } from '../../data/capabilities';
import { demoAdminUsers } from '../../data/admin-users';
import { demoRoles } from '../../data/roles';
import type { DemoRole } from '../../types/governance';
import { adminButtonClass } from '../../ui/Button';
import { SectionCard } from '../../ui/Card';
import { EmptyState } from '../../ui/FeedbackStates';
import { PageHeader } from '../../ui/PageHeader';
import { ResponsiveDataList, type DataColumn } from '../../ui/ResponsiveDataList';
import { SearchFilterBar } from '../../ui/SearchFilterBar';

const userCount = (roleId: string) => demoAdminUsers.filter((user) => user.assignedRoleId === roleId).length;

export default function RolesList() {
  const [query, setQuery] = useState('');
  const rows = useMemo(() => demoRoles.filter((role) => !query.trim() || `${role.name} ${role.description}`.toLowerCase().includes(query.trim().toLowerCase())), [query]);
  const columns: DataColumn<DemoRole>[] = [
    { key: 'role', label: 'Role', width: '20%', render: (role) => <div><p className="font-extrabold text-[var(--admin-heading)]">{role.name}</p>{role.systemRole && <p className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-amber-800"><LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" /> Demo system preset</p>}</div> },
    { key: 'description', label: 'Description', width: '36%', render: (role) => <p className="break-words leading-5">{role.description}</p> },
    { key: 'users', label: 'Demo users', width: '12%', render: (role) => `${userCount(role.id)} demo user${userCount(role.id) === 1 ? '' : 's'}` },
    { key: 'capabilities', label: 'Proposed capabilities', width: '20%', render: (role) => `${capabilitiesForRole(role.capabilityIds).length} modeled capabilities` },
    { key: 'actions', label: 'Actions', width: '12%', render: (role) => <Link to={`/admin/roles/${role.id}`} className={adminButtonClass('secondary', 'px-3')}>View/Edit <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link> },
  ];

  return (
    <div className="space-y-6 xl:space-y-8">
      <PageHeader eyebrow="System · frontend governance prototype" title="Roles & Permissions" description="Proposed future role bundles. These permissions are not current security policy and are not enforced." actions={<Link to="/admin/roles/new" className={adminButtonClass('primary')}><Plus className="h-4 w-4" aria-hidden="true" /> New Demo Role</Link>} />
      <GovernanceNotice><strong>Proposed access model — demo only.</strong> Authentication and authorization are not implemented. Client approval is still required before backend implementation.</GovernanceNotice>
      <GovernanceNotice tone="warning"><strong>Privacy-sensitive records require review.</strong> Job Applications and Contact Messages may contain future private submission data; final access must be confirmed during backend/auth implementation.</GovernanceNotice>
      <SearchFilterBar query={query} onQueryChange={setQuery} searchLabel="Search Demo Roles" searchPlaceholder="Search role name or description…" />
      <SectionCard title="Proposed Demo Roles" description={`${rows.length} of ${demoRoles.length} role presets shown · counts derive from static synthetic users only`}>
        <ResponsiveDataList rows={rows} columns={columns} getPrimaryLabel={(role) => role.name} empty={<EmptyState title="No matching Demo Roles" description="Clear the local search to view all proposed presets." />} renderMobile={(role) => <div className="space-y-4"><div><div className="flex items-start justify-between gap-3"><h3 className="break-words font-extrabold text-[var(--admin-heading)]">{role.name}</h3>{role.systemRole && <LockKeyhole className="h-5 w-5 shrink-0 text-amber-700" aria-label="Demo system preset" />}</div><p className="mt-2 break-words text-sm leading-6 text-[var(--admin-muted)]">{role.description}</p></div><dl className="grid grid-cols-2 gap-3 text-sm"><div><dt className="text-xs font-extrabold uppercase text-[var(--admin-muted)]">Demo users</dt><dd className="mt-1">{userCount(role.id)}</dd></div><div><dt className="text-xs font-extrabold uppercase text-[var(--admin-muted)]">Capabilities</dt><dd className="mt-1">{role.capabilityIds.length}</dd></div></dl><Link to={`/admin/roles/${role.id}`} className={adminButtonClass('secondary', 'w-full')}>View/Edit Demo Role <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>} />
      </SectionCard>
    </div>
  );
}
