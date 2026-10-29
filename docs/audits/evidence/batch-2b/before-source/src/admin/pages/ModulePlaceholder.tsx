import { Link } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';
import type { AdminRouteMeta } from '../types';
import { adminButtonClass } from '../ui/Button';
import { AdminCard } from '../ui/Card';
import { PageHeader } from '../ui/PageHeader';

export default function ModulePlaceholder({ meta }: { meta: AdminRouteMeta }) {
  const Icon = meta.icon;
  const isNewsletter = meta.path === '/admin/newsletter';
  const title = isNewsletter ? 'Newsletter operations are deferred' : 'Media Library is deferred';
  const summary = isNewsletter
    ? 'Newsletter operations are deferred until backend/email integration.'
    : 'Media Library is deferred until storage/backend integration.';
  const limitations = isNewsletter
    ? ['No subscriber records', 'No campaigns', 'No persistence', 'No email sending']
    : ['No centralized storage exists', 'Uploads are not persisted', 'Production media is not managed here'];
  return (
    <div className="space-y-6">
      <PageHeader eyebrow={meta.section} title={meta.title} description={meta.description} />
      <div className="flex items-start gap-3 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sky-950">
        <Construction className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" />
        <div><p className="text-sm font-extrabold">Deferred</p><p className="mt-0.5 text-xs leading-5 text-sky-800">{summary}</p></div>
      </div>
      <AdminCard className="flex min-h-[360px] flex-col items-center justify-center p-6 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><Icon className="h-7 w-7" aria-hidden="true" /></span>
        <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--admin-accent)]">Deferred frontend screen</p>
        <h2 className="mt-2 text-xl font-extrabold text-[var(--admin-heading)]">{title}</h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--admin-muted)]">{summary}</p>
        <ul className="mt-4 space-y-1 text-left text-sm leading-6 text-[var(--admin-muted)]">{limitations.map((item) => <li key={item}>• {item}</li>)}</ul>
        <Link to="/admin/dashboard" className={adminButtonClass('secondary', 'mt-5')}><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Return to Dashboard</Link>
      </AdminCard>
    </div>
  );
}
