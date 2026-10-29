import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShieldAlert, X } from 'lucide-react';
import logoImage from '../../assets/logo.png';
import { cn } from '../../lib/utils';
import { adminNavigation } from '../data/navigation';

interface AdminSidebarProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
}

const focusableSelector = 'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

function SidebarContent({ collapsed, mobile, onClose, onCollapsedChange }: { collapsed: boolean; mobile: boolean; onClose: () => void; onCollapsedChange: (value: boolean) => void }) {
  const location = useLocation();
  const isRouteActive = (itemPath: string) => {
    if (itemPath === '/admin/dashboard') return location.pathname === '/admin' || location.pathname === '/admin/' || location.pathname === itemPath;
    return location.pathname === itemPath || location.pathname.startsWith(`${itemPath}/`);
  };
  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className={cn('flex h-[72px] shrink-0 items-center border-b border-[var(--admin-border)] px-4', collapsed && !mobile ? 'justify-center' : 'justify-between gap-3')}>
        <Link to="/admin/dashboard" onClick={onClose} className={cn('flex min-w-0 items-center gap-3 no-underline', collapsed && !mobile && 'justify-center')} aria-label="Modina Admin dashboard">
          <img src={logoImage} alt="" className="h-9 w-9 shrink-0 object-contain" />
          {(!collapsed || mobile) && (
            <span className="min-w-0">
              <span className="block truncate text-sm font-extrabold tracking-[-0.02em] text-[var(--admin-heading)]">Modina Admin</span>
              <span className="block truncate text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--admin-muted)]">Frontend Demo</span>
            </span>
          )}
        </Link>
        {mobile && (
          <button type="button" onClick={onClose} aria-label="Close Admin navigation" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[var(--admin-muted)] hover:bg-slate-100 hover:text-[var(--admin-heading)]">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>

      <nav aria-label="Admin navigation" className="admin-sidebar-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
        {adminNavigation.map((group, groupIndex) => (
          <div key={group.section} className={cn(groupIndex > 0 && 'mt-5')}>
            {(!collapsed || mobile) ? (
              <p className="mb-1.5 px-3 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[var(--admin-subtle)]">{group.section}</p>
            ) : (
              groupIndex > 0 && <div className="mx-3 mb-2 border-t border-[var(--admin-border)]" aria-hidden="true" />
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isRouteActive(item.path);
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={onClose}
                      aria-label={collapsed && !mobile ? item.title : undefined}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'group relative flex min-h-11 items-center rounded-lg border text-sm font-bold no-underline transition-colors',
                        collapsed && !mobile ? 'justify-center px-2' : 'gap-3 px-3',
                        active
                          ? 'border-rose-100 bg-[var(--admin-accent-soft)] text-[var(--admin-accent-dark)]'
                          : 'border-transparent text-[var(--admin-muted)] hover:bg-slate-100 hover:text-[var(--admin-heading)]',
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                      {(!collapsed || mobile) && <span className="min-w-0 break-words">{item.title}</span>}
                      {collapsed && !mobile && <span role="tooltip" className="admin-tooltip">{item.title}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-[var(--admin-border)] p-3">
        <div className={cn('rounded-lg bg-slate-50', collapsed && !mobile ? 'p-2' : 'p-3')}>
          <div className={cn('flex items-center', collapsed && !mobile ? 'justify-center' : 'gap-3')}>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-700"><ShieldAlert className="h-4 w-4" aria-hidden="true" /></span>
            {(!collapsed || mobile) && (
              <span className="min-w-0">
                <span className="block truncate text-xs font-extrabold text-[var(--admin-heading)]">Frontend demo</span>
                <span className="block truncate text-[10px] font-semibold text-[var(--admin-muted)]">Authentication is not connected.</span>
              </span>
            )}
          </div>
        </div>
        {!mobile && (
          <button
            type="button"
            onClick={() => onCollapsedChange(!collapsed)}
            aria-label={collapsed ? 'Expand Admin sidebar' : 'Collapse Admin sidebar'}
            className={cn('mt-2 flex min-h-11 w-full items-center rounded-lg text-xs font-bold text-[var(--admin-muted)] hover:bg-slate-100 hover:text-[var(--admin-heading)]', collapsed ? 'justify-center' : 'justify-center gap-2')}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" aria-hidden="true" /> : <><ChevronLeft className="h-4 w-4" aria-hidden="true" /> Collapse sidebar</>}
          </button>
        )}
      </div>
    </div>
  );
}

export function AdminSidebar({ collapsed, onCollapsedChange, mobileOpen, onMobileOpenChange }: AdminSidebarProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    returnFocusRef.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    drawerRef.current?.querySelector<HTMLElement>('button, a[href]')?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onMobileOpenChange(false);
        return;
      }
      if (event.key !== 'Tab' || !drawerRef.current) return;
      const focusable = Array.from(drawerRef.current.querySelectorAll<HTMLElement>(focusableSelector));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [mobileOpen, onMobileOpenChange]);

  return (
    <>
      <aside className={cn('fixed inset-y-0 left-0 z-40 hidden border-r border-[var(--admin-border)] bg-white transition-[width] duration-200 lg:block', collapsed ? 'w-20' : 'w-[272px]')}>
        <SidebarContent collapsed={collapsed} mobile={false} onClose={() => undefined} onCollapsedChange={onCollapsedChange} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden" aria-hidden={false}>
          <button type="button" className="absolute inset-0 h-full w-full cursor-default bg-slate-950/45" onClick={() => onMobileOpenChange(false)} aria-label="Close Admin navigation backdrop" />
          <aside ref={drawerRef} role="dialog" aria-modal="true" aria-label="Admin navigation drawer" className="absolute inset-y-0 left-0 w-[min(88vw,320px)] border-r border-[var(--admin-border)] bg-white shadow-2xl">
            <SidebarContent collapsed={false} mobile onClose={() => onMobileOpenChange(false)} onCollapsedChange={onCollapsedChange} />
          </aside>
        </div>
      )}
    </>
  );
}
