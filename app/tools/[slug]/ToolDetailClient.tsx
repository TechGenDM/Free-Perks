'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { Tool } from '@/types';
import { VerificationBadge } from '@/components/tools/VerificationBadge';
import { SaveButton } from '@/components/bookmarks/SaveButton';
import { ToolLogo } from '@/components/tools/ToolLogo';
import { fadeUp, staggerContainer, SPRING_SMOOTH } from '@/lib/motion';

const STAGGER_DETAIL = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: SPRING_SMOOTH,
  },
};

export function ToolDetailClient({ tool }: { tool: Tool }) {
  const shouldReduce = useReducedMotion();

  return (
    <article className="mx-auto max-w-5xl py-12 md:py-20 px-4 md:px-6">
      {/* Breadcrumb */}
      <motion.div
        variants={shouldReduce ? {} : fadeUp}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to all perks
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-10">
        {/* ── Main Content Column ── */}
        <motion.div
          variants={shouldReduce ? {} : STAGGER_DETAIL}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-8"
        >
          {/* Header */}
          <motion.div variants={shouldReduce ? {} : fadeUp} className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <ToolLogo slug={tool.slug} title={tool.title} size="xl" />
              <div className="flex flex-col gap-1.5 min-w-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                  {tool.title}
                </h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">
                    {tool.category?.name || 'Developer Tool'}
                  </span>
                  <span className="text-slate-600">•</span>
                  <VerificationBadge
                    status={tool.verificationStatus}
                    verifiedAt={tool.verifiedAt}
                    expiresAt={tool.expiresAt}
                  />
                </div>
              </div>
            </div>

            <motion.p
              variants={shouldReduce ? {} : fadeUp}
              className="text-lg sm:text-xl text-slate-300 leading-relaxed"
            >
              {tool.description}
            </motion.p>
          </motion.div>

          <hr className="border-white/[0.06]" />

          {/* About section */}
          <motion.div variants={shouldReduce ? {} : fadeUp} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold tracking-tight text-white">About the Student Perk</h2>
            <p className="text-slate-400 leading-relaxed">
              {tool.title} offers an official program for verified students. This benefit provides access to professional tools, cloud infrastructure, or premium features at zero cost during your academic studies.
            </p>

            {/* Tags */}
            {tool.tags && tool.tags.length > 0 && (
              <motion.div
                variants={shouldReduce ? {} : staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-2 mt-4"
              >
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-1 font-mono text-xs font-medium text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* ── Sidebar / CTA Column ── */}
        <motion.div
          variants={shouldReduce ? {} : slideFromRight}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <div className="sticky top-28 flex flex-col gap-6 rounded-3xl p-6 glass-card border border-white/10 shadow-2xl">
            {/* Offer */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">Offer Details</span>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`badge-offer badge-offer-${tool.offer.type}`}>
                  {tool.offer.type}
                </span>
                <span className="text-sm font-semibold text-white">{tool.offer.description}</span>
              </div>
            </div>

            {/* Eligibility */}
            {(tool.eligibility.studentEmailRequired || tool.eligibility.studentVerificationRequired) && (
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">Eligibility Criteria</span>
                <ul className="flex flex-col gap-2.5 text-xs text-slate-300">
                  {tool.eligibility.studentEmailRequired && (
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Valid .edu or student email address
                    </li>
                  )}
                  {tool.eligibility.studentVerificationRequired && (
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Student ID or GitHub Student Developer Pack
                    </li>
                  )}
                </ul>
              </div>
            )}

            <hr className="border-white/[0.06]" />

            {/* CTA */}
            <div className="flex flex-col gap-3">
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm py-3.5 w-full shadow-lg shadow-indigo-600/40"
              >
                <span>Claim Perk on Official Site</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-medium text-slate-400">Save to your list</span>
                <SaveButton toolId={tool._id} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
