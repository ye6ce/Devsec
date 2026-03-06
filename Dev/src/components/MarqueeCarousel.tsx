import { motion } from 'motion/react';

interface MarqueeCarouselProps {
  words: string[];
  speed?: number;
  className?: string;
}

export default function MarqueeCarousel({ words, speed = 20, className = "" }: MarqueeCarouselProps) {
  // Duplicate words to ensure seamless loop
  const doubledWords = [...words, ...words];

  return (
    <div 
      className={`relative overflow-hidden whitespace-nowrap bg-white/5 px-2 py-1 rounded-lg backdrop-blur-md border border-white/10 ${className}`}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
      }}
    >
      <motion.div
        className="inline-block"
        animate={{
          x: [0, -100 + '%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {doubledWords.map((word, i) => (
          <span key={i} className="mx-4 text-white font-serif italic hover:text-[#ff2d95] transition-colors cursor-default">
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
