import type { AdminJobApplication, ApplicationReviewStatus } from '../../types/applications';
import { applicationReviewStatuses } from '../../data/applications';
import { AdminButton } from '../../ui/Button';
import { SectionCard } from '../../ui/Card';
import { StatusBadge } from '../../ui/StatusBadge';

export function ApplicationStatusPanel({ application, onStatusChange }: { application: AdminJobApplication; onStatusChange: (status: ApplicationReviewStatus) => void }) {
  return (
    <SectionCard title="Review Status" description="The only mutable application field in this demo.">
      <div className="space-y-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3"><span className="text-sm font-bold text-[var(--admin-muted)]">Current status</span><StatusBadge status={application.reviewStatus} /></div>
        <div className="grid gap-2 border-t border-[var(--admin-border)] pt-4">
          {applicationReviewStatuses.map((status) => <AdminButton key={status} variant={application.reviewStatus === status ? 'primary' : 'secondary'} disabled={application.reviewStatus === status} onClick={() => onStatusChange(status)} aria-label={`Set review status to ${status}`}>{status}</AdminButton>)}
        </div>
        <p className="rounded-lg bg-sky-50 px-3 py-2 text-xs font-semibold leading-5 text-sky-900">Demo only — no applicant record was persisted and no email was sent.</p>
        <p className="text-xs leading-5 text-[var(--admin-muted)]">No rigid ATS transition graph is enforced. Status may be corrected locally without triggering vacancy, employee, offer, or communication actions.</p>
      </div>
    </SectionCard>
  );
}

