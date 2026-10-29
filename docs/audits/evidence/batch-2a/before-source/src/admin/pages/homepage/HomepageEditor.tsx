import { useState } from 'react';
import { ArrowLeft, Eye, Save, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  HomepageAboutSection,
  HomepageCategoriesSection,
  HomepageClosingCtaSection,
  HomepageDownloadsSection,
  HomepageHeroSection,
  HomepageQualitySection,
  HomepageTestimonialsSection,
} from '../../components/homepage/HomepageSections';
import { HomepageSectionNav } from '../../components/homepage/HomepageSectionNav';
import { cloneHomepageConfig, homepageInternalDestinations } from '../../data/homepage';
import { adminTestimonials } from '../../data/testimonials';
import type { HomepageConfig, HomepageValidationErrors } from '../../types/homepage';
import { AdminButton } from '../../ui/Button';
import { SectionCard } from '../../ui/Card';
import { AdminDialog } from '../../ui/Dialog';
import { DemoToast } from '../../ui/FeedbackStates';
import { LanguageTabs, type AdminLanguage } from '../../ui/MultilingualFields';
import { PageHeader } from '../../ui/PageHeader';
import { StatusBadge } from '../../ui/StatusBadge';

interface ToastMessage { title: string; description: string; tone: 'success' | 'warning' | 'info' }

const validDestinations = new Set(homepageInternalDestinations.map((item) => item.value));

function validateHomepage(config: HomepageConfig): HomepageValidationErrors {
  const heroCtasValid = [config.hero.primaryCta, config.hero.secondaryCta].every((cta) => cta.label.en.trim() && validDestinations.has(cta.destination));
  return {
    ...(!(config.hero.titleLineOne.en.trim() && config.hero.titleLineTwo.en.trim()) ? { heroTitle: 'Both English Hero headline lines are required for Publish Demo.' } : {}),
    ...(!config.hero.body.en.trim() ? { heroBody: 'Meaningful English Hero body content is required for Publish Demo.' } : {}),
    ...(!config.hero.slides.some((slide) => slide.media.mediaPresent && slide.media.src) ? { heroSlides: 'At least one usable Hero slide is required for Publish Demo.' } : {}),
    ...(!heroCtasValid ? { heroCtas: 'Each enabled Hero CTA needs an English label and a valid source-derived internal destination.' } : {}),
    ...(!(config.about.heading.en.trim() && config.about.body.en.trim() && config.about.video.mediaPresent) ? { about: 'The fixed About section needs English content and facility media before Publish Demo.' } : {}),
    ...(config.categories.slots.length !== 4 || config.categories.slots.some((slot) => !slot.title.en.trim() || !slot.media.mediaPresent) ? { categories: 'All four fixed Product-category slots need English titles and media before Publish Demo.' } : {}),
    ...(config.quality.cards.length !== 3 || config.quality.cards.some((card) => !card.title.en.trim() || !card.description.en.trim()) ? { quality: 'All three fixed Quality cards need English content before Publish Demo.' } : {}),
    ...(!(config.downloads.heading.en.trim() && config.downloads.summaries.length === 4) ? { downloads: 'The fixed Download section heading and four source summaries must remain present.' } : {}),
    ...(config.testimonials.selectedTestimonialIds.length < 1 || config.testimonials.selectedTestimonialIds.length > config.testimonials.sourceSlotLimit ? { testimonials: 'Select between one and three source-supported testimonial IDs.' } : {}),
    ...(!(config.closingCta.heading.en.trim() && config.closingCta.body.en.trim() && config.closingCta.cta.label.en.trim() && validDestinations.has(config.closingCta.cta.destination)) ? { closingCta: 'The closing CTA needs English content and a valid source-derived destination.' } : {}),
  };
}

export default function HomepageEditor() {
  const navigate = useNavigate();
  const [config, setConfig] = useState<HomepageConfig>(() => cloneHomepageConfig());
  const [language, setLanguage] = useState<AdminLanguage>('en');
  const [dirty, setDirty] = useState(false);
  const [errors, setErrors] = useState<HomepageValidationErrors>({});
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);

  const change = (next: HomepageConfig) => {
    setConfig(next);
    setDirty(true);
    setErrors({});
    setToast(null);
  };

  const saveDraft = () => {
    setConfig({ ...config, status: 'Draft', updatedAt: 'This demo session' });
    setDirty(false);
    setErrors({});
    setToast({ title: 'Homepage draft saved in this demo session', description: 'Incomplete content is allowed. Nothing persisted and the public Homepage did not change.', tone: 'success' });
  };

  const publish = () => {
    const nextErrors = validateHomepage(config);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setToast({ title: 'Homepage is not ready for Publish Demo', description: 'Review the minimum structural field errors. Source verification and Bengali completion remain non-blocking warnings.', tone: 'warning' });
      document.getElementById('homepage-hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setConfig({ ...config, status: 'Published', updatedAt: 'This demo session' });
    setDirty(false);
    setToast({ title: 'Homepage Publish Demo completed', description: 'Local status only. Business claims, testimonial authenticity, and media provenance remain unresolved warnings; no public content changed.', tone: 'warning' });
  };

  const back = () => dirty ? setDiscardOpen(true) : navigate('/admin/dashboard');
  const selectedTestimonials = adminTestimonials.filter((testimonial) => config.testimonials.selectedTestimonialIds.includes(testimonial.id as number));
  const englishComplete = Boolean(config.hero.titleLineOne.en.trim() && config.hero.titleLineTwo.en.trim() && config.hero.body.en.trim());
  const bengaliComplete = Boolean(config.hero.titleLineOne.bn.trim() && config.hero.titleLineTwo.bn.trim() && config.hero.body.bn.trim() && config.categories.slots.every((slot) => slot.title.bn.trim()));

  return (
    <div className="space-y-6 xl:space-y-8">
      <PageHeader
        eyebrow="Homepage Admin · singleton local prototype"
        title="Homepage"
        description="Structured content editing for the existing seven-section Homepage. Presentation, public data, and major section order remain fixed."
        actionsLayout="stack-until-xl"
        actions={<>
          <AdminButton variant="secondary" onClick={back}><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Dashboard</AdminButton>
          <AdminButton variant="ghost" onClick={() => setPreviewOpen(true)}><Eye className="h-4 w-4" aria-hidden="true" /> Admin Preview</AdminButton>
          <AdminButton variant="secondary" onClick={saveDraft}><Save className="h-4 w-4" aria-hidden="true" /> Save Draft</AdminButton>
          <AdminButton variant="primary" onClick={publish}><Send className="h-4 w-4" aria-hidden="true" /> Publish Demo</AdminButton>
        </>}
      />

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[var(--admin-border)] bg-white px-4 py-3">
        <StatusBadge status={config.status} />
        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-extrabold text-sky-800">Current frontend baseline</span>
        {dirty ? <span role="status" className="rounded-full bg-amber-50 px-3 py-1 text-xs font-extrabold text-amber-800">Unsaved Admin changes</span> : <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-800">No unsaved changes</span>}
        <span className="ml-auto text-xs font-semibold text-[var(--admin-muted)]">Demo only · no persistence or public mutation</span>
      </div>

      <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-950">
        <strong>Fixed Homepage architecture.</strong> Seven major sections are always present and immutable. This editor has no section creation, deletion, visibility, layout, CSS, HTML, breakpoint, spacing, animation, or autoplay controls.
      </div>
      {toast && <DemoToast {...toast} onClose={() => setToast(null)} />}
      {Object.keys(errors).length > 0 && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"><p className="font-extrabold">Publish Demo validation needs attention</p><ul className="mt-2 list-disc space-y-1 pl-5">{Object.values(errors).map((error) => <li key={error}>{error}</li>)}</ul><p className="mt-2 font-semibold">Bengali gaps, source claims, testimonial verification, and media provenance are warnings—not technical blockers.</p></div>}

      <LanguageTabs
        language={language}
        onLanguageChange={setLanguage}
        completion={{ en: { complete: englishComplete, label: englishComplete ? 'Core content present' : 'Core content incomplete' }, bn: { complete: bengaliComplete, label: bengaliComplete ? 'Core content present' : 'Source gaps remain' } }}
        ariaLabel="Homepage content language"
      >
        <div className="mt-4 rounded-lg border border-[var(--admin-border)] bg-white px-4 py-3 text-xs leading-5 text-[var(--admin-muted)]">
          English and বাংলা edit the same shared slide, metric, counter, category-slot, Quality-card, Download-summary, and testimonial-selection identities. Language switching cannot change their structure or order.
        </div>
        <div className="mt-6 grid min-w-0 gap-6 xl:grid-cols-[250px_minmax(0,1fr)] xl:items-start">
          <HomepageSectionNav />
          <div className="min-w-0 space-y-6">
            <HomepageHeroSection config={config} language={language} errors={errors} onChange={change} />
            <HomepageAboutSection config={config} language={language} errors={errors} onChange={change} />
            <HomepageCategoriesSection config={config} language={language} errors={errors} onChange={change} />
            <HomepageQualitySection config={config} language={language} errors={errors} onChange={change} />
            <HomepageDownloadsSection config={config} language={language} errors={errors} onChange={change} />
            <HomepageTestimonialsSection config={config} language={language} errors={errors} onChange={change} />
            <HomepageClosingCtaSection config={config} language={language} errors={errors} onChange={change} />
          </div>
        </div>
      </LanguageTabs>

      <SectionCard title="Publishing / page status" description="One page-level local workflow; no Archive, versions, schedule, approval stages, or per-section publishing.">
        <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
          <AdminButton variant="secondary" onClick={saveDraft}><Save className="h-4 w-4" aria-hidden="true" /> Save Draft</AdminButton>
          <AdminButton variant="ghost" onClick={() => setPreviewOpen(true)}><Eye className="h-4 w-4" aria-hidden="true" /> Admin Preview</AdminButton>
          <AdminButton variant="primary" onClick={publish}><Send className="h-4 w-4" aria-hidden="true" /> Publish Demo</AdminButton>
          <p className="self-center text-xs leading-5 text-[var(--admin-muted)]">All actions affect this component state only.</p>
        </div>
      </SectionCard>

      <AdminDialog open={previewOpen} title="Admin Preview — Demo Only" description="Compact structured content review. This is not a pixel-accurate public Homepage and no public preview URL exists." tone="info" confirmLabel={null} cancelLabel="Close Preview" onClose={() => setPreviewOpen(false)}>
        <div className="space-y-5">
          <div><p className="text-xs font-extrabold uppercase text-[var(--admin-muted)]">Hero</p><h3 className="mt-1 text-xl font-extrabold text-[var(--admin-heading)]">{config.hero.titleLineOne.en} {config.hero.titleLineTwo.en}</h3><p className="mt-1 leading-6">{config.hero.body.en || 'No English Hero body.'}</p><p className="mt-2 text-xs">{config.hero.slides.filter((slide) => slide.media.mediaPresent).length} usable slide(s) · local media approval/provenance not confirmed</p></div>
          <div><p className="text-xs font-extrabold uppercase text-[var(--admin-muted)]">Key source metrics</p><p className="mt-1">Hero: {config.hero.trustMetrics.map((metric) => metric.value).join(' · ')}</p><p>About: {config.about.counters.map((metric) => metric.value).join(' · ')}</p><p className="mt-1 font-semibold text-amber-800">Verify business statistics before production publishing.</p></div>
          <div><p className="text-xs font-extrabold uppercase text-[var(--admin-muted)]">Fixed category slots</p><p className="mt-1">{config.categories.slots.map((slot) => `${slot.slot}. ${slot.title.en} → ${slot.categoryReference}`).join(' · ')}</p></div>
          <div><p className="text-xs font-extrabold uppercase text-[var(--admin-muted)]">Downloads</p><p className="mt-1">{config.downloads.catalogLabel.en || 'Unlabelled catalog action'} — current frontend action has no downloadable target.</p><p className="font-semibold text-amber-800">Download mapping/content review required.</p></div>
          <div><p className="text-xs font-extrabold uppercase text-[var(--admin-muted)]">Selected testimonials</p>{selectedTestimonials.map((testimonial) => <p key={testimonial.id} className="mt-1 break-words">ID {testimonial.id}: {testimonial.displayAttribution.en} · {testimonial.organization} · {testimonial.readiness}</p>)}<p className="mt-1 font-semibold text-amber-800">Remote stock/placeholder portraits; no endorsement is client-verified.</p></div>
          <div><p className="text-xs font-extrabold uppercase text-[var(--admin-muted)]">Closing CTA</p><p className="mt-1 font-bold">{config.closingCta.heading.en}</p><p>{config.closingCta.cta.label.en} → {config.closingCta.cta.destination}</p></div>
        </div>
      </AdminDialog>
      <AdminDialog open={discardOpen} title="Discard unsaved Homepage demo changes?" description="The explicit Back action detected local changes. Sidebar and browser navigation are not universally intercepted." confirmLabel="Discard and Go to Dashboard" onClose={() => setDiscardOpen(false)} onConfirm={() => navigate('/admin/dashboard')} />
    </div>
  );
}
