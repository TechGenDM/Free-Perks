'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function SubmitPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title'),
      url: formData.get('url'),
      description: formData.get('description'),
      offer: {
        type: formData.get('offerType'),
        description: formData.get('offerDescription'),
      },
      submitterEmail: formData.get('email'),
    };

    try {
      const res = await fetch('/api/tools/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Submission failed');
      setSubmitStatus('success');
      e.currentTarget.reset();
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 md:px-6 py-12 md:py-20">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to all perks
      </Link>

      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">
          Submit a Student Perk
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Know a great free tool, cloud credit, or student discount? Submit it here and we will verify and feature it.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center rounded-3xl glass-card border border-emerald-500/30 p-10 text-center shadow-2xl"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-white">Successfully Submitted!</h2>
            <p className="text-sm text-slate-300 max-w-sm mb-6 leading-relaxed">
              Thank you for contributing. Our team will verify the perk and publish it to FreePerks.
            </p>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="btn-primary text-sm py-2.5 px-6"
            >
              Submit Another Perk
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 rounded-3xl glass-card border border-white/10 p-6 md:p-8 shadow-2xl"
          >
            {submitStatus === 'error' && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs font-semibold text-rose-300">
                Something went wrong submitting your perk. Please check the fields and try again.
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Tool Name
                </label>
                <input
                  required
                  type="text"
                  id="title"
                  name="title"
                  className="rounded-xl bg-white/4 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. GitHub Copilot"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="url" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Website URL
                </label>
                <input
                  required
                  type="url"
                  id="url"
                  name="url"
                  className="rounded-xl bg-white/4 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Short Description
              </label>
              <textarea
                required
                id="description"
                name="description"
                rows={3}
                className="rounded-xl bg-white/4 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none resize-none"
                placeholder="What is this tool and why is it useful for students?"
              />
            </div>

            <hr className="border-white/6" />

            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="offerType" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Offer Type
                </label>
                <select
                  required
                  id="offerType"
                  name="offerType"
                  className="rounded-xl bg-[#0c101c] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                >
                  <option value="free">100% Free for Students</option>
                  <option value="credit">Cloud Credits ($50–$300)</option>
                  <option value="free-tier">Generous Free Tier</option>
                  <option value="discount">Student Discount</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="offerDescription" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Offer Details
                </label>
                <input
                  required
                  type="text"
                  id="offerDescription"
                  name="offerDescription"
                  className="rounded-xl bg-white/4 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. Free Individual plan while enrolled"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Your Email <span className="text-slate-500 font-normal lowercase">(optional, for verification)</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="rounded-xl bg-white/4 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                placeholder="you@university.edu"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary text-sm py-3.5 mt-2 w-full shadow-lg shadow-indigo-600/40"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Perk for Verification'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
