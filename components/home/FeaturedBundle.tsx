'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { Tool } from '@/types';
import { VerificationBadge } from '@/components/tools/VerificationBadge';
import { sectionReveal, staggerContainerSlow, cardVariants, VIEWPORT_ONCE } from '@/lib/motion';

interface FeaturedBundleProps {
  tools: Tool[];
}

export function FeaturedBundle({ tools }: FeaturedBundleProps) {
  const shouldReduce = useReducedMotion();
  if (!tools || tools.length === 0) return null;

  return (
    <motion.section
      variants={shouldReduce ? {} : sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className="py-6"
    >
      <div className="relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 p-8 md:p-12 shadow-2xl">
        {/* Subtle spotlight */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 10% 40%, rgba(99,102,241,0.18) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 mb-4">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Premium Collection
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              Student Developer Starter Pack
            </h2>
            <p className="text-zinc-400 text-base md:text-lg">
              The absolute essentials. Over $200k+ in potential value through free licenses, cloud credits, and pro tiers.
            </p>
          </div>

          <motion.button
            whileHover={shouldReduce ? {} : { scale: 1.02, boxShadow: '0 0 30px rgba(255,255,255,0.15)' }}
            whileTap={shouldReduce ? {} : { scale: 0.97 }}
            className="shrink-0 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-zinc-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.08)]"
          >
            Claim All Perks
          </motion.button>
        </div>

        {/* Staggered tool cards */}
        <motion.div
          variants={shouldReduce ? {} : staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="flex overflow-x-auto pb-4 -mx-8 px-8 md:mx-0 md:px-0 gap-4 snap-x hide-scrollbar"
        >
          {tools.map((tool) => {
            const logoFallback = tool.title.charAt(0).toUpperCase();
            return (
              <motion.div
                key={tool._id}
                variants={shouldReduce ? {} : cardVariants}
                className="shrink-0 snap-start"
              >
                <Link
                  href={`/tools/${tool.slug}`}
                  className="flex flex-col gap-4 p-5 rounded-2xl border border-zinc-700/50 bg-zinc-800/50 hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300 group w-65"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white font-bold border border-zinc-700 shadow-sm group-hover:border-zinc-600 transition-all duration-300">
                      {tool.logo_url ? (
                        <img src={tool.logo_url} alt={tool.title} className="h-full w-full rounded-xl object-cover" />
                      ) : (
                        logoFallback
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white line-clamp-1 group-hover:text-indigo-400 transition-colors">
                        {tool.title}
                      </h3>
                      <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                        {tool.category?.name || 'Tool'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-zinc-700/50 px-2 py-0.5 text-[10px] font-bold text-zinc-300">
                      {tool.offer.type}
                    </span>
                    <span className="text-xs font-semibold text-zinc-300 line-clamp-1">
                      {tool.offer.description}
                    </span>
                  </div>

                  <div className="mt-auto pt-4 border-t border-zinc-700/50 flex items-center justify-between">
                    <VerificationBadge status={tool.verificationStatus} verifiedAt={tool.verifiedAt} compact={true} />
                    <svg
                      className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
