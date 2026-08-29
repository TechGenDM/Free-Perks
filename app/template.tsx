'use client';

import { motion } from 'framer-motion';
import { pageTransition } from '@/lib/motion';

/**
 * Next.js template.tsx — re-renders on every route navigation.
 * This gives cross-route page transitions without needing AnimatePresence
 * at layout level (which would require 'use client' on the root layout).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
