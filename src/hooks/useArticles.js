import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setArticles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getArticle = async (id) => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  };

  const [likes, setLikes] = useState(() => JSON.parse(localStorage.getItem('NOVA_LIKES') || '{}'));
  const [comments, setComments] = useState(() => JSON.parse(localStorage.getItem('NOVA_COMMENTS') || '{}'));

  useEffect(() => {
    localStorage.setItem('NOVA_LIKES', JSON.stringify(likes));
  }, [likes]);

  useEffect(() => {
    localStorage.setItem('NOVA_COMMENTS', JSON.stringify(comments));
  }, [comments]);

  const toggleLike = (articleId) => {
    setLikes(prev => {
      const newLikes = { ...prev };
      if (newLikes[articleId]) {
        delete newLikes[articleId];
      } else {
        newLikes[articleId] = true;
      }
      return newLikes;
    });
  };

  const addComment = (articleId, comment) => {
    setComments(prev => {
      const articleComments = prev[articleId] || [];
      return {
        ...prev,
        [articleId]: [...articleComments, { ...comment, id: Date.now(), date: new Date().toISOString() }]
      };
    });
  };

  const getComments = (articleId) => {
    return comments[articleId] || [];
  };

  const getLikesCount = (articleId) => {
    // For now it just returns 1 if liked, 0 if not (since it's local only)
    return likes[articleId] ? 1 : 0;
  };

  const isLiked = (articleId) => {
    return !!likes[articleId];
  };

  const getArticleById = async (id) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return { 
    articles, 
    loading, 
    error, 
    refresh: fetchArticles, 
    getArticle, 
    getArticleById,
    toggleLike, 
    addComment, 
    getComments, 
    getLikesCount, 
    isLiked 
  };
};

export default useArticles;