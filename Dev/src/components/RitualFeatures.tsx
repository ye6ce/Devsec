import React from 'react';
import { motion } from 'motion/react';
import { Truck, ShieldCheck, RefreshCw, Zap } from 'lucide-react';

const features = [
  {
    icon: <Truck size={24} />,
    title: "Shadow Delivery",
    desc: "Vessels delivered through the void within 3-5 moons. Free for all sanctum members."
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Secure Rituals",
    desc: "Every transaction is protected by ancient encryption and modern sorcery."
  },
  {
    icon: <RefreshCw size={24} />,
    title: "Eternal Return",
    desc: "If the essence doesn't match your spirit, return it within 30 days for a full ritual reset."
  },
  {
    icon: <Zap size={24} />,
    title: "Instant Power",
    desc: "Forged with high-responsiveness technology for immediate court command."
  }
];

const RitualFeatures = () => {
  return (
    <section className="py-32 px-6 sm:px-10 bg-[#050505] border-y border-stone-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group space-y-6"
          >
            <div className="w-14 h-14 border border-stone-800 flex items-center justify-center text-stone-600 group-hover:text-stone-100 group-hover:border-stone-500 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-500">
              {f.icon}
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-ravens text-stone-200 tracking-wider uppercase">{f.title}</h3>
              <p className="text-sm text-stone-500 font-serif italic leading-relaxed">
                {f.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RitualFeatures;
