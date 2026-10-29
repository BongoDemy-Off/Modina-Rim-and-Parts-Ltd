import { Archive, Eye, Save, Send } from 'lucide-react';
import type { AdminProduct } from '../../types/products';
import { AdminButton } from '../../ui/Button';
import { AdminSwitch } from '../../ui/FormControls';
import { StatusBadge } from '../../ui/StatusBadge';

interface ProductPublishingPanelProps {
  product: AdminProduct;
  onProductChange: (product: AdminProduct) => void;
  onSaveDraft: () => void;
  onPreview: () => void;
  onPublish: () => void;
  onArchive: () => void;
}

export function ProductPublishingPanel({ product, onProductChange, onSaveDraft, onPreview, onPublish, onArchive }: ProductPublishingPanelProps) {
  return (
    <div className="space-y-5 p-4 sm:p-5">
      <dl className="space-y-3 text-sm">
        <div className="flex items-center justify-between gap-3"><dt className="font-semibold text-[var(--admin-muted)]">Status</dt><dd><StatusBadge status={product.status} /></dd></div>
        <div className="flex items-start justify-between gap-3"><dt className="font-semibold text-[var(--admin-muted)]">Last updated</dt><dd className="text-right font-bold text-[var(--admin-heading)]">{product.updatedAt}</dd></div>
        <div className="flex items-start justify-between gap-3"><dt className="font-semibold text-[var(--admin-muted)]">Editor</dt><dd className="text-right font-bold text-[var(--admin-heading)]">{product.editor}</dd></div>
      </dl>
      <div className="border-t border-[var(--admin-border)] pt-3">
        <AdminSwitch label="Featured product" checked={product.featured} onChange={(featured) => onProductChange({ ...product, featured })} />
        <p className="px-2 text-xs leading-5 text-[var(--admin-muted)]">Future CMS metadata only. No current public behavior or ordering consumes this value.</p>
      </div>
      <div className="grid gap-2 border-t border-[var(--admin-border)] pt-4">
        <AdminButton variant="secondary" onClick={onSaveDraft}><Save className="h-4 w-4" aria-hidden="true" /> Save Draft</AdminButton>
        <AdminButton variant="ghost" onClick={onPreview}><Eye className="h-4 w-4" aria-hidden="true" /> Admin Preview</AdminButton>
        <AdminButton variant="primary" onClick={onPublish}><Send className="h-4 w-4" aria-hidden="true" /> Publish Demo</AdminButton>
        <AdminButton variant="ghost" className="text-red-700" onClick={onArchive}><Archive className="h-4 w-4" aria-hidden="true" /> Archive Product</AdminButton>
      </div>
      <p className="text-xs leading-5 text-[var(--admin-muted)]">All publishing controls are a local UI simulation. No content is persisted or sent to the public website.</p>
    </div>
  );
}
