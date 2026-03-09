import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Shuffle from './ui/Shuffle';

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate progress bar width from 0% to 100%
    tl.to(progressRef.current, {
      width: '100%',
      duration: 2,
      ease: "power1.inOut",
      onComplete: () => {
        setShowText(true);
        // Fade out container after text animation delay
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1,
          delay: 2, // Wait for shuffle animation
          onComplete: onComplete
        });
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white overflow-hidden"
    >
      {!showText ? (
        <div className="w-64 h-[2px] bg-white/20 rounded-full overflow-hidden">
          <div 
            ref={progressRef} 
            className="h-full bg-white w-0"
          />
        </div>
      ) : (
        <div className="text-3xl md:text-4xl font-serif italic tracking-tight">
          <Shuffle 
            text="DevSec" 
            shuffleTimes={3} 
            duration={1}
            colorFrom="#555"
            colorTo="#fff"
          />
        </div>
      )}
    </div>
  );
}
