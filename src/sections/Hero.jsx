import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { HERO_DATA } from '../constants';
import { FaGithub, FaLinkedin, FaArrowDown, FaFileDownload, FaEnvelope } from 'react-icons/fa';
import ThreeCanvas from '../components/ThreeCanvas';
import MagneticButton from '../components/MagneticButton';
import profileImg from '../assets/profile.png';

export const Hero = () => {
  const { setCursorType, setHoveredElement } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const [photoRotateX, setPhotoRotateX] = useState(0);
  const [photoRotateY, setPhotoRotateY] = useState(0);

  const handlePhotoMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rX = ((y - centerY) / centerY) * -12;
    const rY = ((x - centerX) / centerX) * 12;
    
    setPhotoRotateX(rX);
    setPhotoRotateY(rY);
  };

  const handlePhotoMouseLeave = () => {
    setPhotoRotateX(0);
    setPhotoRotateY(0);
    setCursorType('default');
  };

  // Typewriter effect loop
  useEffect(() => {
    let timer;
    const fullText = HERO_DATA.roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 100;

    const handleType = () => {
      if (!isDeleting) {
        // Typing characters
        setCurrentText((prev) => fullText.substring(0, prev.length + 1));
        if (currentText === fullText) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        // Deleting characters
        setCurrentText((prev) => fullText.substring(0, prev.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % HERO_DATA.roles.length);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
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
    <section 
      id="home" 
      className="min-h-screen relative flex items-center justify-center pt-24 pb-12 overflow-hidden px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Typography and Actions */}
        <motion.div 
          className="lg:col-span-7 flex flex-col items-start text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Welcome Tag */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-slate-300 uppercase">Available for Full-time Roles</span>
          </motion.div>

          {/* Heading Name */}
          <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white leading-tight tracking-tight mb-2">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-sky-400 to-secondary text-glow">{HERO_DATA.name}</span>
          </h1>

          {/* Cycling Typewriter Subtitles */}
          <div className="h-16 flex items-center mb-6">
            <h2 className="text-2xl md:text-4xl font-display font-medium text-slate-300">
              a <span className="text-white border-r-2 border-accent/80 pr-1 py-1 font-semibold">{currentText}</span>
            </h2>
          </div>

          <p className="text-base md:text-lg text-slate-400 max-w-xl mb-10 leading-relaxed font-sans">
            Specialized in crafting scalable, highly interactive full stack web applications with database architectures, 3D overlays, and fluid UI micro-animations.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap gap-4 items-center mb-10 w-full">
            <MagneticButton>
              <a 
                href="#contact" 
                onClick={scrollToContact}
                className="btn-primary flex items-center gap-2"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <FaEnvelope className="w-4 h-4" />
                <span>Hire Me</span>
              </a>
            </MagneticButton>

            <MagneticButton>
              <a 
                href={HERO_DATA.resumeUrl} 
                className="btn-secondary flex items-center gap-2"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <FaFileDownload className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </MagneticButton>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500">Find me on</span>
            <div className="w-12 h-[1px] bg-white/10" />
            
            <MagneticButton range={40} strength={0.4}>
              <a
                href={HERO_DATA.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                title="GitHub Profile"
              >
                <FaGithub className="w-6 h-6" />
              </a>
            </MagneticButton>

            <MagneticButton range={40} strength={0.4}>
              <a
                href={HERO_DATA.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                title="LinkedIn Profile"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </MagneticButton>
          </div>
        </motion.div>

        {/* Right Side: 3D Scene Layer & Profile Card */}
        <motion.div 
          className="lg:col-span-5 w-full flex items-center justify-center relative min-h-[400px] md:min-h-[480px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle glow sphere behind 3D space */}
          <div className="absolute w-[320px] h-[320px] rounded-full bg-accent/5 filter blur-[60px] pointer-events-none" />

          {/* 3D Tilt Profile Card Frame */}
          <motion.div
            className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border border-white/10 relative z-20 shadow-[0_15px_40px_rgba(0,0,0,0.6)] group cursor-none"
            style={{
              transformStyle: 'preserve-3d',
              transform: `perspective(1000px) rotateX(${photoRotateX}deg) rotateY(${photoRotateY}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
            onMouseMove={handlePhotoMouseMove}
            onMouseLeave={handlePhotoMouseLeave}
            onMouseEnter={() => setCursorType('project')}
          >
            <img 
              src={profileImg} 
              alt="Simran" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Dark gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/85 via-transparent to-transparent z-10" />
            {/* Glowing active outline */}
            <div className="absolute inset-0 border border-accent/25 rounded-3xl pointer-events-none group-hover:border-accent/45 transition-colors" />
          </motion.div>

          {/* Transparent 3D Canvas Layer Floating Behind the Photo */}
          <div className="absolute inset-0 z-10 pointer-events-none w-full h-full">
            <ThreeCanvas />
          </div>
        </motion.div>
      </div>

      {/* Floating Animated Scroll Down Icon */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none z-10">
        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border border-slate-600 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-accent" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
