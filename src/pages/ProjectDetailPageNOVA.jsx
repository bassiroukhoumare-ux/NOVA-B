import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowRight, MapPin, Calendar, Tag } from 'lucide-react';
import { projects } from '@/lib/data';
const ProjectDetailPageNOVA = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === parseInt(id));
  useEffect(() => {
    if (!project) navigate('/projets');
    window.scrollTo(0, 0);
  }, [id, project, navigate]);
  if (!project) return null;
  return <div className="bg-anthracite min-h-screen pb-20">
      {/* Immersive Hero with Parallax */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        <motion.div initial={{
        scale: 1.1
      }} animate={{
        scale: 1
      }} transition={{
        duration: 2
      }} className="absolute inset-0">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-anthracite via-anthracite/40 to-transparent" />
        </motion.div>
        
        <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-6 pb-24 z-10">
          <Link to="/projets" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-10 transition-colors bg-black/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 w-fit hover:bg-black/40">
            <ChevronLeft size={20} /> Retour aux projets
          </Link>
          
          <motion.div initial={{
          opacity: 0,
          y: 50
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3,
          duration: 0.8
        }}>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-terracotta text-white px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg shadow-terracotta/20">
                {project.category}
              </span>
              <span className="text-white/90 flex items-center gap-2 bg-white/10 px-5 py-2 rounded-full backdrop-blur-md border border-white/10 font-medium">
                <Calendar size={16} /> {project.year}
              </span>
            </div>
            <h1 className="text-5xl md:text-8xl font-display font-bold text-white mb-6 leading-none drop-shadow-2xl">
              {project.title}
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-20">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="bg-[#252525] p-10 md:p-14 rounded-[40px] border border-white/5 shadow-2xl">
              <h2 className="text-3xl font-display font-bold text-white mb-8">Concept</h2>
              <p className="text-xl text-gray-300 leading-relaxed font-light">
                {project.description}
              </p>
            </motion.div>
            
            <div className="space-y-12">
              <h3 className="text-3xl font-display font-bold text-white pl-4 border-l-4 border-terracotta">Images du projet</h3>
              <div className="grid gap-12">
                {project.gallery.map((img, idx) => <motion.div key={idx} initial={{
                opacity: 0,
                y: 50,
                scale: 0.95
              }} whileInView={{
                opacity: 1,
                y: 0,
                scale: 1
              }} viewport={{
                once: true
              }} transition={{
                delay: idx * 0.1,
                duration: 0.8
              }} className="rounded-[40px] overflow-hidden shadow-2xl relative group h-[600px]">
                    <img src={img} alt={`Vue ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>)}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <motion.div initial={{
              opacity: 0,
              x: 20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 0.5
            }} className="bg-[#1e1e1e]/80 backdrop-blur-xl p-10 rounded-[30px] border border-white/10 shadow-xl">
                <h3 className="text-2xl font-display font-bold text-white mb-8">Détails du Projet</h3>
                <ul className="space-y-6 mb-10">
                  <li className="flex justify-between border-b border-white/10 pb-4">
                    <span className="text-sm uppercase tracking-wider text-gray-500 font-bold">Client</span> 
                    <span className="text-white font-medium">Confidentiel</span>
                  </li>
                  <li className="flex justify-between border-b border-white/10 pb-4">
                    <span className="text-sm uppercase tracking-wider text-gray-500 font-bold">Lieu</span> 
                    <span className="text-white font-medium flex items-center gap-2">
                      <MapPin size={16} className="text-terracotta" /> Abidjan, CI
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-white/10 pb-4">
                    <span className="text-sm uppercase tracking-wider text-gray-500 font-bold">Services</span> 
                    <span className="text-white font-medium text-right">Architecture, Interior Design</span>
                  </li>
                </ul>
                <Link to="/contact">
                  <motion.button whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(211,97,43,0.3)"
                }} whileTap={{
                  scale: 0.98
                }} className="w-full bg-gradient-to-r from-terracotta to-[#ff8c55] text-white py-5 rounded-[20px] font-bold shadow-lg transition-all flex items-center justify-center gap-2 text-lg">
                    Demander un devis similaire
                  </motion.button>
                </Link>
              </motion.div>

              {/* Navigation Arrows */}
              <div className="flex gap-4">
                <button onClick={() => navigate(`/projets/${project.id === 1 ? 4 : project.id - 1}`)} className="flex-1 bg-white/5 hover:bg-white/10 p-6 rounded-[20px] text-white flex flex-col items-center gap-2 transition-colors border border-white/5">
                  <ChevronLeft size={24} />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Précédent</span>
                </button>
                <button onClick={() => navigate(`/projets/${project.id === 4 ? 1 : project.id + 1}`)} className="flex-1 bg-white/5 hover:bg-white/10 p-6 rounded-[20px] text-white flex flex-col items-center gap-2 transition-colors border border-white/5">
                  <ArrowRight size={24} />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Suivant</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default ProjectDetailPageNOVA;