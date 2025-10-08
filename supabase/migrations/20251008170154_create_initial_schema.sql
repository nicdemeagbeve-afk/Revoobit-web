/*
  # Création du schéma initial de la plateforme multi-niveaux

  1. Nouvelles Tables
    - `profiles`
      - `id` (uuid, primary key, référence auth.users)
      - `email` (text, unique)
      - `full_name` (text)
      - `role` (text: 'admin' ou 'affiliate')
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `affiliates`
      - `id` (uuid, primary key)
      - `user_id` (uuid, référence profiles)
      - `company_name` (text)
      - `phone` (text)
      - `address` (text)
      - `status` (text: 'active', 'inactive', 'suspended')
      - `created_by` (uuid, référence profiles - admin qui a créé)
      - `is_first_login` (boolean, pour afficher le popup)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `templates`
      - `id` (uuid, primary key)
      - `name` (text)
      - `category` (text: 'business', 'portfolio', 'restaurant', 'blog', 'association')
      - `description` (text)
      - `preview_image_url` (text)
      - `html_structure` (jsonb)
      - `default_styles` (jsonb)
      - `editable_zones` (jsonb)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `sites`
      - `id` (uuid, primary key)
      - `affiliate_id` (uuid, référence affiliates)
      - `name` (text)
      - `subdomain` (text, unique)
      - `template_id` (uuid, référence templates)
      - `status` (text: 'draft', 'published', 'unpublished')
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `site_content`
      - `id` (uuid, primary key)
      - `site_id` (uuid, référence sites)
      - `section` (text: 'header', 'about', 'services', 'testimonials', 'contact')
      - `content` (jsonb)
      - `logo_url` (text)
      - `images` (jsonb array)
      - `colors` (jsonb: primary, secondary, accent)
      - `social_links` (jsonb)
      - `contact_info` (jsonb)
      - `analytics_id` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `site_analytics`
      - `id` (uuid, primary key)
      - `site_id` (uuid, référence sites)
      - `visit_date` (date)
      - `visits_count` (integer)
      - `created_at` (timestamptz)

  2. Sécurité
    - Enable RLS sur toutes les tables
    - Policies restrictives par rôle
    - Les admins peuvent tout gérer
    - Les affiliés ne voient que leurs propres données
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table profiles
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  role text NOT NULL CHECK (role IN ('admin', 'affiliate')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Table affiliates
CREATE TABLE IF NOT EXISTS affiliates (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  company_name text,
  phone text,
  address text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_by uuid REFERENCES profiles(id),
  is_first_login boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;

-- Table templates
CREATE TABLE IF NOT EXISTS templates (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('business', 'portfolio', 'restaurant', 'blog', 'association', 'ecommerce')),
  description text,
  preview_image_url text,
  html_structure jsonb DEFAULT '{}'::jsonb,
  default_styles jsonb DEFAULT '{}'::jsonb,
  editable_zones jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- Table sites
CREATE TABLE IF NOT EXISTS sites (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id uuid REFERENCES affiliates(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  subdomain text UNIQUE NOT NULL,
  template_id uuid REFERENCES templates(id),
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'unpublished')),
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE sites ENABLE ROW LEVEL SECURITY;

-- Table site_content
CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id uuid REFERENCES sites(id) ON DELETE CASCADE UNIQUE NOT NULL,
  header_content jsonb DEFAULT '{}'::jsonb,
  about_content jsonb DEFAULT '{}'::jsonb,
  services_content jsonb DEFAULT '{}'::jsonb,
  testimonials_content jsonb DEFAULT '{}'::jsonb,
  contact_content jsonb DEFAULT '{}'::jsonb,
  logo_url text,
  images jsonb DEFAULT '[]'::jsonb,
  colors jsonb DEFAULT '{"primary": "#000000", "secondary": "#666666", "accent": "#0066cc"}'::jsonb,
  social_links jsonb DEFAULT '{}'::jsonb,
  contact_info jsonb DEFAULT '{}'::jsonb,
  analytics_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Table site_analytics
CREATE TABLE IF NOT EXISTS site_analytics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id uuid REFERENCES sites(id) ON DELETE CASCADE NOT NULL,
  visit_date date DEFAULT CURRENT_DATE,
  visits_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(site_id, visit_date)
);

ALTER TABLE site_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for affiliates
CREATE POLICY "Affiliates can view own data"
  ON affiliates FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all affiliates"
  ON affiliates FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can insert affiliates"
  ON affiliates FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update affiliates"
  ON affiliates FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Affiliates can update own is_first_login"
  ON affiliates FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for templates
CREATE POLICY "Everyone can view active templates"
  ON templates FOR SELECT
  TO authenticated
  USING (is_active = true OR EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admins can insert templates"
  ON templates FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update templates"
  ON templates FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete templates"
  ON templates FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- RLS Policies for sites
CREATE POLICY "Affiliates can view own sites"
  ON sites FOR SELECT
  TO authenticated
  USING (
    affiliate_id IN (
      SELECT id FROM affiliates WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all sites"
  ON sites FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Affiliates can insert own sites"
  ON sites FOR INSERT
  TO authenticated
  WITH CHECK (
    affiliate_id IN (
      SELECT id FROM affiliates WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Affiliates can update own sites"
  ON sites FOR UPDATE
  TO authenticated
  USING (
    affiliate_id IN (
      SELECT id FROM affiliates WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    affiliate_id IN (
      SELECT id FROM affiliates WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Affiliates can delete own sites"
  ON sites FOR DELETE
  TO authenticated
  USING (
    affiliate_id IN (
      SELECT id FROM affiliates WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all sites"
  ON sites FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- RLS Policies for site_content
CREATE POLICY "Affiliates can view own site content"
  ON site_content FOR SELECT
  TO authenticated
  USING (
    site_id IN (
      SELECT id FROM sites WHERE affiliate_id IN (
        SELECT id FROM affiliates WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Admins can view all site content"
  ON site_content FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Affiliates can insert own site content"
  ON site_content FOR INSERT
  TO authenticated
  WITH CHECK (
    site_id IN (
      SELECT id FROM sites WHERE affiliate_id IN (
        SELECT id FROM affiliates WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Affiliates can update own site content"
  ON site_content FOR UPDATE
  TO authenticated
  USING (
    site_id IN (
      SELECT id FROM sites WHERE affiliate_id IN (
        SELECT id FROM affiliates WHERE user_id = auth.uid()
      )
    )
  )
  WITH CHECK (
    site_id IN (
      SELECT id FROM sites WHERE affiliate_id IN (
        SELECT id FROM affiliates WHERE user_id = auth.uid()
      )
    )
  );

-- RLS Policies for site_analytics
CREATE POLICY "Affiliates can view own site analytics"
  ON site_analytics FOR SELECT
  TO authenticated
  USING (
    site_id IN (
      SELECT id FROM sites WHERE affiliate_id IN (
        SELECT id FROM affiliates WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Admins can view all analytics"
  ON site_analytics FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Anyone can insert analytics"
  ON site_analytics FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliates_updated_at BEFORE UPDATE ON affiliates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sites_updated_at BEFORE UPDATE ON sites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour créer un profil automatiquement lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'role', 'affiliate'));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer le profil automatiquement
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();