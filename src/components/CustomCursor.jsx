import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const CustomCursor = () => {
  const { cursorType, hoveredElement } = useTheme();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add active custom cursor styling rule to body
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  // Snapping logic: Outer ring targets center of hovered item if present, else targets mouse
  const ringX = hoveredElement ? hoveredElement.x : position.x;
  const ringY = hoveredElement ? hoveredElement.y : position.y;
  
  // Set dimensions (adds padding padding around snapped element boundaries)
  const ringWidth = hoveredElement ? hoveredElement.width + 12 : 22;
  const ringHeight = hoveredElement ? hoveredElement.height + 12 : 22;
  const ringBorderRadius = hoveredElement ? hoveredElement.borderRadius : 9999;

  // Frame values for the outer magnetic ring
  const ringStyle = {
    x: ringX,
    y: ringY,
    width: ringWidth,
    height: ringHeight,
    borderRadius: ringBorderRadius,
    borderColor: hoveredElement ? 'rgba(56, 189, 248, 0.85)' : 'rgba(56, 189, 248, 0.25)', // Sky blue outline
    backgroundColor: hoveredElement ? 'rgba(56, 189, 248, 0.06)' : 'transparent',
    borderWidth: 1.5,
  };

  // Frame values for the inner tracking dot core
  const dotStyle = {
    x: position.x,
    y: position.y,
    scale: cursorType === 'hover' || hoveredElement ? 0.6 : 1,
    backgroundColor: '#38BDF8', // Sky blue solid dot
  };

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
      
      {/* Outer Snapping outline */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 border pointer-events-none"
        animate={ringStyle}
        transition={{
          type: 'spring',
          stiffness: hoveredElement ? 250 : 380, // slightly smoother damping while snapping
          damping: hoveredElement ? 24 : 26,
          mass: 0.5,
        }}
      />

      {/* Inner Dot Core */}
      <motion.div
        className="absolute w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none shadow-[0_0_8px_rgba(56,189,248,0.4)]"
        animate={dotStyle}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 22,
          mass: 0.1, // extremely quick, latency-free response
        }}
      />
    </div>
  );
};

export default CustomCursor;
