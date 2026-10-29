import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { adminButtonClass } from '../../ui/Button';
import { SectionCard } from '../../ui/Card';
import { EmptyState } from '../../ui/FeedbackStates';
import { PageHeader } from '../../ui/PageHeader';
import { ResponsiveDataList, type DataColumn } from '../../ui/ResponsiveDataList';
import { SearchFilterBar } from '../../ui/SearchFilterBar';
import { adminContactMessages, contactMessageDemoNotice } from '../../data/contact-messages';
import type { ContactMessage, ContactMessageStatus } from '../../types/contact-messages';

function ContactStatus({ status }: { status: ContactMessageStatus }) { const tone={New:'border-sky-200 bg-sky-50 text-sky-800',Read:'border-violet-200 bg-violet-50 text-violet-800',Resolved:'border-emerald-200 bg-emerald-50 text-emerald-800'}[status]; return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${tone}`}>{status}</span>; }

export default function ContactMessagesList() {
  const [query,setQuery]=useState(''); const [status,setStatus]=useState('All');
  const rows=useMemo(()=>adminContactMessages.filter((message)=>{const haystack=`${message.name} ${message.company} ${message.email} ${message.subject} ${message.message}`.toLowerCase();return (!query||haystack.includes(query.toLowerCase()))&&(status==='All'||message.status===status);}),[query,status]);
  const columns:DataColumn<ContactMessage>[]= [
    {key:'sender',label:'Sender',width:'22%',render:(row)=><><p className="font-extrabold text-[var(--admin-heading)]">{row.name}</p><p className="break-all text-xs text-[var(--admin-muted)]">{row.email}</p></>},
    {key:'subject',label:'Subject',width:'31%',render:(row)=><p className="line-clamp-2">{row.subject}</p>},
    {key:'submitted',label:'Submitted',width:'19%',render:(row)=>row.submittedAt},
    {key:'status',label:'Status',width:'12%',render:(row)=><ContactStatus status={row.status}/>},
    {key:'actions',label:'Actions',width:'16%',render:(row)=><Link to={`/admin/contact-messages/${row.id}`} className={adminButtonClass('ghost','px-3')}>View <ArrowRight className="h-4 w-4"/></Link>},
  ];
  return <div className="space-y-6 xl:space-y-8"><PageHeader eyebrow="Communication" title="Contact Messages" description="Synthetic review records derived from the public form fields. Authentication and persistence do not exist."/><p className="rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-extrabold text-sky-950">{contactMessageDemoNotice}</p><SearchFilterBar query={query} onQueryChange={setQuery} filters={[{key:'status',label:'Status',value:status,onChange:setStatus,options:['All','New','Read','Resolved']}]} searchLabel="Search synthetic messages" searchPlaceholder="Search name, example.test email, subject, or message…"/><SectionCard title="Demo inbox" description={`${rows.length} synthetic record${rows.length===1?'':'s'} · no replies, attachments, deletion, assignment, tags, or customer profiles`}><ResponsiveDataList rows={rows} columns={columns} getPrimaryLabel={(row)=>row.subject} empty={<EmptyState title="No synthetic messages found" description="Clear filters to view the demo records."/>} renderMobile={(row)=><div className="space-y-3"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="font-extrabold text-[var(--admin-heading)]">{row.name}</p><p className="break-all text-xs text-[var(--admin-muted)]">{row.email}</p></div><ContactStatus status={row.status}/></div><p className="font-semibold">{row.subject}</p><p className="text-xs text-[var(--admin-muted)]">{row.submittedAt}</p><Link to={`/admin/contact-messages/${row.id}`} className={adminButtonClass('secondary','w-full')}>View read-only detail <ArrowRight className="h-4 w-4"/></Link></div>}/></SectionCard></div>;
}
