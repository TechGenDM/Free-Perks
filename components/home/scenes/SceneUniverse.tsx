'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import type { Category } from '@/types';

interface SceneUniverseProps {
  categories: Category[];
}

const CATEGORY_STYLES: Record<string, { gradient: string; glow: string; border: string; desc: string; iconPath: React.ReactNode }> = {
  'ai-tools': {
    gradient: 'from-indigo-600/20 via-purple-600/10 to-transparent',
    glow: 'rgba(99, 102, 241, 0.2)',
    border: 'hover:border-indigo-500/50',
    desc: 'Free AI pair programmers, GPT-4o access, and intelligent writing assistants.',
    iconPath: (
      <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  'cloud-credits': {
    gradient: 'from-cyan-600/20 via-blue-600/10 to-transparent',
    glow: 'rgba(56, 189, 248, 0.2)',
    border: 'hover:border-cyan-500/50',
    desc: '$100s in credits for Azure, AWS, and DigitalOcean to host databases and compute.',
    iconPath: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  'hosting': {
    gradient: 'from-emerald-600/20 via-teal-600/10 to-transparent',
    glow: 'rgba(16, 185, 129, 0.2)',
    border: 'hover:border-emerald-500/50',
    desc: 'Deploy full-stack web applications, frontends, and servers at zero cost.',
    iconPath: (
      <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
  },
  'dev-software': {
    gradient: 'from-purple-600/20 via-pink-600/10 to-transparent',
    glow: 'rgba(168, 85, 247, 0.2)',
    border: 'hover:border-purple-500/50',
    desc: 'Professional JetBrains IDEs, Figma Education, and GitHub Student Developer Pack.',
    iconPath: (
      <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  'apis': {
    gradient: 'from-amber-600/20 via-orange-600/10 to-transparent',
    glow: 'rgba(245, 158, 11, 0.2)',
    border: 'hover:border-amber-500/50',
    desc: 'Managed MongoDB databases, SendGrid email APIs, and serverless backends.',
    iconPath: (
      <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  'learning': {
    gradient: 'from-rose-600/20 via-red-600/10 to-transparent',
    glow: 'rgba(244, 63, 94, 0.2)',
    border: 'hover:border-rose-500/50',
    desc: 'Structured developer curriculums, certifications, and high-impact learning paths.',
    iconPath: (
      <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
  },
};

export function SceneUniverse({ categories }: SceneUniverseProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative py-28 md:py-36 px-4 md:px-6 bg-[#07090e] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-mesh-grid opacity-20 pointer-events-none" />
      <div className="aurora-orb-indigo top-[10%] -right-37.5" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/30 text-indigo-300 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            02 • THE DEVELOPER UNIVERSE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white mb-4">
            Every tool you need.{' '}
            <span className="bg-linear-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              None of the cost.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto">
            Categorized and verified student developer benefits ready to be claimed with your school email.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => {
            const style = CATEGORY_STYLES[cat.slug] || {
              gradient: 'from-slate-800/40 to-transparent',
              glow: 'rgba(255,255,255,0.1)',
              border: 'hover:border-white/30',
              desc: 'Essential developer tools and services.',
              iconPath: (
                <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              ),
            };

            return (
              <motion.div
                key={cat._id}
                initial={shouldReduce ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={`/category/${cat.slug}`}
                  className={`group relative block h-full p-6 md:p-7 rounded-2xl glass-card border border-white/8 ${style.border} transition-all duration-300 overflow-hidden`}
                >
                  {/* Subtle Top-Right Ambient Glow */}
                  <div
                    className={`absolute -top-16 -right-16 w-36 h-36 rounded-full bg-linear-to-br ${style.gradient} blur-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-500`}
                  />

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      {/* Icon + Count Header */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                          {style.iconPath}
                        </div>
                        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-slate-300">
                          {cat.tool_count} {cat.tool_count === 1 ? 'Perk' : 'Perks'}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {style.desc}
                      </p>
                    </div>

                    {/* Footer Explore Arrow */}
                    <div className="mt-6 pt-4 border-t border-white/6 flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                      <span>Explore Category</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
