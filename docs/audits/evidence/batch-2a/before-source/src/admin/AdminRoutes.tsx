import { Route, Routes } from 'react-router-dom';
import './admin.css';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import FoundationPreview from './pages/FoundationPreview';
import ModulePlaceholder from './pages/ModulePlaceholder';
import AdminNotFound from './pages/AdminNotFound';
import ProductEditor from './pages/products/ProductEditor';
import ProductList from './pages/products/ProductList';
import BlogEditor from './pages/blog/BlogEditor';
import BlogList from './pages/blog/BlogList';
import NewsEditor from './pages/news/NewsEditor';
import NewsList from './pages/news/NewsList';
import GalleryEditor from './pages/gallery/GalleryEditor';
import GalleryList from './pages/gallery/GalleryList';
import DownloadEditor from './pages/downloads/DownloadEditor';
import DownloadsList from './pages/downloads/DownloadsList';
import FaqEditor from './pages/faq/FaqEditor';
import FaqList from './pages/faq/FaqList';
import CareersList from './pages/careers/CareersList';
import CareerEditor from './pages/careers/CareerEditor';
import ApplicationsList from './pages/applications/ApplicationsList';
import ApplicationDetail from './pages/applications/ApplicationDetail';
import HomepageEditor from './pages/homepage/HomepageEditor';
import TestimonialsList from './pages/testimonials/TestimonialsList';
import TestimonialEditor from './pages/testimonials/TestimonialEditor';
import AboutEditor from './pages/about/AboutEditor';
import MissionEditor from './pages/mission/MissionEditor';
import SustainabilityEditor from './pages/sustainability/SustainabilityEditor';
import QualityEditor from './pages/quality/QualityEditor';
import CertificatesList from './pages/certificates/CertificatesList';
import CertificateEditor from './pages/certificates/CertificateEditor';
import NavigationEditor from './pages/navigation/NavigationEditor';
import FooterEditor from './pages/footer/FooterEditor';
import ContactEditor from './pages/contact/ContactEditor';
import ContactMessagesList from './pages/contact-messages/ContactMessagesList';
import ContactMessageDetail from './pages/contact-messages/ContactMessageDetail';
import SeoEditor from './pages/seo/SeoEditor';
import LanguagesEditor from './pages/languages/LanguagesEditor';
import SiteSettingsEditor from './pages/site-settings/SiteSettingsEditor';
import UsersList from './pages/users/UsersList';
import UserEditor from './pages/users/UserEditor';
import RolesList from './pages/roles/RolesList';
import RoleEditor from './pages/roles/RoleEditor';
import ActivityLogList from './pages/activity-log/ActivityLogList';
import ActivityLogDetail from './pages/activity-log/ActivityLogDetail';
import { adminRouteMeta } from './data/navigation';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="foundation" element={<FoundationPreview />} />
        <Route path="homepage" element={<HomepageEditor />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/new" element={<ProductEditor mode="create" />} />
        <Route path="products/:id" element={<ProductEditor mode="edit" />} />
        <Route path="blog" element={<BlogList />} />
        <Route path="blog/new" element={<BlogEditor mode="create" />} />
        <Route path="blog/:id" element={<BlogEditor mode="edit" />} />
        <Route path="news" element={<NewsList />} />
        <Route path="news/new" element={<NewsEditor mode="create" />} />
        <Route path="news/:id" element={<NewsEditor mode="edit" />} />
        <Route path="gallery" element={<GalleryList />} />
        <Route path="gallery/new" element={<GalleryEditor mode="create" />} />
        <Route path="gallery/:id" element={<GalleryEditor mode="edit" />} />
        <Route path="downloads" element={<DownloadsList />} />
        <Route path="downloads/new" element={<DownloadEditor mode="create" />} />
        <Route path="downloads/:id" element={<DownloadEditor mode="edit" />} />
        <Route path="faq" element={<FaqList />} />
        <Route path="faq/new" element={<FaqEditor mode="create" />} />
        <Route path="faq/:id" element={<FaqEditor mode="edit" />} />
        <Route path="careers" element={<CareersList />} />
        <Route path="careers/new" element={<CareerEditor mode="create" />} />
        <Route path="careers/:id" element={<CareerEditor mode="edit" />} />
        <Route path="job-applications" element={<ApplicationsList />} />
        <Route path="job-applications/:id" element={<ApplicationDetail />} />
        <Route path="testimonials" element={<TestimonialsList />} />
        <Route path="testimonials/new" element={<TestimonialEditor mode="create" />} />
        <Route path="testimonials/:id" element={<TestimonialEditor mode="edit" />} />
        <Route path="about" element={<AboutEditor />} />
        <Route path="mission" element={<MissionEditor />} />
        <Route path="sustainability" element={<SustainabilityEditor />} />
        <Route path="quality" element={<QualityEditor />} />
        <Route path="certificates" element={<CertificatesList />} />
        <Route path="certificates/new" element={<CertificateEditor mode="create" />} />
        <Route path="certificates/:id" element={<CertificateEditor mode="edit" />} />
        <Route path="navigation" element={<NavigationEditor />} />
        <Route path="footer" element={<FooterEditor />} />
        <Route path="contact" element={<ContactEditor />} />
        <Route path="contact-messages" element={<ContactMessagesList />} />
        <Route path="contact-messages/:id" element={<ContactMessageDetail />} />
        <Route path="seo" element={<SeoEditor />} />
        <Route path="languages" element={<LanguagesEditor />} />
        <Route path="site-settings" element={<SiteSettingsEditor />} />
        <Route path="users" element={<UsersList />} />
        <Route path="users/new" element={<UserEditor mode="create" />} />
        <Route path="users/:id" element={<UserEditor mode="edit" />} />
        <Route path="roles" element={<RolesList />} />
        <Route path="roles/new" element={<RoleEditor mode="create" />} />
        <Route path="roles/:id" element={<RoleEditor mode="edit" />} />
        <Route path="activity-log" element={<ActivityLogList />} />
        <Route path="activity-log/:id" element={<ActivityLogDetail />} />
        {adminRouteMeta
          .filter((meta) => !['/admin/dashboard', '/admin/homepage', '/admin/products', '/admin/blog', '/admin/news', '/admin/gallery', '/admin/downloads', '/admin/faq', '/admin/careers', '/admin/job-applications', '/admin/testimonials', '/admin/about', '/admin/mission', '/admin/sustainability', '/admin/quality', '/admin/certificates', '/admin/navigation', '/admin/footer', '/admin/contact', '/admin/contact-messages', '/admin/seo', '/admin/languages', '/admin/site-settings', '/admin/users', '/admin/roles', '/admin/activity-log'].includes(meta.path))
          .map((meta) => (
            <Route key={meta.path} path={meta.path.replace('/admin/', '')} element={<ModulePlaceholder meta={meta} />} />
          ))}
        <Route path="*" element={<AdminNotFound />} />
      </Route>
    </Routes>
  );
}
