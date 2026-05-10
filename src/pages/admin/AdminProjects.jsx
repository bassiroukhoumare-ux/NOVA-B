import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Plus, Edit, Trash2, X, Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import useProjects from '@/hooks/useProjects';
import useAdmin from '@/hooks/useAdmin';

const AdminProjects = () => {
  const { projects, loading: fetchLoading, refresh } = useProjects();
  const { upsertProject, deleteProject, loading: adminLoading } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [useUrl, setUseUrl] = useState(true);
  const [editorContent, setEditorContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Architecture');
  const [isConfidential, setIsConfidential] = useState(false);
  const { toast } = useToast();

  const handleDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      try {
        await deleteProject(id);
        refresh();
        toast({ title: "Projet supprimé" });
      } catch (err) {
        toast({ title: "Erreur", description: err.message, variant: "destructive" });
      }
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

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const category = selectedCategory === 'Autre' ? formData.get('customCategory') : selectedCategory;
    
    const projectData = {
      title: formData.get('title'),
      category: category,
      client: isConfidential ? 'Client Confidentiel' : formData.get('client'),
      year: formData.get('year'),
      description: formData.get('description'),
      content: editorContent,
      location: formData.get('location') || '',
      image: useUrl ? formData.get('imageUrl') : (imagePreview || 'https://images.unsplash.com/photo-1510414866645-87ed8a0fa980'),
      status: 'published'
    };

    if (currentProject) {
      projectData.id = currentProject.id;
    }

    try {
      await upsertProject(projectData);
      refresh();
      setIsModalOpen(false);
      toast({ title: currentProject ? "Projet modifié" : "Projet créé" });
    } catch (err) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    }
  };

  const openModal = (project = null) => {
    setCurrentProject(project);
    setImagePreview(project?.image || '');
    setUseUrl(true);
    
    // Initialize states based on project data
    const existingCategory = project?.category;
    const predefinedCategories = ['Architecture', 'Design d\'Intérieur', 'Paysagisme', 'Rénovation'];
    
    if (existingCategory && !predefinedCategories.includes(existingCategory)) {
        setSelectedCategory('Autre');
    } else {
        setSelectedCategory(existingCategory || 'Architecture');
    }
    
    setEditorContent(project?.content || project?.description || '');
    setIsConfidential(project?.client === 'Client Confidentiel');
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
                    <select 
                        name="category" 
                        value={selectedCategory} 
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white [&>option]:text-black mb-2"
                    >
                      <option value="Architecture">Architecture</option>
                      <option value="Résidentiel">Résidentiel</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Rénovation">Rénovation</option>
                      <option value="Autre">Autre</option>
                    </select>
                    {selectedCategory === 'Autre' && (
                      <input 
                        name="customCategory" 
                        placeholder="Saisir la catégorie..." 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" 
                        required 
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Client</label>
                    <div className="flex gap-2">
                       <input 
                        name="client" 
                        defaultValue={currentProject?.client !== 'Client Confidentiel' ? currentProject?.client : ''} 
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" 
                        disabled={isConfidential}
                        placeholder={isConfidential ? "Confidentiel" : "Nom du client"}
                        required={!isConfidential}
                       />
                    </div>
                    <label className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                      <input type="checkbox" checked={isConfidential} onChange={(e) => setIsConfidential(e.target.checked)} />
                      Confidentiel (Ne pas afficher le nom publiquement)
                    </label>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Année de livraison</label>
                    <input name="year" type="number" defaultValue={currentProject?.year} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Lieu / Adresse</label>
                    <input name="location" defaultValue={currentProject?.location || ''} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" placeholder="ex: Abidjan, Côte d'Ivoire" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Description courte (pour les cartes)</label>
                    <textarea name="description" rows="2" defaultValue={currentProject?.description} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" required />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Contenu détaillé (pour la page du projet)</label>
                  <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                      <ReactQuill 
                        theme="snow" 
                        value={editorContent} 
                        onChange={setEditorContent}
                        className="text-white"
                      />
                  </div>
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