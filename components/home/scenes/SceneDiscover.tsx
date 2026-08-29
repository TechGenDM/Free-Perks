'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import type { Tool } from '@/types';
import { ToolLogo } from '@/components/tools/ToolLogo';
import { SaveButton } from '@/components/bookmarks/SaveButton';

interface SceneDiscoverProps {
  featuredTools: Tool[];
}

function FeaturedPerkCard({ tool }: { tool: Tool }) {
  return (
    <div className="group relative h-full flex flex-col justify-between p-6 md:p-7 rounded-2xl glass-card border border-white/8 hover:border-indigo-500/50 transition-all duration-300">
      <div>
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <ToolLogo slug={tool.slug} title={tool.title} size="lg" />
            <div>
              <Link href={`/tools/${tool.slug}`} className="focus:outline-none">
                <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {tool.title}
                </h3>
              </Link>
              <span className="text-xs font-mono font-medium text-slate-400">
                {tool.category?.name || 'Developer Tool'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SaveButton toolId={tool._id} />
          </div>
        </div>

        {/* Offer Highlight Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-semibold text-xs mb-3">
          <span>✨</span>
          <span>{tool.offer.description}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed line-clamp-3 mb-4">
          {tool.description}
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-white/6 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span>Verified Student Perk</span>
        </div>

        <Link
          href={`/tools/${tool.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-white group-hover:text-indigo-300 transition-colors"
        >
          <span>Claim Perk</span>
          <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

function CompactPerkCard({ tool }: { tool: Tool }) {
  return (
    <div className="group relative p-4 rounded-xl glass-card border border-white/8 hover:border-indigo-500/40 flex items-center justify-between gap-3 transition-all duration-200">
      <div className="flex items-center gap-3 min-w-0">
        <ToolLogo slug={tool.slug} title={tool.title} size="md" />
        <div className="min-w-0">
          <Link href={`/tools/${tool.slug}`} className="focus:outline-none">
            <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
              {tool.title}
            </h4>
          </Link>
          <p className="text-xs text-slate-400 truncate">{tool.offer.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className={`badge-offer badge-offer-${tool.offer.type}`}>
          {tool.offer.type}
        </span>
        <SaveButton toolId={tool._id} />
      </div>
    </div>
  );
}

export function SceneDiscover({ featuredTools }: SceneDiscoverProps) {
  const shouldReduce = useReducedMotion();
  const primaryFeatured = featuredTools.slice(0, 2);
  const secondaryFeatured = featuredTools.slice(2, 6);
  const horizontalFeatured = featuredTools.slice(6, 8);

  return (
    <section className="relative py-28 md:py-36 px-4 md:px-6 bg-[#07090e] overflow-hidden border-t border-white/4">
      {/* Ambience */}
      <div className="aurora-orb-violet top-[20%] -left-25" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/30 text-indigo-300 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              03 • CURATED PERKS
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white">
              Handpicked for{' '}
              <span className="bg-linear-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                builders.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md">
            The highest-value free student tiers, cloud credits, and developer tooling active right now.
          </p>
        </motion.div>

        {/* Editorial Layout */}
        <div className="space-y-6">
          {/* Row 1: Large Featured Cards */}
          {primaryFeatured.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {primaryFeatured.map((tool, i) => (
                <motion.div
                  key={tool._id}
                  initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <FeaturedPerkCard tool={tool} />
                </motion.div>
              ))}
            </div>
          )}

          {/* Row 2: Compact Cards Grid */}
          {secondaryFeatured.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {secondaryFeatured.map((tool, i) => (
                <motion.div
                  key={tool._id}
                  initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <CompactPerkCard tool={tool} />
                </motion.div>
              ))}
            </div>
          )}

          {/* Row 3: Horizontal Feature Strip */}
          {horizontalFeatured.map((tool, i) => (
            <motion.div
              key={tool._id}
              initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="group p-5 md:p-6 rounded-2xl glass-card border border-white/8 hover:border-indigo-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300">
                <div className="flex items-center gap-4 min-w-0">
                  <ToolLogo slug={tool.slug} title={tool.title} size="lg" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <Link href={`/tools/${tool.slug}`} className="focus:outline-none">
                        <h4 className="text-base md:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                          {tool.title}
                        </h4>
                      </Link>
                      <span className={`badge-offer badge-offer-${tool.offer.type}`}>
                        {tool.offer.type}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-1 mt-0.5">
                      {tool.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
                  <span className="text-xs font-semibold text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20">
                    {tool.offer.description}
                  </span>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="btn-primary text-xs py-2 px-4 rounded-xl"
                  >
                    View Perk
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
