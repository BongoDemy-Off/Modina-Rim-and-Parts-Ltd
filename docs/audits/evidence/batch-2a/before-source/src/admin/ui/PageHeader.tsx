import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  actionsLayout?: 'standard' | 'stack-until-xl';
}

export function PageHeader({ eyebrow, title, description, actions, actionsLayout = 'standard' }: PageHeaderProps) {
  return (
    <header className={cn('flex flex-col gap-4', actionsLayout === 'standard' ? 'sm:flex-row sm:items-start sm:justify-between' : 'xl:flex-row xl:items-start xl:justify-between')}>
      <div className="min-w-0 max-w-3xl">
        {eyebrow && <p className="mb-1 text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--admin-accent)]">{eyebrow}</p>}
        <h1 className="text-2xl font-extrabold tracking-[-0.03em] text-[var(--admin-heading)] sm:text-3xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--admin-muted)] sm:text-[15px]">{description}</p>
      </div>
      {actions && <div className={cn('flex shrink-0 flex-wrap gap-2', actionsLayout === 'stack-until-xl' && 'w-full xl:w-auto')}>{actions}</div>}
    </header>
  );
}
