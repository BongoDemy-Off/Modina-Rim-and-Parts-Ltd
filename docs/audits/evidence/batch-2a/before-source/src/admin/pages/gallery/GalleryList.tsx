import { useMemo, useState } from 'react';
import { Archive, ImageOff, Pencil, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminGalleryItems, galleryCategories, galleryDisplayStyles } from '../../data/gallery';
import type { AdminGalleryItem } from '../../types/gallery';
import { AdminButton, adminButtonClass } from '../../ui/Button';
import { SectionCard } from '../../ui/Card';
import { AdminDialog } from '../../ui/Dialog';
import { DemoToast, EmptyState } from '../../ui/FeedbackStates';
import { PageHeader } from '../../ui/PageHeader';
import { ReorderControls } from '../../ui/ReorderControls';
import { ResponsiveDataList, type DataColumn } from '../../ui/ResponsiveDataList';
import { SearchFilterBar } from '../../ui/SearchFilterBar';
import { StatusBadge } from '../../ui/StatusBadge';

function normalize(items: AdminGalleryItem[]): AdminGalleryItem[] { return items.map((item, index) => ({ ...item, sortOrder: index + 1 })); }

export default function GalleryList() {
  const [items, setItems] = useState(() => structuredClone(adminGalleryItems));
  const [query, setQuery] = useState(''); const [category, setCategory] = useState('All'); const [style, setStyle] = useState('All'); const [status, setStatus] = useState('All');
  const [selected, setSelected] = useState<Array<string | number>>([]); const [archiveTarget, setArchiveTarget] = useState<AdminGalleryItem | null>(null); const [toast, setToast] = useState<string | null>(null);
  const ordered = useMemo(() => [...items].sort((a, b) => a.sortOrder - b.sortOrder), [items]);
  const rows = useMemo(() => ordered.filter((item) => { const search = query.trim().toLowerCase(); return (!search || `${item.title.en} ${item.category}`.toLowerCase().includes(search)) && (category === 'All' || item.category === category) && (style === 'All' || item.displayStyle === style) && (status === 'All' || item.status === status); }), [category, ordered, query, status, style]);
  const move = (id: string | number, delta: -1 | 1) => setItems((current) => { const next = [...current].sort((a, b) => a.sortOrder - b.sortOrder); const index = next.findIndex((item) => item.id === id); const destination = index + delta; if (index < 0 || destination < 0 || destination >= next.length) return current; [next[index], next[destination]] = [next[destination], next[index]]; return normalize(next); });
  const toggle = (id: string | number) => setSelected((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  const actions = (item: AdminGalleryItem, showEdit = true) => <div className="flex flex-wrap gap-1">{showEdit && <Link to={`/admin/gallery/${item.id}`} className={adminButtonClass('secondary', 'px-3')} aria-label={`Edit ${item.title.en}`}><Pencil className="h-4 w-4" aria-hidden="true" /> <span className="hidden 2xl:inline">Edit</span></Link>}<AdminButton variant="ghost" className="px-3 text-red-700" onClick={() => setArchiveTarget(item)} aria-label={`Archive ${item.title.en}`}><Archive className="h-4 w-4" aria-hidden="true" /></AdminButton></div>;
  const columns: DataColumn<AdminGalleryItem>[] = [
    { key: 'select', label: 'Select', width: '6%', render: (item) => <input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggle(item.id)} aria-label={`Select ${item.title.en}`} className="h-4 w-4 accent-[var(--admin-accent)]" /> },
    { key: 'image', label: 'Image', width: '10%', render: (item) => item.media ? <img src={item.media.src} alt="" referrerPolicy="no-referrer" className="h-12 w-16 rounded-md bg-slate-100 object-cover" /> : <span className="flex h-12 w-16 items-center justify-center rounded-md bg-slate-100"><ImageOff className="h-5 w-5" aria-hidden="true" /></span> },
    { key: 'title', label: 'Title', width: '23%', render: (item) => <div><p className="font-extrabold leading-5 text-[var(--admin-heading)]">{item.title.en}</p><p className="mt-1 text-xs font-semibold text-amber-700">Current frontend placeholder · production media required</p></div> },
    { key: 'category', label: 'Category', width: '10%', render: (item) => item.category },
    { key: 'style', label: 'Style', width: '9%', render: (item) => item.displayStyle },
    { key: 'status', label: 'Status', width: '10%', render: (item) => <StatusBadge status={item.status} /> },
    { key: 'order', label: 'Global order', width: '18%', render: (item) => <ReorderControls position={item.sortOrder} total={items.length} itemLabel={item.title.en} onMoveEarlier={() => move(item.id, -1)} onMoveLater={() => move(item.id, 1)} /> },
    { key: 'updated', label: 'Updated', width: '12%', headerClassName: 'hidden min-[1380px]:table-cell', cellClassName: 'hidden min-[1380px]:table-cell', render: (item) => item.updatedAt },
    { key: 'actions', label: 'Actions', width: '12%', render: actions },
  ];
  return <div className="space-y-6 xl:space-y-8">
    <PageHeader eyebrow="Gallery Admin · local prototype" title="Gallery" description="Manage isolated demo copies of the current Gallery sequence. Admin search and ordering never change the public Gallery." actions={<Link to="/admin/gallery/new" className={adminButtonClass('primary')}><Plus className="h-4 w-4" aria-hidden="true" /> New Gallery Item</Link>} />
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"><strong>Media truth:</strong> every seeded image is a current frontend Picsum placeholder, not verified client-owned photography.</div>
    {toast && <DemoToast title="Gallery action simulated" description={toast} tone="warning" onClose={() => setToast(null)} />}
    <SectionCard title="Gallery Collection" description={`${rows.length} of ${items.length} items shown`} action={selected.length ? <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">{selected.length} selected</span> : undefined}>
      <div className="space-y-3 p-4 sm:p-5"><SearchFilterBar query={query} onQueryChange={setQuery} searchLabel="Search Gallery Admin" searchPlaceholder="Search title or category…" filters={[{ key: 'category', label: 'Category', value: category, onChange: setCategory, options: ['All', ...galleryCategories] }, { key: 'style', label: 'Display Style', value: style, onChange: setStyle, options: ['All', ...galleryDisplayStyles] }, { key: 'status', label: 'Status', value: status, onChange: setStatus, options: ['All', 'Draft', 'Published', 'Archived'] }]} /><p className="text-xs leading-5 text-[var(--admin-muted)]">Search is an Admin collection convenience only; the approved public Gallery has category filtering but no search.</p></div>
      <ResponsiveDataList rows={rows} columns={columns} getPrimaryLabel={(item) => item.title.en} empty={<EmptyState title="No matching Gallery items" description="Clear or change the local Admin filters." />} renderMobile={(item) => <div className="space-y-4"><div className="flex min-w-0 gap-3">{item.media ? <img src={item.media.src} alt="" referrerPolicy="no-referrer" className="h-24 w-24 shrink-0 rounded-lg object-cover" /> : <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-slate-100"><ImageOff className="h-6 w-6" aria-hidden="true" /></span>}<div className="min-w-0 flex-1"><div className="flex items-start gap-2"><input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggle(item.id)} aria-label={`Select ${item.title.en}`} className="mt-1 h-4 w-4 shrink-0 accent-[var(--admin-accent)]" /><h3 className="break-words font-extrabold leading-5 text-[var(--admin-heading)]">{item.title.en}</h3></div><p className="mt-2 text-xs font-bold text-[var(--admin-muted)]">{item.category} · {item.displayStyle}</p><div className="mt-2"><StatusBadge status={item.status} /></div></div></div><p className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-bold text-amber-900">Current frontend placeholder — production media required</p><ReorderControls position={item.sortOrder} total={items.length} itemLabel={item.title.en} onMoveEarlier={() => move(item.id, -1)} onMoveLater={() => move(item.id, 1)} /><div className="flex gap-2"><Link to={`/admin/gallery/${item.id}`} className={adminButtonClass('primary', 'flex-1')}><Pencil className="h-4 w-4" aria-hidden="true" /> Edit</Link>{actions(item, false)}</div></div>} />
    </SectionCard>
    <AdminDialog open={Boolean(archiveTarget)} title="Archive Gallery Item" description={archiveTarget ? `Archive “${archiveTarget.title.en}” in this demo collection? The public Gallery remains unchanged.` : ''} confirmLabel="Archive in Demo" onClose={() => setArchiveTarget(null)} onConfirm={() => { if (archiveTarget) setItems((current) => current.map((item) => item.id === archiveTarget.id ? { ...item, status: 'Archived' } : item)); setToast('Archived status exists only in this local collection session. Nothing was persisted.'); }} />
  </div>;
}
