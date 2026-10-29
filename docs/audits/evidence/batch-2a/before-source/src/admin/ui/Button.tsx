import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { LoaderCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export type AdminButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';

const variants: Record<AdminButtonVariant, string> = {
  primary: 'border-transparent bg-[var(--admin-accent)] text-white hover:bg-[var(--admin-accent-dark)]',
  secondary: 'border-[var(--admin-border-strong)] bg-white text-[var(--admin-heading)] hover:bg-[var(--admin-surface-subtle)]',
  ghost: 'border-transparent bg-transparent text-[var(--admin-text)] hover:bg-slate-100 hover:text-[var(--admin-heading)]',
  destructive: 'border-transparent bg-[var(--admin-error)] text-white hover:bg-red-800',
};

export function adminButtonClass(variant: AdminButtonVariant = 'secondary', className?: string) {
  return cn(
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--admin-radius-md)] border px-4 py-2 text-sm font-bold no-underline transition-colors disabled:cursor-not-allowed disabled:opacity-50',
    variants[variant],
    className,
  );
}

interface AdminButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AdminButtonVariant;
  loading?: boolean;
  children: ReactNode;
}

export function AdminButton({ variant = 'secondary', loading = false, disabled, className, children, ...props }: AdminButtonProps) {
  return (
    <button
      type="button"
      className={adminButtonClass(variant, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
