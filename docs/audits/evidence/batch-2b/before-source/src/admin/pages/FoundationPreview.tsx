import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Eye, Save, Send, Trash2 } from 'lucide-react';
import { AdminButton, adminButtonClass } from '../ui/Button';
import { SectionCard } from '../ui/Card';
import { AdminDialog } from '../ui/Dialog';
import { DemoToast, EmptyState, ErrorState, LoadingState } from '../ui/FeedbackStates';
import { AdminCheckbox, AdminInput, AdminSelect, AdminSwitch, AdminTextarea } from '../ui/FormControls';
import { MediaUpload } from '../ui/MediaUpload';
import { MultilingualFields } from '../ui/MultilingualFields';
import { PageHeader } from '../ui/PageHeader';
import { ResponsiveDataList, type DataColumn } from '../ui/ResponsiveDataList';
import { SearchFilterBar } from '../ui/SearchFilterBar';
import { StatusBadge } from '../ui/StatusBadge';
import type { AdminStatus } from '../types';

interface ExampleRow {
  id: number;
  name: string;
  sku: string;
  category: string;
  status: AdminStatus;
}

const exampleRows: ExampleRow[] = [
  { id: 1, name: 'Motor Cycle Center Stand — reinforced export specification', sku: 'MRP-MCS-002', category: 'Motorcycle parts', status: 'Published' },
  { id: 2, name: 'ভ্যান রিকশা জাম্বো রিম — দীর্ঘ নামের বাংলা প্রতিক্রিয়াশীল উদাহরণ', sku: 'MRP-VRJ-015', category: 'Rims', status: 'Draft' },
  { id: 3, name: 'Box Frame Bearing & Racer (Black, Blue & Red)', sku: 'MRP-BFR-001', category: 'Hardware', status: 'Scheduled' },
];

const exampleColumns: DataColumn<ExampleRow>[] = [
  { key: 'name', label: 'Product', width: '43%', render: (row) => <p className={`break-words font-bold text-[var(--admin-heading)] ${row.id === 2 ? 'admin-bn-text' : ''}`}>{row.name}</p> },
  { key: 'sku', label: 'SKU', width: '20%', render: (row) => <code className="break-all text-xs font-bold">{row.sku}</code> },
  { key: 'category', label: 'Category', width: '20%', render: (row) => row.category },
  { key: 'status', label: 'Status', width: '17%', render: (row) => <StatusBadge status={row.status} /> },
];

export default function FoundationPreview() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [switchOn, setSwitchOn] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(true);

  const filteredRows = useMemo(() => exampleRows.filter((row) => {
    const matchesQuery = `${row.name} ${row.sku}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'All' || row.status === filter;
    return matchesQuery && matchesFilter;
  }), [filter, query]);

  return (
    <div className="space-y-6 xl:space-y-8">
      <PageHeader
        eyebrow="Local prototype review"
        title="UI Foundation — Internal QA"
        description="Internal interface-pattern review only. Every interaction on this page remains local and temporary."
        actions={<Link to="/admin/dashboard" className={adminButtonClass('secondary')}><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Dashboard</Link>}
      />

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"><strong>UI demonstration only.</strong> Inputs, filters, uploads, statuses, publishing controls, and feedback below are not connected to any service.</div>

      <SectionCard title="Actions & Publishing Language" description="Reusable hierarchy for future editors; buttons do not save or publish here">
        <div className="flex flex-wrap gap-2 p-4 sm:p-5">
          <AdminButton variant="primary"><Send className="h-4 w-4" aria-hidden="true" /> Primary</AdminButton>
          <AdminButton variant="secondary"><Save className="h-4 w-4" aria-hidden="true" /> Save Draft</AdminButton>
          <AdminButton variant="ghost"><Eye className="h-4 w-4" aria-hidden="true" /> Admin Preview</AdminButton>
          <AdminButton variant="destructive"><Trash2 className="h-4 w-4" aria-hidden="true" /> Destructive</AdminButton>
          <AdminButton loading>Loading</AdminButton>
          <AdminButton disabled>Disabled</AdminButton>
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t border-[var(--admin-border)] px-4 py-4 sm:px-5">
          {(['Draft', 'Scheduled', 'Published', 'Archived', 'Open', 'Closed', 'New', 'Reviewed'] as AdminStatus[]).map((status) => <StatusBadge key={status} status={status} />)}
        </div>
      </SectionCard>

      <div className="grid min-w-0 gap-6 xl:grid-cols-2">
        <SectionCard title="Form Controls" description="Consistent labels, help text, errors, and mobile-friendly controls">
          <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
            <AdminInput label="Product SKU" defaultValue="MRP-MCS-002" helpText="Shared across English and বাংলা content." />
            <AdminSelect label="Status" defaultValue="Draft"><option>Draft</option><option>Scheduled</option><option>Published</option><option>Archived</option></AdminSelect>
            <div className="sm:col-span-2"><AdminTextarea label="Internal note" placeholder="Visible to future Admin users only" error="Example error: add a review note before continuing." /></div>
            <AdminCheckbox label="Feature on homepage" description="Local checkbox demonstration only." defaultChecked />
            <AdminSwitch label="Allow preview" checked={switchOn} onChange={setSwitchOn} />
          </div>
        </SectionCard>

        <SectionCard title="Feedback & Confirmation" description="Restrained, recoverable interface states">
          <div className="space-y-4 p-4 sm:p-5">
            {toastVisible ? <DemoToast onClose={() => setToastVisible(false)} /> : <AdminButton variant="secondary" onClick={() => setToastVisible(true)}>Show feedback example</AdminButton>}
            <LoadingState label="Loading content preview locally…" />
            <ErrorState onRetry={() => setToastVisible(true)} />
            <EmptyState title="No products found" description="Try changing the local filters or add a product in a future phase." action={<AdminButton variant="primary"><Check className="h-4 w-4" aria-hidden="true" /> Add Product</AdminButton>} />
            <AdminButton variant="destructive" onClick={() => setDialogOpen(true)}>Open confirmation dialog</AdminButton>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Search, Filter & Responsive Data List" description="Desktop table becomes labeled record cards below 768px — without document-level horizontal scrolling">
        <div className="p-4 sm:p-5"><SearchFilterBar query={query} onQueryChange={setQuery} filter={filter} onFilterChange={setFilter} options={['All', 'Draft', 'Scheduled', 'Published']} /></div>
        <ResponsiveDataList rows={filteredRows} columns={exampleColumns} getPrimaryLabel={(row) => row.name} empty={<EmptyState title="No matching products" description="Clear the local filters to restore the examples." />} />
      </SectionCard>

      <div className="grid min-w-0 gap-6 xl:grid-cols-2">
        <SectionCard title="Multilingual Fields" description="One content item with shared fields and English/Bengali translated fields">
          <div className="p-4 sm:p-5"><MultilingualFields /></div>
        </SectionCard>
        <SectionCard title="Media Upload" description="Static demo preview plus optional browser-memory preview; no upload or persistence">
          <div className="p-4 sm:p-5"><MediaUpload initialDemo /></div>
        </SectionCard>
      </div>

      <AdminDialog
        open={dialogOpen}
        title="Confirm local demonstration"
        description="This dialog proves focus entry, focus containment, Escape close, backdrop close, and focus return."
        onClose={() => setDialogOpen(false)}
        onConfirm={() => setToastVisible(true)}
      >
        Confirming only closes this dialog and shows local UI feedback. It does not delete, publish, or persist anything.
      </AdminDialog>
    </div>
  );
}
