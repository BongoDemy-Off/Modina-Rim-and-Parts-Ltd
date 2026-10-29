import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { EffectiveAccessPreview } from '../../components/governance/EffectiveAccessPreview';
import { GovernanceNotice } from '../../components/governance/GovernanceNotice';
import { createEmptyDemoAdminUser, demoAdminUsers } from '../../data/admin-users';
import { demoRoles } from '../../data/roles';
import type { DemoAdminUser, DemoAdminUserStatus } from '../../types/governance';
import { AdminButton } from '../../ui/Button';
import { SectionCard } from '../../ui/Card';
import { AdminDialog } from '../../ui/Dialog';
import { DemoToast, EmptyState } from '../../ui/FeedbackStates';
import { AdminInput, AdminSelect } from '../../ui/FormControls';
import { PageHeader } from '../../ui/PageHeader';
import { StatusBadge } from '../../ui/StatusBadge';

const normalize = (value: string) => value.trim().toLowerCase();
const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export default function UserEditor({ mode }: { mode: 'create' | 'edit' }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const source = mode === 'create' ? createEmptyDemoAdminUser() : demoAdminUsers.find((user) => user.id === id);
  const [user, setUser] = useState<DemoAdminUser | null>(() => source ? structuredClone(source) : null);
  const [dirty, setDirty] = useState(false);
  const [toast, setToast] = useState(false);
  const [discard, setDiscard] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  if (!user) return <EmptyState headingLevel={1} title="User Not Found" description="This synthetic Admin-user ID does not exist." action={<AdminButton variant="secondary" onClick={() => navigate('/admin/users')}><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Admin Users</AdminButton>} />;

  const duplicateEmail = Boolean(user.email.trim()) && demoAdminUsers.some((candidate) => candidate.id !== user.id && normalize(candidate.email) === normalize(user.email));
  const selectedRole = demoRoles.find((role) => role.id === user.assignedRoleId) ?? null;
  const errors = {
    displayName: submitAttempted && !user.displayName.trim() ? 'Display Name is required.' : undefined,
    email: duplicateEmail ? 'A synthetic Demo User already uses this email. Local comparison ignores case and surrounding spaces.' : submitAttempted && !validEmail(user.email) ? 'Enter a valid synthetic email address.' : undefined,
    role: submitAttempted && !selectedRole ? 'Select one Demo Role.' : undefined,
  };
  const change = (next: DemoAdminUser) => { setUser(next); setDirty(true); setToast(false); };
  const save = () => {
    setSubmitAttempted(true);
    if (!user.displayName.trim() || !validEmail(user.email) || duplicateEmail || !selectedRole) return;
    setDirty(false);
    setToast(true);
  };
  const back = () => dirty ? setDiscard(true) : navigate('/admin/users');

  return (
    <div className="space-y-6 xl:space-y-8">
      <PageHeader actionsLayout="stack-until-xl" eyebrow={mode === 'create' ? 'Admin Users · new synthetic record' : `Admin Users · ${user.id}`} title={mode === 'create' ? 'New Demo User' : user.displayName} description="Future account-record editor only. No Admin account, credential, invitation, or login is created." actions={<><AdminButton variant="secondary" onClick={back}><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Admin Users</AdminButton><AdminButton variant="primary" onClick={save}><Save className="h-4 w-4" aria-hidden="true" /> Save Demo User</AdminButton></>} />
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[var(--admin-border)] bg-white px-4 py-3"><StatusBadge status={user.status} />{dirty ? <span role="status" className="rounded-full bg-amber-50 px-3 py-1 text-xs font-extrabold text-amber-800">Unsaved changes</span> : <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-800">No unsaved changes</span>}<span className="ml-auto text-xs font-semibold text-[var(--admin-muted)]">Synthetic record · no persistence</span></div>
      <GovernanceNotice><strong>Frontend governance prototype — authentication and authorization are not implemented.</strong> No password, session, invitation, or current-user identity exists.</GovernanceNotice>
      {toast && <DemoToast title="Save Demo User completed locally" description="Demo only — no Admin account was persisted and permissions are not currently enforced." tone="warning" onClose={() => setToast(false)} />}
      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,.72fr)] xl:items-start">
        <div className="min-w-0 space-y-6">
          <SectionCard title="1. User Information" description="Synthetic identity fields only; no password, phone, address, photo, or security settings."><div className="grid gap-4 p-4 sm:p-5"><AdminInput label="Display Name" required value={user.displayName} error={errors.displayName} onChange={(event) => change({ ...user, displayName: event.target.value })} /><AdminInput label="Email" type="email" required value={user.email} error={errors.email} helpText="Use synthetic @example.test data. Duplicate checking is local only and does not represent server uniqueness." onChange={(event) => change({ ...user, email: event.target.value })} /></div></SectionCard>
          <SectionCard title="2. Role Assignment" description="One Demo User → one Demo Role. No overrides, deny rules, hierarchy, or multiple-role assignment."><div className="p-4 sm:p-5"><AdminSelect label="Assigned Demo Role" required value={user.assignedRoleId} error={errors.role} onChange={(event) => change({ ...user, assignedRoleId: event.target.value })}><option value="">Select a Demo Role</option>{demoRoles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}</AdminSelect></div></SectionCard>
          <SectionCard title="3. Account State" description="Future-facing state only; no authentication behavior exists."><div className="space-y-4 p-4 sm:p-5"><div className="grid gap-2 sm:grid-cols-2">{(['Active', 'Disabled'] as DemoAdminUserStatus[]).map((status) => <AdminButton key={status} variant={user.status === status ? 'primary' : 'secondary'} aria-pressed={user.status === status} onClick={() => change({ ...user, status })}>{status}</AdminButton>)}</div><p className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold leading-5 text-amber-900">Demo only — Disabled does not revoke access because authentication is not implemented. Active does not grant login access.</p></div></SectionCard>
        </div>
        <aside className="min-w-0 xl:sticky xl:top-24"><SectionCard title="4. Effective Access Preview" description={selectedRole ? `Derived locally from the “${selectedRole.name}” preset.` : 'Select a role to see its proposed capabilities.'}><div className="p-4 sm:p-5"><EffectiveAccessPreview role={selectedRole} /></div></SectionCard></aside>
      </div>
      <AdminDialog open={discard} title="Discard unsaved Demo User changes?" description="The explicit Back action detected local changes. Nothing has been persisted or sent." confirmLabel="Discard and Go Back" onClose={() => setDiscard(false)} onConfirm={() => navigate('/admin/users')} />
    </div>
  );
}
