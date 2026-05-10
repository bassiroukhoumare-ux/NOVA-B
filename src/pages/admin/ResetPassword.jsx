import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await resetPassword(email);
      setIsSent(true);
    } catch (err) {
      // Still show success or generic message to avoid email enumeration
      // But we can log error internally
      setIsSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-anthracite relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-terracotta/10 rounded-full blur-[120px]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md px-6 relative z-10"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl">
          <Link to="/adminovaci/connexion" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm mb-8 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Retour à la connexion
          </Link>

          <h1 className="text-2xl font-display font-bold text-white mb-2">Réinitialisation</h1>
          <p className="text-gray-400 text-sm mb-8">Saisissez votre email pour recevoir un lien de réinitialisation.</p>

          {isSent ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-terracotta/10 border border-terracotta/20 rounded-2xl p-6 text-center"
            >
              <CheckCircle className="w-12 h-12 text-terracotta mx-auto mb-4" />
              <p className="text-white font-medium mb-2">Email envoyé !</p>
              <p className="text-gray-400 text-sm">
                Si un compte existe pour <strong>{email}</strong>, vous recevrez un lien d'ici quelques instants.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-terracotta/50 transition-colors"
                    placeholder="admin@novaci.com"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-4 rounded-xl">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-terracotta hover:bg-terracotta/90 disabled:opacity-50 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Envoyer le lien'}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
