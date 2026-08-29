'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error('Next.js Error Boundary Caught:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-md flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-8 shadow-sm"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-bold tracking-tight text-red-900">Unable to load data</h2>
        <p className="mb-6 text-sm text-red-600">
          We encountered an issue connecting to our database. Check your connection and try again.
        </p>
        <button
          onClick={() => reset()}
          className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
        >
          Try Again
        </button>
      </motion.div>
    </div>
  );
}
