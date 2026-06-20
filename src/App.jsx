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
import ServicesPage from '@/pages/ServicesPage';
import MentionsLegales from '@/pages/MentionsLegales';
import PolitiqueConfidentialite from '@/pages/PolitiqueConfidentialite';
import Conditions from '@/pages/Conditions';
import { Toaster } from '@/components/ui/toaster';

// Auth & Admin
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLogin from '@/pages/admin/Login';
import AdminResetPassword from '@/pages/admin/ResetPassword';
import AdminNewPassword from '@/pages/admin/NewPassword';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminProjects from '@/pages/admin/Projects';
import AdminNews from '@/pages/admin/News';
import AdminMembers from '@/pages/admin/Members';
import AdminCategories from '@/pages/admin/Categories';
import AdminSettings from '@/pages/admin/Settings';
import MaintenancePage from '@/pages/MaintenancePage';

// Activer / désactiver le mode maintenance
const MAINTENANCE_MODE = true;

function App() {
  if (MAINTENANCE_MODE) {
    return <MaintenancePage />;
  }

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
          <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
          <Route path="/projets" element={<PublicLayout><div className="pt-32 pb-20"><ProjectsGridNOVA /></div></PublicLayout>} />
          <Route path="/projets/:id" element={<PublicLayout><ProjectDetailPageNOVA /></PublicLayout>} />
          
          <Route path="/mentions-legales" element={<PublicLayout><MentionsLegales /></PublicLayout>} />
          <Route path="/politique-confidentialite" element={<PublicLayout><PolitiqueConfidentialite /></PublicLayout>} />
          <Route path="/conditions" element={<PublicLayout><Conditions /></PublicLayout>} />

          {/* Adminovaci - Public */}
          <Route path="/adminovaci/connexion" element={<AdminLogin />} />
          <Route path="/adminovaci/reset-password" element={<AdminResetPassword />} />
          <Route path="/adminovaci/nouveau-password" element={<AdminNewPassword />} />

          {/* Adminovaci - Protected */}
          <Route path="/adminovaci" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="news" element={<AdminNews />} />
            <Route path="members" element={<AdminMembers />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="parametres" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="/adminovaci/connexion" replace />} />
          </Route>

          {/* Catch all adminovaci non-defined routes */}
          <Route path="/adminovaci/*" element={<Navigate to="/adminovaci/connexion" replace />} />
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