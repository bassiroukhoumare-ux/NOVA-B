import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '@/lib/db';
import ArticleCard from '@/components/ArticleCard';
import usePageTracking from '@/hooks/usePageTracking';

const ArticlesPage = () => {
  usePageTracking();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setArticles(db.getArticles());
  }, []);

  return (
    <div className="min-h-screen bg-anthracite pt-32 pb-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-terracotta/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-terracotta font-bold tracking-[0.2em] text-sm uppercase mb-3 block">Blog & News</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Actualités & Tendances</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Décryptage de l'architecture, du design et de la construction en Côte d'Ivoire.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;