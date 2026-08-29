'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useBookmarkStore } from '@/store/useBookmarkStore';

interface SaveButtonProps {
  toolId: string;
}

export function SaveButton({ toolId }: SaveButtonProps) {
  const { savedToolIds, toggleBookmark, hasMounted } = useBookmarkStore();
  const isSaved = savedToolIds.includes(toolId);
  const shouldReduce = useReducedMotion();

  if (!hasMounted) {
    return <div className="h-8 w-8 rounded-full" />;
  }

  return (
    <motion.button
      key={`save-${isSaved}`}
      whileTap={shouldReduce ? {} : { scale: 0.85 }}
      whileHover={shouldReduce ? {} : { scale: 1.1 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(toolId);
      }}
      className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
        isSaved
          ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-sm shadow-indigo-500/30'
          : 'bg-white/[0.04] text-slate-400 border border-white/[0.08] hover:text-white hover:bg-white/[0.08] hover:border-white/20'
      }`}
      aria-label={isSaved ? 'Remove from saved' : 'Save tool'}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isSaved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        animate={shouldReduce ? {} : { scale: isSaved ? [1, 1.25, 1] : 1 }}
        transition={{ duration: 0.25, ease: 'backOut' }}
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </motion.svg>
    </motion.button>
  );
}
