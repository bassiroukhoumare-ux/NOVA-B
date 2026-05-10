import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const Counter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => setCurrent(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{current}{suffix}</span>;
};

const StatsSection = () => {
  const stats = [
    { value: 12, label: "Années d'Expérience", suffix: "+" },
    { value: 85, label: "Projets Livrés", suffix: "+" }
  ];

  return (
    <section className="py-20 bg-anthracite border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex justify-center gap-20 md:gap-40 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="text-4xl md:text-6xl font-display font-bold text-white mb-2 group-hover:text-terracotta transition-colors duration-300">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors duration-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;