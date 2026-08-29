import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { safeConnectDB } from '@/lib/mongodb';
import { Tool } from '@/lib/models/Tool';
import { Category } from '@/lib/models/Category';
import { ToolDetailClient } from './ToolDetailClient';
import { FALLBACK_TOOLS } from '@/lib/data/fallbackData';
import type { Tool as ToolType } from '@/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let toolData: ToolType | null = null;

  try {
    const isConnected = await safeConnectDB();
    if (isConnected) {
      toolData = await Tool.findOne({ slug }).populate('category', 'name slug').lean();
    }
  } catch {
    // Ignore and fallback
  }

  if (!toolData) {
    const found = FALLBACK_TOOLS.find((t) => t.slug === slug);
    if (found) toolData = found;
  }

  if (!toolData) {
    return { title: 'Tool Not Found' };
  }

  const t = toolData;

  return {
    title: `${t.title} — Free for Students`,
    description: t.description,
    openGraph: {
      title: `${t.title} — Free for Students | FreePerks`,
      description: t.description,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: `${t.title} — Free for Students`,
      description: t.description,
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  let tool: ToolType | null = null;

  try {
    const isConnected = await safeConnectDB();
    if (isConnected) {
      void Category; // Ensure Category model registered
      const toolDoc = await Tool.findOne({ slug }).populate('category', 'name slug icon').lean();
      if (toolDoc) {
        tool = JSON.parse(JSON.stringify(toolDoc));
      }
    }
  } catch (err) {
    console.error('ToolPage DB fetch failed, using fallback:', err);
  }

  if (!tool) {
    const fbTool = FALLBACK_TOOLS.find((t) => t.slug === slug);
    if (!fbTool) notFound();
    tool = fbTool;
  }

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    description: tool.description,
    url: tool.url,
    applicationCategory: 'DeveloperApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: tool.offer.description,
      eligibleRegion: tool.eligibility.regions && tool.eligibility.regions.length > 0 ? tool.eligibility.regions : undefined,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ToolDetailClient tool={tool} />
    </>
  );
}
