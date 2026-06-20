import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import TechnicalGridBackground from '@/components/TechnicalGridBackground';

const MaintenancePage = () => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const graphicRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.fromTo(containerRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1 }
      )
      .fromTo(graphicRef.current,
        { scale: 0.8, opacity: 0, rotate: -45 },
        { scale: 1, opacity: 0.7, rotate: 0, duration: 1.5, ease: 'back.out(1.2)' },
        '-=0.6'
      )
      .fromTo(logoRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=1.2'
      )
      .fromTo(titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.9'
      );

      // Rotation lente infinie de l'élément géométrique
      gsap.to(graphicRef.current, {
        rotate: 360,
        duration: 40,
        repeat: -1,
        ease: 'none'
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden bg-anthracite text-white font-sans selection:bg-terracotta selection:text-white"
    >
      {/* Texture Visuelle Bruit SVG overlay */}
      <svg className="fixed inset-0 w-full h-full opacity-[0.03] pointer-events-none z-50">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Halo lumineux terracotta au centre */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(211,97,43,0.12)_0%,transparent_60%)] pointer-events-none z-0" />
      
      {/* Grille technique en arrière-plan */}
      <TechnicalGridBackground />

      <div className="relative z-10 flex flex-col items-center max-w-2xl text-center">
        {/* Symbole architectural cinématique */}
        <div ref={graphicRef} className="w-32 h-32 md:w-40 md:h-40 mb-10 flex items-center justify-center pointer-events-none opacity-70">
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-terracotta fill-none" strokeWidth="1.5">
            {/* Cercles concentriques extérieurs */}
            <circle cx="50" cy="50" r="45" strokeDasharray="3 3" className="opacity-40" />
            <circle cx="50" cy="50" r="38" />
            
            {/* Polygones intérieurs */}
            <polygon points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5" className="opacity-70" />
            <polygon points="50,25 71.6,37.5 71.6,62.5 50,75 28.4,62.5 28.4,37.5" strokeDasharray="2 2" className="opacity-50" />
            
            {/* Centre */}
            <circle cx="50" cy="50" r="4" className="fill-terracotta opacity-80" />
            
            {/* Lignes d'ancrage */}
            <line x1="50" y1="15" x2="50" y2="85" className="opacity-30" />
            <line x1="20" y1="32.5" x2="80" y2="67.5" className="opacity-30" />
            <line x1="20" y1="67.5" x2="80" y2="32.5" className="opacity-30" />
          </svg>
        </div>

        {/* Nom de la marque */}
        <div 
          ref={logoRef} 
          className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-3"
        >
          NOVA B
        </div>

        {/* Titre principal */}
        <h1 
          ref={titleRef} 
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white uppercase leading-tight text-glow"
        >
          Ce site est <br />
          <span className="italic text-terracotta font-serif">temporairement</span> <br />
          indisponible
        </h1>
      </div>
    </div>
  );
};

export default MaintenancePage;
