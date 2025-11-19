-- =====================================================
-- BUSINESS TOOLS MIGRATION
-- Creates tables for:
-- 1. Inventory Management
-- 2. Customer CRM
-- 3. Invoice Generation
-- =====================================================

-- =====================================================
-- 1. INVENTORY MANAGEMENT TABLES
-- =====================================================

-- Inventory items table (extends products with stock tracking)
CREATE TABLE IF NOT EXISTS public.inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  sku TEXT NOT NULL,
  barcode TEXT,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  reorder_point INTEGER DEFAULT 10,
  reorder_quantity INTEGER DEFAULT 50,
  unit_cost DECIMAL(10, 2) DEFAULT 0.00,
  location TEXT,
  supplier_name TEXT,
  supplier_contact TEXT,
  last_restocked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, sku)
);

-- Inventory adjustments table (tracks all stock movements)
CREATE TABLE IF NOT EXISTS public.inventory_adjustments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inventory_item_id UUID REFERENCES public.inventory_items(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  adjustment_type TEXT NOT NULL CHECK (adjustment_type IN ('restock', 'sale', 'return', 'damage', 'theft', 'adjustment')),
  quantity_change INTEGER NOT NULL, -- Can be positive or negative
  previous_quantity INTEGER NOT NULL,
  new_quantity INTEGER NOT NULL,
  unit_cost DECIMAL(10, 2),
  total_value DECIMAL(10, 2),
  reason TEXT,
  reference_id TEXT, -- Order ID, Return ID, etc.
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stock alerts table
CREATE TABLE IF NOT EXISTS public.stock_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inventory_item_id UUID REFERENCES public.inventory_items(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('low_stock', 'out_of_stock', 'overstock')),
  current_quantity INTEGER NOT NULL,
  threshold_quantity INTEGER NOT NULL,
  is_resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. CUSTOMER CRM TABLES
-- =====================================================

-- Customers table (extends user profiles with CRM data)
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL, -- Business owner
  customer_profile_id UUID REFERENCES public.profiles(id), -- If customer is also a platform user
  customer_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company_name TEXT,
  customer_type TEXT CHECK (customer_type IN ('individual', 'business', 'wholesale', 'retail')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'blocked')),
  billing_address TEXT,
  shipping_address TEXT,
  tax_id TEXT,
  credit_limit DECIMAL(10, 2) DEFAULT 0.00,
  current_balance DECIMAL(10, 2) DEFAULT 0.00,
  lifetime_value DECIMAL(10, 2) DEFAULT 0.00,
  total_orders INTEGER DEFAULT 0,
  last_order_date TIMESTAMP WITH TIME ZONE,
  first_purchase_date TIMESTAMP WITH TIME ZONE,
  preferred_payment_method TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customer interactions table (communication history)
CREATE TABLE IF NOT EXISTS public.customer_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  interaction_type TEXT NOT NULL CHECK (interaction_type IN ('call', 'email', 'meeting', 'chat', 'note', 'order', 'complaint', 'feedback')),
  subject TEXT,
  description TEXT NOT NULL,
  outcome TEXT,
  follow_up_date TIMESTAMP WITH TIME ZONE,
  is_completed BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customer tags table (for segmentation)
CREATE TABLE IF NOT EXISTS public.customer_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE NOT NULL,
  tag_name TEXT NOT NULL,
  tag_color TEXT DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(customer_id, tag_name)
);

-- Customer segments table (predefined segments)
CREATE TABLE IF NOT EXISTS public.customer_segments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  segment_name TEXT NOT NULL,
  description TEXT,
  criteria JSONB, -- Stores segment rules
  customer_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, segment_name)
);

-- =====================================================
-- 3. INVOICE GENERATION TABLES
-- =====================================================

-- Invoices table
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  invoice_number TEXT NOT NULL,
  invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled', 'refunded')),
  currency_code TEXT DEFAULT 'NGN',
  subtotal DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  tax_rate DECIMAL(5, 2) DEFAULT 0.00,
  tax_amount DECIMAL(10, 2) DEFAULT 0.00,
  discount_amount DECIMAL(10, 2) DEFAULT 0.00,
  shipping_cost DECIMAL(10, 2) DEFAULT 0.00,
  total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  amount_paid DECIMAL(10, 2) DEFAULT 0.00,
  balance_due DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  payment_terms TEXT,
  notes TEXT,
  terms_and_conditions TEXT,
  footer_text TEXT,
  sent_at TIMESTAMP WITH TIME ZONE,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, invoice_number)
);

-- Invoice items table
CREATE TABLE IF NOT EXISTS public.invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  tax_rate DECIMAL(5, 2) DEFAULT 0.00,
  discount_percentage DECIMAL(5, 2) DEFAULT 0.00,
  line_total DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Invoice payments table
CREATE TABLE IF NOT EXISTS public.invoice_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('cash', 'bank_transfer', 'card', 'paypal', 'sayswitch', 'other')),
  reference_number TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Inventory indexes
CREATE INDEX IF NOT EXISTS idx_inventory_items_user_id ON public.inventory_items(user_id);
CREATE INDEX IF NOT EXISTS idx_inventory_items_product_id ON public.inventory_items(product_id);
CREATE INDEX IF NOT EXISTS idx_inventory_items_sku ON public.inventory_items(sku);
CREATE INDEX IF NOT EXISTS idx_inventory_adjustments_user_id ON public.inventory_adjustments(user_id);
CREATE INDEX IF NOT EXISTS idx_inventory_adjustments_item_id ON public.inventory_adjustments(inventory_item_id);
CREATE INDEX IF NOT EXISTS idx_stock_alerts_user_id ON public.stock_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_stock_alerts_unresolved ON public.stock_alerts(user_id, is_resolved) WHERE is_resolved = FALSE;

-- Customer indexes
CREATE INDEX IF NOT EXISTS idx_customers_user_id ON public.customers(user_id);
CREATE INDEX IF NOT EXISTS idx_customers_email ON public.customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_status ON public.customers(user_id, status);
CREATE INDEX IF NOT EXISTS idx_customer_interactions_customer_id ON public.customer_interactions(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_interactions_user_id ON public.customer_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_customer_tags_customer_id ON public.customer_tags(customer_id);

-- Invoice indexes
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON public.invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_customer_id ON public.invoices(customer_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON public.invoices(user_id, status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON public.invoices(user_id, due_date);
CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice_id ON public.invoice_items(invoice_id);
CREATE INDEX IF NOT EXISTS idx_invoice_payments_invoice_id ON public.invoice_payments(invoice_id);

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE public.inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_adjustments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_payments ENABLE ROW LEVEL SECURITY;

-- Inventory policies
CREATE POLICY "Users can view their own inventory items" ON public.inventory_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own inventory items" ON public.inventory_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own inventory items" ON public.inventory_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own inventory items" ON public.inventory_items FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own adjustments" ON public.inventory_adjustments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own adjustments" ON public.inventory_adjustments FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own alerts" ON public.stock_alerts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own alerts" ON public.stock_alerts FOR ALL USING (auth.uid() = user_id);

-- Customer policies
CREATE POLICY "Users can view their own customers" ON public.customers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own customers" ON public.customers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own customers" ON public.customers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own customers" ON public.customers FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their customer interactions" ON public.customer_interactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their customer interactions" ON public.customer_interactions FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their customer tags" ON public.customer_tags FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.customers WHERE id = customer_tags.customer_id AND user_id = auth.uid())
);
CREATE POLICY "Users can manage their customer tags" ON public.customer_tags FOR ALL USING (
  EXISTS (SELECT 1 FROM public.customers WHERE id = customer_tags.customer_id AND user_id = auth.uid())
);

CREATE POLICY "Users can view their customer segments" ON public.customer_segments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their customer segments" ON public.customer_segments FOR ALL USING (auth.uid() = user_id);

-- Invoice policies
CREATE POLICY "Users can view their own invoices" ON public.invoices FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own invoices" ON public.invoices FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own invoices" ON public.invoices FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own invoices" ON public.invoices FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view invoice items" ON public.invoice_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.invoices WHERE id = invoice_items.invoice_id AND user_id = auth.uid())
);
CREATE POLICY "Users can manage invoice items" ON public.invoice_items FOR ALL USING (
  EXISTS (SELECT 1 FROM public.invoices WHERE id = invoice_items.invoice_id AND user_id = auth.uid())
);

CREATE POLICY "Users can view their invoice payments" ON public.invoice_payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their invoice payments" ON public.invoice_payments FOR ALL USING (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update inventory_items updated_at timestamp
CREATE OR REPLACE FUNCTION update_inventory_items_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER inventory_items_updated_at
  BEFORE UPDATE ON public.inventory_items
  FOR EACH ROW
  EXECUTE FUNCTION update_inventory_items_updated_at();

-- Function to update customers updated_at timestamp
CREATE OR REPLACE FUNCTION update_customers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER customers_updated_at
  BEFORE UPDATE ON public.customers
  FOR EACH ROW
  EXECUTE FUNCTION update_customers_updated_at();

-- Function to update invoices updated_at timestamp
CREATE OR REPLACE FUNCTION update_invoices_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER invoices_updated_at
  BEFORE UPDATE ON public.invoices
  FOR EACH ROW
  EXECUTE FUNCTION update_invoices_updated_at();

-- Function to create stock alert on low inventory
CREATE OR REPLACE FUNCTION check_stock_levels()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if stock is at or below reorder point
  IF NEW.stock_quantity <= NEW.reorder_point THEN
    INSERT INTO public.stock_alerts (inventory_item_id, user_id, alert_type, current_quantity, threshold_quantity)
    VALUES (
      NEW.id,
      NEW.user_id,
      CASE
        WHEN NEW.stock_quantity = 0 THEN 'out_of_stock'
        ELSE 'low_stock'
      END,
      NEW.stock_quantity,
      NEW.reorder_point
    )
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER inventory_stock_alert
  AFTER INSERT OR UPDATE OF stock_quantity ON public.inventory_items
  FOR EACH ROW
  EXECUTE FUNCTION check_stock_levels();

-- Function to auto-generate invoice number
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TRIGGER AS $$
DECLARE
  next_number INTEGER;
  new_invoice_number TEXT;
BEGIN
  IF NEW.invoice_number IS NULL OR NEW.invoice_number = '' THEN
    -- Get the highest invoice number for this user
    SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM '[0-9]+$') AS INTEGER)), 0) + 1
    INTO next_number
    FROM public.invoices
    WHERE user_id = NEW.user_id
      AND invoice_number ~ '^INV-[0-9]+$';

    -- Generate new invoice number with padding
    new_invoice_number := 'INV-' || LPAD(next_number::TEXT, 6, '0');
    NEW.invoice_number := new_invoice_number;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_generate_invoice_number
  BEFORE INSERT ON public.invoices
  FOR EACH ROW
  EXECUTE FUNCTION generate_invoice_number();

-- Function to update invoice totals when items change
CREATE OR REPLACE FUNCTION update_invoice_totals()
RETURNS TRIGGER AS $$
DECLARE
  invoice_subtotal DECIMAL(10, 2);
  invoice_tax DECIMAL(10, 2);
  invoice_total DECIMAL(10, 2);
BEGIN
  -- Calculate subtotal from all invoice items
  SELECT COALESCE(SUM(line_total), 0)
  INTO invoice_subtotal
  FROM public.invoice_items
  WHERE invoice_id = COALESCE(NEW.invoice_id, OLD.invoice_id);

  -- Update the invoice
  UPDATE public.invoices
  SET
    subtotal = invoice_subtotal,
    tax_amount = invoice_subtotal * (tax_rate / 100),
    total_amount = invoice_subtotal + (invoice_subtotal * tax_rate / 100) + shipping_cost - discount_amount,
    balance_due = (invoice_subtotal + (invoice_subtotal * tax_rate / 100) + shipping_cost - discount_amount) - amount_paid
  WHERE id = COALESCE(NEW.invoice_id, OLD.invoice_id);

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER invoice_items_update_totals
  AFTER INSERT OR UPDATE OR DELETE ON public.invoice_items
  FOR EACH ROW
  EXECUTE FUNCTION update_invoice_totals();

-- Function to update invoice when payment is added
CREATE OR REPLACE FUNCTION update_invoice_on_payment()
RETURNS TRIGGER AS $$
DECLARE
  total_paid DECIMAL(10, 2);
  invoice_total DECIMAL(10, 2);
  invoice_status TEXT;
BEGIN
  -- Calculate total payments for this invoice
  SELECT COALESCE(SUM(amount), 0)
  INTO total_paid
  FROM public.invoice_payments
  WHERE invoice_id = NEW.invoice_id;

  -- Get invoice total
  SELECT total_amount
  INTO invoice_total
  FROM public.invoices
  WHERE id = NEW.invoice_id;

  -- Determine new status
  IF total_paid >= invoice_total THEN
    invoice_status := 'paid';
  ELSIF total_paid > 0 THEN
    invoice_status := 'sent'; -- Partially paid
  END IF;

  -- Update invoice
  UPDATE public.invoices
  SET
    amount_paid = total_paid,
    balance_due = total_amount - total_paid,
    status = COALESCE(invoice_status, status),
    paid_at = CASE WHEN total_paid >= invoice_total THEN NOW() ELSE paid_at END
  WHERE id = NEW.invoice_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER invoice_payment_update_invoice
  AFTER INSERT ON public.invoice_payments
  FOR EACH ROW
  EXECUTE FUNCTION update_invoice_on_payment();

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE public.inventory_items IS 'Tracks inventory stock levels and reorder points';
COMMENT ON TABLE public.inventory_adjustments IS 'Logs all inventory movements and adjustments';
COMMENT ON TABLE public.stock_alerts IS 'Automated alerts for low/out of stock items';
COMMENT ON TABLE public.customers IS 'Customer relationship management data';
COMMENT ON TABLE public.customer_interactions IS 'History of all customer communications';
COMMENT ON TABLE public.customer_tags IS 'Tags for customer segmentation';
COMMENT ON TABLE public.invoices IS 'Invoice headers and totals';
COMMENT ON TABLE public.invoice_items IS 'Line items for each invoice';
COMMENT ON TABLE public.invoice_payments IS 'Payment records for invoices';
