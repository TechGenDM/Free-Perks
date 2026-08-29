'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ToolLogo } from '@/components/tools/ToolLogo';

interface SceneHookProps {
  totalTools: number;
}

export function SceneHook({ totalTools }: SceneHookProps) {
  const shouldReduce = useReducedMotion();

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

  const categories = [
    { name: 'AI Copilots', slug: 'ai-tools', icon: '🧠' },
    { name: 'Cloud Credits', slug: 'cloud-credits', icon: '☁️' },
    { name: 'Hosting & Deploy', slug: 'hosting', icon: '⚡' },
    { name: 'Developer Software', slug: 'dev-software', icon: '💻' },
    { name: 'APIs & Backend', slug: 'apis', icon: '🔌' },
    { name: 'Learning & Certs', slug: 'learning', icon: '📚' },
  ];

  return (
    <section className="relative min-h-[92vh] md:min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 md:px-6 overflow-hidden bg-[#07090e]">
      {/* Aurora Glow Effects */}
      <div className="aurora-orb-indigo top-[-100px] left-[50%] -translate-x-1/2" />
      <div className="aurora-orb-violet top-[20%] right-[-100px]" />
      <div className="aurora-orb-cyan bottom-[10%] left-[-100px]" />

      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#07090e]/40 to-[#07090e] pointer-events-none" />

      {/* Floating Perks Preview Badges (Desktop) */}
      {!shouldReduce && (
        <>
          {/* Left Floating Card */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden xl:flex absolute left-8 top-[32%] z-20 items-center gap-3.5 p-3.5 pr-5 rounded-2xl glass-card border border-white/10 shadow-2xl animate-[float-slow_6s_ease-in-out_infinite]"
          >
            <ToolLogo slug="github-copilot" title="GitHub Copilot" size="md" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">GitHub Copilot</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  FREE
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">$120/year • Free for Students</span>
            </div>
          </motion.div>

          {/* Right Floating Card */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden xl:flex absolute right-8 top-[38%] z-20 items-center gap-3.5 p-3.5 pr-5 rounded-2xl glass-card border border-white/10 shadow-2xl animate-[float-reverse_7s_ease-in-out_infinite]"
          >
            <ToolLogo slug="azure-for-students" title="Azure for Students" size="md" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">Azure for Students</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  $100 CREDIT
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Renewable annually • No CC</span>
            </div>
          </motion.div>

          {/* Floating Figma Badge Bottom Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:flex absolute left-20 bottom-[14%] z-20 items-center gap-3 p-3 pr-4 rounded-xl glass-card border border-white/10 shadow-xl animate-[float-reverse_8s_ease-in-out_infinite]"
          >
            <ToolLogo slug="figma-education" title="Figma Education" size="sm" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">Figma Professional</span>
              <span className="text-[10px] text-purple-300 font-medium">Free 2-Year License</span>
            </div>
          </motion.div>
        </>
      )}

      {/* Center Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Announcement Trust Pill */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/40 backdrop-blur-md mb-8 shadow-[0_0_20px_-3px_rgba(99,102,241,0.3)] hover:border-indigo-500/50 transition-colors"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          </span>
          <span className="text-xs font-semibold text-slate-200">
            <span className="text-white font-bold">{totalTools || 14}+</span> Verified Perks for Student Developers
          </span>
          <span className="text-indigo-400 text-xs font-bold hidden sm:inline">→ Explore</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.95] text-white mb-6"
        >
          Build without{' '}
          <span className="bg-gradient-to-r from-indigo-300 via-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(99,102,241,0.35)]">
            paying.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-slate-300 font-normal tracking-tight mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Free AI copilots, $100s in cloud credits, IDE licenses, and hosting for student developers. Verified daily.
        </motion.p>

        {/* Interactive Spotlight Search Bar */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full max-w-xl mb-10"
        >
          <div
            onClick={handleSearchClick}
            className="group flex items-center justify-between p-2 pl-4 rounded-2xl bg-[#0e1526]/80 border border-white/15 hover:border-indigo-500/60 backdrop-blur-xl shadow-[0_10px_35px_-5px_rgba(0,0,0,0.6)] shadow-indigo-950/40 transition-all duration-300 cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <svg className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform duration-200 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm sm:text-base text-slate-400 group-hover:text-slate-200 transition-colors truncate">
                Search tools (e.g. Copilot, Azure, Vercel, Figma)...
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <kbd className="hidden sm:inline-flex items-center gap-1 font-mono text-xs bg-white/[0.07] border border-white/15 text-slate-300 px-2 py-1 rounded-lg">
                ⌘K
              </kbd>
              <span className="btn-primary text-xs py-2 px-3.5 rounded-xl shadow-md">
                Browse
              </span>
            </div>
          </div>
        </motion.div>

        {/* Quick Category Chips */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 max-w-2xl"
        >
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={handleSearchClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-300 bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/40 hover:bg-white/[0.08] hover:text-white transition-all duration-200 cursor-pointer"
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Metrics Banner */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/[0.06] grid grid-cols-3 gap-6 sm:gap-12 text-center"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">$15,000+</div>
            <div className="text-xs font-medium text-slate-400 mt-1">Student Value</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-indigo-400">100% Free</div>
            <div className="text-xs font-medium text-slate-400 mt-1">Verified Programs</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">$0</div>
            <div className="text-xs font-medium text-slate-400 mt-1">To Get Started</div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Soft Fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#07090e] to-transparent pointer-events-none" />
    </section>
  );
}
