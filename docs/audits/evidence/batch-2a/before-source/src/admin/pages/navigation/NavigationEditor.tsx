import { useState } from 'react';
import { AdminDialog } from '../../ui/Dialog';
import { DemoToast } from '../../ui/FeedbackStates';
import { AdminInput, AdminSelect } from '../../ui/FormControls';
import { LanguageTabs, type AdminLanguage } from '../../ui/MultilingualFields';
import { PageHeader } from '../../ui/PageHeader';
import { ReorderControls } from '../../ui/ReorderControls';
import { SectionCard } from '../../ui/Card';
import { ConfigurationActions, ReviewNotice } from '../../components/configuration/ConfigurationActions';
import { navigationSettings, navigationTargets } from '../../data/navigation-settings';
import type { NavigationSettings, NavigationTarget } from '../../types/navigation-settings';

const clone = () => structuredClone(navigationSettings);

export default function NavigationEditor() {
  const [settings, setSettings] = useState<NavigationSettings>(clone);
  const [language, setLanguage] = useState<AdminLanguage>('en');
  const [dirty, setDirty] = useState(false);
  const [preview, setPreview] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const change = (next: NavigationSettings) => { setSettings(next); setDirty(true); };
  const updateItem = (id: string, updater: (item: NavigationSettings['items'][number]) => NavigationSettings['items'][number]) => change({ ...settings, items: settings.items.map((item) => item.id === id ? updater(item) : item) });
  const moveChild = (groupId: string, childId: string, delta: number) => updateItem(groupId, (group) => {
    const children = [...group.children].sort((a, b) => a.order - b.order);
    const from = children.findIndex((child) => child.id === childId); const to = from + delta;
    if (from < 0 || to < 0 || to >= children.length) return group;
    [children[from], children[to]] = [children[to], children[from]];
    return { ...group, children: children.map((child, index) => ({ ...child, order: index + 1 })) };
  });
  const publish = () => {
    const missing = settings.items.some((item) => !item.label.en.trim() || !item.label.bn.trim() || item.children.some((child) => !child.label.en.trim() || !child.label.bn.trim()));
    setToast(missing ? 'Publish Demo blocked: current navigation labels require both English and বাংলা.' : 'Navigation Publish Demo completed locally. No public Navbar changed.');
    if (!missing) setDirty(false);
  };

  return <div className="space-y-6 xl:space-y-8">
    <PageHeader eyebrow="Website" title="Navigation" description="Edit labels, controlled destinations, and order inside the fixed source hierarchy. This is not a menu builder." />
    {toast && <DemoToast onClose={() => setToast(null)} title={toast.startsWith('Publish Demo blocked') ? 'Validation required' : 'Demo action complete'} description={toast} tone={toast.startsWith('Publish Demo blocked') ? 'warning' : 'success'} />}
    <ReviewNotice>Source review required: Navbar phone number differs between header variants. Desktop/compact: {settings.phoneSources.desktopAndCompact}; mobile drawer: {settings.phoneSources.mobileDrawer}. Neither value is authoritative here.</ReviewNotice>
    <SectionCard title="Fixed navigation architecture" description="Top-level roles, dropdown membership, nesting depth, and special controls cannot be changed.">
      <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
        {settings.fixedControls.map((control) => <div key={control} className="rounded-lg border border-[var(--admin-border)] bg-slate-50 p-3"><p className="text-sm font-extrabold capitalize text-[var(--admin-heading)]">{control.replaceAll('-', ' ')}</p><p className="mt-1 text-xs text-[var(--admin-muted)]">Fixed structural control · not reorderable</p></div>)}
      </div>
    </SectionCard>
    <LanguageTabs language={language} onLanguageChange={setLanguage} completion={{ en: { complete: true, label: 'Source labels present' }, bn: { complete: true, label: 'Source labels present' } }} ariaLabel="Navigation label language">
      <div className="space-y-5">
        {[...settings.items].sort((a, b) => a.order - b.order).map((item) => <SectionCard key={item.id} title={`${item.order}. ${item.label.en}`} description={item.kind === 'group' ? `Fixed dropdown · ${item.children.length} fixed members` : 'Fixed top-level link'}>
          <div className="space-y-4 p-4 sm:p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminInput label={language === 'en' ? 'English label' : 'বাংলা লেবেল'} className={language === 'bn' ? 'admin-bn-text' : undefined} value={item.label[language]} onChange={(event) => updateItem(item.id, (current) => ({ ...current, label: { ...current.label, [language]: event.target.value } }))} />
              {item.kind === 'link' ? <AdminSelect label="Controlled internal destination" value={item.target} onChange={(event) => updateItem(item.id, (current) => ({ ...current, target: event.target.value as NavigationTarget }))}>{navigationTargets.map((target) => <option key={target}>{target}</option>)}</AdminSelect> : <AdminInput label="Structural role" value="Fixed dropdown group" readOnly helpText="Cannot become a link, move group, or accept arbitrary nesting." />}
            </div>
            {item.kind === 'group' && <div className="space-y-3 border-t border-[var(--admin-border)] pt-4">{[...item.children].sort((a, b) => a.order - b.order).map((child, index, children) => <div key={child.id} className="grid gap-3 rounded-lg border border-[var(--admin-border)] p-3 lg:grid-cols-[minmax(0,1fr)_minmax(220px,.65fr)_auto] lg:items-end">
              <AdminInput label={language === 'en' ? 'Child label — English' : 'চাইল্ড লেবেল — বাংলা'} className={language === 'bn' ? 'admin-bn-text' : undefined} value={child.label[language]} onChange={(event) => updateItem(item.id, (current) => ({ ...current, children: current.children.map((entry) => entry.id === child.id ? { ...entry, label: { ...entry.label, [language]: event.target.value } } : entry) }))} />
              <AdminSelect label="Controlled destination" value={child.target} onChange={(event) => updateItem(item.id, (current) => ({ ...current, children: current.children.map((entry) => entry.id === child.id ? { ...entry, target: event.target.value as NavigationTarget } : entry) }))}>{navigationTargets.map((target) => <option key={target}>{target}</option>)}</AdminSelect>
              <ReorderControls position={index + 1} total={children.length} itemLabel={child.label.en} onMoveEarlier={() => moveChild(item.id, child.id, -1)} onMoveLater={() => moveChild(item.id, child.id, 1)} />
            </div>)}</div>}
          </div>
        </SectionCard>)}
        <SectionCard title="Contact CTA — special structural item" description="The Contact CTA remains outside normal navigation ordering and cannot move into a dropdown.">
          <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5"><AdminInput label={language === 'en' ? 'CTA label — English' : 'CTA label — বাংলা'} className={language === 'bn' ? 'admin-bn-text' : undefined} value={settings.contactCta.label[language]} onChange={(event) => change({ ...settings, contactCta: { ...settings.contactCta, label: { ...settings.contactCta.label, [language]: event.target.value } } })} /><AdminInput label="Fixed destination" value="/contact" readOnly helpText="Special Contact CTA role is fixed." /></div>
        </SectionCard>
      </div>
    </LanguageTabs>
    <ConfigurationActions dirty={dirty} onSave={() => { setDirty(false); setToast('Navigation draft retained in local component state only.'); }} onPreview={() => setPreview(true)} onPublish={publish} />
    <AdminDialog open={preview} title="Admin Preview — Demo Only" description="Compact representation of the fixed Navbar tree. No public navigation is updated." tone="info" confirmLabel={null} cancelLabel="Close Preview" onClose={() => setPreview(false)}><ol className="space-y-3">{[...settings.items].sort((a, b) => a.order - b.order).map((item) => <li key={item.id}><strong>{item.label[language]}</strong>{item.children.length > 0 && <ul className="ml-5 mt-1 list-disc">{[...item.children].sort((a, b) => a.order - b.order).map((child) => <li key={child.id}>{child.label[language]} — {child.target}</li>)}</ul>}</li>)}<li><strong>{settings.contactCta.label[language]}</strong> — special Contact CTA</li></ol></AdminDialog>
  </div>;
}
