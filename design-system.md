# FreePerks Design System

This document outlines the core visual primitives and interaction patterns used across the FreePerks platform. The goal is an Apple/Linear/Vercel-level aesthetic: **premium, stark, confident, and highly polished.**

## 1. Typography
We use `next/font` with the Vercel Geist typeface for a crisp, developer-focused aesthetic.
- **Primary Font:** Geist Sans. Used for headers, body copy, and UI text.
- **Monospace:** Geist Mono. Used for technical data, dates, verification metadata, and keyboard shortcuts.
- **Hierarchy:** High contrast in weight. Headers are tightly tracked (e.g. `tracking-tight`), whereas body copy is loose and highly legible.

## 2. Color Palette
The UI is aggressively monochrome, punctuated by a single restrained accent color.
- **Backgrounds:** Pure white (`#FFFFFF`) or ultra-light zinc (`#FAFAFA`, `#F4F4F5`).
- **Borders:** Subtle boundaries (`border-zinc-200` or `border-zinc-100`).
- **Text:** High-contrast near-black (`text-zinc-900`) for headers, muted slate/zinc (`text-zinc-500`) for secondary copy.
- **Accent:** Indigo (`indigo-600`) used **only** for interactive links, active states, and critical highlights. Not for backgrounds or large areas.
- **Primary CTAs:** Black backgrounds with white text. Solid and unmistakable.
- **Status Colors:** Muted and elegant (e.g., Emerald-600 for verified, Amber-500 for review, Rose-500 for expired).

## 3. Shapes & Spacing
- **Corners:** Containers and cards use `rounded-xl` or `rounded-lg`. Badges and tags use `rounded-md` or `rounded-full` (pills only used for small metadata). Avoid overarching pill-shaped UI elements.
- **Spacing:** Generous padding. Elements should feel like they have breathing room. 

## 4. Motion (Framer Motion)
Animations must communicate state and structure. No decorative motion.
- **Springs:** Fast and responsive (`stiffness: 300, damping: 30`).
- **Hover:** Very subtle lift (`y: -2`, increased shadow) on Tool Cards. No exaggerated scaling.
- **Layout:** Smooth reflows (`layout` prop) when grids resize or filters apply.
- **Reduced Motion:** Respect `prefers-reduced-motion` at the CSS or Framer config level.

## 5. Trust & Verification
Verification is a visual identity, not just metadata.
- **Verified:** Green icon + Date (Geist Mono).
- **Needs Review:** Yellow icon.
- **Expired:** Red icon + Time remaining/elapsed.
Make this information visible instantly on cards and detail pages without dominating the brand identity.

## 6. Accessibility & Responsiveness
- High-contrast focus rings (`focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2`).
- Semantic HTML tags.
- Responsive grid scales smoothly from 1 column (mobile) to 2 (tablet) to 3-4 (desktop).
- Touch-friendly tap targets on mobile (min 44px).
