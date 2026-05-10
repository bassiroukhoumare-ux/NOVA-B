import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowRight, MapPin, Tag, Calendar } from 'lucide-react';
import useProjects from '@/hooks/useProjects';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProjectById } = useProjects();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const data = await getProjectById(id);
      if (data) {
        setProject(data);
      } else {
        // Fallback for non-UUID ids (legacy mock ids)
        // If it's a numeric ID, we might have issues if Supabase uses UUIDs
        // But for this migration, we'll assume valid IDs are used
        navigate('/projets');
      }
      setLoading(false);
    };
    fetchProject();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (loading) return <div className="text-white text-center pt-40">Chargement...</div>;
  if (!project) return null;

  return (
    <div className="bg-anthracite min-h-screen">
      {/* Immersive Hero */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-anthracite via-anthracite/50 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-20 relative z-10">
            <Link 
              to="/projets" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-md hover:bg-white/20"
            >
              <ChevronLeft size={20} /> Retour aux projets
            </Link>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="bg-terracotta text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg shadow-terracotta/20">
                  {project.category}
                </span>
                <span className="text-white/80 flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                  <Calendar size={14} /> {project.year}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 leading-tight">
                {project.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        {/* Navigation Breadcrumbs Logic */}
        <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-8">
           <Link 
             to="/projets"
             className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm uppercase tracking-wider"
           >
             <ChevronLeft size={16} /> Explorer d'autres projets
           </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold text-white mb-8">Concept & Réalisation</h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-12 font-light">
                {project.description}
              </p>
            </motion.div>
            
            <div className="space-y-12">
              <h3 className="text-2xl font-display font-bold text-white mb-6">Galerie Immersion</h3>
              {project.gallery.map((img, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-3xl overflow-hidden shadow-2xl relative group"
                >
                  <img src={img} alt={`Vue ${idx+1}`} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/10 shadow-xl">
                <h3 className="text-xl font-display font-bold text-white mb-8">Fiche Technique</h3>
                <ul className="space-y-6 mb-10 text-gray-300">
                  <li className="flex justify-between border-b border-white/10 pb-4">
                    <span className="text-sm uppercase tracking-wider text-gray-500">Année</span> 
                    <span className="text-white font-bold">{project.year}</span>
                  </li>
                  <li className="flex justify-between border-b border-white/10 pb-4">
                    <span className="text-sm uppercase tracking-wider text-gray-500">Client</span> 
                    <span className="text-white font-bold">Privé</span>
                  </li>
                  <li className="flex justify-between border-b border-white/10 pb-4">
                    <span className="text-sm uppercase tracking-wider text-gray-500">Lieu</span> 
                    <span className="text-white font-bold flex items-center gap-2">
                      <MapPin size={16} className="text-terracotta" /> Abidjan
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-white/10 pb-4">
                    <span className="text-sm uppercase tracking-wider text-gray-500">Type</span> 
                    <span className="text-white font-bold">{project.category}</span>
                  </li>
                </ul>
                <Link to="/contact">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-terracotta text-white py-4 rounded-[16px] font-bold shadow-lg shadow-terracotta/20 hover:shadow-terracotta/40 transition-all flex items-center justify-center gap-2"
                  >
                    Demander un devis similaire
                    <ArrowRight size={18} />
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;