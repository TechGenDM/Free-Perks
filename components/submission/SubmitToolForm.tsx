'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToolStore } from '@/store/useToolStore';
import type { SubmitToolPayload, OfferType } from '@/types';

export function SubmitToolForm() {
  const { categories } = useToolStore();

  const [formData, setFormData] = useState<SubmitToolPayload>({
    title: '', description: '', url: '', category: '',
    tags: [], eligibility: { studentEmailRequired: false, studentVerificationRequired: false, regions: [] },
    offer: { type: 'free', description: '' }, submitter_email: '',
  });

  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    try {
      const res = await fetch('/api/tools/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setResult({ success: true, message: data.message || 'Tool submitted!' });
        setFormData({
          title: '', description: '', url: '', category: '',
          tags: [], eligibility: { studentEmailRequired: false, studentVerificationRequired: false, regions: [] },
          offer: { type: 'free', description: '' }, submitter_email: '',
        });
      } else {
        setResult({ success: false, message: data.error || 'Submission failed' });
      }
    } catch {
      setResult({ success: false, message: 'Network error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  return (
    <motion.form
      className="submit-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="form-group">
        <label htmlFor="title">Tool Name *</label>
        <input id="title" type="text" required value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea id="description" rows={4} required value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="url">URL *</label>
          <input id="url" type="url" required value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select id="category" required value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="offer-type">Offer Type *</label>
          <select id="offer-type" required value={formData.offer.type}
            onChange={(e) => setFormData({ ...formData, offer: { ...formData.offer, type: e.target.value as OfferType } })}>
            <option value="free">Free</option>
            <option value="credit">Credit</option>
            <option value="discount">Discount</option>
            <option value="free-tier">Free Tier</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="offer-desc">Offer Description *</label>
          <input id="offer-desc" type="text" required value={formData.offer.description}
            onChange={(e) => setFormData({ ...formData, offer: { ...formData.offer, description: e.target.value } })} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <div className="search-bar">
          <input id="tags" type="text" value={tagInput} placeholder="Add a tag and press Enter"
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }} />
          <button type="button" onClick={addTag}>Add</button>
        </div>
        {formData.tags.length > 0 && (
          <div className="tool-card-tags" style={{ marginTop: '0.5rem' }}>
            {formData.tags.map((tag) => (
              <span key={tag} className="tool-tag" onClick={() => removeTag(tag)} style={{ cursor: 'pointer' }}>
                {tag} ✕
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="form-group form-checkboxes">
        <label className="checkbox-label">
          <input type="checkbox" checked={formData.eligibility.studentEmailRequired || false}
            onChange={(e) => setFormData({
              ...formData, eligibility: { ...formData.eligibility, studentEmailRequired: e.target.checked },
            })} />
          Student email required
        </label>
        <label className="checkbox-label">
          <input type="checkbox" checked={formData.eligibility.studentVerificationRequired || false}
            onChange={(e) => setFormData({
              ...formData, eligibility: { ...formData.eligibility, studentVerificationRequired: e.target.checked },
            })} />
          Verification required
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="email">Your Email *</label>
        <input id="email" type="email" required value={formData.submitter_email}
          onChange={(e) => setFormData({ ...formData, submitter_email: e.target.value })} />
      </div>

      {result && (
        <div className={`submit-result ${result.success ? 'submit-result--success' : 'submit-result--error'}`}>
          {result.message}
        </div>
      )}

      <button type="submit" className="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Tool for Review'}
      </button>
    </motion.form>
  );
}
