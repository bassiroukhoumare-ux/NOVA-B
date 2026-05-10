import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  X, 
  Upload, 
  Image as ImageIcon,
  Loader2,
  Check,
  Clock,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    status: 'published',
    cover_image: null,
    reading_time: ''
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching articles:', error);
    else setArticles(data || []);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('type', 'news');
    
    if (error) console.error('Error fetching categories:', error);
    else setCategories(data || []);
  };

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
  };

  const handleOpenModal = (article = null) => {
    if (article) {
      setCurrentArticle(article);
      setFormData({
        title: article.title,
        excerpt: article.excerpt || '',
        content: article.content || '',
        author: article.author || '',
        category: article.category || '',
        status: article.status || 'published',
        cover_image: article.cover_image,
        reading_time: article.reading_time || ''
      });
      setImagePreview(article.cover_image);
    } else {
      setCurrentArticle(null);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        category: '',
        status: 'published',
        cover_image: null,
        reading_time: ''
      });
      setImagePreview(null);
    }
    setShowModal(true);
  };

  const handleImageUpload = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `covers/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('news-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('news-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = formData.cover_image;
      
      if (formData.cover_image instanceof File) {
        imageUrl = await handleImageUpload(formData.cover_image);
      }

      const readingTime = calculateReadingTime(formData.content);

      const articleData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        category: formData.category,
        status: formData.status,
        cover_image: imageUrl,
        reading_time: readingTime,
        published_at: formData.status === 'published' ? new Date().toISOString() : null
      };

      if (currentArticle) {
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', currentArticle.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('articles')
          .insert([articleData]);
        if (error) throw error;
      }

      setShowModal(false);
      fetchArticles();
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Erreur lors de l\'enregistrement de l\'actualité : ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);
      
      if (error) alert('Erreur lors de la suppression');
      else fetchArticles();
    }
  };

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">Gestion des Actualités</h2>
          <p className="text-gray-500 text-sm">Rédigez et publiez les articles du blog</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-terracotta hover:bg-terracotta/90 text-white font-bold py-3 px-6 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-terracotta/20"
        >
          <Plus size={20} />
          Nouvel Article
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text"
            placeholder="Rechercher un article..."
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

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <Loader2 className="animate-spin mx-auto text-terracotta" size={24} />
          </div>
        ) : filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <motion.div 
              key={article.id}
              layout
              className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden group hover:border-white/20 transition-all flex flex-col"
            >
              <div className="aspect-video bg-gray-800 relative overflow-hidden border-b border-white/5">
                {article.cover_image ? (
                  <img src={article.cover_image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    <ImageIcon size={40} />
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    article.status === 'published' ? 'bg-green-500/80 text-white' : 'bg-gray-500/80 text-white'
                  }`}>
                    {article.status === 'published' ? 'Publié' : 'Brouillon'}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span className="uppercase tracking-wider text-terracotta">{article.category || 'Non classé'}</span>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    {article.reading_time || '1 min'}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3">{article.excerpt || 'Aucun résumé...'}</p>
                </div>
                
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-600">
                    {new Date(article.created_at).toLocaleDateString('fr-FR')}
                  </span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleOpenModal(article)}
                      className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(article.id)}
                      className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            Aucun article trouvé
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
              className="relative w-full max-w-5xl bg-stone-900 border border-white/10 rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-white/10 flex items-center justify-between sticky top-0 bg-stone-900 z-10">
                <div>
                  <h3 className="text-xl font-display font-bold text-white">
                    {currentArticle ? 'Modifier l\'Article' : 'Nouvel Article'}
                  </h3>
                  <p className="text-gray-500 text-sm">Rédigez un contenu captivant pour votre audience</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-500 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-8">
                {/* Cover Image Upload */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Image de couverture</label>
                  <div className="relative group aspect-[21/9] bg-white/5 border-2 border-dashed border-white/10 rounded-3xl overflow-hidden flex flex-col items-center justify-center transition-all hover:border-terracotta/50">
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              setFormData({...formData, cover_image: null});
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
                        <p className="text-xs text-gray-500 font-medium">Glissez ou cliquez pour uploader une couverture</p>
                        <input 
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setFormData({...formData, cover_image: file});
                              setImagePreview(URL.createObjectURL(file));
                            }
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Title & Meta */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Titre de l'Actualité</label>
                    <input 
                      required
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-terracotta transition-colors"
                      placeholder="Titre accrocheur..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Catégorie</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-terracotta transition-colors appearance-none"
                    >
                      <option value="">Sélectionner</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                      <option value="Tendance">Tendance</option>
                      <option value="Projet">Projet</option>
                      <option value="Événement">Événement</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Auteur</label>
                    <input 
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-terracotta transition-colors"
                      placeholder="Votre nom"
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
                          {status === 'published' ? 'Publier immédiatement' : 'Enregistrer en Brouillon'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Résumé (Extrait)</label>
                  <textarea 
                    rows="2"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-terracotta transition-colors resize-none"
                    placeholder="Bref aperçu pour la grille d'actualités..."
                  />
                </div>

                {/* Rich Text Content */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Corps de l'Article</label>
                  <div className="quill-dark-theme bg-white/5 border border-white/10 rounded-2xl overflow-hidden focus-within:border-terracotta transition-colors">
                    <ReactQuill 
                      theme="snow"
                      value={formData.content}
                      onChange={(content) => setFormData({...formData, content})}
                      modules={quillModules}
                      placeholder="Rédigez votre article ici. Vous pouvez insérer des images et des liens."
                    />
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
                    {currentArticle ? 'Mettre à jour' : 'Publier l\'Actualité'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global CSS for Quill Dark Theme */}
      <style jsx global>{`
        .quill-dark-theme .ql-toolbar.ql-snow {
          border-color: rgba(255, 255, 255, 0.1);
          background-color: rgba(255, 255, 255, 0.02);
        }
        .quill-dark-theme .ql-container.ql-snow {
          border-color: transparent;
          min-height: 300px;
          font-family: inherit;
        }
        .quill-dark-theme .ql-editor {
          color: white;
          font-size: 1rem;
        }
        .quill-dark-theme .ql-editor.ql-blank::before {
          color: rgba(255, 255, 255, 0.3);
          font-style: normal;
        }
        .quill-dark-theme .ql-snow .ql-stroke {
          stroke: #9ca3af;
        }
        .quill-dark-theme .ql-snow .ql-fill {
          fill: #9ca3af;
        }
        .quill-dark-theme .ql-snow .ql-picker {
          color: #9ca3af;
        }
        .quill-dark-theme .ql-snow .ql-picker-options {
          background-color: #1c1917;
          border-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default News;
