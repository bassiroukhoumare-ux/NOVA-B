import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  FolderKanban, 
  Newspaper, 
  Users, 
  Calendar,
  ArrowUpRight,
  Clock,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    news: 0,
    members: 0,
    lastUpdate: null
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get counts
        const [projectsCount, newsCount, membersCount] = await Promise.all([
          supabase.from('projects').select('*', { count: 'exact', head: true }),
          supabase.from('articles').select('*', { count: 'exact', head: true }),
          supabase.from('team_members').select('*', { count: 'exact', head: true })
        ]);

        // Get recent activity (mixed)
        const [recentProjects, recentNews] = await Promise.all([
          supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(5),
          supabase.from('articles').select('*').order('created_at', { ascending: false }).limit(5)
        ]);

        const combined = [
          ...(recentProjects.data || []).map(p => ({ ...p, type: 'project', label: 'Projet' })),
          ...(recentNews.data || []).map(n => ({ ...n, type: 'news', label: 'Actualité' }))
        ]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);

        setStats({
          projects: projectsCount.count || 0,
          news: newsCount.count || 0,
          members: membersCount.count || 0,
          lastUpdate: combined[0]?.created_at || null
        });
        setRecentActivity(combined);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    { label: 'Projets', value: stats.projects, icon: FolderKanban, color: 'bg-blue-500/10 text-blue-500' },
    { label: 'Actualités', value: stats.news, icon: Newspaper, color: 'bg-terracotta/10 text-terracotta' },
    { label: 'Équipe', value: stats.members, icon: Users, color: 'bg-purple-500/10 text-purple-500' },
    { 
      label: 'Dernière Publication', 
      value: stats.lastUpdate ? new Date(stats.lastUpdate).toLocaleDateString('fr-FR') : 'Aucune', 
      icon: Calendar, 
      color: 'bg-green-500/10 text-green-500' 
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-terracotta border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/5 border border-white/10 p-6 rounded-[32px] hover:border-white/20 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-2xl ${card.color}`}>
                <card.icon size={24} />
              </div>
              <ArrowUpRight className="text-gray-600 group-hover:text-white transition-colors" size={20} />
            </div>
            <p className="text-3xl font-display font-bold text-white mb-1">{card.value}</p>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{card.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Activité récente</h3>
            <button className="text-sm text-terracotta hover:underline font-medium">Voir tout</button>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
            {recentActivity.length > 0 ? (
              recentActivity.map((item, idx) => (
                <div 
                  key={idx}
                  className={`p-6 flex items-center justify-between hover:bg-white/5 transition-colors ${
                    idx !== recentActivity.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl ${
                      item.type === 'project' ? 'bg-blue-500/10 text-blue-500' : 'bg-terracotta/10 text-terracotta'
                    }`}>
                      {item.type === 'project' ? <FolderKanban size={18} /> : <Newspaper size={18} />}
                    </div>
                    <div>
                      <p className="text-white font-bold">{item.title}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <span className="uppercase tracking-widest">{item.label}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(item.created_at).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    item.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'
                  }`}>
                    {item.status || 'published'}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-gray-500">Aucune activité récente</div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white">Actions rapides</h3>
          <div className="space-y-4">
            <Link 
              to="/adminovaci/projects?action=new"
              className="w-full bg-terracotta hover:bg-terracotta/90 text-white font-bold p-4 rounded-2xl flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <Plus size={20} />
                Nouveau projet
              </div>
              <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link 
              to="/adminovaci/news?action=new"
              className="w-full bg-white/5 hover:bg-white/10 text-white font-bold p-4 rounded-2xl border border-white/10 flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <Plus size={20} />
                Nouvelle actu
              </div>
              <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link 
              to="/adminovaci/members?action=new"
              className="w-full bg-white/5 hover:bg-white/10 text-white font-bold p-4 rounded-2xl border border-white/10 flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <Plus size={20} />
                Ajouter membre
              </div>
              <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
