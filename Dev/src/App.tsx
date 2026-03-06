/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Iridescence from './components/Iridescence';
import MetallicPaint from './components/MetallicPaint';
import MarqueeCarousel from './components/MarqueeCarousel';
import RotatingText from './components/ui/rotating-text';
import ShinyText from './components/ui/shiny-text';
import BlurText from './components/BlurText';
import FeaturesStack from './components/FeaturesStack';
import NeuroNoise from './components/NeuroNoise';
import FluidCursor from './components/FluidCursor';
import PricingSection from './components/PricingSection';
import BubbleMenu from './components/BubbleMenu';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [textInView, setTextInView] = useState(false);
  const heroRef = useRef(null);
  const textTypeRef = useRef(null);
  const featuresRef = useRef(null);
  const nextSectionRef = useRef(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=2000',
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          if (self.progress > 0.2 && self.progress < 0.8) {
            setTextInView(true);
          } else {
            setTextInView(false);
          }
        }
      }
    });

    tl.to(heroRef.current, {
      rotationX: -30,
      rotationY: 10,
      scale: 0.8,
      filter: 'blur(20px)',
      opacity: 0.5,
      duration: 1
    })
    .to(textTypeRef.current, {
      opacity: 1,
      duration: 1
    })
    .to(textTypeRef.current, {
      opacity: 0,
      duration: 1
    })
    .to(heroRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 1
    })
    .to(featuresRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1
    }, "<");

    // Static: Intense neon pulse for the pink italic words (glow only, no scaling)
    gsap.to('.typo-italic', {
      textShadow: "0px 0px 40px rgba(255,45,149,0.8), 0px 0px 15px rgba(255,45,149,0.5)",
      color: "#ff5eac",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      stagger: 0.3,
      ease: "power2.inOut"
    });

    // Fade up cards when next section comes into view
    const tlCards = gsap.timeline({
      scrollTrigger: {
        trigger: nextSectionRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });

    tlCards.to('.card-0', {
      x: -150,
      y: 100,
      rotation: -15,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut"
    }, 0)
    .to('.card-1', {
      y: -150,
      scale: 1.2,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut"
    }, 0)
    .to('.card-2', {
      x: 150,
      y: 100,
      rotation: 15,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut"
    }, 0);

    // Animate typography words in the next section
    const typoWords = gsap.utils.toArray('.typo-word', nextSectionRef.current);
    
    typoWords.forEach((word: any, i) => {
      const direction = i % 4;
      let xPercent = 0, yPercent = 0;
      if (direction === 0) yPercent = 150; // from bottom
      else if (direction === 1) xPercent = -150; // from left
      else if (direction === 2) yPercent = -150; // from top
      else if (direction === 3) xPercent = 150; // from right
      
      gsap.set(word, { xPercent, yPercent, opacity: 0 });
    });

    gsap.to(typoWords, {
      scrollTrigger: {
        trigger: nextSectionRef.current,
        start: "top 75%",
        end: "bottom top",
        toggleActions: "play none none reverse"
      },
      xPercent: 0,
      yPercent: 0,
      opacity: 1,
      duration: 1.5,
      stagger: 0.1,
      ease: "expo.out"
    });

    return () => {
      const triggers = ScrollTrigger?.getAll?.();
      if (Array.isArray(triggers)) {
        triggers.forEach(t => t.kill());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 relative">
      <BubbleMenu 
        useFixedPosition={true} 
        menuBg="#fff" 
        menuContentColor="#111"
        logo={
          <div className="flex items-center gap-2">
            <img src="https://devsec.odoo.com/web/image/1094-18c61224/34d6cb57-e80d-44ef-8e99-a422e71d6cb6.png?height=256" alt="DevSec Logo" className="h-6 w-auto invert" />
            <span className="text-black font-serif italic text-xl">DevSec</span>
          </div>
        }
      />
      <FluidCursor />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        <NeuroNoise hue={330} saturation={1} chroma={1} />
      </div>
      <div ref={heroRef} className="relative flex h-screen w-full items-center justify-center overflow-hidden z-10 bg-black">
        <Iridescence 
          color={[0.8, 0.9, 1.0]} 
          speed={0.5} 
          amplitude={0.05} 
          mouseReact={true}
        />
        
        <div className="relative z-10 flex flex-col items-center gap-4 px-4 text-center max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mb-2 relative"
          >
            <MetallicPaint 
              imageSrc="https://devsec.odoo.com/web/image/1094-18c61224/34d6cb57-e80d-44ef-8e99-a422e71d6cb6.png?height=256"
              speed={0.2}
              liquid={0.8}
              brightness={1.0}
              contrast={1.2}
              lightColor="#ffffff"
              darkColor="#000000"
              tintColor="#ff2d95"
            />
          </motion.div>
          
          <div className="flex flex-col items-center -mt-8 md:-mt-12 lg:-mt-16">
            <ShinyText
              text="DevSec"
              disabled={false}
              speed={4}
              className="font-serif text-7xl font-normal tracking-tighter md:text-8xl lg:text-9xl xl:text-[10rem] leading-none"
              color="#ffffff"
              shineColor="#ff2d95"
              spread={90}
              yoyo={true}
            />
            
            <div className="flex flex-col items-center gap-6 mt-4">
              <div className="flex items-center gap-3 text-xl md:text-3xl lg:text-4xl font-serif italic text-white/80">
                <span>to</span>
                <RotatingText
                  texts={['build', 'create', 'dream', 'secure', 'innovate', 'deploy']}
                  mainClassName="text-white bg-white/10 px-4 py-1 rounded-lg backdrop-blur-sm border border-white/10"
                  staggerDuration={0.025}
                  staggerFrom="first"
                  transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                  rotationInterval={2500}
                />
              </div>
              <div className="w-full max-w-2xl mt-2 px-4">
                  <MarqueeCarousel
                    words={[
                      'E-commerce',
                      'Portfolio',
                      'SaaS Landing',
                      'Corporate',
                      'Blog & Magazine',
                      'Marketplace',
                      'Dashboard',
                      'Social Network',
                      'Educational',
                      'Booking System',
                      'Real Estate',
                      'Fintech App',
                      'Healthcare Portal',
                      'Creative Agency',
                      'Non-Profit',
                      'Personal Brand',
                      'Event Landing',
                      'Photography',
                      'Restaurant',
                      'Fitness App'
                    ]}
                    speed={45}
                    className="text-sm md:text-base uppercase tracking-[0.1em]"
                  />
              </div>
            </div>
          </div>

          <button className="mt-16 mb-16 rounded-full border border-white/20 bg-white/5 px-10 py-4 text-xs uppercase tracking-widest font-medium backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/40 hover:scale-105 active:scale-95">
            Start Now
          </button>
        </div>
      </div>
      
      <div ref={textTypeRef} className="fixed inset-0 flex items-center justify-center opacity-0 z-20 pointer-events-none">
        <BlurText 
          text="We will turn your ideas into reality"
          className="text-4xl md:text-6xl font-poppins font-bold text-white justify-center"
          delay={100}
          inView={textInView}
        />
      </div>

      <div ref={featuresRef} className="opacity-0 scale-50 relative z-10 -mt-[100vh] min-h-screen">
        <FeaturesStack />
      </div>

      {/* The Next Section */}
      <div ref={nextSectionRef} className="relative z-10 min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] border-t border-white/10 px-2 py-24 overflow-hidden" style={{ perspective: '1000px' }}>
        <div className="w-full max-w-[98vw] mx-auto text-center leading-[0.8] uppercase font-black tracking-[-0.06em] typo-container">
          <div className="overflow-hidden py-1 md:py-2"><span className="inline-block typo-word text-[13vw] md:text-[10.5vw] text-[#ff2d95] font-serif italic font-black pr-[1.5vw] typo-italic">REDEFINING</span> <span className="inline-block typo-word text-[13vw] md:text-[10.5vw] text-[#e4e4e6]">LIMITS,</span></div>
          <div className="overflow-hidden py-1 md:py-2"><span className="inline-block typo-word text-[13vw] md:text-[10.5vw] text-[#e4e4e6]">BUILDING FOR</span> <span className="inline-block typo-word text-[13vw] md:text-[10.5vw] text-[#ff2d95] font-serif italic font-black pl-[1.5vw] typo-italic">SPEED,</span></div>
          <div className="overflow-hidden py-1 md:py-2"><span className="inline-block typo-word text-[13vw] md:text-[10.5vw] text-[#e4e4e6]">BRINGING IT ALL IN</span></div>
          <div className="overflow-hidden py-1 md:py-2"><span className="inline-block typo-word text-[13vw] md:text-[10.5vw] text-[#e4e4e6]">ALL WAYS. DEFINING A</span></div>
          <div className="overflow-hidden py-1 md:py-2"><span className="inline-block typo-word text-[13vw] md:text-[10.5vw] text-[#ff2d95] font-serif italic font-black pr-[1.5vw] typo-italic">LEGACY</span> <span className="inline-block typo-word text-[13vw] md:text-[10.5vw] text-[#e4e4e6]">IN WEB DEV</span></div>
          <div className="overflow-hidden py-1 md:py-2"><span className="inline-block typo-word text-[13vw] md:text-[10.5vw] text-[#e4e4e6]">ON AND OFF THE</span></div>
          <div className="overflow-hidden py-1 md:py-2"><span className="inline-block typo-word text-[13vw] md:text-[10.5vw] text-[#e4e4e6]">SERVER</span></div>
        </div>
      </div>

      <PricingSection />
    </div>
  );
}


