import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useProjects from '@/hooks/useProjects';
import { ArrowRight } from 'lucide-react';

const ProjectsSlider = () => {
  const { projects: rawProjects, loading } = useProjects();

  if (loading || rawProjects.length === 0) return null;

  return (
    <section className="py-24 bg-[#252525] relative overflow-hidden">
      <div className="container mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-end relative z-10">
        <div className="w-full text-center md:text-left">
          <span className="text-terracotta font-bold tracking-[0.2em] text-sm md:text-base uppercase mb-2 block">Portfolio</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white">Nos Réalisations</h2>
        </div>
      </div>

      <div className="relative w-full">
        {/* Fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-[#252525] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-[#252525] to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-6 md:gap-8 overflow-x-auto pb-10 pl-6 pr-6 md:pl-[10vw] snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {rawProjects.map((project, index) => (
            <Link 
              key={`${project.id}-${index}`} 
              to={`/projets/${project.id}`} 
              className="group relative w-[85vw] sm:w-[300px] md:w-[400px] h-[400px] md:h-[450px] rounded-[30px] overflow-hidden flex-shrink-0 border border-white/10 bg-anthracite shadow-xl snap-center"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                 <span className="text-terracotta text-xs md:text-sm font-bold uppercase tracking-wider mb-2 block">{project.category}</span>
                 <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 leading-tight">{project.title}</h3>
                 <p className="text-gray-300 line-clamp-2 text-sm max-w-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{project.description}</p>
                 <div className="flex items-center gap-2 text-white font-bold text-sm group-hover:text-terracotta transition-colors">
                   Voir le projet <ArrowRight size={16} />
                 </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSlider;