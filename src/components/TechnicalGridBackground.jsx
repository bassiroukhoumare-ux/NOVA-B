import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TechnicalGridBackground = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.03, 0.05, 0.03]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div 
        style={{ opacity, y }}
        className="absolute inset-0 w-full h-[200%] top-[-50%]"
      >
        <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </motion.div>
      
      {/* Radial fade for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-anthracite via-transparent to-anthracite opacity-80" />
    </div>
  );
};

export default TechnicalGridBackground;