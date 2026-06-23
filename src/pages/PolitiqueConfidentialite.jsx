import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const PolitiqueConfidentialite = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "1. Préambule et Champ d'application",
      content: "La présente politique de confidentialité a pour but d'informer les utilisateurs du site NOVA B sur la manière dont leurs données personnelles sont collectées, traitées et protégées. NOVA B s'engage à ce que la collecte et le traitement de vos données, effectués à partir du site, soient conformes au Règlement Général sur la Protection des Données (RGPD) ainsi qu'aux lois locales applicables. Cette politique s'applique à tous les services proposés sur notre plateforme en ligne."
    },
    {
      title: "2. Données Personnelles Collectées",
      content: "Lors de votre navigation ou de l'utilisation de nos formulaires de contact, nous sommes susceptibles de collecter les données suivantes :\n- Informations d'identification : nom, prénom, adresse e-mail, numéro de téléphone.\n- Informations professionnelles : nom de l'entreprise, poste occupé, nature de votre projet architectural ou de construction.\n- Données de navigation : adresse IP, type de navigateur, pages visitées, temps passé sur le site (via des cookies essentiels et analytiques)."
    },
    {
      title: "3. Finalités du Traitement",
      content: "Les données que nous collectons sont utilisées pour les finalités suivantes :\n- Gestion et suivi de vos demandes de contact, de devis ou de renseignements.\n- Exécution des contrats et suivi de vos projets architecturaux ou de construction.\n- Amélioration continue de notre site web et de l'expérience utilisateur.\n- Envoi de communications commerciales ou de newsletters (uniquement avec votre consentement préalable et explicite).\n- Respect de nos obligations légales et réglementaires."
    },
    {
      title: "4. Partage et Transfert des Données",
      content: "NOVA B est le seul destinataire de vos données. Nous ne vendons, ne louons ni ne partageons vos informations personnelles à des tiers à des fins commerciales. Toutefois, vos données peuvent être transmises à nos sous-traitants techniques (hébergeurs, fournisseurs de solutions d'emailing) dans le strict cadre de la réalisation de nos services. Ces prestataires sont soumis à des obligations strictes de confidentialité et de sécurité."
    },
    {
      title: "5. Sécurité et Durée de Conservation",
      content: "Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles avancées (chiffrement SSL, accès restreints, pare-feu) pour protéger vos données contre toute destruction, perte, altération ou accès non autorisé.\nVos données personnelles sont conservées uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées :\n- Demandes de contact : 3 ans après le dernier contact émanant de vous.\n- Données contractuelles : 5 à 10 ans selon les obligations légales, à compter de la fin de la relation commerciale."
    },
    {
      title: "6. Vos Droits (Conformité RGPD)",
      content: "Conformément à la réglementation, vous disposez des droits suivants concernant vos données personnelles :\n- Droit d'accès et de rectification.\n- Droit à l'effacement (droit à l'oubli).\n- Droit à la limitation du traitement et droit d'opposition.\n- Droit à la portabilité de vos données.\nPour exercer ces droits, vous pouvez nous contacter à tout moment à l'adresse : dpo@nova-b.com ou via notre formulaire de contact. Nous nous engageons à répondre à votre demande dans un délai maximum d'un mois."
    },
    {
      title: "7. Gestion des Cookies et Traceurs",
      content: "Notre site utilise des cookies pour assurer son bon fonctionnement, analyser le trafic et optimiser votre navigation. Un cookie est un petit fichier texte déposé sur votre terminal. Vous pouvez à tout moment paramétrer votre navigateur pour refuser l'installation des cookies non essentiels. Les cookies essentiels (session, sécurité) ne peuvent être désactivés. Les cookies analytiques sont conservés pour une durée maximale de 13 mois."
    },
    {
      title: "8. Notification de violation de données",
      content: "En cas de violation de données à caractère personnel présentant un risque pour les droits et libertés des personnes physiques, NOVA B s'engage à le notifier à l'autorité de contrôle compétente dans les délais légaux impartis (72 heures). Les utilisateurs concernés seront également informés si le risque est jugé élevé."
    },
    {
      title: "9. Modifications de la Politique de Confidentialité",
      content: "NOVA B se réserve le droit de modifier la présente politique à tout moment afin de s'adapter aux évolutions législatives et réglementaires. La date de la dernière mise à jour sera toujours indiquée en bas de cette page."
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