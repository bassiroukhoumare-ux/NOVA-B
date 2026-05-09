import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Tag } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      className="group perspective-1000 h-full"
    >
      <Link to={`/projets/${project.id}`} className="block h-full">
        <motion.div
          whileHover={{ 
            y: -15,
            rotateX: 4, 
            rotateY: 2,
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(211, 97, 43, 0.25)"
          }}
          transition={{ duration: 0.4 }}
          className="relative h-full bg-[#1a1a1a] rounded-[24px] overflow-hidden border border-white/5 transform-style-3d group-hover:border-terracotta/40"
        >
          {/* Image Container with Parallax Effect */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.7 }}
            >
              <img 
                src={project.image} 
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Animated Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-anthracite via-anthracite/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
            
            {/* Floating Year Badge */}
            <motion.div 
              className="absolute top-6 right-6 translate-z-20"
              whileHover={{ z: 20 }}
            >
              <span className="bg-anthracite/80 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                {project.year}
              </span>
            </motion.div>
          </div>
          
          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-z-10">
            <div className="mb-3 flex items-center gap-2 text-terracotta text-sm font-bold uppercase tracking-wider">
              <Tag size={14} />
              {project.category}
            </div>
            
            <h3 className="text-2xl font-display font-bold text-white mb-2 leading-tight group-hover:text-terracotta transition-colors duration-300">
              {project.title}
            </h3>
            
            <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
              <div className="pt-4 flex items-center text-white text-sm font-bold gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                Voir le projet
                <ArrowUpRight size={18} className="text-terracotta" />
              </div>
            </div>
          </div>

          {/* Glow Effect */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-terracotta/20 rounded-[24px] pointer-events-none transition-all duration-300" />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;