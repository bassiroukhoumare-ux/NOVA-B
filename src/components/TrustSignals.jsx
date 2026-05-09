import React from 'react';
import { motion } from 'framer-motion';
import { Users, Box, Award } from 'lucide-react';

const TrustSignals = () => {
  const signals = [
    {
      icon: Users,
      title: 'Équipe à taille humaine',
      description: 'Une équipe dédiée et passionnée qui garantit un accompagnement personnalisé et une attention aux détails pour chaque projet.'
    },
    {
      icon: Box,
      title: 'Visualisation 3D avancée',
      description: 'Technologie de modélisation 3D de pointe pour visualiser vos projets avec un réalisme exceptionnel avant leur réalisation.'
    },
    {
      icon: Award,
      title: 'Finitions premium',
      description: 'Matériaux haut de gamme et artisanat d\'excellence pour des réalisations qui dépassent les standards de qualité.'
    }
  ];

  return (
    <section id="apropos" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Pourquoi Choisir NOVA B
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Notre engagement envers l'excellence architecturale se reflète dans chaque aspect de notre travail
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {signals.map((signal, index) => (
            <motion.div
              key={signal.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className="text-center group"
            >
              <div className="w-20 h-20 bg-[#D3612B]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#D3612B] transition-all duration-300 group-hover:scale-110">
                <signal.icon className="w-10 h-10 text-[#D3612B] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {signal.title}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                {signal.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;