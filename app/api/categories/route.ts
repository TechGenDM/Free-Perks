import { NextResponse } from 'next/server';
import { safeConnectDB } from '@/lib/mongodb';
import { Category } from '@/lib/models/Category';
import { FALLBACK_CATEGORIES } from '@/lib/data/fallbackData';

export async function GET() {
  try {
    const isConnected = await safeConnectDB();
    if (isConnected) {
      const categories = await Category.find().sort({ name: 1 }).lean();
      if (categories && categories.length > 0) {
        return NextResponse.json({ categories });
      }
    }
  } catch (err) {
    console.error('Error fetching categories from DB, using fallback:', err);
  }

  return NextResponse.json({ categories: FALLBACK_CATEGORIES });
}
