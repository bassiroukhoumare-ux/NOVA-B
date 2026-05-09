import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Trash2, X, Search, Calendar, Phone, Mail, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminDiagnostics = () => {
  const [diagnostics, setDiagnostics] = useState([]);
  const [filteredDiagnostics, setFilteredDiagnostics] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedDiag, setSelectedDiag] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const data = db.getDiagnostics();
    setDiagnostics(data);
    setFilteredDiagnostics(data);
  }, []);

  useEffect(() => {
    const filtered = diagnostics.filter(d => 
      d.name.toLowerCase().includes(search.toLowerCase()) || 
      d.email.toLowerCase().includes(search.toLowerCase()) ||
      d.type.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDiagnostics(filtered);
  }, [search, diagnostics]);

  const handleDelete = (id) => {
    if (confirm('Supprimer ce diagnostic ?')) {
      const updated = diagnostics.filter(d => d.id !== id);
      setDiagnostics(updated);
      db.saveDiagnostics(updated);
      toast({ title: "Diagnostic supprimé" });
      if (selectedDiag?.id === id) setSelectedDiag(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-display font-bold text-white">Diagnostics Reçus</h1>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-white focus:outline-none focus:border-terracotta"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-gray-400 uppercase text-xs">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Nom</th>
                <th className="p-4">Projet</th>
                <th className="p-4">Budget</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredDiagnostics.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">Aucun diagnostic trouvé.</td>
                </tr>
              ) : (
                filteredDiagnostics.map(diag => (
                  <tr key={diag.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-gray-300 text-sm">
                      {new Date(diag.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-medium text-white">
                      {diag.name}
                      <div className="text-xs text-gray-500">{diag.email}</div>
                    </td>
                    <td className="p-4 text-gray-300">
                      <span className="bg-white/10 px-2 py-1 rounded text-xs">{diag.type}</span>
                    </td>
                    <td className="p-4 text-terracotta font-medium">{diag.investment}</td>
                    <td className="p-4 flex justify-end gap-2">
                      <button onClick={() => setSelectedDiag(diag)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg"><Eye size={18} /></button>
                      <button onClick={() => handleDelete(diag.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedDiag && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#2C2C2C] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedDiag.type}</h2>
                  <p className="text-sm text-gray-400">Reçu le {new Date(selectedDiag.createdAt).toLocaleString()}</p>
                </div>
                <button onClick={() => setSelectedDiag(null)}><X className="text-gray-400 hover:text-white" /></button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <h3 className="text-terracotta font-bold mb-4 flex items-center gap-2"><MapPin size={18} /> Localisation</h3>
                    <p className="text-white text-lg">{selectedDiag.location}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {selectedDiag.hasLand ? 'Terrain déjà acquis' : 'Recherche de terrain'}
                    </p>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <h3 className="text-terracotta font-bold mb-4 flex items-center gap-2"><Calendar size={18} /> Planning & Budget</h3>
                    <p className="text-white"><span className="text-gray-400">Budget:</span> {selectedDiag.investment}</p>
                    <p className="text-white mt-2"><span className="text-gray-400">Début travaux:</span> {selectedDiag.workDate}</p>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <h3 className="text-terracotta font-bold mb-4">Contact Client</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">
                        {selectedDiag.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-bold">{selectedDiag.name}</p>
                        <p className="text-xs text-gray-400">Client</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                       <a href={`tel:+225${selectedDiag.phone}`} className="flex items-center gap-2 text-gray-300 hover:text-white">
                         <Phone size={16} /> +225 {selectedDiag.phone}
                       </a>
                       <a href={`mailto:${selectedDiag.email}`} className="flex items-center gap-2 text-gray-300 hover:text-white">
                         <Mail size={16} /> {selectedDiag.email}
                       </a>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <button onClick={() => handleDelete(selectedDiag.id)} className="px-4 py-2 text-red-400 hover:bg-red-400/10 rounded-lg flex items-center gap-2">
                    <Trash2 size={18} /> Supprimer
                  </button>
                  <a 
                    href={`https://wa.me/225${selectedDiag.phone.replace(/\s/g, '')}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-[#25D366] text-white px-6 py-2 rounded-xl font-bold hover:brightness-110 transition-all flex items-center gap-2"
                  >
                    Contacter sur WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDiagnostics;