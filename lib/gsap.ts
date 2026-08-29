/**
 * GSAP plugin registration — client-side only.
 * Import from here (not from 'gsap' directly) in all scene components.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
