import { capabilityDomains, capabilitiesForRole } from '../../data/capabilities';
import type { DemoRole } from '../../types/governance';
import { GovernanceNotice } from './GovernanceNotice';

export function EffectiveAccessPreview({ role }: { role: DemoRole | null }) {
  const capabilities = role ? capabilitiesForRole(role.capabilityIds) : [];
  return (
    <div className="space-y-4">
      <GovernanceNotice><strong>Preview only — permissions are not currently enforced.</strong> This summary does not change the Sidebar, routes, or existing Admin controls.</GovernanceNotice>
      {!role ? (
        <p className="rounded-lg border border-dashed border-[var(--admin-border-strong)] p-4 text-sm text-[var(--admin-muted)]">Select a Demo Role to preview its proposed future access.</p>
      ) : capabilities.length === 0 ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900">This role currently grants no future Admin access.</p>
      ) : (
        <div className="grid min-w-0 gap-3 sm:grid-cols-2">
          {capabilityDomains.map((domain) => {
            const selected = capabilities.filter((capability) => capability.domainId === domain.id);
            if (selected.length === 0) return null;
            return (
              <div key={domain.id} className="min-w-0 rounded-lg border border-[var(--admin-border)] bg-slate-50 p-3">
                <p className="break-words text-sm font-extrabold text-[var(--admin-heading)]">{domain.label}</p>
                <p className="mt-1 break-words text-xs leading-5 text-[var(--admin-muted)]">{selected.map((capability) => capability.label).join(' · ')}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
