import { useState } from 'react';
import type { EditorialSeo, LocalizedEditorialText } from '../../types/editorial';
import { AdminInput, AdminTextarea } from '../../ui/FormControls';
import { LanguageTabs, type AdminLanguage } from '../../ui/MultilingualFields';

interface EditorialSeoSectionProps {
  seo: EditorialSeo;
  fallbackTitle: LocalizedEditorialText;
  fallbackDescription: LocalizedEditorialText;
  slug: string;
  routeRoot: 'blog' | 'news';
  onChange: (seo: EditorialSeo) => void;
}

export function EditorialSeoSection({ seo, fallbackTitle, fallbackDescription, slug, routeRoot, onChange }: EditorialSeoSectionProps) {
  const [language, setLanguage] = useState<AdminLanguage>('en');
  const update = (field: keyof EditorialSeo, value: string) => onChange({ ...seo, [field]: { ...seo[field], [language]: value } });
  const title = seo.title[language] || fallbackTitle[language] || (language === 'en' ? 'Untitled article' : 'শিরোনামহীন নিবন্ধ');
  const description = seo.description[language] || fallbackDescription[language] || (language === 'en' ? 'Add a description to preview this result.' : 'সার্চ প্রিভিউ দেখতে বিবরণ যোগ করুন।');
  return (
    <LanguageTabs language={language} onLanguageChange={setLanguage} ariaLabel="SEO language" completion={{
      en: { complete: Boolean(seo.title.en.trim() && seo.description.en.trim()), label: seo.title.en.trim() && seo.description.en.trim() ? 'Complete' : 'Incomplete' },
      bn: { complete: Boolean(seo.title.bn.trim() && seo.description.bn.trim()), label: seo.title.bn.trim() && seo.description.bn.trim() ? 'সম্পূর্ণ' : 'অনুবাদ অসম্পূর্ণ' },
    }}>
      <div className="grid gap-4">
        <AdminInput label={language === 'en' ? 'SEO Title' : 'এসইও শিরোনাম'} className={language === 'bn' ? 'admin-bn-text' : undefined} value={seo.title[language]} onChange={(event) => update('title', event.target.value)} helpText={`${seo.title[language].length}/60 characters · guidance only`} />
        <AdminTextarea label={language === 'en' ? 'Meta Description' : 'মেটা বিবরণ'} className={language === 'bn' ? 'admin-bn-text' : undefined} value={seo.description[language]} onChange={(event) => update('description', event.target.value)} helpText={`${seo.description[language].length}/160 characters · guidance only`} />
        <div className={`rounded-xl border border-[var(--admin-border)] bg-slate-50 p-4 ${language === 'bn' ? 'admin-bn-text' : ''}`}>
          <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--admin-muted)]">Search Preview</p>
          <p className="mt-3 break-words text-lg font-bold text-blue-800">{title}</p>
          <p className="mt-1 break-all text-xs text-emerald-700">modinarim.com › {routeRoot} › {slug || 'future-slug'}</p>
          <p className="mt-1 text-xs font-semibold text-amber-700">Illustrative future CMS path only. Current public routes still use record IDs.</p>
          <p className="mt-2 break-words text-sm leading-6 text-[var(--admin-text)]">{description}</p>
        </div>
      </div>
    </LanguageTabs>
  );
}
