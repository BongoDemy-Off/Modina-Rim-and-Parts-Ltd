import { Plus, Trash2 } from 'lucide-react';
import type { AdminCareer, CareerLanguage, CareerListItem, CareerValidationErrors } from '../../types/careers';
import { AdminButton } from '../../ui/Button';
import { SectionCard } from '../../ui/Card';
import { AdminInput, AdminTextarea } from '../../ui/FormControls';
import { LanguageTabs } from '../../ui/MultilingualFields';
import { ReorderControls } from '../../ui/ReorderControls';

const makeItem = (prefix: string): CareerListItem => ({ id: `${prefix}-${crypto.randomUUID()}`, content: { en: '', bn: '' } });

function OrderedTranslatedItems({ label, itemLabel, language, items, error, onChange }: { label: string; itemLabel: string; language: CareerLanguage; items: CareerListItem[]; error?: string; onChange: (items: CareerListItem[]) => void }) {
  const move = (index: number, delta: -1 | 1) => {
    const destination = index + delta;
    if (destination < 0 || destination >= items.length) return;
    const next = [...items];
    [next[index], next[destination]] = [next[destination], next[index]];
    onChange(next);
  };

  return (
    <fieldset className="space-y-3 rounded-xl border border-[var(--admin-border)] p-4">
      <legend className="px-1 text-sm font-extrabold text-[var(--admin-heading)]">{label}</legend>
      <p className="text-xs leading-5 text-[var(--admin-muted)]">One shared item order is used by English and বাংলা. Switching language edits only the selected text.</p>
      {items.map((item, index) => (
        <div key={item.id} className="rounded-lg border border-[var(--admin-border)] bg-slate-50 p-3">
          <AdminTextarea
            label={`${itemLabel} ${index + 1} · ${language === 'en' ? 'English' : 'বাংলা'}`}
            className={language === 'bn' ? 'admin-bn-text' : undefined}
            value={item.content[language]}
            rows={3}
            onChange={(event) => onChange(items.map((candidate) => candidate.id === item.id ? { ...candidate, content: { ...candidate.content, [language]: event.target.value } } : candidate))}
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <ReorderControls position={index + 1} total={items.length} itemLabel={`${itemLabel} ${index + 1}`} earlierLabel="Move Up" laterLabel="Move Down" onMoveEarlier={() => move(index, -1)} onMoveLater={() => move(index, 1)} />
            <AdminButton variant="ghost" className="px-3 text-red-700" onClick={() => onChange(items.filter((candidate) => candidate.id !== item.id))} aria-label={`Remove ${itemLabel} ${index + 1}`}><Trash2 className="h-4 w-4" aria-hidden="true" /> Remove</AdminButton>
          </div>
        </div>
      ))}
      {items.length === 0 && <p className="rounded-lg bg-slate-50 px-3 py-4 text-sm text-[var(--admin-muted)]">No items yet.</p>}
      {error && <p role="alert" className="text-sm font-semibold text-[var(--admin-error)]">{error}</p>}
      <AdminButton variant="secondary" onClick={() => onChange([...items, makeItem(label.toLowerCase())])}><Plus className="h-4 w-4" aria-hidden="true" /> Add item</AdminButton>
    </fieldset>
  );
}

export function CareerTranslations({ career, language, errors, onLanguageChange, onChange }: { career: AdminCareer; language: CareerLanguage; errors: CareerValidationErrors; onLanguageChange: (language: CareerLanguage) => void; onChange: (career: AdminCareer) => void }) {
  const englishComplete = Boolean(career.title.en.trim() && career.location.en.trim() && career.experience.en.trim() && career.description.en.trim() && career.responsibilities.some((item) => item.content.en.trim()) && career.requirements.some((item) => item.content.en.trim()));
  const bengaliComplete = Boolean(career.title.bn.trim() && career.location.bn.trim() && career.experience.bn.trim() && career.description.bn.trim() && career.responsibilities.length > 0 && career.responsibilities.every((item) => item.content.bn.trim()) && career.requirements.length > 0 && career.requirements.every((item) => item.content.bn.trim()));
  const translated = (field: 'title' | 'location' | 'experience' | 'description', value: string) => onChange({ ...career, [field]: { ...career[field], [language]: value } });

  return (
    <div id="job-content" className="scroll-mt-36">
      <SectionCard title="2. Job Content" description="Source-aligned vacancy content. No page builder or editorial blocks.">
        <div className="p-4 sm:p-5">
          <LanguageTabs language={language} onLanguageChange={onLanguageChange} completion={{ en: { complete: englishComplete, label: englishComplete ? 'Complete' : 'Incomplete' }, bn: { complete: bengaliComplete, label: bengaliComplete ? 'Complete' : 'Incomplete' } }} ariaLabel="Vacancy content language">
            <div className="grid gap-5">
              <AdminInput label={language === 'en' ? 'English Job Title' : 'বাংলা চাকরির শিরোনাম'} required={language === 'en'} value={career.title[language]} error={language === 'en' ? errors.title : undefined} onChange={(event) => translated('title', event.target.value)} />
              <div className="grid gap-5 sm:grid-cols-2">
                <AdminInput label={language === 'en' ? 'English Location' : 'বাংলা অবস্থান'} required={language === 'en'} value={career.location[language]} error={language === 'en' ? errors.location : undefined} onChange={(event) => translated('location', event.target.value)} />
                <AdminInput label={language === 'en' ? 'English Experience' : 'বাংলা অভিজ্ঞতা'} required={language === 'en'} value={career.experience[language]} error={language === 'en' ? errors.experience : undefined} onChange={(event) => translated('experience', event.target.value)} />
              </div>
              <AdminTextarea label={language === 'en' ? 'English Description' : 'বাংলা বিবরণ'} required={language === 'en'} value={career.description[language]} rows={6} error={language === 'en' ? errors.description : undefined} onChange={(event) => translated('description', event.target.value)} />
              <OrderedTranslatedItems label="Responsibilities" itemLabel="Responsibility" language={language} items={career.responsibilities} error={language === 'en' ? errors.responsibilities : undefined} onChange={(responsibilities) => onChange({ ...career, responsibilities })} />
              <OrderedTranslatedItems label="Requirements" itemLabel="Requirement" language={language} items={career.requirements} error={language === 'en' ? errors.requirements : undefined} onChange={(requirements) => onChange({ ...career, requirements })} />
            </div>
          </LanguageTabs>
        </div>
      </SectionCard>
    </div>
  );
}
