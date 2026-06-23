import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const MentionsLegales = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "1. Éditeur du Site",
      content: "Le site internet NOVA B est édité par la société NOVA B Architecture, SARL au capital de 1 000 000 FCFA.\nSiège social : Abidjan, Côte d'Ivoire\nImmatriculée au RCCM d'Abidjan.\nDirecteur de la publication : Direction NOVA B\nContact : contact@nova-b.com | +225 07 49 24 22 22"
    },
    {
      title: "2. Hébergement",
      content: "Le site est hébergé par Hostinger International Ltd.\n61 Lordou Vironos Street, 6023 Larnaca, Chypre.\nLe stockage des données personnelles des utilisateurs est réalisé sur les centres de données localisés en Europe, conformes au RGPD."
    },
    {
      title: "3. Propriété Intellectuelle",
      content: "L'ensemble de ce site relève de la législation internationale sur le droit d'auteur, le droit des marques et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques (images, graphismes, logos, etc.). La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication."
    },
    {
      title: "4. Responsabilité",
      content: "Les informations communiquées sur le site sont fournies à titre indicatif. NOVA B ne saurait être tenu pour responsable des erreurs, omissions ou d'une absence de disponibilité des informations. L'utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive."
    }
  ];

  return (
    <div className="min-h-screen bg-anthracite pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-terracotta/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Mentions Légales</h1>
          <div className="w-20 h-1 bg-terracotta mx-auto rounded-full" />
        </motion.div>
        
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 p-8 rounded-[30px] border border-white/5 backdrop-blur-sm"
            >
              <h2 className="text-2xl text-terracotta font-bold mb-4 font-display">{section.title}</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line font-light">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;