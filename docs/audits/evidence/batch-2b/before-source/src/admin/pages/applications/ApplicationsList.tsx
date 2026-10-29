import { useMemo, useState } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminJobApplications, applicationReviewStatuses } from '../../data/applications';
import { adminCareers } from '../../data/careers';
import type { AdminJobApplication } from '../../types/applications';
import { adminButtonClass } from '../../ui/Button';
import { SectionCard } from '../../ui/Card';
import { EmptyState } from '../../ui/FeedbackStates';
import { PageHeader } from '../../ui/PageHeader';
import { ResponsiveDataList, type DataColumn } from '../../ui/ResponsiveDataList';
import { SearchFilterBar } from '../../ui/SearchFilterBar';
import { StatusBadge } from '../../ui/StatusBadge';

const vacancyFor = (vacancyId: number) => adminCareers.find((career) => career.id === vacancyId);
const vacancyLabel = (vacancyId: number) => vacancyFor(vacancyId)?.title.en || 'Missing vacancy reference';

export default function ApplicationsList() {
  const [query, setQuery] = useState(''); const [vacancy, setVacancy] = useState('All'); const [status, setStatus] = useState('All');
  const rows = useMemo(() => adminJobApplications.filter((application) => { const search = query.trim().toLowerCase(); const title = vacancyLabel(application.vacancyId); return (!search || `${application.applicantName} ${application.email} ${title}`.toLowerCase().includes(search)) && (vacancy === 'All' || String(application.vacancyId) === vacancy) && (status === 'All' || application.reviewStatus === status); }), [query, status, vacancy]);
  const actions = (application: AdminJobApplication) => <Link to={`/admin/job-applications/${application.id}`} className={adminButtonClass('secondary', 'px-3')} aria-label={`View application from ${application.applicantName}`}>View <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>;
  const columns: DataColumn<AdminJobApplication>[] = [
    { key: 'applicant', label: 'Applicant', width: '19%', render: (application) => <div><p className="font-extrabold text-[var(--admin-heading)]">{application.applicantName}</p><p className="mt-1 break-all text-xs text-[var(--admin-muted)]">{application.email}</p></div> },
    { key: 'vacancy', label: 'Vacancy', width: '22%', render: (application) => <div><p className="break-words">{vacancyLabel(application.vacancyId)}</p>{!vacancyFor(application.vacancyId) && <p className="mt-1 text-xs font-bold text-amber-700">Reference unavailable</p>}</div> },
    { key: 'phone', label: 'Phone', width: '13%', headerClassName: 'hidden lg:table-cell', cellClassName: 'hidden lg:table-cell', render: (application) => application.phone },
    { key: 'submitted', label: 'Submitted', width: '18%', headerClassName: 'hidden xl:table-cell', cellClassName: 'hidden xl:table-cell', render: (application) => application.submittedAt },
    { key: 'document', label: 'CV State', width: '12%', headerClassName: 'hidden min-[1100px]:table-cell', cellClassName: 'hidden min-[1100px]:table-cell', render: () => <span className="text-xs font-semibold text-[var(--admin-muted)]">Not collected by form</span> },
    { key: 'status', label: 'Review Status', width: '12%', render: (application) => <StatusBadge status={application.reviewStatus} /> },
    { key: 'actions', label: 'Actions', width: '12%', render: actions },
  ];
  return <div className="space-y-6 xl:space-y-8">
    <PageHeader eyebrow="Applications · local prototype" title="Job Applications" description="A restrained review inbox using synthetic records only. Applications are not publishable content." />
    <div className="flex items-start gap-3 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sky-950"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" /><div><p className="text-sm font-extrabold">Demo applicant data — no real submissions.</p><p className="mt-0.5 text-xs leading-5 text-sky-800">Names, contacts, cover notes, and timestamps are synthetic layout data. Nothing came from the public form, is authenticated, or is persisted.</p></div></div>
    <SectionCard title="Application Inbox" description={`${rows.length} of ${adminJobApplications.length} synthetic applications shown`}>
      <div className="p-4 sm:p-5"><SearchFilterBar query={query} onQueryChange={setQuery} searchLabel="Search demo applications" searchPlaceholder="Search applicant, email, or vacancy…" filters={[{ key: 'vacancy', label: 'Vacancy', value: vacancy, onChange: setVacancy, options: ['All', ...adminCareers.map((career) => ({ label: career.title.en, value: String(career.id) })), { label: 'Missing vacancy reference', value: '999' }] }, { key: 'status', label: 'Review Status', value: status, onChange: setStatus, options: ['All', ...applicationReviewStatuses] }]} /></div>
      <ResponsiveDataList rows={rows} columns={columns} getPrimaryLabel={(application) => application.applicantName} empty={<EmptyState title="No matching demo applications" description="Clear or change the local filters to see the synthetic application records." />} renderMobile={(application) => <div className="space-y-4"><div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0"><h3 className="font-extrabold text-[var(--admin-heading)]">{application.applicantName}</h3><p className="mt-1 break-all text-sm text-[var(--admin-muted)]">{application.email}</p></div><StatusBadge status={application.reviewStatus} /></div><dl className="grid gap-3 text-sm"><div><dt className="text-xs font-extrabold uppercase text-[var(--admin-muted)]">Vacancy</dt><dd className="mt-1 break-words">{vacancyLabel(application.vacancyId)}{!vacancyFor(application.vacancyId) && <span className="ml-2 font-bold text-amber-700">Reference unavailable</span>}</dd></div><div><dt className="text-xs font-extrabold uppercase text-[var(--admin-muted)]">Phone</dt><dd className="mt-1">{application.phone}</dd></div><div><dt className="text-xs font-extrabold uppercase text-[var(--admin-muted)]">Submitted</dt><dd className="mt-1 break-words">{application.submittedAt}</dd></div><div><dt className="text-xs font-extrabold uppercase text-[var(--admin-muted)]">CV State</dt><dd className="mt-1">Not collected by website form</dd></div></dl><Link to={`/admin/job-applications/${application.id}`} className={adminButtonClass('primary', 'w-full')}>View Application <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>} />
    </SectionCard>
  </div>;
}
