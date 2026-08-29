'use client';

import { create } from 'zustand';
import type { Tool, Category, SortOption, Pagination } from '@/types';

interface ToolStore {
  tools: Tool[];
  featuredTools: Tool[];
  categories: Category[];
  pagination: Pagination | null;
  searchQuery: string;
  activeCategory: string | null;
  activeTags: string[];
  sortBy: SortOption;
  isLoading: boolean;
  error: string | null;

  setSearchQuery: (query: string) => void;
  setActiveCategory: (categoryId: string | null) => void;
  toggleTag: (tag: string) => void;
  clearTags: () => void;
  setSortBy: (sort: SortOption) => void;
  setPage: (page: number) => void;
  loadTools: (page?: number) => Promise<void>;
  loadFeaturedTools: () => Promise<void>;
  loadCategories: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useToolStore = create<ToolStore>((set, get) => ({
  tools: [],
  featuredTools: [],
  categories: [],
  pagination: null,
  searchQuery: '',
  activeCategory: null,
  activeTags: [],
  sortBy: 'newest',
  isLoading: false,
  error: null,

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  setActiveCategory: (categoryId: string | null) => {
    set({ activeCategory: categoryId });
    get().loadTools();
  },

  toggleTag: (tag: string) => {
    const current = get().activeTags;
    const next = current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag];
    set({ activeTags: next });
    get().loadTools();
  },

  clearTags: () => { set({ activeTags: [] }); get().loadTools(); },
  setSortBy: (sort: SortOption) => { set({ sortBy: sort }); get().loadTools(); },
  setPage: (page: number) => { get().loadTools(page); },

  loadTools: async (page?: number) => {
    const { searchQuery, activeCategory, activeTags, sortBy } = get();
    set({ isLoading: true, error: null });

    try {
      const params = new URLSearchParams();
      params.set('sort', sortBy);
      params.set('page', String(page || 1));
      params.set('limit', '20');
      if (searchQuery.trim()) params.set('search', searchQuery.trim());
      if (activeCategory) params.set('category', activeCategory);
      if (activeTags.length > 0) params.set('tags', activeTags.join(','));

      const res = await fetch(`/api/tools?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch tools');
      const data = await res.json();
      set({ tools: data.tools || [], pagination: data.pagination || null, isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  loadFeaturedTools: async () => {
    try {
      const res = await fetch('/api/tools/featured');
      if (!res.ok) throw new Error('Failed to fetch featured');
      const data = await res.json();
      set({ featuredTools: data.tools || [] });
    } catch (err) {
      console.error('Failed to load featured tools:', err);
    }
  },

  loadCategories: async () => {
    try {
      const res = await fetch('/api/categories');
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      set({ categories: data.categories || [] });
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  },

  initialize: async () => {
    set({ isLoading: true });
    await Promise.all([get().loadTools(), get().loadFeaturedTools(), get().loadCategories()]);
    set({ isLoading: false });
  },
}));
