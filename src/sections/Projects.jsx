import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { PROJECTS_DATA } from '../constants';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaCode } from 'react-icons/fa';

// Card with interactive 3D tilt translation on mouse movement
const ProjectCard = ({ project, onClick }) => {
  const { setCursorType, setCursorLabel } = useTheme();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [hoverX, setHoverX] = useState(0);
  const [hoverY, setHoverY] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x coordinate inside the card
    const y = e.clientY - rect.top;  // y coordinate inside the card
    
    setHoverX(x);
    setHoverY(y);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Limits rotation values to ±10 degrees
    const rX = ((y - centerY) / centerY) * -8;
    const rY = ((x - centerX) / centerX) * 8;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setCursorType('default');
    setCursorLabel('');
  };

  const handleMouseEnter = () => {
    setCursorType('project');
    setCursorLabel('View Info');
  };

  return (
    <motion.div
      layout
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="glass-card rounded-2xl overflow-hidden border border-white/5 cursor-none relative flex flex-col h-full group"
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      whileHover={{ y: -6 }}
    >
      {/* Flashlight Dynamic Glow Highlight */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle 180px at ${hoverX}px ${hoverY}px, rgba(56, 189, 248, 0.12), transparent 85%)`
        }}
      />

      {/* Project Image Wrapper */}
      <div className="relative h-48 md:h-56 overflow-hidden w-full select-none">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent z-10 opacity-70" />
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Dynamic Tag Overlay */}
        <span className="absolute top-4 right-4 z-20 text-[10px] font-mono tracking-widest text-accent uppercase bg-dark-bg/85 px-3 py-1 rounded-full border border-accent/20">
          {project.tech[0]}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow justify-between relative z-20">
        <div>
          <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-slate-400 font-mono tracking-wider mb-4">{project.tagline}</p>
          <p className="text-sm text-slate-400 leading-relaxed font-sans line-clamp-3 mb-6">
            {project.description}
          </p>
        </div>

        {/* Tech Stack List */}
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] font-mono text-slate-300 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-[10px] font-mono text-slate-500 px-2 py-0.5">
              +{project.tech.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const { setCursorType, setHoveredElement } = useTheme();
  const [filter, setFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);

  // Derive all unique filter tags
  const filterCategories = ['all', 'MERN', 'React', 'Node.js', 'MongoDB'];

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (filter === 'all') return true;
    return p.tech.some(t => t.toLowerCase() === filter.toLowerCase());
  });

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
    <section id="projects" className="py-24 relative px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="flex flex-col mb-16">
          <span className="text-xs font-mono text-accent uppercase tracking-widest mb-2">&gt; 03. Craftsmanship</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Featured Projects
          </h2>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mr-2">Filter by:</span>
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 border ${
                filter === cat
                  ? 'bg-accent/15 border-accent text-accent shadow-[0_0_15px_rgba(56,189,248,0.15)]'
                  : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard 
                  project={project} 
                  onClick={() => setActiveProject(project)} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pop-up Overlay Modal Details */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-dark-bg/80 backdrop-blur-md"
              onClick={() => setActiveProject(null)}
            >
              {/* Modal Card */}
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-white/10 rounded-3xl overflow-y-auto relative glass-card shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors border border-white/10"
                  onMouseEnter={() => setCursorType('hover')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  <FaTimes className="w-4 h-4" />
                </button>

                {/* Hero preview Banner */}
                <div className="relative h-64 md:h-80 w-full overflow-hidden select-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                  <img 
                    src={activeProject.image} 
                    alt={activeProject.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <h3 className="text-3xl md:text-4xl font-display font-extrabold text-white text-glow mb-2">
                      {activeProject.title}
                    </h3>
                    <p className="text-sm font-mono tracking-widest text-accent uppercase">
                      {activeProject.tagline}
                    </p>
                  </div>
                </div>

                {/* Modal Info grid */}
                <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8">
                  
                  {/* Left Column: Description & Features */}
                  <div className="md:col-span-8 space-y-6">
                    <div>
                      <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">&gt; Project Scope</h4>
                      <p className="text-slate-300 leading-relaxed font-sans">
                        {activeProject.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">&gt; Core Features</h4>
                      <ul className="space-y-2">
                        {activeProject.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-400 font-sans">
                            <span className="text-accent mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Specifications & Actions */}
                  <div className="md:col-span-4 space-y-6">
                    <div>
                      <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">&gt; Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tech.map((t) => (
                          <span key={t} className="text-xs font-mono text-white bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex flex-col gap-3">
                      <a
                        href={activeProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full flex items-center justify-center gap-2"
                        onMouseEnter={() => setCursorType('hover')}
                        onMouseLeave={() => setCursorType('default')}
                      >
                        <FaExternalLinkAlt className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>

                      <a
                        href={activeProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary w-full flex items-center justify-center gap-2"
                        onMouseEnter={() => setCursorType('hover')}
                        onMouseLeave={() => setCursorType('default')}
                      >
                        <FaGithub className="w-4 h-4" />
                        <span>View Source Code</span>
                      </a>
                    </div>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Projects;
