import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import type { AdminProductSpecification } from '../../types/products';
import { AdminButton } from '../../ui/Button';
import { AdminCheckbox, AdminInput } from '../../ui/FormControls';

export function SpecificationEditor({ specifications, onChange }: { specifications: AdminProductSpecification[]; onChange: (specifications: AdminProductSpecification[]) => void }) {
  const update = (index: number, patch: Partial<AdminProductSpecification>) => onChange(specifications.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item));
  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= specifications.length) return;
    const next = [...specifications];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };
  const add = () => onChange([...specifications, {
    id: `spec-${crypto.randomUUID()}`,
    key: '',
    label: { en: '', bn: '' },
    value: { en: '', bn: '' },
    sharedValue: false,
  }]);

  return (
    <div className="space-y-4">
      {specifications.length === 0 && <p className="rounded-lg border border-dashed border-[var(--admin-border-strong)] bg-slate-50 p-5 text-center text-sm text-[var(--admin-muted)]">No product-specific specifications yet.</p>}
      <ol className="space-y-4">
        {specifications.map((specification, index) => (
          <li key={specification.id} className="rounded-xl border border-[var(--admin-border)] bg-white p-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-extrabold text-[var(--admin-heading)]">Specification {index + 1}</p>
              <div className="flex flex-wrap gap-1">
                <AdminButton variant="ghost" className="px-3" aria-label={`Move specification ${index + 1} up`} disabled={index === 0} onClick={() => move(index, -1)}><ArrowUp className="h-4 w-4" aria-hidden="true" /> <span className="hidden sm:inline">Move Up</span></AdminButton>
                <AdminButton variant="ghost" className="px-3" aria-label={`Move specification ${index + 1} down`} disabled={index === specifications.length - 1} onClick={() => move(index, 1)}><ArrowDown className="h-4 w-4" aria-hidden="true" /> <span className="hidden sm:inline">Move Down</span></AdminButton>
                <AdminButton variant="ghost" className="px-3 text-red-700" aria-label={`Remove specification ${index + 1}`} onClick={() => onChange(specifications.filter((item) => item.id !== specification.id))}><Trash2 className="h-4 w-4" aria-hidden="true" /> <span className="hidden sm:inline">Remove</span></AdminButton>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <AdminInput label="Stable key" value={specification.key} onChange={(event) => update(index, { key: event.target.value })} placeholder="material" helpText="Local identifier; not a backend schema." />
              <div className="hidden lg:block" aria-hidden="true" />
              <AdminInput label="English label" value={specification.label.en} onChange={(event) => update(index, { label: { ...specification.label, en: event.target.value } })} placeholder="Material" />
              <AdminInput label="বাংলা লেবেল" className="admin-bn-text" value={specification.label.bn} onChange={(event) => update(index, { label: { ...specification.label, bn: event.target.value } })} placeholder="উপাদান" />
              <AdminInput label="English value" value={specification.value.en} onChange={(event) => update(index, { value: { ...specification.value, en: event.target.value, ...(specification.sharedValue ? { bn: event.target.value } : {}) } })} placeholder="Reinforced Steel" />
              <AdminInput label={specification.sharedValue ? 'বাংলা মান (shared)' : 'বাংলা মান'} className="admin-bn-text" value={specification.sharedValue ? specification.value.en : specification.value.bn} disabled={specification.sharedValue} onChange={(event) => update(index, { value: { ...specification.value, bn: event.target.value } })} placeholder="রিইনফোর্সড স্টিল" />
              <div className="lg:col-span-2">
                <AdminCheckbox label="Use the English value for both languages" description="Useful for language-neutral values such as ISO codes or measurements." checked={specification.sharedValue} onChange={(event) => update(index, { sharedValue: event.target.checked, value: { ...specification.value, bn: event.target.checked ? specification.value.en : specification.value.bn } })} />
              </div>
            </div>
          </li>
        ))}
      </ol>
      <AdminButton variant="secondary" onClick={add}><Plus className="h-4 w-4" aria-hidden="true" /> Add Specification</AdminButton>
    </div>
  );
}
