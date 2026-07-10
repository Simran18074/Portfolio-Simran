import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaPaperclip } from 'react-icons/fa';
import confetti from 'canvas-confetti';

// Register a free account at https://formspree.io/ to get a Form ID
// Replace "YOUR_FORMSPREE_ID" with your actual ID (e.g. "mvodyqpo")
const FORMSPREE_ID = "xjgqnyjk";

export const Contact = () => {
  const { setCursorType, setHoveredElement } = useTheme();

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

  // Form Field States
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Fallback to simulation if Formspree ID is not yet configured
    if (!FORMSPREE_ID || FORMSPREE_ID === 'YOUR_FORMSPREE_ID') {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#38BDF8', '#8B5CF6', '#FFFFFF']
        });
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (err) {
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Real Formspree submit POST request
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#38BDF8', '#8B5CF6', '#FFFFFF']
        });
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="flex flex-col mb-16">
          <span className="text-xs font-mono text-accent uppercase tracking-widest mb-2">&gt; 08. Inquiries</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Get In Touch
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct info details */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-display font-bold text-white leading-tight">
              Let's create something remarkable together.
            </h3>
            <p className="text-slate-400 leading-relaxed font-sans">
              Whether you are looking to build a complex SaaS product, optimize React page speeds, or hire a versatile MERN developer for your engineering team, feel free to drop a line!
            </p>

            <div className="space-y-4 pt-6">
              {/* Contact Item */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <FaEnvelope className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Write Email</div>
                  <a href="mailto:simran.dev@example.com" className="text-sm font-semibold text-white hover:text-accent transition-colors">
                    simran07856@gmail.com
                  </a>
                </div>
              </div>

              {/* Location Item */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                  <FaMapMarkerAlt className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Location</div>
                  <span className="text-sm font-semibold text-white">Gurgaon, India</span>
                </div>
              </div>

              {/* Status Item */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <FaBriefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Availability</div>
                  <span className="text-sm font-semibold text-white">Full-time Contract / Remote</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Responsive contact form */}
          <div className="lg:col-span-7 glass-card p-8 rounded-3xl border border-white/5 relative">
            
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-slate-950/95 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center text-center p-8 z-30"
              >
                <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center text-3xl text-accent mb-4 animate-bounce">
                  ✨
                </div>
                <h4 className="text-2xl font-display font-extrabold text-white mb-2">Message Received!</h4>
                <p className="text-sm text-slate-400 max-w-sm mb-6 font-sans">
                  Thank you for reaching out. Simran will get back to you within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitStatus(null)}
                  className="btn-secondary text-xs uppercase tracking-wider"
                  onMouseEnter={() => setCursorType('hover')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  Send Another Message
                </button>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row: Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                    placeholder="Your Name"
                    onMouseEnter={() => setCursorType('input')}
                    onMouseLeave={() => setCursorType('default')}
                  />
                  {errors.name && <span className="text-xs text-red-400 font-mono mt-1 block">{errors.name}</span>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                    placeholder="abc@example.com"
                    onMouseEnter={() => setCursorType('input')}
                    onMouseLeave={() => setCursorType('default')}
                  />
                  {errors.email && <span className="text-xs text-red-400 font-mono mt-1 block">{errors.email}</span>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">Subject</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                  placeholder="Collaborating on project design"
                  onMouseEnter={() => setCursorType('input')}
                  onMouseLeave={() => setCursorType('default')}
                />
                {errors.subject && <span className="text-xs text-red-400 font-mono mt-1 block">{errors.subject}</span>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-none"
                  placeholder="Detail your project specifications..."
                  onMouseEnter={() => setCursorType('input')}
                  onMouseLeave={() => setCursorType('default')}
                />
                {errors.message && <span className="text-xs text-red-400 font-mono mt-1 block">{errors.message}</span>}
              </div>

              {/* Submit Trigger */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    <FaPaperPlane className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
