import type { GalleryDisplayStyle } from '../../types/gallery';
import { ReorderControls } from '../../ui/ReorderControls';

interface GalleryDisplaySectionProps {
  value: GalleryDisplayStyle | '';
  onChange: (value: GalleryDisplayStyle) => void;
  position: number;
  total: number;
  itemLabel: string;
  onMoveEarlier: () => void;
  onMoveLater: () => void;
  error?: string;
}

const choices: Array<{ value: GalleryDisplayStyle; description: string }> = [
  { value: 'Normal', description: 'One standard grid cell.' },
  { value: 'Wide', description: 'Two columns from the public small-screen breakpoint.' },
  { value: 'Tall', description: 'Two public grid rows.' },
];

export function GalleryDisplaySection({ value, onChange, position, total, itemLabel, onMoveEarlier, onMoveLater, error }: GalleryDisplaySectionProps) {
  return (
    <div className="space-y-5">
      <fieldset>
        <legend className="text-sm font-bold text-[var(--admin-heading)]">Display style <span className="text-[var(--admin-accent)]" aria-hidden="true">*</span></legend>
        <p className="mt-1 text-xs leading-5 text-[var(--admin-muted)]">Constrained equivalents of the approved public Normal, Wide, and Tall spans. No arbitrary CSS values are exposed.</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {choices.map((choice) => <label key={choice.value} className={`flex min-h-24 cursor-pointer items-start gap-3 rounded-lg border p-4 ${value === choice.value ? 'border-[var(--admin-accent)] bg-rose-50' : 'border-[var(--admin-border)] bg-white'}`}><input type="radio" name="gallery-display-style" value={choice.value} checked={value === choice.value} onChange={() => onChange(choice.value)} className="mt-1 h-4 w-4 accent-[var(--admin-accent)]" /><span><span className="block font-extrabold text-[var(--admin-heading)]">{choice.value}</span><span className="mt-1 block text-xs leading-5 text-[var(--admin-muted)]">{choice.description}</span></span></label>)}
        </div>
        {error && <p role="alert" className="mt-2 text-xs font-semibold text-[var(--admin-error)]">{error}</p>}
      </fieldset>
      <div className="border-t border-[var(--admin-border)] pt-5">
        <p className="mb-2 text-sm font-bold text-[var(--admin-heading)]">Global Gallery position</p>
        <ReorderControls position={position} total={total} itemLabel={itemLabel} onMoveEarlier={onMoveEarlier} onMoveLater={onMoveLater} />
        <p className="mt-2 text-xs leading-5 text-[var(--admin-muted)]">Position controls content sequence only; display style does not provide pixel-perfect masonry placement.</p>
      </div>
    </div>
  );
}
