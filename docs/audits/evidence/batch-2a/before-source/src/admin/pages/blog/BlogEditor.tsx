import { useMemo, useState } from 'react';
import { ArrowLeft, Eye, ImageOff, RefreshCw, Save, Send } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { EditorialBlocksPreview, EditorialContentEditor } from '../../components/editorial/EditorialContentEditor';
import { EditorialEditorLayout } from '../../components/editorial/EditorialEditorLayout';
import { EditorialMediaSection } from '../../components/editorial/EditorialMediaSection';
import { EditorialPublishingPanel } from '../../components/editorial/EditorialPublishingPanel';
import { EditorialSeoSection } from '../../components/editorial/EditorialSeoSection';
import { EditorialTranslations } from '../../components/editorial/EditorialTranslations';
import { adminBlogPosts, createEmptyBlogPost } from '../../data/blog';
import { blogCategories, type AdminBlogPost } from '../../types/blog';
import { cloneEditorialRecord, estimateReadTime, hasMeaningfulEnglishBody, normalizeSlug, type EditorialValidationErrors } from '../../types/editorial';
import { AdminButton } from '../../ui/Button';
import { SectionCard } from '../../ui/Card';
import { AdminDialog } from '../../ui/Dialog';
import { DemoToast, EmptyState } from '../../ui/FeedbackStates';
import { AdminInput, AdminSelect, AdminSwitch } from '../../ui/FormControls';
import { PageHeader } from '../../ui/PageHeader';
import { StatusBadge } from '../../ui/StatusBadge';

interface ToastMessage { title: string; description: string; tone: 'success' | 'warning' | 'info' }

const sections = [
  { id: 'basic-information', label: 'Basic Information' }, { id: 'translations', label: 'Translations' }, { id: 'content', label: 'Content' },
  { id: 'media', label: 'Media' }, { id: 'seo', label: 'SEO' }, { id: 'publishing', label: 'Publishing' },
];

export default function BlogEditor({ mode }: { mode: 'create' | 'edit' }) {
  const { id } = useParams(); const navigate = useNavigate();
  const initial = mode === 'create' ? createEmptyBlogPost() : adminBlogPosts.find((item) => String(item.id) === id);
  const [post, setPost] = useState<AdminBlogPost | null>(() => initial ? cloneEditorialRecord(initial) : null);
  const [dirty, setDirty] = useState(false); const [errors, setErrors] = useState<EditorialValidationErrors>({}); const [toast, setToast] = useState<ToastMessage | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false); const [archiveOpen, setArchiveOpen] = useState(false); const [discardOpen, setDiscardOpen] = useState(false);

  const readTime = useMemo(() => estimateReadTime(post?.blocks ?? []), [post?.blocks]);
  if (!post) return <EmptyState headingLevel={1} title="Blog Post Not Found" description="This demo Blog ID does not exist." action={<AdminButton variant="secondary" onClick={() => navigate('/admin/blog')}><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Blog</AdminButton>} />;

  const duplicateSlug = Boolean(post.slug && adminBlogPosts.some((item) => item.id !== post.id && item.slug === post.slug));
  const invalidSlug = Boolean(post.slug && post.slug !== normalizeSlug(post.slug));
  const anotherFeatured = adminBlogPosts.find((item) => item.featured && item.id !== post.id);
  const featuredConflict = Boolean(post.featured && anotherFeatured);
  const displayName = post.title.en.trim() || 'Untitled Blog Post';
  const changePost = (next: AdminBlogPost) => { setPost(next); setDirty(true); setErrors({}); setToast(null); };
  const publishErrors = (): EditorialValidationErrors => ({
    ...(!post.title.en.trim() ? { title: 'English title is required before publishing.' } : {}),
    ...(!post.slug.trim() ? { slug: 'A future CMS slug is required for this simulated publish.' } : duplicateSlug ? { slug: 'This slug already exists in the local Blog demo collection.' } : invalidSlug ? { slug: 'Use lowercase letters, numbers, and hyphens only.' } : {}),
    ...(!post.category ? { classification: 'Blog category is required before publishing.' } : {}),
    ...(!hasMeaningfulEnglishBody(post.blocks) ? { body: 'Add meaningful English body text before publishing.' } : {}),
    ...(!post.publicationMonth.trim() ? { publicationMonth: 'Publication month and year are required before publishing.' } : {}),
    ...(!post.cover ? { cover: 'A cover image is required by the current public article layout.' } : {}),
  });
  const warningCount = () => [!post.title.bn.trim(), !post.excerpt.bn.trim(), post.cover && !post.cover.productionReady, !post.seo.title.en.trim(), !post.seo.description.en.trim(), featuredConflict].filter(Boolean).length;
  const saveDraft = () => { const count = warningCount(); setPost({ ...post, status: 'Draft', updatedAt: 'This demo session' }); setDirty(false); setErrors({}); setToast({ title: 'Draft saved in this demo session', description: `${count} non-blocking ${count === 1 ? 'warning remains' : 'warnings remain'}. Nothing was persisted.`, tone: count ? 'warning' : 'success' }); };
  const publish = () => { const next = publishErrors(); setErrors(next); if (Object.keys(next).length) { setToast({ title: 'Blog post is not ready to publish', description: 'Review the accessible field errors. No publishing action occurred.', tone: 'warning' }); document.getElementById('basic-information')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; } setPost({ ...post, status: 'Published', updatedAt: 'This demo session' }); setDirty(false); setToast({ title: 'Publish action simulated', description: 'Demo only — no public Blog content or route changed.', tone: post.cover?.productionReady ? 'success' : 'warning' }); };
  const back = () => dirty ? setDiscardOpen(true) : navigate('/admin/blog');
  const publishingWarnings = [
    ...(!post.title.bn.trim() || !post.excerpt.bn.trim() ? ['Bengali translation is incomplete. This is a warning, not a publish blocker.'] : []),
    ...(post.cover && !post.cover.productionReady ? ['Current cover is not production-ready media.'] : []),
    ...(!post.seo.title.en.trim() || !post.seo.description.en.trim() ? ['Custom English SEO fields are incomplete; preview falls back to title and excerpt.'] : []),
    ...(featuredConflict ? [`Only one Blog story is intended for the featured slot. In the future CMS, publishing this story as featured would replace “${anotherFeatured?.title.en}”. No demo record is changed here.`] : []),
  ];

  const publishingPanel = <SectionCard title="6. Publishing" description="Future-facing metadata and local demo actions"><EditorialPublishingPanel status={post.status} updatedAt={post.updatedAt} editor={post.editor} estimatedReadTime={readTime} sourceReadTime={post.sourceReadTime} warnings={publishingWarnings} onSaveDraft={saveDraft} onPreview={() => setPreviewOpen(true)} onPublish={publish} onArchive={() => setArchiveOpen(true)}><AdminSwitch label="Feature on Blog landing page" checked={post.featured} onChange={(featured) => changePost({ ...post, featured })} /><p className="px-2 text-xs leading-5 text-[var(--admin-muted)]">Future CMS metadata only. No ranking, replacement, or current public-page behavior is connected.</p></EditorialPublishingPanel></SectionCard>;

  return <div className="space-y-6 xl:space-y-8">
    <PageHeader actionsLayout="stack-until-xl" eyebrow={mode === 'create' ? 'Blog · Create mode' : `Blog · record ${post.id}`} title={mode === 'create' ? `Create ${displayName}` : displayName} description="Frontend-only editorial editor. Changes remain in this frontend demo and never reach the public Blog." actions={<><AdminButton variant="secondary" onClick={back}><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Blog</AdminButton><AdminButton variant="ghost" onClick={() => setPreviewOpen(true)}><Eye className="h-4 w-4" aria-hidden="true" /> Admin Preview</AdminButton><AdminButton variant="secondary" onClick={saveDraft}><Save className="h-4 w-4" aria-hidden="true" /> Save Draft</AdminButton><AdminButton variant="primary" onClick={publish}><Send className="h-4 w-4" aria-hidden="true" /> Publish Demo</AdminButton></>} />
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[var(--admin-border)] bg-white px-4 py-3"><StatusBadge status={post.status} /><span className="text-sm font-bold text-[var(--admin-muted)]">{post.publicationMonth || 'No publication month'}</span>{dirty ? <span role="status" className="rounded-full bg-amber-50 px-3 py-1 text-xs font-extrabold text-amber-800">Unsaved changes</span> : <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-800">No unsaved changes</span>}<span className="ml-auto text-xs font-semibold text-[var(--admin-muted)]">Demo only · no persistence</span></div>
    {toast && <DemoToast {...toast} onClose={() => setToast(null)} />}
    {Object.keys(errors).length > 0 && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"><p className="font-extrabold">Publish validation needs attention</p><ul className="mt-2 list-disc space-y-1 pl-5">{Object.values(errors).map((error) => <li key={error}>{error}</li>)}</ul></div>}
    <EditorialEditorLayout sections={sections} publishing={publishingPanel}>
      <div id="basic-information" className="scroll-mt-36"><SectionCard title="1. Basic Information" description="Blog-specific classification plus future CMS routing metadata."><div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5"><AdminSelect label="Category" required value={post.category} onChange={(event) => changePost({ ...post, category: event.target.value as AdminBlogPost['category'] })} error={errors.classification}><option value="">Select a category</option>{blogCategories.map((category) => <option key={category}>{category}</option>)}</AdminSelect><AdminInput label="Publication month / year" required value={post.publicationMonth} onChange={(event) => changePost({ ...post, publicationMonth: event.target.value })} error={errors.publicationMonth} placeholder="e.g. September 2026" helpText="Seeded legacy values remain exactly as month/year; no day or time is invented." /><div className="sm:col-span-2"><AdminInput label="Future CMS slug" required value={post.slug} onChange={(event) => changePost({ ...post, slug: normalizeSlug(event.target.value) })} error={errors.slug || (duplicateSlug ? 'Duplicate slug in the local Blog collection.' : invalidSlug ? 'Use normalized lowercase text and hyphens.' : undefined)} helpText="Current public Blog routes still use IDs. This slug does not create or preview a working public URL." /><AdminButton variant="ghost" className="mt-2" onClick={() => changePost({ ...post, slug: normalizeSlug(post.title.en) })}><RefreshCw className="h-4 w-4" aria-hidden="true" /> Use English title suggestion</AdminButton></div><AdminInput label="Tags" value={post.tags.join(', ')} onChange={(event) => changePost({ ...post, tags: event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean) })} helpText="Comma-separated Blog tags from the current content pattern." /></div></SectionCard></div>
      <div id="translations" className="scroll-mt-36"><SectionCard title="2. Translations" description="One Blog record with English and Bengali title/summary fields."><div className="p-4 sm:p-5"><EditorialTranslations title={post.title} excerpt={post.excerpt} onTitleChange={(title) => changePost({ ...post, title, slug: post.slug || normalizeSlug(title.en) })} onExcerptChange={(excerpt) => changePost({ ...post, excerpt })} titleError={errors.title} /></div></SectionCard></div>
      <div id="content" className="scroll-mt-36"><SectionCard title="3. Content" description="One shared block order with translated text inside each block."><div className="p-4 sm:p-5"><EditorialContentEditor blocks={post.blocks} onChange={(blocks) => changePost({ ...post, blocks })} error={errors.body} /></div></SectionCard></div>
      <div id="media" className="scroll-mt-36"><SectionCard title="4. Media" description="Cover layout state and local replacement preview only."><div className="p-4 sm:p-5"><EditorialMediaSection cover={post.cover} alt={post.coverAlt} onCoverChange={(cover) => changePost({ ...post, cover })} onAltChange={(coverAlt) => changePost({ ...post, coverAlt })} error={errors.cover} /></div></SectionCard></div>
      <div id="seo" className="scroll-mt-36"><SectionCard title="5. SEO" description="Local editing and safe search preview; no public metadata output."><div className="p-4 sm:p-5"><EditorialSeoSection seo={post.seo} fallbackTitle={post.title} fallbackDescription={post.excerpt} slug={post.slug} routeRoot="blog" onChange={(seo) => changePost({ ...post, seo })} /></div></SectionCard></div>
    </EditorialEditorLayout>
    <AdminDialog open={previewOpen} title="Admin Preview — Demo Only" description="A compact hierarchy and formatting check. This is not the public Blog page or a draft URL." tone="info" confirmLabel={null} cancelLabel="Close Preview" onClose={() => setPreviewOpen(false)}><div className="space-y-4">{post.cover ? <img src={post.cover.src} alt={post.coverAlt.en || 'Blog cover preview'} className="aspect-[12/7] w-full rounded-lg object-cover" /> : <div className="flex aspect-[12/7] items-center justify-center rounded-lg bg-slate-100 text-[var(--admin-muted)]"><ImageOff className="h-8 w-8" aria-hidden="true" /><span className="ml-2 font-bold">No cover image</span></div>}<div><p className="text-xs font-bold uppercase tracking-wider text-[var(--admin-muted)]">{post.category || 'No category'} · {post.publicationMonth || 'No date'} · {post.status}</p><h3 className="mt-1 text-xl font-extrabold text-[var(--admin-heading)]">{displayName}</h3><p className="mt-2 leading-6 text-[var(--admin-text)]">{post.excerpt.en || 'No excerpt yet.'}</p></div><div className="border-t border-[var(--admin-border)] pt-4"><EditorialBlocksPreview blocks={post.blocks} limit={6} /></div></div></AdminDialog>
    <AdminDialog open={archiveOpen} title="Archive Blog Post" description={`Archive “${displayName}” in this demo editor? No public or saved record will change.`} confirmLabel="Archive in Demo" onClose={() => setArchiveOpen(false)} onConfirm={() => { setPost({ ...post, status: 'Archived', updatedAt: 'This demo session' }); setDirty(false); setToast({ title: 'Archive action simulated', description: 'Archived exists only in this editor session.', tone: 'warning' }); }} />
    <AdminDialog open={discardOpen} title="Discard unsaved demo changes?" description="The explicit Back to Blog action detected local unsaved changes. Browser and sidebar navigation are not universally intercepted." confirmLabel="Discard and Go Back" onClose={() => setDiscardOpen(false)} onConfirm={() => navigate('/admin/blog')} />
  </div>;
}
