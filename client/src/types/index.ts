export interface CompanySettings {
  company_name: string;
  tagline: string;
  hero_headline: string;
  hero_subheading: string;
  intro_headline: string;
  intro_text: string;
  address_line1: string;
  address_line2: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  phone_primary: string;
  phone_secondary: string;
  email: string;
  udyam_registration: string;
  gstin: string;
  business_hours: string;
  contact_cta_headline: string;
  contact_cta_subtext: string;
  social_linkedin?: string;
  social_twitter?: string;
  social_facebook?: string;
  social_instagram?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: number;
  slug: string;
  title: string;
  category: string;
  short_description: string;
  description: string;
  capacity?: string | null;
  speed?: string | null;
  drive_system?: string | null;
  features: string[];
  image_url: string;
  is_active: boolean;
  display_order: number;
  created_at?: string;
}

export interface Service {
  id: number;
  slug: string;
  title: string;
  short_description: string;
  description: string;
  features: string[];
  icon_name: string;
  image_url?: string | null;
  is_active: boolean;
  display_order: number;
  created_at?: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  specifications?: string | null;
  description: string;
  cover_image: string;
  is_sample: boolean;
  display_order: number;
  created_at?: string;
}

export type EnquiryStatus = 'PENDING' | 'CONTACTED' | 'APPOINTMENT_SCHEDULED' | 'COMPLETED' | 'CANCELLED';

export interface Enquiry {
  id: number;
  reference_no: string;
  full_name: string;
  phone: string;
  email: string;
  company_name?: string | null;
  location: string;
  enquiry_type: string;
  product_service_interest: string;
  preferred_date: string;
  preferred_time: string;
  project_description: string;
  additional_message?: string | null;
  status: EnquiryStatus;
  internal_notes?: string | null;
  created_at: string;
  appointment_id?: number | null;
  appointment_status?: string | null;
  scheduled_date?: string | null;
  scheduled_time?: string | null;
  notes?: string | null;
}

export interface Appointment {
  id: number;
  enquiry_id: number;
  scheduled_date: string;
  scheduled_time: string;
  status: 'SCHEDULED' | 'CONFIRMED' | 'RESCHEDULED' | 'COMPLETED' | 'CANCELLED';
  notes?: string | null;
  confirmed_by?: number | null;
  confirmed_at?: string | null;
  confirmed_by_name?: string | null;
  created_at: string;
  // joined enquiry fields
  reference_no?: string;
  full_name?: string;
  phone?: string;
  email?: string;
  company_name?: string;
  location?: string;
  enquiry_type?: string;
  product_service_interest?: string;
}

export interface Review {
  id: number;
  customer_name: string;
  email?: string | null;
  phone?: string | null;
  rating: number;
  title: string;
  description: string;
  image_url?: string | null;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  created_at: string;
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

