import { useMemo, useState } from 'react';
import { ArrowLeft, Eye, ImageOff, RefreshCw, Save, Send } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { EditorialBlocksPreview, EditorialContentEditor } from '../../components/editorial/EditorialContentEditor';
import { EditorialEditorLayout } from '../../components/editorial/EditorialEditorLayout';
import { EditorialMediaSection } from '../../components/editorial/EditorialMediaSection';
import { EditorialPublishingPanel } from '../../components/editorial/EditorialPublishingPanel';
import { EditorialSeoSection } from '../../components/editorial/EditorialSeoSection';
import { EditorialTranslations } from '../../components/editorial/EditorialTranslations';
import { adminNewsItems, createEmptyNewsItem } from '../../data/news';
import { newsContentTypes, type AdminNewsItem } from '../../types/news';
import { cloneEditorialRecord, estimateReadTime, hasMeaningfulEnglishBody, normalizeSlug, type EditorialValidationErrors } from '../../types/editorial';
import { AdminButton } from '../../ui/Button';
import { SectionCard } from '../../ui/Card';
import { AdminDialog } from '../../ui/Dialog';
import { DemoToast, EmptyState } from '../../ui/FeedbackStates';
import { AdminInput, AdminSelect } from '../../ui/FormControls';
import { PageHeader } from '../../ui/PageHeader';
import { StatusBadge } from '../../ui/StatusBadge';

interface ToastMessage { title: string; description: string; tone: 'success' | 'warning' | 'info' }

const sections = [
  { id: 'basic-information', label: 'Basic Information' }, { id: 'translations', label: 'Translations' }, { id: 'content', label: 'Content' },
  { id: 'media', label: 'Media' }, { id: 'seo', label: 'SEO' }, { id: 'publishing', label: 'Publishing' },
];

export default function NewsEditor({ mode }: { mode: 'create' | 'edit' }) {
  const { id } = useParams(); const navigate = useNavigate();
  const initial = mode === 'create' ? createEmptyNewsItem() : adminNewsItems.find((item) => String(item.id) === id);
  const [item, setItem] = useState<AdminNewsItem | null>(() => initial ? cloneEditorialRecord(initial) : null);
  const [dirty, setDirty] = useState(false); const [errors, setErrors] = useState<EditorialValidationErrors>({}); const [toast, setToast] = useState<ToastMessage | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false); const [archiveOpen, setArchiveOpen] = useState(false); const [discardOpen, setDiscardOpen] = useState(false);
  const readTime = useMemo(() => estimateReadTime(item?.blocks ?? []), [item?.blocks]);

  if (!item) return <EmptyState headingLevel={1} title="News Item Not Found" description="This demo News ID does not exist." action={<AdminButton variant="secondary" onClick={() => navigate('/admin/news')}><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to News</AdminButton>} />;
  const duplicateSlug = Boolean(item.slug && adminNewsItems.some((record) => record.id !== item.id && record.slug === item.slug));
  const invalidSlug = Boolean(item.slug && item.slug !== normalizeSlug(item.slug));
  const displayName = item.title.en.trim() || 'Untitled News Item';
  const changeItem = (next: AdminNewsItem) => { setItem(next); setDirty(true); setErrors({}); setToast(null); };
  const publishErrors = (): EditorialValidationErrors => ({
    ...(!item.title.en.trim() ? { title: 'English title is required before publishing.' } : {}),
    ...(!item.slug.trim() ? { slug: 'A future CMS slug is required for this simulated publish.' } : duplicateSlug ? { slug: 'This slug already exists in the local News demo collection.' } : invalidSlug ? { slug: 'Use lowercase letters, numbers, and hyphens only.' } : {}),
    ...(!item.contentType ? { classification: 'A current News content type is required before publishing.' } : {}),
    ...(!hasMeaningfulEnglishBody(item.blocks) ? { body: 'Add meaningful English body text before publishing.' } : {}),
    ...(!item.publicationMonth.trim() ? { publicationMonth: 'Publication/event month and year are required before publishing.' } : {}),
    ...(!item.cover ? { cover: 'A cover image is required by the current public article layout.' } : {}),
  });
  const warnings = [
    ...(!item.title.bn.trim() || !item.excerpt.bn.trim() ? ['Bengali translation is incomplete. This is a warning, not a publish blocker.'] : []),
    ...(item.cover && !item.cover.productionReady ? ['Current cover is not production-ready media.'] : []),
    ...(!item.seo.title.en.trim() || !item.seo.description.en.trim() ? ['Custom English SEO fields are incomplete; preview falls back to title and excerpt.'] : []),
    ...(item.factualClaimReminder ? ['Verify factual/event claims before publication.'] : []),
    ...(item.sourceReviewWarning ? [item.sourceReviewWarning] : []),
  ];
  const saveDraft = () => { setItem({ ...item, status: 'Draft', updatedAt: 'This demo session' }); setDirty(false); setErrors({}); setToast({ title: 'Draft saved in this demo session', description: `${warnings.length} non-blocking ${warnings.length === 1 ? 'warning remains' : 'warnings remain'}. Nothing was persisted.`, tone: warnings.length ? 'warning' : 'success' }); };
  const publish = () => { const next = publishErrors(); setErrors(next); if (Object.keys(next).length) { setToast({ title: 'News item is not ready to publish', description: 'Review the accessible field errors. No publishing action occurred.', tone: 'warning' }); document.getElementById('basic-information')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; } setItem({ ...item, status: 'Published', updatedAt: 'This demo session' }); setDirty(false); setToast({ title: 'Publish action simulated', description: 'Demo only — no public News content or route changed.', tone: item.cover?.productionReady ? 'success' : 'warning' }); };
  const back = () => dirty ? setDiscardOpen(true) : navigate('/admin/news');
  const publishingPanel = <SectionCard title="6. Publishing" description="Local status actions and lightweight editorial awareness"><EditorialPublishingPanel status={item.status} updatedAt={item.updatedAt} editor={item.editor} estimatedReadTime={readTime} sourceReadTime={item.sourceReadTime} warnings={warnings} onSaveDraft={saveDraft} onPreview={() => setPreviewOpen(true)} onPublish={publish} onArchive={() => setArchiveOpen(true)} /></SectionCard>;

  return <div className="space-y-6 xl:space-y-8">
    <PageHeader actionsLayout="stack-until-xl" eyebrow={mode === 'create' ? 'News & Events · Create mode' : `News & Events · record ${item.id}`} title={mode === 'create' ? `Create ${displayName}` : displayName} description="Frontend-only News editor. Changes remain in this frontend demo and never reach public News." actions={<><AdminButton variant="secondary" onClick={back}><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to News</AdminButton><AdminButton variant="ghost" onClick={() => setPreviewOpen(true)}><Eye className="h-4 w-4" aria-hidden="true" /> Admin Preview</AdminButton><AdminButton variant="secondary" onClick={saveDraft}><Save className="h-4 w-4" aria-hidden="true" /> Save Draft</AdminButton><AdminButton variant="primary" onClick={publish}><Send className="h-4 w-4" aria-hidden="true" /> Publish Demo</AdminButton></>} />
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[var(--admin-border)] bg-white px-4 py-3"><StatusBadge status={item.status} /><span className="text-sm font-bold text-[var(--admin-muted)]">{item.publicationMonth || 'No publication month'}</span>{dirty ? <span role="status" className="rounded-full bg-amber-50 px-3 py-1 text-xs font-extrabold text-amber-800">Unsaved changes</span> : <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-800">No unsaved changes</span>}<span className="ml-auto text-xs font-semibold text-[var(--admin-muted)]">Demo only · no persistence</span></div>
    {item.sourceReviewWarning && <div role="note" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-900">{item.sourceReviewWarning} Neither public source is rewritten by this Admin prototype.</div>}
    {toast && <DemoToast {...toast} onClose={() => setToast(null)} />}
    {Object.keys(errors).length > 0 && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"><p className="font-extrabold">Publish validation needs attention</p><ul className="mt-2 list-disc space-y-1 pl-5">{Object.values(errors).map((error) => <li key={error}>{error}</li>)}</ul></div>}
    <EditorialEditorLayout sections={sections} publishing={publishingPanel}>
      <div id="basic-information" className="scroll-mt-36"><SectionCard title="1. Basic Information" description="Current News taxonomy plus future CMS routing metadata."><div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5"><AdminSelect label="Content type" required value={item.contentType} onChange={(event) => changeItem({ ...item, contentType: event.target.value as AdminNewsItem['contentType'] })} error={errors.classification}><option value="">Select a content type</option>{newsContentTypes.map((type) => <option key={type}>{type}</option>)}</AdminSelect><AdminInput label={item.contentType === 'Events' ? 'Event / publication month and year' : 'Publication month and year'} required value={item.publicationMonth} onChange={(event) => changeItem({ ...item, publicationMonth: event.target.value })} error={errors.publicationMonth} placeholder="e.g. September 2026" helpText="Seeded legacy values remain exact month/year strings; no day or time is invented." /><div className="sm:col-span-2"><AdminInput label="Future CMS slug" required value={item.slug} onChange={(event) => changeItem({ ...item, slug: normalizeSlug(event.target.value) })} error={errors.slug || (duplicateSlug ? 'Duplicate slug in the local News collection.' : invalidSlug ? 'Use normalized lowercase text and hyphens.' : undefined)} helpText="Current public News routes still use IDs. This does not create a working public slug URL." /><AdminButton variant="ghost" className="mt-2" onClick={() => changeItem({ ...item, slug: normalizeSlug(item.title.en) })}><RefreshCw className="h-4 w-4" aria-hidden="true" /> Use English title suggestion</AdminButton></div><div className="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:col-span-2"><p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--admin-muted)]">News / Event source context</p><p className="mt-1 text-sm leading-6 text-[var(--admin-text)]">The public source provides only this content type and month/year label. No separate event location, external link, registration, or News featured field is invented.</p></div></div></SectionCard></div>
      <div id="translations" className="scroll-mt-36"><SectionCard title="2. Translations" description="One News record with English and Bengali title/summary fields."><div className="p-4 sm:p-5"><EditorialTranslations title={item.title} excerpt={item.excerpt} onTitleChange={(title) => changeItem({ ...item, title, slug: item.slug || normalizeSlug(title.en) })} onExcerptChange={(excerpt) => changeItem({ ...item, excerpt })} titleError={errors.title} /></div></SectionCard></div>
      <div id="content" className="scroll-mt-36"><SectionCard title="3. Content" description="One shared block order with translated text inside each block."><div className="p-4 sm:p-5"><EditorialContentEditor blocks={item.blocks} onChange={(blocks) => changeItem({ ...item, blocks })} error={errors.body} /></div></SectionCard></div>
      <div id="media" className="scroll-mt-36"><SectionCard title="4. Media" description="Cover layout state and local replacement preview only."><div className="p-4 sm:p-5"><EditorialMediaSection cover={item.cover} alt={item.coverAlt} onCoverChange={(cover) => changeItem({ ...item, cover })} onAltChange={(coverAlt) => changeItem({ ...item, coverAlt })} error={errors.cover} /></div></SectionCard></div>
      <div id="seo" className="scroll-mt-36"><SectionCard title="5. SEO" description="Local editing and safe search preview; no public metadata output."><div className="p-4 sm:p-5"><EditorialSeoSection seo={item.seo} fallbackTitle={item.title} fallbackDescription={item.excerpt} slug={item.slug} routeRoot="news" onChange={(seo) => changeItem({ ...item, seo })} /></div></SectionCard></div>
    </EditorialEditorLayout>
    <AdminDialog open={previewOpen} title="Admin Preview — Demo Only" description="A compact hierarchy and formatting check. This is not the public News page or a draft URL." tone="info" confirmLabel={null} cancelLabel="Close Preview" onClose={() => setPreviewOpen(false)}><div className="space-y-4">{item.cover ? <img src={item.cover.src} alt={item.coverAlt.en || 'News cover preview'} className="aspect-[12/7] w-full rounded-lg object-cover" /> : <div className="flex aspect-[12/7] items-center justify-center rounded-lg bg-slate-100 text-[var(--admin-muted)]"><ImageOff className="h-8 w-8" aria-hidden="true" /><span className="ml-2 font-bold">No cover image</span></div>}<div><p className="text-xs font-bold uppercase tracking-wider text-[var(--admin-muted)]">{item.contentType || 'No type'} · {item.publicationMonth || 'No date'} · {item.status}</p><h3 className="mt-1 text-xl font-extrabold text-[var(--admin-heading)]">{displayName}</h3><p className="mt-2 leading-6 text-[var(--admin-text)]">{item.excerpt.en || 'No excerpt yet.'}</p></div><div className="border-t border-[var(--admin-border)] pt-4"><EditorialBlocksPreview blocks={item.blocks} limit={6} /></div></div></AdminDialog>
    <AdminDialog open={archiveOpen} title="Archive News Item" description={`Archive “${displayName}” in this demo editor? No public or saved record will change.`} confirmLabel="Archive in Demo" onClose={() => setArchiveOpen(false)} onConfirm={() => { setItem({ ...item, status: 'Archived', updatedAt: 'This demo session' }); setDirty(false); setToast({ title: 'Archive action simulated', description: 'Archived exists only in this editor session.', tone: 'warning' }); }} />
    <AdminDialog open={discardOpen} title="Discard unsaved demo changes?" description="The explicit Back to News action detected local unsaved changes. Browser and sidebar navigation are not universally intercepted." confirmLabel="Discard and Go Back" onClose={() => setDiscardOpen(false)} onConfirm={() => navigate('/admin/news')} />
  </div>;
}
