import React from 'react';
import { motion } from 'framer-motion';

const QuoteSectionNOVA = () => {
  return (
    <section className="py-32 bg-anthracite relative flex items-center justify-center overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative inline-block mb-12">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
              <span className="text-terracotta text-7xl font-serif absolute -top-8 -left-8 opacity-40">"</span>
              Nous ne construisons pas des murs,<br />
              nous bâtissons <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta to-[#ff9a6a]">votre héritage.</span>
              <span className="text-terracotta text-7xl font-serif absolute -bottom-10 -right-8 opacity-40">"</span>
            </h2>
          </div>
          
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-terracotta to-transparent mx-auto mb-12" />
          
          <p className="text-xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
            À Abidjan, NOVA B s'engage sur trois piliers non négociables : la <strong className="text-white">Rigueur Structurelle</strong>, l'<strong className="text-white">Élégance Signature</strong> et la <strong className="text-white">Transparence Financière</strong>. 
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteSectionNOVA;