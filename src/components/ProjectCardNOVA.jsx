import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, MapPin } from 'lucide-react';

const ProjectCardNOVA = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 5 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.8, type: "spring" }}
      className="group h-[500px] w-full perspective-1000"
    >
      <Link to={`/projets/${project.id}`} className="block h-full w-full">
        <motion.div
          whileHover={{ 
            translateY: -10,
            rotateX: 2,
            boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.5), 0 0 20px rgba(211, 97, 43, 0.1)"
          }}
          className="relative h-full w-full rounded-[30px] overflow-hidden bg-anthracite border border-white/5 transform-style-3d transition-all duration-500"
        >
          {/* Image */}
          <div className="absolute inset-0 z-0">
            <motion.img 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.7 }}
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
          </div>

          {/* Floating Details */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
             <span className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg">
               {project.category}
             </span>
             <span className="bg-anthracite/80 backdrop-blur-md border border-white/10 w-10 h-10 rounded-full flex items-center justify-center text-terracotta shadow-lg transform group-hover:rotate-45 transition-transform duration-500">
               <ArrowUpRight size={20} />
             </span>
          </div>

          {/* Bottom Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 z-10 transform translate-z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-3xl font-display font-bold text-white mb-2 leading-tight group-hover:text-terracotta transition-colors duration-300">
                {project.title}
              </h3>
              
              <div className="flex items-center gap-4 text-gray-300 text-sm font-medium mb-4">
                <span className="flex items-center gap-1"><Calendar size={14} className="text-terracotta" /> {project.year}</span>
                <span className="w-1 h-1 bg-white/30 rounded-full" />
                <span className="flex items-center gap-1"><MapPin size={14} className="text-terracotta" /> Abidjan</span>
              </div>

              <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                <p className="text-gray-400 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 pt-2 border-t border-white/10">
                  {project.description}
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Glass Overlay on Hover */}
          <div className="absolute inset-0 bg-terracotta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProjectCardNOVA;