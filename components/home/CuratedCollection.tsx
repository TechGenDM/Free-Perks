'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { Tool } from '@/types';
import { ToolCard } from '@/components/tools/ToolCard';
import { sectionHeading, staggerContainer, fadeUp, VIEWPORT_ONCE } from '@/lib/motion';

interface CuratedCollectionProps {
  title: string;
  description: string;
  tools: Tool[];
  viewAllLink?: string;
}

export function CuratedCollection({ title, description, tools, viewAllLink }: CuratedCollectionProps) {
  const shouldReduce = useReducedMotion();
  if (!tools || tools.length === 0) return null;

  return (
    <section className="py-8">
      {/* Section header */}
      <motion.div
        variants={shouldReduce ? {} : staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div>
          <motion.h2
            variants={shouldReduce ? {} : sectionHeading}
            className="text-2xl font-bold tracking-tight text-zinc-900 mb-1"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={shouldReduce ? {} : fadeUp}
            className="text-zinc-500"
          >
            {description}
          </motion.p>
        </div>
        {viewAllLink && (
          <motion.div variants={shouldReduce ? {} : fadeUp}>
            <Link
              href={viewAllLink}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              View all
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        )}
      </motion.div>

      {/* Mobile: horizontal scroll with fade mask / Desktop: grid */}
      <div className="relative">
        <motion.div
          variants={shouldReduce ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="flex overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 snap-x hide-scrollbar scroll-fade-right md:scroll-fade-none"
        >
          {tools.map((tool) => (
            <div key={tool._id} className="flex-shrink-0 w-[280px] md:w-auto snap-start h-full">
              <ToolCard tool={tool} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
