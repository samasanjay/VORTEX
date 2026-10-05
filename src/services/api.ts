import type {
  User,
  RegisterPayload,
  LoginPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  VerifyEmailPayload,
  UpdateProfilePayload,
  ChangePasswordPayload,
  DeleteAccountPayload,
  Lead,
  LeadNote,
  LeadActivity,
  Project,
  Service,
  Testimonial,
  FAQ,
  SEOMetadata,
  MediaItem,
  AuditLog,
  DashboardMetrics,
} from '../types/api';

const API_BASE = '/api';

/**
 * Get stored auth token
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('vortex_auth_token');
}

/**
 * Set auth token
 */
export function setAuthToken(token: string | null) {
  if (typeof window === 'undefined') return;
  if (token) {
    localStorage.setItem('vortex_auth_token', token);
  } else {
    localStorage.removeItem('vortex_auth_token');
  }
}

/**
 * Generic API request wrapper
 */
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `API Error ${response.status}: ${response.statusText}`;
    try {
      const errJson = await response.json();
      if (errJson.error) errorMessage = errJson.error;
    } catch {
      // ignore
    }
    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}

export const api = {
  // Authentication
  register: (data: RegisterPayload) =>
    request<{ token: string; user: User; verificationUrl?: string; dev_verification_token?: string; dev_verify_url?: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (credentials: LoginPayload) =>
    request<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getGoogleAuth: () =>
    request<{ configured: boolean; url?: string; authUrl?: string; message?: string }>('/auth/google'),

  devSimulateGoogleAuth: (data?: { name?: string; email?: string }) =>
    request<{ success: boolean; token: string; user: User; message: string }>('/auth/google/dev-simulate', {
      method: 'POST',
      body: JSON.stringify(data || {}),
    }),

  getMe: () => request<{ user: User }>('/auth/me'),

  forgotPassword: (data: ForgotPasswordPayload) =>
    request<{ success: boolean; message: string; resetUrl?: string; dev_reset_url?: string; dev_reset_token?: string }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  resetPassword: (data: ResetPasswordPayload) =>
    request<{ success: boolean; message: string }>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  verifyEmail: (data: VerifyEmailPayload) =>
    request<{ success: boolean; message: string }>('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateProfile: (data: UpdateProfilePayload) =>
    request<{ success: boolean; message: string; user: User }>('/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  changePassword: (data: ChangePasswordPayload) =>
    request<{ success: boolean; message: string }>('/auth/password', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  deleteAccount: (data: DeleteAccountPayload = {}) =>
    request<{ success: boolean; message: string }>('/auth/account', {
      method: 'DELETE',
      body: JSON.stringify(data),
    }),

  logout: () =>
    request<{ success: boolean }>('/auth/logout', {
      method: 'POST',
    }),

  // User Management (Admin / Super Admin)
  getUsers: () => request<{ users: User[] }>('/users'),

  updateUserRole: (id: string, role_id: string) =>
    request<{ success: boolean; message: string }>(`/users/${id}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role_id }),
    }),

  updateUserStatus: (id: string, status: 'ACTIVE' | 'DISABLED') =>
    request<{ success: boolean; message: string }>(`/users/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  revokeUserSessions: (id: string) =>
    request<{ success: boolean; message: string }>(`/users/${id}/revoke-sessions`, {
      method: 'POST',
    }),

  deleteUser: (id: string) =>
    request<{ success: boolean; message: string }>(`/users/${id}`, {
      method: 'DELETE',
    }),

  // Leads
  submitLead: (leadData: any) =>
    request<{
      success: boolean;
      leadId: string;
      message: string;
      qualification: {
        score: number;
        quality: 'HOT' | 'WARM' | 'COLD';
        recommendedService: string;
        estimatedPricing: { inr: string; usd: string };
        timeline: string;
      };
    }>('/leads', {
      method: 'POST',
      body: JSON.stringify(leadData),
    }),

  getLeads: (params: { status?: string; quality?: string; search?: string } = {}) => {
    const query = new URLSearchParams();
    if (params.status) query.set('status', params.status);
    if (params.quality) query.set('quality', params.quality);
    if (params.search) query.set('search', params.search);
    return request<{ leads: Lead[] }>(`/leads?${query.toString()}`);
  },

  getLeadById: (id: string) =>
    request<{ lead: Lead; notes: LeadNote[]; activity: LeadActivity[] }>(`/leads/${id}`),

  updateLead: (id: string, updates: Partial<Lead>) =>
    request<{ success: boolean; message: string }>(`/leads/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),

  addLeadNote: (id: string, content: string) =>
    request<{ success: boolean; noteId: string }>(`/leads/${id}/notes`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    }),

  requalifyLead: (id: string) =>
    request<{ success: boolean; qualification: any }>(`/leads/${id}/qualify`, {
      method: 'POST',
    }),

  deleteLead: (id: string) =>
    request<{ success: boolean; message: string }>(`/leads/${id}`, {
      method: 'DELETE',
    }),

  // Projects
  getProjects: (params: { category?: string; status?: string } = {}) => {
    const query = new URLSearchParams();
    if (params.category) query.set('category', params.category);
    if (params.status) query.set('status', params.status);
    return request<{ projects: Project[] }>(`/projects?${query.toString()}`);
  },

  getProject: (idOrSlug: string) =>
    request<{ project: Project }>(`/projects/${idOrSlug}`),

  createProject: (project: Partial<Project>) =>
    request<{ success: boolean; id: string; slug: string }>('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    }),

  updateProject: (id: string, project: Partial<Project>) =>
    request<{ success: boolean; message: string }>(`/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(project),
    }),

  deleteProject: (id: string) =>
    request<{ success: boolean; message: string }>(`/projects/${id}`, {
      method: 'DELETE',
    }),

  // Services
  getServices: () => request<{ services: Service[] }>('/services'),

  getService: (idOrSlug: string) => request<{ service: Service }>(`/services/${idOrSlug}`),

  createService: (service: Partial<Service>) =>
    request<{ success: boolean; id: string; slug: string }>('/services', {
      method: 'POST',
      body: JSON.stringify(service),
    }),

  updateService: (id: string, service: Partial<Service>) =>
    request<{ success: boolean; message: string }>(`/services/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(service),
    }),

  deleteService: (id: string) =>
    request<{ success: boolean; message: string }>(`/services/${id}`, {
      method: 'DELETE',
    }),

  // Testimonials & FAQs
  getTestimonials: () => request<{ testimonials: Testimonial[] }>('/testimonials'),

  createTestimonial: (data: Partial<Testimonial>) =>
    request<{ success: boolean; id: string }>('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  deleteTestimonial: (id: string) =>
    request<{ success: boolean }>('/testimonials/' + id, { method: 'DELETE' }),

  getFAQs: () => request<{ faqs: FAQ[] }>('/faqs'),

  createFAQ: (data: Partial<FAQ>) =>
    request<{ success: boolean; id: string }>('/faqs', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  deleteFAQ: (id: string) =>
    request<{ success: boolean }>('/faqs/' + id, { method: 'DELETE' }),

  // Website Content CMS
  getContent: () => request<{ content: Record<string, any> }>('/content'),

  updateContent: (updates: Record<string, any>) =>
    request<{ success: boolean; message: string }>('/content', {
      method: 'PATCH',
      body: JSON.stringify({ updates }),
    }),

  // SEO Metadata
  getSEO: () => request<{ seo: SEOMetadata[] }>('/seo'),

  updateSEO: (seoData: Partial<SEOMetadata>) =>
    request<{ success: boolean; message: string }>('/seo', {
      method: 'PATCH',
      body: JSON.stringify(seoData),
    }),

  // Media
  getMedia: () => request<{ media: MediaItem[] }>('/media'),

  deleteMedia: (id: string) =>
    request<{ success: boolean }>('/media/' + id, { method: 'DELETE' }),

  uploadMedia: async (file: File): Promise<{ success: boolean; media: any }> => {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('file', file);

    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/media/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Upload failed: ${res.statusText}`);
    }
    return res.json();
  },

  // Team
  getTeam: () => request<{ users: any[] }>('/team'),

  createTeamMember: (data: any) =>
    request<{ success: boolean; id: string }>('/team', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateTeamMember: (id: string, data: any) =>
    request<{ success: boolean; message: string }>(`/team/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  // Dashboard & Audit
  getDashboardStats: () =>
    request<{
      metrics: DashboardMetrics;
      recentLeads: Lead[];
      recentAudit: AuditLog[];
    }>('/dashboard/stats'),

  getAuditLogs: () => request<{ logs: AuditLog[] }>('/audit-logs'),

  getSettings: () => request<{ settings: any[] }>('/settings'),

  updateSettings: (updates: Record<string, any>) =>
    request<{ success: boolean; message: string }>('/settings', {
      method: 'PATCH',
      body: JSON.stringify({ updates }),
    }),
};
