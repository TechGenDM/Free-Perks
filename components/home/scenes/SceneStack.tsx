'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import type { Tool } from '@/types';
import { ToolLogo } from '@/components/tools/ToolLogo';

interface SceneStackProps {
  tools: Tool[];
}

interface StackOption {
  id: string;
  name: string;
  slug: string;
  category: 'Frontend' | 'Backend' | 'AI' | 'Cloud';
  estimatedValue: number;
  offerText: string;
}

const STACK_OPTIONS: StackOption[] = [
  { id: 'copilot', name: 'GitHub Copilot', slug: 'github-copilot', category: 'AI', estimatedValue: 120, offerText: 'Free Individual Plan' },
  { id: 'chatgpt', name: 'ChatGPT Edu', slug: 'chatgpt-edu', category: 'AI', estimatedValue: 240, offerText: 'GPT-4o Access' },
  { id: 'notion', name: 'Notion AI', slug: 'notion-ai', category: 'AI', estimatedValue: 96, offerText: 'Education Plus AI' },
  { id: 'vercel', name: 'Vercel', slug: 'vercel', category: 'Frontend', estimatedValue: 240, offerText: 'Hobby & Edge Deploys' },
  { id: 'figma', name: 'Figma Education', slug: 'figma-education', category: 'Frontend', estimatedValue: 144, offerText: 'Professional Tier' },
  { id: 'netlify', name: 'Netlify', slug: 'netlify', category: 'Frontend', estimatedValue: 180, offerText: 'Free Starter Plan' },
  { id: 'railway', name: 'Railway', slug: 'railway', category: 'Backend', estimatedValue: 60, offerText: 'Free Compute Tier' },
  { id: 'mongodb', name: 'MongoDB Atlas', slug: 'mongodb-atlas-free', category: 'Backend', estimatedValue: 108, offerText: 'M0 Cloud Cluster' },
  { id: 'sendgrid', name: 'SendGrid', slug: 'sendgrid-free', category: 'Backend', estimatedValue: 180, offerText: '100 Emails/day Free' },
  { id: 'azure', name: 'Azure for Students', slug: 'azure-for-students', category: 'Cloud', estimatedValue: 100, offerText: '$100 Annual Credit' },
  { id: 'aws', name: 'AWS Educate', slug: 'aws-educate', category: 'Cloud', estimatedValue: 100, offerText: '$100 Cloud Credit' },
  { id: 'jetbrains', name: 'JetBrains All Products', slug: 'jetbrains-all-products-pack', category: 'Frontend', estimatedValue: 779, offerText: 'All IDEs Free' },
];

export function SceneStack({ tools }: SceneStackProps) {
  const shouldReduce = useReducedMotion();
  const [selectedTools, setSelectedTools] = useState<string[]>([
    'copilot',
    'vercel',
    'mongodb',
    'azure',
    'jetbrains',
  ]);

  const toggleTool = (id: string) => {
    setSelectedTools(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const totalSaved = STACK_OPTIONS.filter(o => selectedTools.includes(o.id)).reduce(
    (sum, item) => sum + item.estimatedValue,
    0
  );

  return (
    <section className="relative py-28 md:py-36 px-4 md:px-6 bg-[#090d16] overflow-hidden border-t border-white/4">
      {/* Ambience */}
      <div className="aurora-orb-violet bottom-[10%] -right-25" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/30 text-indigo-300 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            06 • INTERACTIVE STACK BUILDER
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white mb-4">
            Assemble your{' '}
            <span className="bg-linear-to-r from-purple-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              $0 dev stack.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto">
            Select the tools you need for your project and calculate how much you save in developer subscriptions.
          </p>
        </motion.div>

        {/* Live Total Value Saved Banner */}
        <div className="mb-10 p-6 rounded-3xl glass-panel border border-indigo-500/30 shadow-[0_0_50px_-15px_rgba(99,102,241,0.25)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/30">
              💎
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-300">
                Your Custom Stack Savings
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white">
                ${totalSaved.toLocaleString()}{' '}
                <span className="text-sm sm:text-base font-normal text-slate-400">/ year saved for $0</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setSelectedTools(STACK_OPTIONS.map(o => o.id))}
              className="btn-ghost text-xs py-2.5 px-4 w-full md:w-auto"
            >
              Select All ({STACK_OPTIONS.length})
            </button>
            <a
              href="#browse"
              className="btn-primary text-xs py-2.5 px-5 w-full md:w-auto text-center"
            >
              Explore Perks
            </a>
          </div>
        </div>

        {/* Interactive Tool Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {STACK_OPTIONS.map((item) => {
            const isSelected = selectedTools.includes(item.id);

            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleTool(item.id)}
                className={`group relative p-5 rounded-2xl cursor-pointer transition-all duration-200 border ${
                  isSelected
                    ? 'bg-indigo-950/40 border-indigo-500/60 shadow-lg shadow-indigo-950/50'
                    : 'glass-card border-white/6 opacity-60 hover:opacity-90'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <ToolLogo slug={item.slug} title={item.name} size="md" />
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      +${item.estimatedValue}/yr
                    </span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'border-white/20 bg-white/5'
                    }`}>
                      {isSelected && (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mb-1 truncate">
                  {item.name}
                </h4>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{item.category}</span>
                  <span className="font-semibold text-slate-300">{item.offerText}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
