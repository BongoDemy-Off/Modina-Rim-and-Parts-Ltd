import { useMemo, useState } from 'react';
import { Archive, Copy, ImageOff, Pencil, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminNewsItems, newsFeaturedSourceWarning } from '../../data/news';
import { newsContentTypes, type AdminNewsItem } from '../../types/news';
import { AdminButton, adminButtonClass } from '../../ui/Button';
import { SectionCard } from '../../ui/Card';
import { AdminDialog } from '../../ui/Dialog';
import { DemoToast, EmptyState } from '../../ui/FeedbackStates';
import { PageHeader } from '../../ui/PageHeader';
import { ResponsiveDataList, type DataColumn } from '../../ui/ResponsiveDataList';
import { SearchFilterBar } from '../../ui/SearchFilterBar';
import { StatusBadge } from '../../ui/StatusBadge';

interface ToastMessage { title: string; description: string; tone: 'success' | 'warning' | 'info' }

export default function NewsList() {
  const [query, setQuery] = useState(''); const [contentType, setContentType] = useState('All'); const [status, setStatus] = useState('All');
  const [selected, setSelected] = useState<Array<string | number>>([]); const [archiveTarget, setArchiveTarget] = useState<AdminNewsItem | null>(null); const [toast, setToast] = useState<ToastMessage | null>(null);
  const rows = useMemo(() => adminNewsItems.filter((item) => { const search = query.trim().toLowerCase(); return (!search || `${item.title.en} ${item.excerpt.en} ${item.contentType}`.toLowerCase().includes(search)) && (contentType === 'All' || item.contentType === contentType) && (status === 'All' || item.status === status); }), [contentType, query, status]);
  const toggleSelected = (id: string | number) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const actions = (item: AdminNewsItem, includeEdit = true) => <div className="flex flex-wrap gap-1">{includeEdit && <Link to={`/admin/news/${item.id}`} className={adminButtonClass('secondary', 'px-3')} aria-label={`Edit ${item.title.en}`}><Pencil className="h-4 w-4" aria-hidden="true" /> <span className="hidden 2xl:inline">Edit</span></Link>}<AdminButton variant="ghost" className="px-3" onClick={() => setToast({ title: `Duplicate “${item.title.en}”`, description: 'Demo only — no duplicate was created.', tone: 'info' })} aria-label={`Duplicate ${item.title.en}`}><Copy className="h-4 w-4" aria-hidden="true" /></AdminButton><AdminButton variant="ghost" className="px-3 text-red-700" onClick={() => setArchiveTarget(item)} aria-label={`Archive ${item.title.en}`}><Archive className="h-4 w-4" aria-hidden="true" /></AdminButton></div>;
  const columns: DataColumn<AdminNewsItem>[] = [
    { key: 'select', label: 'Select', width: '6%', render: (item) => <input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggleSelected(item.id)} aria-label={`Select ${item.title.en}`} className="h-4 w-4 accent-[var(--admin-accent)]" /> },
    { key: 'cover', label: 'Cover', width: '10%', render: (item) => item.cover ? <img src={item.cover.src} alt="" className="h-12 w-16 rounded-md object-cover" /> : <span className="flex h-12 w-16 items-center justify-center rounded-md bg-slate-100"><ImageOff className="h-5 w-5" aria-hidden="true" /></span> },
    { key: 'title', label: 'Title', width: '30%', render: (item) => <div><p className="break-words font-extrabold leading-5 text-[var(--admin-heading)]">{item.title.en}</p><p className="mt-1 text-xs font-semibold text-amber-700">Frontend placeholder · not production media</p>{item.sourceReviewWarning && <p className="mt-1 text-xs font-semibold text-red-700">Source review required</p>}</div> },
    { key: 'type', label: 'Content Type', width: '13%', render: (item) => item.contentType },
    { key: 'date', label: 'Event / Publication', width: '13%', render: (item) => item.publicationMonth },
    { key: 'status', label: 'Status', width: '12%', render: (item) => <StatusBadge status={item.status} /> },
    { key: 'updated', label: 'Updated', width: '12%', headerClassName: 'hidden min-[1280px]:table-cell', cellClassName: 'hidden min-[1280px]:table-cell', render: (item) => item.updatedAt },
    { key: 'actions', label: 'Actions', width: '18%', render: actions },
  ];
  return <div className="space-y-6 xl:space-y-8">
    <PageHeader eyebrow="News & Events Admin · local prototype" title="News & Events" description="A separate editorial collection based on the current public News source. Nothing here changes public content or routes." actions={<Link to="/admin/news/new" className={adminButtonClass('primary')}><Plus className="h-4 w-4" aria-hidden="true" /> New News Item</Link>} />
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"><strong>Known public-source discrepancy.</strong> {newsFeaturedSourceWarning}</div>
    {toast && <DemoToast {...toast} onClose={() => setToast(null)} />}
    <SectionCard title="News & Events Collection" description={`${rows.length} of ${adminNewsItems.length} items shown`} action={selected.length ? <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{selected.length} selected</span> : undefined}>
      <div className="space-y-3 p-4 sm:p-5"><SearchFilterBar query={query} onQueryChange={setQuery} searchLabel="Search News & Events" searchPlaceholder="Search title, summary, or content type…" filters={[{ key: 'type', label: 'Content Type', value: contentType, onChange: setContentType, options: ['All', ...newsContentTypes] }, { key: 'status', label: 'Status', value: status, onChange: setStatus, options: ['All', 'Draft', 'Published', 'Archived'] }]} /><div className="flex flex-wrap gap-2 text-xs font-semibold text-[var(--admin-muted)]"><button type="button" className="min-h-11 rounded-lg px-3 hover:bg-slate-100" onClick={() => setSelected(rows.map((row) => row.id))}>Select visible</button><button type="button" className="min-h-11 rounded-lg px-3 hover:bg-slate-100 disabled:opacity-50" disabled={!selected.length} onClick={() => setSelected([])}>Clear selection</button></div></div>
      <ResponsiveDataList rows={rows} columns={columns} getPrimaryLabel={(item) => item.title.en} empty={<EmptyState title="No matching News items" description="Clear or change the local filters to see the demo collection." />} renderMobile={(item) => <div className="space-y-4"><div className="flex min-w-0 gap-3">{item.cover ? <img src={item.cover.src} alt="" className="h-20 w-24 shrink-0 rounded-lg object-cover" /> : <span className="flex h-20 w-24 shrink-0 items-center justify-center rounded-lg bg-slate-100"><ImageOff className="h-6 w-6" aria-hidden="true" /></span>}<div className="min-w-0 flex-1"><div className="flex items-start gap-2"><input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggleSelected(item.id)} aria-label={`Select ${item.title.en}`} className="mt-1 h-4 w-4 shrink-0 accent-[var(--admin-accent)]" /><div className="min-w-0"><h3 className="break-words font-extrabold leading-5 text-[var(--admin-heading)]">{item.title.en}</h3><p className="mt-1 text-xs font-bold text-[var(--admin-muted)]">{item.contentType} · {item.publicationMonth}</p></div></div><div className="mt-2"><StatusBadge status={item.status} /></div></div></div><p className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800">Current frontend placeholder · production media required</p>{item.sourceReviewWarning && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-800">{item.sourceReviewWarning}</p>}<div className="flex flex-wrap items-center justify-between gap-2"><Link to={`/admin/news/${item.id}`} className={adminButtonClass('primary', 'flex-1')}><Pencil className="h-4 w-4" aria-hidden="true" /> View / Edit</Link><div className="flex gap-1">{actions(item, false)}</div></div></div>} />
    </SectionCard>
    <AdminDialog open={Boolean(archiveTarget)} title="Archive News Item" description={archiveTarget ? `Archive “${archiveTarget.title.en}”? This demonstration will not alter public News.` : ''} onClose={() => setArchiveTarget(null)} onConfirm={() => setToast({ title: 'Archive action demonstrated', description: 'Demo only — the item remains unchanged.', tone: 'warning' })} confirmLabel="Archive in Demo" />
  </div>;
}
