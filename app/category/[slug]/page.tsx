import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { safeConnectDB } from '@/lib/mongodb';
import { Category } from '@/lib/models/Category';
import { Tool } from '@/lib/models/Tool';
import { CategoryToolsClient } from './CategoryToolsClient';
import { FALLBACK_CATEGORIES, FALLBACK_TOOLS } from '@/lib/data/fallbackData';
import type { Category as CategoryType, Tool as ToolType } from '@/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let categoryName = '';

  try {
    const isConnected = await safeConnectDB();
    if (isConnected) {
      const category = await Category.findOne({ slug }).lean();
      if (category) {
        categoryName = (category as unknown as { name: string }).name;
      }
    }
  } catch {
    // Ignore error and use fallback
  }

  if (!categoryName) {
    const fbCat = FALLBACK_CATEGORIES.find((c) => c.slug === slug);
    if (fbCat) categoryName = fbCat.name;
  }

  if (!categoryName) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${categoryName} — Free Tools for Students`,
    description: `Browse free ${categoryName.toLowerCase()} available for student developers.`,
    openGraph: {
      title: `${categoryName} — Free for Students | FreePerks`,
      description: `Browse free ${categoryName.toLowerCase()} available for student developers.`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  let category: CategoryType | null = null;
  let tools: ToolType[] = [];

  try {
    const isConnected = await safeConnectDB();
    if (isConnected) {
      const catDoc = await Category.findOne({ slug }).lean();
      if (catDoc) {
        category = JSON.parse(JSON.stringify(catDoc));
        const toolDocs = await Tool.find({
          category: catDoc._id,
          status: 'active',
        })
          .populate('category', 'name slug icon')
          .sort({ saves_count: -1 })
          .lean();
        tools = JSON.parse(JSON.stringify(toolDocs));
      }
    }
  } catch (err) {
    console.error('CategoryPage DB fetch failed, using fallback:', err);
  }

  if (!category) {
    const fbCat = FALLBACK_CATEGORIES.find((c) => c.slug === slug);
    if (!fbCat) notFound();
    category = fbCat;
    tools = FALLBACK_TOOLS.filter((t) => t.category.slug === slug && t.status === 'active');
  }

  return <CategoryToolsClient category={category} tools={tools} />;
}
