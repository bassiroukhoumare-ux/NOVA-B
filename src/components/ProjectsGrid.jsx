import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { projects } from '@/lib/data';

const ProjectsGrid = () => {
  return (
    <section className="py-32 bg-[#252525] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-terracotta/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
        >
          <div>
            <span className="text-terracotta text-sm font-bold tracking-widest uppercase mb-2 block">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Nos Réalisations
            </h2>
            <p className="text-gray-400 max-w-lg text-lg">
              Une collection de projets où l'innovation technique rencontre l'élégance intemporelle.
            </p>
          </div>
          <Link 
            to="/projets" 
            className="hidden md:flex items-center gap-2 text-white hover:text-terracotta font-medium transition-colors group px-6 py-3 rounded-full border border-white/10 hover:border-terracotta"
          >
            Voir tous les projets
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center md:hidden">
          <Link 
            to="/projets" 
            className="inline-flex items-center gap-2 text-white bg-terracotta px-6 py-3 rounded-full font-bold shadow-lg shadow-terracotta/20"
          >
            Voir tous les projets <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;