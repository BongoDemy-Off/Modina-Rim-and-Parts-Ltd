import { useState } from 'react';
import type { AdminProduct } from '../../types/products';
import { AdminInput, AdminTextarea } from '../../ui/FormControls';
import { LanguageTabs, type AdminLanguage } from '../../ui/MultilingualFields';

export function ProductSeoSection({ product, onChange }: { product: AdminProduct; onChange: (product: AdminProduct) => void }) {
  const [language, setLanguage] = useState<AdminLanguage>('en');
  const update = (field: 'title' | 'description', value: string) => onChange({ ...product, seo: { ...product.seo, [field]: { ...product.seo[field], [language]: value } } });
  const previewTitle = product.seo.title[language] || product.content.name[language] || (language === 'en' ? 'Untitled Product' : 'শিরোনামহীন পণ্য');
  const previewDescription = product.seo.description[language] || product.content.shortDescription[language] || (language === 'en' ? 'Add a meta description to preview this search result.' : 'সার্চ প্রিভিউ দেখতে মেটা বিবরণ যোগ করুন।');
  return (
    <LanguageTabs language={language} onLanguageChange={setLanguage} ariaLabel="SEO language">
      <div className="grid gap-4">
        <AdminInput label={language === 'en' ? 'SEO Title' : 'এসইও শিরোনাম'} className={language === 'bn' ? 'admin-bn-text' : undefined} value={product.seo.title[language]} onChange={(event) => update('title', event.target.value)} helpText={`${product.seo.title[language].length}/60 characters · guidance only`} />
        <AdminTextarea label={language === 'en' ? 'Meta Description' : 'মেটা বিবরণ'} className={language === 'bn' ? 'admin-bn-text' : undefined} value={product.seo.description[language]} onChange={(event) => update('description', event.target.value)} helpText={`${product.seo.description[language].length}/160 characters · guidance only`} />
        <div className={`rounded-xl border border-[var(--admin-border)] bg-slate-50 p-4 ${language === 'bn' ? 'admin-bn-text' : ''}`}>
          <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--admin-muted)]">Search Preview</p>
          <p className="mt-3 break-words text-lg font-bold text-blue-800">{previewTitle}</p>
          <p className="mt-1 text-xs text-emerald-700">modinarim.com › products › {product.sku.toLowerCase() || 'new-product'}</p>
          <p className="mt-2 break-words text-sm leading-6 text-[var(--admin-text)]">{previewDescription}</p>
        </div>
      </div>
    </LanguageTabs>
  );
}
