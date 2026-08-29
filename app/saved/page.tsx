'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useBookmarkStore } from '@/store/useBookmarkStore';
import { ToolGrid } from '@/components/tools/ToolGrid';
import type { Tool } from '@/types';

export default function SavedPage() {
  const { savedToolIds, hasMounted } = useBookmarkStore();
  const [savedTools, setSavedTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!hasMounted) return;

    if (savedToolIds.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSavedTools([]);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(false);
      return;
    }

    const fetchSavedTools = async () => {
      try {
        const url = new URL('/api/tools', window.location.origin);
        // We pass the savedToolIds to fetch only those tools
        url.searchParams.append('ids', savedToolIds.join(','));
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error('Failed to fetch saved tools');
        const data = await res.json();
        setSavedTools(data.tools || []);
      } catch (error) {
        console.error('Error fetching saved tools:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedTools();
  }, [savedToolIds, hasMounted]);

  return (
    <div className="page-container">
    <div className="flex flex-col gap-12 pb-12">
      <section className="pt-12 md:pt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">Saved Perks</h1>
          <p className="text-zinc-500">Your curated collection of student developer tools.</p>
        </div>

        {!hasMounted || isLoading ? (
          <ToolGrid tools={[]} isLoading={true} />
        ) : savedTools.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 px-4 text-center border border-zinc-200 rounded-2xl bg-white shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-4 text-zinc-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-1">No saved perks yet</h3>
            <p className="text-sm text-zinc-500 max-w-sm mb-6">Explore the directory and save the tools you want to keep track of.</p>
            <Link href="/" className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105 focus-ring">
              Browse perks
            </Link>
          </motion.div>
        ) : (
          <ToolGrid tools={savedTools} isLoading={false} />
        )}
      </section>
    </div>
    </div>
  );
}
