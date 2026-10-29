import { useState } from 'react';
import type { AdminProduct } from '../../types/products';
import { AdminInput, AdminTextarea } from '../../ui/FormControls';
import { LanguageTabs, type AdminLanguage } from '../../ui/MultilingualFields';

export function ProductTranslations({ product, onChange, nameError }: { product: AdminProduct; onChange: (product: AdminProduct) => void; nameError?: string }) {
  const [language, setLanguage] = useState<AdminLanguage>('en');
  const fields = product.content;
  const missing = (lang: AdminLanguage) => [fields.name[lang], fields.shortDescription[lang], fields.detailedDescription[lang]].filter((value) => !value.trim()).length;
  const completion = {
    en: { complete: missing('en') === 0, label: missing('en') === 0 ? 'Complete' : `Missing ${missing('en')}` },
    bn: { complete: missing('bn') === 0, label: missing('bn') === 0 ? 'Complete' : `Missing ${missing('bn')}` },
  };
  const update = (field: keyof AdminProduct['content'], value: string) => onChange({
    ...product,
    content: { ...product.content, [field]: { ...product.content[field], [language]: value } },
  });

  return (
    <LanguageTabs language={language} onLanguageChange={setLanguage} completion={completion} ariaLabel="Product content language">
      <div className="grid gap-4">
        <AdminInput
          label={language === 'en' ? 'Product Name' : 'পণ্যের নাম'}
          value={fields.name[language]}
          onChange={(event) => update('name', event.target.value)}
          error={language === 'en' ? nameError : undefined}
          required={language === 'en'}
          className={language === 'bn' ? 'admin-bn-text' : undefined}
          placeholder={language === 'bn' ? 'বাংলা পণ্যের নাম লিখুন' : 'Enter the product name'}
        />
        <AdminTextarea
          label={language === 'en' ? 'Short Description' : 'সংক্ষিপ্ত বিবরণ'}
          value={fields.shortDescription[language]}
          onChange={(event) => update('shortDescription', event.target.value)}
          className={language === 'bn' ? 'admin-bn-text' : undefined}
          placeholder={language === 'bn' ? 'সংক্ষিপ্ত বাংলা বিবরণ লিখুন' : 'A concise catalog summary'}
        />
        <AdminTextarea
          label={language === 'en' ? 'Detailed Description' : 'বিস্তারিত বিবরণ'}
          value={fields.detailedDescription[language]}
          onChange={(event) => update('detailedDescription', event.target.value)}
          className={language === 'bn' ? 'admin-bn-text' : undefined}
          placeholder={language === 'bn' ? 'বিস্তারিত বাংলা বিবরণ লিখুন' : 'Optional detailed product information'}
        />
      </div>
    </LanguageTabs>
  );
}
