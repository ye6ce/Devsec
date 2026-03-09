import React from 'react';
import { motion } from 'motion/react';

interface RedWavyDividerProps {
  className?: string;
  color?: string;
}

export default function RedWavyDivider({ className = '', color = '#ff2d2d' }: RedWavyDividerProps) {
  return (
    <div className={`w-full overflow-hidden py-16 ${className}`}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-16 md:h-24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M-50,60 Q50,20 150,60 T350,60 T550,60 T750,60 T950,60 T1150,60 T1350,60"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
        <motion.path
          d="M-50,65 Q50,25 150,65 T350,65 T550,65 T750,65 T950,65 T1150,65 T1350,65"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
      </svg>
    </div>
  );
}
