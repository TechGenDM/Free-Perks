'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import type { Tool } from '@/types';
import { ToolLogo } from '@/components/tools/ToolLogo';

interface CollectionSection {
  id: string;
  label: string;
  sublabel: string;
  accent: string;
  tools: Tool[];
}

interface SceneBuildProps {
  sections: CollectionSection[];
}

export function SceneBuild({ sections }: SceneBuildProps) {
  const shouldReduce = useReducedMotion();
  const [activeTab, setActiveTab] = useState<string>(sections[0]?.id || 'ai');

  if (sections.length === 0) return null;

  const currentSection = sections.find(s => s.id === activeTab) || sections[0];

  return (
    <section className="relative py-28 md:py-36 px-4 md:px-6 bg-[#090d16] overflow-hidden border-t border-white/[0.04]">
      {/* Ambience */}
      <div className="aurora-orb-cyan top-[20%] right-[-120px]" />
      <div className="absolute inset-0 bg-mesh-grid opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/30 text-indigo-300 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            04 • BUILD FOR $0
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white mb-4">
            Everything you need.{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Nothing you owe.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto">
            From prototyping with AI to deploying live on cloud infrastructure, all funded by student programs.
          </p>
        </motion.div>

        {/* Workflow Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 overflow-x-auto pb-2 hide-scrollbar">
          {sections.map((section) => {
            const isActive = activeTab === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`relative px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shrink-0 border ${
                  isActive
                    ? 'text-white border-indigo-500/50 shadow-lg shadow-indigo-500/20 bg-indigo-600/30'
                    : 'text-slate-400 border-white/[0.08] bg-white/[0.03] hover:text-slate-200 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: section.accent, boxShadow: `0 0 8px ${section.accent}` }}
                  />
                  <span>{section.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Section Description */}
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-slate-400">
            {currentSection.sublabel} • <span className="text-indigo-400 font-semibold">{currentSection.tools.length} Perks included</span>
          </p>
        </div>

        {/* Grid of Tools in Active Workflow */}
        <motion.div
          key={currentSection.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {currentSection.tools.map((tool) => (
            <Link
              key={tool._id}
              href={`/tools/${tool.slug}`}
              className="group block p-5 rounded-2xl glass-card border border-white/[0.08] hover:border-indigo-500/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <ToolLogo slug={tool.slug} title={tool.title} size="md" />
                <span className={`badge-offer badge-offer-${tool.offer.type}`}>
                  {tool.offer.type}
                </span>
              </div>

              <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mb-1.5 truncate">
                {tool.title}
              </h4>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                {tool.description}
              </p>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] font-semibold" style={{ color: currentSection.accent }}>
                  {tool.offer.description}
                </span>
                <span className="text-xs text-slate-400 group-hover:text-indigo-300 group-hover:translate-x-0.5 transition-all">
                  →
                </span>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
