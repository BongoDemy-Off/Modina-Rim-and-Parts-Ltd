import { AlertTriangle, CheckCircle2, FileX2 } from 'lucide-react';
import type { AdminDownload, LocalDocumentSelection } from '../../types/downloads';
import { DocumentUpload, type LocalDocumentSelection as UiDocumentSelection } from '../../ui/DocumentUpload';

export function DownloadFileSection({ item, onChange, error }: { item: AdminDownload; onChange: (selection: LocalDocumentSelection | null) => void; error?: string }) {
  const selected = item.selectedFile;
  const readiness = selected ? 'CMS-ready local selection present for this demo session' : item.sourceRecordExists ? 'Migration incomplete — current frontend metadata exists, but no source file is attached.' : 'File missing — select a local PDF or ZIP before simulated Publish.';
  const adaptSelection = (selection: UiDocumentSelection | null) => onChange(selection ? { ...selection, extension: selection.extension as 'pdf' | 'zip', format: selection.format as 'PDF' | 'ZIP' } : null);

  return (
    <div className="space-y-5">
      <div className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${selected ? 'border-emerald-200 bg-emerald-50 text-emerald-950' : 'border-amber-200 bg-amber-50 text-amber-950'}`}>
        {selected ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" /> : <FileX2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />}
        <div><p className="font-extrabold">{readiness}</p><p className="mt-1 leading-5">Current frontend record: {item.sourceRecordExists ? 'Yes' : 'No'} · CMS-ready downloadable file: {selected ? 'Yes, locally selected only' : 'No'}</p></div>
      </div>
      {item.sourceRecordExists && <dl className="grid gap-3 rounded-lg border border-[var(--admin-border)] bg-slate-50 p-4 text-sm sm:grid-cols-2">
        <div><dt className="font-semibold text-[var(--admin-muted)]">Current source format</dt><dd className="mt-1 font-extrabold text-[var(--admin-heading)]">{item.sourceMetadata.format}</dd></div>
        <div><dt className="font-semibold text-[var(--admin-muted)]">Current source size label</dt><dd className="mt-1 font-extrabold text-[var(--admin-heading)]">{item.sourceMetadata.sizeLabel}</dd></div>
        <div><dt className="font-semibold text-[var(--admin-muted)]">Current source extent</dt><dd className="mt-1 font-extrabold text-[var(--admin-heading)]">{item.sourceMetadata.extentLabel}</dd></div>
        <div><dt className="font-semibold text-[var(--admin-muted)]">Source Year</dt><dd className="mt-1 font-extrabold text-[var(--admin-heading)]">{item.sourceMetadata.sourceYear}</dd></div>
      </dl>}
      <DocumentUpload selection={selected} onChange={adaptSelection} supportedFormats={['PDF', 'ZIP']} error={error} />
      {item.migrationRequired && <p className="flex items-start gap-2 text-xs leading-5 text-amber-900"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> Selecting a local file demonstrates editor readiness but does not migrate, upload, or attach it to the current public record.</p>}
    </div>
  );
}
