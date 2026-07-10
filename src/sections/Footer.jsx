import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaGithub, FaLinkedin, FaArrowUp, FaEnvelope } from 'react-icons/fa';

export const Footer = () => {
  const { setCursorType, setHoveredElement } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Update path hash
    window.history.pushState(null, '', '#home');
  };

  const handleMouseEnter = (e) => {
    setCursorType('hover');
    const rect = e.currentTarget.getBoundingClientRect();
    const styles = window.getComputedStyle(e.currentTarget);
    const borderRadius = parseInt(styles.borderRadius) || 8;
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
    <footer className="py-12 border-t border-white/5 relative bg-dark-bg px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Side: Brand name */}
        <div className="text-center md:text-left">
          <div className="font-display font-bold text-lg text-white mb-2">Simran</div>
          <p className="text-xs text-slate-500 font-mono">
            &copy; {new Date().getFullYear()} // Crafted with React & ThreeJS. All rights reserved.
          </p>
        </div>

        {/* Middle: Social Handles */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-white transition-colors"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            title="GitHub"
          >
            <FaGithub className="w-5 h-5" />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-white transition-colors"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            title="LinkedIn"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>

          <a
            href="mailto:simran.dev@example.com"
            className="text-slate-500 hover:text-white transition-colors"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            title="Email"
          >
            <FaEnvelope className="w-5 h-5" />
          </a>
        </div>

        {/* Right Side: Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-white border border-white/5 hover:border-accent/40 rounded-xl px-4 py-2 bg-white/[0.01] transition-all"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          title="Return to top"
        >
          <span>Top</span>
          <FaArrowUp className="w-3 h-3 animate-bounce" />
        </button>

      </div>
    </footer>
  );
};

export default Footer;
