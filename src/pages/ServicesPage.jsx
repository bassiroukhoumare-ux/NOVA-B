import React from 'react';
import { motion } from 'framer-motion';
import { Ruler, Palette, HardHat, ShieldCheck, Clock, Lightbulb } from 'lucide-react';
import usePageTracking from '@/hooks/usePageTracking';

const ServicesPage = () => {
  usePageTracking();

  const services = [
    { 
      icon: Ruler, 
      title: "Architecture", 
      desc: "Conception architecturale innovante et durable, adaptée au climat tropical. Nous créons des structures qui racontent une histoire.",
      details: ["Plans directeurs", "Études de faisabilité", "Modélisation 3D (BIM)"]
    },
    { 
      icon: Palette, 
      title: "Design Intérieur", 
      desc: "Aménagement d'espaces intérieurs qui allient esthétique et fonctionnalité. Nous créons des ambiances uniques.",
      details: ["Choix des matériaux", "Mobilier sur mesure", "Éclairage d'ambiance"]
    },
    { 
      icon: HardHat, 
      title: "Construction & Suivi", 
      desc: "Gestion complète de vos chantiers avec une rigueur technique absolue et le respect scrupuleux des délais.",
      details: ["Direction de travaux", "Contrôle qualité", "Gestion budgétaire"]
    },
    { 
      icon: ShieldCheck, 
      title: "Expertise & Conseil", 
      desc: "Accompagnement stratégique pour vos investissements immobiliers et audits techniques de bâtiments existants.",
      details: ["Audits structurels", "Conseil foncier", "Optimisation énergétique"]
    }
  ];

  return (
    <div className="min-h-screen bg-anthracite pt-32 pb-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-terracotta/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-terracotta font-bold tracking-[0.2em] text-sm uppercase mb-3 block">Expertise NOVA B</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Nos Services</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Une approche holistique de l'architecture et du design, de la première esquisse à la remise des clés.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] p-8 md:p-12 hover:border-terracotta/30 transition-all duration-500 group"
            >
              <div className="bg-terracotta/10 w-20 h-20 rounded-3xl flex items-center justify-center text-terracotta mb-8 group-hover:bg-terracotta group-hover:text-white transition-colors duration-500">
                <service.icon size={40} />
              </div>
              
              <h2 className="text-3xl font-display font-bold text-white mb-6">{service.title}</h2>
              <p className="text-lg text-gray-400 mb-8 font-light leading-relaxed">
                {service.desc}
              </p>
              
              <div className="space-y-3">
                {service.details.map((detail, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                    <span className="text-sm font-medium">{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values section */}
        <div className="mt-32 pt-32 border-t border-white/5">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {[
                { icon: Lightbulb, title: "Innovation", desc: "Nous repoussons les limites du design conventionnel." },
                { icon: Clock, title: "Précision", desc: "Le respect des délais est une valeur non-négociable." },
                { icon: ShieldCheck, title: "Durabilité", desc: "Construire pour aujourd'hui et pour les générations futures." }
              ].map((value, i) => (
                <div key={i} className="space-y-4">
                  <div className="text-white/20 flex justify-center"><value.icon size={48} /></div>
                  <h3 className="text-xl font-bold text-white">{value.title}</h3>
                  <p className="text-gray-500 text-sm">{value.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
