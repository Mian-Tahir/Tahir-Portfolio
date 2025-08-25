import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechCorp Inc.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    text: 'Tahir Mehmood built our e-commerce platform using the MERN stack with exceptional attention to detail. His expertise in MongoDB, Express.js, React, and Node.js resulted in a scalable, high-performance application. The RESTful APIs he developed are robust and well-documented, making integration seamless for our team.',
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'CTO',
    company: 'StartUp Innovations',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    text: 'Tahir Mehmood transformed our startup with his MERN stack expertise. He developed a full-stack application with React frontend, Node.js backend, and MongoDB database. His implementation of JWT authentication and RESTful APIs made our platform secure and scalable. The real-time features he added using Socket.io enhanced user engagement significantly.',
  },
  {
    id: 3,
    name: 'Emily Chen',
    role: 'CEO',
    company: 'DesignHub',
    image: 'https://images.pexels.com/photos/3771807/pexels-photo-3771807.jpeg',
    text: 'Working with Tahir Mehmood on our MERN stack project was outstanding. His proficiency in React.js for the frontend and Node.js/Express for the backend created a seamless user experience. The MongoDB database design he implemented is efficient and well-structured. His code is clean, maintainable, and follows best practices.',
  },
  {
    id: 4,
    name: 'David Williams',
    role: 'Marketing Director',
    company: 'Global Solutions',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    text: 'Tahir Mehmood developed our customer portal using the MERN stack with impressive results. His React.js frontend provides an intuitive user interface, while his Node.js backend handles complex business logic efficiently. The MongoDB integration he implemented allows for flexible data management. His 1.5+ years of MERN experience is evident in the quality of his work.',
  },
];

const Testimonials: React.FC = () => {
  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const next = () => {
    setCurrent((current + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(interval);
  }, [current, autoplay, next]);

  return (
    <AnimatedSection id="testimonials" className="bg-background-light">
      <div className="container mx-auto">
        <SectionTitle 
          title="Client Testimonials" 
          subtitle="Hear what my clients have to say about my work and collaboration." 
          centered
        />

        <div 
          ref={ref}
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="card p-8"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/30">
                        <img 
                          src={testimonials[current].image} 
                          alt={testimonials[current].name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -top-4 -left-4 bg-primary p-2 rounded-full text-white">
                        <Quote size={20} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg text-text-secondary italic mb-6">"{testimonials[current].text}"</p>
                    <div>
                      <h4 className="text-xl font-bold">{testimonials[current].name}</h4>
                      <p className="text-text-secondary">
                        {testimonials[current].role} at {testimonials[current].company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-background-lighter text-white hover:bg-primary transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    current === index ? 'bg-primary w-6' : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-full bg-background-lighter text-white hover:bg-primary transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Testimonials;