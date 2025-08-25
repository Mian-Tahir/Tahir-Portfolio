import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import { Calendar, GraduationCap, Briefcase } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const aboutRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationItemsRef = useRef<HTMLDivElement>(null);
  const certificationItemsRef = useRef<HTMLDivElement>(null);
  const experienceItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline for about section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate education section
      tl.fromTo(educationRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.8 }
      );

      // Animate education items
      if (educationItemsRef.current?.children) {
        tl.fromTo([...educationItemsRef.current.children], 
          { opacity: 0, y: 30, scale: 0.95 }, 
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.2 },
          "-=0.4"
        );
      }

      // Animate certifications section
      tl.fromTo(certificationsRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.3"
      );

      // Animate certification items
      if (certificationItemsRef.current?.children) {
        tl.fromTo([...certificationItemsRef.current.children], 
          { opacity: 0, y: 30, scale: 0.95 }, 
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15 },
          "-=0.4"
        );
      }

      // Animate experience section
      tl.fromTo(experienceRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );

      // Animate experience items
      if (experienceItemsRef.current?.children) {
        tl.fromTo([...experienceItemsRef.current.children], 
          { opacity: 0, y: 30, scale: 0.95 }, 
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.2 },
          "-=0.4"
        );
      }

      // Add hover animations for cards
      const cards = aboutRef.current?.querySelectorAll('.card');
      cards?.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { scale: 1.02, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
      });

    }, aboutRef);

    return () => ctx.revert();
  }, []);

  const education = [
    {
      degree: 'BS Computer Science',
      institution: 'University of Agriculture Faisalabad',
      duration: '09/2019 - 06/2023',
      description: 'CGPA: 3.14/4',
    },
    {
      degree: 'FSC Pre Engineering',
      institution: 'Govt Post Graduate College Gojra',
      duration: '08/2017 - 04/2019',
      description: '',
    },
  ];

  const certifications = [
    {
      name: 'Learn MERN Stack Development',
      institution: 'Knowledge Stream',
      year: '09/2023 - 12/2023',
    },
    {
      name: 'Learn Front End Development',
      institution: 'PNY Training and Institutions',
      year: '05/2022 - 07/2022',
    },
  ];

  const experience = [
    {
      position: 'Mernstack Developer',
      company: 'Minibyte.Ai',
      duration: '09/2024 - Present, Rawalpindi',
      responsibilities: [
        'Built and maintained production-grade SaaS platforms using React.js, Node.js, Express.js and MongoDB',
        'Integrated third-party and Python APIs including Vapi.ai,Bolna.ai, and OCR engines for AI-driven automation.',
        'Collaborated in agile teams to deliver production-ready features for voice agents, dashboards, annotation tool, Graph OCR system, and hotel management platforms.',
        'Implemented Git-based version control workﬂows to improving deployment eﬃciency.',
      ],
    },
    {
      position: 'Junior MernStack Developer',
      company: 'CortechSols pvt Ltd',
      duration: '03/2024 - 07/2024, Rawalpindi',
      responsibilities: [
        'Developed scalable web applications using the MERN stack.',
        'Collaborated on cross-functional teams for design and deployment.',
        'Developed MERN stack apps using Redux and Redux Toolkit and RESTful APIs for scalable, maintainable solutions.',
        'Used Git/GitHub for version control and explored Next.js fundamentals to enhance frontend skills.',
      ],
    },
    {
      position: 'Full Stack Developer',
      company: 'Slash Byte',
      duration: '12/2023 - 03/2024, Faisalabad',
      responsibilities: [
        'Acquired practical experience in building full-stack applications using React.js, Node.js, Express.js, and Material UI.',
        'Contributed to agile teams in delivering responsive frontend and scalable backend web solutions.',
        'Utilized Git and GitHub for version control, collaborative development, and workﬂow management.',
      ],
    },
  ];

  return (
    <AnimatedSection id="about" className="bg-background-light">
      <div className="container mx-auto">
        <SectionTitle 
          title="About Me" 
          subtitle="Here you will find information about my educational background, certifications, and professional experience."
        />

        <div ref={aboutRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education & Certifications */}
          <div>
            <div className="mb-10">
              <h3 ref={educationRef} className="text-2xl font-bold mb-6 flex items-center opacity-0">
                <GraduationCap className="mr-3 text-primary" />
                Education
              </h3>
              <div ref={educationItemsRef} className="space-y-8">
                {education.map((item, index) => (
                  <div
                    key={index}
                    className="card hover:shadow-primary transition duration-300 cursor-pointer opacity-0"
                  >
                    <h4 className="text-lg font-semibold">{item.degree}</h4>
                    <p className="text-text-secondary">{item.institution}</p>
                    <div className="flex items-center text-text-muted mt-2">
                      <Calendar size={14} className="mr-2" />
                      <span>{item.duration}</span>
                    </div>
                    <p className="mt-2 text-text-secondary">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 ref={certificationsRef} className="text-2xl font-bold mb-6 flex items-center opacity-0">
                <Calendar className="mr-3 text-primary" />
                Certifications
              </h3>
              <div ref={certificationItemsRef} className="space-y-4">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="card hover:shadow-primary transition duration-300 cursor-pointer opacity-0"
                  >
                    <h4 className="text-lg font-semibold">{cert.name}</h4>
                    <p className="text-text-secondary">{cert.institution}</p>
                    <div className="flex items-center text-text-muted mt-2">
                      <Calendar size={14} className="mr-2" />
                      <span>{cert.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h3 ref={experienceRef} className="text-2xl font-bold mb-6 flex items-center opacity-0">
              <Briefcase className="mr-3 text-primary" />
              Professional Experience
            </h3>
            <div ref={experienceItemsRef} className="space-y-8">
              {experience.map((job, index) => (
                <div
                  key={index}
                  className="card hover:shadow-primary transition duration-300 cursor-pointer opacity-0"
                >
                  <h4 className="text-lg font-semibold">{job.position}</h4>
                  <p className="text-text-secondary">{job.company}</p>
                  <div className="flex items-center text-text-muted mt-2">
                    <Calendar size={14} className="mr-2" />
                    <span>{job.duration}</span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {job.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-text-secondary">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default About;