'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useToolSearch } from '@/hooks/useTools';
import { useToolStore } from '@/store/useToolStore';

const SUGGESTION_CATEGORIES = [
  { label: 'AI Tools', icon: '🧠' },
  { label: 'Cloud Credits', icon: '☁️' },
  { label: 'Hosting', icon: '⚡' },
  { label: 'Dev Software', icon: '💻' },
  { label: 'APIs', icon: '🔌' },
  { label: 'Learning', icon: '📚' },
];

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useToolSearch();
  const isLoading = useToolStore((s) => s.isLoading);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const shouldReduce = useReducedMotion();

  // CMD+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to dismiss suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    if (!searchQuery) setShowSuggestions(true);
  }, [searchQuery]);

  const handleBlur = useCallback(() => {
    // Delay to allow suggestion clicks to register
    setTimeout(() => {
      setIsFocused(false);
    }, 150);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSearchQuery(val);
      setShowSuggestions(!val);
    },
    [setSearchQuery]
  );

  const handleSuggestionClick = useCallback(
    (label: string) => {
      setSearchQuery(label);
      setShowSuggestions(false);
      inputRef.current?.blur();
    },
    [setSearchQuery]
  );

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
      <motion.div
        animate={
          shouldReduce ? {} : { scale: isFocused ? 1.01 : 1 }
        }
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="relative flex items-center"
      >
        {/* Search / Loading Icon */}
        <div className={`absolute left-5 z-10 transition-colors duration-200 ${isFocused ? 'text-indigo-500' : 'text-zinc-400'}`}>
          <AnimatePresence mode="wait">
            {isLoading && searchQuery ? (
              <motion.div
                key="spinner"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                <svg
                  className="h-5 w-5 animate-spin text-indigo-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="search"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.15 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <input
          ref={inputRef}
          type="text"
          className={`w-full rounded-2xl border-2 bg-white py-4 pl-14 pr-20 text-base md:text-lg font-medium text-zinc-900 shadow-sm transition-all duration-200 focus:outline-none placeholder:text-zinc-400 placeholder:font-normal ${
            isFocused
              ? 'border-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.08)]'
              : 'border-zinc-200/80 hover:border-zinc-300'
          }`}
          placeholder="Search tools, APIs, cloud credits..."
          value={searchQuery}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label="Search perks"
          aria-expanded={showSuggestions}
          aria-autocomplete="list"
        />

        {/* Right slot: ⌘K or Clear */}
        <AnimatePresence mode="wait">
          {!searchQuery ? (
            <motion.div
              key="kbd"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.12 }}
              className="absolute right-5 hidden md:flex items-center gap-1"
            >
              <kbd className="rounded border border-zinc-200 bg-zinc-50 shadow-sm px-1.5 py-0.5 font-mono text-[11px] font-bold text-zinc-500">⌘</kbd>
              <kbd className="rounded border border-zinc-200 bg-zinc-50 shadow-sm px-1.5 py-0.5 font-mono text-[11px] font-bold text-zinc-500">K</kbd>
            </motion.div>
          ) : (
            <motion.button
              key="clear"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              whileTap={{ scale: 0.88 }}
              className="absolute right-4 rounded-full bg-zinc-100 p-2 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 transition-colors"
              onClick={() => {
                setSearchQuery('');
                setShowSuggestions(true);
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Suggestion Panel */}
      <AnimatePresence>
        {showSuggestions && isFocused && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border border-zinc-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden"
            role="listbox"
          >
            <div className="p-3">
              <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Browse by category
              </p>
              <div className="grid grid-cols-3 gap-1">
                {SUGGESTION_CATEGORIES.map((cat, i) => (
                  <motion.button
                    key={cat.label}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => handleSuggestionClick(cat.label)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                    role="option"
                  >
                    <span className="text-base leading-none">{cat.icon}</span>
                    <span className="truncate">{cat.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="border-t border-zinc-100 px-4 py-2.5 bg-zinc-50/50">
              <p className="text-[11px] text-zinc-400">
                <kbd className="font-mono font-semibold text-zinc-500">↵</kbd> to search · <kbd className="font-mono font-semibold text-zinc-500">Esc</kbd> to dismiss
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
