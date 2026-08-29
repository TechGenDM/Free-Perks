import { NextRequest, NextResponse } from 'next/server';
import { safeConnectDB } from '@/lib/mongodb';
import { Tool } from '@/lib/models/Tool';
import '@/lib/models/Category';
import { FALLBACK_TOOLS } from '@/lib/data/fallbackData';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const search = searchParams.get('search')?.toLowerCase();
  const category = searchParams.get('category');
  const tags = searchParams.get('tags');
  const sort = searchParams.get('sort') || 'newest';
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
  const status = searchParams.get('status') || 'active';
  const verification = searchParams.get('verification');

  try {
    const isConnected = await safeConnectDB();
    if (isConnected) {
      const filter: Record<string, unknown> = {};

      if (status !== 'all') filter.status = status;
      if (category) filter.category = category;
      if (verification) filter.verificationStatus = verification;
      if (tags) {
        const tagArray = tags.split(',').map((t) => t.trim().toLowerCase());
        filter.tags = { $in: tagArray };
      }

      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { tags: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }

      let sortQuery: Record<string, 1 | -1> = {};
      switch (sort) {
        case 'popular': sortQuery = { saves_count: -1 }; break;
        case 'alphabetical': sortQuery = { title: 1 }; break;
        default: sortQuery = { created_at: -1 }; break;
      }

      const skip = (page - 1) * limit;

      const [tools, total] = await Promise.all([
        Tool.find(filter).populate('category', 'name slug icon').sort(sortQuery).skip(skip).limit(limit).lean(),
        Tool.countDocuments(filter),
      ]);

      if (tools && tools.length > 0) {
        return NextResponse.json({
          tools,
          pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        });
      }
    }
  } catch (err) {
    console.error('Error querying tools from DB, using fallback dataset:', err);
  }

  // ─── In-Memory Fallback Filtering ───
  const filtered = FALLBACK_TOOLS.filter((t) => {
    if (status !== 'all' && t.status !== status) return false;
    if (verification && t.verificationStatus !== verification) return false;
    if (category && t.category._id !== category && t.category.slug !== category) return false;
    if (tags) {
      const tagList = tags.split(',').map((x) => x.trim().toLowerCase());
      if (!tagList.some((tg) => t.tags.includes(tg))) return false;
    }
    if (search) {
      const matchesTitle = t.title.toLowerCase().includes(search);
      const matchesDesc = t.description.toLowerCase().includes(search);
      const matchesTag = t.tags.some((tg) => tg.toLowerCase().includes(search));
      if (!matchesTitle && !matchesDesc && !matchesTag) return false;
    }
    return true;
  });

  if (sort === 'popular') {
    filtered.sort((a, b) => b.saves_count - a.saves_count);
  } else if (sort === 'alphabetical') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  const total = filtered.length;
  const skip = (page - 1) * limit;
  const paginatedTools = filtered.slice(skip, skip + limit);

  return NextResponse.json({
    tools: paginatedTools,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) || 1 },
  });
}
