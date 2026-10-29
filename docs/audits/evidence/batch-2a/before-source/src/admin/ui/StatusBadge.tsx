import { Archive, BookmarkCheck, CalendarClock, CheckCircle2, CircleAlert, CircleDot, Eye, FileEdit, Lock, UserCheck, UserX } from 'lucide-react';
import type { AdminStatus } from '../types';
import { cn } from '../../lib/utils';

const config: Record<AdminStatus, { className: string; icon: typeof CircleDot }> = {
  Draft: { className: 'border-slate-200 bg-slate-50 text-slate-700', icon: FileEdit },
  Published: { className: 'border-emerald-200 bg-emerald-50 text-emerald-700', icon: CheckCircle2 },
  Scheduled: { className: 'border-sky-200 bg-sky-50 text-sky-700', icon: CalendarClock },
  Archived: { className: 'border-slate-200 bg-slate-100 text-slate-600', icon: Archive },
  Open: { className: 'border-emerald-200 bg-emerald-50 text-emerald-700', icon: CircleDot },
  Closed: { className: 'border-slate-200 bg-slate-100 text-slate-600', icon: Lock },
  New: { className: 'border-sky-200 bg-sky-50 text-sky-700', icon: CircleDot },
  Read: { className: 'border-violet-200 bg-violet-50 text-violet-700', icon: Eye },
  Resolved: { className: 'border-emerald-200 bg-emerald-50 text-emerald-700', icon: CheckCircle2 },
  Reviewed: { className: 'border-violet-200 bg-violet-50 text-violet-700', icon: Eye },
  Shortlisted: { className: 'border-amber-200 bg-amber-50 text-amber-800', icon: BookmarkCheck },
  Rejected: { className: 'border-rose-200 bg-rose-50 text-rose-700', icon: UserX },
  Hired: { className: 'border-emerald-200 bg-emerald-50 text-emerald-700', icon: UserCheck },
  Active: { className: 'border-emerald-200 bg-emerald-50 text-emerald-700', icon: UserCheck },
  Disabled: { className: 'border-slate-200 bg-slate-100 text-slate-600', icon: Lock },
  Completed: { className: 'border-emerald-200 bg-emerald-50 text-emerald-700', icon: CheckCircle2 },
  'Not completed': { className: 'border-amber-200 bg-amber-50 text-amber-800', icon: CircleAlert },
  'Expiring Soon': { className: 'border-amber-200 bg-amber-50 text-amber-800', icon: CircleAlert },
  Valid: { className: 'border-emerald-200 bg-emerald-50 text-emerald-700', icon: CheckCircle2 },
};

export function StatusBadge({ status }: { status: AdminStatus }) {
  const item = config[status];
  const Icon = item.icon;
  return (
    <span className={cn('inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold whitespace-nowrap', item.className)}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {status}
    </span>
  );
}
