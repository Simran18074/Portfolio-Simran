import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { ABOUT_DATA } from '../constants';
import { FaGraduationCap } from 'react-icons/fa';
import profileImg from '../assets/profile.png';

// Auto Count Up Component
const CountUpNumber = ({ target, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const isIntersecting = useInView(elementRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isIntersecting) {
      let startTime = null;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * target));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isIntersecting, target, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

export const About = () => {
  const { setCursorType } = useTheme();
  
  return (
    <section id="about" className="py-24 relative px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex flex-col mb-16">
          <span className="text-xs font-mono text-accent uppercase tracking-widest mb-2">&gt; 01. Who I Am</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            About Me
          </h2>
        </div>

        {/* Narrative & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Narrative Block */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl md:text-2xl font-display font-medium text-slate-200">
              Developing high-impact MERN architectures since 2022.
            </h3>
            <p className="text-slate-400 leading-relaxed text-base font-sans">
              {ABOUT_DATA.story}
            </p>
            <p className="text-slate-400 leading-relaxed text-base font-sans">
              I value pixel perfection, clean code refactoring, and optimizing full-stack networks to support tens of thousands of active users. My engineering workflow prioritizes performant state management, standard RESTful designs, and modular micro-frontend components.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {ABOUT_DATA.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <div className="text-4xl md:text-5xl font-display font-extrabold text-white text-glow mb-2">
                  <CountUpNumber target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs font-mono tracking-wider text-slate-400 uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Story details / Education timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Card Layout */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden glass-card p-6 border border-white/5 group grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Enhanced Profile Image */}
              <div className="sm:col-span-5 h-56 rounded-2xl overflow-hidden border border-white/10 relative select-none">
                <img 
                  src={profileImg} 
                  alt="Simran" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent" />
              </div>
              
              {/* Philosophy quote text */}
              <div className="sm:col-span-7 flex flex-col justify-between h-full py-2">
                <span className="text-[10px] font-mono text-accent uppercase tracking-wider mb-2">Philosophy</span>
                <p className="text-slate-300 font-display italic text-[13px] md:text-sm leading-relaxed mb-6">
                  "Simplicity is the soul of modern efficiency. A user interface should feel like magic—hiding vast engineering complexity beneath fluid gestures."
                </p>
                <div className="flex items-center gap-3">
                  <img 
                    src={profileImg} 
                    alt="Simran" 
                    className="w-8 h-8 rounded-full object-cover border border-accent/40 animate-pulse"
                  />
                  <div>
                    <div className="text-xs font-semibold text-white">Simran</div>
                    <div className="text-[10px] text-slate-500">MERN Software Engineer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline / Education */}
          <div className="lg:col-span-6">
            <h4 className="text-lg font-mono text-slate-300 mb-6 flex items-center gap-3">
              <FaGraduationCap className="text-secondary w-5 h-5" /> Education History
            </h4>
            
            <div className="space-y-6">
              {ABOUT_DATA.education.map((edu, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h5 className="font-display font-bold text-white text-base md:text-lg">
                      {edu.degree}
                    </h5>
                    <span className="text-xs font-mono text-accent shrink-0 bg-accent/10 px-2.5 py-1 rounded-full">
                      {edu.duration}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-slate-300 mb-2">{edu.institution}</div>
                  <p className="text-xs text-slate-500 leading-relaxed">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
