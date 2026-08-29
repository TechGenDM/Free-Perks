/**
 * FreePerks Motion System
 * Central animation variant library — import from here for consistency.
 * All variants respect prefers-reduced-motion via Framer Motion's built-in support.
 */

import type { Variants, Transition } from 'framer-motion';

// ─── Physics Configs ────────────────────────────────────────────────────────

export const SPRING_FAST: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 32,
};

export const SPRING_SMOOTH: Transition = {
  type: 'spring',
  stiffness: 280,
  damping: 28,
};

export const SPRING_SLOW: Transition = {
  type: 'spring',
  stiffness: 180,
  damping: 24,
};

export const EASE_OUT: Transition = {
  duration: 0.3,
  ease: [0.16, 1, 0.3, 1],
};

export const EASE_OUT_FAST: Transition = {
  duration: 0.18,
  ease: [0.16, 1, 0.3, 1],
};

// ─── Entry Variants ─────────────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING_SMOOTH,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: EASE_OUT,
  },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: SPRING_SMOOTH,
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: EASE_OUT_FAST,
  },
};

// ─── Container / Stagger Variants ───────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// ─── Card Variants ───────────────────────────────────────────────────────────

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING_SMOOTH,
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: EASE_OUT_FAST,
  },
};

// ─── Section Reveal (whileInView) ────────────────────────────────────────────

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING_SMOOTH,
  },
};

export const sectionHeading: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...SPRING_SMOOTH },
  },
};

// ─── Hero Specific ───────────────────────────────────────────────────────────

export const heroClipReveal: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: {
      clipPath: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.3 },
    },
  },
};

export const heroBadge: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: SPRING_FAST,
  },
};

export const heroSearch: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...SPRING_SMOOTH, delay: 0.08 },
  },
};

// ─── Page Transition ─────────────────────────────────────────────────────────

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.12, ease: 'easeIn' },
  },
};

// ─── Viewport Defaults ───────────────────────────────────────────────────────

export const VIEWPORT_ONCE = { once: true, margin: '-60px' } as const;
export const VIEWPORT_REPEAT = { once: false, margin: '-60px' } as const;
