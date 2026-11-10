import { CompanySettings, Product, Service, Project, Enquiry, Appointment, Review, AdminUser } from '../types';

const API_BASE = '/api';

export function getAuthToken(): string | null {
  return localStorage.getItem('hydrelex_token');
}

export function setAuthToken(token: string) {
  localStorage.setItem('hydrelex_token', token);
}

export function clearAuthToken() {
  localStorage.removeItem('hydrelex_token');
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({ success: false, message: 'Server communication error' }));

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

export const api = {
  // Settings
  getSettings: () => request<{ success: boolean; settings: CompanySettings }>('/settings'),
  updateSettings: (settings: Partial<CompanySettings>) =>
    request<{ success: boolean; message: string }>('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    }),

  // Products
  getProducts: (includeInactive = false) =>
    request<{ success: boolean; products: Product[] }>(`/products${includeInactive ? '?includeInactive=true' : ''}`),
  getProduct: (slugOrId: string | number) =>
    request<{ success: boolean; product: Product }>(`/products/${slugOrId}`),
  createProduct: (product: Partial<Product>) =>
    request<{ success: boolean; id: number; message: string }>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),
  updateProduct: (id: number, product: Partial<Product>) =>
    request<{ success: boolean; message: string }>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    }),
  deleteProduct: (id: number) =>
    request<{ success: boolean; message: string }>(`/products/${id}`, { method: 'DELETE' }),

  // Services
  getServices: (includeInactive = false) =>
    request<{ success: boolean; services: Service[] }>(`/services${includeInactive ? '?includeInactive=true' : ''}`),
  getService: (slugOrId: string | number) =>
    request<{ success: boolean; service: Service }>(`/services/${slugOrId}`),
  createService: (service: Partial<Service>) =>
    request<{ success: boolean; id: number; message: string }>('/services', {
      method: 'POST',
      body: JSON.stringify(service),
    }),
  updateService: (id: number, service: Partial<Service>) =>
    request<{ success: boolean; message: string }>(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(service),
    }),
  deleteService: (id: number) =>
    request<{ success: boolean; message: string }>(`/services/${id}`, { method: 'DELETE' }),

  // Projects
  getProjects: (category?: string) =>
    request<{ success: boolean; projects: Project[] }>(`/projects${category ? `?category=${encodeURIComponent(category)}` : ''}`),
  createProject: (project: Partial<Project>) =>
    request<{ success: boolean; id: number; message: string }>('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    }),
  updateProject: (id: number, project: Partial<Project>) =>
    request<{ success: boolean; message: string }>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    }),
  deleteProject: (id: number) =>
    request<{ success: boolean; message: string }>(`/projects/${id}`, { method: 'DELETE' }),

  // Enquiries
  submitEnquiry: (formData: Record<string, any>) =>
    request<{ success: boolean; referenceNo: string; message: string }>('/enquiries', {
      method: 'POST',
      body: JSON.stringify(formData),
    }),
  trackEnquiry: (referenceNo: string, phone: string) =>
    request<{ success: boolean; enquiry: any }>('/enquiries/track', {
      method: 'POST',
      body: JSON.stringify({ referenceNo, phone }),
    }),
  getAdminEnquiries: (params: { status?: string; type?: string; search?: string; page?: number; limit?: number }) => {
    const qs = new URLSearchParams();
    if (params.status) qs.append('status', params.status);
    if (params.type) qs.append('type', params.type);
    if (params.search) qs.append('search', params.search);
    if (params.page) qs.append('page', String(params.page));
    if (params.limit) qs.append('limit', String(params.limit));
    return request<{ success: boolean; enquiries: Enquiry[]; pagination: any }>(`/enquiries?${qs.toString()}`);
  },
  getEnquiryDetail: (id: number) =>
    request<{ success: boolean; enquiry: Enquiry }>(`/enquiries/${id}`),
  updateEnquiryStatus: (id: number, status?: string, internal_notes?: string) =>
    request<{ success: boolean; message: string }>(`/enquiries/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, internal_notes }),
    }),

  // Appointments
  getAppointments: (params?: { status?: string; date?: string }) => {
    const qs = new URLSearchParams();
    if (params?.status) qs.append('status', params.status);
    if (params?.date) qs.append('date', params.date);
    return request<{ success: boolean; appointments: Appointment[] }>(`/appointments?${qs.toString()}`);
  },
  confirmAppointment: (id: number, data: { scheduled_date?: string; scheduled_time?: string; notes?: string; status?: string }) =>
    request<{ success: boolean; message: string }>(`/appointments/${id}/confirm`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  updateAppointmentStatus: (id: number, status: string, notes?: string) =>
    request<{ success: boolean; message: string }>(`/appointments/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    }),

  // Reviews
  getApprovedReviews: () =>
    request<{ success: boolean; reviews: Review[]; stats: { averageRating: number; totalReviews: number } }>('/reviews/approved'),
  submitReview: (formData: Record<string, any>) =>
    request<{ success: boolean; message: string }>('/reviews', {
      method: 'POST',
      body: JSON.stringify(formData),
    }),
  getAdminReviews: (status?: string) =>
    request<{ success: boolean; reviews: Review[] }>(`/reviews/admin${status ? `?status=${status}` : ''}`),
  approveReview: (id: number) =>
    request<{ success: boolean; message: string }>(`/reviews/${id}/approve`, { method: 'PATCH' }),
  rejectReview: (id: number) =>
    request<{ success: boolean; message: string }>(`/reviews/${id}/reject`, { method: 'PATCH' }),
  deleteReview: (id: number) =>
    request<{ success: boolean; message: string }>(`/reviews/${id}`, { method: 'DELETE' }),

  // Admin Stats & Logs
  getDashboardStats: () =>
    request<{
      success: boolean;
      stats: {
        totalEnquiries: number;
        pendingEnquiries: number;
        completedEnquiries: number;
        confirmedAppointments: number;
        pendingAppointments: number;
        approvedReviews: number;
        pendingReviews: number;
      };
      recentEnquiries: Enquiry[];
      recentLogs: any[];
    }>('/admin/stats'),

  // Auth
  login: (credentials: { identifier: string; password: string }) =>
    request<{ success: boolean; token: string; admin: AdminUser; message: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  getMe: () => request<{ success: boolean; admin: AdminUser }>('/auth/me'),
  logout: () => request<{ success: boolean; message: string }>('/auth/logout', { method: 'POST' }),

  // Upload
  uploadImage: async (file: File, fieldName: 'product_image' | 'review_image' | 'project_image' = 'product_image') => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('field', fieldName);
    const token = getAuthToken();
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Image upload failed');
    return data as { success: boolean; url: string; filename: string };
  },
};

