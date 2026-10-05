export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'SALES' | 'TEAM_MEMBER' | 'PUBLIC_USER' | 'VIEWER';

export interface User {
  id: string;
  email: string;
  name: string;
  role?: UserRole;
  roleId?: UserRole;
  role_id?: UserRole;
  role_name?: string;
  avatarUrl?: string | null;
  avatar_url?: string | null;
  jobTitle?: string;
  job_title?: string;
  phone?: string;
  is_active?: number | boolean;
  status?: 'ACTIVE' | 'DISABLED' | 'SUSPENDED';
  email_verified?: number | boolean;
  emailVerified?: boolean;
  google_id?: string | null;
  googleId?: string | null;
  isGoogleLinked?: boolean;
  last_login_at?: string;
  lastLoginAt?: string;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword?: string;
  new_password?: string;
}

export interface VerifyEmailPayload {
  token: string;
}

export interface UpdateProfilePayload {
  name?: string;
  phone?: string;
  job_title?: string;
  avatar_url?: string;
  avatarUrl?: string;
}

export interface ChangePasswordPayload {
  currentPassword?: string;
  current_password?: string;
  newPassword?: string;
  new_password?: string;
}

export interface DeleteAccountPayload {
  password?: string;
  confirmationPassword?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  project_type: string;
  services_required: string[];
  budget_range: string;
  timeline: string;
  message: string;
  additional_info?: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'WON' | 'LOST';
  score: number;
  quality: 'HOT' | 'WARM' | 'COLD';
  ai_summary?: string;
  ai_pain_points?: string[];
  ai_recommended_service?: string;
  ai_pricing_inr?: string;
  ai_pricing_usd?: string;
  ai_closure_prob?: string;
  ai_outreach_draft?: string;
  assigned_to_user_id?: string;
  assigned_to_name?: string;
  created_at: string;
  updated_at?: string;
}

export interface LeadNote {
  id: string;
  lead_id: string;
  user_id: string;
  author_name: string;
  author_avatar?: string;
  content: string;
  created_at: string;
}

export interface LeadActivity {
  id: string;
  lead_id: string;
  user_id?: string;
  user_name?: string;
  action: string;
  details?: string;
  created_at: string;
}

export interface ProjectScreen {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  metrics?: Array<{ label: string; value: string }>;
  highlights?: string[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectColor {
  name: string;
  hex: string;
}

export interface ProjectTypography {
  role: string;
  family: string;
  weight: string;
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  title: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client?: string;
  industry?: string;
  category: string;
  filter_tags: string[];
  short_description: string;
  full_overview?: string;
  challenge?: string;
  strategy?: string;
  solution?: string;
  results?: string;
  type: string;
  year: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featured: number | boolean;
  featured_number?: string;
  highlight_summary?: string;
  featured_image: string;
  technologies: string[];
  metrics: ProjectMetric[];
  color_palette: ProjectColor[];
  typography: ProjectTypography[];
  screens: ProjectScreen[];
  client_testimonial?: ProjectTestimonial;
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  desc: string;
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  full_description: string;
  icon_name: string;
  hero_image?: string;
  starting_price_inr: string;
  starting_price_usd: string;
  timeline: string;
  features: string[];
  deliverables: string[];
  process_steps: ServiceProcessStep[];
  faqs: ServiceFAQ[];
  cta_heading?: string;
  cta_subtext?: string;
  is_published: number | boolean;
  display_order: number;
  seo_title?: string;
  seo_description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Testimonial {
  id: string;
  author_name: string;
  author_role: string;
  author_company: string;
  author_avatar?: string;
  quote: string;
  rating: number;
  is_featured: number | boolean;
  display_order: number;
  created_at?: string;
}

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  is_published: number | boolean;
  display_order: number;
  created_at?: string;
}

export interface SEOMetadata {
  route_path: string;
  title: string;
  description: string;
  keywords?: string;
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_card?: string;
  robots?: string;
  schema_json?: string;
  updated_at?: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  original_name: string;
  url: string;
  mime_type: string;
  size_bytes: number;
  uploaded_by_user_id?: string;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id?: string;
  user_name?: string;
  action: string;
  resource: string;
  resource_id?: string;
  details?: string;
  ip_address?: string;
  created_at: string;
}

export interface DashboardMetrics {
  totalLeads: number;
  newLeads: number;
  hotLeads: number;
  warmLeads: number;
  coldLeads: number;
  totalProjects: number;
  publishedProjects: number;
  totalServices: number;
}
