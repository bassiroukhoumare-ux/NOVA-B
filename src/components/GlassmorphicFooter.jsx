import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

const GlassmorphicFooter = () => {
  return (
    <footer className="bg-[#2C2C2C] text-white pt-24 pb-10 relative overflow-hidden border-t border-white/5">
      {/* Glow Effect Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-terracotta to-transparent opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/">
              <img 
                src="https://horizons-cdn.hostinger.com/05e9ca02-310b-48b9-814b-4798f423a225/fb7b17fa133b1878a85011680feb30b7.png" 
                alt="NOVA B" 
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Chaque projet mérite une signature d'exception. Architecture et design visionnaire pour l'Afrique de demain.
            </p>
            <div className="flex gap-4 pt-4">
              {[Instagram, Linkedin, Facebook].map((Icon, idx) => (
                <a 
                  key={idx}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-terracotta hover:border-terracotta text-gray-400 hover:text-white transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-bold text-white mb-8 font-display">Navigation</h3>
            <ul className="space-y-4">
              {['À Propos', 'Services', 'Projets', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'À Propos' ? '/a-propos' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-terracotta transition-colors flex items-center gap-2 text-sm group"
                  >
                    {item}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-1 group-hover:translate-y-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-8 font-display">Contact</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-gray-400">
                <MapPin className="text-terracotta mt-1 flex-shrink-0" size={18} />
                <span className="text-sm">Abidjan, Côte d'Ivoire</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400">
                <Phone className="text-terracotta flex-shrink-0" size={18} />
                <span className="text-sm">+225 07 48 29 67 68</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400">
                <Mail className="text-terracotta flex-shrink-0" size={18} />
                <span className="text-sm">contact@novab.com</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
             <h3 className="text-lg font-bold text-white mb-8 font-display">Légal</h3>
             <ul className="space-y-4">
               {['Mentions Légales', 'Politique de Confidentialité', 'Conditions'].map((item, i) => (
                 <li key={i}>
                   <Link 
                     to={`/${item.toLowerCase().replace(/ /g, '-').replace('é', 'e')}`}
                     className="text-gray-400 hover:text-terracotta text-sm transition-colors"
                   >
                     {item}
                   </Link>
                 </li>
               ))}
             </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 NOVA B. Tous droits réservés.</p>
          <p className="text-xs">Designed for BSK.</p>
        </div>
      </div>
    </footer>
  );
};

export default GlassmorphicFooter;