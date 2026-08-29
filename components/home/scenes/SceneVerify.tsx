'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import type { Tool } from '@/types';
import { ToolLogo } from '@/components/tools/ToolLogo';

interface SceneVerifyProps {
  tools: Tool[];
}

const VERIFY_STEPS = [
  { label: 'Checking Student Eligibility & .edu Domain...', progress: 35 },
  { label: 'Validating GitHub Student Pack & University Grants...', progress: 75 },
  { label: '✓ 100% VERIFIED & READY TO CLAIM', progress: 100 },
];

export function SceneVerify({ tools }: SceneVerifyProps) {
  const shouldReduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (hasTriggered || shouldReduce) {
      setStep(2);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
          const t1 = setTimeout(() => setStep(1), 1200);
          const t2 = setTimeout(() => setStep(2), 2400);
          return () => {
            clearTimeout(t1);
            clearTimeout(t2);
          };
        }
      },
      { threshold: 0.35 }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [hasTriggered, shouldReduce]);

  const verifiedTools = tools.filter(t => t.verificationStatus === 'verified' || t.status === 'active');

  return (
    <section ref={containerRef} className="relative py-28 md:py-36 px-4 md:px-6 bg-[#07090e] overflow-hidden border-t border-white/4">
      {/* Ambience */}
      <div className="aurora-orb-indigo top-[30%] -left-37.5" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-emerald-300 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            05 • ZERO CATCH VERIFICATION
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white mb-4">
            Are these perks{' '}
            <span className="bg-linear-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              actually free?
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto">
            Yes. Major tech companies offer official academic programs for verified students. We check and test each one.
          </p>
        </motion.div>

        {/* Live Verification Simulator Box */}
        <div className="max-w-2xl mx-auto mb-16 p-6 sm:p-8 rounded-3xl glass-card border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Top terminal bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/8 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs font-mono text-slate-400">verification-engine.ts</span>
            <span className="text-xs font-mono font-bold text-emerald-400">ACTIVE</span>
          </div>

          {/* Step Display */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-200">
                {VERIFY_STEPS[step]?.label}
              </span>
              <span className="font-mono text-xs font-bold text-indigo-400">
                {VERIFY_STEPS[step]?.progress}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-white/6 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-emerald-400"
                initial={{ width: '0%' }}
                animate={{ width: `${VERIFY_STEPS[step]?.progress}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>

            {/* Simulated Checks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className={`p-3 rounded-xl border text-xs font-medium transition-all ${
                step >= 0
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : 'border-white/5 bg-white/2 text-slate-500'
              }`}>
                {step >= 0 ? '✓' : '○'} .edu Email Verified
              </div>
              <div className={`p-3 rounded-xl border text-xs font-medium transition-all ${
                step >= 1
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : 'border-white/5 bg-white/2 text-slate-500'
              }`}>
                {step >= 1 ? '✓' : '○'} GitHub Pack Active
              </div>
              <div className={`p-3 rounded-xl border text-xs font-medium transition-all ${
                step >= 2
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : 'border-white/5 bg-white/2 text-slate-500'
              }`}>
                {step >= 2 ? '✓' : '○'} $0 Student License
              </div>
            </div>
          </div>
        </div>

        {/* Verified Tools Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {verifiedTools.slice(0, 6).map((tool, i) => (
            <motion.div
              key={tool._id}
              initial={shouldReduce ? {} : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link href={`/tools/${tool.slug}`} className="group block p-4 rounded-2xl glass-card border border-white/8 hover:border-emerald-500/50 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <ToolLogo slug={tool.slug} title={tool.title} size="md" />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                      {tool.title}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[11px] font-semibold text-emerald-400">Verified Free</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-white transition-colors">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
