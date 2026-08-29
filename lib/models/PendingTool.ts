import mongoose, { Schema, Document, Types } from 'mongoose';

export type PendingStatus = 'pending' | 'approved' | 'rejected';

export interface IPendingTool extends Document {
  title: string;
  description: string;
  url: string;
  category: Types.ObjectId;
  tags: string[];
  eligibility: {
    studentEmailRequired: boolean;
    studentVerificationRequired: boolean;
    regions: string[];
  };
  offer: {
    type: 'free' | 'credit' | 'discount' | 'free-tier';
    description: string;
  };
  submitter_email: string;
  status: PendingStatus;
  submitted_at: Date;
  reviewed_at: Date | null;
}

const pendingToolSchema = new Schema<IPendingTool>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    tags: { type: [String], default: [] },
    eligibility: {
      studentEmailRequired: { type: Boolean, default: false },
      studentVerificationRequired: { type: Boolean, default: false },
      regions: { type: [String], default: [] },
    },
    offer: {
      type: { type: String, enum: ['free', 'credit', 'discount', 'free-tier'], required: true },
      description: { type: String, required: true },
    },
    submitter_email: { type: String, required: true, trim: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    submitted_at: { type: Date, default: Date.now },
    reviewed_at: { type: Date, default: null },
  },
  { timestamps: true }
);

export const PendingTool = mongoose.models.PendingTool || mongoose.model<IPendingTool>('PendingTool', pendingToolSchema);
