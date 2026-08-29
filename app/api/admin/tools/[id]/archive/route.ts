import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Tool } from '@/lib/models/Tool';
import { Category } from '@/lib/models/Category';

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
  const tool = await Tool.findById(id);
  if (!tool) return NextResponse.json({ error: 'Tool not found' }, { status: 404 });

  const newStatus = tool.status === 'active' ? 'archived' : 'active';
  tool.status = newStatus;
  await tool.save();

  const countDelta = newStatus === 'archived' ? -1 : 1;
  await Category.findByIdAndUpdate(tool.category, { $inc: { tool_count: countDelta } });

  return NextResponse.json({ message: `Tool ${newStatus}`, tool });
}
