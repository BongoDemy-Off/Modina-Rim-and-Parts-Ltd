import { useEffect, useRef, type ReactNode } from 'react';
import { AlertTriangle, Info, X } from 'lucide-react';
import type { AdminButtonVariant } from './Button';
import { AdminButton } from './Button';

interface AdminDialogProps {
  open: boolean;
  title: string;
  description: string;
  children?: ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmLabel?: string | null;
  cancelLabel?: string;
  confirmVariant?: AdminButtonVariant;
  tone?: 'warning' | 'info';
}

const focusableSelector = 'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function AdminDialog({ open, title, description, children, onClose, onConfirm, confirmLabel = 'Confirm demo action', cancelLabel = 'Cancel', confirmVariant = 'destructive', tone = 'warning' }: AdminDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(focusableSelector));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/45 p-0 sm:items-center sm:p-6"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="admin-dialog-title" aria-describedby="admin-dialog-description" className="w-full max-w-lg rounded-t-2xl border border-[var(--admin-border)] bg-white p-5 shadow-2xl sm:rounded-xl sm:p-6">
        <div className="flex items-start gap-3">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tone === 'info' ? 'bg-sky-50 text-sky-700' : 'bg-amber-50 text-amber-700'}`}>{tone === 'info' ? <Info className="h-5 w-5" aria-hidden="true" /> : <AlertTriangle className="h-5 w-5" aria-hidden="true" />}</span>
          <div className="min-w-0 flex-1">
            <h2 id="admin-dialog-title" className="text-lg font-extrabold text-[var(--admin-heading)]">{title}</h2>
            <p id="admin-dialog-description" className="mt-1 text-sm leading-6 text-[var(--admin-muted)]">{description}</p>
          </div>
          <button ref={closeRef} type="button" aria-label="Close dialog" onClick={onClose} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[var(--admin-muted)] hover:bg-slate-100 hover:text-[var(--admin-heading)]">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {children && <div className="mt-5 rounded-lg bg-slate-50 p-4 text-sm text-[var(--admin-text)]">{children}</div>}
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <AdminButton variant="secondary" onClick={onClose}>{cancelLabel}</AdminButton>
          {confirmLabel && <AdminButton variant={confirmVariant} onClick={() => { onConfirm?.(); onClose(); }}>{confirmLabel}</AdminButton>}
        </div>
      </div>
    </div>
  );
}
