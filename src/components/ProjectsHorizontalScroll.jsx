import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectsHorizontalScroll = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#252525]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute top-10 left-10 md:left-20 z-10">
          <span className="text-terracotta font-bold tracking-[0.2em] text-sm uppercase mb-2 block">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">Nos Réalisations</h2>
        </div>

        <motion.div style={{ x }} className="flex gap-12 pl-10 md:pl-20 pr-20">
          {projects.map((project, index) => (
            <Link key={project.id} to={`/projets/${project.id}`} className="group relative w-[80vw] md:w-[600px] h-[60vh] md:h-[70vh] flex-shrink-0 overflow-hidden rounded-[40px] border border-white/10 hover:border-terracotta/50 transition-colors">
              <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-terracotta text-sm font-bold uppercase tracking-wider mb-2 block">{project.category}</span>
                    <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">{project.title}</h3>
                    <p className="text-gray-300 line-clamp-2 max-w-sm">{project.description}</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-full backdrop-blur-md group-hover:bg-terracotta transition-colors">
                    <ArrowRight size={24} className="text-white" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {/* See All Card */}
          <Link to="/projets" className="group relative w-[300px] h-[60vh] md:h-[70vh] flex-shrink-0 rounded-[40px] border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
            <div className="text-center">
              <span className="block text-2xl font-bold text-white mb-4">Voir Tout</span>
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mx-auto group-hover:border-terracotta transition-colors">
                <ArrowRight className="text-white group-hover:text-terracotta" />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-10 flex gap-2">
         <div className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
         <div className="w-2 h-2 rounded-full bg-white/20" />
         <div className="w-2 h-2 rounded-full bg-white/20" />
      </div>
    </section>
  );
};

export default ProjectsHorizontalScroll;