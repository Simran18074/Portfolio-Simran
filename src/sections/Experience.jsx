import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { EXPERIENCE_DATA } from '../constants';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const TimelineCard = ({ exp, index }) => {
  const { setCursorType } = useTheme();
  const cardRef = useRef(null);
  // Trigger slide-in animation once card enters viewport
  const isVisible = useInView(cardRef, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  return (
    <div 
      ref={cardRef}
      className={`flex flex-col md:flex-row items-center justify-between w-full mb-12 last:mb-0 relative ${
        isEven ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Central Connector Circle */}
      <div className="absolute left-4 md:left-1/2 top-4 md:top-6 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-slate-900 border-2 border-accent flex items-center justify-center text-slate-100 shadow-[0_0_15px_rgba(56,189,248,0.4)]">
        <FaBriefcase className="w-3.5 h-3.5" />
      </div>

      {/* Spacing node for desktop columns */}
      <div className="hidden md:block w-[45%]" />

      {/* Details Box */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 60 : -60, y: 10 }}
        animate={isVisible ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="w-[90%] md:w-[45%] ml-12 md:ml-0 glass-card p-6 rounded-2xl border border-white/5 shadow-lg group relative overflow-hidden"
        whileHover={{ scale: 1.01 }}
      >
        {/* Glow corner backing */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent/5 to-transparent rounded-bl-full pointer-events-none group-hover:from-accent/15 transition-all duration-300" />

        {/* Duration badge */}
        <div className="flex items-center gap-2 text-xs font-mono text-accent mb-3">
          <FaCalendarAlt className="w-3 h-3" />
          <span>{exp.duration}</span>
        </div>

        {/* Title details */}
        <h3 className="text-lg md:text-xl font-display font-extrabold text-white mb-1 group-hover:text-accent transition-colors">
          {exp.role}
        </h3>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 text-sm font-medium text-slate-300">
          <span>{exp.company}</span>
          <span className="text-slate-600 hidden xs:inline">•</span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <FaMapMarkerAlt className="w-2.5 h-2.5" />
            {exp.location}
          </span>
        </div>

        {/* Narrative */}
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-4 font-sans">
          {exp.description}
        </p>

        {/* Highlight Tags */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
          {exp.highlights.map((tag, idx) => (
            <span 
              key={idx} 
              className="text-[10px] font-mono text-slate-300 bg-white/5 border border-white/5 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export const Experience = () => {
  return (
    <section id="experience" className="py-24 relative px-6 md:px-12 border-t border-white/5 bg-slate-950/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="flex flex-col mb-20">
          <span className="text-xs font-mono text-accent uppercase tracking-widest mb-2">&gt; 04. Milestones</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Work Experience
          </h2>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Vertical Grid Connector Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] timeline-gradient opacity-40 z-10" />

          {/* Timeline Cards */}
          {EXPERIENCE_DATA.map((exp, idx) => (
            <TimelineCard 
              key={exp.id} 
              exp={exp} 
              index={idx} 
            />
          ))}

        </div>
      </div>
    </section>
  );
};

export default Experience;
