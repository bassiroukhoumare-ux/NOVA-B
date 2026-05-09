import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageCircle, Mail, ChevronDown, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import DiagnosticFormModal from './DiagnosticFormModal';

const GlassmorphicHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projets', path: '/projets' },
    { name: 'Actualités', path: '/actualites' },
    { name: 'A Propos', path: '/a-propos' }
  ];

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className={cn(
            "w-full max-w-6xl rounded-full transition-all duration-300 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]",
            "bg-[#2C2C2C]/80" 
          )}
        >
          <div className="px-6 md:px-8 py-3 flex items-center justify-between">
            <Link to="/" className="relative z-50 block group">
              <img 
                src="https://horizons-cdn.hostinger.com/05e9ca02-310b-48b9-814b-4798f423a225/fb7b17fa133b1878a85011680feb30b7.png" 
                alt="NOVA B" 
                className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "relative text-sm font-bold tracking-wide transition-colors duration-300 font-sans",
                    location.pathname === item.path ? "text-terracotta" : "text-white/90 hover:text-white"
                  )}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.span 
                      layoutId="underline" 
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-terracotta shadow-[0_0_10px_#D3612B]" 
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Contact Dropdown */}
            <div className="hidden md:block relative">
              <motion.button
                onClick={() => setIsContactOpen(!isContactOpen)}
                onBlur={() => setTimeout(() => setIsContactOpen(false), 200)}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(211, 97, 43, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#D3612B] to-[#ff8c55] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-terracotta/20 transition-all duration-300 flex items-center gap-2 border border-white/10"
              >
                TU AS UN PROJET ?
                <ChevronDown size={16} className={`transition-transform duration-300 ${isContactOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {isContactOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-[#2C2C2C]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 origin-top-right"
                  >
                    <button 
                      onClick={() => setIsDiagnosticOpen(true)}
                      className="w-full flex items-center gap-3 px-5 py-4 hover:bg-white/10 transition-colors text-white border-b border-white/5 text-left group"
                    >
                      <div className="bg-terracotta/20 p-2 rounded-full text-terracotta group-hover:bg-terracotta group-hover:text-white transition-colors"><CheckCircle size={16} /></div>
                      <div>
                        <span className="font-bold text-sm block">Diagnostic Projet</span>
                        <span className="text-xs text-gray-400">Estimation rapide & gratuite</span>
                      </div>
                    </button>
                    
                    <a href="tel:+2250748296768" className="flex items-center gap-3 px-5 py-4 hover:bg-white/10 transition-colors text-white border-b border-white/5">
                      <div className="bg-white/5 p-2 rounded-full"><Phone size={16} className="text-white" /></div>
                      <span className="font-medium text-sm">Appeler</span>
                    </a>
                    
                    <a href="https://wa.me/2250748296768?text=Bonjour%20NOVA%20B,%20je%20souhaite%20discuter%20d'un%20projet." target="_blank" rel="noreferrer" className="flex items-center gap-3 px-5 py-4 hover:bg-white/10 transition-colors text-white border-b border-white/5">
                      <div className="bg-[#25D366]/20 p-2 rounded-full"><MessageCircle size={16} className="text-[#25D366]" /></div>
                      <span className="font-medium text-sm">WhatsApp</span>
                    </a>

                    <a href="mailto:contact@novab.com" className="flex items-center gap-3 px-5 py-4 hover:bg-white/10 transition-colors text-white">
                      <div className="bg-cyan/20 p-2 rounded-full"><Mail size={16} className="text-cyan" /></div>
                      <span className="font-medium text-sm">Email</span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-50 text-white p-2"
            >
              <Menu size={24} />
            </button>
          </div>
        </motion.header>
      </div>

      <DiagnosticFormModal isOpen={isDiagnosticOpen} onClose={() => setIsDiagnosticOpen(false)} />

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-[#2C2C2C]/95 backdrop-blur-xl border-l border-white/10 shadow-2xl p-8 flex flex-col overflow-y-auto"
            >
              <div className="flex justify-end mb-8">
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2 rounded-full hover:bg-white/10">
                  <X size={24} />
                </button>
              </div>

              <div className="mb-8 pl-4">
                 <img 
                  src="https://horizons-cdn.hostinger.com/05e9ca02-310b-48b9-814b-4798f423a225/fb7b17fa133b1878a85011680feb30b7.png" 
                  alt="NOVA B" 
                  className="h-12 w-auto object-contain"
                />
              </div>

              <nav className="flex flex-col gap-6 mb-8">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block text-2xl font-display font-bold transition-all duration-300 hover:pl-4",
                        location.pathname === item.path 
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-terracotta to-white" 
                          : "text-white hover:text-terracotta"
                      )}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-3 pb-8">
                <button onClick={() => { setIsMobileMenuOpen(false); setIsDiagnosticOpen(true); }} className="w-full bg-gradient-to-r from-terracotta to-[#ff8c55] text-white py-4 px-4 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-terracotta/20 mb-4 font-bold">
                  <CheckCircle size={18} />
                  Diagnostic Projet
                </button>
                
                <a href="tel:+2250748296768" className="w-full bg-white/5 hover:bg-white/10 text-white py-3 px-4 rounded-xl flex items-center gap-3 transition-colors">
                  <Phone size={18} className="text-terracotta" />
                  <span className="font-medium">Appeler</span>
                </a>
                
                <a href="https://wa.me/2250748296768?text=Bonjour" target="_blank" rel="noreferrer" className="w-full bg-white/5 hover:bg-white/10 text-white py-3 px-4 rounded-xl flex items-center gap-3 transition-colors">
                  <MessageCircle size={18} className="text-[#25D366]" />
                  <span className="font-medium">WhatsApp</span>
                </a>

                 <a href="mailto:contact@novab.com" className="w-full bg-white/5 hover:bg-white/10 text-white py-3 px-4 rounded-xl flex items-center gap-3 transition-colors">
                  <Mail size={18} className="text-cyan" />
                  <span className="font-medium">Email</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlassmorphicHeader;