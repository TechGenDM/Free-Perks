import mongoose, { Schema, Document, Types } from 'mongoose';

export type OfferType = 'free' | 'credit' | 'discount' | 'free-tier';
export type VerificationStatus = 'verified' | 'needs-review' | 'expired';
export type ToolStatus = 'active' | 'archived';

export interface IEligibility {
  studentEmailRequired: boolean;
  studentVerificationRequired: boolean;
  regions: string[];
}

export interface IOffer {
  type: OfferType;
  description: string;
}

export interface ITool extends Document {
  title: string;
  slug: string;
  description: string;
  url: string;
  logo_url: string;
  category: Types.ObjectId;
  tags: string[];
  eligibility: IEligibility;
  offer: IOffer;
  verifiedAt: Date | null;
  verificationStatus: VerificationStatus;
  expiresAt: Date | null;
  status: ToolStatus;
  is_featured: boolean;
  saves_count: number;
  created_at: Date;
}

const toolSchema = new Schema<ITool>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true, trim: true },
    url: { type: String, required: true, unique: true, trim: true },
    logo_url: { type: String, default: '' },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    tags: { type: [String], default: [], index: true },
    eligibility: {
      studentEmailRequired: { type: Boolean, default: false },
      studentVerificationRequired: { type: Boolean, default: false },
      regions: { type: [String], default: [] },
    },
    offer: {
      type: { type: String, enum: ['free', 'credit', 'discount', 'free-tier'], required: true },
      description: { type: String, required: true },
    },
    verifiedAt: { type: Date, default: null },
    verificationStatus: { type: String, enum: ['verified', 'needs-review', 'expired'], default: 'needs-review' },
    expiresAt: { type: Date, default: null },
    status: { type: String, enum: ['active', 'archived'], default: 'active' },
    is_featured: { type: Boolean, default: false },
    saves_count: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

toolSchema.index({ title: 'text', description: 'text', tags: 'text' }, { weights: { title: 10, tags: 5, description: 1 } });
toolSchema.index({ category: 1, status: 1 });
toolSchema.index({ verificationStatus: 1 });
toolSchema.index({ is_featured: 1, status: 1 });
toolSchema.index({ slug: 1 });

export const Tool = mongoose.models.Tool || mongoose.model<ITool>('Tool', toolSchema);
