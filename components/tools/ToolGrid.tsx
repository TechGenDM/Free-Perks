'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { Tool } from '@/types';
import { ToolCard } from './ToolCard';
import { staggerContainer, fadeInScale } from '@/lib/motion';

interface ToolGridProps {
  tools: Tool[];
  isLoading?: boolean;
  error?: string | null;
}

export function ToolGrid({ tools, isLoading, error }: ToolGridProps) {
  const shouldReduce = useReducedMotion();

  if (error) {
    return (
      <motion.div
        variants={shouldReduce ? {} : fadeInScale}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center py-20 px-4 text-center border border-red-200 rounded-2xl bg-red-50/40"
      >
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4 text-red-600">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-900 mb-1">Unable to load perks</h3>
        <p className="text-sm text-red-600 max-w-sm mb-6">Check your connection and try again.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors focus-ring"
        >
          Retry
        </button>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-64 rounded-xl border border-zinc-100 overflow-hidden"
          >
            <div className="skeleton-shimmer h-full w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (tools.length === 0) {
    return (
      <motion.div
        variants={shouldReduce ? {} : fadeInScale}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-zinc-300 rounded-2xl bg-zinc-50"
      >
        <div className="w-12 h-12 rounded-full bg-zinc-200 flex items-center justify-center mb-4 text-zinc-500">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-zinc-900 mb-1">No perks found</h3>
        <p className="text-sm text-zinc-500 max-w-sm">
          We couldn&apos;t find any tools matching your criteria. Try adjusting your search or filters.
        </p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={tools.map((t) => t._id).join(',')}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        variants={shouldReduce ? {} : staggerContainer}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
      >
        {tools.map((tool) => (
          <ToolCard key={tool._id} tool={tool} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
