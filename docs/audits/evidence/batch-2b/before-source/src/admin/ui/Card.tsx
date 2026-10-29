import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={cn('admin-card min-w-0', className)}>{children}</section>;
}

interface SectionCardProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function SectionCard({ title, description, action, children, className }: SectionCardProps) {
  return (
    <AdminCard className={className}>
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--admin-border)] px-4 py-4 sm:px-5">
        <div className="min-w-0">
          <h2 className="text-base font-extrabold tracking-[-0.01em] text-[var(--admin-heading)]">{title}</h2>
          {description && <p className="mt-1 text-sm text-[var(--admin-muted)]">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </AdminCard>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
  tone: 'red' | 'blue' | 'amber' | 'green';
}

const metricTones = {
  red: 'bg-rose-50 text-rose-700',
  blue: 'bg-sky-50 text-sky-700',
  amber: 'bg-amber-50 text-amber-700',
  green: 'bg-emerald-50 text-emerald-700',
};

export function MetricCard({ label, value, note, icon: Icon, tone }: MetricCardProps) {
  return (
    <AdminCard className="p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--admin-muted)]">{label}</p>
          <p className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-[var(--admin-heading)]">{value}</p>
        </div>
        <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', metricTones[tone])}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-xs font-medium text-[var(--admin-muted)]">{note}</p>
    </AdminCard>
  );
}
