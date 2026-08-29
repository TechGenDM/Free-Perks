import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { PendingTool } from '@/lib/models/PendingTool';
import { Tool } from '@/lib/models/Tool';
import { Category } from '@/lib/models/Category';
import slugify from 'slugify';

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
  const { action } = await req.json();

  if (!action || !['approve', 'reject'].includes(action)) {
    return NextResponse.json({ error: 'action must be "approve" or "reject"' }, { status: 400 });
  }

  const pendingTool = await PendingTool.findById(id);
  if (!pendingTool) return NextResponse.json({ error: 'Pending tool not found' }, { status: 404 });
  if (pendingTool.status !== 'pending') return NextResponse.json({ error: `Tool already ${pendingTool.status}` }, { status: 400 });

  if (action === 'approve') {
    const slug = slugify(pendingTool.title, { lower: true, strict: true });
    const existingSlug = await Tool.findOne({ slug });
    const finalSlug = existingSlug ? `${slug}-${Date.now()}` : slug;

    await Tool.create({
      title: pendingTool.title, slug: finalSlug, description: pendingTool.description,
      url: pendingTool.url, category: pendingTool.category, tags: pendingTool.tags,
      eligibility: pendingTool.eligibility, offer: pendingTool.offer,
      verifiedAt: null, verificationStatus: 'needs-review', status: 'active',
    });

    await Category.findByIdAndUpdate(pendingTool.category, { $inc: { tool_count: 1 } });
    pendingTool.status = 'approved';
    pendingTool.reviewed_at = new Date();
    await pendingTool.save();

    return NextResponse.json({ message: 'Tool approved and published', slug: finalSlug });
  } else {
    pendingTool.status = 'rejected';
    pendingTool.reviewed_at = new Date();
    await pendingTool.save();
    return NextResponse.json({ message: 'Tool rejected' });
  }
}
