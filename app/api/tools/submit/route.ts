import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Tool } from '@/lib/models/Tool';
import { PendingTool } from '@/lib/models/PendingTool';
import '@/lib/models/Category';

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const { title, description, url, category, tags, eligibility, offer, submitter_email } = body;

    if (!title || !description || !url || !category || !offer || !submitter_email) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, url, category, offer, submitter_email' },
        { status: 400 }
      );
    }

    const existingTool = await Tool.findOne({ url });
    const existingPending = await PendingTool.findOne({ url, status: 'pending' });

    if (existingTool) {
      return NextResponse.json({ error: 'A tool with this URL already exists' }, { status: 409 });
    }
    if (existingPending) {
      return NextResponse.json({ error: 'A submission with this URL is already pending review' }, { status: 409 });
    }

    const pendingTool = await PendingTool.create({
      title, description, url, category,
      tags: tags || [],
      eligibility: eligibility || {},
      offer,
      submitter_email,
    });

    return NextResponse.json({ message: 'Tool submitted for review', pendingTool }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
