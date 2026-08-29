'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PendingTool } from '@/types';

export function AdminPageClient() {
  const [adminSecret, setAdminSecret] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pending, setPending] = useState<PendingTool[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/pending', {
        headers: { 'x-admin-secret': adminSecret },
      });

      if (!res.ok) {
        setError('Invalid admin secret');
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      setPending(data.pending);
      setIsAuthenticated(true);
    } catch {
      setError('Failed to connect');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReview = async (id: string, action: 'approve' | 'reject') => {
    try {
      const res = await fetch(`/api/admin/pending/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': adminSecret,
        },
        body: JSON.stringify({ action }),
      });
      const result = await res.json();
      setActionMessage(result.message);

      // Refresh
      const refreshRes = await fetch('/api/admin/pending', {
        headers: { 'x-admin-secret': adminSecret },
      });
      const refreshData = await refreshRes.json();
      setPending(refreshData.pending);
    } catch {
      setActionMessage('Action failed');
    }
  };

  if (!isAuthenticated) {
    return (
      <motion.div className="admin-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1>Admin Panel</h1>
        <form className="admin-login" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="admin-secret">Admin Secret</label>
            <input type="password" id="admin-secret" value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)} placeholder="Enter admin secret" required />
          </div>
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" className="admin-login-btn" disabled={isLoading}>
            {isLoading ? 'Checking...' : 'Access Admin'}
          </button>
        </form>
      </motion.div>
    );
  }

  return (
    <motion.div className="admin-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>Admin Panel</h1>
      <p className="admin-subtitle">{pending.length} pending submission{pending.length !== 1 ? 's' : ''}</p>

      {actionMessage && (
        <motion.div className="admin-action-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {actionMessage}
        </motion.div>
      )}

      <AnimatePresence>
        {pending.map((tool) => (
          <motion.div key={tool._id} className="admin-card" layout
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }}>
            <div className="admin-card-header">
              <h3>{tool.title}</h3>
              <span className="admin-card-date">{new Date(tool.submitted_at).toLocaleDateString()}</span>
            </div>
            <p className="admin-card-description">{tool.description}</p>
            <p className="admin-card-url">
              <a href={tool.url} target="_blank" rel="noopener noreferrer">{tool.url}</a>
            </p>
            <div className="admin-card-meta">
              <span>Offer: {tool.offer.type} — {tool.offer.description}</span>
              <span>From: {tool.submitter_email}</span>
            </div>
            <div className="admin-card-actions">
              <button className="admin-btn admin-btn--approve" onClick={() => handleReview(tool._id, 'approve')}>
                ✓ Approve
              </button>
              <button className="admin-btn admin-btn--reject" onClick={() => handleReview(tool._id, 'reject')}>
                ✗ Reject
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {pending.length === 0 && <p className="admin-empty">No pending submissions. 🎉</p>}
    </motion.div>
  );
}
