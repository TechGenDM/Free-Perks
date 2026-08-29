import { NextResponse } from 'next/server';
import { safeConnectDB } from '@/lib/mongodb';
import { Tool } from '@/lib/models/Tool';
import '@/lib/models/Category';
import { FALLBACK_TOOLS } from '@/lib/data/fallbackData';

export async function GET() {
  try {
    const isConnected = await safeConnectDB();
    if (isConnected) {
      const tools = await Tool.find({ is_featured: true, status: 'active' })
        .populate('category', 'name slug icon')
        .sort({ saves_count: -1 })
        .lean();

      if (tools && tools.length > 0) {
        return NextResponse.json({ tools });
      }
    }
  } catch (err) {
    console.error('Error fetching featured tools from DB, using fallback:', err);
  }

  const fallbackFeatured = FALLBACK_TOOLS.filter((t) => t.is_featured && t.status === 'active');
  return NextResponse.json({ tools: fallbackFeatured });
}
