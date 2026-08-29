'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const shouldReduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 30));

  const navLinks = [
    { href: '/', label: 'Explore' },
    { href: '/saved', label: 'Saved' },
    { href: '/submit', label: 'Submit Perk' },
  ];

  const handleSearchClick = () => {
    const browseEl = document.getElementById('browse');
    if (browseEl) {
      browseEl.scrollIntoView({ behavior: 'smooth' });
      const searchInput = document.getElementById('catalog-search-input');
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 600);
      }
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 pb-2 pointer-events-none transition-all duration-300">
      <div
        className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl px-4 py-2.5 rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0e1c]/80 backdrop-blur-2xl border border-white/10 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.7)] shadow-indigo-500/5'
            : 'bg-[#0c1222]/40 backdrop-blur-xl border border-white/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.3)]'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-105">
            <span className="font-mono text-xs font-black tracking-wider">FP</span>
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                FreePerks
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                STUDENT
              </span>
            </div>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="flex items-center gap-1" aria-label="Primary navigation">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 focus:outline-none ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && !shouldReduce && (
                  <motion.div
                    layoutId="header-active-pill"
                    className="absolute inset-0 rounded-xl bg-white/[0.08] border border-white/10 shadow-inner"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Quick Search & Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSearchClick}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 bg-white/[0.04] border border-white/10 hover:border-indigo-500/40 hover:text-white transition-all group cursor-pointer"
            aria-label="Search tools"
          >
            <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search perks</span>
            <kbd className="font-mono text-[10px] bg-black/40 border border-white/10 px-1.5 py-0.5 rounded text-slate-400 group-hover:text-slate-200">
              ⌘K
            </kbd>
          </button>

          <Link
            href="/submit"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-400/30 shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Perk</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
