import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
      {!hideVerticalLines && <VerticalLines />}
      <LoadingScreen />
      {!isLoading && <Navbar />}
      
      <main className="relative z-10 pt-3">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}>
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
          </Routes>
        </Suspense>
      </main>
      
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
