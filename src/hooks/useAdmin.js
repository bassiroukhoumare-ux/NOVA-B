import { useState } from 'react';
import { supabase } from '../lib/supabase';

const useAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeAction = async (action) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await action();
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Projects
  const upsertProject = (project) => 
    executeAction(() => supabase.from('projects').upsert(project).select());

  const deleteProject = (id) => 
    executeAction(() => supabase.from('projects').delete().eq('id', id));

  // Articles
  const upsertArticle = (article) => 
    executeAction(() => supabase.from('articles').upsert(article).select());

  const deleteArticle = (id) => 
    executeAction(() => supabase.from('articles').delete().eq('id', id));

  // Team
  const upsertTeamMember = (member) => 
    executeAction(() => supabase.from('team_members').upsert(member).select());

  const deleteTeamMember = (id) => 
    executeAction(() => supabase.from('team_members').delete().eq('id', id));

  // Diagnostics
  const updateDiagnosticStatus = (id, status) => 
    executeAction(() => supabase.from('diagnostics').update({ status }).eq('id', id));

  return {
    loading,
    error,
    upsertProject,
    deleteProject,
    upsertArticle,
    deleteArticle,
    upsertTeamMember,
    deleteTeamMember,
    updateDiagnosticStatus
  };
};

export default useAdmin;
