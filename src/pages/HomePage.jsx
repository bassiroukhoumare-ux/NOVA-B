import React, { useState, useEffect } from 'react';
import HeroSectionNOVA from '@/components/HeroSectionNOVA';
import ProjectsSlider from '@/components/ProjectsSlider';
import StatsSection from '@/components/StatsSection';
import TestimonialsSliderNOVA from '@/components/TestimonialsSliderNOVA';
import QuoteSectionNOVA from '@/components/QuoteSectionNOVA';
import { Link } from 'react-router-dom';
import { ArrowRight, Ruler, Palette, HardHat } from 'lucide-react';
import { motion } from 'framer-motion';
import usePageTracking from '@/hooks/usePageTracking';

const HomePage = () => {
  // Initialize tracking
  usePageTracking();

  return (
    <main className="overflow-x-hidden">
      <HeroSectionNOVA />
      
      {/* Short Services Preview */}
      <section className="py-24 container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Ruler, title: "Architecture", desc: "Conception bioclimatique et structurelle." },
              { icon: Palette, title: "Design Intérieur", desc: "Espaces immersifs et matériaux nobles." },
              { icon: HardHat, title: "Construction", desc: "Suivi rigoureux et finitions parfaites." }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white/5 p-8 rounded-[30px] border border-white/5 hover:border-terracotta/30 transition-colors backdrop-blur-sm"
              >
                <div className="bg-terracotta/10 w-16 h-16 rounded-2xl flex items-center justify-center text-terracotta mb-6">
                  <service.icon size={32} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
        </div>
        <div className="text-center mt-12">
           <Link to="/services" className="text-white hover:text-terracotta font-bold inline-flex items-center gap-2 transition-colors border-b border-terracotta/0 hover:border-terracotta pb-1">
             Voir tous nos services <ArrowRight size={18} />
           </Link>
        </div>
      </section>

      <StatsSection />
      <ProjectsSlider />
      <QuoteSectionNOVA />
      <TestimonialsSliderNOVA />
    </main>
  );
};

export default HomePage;