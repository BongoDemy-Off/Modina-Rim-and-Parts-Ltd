import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { AdminGalleryItem, GalleryLocalizedText, GalleryMedia } from '../../types/gallery';
import { AdminInput } from '../../ui/FormControls';
import { MediaUpload, type LocalImageSelection } from '../../ui/MediaUpload';
import { LanguageTabs, type AdminLanguage } from '../../ui/MultilingualFields';

interface GalleryMediaSectionProps {
  item: AdminGalleryItem;
  language: AdminLanguage;
  onLanguageChange: (language: AdminLanguage) => void;
  onMediaChange: (media: GalleryMedia | null) => void;
  onAltChange: (alt: GalleryLocalizedText) => void;
  error?: string;
}

export function GalleryMediaSection({ item, language, onLanguageChange, onMediaChange, onAltChange, error }: GalleryMediaSectionProps) {
  const useLocalSelection = (selection: LocalImageSelection | null) => {
    onMediaChange(selection ? { ...selection, src: selection.previewUrl, source: 'local-preview', productionReady: false } : null);
  };
  const mediaLabel = !item.media
    ? 'Media missing'
    : item.media.source === 'frontend-placeholder'
      ? 'Current frontend placeholder — production media required'
      : 'Local preview only — production readiness unverified';

  return (
    <div className="space-y-5">
      <div className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${item.media ? 'border-amber-200 bg-amber-50 text-amber-950' : 'border-red-200 bg-red-50 text-red-900'}`}>
        {item.media ? <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" /> : <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />}
        <div><p className="font-extrabold">{mediaLabel}</p><p className="mt-1 leading-5">Media present: {item.media ? 'Yes' : 'No'} · Production ready: No. No provenance or approval workflow is available in this frontend demo.</p></div>
      </div>
      <MediaUpload
        initialSrc={item.media?.src}
        initialMeta={item.media ? { name: item.media.name, size: item.media.size, dimensions: item.media.dimensions } : undefined}
        onChange={useLocalSelection}
        showAltField={false}
        previewAlt={item.alt.en || item.title.en || 'Gallery media preview'}
      />
      {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">{error}</p>}
      <div className="border-t border-[var(--admin-border)] pt-5">
        <LanguageTabs language={language} onLanguageChange={onLanguageChange} ariaLabel="Gallery alternative text language" completion={{ en: { complete: Boolean(item.alt.en.trim()), label: item.alt.en.trim() ? 'Complete' : 'Missing' }, bn: { complete: Boolean(item.alt.bn.trim()), label: item.alt.bn.trim() ? 'Complete' : 'Missing' } }}>
          <AdminInput
            label={language === 'en' ? 'English alternative text' : 'বাংলা বিকল্প লেখা'}
            className={language === 'bn' ? 'admin-bn-text' : undefined}
            value={item.alt[language]}
            onChange={(event) => onAltChange({ ...item.alt, [language]: event.target.value })}
            helpText={item.altSource === 'derived-from-title' ? 'Future-facing Admin metadata. Seed value is derived from the current title; no unverified visual details were added.' : 'Future-facing accessibility metadata. It is not written to the current public Gallery.'}
          />
        </LanguageTabs>
      </div>
      <div className="flex items-start gap-2 text-xs leading-5 text-[var(--admin-muted)]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> One image field only. Admin preview uses this source directly; no thumbnail/full-image model or public URL transformation is reproduced.</div>
    </div>
  );
}
