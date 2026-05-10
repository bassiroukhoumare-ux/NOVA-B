import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, X, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import useTeam from '@/hooks/useTeam';
import useAdmin from '@/hooks/useAdmin';

const AdminTeam = () => {
  const { team, loading: fetchLoading, refresh } = useTeam();
  const { upsertTeamMember, deleteTeamMember, loading: adminLoading } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [useUrl, setUseUrl] = useState(true);
  const { toast } = useToast();

  const handleDelete = async (id) => {
    if (confirm('Supprimer ce membre ?')) {
      try {
        await deleteTeamMember(id);
        refresh();
        toast({ title: "Membre supprimé" });
      } catch (err) {
        toast({ title: "Erreur", description: err.message, variant: "destructive" });
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
       if (file.size > 500000) {
        toast({ title: "Image trop lourde", description: "< 500KB requis", variant: "destructive" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const memberData = {
      name: formData.get('name'),
      role: formData.get('role'),
      bio: formData.get('bio'),
      image_url: useUrl ? formData.get('imageUrl') : (imagePreview || 'https://images.unsplash.com/photo-1493882552576-fce827c6161e')
    };

    if (currentMember) {
      memberData.id = currentMember.id;
    }

    try {
      await upsertTeamMember(memberData);
      refresh();
      setIsModalOpen(false);
      toast({ title: "Équipe mise à jour" });
    } catch (err) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    }
  };

  const openModal = (member = null) => {
    setCurrentMember(member);
    setImagePreview(member?.image_url || '');
    setUseUrl(true);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-bold text-white">Gestion de l'Équipe</h1>
        <button 
          onClick={() => openModal()}
          className="bg-terracotta text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-[#ff8c55] transition-colors"
        >
          <Plus size={20} /> Ajouter
        </button>
      </div>

      <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-gray-400 uppercase text-xs">
              <tr>
                <th className="p-4">Membre</th>
                <th className="p-4">Rôle</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {team.map(member => (
                <tr key={member.id} className="hover:bg-white/5">
                  <td className="p-4 flex items-center gap-3">
                    <img src={member.image_url} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                    <span className="font-medium text-white">{member.name}</span>
                  </td>
                  <td className="p-4 text-gray-300">{member.role}</td>
                  <td className="p-4 flex justify-end gap-2">
                    <button onClick={() => openModal(member)} className="p-2 text-blue-400 rounded-lg hover:bg-blue-400/10"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(member.id)} className="p-2 text-red-400 rounded-lg hover:bg-red-400/10"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#2C2C2C] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">{currentMember ? 'Modifier' : 'Ajouter'}</h2>
                <button onClick={() => setIsModalOpen(false)}><X className="text-gray-400" /></button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Nom Complet</label>
                    <input name="name" defaultValue={currentMember?.name} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" required />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Poste</label>
                    <input name="role" defaultValue={currentMember?.role} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" required />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Bio</label>
                    <textarea name="bio" rows="3" defaultValue={currentMember?.bio} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                  </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Facebook URL</label>
                        <input name="facebook" defaultValue={currentMember?.facebook} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" placeholder="https://..." />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">LinkedIn URL</label>
                        <input name="linkedin" defaultValue={currentMember?.linkedin} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" placeholder="https://..." />
                      </div>
                   </div>

                   {/* Image Picker */}
                   <div>
                    <label className="block text-xs text-gray-400 mb-1">Photo Profil</label>
                    <div className="flex gap-4 mb-2">
                        <button type="button" onClick={() => setUseUrl(true)} className={`text-xs px-3 py-1 rounded-full ${useUrl ? 'bg-terracotta text-white' : 'bg-white/10 text-gray-400'}`}>URL</button>
                        <button type="button" onClick={() => setUseUrl(false)} className={`text-xs px-3 py-1 rounded-full ${!useUrl ? 'bg-terracotta text-white' : 'bg-white/10 text-gray-400'}`}>Upload</button>
                    </div>
                    {useUrl ? (
                        <input name="imageUrl" defaultValue={currentMember?.image_url} placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" onChange={(e) => setImagePreview(e.target.value)} />
                    ) : (
                        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-gray-400 text-sm" />
                    )}
                    {imagePreview && <img src={imagePreview} className="mt-2 w-16 h-16 rounded-full object-cover border border-white/10" alt="Preview" />}
                   </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-400">Annuler</button>
                  <button type="submit" className="bg-terracotta text-white px-6 py-2 rounded-xl font-bold">Enregistrer</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminTeam;