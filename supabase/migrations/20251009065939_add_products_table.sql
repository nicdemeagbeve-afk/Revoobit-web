/*
  # Ajout de la table products pour la gestion des produits

  1. Nouvelle Table
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, nom du produit)
      - `description` (text, description du produit)
      - `price` (numeric, prix du produit)
      - `image_url` (text, URL de l'image du produit)
      - `category` (text, catégorie du produit)
      - `is_active` (boolean, si le produit est actif)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `affiliate_products`
      - `id` (uuid, primary key)
      - `affiliate_id` (uuid, référence affiliates)
      - `product_id` (uuid, référence products)
      - `is_selected` (boolean, si l'affilié a sélectionné ce produit)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Sécurité
    - Enable RLS sur la table products
    - Les admins peuvent tout gérer
    - Les affiliés peuvent voir les produits actifs
    - Les affiliés peuvent sélectionner/désélectionner leurs produits
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  price numeric(10,2) DEFAULT 0,
  image_url text,
  category text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS affiliate_products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id uuid REFERENCES affiliates(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  is_selected boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(affiliate_id, product_id)
);

ALTER TABLE affiliate_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage all products"
  ON products FOR ALL
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

CREATE POLICY "Affiliates can view active products"
  ON products FOR SELECT
  TO authenticated
  USING (
    is_active = true OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Affiliates can view own product selections"
  ON affiliate_products FOR SELECT
  TO authenticated
  USING (
    affiliate_id IN (
      SELECT id FROM affiliates WHERE user_id = auth.uid()
    ) OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Affiliates can manage own product selections"
  ON affiliate_products FOR INSERT
  TO authenticated
  WITH CHECK (
    affiliate_id IN (
      SELECT id FROM affiliates WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Affiliates can update own product selections"
  ON affiliate_products FOR UPDATE
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

CREATE POLICY "Affiliates can delete own product selections"
  ON affiliate_products FOR DELETE
  TO authenticated
  USING (
    affiliate_id IN (
      SELECT id FROM affiliates WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all affiliate products"
  ON affiliate_products FOR ALL
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

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliate_products_updated_at BEFORE UPDATE ON affiliate_products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();