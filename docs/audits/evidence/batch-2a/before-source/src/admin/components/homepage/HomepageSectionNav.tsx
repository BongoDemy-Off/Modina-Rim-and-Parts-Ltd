const homepageSections = [
  ['homepage-hero', '1. Hero & trust bar'],
  ['homepage-about', '2. About & facility'],
  ['homepage-categories', '3. Product categories'],
  ['homepage-quality', '4. Quality assurance'],
  ['homepage-downloads', '5. Download center'],
  ['homepage-testimonials', '6. Testimonials'],
  ['homepage-closing-cta', '7. Pre-footer CTA'],
] as const;

export function HomepageSectionNav() {
  return (
    <nav aria-label="Homepage editor sections" className="rounded-xl border border-[var(--admin-border)] bg-white p-2 shadow-sm xl:sticky xl:top-24">
      <p className="px-3 pb-2 pt-1 text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--admin-muted)]">Fixed section order</p>
      <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1">
        {homepageSections.map(([anchor, label]) => (
          <a key={anchor} href={`#${anchor}`} className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-bold text-[var(--admin-muted)] no-underline hover:bg-slate-100 hover:text-[var(--admin-heading)]">
            {label}
          </a>
        ))}
      </div>
      <p className="px-3 pb-1 pt-2 text-xs leading-5 text-[var(--admin-muted)]">Navigation only. Sections cannot be added, removed, hidden, duplicated, or reordered.</p>
    </nav>
  );
}
