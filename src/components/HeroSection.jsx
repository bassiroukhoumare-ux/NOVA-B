import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-anthracite">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-anthracite via-anthracite to-[#1a1a1a]" />
        
        {/* Animated Gradient Orbs */}
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-terracotta/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[100px]" 
        />
        
        {/* Geometric Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
            <span className="text-sm font-medium tracking-widest uppercase text-terracotta">L'Excellence NOVA B</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight tracking-tight">
            Ici, chaque projet mérite <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta via-white to-terracotta animate-shine bg-300%">
              une signature d'exception.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            Construire autrement, avec exigence et élégance.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Primary CTA */}
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(211, 97, 43, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-terracotta text-white px-8 py-4 rounded-[16px] text-lg font-bold flex items-center gap-2 min-w-[220px] justify-center shadow-2xl shadow-terracotta/20 border border-white/10"
              >
                Nous contacter
                <ArrowRight size={20} />
              </motion.button>
            </Link>

            {/* Secondary CTA */}
            <Link to="/projets">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-[16px] text-lg font-bold min-w-[220px] flex items-center justify-center gap-2 hover:border-terracotta hover:text-terracotta transition-colors duration-300"
              >
                Découvrir nos projets
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Découvrir</span>
        <ChevronDown className="text-terracotta" size={24} />
      </motion.div>
    </section>
  );
};

export default HeroSection;