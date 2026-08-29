// ─── Core Domain Types ───

export type OfferType = 'free' | 'credit' | 'discount' | 'free-tier';
export type VerificationStatus = 'verified' | 'needs-review' | 'expired';
export type ToolStatus = 'active' | 'archived';
export type SortOption = 'newest' | 'popular' | 'alphabetical';

export interface Eligibility {
  studentEmailRequired: boolean;
  studentVerificationRequired: boolean;
  regions: string[];
}

export interface Offer {
  type: OfferType;
  description: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  tool_count: number;
}

export interface Tool {
  _id: string;
  title: string;
  slug: string;
  description: string;
  url: string;
  logo_url: string;
  category: Category;
  tags: string[];
  eligibility: Eligibility;
  offer: Offer;
  verifiedAt: string | null;
  verificationStatus: VerificationStatus;
  expiresAt: string | null;
  status: ToolStatus;
  is_featured: boolean;
  saves_count: number;
  created_at: string;
}

export interface PendingTool {
  _id: string;
  title: string;
  description: string;
  url: string;
  category: Category;
  tags: string[];
  eligibility: Eligibility;
  offer: Offer;
  submitter_email: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  reviewed_at: string | null;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ToolsResponse {
  tools: Tool[];
  pagination: Pagination;
}

export interface SubmitToolPayload {
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  eligibility: Partial<Eligibility>;
  offer: Offer;
  submitter_email: string;
}
