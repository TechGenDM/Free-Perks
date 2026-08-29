'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Tool } from '@/types';
import { VerificationBadge } from './VerificationBadge';
import { SaveButton } from '../bookmarks/SaveButton';
import { ToolLogo } from './ToolLogo';
import { cardVariants } from '@/lib/motion';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const isExpired = tool.expiresAt && new Date(tool.expiresAt) < new Date();

  return (
    <motion.div
      variants={cardVariants}
      layout="position"
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl glass-card border border-white/[0.08] hover:border-indigo-500/50 transition-all duration-300 ${
        isExpired ? 'opacity-50' : ''
      }`}
    >
      <div className="flex flex-col gap-3.5 p-5">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <ToolLogo slug={tool.slug} title={tool.title} size="md" />
            <div className="flex flex-col min-w-0">
              <Link href={`/tools/${tool.slug}`} className="focus:outline-none">
                <h3 className="text-base font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                  {tool.title}
                </h3>
              </Link>
              <span className="text-[11px] font-mono font-medium text-slate-400 uppercase tracking-wider truncate">
                {tool.category?.name || 'Developer Tool'}
              </span>
            </div>
          </div>
          <div className="relative z-10 shrink-0">
            <SaveButton toolId={tool._id} />
          </div>
        </div>

        {/* Offer Row */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`badge-offer badge-offer-${tool.offer.type}`}>
            {tool.offer.type}
          </span>
          <span className="text-xs font-semibold text-slate-200 line-clamp-1">
            {tool.offer.description}
          </span>
        </div>

        {/* Eligibility Tags */}
        {(tool.eligibility.studentEmailRequired || tool.eligibility.studentVerificationRequired) && (
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
            {tool.eligibility.studentEmailRequired && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                .edu Email
              </span>
            )}
            {tool.eligibility.studentVerificationRequired && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ID Check
                </span>
              </>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-[13px] text-slate-300 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Footer Row */}
      <div className="flex items-center justify-between border-t border-white/[0.06] bg-black/20 px-5 py-3">
        <VerificationBadge
          status={tool.verificationStatus}
          verifiedAt={tool.verifiedAt}
          expiresAt={tool.expiresAt}
          compact={false}
        />
        <Link
          href={`/tools/${tool.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors"
        >
          <span>Claim</span>
          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}
