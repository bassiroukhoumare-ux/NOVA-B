import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-anthracite">
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-terracotta/5 rounded-full blur-[150px] animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 leading-tight">
            Prêt à transformer <br />
            <span className="text-terracotta">votre vision ?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Collaborons pour créer un espace qui transcende l'ordinaire. L'excellence architecturale commence ici.
          </p>
          
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(211, 97, 43, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-terracotta text-white px-10 py-5 rounded-[16px] text-xl font-bold flex items-center justify-center gap-3 mx-auto shadow-2xl shadow-terracotta/30 border border-white/10"
            >
              Commencer votre projet
              <ArrowRight size={24} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;