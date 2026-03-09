import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'top bottom',
  scrollEnd = 'bottom top',
  stagger = 0.03
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('').map((char, index) => (
      <span className="char" key={index}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const charElements = el.querySelectorAll('.char');
    if (charElements.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: scrollStart || 'top bottom-=100',
        end: scrollEnd || 'bottom center',
        scrub: true,
      }
    });

    tl.fromTo(
      charElements,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        y: 150,
        rotationX: -90,
        scale: 0.5,
        transformOrigin: '50% 50%',
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        stagger: stagger,
        ease: 'power2.out',
      }
    );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [scrollStart, scrollEnd, stagger]);

  return (
    <h2 ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;
