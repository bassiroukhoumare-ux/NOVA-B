import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/lib/data';

const TestimonialsSliderNOVA = () => {
  // Triple array for super smooth infinite loop
  const loopTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-32 bg-gradient-to-b from-[#252525] to-anthracite overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-terracotta/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 mb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-terracotta font-bold tracking-widest text-sm uppercase mb-3 block">Avis Clients</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white">Ce qu'ils disent de nous</h2>
        </motion.div>
      </div>

      <div className="relative w-full">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-anthracite to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-anthracite to-transparent z-20 pointer-events-none" />
        
        <motion.div
          className="flex gap-8 w-max px-8"
          animate={{ x: [0, -2000] }} 
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50,
              ease: "linear",
            },
          }}
        >
          {loopTestimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.id}-${index}`}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
              className="w-[400px] bg-white/5 backdrop-blur-md border border-white/5 p-10 rounded-[30px] flex-shrink-0 relative group transition-colors duration-300"
            >
              <div className="absolute -top-4 -right-4 bg-terracotta text-white p-3 rounded-full shadow-lg transform rotate-12 group-hover:rotate-0 transition-all duration-300">
                <Quote size={20} fill="currentColor" />
              </div>
              
              <div className="flex items-center gap-4 mb-8">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/10 group-hover:border-terracotta transition-colors"
                />
                <div>
                  <h4 className="text-white font-bold text-lg font-display">{testimonial.name}</h4>
                  <p className="text-terracotta text-sm font-medium">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#D3612B" className="text-terracotta" />
                ))}
              </div>
              
              <p className="text-gray-300 italic leading-relaxed font-light">
                "{testimonial.message}"
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSliderNOVA;