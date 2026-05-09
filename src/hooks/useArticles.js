import { useState, useEffect } from 'react';
import { articles as initialArticles } from '@/lib/data';

const useArticles = () => {
  const [articles, setArticles] = useState(initialArticles);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    // Load likes and comments from localStorage
    const storedLikes = JSON.parse(localStorage.getItem('novab_article_likes') || '{}');
    const storedComments = JSON.parse(localStorage.getItem('novab_article_comments') || '{}');
    setLikes(storedLikes);
    setComments(storedComments);
  }, []);

  const getArticle = (id) => {
    return articles.find(a => a.id === parseInt(id));
  };

  const toggleLike = (articleId) => {
    const newLikes = { ...likes };
    if (newLikes[articleId]) {
      delete newLikes[articleId];
    } else {
      newLikes[articleId] = true;
    }
    setLikes(newLikes);
    localStorage.setItem('novab_article_likes', JSON.stringify(newLikes));
  };

  const addComment = (articleId, comment) => {
    const articleComments = comments[articleId] || [];
    const newComment = {
      id: Date.now(),
      ...comment,
      date: new Date().toISOString()
    };
    const newComments = {
      ...comments,
      [articleId]: [newComment, ...articleComments]
    };
    setComments(newComments);
    localStorage.setItem('novab_article_comments', JSON.stringify(newComments));
  };

  const getComments = (articleId) => {
    return comments[articleId] || [];
  };

  const getLikesCount = (articleId) => {
    // Determine a base count based on ID to make it look active, plus user like
    const baseCount = articleId * 14 + 7;
    return likes[articleId] ? baseCount + 1 : baseCount;
  };

  const isLiked = (articleId) => !!likes[articleId];

  return {
    articles,
    getArticle,
    toggleLike,
    addComment,
    getComments,
    getLikesCount,
    isLiked
  };
};

export default useArticles;