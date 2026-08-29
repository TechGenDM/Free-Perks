'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SearchBar } from '@/components/search/SearchBar';
import {
  staggerContainer,
  heroBadge,
  heroClipReveal,
  fadeUp,
  heroSearch,
  VIEWPORT_ONCE,
} from '@/lib/motion';

interface HeroProps {
  totalTools: number;
}

export function Hero({ totalTools }: HeroProps) {
  const shouldReduce = useReducedMotion();

  const container = shouldReduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
          },
        },
      };

  return (
    <section className="relative pt-10 pb-14 md:pt-16 md:pb-20 flex flex-col items-center text-center hero-bg overflow-hidden">
      {/* Hero content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl flex flex-col items-center px-4"
      >
        {/* Trust badge */}
        <motion.div
          variants={shouldReduce ? fadeUp : heroBadge}
          className="mb-7 flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
          {totalTools}+ Perks Hand-Verified for Students
        </motion.div>

        {/* Headline — two lines with clip-path reveal */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            variants={shouldReduce ? fadeUp : heroClipReveal}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.1]"
          >
            Discover free tools to
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-7">
          <motion.h1
            variants={shouldReduce ? fadeUp : {
              hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
              visible: {
                clipPath: 'inset(0 0 0% 0)',
                opacity: 1,
                transition: {
                  clipPath: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.12 },
                  opacity: { duration: 0.3, delay: 0.12 },
                },
              },
            }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
          >
            <span className="text-indigo-600">build</span>{' '}
            <span className="text-zinc-900">your next project.</span>
          </motion.h1>
        </div>

        {/* Supporting text */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-zinc-500 mb-10 max-w-2xl text-balance"
        >
          Stop searching through outdated lists. We verify and curate the best free software, cloud credits, and APIs exclusively for student developers.
        </motion.p>

        {/* Search bar */}
        <motion.div variants={shouldReduce ? fadeUp : heroSearch} className="w-full">
          <SearchBar />
        </motion.div>

        {/* Stat chips */}
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-zinc-500"
        >
          {[
            { label: 'Always free', icon: '✓' },
            { label: 'Hand-verified by humans', icon: '✓' },
            { label: 'Updated weekly', icon: '✓' },
          ].map((item) => (
            <span key={item.label} className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-bold text-xs">{item.icon}</span>
              {item.label}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
