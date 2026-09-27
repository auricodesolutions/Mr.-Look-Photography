import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import FloatingWhatsApp from './components/common/FloatingWhatsApp.jsx';
import Preloader from './components/common/Preloader.jsx';
import Hero from './components/Hero/Hero.jsx';
import Features from './components/Features/Features.jsx';
import EditorialStory from './components/EditorialStory/EditorialStory.jsx';
import Projects from './components/Projects/Projects.jsx';
import Albums from './components/Albums/Albums.jsx';
import Reviews from './components/Reviews/Reviews.jsx';
import Faq from './components/Faq/Faq.jsx';
import useReveal from './hooks/useReveal.js';
import useSiteMotion from './hooks/useSiteMotion.js';
import useSmoothScroll from './hooks/useSmoothScroll.js';
import GalleryPage from './pages/GalleryPage.jsx';
import AlbumsPage from './pages/AlbumsPage.jsx';
import AlbumPage from './pages/AlbumPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import PackagesPage from './pages/PackagesPage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import ReviewPage from './pages/ReviewPage.jsx';
import TermsPage from './pages/TermsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Services from './components/Services/Services.jsx';
import siteScrollTo from './utils/siteScroll.js';

function HomePage() {
  return <main>
    <Hero />
    <EditorialStory/>
      <Projects />
      <Services/>
        <Albums />
        <Reviews/>
  
    <Faq />
  </main>;
}

function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    let frame;
    let attempts = 0;
    let cancelled = false;

    const scrollToDestination = () => {
      if (cancelled) return;

      const requestedTarget = location.state?.scrollTarget || (location.hash ? decodeURIComponent(location.hash.slice(1)) : '');

      if (!requestedTarget) {
        siteScrollTo(0, 'auto');
        return;
      }

      const target = document.getElementById(requestedTarget);
      if (!target && attempts < 30) {
        attempts += 1;
        frame = requestAnimationFrame(scrollToDestination);
        return;
      }

      if (!target) {
        siteScrollTo(0, 'auto');
        return;
      }

      const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height || 0;
      const top = target.offsetTop - headerHeight;
      siteScrollTo(top);
    };

    frame = requestAnimationFrame(scrollToDestination);
    return () => {
      cancelled = true;
      if (frame) cancelAnimationFrame(frame);
    };
  }, [location.pathname, location.hash, location.key, location.state]);
  return null;
}

function ScrollProgress() {
  useEffect(() => {
    const progress = document.querySelector('.scroll-progress');
    let frame;
    const update = () => {
      frame = undefined;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const value = distance > 0 ? Math.min(1, window.scrollY / distance) : 0;
      progress?.style.setProperty('--scroll-progress', value);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll, { passive: true });
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return <div className="scroll-progress" aria-hidden="true" />;
}

export default function App() {
  const location = useLocation();
  useSmoothScroll();
  useReveal(location.pathname);
  useSiteMotion(location.pathname);
  return <>
    <ScrollManager />
    <ScrollProgress />
    <Preloader />
    <Navbar />
    <FloatingWhatsApp />
    <div className="route-stage" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/wedding-photography-srilanka-colombo" element={<Navigate to="/" replace />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/albums/:slug" element={<AlbumPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
    <Footer />
  </>;
}
