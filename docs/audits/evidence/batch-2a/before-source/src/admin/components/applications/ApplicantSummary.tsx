import type { AdminJobApplication } from '../../types/applications';
import { SectionCard } from '../../ui/Card';

function ReadOnlyRow({ label, value, breakAll = false }: { label: string; value: string; breakAll?: boolean }) {
  return <div className="grid min-w-0 gap-1 border-b border-[var(--admin-border)] py-3 last:border-b-0 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-5"><dt className="text-xs font-extrabold uppercase tracking-[0.05em] text-[var(--admin-muted)]">{label}</dt><dd className={`min-w-0 whitespace-pre-wrap text-sm font-semibold leading-6 text-[var(--admin-heading)] ${breakAll ? 'break-all' : 'break-words'}`}>{value || 'Not provided'}</dd></div>;
}

export function ApplicantSummary({ application, vacancyTitle, vacancyStatus }: { application: AdminJobApplication; vacancyTitle: string; vacancyStatus?: string }) {
  return (
    <div className="space-y-6">
      <SectionCard title="Applicant Information" description="Read-only data from a synthetic website-form submission.">
        <dl className="px-4 sm:px-5"><ReadOnlyRow label="Name" value={application.applicantName} /><ReadOnlyRow label="Email" value={application.email} breakAll /><ReadOnlyRow label="Phone" value={application.phone} /></dl>
      </SectionCard>
      <SectionCard title="Application" description="Submission content cannot be edited in this prototype.">
        <dl className="px-4 sm:px-5"><ReadOnlyRow label="Vacancy" value={vacancyTitle} /><ReadOnlyRow label="Vacancy status" value={vacancyStatus || 'Missing reference'} /><ReadOnlyRow label="Submitted" value={application.submittedAt} /><ReadOnlyRow label="Cover Note" value={application.coverNote || 'Not provided'} /></dl>
      </SectionCard>
    </div>
  );
}

