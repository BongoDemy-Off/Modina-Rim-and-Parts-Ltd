import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, FileVideo, Film, LockKeyhole, ShieldAlert } from 'lucide-react';
import { homepageInternalDestinations } from '../../data/homepage';
import { adminTestimonials } from '../../data/testimonials';
import type {
  HomepageCategorySlot,
  HomepageConfig,
  HomepageCta,
  HomepageHeroSlide,
  HomepageInternalDestination,
  HomepageLocalizedText,
  HomepageMedia,
  HomepageMetric,
  HomepageProductCategory,
  HomepageQualityCard,
  HomepageDownloadSummary,
  HomepageValidationErrors,
} from '../../types/homepage';
import type { AdminLanguage } from '../../ui/MultilingualFields';
import { SectionCard } from '../../ui/Card';
import { AdminInput, AdminSelect, AdminTextarea } from '../../ui/FormControls';
import { MediaUpload } from '../../ui/MediaUpload';
import { ReorderControls } from '../../ui/ReorderControls';

interface SectionProps {
  config: HomepageConfig;
  language: AdminLanguage;
  errors: HomepageValidationErrors;
  onChange: (config: HomepageConfig) => void;
}

function localizedClass(language: AdminLanguage) {
  return language === 'bn' ? 'admin-bn-text' : undefined;
}

function changeLocalized(value: HomepageLocalizedText, language: AdminLanguage, next: string): HomepageLocalizedText {
  return { ...value, [language]: next };
}

function sourceLanguageLabel(language: AdminLanguage, englishLabel: string, bengaliLabel: string) {
  return language === 'en' ? englishLabel : bengaliLabel;
}

function MediaTruth({ media }: { media: HomepageMedia }) {
  const copy = media.origin === 'current-local-project'
    ? 'Current local project asset — production approval/provenance not confirmed.'
    : media.origin === 'remote-stock-placeholder'
      ? 'Remote stock/placeholder media — production ready: No.'
      : media.origin === 'local-preview'
        ? 'Local replacement preview — production readiness remains unverified. No upload occurred.'
        : 'Media missing.';
  return (
    <div className={`rounded-lg px-3 py-2 text-xs font-semibold leading-5 ${media.origin === 'missing' ? 'bg-red-50 text-red-800' : 'bg-amber-50 text-amber-900'}`}>
      <span className="block">Media present: {media.mediaPresent ? 'Yes' : 'No'} · Production ready: {media.productionReady ? 'Yes' : 'No'}</span>
      <span>{copy}</span>
    </div>
  );
}

function ReviewWarning({ children }: { children: string }) {
  return <p className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold leading-5 text-amber-900"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{children}</p>;
}

function CtaFields({ cta, language, onChange, error }: { cta: HomepageCta; language: AdminLanguage; onChange: (cta: HomepageCta) => void; error?: string }) {
  return (
    <div className="grid gap-4 rounded-lg border border-[var(--admin-border)] p-4 sm:grid-cols-2">
      <AdminInput
        label={sourceLanguageLabel(language, 'CTA label — English', 'CTA লেবেল — বাংলা')}
        className={localizedClass(language)}
        value={cta.label[language]}
        onChange={(event) => onChange({ ...cta, label: changeLocalized(cta.label, language, event.target.value) })}
        error={language === 'en' ? error : undefined}
      />
      <AdminSelect
        label="Safe internal destination"
        value={cta.destination}
        onChange={(event) => onChange({ ...cta, destination: event.target.value as HomepageInternalDestination })}
        helpText="Source-derived internal routes only. No arbitrary URL, HTML, or navigation builder."
      >
        {homepageInternalDestinations.map((destination) => <option key={destination.value} value={destination.value}>{destination.label}</option>)}
      </AdminSelect>
    </div>
  );
}

function imageFromSelection(selection: { previewUrl: string; name: string } | null): HomepageMedia {
  return selection
    ? { src: selection.previewUrl, name: selection.name, origin: 'local-preview', mediaPresent: true, productionReady: false }
    : { src: '', name: '', origin: 'missing', mediaPresent: false, productionReady: false };
}

function HeroSlideEditor({ slide, total, language, onChange, onMoveEarlier, onMoveLater }: { slide: HomepageHeroSlide; total: number; language: AdminLanguage; onChange: (slide: HomepageHeroSlide) => void; onMoveEarlier: () => void; onMoveLater: () => void }) {
  return (
    <article className="space-y-4 rounded-xl border border-[var(--admin-border)] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="font-extrabold text-[var(--admin-heading)]">Slide {slide.order}</p><p className="text-xs text-[var(--admin-muted)]">Shared ID: {slide.id}</p></div>
        <ReorderControls position={slide.order} total={total} itemLabel={slide.label.en || slide.id} onMoveEarlier={onMoveEarlier} onMoveLater={onMoveLater} />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <AdminInput label={sourceLanguageLabel(language, 'Slide label — English', 'স্লাইড লেবেল — বাংলা')} className={localizedClass(language)} value={slide.label[language]} onChange={(event) => onChange({ ...slide, label: changeLocalized(slide.label, language, event.target.value) })} />
        <AdminInput label={sourceLanguageLabel(language, 'Source category label — English', 'সোর্স ক্যাটাগরি লেবেল — বাংলা')} className={localizedClass(language)} value={slide.sourceCategoryLabel[language]} onChange={(event) => onChange({ ...slide, sourceCategoryLabel: changeLocalized(slide.sourceCategoryLabel, language, event.target.value) })} helpText="Preserves the existing per-slide category metadata; the current public render does not display this field." />
        <AdminInput label={sourceLanguageLabel(language, 'Alternative text — English', 'বিকল্প টেক্সট — বাংলা')} className={localizedClass(language)} value={slide.alt[language]} onChange={(event) => onChange({ ...slide, alt: changeLocalized(slide.alt, language, event.target.value) })} helpText={slide.altIsFutureMetadata ? 'Future-facing accessibility metadata; the public source currently reuses the slide label as alt text.' : undefined} />
      </div>
      <MediaUpload initialSrc={slide.media.src || undefined} initialMeta={{ name: slide.media.name || 'Hero media', size: 'Source reference', dimensions: 'Current source media' }} showAltField={false} previewAlt={slide.alt.en || slide.label.en || 'Hero slide preview'} onChange={(selection) => onChange({ ...slide, media: imageFromSelection(selection) })} />
      <MediaTruth media={slide.media} />
    </article>
  );
}

function MetricEditor({ metric, language, onChange }: { metric: HomepageMetric; language: AdminLanguage; onChange: (metric: HomepageMetric) => void }) {
  return (
    <div className="space-y-3 rounded-lg border border-[var(--admin-border)] p-4">
      <p className="text-xs font-extrabold uppercase tracking-wider text-[var(--admin-muted)]">Shared item {metric.order} · {metric.id}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <AdminInput label="Source value" value={metric.value} onChange={(event) => onChange({ ...metric, value: event.target.value })} helpText="Preserved as a source string. It is not calculated or synchronized with another metric." />
        <AdminInput label={sourceLanguageLabel(language, 'Label — English', 'লেবেল — বাংলা')} className={localizedClass(language)} value={metric.label[language]} onChange={(event) => onChange({ ...metric, label: changeLocalized(metric.label, language, event.target.value) })} />
      </div>
      {metric.reviewRequired && <ReviewWarning>Verify business statistic before production publishing.</ReviewWarning>}
    </div>
  );
}

function FacilityVideoEditor({ media, onChange }: { media: HomepageMedia; onChange: (media: HomepageMedia) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState(media.src);
  const [error, setError] = useState('');

  useEffect(() => () => { if (previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  const useFile = (file?: File) => {
    setError('');
    if (!file) return;
    if (file.type !== 'video/webm' && !file.name.toLowerCase().endsWith('.webm')) {
      setError('Choose a WEBM file. The current Homepage source uses WEBM; no other format was added.');
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onChange({ src: url, name: file.name, origin: 'local-preview', mediaPresent: true, productionReady: false });
  };

  const remove = () => {
    setPreviewUrl('');
    setError('');
    if (inputRef.current) inputRef.current.value = '';
    onChange({ src: '', name: '', origin: 'missing', mediaPresent: false, productionReady: false });
  };

  return (
    <div className="space-y-4">
      <input ref={inputRef} type="file" accept="video/webm,.webm" className="sr-only" onChange={(event) => useFile(event.target.files?.[0])} />
      {previewUrl ? <video src={previewUrl} controls muted className="max-h-72 w-full rounded-xl bg-slate-950 object-contain" aria-label="Facility video local preview" /> : <div className="rounded-xl border-2 border-dashed border-[var(--admin-border-strong)] bg-slate-50 p-6 text-center"><FileVideo className="mx-auto h-8 w-8 text-[var(--admin-muted)]" aria-hidden="true" /><p className="mt-2 font-extrabold">No facility video selected</p></div>}
      <div className="flex flex-wrap gap-2">
        <button type="button" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[var(--admin-border-strong)] bg-white px-4 py-2 text-sm font-bold" onClick={() => inputRef.current?.click()}><Film className="h-4 w-4" aria-hidden="true" /> Replace with local WEBM</button>
        {previewUrl && <button type="button" className="inline-flex min-h-11 items-center justify-center rounded-lg px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-50" onClick={remove}>Remove preview media</button>}
      </div>
      {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">{error}</p>}
      <MediaTruth media={media} />
      <p className="text-xs leading-5 text-[var(--admin-muted)]">Content/media only. Public autoplay, loop, mute, crop, aspect ratio, positioning, and playback implementation remain fixed.</p>
    </div>
  );
}

export function HomepageHeroSection({ config, language, errors, onChange }: SectionProps) {
  const hero = config.hero;
  const updateSlide = (next: HomepageHeroSlide) => onChange({ ...config, hero: { ...hero, slides: hero.slides.map((slide) => slide.id === next.id ? next : slide) } });
  const moveSlide = (id: string, delta: -1 | 1) => {
    const sorted = [...hero.slides].sort((a, b) => a.order - b.order);
    const index = sorted.findIndex((slide) => slide.id === id); const destination = index + delta;
    if (destination < 0 || destination >= sorted.length) return;
    const other = sorted[destination];
    const slides = hero.slides.map((slide) => slide.id === id ? { ...slide, order: other.order } : slide.id === other.id ? { ...slide, order: sorted[index].order } : slide);
    onChange({ ...config, hero: { ...hero, slides } });
  };
  return (
    <div id="homepage-hero" className="scroll-mt-24">
      <SectionCard title="1. Hero & trust bar" description="Global Hero copy, two safe CTAs, five source slides, and separate trust-metric strings.">
        <div className="space-y-6 p-4 sm:p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminInput label={sourceLanguageLabel(language, 'Headline line 1 — English', 'শিরোনাম লাইন ১ — বাংলা')} className={localizedClass(language)} value={hero.titleLineOne[language]} onChange={(event) => onChange({ ...config, hero: { ...hero, titleLineOne: changeLocalized(hero.titleLineOne, language, event.target.value) } })} error={language === 'en' ? errors.heroTitle : undefined} />
            <AdminInput label={sourceLanguageLabel(language, 'Headline line 2 — English', 'শিরোনাম লাইন ২ — বাংলা')} className={localizedClass(language)} value={hero.titleLineTwo[language]} onChange={(event) => onChange({ ...config, hero: { ...hero, titleLineTwo: changeLocalized(hero.titleLineTwo, language, event.target.value) } })} error={language === 'en' ? errors.heroTitle : undefined} />
          </div>
          <AdminTextarea label={sourceLanguageLabel(language, 'Hero body — English', 'হিরো বডি — বাংলা')} className={localizedClass(language)} value={hero.body[language]} onChange={(event) => onChange({ ...config, hero: { ...hero, body: changeLocalized(hero.body, language, event.target.value) } })} error={language === 'en' ? errors.heroBody : undefined} helpText={language === 'bn' ? 'The current public component hardcodes the English body; Bengali content is intentionally incomplete.' : undefined} />
          <div className="grid gap-4 lg:grid-cols-2"><CtaFields cta={hero.primaryCta} language={language} error={errors.heroCtas} onChange={(primaryCta) => onChange({ ...config, hero: { ...hero, primaryCta } })} /><CtaFields cta={hero.secondaryCta} language={language} error={errors.heroCtas} onChange={(secondaryCta) => onChange({ ...config, hero: { ...hero, secondaryCta } })} /></div>
          <div>
            <div className="mb-3"><h3 className="font-extrabold text-[var(--admin-heading)]">Hero slides</h3><p className="text-xs leading-5 text-[var(--admin-muted)]">One shared five-slide structure across languages. No per-slide headline or description exists. Order controls affect this local demo only.</p></div>
            {errors.heroSlides && <p role="alert" className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">{errors.heroSlides}</p>}
            <div className="grid gap-4">{[...hero.slides].sort((a, b) => a.order - b.order).map((slide) => <HeroSlideEditor key={slide.id} slide={slide} total={hero.slides.length} language={language} onChange={updateSlide} onMoveEarlier={() => moveSlide(slide.id, -1)} onMoveLater={() => moveSlide(slide.id, 1)} />)}</div>
          </div>
          <div><h3 className="mb-3 font-extrabold text-[var(--admin-heading)]">Trust metrics</h3><div className="grid gap-4 lg:grid-cols-2">{hero.trustMetrics.map((metric) => <MetricEditor key={metric.id} metric={metric} language={language} onChange={(next) => onChange({ ...config, hero: { ...hero, trustMetrics: hero.trustMetrics.map((item) => item.id === next.id ? next : item) } })} />)}</div></div>
          <ReviewWarning>Hero metrics remain independent from About counters. Conflicting source claims are not normalized, calculated, or synchronized.</ReviewWarning>
          <p className="flex items-center gap-2 text-xs text-[var(--admin-muted)]"><LockKeyhole className="h-4 w-4" aria-hidden="true" />Autoplay timing, transitions, animation, overlay, height, image position, and breakpoints are fixed presentation.</p>
        </div>
      </SectionCard>
    </div>
  );
}

export function HomepageAboutSection({ config, language, errors, onChange }: SectionProps) {
  const about = config.about;
  const updateCounter = (next: HomepageMetric) => onChange({ ...config, about: { ...about, counters: about.counters.map((item) => item.id === next.id ? next : item) } });
  return <div id="homepage-about" className="scroll-mt-24"><SectionCard title="2. About teaser & facility video" description="Source copy, three independent counter strings, and the current local WEBM reference."><div className="space-y-6 p-4 sm:p-5">
    {errors.about && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">{errors.about}</p>}
    <div className="grid gap-4 sm:grid-cols-2"><AdminInput label={sourceLanguageLabel(language, 'Eyebrow — English', 'আইব্রো — বাংলা')} className={localizedClass(language)} value={about.eyebrow[language]} onChange={(event) => onChange({ ...config, about: { ...about, eyebrow: changeLocalized(about.eyebrow, language, event.target.value) } })} /><AdminInput label={sourceLanguageLabel(language, 'Heading — English', 'শিরোনাম — বাংলা')} className={localizedClass(language)} value={about.heading[language]} onChange={(event) => onChange({ ...config, about: { ...about, heading: changeLocalized(about.heading, language, event.target.value) } })} /></div>
    <AdminTextarea label={sourceLanguageLabel(language, 'Body — English', 'বডি — বাংলা')} className={localizedClass(language)} value={about.body[language]} onChange={(event) => onChange({ ...config, about: { ...about, body: changeLocalized(about.body, language, event.target.value) } })} />
    <CtaFields cta={about.storyCta} language={language} onChange={(storyCta) => onChange({ ...config, about: { ...about, storyCta } })} />
    <div><h3 className="mb-3 font-extrabold text-[var(--admin-heading)]">About counters</h3><div className="grid gap-4 lg:grid-cols-3">{about.counters.map((counter) => <MetricEditor key={counter.id} metric={counter} language={language} onChange={updateCounter} />)}</div></div>
    <div className="grid gap-4 sm:grid-cols-2"><AdminInput label={sourceLanguageLabel(language, 'Video heading — English', 'ভিডিও শিরোনাম — বাংলা')} className={localizedClass(language)} value={about.videoHeading[language]} onChange={(event) => onChange({ ...config, about: { ...about, videoHeading: changeLocalized(about.videoHeading, language, event.target.value) } })} /><AdminInput label={sourceLanguageLabel(language, 'Video caption — English', 'ভিডিও ক্যাপশন — বাংলা')} className={localizedClass(language)} value={about.videoCaption[language]} onChange={(event) => onChange({ ...config, about: { ...about, videoCaption: changeLocalized(about.videoCaption, language, event.target.value) } })} /></div>
    <FacilityVideoEditor media={about.video} onChange={(video) => onChange({ ...config, about: { ...about, video } })} />
  </div></SectionCard></div>;
}

function CategorySlotEditor({ slot, language, onChange }: { slot: HomepageCategorySlot; language: AdminLanguage; onChange: (slot: HomepageCategorySlot) => void }) {
  const categories: HomepageProductCategory[] = ['Motorcycle', 'Rims', 'Hardware'];
  return <article className="space-y-4 rounded-xl border border-[var(--admin-border)] p-4"><div><p className="font-extrabold text-[var(--admin-heading)]">Fixed mosaic slot {slot.slot}</p><p className="text-xs text-[var(--admin-muted)]">Shared ID: {slot.id} · card count and slot cannot change</p></div><div className="grid gap-4 sm:grid-cols-2"><AdminInput label={sourceLanguageLabel(language, 'Eyebrow — English', 'আইব্রো — বাংলা')} className={localizedClass(language)} value={slot.eyebrow[language]} onChange={(event) => onChange({ ...slot, eyebrow: changeLocalized(slot.eyebrow, language, event.target.value) })} /><AdminInput label={sourceLanguageLabel(language, 'Title — English', 'শিরোনাম — বাংলা')} className={localizedClass(language)} value={slot.title[language]} onChange={(event) => onChange({ ...slot, title: changeLocalized(slot.title, language, event.target.value) })} /></div><AdminTextarea label={sourceLanguageLabel(language, 'Editorial description — English', 'সম্পাদকীয় বিবরণ — বাংলা')} className={localizedClass(language)} value={slot.description[language]} onChange={(event) => onChange({ ...slot, description: changeLocalized(slot.description, language, event.target.value) })} /><AdminSelect label="Typed Product category reference" value={slot.categoryReference} onChange={(event) => onChange({ ...slot, categoryReference: event.target.value as HomepageProductCategory })} helpText={`Current source destination: /products?category=${slot.categoryReference}. This does not copy or synchronize Product records.`}>{categories.map((category) => <option key={category}>{category}</option>)}</AdminSelect><MediaUpload initialSrc={slot.media.src || undefined} initialMeta={{ name: slot.media.name, size: 'Source reference', dimensions: 'Current source media' }} showAltField={false} previewAlt={slot.title.en || `Category slot ${slot.slot}`} onChange={(selection) => onChange({ ...slot, media: imageFromSelection(selection) })} /><MediaTruth media={slot.media} />{slot.slot === 3 && <ReviewWarning>This “BICYCLE & RICKSHAW” slot currently routes to the shared Rims category. The source behavior is preserved and not normalized.</ReviewWarning>}</article>;
}

export function HomepageCategoriesSection({ config, language, errors, onChange }: SectionProps) {
  const section = config.categories;
  return <div id="homepage-categories" className="scroll-mt-24"><SectionCard title="3. Product category grid" description="Exactly four shared design slots with typed source routes; no Product-record duplication or live synchronization."><div className="space-y-6 p-4 sm:p-5">{errors.categories && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">{errors.categories}</p>}<div className="grid gap-4 sm:grid-cols-2"><AdminInput label={sourceLanguageLabel(language, 'Eyebrow — English', 'আইব্রো — বাংলা')} className={localizedClass(language)} value={section.eyebrow[language]} onChange={(event) => onChange({ ...config, categories: { ...section, eyebrow: changeLocalized(section.eyebrow, language, event.target.value) } })} /><AdminInput label={sourceLanguageLabel(language, 'Heading — English', 'শিরোনাম — বাংলা')} className={localizedClass(language)} value={section.heading[language]} onChange={(event) => onChange({ ...config, categories: { ...section, heading: changeLocalized(section.heading, language, event.target.value) } })} /></div><AdminTextarea label={sourceLanguageLabel(language, 'Intro body — English', 'ইন্ট্রো বডি — বাংলা')} className={localizedClass(language)} value={section.body[language]} onChange={(event) => onChange({ ...config, categories: { ...section, body: changeLocalized(section.body, language, event.target.value) } })} /><AdminInput label={sourceLanguageLabel(language, 'Full range label — English', 'সম্পূর্ণ রেঞ্জ লেবেল — বাংলা')} className={localizedClass(language)} value={section.fullRangeLabel[language]} onChange={(event) => onChange({ ...config, categories: { ...section, fullRangeLabel: changeLocalized(section.fullRangeLabel, language, event.target.value) } })} /><div className="grid gap-4 lg:grid-cols-2">{section.slots.map((slot) => <CategorySlotEditor key={slot.id} slot={slot} language={language} onChange={(next) => onChange({ ...config, categories: { ...section, slots: section.slots.map((item) => item.id === next.id ? next : item) } })} />)}</div></div></SectionCard></div>;
}

function QualityCardEditor({ card, language, onChange }: { card: HomepageQualityCard; language: AdminLanguage; onChange: (card: HomepageQualityCard) => void }) {
  return <article className="space-y-4 rounded-lg border border-[var(--admin-border)] p-4"><p className="text-xs font-extrabold uppercase tracking-wider text-[var(--admin-muted)]">Fixed card {card.order} · {card.id}</p><AdminInput label={sourceLanguageLabel(language, 'Title — English', 'শিরোনাম — বাংলা')} className={localizedClass(language)} value={card.title[language]} onChange={(event) => onChange({ ...card, title: changeLocalized(card.title, language, event.target.value) })} /><AdminTextarea label={sourceLanguageLabel(language, 'Description — English', 'বিবরণ — বাংলা')} className={localizedClass(language)} value={card.description[language]} onChange={(event) => onChange({ ...card, description: changeLocalized(card.description, language, event.target.value) })} /></article>;
}

export function HomepageQualitySection({ config, language, errors, onChange }: SectionProps) {
  const section = config.quality;
  return <div id="homepage-quality" className="scroll-mt-24"><SectionCard title="4. Quality assurance cards" description="One shared three-card structure; language switching edits text without changing identity or order."><div className="space-y-6 p-4 sm:p-5">{errors.quality && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">{errors.quality}</p>}<div className="grid gap-4 sm:grid-cols-2"><AdminInput label={sourceLanguageLabel(language, 'Eyebrow — English', 'আইব্রো — বাংলা')} className={localizedClass(language)} value={section.eyebrow[language]} onChange={(event) => onChange({ ...config, quality: { ...section, eyebrow: changeLocalized(section.eyebrow, language, event.target.value) } })} /><AdminInput label={sourceLanguageLabel(language, 'Heading — English', 'শিরোনাম — বাংলা')} className={localizedClass(language)} value={section.heading[language]} onChange={(event) => onChange({ ...config, quality: { ...section, heading: changeLocalized(section.heading, language, event.target.value) } })} /></div><AdminTextarea label={sourceLanguageLabel(language, 'Intro body — English', 'ইন্ট্রো বডি — বাংলা')} className={localizedClass(language)} value={section.body[language]} onChange={(event) => onChange({ ...config, quality: { ...section, body: changeLocalized(section.body, language, event.target.value) } })} /><AdminInput label={sourceLanguageLabel(language, 'Learn More label — English', 'আরও জানুন লেবেল — বাংলা')} className={localizedClass(language)} value={section.learnMoreLabel[language]} onChange={(event) => onChange({ ...config, quality: { ...section, learnMoreLabel: changeLocalized(section.learnMoreLabel, language, event.target.value) } })} helpText="Visible source text only; the current card does not provide a destination." /><div className="grid gap-4 lg:grid-cols-3">{section.cards.map((card) => <QualityCardEditor key={card.id} card={card} language={language} onChange={(next) => onChange({ ...config, quality: { ...section, cards: section.cards.map((item) => item.id === next.id ? next : item) } })} />)}</div><ReviewWarning>“Triple ISO” and “100% batch testing” remain literal source claims. Verify before production publishing.</ReviewWarning></div></SectionCard></div>;
}

function DownloadSummaryEditor({ summary, language, onChange }: { summary: HomepageDownloadSummary; language: AdminLanguage; onChange: (summary: HomepageDownloadSummary) => void }) {
  return <article className="space-y-4 rounded-lg border border-[var(--admin-border)] p-4"><p className="text-xs font-extrabold uppercase tracking-wider text-[var(--admin-muted)]">Homepage summary {summary.order} · no live Download relationship</p><AdminInput label={sourceLanguageLabel(language, 'Visible name — English', 'দৃশ্যমান নাম — বাংলা')} className={localizedClass(language)} value={summary.name[language]} onChange={(event) => onChange({ ...summary, name: changeLocalized(summary.name, language, event.target.value) })} /><div className="grid gap-4 sm:grid-cols-2"><AdminInput label="Source format" value={summary.format} onChange={(event) => onChange({ ...summary, format: event.target.value })} /><AdminInput label="Source size" value={summary.size} onChange={(event) => onChange({ ...summary, size: event.target.value })} /></div><ReviewWarning>Download mapping/content review required. This summary is preserved independently and does not update from Downloads Admin.</ReviewWarning></article>;
}

export function HomepageDownloadsSection({ config, language, errors, onChange }: SectionProps) {
  const section = config.downloads;
  return <div id="homepage-downloads" className="scroll-mt-24"><SectionCard title="5. Download center" description="Source-derived Homepage summaries remain independent where mapping is ambiguous or conflicting."><div className="space-y-6 p-4 sm:p-5">{errors.downloads && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">{errors.downloads}</p>}<div className="grid gap-4 sm:grid-cols-2"><AdminInput label={sourceLanguageLabel(language, 'Eyebrow — English', 'আইব্রো — বাংলা')} className={localizedClass(language)} value={section.eyebrow[language]} onChange={(event) => onChange({ ...config, downloads: { ...section, eyebrow: changeLocalized(section.eyebrow, language, event.target.value) } })} /><AdminInput label={sourceLanguageLabel(language, 'Heading — English', 'শিরোনাম — বাংলা')} className={localizedClass(language)} value={section.heading[language]} onChange={(event) => onChange({ ...config, downloads: { ...section, heading: changeLocalized(section.heading, language, event.target.value) } })} /></div><AdminTextarea label={sourceLanguageLabel(language, 'Body — English', 'বডি — বাংলা')} className={localizedClass(language)} value={section.body[language]} onChange={(event) => onChange({ ...config, downloads: { ...section, body: changeLocalized(section.body, language, event.target.value) } })} /><AdminInput label={sourceLanguageLabel(language, 'Catalog action label — English', 'ক্যাটালগ অ্যাকশন লেবেল — বাংলা')} className={localizedClass(language)} value={section.catalogLabel[language]} onChange={(event) => onChange({ ...config, downloads: { ...section, catalogLabel: changeLocalized(section.catalogLabel, language, event.target.value) } })} helpText="Visible label only. No target field is provided because the current action is inert." /><ReviewWarning>Current frontend action has no downloadable file target. No fake PDF or Download reference is attached.</ReviewWarning><CtaFields cta={section.downloadsCta} language={language} onChange={(downloadsCta) => onChange({ ...config, downloads: { ...section, downloadsCta } })} /><div className="grid gap-4 lg:grid-cols-2">{section.summaries.map((summary) => <DownloadSummaryEditor key={summary.id} summary={summary} language={language} onChange={(next) => onChange({ ...config, downloads: { ...section, summaries: section.summaries.map((item) => item.id === next.id ? next : item) } })} />)}</div><ReviewWarning>The Warranty Terms source remains 0.8 MB here and 0.6 MB in Downloads data. No reconciliation was performed.</ReviewWarning></div></SectionCard></div>;
}

export function HomepageTestimonialsSection({ config, language, errors, onChange }: SectionProps) {
  const section = config.testimonials;
  const toggle = (id: number) => {
    const selected = section.selectedTestimonialIds.includes(id);
    const next = selected ? section.selectedTestimonialIds.filter((candidate) => candidate !== id) : section.selectedTestimonialIds.length < section.sourceSlotLimit ? [...section.selectedTestimonialIds, id] : section.selectedTestimonialIds;
    onChange({ ...config, testimonials: { ...section, selectedTestimonialIds: next } });
  };
  return <div id="homepage-testimonials" className="scroll-mt-24"><SectionCard title="6. Testimonials" description="Three source-supported slots referencing stable Admin demo IDs; testimonial content is not duplicated here."><div className="space-y-6 p-4 sm:p-5">{errors.testimonials && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">{errors.testimonials}</p>}<div className="grid gap-4 sm:grid-cols-2"><AdminInput label={sourceLanguageLabel(language, 'Eyebrow — English', 'আইব্রো — বাংলা')} className={localizedClass(language)} value={section.eyebrow[language]} onChange={(event) => onChange({ ...config, testimonials: { ...section, eyebrow: changeLocalized(section.eyebrow, language, event.target.value) } })} /><AdminInput label={sourceLanguageLabel(language, 'Heading — English', 'শিরোনাম — বাংলা')} className={localizedClass(language)} value={section.heading[language]} onChange={(event) => onChange({ ...config, testimonials: { ...section, heading: changeLocalized(section.heading, language, event.target.value) } })} /></div><fieldset><legend className="font-extrabold text-[var(--admin-heading)]">Selected testimonial IDs ({section.selectedTestimonialIds.length} of {section.sourceSlotLimit})</legend><p className="mt-1 text-xs leading-5 text-[var(--admin-muted)]">Local architectural demonstration only. Changes do not persist across routes or synchronize with a separate editor session.</p><div className="mt-3 grid gap-3">{adminTestimonials.map((testimonial) => <label key={testimonial.id} className="flex min-h-11 items-start gap-3 rounded-lg border border-[var(--admin-border)] p-3"><input type="checkbox" checked={section.selectedTestimonialIds.includes(testimonial.id as number)} disabled={!section.selectedTestimonialIds.includes(testimonial.id as number) && section.selectedTestimonialIds.length >= section.sourceSlotLimit} onChange={() => toggle(testimonial.id as number)} className="mt-1 h-4 w-4 accent-[var(--admin-accent)]" /><span className="min-w-0"><span className="block font-bold text-[var(--admin-heading)]">ID {testimonial.id}: {testimonial.displayAttribution.en}</span><span className="block break-words text-xs text-[var(--admin-muted)]">{testimonial.organization} · {testimonial.status} · {testimonial.readiness}</span></span></label>)}</div></fieldset><ReviewWarning>Currently visible does not mean client-verified endorsement. All three source records remain Verification required with remote stock/placeholder portraits.</ReviewWarning></div></SectionCard></div>;
}

export function HomepageClosingCtaSection({ config, language, errors, onChange }: SectionProps) {
  const section = config.closingCta;
  return <div id="homepage-closing-cta" className="scroll-mt-24"><SectionCard title="7. Pre-footer CTA" description="Closing source copy and one safe internal destination; presentation remains fixed."><div className="space-y-6 p-4 sm:p-5">{errors.closingCta && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">{errors.closingCta}</p>}<div className="grid gap-4 sm:grid-cols-2"><AdminInput label={sourceLanguageLabel(language, 'Eyebrow — English', 'আইব্রো — বাংলা')} className={localizedClass(language)} value={section.eyebrow[language]} onChange={(event) => onChange({ ...config, closingCta: { ...section, eyebrow: changeLocalized(section.eyebrow, language, event.target.value) } })} /><AdminInput label={sourceLanguageLabel(language, 'Heading — English', 'শিরোনাম — বাংলা')} className={localizedClass(language)} value={section.heading[language]} onChange={(event) => onChange({ ...config, closingCta: { ...section, heading: changeLocalized(section.heading, language, event.target.value) } })} /></div><AdminTextarea label={sourceLanguageLabel(language, 'Body — English', 'বডি — বাংলা')} className={localizedClass(language)} value={section.body[language]} onChange={(event) => onChange({ ...config, closingCta: { ...section, body: changeLocalized(section.body, language, event.target.value) } })} /><CtaFields cta={section.cta} language={language} error={errors.closingCta} onChange={(cta) => onChange({ ...config, closingCta: { ...section, cta } })} /><p className="flex items-center gap-2 text-xs text-[var(--admin-muted)]"><ShieldAlert className="h-4 w-4" aria-hidden="true" />No custom URLs, HTML, layout, animation, spacing, typography, or breakpoint controls.</p></div></SectionCard></div>;
}
