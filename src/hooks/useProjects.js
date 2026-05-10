import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, category, year, description, image, status, created_at, client, location, published_at')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getProject = async (id) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  };

  const getProjectById = async (id) => {
    try {
      const { data, error } = await supabase
        .from('projects')
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
    projects,
    loading,
    error,
    refresh: fetchProjects,
    getProjectById
  };
};

export default useProjects;
