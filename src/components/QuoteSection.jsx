import React from 'react';
import { motion } from 'framer-motion';

const QuoteSection = () => {
  return (
    <section className="py-32 bg-anthracite relative border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="mb-10 relative inline-block">
            <span className="text-6xl text-terracotta absolute -top-8 -left-12 opacity-50 font-serif">"</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
              Nous ne construisons pas des murs,<br />
              nous bâtissons <span className="text-terracotta">votre héritage.</span>
            </h2>
            <span className="text-6xl text-terracotta absolute -bottom-12 -right-12 opacity-50 font-serif">"</span>
          </div>
          
          <div className="h-px w-24 bg-terracotta/50 mx-auto mb-10"></div>
          
          <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
            À Abidjan, NOVA B s'engage sur trois piliers non négociables : la <strong className="text-white">Rigueur Structurelle</strong> (respect des normes parasismiques et climatiques), l'<strong className="text-white">Élégance Signature</strong> et la <strong className="text-white">Transparence Financière</strong>. Votre projet est entre des mains expertes, de l'esquisse à la réalité.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteSection;