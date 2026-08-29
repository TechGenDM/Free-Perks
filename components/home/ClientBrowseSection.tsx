'use client';

import { useToolStore } from '@/store/useToolStore';
import { useToolsInit } from '@/hooks/useTools';
import { CategoryTabs } from '@/components/search/CategoryTabs';
import { ToolGrid } from '@/components/tools/ToolGrid';

export function ClientBrowseSection() {
  useToolsInit();
  const { tools, isLoading, error, pagination, searchQuery, setSearchQuery } = useToolStore();

  return (
    <div className="flex flex-col gap-8">
      {/* Search Bar & Filters Controls */}
      <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/[0.08] flex flex-col gap-4">
        {/* Search Input */}
        <div className="relative w-full">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            id="catalog-search-input"
            type="text"
            placeholder="Search by tool name, tag, or offer (e.g. Copilot, Cloud, Hosting)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/60 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category & Sorting Controls */}
        <CategoryTabs />
      </div>

      {/* Grid of Results */}
      <div className={`transition-opacity duration-200 ${isLoading ? 'opacity-60' : 'opacity-100'}`}>
        <ToolGrid tools={tools} isLoading={isLoading} error={error} />
      </div>

      {/* Modern Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-2">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                page === pagination.page
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 border border-indigo-400/40'
                  : 'bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:border-white/20 hover:text-white'
              }`}
              onClick={() => useToolStore.getState().setPage(page)}
              aria-label={`Go to page ${page}`}
              aria-current={page === pagination.page ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
