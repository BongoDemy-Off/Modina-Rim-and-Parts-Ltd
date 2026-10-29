import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ImageOff, Star } from 'lucide-react';
import type { AdminProductMedia, ProductMediaRole } from '../../types/products';
import { AdminButton } from '../../ui/Button';
import { AdminCheckbox, AdminInput, AdminSelect } from '../../ui/FormControls';
import { LanguageTabs, type AdminLanguage } from '../../ui/MultilingualFields';
import { MediaUpload } from '../../ui/MediaUpload';

const roleLabels: Record<ProductMediaRole, string> = {
  product: 'Product View',
  engineering: 'Engineering View',
  assembly: 'Assembly View',
  additional: 'Additional Image',
};

function MediaAltFields({ media, onChange }: { media: AdminProductMedia; onChange: (media: AdminProductMedia) => void }) {
  const [language, setLanguage] = useState<AdminLanguage>('en');
  const completion = {
    en: { complete: Boolean(media.alt.en.trim()), label: media.alt.en.trim() ? 'Complete' : 'Missing alt text' },
    bn: { complete: Boolean(media.alt.bn.trim()), label: media.alt.bn.trim() ? 'Complete' : 'Missing alt text' },
  };
  return (
    <LanguageTabs language={language} onLanguageChange={setLanguage} completion={completion} ariaLabel={`Alternative text language for ${roleLabels[media.role]}`}>
      <AdminInput label={language === 'en' ? 'English alt text' : 'বাংলা বিকল্প লেখা'} className={language === 'bn' ? 'admin-bn-text' : undefined} value={media.alt[language]} onChange={(event) => onChange({ ...media, alt: { ...media.alt, [language]: event.target.value } })} placeholder={language === 'en' ? 'Describe this image meaningfully' : 'ছবিটির অর্থপূর্ণ বর্ণনা লিখুন'} />
    </LanguageTabs>
  );
}

export function ProductMediaManager({ media, onChange }: { media: AdminProductMedia[]; onChange: (media: AdminProductMedia[]) => void }) {
  const [pickerKey, setPickerKey] = useState(0);
  const localUrls = useRef(new Set<string>());
  useEffect(() => () => localUrls.current.forEach((url) => URL.revokeObjectURL(url)), []);
  const firstIncludedIndex = media.findIndex((item) => item.included);
  const update = (id: string, nextMedia: AdminProductMedia) => onChange(media.map((item) => item.id === id ? nextMedia : item));
  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= media.length) return;
    const next = [...media];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };
  const makeCover = (id: string) => {
    const selected = media.find((item) => item.id === id);
    if (!selected) return;
    const remaining = media.filter((item) => item.id !== id);
    const firstEligible = remaining.findIndex((item) => item.included);
    const insertionIndex = firstEligible < 0 ? 0 : firstEligible;
    const next = [...remaining];
    next.splice(insertionIndex, 0, { ...selected, included: true });
    onChange(next);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-950">
        <p className="font-extrabold">Carousel order and cover use one rule</p>
        <p className="mt-1 leading-6">Array order is carousel order. The first included image is always the cover. Making an image the cover includes it and moves it to the first eligible position.</p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-bold text-[var(--admin-heading)]">{firstIncludedIndex < 0 ? 'No cover image' : `Cover: image ${firstIncludedIndex + 1} · ${roleLabels[media[firstIncludedIndex].role]}`}</p>
        <p className="text-xs text-[var(--admin-muted)]">{media.filter((item) => item.included).length} of {media.length} included</p>
      </div>
      {media.length === 0 && (
        <div className="rounded-xl border border-dashed border-[var(--admin-border-strong)] bg-slate-50 px-5 py-8 text-center">
          <ImageOff className="mx-auto h-8 w-8 text-[var(--admin-muted)]" aria-hidden="true" />
          <p className="mt-3 font-extrabold text-[var(--admin-heading)]">Production media: Missing</p>
          <p className="mt-1 text-sm text-[var(--admin-muted)]">Public placeholder imagery is not treated as client-owned media.</p>
        </div>
      )}
      <ol className="space-y-5">
        {media.map((item, index) => {
          const isCover = index === firstIncludedIndex;
          return (
            <li key={item.id} className="rounded-xl border border-[var(--admin-border)] bg-white p-4">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-extrabold text-[var(--admin-heading)]">Image {index + 1} · {roleLabels[item.role]}</p>
                  <div className="mt-1 flex flex-wrap gap-2 text-xs font-bold">
                    {isCover && <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-amber-800"><Star className="h-3.5 w-3.5" aria-hidden="true" /> Cover</span>}
                    <span className={`rounded-full px-2 py-1 ${item.included ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>{item.included ? 'Included in carousel' : 'Excluded from carousel'}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600">{item.source === 'production' ? 'Production asset' : 'Local preview only'}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  <AdminButton variant="ghost" className="px-3" disabled={index === 0} aria-label={`Move image ${index + 1} earlier`} onClick={() => move(index, -1)}><ArrowUp className="h-4 w-4" aria-hidden="true" /> <span className="hidden sm:inline">Earlier</span></AdminButton>
                  <AdminButton variant="ghost" className="px-3" disabled={index === media.length - 1} aria-label={`Move image ${index + 1} later`} onClick={() => move(index, 1)}><ArrowDown className="h-4 w-4" aria-hidden="true" /> <span className="hidden sm:inline">Later</span></AdminButton>
                </div>
              </div>
              <div className="grid gap-5 lg:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.2fr)]">
                <MediaUpload
                  initialSrc={item.src}
                  previewAlt={`${roleLabels[item.role]} Admin preview`}
                  showAltField={false}
                  objectUrlOwnership="consumer"
                  onChange={(selection) => {
                    if (selection) {
                      if (item.src.startsWith('blob:')) { URL.revokeObjectURL(item.src); localUrls.current.delete(item.src); }
                      localUrls.current.add(selection.previewUrl);
                      update(item.id, { ...item, src: selection.previewUrl, source: 'local-preview' });
                    } else {
                      if (item.src.startsWith('blob:')) { URL.revokeObjectURL(item.src); localUrls.current.delete(item.src); }
                      onChange(media.filter((entry) => entry.id !== item.id));
                    }
                  }}
                />
                <div className="space-y-4">
                  <AdminSelect label="Image role" value={item.role} onChange={(event) => update(item.id, { ...item, role: event.target.value as ProductMediaRole })}>
                    {Object.entries(roleLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </AdminSelect>
                  <AdminCheckbox label="Include in public carousel" description="Demo metadata only; the public carousel is not changed." checked={item.included} onChange={(event) => update(item.id, { ...item, included: event.target.checked })} />
                  {!isCover && <AdminButton variant="secondary" onClick={() => makeCover(item.id)}><Star className="h-4 w-4" aria-hidden="true" /> Make Cover</AdminButton>}
                  <MediaAltFields media={item} onChange={(next) => update(item.id, next)} />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="rounded-xl border border-[var(--admin-border)] bg-slate-50 p-4">
        <p className="mb-3 font-extrabold text-[var(--admin-heading)]">Add another image</p>
        <MediaUpload key={pickerKey} showAltField={false} objectUrlOwnership="consumer" onChange={(selection) => {
          if (!selection) return;
          localUrls.current.add(selection.previewUrl);
          onChange([...media, { id: `media-${crypto.randomUUID()}`, src: selection.previewUrl, role: 'additional', included: true, alt: { en: '', bn: '' }, source: 'local-preview' }]);
          setPickerKey((value) => value + 1);
        }} />
      </div>
      <p className="text-xs leading-5 text-[var(--admin-muted)]">Supported preview formats: PNG, JPG and WEBP · maximum 8 MB. Recommended ratio: 4:3. Preferred master: 1600×1200 or larger. Guidance and validation are browser-local only.</p>
    </div>
  );
}
