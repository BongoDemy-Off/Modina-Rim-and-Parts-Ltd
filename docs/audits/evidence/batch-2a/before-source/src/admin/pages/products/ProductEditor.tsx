import { useState } from 'react';
import { ArrowLeft, Eye, ImageOff, Save, Send } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductMediaManager } from '../../components/products/ProductMediaManager';
import { ProductPublishingPanel } from '../../components/products/ProductPublishingPanel';
import { ProductSeoSection } from '../../components/products/ProductSeoSection';
import { ProductTranslations } from '../../components/products/ProductTranslations';
import { SpecificationEditor } from '../../components/products/SpecificationEditor';
import { adminProducts, cloneAdminProduct, createEmptyProduct, productCategories } from '../../data/products';
import type { AdminProduct, ProductValidationErrors } from '../../types/products';
import { AdminButton } from '../../ui/Button';
import { SectionCard } from '../../ui/Card';
import { AdminDialog } from '../../ui/Dialog';
import { DemoToast, EmptyState } from '../../ui/FeedbackStates';
import { AdminInput, AdminSelect } from '../../ui/FormControls';
import { PageHeader } from '../../ui/PageHeader';
import { StatusBadge } from '../../ui/StatusBadge';

interface ToastMessage { title: string; description: string; tone: 'success' | 'warning' | 'info' }

const sections = [
  ['basic-information', 'Basic Information'],
  ['translations', 'Translations'],
  ['media', 'Media'],
  ['specifications', 'Specifications'],
  ['seo', 'SEO'],
  ['publishing', 'Publishing'],
] as const;

export default function ProductEditor({ mode }: { mode: 'create' | 'edit' }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const initial = mode === 'create' ? createEmptyProduct() : adminProducts.find((item) => String(item.id) === id);
  const [product, setProduct] = useState<AdminProduct | null>(() => initial ? cloneAdminProduct(initial) : null);
  const [dirty, setDirty] = useState(false);
  const [errors, setErrors] = useState<ProductValidationErrors>({});
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);

  if (!product) return <EmptyState headingLevel={1} title="Product Not Found" description="This demo product ID does not exist in the Admin catalog." action={<AdminButton variant="secondary" onClick={() => navigate('/admin/products')}><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Products</AdminButton>} />;

  const normalizedSku = product.sku.trim().toLowerCase();
  const duplicateSku = Boolean(normalizedSku && adminProducts.some((item) => item.id !== product.id && item.sku.toLowerCase() === normalizedSku));
  const primaryImage = product.media.find((item) => item.included);
  const displayName = product.content.name.en.trim() || 'Untitled Product';

  const changeProduct = (next: AdminProduct) => {
    setProduct(next);
    setDirty(true);
    setErrors({});
    setToast(null);
  };

  const publishErrors = (): ProductValidationErrors => ({
    ...(!product.content.name.en.trim() ? { name: 'English product name is required before publishing.' } : {}),
    ...(!product.sku.trim() ? { sku: 'SKU is required before publishing.' } : duplicateSku ? { sku: 'This SKU already exists in the Admin demo catalog. Choose a unique SKU.' } : {}),
    ...(!product.category ? { category: 'Category is required before publishing.' } : {}),
  });

  const attentionCount = () => [!product.content.name.en.trim(), !product.sku.trim(), !product.category, duplicateSku, !primaryImage].filter(Boolean).length;

  const saveDraft = () => {
    const count = attentionCount();
    setProduct({ ...product, status: 'Draft', updatedAt: 'This demo session' });
    setErrors({});
    setDirty(false);
    setToast({ title: 'Draft saved in this demo session', description: `${count ? `${count} ${count === 1 ? 'item still needs' : 'items still need'} attention before publishing. ` : ''}Nothing was persisted.`, tone: count ? 'warning' : 'success' });
  };

  const publish = () => {
    const nextErrors = publishErrors();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setToast({ title: 'Product is not ready to publish', description: 'Review the accessible field errors below. No publishing action occurred.', tone: 'warning' });
      document.getElementById('basic-information')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setProduct({ ...product, status: 'Published', updatedAt: 'This demo session' });
    setDirty(false);
    setToast({ title: 'Publish action simulated', description: primaryImage ? 'Demo only — no public product was changed and no data was persisted.' : 'Published status is local only. Production media is still missing; no public product was changed.', tone: primaryImage ? 'success' : 'warning' });
  };

  const back = () => dirty ? setDiscardOpen(true) : navigate('/admin/products');

  const publishingPanel = <ProductPublishingPanel product={product} onProductChange={changeProduct} onSaveDraft={saveDraft} onPreview={() => setPreviewOpen(true)} onPublish={publish} onArchive={() => setArchiveOpen(true)} />;

  return (
    <div className="space-y-6 xl:space-y-8">
      <PageHeader
        actionsLayout="stack-until-xl"
        eyebrow={mode === 'create' ? 'Products · Create mode' : `Products · ${product.sku}`}
        title={mode === 'create' ? `Create ${displayName}` : displayName}
        description="Frontend-only product editor. Every change exists only in this browser session and never reaches the public catalog."
        actions={<><AdminButton variant="secondary" onClick={back}><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Products</AdminButton><AdminButton variant="ghost" onClick={() => setPreviewOpen(true)}><Eye className="h-4 w-4" aria-hidden="true" /> Admin Preview</AdminButton><AdminButton variant="secondary" onClick={saveDraft}><Save className="h-4 w-4" aria-hidden="true" /> Save Draft</AdminButton><AdminButton variant="primary" onClick={publish}><Send className="h-4 w-4" aria-hidden="true" /> Publish Demo</AdminButton></>}
      />

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[var(--admin-border)] bg-white px-4 py-3">
        <StatusBadge status={product.status} />
        <span className="text-sm font-bold text-[var(--admin-muted)]">{product.sku || 'No SKU yet'}</span>
        {dirty ? <span role="status" className="rounded-full bg-amber-50 px-3 py-1 text-xs font-extrabold text-amber-800">Unsaved changes</span> : <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-800">No unsaved changes</span>}
        <span className="ml-auto text-xs font-semibold text-[var(--admin-muted)]">Demo only · no persistence</span>
      </div>

      {product.id === 1 && <div role="note" className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-950">Content review required: the current product title and supplied production media appear to describe different products.</div>}
      {toast && <DemoToast {...toast} onClose={() => setToast(null)} />}
      {Object.keys(errors).length > 0 && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"><p className="font-extrabold">Publish validation needs attention</p><ul className="mt-2 list-disc space-y-1 pl-5">{Object.values(errors).map((error) => <li key={error}>{error}</li>)}</ul></div>}

      <nav aria-label="Product editor sections" className="flex flex-wrap gap-1 rounded-xl border border-[var(--admin-border)] bg-white/95 p-2 shadow-sm backdrop-blur-sm lg:sticky lg:top-[72px] lg:z-20">
        {sections.map(([anchor, label]) => <a key={anchor} href={`#${anchor}`} className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-bold text-[var(--admin-muted)] no-underline hover:bg-slate-100 hover:text-[var(--admin-heading)]">{label}</a>)}
      </nav>

      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
        <div className="min-w-0 space-y-6">
          <div id="basic-information" className="scroll-mt-36">
            <SectionCard title="1. Basic Information" description="Shared identifiers and classification; SKU remains editable Admin demo data.">
              <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
                <AdminInput label="SKU" required value={product.sku} onChange={(event) => changeProduct({ ...product, sku: event.target.value })} error={errors.sku || (duplicateSku ? 'Duplicate SKU in the local Admin demo catalog. This is client-side guidance only.' : undefined)} helpText="Seeded products use SKU-001 through SKU-021. New product SKUs are not generated from a fake ID." />
                <AdminSelect label="Category" required value={product.category} onChange={(event) => changeProduct({ ...product, category: event.target.value as AdminProduct['category'] })} error={errors.category}>
                  <option value="">Select a category</option>
                  {productCategories.map((item) => <option key={item}>{item}</option>)}
                </AdminSelect>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:col-span-2"><p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--admin-muted)]">Current source context</p><p className="mt-1 text-sm leading-6 text-[var(--admin-text)]">Material, certification and availability are represented as editable specification rows. MOQ, lead time and generic public drawer bullets are not treated as authoritative product data.</p></div>
              </div>
            </SectionCard>
          </div>

          <div id="translations" className="scroll-mt-36">
            <SectionCard title="2. Translations" description="One product record with separate English and বাংলা content completion."><div className="p-4 sm:p-5"><ProductTranslations product={product} onChange={changeProduct} nameError={errors.name} /></div></SectionCard>
          </div>
          <div id="media" className="scroll-mt-36">
            <SectionCard title="3. Media" description="Ordered local media previews. The first included image is always the cover."><div className="p-4 sm:p-5"><ProductMediaManager media={product.media} onChange={(media) => changeProduct({ ...product, media })} /></div></SectionCard>
          </div>
          <div id="specifications" className="scroll-mt-36">
            <SectionCard title="4. Specifications" description="Repeatable bilingual key/value rows; order is explicit and keyboard-operable."><div className="p-4 sm:p-5"><SpecificationEditor specifications={product.specifications} onChange={(specifications) => changeProduct({ ...product, specifications })} /></div></SectionCard>
          </div>
          <div id="seo" className="scroll-mt-36">
            <SectionCard title="5. SEO" description="Editing and search-preview UI only; no metadata is rendered publicly."><div className="p-4 sm:p-5"><ProductSeoSection product={product} onChange={changeProduct} /></div></SectionCard>
          </div>
        </div>

        <aside id="publishing" className="scroll-mt-36 xl:sticky xl:top-36">
          <SectionCard title="6. Publishing" description="Future-facing metadata and local demo actions">{publishingPanel}</SectionCard>
        </aside>
      </div>

      <AdminDialog open={previewOpen} title="Admin Preview — Demo Only" description="A compact editorial check. This is not the public Product page or a secure draft preview." tone="info" confirmLabel={null} cancelLabel="Close Preview" onClose={() => setPreviewOpen(false)}>
        <div className="space-y-4">
          {primaryImage ? <img src={primaryImage.src} alt={primaryImage.alt.en || 'Product preview'} className="aspect-[4/3] w-full rounded-lg bg-white object-contain" /> : <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-slate-100 text-[var(--admin-muted)]"><ImageOff className="h-8 w-8" aria-hidden="true" /><span className="ml-2 font-bold">No cover image</span></div>}
          <div><p className="text-xs font-bold uppercase tracking-wider text-[var(--admin-muted)]">{product.category || 'No category'} · {product.status}</p><h3 className="mt-1 text-xl font-extrabold text-[var(--admin-heading)]">{displayName}</h3><p className="mt-2 leading-6 text-[var(--admin-text)]">{product.content.shortDescription.en || 'No short description yet.'}</p></div>
          {product.specifications.length > 0 && <dl className="space-y-2 border-t border-[var(--admin-border)] pt-3">{product.specifications.slice(0, 3).map((specification) => <div key={specification.id} className="flex justify-between gap-4 text-sm"><dt className="font-semibold text-[var(--admin-muted)]">{specification.label.en || specification.key || 'Untitled specification'}</dt><dd className="text-right font-bold text-[var(--admin-heading)]">{specification.value.en || '—'}</dd></div>)}</dl>}
        </div>
      </AdminDialog>
      <AdminDialog open={archiveOpen} title="Archive Product" description={`Archive “${displayName}” in this demo editor? No public or saved record will be changed.`} confirmLabel="Archive in Demo" onClose={() => setArchiveOpen(false)} onConfirm={() => { setProduct({ ...product, status: 'Archived', updatedAt: 'This demo session' }); setDirty(false); setToast({ title: 'Archive action simulated', description: 'The Archived status exists only in this editor session. Nothing was persisted.', tone: 'warning' }); }} />
      <AdminDialog open={discardOpen} title="Discard unsaved demo changes?" description="The explicit Back to Products action detected local unsaved changes. Browser and sidebar navigation are not universally intercepted in this prototype." confirmLabel="Discard and Go Back" onClose={() => setDiscardOpen(false)} onConfirm={() => navigate('/admin/products')} />
    </div>
  );
}
