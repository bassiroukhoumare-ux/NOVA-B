import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { 
  User, 
  Lock, 
  Shield, 
  Eye, 
  EyeOff, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Share2,
  Instagram,
  Linkedin,
  Facebook,
  Twitter
} from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
  const { user, updatePassword, signIn } = useAuth();
  
  // Profile state
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isUpdatingPass, setIsUpdatingPass] = useState(false);
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState(false);

  // Social Links state
  const [socialLinks, setSocialLinks] = useState(() => JSON.parse(localStorage.getItem('NOVA_SOCIAL_LINKS') || '{"instagram":"","linkedin":"","facebook":"","twitter":""}'));
  const [socialSuccess, setSocialSuccess] = useState(false);

  const handleUpdateSocialLinks = (e) => {
    e.preventDefault();
    localStorage.setItem('NOVA_SOCIAL_LINKS', JSON.stringify(socialLinks));
    setSocialSuccess(true);
    setTimeout(() => setSocialSuccess(false), 3000);
  };

  const getPasswordStrength = (pass) => {
    if (!pass) return { label: '', color: 'bg-gray-700', width: '0%' };
    let score = 0;
    if (pass.length >= 12) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 2) return { label: 'Faible', color: 'bg-red-500', width: '33%' };
    if (score === 3) return { label: 'Moyen', color: 'bg-orange-500', width: '66%' };
    return { label: 'Fort', color: 'bg-green-500', width: '100%' };
  };

  const strength = getPasswordStrength(newPassword);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    setProfileSuccess(false);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      });
      if (error) throw error;
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess(false);

    if (newPassword.length < 12 || !/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword) || !/[^A-Za-z0-9]/.test(newPassword)) {
      setPassError('Le nouveau mot de passe ne respecte pas les critères de sécurité.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError('Les nouveaux mots de passe ne correspondent pas.');
      return;
    }

    if (currentPassword === newPassword) {
      setPassError("Le nouveau mot de passe doit être différent de l'actuel.");
      return;
    }

    setIsUpdatingPass(true);

    try {
      // 1. Verify current password by signing in again
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword
      });

      if (signInError) {
        setPassError('Le mot de passe actuel est incorrect.');
        return;
      }

      // 2. Update password
      await updatePassword(newPassword);
      
      // 3. Success
      setPassSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // 4. Sign out of other sessions
      await supabase.auth.signOut({ scope: 'others' });
    } catch (err) {
      setPassError(err.message);
    } finally {
      setIsUpdatingPass(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-10">
      {/* Section 1: Profil */}
      <section className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
        <div className="p-8 border-b border-white/10 flex items-center gap-4">
          <div className="p-3 bg-terracotta/10 text-terracotta rounded-2xl">
            <User size={24} />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-white">Profil</h3>
            <p className="text-gray-500 text-sm">Gérez vos informations personnelles</p>
          </div>
        </div>
        
        <form onSubmit={handleUpdateProfile} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email (Lecture seule)</label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 px-4 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Nom Complet</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-terracotta/50 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            {profileSuccess && (
              <span className="flex items-center gap-2 text-green-500 text-sm">
                <CheckCircle size={16} /> Profil mis à jour
              </span>
            )}
            <button
              type="submit"
              disabled={isUpdatingProfile}
              className="ml-auto bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-2xl transition-all flex items-center gap-2"
            >
              {isUpdatingProfile ? <Loader2 size={18} className="animate-spin" /> : 'Enregistrer'}
            </button>
          </div>
        </form>
      </section>

      {/* Section 2: Sécurité */}
      <section className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
        <div className="p-8 border-b border-white/10 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl">
            <Shield size={24} />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-white">Sécurité</h3>
            <p className="text-gray-500 text-sm">Changement de mot de passe et sessions</p>
          </div>
        </div>

        <form onSubmit={handleUpdatePassword} className="p-8 space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Mot de passe actuel</label>
              <input
                required
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-terracotta/50 transition-colors"
                placeholder="Indispensable pour confirmer l'identité"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Nouveau mot de passe</label>
                <div className="relative">
                  <input
                    required
                    type={showPass ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-terracotta/50 transition-colors"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {/* Strength Meter */}
                <div className="px-1">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-bold mb-1">
                    <span className="text-gray-500">Force</span>
                    <span className={strength.color.replace('bg-', 'text-')}>{strength.label}</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: strength.width }}
                      className={`h-full ${strength.color} transition-all`}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Confirmer le nouveau</label>
                <input
                  required
                  type={showPass ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-terracotta/50 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl text-xs text-blue-400/80 leading-relaxed">
            <p className="font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <AlertCircle size={14} /> Critères de sécurité
            </p>
            <ul className="list-disc ml-4 space-y-1">
              <li>Minimum 12 caractères</li>
              <li>Au moins une majuscule (A-Z)</li>
              <li>Au moins un chiffre (0-9)</li>
              <li>Au moins un symbole spécial (!@#$%^&*)</li>
            </ul>
          </div>

          <div className="flex items-center justify-between pt-4">
            {passError && (
              <span className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} /> {passError}
              </span>
            )}
            {passSuccess && (
              <span className="flex items-center gap-2 text-green-500 text-sm">
                <CheckCircle size={16} /> Mot de passe modifié !
              </span>
            )}
            <button
              type="submit"
              disabled={isUpdatingPass}
              className="ml-auto bg-terracotta hover:bg-terracotta/90 text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-lg shadow-terracotta/20 flex items-center gap-2"
            >
              {isUpdatingPass ? <Loader2 size={18} className="animate-spin" /> : 'Changer le mot de passe'}
            </button>
          </div>
        </form>

        <div className="p-8 bg-black/20 border-t border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-bold mb-1">Sessions actives</p>
              <p className="text-gray-500 text-sm">Déconnecter tous les autres appareils connectés</p>
            </div>
            <button 
              onClick={async () => {
                await supabase.auth.signOut({ scope: 'others' });
                alert('Toutes les autres sessions ont été déconnectées.');
              }}
              className="text-gray-400 hover:text-white text-sm font-medium border border-white/10 px-4 py-2 rounded-xl transition-all"
            >
              Déconnecter les autres
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: Réseaux Sociaux */}
      <section className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
        <div className="p-8 border-b border-white/10 flex items-center gap-4">
          <div className="p-3 bg-[#ff8c55]/10 text-[#ff8c55] rounded-2xl">
            <Share2 size={24} />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-white">Réseaux Sociaux</h3>
            <p className="text-gray-500 text-sm">Gérez les liens de vos réseaux sociaux affichés sur le site public</p>
          </div>
        </div>

        <form onSubmit={handleUpdateSocialLinks} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Instagram</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><Instagram size={18} /></span>
                <input
                  type="url"
                  value={socialLinks.instagram}
                  onChange={(e) => setSocialLinks({...socialLinks, instagram: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-terracotta/50 transition-colors"
                  placeholder="https://instagram.com/novab"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">LinkedIn</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><Linkedin size={18} /></span>
                <input
                  type="url"
                  value={socialLinks.linkedin}
                  onChange={(e) => setSocialLinks({...socialLinks, linkedin: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-terracotta/50 transition-colors"
                  placeholder="https://linkedin.com/company/novab"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Facebook</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><Facebook size={18} /></span>
                <input
                  type="url"
                  value={socialLinks.facebook}
                  onChange={(e) => setSocialLinks({...socialLinks, facebook: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-terracotta/50 transition-colors"
                  placeholder="https://facebook.com/novab"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Twitter (X)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><Twitter size={18} /></span>
                <input
                  type="url"
                  value={socialLinks.twitter}
                  onChange={(e) => setSocialLinks({...socialLinks, twitter: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-terracotta/50 transition-colors"
                  placeholder="https://twitter.com/novab"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {socialSuccess && (
              <span className="flex items-center gap-2 text-green-500 text-sm">
                <CheckCircle size={16} /> Liens mis à jour
              </span>
            )}
            <button
              type="submit"
              className="ml-auto bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-2xl transition-all"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Settings;
