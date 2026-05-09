import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/lib/data';

const TestimonialsSlider = () => {
  // Duplicate for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-gradient-to-b from-[#2C2C2C] to-[#252525] overflow-hidden">
      <div className="container mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-terracotta text-sm font-bold tracking-widest uppercase mb-4 block">Témoignages</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 uppercase tracking-tight">
            LA CONFIANCE DE NOS CLIENTS
          </h2>
          <div className="w-20 h-1 bg-terracotta mx-auto rounded-full" />
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Gradients for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#2C2C2C] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#2C2C2C] to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex gap-8 w-max pl-6"
          animate={{ x: [0, -2000] }} // Adjust based on width
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="w-[350px] md:w-[450px] glassmorphism p-8 rounded-2xl flex-shrink-0 relative group border border-white/5 hover:border-terracotta/30 transition-colors bg-white/5"
            >
              <Quote className="absolute top-6 right-6 text-white/5 group-hover:text-terracotta/10 transition-colors" size={40} />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-terracotta to-transparent">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full rounded-full object-cover border-2 border-[#2C2C2C]"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-terracotta text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#D3612B" className="text-terracotta" />
                ))}
              </div>
              
              <p className="text-gray-300 italic leading-relaxed font-light">
                "{testimonial.message}"
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;