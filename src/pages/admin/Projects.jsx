import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye, 
  X, 
  Upload, 
  Image as ImageIcon,
  Loader2,
  Check,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    year: new Date().getFullYear().toString(),
    description: '',
    full_content: '',
    status: 'published',
    image: null,
    gallery: []
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching projects:', error);
    else setProjects(data || []);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('type', 'project');
    
    if (error) console.error('Error fetching categories:', error);
    else setCategories(data || []);
  };

  const handleOpenModal = (project = null) => {
    if (project) {
      setCurrentProject(project);
      setFormData({
        title: project.title,
        category: project.category || '',
        year: project.year || '',
        description: project.description || '',
        full_content: project.full_content || '',
        status: project.status || 'published',
        image: project.image,
        gallery: project.gallery || []
      });
      setImagePreview(project.image);
      setGalleryPreviews(project.gallery || []);
    } else {
      setCurrentProject(null);
      setFormData({
        title: '',
        category: '',
        year: new Date().getFullYear().toString(),
        description: '',
        full_content: '',
        status: 'published',
        image: null,
        gallery: []
      });
      setImagePreview(null);
      setGalleryPreviews([]);
    }
    setShowModal(true);
  };

  const handleImageUpload = async (file, path) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('projects-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('projects-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = formData.image;
      
      // Handle main image upload if it's a file
      if (formData.image instanceof File) {
        imageUrl = await handleImageUpload(formData.image, 'covers');
      }

      // Handle gallery uploads
      const galleryUrls = await Promise.all(
        formData.gallery.map(async (item) => {
          if (item instanceof File) {
            return await handleImageUpload(item, 'gallery');
          }
          return item;
        })
      );

      const projectData = {
        title: formData.title,
        category: formData.category,
        year: formData.year,
        description: formData.description,
        full_content: formData.full_content,
        status: formData.status,
        image: imageUrl,
        gallery: galleryUrls
      };

      if (currentProject) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', currentProject.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([projectData]);
        if (error) throw error;
      }

      setShowModal(false);
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Erreur lors de l\'enregistrement du projet : ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) alert('Erreur lors de la suppression');
      else fetchProjects();
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">Gestion des Projets</h2>
          <p className="text-gray-500 text-sm">Créez, modifiez ou supprimez les projets de l'agence</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-terracotta hover:bg-terracotta/90 text-white font-bold py-3 px-6 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-terracotta/20"
        >
          <Plus size={20} />
          Nouveau Projet
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text"
            placeholder="Rechercher un projet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-terracotta/50 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-white/5 border border-white/10 p-3 rounded-2xl text-gray-400 hover:text-white transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <th className="px-6 py-4">Projet</th>
                <th className="px-6 py-4">Catégorie</th>
                <th className="px-6 py-4">Année</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <Loader2 className="animate-spin mx-auto text-terracotta" size={24} />
                  </td>
                </tr>
              ) : filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="group hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0 border border-white/10">
                          {project.image ? (
                            <img src={project.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-full h-full p-3 text-gray-600" />
                          )}
                        </div>
                        <div className="font-bold text-white">{project.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      <span className="px-3 py-1 bg-white/5 rounded-full border border-white/5">
                        {project.category || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{project.year}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        project.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenModal(project)}
                          className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(project.id)}
                          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    Aucun projet trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
              className="relative w-full max-w-4xl bg-stone-900 border border-white/10 rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-white/10 flex items-center justify-between sticky top-0 bg-stone-900 z-10">
                <div>
                  <h3 className="text-xl font-display font-bold text-white">
                    {currentProject ? 'Modifier le Projet' : 'Nouveau Projet'}
                  </h3>
                  <p className="text-gray-500 text-sm">Remplissez les informations détaillées du projet</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-500 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-8">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Titre du Projet</label>
                    <input 
                      required
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-terracotta transition-colors"
                      placeholder="Ex: Villa Horizon"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Catégorie</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-terracotta transition-colors appearance-none"
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                      <option value="Architecture">Architecture</option>
                      <option value="Design d'Intérieur">Design d'Intérieur</option>
                      <option value="Urbanisme">Urbanisme</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Année</label>
                    <input 
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-terracotta transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Statut</label>
                    <div className="flex gap-4">
                      {['published', 'draft'].map(status => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setFormData({...formData, status})}
                          className={`flex-1 py-3.5 px-4 rounded-2xl border transition-all font-bold text-xs uppercase tracking-widest ${
                            formData.status === status 
                            ? 'bg-terracotta/10 border-terracotta text-terracotta' 
                            : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'
                          }`}
                        >
                          {status === 'published' ? 'Publié' : 'Brouillon'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Description Courte</label>
                  <textarea 
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-terracotta transition-colors resize-none"
                    placeholder="Bref résumé du projet..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Contenu Détaillé</label>
                  <textarea 
                    rows="6"
                    value={formData.full_content}
                    onChange={(e) => setFormData({...formData, full_content: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-terracotta transition-colors"
                    placeholder="Description complète, défis, solutions..."
                  />
                </div>

                {/* Media */}
                <div className="space-y-6">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <ImageIcon size={18} className="text-terracotta" />
                    Médias du projet
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Main Image */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Image de couverture</label>
                      <div className="relative group aspect-video bg-white/5 border-2 border-dashed border-white/10 rounded-3xl overflow-hidden flex flex-col items-center justify-center transition-all hover:border-terracotta/50">
                        {imagePreview ? (
                          <>
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button 
                                type="button"
                                onClick={() => {
                                  setImagePreview(null);
                                  setFormData({...formData, image: null});
                                }}
                                className="bg-red-500 p-2 rounded-full text-white"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <Upload className="text-gray-500 mb-2" size={32} />
                            <p className="text-xs text-gray-500 font-medium">Glissez ou cliquez pour uploader</p>
                            <input 
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  setFormData({...formData, image: file});
                                  setImagePreview(URL.createObjectURL(file));
                                }
                              }}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                          </>
                        )}
                      </div>
                    </div>

                    {/* Gallery */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Galerie Photos</label>
                      <div className="grid grid-cols-3 gap-3">
                        {galleryPreviews.map((preview, idx) => (
                          <div key={idx} className="relative aspect-square bg-white/5 rounded-xl overflow-hidden border border-white/10 group">
                            <img src={preview} alt="" className="w-full h-full object-cover" />
                            <button 
                              type="button"
                              onClick={() => {
                                const newGallery = [...formData.gallery];
                                const newPreviews = [...galleryPreviews];
                                newGallery.splice(idx, 1);
                                newPreviews.splice(idx, 1);
                                setFormData({...formData, gallery: newGallery});
                                setGalleryPreviews(newPreviews);
                              }}
                              className="absolute top-1 right-1 bg-red-500 p-1 rounded-md text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                        <label className="aspect-square bg-white/5 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-gray-500 hover:border-terracotta/50 hover:text-terracotta cursor-pointer transition-all">
                          <Plus size={20} />
                          <input 
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                              const files = Array.from(e.target.files);
                              setFormData({
                                ...formData, 
                                gallery: [...formData.gallery, ...files]
                              });
                              const newPreviews = files.map(f => URL.createObjectURL(f));
                              setGalleryPreviews([...galleryPreviews, ...newPreviews]);
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-8 border-t border-white/10 flex items-center justify-between sticky bottom-0 bg-stone-900 z-10 pb-4">
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-white font-bold transition-colors"
                  >
                    Annuler
                  </button>
                  <button 
                    disabled={isSubmitting}
                    className="bg-terracotta hover:bg-terracotta/90 text-white font-bold py-4 px-12 rounded-2xl flex items-center gap-3 transition-all shadow-xl shadow-terracotta/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Check size={20} />}
                    {currentProject ? 'Mettre à jour' : 'Publier le Projet'}
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

export default Projects;
