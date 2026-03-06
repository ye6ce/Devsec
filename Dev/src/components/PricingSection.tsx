import React, { useState, useEffect, useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';

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
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <section className="py-24 px-4 relative z-10 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Pricing</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Choose the perfect plan for your business needs. Upgrade to enable enhanced features.
          </p>
        </div>

        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative bg-white/5 backdrop-blur-2xl rounded-[2rem] p-8 md:p-12 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(255,255,255,0.1)] transition-transform duration-200 ease-out"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Glass reflection gradient */}
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 relative z-10" style={{ transform: 'translateZ(30px)' }}>
            
            {/* Plan 1 */}
            <div className="flex flex-col md:pr-8 md:border-r border-white/10">
              <h3 className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-4">Full Website</h3>
              <div className="text-5xl font-bold mb-2">5000 <span className="text-2xl text-gray-500 font-normal">DA</span></div>
              <p className="text-sm text-gray-400 mb-8 min-h-[80px] leading-relaxed">
                Professional, ultra-fast website to build trust and establish your brand online. Perfect for agencies, clinics, and local services.
              </p>
              <ul className="space-y-4 mb-8 flex-1">
                {['Custom Brand Design', 'Fully Responsive Layout', 'Smooth User Animations', 'Optimized for Speed'].map((feature, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-300">
                    <Check className="w-4 h-4 mr-3 text-white shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 px-4 rounded-lg border border-white/20 hover:bg-white hover:text-black transition-colors flex items-center justify-center group font-medium">
                Start Project via DM
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Plan 2 */}
            <div className="flex flex-col md:px-8 md:border-r border-white/10 mt-8 md:mt-0 pt-8 md:pt-0 border-t md:border-t-0">
              <h3 className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-4">Website + Automation</h3>
              <div className="text-5xl font-bold mb-2">8000 <span className="text-2xl text-gray-500 font-normal">DA</span></div>
              <p className="text-sm text-gray-400 mb-8 min-h-[80px] leading-relaxed">
                An intelligent platform that works for you. Automate appointment bookings, client emails, and inventory to save manual work.
              </p>
              <ul className="space-y-4 mb-8 flex-1">
                {['Advanced Form Workflows', 'Order & Delivery Tracking', 'Automated Email Responses', 'Database Integration'].map((feature, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-300">
                    <Check className="w-4 h-4 mr-3 text-white shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 px-4 rounded-lg bg-[#ff2d95] text-white hover:bg-[#ff2d95]/90 transition-colors flex items-center justify-center group font-medium shadow-[0_0_20px_rgba(255,45,149,0.3)]">
                Automate via DM
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Plan 3 */}
            <div className="flex flex-col md:pl-8 mt-8 md:mt-0 pt-8 md:pt-0 border-t md:border-t-0 border-white/10">
              <h3 className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-4">AI Automation</h3>
              <div className="text-5xl font-bold mb-2 flex items-baseline"><ScrambleText /> <span className="text-2xl text-gray-500 font-normal ml-2">DA</span></div>
              <p className="text-sm text-gray-400 mb-8 min-h-[80px] leading-relaxed">
                Deploy custom AI agents to handle 24/7 customer support, qualify leads automatically, and scale operations without extra staff.
              </p>
              <ul className="space-y-4 mb-8 flex-1">
                {['Custom Trained AI Chatbots', 'Lead Qualification Systems', '24/7 Autonomous Operations', 'Dynamic Scale Pricing'].map((feature, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-300">
                    <Check className="w-4 h-4 mr-3 text-white shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 px-4 rounded-lg border border-white/20 hover:bg-white hover:text-black transition-colors flex items-center justify-center group font-medium">
                Automate via DM
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
