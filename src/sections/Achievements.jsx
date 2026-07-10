import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { ACHIEVEMENTS_DATA } from '../constants';
import { FaTrophy, FaCertificate, FaCodeBranch, FaExternalLinkAlt } from 'react-icons/fa';

const ACHIEVEMENT_ICONS = [FaTrophy, FaCertificate, FaCodeBranch];

export const Achievements = () => {
  const { setCursorType } = useTheme();

  return (
    <section id="achievements" className="py-24 relative px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="flex flex-col mb-16">
          <span className="text-xs font-mono text-accent uppercase tracking-widest mb-2">&gt; 05. Accomplishments</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Achievements & Open Source
          </h2>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ACHIEVEMENTS_DATA.map((ach, idx) => {
            const Icon = ACHIEVEMENT_ICONS[idx % ACHIEVEMENT_ICONS.length];
            return (
              <motion.div
                key={idx}
                className="glass-card p-8 rounded-3xl border border-white/5 flex flex-col justify-between group overflow-hidden relative"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                {/* Accent glow on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div>
                  {/* Decorative Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl text-accent mb-6 group-hover:scale-110 transition-transform">
                    <Icon />
                  </div>

                  {/* Title & Issuer */}
                  <h3 className="text-xl font-display font-bold text-white mb-2 leading-snug group-hover:text-accent transition-colors">
                    {ach.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
                    Issued by: {ach.issuer}
                  </div>

                  {/* Detail description */}
                  <p className="text-sm text-slate-400 leading-relaxed font-sans">
                    {ach.description}
                  </p>
                </div>

                {/* Bottom verification link */}
                <div className="pt-6 mt-6 border-t border-white/5 flex justify-between items-center text-xs font-mono text-slate-500 group-hover:text-slate-300 transition-colors">
                  <span>Verify credential</span>
                  <FaExternalLinkAlt className="w-2.5 h-2.5 group-hover:text-accent transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Certificate Micro-display */}
        <div className="mt-16 p-8 rounded-3xl bg-white/[0.01] border border-white/5 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="text-3xl text-secondary shrink-0">🎓</div>
            <div>
              <h4 className="font-display font-bold text-white text-base md:text-lg">Additional Professional Credentials</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xl font-sans mt-0.5">
                Certified MERN Stack Developer (Coursera), Advanced React Patterns (Frontend Masters), MongoDB Certified Professional Associate.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="btn-secondary text-xs uppercase tracking-wider shrink-0"
            onMouseEnter={() => setCursorType('hover')}
            onMouseLeave={() => setCursorType('default')}
          >
            Request Verification Links
          </a>
        </div>

      </div>
    </section>
  );
};

export default Achievements;
