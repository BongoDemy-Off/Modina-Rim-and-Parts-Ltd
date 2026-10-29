import { Link } from 'react-router-dom';
import { ArrowLeft, FileQuestion } from 'lucide-react';
import { adminButtonClass } from '../ui/Button';
import { AdminCard } from '../ui/Card';
import { PageHeader } from '../ui/PageHeader';

export default function AdminNotFound() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Admin" title="Admin Page Not Found" description="The requested Admin route does not exist." />
      <AdminCard className="flex min-h-[360px] flex-col items-center justify-center p-6 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><FileQuestion className="h-7 w-7" aria-hidden="true" /></span>
        <h2 className="mt-5 text-xl font-extrabold text-[var(--admin-heading)]">Return to a known Admin page</h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--admin-muted)]">Use the Dashboard to continue reviewing the frontend demo.</p>
        <Link to="/admin/dashboard" className={adminButtonClass('secondary', 'mt-5')}><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Dashboard</Link>
      </AdminCard>
    </div>
  );
}
