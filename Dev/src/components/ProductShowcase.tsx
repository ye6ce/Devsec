import React from 'react';
import { motion } from 'motion/react';

const features = [
  {
    title: "Premium leather",
    desc: "Forged from the finest hides, treated with ancient oils for eternal suppleness.",
    position: "top-[15%] left-[-15%] sm:left-[0%]",
    align: "text-left",
    linePath: "M 100 50 L 250 150" // Example path, will adjust in render
  },
  {
    title: "Shadow-step sole",
    desc: "High-performance rubber infused with carbon for silent, absolute command.",
    position: "top-[25%] right-[-15%] sm:right-[0%]",
    align: "text-right",
    linePath: "M 0 50 L -150 100"
  },
  {
    title: "Reinforced sigils",
    desc: "Double-stitched structural integrity for high-impact rituals.",
    position: "bottom-[15%] left-[-15%] sm:left-[0%]",
    align: "text-left",
    linePath: "M 100 0 L 250 -100"
  },
  {
    title: "Breathable essence",
    desc: "Micro-perforated interior for optimal spirit-flow and comfort.",
    position: "bottom-[0%] right-[-15%] sm:right-[0%]",
    align: "text-right",
    linePath: "M 0 0 L -150 -100"
  }
];

const ProductShowcase = () => {
  return (
    <section className="py-20 lg:py-40 px-6 sm:px-10 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12 lg:mb-24 space-y-4">
          <span className="text-stone-600 text-[10px] uppercase font-bold tracking-[0.5em] block">The Masterpiece</span>
          <h2 className="text-4xl lg:text-8xl font-ravens text-stone-100">Vessel <span className="text-stone-500 italic">Anatomy</span></h2>
        </div>

        <div className="relative flex flex-col lg:flex-row justify-center items-center min-h-fit lg:min-h-[700px]">
          {/* Central Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-[70%] lg:w-full max-w-xl mx-auto lg:mx-0"
          >
            <img 
              src="https://lh3.googleusercontent.com/d/1p6p-gc6e4tHhkWztz1wmSrw4nYjU3hkF" 
              alt="Ravens Masterpiece Boot" 
              className="w-full h-auto drop-shadow-[0_0_100px_rgba(255,255,255,0.1)]"
              referrerPolicy="no-referrer"
            />
            
            {/* Pulsing background glow */}
            <div className="absolute inset-0 bg-white/5 blur-[120px] rounded-full -z-10 animate-pulse" />
          </motion.div>

          {/* Feature Points with Lines */}
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 + (i * 0.2) }}
              className={`absolute ${f.position} z-20 max-w-[200px] sm:max-w-[280px] hidden lg:block`}
            >
              <div className={`relative space-y-3 ${f.align}`}>
                {/* Connecting Line (SVG) */}
                <svg 
                  className={`absolute top-1/2 ${i % 2 === 0 ? 'left-full ml-4' : 'right-full mr-4'} w-32 h-20 pointer-events-none overflow-visible`}
                  style={{ transform: 'translateY(-50%)' }}
                >
                  <motion.path
                    d={i % 2 === 0 
                      ? (i === 0 ? "M 0 0 L 90 45" : "M 0 0 L 90 -45")
                      : (i === 1 ? "M 0 0 L -90 45" : "M 0 0 L -90 -45")
                    }
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 1.2 + (i * 0.2) }}
                  />
                  <motion.circle
                    cx={i % 2 === 0 ? 90 : -90}
                    cy={i === 0 || i === 1 ? 45 : -45}
                    r="2"
                    fill="white"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2.5 + (i * 0.2) }}
                  />
                </svg>

                <h3 className="text-2xl font-ravens text-stone-100 tracking-wide capitalize">{f.title}</h3>
                <p className="text-sm text-stone-500 font-serif italic leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Mobile Feature List */}
          <div className="lg:hidden grid grid-cols-2 gap-x-4 gap-y-10 mt-12 w-full">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-2"
              >
                <h3 className="text-xl font-ravens text-stone-100 tracking-wide capitalize">{f.title}</h3>
                <p className="text-[10px] text-stone-500 font-serif italic max-w-[140px] mx-auto leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
