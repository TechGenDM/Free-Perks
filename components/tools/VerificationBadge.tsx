'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { VerificationStatus } from '@/types';

interface VerificationBadgeProps {
  status: VerificationStatus;
  verifiedAt?: string | null;
  expiresAt?: string | null;
  compact?: boolean;
}

function getRelativeTime(dateStr: string, isFuture: boolean = false): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = isFuture ? date.getTime() - now.getTime() : now.getTime() - date.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'today';
  if (diffDays === 1) return isFuture ? 'tomorrow' : '1d ago';
  if (diffDays < 30) return isFuture ? `in ${diffDays}d` : `${diffDays}d ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return isFuture ? `in ${diffMonths}mo` : `${diffMonths}mo ago`;
  const diffYears = Math.floor(diffDays / 365);
  return isFuture ? `in ${diffYears}yr` : `${diffYears}yr ago`;
}

function getDaysUntilExpiry(expiresAt: string): number {
  return Math.ceil((new Date(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

function AnimatedCheck({ color }: { color: string }) {
  const shouldReduce = useReducedMotion();
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
      <motion.path
        d="M2 6l3 3 5-5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={shouldReduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
      />
    </svg>
  );
}

function ClockIcon({ color }: { color: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function VerificationBadge({ status, verifiedAt, expiresAt, compact = false }: VerificationBadgeProps) {
  let timeStr: string | null = null;
  let isExpiringSoon = false;

  if (!compact) {
    if (status === 'expired' && expiresAt) {
      timeStr = getRelativeTime(expiresAt, false);
    } else if (status === 'verified' && verifiedAt) {
      timeStr = getRelativeTime(verifiedAt, false);
    }
  }

  if (status === 'verified' && expiresAt) {
    const daysLeft = getDaysUntilExpiry(expiresAt);
    if (daysLeft > 0 && daysLeft <= 14) {
      isExpiringSoon = true;
    }
  }

  if (status === 'verified' && !isExpiringSoon) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-lg px-2 py-0.5 text-[11px] font-semibold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
        <AnimatedCheck color="#34d399" />
        <span>
          Verified
          {timeStr && <span className="font-mono font-normal opacity-75 lowercase ml-1">({timeStr})</span>}
        </span>
      </div>
    );
  }

  if (status === 'verified' && isExpiringSoon && expiresAt) {
    const daysLeft = getDaysUntilExpiry(expiresAt);
    return (
      <div className="inline-flex items-center gap-1.5 rounded-lg px-2 py-0.5 text-[11px] font-semibold border border-amber-500/30 bg-amber-500/10 text-amber-300">
        <ClockIcon color="#fbbf24" />
        <span>Expires in {daysLeft}d</span>
      </div>
    );
  }

  if (status === 'needs-review') {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-lg px-2 py-0.5 text-[11px] font-semibold border border-amber-500/30 bg-amber-500/10 text-amber-300">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <span>Needs Review</span>
      </div>
    );
  }

  // expired
  return (
    <div className="inline-flex items-center gap-1.5 rounded-lg px-2 py-0.5 text-[11px] font-semibold border border-rose-500/30 bg-rose-500/10 text-rose-300">
      <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
      <span>
        Expired
        {timeStr && <span className="font-mono font-normal opacity-75 lowercase ml-1">({timeStr})</span>}
      </span>
    </div>
  );
}
