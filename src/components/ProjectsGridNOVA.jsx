import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useProjects from '@/hooks/useProjects';

const ProjectsGridNOVA = () => {
  const { projects, loading } = useProjects();
  const [selectedFilter, setSelectedFilter] = useState('Tous');

  const filters = [
    'Tous', 
    'Résidentiel', 
    'Commercial', 
    'Décoration', 
    'Rénovation', 
    'Construction', 
    'Architecture'
  ];

  const filteredProjects = selectedFilter === 'Tous' 
    ? projects 
    : projects.filter(project => {
        if (!project.category) return false;
        // Check if category matches or contains the filter
        return project.category.toLowerCase().includes(selectedFilter.toLowerCase());
      });

  return (
    <div className="container mx-auto px-6">
      
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
              selectedFilter === filter 
                ? 'bg-terracotta/20 border-terracotta text-terracotta shadow-[0_0_20px_rgba(204,88,51,0.2)]' 
                : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative h-[400px] rounded-[30px] overflow-hidden border border-white/10"
              >
                <Link to={`/projets/${project.id}`}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-0 left-0 p-8">
                    <span className="text-terracotta text-sm font-bold uppercase tracking-wider mb-2 block">{project.category}</span>
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <div className="flex items-center gap-2 text-white/80 group-hover:text-terracotta transition-colors text-sm font-medium">
                      Voir le projet <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-24 text-gray-500"
            >
              <p className="text-lg">Aucun projet trouvé dans cette catégorie.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProjectsGridNOVA;