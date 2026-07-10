import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const BackgroundGrid = () => {
  const canvasRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 200, mass: 1 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Throttled Matrix Code Rain Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Set initial size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    const chars = "01<>[]{}/*-+=#@%&";

    let lastTime = 0;
    const interval = 45; // limit framerate to ~22fps for low CPU overhead

    const draw = (timestamp) => {
      animationId = requestAnimationFrame(draw);
      
      // Throttle framerate
      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;

      // Draw faint background overlay to fade old text trails
      ctx.fillStyle = 'rgba(3, 7, 18, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(56, 189, 248, 0.05)'; // Very faint sky-blue characters
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        // Reset drop to top randomly after crossing screen bottom
        if (y > canvas.height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-dark-bg">
      {/* Matrix Code Rain Canvas Layer */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none opacity-[0.4]" // overall opacity control
      />

      {/* Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(56,189,248,0.04),transparent_50%)]" />

      {/* Floating Interactive Glow Blobs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none opacity-30 bg-gradient-to-r from-accent/30 to-secondary/20 hidden md:block"
        style={{
          x: glowX,
          y: glowY,
        }}
      />

      {/* Soft Ambient Slow Orbiting Blob */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none bg-secondary/8 animate-blob-float"
      />
    </div>
  );
};

export default BackgroundGrid;
