import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, Lock, Mail, AlertCircle } from 'lucide-react';

const Login = () => {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate('/adminovaci');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Check rate limiting
    const attempts = JSON.parse(sessionStorage.getItem('login_attempts') || '[]');
    const now = Date.now();
    const recentAttempts = attempts.filter(t => now - t < 15 * 60 * 1000);
    
    if (recentAttempts.length >= 5) {
      const oldestAttempt = recentAttempts[0];
      const waitTime = Math.ceil((15 * 60 * 1000 - (now - oldestAttempt)) / 1000 / 60);
      setIsLocked(true);
      setCountdown(waitTime);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLocked) return;

    setError('');
    setIsSubmitting(true);

    try {
      await signIn(email, password);
      // Clear attempts on success
      sessionStorage.removeItem('login_attempts');
      navigate('/adminovaci');
    } catch (err) {
      // Log attempt for rate limiting
      const attempts = JSON.parse(sessionStorage.getItem('login_attempts') || '[]');
      attempts.push(Date.now());
      sessionStorage.setItem('login_attempts', JSON.stringify(attempts));

      if (attempts.length >= 5) {
        setIsLocked(true);
        setCountdown(15);
      }

      setError(err.message === 'Invalid login credentials' 
        ? 'Identifiants invalides. Veuillez réessayer.' 
        : 'Une erreur est survenue. Vérifiez votre connexion.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-anthracite relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-terracotta/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md px-6 relative z-10"
      >
        <div className="text-center mb-10">
          <img 
            src="https://horizons-cdn.hostinger.com/05e9ca02-310b-48b9-814b-4798f423a225/fb7b17fa133b1878a85011680feb30b7.png" 
            alt="Novaci" 
            className="h-12 mx-auto mb-6"
          />
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">Espace administrateur — Novaci</h1>
          <p className="text-gray-400 mt-2 text-sm uppercase tracking-[0.2em]">Connexion sécurisée</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl">
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
                  disabled={isSubmitting || isLocked}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-terracotta/50 transition-colors placeholder:text-gray-600"
                  placeholder="admin@novaci.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting || isLocked}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-12 text-white focus:outline-none focus:border-terracotta/50 transition-colors placeholder:text-gray-600"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-4 rounded-xl border border-red-400/20"
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}

            {isLocked && (
              <div className="flex items-center gap-2 text-orange-400 text-sm bg-orange-400/10 p-4 rounded-xl border border-orange-400/20">
                <Lock size={18} />
                Compte temporairement bloqué. Réessayez dans {countdown} min.
              </div>
            )}

            <button
              disabled={isSubmitting || isLocked}
              type="submit"
              className="w-full bg-terracotta hover:bg-terracotta/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl shadow-lg shadow-terracotta/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Se connecter'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link 
              to="/adminovaci/reset-password" 
              className="text-sm text-gray-500 hover:text-white transition-colors font-medium"
            >
              Mot de passe oublié ?
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
