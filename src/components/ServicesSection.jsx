import React from 'react';
import { motion } from 'framer-motion';
import { Ruler, Palette, HardHat, Lightbulb } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Ruler,
      title: 'Architecture',
      description: 'Conception visionnaire alliant esthétique pure et fonctionnalité technique.'
    },
    {
      icon: Palette,
      title: 'Décoration Intérieure',
      description: 'Création d\'atmosphères immersives qui racontent votre histoire.'
    },
    {
      icon: HardHat,
      title: 'Construction',
      description: 'Maîtrise d\'œuvre rigoureuse pour une réalisation sans compromis.'
    },
    {
      icon: Lightbulb,
      title: 'Conseil en Design',
      description: 'Stratégie spatiale pour optimiser chaque mètre carré de votre projet.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section className="py-32 bg-anthracite relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-terracotta text-sm font-bold tracking-widest uppercase mb-4 block">Notre Expertise</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            Domaines d'Excellence
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -15, 
                rotateX: 5, 
                boxShadow: "0 25px 50px -12px rgba(211, 97, 43, 0.25)"
              }}
              className="glassmorphism p-8 rounded-2xl group cursor-pointer relative overflow-hidden perspective-1000 transform-style-3d border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 text-white group-hover:bg-terracotta group-hover:text-white transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg border border-white/10">
                  <service.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-display font-bold mb-4 text-white group-hover:text-terracotta transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;