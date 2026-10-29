import { useRef, useState } from 'react';
import { FileArchive, FileText, RefreshCw, Trash2, UploadCloud } from 'lucide-react';
import { AdminButton } from './Button';

export interface LocalDocumentSelection {
  name: string;
  extension: string;
  format: string;
  sizeBytes: number;
  sizeLabel: string;
}

interface DocumentUploadProps {
  selection: LocalDocumentSelection | null;
  onChange: (selection: LocalDocumentSelection | null) => void;
  supportedFormats?: string[];
  error?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(0.01, bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export function DocumentUpload({ selection, onChange, supportedFormats = ['PDF', 'ZIP'], error: externalError }: DocumentUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localError, setLocalError] = useState('');
  const accept = supportedFormats.map((format) => format === 'PDF' ? '.pdf,application/pdf' : '.zip,application/zip,application/x-zip-compressed').join(',');

  const useFile = (file?: File) => {
    setLocalError('');
    if (!file) return;
    const extension = file.name.split('.').pop()?.toLowerCase();
    const format = extension === 'pdf' ? 'PDF' : extension === 'zip' ? 'ZIP' : null;
    if (!format || !supportedFormats.includes(format)) {
      setLocalError(`Unsupported document type. Choose ${supportedFormats.join(' or ')}. Validation is local to this browser.`);
      return;
    }
    onChange({ name: file.name, extension, format, sizeBytes: file.size, sizeLabel: formatBytes(file.size) });
  };

  const openPicker = () => {
    if (inputRef.current) inputRef.current.value = '';
    inputRef.current?.click();
  };

  const error = localError || externalError;

  return (
    <div className="space-y-4">
      <input ref={inputRef} type="file" accept={accept} className="sr-only" aria-label={`Choose a ${supportedFormats.join(' or ')} document`} onChange={(event) => useFile(event.target.files?.[0])} />
      {!selection ? (
        <div className="rounded-xl border-2 border-dashed border-[var(--admin-border-strong)] bg-slate-50 p-6 text-center">
          <UploadCloud className="mx-auto h-8 w-8 text-[var(--admin-muted)]" aria-hidden="true" />
          <p className="mt-3 font-extrabold text-[var(--admin-heading)]">Select a local document</p>
          <p className="mt-1 text-sm text-[var(--admin-muted)]">{supportedFormats.join(' or ')} only · local UI validation · no upload or storage</p>
          <AdminButton variant="secondary" className="mt-4" onClick={openPicker}><FileText className="h-4 w-4" aria-hidden="true" /> Browse documents</AdminButton>
        </div>
      ) : (
        <div className="rounded-xl border border-[var(--admin-border)] p-4">
          <div className="flex min-w-0 items-start gap-3">
            {selection.format === 'ZIP' ? <FileArchive className="mt-0.5 h-6 w-6 shrink-0 text-[var(--admin-accent)]" aria-hidden="true" /> : <FileText className="mt-0.5 h-6 w-6 shrink-0 text-[var(--admin-accent)]" aria-hidden="true" />}
            <div className="min-w-0 flex-1">
              <p className="break-all font-extrabold text-[var(--admin-heading)]">{selection.name}</p>
              <p className="mt-1 text-xs font-semibold text-[var(--admin-muted)]">{selection.format} · {selection.sizeLabel} · selected in this browser only</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <AdminButton variant="secondary" onClick={openPicker}><RefreshCw className="h-4 w-4" aria-hidden="true" /> Replace</AdminButton>
            <AdminButton variant="ghost" onClick={() => { setLocalError(''); onChange(null); }}><Trash2 className="h-4 w-4" aria-hidden="true" /> Remove</AdminButton>
          </div>
        </div>
      )}
      {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">{error}</p>}
      <p className="text-xs leading-5 text-[var(--admin-muted)]">The selected file never leaves this page. No object URL, Base64 data, server validation, storage URL, or persistent attachment is created.</p>
    </div>
  );
}
