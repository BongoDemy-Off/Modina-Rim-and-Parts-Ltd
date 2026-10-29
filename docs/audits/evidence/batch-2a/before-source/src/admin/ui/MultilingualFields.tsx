import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Languages } from 'lucide-react';
import { AdminInput, AdminTextarea } from './FormControls';
import { cn } from '../../lib/utils';

export type AdminLanguage = 'en' | 'bn';

interface LanguageTabsProps {
  language: AdminLanguage;
  onLanguageChange: (language: AdminLanguage) => void;
  completion?: Record<AdminLanguage, { complete: boolean; label: string }>;
  children: ReactNode;
  ariaLabel?: string;
}

export function LanguageTabs({ language, onLanguageChange, completion, children, ariaLabel = 'Content language' }: LanguageTabsProps) {
  const en = completion?.en ?? { complete: true, label: 'Complete' };
  const bn = completion?.bn ?? { complete: false, label: 'Missing content' };
  const id = useId();
  const tabs = useRef<Record<AdminLanguage, HTMLButtonElement | null>>({ en: null, bn: null });
  const selectTab = (nextLanguage: AdminLanguage) => {
    onLanguageChange(nextLanguage);
    tabs.current[nextLanguage]?.focus();
  };
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, current: AdminLanguage) => {
    const next = event.key === 'Home' ? 'en' : event.key === 'End' ? 'bn' : event.key === 'ArrowLeft' || event.key === 'ArrowRight' ? (current === 'en' ? 'bn' : 'en') : null;
    if (!next) return;
    event.preventDefault();
    selectTab(next);
  };
  return (
    <div className="space-y-5">
      <div role="tablist" aria-label={ariaLabel} className="inline-flex w-full rounded-lg border border-[var(--admin-border)] bg-slate-100 p-1 sm:w-auto">
        <button ref={(element) => { tabs.current.en = element; }} id={`${id}-tab-en`} type="button" role="tab" aria-selected={language === 'en'} aria-controls={`${id}-panel`} tabIndex={language === 'en' ? 0 : -1} onKeyDown={(event) => onTabKeyDown(event, 'en')} onClick={() => onLanguageChange('en')} className={cn('flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md px-4 text-sm font-bold sm:flex-none', language === 'en' ? 'bg-white text-[var(--admin-heading)] shadow-sm' : 'text-[var(--admin-muted)]')}>
          {en.complete ? <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" /> : <AlertCircle className="h-4 w-4 text-amber-600" aria-hidden="true" />} English <span className={`hidden text-xs font-medium sm:inline ${en.complete ? 'text-emerald-700' : 'text-amber-700'}`}>{en.label}</span>
        </button>
        <button ref={(element) => { tabs.current.bn = element; }} id={`${id}-tab-bn`} type="button" role="tab" aria-selected={language === 'bn'} aria-controls={`${id}-panel`} tabIndex={language === 'bn' ? 0 : -1} onKeyDown={(event) => onTabKeyDown(event, 'bn')} onClick={() => onLanguageChange('bn')} className={cn('admin-bn-text flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md px-4 text-sm font-bold sm:flex-none', language === 'bn' ? 'bg-white text-[var(--admin-heading)] shadow-sm' : 'text-[var(--admin-muted)]')}>
          {bn.complete ? <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" /> : <AlertCircle className="h-4 w-4 text-amber-600" aria-hidden="true" />} বাংলা <span className={`hidden text-xs font-medium sm:inline ${bn.complete ? 'text-emerald-700' : 'text-amber-700'}`}>{bn.label}</span>
        </button>
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${language}`} className={cn(language === 'bn' && 'admin-bn-text')}>{children}</div>
    </div>
  );
}

export function MultilingualFields() {
  const [language, setLanguage] = useState<AdminLanguage>('en');

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-[var(--admin-border)] bg-slate-50 p-3">
          <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--admin-muted)]">Shared fields</p>
          <p className="mt-1 text-sm text-[var(--admin-text)]">SKU · status · category · media · sort order</p>
        </div>
        <div className="rounded-lg border border-[var(--admin-border)] bg-slate-50 p-3">
          <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--admin-muted)]">Translated fields</p>
          <p className="mt-1 text-sm text-[var(--admin-text)]">Name · description · body · captions · SEO text</p>
        </div>
      </div>

      <LanguageTabs language={language} onLanguageChange={setLanguage} completion={{ en: { complete: true, label: 'Complete' }, bn: { complete: false, label: '২টি ঘর বাকি' } }}>
      <div className="grid gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[var(--admin-muted)]"><Languages className="h-4 w-4" aria-hidden="true" /> {language === 'en' ? 'English content preview' : 'বাংলা কনটেন্ট প্রিভিউ'}</div>
        {language === 'en' ? (
          <>
            <AdminInput key="en-name" label="Product Name" defaultValue="Motor Cycle Center Stand" />
            <AdminTextarea key="en-description" label="Description" defaultValue="Heavy-duty centre stand engineered for dependable balance, stability, and long service life." />
          </>
        ) : (
          <>
            <AdminInput key="bn-name" className="admin-bn-text" label="পণ্যের নাম" defaultValue="মোটরসাইকেল সেন্টার স্ট্যান্ড" />
            <AdminTextarea key="bn-description" className="admin-bn-text" label="বিবরণ" placeholder="বাংলা বিবরণ এখনও লেখা হয়নি" error="এই অনুবাদটি সম্পূর্ণ করতে আরও ২টি ঘর পূরণ করুন।" />
          </>
        )}
      </div>
      </LanguageTabs>
      <p className="text-xs text-[var(--admin-muted)]">Language switching is local UI state only. No translation is saved or submitted.</p>
    </div>
  );
}
