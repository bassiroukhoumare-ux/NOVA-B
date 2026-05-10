import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, Twitter, ArrowRight, MapPin, Mail, Phone, Send } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';
const Footer = () => {
  return <footer className="bg-[#E0E0E0] text-[#2C2C2C] pt-24 pb-12 relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="block">
               <img src="https://horizons-cdn.hostinger.com/05e9ca02-310b-48b9-814b-4798f423a225/c2104c771408d67dc062a65ac282c5f1.png" alt="NOVA B" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-[#2C2C2C]/80 text-sm leading-relaxed max-w-xs">Chaque projet mérite
une signature d'exception.</p>
            <div className="flex gap-4">
              {(() => {
                const storedLinks = JSON.parse(localStorage.getItem('NOVA_SOCIAL_LINKS') || '{"instagram":"","linkedin":"","facebook":"","twitter":""}');
                const items = [
                  { Icon: Instagram, url: storedLinks.instagram },
                  { Icon: Linkedin, url: storedLinks.linkedin },
                  { Icon: Facebook, url: storedLinks.facebook },
                  { Icon: Twitter, url: storedLinks.twitter } // Added Twitter
                ].filter(item => item.url);
                
                return items.length > 0 ? items.map((item, idx) => (
                  <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#2C2C2C]/10 flex items-center justify-center hover:bg-terracotta hover:text-white transition-all duration-300 group">
                    <item.Icon size={18} className="text-[#2C2C2C] group-hover:text-white transition-colors" />
                  </a>
                )) : (
                  [Instagram, Linkedin, Facebook].map((Icon, idx) => (
                    <a key={idx} href="#" className="w-10 h-10 rounded-full bg-[#2C2C2C]/10 flex items-center justify-center hover:bg-terracotta hover:text-white transition-all duration-300 group">
                      <Icon size={18} className="text-[#2C2C2C] group-hover:text-white transition-colors" />
                    </a>
                  ))
                );
              })()}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-display font-bold mb-8 text-[#2C2C2C]">Exploration</h3>
            <ul className="space-y-4">
              {['Accueil', 'Services', 'Projets', 'Contact'].map(item => <li key={item}>
                  <Link to={item === 'Accueil' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className="text-[#2C2C2C]/70 hover:text-terracotta transition-colors flex items-center gap-2 group text-sm font-medium">
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-terracotta" />
                    {item}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-display font-bold mb-8 text-[#2C2C2C]">Contact</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-[#2C2C2C]/70">
                <MapPin className="text-terracotta mt-1" size={18} />
                <span className="text-sm">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-4 text-[#2C2C2C]/70">
                <Phone className="text-terracotta" size={18} />
                <span className="text-sm">{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-4 text-[#2C2C2C]/70">
                <Mail className="text-terracotta" size={18} />
                <span className="text-sm">{CONTACT_INFO.email}</span>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
             <h3 className="text-lg font-display font-bold mb-8 text-[#2C2C2C]">Légal</h3>
             <ul className="space-y-4">
               <li>
                 <Link to="/mentions-legales" className="text-[#2C2C2C]/70 hover:text-terracotta text-sm transition-colors">Mentions Légales</Link>
               </li>
               <li>
                 <Link to="/politique-confidentialite" className="text-[#2C2C2C]/70 hover:text-terracotta text-sm transition-colors">Politique de Confidentialité</Link>
               </li>
               <li>
                 <Link to="/conditions" className="text-[#2C2C2C]/70 hover:text-terracotta text-sm transition-colors">Conditions Générales</Link>
               </li>
             </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#2C2C2C]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#2C2C2C]/60">
          <p>© 2026 NOVA B. Tous droits réservés.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;