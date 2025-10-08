import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: 'admin' | 'affiliate';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role: 'admin' | 'affiliate';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: 'admin' | 'affiliate';
          created_at?: string;
          updated_at?: string;
        };
      };
      affiliates: {
        Row: {
          id: string;
          user_id: string;
          company_name: string | null;
          phone: string | null;
          address: string | null;
          status: 'active' | 'inactive' | 'suspended';
          created_by: string | null;
          is_first_login: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          company_name?: string | null;
          phone?: string | null;
          address?: string | null;
          status?: 'active' | 'inactive' | 'suspended';
          created_by?: string | null;
          is_first_login?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          company_name?: string | null;
          phone?: string | null;
          address?: string | null;
          status?: 'active' | 'inactive' | 'suspended';
          created_by?: string | null;
          is_first_login?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      templates: {
        Row: {
          id: string;
          name: string;
          category: 'business' | 'portfolio' | 'restaurant' | 'blog' | 'association' | 'ecommerce';
          description: string | null;
          preview_image_url: string | null;
          html_structure: any;
          default_styles: any;
          editable_zones: any;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      sites: {
        Row: {
          id: string;
          affiliate_id: string;
          name: string;
          subdomain: string;
          template_id: string | null;
          status: 'draft' | 'published' | 'unpublished';
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      site_content: {
        Row: {
          id: string;
          site_id: string;
          header_content: any;
          about_content: any;
          services_content: any;
          testimonials_content: any;
          contact_content: any;
          logo_url: string | null;
          images: any;
          colors: any;
          social_links: any;
          contact_info: any;
          analytics_id: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      site_analytics: {
        Row: {
          id: string;
          site_id: string;
          visit_date: string;
          visits_count: number;
          created_at: string;
        };
      };
    };
  };
};
