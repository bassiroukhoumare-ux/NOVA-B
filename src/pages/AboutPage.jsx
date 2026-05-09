import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '@/lib/db'; // Dynamic team data
import { Target, CheckCircle, PenTool, Layout, Home, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';
import usePageTracking from '@/hooks/usePageTracking';

const AboutPage = () => {
  usePageTracking();
  const [team, setTeam] = useState([]);

  useEffect(() => {
    setTeam(db.getTeam());
  }, []);

  return (
    <div className="bg-anthracite min-h-screen pt-24 overflow-hidden">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracotta/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
          >
            À Propos de <span className="text-terracotta">NOVA B</span>
          </motion.h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-terracotta to-transparent mx-auto" />
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#252525]/80 backdrop-blur-md border border-white/5 p-10 md:p-14 rounded-[40px] shadow-2xl"
          >
            <h2 className="text-3xl font-display font-bold text-white mb-8">Notre Histoire</h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-light">
              <p>
                NOVA B est née d'une vision audacieuse : fusionner l'excellence technique internationale avec l'âme architecturale africaine. Fondée à Abidjan, notre agence s'est rapidement imposée comme un acteur incontournable de l'architecture de luxe et de la construction durable.
              </p>
              <p>
                Nous croyons que chaque bâtiment doit raconter une histoire, celle de ses occupants et de son environnement. Notre approche holistique, allant de la conception structurelle au design intérieur le plus fin, garantit une cohérence absolue à chaque projet.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nos Services */}
      <section className="py-20 bg-[#252525] relative">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-display font-bold text-white mb-16 text-center">Nos Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { icon: Layout, title: "Architecture & Maîtrise d'œuvre", desc: "Conception complète, du permis de construire au suivi de chantier rigoureux." },
              { icon: PenTool, title: "Décoration Intérieure & Extérieure", desc: "Création d'ambiances uniques, choix des matériaux nobles et mobilier sur mesure." },
              { icon: Home, title: "Construction & Rénovation", desc: "Réalisation clé en main avec garantie de délais et de budget maîtrisés." },
              { icon: Monitor, title: "Visualisation & Conseil Technique", desc: "Rendus 3D photoréalistes et études de faisabilité technique." }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="flex gap-6 bg-anthracite p-8 rounded-[30px] border border-white/5 shadow-xl hover:shadow-terracotta/10 transition-all"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-terracotta to-[#ff8c55] rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <service.icon size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-white mb-4">Notre Équipe</h2>
          <div className="w-16 h-1 bg-terracotta mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {team.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white/5 p-8 rounded-[40px] border border-white/5 text-center group hover:bg-white/10 transition-colors"
            >
              <div className="relative w-40 h-40 mx-auto mb-6">
                <div className="absolute inset-0 bg-terracotta rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover rounded-full border-4 border-[#2C2C2C] relative z-10" 
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-terracotta font-medium mb-4 uppercase text-xs tracking-widest">{member.role}</p>
              <p className="text-gray-400 text-sm mb-6">{member.bio}</p>
              
              <Link to="/contact">
                <button className="text-white bg-white/10 hover:bg-terracotta px-6 py-2 rounded-full text-sm font-bold transition-colors">
                  Contacter
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;