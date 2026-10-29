import type { ReactNode } from 'react';

export interface EditorialSectionLink {
  id: string;
  label: string;
}

export function EditorialEditorLayout({ sections, children, publishing }: { sections: EditorialSectionLink[]; children: ReactNode; publishing: ReactNode }) {
  return (
    <>
      <nav aria-label="Editorial editor sections" className="flex flex-wrap gap-1 rounded-xl border border-[var(--admin-border)] bg-white/95 p-2 shadow-sm backdrop-blur-sm lg:sticky lg:top-[72px] lg:z-20">
        {sections.map((section) => <a key={section.id} href={`#${section.id}`} className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-bold text-[var(--admin-muted)] no-underline hover:bg-slate-100 hover:text-[var(--admin-heading)]">{section.label}</a>)}
      </nav>
      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
        <div className="min-w-0 space-y-6">{children}</div>
        <aside id="publishing" className="scroll-mt-36 xl:sticky xl:top-36">{publishing}</aside>
      </div>
    </>
  );
}
