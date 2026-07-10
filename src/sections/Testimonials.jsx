import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { TESTIMONIALS_DATA } from '../constants';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';

export const Testimonials = () => {
  const { setCursorType } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, +1 for right

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: 'easeOut' }
    },
    exit: (dir) => ({
      x: dir < 0 ? 120 : -120,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.45, ease: 'easeIn' }
    })
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const activeTestimonial = TESTIMONIALS_DATA[activeIndex];

  return (
    <section id="testimonials" className="py-24 relative px-6 md:px-12 border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="flex flex-col mb-16 text-center items-center">
          <span className="text-xs font-mono text-accent uppercase tracking-widest mb-2">&gt; 07. Endorsements</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Client Testimonials
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[380px] md:min-h-[300px] flex items-center justify-center">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full glass-card p-8 md:p-12 rounded-3xl border border-white/5 relative flex flex-col justify-between"
            >
              {/* Decorative Large Quote mark */}
              <FaQuoteLeft className="absolute top-6 left-6 text-accent/10 text-5xl md:text-7xl pointer-events-none" />

              <div className="relative z-10">
                {/* Quote Text */}
                <p className="text-base md:text-xl text-slate-200 leading-relaxed font-sans italic mb-8 select-text">
                  "{activeTestimonial.quote}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <img 
                    src={activeTestimonial.avatar} 
                    alt={activeTestimonial.author} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-accent/30"
                  />
                  <div>
                    <h4 className="font-display font-bold text-white text-base md:text-lg">
                      {activeTestimonial.author}
                    </h4>
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                      {activeTestimonial.role}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-accent/40 z-20 transition-all"
            onMouseEnter={() => setCursorType('hover')}
            onMouseLeave={() => setCursorType('default')}
            title="Previous Testimonial"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-accent/40 z-20 transition-all"
            onMouseEnter={() => setCursorType('hover')}
            onMouseLeave={() => setCursorType('default')}
            title="Next Testimonial"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Carousel Bullet Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx 
                  ? 'bg-accent w-6 shadow-[0_0_10px_rgba(56,189,248,0.5)]' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
              title={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
