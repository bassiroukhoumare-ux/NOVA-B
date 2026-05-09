import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import GlassmorphicHeader from '@/components/GlassmorphicHeader';
import GlassmorphicFooter from '@/components/GlassmorphicFooter';
import TechnicalGridBackground from '@/components/TechnicalGridBackground';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import ArticlesPage from '@/pages/ArticlesPage';
import ArticleDetailPage from '@/pages/ArticleDetailPage';
import ProjectDetailPageNOVA from '@/pages/ProjectDetailPageNOVA';
import ProjectsGridNOVA from '@/components/ProjectsGridNOVA';
import MentionsLegales from '@/pages/MentionsLegales';
import PolitiqueConfidentialite from '@/pages/PolitiqueConfidentialite';
import Conditions from '@/pages/Conditions';
import { Toaster } from '@/components/ui/toaster';

// Auth & Admin
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoginPage from '@/pages/LoginPage';
import AdminLayout from '@/layouts/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProjects from '@/pages/admin/AdminProjects';
import AdminTeam from '@/pages/admin/AdminTeam';
import AdminArticles from '@/pages/admin/AdminArticles';
import AdminLegal from '@/pages/admin/AdminLegal';
import AdminDiagnostics from '@/pages/admin/AdminDiagnostics';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Toaster />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <div className="flex flex-col min-h-screen font-sans bg-anthracite text-white selection:bg-terracotta selection:text-white relative">
              <TechnicalGridBackground />
              <GlassmorphicHeader />
              <div className="flex-grow relative z-10"><HomePage /></div>
              <GlassmorphicFooter />
            </div>
          } />
          <Route path="/a-propos" element={<PublicLayout><AboutPage /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
          <Route path="/actualites" element={<PublicLayout><ArticlesPage /></PublicLayout>} />
          <Route path="/actualites/:id" element={<PublicLayout><ArticleDetailPage /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><div className="pt-32 pb-20"><HomePage /></div></PublicLayout>} />
          <Route path="/projets" element={<PublicLayout><div className="pt-32 pb-20"><ProjectsGridNOVA /></div></PublicLayout>} />
          <Route path="/projets/:id" element={<PublicLayout><ProjectDetailPageNOVA /></PublicLayout>} />
          
          <Route path="/mentions-legales" element={<PublicLayout><MentionsLegales /></PublicLayout>} />
          <Route path="/politique-confidentialite" element={<PublicLayout><PolitiqueConfidentialite /></PublicLayout>} />
          <Route path="/conditions" element={<PublicLayout><Conditions /></PublicLayout>} />

          {/* Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="diagnostics" element={<AdminDiagnostics />} />
            <Route path="projets" element={<AdminProjects />} />
            <Route path="equipe" element={<AdminTeam />} />
            <Route path="articles" element={<AdminArticles />} />
            <Route path="legal" element={<AdminLegal />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Wrapper for public layout repetition
const PublicLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen font-sans bg-anthracite text-white selection:bg-terracotta selection:text-white relative">
    <TechnicalGridBackground />
    <GlassmorphicHeader />
    <div className="flex-grow relative z-10">{children}</div>
    <GlassmorphicFooter />
  </div>
);

export default App;