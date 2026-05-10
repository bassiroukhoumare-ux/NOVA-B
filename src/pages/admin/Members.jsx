import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Upload, 
  User as UserIcon,
  Loader2,
  Check,
  Linkedin,
  Facebook,
  Link as LinkIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    image_url: null,
    display_order: 0,
    linkedin_url: '',
    tiktok_url: '',
    facebook_url: ''
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) console.error('Error fetching members:', error);
    else setMembers(data || []);
    setLoading(false);
  };

  const handleOpenModal = (member = null) => {
    if (member) {
      setCurrentMember(member);
      setFormData({
        name: member.name,
        role: member.role || '',
        bio: member.bio || '',
        image_url: member.image_url,
        display_order: member.display_order || 0,
        linkedin_url: member.linkedin_url || '',
        tiktok_url: member.tiktok_url || '',
        facebook_url: member.facebook_url || ''
      });
      setImagePreview(member.image_url);
    } else {
      setCurrentMember(null);
      setFormData({
        name: '',
        role: '',
        bio: '',
        image_url: null,
        display_order: members.length, // Default to end of list
        linkedin_url: '',
        tiktok_url: '',
        facebook_url: ''
      });
      setImagePreview(null);
    }
    setShowModal(true);
  };

  const handleImageUpload = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `team/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('members-photos')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('members-photos')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = formData.image_url;
      
      if (formData.image_url instanceof File) {
        imageUrl = await handleImageUpload(formData.image_url);
      }

      const memberData = {
        name: formData.name,
        role: formData.role,
        bio: formData.bio,
        image_url: imageUrl,
        display_order: parseInt(formData.display_order, 10),
        linkedin_url: formData.linkedin_url,
        tiktok_url: formData.tiktok_url,
        facebook_url: formData.facebook_url
      };

      if (currentMember) {
        const { error } = await supabase
          .from('team_members')
          .update(memberData)
          .eq('id', currentMember.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('team_members')
          .insert([memberData]);
        if (error) throw error;
      }

      setShowModal(false);
      fetchMembers();
    } catch (error) {
      console.error('Error saving member:', error);
      alert('Erreur lors de l\'enregistrement du membre : ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);
      
      if (error) alert('Erreur lors de la suppression');
      else fetchMembers();
    }
  };

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">Gestion de l'Équipe</h2>
          <p className="text-gray-500 text-sm">Gérez les membres de l'agence et leurs profils</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-terracotta hover:bg-terracotta/90 text-white font-bold py-3 px-6 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-terracotta/20"
        >
          <Plus size={20} />
          Ajouter un Membre
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input 
          type="text"
          placeholder="Rechercher un membre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-terracotta/50 transition-colors"
        />
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <Loader2 className="animate-spin mx-auto text-terracotta" size={24} />
          </div>
        ) : filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <motion.div 
              key={member.id}
              layout
              className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden group hover:border-white/20 transition-all flex flex-col items-center p-6 text-center"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-800 border-2 border-white/10 group-hover:border-terracotta transition-colors mb-4 flex-shrink-0">
                {member.image_url ? (
                  <img src={member.image_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    <UserIcon size={40} />
                  </div>
                )}
              </div>
              
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <p className="text-xs text-terracotta font-medium uppercase tracking-wider">{member.role || 'Membre'}</p>
                <p className="text-sm text-gray-500 line-clamp-2 mt-2">{member.bio || 'Aucune biographie...'}</p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 mt-4">
                {member.linkedin_url && (
                  <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                    <Linkedin size={16} />
                  </a>
                )}
                {member.facebook_url && (
                  <a href={member.facebook_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                    <Facebook size={16} />
                  </a>
                )}
                {member.tiktok_url && (
                  <a href={member.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                    <span className="text-xs font-bold font-mono">TT</span>
                  </a>
                )}
              </div>
              
              <div className="pt-4 mt-4 border-t border-white/5 w-full flex items-center justify-center gap-2">
                <button 
                  onClick={() => handleOpenModal(member)}
                  className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(member.id)}
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            Aucun membre trouvé
          </div>
        )}
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-stone-900 border border-white/10 rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-white/10 flex items-center justify-between sticky top-0 bg-stone-900 z-10">
                <div>
                  <h3 className="text-xl font-display font-bold text-white">
                    {currentMember ? 'Modifier le Profil' : 'Ajouter un Membre'}
                  </h3>
                  <p className="text-gray-500 text-sm">Complétez les informations du membre de l'équipe</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-500 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center space-y-3">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Photo de profil</label>
                  <div className="relative group w-32 h-32 bg-white/5 border-2 border-dashed border-white/10 rounded-full overflow-hidden flex flex-col items-center justify-center transition-all hover:border-terracotta/50">
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              setFormData({...formData, image_url: null});
                            }}
                            className="bg-red-500 p-2 rounded-full text-white"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload className="text-gray-500 mb-2" size={24} />
                        <p className="text-[10px] text-gray-500 font-medium text-center px-2">Cliquez pour uploader</p>
                        <input 
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setFormData({...formData, image_url: file});
                              setImagePreview(URL.createObjectURL(file));
                            }
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Name & Role */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Nom Complet</label>
                    <input 
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:border-terracotta transition-colors"
                      placeholder="Ex: Jean Dupont"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Rôle / Poste</label>
                    <input 
                      required
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:border-terracotta transition-colors"
                      placeholder="Ex: Architecte Principal"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Biographie</label>
                  <textarea 
                    rows="3"
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:border-terracotta transition-colors resize-none"
                    placeholder="Courte description du parcours..."
                  />
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <LinkIcon size={16} className="text-terracotta" />
                    Réseaux Sociaux
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                      <input 
                        type="text"
                        value={formData.linkedin_url}
                        onChange={(e) => setFormData({...formData, linkedin_url: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white text-sm focus:border-terracotta transition-colors"
                        placeholder="LinkedIn URL"
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xs">TT</span>
                      <input 
                        type="text"
                        value={formData.tiktok_url}
                        onChange={(e) => setFormData({...formData, tiktok_url: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white text-sm focus:border-terracotta transition-colors"
                        placeholder="TikTok URL"
                      />
                    </div>
                    <div className="relative">
                      <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                      <input 
                        type="text"
                        value={formData.facebook_url}
                        onChange={(e) => setFormData({...formData, facebook_url: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white text-sm focus:border-terracotta transition-colors"
                        placeholder="Facebook URL"
                      />
                    </div>
                  </div>
                </div>

                {/* Order */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Ordre d'affichage</label>
                  <input 
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({...formData, display_order: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:border-terracotta transition-colors"
                    placeholder="0"
                  />
                </div>

                {/* Footer Actions */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between sticky bottom-0 bg-stone-900 z-10 pb-2">
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-white font-bold transition-colors"
                  >
                    Annuler
                  </button>
                  <button 
                    disabled={isSubmitting}
                    className="bg-terracotta hover:bg-terracotta/90 text-white font-bold py-3.5 px-10 rounded-2xl flex items-center gap-3 transition-all shadow-xl shadow-terracotta/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Check size={20} />}
                    {currentMember ? 'Mettre à jour' : 'Ajouter le Membre'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Members;
