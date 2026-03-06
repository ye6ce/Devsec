import React from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import SchemaCard from './ui/SchemaCard';
import { Zap, Layout, Headset } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const springConfig = { damping: 20, stiffness: 150 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  );
};

export default function FeaturesStack() {
  const cards = [
    { title: "Fast Delivery", description: "Instant digital website delivery, no physical shipping required.", category: "Database", icon: Zap },
    { title: "Friendly Interface", description: "Intuitive and user-friendly designs that delight your visitors.", category: "UI/UX", icon: Layout },
    { title: "24/7 Support", description: "Dedicated support team available around the clock for you.", category: "Support", icon: Headset },
  ];

  return (
    <div className="py-24 relative overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-5xl font-serif text-white text-center mb-16">Why Choose Us</h2>
        
        {/* Desktop: Grid */}
        <div className="hidden md:flex max-w-6xl mx-auto px-6 gap-6 justify-center py-12">
          {cards.map((card, i) => (
            <div key={i} className={`disappearing-card relative card-${i}`} style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
              <TiltCard>
                <SchemaCard {...card} />
              </TiltCard>
            </div>
          ))}
        </div>

        {/* Mobile: ScrollStack */}
        <div className="md:hidden">
          <ScrollStack 
            itemDistance={300} 
            itemStackDistance={-50} 
            blurAmount={0}
            stackPosition="0%"
            useWindowScroll={true}
            className="max-w-5xl mx-auto px-6"
            onStackComplete={() => {}}
          >
            {cards.map((card, i) => (
              <ScrollStackItem key={i}>
                <div className="disappearing-card relative" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
                  <SchemaCard {...card} />
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </div>
    </div>
  );
}
