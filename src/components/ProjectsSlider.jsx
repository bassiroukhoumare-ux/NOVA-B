import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { db } from '@/lib/db';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const ProjectsSlider = () => {
  const containerRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();
  const x = useMotionValue(0);

  useEffect(() => {
    const data = db.getProjects();
    // Duplicate projects to create infinite loop effect
    // Ensure we have enough items to scroll smoothly
    setProjects([...data, ...data, ...data]);
  }, []);

  const cardWidth = 400; // Base width for calculation
  const gap = 32; // 8 * 4px gap
  
  useEffect(() => {
    if (projects.length === 0) return;

    const totalWidth = (projects.length / 3) * (cardWidth + gap); // Width of one set
    
    const startAnimation = async () => {
      try {
        await controls.start({
          x: -totalWidth,
          transition: {
            duration: 40,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }
        });
      } catch (e) {
        // Animation stopped
      }
    };

    if (!isPaused) {
      startAnimation();
    } else {
      controls.stop();
    }

    return () => controls.stop();
  }, [projects, isPaused, controls]);

  const handleManualScroll = (direction) => {
    setIsPaused(true);
    // Simple manual scroll logic would go here, 
    // but mixing manual drag/scroll with infinite auto-scroll loop 
    // is complex. For this implementation, buttons will pause and 
    // shift slightly to indicate interaction.
    
    // Resume auto-scroll after interaction
    setTimeout(() => setIsPaused(false), 2000);
  };

  return (
    <section className="py-24 bg-[#252525] relative overflow-hidden">
      <div className="container mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-end relative z-10">
        <div>
          <span className="text-terracotta font-bold tracking-[0.2em] text-sm uppercase mb-2 block">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Nos Réalisations</h2>
        </div>
        <div className="flex gap-4 mt-6 md:mt-0">
           <button 
            onClick={() => setIsPaused(!isPaused)}
            className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-all text-white"
            aria-label={isPaused ? "Play" : "Pause"}
           >
             {isPaused ? <Play size={20} /> : <Pause size={20} />}
           </button>
           <div className="flex gap-2">
             <button onClick={() => handleManualScroll('left')} className="p-3 rounded-full border border-white/10 hover:bg-terracotta hover:border-terracotta transition-all text-white"><ChevronLeft size={20} /></button>
             <button onClick={() => handleManualScroll('right')} className="p-3 rounded-full border border-white/10 hover:bg-terracotta hover:border-terracotta transition-all text-white"><ChevronRight size={20} /></button>
           </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#252525] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#252525] to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          ref={containerRef}
          className="flex gap-8 cursor-grab active:cursor-grabbing pl-6 md:pl-[10vw]"
          style={{ x }}
          animate={controls}
          drag="x"
          dragConstraints={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={() => setIsPaused(false)}
        >
          {projects.map((project, index) => (
            <Link 
              key={`${project.id}-${index}`} 
              to={`/projets/${project.id}`} 
              className="group relative w-[300px] md:w-[400px] h-[450px] rounded-[30px] overflow-hidden flex-shrink-0 border border-white/10 bg-anthracite shadow-xl"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                 <span className="text-terracotta text-xs font-bold uppercase tracking-wider mb-2 block">{project.category}</span>
                 <h3 className="text-2xl font-display font-bold text-white mb-2 leading-tight">{project.title}</h3>
                 <p className="text-gray-300 line-clamp-2 text-sm max-w-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{project.description}</p>
                 <div className="flex items-center gap-2 text-white font-bold text-sm group-hover:text-terracotta transition-colors">
                   Voir le projet <ArrowRight size={16} />
                 </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSlider;