// ============================================
// AURA AI - SHARED TYPESCRIPT TYPES
// ============================================

// ---- USER & AUTH ----
export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN'
export type PlanType = 'FREE' | 'STARTER' | 'PRO' | 'AGENCY' | 'ENTERPRISE'

export interface User {
  id: string
  email: string
  name?: string
  image?: string
  role: UserRole
  plan: PlanType
  credits: number
  createdAt: string
  updatedAt: string
}

export interface AuthSession {
  user: User & { accessToken: string }
  expires: string
}

// ---- WORKSPACE ----
export interface Workspace {
  id: string
  name: string
  slug: string
  logo?: string
  plan: PlanType
  ownerId: string
  createdAt: string
}

export type WorkspaceMemberRole = 'OWNER' | 'ADMIN' | 'EDITOR' | 'VIEWER'

export interface WorkspaceMember {
  userId: string
  workspaceId: string
  role: WorkspaceMemberRole
  user: User
}

// ---- PLATFORMS ----
export type SocialPlatform =
  | 'instagram' | 'youtube' | 'tiktok'
  | 'linkedin' | 'twitter' | 'facebook' | 'pinterest'

export type ContentType =
  | 'post' | 'reel' | 'carousel' | 'story'
  | 'short' | 'video' | 'thread' | 'article' | 'pin'

export type ContentStatus = 'DRAFT' | 'GENERATING' | 'READY' | 'SCHEDULED' | 'PUBLISHED' | 'FAILED'

// ---- CONTENT ----
export interface GeneratedContent {
  id?: string
  caption: string
  hashtags: string[]
  hook?: string
  cta?: string
  script?: string
  seoTitle?: string
  description?: string
  score?: number
  platform?: SocialPlatform
  createdAt?: string
}

export interface ContentItem {
  id: string
  workspaceId: string
  title?: string
  platform: SocialPlatform
  contentType: ContentType
  status: ContentStatus
  caption: string
  hashtags: string[]
  mediaUrls: string[]
  scheduledAt?: string
  publishedAt?: string
  views?: number
  likes?: number
  comments?: number
  shares?: number
  createdAt: string
  updatedAt: string
}

// ---- AI GENERATION ----
export interface ContentGenerationRequest {
  prompt: string
  platform: SocialPlatform
  contentType?: ContentType
  tone?: string
  count?: number
  brand?: {
    name?: string
    toneOfVoice?: string[]
    guidelines?: string
  }
}

export interface ImageGenerationRequest {
  prompt: string
  style?: string
  aspectRatio?: '1:1' | '9:16' | '16:9' | '4:5'
  count?: number
}

// ---- ANALYTICS ----
export interface PlatformAnalytics {
  platform: SocialPlatform
  reach: number
  impressions: number
  engagement: number
  followers: number
  followerGrowth: number
  postsCount: number
  avgLikes: number
  avgComments: number
  avgShares: number
  topPost?: ContentItem
}

export interface OverviewAnalytics {
  totalReach: number
  avgEngagement: number
  totalFollowers: number
  followerGrowth: number
  contentPublished: number
  platforms: PlatformAnalytics[]
}

// ---- AUTOMATION ----
export type WorkflowStatus = 'ACTIVE' | 'PAUSED' | 'DRAFT'
export type TriggerType = 'SCHEDULE' | 'RSS' | 'SHOPIFY' | 'NOTION' | 'TREND' | 'APPROVAL' | 'WEBHOOK'
export type ActionType =
  | 'GENERATE_TEXT' | 'GENERATE_IMAGE' | 'GENERATE_VIDEO' | 'GENERATE_VOICE'
  | 'POST_INSTAGRAM' | 'POST_YOUTUBE' | 'POST_TIKTOK' | 'POST_LINKEDIN'
  | 'POST_TWITTER' | 'POST_FACEBOOK' | 'NOTIFY_SLACK' | 'SAVE_DRAFT'

export interface WorkflowNode {
  id: string
  type: TriggerType | ActionType
  config: Record<string, any>
  position?: { x: number; y: number }
}

export interface Workflow {
  id: string
  workspaceId: string
  name: string
  description?: string
  status: WorkflowStatus
  trigger: WorkflowNode
  actions: WorkflowNode[]
  runsTotal: number
  lastRunAt?: string
  createdAt: string
}

// ---- BRAND ----
export interface BrandKit {
  id: string
  workspaceId: string
  name?: string
  tagline?: string
  logoUrl?: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontFamily: string
  toneOfVoice: string[]
  guidelines?: string
  createdAt: string
}

// ---- API RESPONSES ----
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
  count?: number
  pagination?: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

// ---- BILLING ----
export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  currency: string
  interval: 'month' | 'year'
  credits: number
  features: string[]
  platformLimit: number | null
  teamMemberLimit: number | null
  stripePriceId?: string
}

export interface Invoice {
  id: string
  amount: number
  currency: string
  status: 'paid' | 'pending' | 'failed'
  date: string
  pdfUrl?: string
}
