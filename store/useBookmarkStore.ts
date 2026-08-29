'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BookmarkStore {
  savedToolIds: string[];
  hasMounted: boolean;
  setMounted: () => void;
  toggleBookmark: (toolId: string) => void;
  isBookmarked: (toolId: string) => boolean;
  clearBookmarks: () => void;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      savedToolIds: [],
      hasMounted: false,

      setMounted: () => set({ hasMounted: true }),

      toggleBookmark: (toolId: string) => {
        const current = get().savedToolIds;
        const next = current.includes(toolId)
          ? current.filter((id) => id !== toolId)
          : [...current, toolId];
        set({ savedToolIds: next });
      },

      isBookmarked: (toolId: string) => get().savedToolIds.includes(toolId),

      clearBookmarks: () => set({ savedToolIds: [] }),
    }),
    { name: 'freeperks-bookmarks' }
  )
);
