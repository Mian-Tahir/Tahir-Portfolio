import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, centered = false }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline for section title
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "top 60%",
          scrub: 0.5
        }
      });

      // Animate title
      tl.fromTo(titleRef.current, 
        { 
          opacity: 0, 
          y: 40,
          scale: 0.95
        }, 
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out"
        }
      );

      // Animate subtitle if it exists
      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current, 
          { 
            opacity: 0, 
            y: 30 
          }, 
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6,
            ease: "power2.out"
          },
          "-=0.4"
        );
      }

      // Add a subtle continuous animation to the title underline
      gsap.to(titleRef.current, {
        backgroundPosition: "200% 0",
        duration: 3,
        repeat: -1,
        ease: "none",
        backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(var(--color-primary-rgb), 0.3) 50%, transparent 100%)"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`mb-12 ${centered ? 'text-center' : ''}`}
    >
      <h2
        ref={titleRef}
        className={`section-title opacity-0 ${centered ? 'mx-auto after:left-1/4 after:right-1/4' : ''}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          ref={subtitleRef}
          className="text-text-secondary mt-4   opacity-0"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;