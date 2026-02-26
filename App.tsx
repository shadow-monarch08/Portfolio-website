import React, { useEffect, Suspense, lazy } from 'react';
import Lenis from '@studio-freight/lenis';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Starfield } from './components/Starfield';
import { ThemeProvider } from './context/ThemeContext';

// Lazy loaded routes for code splitting
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Projects = lazy(() => import('./pages/Projects').then(module => ({ default: module.Projects })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));

// Memoize the heavy canvas background
const MemoizedStarfield = React.memo(Starfield);

// Loading Fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
    <div className="w-8 h-8 rounded-full border-2 border-zinc-900 dark:border-white border-t-transparent animate-spin" />
  </div>
);

// Wrapper to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Clean up on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen text-zinc-900 dark:text-white flex flex-col font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black relative transition-colors duration-300">
          <MemoizedStarfield />
          <Navbar />
          <main className="flex-grow relative z-10 w-full">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
