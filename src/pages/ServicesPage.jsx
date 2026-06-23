import React from 'react';
import { motion } from 'framer-motion';
import { Ruler, Palette, HardHat, ShieldCheck, Clock, Lightbulb } from 'lucide-react';
import usePageTracking from '@/hooks/usePageTracking';

const ServicesPage = () => {
  usePageTracking();

  const services = [
    { 
      icon: Ruler, 
      title: "Architecture d'intérieur",
      headline: "L'art du détail, du gros œuvre aux finitions.",
      desc: "Vous avez un projet de construction ou d'extension ? Dès que le gros œuvre est achevé, nos architectes d'intérieur prennent le relais pour transformer les volumes bruts en un lieu de vie exceptionnel. Cloisonnement intelligent, optimisation de la lumière, choix de matériaux nobles et aménagement sur mesure : nous orchestrons chaque détail pour vous offrir des finitions premium et un résultat clé en main qui dépasse vos attentes.",
      details: ["Plan d'exécution", "Modélisation 3D PHOTO RÉALISTE", "Études de faisabilité"]
    },
    { 
      icon: Palette, 
      title: "Aménagement intérieur & extérieur",
      headline: "De la structure à l'émotion : l'harmonie parfaite.",
      desc: "Nous donnons vie à vos projets les plus ambitieux en prenant en charge l'intégralité de votre aménagement et de votre décoration, à l'intérieur comme à l'extérieur. Dès la fin du gros œuvre ou lors d'une rénovation d'envergure, nous concevons des agencements sur mesure (dressings, pool-houses, bibliothèques) et sélectionnons des pièces de designers, des tissus d'éditeurs et des finitions premium. Notre approche globale garantit une cohérence esthétique absolue : votre jardin répond à votre séjour, vos terrasses prolongent vos chambres, et chaque détail respire l'excellence.",
      details: ["Choix des matériaux", "Mobilier sur mesure", "Éclairage d'ambiance"]
    },
    { 
      icon: HardHat, 
      title: "Construction & Suivi",
      headline: "Donner vie à vos plans : de la terre à la matière.",
      desc: "Confiez-nous votre vision, nous la sortons de terre. Notre service Construction prend en charge l'intégralité du gros œuvre avec une exigence de qualité absolue. Maçonnerie, charpente, isolation haute performance : nous orchestrons chaque étape technique du chantier. Parce que nous anticipons déjà l'aménagement et la décoration future, nous construisons avec une précision millimétrée. Une prise en charge totale pour un chantier serein et des volumes parfaitement préparés à recevoir vos finitions haut de gamme.",
      details: ["Direction de travaux", "Contrôle qualité", "Gestion budgétaire"]
    },
    { 
      icon: ShieldCheck, 
      title: "Expertise & Conseil",
      headline: "L'expertise technique au service de vos ambitions.",
      desc: "Parce qu'un bon projet repose sur un diagnostic précis, nous mettons notre savoir-faire à votre service à travers nos prestations de conseil et d'expertise. Audit technique du bâtiment, étude de faisabilité architecturale, optimisation budgétaire ou conseil en design d'espace : nous intervenons en amont de vos chantiers pour vous guider pas à pas. Avancez sereinement, épaulé par des professionnels du bâtiment et du design.",
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
            Nous vous accompagnons à chaque étape de votre projet, du premier plan jusqu'à la remise des clés. Conception, aménagement, construction et décoration : une équipe unique pour donner vie à vos espaces.
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
              
              <h2 className="text-3xl font-display font-bold text-white mb-4">{service.title}</h2>
              {service.headline && <p className="text-terracotta text-lg font-semibold mb-4">{service.headline}</p>}
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
