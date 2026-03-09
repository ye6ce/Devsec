import React from 'react';
import { motion } from 'motion/react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  yoyo?: boolean;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = '',
  color = '#ffffff',
  shineColor = '#ff2d95',
  spread = 90,
  yoyo = true,
}: ShinyTextProps) {
  if (disabled) {
    return <span className={className} style={{ color }}>{text}</span>;
  }

  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(120deg, ${color} 40%, ${shineColor} 50%, ${color} 60%)`,
        backgroundSize: '200% auto',
      }}
      animate={{
        backgroundPosition: ['200% center', '-200% center'],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        repeatType: yoyo ? 'reverse' : 'loop',
        ease: 'linear',
      }}
    >
      {text}
    </motion.span>
  );
}
