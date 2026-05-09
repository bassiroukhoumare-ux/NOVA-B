import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { motion, AnimatePresence } from 'framer-motion';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Plus, Edit, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [useUrl, setUseUrl] = useState(true);
  const [isAdminAuthor, setIsAdminAuthor] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setArticles(db.getArticles());
  }, []);

  const handleDelete = (id) => {
    if (confirm('Supprimer cet article ?')) {
      const updated = articles.filter(a => a.id !== id);
      setArticles(updated);
      db.saveArticles(updated);
      toast({ title: "Article supprimé" });
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

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newArticle = {
      id: currentArticle ? currentArticle.id : Date.now(),
      title: formData.get('title'),
      excerpt: formData.get('excerpt'),
      content: editorContent,
      author: isAdminAuthor ? "Administrateur NOVA B" : formData.get('author'),
      date: formData.get('date'),
      readingTime: '5 min', // Mock calculation
      category: 'Blog',
      coverImage: useUrl ? formData.get('imageUrl') : (imagePreview || 'https://images.unsplash.com/photo-1697315489353-b011e474f095')
    };

    let updated;
    if (currentArticle) {
      updated = articles.map(a => a.id === newArticle.id ? newArticle : a);
    } else {
      updated = [newArticle, ...articles];
    }
    
    setArticles(updated);
    db.saveArticles(updated);
    setIsModalOpen(false);
    toast({ title: "Article sauvegardé" });
  };

  const openModal = (article = null) => {
    setCurrentArticle(article);
    setEditorContent(article?.content || '');
    setImagePreview(article?.coverImage || '');
    setUseUrl(true);
    setIsAdminAuthor(article?.author === "Administrateur NOVA B");
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
                  <td className="p-4 text-gray-300">{article.date}</td>
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
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Date</label>
                  <input name="date" type="date" defaultValue={currentArticle?.date || new Date().toISOString().split('T')[0]} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
                </div>
                
                {/* Image */}
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Image de Couverture</label>
                    <div className="flex gap-4 mb-2">
                        <button type="button" onClick={() => setUseUrl(true)} className={`text-xs px-3 py-1 rounded-full ${useUrl ? 'bg-terracotta text-white' : 'bg-white/10 text-gray-400'}`}>URL</button>
                        <button type="button" onClick={() => setUseUrl(false)} className={`text-xs px-3 py-1 rounded-full ${!useUrl ? 'bg-terracotta text-white' : 'bg-white/10 text-gray-400'}`}>Upload</button>
                    </div>
                    {useUrl ? (
                        <input name="imageUrl" defaultValue={currentArticle?.coverImage} placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" onChange={(e) => setImagePreview(e.target.value)} />
                    ) : (
                        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-gray-400 text-sm" />
                    )}
                    {imagePreview && <div className="mt-2 h-24 rounded-lg overflow-hidden bg-black/20"><img src={imagePreview} className="w-full h-full object-cover" alt="Preview" /></div>}
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