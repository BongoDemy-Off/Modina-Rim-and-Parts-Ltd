import { useState } from 'react';
import { ArrowLeft, LockKeyhole, Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { EffectiveAccessPreview } from '../../components/governance/EffectiveAccessPreview';
import { GovernanceNotice } from '../../components/governance/GovernanceNotice';
import { PermissionGroups } from '../../components/governance/PermissionGroups';
import { allCapabilityIds } from '../../data/capabilities';
import { demoAdminUsers } from '../../data/admin-users';
import { createEmptyDemoRole, demoRoles, SUPER_ADMIN_ROLE_ID } from '../../data/roles';
import type { DemoRole } from '../../types/governance';
import { AdminButton } from '../../ui/Button';
import { SectionCard } from '../../ui/Card';
import { AdminDialog } from '../../ui/Dialog';
import { DemoToast, EmptyState } from '../../ui/FeedbackStates';
import { AdminInput, AdminTextarea } from '../../ui/FormControls';
import { PageHeader } from '../../ui/PageHeader';

const normalize = (value: string) => value.trim().toLowerCase();

export default function RoleEditor({ mode }: { mode: 'create' | 'edit' }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const source = mode === 'create' ? createEmptyDemoRole() : demoRoles.find((role) => role.id === id);
  const [role, setRole] = useState<DemoRole | null>(() => source ? structuredClone(source) : null);
  const [dirty, setDirty] = useState(false);
  const [toast, setToast] = useState(false);
  const [discard, setDiscard] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  if (!role) return <EmptyState headingLevel={1} title="Role Not Found" description="This synthetic role ID does not exist." action={<AdminButton variant="secondary" onClick={() => navigate('/admin/roles')}><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Roles</AdminButton>} />;

  const isSuperAdmin = role.id === SUPER_ADMIN_ROLE_ID;
  const assignedUsers = demoAdminUsers.filter((user) => user.assignedRoleId === role.id);
  const duplicateName = Boolean(role.name.trim()) && demoRoles.some((candidate) => candidate.id !== role.id && normalize(candidate.name) === normalize(role.name));
  const nameError = duplicateName ? 'A synthetic seed role already uses this name. Local comparison ignores case and surrounding spaces.' : submitAttempted && !role.name.trim() ? 'Role Name is required.' : undefined;
  const change = (next: DemoRole) => { setRole(next); setDirty(true); setToast(false); };
  const save = () => {
    setSubmitAttempted(true);
    if (!role.name.trim() || duplicateName) return;
    const safeRole = isSuperAdmin ? { ...role, name: 'Super Admin', capabilityIds: [...allCapabilityIds] } : role;
    setRole(safeRole);
    setDirty(false);
    setToast(true);
  };
  const back = () => dirty ? setDiscard(true) : navigate('/admin/roles');

  return (
    <div className="space-y-6 xl:space-y-8">
      <PageHeader actionsLayout="stack-until-xl" eyebrow={mode === 'create' ? 'Roles · new custom demo role' : `Roles · ${role.id}`} title={mode === 'create' ? 'New Demo Role' : role.name} description="Proposed future capability bundle only. No permission is enforced by this frontend." actions={<><AdminButton variant="secondary" onClick={back}><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Roles</AdminButton><AdminButton variant="primary" onClick={save}><Save className="h-4 w-4" aria-hidden="true" /> Save Demo Role</AdminButton></>} />
      <GovernanceNotice><strong>Proposed access model — demo only.</strong> These settings are not current security policy, and client approval is required before backend implementation.</GovernanceNotice>
      {isSuperAdmin && <GovernanceNotice tone="warning"><span className="inline-flex items-center gap-2 font-extrabold"><LockKeyhole className="h-4 w-4" aria-hidden="true" /> Demo system role — backend protection and authorization are not implemented.</span><span className="mt-1 block">Its name and every modeled capability are read-only so this UI cannot demonstrate a contradictory Super Admin preset.</span></GovernanceNotice>}
      {toast && <DemoToast title="Save Demo Role completed locally" description="Demo only — no Role was persisted and permissions are not currently enforced." tone="warning" onClose={() => setToast(false)} />}
      <SectionCard title="1. Role Information" description="Human-readable future role identity. No lifecycle status, hierarchy, or deletion behavior exists."><div className="grid gap-4 p-4 sm:p-5"><AdminInput label="Role Name" required value={role.name} readOnly={isSuperAdmin} error={nameError} helpText={isSuperAdmin ? 'Protected preset in this demo UI. Backend enforcement does not yet exist.' : 'Duplicate-role-name comparison is local and case-insensitive; no server uniqueness exists.'} onChange={(event) => change({ ...role, name: event.target.value })} /><AdminTextarea label="Description" value={role.description} onChange={(event) => change({ ...role, description: event.target.value })} helpText="Optional explanation for non-technical reviewers." />{role.capabilityIds.length === 0 && <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900">This role currently grants no future Admin access.</p>}</div></SectionCard>
      <SectionCard title="2. Permission Groups" description={isSuperAdmin ? `All ${allCapabilityIds.length} modeled capabilities are selected and read-only.` : 'Permission combinations are limited to actions relevant to each Admin area.'}><div className="p-4 sm:p-5"><PermissionGroups selectedIds={role.capabilityIds} readOnly={isSuperAdmin} onChange={(capabilityIds) => change({ ...role, capabilityIds })} /></div></SectionCard>
      <div className="grid min-w-0 gap-6 lg:grid-cols-2">
        <SectionCard title="3. Assigned Demo Users" description={`${assignedUsers.length} static synthetic user${assignedUsers.length === 1 ? '' : 's'} reference this role seed.`}><div className="p-4 sm:p-5">{assignedUsers.length ? <ul className="space-y-3">{assignedUsers.map((user) => <li key={user.id} className="rounded-lg border border-[var(--admin-border)] bg-slate-50 p-3"><p className="font-extrabold text-[var(--admin-heading)]">{user.displayName}</p><p className="mt-1 break-all text-xs text-[var(--admin-muted)]">{user.email} · {user.status}</p></li>)}</ul> : <p className="text-sm text-[var(--admin-muted)]">No static Demo Users reference this role. Counts do not synchronize across routes.</p>}</div></SectionCard>
        <SectionCard title="4. Effective Access Summary" description="Grouped from this editor's local capability selection."><div className="p-4 sm:p-5"><EffectiveAccessPreview role={role} /></div></SectionCard>
      </div>
      <AdminDialog open={discard} title="Discard unsaved Demo Role changes?" description="The explicit Back action detected local changes. Nothing has been persisted or enforced." confirmLabel="Discard and Go Back" onClose={() => setDiscard(false)} onConfirm={() => navigate('/admin/roles')} />
    </div>
  );
}
