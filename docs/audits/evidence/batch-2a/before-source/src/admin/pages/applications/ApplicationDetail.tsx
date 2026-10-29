import { useState } from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApplicantSummary } from '../../components/applications/ApplicantSummary';
import { ApplicationDocumentSection } from '../../components/applications/ApplicationDocumentSection';
import { ApplicationStatusPanel } from '../../components/applications/ApplicationStatusPanel';
import { adminJobApplications, cloneApplication } from '../../data/applications';
import { adminCareers } from '../../data/careers';
import type { AdminJobApplication, ApplicationReviewStatus } from '../../types/applications';
import { AdminButton } from '../../ui/Button';
import { AdminDialog } from '../../ui/Dialog';
import { DemoToast, EmptyState } from '../../ui/FeedbackStates';
import { PageHeader } from '../../ui/PageHeader';
import { StatusBadge } from '../../ui/StatusBadge';

interface ToastMessage { title: string; description: string; tone: 'success' | 'warning' | 'info' }

export default function ApplicationDetail() {
  const { id } = useParams(); const navigate = useNavigate(); const seed = adminJobApplications.find((candidate) => String(candidate.id) === id);
  const [application, setApplication] = useState<AdminJobApplication | null>(() => seed ? cloneApplication(seed) : null); const [pendingStatus, setPendingStatus] = useState<ApplicationReviewStatus | null>(null); const [toast, setToast] = useState<ToastMessage | null>(null);
  if (!application) return <EmptyState headingLevel={1} title="Application Not Found" description="This synthetic application ID does not exist." action={<AdminButton variant="secondary" onClick={() => navigate('/admin/job-applications')}><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Applications</AdminButton>} />;
  const vacancy = adminCareers.find((career) => career.id === application.vacancyId); const vacancyTitle = vacancy?.title.en || 'Missing vacancy reference';
  const applyStatus = (status: ApplicationReviewStatus) => { setApplication({ ...application, reviewStatus: status }); setToast({ title: `Review status changed to ${status}`, description: 'Demo only — no applicant record was persisted and no email was sent.', tone: status === 'Rejected' ? 'warning' : 'success' }); };
  const requestStatus = (status: ApplicationReviewStatus) => { if (status === 'Rejected' || status === 'Hired') setPendingStatus(status); else applyStatus(status); };
  return <div className="space-y-6 xl:space-y-8">
    <PageHeader eyebrow={`Synthetic application · ${application.id}`} title={application.applicantName} description="Read-only application review. Applicant-submitted fields cannot be edited." actions={<AdminButton variant="secondary" onClick={() => navigate('/admin/job-applications')}><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Applications</AdminButton>} />
    <div className="flex items-start gap-3 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sky-950"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" /><div className="min-w-0 flex-1"><p className="text-sm font-extrabold">Demo applicant data — no real submissions.</p><p className="mt-0.5 text-xs leading-5 text-sky-800">Every applicant value and submitted timestamp on this screen is synthetic. Only Review Status can change, locally.</p></div><StatusBadge status={application.reviewStatus} /></div>
    {toast && <DemoToast {...toast} onClose={() => setToast(null)} />}
    {!vacancy && <div role="status" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"><p className="font-extrabold">Vacancy reference unavailable</p><p className="mt-1">This demo application references vacancy ID {application.vacancyId}, which cannot be resolved. The application remains accessible and the page continues safely.</p></div>}
    <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start"><div className="min-w-0 space-y-6"><ApplicantSummary application={application} vacancyTitle={vacancyTitle} vacancyStatus={vacancy?.status} /><ApplicationDocumentSection /></div><aside className="xl:sticky xl:top-24"><ApplicationStatusPanel application={application} onStatusChange={requestStatus} /></aside></div>
    <AdminDialog open={Boolean(pendingStatus)} title={`Confirm ${pendingStatus || ''} outcome`} description={`Set this synthetic application to ${pendingStatus || ''}? This represents a consequential future outcome, but it will not send email, close the vacancy, create an employee account, generate an offer, or persist data.`} confirmLabel={`Set ${pendingStatus || ''} in Demo`} confirmVariant={pendingStatus === 'Rejected' ? 'destructive' : 'primary'} onClose={() => setPendingStatus(null)} onConfirm={() => pendingStatus && applyStatus(pendingStatus)}><p className="font-semibold">Demo only — no applicant record was persisted and no email was sent.</p></AdminDialog>
  </div>;
}
