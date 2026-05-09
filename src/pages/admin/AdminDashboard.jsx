import React from 'react';
import usePageTracking from '@/hooks/usePageTracking';
import { motion } from 'framer-motion';
import { Users, MousePointerClick, Clock, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const { getStats } = usePageTracking();
  const stats = getStats();

  const metrics = [
    { label: 'Visites Totales', value: stats.totalVisits, icon: MousePointerClick, color: '#D3612B' },
    { label: 'Visiteurs Uniques', value: stats.uniqueVisitors, icon: Users, color: '#00D9FF' },
    { label: 'Taux de Rebond', value: `${stats.bounceRate}%`, icon: ArrowUpRight, color: '#10B981' },
    { label: 'Temps Moyen', value: '2m 15s', icon: Clock, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-bold text-white">Tableau de Bord</h1>
        <div className="flex gap-2">
          {['Auj', 'Sem', 'Mois', 'Année'].map(period => (
            <button key={period} className="px-3 py-1 rounded-lg bg-white/5 text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/5 border border-white/5 rounded-2xl p-6 backdrop-blur-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-white/5" style={{ color: metric.color }}>
                <metric.icon size={24} />
              </div>
              <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{metric.value}</h3>
            <p className="text-sm text-gray-400">{metric.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white/5 border border-white/5 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Aperçu du Trafic</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.chartData}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D3612B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D3612B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="date" stroke="#ffffff50" tick={{fontSize: 12}} />
                <YAxis stroke="#ffffff50" tick={{fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#2C2C2C', border: '1px solid #ffffff20', borderRadius: '10px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="visits" stroke="#D3612B" fillOpacity={1} fill="url(#colorVisits)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Pages Populaires</h3>
          <div className="space-y-4">
            {stats.topPages.map((page, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <span className="text-sm text-gray-300 truncate max-w-[180px]">{page.path}</span>
                <span className="text-sm font-bold text-terracotta">{page.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;