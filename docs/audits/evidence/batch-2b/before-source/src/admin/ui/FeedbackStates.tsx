import type { ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, Inbox, Info, LoaderCircle, X } from 'lucide-react';
import { AdminButton } from './Button';

export function EmptyState({ title, description, action, headingLevel = 3 }: { title: string; description: string; action?: ReactNode; headingLevel?: 1 | 2 | 3 }) {
  const Heading = `h${headingLevel}` as 'h1' | 'h2' | 'h3';
  return (
    <div className="flex flex-col items-center px-5 py-10 text-center">
      <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-600"><Inbox className="h-5 w-5" aria-hidden="true" /></span>
      <Heading className={headingLevel === 1 ? 'text-2xl font-extrabold text-[var(--admin-heading)]' : 'font-extrabold text-[var(--admin-heading)]'}>{title}</Heading>
      <p className="mt-1 max-w-md text-sm text-[var(--admin-muted)]">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function LoadingState({ label = 'Loading preview…' }: { label?: string }) {
  return (
    <div role="status" className="flex items-center gap-3 rounded-lg border border-[var(--admin-border)] bg-slate-50 p-4 text-sm font-semibold text-[var(--admin-muted)]">
      <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> {label}
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-700" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <h3 className="font-extrabold text-red-900">Content could not be loaded</h3>
          <p className="mt-1 text-sm text-red-800">This is a recoverable visual pattern. No request was sent in this UI preview.</p>
          {onRetry && <AdminButton variant="secondary" className="mt-3" onClick={onRetry}>Try again</AdminButton>}
        </div>
      </div>
    </div>
  );
}

const toastTones = {
  success: { shell: 'border-emerald-200 bg-emerald-50', icon: 'text-emerald-700', heading: 'text-emerald-900', text: 'text-emerald-800', close: 'text-emerald-800 hover:bg-emerald-100', Icon: CheckCircle2 },
  warning: { shell: 'border-amber-200 bg-amber-50', icon: 'text-amber-700', heading: 'text-amber-950', text: 'text-amber-900', close: 'text-amber-800 hover:bg-amber-100', Icon: AlertTriangle },
  info: { shell: 'border-sky-200 bg-sky-50', icon: 'text-sky-700', heading: 'text-sky-950', text: 'text-sky-900', close: 'text-sky-800 hover:bg-sky-100', Icon: Info },
};

export function DemoToast({ onClose, title = 'Local UI feedback example', description = 'Nothing was saved or sent to a backend.', tone = 'success' }: { onClose: () => void; title?: string; description?: string; tone?: keyof typeof toastTones }) {
  const config = toastTones[tone];
  const Icon = config.Icon;
  return (
    <div role="status" aria-live="polite" className={`flex items-start gap-3 rounded-lg border p-4 shadow-sm ${config.shell}`}>
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${config.icon}`} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className={`font-extrabold ${config.heading}`}>{title}</p>
        <p className={`mt-0.5 text-sm ${config.text}`}>{description}</p>
      </div>
      <button type="button" aria-label="Dismiss notification" onClick={onClose} className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${config.close}`}>
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
