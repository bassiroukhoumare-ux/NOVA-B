import React from 'react';
import { motion } from 'framer-motion';
import useTeam from '@/hooks/useTeam';
import { Target, CheckCircle, PenTool, Layout, Home, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';
import usePageTracking from '@/hooks/usePageTracking';

const AboutPage = () => {
  usePageTracking();
  const { team, loading } = useTeam();

  const methodologySteps = [
    { number: "01", title: "Écoute & immersion", desc: "Compréhension profonde de vos besoins et de votre vision." },
    { number: "02", title: "Esquisses & rendus 3D", desc: "Premières propositions visuelles et spatiales." },
    { number: "03", title: "Validation technique", desc: "Étude de faisabilité, chiffrage précis et démarches administratives." },
    { number: "04", title: "Réalisation", desc: "Suivi de chantier rigoureux par nos équipes dédiées." },
    { number: "05", title: "Livraison & suivi", desc: "Remise des clés et accompagnement post-projet." }
  ];

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

      {/* Méthodologie */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-terracotta font-bold tracking-[0.2em] text-sm uppercase mb-2 block">Processus</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Notre méthodologie éprouvée</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Chaque projet suit un processus rigoureux pour garantir un résultat final à la hauteur de vos attentes.</p>
          </div>

          <div className="relative mt-20">
            <div className="hidden md:block absolute top-[28px] left-10 right-10 h-0.5 bg-white/10" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
              {methodologySteps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-14 h-14 rounded-full bg-anthracite border-2 border-white/10 flex items-center justify-center text-lg font-display font-bold text-gray-400 group-hover:border-terracotta group-hover:text-terracotta transition-colors mb-6 shadow-xl">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 leading-tight">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed px-2">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Contact */}
      <section className="py-32 bg-[#252525] container mx-auto px-6 rounded-t-[40px] text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl bg-terracotta/5 rounded-full blur-[100px] pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Vous avez un projet ?</h2>
          <p className="text-xl text-gray-400 mb-10 leading-relaxed">
            Notre équipe d'experts est prête à transformer votre vision en réalité. Discutons ensemble de vos idées et de la meilleure façon de les concrétiser.
          </p>
          <Link to="/contact">
            <button className="bg-terracotta hover:bg-terracotta/90 text-white font-bold py-4 px-10 rounded-full text-lg transition-all shadow-[0_0_20px_rgba(204,88,51,0.4)] hover:shadow-[0_0_30px_rgba(204,88,51,0.6)] inline-flex items-center gap-3 group">
              Cliquez ici pour nous contacter
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;