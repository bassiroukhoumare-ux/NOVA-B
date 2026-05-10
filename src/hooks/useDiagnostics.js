import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const useDiagnostics = () => {
  const [diagnostics, setDiagnostics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDiagnostics();
  }, []);

  const fetchDiagnostics = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('diagnostics')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Parse the JSON message if it's a string
      const parsedData = data.map(d => {
        try {
          const details = typeof d.message === 'string' ? JSON.parse(d.message) : d.message;
          return { ...d, ...details };
        } catch (e) {
          return d;
        }
      });
      
      setDiagnostics(parsedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteDiagnostic = async (id) => {
    const { error } = await supabase.from('diagnostics').delete().eq('id', id);
    if (error) throw error;
    setDiagnostics(prev => prev.filter(d => d.id !== id));
  };

  return {
    diagnostics,
    loading,
    error,
    deleteDiagnostic,
    refresh: fetchDiagnostics
  };
};

export default useDiagnostics;
