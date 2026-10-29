import { Archive, Eye, Lock, RotateCcw, Save, Send } from 'lucide-react';
import type { AdminCareer } from '../../types/careers';
import { AdminButton } from '../../ui/Button';
import { SectionCard } from '../../ui/Card';
import { StatusBadge } from '../../ui/StatusBadge';

export function CareerPublishingPanel({ career, bengaliIncomplete, onSaveDraft, onOpen, onClose, onReopen, onArchive, onPreview }: { career: AdminCareer; bengaliIncomplete: boolean; onSaveDraft: () => void; onOpen: () => void; onClose: () => void; onReopen: () => void; onArchive: () => void; onPreview: () => void }) {
  return (
    <SectionCard title="4. Publishing" description="Local vacancy lifecycle demonstration">
      <div className="space-y-5 p-4 sm:p-5">
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-3"><dt className="font-semibold text-[var(--admin-muted)]">Status</dt><dd><StatusBadge status={career.status} /></dd></div>
          <div className="flex justify-between gap-3"><dt className="font-semibold text-[var(--admin-muted)]">Deadline</dt><dd className="max-w-[60%] text-right font-extrabold text-[var(--admin-heading)]">{career.applicationDeadline || (career.sourceRecordExists ? 'Not provided in current source' : 'Not set')}</dd></div>
          <div className="flex justify-between gap-3"><dt className="font-semibold text-[var(--admin-muted)]">Last edited</dt><dd className="text-right font-extrabold text-[var(--admin-heading)]">{career.updatedAt}</dd></div>
          <div className="flex justify-between gap-3"><dt className="font-semibold text-[var(--admin-muted)]">Editor</dt><dd className="text-right font-extrabold text-[var(--admin-heading)]">{career.editor}</dd></div>
        </dl>
        {bengaliIncomplete && <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold leading-5 text-amber-900">Bengali vacancy content is incomplete. This is a warning, not an Open blocker.</p>}
        <div className="grid gap-2 border-t border-[var(--admin-border)] pt-4">
          <AdminButton variant="secondary" onClick={onSaveDraft}><Save className="h-4 w-4" aria-hidden="true" /> Save Draft</AdminButton>
          <AdminButton variant="ghost" onClick={onPreview}><Eye className="h-4 w-4" aria-hidden="true" /> Admin Preview</AdminButton>
          {career.status !== 'Open' && career.status !== 'Archived' && <AdminButton variant="primary" onClick={career.status === 'Closed' ? onReopen : onOpen}>{career.status === 'Closed' ? <RotateCcw className="h-4 w-4" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />} {career.status === 'Closed' ? 'Reopen Vacancy' : 'Open Vacancy'}</AdminButton>}
          {career.status === 'Open' && <AdminButton variant="secondary" onClick={onClose}><Lock className="h-4 w-4" aria-hidden="true" /> Close Vacancy</AdminButton>}
          {career.status !== 'Archived' && <AdminButton variant="ghost" className="text-red-700" onClick={onArchive}><Archive className="h-4 w-4" aria-hidden="true" /> Archive</AdminButton>}
        </div>
        <p className="text-xs leading-5 text-[var(--admin-muted)]">No action changes the public Careers page, applicant records, email, or persistent data.</p>
      </div>
    </SectionCard>
  );
}
