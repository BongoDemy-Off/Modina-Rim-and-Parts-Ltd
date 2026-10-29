import { useMemo, useState } from 'react';
import { Archive, Copy, ImageOff, Pencil, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminProducts, productCategories } from '../../data/products';
import type { AdminProduct } from '../../types/products';
import { AdminButton, adminButtonClass } from '../../ui/Button';
import { SectionCard } from '../../ui/Card';
import { AdminDialog } from '../../ui/Dialog';
import { DemoToast, EmptyState } from '../../ui/FeedbackStates';
import { PageHeader } from '../../ui/PageHeader';
import { ResponsiveDataList, type DataColumn } from '../../ui/ResponsiveDataList';
import { SearchFilterBar } from '../../ui/SearchFilterBar';
import { StatusBadge } from '../../ui/StatusBadge';

interface ToastMessage { title: string; description: string; tone: 'success' | 'warning' | 'info' }

export default function ProductList() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [selected, setSelected] = useState<number[]>([]);
  const [archiveTarget, setArchiveTarget] = useState<AdminProduct | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const rows = useMemo(() => adminProducts.filter((product) => {
    const search = query.trim().toLowerCase();
    return (!search || `${product.content.name.en} ${product.sku}`.toLowerCase().includes(search))
      && (category === 'All' || product.category === category)
      && (status === 'All' || product.status === status);
  }), [category, query, status]);

  const toggleSelected = (id: number) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const showDuplicate = (product: AdminProduct) => setToast({ title: `Duplicate ${product.sku}`, description: 'Demo only — a duplicate was not created and no data was persisted.', tone: 'info' });
  const actions = (product: AdminProduct, includeEdit = true) => (
    <div className="flex flex-wrap gap-1">
      {includeEdit && <Link to={`/admin/products/${product.id}`} className={adminButtonClass('secondary', 'px-3')} aria-label={`View or edit ${product.content.name.en}`}><Pencil className="h-4 w-4" aria-hidden="true" /> <span className="hidden 2xl:inline">Edit</span></Link>}
      <AdminButton variant="ghost" className="px-3" onClick={() => showDuplicate(product)} aria-label={`Duplicate ${product.content.name.en}`}><Copy className="h-4 w-4" aria-hidden="true" /></AdminButton>
      <AdminButton variant="ghost" className="px-3 text-red-700" onClick={() => setArchiveTarget(product)} aria-label={`Archive ${product.content.name.en}`}><Archive className="h-4 w-4" aria-hidden="true" /></AdminButton>
    </div>
  );

  const columns: DataColumn<AdminProduct>[] = [
    { key: 'select', label: 'Select', width: '6%', render: (product) => <input type="checkbox" checked={selected.includes(product.id as number)} onChange={() => toggleSelected(product.id as number)} aria-label={`Select ${product.content.name.en}`} className="h-4 w-4 accent-[var(--admin-accent)]" /> },
    { key: 'thumbnail', label: 'Media', width: '9%', render: (product) => {
      const image = product.media.find((item) => item.included);
      return image ? <img src={image.src} alt="" className="h-12 w-16 rounded-md bg-slate-100 object-cover" /> : <span className="flex h-12 w-16 items-center justify-center rounded-md bg-slate-100 text-[var(--admin-muted)]" title="Production media missing"><ImageOff className="h-5 w-5" aria-hidden="true" /></span>;
    } },
    { key: 'product', label: 'Product', width: '25%', render: (product) => <div><p className="break-words font-extrabold leading-5 text-[var(--admin-heading)]">{product.content.name.en}</p><p className="mt-1 text-xs font-bold text-[var(--admin-muted)] xl:hidden">{product.sku}</p>{product.media.length === 0 && <p className="mt-1 text-xs font-semibold text-amber-700">Production media: Missing</p>}</div> },
    { key: 'sku', label: 'SKU', width: '11%', headerClassName: 'hidden xl:table-cell', cellClassName: 'hidden xl:table-cell', render: (product) => <code className="text-xs font-bold">{product.sku}</code> },
    { key: 'category', label: 'Category', width: '12%', render: (product) => product.category },
    { key: 'images', label: 'Images', width: '8%', headerClassName: 'hidden min-[1180px]:table-cell', cellClassName: 'hidden min-[1180px]:table-cell', render: (product) => product.media.length ? `${product.media.filter((item) => item.included).length}/${product.media.length}` : 'Missing' },
    { key: 'status', label: 'Status', width: '12%', render: (product) => <StatusBadge status={product.status} /> },
    { key: 'updated', label: 'Updated', width: '11%', headerClassName: 'hidden min-[1320px]:table-cell', cellClassName: 'hidden min-[1320px]:table-cell', render: (product) => product.updatedAt },
    { key: 'actions', label: 'Actions', width: '17%', render: actions },
  ];

  return (
    <div className="space-y-6 xl:space-y-8">
      <PageHeader eyebrow="Products Admin · local prototype" title="All Products" description="Manage the current 21-product catalog with local typed demo data. Nothing here changes the public website." actions={<Link to="/admin/products/new" className={adminButtonClass('primary')}><Plus className="h-4 w-4" aria-hidden="true" /> Add Product</Link>} />
      <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-950"><strong>Demo data only.</strong> Filters and selections are temporary. Edit, duplicate, archive and publishing actions do not persist.</div>
      {toast && <DemoToast {...toast} onClose={() => setToast(null)} />}
      <SectionCard title="Product Catalog" description={`${rows.length} of ${adminProducts.length} products shown`} action={selected.length ? <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{selected.length} selected</span> : undefined}>
        <div className="space-y-3 p-4 sm:p-5">
          <SearchFilterBar
            query={query}
            onQueryChange={setQuery}
            searchLabel="Search products"
            searchPlaceholder="Search by product name or SKU…"
            filters={[
              { key: 'category', label: 'Category', value: category, onChange: setCategory, options: ['All', ...productCategories] },
              { key: 'status', label: 'Status', value: status, onChange: setStatus, options: ['All', 'Draft', 'Published', 'Archived'] },
            ]}
          />
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-[var(--admin-muted)]">
            <button type="button" className="min-h-11 rounded-lg px-3 hover:bg-slate-100" onClick={() => setSelected(rows.map((row) => row.id as number))}>Select visible</button>
            <button type="button" className="min-h-11 rounded-lg px-3 hover:bg-slate-100 disabled:opacity-50" disabled={!selected.length} onClick={() => setSelected([])}>Clear selection</button>
          </div>
        </div>
        <ResponsiveDataList
          rows={rows}
          columns={columns}
          getPrimaryLabel={(product) => product.content.name.en}
          empty={<EmptyState title="No matching products" description="Clear or change the local filters to see the current catalog." />}
          renderMobile={(product) => {
            const image = product.media.find((item) => item.included);
            return <div className="space-y-4"><div className="flex min-w-0 gap-3">{image ? <img src={image.src} alt="" className="h-20 w-24 shrink-0 rounded-lg bg-slate-100 object-cover" /> : <span className="flex h-20 w-24 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[var(--admin-muted)]"><ImageOff className="h-6 w-6" aria-hidden="true" /></span>}<div className="min-w-0 flex-1"><div className="flex items-start gap-2"><input type="checkbox" checked={selected.includes(product.id as number)} onChange={() => toggleSelected(product.id as number)} aria-label={`Select ${product.content.name.en}`} className="mt-1 h-4 w-4 shrink-0 accent-[var(--admin-accent)]" /><div className="min-w-0"><h3 className="break-words font-extrabold leading-5 text-[var(--admin-heading)]">{product.content.name.en}</h3><p className="mt-1 text-xs font-bold text-[var(--admin-muted)]">{product.sku} · {product.category}</p></div></div><div className="mt-2"><StatusBadge status={product.status} /></div></div></div>{product.media.length === 0 && <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800">Production media: Missing</p>}<div className="flex flex-wrap items-center justify-between gap-2"><Link to={`/admin/products/${product.id}`} className={adminButtonClass('primary', 'flex-1')}><Pencil className="h-4 w-4" aria-hidden="true" /> View / Edit</Link><div className="flex gap-1">{actions(product, false)}</div></div></div>;
          }}
        />
      </SectionCard>
      <AdminDialog open={Boolean(archiveTarget)} title="Archive Product" description={archiveTarget ? `Archive “${archiveTarget.content.name.en}”? This demonstration will not alter the catalog.` : ''} onClose={() => setArchiveTarget(null)} onConfirm={() => setToast({ title: 'Archive action demonstrated', description: 'Demo only — the product remains unchanged and no data was persisted.', tone: 'warning' })} confirmLabel="Archive in Demo" />
    </div>
  );
}
