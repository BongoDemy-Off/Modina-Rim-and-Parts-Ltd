import { Info, ShieldAlert } from 'lucide-react';
import type { ReactNode } from 'react';

export function GovernanceNotice({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'warning' }) {
  const Icon = tone === 'warning' ? ShieldAlert : Info;
  return (
    <div className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm leading-6 ${tone === 'warning' ? 'border-amber-200 bg-amber-50 text-amber-950' : 'border-sky-200 bg-sky-50 text-sky-950'}`}>
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${tone === 'warning' ? 'text-amber-700' : 'text-sky-700'}`} aria-hidden="true" />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
