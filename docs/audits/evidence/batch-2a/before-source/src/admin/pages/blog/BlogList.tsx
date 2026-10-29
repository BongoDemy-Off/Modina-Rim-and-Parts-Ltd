import { useMemo, useState } from 'react';
import { Archive, Copy, ImageOff, Pencil, Plus, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminBlogPosts } from '../../data/blog';
import { blogCategories, type AdminBlogPost } from '../../types/blog';
import { AdminButton, adminButtonClass } from '../../ui/Button';
import { SectionCard } from '../../ui/Card';
import { AdminDialog } from '../../ui/Dialog';
import { DemoToast, EmptyState } from '../../ui/FeedbackStates';
import { PageHeader } from '../../ui/PageHeader';
import { ResponsiveDataList, type DataColumn } from '../../ui/ResponsiveDataList';
import { SearchFilterBar } from '../../ui/SearchFilterBar';
import { StatusBadge } from '../../ui/StatusBadge';

interface ToastMessage { title: string; description: string; tone: 'success' | 'warning' | 'info' }

export default function BlogList() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [selected, setSelected] = useState<Array<string | number>>([]);
  const [archiveTarget, setArchiveTarget] = useState<AdminBlogPost | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const rows = useMemo(() => adminBlogPosts.filter((post) => {
    const search = query.trim().toLowerCase();
    return (!search || `${post.title.en} ${post.excerpt.en} ${post.category} ${post.tags.join(' ')}`.toLowerCase().includes(search))
      && (category === 'All' || post.category === category)
      && (status === 'All' || post.status === status);
  }), [category, query, status]);

  const toggleSelected = (id: string | number) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const duplicate = (post: AdminBlogPost) => setToast({ title: `Duplicate “${post.title.en}”`, description: 'Demo only — no duplicate was created and no content was persisted.', tone: 'info' });
  const actions = (post: AdminBlogPost, includeEdit = true) => <div className="flex flex-wrap gap-1">{includeEdit && <Link to={`/admin/blog/${post.id}`} className={adminButtonClass('secondary', 'px-3')} aria-label={`Edit ${post.title.en}`}><Pencil className="h-4 w-4" aria-hidden="true" /> <span className="hidden 2xl:inline">Edit</span></Link>}<AdminButton variant="ghost" className="px-3" onClick={() => duplicate(post)} aria-label={`Duplicate ${post.title.en}`}><Copy className="h-4 w-4" aria-hidden="true" /></AdminButton><AdminButton variant="ghost" className="px-3 text-red-700" onClick={() => setArchiveTarget(post)} aria-label={`Archive ${post.title.en}`}><Archive className="h-4 w-4" aria-hidden="true" /></AdminButton></div>;

  const columns: DataColumn<AdminBlogPost>[] = [
    { key: 'select', label: 'Select', width: '6%', render: (post) => <input type="checkbox" checked={selected.includes(post.id)} onChange={() => toggleSelected(post.id)} aria-label={`Select ${post.title.en}`} className="h-4 w-4 accent-[var(--admin-accent)]" /> },
    { key: 'cover', label: 'Cover', width: '10%', render: (post) => post.cover ? <img src={post.cover.src} alt="" className="h-12 w-16 rounded-md bg-slate-100 object-cover" /> : <span className="flex h-12 w-16 items-center justify-center rounded-md bg-slate-100 text-[var(--admin-muted)]"><ImageOff className="h-5 w-5" aria-hidden="true" /></span> },
    { key: 'title', label: 'Title', width: '28%', render: (post) => <div><p className="break-words font-extrabold leading-5 text-[var(--admin-heading)]">{post.title.en}</p>{post.featured && <p className="mt-1 flex items-center gap-1 text-xs font-bold text-amber-700"><Star className="h-3.5 w-3.5" aria-hidden="true" /> Featured metadata</p>}<p className="mt-1 text-xs font-semibold text-amber-700">Frontend placeholder · not production media</p></div> },
    { key: 'category', label: 'Category', width: '12%', render: (post) => post.category },
    { key: 'status', label: 'Status', width: '12%', render: (post) => <StatusBadge status={post.status} /> },
    { key: 'date', label: 'Publication', width: '12%', render: (post) => post.publicationMonth },
    { key: 'updated', label: 'Updated', width: '12%', headerClassName: 'hidden min-[1200px]:table-cell', cellClassName: 'hidden min-[1200px]:table-cell', render: (post) => post.updatedAt },
    { key: 'actions', label: 'Actions', width: '18%', render: actions },
  ];

  return (
    <div className="space-y-6 xl:space-y-8">
      <PageHeader eyebrow="Blog Admin · local prototype" title="Blog Posts" description="Manage realistic demo copies of the current public Blog content. Nothing here changes public articles or routes." actions={<Link to="/admin/blog/new" className={adminButtonClass('primary')}><Plus className="h-4 w-4" aria-hidden="true" /> New Blog Post</Link>} />
      <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-950"><strong>Demo data only.</strong> Current public routes still use IDs. Filters, selections, status changes, and editorial actions do not persist.</div>
      {toast && <DemoToast {...toast} onClose={() => setToast(null)} />}
      <SectionCard title="Blog Collection" description={`${rows.length} of ${adminBlogPosts.length} posts shown`} action={selected.length ? <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{selected.length} selected</span> : undefined}>
        <div className="space-y-3 p-4 sm:p-5"><SearchFilterBar query={query} onQueryChange={setQuery} searchLabel="Search Blog" searchPlaceholder="Search title, summary, category, or tag…" filters={[{ key: 'category', label: 'Category', value: category, onChange: setCategory, options: ['All', ...blogCategories] }, { key: 'status', label: 'Status', value: status, onChange: setStatus, options: ['All', 'Draft', 'Published', 'Archived'] }]} /><div className="flex flex-wrap gap-2 text-xs font-semibold text-[var(--admin-muted)]"><button type="button" className="min-h-11 rounded-lg px-3 hover:bg-slate-100" onClick={() => setSelected(rows.map((row) => row.id))}>Select visible</button><button type="button" className="min-h-11 rounded-lg px-3 hover:bg-slate-100 disabled:opacity-50" disabled={!selected.length} onClick={() => setSelected([])}>Clear selection</button></div></div>
        <ResponsiveDataList rows={rows} columns={columns} getPrimaryLabel={(post) => post.title.en} empty={<EmptyState title="No matching Blog posts" description="Clear or change the local filters to see the current demo collection." />} renderMobile={(post) => <div className="space-y-4"><div className="flex min-w-0 gap-3">{post.cover ? <img src={post.cover.src} alt="" className="h-20 w-24 shrink-0 rounded-lg bg-slate-100 object-cover" /> : <span className="flex h-20 w-24 shrink-0 items-center justify-center rounded-lg bg-slate-100"><ImageOff className="h-6 w-6" aria-hidden="true" /></span>}<div className="min-w-0 flex-1"><div className="flex items-start gap-2"><input type="checkbox" checked={selected.includes(post.id)} onChange={() => toggleSelected(post.id)} aria-label={`Select ${post.title.en}`} className="mt-1 h-4 w-4 shrink-0 accent-[var(--admin-accent)]" /><div className="min-w-0"><h3 className="break-words font-extrabold leading-5 text-[var(--admin-heading)]">{post.title.en}</h3><p className="mt-1 text-xs font-bold text-[var(--admin-muted)]">{post.category} · {post.publicationMonth}</p></div></div><div className="mt-2 flex flex-wrap gap-2"><StatusBadge status={post.status} />{post.featured && <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700"><Star className="h-3.5 w-3.5" aria-hidden="true" /> Featured</span>}</div></div></div><p className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800">Current frontend placeholder · production media required</p><div className="flex flex-wrap items-center justify-between gap-2"><Link to={`/admin/blog/${post.id}`} className={adminButtonClass('primary', 'flex-1')}><Pencil className="h-4 w-4" aria-hidden="true" /> View / Edit</Link><div className="flex gap-1">{actions(post, false)}</div></div></div>} />
      </SectionCard>
      <AdminDialog open={Boolean(archiveTarget)} title="Archive Blog Post" description={archiveTarget ? `Archive “${archiveTarget.title.en}”? This demonstration will not alter the current public Blog.` : ''} onClose={() => setArchiveTarget(null)} onConfirm={() => setToast({ title: 'Archive action demonstrated', description: 'Demo only — the post remains unchanged and nothing was persisted.', tone: 'warning' })} confirmLabel="Archive in Demo" />
    </div>
  );
}
