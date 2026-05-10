import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Plus, Edit, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import useArticles from '@/hooks/useArticles';
import useAdmin from '@/hooks/useAdmin';

const AdminArticles = () => {
  const { articles, loading: fetchLoading, refresh } = useArticles();
  const { upsertArticle, deleteArticle, loading: adminLoading } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [useUrl, setUseUrl] = useState(true);
  const [isAdminAuthor, setIsAdminAuthor] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Actualités');
  const [supplementaryMedia, setSupplementaryMedia] = useState([]);
  const [mediaInput, setMediaInput] = useState('');
  const { toast } = useToast();

  const handleDelete = async (id) => {
    if (confirm('Supprimer cet article ?')) {
      try {
        await deleteArticle(id);
        refresh();
        toast({ title: "Article supprimé" });
      } catch (err) {
        toast({ title: "Erreur", description: err.message, variant: "destructive" });
      }
    }
  };

  const handleImageChange = (e) => {
     const file = e.target.files[0];
     if (file) {
        if (file.size > 500000) {
            toast({ title: "Image trop lourde", variant: "destructive" });
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
     }
  };

  const handleAddMedia = () => {
    if (mediaInput.trim()) {
      setSupplementaryMedia([...supplementaryMedia, mediaInput.trim()]);
      setMediaInput('');
    }
  };

  const handleRemoveMedia = (index) => {
    setSupplementaryMedia(supplementaryMedia.filter((_, i) => i !== index));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const category = selectedCategory === 'Autre' ? formData.get('customCategory') : selectedCategory;
    
    const articleData = {
      title: formData.get('title'),
      excerpt: formData.get('excerpt'),
      content: editorContent,
      author: isAdminAuthor ? "Administrateur NOVA B" : formData.get('author'),
      author_role: formData.get('author_role') || '',
      published_at: formData.get('date'),
      category: category,
      cover_image: useUrl ? formData.get('imageUrl') : (imagePreview || 'https://images.unsplash.com/photo-1697315489353-b011e474f095'),
      media_urls: supplementaryMedia,
      status: 'published'
    };

    if (currentArticle) {
      articleData.id = currentArticle.id;
    }

    try {
      await upsertArticle(articleData);
      refresh();
      setIsModalOpen(false);
      toast({ title: "Article sauvegardé" });
    } catch (err) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    }
  };

  const openModal = (article = null) => {
    setCurrentArticle(article);
    setEditorContent(article?.content || '');
    setImagePreview(article?.cover_image || '');
    setUseUrl(true);
    setIsAdminAuthor(article?.author === "Administrateur NOVA B");
    
    const existingCategory = article?.category;
    const predefinedCategories = ['Actualités', 'Conseils', 'Tendance', 'Design'];
    if (existingCategory && !predefinedCategories.includes(existingCategory)) {
        setSelectedCategory('Autre');
    } else {
        setSelectedCategory(existingCategory || 'Actualités');
    }
    
    setSupplementaryMedia(article?.media_urls || []);
    setMediaInput('');
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-bold text-white">Gestion des Actualités</h1>
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
                <th className="p-4">Titre</th>
                <th className="p-4">Auteur</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {articles.map(article => (
                <tr key={article.id} className="hover:bg-white/5">
                  <td className="p-4 font-medium text-white">{article.title}</td>
                  <td className="p-4 text-gray-300">{article.author}</td>
                  <td className="p-4 text-gray-300">{article.published_at?.split('T')[0]}</td>
                  <td className="p-4 flex justify-end gap-2">
                    <button onClick={() => openModal(article)} className="p-2 text-blue-400 rounded-lg hover:bg-blue-400/10">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(article.id)} className="p-2 text-red-400 rounded-lg hover:bg-red-400/10"><Trash2 size={18} /></button>
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
              className="bg-[#2C2C2C] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">{currentArticle ? 'Modifier' : 'Nouvel Article'}</h2>
                <button onClick={() => setIsModalOpen(false)}><X className="text-gray-400 hover:text-white" /></button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Titre</label>
                    <input name="title" defaultValue={currentArticle?.title} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" required />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Auteur</label>
                    <input 
                        name="author" 
                        defaultValue={currentArticle?.author} 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" 
                        disabled={isAdminAuthor}
                        required={!isAdminAuthor}
                    />
                    <label className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                        <input type="checkbox" checked={isAdminAuthor} onChange={(e) => setIsAdminAuthor(e.target.checked)} />
                        C'est moi (Admin)
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Catégorie</label>
                    <select 
                        name="category" 
                        value={selectedCategory} 
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white [&>option]:text-black mb-2"
                    >
                      <option value="Actualités">Actualités</option>
                      <option value="Conseils">Conseils</option>
                      <option value="Tendance">Tendance</option>
                      <option value="Design">Design</option>
                      <option value="Autre">Autre</option>
                    </select>
                    {selectedCategory === 'Autre' && (
                      <input 
                        name="customCategory" 
                        placeholder="Saisir la catégorie..." 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white mt-2" 
                        required 
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Fonction de l'auteur</label>
                    <input 
                        name="author_role" 
                        defaultValue={currentArticle?.author_role || ''} 
                        placeholder="ex: Architecte Senior"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Date</label>
                    <input name="date" type="date" defaultValue={currentArticle?.published_at?.split('T')[0] || new Date().toISOString().split('T')[0]} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                  </div>
                </div>
                
                {/* Image */}
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Image de Couverture</label>
                    <div className="flex gap-4 mb-2">
                        <button type="button" onClick={() => setUseUrl(true)} className={`text-xs px-3 py-1 rounded-full ${useUrl ? 'bg-terracotta text-white' : 'bg-white/10 text-gray-400'}`}>URL</button>
                        <button type="button" onClick={() => setUseUrl(false)} className={`text-xs px-3 py-1 rounded-full ${!useUrl ? 'bg-terracotta text-white' : 'bg-white/10 text-gray-400'}`}>Upload</button>
                    </div>
                    {useUrl ? (
                        <input name="imageUrl" defaultValue={currentArticle?.cover_image} placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" onChange={(e) => setImagePreview(e.target.value)} />
                    ) : (
                        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-gray-400 text-sm" />
                    )}
                    {imagePreview && <div className="mt-2 h-24 rounded-lg overflow-hidden bg-black/20"><img src={imagePreview} className="w-full h-full object-cover" alt="Preview" /></div>}
                </div>

                {/* Médias Supplémentaires */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <label className="block text-xs text-gray-400 mb-2">Médias Supplémentaires (Images / Vidéos)</label>
                  <div className="flex gap-2 mb-4">
                    <input 
                      type="url" 
                      value={mediaInput} 
                      onChange={(e) => setMediaInput(e.target.value)} 
                      placeholder="https://..." 
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" 
                    />
                    <button type="button" onClick={handleAddMedia} className="bg-white/10 hover:bg-white/20 text-white px-4 rounded-xl text-sm font-medium transition-colors">
                      Ajouter
                    </button>
                  </div>
                  {supplementaryMedia.length > 0 && (
                    <div className="space-y-2">
                      {supplementaryMedia.map((media, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-black/20 p-2 rounded-lg">
                          <span className="text-sm text-gray-300 truncate max-w-[80%]">{media}</span>
                          <button type="button" onClick={() => handleRemoveMedia(idx)} className="text-red-400 hover:text-red-300 p-1">
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Extrait (Court)</label>
                  <textarea name="excerpt" rows="2" defaultValue={currentArticle?.excerpt} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" required />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Contenu</label>
                  <div className="bg-white/5 rounded-xl overflow-hidden">
                    <ReactQuill theme="snow" value={editorContent} onChange={setEditorContent} className="text-white" />
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

export default AdminArticles;