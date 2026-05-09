import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Phone, MessageCircle, Mail, Shield, HardHat, Map, CheckCircle } from 'lucide-react';
import DiagnosticFormModal from './DiagnosticFormModal';

const HeroSectionNOVA = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);

  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-anthracite">
      {/* Background & Overlays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-anthracite/90 via-anthracite/70 to-anthracite z-10" />
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
          className="w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1541602948150-b87a5acbd012" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40"
          />
        </motion.div>
      </div>

      {/* Lighting Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-terracotta/20 rounded-full blur-[150px] animate-pulse pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-20 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            Ici, chaque projet mérite <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta via-[#ff8c55] to-terracotta animate-shimmer bg-[length:200%_auto]">
              une signature d'exception.
            </span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl text-gray-200 mb-12 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Construire autrement, avec exigence et élégance.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center perspective-1000 mb-20">
            {/* Button 1: Contact Dropdown */}
            <div className="relative z-30">
              <motion.button
                onClick={() => setIsContactOpen(!isContactOpen)}
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-terracotta to-[#c2521f] text-white px-8 py-4 rounded-[20px] text-lg font-bold flex items-center gap-3 min-w-[220px] justify-center shadow-[0_10px_30px_rgba(211,97,43,0.4)] border border-white/10"
              >
                Nous contacter
                <ChevronDown size={20} className={`transition-transform duration-300 ${isContactOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {isContactOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95, rotateX: -10 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95, rotateX: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute top-full left-0 right-0 mt-3 bg-[#2C2C2C]/90 backdrop-blur-xl border border-white/10 rounded-[20px] overflow-hidden shadow-2xl origin-top text-left"
                  >
                     <button 
                      onClick={() => { setIsContactOpen(false); setIsDiagnosticOpen(true); }}
                      className="w-full flex items-center gap-3 px-6 py-4 hover:bg-white/10 transition-colors text-white border-b border-white/5 text-left group"
                    >
                      <div className="bg-terracotta/20 p-2 rounded-full text-terracotta group-hover:bg-terracotta group-hover:text-white transition-colors"><CheckCircle size={16} /></div>
                      <div>
                        <span className="font-bold text-sm block">Diagnostic Projet</span>
                        <span className="text-xs text-gray-400">Estimation rapide & gratuite</span>
                      </div>
                    </button>
                    <a href="tel:+2250748296768" className="flex items-center gap-3 px-6 py-4 hover:bg-white/10 transition-colors text-white border-b border-white/5">
                      <div className="bg-white/5 p-2 rounded-full"><Phone size={18} className="text-white" /></div>
                      <span className="font-medium">Appeler</span>
                    </a>
                    <a href="https://wa.me/2250748296768?text=Bonjour" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 hover:bg-white/10 transition-colors text-white border-b border-white/5">
                      <div className="bg-[#25D366]/20 p-2 rounded-full text-[#25D366]"><MessageCircle size={18} /></div>
                      <span className="font-medium">WhatsApp</span>
                    </a>
                    <a href="mailto:contact@novab.com" className="flex items-center gap-3 px-6 py-4 hover:bg-white/10 transition-colors text-white">
                      <div className="bg-cyan/20 p-2 rounded-full text-cyan"><Mail size={18} /></div>
                      <span className="font-medium">Email</span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Button 2: Discover Projects */}
            <Link to="/projets">
              <motion.button
                whileHover={{ scale: 1.05, translateY: -2, boxShadow: "0 0 25px rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/5 backdrop-blur-md border border-terracotta/50 text-white px-8 py-4 rounded-[20px] text-lg font-bold min-w-[220px] flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(211,97,43,0.1)] hover:bg-white/10 transition-all duration-300"
              >
                Découvrir nos projets
                <ArrowRight size={20} className="text-terracotta" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      <DiagnosticFormModal isOpen={isDiagnosticOpen} onClose={() => setIsDiagnosticOpen(false)} />

      {/* Bottom Minimal Band */}
      <div className="absolute bottom-0 left-0 right-0 py-4 bg-black/20 backdrop-blur-sm border-t border-white/5">
        <div className="container mx-auto px-6 flex justify-center gap-8 md:gap-16 flex-wrap">
          <div className="flex items-center gap-2 opacity-50 text-xs md:text-sm text-gray-300 font-medium">
             <Shield size={16} className="text-terracotta" /> Garantie Décennale
          </div>
          <div className="flex items-center gap-2 opacity-50 text-xs md:text-sm text-gray-300 font-medium">
             <HardHat size={16} className="text-terracotta" /> Coordination BIM
          </div>
          <div className="flex items-center gap-2 opacity-50 text-xs md:text-sm text-gray-300 font-medium">
             <Map size={16} className="text-terracotta" /> Expertise Locale
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionNOVA;