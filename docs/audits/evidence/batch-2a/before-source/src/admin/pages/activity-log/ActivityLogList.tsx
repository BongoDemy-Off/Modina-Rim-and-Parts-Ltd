import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GovernanceNotice } from '../../components/governance/GovernanceNotice';
import { demoActivityEntries } from '../../data/activity-log';
import { demoAdminUsers } from '../../data/admin-users';
import type { DemoActivityEntry } from '../../types/governance';
import { adminButtonClass } from '../../ui/Button';
import { SectionCard } from '../../ui/Card';
import { EmptyState } from '../../ui/FeedbackStates';
import { PageHeader } from '../../ui/PageHeader';
import { ResponsiveDataList, type DataColumn } from '../../ui/ResponsiveDataList';
import { SearchFilterBar } from '../../ui/SearchFilterBar';
import { StatusBadge } from '../../ui/StatusBadge';

const actorName = (actorUserId: string) => demoAdminUsers.find((user) => user.id === actorUserId)?.displayName ?? 'Missing Demo User';
const moduleOptions = Array.from(new Map(demoActivityEntries.map((entry) => [entry.moduleId, entry.moduleLabel])).entries()).map(([value, label]) => ({ value, label }));
const actionOptions = Array.from(new Set(demoActivityEntries.map((entry) => entry.actionType)));

export default function ActivityLogList() {
  const [query, setQuery] = useState('');
  const [actor, setActor] = useState('All');
  const [module, setModule] = useState('All');
  const [action, setAction] = useState('All');
  const rows = useMemo(() => demoActivityEntries.filter((entry) => {
    const search = query.trim().toLowerCase();
    return (!search || `${actorName(entry.actorUserId)} ${entry.actionType} ${entry.moduleLabel} ${entry.targetLabel} ${entry.targetReference} ${entry.summary}`.toLowerCase().includes(search))
      && (actor === 'All' || entry.actorUserId === actor)
      && (module === 'All' || entry.moduleId === module)
      && (action === 'All' || entry.actionType === action);
  }), [action, actor, module, query]);

  const columns: DataColumn<DemoActivityEntry>[] = [
    { key: 'time', label: 'Demo time', width: '18%', render: (entry) => <time className="text-xs leading-5">{entry.occurredAt}</time> },
    { key: 'actor', label: 'Demo Admin', width: '15%', render: (entry) => <p className="font-extrabold text-[var(--admin-heading)]">{actorName(entry.actorUserId)}</p> },
    { key: 'action', label: 'Action', width: '13%', render: (entry) => entry.actionType },
    { key: 'module', label: 'Module', width: '13%', render: (entry) => entry.moduleLabel },
    { key: 'target', label: 'Target', width: '22%', render: (entry) => <div><p className="font-semibold text-[var(--admin-heading)]">{entry.targetLabel}</p><p className="mt-1 break-all text-xs text-[var(--admin-muted)]">{entry.targetReference}</p></div> },
    { key: 'result', label: 'Result', width: '11%', render: (entry) => <StatusBadge status={entry.result} /> },
    { key: 'view', label: 'View', width: '8%', render: (entry) => <Link to={`/admin/activity-log/${entry.id}`} className={adminButtonClass('secondary', 'px-3')} aria-label={`View synthetic activity ${entry.id}`}><ArrowRight className="h-4 w-4" aria-hidden="true" /></Link> },
  ];

  return (
    <div className="space-y-6 xl:space-y-8">
      <PageHeader eyebrow="System · Activity Log UI prototype" title="Activity Log" description="Fixed synthetic history for reviewing future audit-information UX. No runtime Admin action creates an entry." />
      <GovernanceNotice tone="warning"><strong>Demo activity data — no real audit records are being stored.</strong> Every actor, action, result, and timestamp below is invented solely for interface demonstration.</GovernanceNotice>
      <SearchFilterBar query={query} onQueryChange={setQuery} searchLabel="Search synthetic activity" searchPlaceholder="Search demo actor, module, target, reference, or summary…" filters={[
        { key: 'actor', label: 'Demo Admin User', value: actor, onChange: setActor, options: [{ label: 'All Demo Users', value: 'All' }, ...demoAdminUsers.map((user) => ({ label: user.displayName, value: user.id }))] },
        { key: 'module', label: 'Module', value: module, onChange: setModule, options: [{ label: 'All modules', value: 'All' }, ...moduleOptions] },
        { key: 'action', label: 'Action Type', value: action, onChange: setAction, options: ['All', ...actionOptions] },
      ]} />
      <SectionCard title="Synthetic activity entries" description={`${rows.length} of ${demoActivityEntries.length} fixed demo entries shown · read-only`}>
        <ResponsiveDataList rows={rows} columns={columns} getPrimaryLabel={(entry) => `${entry.actionType}: ${entry.targetLabel}`} empty={<EmptyState title="No matching synthetic activity" description="Clear or change the local filters." />} renderMobile={(entry) => <div className="space-y-4"><div className="flex min-w-0 items-start justify-between gap-3"><div className="min-w-0"><h3 className="break-words font-extrabold text-[var(--admin-heading)]">{entry.actionType}</h3><p className="mt-1 break-words text-sm text-[var(--admin-muted)]">{actorName(entry.actorUserId)} · {entry.moduleLabel}</p></div><StatusBadge status={entry.result} /></div><dl className="grid gap-3 text-sm"><div><dt className="text-xs font-extrabold uppercase text-[var(--admin-muted)]">Demo timestamp</dt><dd className="mt-1 break-words">{entry.occurredAt}</dd></div><div><dt className="text-xs font-extrabold uppercase text-[var(--admin-muted)]">Target</dt><dd className="mt-1 break-words">{entry.targetLabel}<span className="block break-all text-xs text-[var(--admin-muted)]">{entry.targetReference}</span></dd></div></dl><Link to={`/admin/activity-log/${entry.id}`} className={adminButtonClass('secondary', 'w-full')}>View Synthetic Entry <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>} />
      </SectionCard>
    </div>
  );
}
