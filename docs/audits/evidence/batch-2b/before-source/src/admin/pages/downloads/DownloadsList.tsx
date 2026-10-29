import { useMemo, useState } from 'react';
import { Archive, FileArchive, FileText, Pencil, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminDownloads, downloadCategories } from '../../data/downloads';
import type { AdminDownload } from '../../types/downloads';
import { AdminButton, adminButtonClass } from '../../ui/Button';
import { SectionCard } from '../../ui/Card';
import { AdminDialog } from '../../ui/Dialog';
import { DemoToast, EmptyState } from '../../ui/FeedbackStates';
import { PageHeader } from '../../ui/PageHeader';
import { ReorderControls } from '../../ui/ReorderControls';
import { ResponsiveDataList, type DataColumn } from '../../ui/ResponsiveDataList';
import { SearchFilterBar } from '../../ui/SearchFilterBar';
import { StatusBadge } from '../../ui/StatusBadge';

function normalize(items: AdminDownload[]): AdminDownload[] { return items.map((item, index) => ({ ...item, sortOrder: index + 1 })); }

export default function DownloadsList() {
  const [items, setItems] = useState(() => structuredClone(adminDownloads));
  const [query, setQuery] = useState(''); const [category, setCategory] = useState('All'); const [format, setFormat] = useState('All'); const [status, setStatus] = useState('All');
  const [selected, setSelected] = useState<Array<string | number>>([]); const [archiveTarget, setArchiveTarget] = useState<AdminDownload | null>(null); const [toast, setToast] = useState<string | null>(null);
  const ordered = useMemo(() => [...items].sort((a, b) => a.sortOrder - b.sortOrder), [items]);
  const rows = useMemo(() => ordered.filter((item) => { const search = query.trim().toLowerCase(); const activeFormat = item.selectedFile?.format || item.sourceMetadata.format; return (!search || `${item.title.en} ${item.description.en} ${item.category}`.toLowerCase().includes(search)) && (category === 'All' || item.category === category) && (format === 'All' || activeFormat === format) && (status === 'All' || item.status === status); }), [category, format, ordered, query, status]);
  const move = (id: string | number, delta: -1 | 1) => setItems((current) => { const next = [...current].sort((a, b) => a.sortOrder - b.sortOrder); const index = next.findIndex((item) => item.id === id); const destination = index + delta; if (index < 0 || destination < 0 || destination >= next.length) return current; [next[index], next[destination]] = [next[destination], next[index]]; return normalize(next); });
  const toggle = (id: string | number) => setSelected((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  const actions = (item: AdminDownload, showEdit = true) => <div className="flex flex-wrap gap-1">{showEdit && <Link to={`/admin/downloads/${item.id}`} className={adminButtonClass('secondary', 'px-3')} aria-label={`Edit ${item.title.en}`}><Pencil className="h-4 w-4" aria-hidden="true" /> <span className="hidden 2xl:inline">Edit</span></Link>}<AdminButton variant="ghost" className="px-3 text-red-700" onClick={() => setArchiveTarget(item)} aria-label={`Archive ${item.title.en}`}><Archive className="h-4 w-4" aria-hidden="true" /></AdminButton></div>;
  const columns: DataColumn<AdminDownload>[] = [
    { key: 'select', label: 'Select', width: '6%', render: (item) => <input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggle(item.id)} aria-label={`Select ${item.title.en}`} className="h-4 w-4 accent-[var(--admin-accent)]" /> },
    { key: 'icon', label: 'File', width: '7%', render: (item) => item.sourceMetadata.format === 'ZIP' ? <FileArchive className="h-6 w-6 text-[var(--admin-muted)]" aria-hidden="true" /> : <FileText className="h-6 w-6 text-[var(--admin-muted)]" aria-hidden="true" /> },
    { key: 'title', label: 'Title', width: '24%', render: (item) => <div><p className="font-extrabold leading-5 text-[var(--admin-heading)]">{item.title.en}</p><p className="mt-1 text-xs font-semibold text-amber-700">Migration incomplete · file missing</p></div> },
    { key: 'category', label: 'Category', width: '10%', render: (item) => item.category },
    { key: 'format', label: 'Format', width: '8%', render: (item) => item.sourceMetadata.format },
    { key: 'year', label: 'Source Year', width: '9%', render: (item) => item.sourceMetadata.sourceYear },
    { key: 'status', label: 'Status', width: '10%', render: (item) => <StatusBadge status={item.status} /> },
    { key: 'order', label: 'Global order', width: '17%', render: (item) => <ReorderControls position={item.sortOrder} total={items.length} itemLabel={item.title.en} onMoveEarlier={() => move(item.id, -1)} onMoveLater={() => move(item.id, 1)} /> },
    { key: 'actions', label: 'Actions', width: '9%', render: actions },
  ];
  return <div className="space-y-6 xl:space-y-8">
    <PageHeader eyebrow="Downloads Admin · local prototype" title="Downloads" description="Manage global ordering and metadata-only demo copies. No file is attached to any seeded public record." actions={<Link to="/admin/downloads/new" className={adminButtonClass('primary')}><Plus className="h-4 w-4" aria-hidden="true" /> New Download</Link>} />
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"><strong>Migration incomplete.</strong> Current frontend metadata exists, but no seeded Download has a source file or URL. Existing Published labels are retained for historical frontend fidelity.</div>
    {toast && <DemoToast title="Download action simulated" description={toast} tone="warning" onClose={() => setToast(null)} />}
    <SectionCard title="Download Collection" description={`${rows.length} of ${items.length} records shown`}>
      <div className="space-y-3 p-4 sm:p-5"><SearchFilterBar query={query} onQueryChange={setQuery} searchLabel="Search Downloads" searchPlaceholder="Search title, description, or category…" filters={[{ key: 'category', label: 'Category', value: category, onChange: setCategory, options: ['All', ...downloadCategories] }, { key: 'format', label: 'Format', value: format, onChange: setFormat, options: ['All', 'PDF', 'ZIP'] }, { key: 'status', label: 'Status', value: status, onChange: setStatus, options: ['All', 'Draft', 'Published', 'Archived'] }]} /><p className="text-xs leading-5 text-[var(--admin-muted)]">Certificates remains available because it exists in the public filter taxonomy; no records are manufactured for it. Filtering preserves relative global order.</p></div>
      <ResponsiveDataList rows={rows} columns={columns} getPrimaryLabel={(item) => item.title.en} empty={<EmptyState title="No matching Downloads" description="The selected category may intentionally contain zero current records." />} renderMobile={(item) => <div className="space-y-4"><div className="flex min-w-0 gap-3"><span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-100">{item.sourceMetadata.format === 'ZIP' ? <FileArchive className="h-6 w-6" aria-hidden="true" /> : <FileText className="h-6 w-6" aria-hidden="true" />}</span><div className="min-w-0 flex-1"><div className="flex items-start gap-2"><input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggle(item.id)} aria-label={`Select ${item.title.en}`} className="mt-1 h-4 w-4 shrink-0 accent-[var(--admin-accent)]" /><h3 className="break-words font-extrabold leading-5 text-[var(--admin-heading)]">{item.title.en}</h3></div><p className="mt-2 text-xs font-bold text-[var(--admin-muted)]">{item.category} · {item.sourceMetadata.format} · Source Year {item.sourceMetadata.sourceYear}</p><div className="mt-2"><StatusBadge status={item.status} /></div></div></div><p className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-bold leading-5 text-amber-900">Migration incomplete — current frontend metadata exists, but no source file is attached.</p><ReorderControls position={item.sortOrder} total={items.length} itemLabel={item.title.en} onMoveEarlier={() => move(item.id, -1)} onMoveLater={() => move(item.id, 1)} /><div className="flex gap-2"><Link to={`/admin/downloads/${item.id}`} className={adminButtonClass('primary', 'flex-1')}><Pencil className="h-4 w-4" aria-hidden="true" /> Edit</Link>{actions(item, false)}</div></div>} />
    </SectionCard>
    <AdminDialog open={Boolean(archiveTarget)} title="Archive Download" description={archiveTarget ? `Archive “${archiveTarget.title.en}” locally? No public metadata or file state will change.` : ''} confirmLabel="Archive in Demo" onClose={() => setArchiveTarget(null)} onConfirm={() => { if (archiveTarget) setItems((current) => current.map((item) => item.id === archiveTarget.id ? { ...item, status: 'Archived' } : item)); setToast('Archived status exists only in this collection session. Nothing was persisted.'); }} />
  </div>;
}
