import React, { useState, useEffect, useRef, useMemo } from 'react';
import { supabase } from '../../lib/supabase';
import { isVideoUrl } from '../../lib/media';
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
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// --- Cloudinary config (cloud name + UNSIGNED preset are safe to expose client-side) ---
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dl1ozine7';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'nova_unsigned';

const uploadToCloudinary = async (file) => {
  const resourceType = file.type.startsWith('video/') ? 'video' : 'image';
  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`;

  const body = new FormData();
  body.append('file', file);
  body.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(endpoint, { method: 'POST', body });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error?.message || "Échec de l'upload sur Cloudinary");
  }
  return data.secure_url;
};

// Register a custom "video" blot so uploaded videos render as a real <video> player
// inside the article body (Quill's default video blot only embeds an iframe URL).
const BlockEmbed = Quill.import('blots/block/embed');
class VideoBlot extends BlockEmbed {
  static create(url) {
    const node = super.create();
    node.setAttribute('src', url);
    node.setAttribute('controls', true);
    node.setAttribute('controlslist', 'nodownload');
    node.setAttribute('preload', 'metadata');
    node.setAttribute('playsinline', true);
    node.setAttribute('style', 'max-width:100%;border-radius:12px;display:block;margin:1rem 0;');
    return node;
  }
  static value(node) {
    return node.getAttribute('src');
  }
}
VideoBlot.blotName = 'video';
VideoBlot.tagName = 'video';
Quill.register(VideoBlot, true);

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
    published_at: '',
    cover_image: null,
    reading_time: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [customCategory, setCustomCategory] = useState('');
  const [bodyUploading, setBodyUploading] = useState(false);
  const quillRef = useRef(null);

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
      
      const predefinedCats = categories.map(c => c.name).concat(['Tendance', 'Projet', 'Événement']);
      const isCustom = article.category && !predefinedCats.includes(article.category);
      
      setFormData({
        title: article.title,
        excerpt: article.excerpt || '',
        content: article.content || '',
        author: article.author || '',
        category: isCustom ? 'Autre' : (article.category || ''),
        status: article.status || 'published',
        published_at: article.published_at ? new Date(article.published_at).toISOString().slice(0,16) : '',
        cover_image: article.cover_image,
        reading_time: article.reading_time || ''
      });
      setCustomCategory(isCustom ? article.category : '');
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
        published_at: '',
        cover_image: null,
        reading_time: ''
      });
      setCustomCategory('');
      setImagePreview(null);
    }
    setShowModal(true);
  };

  // Upload helper (module-scope uploadToCloudinary handles both images and videos).
  const handleMediaUpload = uploadToCloudinary;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = formData.cover_image;

      if (formData.cover_image instanceof File) {
        imageUrl = await handleMediaUpload(formData.cover_image);
      }

      const readingTime = calculateReadingTime(formData.content);

      const finalCategory = formData.category === 'Autre' ? customCategory : formData.category;
      
      let finalPublishedAt = null;
      if (formData.status === 'published') {
        finalPublishedAt = new Date().toISOString();
      } else if (formData.status === 'scheduled' && formData.published_at) {
        finalPublishedAt = new Date(formData.published_at).toISOString();
      }

      const articleData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        category: finalCategory,
        status: formData.status,
        cover_image: imageUrl,
        reading_time: readingTime,
        published_at: finalPublishedAt
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

  // Is the current cover preview a video (newly selected file or existing URL)?
  const previewIsVideo = formData.cover_image instanceof File
    ? formData.cover_image.type.startsWith('video/')
    : isVideoUrl(imagePreview);

  // Insert media into the editor body by uploading the selected file to Cloudinary.
  const insertBodyMedia = (accept, blotType) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.click();
    input.onchange = async () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const editor = quillRef.current && quillRef.current.getEditor();
      if (!editor) return;
      const range = editor.getSelection(true);
      const index = range ? range.index : editor.getLength();
      try {
        setBodyUploading(true);
        const url = await uploadToCloudinary(file);
        editor.insertEmbed(index, blotType, url, 'user');
        editor.setSelection(index + 1, 0, 'user');
      } catch (err) {
        alert("Erreur lors de l'ajout du média : " + err.message);
      } finally {
        setBodyUploading(false);
      }
    };
  };

  const quillModules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: () => insertBodyMedia('image/*', 'image'),
        video: () => insertBodyMedia('video/*', 'video'),
      },
    },
  }), []);

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
                  isVideoUrl(article.cover_image) ? (
                    <video src={article.cover_image} muted className="w-full h-full object-cover" />
                  ) : (
                    <img src={article.cover_image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    <ImageIcon size={40} />
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    article.status === 'published' ? 'bg-green-500/80 text-white' : 
                    article.status === 'scheduled' ? 'bg-blue-500/80 text-white' : 'bg-gray-500/80 text-white'
                  }`}>
                    {article.status === 'published' ? 'Publié' : 
                     article.status === 'scheduled' ? 'Programmé' : 'Brouillon'}
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
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Média de couverture (image ou vidéo)</label>
                  <div className="relative group aspect-[21/9] bg-white/5 border-2 border-dashed border-white/10 rounded-3xl overflow-hidden flex flex-col items-center justify-center transition-all hover:border-terracotta/50">
                    {imagePreview ? (
                      <>
                        {previewIsVideo ? (
                          <video src={imagePreview} controls className="w-full h-full object-cover bg-black" />
                        ) : (
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              setFormData({...formData, cover_image: null});
                            }}
                            className="bg-red-500 p-2 rounded-full text-white pointer-events-auto"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload className="text-gray-500 mb-2" size={32} />
                        <p className="text-xs text-gray-500 font-medium">Glissez ou cliquez pour uploader une image ou une vidéo</p>
                        <input
                          type="file"
                          accept="image/*,video/*"
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
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-terracotta transition-colors appearance-none mb-2"
                    >
                      <option value="">Sélectionner</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                      <option value="Tendance">Tendance</option>
                      <option value="Projet">Projet</option>
                      <option value="Événement">Événement</option>
                      <option value="Autre">Autre</option>
                    </select>
                    {formData.category === 'Autre' && (
                      <input 
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Saisir la catégorie..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-terracotta transition-colors mt-2"
                        required
                      />
                    )}
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
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-4">
                        {[
                          { id: 'published', label: 'Immédiat' },
                          { id: 'scheduled', label: 'Programmer' },
                          { id: 'draft', label: 'Brouillon' }
                        ].map(status => (
                          <button
                            key={status.id}
                            type="button"
                            onClick={() => setFormData({...formData, status: status.id})}
                            className={`flex-1 py-3.5 px-4 rounded-2xl border transition-all font-bold text-xs uppercase tracking-widest ${
                              formData.status === status.id 
                              ? 'bg-terracotta/10 border-terracotta text-terracotta' 
                              : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'
                            }`}
                          >
                            {status.label}
                          </button>
                        ))}
                      </div>
                      
                      {formData.status === 'scheduled' && (
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col gap-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Date et heure de publication</label>
                          <input 
                            type="datetime-local" 
                            value={formData.published_at}
                            onChange={(e) => setFormData({...formData, published_at: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-terracotta transition-colors"
                            required
                          />
                        </div>
                      )}
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
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Corps de l'Article</label>
                    {bodyUploading && (
                      <span className="flex items-center gap-2 text-xs text-terracotta font-medium">
                        <Loader2 className="animate-spin" size={14} /> Téléversement du média en cours...
                      </span>
                    )}
                  </div>
                  <div className="quill-dark-theme bg-white/5 border border-white/10 rounded-2xl overflow-hidden focus-within:border-terracotta transition-colors">
                    <ReactQuill
                      ref={quillRef}
                      theme="snow"
                      value={formData.content}
                      onChange={(content) => setFormData({...formData, content})}
                      modules={quillModules}
                      placeholder="Rédigez votre article ici. Vous pouvez insérer des images et des vidéos via la barre d'outils."
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 ml-1">Astuce : utilisez les icônes 🖼️ image et 🎬 vidéo de la barre d'outils pour téléverser un fichier directement dans le texte.</p>
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
