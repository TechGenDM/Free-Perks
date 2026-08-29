'use client';

import { useEffect } from 'react';
import { useToolStore } from '@/store/useToolStore';
import { useDebounce } from './useDebounce';

export function useToolSearch() {
  const { searchQuery, setSearchQuery, loadTools, isLoading } = useToolStore();
  const debouncedQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    loadTools();
  }, [debouncedQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  return { searchQuery, setSearchQuery, isLoading };
}

export function useToolsInit() {
  const initialize = useToolStore((s) => s.initialize);

  useEffect(() => {
    initialize();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
