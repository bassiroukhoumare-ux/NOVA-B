import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useArticles from '@/hooks/useArticles';
import { ChevronLeft, Calendar, User, Clock, Heart, Share2, Facebook, Linkedin, Twitter, Copy, Send } from 'lucide-react';

const ArticleDetailPage = () => {
  const { id } = useParams();
  const { getArticle, toggleLike, addComment, getComments, getLikesCount, isLiked } = useArticles();
  const article = getArticle(id);
  const [commentForm, setCommentForm] = useState({ name: '', email: '', text: '' });
  const [copied, setCopied] = useState(false);

  if (!article) return <div className="text-white text-center pt-40">Article non trouvé</div>;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentForm.text.trim()) return;
    addComment(article.id, {
      name: commentForm.name || 'Anonyme',
      text: commentForm.text
    });
    setCommentForm({ name: '', email: '', text: '' });
  };

  return (
    <div className="bg-anthracite min-h-screen pb-20">
      {/* Hero Image */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          src={article.coverImage} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-anthracite via-anthracite/60 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-6 pb-20">
          <Link to="/actualites" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors">
            <ChevronLeft size={20} /> Retour aux actualités
          </Link>
          <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-4">
             <span className="bg-terracotta px-3 py-1 rounded-full text-white font-bold">{article.category}</span>
             <span className="flex items-center gap-1"><Calendar size={14} /> {article.date}</span>
             <span className="flex items-center gap-1"><Clock size={14} /> {article.readingTime} de lecture</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white max-w-4xl leading-tight">
            {article.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 -mt-10 relative z-10">
        {/* Main Content */}
        <div className="lg:col-span-8 bg-[#2C2C2C] border border-white/5 rounded-[30px] p-8 md:p-12 shadow-2xl">
          <div className="prose prose-invert prose-lg max-w-none font-light leading-relaxed">
            <p className="text-xl text-white font-medium mb-8 border-l-4 border-terracotta pl-6 italic">
              {article.excerpt}
            </p>
            {article.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-6 text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => toggleLike(article.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${isLiked(article.id) ? 'bg-terracotta text-white shadow-lg shadow-terracotta/30' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
              >
                <Heart size={20} fill={isLiked(article.id) ? "currentColor" : "none"} />
                <span className="font-bold">{getLikesCount(article.id)}</span>
              </button>
            </div>
            <div className="flex gap-2">
              <button className="p-3 bg-blue-600 rounded-full text-white hover:scale-110 transition-transform"><Facebook size={18} /></button>
              <button className="p-3 bg-blue-500 rounded-full text-white hover:scale-110 transition-transform"><Linkedin size={18} /></button>
              <button className="p-3 bg-sky-500 rounded-full text-white hover:scale-110 transition-transform"><Twitter size={18} /></button>
              <button 
                onClick={handleCopyLink}
                className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all relative"
              >
                {copied ? <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black px-2 py-1 rounded text-white">Copié!</span> : null}
                <Copy size={18} />
              </button>
            </div>
          </div>
          
          {/* Comments Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-8">Commentaires ({getComments(article.id).length})</h3>
            
            <form onSubmit={handleSubmitComment} className="mb-12 bg-white/5 p-6 rounded-2xl border border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input 
                  type="text" 
                  placeholder="Nom (Optionnel)" 
                  className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-terracotta focus:outline-none"
                  value={commentForm.name}
                  onChange={e => setCommentForm({...commentForm, name: e.target.value})}
                />
                <input 
                  type="email" 
                  placeholder="Email (Non publié)" 
                  className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-terracotta focus:outline-none"
                  value={commentForm.email}
                  onChange={e => setCommentForm({...commentForm, email: e.target.value})}
                />
              </div>
              <textarea 
                placeholder="Votre commentaire..." 
                rows="3"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-terracotta focus:outline-none mb-4"
                value={commentForm.text}
                onChange={e => setCommentForm({...commentForm, text: e.target.value})}
                required
              />
              <button type="submit" className="bg-white text-anthracite px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                Publier <Send size={16} />
              </button>
            </form>

            <div className="space-y-6">
              {getComments(article.id).map(comment => (
                <div key={comment.id} className="border-b border-white/5 pb-6 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-white">{comment.name}</span>
                    <span className="text-xs text-gray-500">{new Date(comment.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{comment.text}</p>
                </div>
              ))}
              {getComments(article.id).length === 0 && (
                <p className="text-gray-500 italic text-center py-4">Soyez le premier à commenter !</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-[#2C2C2C] p-8 rounded-[30px] border border-white/10 sticky top-32">
             <div className="flex items-center gap-4 mb-6">
               <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1493882552576-fce827c6161e" alt="Author" className="w-full h-full object-cover" />
               </div>
               <div>
                 <p className="text-xs text-terracotta font-bold uppercase tracking-wider">Auteur</p>
                 <h4 className="text-white font-bold text-lg">{article.author}</h4>
               </div>
             </div>
             <p className="text-gray-400 text-sm mb-6">
               Architecte principal chez NOVA B, passionné par l'intégration de la modernité dans le contexte culturel africain.
             </p>
             <button className="w-full border border-white/20 text-white py-3 rounded-xl hover:bg-white/5 transition-colors font-medium">
               Voir tous ses articles
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;