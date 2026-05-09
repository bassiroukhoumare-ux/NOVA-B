import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, MapPin, Phone, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { CONTACT_INFO } from '@/lib/constants';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', projectType: 'Architecture', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({ title: "Message envoyé !", description: "Nous reviendrons vers vous sous 24h." });
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 bg-anthracite relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-terracotta/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-4 text-white"
          >
            Parlons de votre <span className="text-terracotta">projet</span>
          </motion.h1>
          <p className="text-xl text-gray-400">Le début d'une collaboration exceptionnelle</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="glassmorphism p-10 rounded-3xl flex flex-col justify-between"
          >
            <div>
              <h3 className="text-3xl font-display font-bold mb-8 text-white">Contact Direct</h3>
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="bg-white/5 p-4 rounded-xl text-terracotta"><Phone size={24} /></div>
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase">Téléphone</p>
                    <p className="text-xl text-white">{CONTACT_INFO.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/5 p-4 rounded-xl text-terracotta"><Mail size={24} /></div>
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase">Email</p>
                    <p className="text-xl text-white">{CONTACT_INFO.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/5 p-4 rounded-xl text-terracotta"><MapPin size={24} /></div>
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase">Adresse</p>
                    <p className="text-xl text-white">{CONTACT_INFO.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-10 shadow-2xl"
          >
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <CheckCircle className="text-green-600 w-16 h-16 mb-6" />
                <h3 className="text-3xl font-bold text-anthracite mb-4">Message Envoyé !</h3>
                <p className="text-gray-500 mb-8">Nous traitons votre demande.</p>
                <button onClick={() => setIsSuccess(false)} className="text-terracotta font-bold underline">Nouveau message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-anthracite">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-bold mb-2">Nom complet</label>
                    <input required className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-terracotta outline-none" placeholder="Votre nom" onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block font-bold mb-2">Email</label>
                    <input type="email" required className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-terracotta outline-none" placeholder="email@exemple.com" onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block font-bold mb-2">Type de projet</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-terracotta outline-none" onChange={e => setFormData({...formData, projectType: e.target.value})}>
                    <option>Architecture</option>
                    <option>Décoration Intérieure</option>
                    <option>Construction</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-2">Message</label>
                  <textarea required rows="4" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-terracotta outline-none" placeholder="Votre vision..." onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                </div>
                <button disabled={isSubmitting} type="submit" className="w-full bg-terracotta text-white font-bold py-4 rounded-[16px] shadow-lg hover:shadow-terracotta/40 transition-all flex justify-center items-center gap-2">
                  {isSubmitting ? 'Envoi...' : <>Envoyer <Send size={20} /></>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;