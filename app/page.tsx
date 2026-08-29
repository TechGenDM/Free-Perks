import { safeConnectDB } from '@/lib/mongodb';
import { Tool } from '@/lib/models/Tool';
import { Category } from '@/lib/models/Category';

import { SceneHook } from '@/components/home/scenes/SceneHook';
import { SceneUniverse } from '@/components/home/scenes/SceneUniverse';
import { SceneDiscover } from '@/components/home/scenes/SceneDiscover';
import { SceneDirectory } from '@/components/home/scenes/SceneDirectory';
import { SceneCTA } from '@/components/home/scenes/SceneCTA';
import { HeavyScenes } from '@/components/home/HeavyScenes';
import { FALLBACK_CATEGORIES, FALLBACK_TOOLS } from '@/lib/data/fallbackData';

export const dynamic = 'force-dynamic';

// NOTE: `force-dynamic` prevents build-time prerendering, avoiding MongoDB Atlas
// IP whitelisting timeouts. Evaluate ISR / caching post-launch.

function serializeDocs(docs: unknown) {
  return JSON.parse(JSON.stringify(docs));
}

export default async function HomePage() {
  let totalVerified = FALLBACK_TOOLS.filter((t) => t.verificationStatus === 'verified').length;
  let categories = FALLBACK_CATEGORIES;
  let featuredTools = FALLBACK_TOOLS.filter((t) => t.is_featured && t.status === 'active');
  let buildingTools = FALLBACK_TOOLS.filter((t) =>
    t.tags.some((tag) => ['hosting', 'domain', 'database', 'deploy'].includes(tag))
  ).slice(0, 4);
  let aiTools = FALLBACK_TOOLS.filter((t) =>
    t.tags.some((tag) => ['ai', 'coding', 'copilot'].includes(tag))
  ).slice(0, 4);
  let cloudTools = FALLBACK_TOOLS.filter((t) => t.offer.type === 'credit').slice(0, 4);
  let verifyTools = FALLBACK_TOOLS.filter((t) => t.status === 'active').slice(0, 6);
  let stackTools = FALLBACK_TOOLS.filter((t) => t.status === 'active');

  try {
    const isConnected = await safeConnectDB();
    if (isConnected) {
      const dbTotal = await Tool.countDocuments({ status: 'active', verificationStatus: 'verified' });
      const rawCategories = await Category.find().sort({ tool_count: -1 }).lean();
      const rawFeatured = await Tool.find({ is_featured: true, status: 'active' })
        .populate('category').limit(8).lean();
      const rawBuilding = await Tool.find({
        tags: { $in: ['hosting', 'domain', 'database', 'deploy'] }, status: 'active',
      }).populate('category').limit(4).lean();
      const rawAI = await Tool.find({
        tags: { $in: ['ai', 'coding', 'copilot'] }, status: 'active',
      }).populate('category').limit(4).lean();
      const rawCloud = await Tool.find({
        'offer.type': 'credit', status: 'active',
      }).populate('category').limit(4).lean();
      const rawVerify = await Tool.find({ status: 'active' }).populate('category').limit(6).lean();
      const rawStack = await Tool.find({ status: 'active' }).populate('category').lean();

      if (rawCategories?.length > 0) {
        totalVerified = dbTotal;
        categories = serializeDocs(rawCategories);
        if (rawFeatured.length > 0) featuredTools = serializeDocs(rawFeatured);
        if (rawBuilding.length > 0) buildingTools = serializeDocs(rawBuilding);
        if (rawAI.length > 0) aiTools = serializeDocs(rawAI);
        if (rawCloud.length > 0) cloudTools = serializeDocs(rawCloud);
        if (rawVerify.length > 0) verifyTools = serializeDocs(rawVerify);
        if (rawStack.length > 0) stackTools = serializeDocs(rawStack);
      }
    }
  } catch (err) {
    console.error('Error fetching homepage data from MongoDB, using fallback data:', err);
  }

  // Build horizontal collection sections
  const collectionSections = [
    {
      id: 'ai',
      label: 'AI',
      sublabel: 'Supercharge your workflow',
      accent: '#6366f1',
      tools: aiTools,
    },
    {
      id: 'cloud',
      label: 'Cloud',
      sublabel: 'Infrastructure for free',
      accent: '#22d3ee',
      tools: cloudTools,
    },
    {
      id: 'build',
      label: 'Build',
      sublabel: 'Ship your project',
      accent: '#a78bfa',
      tools: buildingTools,
    },
  ].filter((s) => s.tools.length > 0);

  return (
    <div className="overflow-x-hidden">
      {/* SCENE 01 — The Hook (dark) */}
      <SceneHook totalTools={totalVerified} />

      {/* SCENE 02 — Developer Universe (dark → light transition) */}
      <SceneUniverse categories={categories} />

      {/* SCENE 03 — Discover Your Stack (light) */}
      <SceneDiscover featuredTools={featuredTools} />

      {/* SCENES 04–06 — Heavy GSAP scenes */}
      <HeavyScenes
        collectionSections={collectionSections}
        verifyTools={verifyTools}
        stackTools={stackTools}
      />

      {/* SCENE 07 — Full Directory (light) */}
      <SceneDirectory />

      {/* SCENE 08 — Final CTA (dark) */}
      <SceneCTA />
    </div>
  );
}
