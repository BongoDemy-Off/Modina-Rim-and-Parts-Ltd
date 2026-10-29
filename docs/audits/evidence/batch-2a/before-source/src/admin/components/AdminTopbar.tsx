import { ExternalLink, Menu, ShieldAlert } from 'lucide-react';
import type { AdminRouteMeta } from '../types';

export function AdminTopbar({ meta, onOpenSidebar }: { meta: AdminRouteMeta; onOpenSidebar: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex min-h-[72px] items-center justify-between gap-3 border-b border-[var(--admin-border)] bg-white/95 px-3 backdrop-blur-sm sm:px-5 lg:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button type="button" onClick={onOpenSidebar} aria-label="Open Admin navigation" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[var(--admin-heading)] hover:bg-slate-100 lg:hidden">
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="min-w-0">
          <p className="truncate text-[11px] font-extrabold uppercase tracking-[0.09em] text-[var(--admin-muted)]">{meta.section} <span aria-hidden="true">/</span></p>
          <p className="truncate text-sm font-extrabold text-[var(--admin-heading)] sm:text-base">{meta.title}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <a href="/" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[var(--admin-border-strong)] bg-white px-3 text-sm font-bold text-[var(--admin-heading)] no-underline hover:bg-slate-50 sm:px-4">
          <span className="hidden sm:inline">View Website</span><ExternalLink className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only sm:hidden">View Website</span>
        </a>
        <div role="note" className="flex min-h-11 items-center gap-2 rounded-lg bg-slate-100 px-2 text-slate-700 sm:px-3">
          <ShieldAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="text-[10px] font-extrabold uppercase tracking-[0.08em] sm:hidden">Demo</span>
          <span className="hidden lg:block"><span className="block text-xs font-extrabold text-[var(--admin-heading)]">Frontend Demo</span><span className="block text-[10px] font-semibold text-[var(--admin-muted)]">Authentication is not connected.</span></span>
        </div>
      </div>
    </header>
  );
}
