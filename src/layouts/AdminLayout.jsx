import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, FolderKanban, Users, FileText, Newspaper, LogOut, Menu, X, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/diagnostics', icon: MessageSquare, label: 'Diagnostics' },
    { path: '/admin/projets', icon: FolderKanban, label: 'Projets' },
    { path: '/admin/testimonials', icon: Star, label: 'Témoignages' },
    { path: '/admin/articles', icon: Newspaper, label: 'Actualités' },
    { path: '/admin/legal', icon: FileText, label: 'Pages Légales' },
  ];

  return (
    <div className="min-h-screen bg-anthracite flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#252525] border-r border-white/5 sticky top-0 h-screen">
        <div className="p-6 border-b border-white/5 flex items-center justify-center">
           <img 
            src="https://horizons-cdn.hostinger.com/05e9ca02-310b-48b9-814b-4798f423a225/fb7b17fa133b1878a85011680feb30b7.png" 
            alt="NOVA B" 
            className="h-8"
          />
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                location.pathname === item.path 
                  ? "bg-terracotta text-white shadow-lg shadow-terracotta/20" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors font-medium text-sm"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile Header & Overlay */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between p-4 bg-[#252525] border-b border-white/5">
           <img src="https://horizons-cdn.hostinger.com/05e9ca02-310b-48b9-814b-4798f423a225/fb7b17fa133b1878a85011680feb30b7.png" alt="Logo" className="h-8" />
           <button onClick={() => setIsMobileOpen(true)} className="text-white p-2"><Menu size={24} /></button>
        </header>

        <AnimatePresence>
          {isMobileOpen && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileOpen(false)}
            >
              <motion.div
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                className="absolute right-0 top-0 bottom-0 w-64 bg-[#252525] p-4 shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-end mb-8"><button onClick={() => setIsMobileOpen(false)} className="text-white"><X size={24} /></button></div>
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                        location.pathname === item.path ? "bg-terracotta text-white" : "text-gray-400"
                      )}
                    >
                      <item.icon size={18} />
                      {item.label}
                    </Link>
                  ))}
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 mt-8">
                    <LogOut size={18} /> Déconnexion
                  </button>
                </nav>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;