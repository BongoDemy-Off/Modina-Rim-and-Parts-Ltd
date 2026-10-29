import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Layout from './layouts/Layout';
import ScrollToTop from './components/ScrollToTop';
import { useLocaleSync } from './hooks/useLocaleSync';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Mission from './pages/Mission';
import Sustainability from './pages/Sustainability';
import Contact from './pages/Contact';
import Quality from './pages/Quality';
import Certificates from './pages/Certificates';
import Downloads from './pages/Downloads';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import Gallery from './pages/Gallery';
import Careers from './pages/Careers';
import FAQ from './pages/FAQ';
import Preloader from './components/Preloader';

const AdminRoutes = lazy(() => import('./admin/AdminRoutes'));

function PublicSiteLayout() {
  // Preserve the approved public preloader behavior inside the public route tree.
  const [loading, setLoading] = useState(
    () => !sessionStorage.getItem('modina_loaded')
  );

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('modina_loaded', '1');
    setLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>
      <Layout />
    </>
  );
}

function AdminLoadingFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center bg-[#f4f6f8] px-6 text-center font-sans text-sm font-semibold text-[#475569]"
    >
      Loading Admin UI foundation…
    </div>
  );
}

export default function App() {
  useLocaleSync(); // Synchronise <html> lang / dir / locale class / font tokens before paint

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/admin/*"
          element={(
            <Suspense fallback={<AdminLoadingFallback />}>
              <AdminRoutes />
            </Suspense>
          )}
        />
        <Route path="/" element={<PublicSiteLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="mission" element={<Mission />} />
            <Route path="sustainability" element={<Sustainability />} />
            <Route path="products" element={<Products />} />
            <Route path="quality" element={<Quality />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="downloads" element={<Downloads />} />
            <Route path="news" element={<News />} />
            <Route path="news/:id" element={<NewsDetail />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<BlogDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="careers" element={<Careers />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
