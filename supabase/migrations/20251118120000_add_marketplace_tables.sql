-- Migration: Add Marketplace Tables
-- Created: 2025-11-18
-- Description: Creates missing tables for marketplace functionality including order items, cart, and bids

-- ============================================================================
-- 1. ORDER ITEMS TABLE
-- ============================================================================
-- Links products to orders with quantity and pricing information
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC NOT NULL CHECK (unit_price >= 0),
  subtotal NUMERIC NOT NULL CHECK (subtotal >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);

-- Add comment for documentation
COMMENT ON TABLE public.order_items IS 'Line items for each order, linking products to orders with quantity and pricing';

-- ============================================================================
-- 2. CART ITEMS TABLE
-- ============================================================================
-- Stores shopping cart items for users before checkout
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Ensure one cart item per product per user
  UNIQUE(user_id, product_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON public.cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product_id ON public.cart_items(product_id);

-- Add comment
COMMENT ON TABLE public.cart_items IS 'Shopping cart items for users before they complete checkout';

-- ============================================================================
-- 3. MARKETPLACE BIDS TABLE
-- ============================================================================
-- Stores bids placed by buyers on products
CREATE TABLE IF NOT EXISTS public.marketplace_bids (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  bidder_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL CHECK (amount > 0),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'accepted', 'rejected', 'expired', 'withdrawn')
  ),
  message TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_marketplace_bids_product_id ON public.marketplace_bids(product_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_bids_bidder_id ON public.marketplace_bids(bidder_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_bids_status ON public.marketplace_bids(status);

-- Add comment
COMMENT ON TABLE public.marketplace_bids IS 'Bids placed by buyers on marketplace products';

-- ============================================================================
-- 4. PRODUCT REVIEWS TABLE (BONUS)
-- ============================================================================
-- Allows buyers to leave reviews on products they purchased
CREATE TABLE IF NOT EXISTS public.product_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  verified_purchase BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- One review per user per product
  UNIQUE(product_id, user_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON public.product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_user_id ON public.product_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_rating ON public.product_reviews(rating);

-- Add comment
COMMENT ON TABLE public.product_reviews IS 'Product reviews left by customers';

-- ============================================================================
-- 5. UPDATE TRIGGERS
-- ============================================================================

-- Trigger to update cart_items.updated_at
CREATE OR REPLACE FUNCTION update_cart_items_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cart_items_updated_at
  BEFORE UPDATE ON public.cart_items
  FOR EACH ROW
  EXECUTE FUNCTION update_cart_items_updated_at();

-- Trigger to update marketplace_bids.updated_at
CREATE OR REPLACE FUNCTION update_marketplace_bids_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER marketplace_bids_updated_at
  BEFORE UPDATE ON public.marketplace_bids
  FOR EACH ROW
  EXECUTE FUNCTION update_marketplace_bids_updated_at();

-- Trigger to update product_reviews.updated_at
CREATE OR REPLACE FUNCTION update_product_reviews_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER product_reviews_updated_at
  BEFORE UPDATE ON public.product_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_product_reviews_updated_at();

-- ============================================================================
-- 6. ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all new tables
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

-- Cart Items Policies
CREATE POLICY "Users can view their own cart items"
  ON public.cart_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cart items"
  ON public.cart_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart items"
  ON public.cart_items FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart items"
  ON public.cart_items FOR DELETE
  USING (auth.uid() = user_id);

-- Order Items Policies (read-only for order owners)
CREATE POLICY "Users can view order items for their orders"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.customer_id = auth.uid()
    )
  );

-- Marketplace Bids Policies
CREATE POLICY "Anyone can view active bids"
  ON public.marketplace_bids FOR SELECT
  USING (status IN ('pending', 'accepted'));

CREATE POLICY "Users can create bids"
  ON public.marketplace_bids FOR INSERT
  WITH CHECK (auth.uid() = bidder_id);

CREATE POLICY "Users can update their own pending bids"
  ON public.marketplace_bids FOR UPDATE
  USING (auth.uid() = bidder_id AND status = 'pending');

CREATE POLICY "Product vendors can update bids on their products"
  ON public.marketplace_bids FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.products
      WHERE products.id = marketplace_bids.product_id
      AND products.vendor_id = auth.uid()
    )
  );

-- Product Reviews Policies
CREATE POLICY "Anyone can view approved reviews"
  ON public.product_reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can create reviews for products they purchased"
  ON public.product_reviews FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND (
      order_id IS NULL
      OR EXISTS (
        SELECT 1 FROM public.orders
        WHERE orders.id = order_id
        AND orders.customer_id = auth.uid()
        AND orders.status = 'completed'
      )
    )
  );

CREATE POLICY "Users can update their own reviews"
  ON public.product_reviews FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews"
  ON public.product_reviews FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- 7. HELPER FUNCTIONS
-- ============================================================================

-- Function to calculate cart total for a user
CREATE OR REPLACE FUNCTION get_cart_total(p_user_id UUID)
RETURNS NUMERIC AS $$
  SELECT COALESCE(SUM(p.price * ci.quantity), 0)
  FROM public.cart_items ci
  JOIN public.products p ON p.id = ci.product_id
  WHERE ci.user_id = p_user_id;
$$ LANGUAGE sql STABLE;

-- Function to get cart item count for a user
CREATE OR REPLACE FUNCTION get_cart_count(p_user_id UUID)
RETURNS INTEGER AS $$
  SELECT COALESCE(SUM(quantity)::INTEGER, 0)
  FROM public.cart_items
  WHERE user_id = p_user_id;
$$ LANGUAGE sql STABLE;

-- Function to check if product is in stock
CREATE OR REPLACE FUNCTION is_product_in_stock(p_product_id UUID, p_quantity INTEGER)
RETURNS BOOLEAN AS $$
  SELECT stock_quantity >= p_quantity
  FROM public.products
  WHERE id = p_product_id;
$$ LANGUAGE sql STABLE;

-- ============================================================================
-- 8. SAMPLE DATA (OPTIONAL - for testing)
-- ============================================================================
-- Uncomment to add sample data for testing

-- INSERT INTO public.cart_items (user_id, product_id, quantity)
-- SELECT
--   (SELECT id FROM auth.users LIMIT 1),
--   id,
--   1
-- FROM public.products
-- LIMIT 2
-- ON CONFLICT (user_id, product_id) DO NOTHING;
