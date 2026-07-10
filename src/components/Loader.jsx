import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GREETINGS = ["Hello", "Namaste", "Bonjour", "Ciao", "Olá", "Konnichiwa", "System.ready()"];

export const Loader = ({ finishLoading }) => {
  const [count, setCount] = useState(0);
  const [greetingIndex, setGreetingIndex] = useState(0);

  // Counter animation
  useEffect(() => {
    const counterInterval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(counterInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(counterInterval);
  }, []);

  // Greeting text cycler
  useEffect(() => {
    if (greetingIndex < GREETINGS.length - 1) {
      const greetingInterval = setTimeout(() => {
        setGreetingIndex((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(greetingInterval);
    }
  }, [greetingIndex]);

  // Finish loading when counter hits 100% and stays slightly for smooth exit
  useEffect(() => {
    if (count === 100) {
      const exitTimeout = setTimeout(() => {
        finishLoading();
      }, 600);
      return () => clearTimeout(exitTimeout);
    }
  }, [count, finishLoading]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] bg-dark-bg flex flex-col justify-between p-8 md:p-16 select-none"
      exit={{
        y: '-100vh',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }
      }}
    >
      {/* Top Details */}
      <div className="flex justify-between items-center text-xs font-mono tracking-widest text-slate-500 uppercase">
        <div>Developer Portfolio // 2026</div>
        <div>Simran.init()</div>
      </div>

      {/* Middle Greetings */}
      <div className="h-24 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={greetingIndex}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white text-glow"
          >
            {GREETINGS[greetingIndex]}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Bottom Counter & Grid */}
      <div className="flex flex-col gap-4">
        {/* Progress Line */}
        <div className="w-full h-[1px] bg-white/5 relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent to-secondary"
            initial={{ width: '0%' }}
            animate={{ width: `${count}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        <div className="flex justify-between items-end">
          {/* Taglines */}
          <div className="hidden md:block text-sm font-mono text-slate-400">
            <span className="text-accent">&gt;</span> Loading visual assets... <br />
            <span className="text-secondary">&gt;</span> Compiling shader pipelines...
          </div>

          {/* Progress Percent */}
          <div className="text-7xl md:text-9xl font-display font-extrabold text-slate-300 tabular-nums">
            {count}%
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
