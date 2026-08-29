'use client';

import { motion } from 'framer-motion';
import { useToolStore } from '@/store/useToolStore';
import type { SortOption } from '@/types';

export function CategoryTabs() {
  const { categories, activeCategory, setActiveCategory, sortBy, setSortBy } = useToolStore();

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-white/[0.06]">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <button
          className={`relative rounded-xl px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
            activeCategory === null
              ? 'text-white'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
          }`}
          onClick={() => setActiveCategory(null)}
        >
          {activeCategory === null && (
            <motion.div
              layoutId="category-active-pill"
              className="absolute inset-0 rounded-xl bg-indigo-600 border border-indigo-400/30 shadow-md shadow-indigo-600/30"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">All Perks</span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat._id}
            className={`relative rounded-xl px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeCategory === cat._id
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
            onClick={() => setActiveCategory(cat._id)}
          >
            {activeCategory === cat._id && (
              <motion.div
                layoutId="category-active-pill"
                className="absolute inset-0 rounded-xl bg-indigo-600 border border-indigo-400/30 shadow-md shadow-indigo-600/30"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span>{cat.name}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                activeCategory === cat._id ? 'bg-white/20 text-white' : 'bg-white/[0.08] text-slate-400'
              }`}>
                {cat.tool_count}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2 text-xs sm:text-sm shrink-0 self-end lg:self-center">
        <span className="text-slate-400 font-medium">Sort by:</span>
        <div className="relative">
          <select
            className="appearance-none bg-white/[0.05] border border-white/10 text-white font-semibold rounded-xl pl-3 pr-8 py-1.5 text-xs focus:border-indigo-500/60 focus:outline-none cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
          >
            <option value="popular" className="bg-[#0c101c] text-white">Most Popular</option>
            <option value="newest" className="bg-[#0c101c] text-white">Recently Verified</option>
            <option value="alphabetical" className="bg-[#0c101c] text-white">A – Z</option>
          </select>
          <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
