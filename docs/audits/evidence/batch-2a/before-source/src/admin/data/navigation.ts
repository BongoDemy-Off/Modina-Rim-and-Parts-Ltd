import {
  Activity,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  ContactRound,
  Download,
  FileQuestion,
  FileText,
  GalleryHorizontalEnd,
  Globe2,
  House,
  Image,
  Languages,
  LayoutDashboard,
  ListTree,
  Mail,
  Megaphone,
  MessageSquareText,
  Newspaper,
  Package,
  PanelsTopLeft,
  SearchCheck,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  UserRoundCog,
  UsersRound,
} from 'lucide-react';
import type { AdminRouteMeta, AdminSection } from '../types';

export const adminNavigation: Array<{ section: AdminSection; items: AdminRouteMeta[] }> = [
  {
    section: 'Dashboard',
    items: [
      { path: '/admin/dashboard', title: 'Dashboard', section: 'Dashboard', description: 'Operational content overview', icon: LayoutDashboard },
    ],
  },
  {
    section: 'Content',
    items: [
      { path: '/admin/homepage', title: 'Homepage', section: 'Content', description: 'Hero slides and homepage content', icon: House },
      { path: '/admin/products', title: 'Products', section: 'Content', description: 'Products, categories, and product media', icon: Package },
      { path: '/admin/blog', title: 'Blog', section: 'Content', description: 'Long-form company articles', icon: FileText },
      { path: '/admin/news', title: 'News & Events', section: 'Content', description: 'Company news and event updates', icon: Newspaper },
      { path: '/admin/gallery', title: 'Gallery', section: 'Content', description: 'Factory and company gallery content', icon: GalleryHorizontalEnd },
      { path: '/admin/downloads', title: 'Downloads', section: 'Content', description: 'Catalogues and downloadable documents', icon: Download },
    ],
  },
  {
    section: 'Company',
    items: [
      { path: '/admin/about', title: 'About & Leadership', section: 'Company', description: 'Company profile and leadership', icon: Building2 },
      { path: '/admin/mission', title: 'Mission & Vision', section: 'Company', description: 'Mission, vision, and company values', icon: Target },
      { path: '/admin/sustainability', title: 'Sustainability / CSR', section: 'Company', description: 'Sustainability and CSR content', icon: Sparkles },
      { path: '/admin/quality', title: 'Quality', section: 'Company', description: 'Quality assurance content', icon: ShieldCheck },
      { path: '/admin/certificates', title: 'Certificates', section: 'Company', description: 'Certification records and media', icon: BadgeCheck },
      { path: '/admin/careers', title: 'Careers', section: 'Company', description: 'Job openings and careers content', icon: BriefcaseBusiness },
      { path: '/admin/faq', title: 'FAQ', section: 'Company', description: 'Frequently asked questions', icon: FileQuestion },
    ],
  },
  {
    section: 'Communication',
    items: [
      { path: '/admin/contact-messages', title: 'Contact Messages', section: 'Communication', description: 'Website contact enquiries', icon: MessageSquareText },
      { path: '/admin/job-applications', title: 'Job Applications', section: 'Communication', description: 'Applications for open positions', icon: ContactRound },
      { path: '/admin/newsletter', title: 'Newsletter', section: 'Communication', description: 'Deferred until backend and email integration', icon: Mail },
      { path: '/admin/testimonials', title: 'Testimonials', section: 'Communication', description: 'Customer and partner testimonials', icon: Megaphone },
    ],
  },
  {
    section: 'Website',
    items: [
      { path: '/admin/navigation', title: 'Navigation', section: 'Website', description: 'Public website navigation structure', icon: ListTree },
      { path: '/admin/footer', title: 'Footer', section: 'Website', description: 'Footer links and company information', icon: PanelsTopLeft },
      { path: '/admin/contact', title: 'Contact Page', section: 'Website', description: 'Public Contact page content and form copy', icon: ContactRound },
      { path: '/admin/seo', title: 'SEO', section: 'Website', description: 'Search metadata and indexing controls', icon: SearchCheck },
      { path: '/admin/media', title: 'Media Library', section: 'Website', description: 'Deferred until storage and backend integration', icon: Image },
      { path: '/admin/languages', title: 'Languages', section: 'Website', description: 'English and Bengali content coverage', icon: Languages },
      { path: '/admin/site-settings', title: 'Site Settings', section: 'Website', description: 'Structured global website settings', icon: Settings },
    ],
  },
  {
    section: 'System',
    items: [
      { path: '/admin/users', title: 'Admin Users', section: 'System', description: 'Future administrator access management', icon: UsersRound },
      { path: '/admin/roles', title: 'Roles & Permissions', section: 'System', description: 'Future role and permission policies', icon: UserRoundCog },
      { path: '/admin/activity-log', title: 'Activity Log', section: 'System', description: 'Future administrative activity history', icon: Activity },
    ],
  },
];

export const adminRouteMeta = adminNavigation.flatMap((group) => group.items);

export const dashboardMeta = adminRouteMeta[0];

export const foundationMeta: AdminRouteMeta = {
  path: '/admin/foundation',
  title: 'UI Foundation — Internal QA',
  section: 'System',
  description: 'Local-only review of reusable Admin interface patterns',
  icon: Globe2,
};

export const adminNotFoundMeta: AdminRouteMeta = {
  path: '/admin/not-found',
  title: 'Admin Page Not Found',
  section: 'System',
  description: 'The requested Admin route does not exist.',
  icon: FileQuestion,
};

export function getAdminRouteMeta(pathname: string): AdminRouteMeta {
  if (pathname === '/admin' || pathname === '/admin/') return dashboardMeta;
  if (pathname === foundationMeta.path) return foundationMeta;
  return adminRouteMeta.find((item) => pathname === item.path || pathname.startsWith(`${item.path}/`)) ?? adminNotFoundMeta;
}
