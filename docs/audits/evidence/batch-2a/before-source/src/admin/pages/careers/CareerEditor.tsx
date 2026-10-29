import { useState } from 'react';
import { ArrowLeft, Eye, Save, Send } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { CareerApplicationSettingsSection, CareerDetailsSection } from '../../components/careers/CareerDetailsSection';
import { CareerPublishingPanel } from '../../components/careers/CareerPublishingPanel';
import { CareerTranslations } from '../../components/careers/CareerTranslations';
import { adminCareers, cloneCareer, createEmptyCareer } from '../../data/careers';
import type { AdminCareer, CareerLanguage, CareerValidationErrors } from '../../types/careers';
import { AdminButton } from '../../ui/Button';
import { AdminDialog } from '../../ui/Dialog';
import { DemoToast, EmptyState } from '../../ui/FeedbackStates';
import { PageHeader } from '../../ui/PageHeader';
import { StatusBadge } from '../../ui/StatusBadge';

interface ToastMessage { title: string; description: string; tone: 'success' | 'warning' | 'info' }
type Confirmation = 'close' | 'archive' | 'discard' | null;

const sections = [['basic-information', 'Basic Information'], ['job-content', 'Job Content'], ['application-settings', 'Application Settings'], ['publishing', 'Publishing']] as const;

export default function CareerEditor({ mode }: { mode: 'create' | 'edit' }) {
  const { id } = useParams(); const navigate = useNavigate();
  const initial = mode === 'create' ? createEmptyCareer() : adminCareers.find((candidate) => String(candidate.id) === id);
  const [career, setCareer] = useState<AdminCareer | null>(() => initial ? cloneCareer(initial) : null);
  const [language, setLanguage] = useState<CareerLanguage>('en'); const [dirty, setDirty] = useState(false); const [errors, setErrors] = useState<CareerValidationErrors>({});
  const [toast, setToast] = useState<ToastMessage | null>(null); const [previewOpen, setPreviewOpen] = useState(false); const [confirmation, setConfirmation] = useState<Confirmation>(null);
  if (!career) return <EmptyState headingLevel={1} title="Vacancy Not Found" description="This demo vacancy ID does not exist." action={<AdminButton variant="secondary" onClick={() => navigate('/admin/careers')}><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Careers</AdminButton>} />;
  const displayName = career.title.en.trim() || 'Untitled Vacancy';
  const bengaliIncomplete = !career.title.bn.trim() || !career.location.bn.trim() || !career.experience.bn.trim() || !career.description.bn.trim() || career.responsibilities.length === 0 || career.responsibilities.some((item) => !item.content.bn.trim()) || career.requirements.length === 0 || career.requirements.some((item) => !item.content.bn.trim());
  const change = (next: AdminCareer) => { setCareer(next); setDirty(true); setErrors({}); setToast(null); };
  const validation = (): CareerValidationErrors => ({
    ...(!career.title.en.trim() ? { title: 'English Job Title is required before opening.' } : {}),
    ...(!career.department ? { department: 'Department is required before opening.' } : {}),
    ...(!career.employmentType ? { employmentType: 'Employment Type is required before opening.' } : {}),
    ...(!career.location.en.trim() ? { location: 'English Location is required before opening.' } : {}),
    ...(!career.experience.en.trim() ? { experience: 'English Experience is required before opening.' } : {}),
    ...(!career.description.en.trim() ? { description: 'A meaningful English Description is required before opening.' } : {}),
    ...(!career.responsibilities.some((item) => item.content.en.trim()) ? { responsibilities: 'At least one English Responsibility is required before opening.' } : {}),
    ...(!career.requirements.some((item) => item.content.en.trim()) ? { requirements: 'At least one English Requirement is required before opening.' } : {}),
  });
  const setStatus = (status: AdminCareer['status'], message: string, tone: ToastMessage['tone'] = 'success') => { setCareer({ ...career, status, updatedAt: 'This demo session' }); setDirty(false); setErrors({}); setToast({ title: message, description: 'Demo only — no public Careers content, applicant record, persistent data, or email was changed.', tone }); };
  const saveDraft = () => setStatus('Draft', 'Draft saved in this demo session', bengaliIncomplete ? 'warning' : 'success');
  const openVacancy = () => { const nextErrors = validation(); setErrors(nextErrors); if (Object.keys(nextErrors).length) { setToast({ title: 'Vacancy is not ready to open', description: 'Review the accessible field errors. No opening action occurred.', tone: 'warning' }); setLanguage('en'); document.getElementById('basic-information')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; } setStatus('Open', 'Open Vacancy action simulated', bengaliIncomplete ? 'warning' : 'success'); };
  const back = () => dirty ? setConfirmation('discard') : navigate('/admin/careers');
  const confirmAction = () => { if (confirmation === 'discard') { navigate('/admin/careers'); return; } if (confirmation === 'close') setStatus('Closed', 'Vacancy closed in this demo session', 'warning'); if (confirmation === 'archive') setStatus('Archived', 'Vacancy archived in this demo session', 'warning'); };
  const dialogCopy = confirmation === 'discard' ? { title: 'Discard unsaved demo changes?', description: 'The explicit Back action detected local changes. Sidebar and browser navigation are not universally intercepted.', confirm: 'Discard and Go Back' } : confirmation === 'close' ? { title: 'Close Vacancy', description: `Close “${displayName}”? Existing applications remain accessible; no applicant is rejected and no email or public change occurs.`, confirm: 'Close in Demo' } : { title: 'Archive Vacancy', description: `Archive “${displayName}”? Existing applications and their vacancy relationship remain available; no public change occurs.`, confirm: 'Archive in Demo' };
  return <div className="space-y-6 xl:space-y-8">
    <PageHeader actionsLayout="stack-until-xl" eyebrow={mode === 'create' ? 'Careers · Create mode' : `Careers · record ${career.id}`} title={mode === 'create' ? `Create ${displayName}` : displayName} description="One bilingual vacancy record with source-aligned fields and local-only status behavior." actions={<><AdminButton variant="secondary" onClick={back}><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Careers</AdminButton><AdminButton variant="ghost" onClick={() => setPreviewOpen(true)}><Eye className="h-4 w-4" aria-hidden="true" /> Admin Preview</AdminButton><AdminButton variant="secondary" onClick={saveDraft}><Save className="h-4 w-4" aria-hidden="true" /> Save Draft</AdminButton><AdminButton variant="primary" onClick={openVacancy}><Send className="h-4 w-4" aria-hidden="true" /> Open Vacancy</AdminButton></>} />
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[var(--admin-border)] bg-white px-4 py-3"><StatusBadge status={career.status} />{dirty ? <span role="status" className="rounded-full bg-amber-50 px-3 py-1 text-xs font-extrabold text-amber-800">Unsaved changes</span> : <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-800">No unsaved changes</span>}<span className="ml-auto text-xs font-semibold text-[var(--admin-muted)]">Demo only · no persistence</span></div>
    {toast && <DemoToast {...toast} onClose={() => setToast(null)} />}{Object.keys(errors).length > 0 && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"><p className="font-extrabold">Open validation needs attention</p><ul className="mt-2 list-disc space-y-1 pl-5">{Object.values(errors).map((error) => <li key={error}>{error}</li>)}</ul><p className="mt-2 font-semibold">Deadline remains optional. Bengali remains a warning only.</p></div>}
    <nav aria-label="Vacancy editor sections" className="flex flex-wrap gap-1 rounded-xl border border-[var(--admin-border)] bg-white/95 p-2 shadow-sm lg:sticky lg:top-[72px] lg:z-20">{sections.map(([anchor, label]) => <a key={anchor} href={`#${anchor}`} className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-bold text-[var(--admin-muted)] no-underline hover:bg-slate-100">{label}</a>)}</nav>
    <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start"><div className="min-w-0 space-y-6"><CareerDetailsSection career={career} errors={errors} onChange={change} /><CareerTranslations career={career} language={language} errors={errors} onLanguageChange={setLanguage} onChange={change} /><CareerApplicationSettingsSection career={career} onChange={change} /></div><aside id="publishing" className="scroll-mt-36 xl:sticky xl:top-36"><CareerPublishingPanel career={career} bengaliIncomplete={bengaliIncomplete} onSaveDraft={saveDraft} onOpen={openVacancy} onClose={() => setConfirmation('close')} onReopen={() => setStatus('Open', 'Vacancy reopened in this demo session')} onArchive={() => setConfirmation('archive')} onPreview={() => setPreviewOpen(true)} /></aside></div>
    <AdminDialog open={previewOpen} title="Admin Preview — Demo Only" description="Compact vacancy record check. This is not the public Careers page." tone="info" confirmLabel={null} cancelLabel="Close Preview" onClose={() => setPreviewOpen(false)}><div className="space-y-4"><p className="text-xs font-bold uppercase tracking-wider text-[var(--admin-muted)]">{career.department || 'No department'} · {career.employmentType || 'No employment type'} · {career.status}</p><h3 className="break-words text-xl font-extrabold text-[var(--admin-heading)]">{displayName}</h3><p className="text-sm text-[var(--admin-muted)]">{career.location.en || 'No location'} · {career.experience.en || 'No experience'} · Deadline: {career.applicationDeadline || (career.sourceRecordExists ? 'Not provided in current source' : 'Not set')}</p><p className="whitespace-pre-wrap text-sm leading-6 text-[var(--admin-text)]">{career.description.en || 'No description yet.'}</p><div><p className="text-xs font-extrabold uppercase text-[var(--admin-muted)]">Responsibilities</p><ul className="mt-2 list-disc space-y-1 pl-5">{career.responsibilities.filter((item) => item.content.en.trim()).map((item) => <li key={item.id}>{item.content.en}</li>)}</ul></div><div><p className="text-xs font-extrabold uppercase text-[var(--admin-muted)]">Requirements</p><ul className="mt-2 list-disc space-y-1 pl-5">{career.requirements.filter((item) => item.content.en.trim()).map((item) => <li key={item.id}>{item.content.en}</li>)}</ul></div></div></AdminDialog>
    <AdminDialog open={Boolean(confirmation)} title={dialogCopy.title} description={dialogCopy.description} confirmLabel={dialogCopy.confirm} onClose={() => setConfirmation(null)} onConfirm={confirmAction} />
  </div>;
}
