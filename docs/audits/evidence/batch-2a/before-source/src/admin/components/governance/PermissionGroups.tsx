import { capabilityDomains } from '../../data/capabilities';
import { AdminCheckbox } from '../../ui/FormControls';
import { GovernanceNotice } from './GovernanceNotice';

const sections = ['Dashboard', 'Content', 'Company', 'Operations', 'Website', 'System'] as const;

export function PermissionGroups({ selectedIds, readOnly = false, onChange }: { selectedIds: string[]; readOnly?: boolean; onChange: (ids: string[]) => void }) {
  const selected = new Set(selectedIds);
  const toggle = (capabilityId: string, checked: boolean) => {
    if (readOnly) return;
    onChange(checked ? [...selectedIds, capabilityId] : selectedIds.filter((id) => id !== capabilityId));
  };

  return (
    <div className="space-y-6">
      {sections.map((section) => {
        const domains = capabilityDomains.filter((domain) => domain.section === section);
        if (domains.length === 0) return null;
        return (
          <section key={section} aria-labelledby={`permission-section-${section.toLowerCase()}`}>
            <div className="mb-3">
              <h3 id={`permission-section-${section.toLowerCase()}`} className="text-sm font-extrabold uppercase tracking-[0.08em] text-[var(--admin-heading)]">{section}</h3>
              {section === 'Operations' && <p className="mt-1 text-xs leading-5 text-[var(--admin-muted)]">Privacy-sensitive operational records require final access-policy review during backend/auth implementation.</p>}
            </div>
            <div className="grid min-w-0 gap-3 lg:grid-cols-2">
              {domains.map((domain) => (
                <fieldset key={domain.id} className="min-w-0 rounded-xl border border-[var(--admin-border)] bg-white p-3 sm:p-4">
                  <legend className="max-w-full px-1 text-sm font-extrabold text-[var(--admin-heading)]">{domain.label}</legend>
                  <p className="mb-2 break-words text-xs leading-5 text-[var(--admin-muted)]">{domain.description}</p>
                  {domain.privacySensitive && <p className="mb-2 rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold leading-5 text-amber-900">Future private submission data. Proposed access requires client and backend/privacy review.</p>}
                  <div className="grid gap-1 min-[420px]:grid-cols-2">
                    {domain.actions.map((action) => {
                      const capabilityId = `${domain.id}.${action}`;
                      const label = action === 'change_status' ? 'Change Status' : action.charAt(0).toUpperCase() + action.slice(1);
                      return <AdminCheckbox key={capabilityId} label={label} checked={selected.has(capabilityId)} disabled={readOnly} onChange={(event) => toggle(capabilityId, event.target.checked)} />;
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
          </section>
        );
      })}
      {readOnly && <GovernanceNotice tone="warning"><strong>Protected preset in this demo UI.</strong> Backend enforcement does not yet exist.</GovernanceNotice>}
    </div>
  );
}
