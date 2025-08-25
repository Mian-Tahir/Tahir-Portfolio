import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import { LayoutGrid, Server, Database, Globe, Code, RefreshCcw, Monitor } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Services: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const servicesRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const services: Service[] = [
    {
      icon: <LayoutGrid size={36} className="text-primary" />,
      title: 'Frontend Development',
      description: 'Responsive UI/UX design, single-page applications, component-based architecture, and cross-browser compatibility.',
    },
    {
      icon: <Server size={36} className="text-primary" />,
      title: 'Backend Development',
      description: 'RESTful API development, server-side logic, authentication & authorization, and performance optimization.',
    },
    {
      icon: <Monitor size={36} className="text-primary" />,
      title: 'Responsive Design',
      description: 'Mobile-first, adaptive layouts, cross-device compatibility, and pixel-perfect implementation for all screen sizes.',
    },
    {
      icon: <Globe size={36} className="text-primary" />,
      title: 'Full-Stack Solutions',
      description: 'End-to-end web application development using the MERN stack, from concept to deployment.',
    },
    {
      icon: <Code size={36} className="text-primary" />,
      title: 'API Integration',
      description: 'Third-party API integration, webhooks implementation, and custom API development for your business needs.',
    },
    {
      icon: <RefreshCcw size={36} className="text-primary" />,
      title: 'Code Optimization',
      description: 'Performance auditing, code refactoring, and optimization to improve loading times and user experience.',
    },
  ];

  // Add refs to array
  const addToRefs = (el: HTMLDivElement | null): void => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline for services section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top bottom",
          end: "top 60%",
          scrub: 0.5
        }
      });

      // Animate cards with a morphing effect
      tl.fromTo(cardRefs.current, 
        { 
          opacity: 0, 
          scale: 0.3,
          rotationX: -60,
          transformOrigin: "center bottom",
          filter: "blur(10px)"
        }, 
        { 
          opacity: 1, 
          scale: 1,
          rotationX: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: {
            amount: 0.6,
            from: "start",
            grid: "auto"
          },
          ease: "back.out(1.7)"
        }
      );

      // Animate icons with a floating effect
      tl.fromTo(cardRefs.current.map(card => card?.querySelector('.service-icon')), 
        { 
          y: -30, 
          opacity: 0,
          rotation: -180,
          scale: 0.5
        }, 
        { 
          y: 0, 
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "elastic.out(1, 0.5)"
        },
        "-=0.4"
      );

      // Add continuous floating animation to icons
      cardRefs.current.forEach((card, index) => {
        const icon = card?.querySelector('.service-icon');
        if (icon) {
          gsap.to(icon, {
            y: -10,
            duration: 2 + (index * 0.2),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.3
          });
        }
      });

      // Add magnetic hover effects
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const handleMouseEnter = (e: MouseEvent): void => {
          const target = e.currentTarget as HTMLElement;
          const icon = target.querySelector('.service-icon');
          const title = target.querySelector('.service-title');
          const description = target.querySelector('.service-description');
          const iconBg = target.querySelector('.icon-bg');

          // Card transformation with magnetic effect
          gsap.to(target, {
            y: -15,
            scale: 1.05,
            rotationY: 5,
            rotationX: 5,
            z: 50,
            duration: 0.4,
            ease: "power2.out"
          });

          // Icon animation
          if (icon) {
            gsap.to(icon, {
              scale: 1.2,
              rotation: 360,
              duration: 0.5,
              ease: "back.out(1.7)"
            });
          }

          // Icon background pulse
          if (iconBg) {
            gsap.to(iconBg, {
              scale: 1.1,
              backgroundColor: "rgba(var(--color-primary-rgb), 0.1)",
              boxShadow: "0 0 30px rgba(var(--color-primary-rgb), 0.3)",
              duration: 0.3
            });
          }

          // Text animations
          if (title) {
            gsap.to(title, {
              color: "rgb(var(--color-primary-rgb))",
              duration: 0.3
            });
          }

          if (description) {
            gsap.to(description, {
              y: -5,
              duration: 0.3
            });
          }

          // Add glowing border effect
          gsap.to(target, {
            borderColor: "rgba(var(--color-primary-rgb), 0.5)",
            boxShadow: "0 10px 40px rgba(var(--color-primary-rgb), 0.2)",
            duration: 0.3
          });
        };

        const handleMouseLeave = (e: MouseEvent): void => {
          const target = e.currentTarget as HTMLElement;
          const icon = target.querySelector('.service-icon');
          const title = target.querySelector('.service-title');
          const description = target.querySelector('.service-description');
          const iconBg = target.querySelector('.icon-bg');

          gsap.to(target, {
            y: 0,
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            z: 0,
            borderColor: "transparent",
            boxShadow: "none",
            duration: 0.4,
            ease: "power2.out"
          });

          if (icon) {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.3
            });
          }

          if (iconBg) {
            gsap.to(iconBg, {
              scale: 1,
              backgroundColor: "rgb(var(--color-background-dark-rgb))",
              boxShadow: "none",
              duration: 0.3
            });
          }

          if (title) {
            gsap.to(title, {
              color: "rgb(var(--color-text-rgb))",
              duration: 0.3
            });
          }

          if (description) {
            gsap.to(description, {
              y: 0,
              duration: 0.3
            });
          }
        };

        const handleMouseMove = (e: MouseEvent): void => {
          const target = e.currentTarget as HTMLElement;
          const rect = target.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;
          
          gsap.to(target, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
        card.addEventListener('mousemove', handleMouseMove);
      });

    }, servicesRef);

    return () => ctx.revert();
  }, []);

  return (
    <AnimatedSection id="services" className="bg-background-light">
      <div className="container mx-auto">
        <SectionTitle 
          title="My Services" 
          subtitle="I offer a wide range of web development services to help bring your ideas to life." 
          centered
        />

        <div ref={servicesRef} style={{ perspective: '1000px' }}>
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service: Service, index: number) => (
              <div
                key={index}
                ref={addToRefs}
                className="card flex flex-col items-center text-center group transition-all duration-300 hover:bg-background-dark border-2 border-transparent opacity-0"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="icon-bg mb-4 p-4 rounded-full bg-background-dark group-hover:bg-background transition-all duration-300">
                  <div className="service-icon">
                    {service.icon}
                  </div>
                </div>
                <h3 className="service-title text-xl font-bold mb-3">{service.title}</h3>
                <p className="service-description text-text-secondary">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Services;