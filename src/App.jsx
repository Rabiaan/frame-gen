import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import VerticalLines from './components/VerticalLines.jsx';
import LoadingScreen, { loadingState } from './components/LoadingScreen.jsx';

// Lazy load pages for code splitting and reduced memory usage
const Home = lazy(() => import('./pages/Home.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Services = lazy(() => import('./pages/Services.jsx'));
const Projects = lazy(() => import('./pages/Projects.jsx'));
const WebsiteDevelopment = lazy(() => import('./pages/WebsiteDevelopment.jsx'));
const DigitalMarketing = lazy(() => import('./pages/DigitalMarketing.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const TermsOfService = lazy(() => import('./pages/TermsOfService.jsx'));
const Blog = lazy(() => import('./pages/Blog.jsx'));
const BlogWebsiteCost = lazy(() => import('./pages/BlogWebsiteCost.jsx'));
const BlogChooseAgency = lazy(() => import('./pages/BlogChooseAgency.jsx'));
const BlogNewWebsite = lazy(() => import('./pages/BlogNewWebsite.jsx'));

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const hideVerticalLines = location.pathname === '/privacy' || location.pathname === '/terms';
  const hideFooter = location.pathname === '/privacy' || location.pathname === '/terms';
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = loadingState.subscribe((loading) => {
      setIsLoading(loading);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative">
      <ScrollToTop />
      {!hideVerticalLines && <VerticalLines />}
      <LoadingScreen />
      {!isLoading && <Navbar />}
      
      <main className="relative z-10 pt-3">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-end gap-2 h-8">
                {[0, 0.15, 0.3, 0.45].map((delay, i) => (
                  <div
                    key={i}
                    className="w-1.5 rounded bg-gradient-to-t from-[#7B61FF] to-[#00F0FF]"
                    style={{ height: '20px', animation: `bounce 1s ${delay}s infinite ease-in-out` }}
                  />
                ))}
              </div>
            </div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/website-development" element={<WebsiteDevelopment />} />
            <Route path="/projects/digital-marketing" element={<DigitalMarketing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/website-development-cost-pakistan" element={<BlogWebsiteCost />} />
            <Route path="/blog/choose-digital-marketing-agency-pakistan" element={<BlogChooseAgency />} />
            <Route path="/blog/signs-business-needs-new-website-2026" element={<BlogNewWebsite />} />
          </Routes>
        </Suspense>
      </main>
      
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
