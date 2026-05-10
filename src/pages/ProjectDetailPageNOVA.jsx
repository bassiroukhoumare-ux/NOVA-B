import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowRight, MapPin, Calendar, Tag } from 'lucide-react';
import useProjects from '@/hooks/useProjects';

const ProjectDetailPageNOVA = () => {
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
        navigate('/projets');
      }
      setLoading(false);
    };
    fetchProject();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (loading) return <div className="text-white text-center pt-40">Chargement...</div>;
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
              <h2 className="text-3xl font-display font-bold text-white mb-8">Concept & Détails</h2>
              {project.content ? (
                  <div 
                    className="text-xl text-gray-300 leading-relaxed font-light prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: project.content }}
                  />
              ) : (
                  <div className="text-xl text-gray-300 leading-relaxed font-light whitespace-pre-line">
                    {project.description}
                  </div>
              )}
            </motion.div>
            
            <div className="space-y-12">
              <h3 className="text-3xl font-display font-bold text-white pl-4 border-l-4 border-terracotta">Images du projet</h3>
              <div className="grid gap-12">
                {project.gallery && project.gallery.map((img, idx) => <motion.div key={idx} initial={{
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
                  {project.client !== 'Client Confidentiel' && (
                    <li className="flex justify-between border-b border-white/10 pb-4">
                      <span className="text-sm uppercase tracking-wider text-gray-500 font-bold">Client</span> 
                      <span className="text-white font-medium">{project.client}</span>
                    </li>
                  )}
                  <li className="flex justify-between border-b border-white/10 pb-4">
                    <span className="text-sm uppercase tracking-wider text-gray-500 font-bold">Lieu</span> 
                    <span className="text-white font-medium flex items-center gap-2">
                      <MapPin size={16} className="text-terracotta" /> {project.location || "Abidjan, CI"}
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-white/10 pb-4">
                    <span className="text-sm uppercase tracking-wider text-gray-500 font-bold">Services</span> 
                    <span className="text-white font-medium text-right">{project.category}</span>
                  </li>
                </ul>
                <Link to="/contact">
                  <motion.button whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(211,97,43,0.3)"
                }} whileTap={{
                  scale: 0.98
                }} className="w-full bg-gradient-to-r from-terracotta to-[#ff8c55] text-white py-5 rounded-[20px] font-bold shadow-lg transition-all flex items-center justify-center gap-2 text-lg mb-6">
                    Demander un devis similaire
                  </motion.button>
                </Link>

                {/* Share Buttons */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-4">Partager le projet</p>
                  <div className="flex gap-3">
                    <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-colors">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14-3.468 0-5.643 2.138-5.643 5.84V9.5H6.5v4h2.5v10h5v-10z"/></svg>
                    </button>
                    <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(project.title)}`, '_blank')} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#1DA1F2] hover:border-[#1DA1F2] transition-colors">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    </button>
                    <button onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(project.title)}`, '_blank')} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-colors">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </button>
                    <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Lien copié !'); }} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-terracotta hover:border-terracotta transition-colors">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Navigation Link */}
              <div className="flex gap-4">
                <Link to="/projets" className="flex-1 bg-white/5 hover:bg-white/10 p-6 rounded-[20px] text-white flex flex-col items-center gap-2 transition-colors border border-white/5">
                  <ChevronLeft size={24} />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Explorer d'autres projets</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default ProjectDetailPageNOVA;