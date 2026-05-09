import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    { name: 'Academy', path: '/academy' },
    { name: 'Témoignages', path: '/temoignages' }
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-[#E0E0E0]/90 backdrop-blur-md shadow-md py-3" 
            : "bg-[#E0E0E0] py-4"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="relative z-50 block">
            <img 
              src="https://horizons-cdn.hostinger.com/05e9ca02-310b-48b9-814b-4798f423a225/c2104c771408d67dc062a65ac282c5f1.png" 
              alt="NOVA B" 
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "relative text-sm font-medium tracking-wide transition-colors duration-300 hover:text-terracotta",
                  location.pathname === item.path ? "text-terracotta font-semibold" : "text-[#2C2C2C]"
                )}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.span 
                    layoutId="underline" 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-terracotta" 
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-terracotta text-white px-6 py-2.5 rounded-[16px] text-sm font-semibold shadow-lg shadow-terracotta/20 transition-all duration-300 hover:shadow-terracotta/40"
              >
                Contactez-nous
              </motion.button>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 text-[#2C2C2C] p-2"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-[#E0E0E0] md:hidden flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col gap-8 text-center">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-3xl font-display font-bold transition-colors duration-300",
                    location.pathname === item.path ? "text-terracotta" : "text-[#2C2C2C]"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                to="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-8 bg-terracotta text-white px-8 py-3 rounded-[16px] text-lg font-semibold shadow-xl shadow-terracotta/20"
              >
                Contactez-nous
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;