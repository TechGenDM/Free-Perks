'use client';

import { motion } from 'framer-motion';
import { useToolsInit } from '@/hooks/useTools';
import { SubmitToolForm } from '@/components/submission/SubmitToolForm';

export function SubmitPageClient() {
  // Load categories for the dropdown
  useToolsInit();

  return (
    <motion.div className="submit-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>Submit a Tool</h1>
      <p className="submit-subtitle">
        Know a free tool or perk for students? Submit it and we&apos;ll verify it for the community.
      </p>
      <SubmitToolForm />
    </motion.div>
  );
}
