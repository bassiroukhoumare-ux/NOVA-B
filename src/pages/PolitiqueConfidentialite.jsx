import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const PolitiqueConfidentialite = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "1. Collecte des Données",
      content: "Nous collectons les informations que vous nous fournissez directement lorsque vous utilisez notre formulaire de contact : nom, prénom, adresse email, numéro de téléphone. Ces données sont nécessaires pour traiter votre demande et répondre à vos besoins."
    },
    {
      title: "2. Utilisation des Données",
      content: "Vos données sont utilisées exclusivement par NOVA B pour :\n- Répondre à vos demandes d'information\n- Établir des devis commerciaux\n- Vous informer sur nos nouveaux services (avec votre accord)\nElles ne sont jamais vendues ni louées à des tiers."
    },
    {
      title: "3. Sécurité et Conservation",
      content: "Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé. Vos données sont conservées pendant une durée de 3 ans à compter de notre dernier contact, sauf obligation légale contraire."
    },
    {
      title: "4. Vos Droits (RGPD)",
      content: "Conformément à la réglementation en vigueur, vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données. Pour exercer ces droits, veuillez nous contacter à l'adresse : contact@novab.com."
    },
    {
      title: "5. Cookies",
      content: "Notre site utilise des cookies techniques nécessaires au bon fonctionnement du site. Nous pouvons également utiliser des cookies de mesure d'audience anonymes pour améliorer votre expérience utilisateur."
    }
  ];

  return (
    <div className="min-h-screen bg-anthracite pt-32 pb-20 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Politique de Confidentialité</h1>
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

export default PolitiqueConfidentialite;