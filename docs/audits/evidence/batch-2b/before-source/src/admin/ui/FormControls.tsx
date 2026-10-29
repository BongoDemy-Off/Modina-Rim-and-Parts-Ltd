import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface FieldShellProps {
  id: string;
  label: string;
  helpText?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

function FieldShell({ id, label, helpText, error, required, children }: FieldShellProps) {
  const messageId = `${id}-${error ? 'error' : 'help'}`;
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-[var(--admin-heading)]">
        {label} {required && <span className="text-[var(--admin-accent)]" aria-hidden="true">*</span>}
      </label>
      {children}
      {(error || helpText) && (
        <p id={messageId} className={cn('mt-1.5 text-xs', error ? 'font-semibold text-[var(--admin-error)]' : 'text-[var(--admin-muted)]')}>
          {error || helpText}
        </p>
      )}
    </div>
  );
}

interface AdminInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helpText?: string;
  error?: string;
}

export function AdminInput({ label, helpText, error, id: suppliedId, className, required, ...props }: AdminInputProps) {
  const generatedId = useId();
  const id = suppliedId ?? generatedId;
  return (
    <FieldShell id={id} label={label} helpText={helpText} error={error} required={required}>
      <input
        id={id}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={(error || helpText) ? `${id}-${error ? 'error' : 'help'}` : undefined}
        className={cn('admin-control px-3.5 py-2.5', className)}
        {...props}
      />
    </FieldShell>
  );
}

interface AdminTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helpText?: string;
  error?: string;
}

export function AdminTextarea({ label, helpText, error, id: suppliedId, className, required, ...props }: AdminTextareaProps) {
  const generatedId = useId();
  const id = suppliedId ?? generatedId;
  return (
    <FieldShell id={id} label={label} helpText={helpText} error={error} required={required}>
      <textarea
        id={id}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={(error || helpText) ? `${id}-${error ? 'error' : 'help'}` : undefined}
        className={cn('admin-control min-h-28 resize-y px-3.5 py-2.5', className)}
        {...props}
      />
    </FieldShell>
  );
}

interface AdminSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  helpText?: string;
  error?: string;
  children: ReactNode;
}

export function AdminSelect({ label, helpText, error, id: suppliedId, className, children, required, ...props }: AdminSelectProps) {
  const generatedId = useId();
  const id = suppliedId ?? generatedId;
  return (
    <FieldShell id={id} label={label} helpText={helpText} error={error} required={required}>
      <select id={id} required={required} aria-invalid={Boolean(error)} aria-describedby={(error || helpText) ? `${id}-${error ? 'error' : 'help'}` : undefined} className={cn('admin-control px-3.5 py-2.5', className)} {...props}>{children}</select>
    </FieldShell>
  );
}

interface AdminCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export function AdminCheckbox({ label, description, id: suppliedId, className, ...props }: AdminCheckboxProps) {
  const generatedId = useId();
  const id = suppliedId ?? generatedId;
  return (
    <label htmlFor={id} className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg p-2 hover:bg-slate-50">
      <input id={id} type="checkbox" className={cn('mt-1 h-4 w-4 accent-[var(--admin-accent)]', className)} {...props} />
      <span>
        <span className="block text-sm font-bold text-[var(--admin-heading)]">{label}</span>
        {description && <span className="mt-0.5 block text-xs text-[var(--admin-muted)]">{description}</span>}
      </span>
    </label>
  );
}

export function AdminSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className="flex min-h-11 items-center gap-3 rounded-lg p-2 text-left hover:bg-slate-50">
      <span className={cn('relative h-6 w-11 shrink-0 rounded-full transition-colors', checked ? 'bg-[var(--admin-accent)]' : 'bg-slate-300')}>
        <span className={cn('absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform', checked ? 'translate-x-5' : 'translate-x-0.5')} />
      </span>
      <span className="text-sm font-bold text-[var(--admin-heading)]">{label}</span>
    </button>
  );
}
