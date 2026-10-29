import type { ReactNode } from 'react';
import type { AdminStatus } from '../../types';
import { Archive, Eye, Save, Send } from 'lucide-react';
import { AdminButton } from '../../ui/Button';
import { StatusBadge } from '../../ui/StatusBadge';

interface EditorialPublishingPanelProps {
  status: Extract<AdminStatus, 'Draft' | 'Published' | 'Archived'>;
  updatedAt: string;
  editor: string;
  estimatedReadTime: string;
  sourceReadTime?: string;
  warnings?: string[];
  children?: ReactNode;
  onSaveDraft: () => void;
  onPreview: () => void;
  onPublish: () => void;
  onArchive: () => void;
}

export function EditorialPublishingPanel({ status, updatedAt, editor, estimatedReadTime, sourceReadTime, warnings = [], children, onSaveDraft, onPreview, onPublish, onArchive }: EditorialPublishingPanelProps) {
  return (
    <div className="space-y-5 p-4 sm:p-5">
      <dl className="space-y-3 text-sm">
        <div className="flex items-center justify-between gap-3"><dt className="font-semibold text-[var(--admin-muted)]">Status</dt><dd><StatusBadge status={status} /></dd></div>
        <div className="flex items-start justify-between gap-3"><dt className="font-semibold text-[var(--admin-muted)]">Last updated</dt><dd className="text-right font-bold text-[var(--admin-heading)]">{updatedAt}</dd></div>
        <div className="flex items-start justify-between gap-3"><dt className="font-semibold text-[var(--admin-muted)]">Editor</dt><dd className="text-right font-bold text-[var(--admin-heading)]">{editor}</dd></div>
        <div className="flex items-start justify-between gap-3"><dt className="font-semibold text-[var(--admin-muted)]">Estimated read time</dt><dd className="text-right font-bold text-[var(--admin-heading)]">{estimatedReadTime}</dd></div>
        {sourceReadTime && <div className="flex items-start justify-between gap-3"><dt className="font-semibold text-[var(--admin-muted)]">Current source label</dt><dd className="text-right text-xs font-bold text-[var(--admin-heading)]">{sourceReadTime}</dd></div>}
      </dl>
      {children && <div className="border-t border-[var(--admin-border)] pt-3">{children}</div>}
      {warnings.length > 0 && <div className="space-y-2 border-t border-[var(--admin-border)] pt-4">{warnings.map((warning) => <p key={warning} className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold leading-5 text-amber-900">{warning}</p>)}</div>}
      <div className="grid gap-2 border-t border-[var(--admin-border)] pt-4">
        <AdminButton variant="secondary" onClick={onSaveDraft}><Save className="h-4 w-4" aria-hidden="true" /> Save Draft</AdminButton>
        <AdminButton variant="ghost" onClick={onPreview}><Eye className="h-4 w-4" aria-hidden="true" /> Admin Preview</AdminButton>
        <AdminButton variant="primary" onClick={onPublish}><Send className="h-4 w-4" aria-hidden="true" /> Publish Demo</AdminButton>
        <AdminButton variant="ghost" className="text-red-700" onClick={onArchive}><Archive className="h-4 w-4" aria-hidden="true" /> Archive</AdminButton>
      </div>
      <p className="text-xs leading-5 text-[var(--admin-muted)]">All controls are local UI simulations. Nothing is saved, scheduled, uploaded, or published.</p>
    </div>
  );
}
