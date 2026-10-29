import { useMemo, useState } from 'react';
import { Archive, Pencil, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminFaqs, faqCategories } from '../../data/faq';
import type { AdminFaq, FaqCategory } from '../../types/faq';
import { AdminButton, adminButtonClass } from '../../ui/Button';
import { SectionCard } from '../../ui/Card';
import { AdminDialog } from '../../ui/Dialog';
import { DemoToast, EmptyState } from '../../ui/FeedbackStates';
import { PageHeader } from '../../ui/PageHeader';
import { ReorderControls } from '../../ui/ReorderControls';
import { ResponsiveDataList, type DataColumn } from '../../ui/ResponsiveDataList';
import { SearchFilterBar } from '../../ui/SearchFilterBar';
import { StatusBadge } from '../../ui/StatusBadge';

const orderedFaqs = (items: AdminFaq[]) => [...items].sort((a, b) => faqCategories.indexOf(a.category as FaqCategory) - faqCategories.indexOf(b.category as FaqCategory) || a.categoryOrder - b.categoryOrder);

export default function FaqList() {
  const [items, setItems] = useState(() => structuredClone(adminFaqs)); const [query, setQuery] = useState(''); const [category, setCategory] = useState('All'); const [status, setStatus] = useState('All');
  const [selected, setSelected] = useState<Array<string | number>>([]); const [archiveTarget, setArchiveTarget] = useState<AdminFaq | null>(null); const [toast, setToast] = useState<string | null>(null);
  const rows = useMemo(() => orderedFaqs(items).filter((item) => { const search = query.trim().toLowerCase(); return (!search || `${item.question.en} ${item.answer.en} ${item.category}`.toLowerCase().includes(search)) && (category === 'All' || item.category === category) && (status === 'All' || item.status === status); }), [category, items, query, status]);
  const categoryTotal = (item: AdminFaq) => items.filter((candidate) => candidate.category === item.category).length;
  const move = (id: string | number, delta: -1 | 1) => setItems((current) => { const target = current.find((item) => item.id === id); if (!target || !target.category) return current; const peers = current.filter((item) => item.category === target.category).sort((a, b) => a.categoryOrder - b.categoryOrder); const index = peers.findIndex((item) => item.id === id); const destination = index + delta; if (destination < 0 || destination >= peers.length) return current; const other = peers[destination]; return current.map((item) => item.id === target.id ? { ...item, categoryOrder: other.categoryOrder } : item.id === other.id ? { ...item, categoryOrder: target.categoryOrder } : item); });
  const toggle = (id: string | number) => setSelected((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  const actions = (item: AdminFaq, showEdit = true) => <div className="flex flex-wrap gap-1">{showEdit && <Link to={`/admin/faq/${item.id}`} className={adminButtonClass('secondary', 'px-3')} aria-label={`Edit ${item.question.en}`}><Pencil className="h-4 w-4" aria-hidden="true" /> <span className="hidden 2xl:inline">Edit</span></Link>}<AdminButton variant="ghost" className="px-3 text-red-700" onClick={() => setArchiveTarget(item)} aria-label={`Archive ${item.question.en}`}><Archive className="h-4 w-4" aria-hidden="true" /></AdminButton></div>;
  const columns: DataColumn<AdminFaq>[] = [
    { key: 'select', label: 'Select', width: '7%', render: (item) => <input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggle(item.id)} aria-label={`Select ${item.question.en}`} className="h-4 w-4 accent-[var(--admin-accent)]" /> },
    { key: 'question', label: 'Question', width: '35%', render: (item) => <p className="break-words font-extrabold leading-5 text-[var(--admin-heading)]">{item.question.en}</p> },
    { key: 'category', label: 'Category', width: '12%', render: (item) => item.category },
    { key: 'status', label: 'Status', width: '12%', render: (item) => <StatusBadge status={item.status} /> },
    { key: 'order', label: 'Category order', width: '21%', render: (item) => <ReorderControls position={item.categoryOrder} total={categoryTotal(item)} itemLabel={item.question.en} onMoveEarlier={() => move(item.id, -1)} onMoveLater={() => move(item.id, 1)} earlierLabel="Move Up" laterLabel="Move Down" /> },
    { key: 'actions', label: 'Actions', width: '13%', render: actions },
  ];
  return <div className="space-y-6 xl:space-y-8">
    <PageHeader eyebrow="FAQ Admin · local prototype" title="Frequently Asked Questions" description="Manage plain bilingual question-and-answer demo records with category-local ordering." actions={<Link to="/admin/faq/new" className={adminButtonClass('primary')}><Plus className="h-4 w-4" aria-hidden="true" /> New FAQ</Link>} />
    <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-950"><strong>Source boundary:</strong> all 18 current entries are English-only plain text. No votes, popularity, rich text, SEO, or nested groups are inferred.</div>
    {toast && <DemoToast title="FAQ action simulated" description={toast} tone="warning" onClose={() => setToast(null)} />}
    <SectionCard title="FAQ Collection" description={`${rows.length} of ${items.length} questions shown`}>
      <div className="p-4 sm:p-5"><SearchFilterBar query={query} onQueryChange={setQuery} searchLabel="Search FAQ" searchPlaceholder="Search question, answer, or category…" filters={[{ key: 'category', label: 'Category', value: category, onChange: setCategory, options: ['All', ...faqCategories] }, { key: 'status', label: 'Status', value: status, onChange: setStatus, options: ['All', 'Draft', 'Published', 'Archived'] }]} /></div>
      <ResponsiveDataList rows={rows} columns={columns} getPrimaryLabel={(item) => item.question.en} empty={<EmptyState title="No matching FAQ entries" description="Clear or change the local filters." />} renderMobile={(item) => <div className="space-y-4"><div className="flex items-start gap-2"><input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggle(item.id)} aria-label={`Select ${item.question.en}`} className="mt-1 h-4 w-4 shrink-0 accent-[var(--admin-accent)]" /><div className="min-w-0"><h3 className="break-words font-extrabold leading-6 text-[var(--admin-heading)]">{item.question.en}</h3><p className="mt-2 text-xs font-bold text-[var(--admin-muted)]">{item.category}</p><div className="mt-2"><StatusBadge status={item.status} /></div></div></div><ReorderControls position={item.categoryOrder} total={categoryTotal(item)} itemLabel={item.question.en} onMoveEarlier={() => move(item.id, -1)} onMoveLater={() => move(item.id, 1)} earlierLabel="Move Up" laterLabel="Move Down" /><div className="flex gap-2"><Link to={`/admin/faq/${item.id}`} className={adminButtonClass('primary', 'flex-1')}><Pencil className="h-4 w-4" aria-hidden="true" /> Edit</Link>{actions(item, false)}</div></div>} />
    </SectionCard>
    <AdminDialog open={Boolean(archiveTarget)} title="Archive FAQ" description={archiveTarget ? `Archive “${archiveTarget.question.en}” in this demo collection?` : ''} confirmLabel="Archive in Demo" onClose={() => setArchiveTarget(null)} onConfirm={() => { if (archiveTarget) setItems((current) => current.map((item) => item.id === archiveTarget.id ? { ...item, status: 'Archived' } : item)); setToast('Archived status exists only in this collection session. Nothing was persisted.'); }} />
  </div>;
}
