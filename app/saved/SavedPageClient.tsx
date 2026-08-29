'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useBookmarkStore } from '@/store/useBookmarkStore';
import { ToolGrid } from '@/components/tools/ToolGrid';
import type { Tool } from '@/types';

export function SavedPageClient() {
  const { savedToolIds, hasMounted, setMounted } = useBookmarkStore();
  const [savedTools, setSavedTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted();
  }, [setMounted]);

  useEffect(() => {
    if (!hasMounted || savedToolIds.length === 0) {
      setSavedTools([]);
      setIsLoading(false);
      return;
    }

    const load = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/tools?limit=50&status=all');
        const data = await res.json();
        const filtered = data.tools.filter((t: Tool) => savedToolIds.includes(t._id));
        setSavedTools(filtered);
      } catch {
        setSavedTools([]);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [hasMounted, savedToolIds]);

  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-20 flex flex-col gap-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
          Saved Perks
        </h1>
        <p className="text-base sm:text-lg text-slate-400">
          {!hasMounted
            ? 'Loading your saved perks...'
            : savedToolIds.length === 0
              ? 'You haven\'t saved any perks yet. Click the bookmark icon on any perk card to save it here.'
              : `${savedToolIds.length} perk${savedToolIds.length === 1 ? '' : 's'} saved to your student stack.`}
        </p>
      </div>

      <ToolGrid tools={savedTools} isLoading={isLoading} />
    </motion.div>
  );
}
