import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const { theme, toggleTheme, setCursorType, setHoveredElement } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll for header background transparency & scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      // Set opacity threshold
      setScrolled(window.scrollY > 50);

      // Calculate progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      // Update browser hash cleanly without page jump
      window.history.pushState(null, '', href);
    }
  };

  const handleMouseEnter = (e, customRadius = null) => {
    setCursorType('hover');
    const rect = e.currentTarget.getBoundingClientRect();
    const styles = window.getComputedStyle(e.currentTarget);
    const borderRadius = customRadius !== null ? customRadius : (parseInt(styles.borderRadius) || 8);
    setHoveredElement({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      width: rect.width,
      height: rect.height,
      borderRadius: borderRadius,
    });
  };

  const handleMouseLeave = () => {
    setCursorType('default');
    setHoveredElement(null);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-4 bg-dark-bg/60 backdrop-blur-md border-b border-dark-border' 
          : 'py-6 bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Scroll Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-accent to-secondary transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Animated Logo */}
        <a 
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2 group font-display font-bold text-2xl tracking-wide text-white"
          onMouseEnter={(e) => handleMouseEnter(e, 12)}
          onMouseLeave={handleMouseLeave}
        >
          <motion.span 
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-slate-900 font-extrabold shadow-[0_0_15px_rgba(56,189,248,0.3)]"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            S
          </motion.span>
          <span className="relative">
            imran
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
          </span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative py-1 group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Mobile Navbar trigger */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white transition-colors"
          >
            {isOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark-bg/95 border-b border-dark-border backdrop-blur-lg overflow-hidden"
          >
            <div className="flex flex-col gap-4 py-6 px-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-lg font-medium text-slate-300 hover:text-white transition-colors py-2 border-b border-white/5"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
