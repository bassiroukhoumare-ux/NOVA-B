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
            <h2 className="text-2xl text-terracotta font-bold mb-4 font-display">1. Objet et champ d'application</h2>
            <p className="leading-relaxed font-light mb-4">
              Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions dans lesquelles NOVA B met à la disposition de ses utilisateurs le site internet, ainsi que les services disponibles sur le site. Toute connexion au site est subordonnée au respect des présentes conditions. 
            </p>
            <p className="leading-relaxed font-light">
              L'utilisateur reconnaît avoir pris connaissance de ce document et accepté l'ensemble de ces informations, que l'usage soit fait à titre personnel ou professionnel.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-terracotta font-bold mb-4 font-display">2. Accès aux Services</h2>
            <p className="leading-relaxed font-light mb-4">
              NOVA B s'efforce de permettre l'accès au site 24 heures sur 24, 7 jours sur 7, sauf en cas de force majeure ou d'un événement hors de notre contrôle, et sous réserve des éventuelles pannes et interventions de maintenance nécessaires au bon fonctionnement du site et des services.
            </p>
            <p className="leading-relaxed font-light">
              NOVA B se réserve le droit de refuser l'accès au site, unilatéralement et sans notification préalable, à tout utilisateur ne respectant pas les présentes conditions d'utilisation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-terracotta font-bold mb-4 font-display">3. Présentation des Services</h2>
            <p className="leading-relaxed font-light mb-4">
              NOVA B propose des services dans les domaines suivants : Architecture, Maîtrise d'œuvre, Décoration intérieure et extérieure, et Construction. Les textes, images et descriptifs présents sur le site n'ont qu'une valeur indicative et ne constituent pas un document contractuel.
            </p>
            <p className="leading-relaxed font-light">
              Les propositions commerciales, devis et contrats spécifiques signés avec le client prévalent sur toute information générale présentée sur ce site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-terracotta font-bold mb-4 font-display">4. Propriété Intellectuelle</h2>
            <p className="leading-relaxed font-light mb-4">
              La structure générale du site NOVA B, ainsi que les textes, graphiques, images, sons et vidéos la composant, sont la propriété de l'éditeur ou de ses partenaires. Toute représentation et/ou reproduction et/ou exploitation partielle ou totale de ce site, par quelque procédé que ce soit, sans l'autorisation préalable et par écrit de NOVA B est strictement interdite et serait susceptible de constituer une contrefaçon au sens des lois sur la propriété intellectuelle.
            </p>
            <p className="leading-relaxed font-light">
              Les marques, logos, dénominations sociales, sigles, noms commerciaux, enseignes figurant sur le site sont la propriété de NOVA B ou font l'objet d'une autorisation d'utilisation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-terracotta font-bold mb-4 font-display">5. Responsabilité de l'Éditeur</h2>
            <p className="leading-relaxed font-light mb-4">
              Les informations et/ou documents figurant sur ce site sont susceptibles de contenir des inexactitudes techniques et des erreurs typographiques. NOVA B se réserve le droit de les corriger, dès que ces erreurs sont portées à sa connaissance.
            </p>
            <p className="leading-relaxed font-light">
              L'utilisation des informations et/ou documents disponibles sur ce site se fait sous l'entière et seule responsabilité de l'utilisateur, qui assume la totalité des conséquences pouvant en découler, sans que NOVA B puisse être recherché à ce titre, et sans recours contre ce dernier.
            </p>
          </section>
          <section>
            <h2 className="text-2xl text-terracotta font-bold mb-4 font-display">6. Liens Hypertextes</h2>
            <p className="leading-relaxed font-light mb-4">
              Le site NOVA B peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet. Les liens vers ces autres ressources vous font quitter le site NOVA B.
            </p>
            <p className="leading-relaxed font-light">
              Il est possible de créer un lien vers la page de présentation de ce site sans autorisation expresse de NOVA B. Aucune autorisation ou demande d'information préalable ne peut être exigée par l'éditeur à l'égard d'un site qui souhaite établir un lien vers le site de l'éditeur. Cependant, NOVA B se réserve le droit de demander la suppression d'un lien qu'il estime non conforme à l'objet du site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-terracotta font-bold mb-4 font-display">7. Modalités Financières et Devis</h2>
            <p className="leading-relaxed font-light mb-4">
              Les demandes de devis via le site sont gratuites et sans engagement. Toute prestation réalisée par NOVA B fera l'objet d'un contrat spécifique ou d'un devis dûment signé par le client, détaillant les conditions de paiement, d'acompte et d'échéances.
            </p>
            <p className="leading-relaxed font-light">
              Sauf mention contraire, nos devis sont valables pour une durée de 30 jours à compter de leur date d'émission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-terracotta font-bold mb-4 font-display">8. Droit Applicable et Résolution des Litiges</h2>
            <p className="leading-relaxed font-light mb-4">
              Les présentes Conditions Générales d'Utilisation sont régies par le droit applicable en Côte d'Ivoire. En cas de litige, et à défaut de solution amiable, la compétence expresse est attribuée aux tribunaux compétents d'Abidjan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-terracotta font-bold mb-4 font-display">9. Évolution des CGU</h2>
            <p className="leading-relaxed font-light">
              NOVA B se réserve le droit de modifier les termes, conditions et mentions des présentes CGU à tout moment, notamment pour se conformer à toute nouvelle réglementation ou législation ou pour améliorer la consultation du site par l'utilisateur.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Conditions;