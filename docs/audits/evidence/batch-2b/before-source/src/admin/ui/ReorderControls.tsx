import { ArrowDown, ArrowUp } from 'lucide-react';
import { AdminButton } from './Button';

interface ReorderControlsProps {
  position: number;
  total: number;
  itemLabel: string;
  onMoveEarlier: () => void;
  onMoveLater: () => void;
  earlierLabel?: string;
  laterLabel?: string;
}

export function ReorderControls({ position, total, itemLabel, onMoveEarlier, onMoveLater, earlierLabel = 'Move earlier', laterLabel = 'Move later' }: ReorderControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="min-w-16 text-sm font-extrabold text-[var(--admin-heading)]">{position} of {total}</span>
      <AdminButton variant="ghost" className="px-3" disabled={position <= 1} onClick={onMoveEarlier} aria-label={`${earlierLabel}: ${itemLabel}`}>
        <ArrowUp className="h-4 w-4" aria-hidden="true" /> <span className="hidden xl:inline">{earlierLabel}</span>
      </AdminButton>
      <AdminButton variant="ghost" className="px-3" disabled={position >= total} onClick={onMoveLater} aria-label={`${laterLabel}: ${itemLabel}`}>
        <ArrowDown className="h-4 w-4" aria-hidden="true" /> <span className="hidden xl:inline">{laterLabel}</span>
      </AdminButton>
    </div>
  );
}
