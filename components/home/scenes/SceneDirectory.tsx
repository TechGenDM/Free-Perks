'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ClientBrowseSection } from '@/components/home/ClientBrowseSection';

export function SceneDirectory() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="browse" className="relative py-28 md:py-36 px-4 md:px-6 bg-[#07090e] overflow-hidden border-t border-white/[0.04] scroll-mt-12">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />
      <div className="aurora-orb-indigo top-[10%] left-[50%] -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/30 text-indigo-300 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            07 • COMPLETE DIRECTORY
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white mb-4">
            Explore every verified perk.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-xl">
            Search, filter by category or offer type, and claim free student benefits in seconds.
          </p>
        </motion.div>

        <div>
          <ClientBrowseSection />
        </div>
      </div>
    </section>
  );
}
