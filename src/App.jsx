import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

// Global Overlays & Structurals
import NoiseOverlay from './components/NoiseOverlay';
import BackgroundGrid from './components/BackgroundGrid';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Loader from './components/Loader';

// Main Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import GitHub from './sections/GitHub';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Scroll properties
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easeOutExpo
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Clean up
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* Noise Grain Backdrop Filter */}
      <NoiseOverlay />

      {/* Grid Lines and Moving Blur Blobs */}
      <BackgroundGrid />

      {/* Custom Spring Interactive Cursor */}
      <CustomCursor />

      {/* Digital Preloading screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader finishLoading={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Site Content */}
      {!isLoading && (
        <div className="relative min-h-screen flex flex-col justify-between selection:bg-accent/30 selection:text-white">
          {/* Top Sticky Header */}
          <Navbar />

          {/* Page Sections */}
          <main className="flex-grow">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <GitHub />
            <Contact />
          </main>

          {/* Site Footer */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
