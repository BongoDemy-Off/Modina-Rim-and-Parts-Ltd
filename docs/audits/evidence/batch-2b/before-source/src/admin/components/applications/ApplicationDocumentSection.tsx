import { FileX2, Mail } from 'lucide-react';
import { SectionCard } from '../../ui/Card';

export function ApplicationDocumentSection() {
  return (
    <SectionCard title="CV / Document Availability" description="Current source behavior, not attachment metadata.">
      <div className="space-y-4 p-4 sm:p-5">
        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"><FileX2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-600" aria-hidden="true" /><div><p className="font-extrabold text-[var(--admin-heading)]">No CV collected through website form.</p><p className="mt-1 text-sm leading-6 text-[var(--admin-muted)]">The vacancy application form contains no document-upload field, so this application record has no filename, file type, file size, download, or stored attachment.</p></div></div>
        <div className="flex items-start gap-3 rounded-xl border border-sky-200 bg-sky-50 p-4"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" /><p className="text-sm leading-6 text-sky-950">The current public website offers a separate email-CV pathway. That external email flow is not linked to the website form, this application record, a vacancy relationship, or Admin data.</p></div>
      </div>
    </SectionCard>
  );
}

