import { useEffect, useRef } from 'react';
import type { EditorialMedia, LocalizedEditorialText } from '../../types/editorial';
import { AdminInput } from '../../ui/FormControls';
import { MediaUpload } from '../../ui/MediaUpload';
import { LanguageTabs, type AdminLanguage } from '../../ui/MultilingualFields';
import { useState } from 'react';

interface EditorialMediaSectionProps {
  cover: EditorialMedia | null;
  alt: LocalizedEditorialText;
  onCoverChange: (cover: EditorialMedia | null) => void;
  onAltChange: (alt: LocalizedEditorialText) => void;
  error?: string;
}

export function EditorialMediaSection({ cover, alt, onCoverChange, onAltChange, error }: EditorialMediaSectionProps) {
  const [language, setLanguage] = useState<AdminLanguage>('en');
  const localUrls = useRef(new Set<string>());

  useEffect(() => () => { localUrls.current.forEach((url) => URL.revokeObjectURL(url)); localUrls.current.clear(); }, []);

  const replaceCover = (selection: { previewUrl: string; name: string; size: string; dimensions: string } | null) => {
    if (cover?.src.startsWith('blob:')) { URL.revokeObjectURL(cover.src); localUrls.current.delete(cover.src); }
    if (!selection) { onCoverChange(null); return; }
    localUrls.current.add(selection.previewUrl);
    onCoverChange({ ...selection, src: selection.previewUrl, source: 'local-preview', productionReady: false });
  };

  return (
    <div className="space-y-5">
      <div className={`rounded-lg border px-4 py-3 text-sm ${cover?.source === 'frontend-placeholder' ? 'border-amber-200 bg-amber-50 text-amber-950' : cover ? 'border-sky-200 bg-sky-50 text-sky-950' : 'border-red-200 bg-red-50 text-red-900'}`}>
        <p className="font-extrabold">Cover present: {cover ? 'Yes' : 'No'} · Production-ready media: {cover?.productionReady ? 'Yes' : 'No'}</p>
        <p className="mt-1 text-xs leading-5">{cover?.source === 'frontend-placeholder' ? 'Current cover is a frontend placeholder. Replace with approved production media before real publication.' : cover ? 'Local preview only. It is not uploaded, stored, or production-ready.' : 'A cover is required by the current public article layout before simulated publishing.'}</p>
      </div>
      <MediaUpload initialSrc={cover?.src} initialMeta={cover ? { name: cover.name, size: cover.size, dimensions: cover.dimensions } : undefined} showAltField={false} previewAlt={alt.en || 'Cover preview'} objectUrlOwnership="consumer" onChange={replaceCover} />
      {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">{error}</p>}
      <LanguageTabs language={language} onLanguageChange={setLanguage} ariaLabel="Cover alternative text language" completion={{ en: { complete: Boolean(alt.en.trim()), label: alt.en.trim() ? 'Complete' : 'Missing' }, bn: { complete: Boolean(alt.bn.trim()), label: alt.bn.trim() ? 'সম্পূর্ণ' : 'অনুবাদ অসম্পূর্ণ' } }}>
        <AdminInput label={language === 'en' ? 'Cover image alternative text' : 'কভার ছবির বিকল্প লেখা'} className={language === 'bn' ? 'admin-bn-text' : undefined} value={alt[language]} onChange={(event) => onAltChange({ ...alt, [language]: event.target.value })} helpText="Describe the image; do not treat placeholder imagery as client-owned media." />
      </LanguageTabs>
      <p className="text-xs leading-5 text-[var(--admin-muted)]">Recommended editorial cover ratio: 12:7 or similar landscape crop · PNG, JPG or WEBP · maximum local preview size 8 MB.</p>
    </div>
  );
}
