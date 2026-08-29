'use client';

import dynamic from 'next/dynamic';
import type { Tool } from '@/types';

interface CollectionSection {
  id: string;
  label: string;
  sublabel: string;
  accent: string;
  tools: Tool[];
}

interface HeavyScenesProps {
  collectionSections: CollectionSection[];
  verifyTools: Tool[];
  stackTools: Tool[];
}

// Dynamic imports for heavy GSAP scenes — keeps initial JS bundle lean
const SceneBuild = dynamic(
  () => import('./scenes/SceneBuild').then(m => ({ default: m.SceneBuild })),
  { ssr: true }
);

const SceneVerify = dynamic(
  () => import('./scenes/SceneVerify').then(m => ({ default: m.SceneVerify })),
  { ssr: true }
);

const SceneStack = dynamic(
  () => import('./scenes/SceneStack').then(m => ({ default: m.SceneStack })),
  { ssr: true }
);

export function HeavyScenes({ collectionSections, verifyTools, stackTools }: HeavyScenesProps) {
  return (
    <>
      <SceneBuild sections={collectionSections} />
      <SceneVerify tools={verifyTools} />
      <SceneStack tools={stackTools} />
    </>
  );
}
