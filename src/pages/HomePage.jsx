import React, { useState } from 'react';
import HeroSectionNOVA from '@/components/HeroSectionNOVA';
import ProjectsSlider from '@/components/ProjectsSlider';
import StatsSection from '@/components/StatsSection';
import TestimonialsSliderNOVA from '@/components/TestimonialsSliderNOVA';
import QuoteSectionNOVA from '@/components/QuoteSectionNOVA';
import { Link } from 'react-router-dom';
import { ArrowRight, Ruler, Palette, HardHat, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import usePageTracking from '@/hooks/usePageTracking';

const HomePage = () => {
  usePageTracking();
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    { 
      id: 'architecture',
      icon: Ruler, 
      title: "Architecture d'intérieur",
      shortDesc: "Conception bioclimatique et structurelle.",
      fullDesc: "Conception de plans, projection 3D, gestion complète des projets, demandes d'autorisation.",
      points: ["Plans architecturaux", "Modélisation 3D", "Gestion de projet", "Autorisations administratives"]
    },
    { 
      id: 'design',
      icon: Palette, 
      title: "Aménagement intérieur & extérieur",
      shortDesc: "Espaces immersifs et matériaux nobles.",
      fullDesc: "Ambiances personnalisées, choix des matériaux, mobilier, rendus 3D immersifs.",
      points: ["Design d'intérieur", "Sélection de matériaux", "Aménagement mobilier", "Visualisation 3D"]
    },
    { 
      id: 'construction',
      icon: HardHat, 
      title: "Construction & Réalisation", 
      shortDesc: "Suivi rigoureux et finitions parfaites.",
      fullDesc: "Réalisation complète des travaux avec un suivi rigoureux du chantier pour garantir des finitions parfaites.",
      points: ["Gros œuvre & Second œuvre", "Suivi de chantier", "Contrôle qualité", "Respect des normes"]
    }
  ];

  const reasons = [
    { title: "Approche personnalisée et créative", desc: "Chaque projet est unique. Nous créons des solutions architecturales sur-mesure adaptées à votre vision." },
    { title: "Visualisation 3D avant travaux", desc: "Découvrez votre projet en images réalistes avant le début des travaux pour valider chaque détail." },
    { title: "Respect des délais et du budget", desc: "Engagement ferme sur les plannings avec transparence totale tout au long du projet." },
    { title: "Finitions et détails haut de gamme", desc: "Sélection rigoureuse des matériaux et artisans pour garantir une qualité d'exécution exceptionnelle." },
    { title: "Interlocuteur unique", desc: "Un chef de projet dédié pour coordonner tous les aspects de votre réalisation." },
    { title: "Garantie satisfaction", desc: "Nous nous engageons à dépasser vos attentes avec un suivi post-projet complet." }
  ];

  return (
    <main className="overflow-x-hidden">
      <HeroSectionNOVA />
      
      {/* Services Section */}
      <section className="py-24 container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-terracotta font-bold tracking-[0.2em] text-sm uppercase mb-2 block">Nos Services</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Une expertise complète pour vos projets</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">De la conception à la réalisation, NOVA B vous accompagne à chaque étape avec rigueur et créativité.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <motion.div 
                key={service.id}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedService(service)}
                className="bg-white/5 p-8 rounded-[30px] border border-white/5 hover:border-terracotta/30 transition-all backdrop-blur-sm cursor-pointer group"
              >
                <div className="bg-terracotta/10 w-16 h-16 rounded-2xl flex items-center justify-center text-terracotta mb-6 group-hover:scale-110 transition-transform">
                  <service.icon size={32} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.shortDesc}</p>
                <div className="flex items-center text-terracotta font-bold text-sm">
                  Découvrir <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
        </div>
        <div className="text-center mt-12">
           <Link to="/services" className="text-white hover:text-terracotta font-bold inline-flex items-center gap-2 transition-colors border-b border-terracotta/0 hover:border-terracotta pb-1">
             Voir tous nos services <ArrowRight size={18} />
           </Link>
        </div>
      </section>

      {/* Pourquoi nous choisir Section */}
      <section className="py-24 bg-[#252525] relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-terracotta font-bold tracking-[0.2em] text-sm uppercase mb-2 block">Pourquoi NOVA B</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Pourquoi nous choisir ?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-anthracite p-8 rounded-[30px] border border-white/5 hover:border-terracotta/30 transition-colors flex gap-4"
              >
                <div className="mt-1 flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-terracotta/20 flex items-center justify-center text-terracotta">
                    <CheckCircle size={18} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{reason.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{reason.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <StatsSection />
      <ProjectsSlider />
      <QuoteSectionNOVA />
      <TestimonialsSliderNOVA />

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-anthracite border border-white/10 rounded-[40px] shadow-2xl p-8 md:p-12"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="bg-terracotta/10 w-20 h-20 rounded-3xl flex items-center justify-center text-terracotta mb-8">
                <selectedService.icon size={40} />
              </div>

              <h3 className="text-3xl font-display font-bold text-white mb-4">{selectedService.title}</h3>
              <p className="text-gray-400 text-lg mb-8">{selectedService.fullDesc}</p>

              <div className="space-y-4 mb-10">
                {selectedService.points.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-terracotta flex-shrink-0" />
                    <span className="text-white font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Link to="/contact" onClick={() => setSelectedService(null)}>
                  <button className="bg-terracotta hover:bg-terracotta/90 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg shadow-terracotta/20 flex items-center gap-2">
                    Discuter de votre projet <ArrowRight size={18} />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default HomePage;