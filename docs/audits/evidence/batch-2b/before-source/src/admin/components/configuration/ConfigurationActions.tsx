import { Eye, Save, Send } from 'lucide-react';
import type { ReactNode } from 'react';
import { AdminButton } from '../../ui/Button';
import { SectionCard } from '../../ui/Card';

export function ConfigurationActions({ dirty, onSave, onPreview, onPublish }: { dirty: boolean; onSave: () => void; onPreview: () => void; onPublish: () => void }) {
  return (
    <SectionCard title="Configuration workflow" description="Current frontend baseline → Unsaved changes → Save Draft → Preview → Publish Demo. All actions stay in this browser session only.">
      <div className="grid gap-3 p-4 sm:grid-cols-3 sm:p-5">
        <AdminButton variant="secondary" onClick={onSave}><Save className="h-4 w-4" aria-hidden="true" /> Save Draft</AdminButton>
        <AdminButton variant="ghost" onClick={onPreview}><Eye className="h-4 w-4" aria-hidden="true" /> Admin Preview</AdminButton>
        <AdminButton variant="primary" onClick={onPublish}><Send className="h-4 w-4" aria-hidden="true" /> Publish Demo</AdminButton>
      </div>
      <p className="px-4 pb-4 text-xs font-semibold text-[var(--admin-muted)] sm:px-5">{dirty ? 'Unsaved local changes.' : 'Local state matches the last demo action.'} No public content is connected.</p>
    </SectionCard>
  );
}

export function ReviewNotice({ children, tone = 'warning' }: { children: ReactNode; tone?: 'warning' | 'info' }) {
  return <p className={`rounded-lg border px-4 py-3 text-sm font-semibold leading-6 ${tone === 'warning' ? 'border-amber-200 bg-amber-50 text-amber-950' : 'border-sky-200 bg-sky-50 text-sky-950'}`}>{children}</p>;
}
