import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-anthracite">
        <Loader2 className="w-10 h-10 text-terracotta animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/adminovaci/connexion" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
