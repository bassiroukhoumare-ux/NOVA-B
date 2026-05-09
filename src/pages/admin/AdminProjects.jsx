import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, X, Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [useUrl, setUseUrl] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setProjects(db.getProjects());
  }, []);

  const handleDelete = (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      db.saveProjects(updated);
      toast({ title: "Projet supprimé" });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500000) { // 500KB limit for local storage safety
        toast({ title: "Image trop lourde", description: "Utilisez une image < 500KB ou une URL externe.", variant: "destructive" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const category = formData.get('category') === 'Autre' ? formData.get('customCategory') : formData.get('category');
    
    const newProject = {
      id: currentProject ? currentProject.id : Date.now(),
      title: formData.get('title'),
      category: category,
      client: formData.get('isConfidential') ? 'Client Confidentiel' : formData.get('client'),
      year: formData.get('year'),
      workStartDate: formData.get('workStartDate'),
      description: formData.get('description'),
      image: useUrl ? formData.get('imageUrl') : (imagePreview || 'https://images.unsplash.com/photo-1510414866645-87ed8a0fa980'),
      gallery: currentProject?.gallery || []
    };

    let updated;
    if (currentProject) {
      updated = projects.map(p => p.id === newProject.id ? newProject : p);
    } else {
      updated = [newProject, ...projects];
    }
    
    setProjects(updated);
    db.saveProjects(updated);
    setIsModalOpen(false);
    toast({ title: currentProject ? "Projet modifié" : "Projet créé" });
  };

  const openModal = (project = null) => {
    setCurrentProject(project);
    setImagePreview(project?.image || '');
    setUseUrl(true);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-bold text-white">Gestion des Projets</h1>
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
                <th className="p-4">Image</th>
                <th className="p-4">Titre</th>
                <th className="p-4">Catégorie</th>
                <th className="p-4">Année</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map(project => (
                <tr key={project.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <img src={project.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                  </td>
                  <td className="p-4 font-medium text-white">{project.title}</td>
                  <td className="p-4 text-gray-300">{project.category}</td>
                  <td className="p-4 text-gray-300">{project.year}</td>
                  <td className="p-4 flex justify-end gap-2">
                    <button onClick={() => openModal(project)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(project.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#2C2C2C] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">{currentProject ? 'Modifier le projet' : 'Nouveau projet'}</h2>
                <button onClick={() => setIsModalOpen(false)}><X className="text-gray-400 hover:text-white" /></button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Titre</label>
                    <input name="title" defaultValue={currentProject?.title} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" required />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Catégorie</label>
                    <select name="category" defaultValue={currentProject?.category} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white [&>option]:text-black">
                      <option value="Architecture">Architecture</option>
                      <option value="Résidentiel">Résidentiel</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Rénovation">Rénovation</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Client</label>
                    <div className="flex gap-2">
                       <input name="client" defaultValue={currentProject?.client} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                    </div>
                    <label className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                      <input type="checkbox" name="isConfidential" defaultChecked={currentProject?.client === 'Client Confidentiel'} />
                      Confidentiel
                    </label>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Année de livraison</label>
                    <input name="year" type="number" defaultValue={currentProject?.year} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" required />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Description</label>
                  <textarea name="description" rows="4" defaultValue={currentProject?.description} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" required />
                </div>
                
                {/* Image Handling */}
                <div className="space-y-2">
                  <label className="block text-xs text-gray-400">Image Principale</label>
                  <div className="flex gap-4 mb-2">
                    <button type="button" onClick={() => setUseUrl(true)} className={`text-xs px-3 py-1 rounded-full ${useUrl ? 'bg-terracotta text-white' : 'bg-white/10 text-gray-400'}`}>URL Externe</button>
                    <button type="button" onClick={() => setUseUrl(false)} className={`text-xs px-3 py-1 rounded-full ${!useUrl ? 'bg-terracotta text-white' : 'bg-white/10 text-gray-400'}`}>Upload (Simulé)</button>
                  </div>

                  {useUrl ? (
                    <div className="flex items-center gap-2">
                      <LinkIcon size={16} className="text-gray-400" />
                      <input 
                        name="imageUrl" 
                        defaultValue={currentProject?.image} 
                        placeholder="https://example.com/image.jpg"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" 
                        onChange={(e) => setImagePreview(e.target.value)}
                      />
                    </div>
                  ) : (
                    <div className="border border-dashed border-white/20 rounded-xl p-4 text-center hover:bg-white/5 transition-colors relative">
                      <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                      <ImageIcon className="mx-auto text-gray-400 mb-2" />
                      <p className="text-xs text-gray-400">Cliquez pour sélectionner une image</p>
                    </div>
                  )}
                  
                  {imagePreview && (
                    <div className="mt-2 h-32 w-full rounded-xl overflow-hidden bg-black/20">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">Annuler</button>
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

export default AdminProjects;