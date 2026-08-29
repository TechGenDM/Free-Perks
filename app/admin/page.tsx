'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminTool {
  _id: string;
  title: string;
  url: string;
  description: string;
  offer?: { type: string; description: string };
  submitterEmail?: string;
}

export default function AdminPage() {
  const [secret, setSecret] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingTools, setPendingTools] = useState<AdminTool[]>([]);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const authenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(false);
    
    try {
      const res = await fetch('/api/admin/pending', {
        headers: { 'x-admin-secret': secret },
      });
      
      if (!res.ok) throw new Error('Invalid secret');
      
      const data = await res.json();
      setPendingTools(data.tools || []);
      setIsAuthenticated(true);
    } catch (err) {
      setAuthError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    setActionError(null);
    try {
      const res = await fetch(`/api/admin/${action}/${id}`, {
        method: 'POST',
        headers: { 'x-admin-secret': secret },
      });
      
      if (!res.ok) throw new Error(`Failed to ${action} tool`);
      
      setPendingTools(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      setActionError((err as Error).message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-md pt-20">
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mb-2">Admin Portal</h1>
            <p className="text-sm text-zinc-500">Enter your secret key to access the moderation queue.</p>
          </div>
          
          <form onSubmit={authenticate} className="flex flex-col gap-4">
            {authError && (
              <div className="rounded-lg bg-rose-50 p-3 text-sm text-rose-600 border border-rose-200">
                Invalid admin secret. Please try again.
              </div>
            )}
            <input
              type="password"
              placeholder="Admin Secret"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-zinc-800 focus-ring disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Authenticate'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">Moderation Queue</h1>
          <p className="text-zinc-500">Review and approve pending student perks.</p>
        </div>
        <div className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-600">
          {pendingTools.length} Pending
        </div>
      </div>

      {actionError && (
        <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-600">
          {actionError}
        </div>
      )}

      {pendingTools.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white py-24 text-center shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 mb-1">All caught up!</h3>
          <p className="text-sm text-zinc-500">There are no pending submissions to review.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {pendingTools.map((tool) => (
              <motion.div
                key={tool._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col md:flex-row gap-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-zinc-900">{tool.title}</h3>
                    <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-indigo-600 hover:underline">
                      Visit URL ↗
                    </a>
                  </div>
                  
                  <p className="text-sm text-zinc-600">{tool.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-xs font-medium text-zinc-500">
                    <span className="flex items-center gap-1.5"><strong className="text-zinc-700">Offer:</strong> {tool.offer?.type} - {tool.offer?.description}</span>
                    {tool.submitterEmail && <span className="flex items-center gap-1.5"><strong className="text-zinc-700">From:</strong> {tool.submitterEmail}</span>}
                  </div>
                </div>

                <div className="flex md:flex-col gap-2 border-t md:border-t-0 md:border-l border-zinc-100 pt-4 md:pt-0 md:pl-6 shrink-0 justify-center">
                  <button
                    onClick={() => handleAction(tool._id, 'approve')}
                    className="flex-1 md:flex-none rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 focus-ring"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(tool._id, 'reject')}
                    className="flex-1 md:flex-none rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-100 focus-ring"
                  >
                    Reject
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
