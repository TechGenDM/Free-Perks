'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

export function SceneCTA() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative py-32 md:py-44 px-4 md:px-6 bg-[#07090e] overflow-hidden border-t border-white/4">
      {/* Background Ambient Auroras */}
      <div className="aurora-orb-indigo top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175" />
      <div className="aurora-orb-violet top-1/3 right-[10%] w-125 h-125" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Top Tag */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/40 text-indigo-300 text-xs font-mono font-semibold uppercase tracking-wider mb-6"
        >
          🚀 START BUILDING TODAY
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black tracking-[-0.04em] leading-[0.95] text-white mb-6"
        >
          Now go build{' '}
          <span className="bg-linear-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
            something.
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-300 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Your next big project deserves the best developer tools. Unlock $15,000+ in verified student perks right now.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
        >
          <a
            href="#browse"
            className="btn-primary text-sm sm:text-base px-8 py-3.5 w-full sm:w-auto shadow-xl shadow-indigo-600/30"
          >
            <span>Explore All Perks</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <Link
            href="/submit"
            className="btn-ghost text-sm sm:text-base px-8 py-3.5 w-full sm:w-auto border-white/10 hover:border-white/30"
          >
            Submit a Perk
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
