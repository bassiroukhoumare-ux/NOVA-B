import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Loader2,
  Check,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    type: 'project'
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching categories:', error);
    else setCategories(data || []);
    setLoading(false);
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setCurrentCategory(category);
      setFormData({
        name: category.name,
        slug: category.slug,
        type: category.type || 'project'
      });
    } else {
      setCurrentCategory(null);
      setFormData({
        name: '',
        slug: '',
        type: 'project'
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const categoryData = {
        name: formData.name,
        slug: formData.slug || generateSlug(formData.name),
        type: formData.type
      };

      if (currentCategory) {
        const { error } = await supabase
          .from('categories')
          .update(categoryData)
          .eq('id', currentCategory.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('categories')
          .insert([categoryData]);
        if (error) throw error;
      }

      setShowModal(false);
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Erreur lors de l\'enregistrement de la catégorie : ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
      
      if (error) alert('Erreur lors de la suppression. Elle est peut-être liée à des projets.');
      else fetchCategories();
    }
  };

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">Catégories</h2>
          <p className="text-gray-500 text-sm">Gérez les catégories pour les projets et les actualités</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-terracotta hover:bg-terracotta/90 text-white font-bold py-3 px-6 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-terracotta/20"
        >
          <Plus size={20} />
          Nouvelle Catégorie
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input 
          type="text"
          placeholder="Rechercher une catégorie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-terracotta/50 transition-colors"
        />
      </div>

      {/* Categories Table */}
      <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 text-xs font-bold text-gray-500 uppercase tracking-widest">
              <th className="px-6 py-4">Nom</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center">
                  <Loader2 className="animate-spin mx-auto text-terracotta" size={24} />
                </td>
              </tr>
            ) : filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <tr key={category.id} className="group hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                        <Tag size={14} />
                      </div>
                      <div className="font-bold text-white">{category.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{category.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      category.type === 'project' ? 'bg-blue-500/10 text-blue-500' : 'bg-terracotta/10 text-terracotta'
                    }`}>
                      {category.type === 'project' ? 'Projet' : 'Actualité'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(category)}
                        className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(category.id)}
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
                <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                  Aucune catégorie trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
              className="relative w-full max-w-md bg-stone-900 border border-white/10 rounded-[30px] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-xl font-display font-bold text-white">
                  {currentCategory ? 'Modifier la Catégorie' : 'Nouvelle Catégorie'}
                </h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Nom</label>
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({
                        ...formData, 
                        name: e.target.value,
                        slug: currentCategory ? formData.slug : generateSlug(e.target.value)
                      });
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:border-terracotta transition-colors"
                    placeholder="Ex: Résidentiel"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Slug (URL)</label>
                  <input 
                    required
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:border-terracotta transition-colors"
                    placeholder="ex: residentiel"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Type</label>
                  <div className="flex gap-4">
                    {[
                      { value: 'project', label: 'Projet' },
                      { value: 'news', label: 'Actualité' }
                    ].map(type => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData({...formData, type: type.value})}
                        className={`flex-1 py-3 px-4 rounded-2xl border transition-all font-bold text-xs uppercase tracking-widest ${
                          formData.type === type.value 
                          ? 'bg-terracotta/10 border-terracotta text-terracotta' 
                          : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-white font-bold transition-colors"
                  >
                    Annuler
                  </button>
                  <button 
                    disabled={isSubmitting}
                    className="bg-terracotta hover:bg-terracotta/90 text-white font-bold py-3 px-8 rounded-2xl flex items-center gap-2 transition-all shadow-xl shadow-terracotta/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
                    {currentCategory ? 'Mettre à jour' : 'Enregistrer'}
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

export default Categories;
