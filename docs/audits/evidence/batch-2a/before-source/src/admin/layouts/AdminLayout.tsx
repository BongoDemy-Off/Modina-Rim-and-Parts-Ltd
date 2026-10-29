import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminTopbar } from '../components/AdminTopbar';
import { getAdminRouteMeta } from '../data/navigation';

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const meta = getAdminRouteMeta(pathname);

  return (
    <div className="admin-root">
      <AdminSidebar collapsed={collapsed} onCollapsedChange={setCollapsed} mobileOpen={mobileOpen} onMobileOpenChange={setMobileOpen} />
      <div className={cn('min-h-dvh min-w-0 transition-[padding] duration-200 lg:pl-[272px]', collapsed && 'lg:pl-20')}>
        <AdminTopbar meta={meta} onOpenSidebar={() => setMobileOpen(true)} />
        <main className="min-w-0 px-3 py-5 sm:px-5 sm:py-6 lg:px-6 xl:px-8 xl:py-8">
          <div className="mx-auto min-w-0 max-w-[1480px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
