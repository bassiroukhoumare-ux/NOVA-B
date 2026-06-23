import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { isVideoUrl } from '../lib/media';

const ArticleCard = ({ article, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-[30px] overflow-hidden hover:shadow-[0_0_30px_rgba(211,97,43,0.15)] transition-all duration-300 flex flex-col h-full"
    >
      <Link to={`/actualites/${article.id}`} className="block relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-terracotta/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
        {isVideoUrl(article.cover_image) ? (
          <video
            src={article.cover_image}
            muted
            loop
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-terracotta/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {article.category}
          </span>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1"><Calendar size={12} className="text-terracotta" /> {article.published_at?.split('T')[0]}</span>
          <span className="flex items-center gap-1"><User size={12} className="text-terracotta" /> {article.author}</span>
        </div>
        
        <Link to={`/actualites/${article.id}`}>
          <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-terracotta transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-1 font-light leading-relaxed">
          {article.excerpt}
        </p>
        
        <Link 
          to={`/actualites/${article.id}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-terracotta transition-colors mt-auto group/btn"
        >
          Lire plus <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ArticleCard;