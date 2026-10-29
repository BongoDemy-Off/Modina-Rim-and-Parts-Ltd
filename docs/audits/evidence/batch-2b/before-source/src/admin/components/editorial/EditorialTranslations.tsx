import { useState } from 'react';
import type { LocalizedEditorialText } from '../../types/editorial';
import { AdminInput, AdminTextarea } from '../../ui/FormControls';
import { LanguageTabs, type AdminLanguage } from '../../ui/MultilingualFields';

interface EditorialTranslationsProps {
  title: LocalizedEditorialText;
  excerpt: LocalizedEditorialText;
  onTitleChange: (value: LocalizedEditorialText) => void;
  onExcerptChange: (value: LocalizedEditorialText) => void;
  titleError?: string;
}

export function EditorialTranslations({ title, excerpt, onTitleChange, onExcerptChange, titleError }: EditorialTranslationsProps) {
  const [language, setLanguage] = useState<AdminLanguage>('en');
  const completion = {
    en: { complete: Boolean(title.en.trim() && excerpt.en.trim()), label: title.en.trim() && excerpt.en.trim() ? 'Complete' : 'Incomplete' },
    bn: { complete: Boolean(title.bn.trim() && excerpt.bn.trim()), label: title.bn.trim() && excerpt.bn.trim() ? 'সম্পূর্ণ' : 'অনুবাদ অসম্পূর্ণ' },
  };
  return (
    <LanguageTabs language={language} onLanguageChange={setLanguage} completion={completion} ariaLabel="Title and excerpt language">
      <div className="grid gap-4">
        <AdminInput
          label={language === 'en' ? 'Title' : 'শিরোনাম'}
          required={language === 'en'}
          className={language === 'bn' ? 'admin-bn-text' : undefined}
          value={title[language]}
          onChange={(event) => onTitleChange({ ...title, [language]: event.target.value })}
          error={language === 'en' ? titleError : undefined}
          helpText={language === 'bn' ? 'Authoritative Bengali content is not available in the current public source. Add only client-approved translation.' : undefined}
        />
        <AdminTextarea
          label={language === 'en' ? 'Excerpt / Summary' : 'সারাংশ'}
          className={language === 'bn' ? 'admin-bn-text' : undefined}
          value={excerpt[language]}
          onChange={(event) => onExcerptChange({ ...excerpt, [language]: event.target.value })}
          helpText="Used by the Admin preview and future editorial listing metadata."
        />
      </div>
    </LanguageTabs>
  );
}
