import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { PendingTool } from '@/lib/models/PendingTool';
import '@/lib/models/Category';

function checkAdmin(req: NextRequest): boolean {
  const secret = req.headers.get('x-admin-secret');
  return !!process.env.ADMIN_SECRET && secret === process.env.ADMIN_SECRET;
}

export async function GET(req: NextRequest) {
  if (!checkAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();
  const status = req.nextUrl.searchParams.get('status') || 'pending';
  const filter = status === 'all' ? {} : { status };
  const pending = await PendingTool.find(filter).populate('category', 'name slug').sort({ submitted_at: -1 }).lean();

  return NextResponse.json({ pending, total: pending.length });
}
