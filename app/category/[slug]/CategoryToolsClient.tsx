'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Tool, Category } from '@/types';
import { ToolGrid } from '@/components/tools/ToolGrid';

interface CategoryToolsClientProps {
  category: Category;
  tools: Tool[];
}

export function CategoryToolsClient({ category, tools }: CategoryToolsClientProps) {
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-20 flex flex-col gap-10"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to all perks
        </Link>
        
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{category.icon || '📦'}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            {category.name}
          </h1>
        </div>
        <p className="text-base sm:text-lg text-slate-400 max-w-xl">
          Browse {tools.length} verified free tools and student perks in {category.name.toLowerCase()}.
        </p>
      </div>

      <ToolGrid tools={tools} />
    </motion.div>
  );
}
