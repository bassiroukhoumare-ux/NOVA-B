import React, { useEffect } from 'react';

const Conditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-anthracite pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-10">Conditions Générales d'Utilisation</h1>
        
        <div className="space-y-10 text-gray-300">
          <section>
            <h2 className="text-2xl text-terracotta font-bold mb-4">Objet</h2>
            <p className="leading-relaxed">
              Les présentes Conditions Générales ont pour objet de définir les modalités de mise à disposition des services du site NOVA B et les conditions d'utilisation du service par l'utilisateur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-terracotta font-bold mb-4">Services</h2>
            <p className="leading-relaxed">
              NOVA B fournit des services d'architecture, de design d'intérieur, de construction et de conseil. Les descriptions et tarifs sont donnés à titre indicatif et peuvent évoluer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-terracotta font-bold mb-4">Acceptation</h2>
            <p className="leading-relaxed">
              L'utilisateur déclare avoir pris connaissance et accepté expressément les présentes Conditions Générales d'Utilisation en vigueur au jour de l'accès à son site web.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Conditions;