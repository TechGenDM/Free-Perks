import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Tool } from '@/lib/models/Tool';

function checkAdmin(req: NextRequest): boolean {
  const secret = req.headers.get('x-admin-secret');
  return !!process.env.ADMIN_SECRET && secret === process.env.ADMIN_SECRET;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();
  const { id } = await params;
  const { verificationStatus } = await req.json();

  if (!verificationStatus || !['verified', 'needs-review', 'expired'].includes(verificationStatus)) {
    return NextResponse.json({ error: 'Invalid verificationStatus' }, { status: 400 });
  }

  const update: Record<string, unknown> = { verificationStatus };
  if (verificationStatus === 'verified') update.verifiedAt = new Date();

  const tool = await Tool.findByIdAndUpdate(id, update, { new: true }).lean();
  if (!tool) return NextResponse.json({ error: 'Tool not found' }, { status: 404 });

  return NextResponse.json({ message: `Verification updated to ${verificationStatus}`, tool });
}
