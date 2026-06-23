import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, Building2, Home, Briefcase, Hammer, Calendar, Ruler, Sofa, MapPin, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useToast } from '@/components/ui/use-toast';

const DiagnosticFormModal = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    landStatus: '',
    investment: '',
    workDate: '',
    name: '',
    phone: '',
    email: ''
  });

  if (!isOpen) return null;

  const handleNext = () => {
    // Validation
    if (step === 1 && !formData.type) return;
    if (step === 2 && !formData.location && !formData.landStatus) return;
    if (step === 3 && (!formData.investment || !formData.workDate)) return;
    
    setStep(prev => prev + 1);
  };
  
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;

    try {
      setIsSubmitting(true);
      // Save to Supabase
      const { error } = await supabase.from('diagnostics').insert([{
        user_name: formData.name,
        email: formData.email,
        subject: `Nouveau Diagnostic: ${formData.type}`,
        message: JSON.stringify({
          type: formData.type,
          location: formData.location,
          landStatus: formData.landStatus,
          investment: formData.investment,
          workDate: formData.workDate,
          phone: formData.phone
        }),
        status: 'new'
      }]);

      if (error) throw error;
      
      // Show Toast
      toast({
        title: "Projet envoyé !",
        description: "Un expert NOVA B étudie vos informations et vous recontactera sous 48h.",
        duration: 5000,
      });

      // Format WhatsApp Message
      const text = `*NOUVEAU PROJET DIAGNOSTIC NOVA B*%0A%0A` +
        `📌 *Type:* ${formData.type}%0A` +
        `📍 *Lieu:* ${formData.location || 'Non précisé'} (${formData.landStatus === 'owned' ? 'Terrain déjà acquis' : formData.landStatus === 'searching' ? 'Recherche un terrain' : 'Non précisé'})%0A` +
        `💰 *Budget:* ${formData.investment}%0A` +
        `📅 *Début:* ${formData.workDate}%0A` +
        `👤 *Nom:* ${formData.name}%0A` +
        `📞 *Tel:* +225${formData.phone}%0A` +
        `📧 *Email:* ${formData.email}`;

      // Redirect to WhatsApp after short delay to show toast
      setTimeout(() => {
          window.open(`https://wa.me/2250749242222?text=${text}`, '_blank');
          onClose();
          setStep(1); // Reset
          setFormData({ type: '', location: '', landStatus: '', investment: '', workDate: '', name: '', phone: '', email: '' });
      }, 1500);
    } catch (err) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectTypes = [
    { id: 'villa', label: 'Villa de Prestige', icon: Home, image: 'https://images.unsplash.com/photo-1697315489353-b011e474f095' },
    { id: 'immeuble', label: 'Immeuble', icon: Building2, image: 'https://images.unsplash.com/photo-1703176309340-68f50990c6c5' },
    { id: 'pro', label: 'Espace Pro', icon: Briefcase, image: 'https://images.unsplash.com/photo-1612396970400-2f359e5c5bb3' },
    { id: 'renovation', label: 'Rénovation', icon: Hammer, image: 'https://images.unsplash.com/photo-1650018984119-8a3fa781fa19' },
    { id: 'archi-interieur', label: "Architecture d'intérieur", icon: Ruler, image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6' },
    { id: 'amenagement', label: 'Aménagement', icon: Sofa, image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6' },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-4xl bg-[#2C2C2C] border border-white/10 rounded-[30px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* Progress Sidebar */}
        <div className="w-full md:w-1/3 bg-black/20 p-8 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
           <div>
             <h2 className="text-2xl font-display font-bold text-white mb-2">Votre Projet</h2>
             <p className="text-gray-400 text-sm mb-8">Construisons ensemble votre vision.</p>
             
             <div className="space-y-4">
               {['Votre Vision', 'Le Foncier', 'L\'Investissement', 'Finalisation'].map((label, idx) => (
                 <div key={idx} className="flex items-center gap-3">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step > idx + 1 ? 'bg-terracotta text-white' : step === idx + 1 ? 'bg-white text-anthracite' : 'bg-white/10 text-gray-500'}`}>
                     {step > idx + 1 ? <Check size={14} /> : idx + 1}
                   </div>
                   <span className={`text-sm font-medium ${step === idx + 1 ? 'text-white' : 'text-gray-500'}`}>{label}</span>
                 </div>
               ))}
             </div>
           </div>
           <div className="hidden md:block">
             <div className="w-full bg-white/10 rounded-full h-1 mt-8">
               <div className="bg-terracotta h-1 rounded-full transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }} />
             </div>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar relative bg-[#2C2C2C]">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>

          <form onSubmit={handleSubmit} className="h-full flex flex-col">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-6">Quelle est votre vision ?</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {projectTypes.map((type) => (
                      <div 
                        key={type.id}
                        onClick={() => setFormData({...formData, type: type.label})}
                        className={`relative group cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${formData.type === type.label ? 'border-terracotta' : 'border-transparent'}`}
                      >
                        <div className="aspect-[4/3] relative">
                           <img src={type.image} alt={type.label} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                           <div className={`absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors ${formData.type === type.label ? 'bg-black/20' : ''}`} />
                           <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                             <type.icon className="text-white mb-2" size={28} />
                             <span className="text-white font-bold text-sm">{type.label}</span>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-6">Parlons du lieu</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Localisation souhaitée ou acquise <span className="text-gray-500 font-normal">(facultatif)</span></label>
                      <input
                        type="text"
                        placeholder="Ex: Abidjan, Cocody, Assinie..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-terracotta transition-colors placeholder:text-gray-500"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Où en êtes-vous avec le terrain ?</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { id: 'owned', label: "J'ai déjà un terrain", icon: MapPin },
                          { id: 'searching', label: 'Je recherche encore un terrain', icon: Search },
                        ].map((opt) => (
                          <div
                            key={opt.id}
                            onClick={() => setFormData({...formData, landStatus: opt.id})}
                            className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData.landStatus === opt.id ? 'bg-terracotta/20 border-terracotta text-white' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}`}
                          >
                            <opt.icon size={20} className={formData.landStatus === opt.id ? 'text-terracotta' : 'text-gray-500'} />
                            <span className="font-medium text-sm">{opt.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-6">L'Investissement</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Budget Estimatif</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          { label: 'Standard', range: 'Moins de 50 000 000 FCFA' },
                          { label: 'Signature', range: '50 000 000 – 99 000 000 FCFA' },
                          { label: 'Prestige', range: '100 000 000 FCFA et plus' },
                        ].map((opt) => (
                          <div
                            key={opt.label}
                            onClick={() => setFormData({...formData, investment: opt.label})}
                            className={`p-4 rounded-xl border cursor-pointer text-center transition-all ${formData.investment === opt.label ? 'bg-terracotta/20 border-terracotta text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                          >
                            <span className="font-bold block">{opt.label}</span>
                            <span className="text-xs text-gray-400 mt-1 block">{opt.range}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Date de démarrage souhaitée</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input 
                          type="date" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 text-white focus:outline-none focus:border-terracotta transition-colors appearance-none"
                          value={formData.workDate}
                          onChange={(e) => setFormData({...formData, workDate: e.target.value})}
                          style={{ colorScheme: 'dark' }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-6">Dernière étape</h3>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Nom complet"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-terracotta placeholder:text-gray-500"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                    <div className="flex gap-2">
                       <span className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-gray-400 flex items-center">+225</span>
                       <input 
                        type="tel" 
                        placeholder="07 49 24 22 22"
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-terracotta placeholder:text-gray-500"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </div>
                    <input 
                      type="email" 
                      placeholder="Email professionnel"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-terracotta placeholder:text-gray-500"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-8 pt-6 border-t border-white/5">
              {step > 1 ? (
                <button type="button" onClick={handleBack} className="text-gray-400 hover:text-white font-medium px-4 py-2">
                  Retour
                </button>
              ) : <div></div>}
              
              {step < 4 ? (
                <button 
                  type="button" 
                  onClick={handleNext} 
                  disabled={(step === 1 && !formData.type) || (step === 2 && !formData.location && !formData.landStatus) || (step === 3 && (!formData.investment || !formData.workDate))}
                  className="bg-white text-anthracite px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Suivant <ArrowRight size={16} />
                </button>
              ) : (
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-terracotta to-[#ff8c55] text-white px-6 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(211,97,43,0.4)] hover:shadow-[0_0_30px_rgba(211,97,43,0.6)] transition-all flex items-center gap-2 text-sm md:text-base"
                >
                  Soumettre pour analyse <Check size={18} />
                </button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default DiagnosticFormModal;