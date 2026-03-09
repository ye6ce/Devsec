import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import NeuroNoise from './NeuroNoise';

const ScrambleText = () => {
  const [display, setDisplay] = useState('0000');
  const chars = '0123456789!@#$%^&*';
  
  useEffect(() => {
    const interval = setInterval(() => {
      let newStr = '';
      for (let i = 0; i < 4; i++) {
        newStr += chars[Math.floor(Math.random() * chars.length)];
      }
      setDisplay(newStr);
    }, 70);
    
    return () => clearInterval(interval);
  }, []);

  return <span className="font-mono inline-block min-w-[110px] text-left">{display}</span>;
};

export default function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isMobile) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;

    containerRef.current.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    containerRef.current.style.transform = 'perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const cardVariantsLeft: Variants = {
    hidden: { 
      x: isMobile ? 0 : -500, 
      y: isMobile ? -200 : 0,
      opacity: 0, 
      borderRadius: "2.5rem", 
      scale: 0.8 
    },
    visible: { 
      x: 0, 
      y: 0,
      opacity: 1,
      scale: 1,
      borderRadius: isMobile ? "2.5rem 2.5rem 0 0" : "2.5rem 0 0 2.5rem",
      transition: { 
        x: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.8 },
        scale: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
        borderRadius: { delay: 1.8, duration: 0.6, ease: "circOut" }
      }
    }
  };

  const cardVariantsCenter: Variants = {
    hidden: { y: 200, opacity: 0, borderRadius: "0px", scale: 0.9 },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      borderRadius: "0px",
      transition: { 
        y: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.8 },
        scale: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
        borderRadius: { delay: 1.8, duration: 0.6, ease: "circOut" }
      }
    }
  };

  const cardVariantsRight: Variants = {
    hidden: { 
      x: isMobile ? 0 : 500, 
      y: isMobile ? 200 : 0,
      opacity: 0, 
      borderRadius: "2.5rem", 
      scale: 0.8 
    },
    visible: { 
      x: 0, 
      y: 0,
      opacity: 1,
      scale: 1,
      borderRadius: isMobile ? "0 0 2.5rem 2.5rem" : "0 2.5rem 2.5rem 0",
      transition: { 
        x: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.8 },
        scale: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
        borderRadius: { delay: 1.8, duration: 0.6, ease: "circOut" }
      }
    }
  };

  return (
    <section id="pricing" className="py-24 px-4 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter"
          >
            Pricing
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl"
          >
            Choose the perfect plan for your business needs. 
            Each solution is crafted for maximum impact.
          </motion.p>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="transition-transform duration-300 ease-out"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-0"
          >
            {/* Plan 1 */}
            <motion.div 
              variants={cardVariantsLeft}
              className="group relative glass-3d p-8 lg:p-10 hover:border-[#ff2d95]/50 transition-all duration-500 flex flex-col"
            >
              {/* Junction Glow Right - Pulse on Unite */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 1, 0] }}
                transition={{ 
                  delay: 2.1, 
                  duration: 1,
                  times: [0, 0.5, 1],
                  ease: "easeInOut"
                }}
                className="absolute -right-[2px] top-0 bottom-0 w-[4px] bg-[#ff2d95] blur-[10px] z-20 hidden md:block"
              />
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 1, 0] }}
                transition={{ 
                  delay: 2.1, 
                  duration: 0.8,
                  times: [0, 0.5, 1],
                  ease: "easeInOut"
                }}
                className="absolute -right-[1px] top-0 bottom-0 w-[2px] bg-white z-30 hidden md:block"
              />

              <div className="absolute inset-0 rounded-inherit bg-gradient-to-b from-[#ff2d95]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-6">Full Website</h3>
                <div className="text-5xl font-bold mb-3 tracking-tight">5000 <span className="text-xl text-gray-500 font-normal">DA</span></div>
                <p className="text-sm text-gray-400 mb-10 leading-relaxed">
                  Professional, ultra-fast website to build trust and establish your brand online. Perfect for agencies, clinics, and local services.
                </p>
                <ul className="space-y-5 mb-10 flex-1">
                  {['Custom Brand Design', 'Fully Responsive Layout', 'Smooth User Animations', 'Optimized for Speed'].map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-300">
                      <Check className="w-4 h-4 mr-4 text-[#ff2d95] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="https://ig.me/m/devsec_web" target="_blank" rel="noopener noreferrer" className="w-full py-4 px-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center group/btn font-semibold text-sm uppercase tracking-wider">
                  Start Project
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Plan 2 - Featured */}
            <motion.div 
              variants={cardVariantsCenter}
              className="group relative glass-3d p-8 lg:p-10 border-[#ff2d95]/50 hover:border-[#ff2d95]/80 transition-all duration-500 flex flex-col"
            >
              {/* Junction Glow Right - Pulse on Unite */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 1, 0] }}
                transition={{ 
                  delay: 2.1, 
                  duration: 1,
                  times: [0, 0.5, 1],
                  ease: "easeInOut"
                }}
                className="absolute -right-[2px] top-0 bottom-0 w-[4px] bg-[#ff2d95] blur-[10px] z-20 hidden md:block"
              />
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 1, 0] }}
                transition={{ 
                  delay: 2.1, 
                  duration: 0.8,
                  times: [0, 0.5, 1],
                  ease: "easeInOut"
                }}
                className="absolute -right-[1px] top-0 bottom-0 w-[2px] bg-white z-30 hidden md:block"
              />

              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[#ff2d95] text-[10px] font-bold tracking-[0.2em] uppercase">
                Most Popular
              </div>
              <div className="absolute inset-0 rounded-inherit bg-gradient-to-b from-[#ff2d95]/10 to-transparent opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-xs font-bold tracking-[0.2em] text-[#ff2d95] uppercase mb-6">Website + Automation</h3>
                <div className="text-5xl font-bold mb-3 tracking-tight">8000 <span className="text-xl text-gray-500 font-normal">DA</span></div>
                <p className="text-sm text-gray-400 mb-10 leading-relaxed">
                  An intelligent platform that works for you. Automate appointment bookings, client emails, and inventory to save manual work.
                </p>
                <ul className="space-y-5 mb-10 flex-1">
                  {['Advanced Form Workflows', 'Order & Delivery Tracking', 'Automated Email Responses', 'Database Integration'].map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-300">
                      <Check className="w-4 h-4 mr-4 text-[#ff2d95] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="https://ig.me/m/devsec_web" target="_blank" rel="noopener noreferrer" className="w-full py-4 px-6 rounded-2xl bg-[#ff2d95] text-white hover:bg-[#ff2d95]/90 transition-all duration-300 flex items-center justify-center group/btn font-semibold text-sm uppercase tracking-wider shadow-[0_10px_30px_rgba(255,45,149,0.3)]">
                  Automate Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Plan 3 */}
            <motion.div 
              variants={cardVariantsRight}
              className="group relative glass-3d p-8 lg:p-10 hover:border-[#ff2d95]/50 transition-all duration-500 flex flex-col"
            >
              <div className="absolute inset-0 rounded-inherit bg-gradient-to-b from-[#ff2d95]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-6">AI Automation</h3>
                <div className="text-5xl font-bold mb-3 tracking-tight flex items-baseline"><ScrambleText /> <span className="text-xl text-gray-500 font-normal ml-2">DA</span></div>
                <p className="text-sm text-gray-400 mb-10 leading-relaxed">
                  Deploy custom AI agents to handle 24/7 customer support, qualify leads automatically, and scale operations without extra staff.
                </p>
                <ul className="space-y-5 mb-10 flex-1">
                  {['Custom Trained AI Chatbots', 'Lead Qualification Systems', '24/7 Autonomous Operations', 'Dynamic Scale Pricing'].map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-300">
                      <Check className="w-4 h-4 mr-4 text-[#ff2d95] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="https://ig.me/m/devsec_web" target="_blank" rel="noopener noreferrer" className="w-full py-4 px-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center group/btn font-semibold text-sm uppercase tracking-wider">
                  Scale with AI
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
