import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { SKILL_CATEGORIES } from '../constants';

// SVG Circular Progress Indicator
const CircularIndicator = ({ percentage, color, isVisible }) => {
  const radius = 32;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      {/* Background Track Circle */}
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Dynamic Highlight Circle */}
        <motion.circle
          cx="40"
          cy="40"
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isVisible ? { strokeDashoffset } : { strokeDashoffset: circumference }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
        />
      </svg>
      {/* Center text percentage */}
      <span className="absolute text-sm font-mono text-white font-bold">{percentage}%</span>
    </div>
  );
};

export const Skills = () => {
  const { setCursorType } = useTheme();
  const [activeTab, setActiveTab] = useState(SKILL_CATEGORIES[0].id);

  const activeCategory = SKILL_CATEGORIES.find((cat) => cat.id === activeTab);
  const TabIcon = activeCategory ? activeCategory.icon : null;

  return (
    <section id="skills" className="py-24 relative px-6 md:px-12 border-t border-white/5 bg-slate-950/20">
      {/* Background Ambient Lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="flex flex-col mb-16">
          <span className="text-xs font-mono text-accent uppercase tracking-widest mb-2">&gt; 02. Engine Room</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Technical Skills
          </h2>
        </div>

        {/* Tab Toggle Navigation */}
        <div className="flex justify-center mb-16">
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white/[0.02] border border-white/5 max-w-full">
            {SKILL_CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isActive = category.id === activeTab;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive ? 'text-slate-900' : 'text-slate-400 hover:text-white'
                  }`}
                  onMouseEnter={() => setCursorType('hover')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  {/* Sliding pill background active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent to-secondary shadow-[0_4px_20px_rgba(56,189,248,0.25)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="relative z-10">{category.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Skill Cards Grid */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {activeCategory.skills.map((skill, index) => {
                const SkillIcon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="glass-card p-6 rounded-2xl border border-white/5 flex items-center justify-between group overflow-hidden relative"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Glow backdrop behind hover item */}
                    <div 
                      className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none blur-xl"
                      style={{ backgroundColor: skill.color }}
                    />

                    {/* Skill Info */}
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-colors duration-300"
                        style={{ 
                          backgroundColor: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.05)',
                          color: skill.color 
                        }}
                      >
                        <SkillIcon />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-white text-base md:text-lg mb-1">{skill.name}</h4>
                        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Proficient</span>
                      </div>
                    </div>

                    {/* Animated Circular percentage */}
                    <CircularIndicator 
                      percentage={skill.percentage} 
                      color={skill.color} 
                      isVisible={true} 
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Skills;
