-- SEFTEC Phase 2 backend reconciliation
-- Safe delta for SEFTEC-owned business data in a shared multi-schema Supabase database.

BEGIN;

CREATE SCHEMA IF NOT EXISTS app_seftec;

CREATE OR REPLACE FUNCTION app_seftec.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TABLE IF NOT EXISTS app_seftec.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_profile_id UUID REFERENCES shared_services.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company_name TEXT,
  customer_type TEXT CHECK (customer_type IN ('individual', 'business', 'wholesale', 'retail')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'blocked')),
  billing_address TEXT,
  shipping_address TEXT,
  tax_id TEXT,
  credit_limit NUMERIC(12, 2) NOT NULL DEFAULT 0,
  current_balance NUMERIC(12, 2) NOT NULL DEFAULT 0,
  lifetime_value NUMERIC(12, 2) NOT NULL DEFAULT 0,
  total_orders INTEGER NOT NULL DEFAULT 0,
  last_order_date TIMESTAMPTZ,
  first_purchase_date TIMESTAMPTZ,
  preferred_payment_method TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app_seftec.customer_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES app_seftec.customers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL CHECK (interaction_type IN ('call', 'email', 'meeting', 'chat', 'note', 'order', 'complaint', 'feedback')),
  subject TEXT,
  description TEXT NOT NULL,
  outcome TEXT,
  follow_up_date TIMESTAMPTZ,
  is_completed BOOLEAN NOT NULL DEFAULT TRUE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app_seftec.inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES marketplace.products(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sku TEXT NOT NULL,
  barcode TEXT,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  reorder_point INTEGER NOT NULL DEFAULT 10,
  reorder_quantity INTEGER NOT NULL DEFAULT 50,
  unit_cost NUMERIC(12, 2) NOT NULL DEFAULT 0,
  location TEXT,
  supplier_name TEXT,
  supplier_contact TEXT,
  last_restocked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT inventory_items_user_sku_key UNIQUE (user_id, sku)
);

CREATE TABLE IF NOT EXISTS app_seftec.inventory_adjustments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inventory_item_id UUID NOT NULL REFERENCES app_seftec.inventory_items(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  adjustment_type TEXT NOT NULL CHECK (adjustment_type IN ('restock', 'sale', 'return', 'damage', 'theft', 'adjustment')),
  quantity_change INTEGER NOT NULL,
  previous_quantity INTEGER NOT NULL,
  new_quantity INTEGER NOT NULL,
  unit_cost NUMERIC(12, 2),
  total_value NUMERIC(12, 2),
  reason TEXT,
  reference_id TEXT,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app_seftec.stock_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inventory_item_id UUID NOT NULL REFERENCES app_seftec.inventory_items(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('low_stock', 'out_of_stock', 'overstock')),
  current_quantity INTEGER NOT NULL,
  threshold_quantity INTEGER NOT NULL,
  is_resolved BOOLEAN NOT NULL DEFAULT FALSE,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app_seftec.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES app_seftec.customers(id) ON DELETE SET NULL,
  invoice_number TEXT NOT NULL,
  invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled', 'refunded')),
  currency_code TEXT NOT NULL DEFAULT 'USD',
  subtotal NUMERIC(12, 2) NOT NULL DEFAULT 0,
  tax_rate NUMERIC(5, 2) NOT NULL DEFAULT 0,
  tax_amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
  discount_amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
  shipping_cost NUMERIC(12, 2) NOT NULL DEFAULT 0,
  total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
  amount_paid NUMERIC(12, 2) NOT NULL DEFAULT 0,
  balance_due NUMERIC(12, 2) NOT NULL DEFAULT 0,
  payment_terms TEXT,
  notes TEXT,
  terms_and_conditions TEXT,
  footer_text TEXT,
  sent_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT invoices_user_invoice_number_key UNIQUE (user_id, invoice_number)
);

CREATE TABLE IF NOT EXISTS app_seftec.invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES app_seftec.invoices(id) ON DELETE CASCADE,
  product_id UUID REFERENCES marketplace.products(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  quantity NUMERIC(12, 2) NOT NULL DEFAULT 1,
  unit_price NUMERIC(12, 2) NOT NULL DEFAULT 0,
  tax_rate NUMERIC(5, 2) NOT NULL DEFAULT 0,
  discount_percentage NUMERIC(5, 2) NOT NULL DEFAULT 0,
  line_total NUMERIC(12, 2) NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app_seftec.invoice_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES app_seftec.invoices(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  amount NUMERIC(12, 2) NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('cash', 'bank_transfer', 'card', 'paypal', 'sayswitch', 'other')),
  reference_number TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_app_seftec_customers_user_id ON app_seftec.customers(user_id);
CREATE INDEX IF NOT EXISTS idx_app_seftec_customers_email ON app_seftec.customers(email);
CREATE INDEX IF NOT EXISTS idx_app_seftec_customers_status ON app_seftec.customers(user_id, status);
CREATE INDEX IF NOT EXISTS idx_app_seftec_customer_interactions_customer_id ON app_seftec.customer_interactions(customer_id);
CREATE INDEX IF NOT EXISTS idx_app_seftec_customer_interactions_user_id ON app_seftec.customer_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_app_seftec_inventory_items_user_id ON app_seftec.inventory_items(user_id);
CREATE INDEX IF NOT EXISTS idx_app_seftec_inventory_items_product_id ON app_seftec.inventory_items(product_id);
CREATE INDEX IF NOT EXISTS idx_app_seftec_inventory_adjustments_item_id ON app_seftec.inventory_adjustments(inventory_item_id);
CREATE INDEX IF NOT EXISTS idx_app_seftec_inventory_adjustments_user_id ON app_seftec.inventory_adjustments(user_id);
CREATE INDEX IF NOT EXISTS idx_app_seftec_stock_alerts_user_id ON app_seftec.stock_alerts(user_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_app_seftec_stock_alerts_active_unique
  ON app_seftec.stock_alerts(inventory_item_id, alert_type)
  WHERE is_resolved = FALSE;
CREATE INDEX IF NOT EXISTS idx_app_seftec_invoices_user_id ON app_seftec.invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_app_seftec_invoices_customer_id ON app_seftec.invoices(customer_id);
CREATE INDEX IF NOT EXISTS idx_app_seftec_invoices_due_date ON app_seftec.invoices(user_id, due_date);
CREATE INDEX IF NOT EXISTS idx_app_seftec_invoice_items_invoice_id ON app_seftec.invoice_items(invoice_id);
CREATE INDEX IF NOT EXISTS idx_app_seftec_invoice_payments_invoice_id ON app_seftec.invoice_payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_app_seftec_invoice_payments_user_id ON app_seftec.invoice_payments(user_id);

ALTER TABLE app_seftec.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_seftec.customer_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_seftec.inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_seftec.inventory_adjustments ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_seftec.stock_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_seftec.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_seftec.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_seftec.invoice_payments ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'customers' AND policyname = 'customers_owner_select'
  ) THEN
    CREATE POLICY customers_owner_select ON app_seftec.customers FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'customers' AND policyname = 'customers_owner_insert'
  ) THEN
    CREATE POLICY customers_owner_insert ON app_seftec.customers FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'customers' AND policyname = 'customers_owner_update'
  ) THEN
    CREATE POLICY customers_owner_update ON app_seftec.customers FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'customers' AND policyname = 'customers_owner_delete'
  ) THEN
    CREATE POLICY customers_owner_delete ON app_seftec.customers FOR DELETE USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'customer_interactions' AND policyname = 'customer_interactions_owner_select'
  ) THEN
    CREATE POLICY customer_interactions_owner_select ON app_seftec.customer_interactions FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'customer_interactions' AND policyname = 'customer_interactions_owner_insert'
  ) THEN
    CREATE POLICY customer_interactions_owner_insert ON app_seftec.customer_interactions FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'customer_interactions' AND policyname = 'customer_interactions_owner_update'
  ) THEN
    CREATE POLICY customer_interactions_owner_update ON app_seftec.customer_interactions FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'customer_interactions' AND policyname = 'customer_interactions_owner_delete'
  ) THEN
    CREATE POLICY customer_interactions_owner_delete ON app_seftec.customer_interactions FOR DELETE USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'inventory_items' AND policyname = 'inventory_items_owner_select'
  ) THEN
    CREATE POLICY inventory_items_owner_select ON app_seftec.inventory_items FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'inventory_items' AND policyname = 'inventory_items_owner_insert'
  ) THEN
    CREATE POLICY inventory_items_owner_insert ON app_seftec.inventory_items FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'inventory_items' AND policyname = 'inventory_items_owner_update'
  ) THEN
    CREATE POLICY inventory_items_owner_update ON app_seftec.inventory_items FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'inventory_items' AND policyname = 'inventory_items_owner_delete'
  ) THEN
    CREATE POLICY inventory_items_owner_delete ON app_seftec.inventory_items FOR DELETE USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'inventory_adjustments' AND policyname = 'inventory_adjustments_owner_select'
  ) THEN
    CREATE POLICY inventory_adjustments_owner_select ON app_seftec.inventory_adjustments FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'inventory_adjustments' AND policyname = 'inventory_adjustments_owner_insert'
  ) THEN
    CREATE POLICY inventory_adjustments_owner_insert ON app_seftec.inventory_adjustments FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'stock_alerts' AND policyname = 'stock_alerts_owner_select'
  ) THEN
    CREATE POLICY stock_alerts_owner_select ON app_seftec.stock_alerts FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'stock_alerts' AND policyname = 'stock_alerts_owner_insert'
  ) THEN
    CREATE POLICY stock_alerts_owner_insert ON app_seftec.stock_alerts FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'stock_alerts' AND policyname = 'stock_alerts_owner_update'
  ) THEN
    CREATE POLICY stock_alerts_owner_update ON app_seftec.stock_alerts FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'stock_alerts' AND policyname = 'stock_alerts_owner_delete'
  ) THEN
    CREATE POLICY stock_alerts_owner_delete ON app_seftec.stock_alerts FOR DELETE USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'invoices' AND policyname = 'invoices_owner_select'
  ) THEN
    CREATE POLICY invoices_owner_select ON app_seftec.invoices FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'invoices' AND policyname = 'invoices_owner_insert'
  ) THEN
    CREATE POLICY invoices_owner_insert ON app_seftec.invoices FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'invoices' AND policyname = 'invoices_owner_update'
  ) THEN
    CREATE POLICY invoices_owner_update ON app_seftec.invoices FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'invoices' AND policyname = 'invoices_owner_delete'
  ) THEN
    CREATE POLICY invoices_owner_delete ON app_seftec.invoices FOR DELETE USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'invoice_items' AND policyname = 'invoice_items_owner_select'
  ) THEN
    CREATE POLICY invoice_items_owner_select ON app_seftec.invoice_items
      FOR SELECT
      USING (
        EXISTS (
         SELECT 1
         FROM app_seftec.invoices i
          WHERE i.id = invoice_id
            AND i.user_id = auth.uid()
        )
      );
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'invoice_items' AND policyname = 'invoice_items_owner_insert'
  ) THEN
    CREATE POLICY invoice_items_owner_insert ON app_seftec.invoice_items
      FOR INSERT
      WITH CHECK (
        EXISTS (
         SELECT 1
         FROM app_seftec.invoices i
          WHERE i.id = invoice_id
            AND i.user_id = auth.uid()
        )
      );
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'invoice_items' AND policyname = 'invoice_items_owner_update'
  ) THEN
    CREATE POLICY invoice_items_owner_update ON app_seftec.invoice_items
      FOR UPDATE
      USING (
        EXISTS (
         SELECT 1
         FROM app_seftec.invoices i
          WHERE i.id = invoice_id
            AND i.user_id = auth.uid()
        )
      )
      WITH CHECK (
        EXISTS (
         SELECT 1
         FROM app_seftec.invoices i
          WHERE i.id = invoice_id
            AND i.user_id = auth.uid()
        )
      );
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'invoice_items' AND policyname = 'invoice_items_owner_delete'
  ) THEN
    CREATE POLICY invoice_items_owner_delete ON app_seftec.invoice_items
      FOR DELETE
      USING (
        EXISTS (
         SELECT 1
         FROM app_seftec.invoices i
          WHERE i.id = invoice_id
            AND i.user_id = auth.uid()
        )
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'invoice_payments' AND policyname = 'invoice_payments_owner_select'
  ) THEN
    CREATE POLICY invoice_payments_owner_select ON app_seftec.invoice_payments FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'invoice_payments' AND policyname = 'invoice_payments_owner_insert'
  ) THEN
    CREATE POLICY invoice_payments_owner_insert ON app_seftec.invoice_payments FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'invoice_payments' AND policyname = 'invoice_payments_owner_update'
  ) THEN
    CREATE POLICY invoice_payments_owner_update ON app_seftec.invoice_payments FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'app_seftec' AND tablename = 'invoice_payments' AND policyname = 'invoice_payments_owner_delete'
  ) THEN
    CREATE POLICY invoice_payments_owner_delete ON app_seftec.invoice_payments FOR DELETE USING (auth.uid() = user_id);
  END IF;
END;
$$;

GRANT USAGE ON SCHEMA app_seftec TO authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON app_seftec.customers TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON app_seftec.customer_interactions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON app_seftec.inventory_items TO authenticated;
GRANT SELECT, INSERT ON app_seftec.inventory_adjustments TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON app_seftec.stock_alerts TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON app_seftec.invoices TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON app_seftec.invoice_items TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON app_seftec.invoice_payments TO authenticated;
GRANT ALL ON app_seftec.customers TO service_role;
GRANT ALL ON app_seftec.customer_interactions TO service_role;
GRANT ALL ON app_seftec.inventory_items TO service_role;
GRANT ALL ON app_seftec.inventory_adjustments TO service_role;
GRANT ALL ON app_seftec.stock_alerts TO service_role;
GRANT ALL ON app_seftec.invoices TO service_role;
GRANT ALL ON app_seftec.invoice_items TO service_role;
GRANT ALL ON app_seftec.invoice_payments TO service_role;

CREATE OR REPLACE FUNCTION app_seftec.generate_invoice_number()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_next_number INTEGER;
BEGIN
  IF NEW.invoice_number IS NULL OR BTRIM(NEW.invoice_number) = '' THEN
    SELECT COALESCE(
      MAX(
        CASE
          WHEN invoice_number ~ '^INV-[0-9]{8}-[0-9]{4}$'
          THEN SUBSTRING(invoice_number FROM '[0-9]{4}$')::INTEGER
          ELSE NULL
        END
      ),
      0
    ) + 1
    INTO v_next_number
    FROM app_seftec.invoices
    WHERE user_id = NEW.user_id
      AND invoice_number LIKE 'INV-' || TO_CHAR(COALESCE(NEW.invoice_date, CURRENT_DATE), 'YYYYMMDD') || '-%';

    NEW.invoice_number :=
      'INV-' || TO_CHAR(COALESCE(NEW.invoice_date, CURRENT_DATE), 'YYYYMMDD') || '-' || LPAD(v_next_number::TEXT, 4, '0');
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION app_seftec.sync_invoice_item_line_total()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_base NUMERIC(12, 2);
BEGIN
  v_base := COALESCE(NEW.quantity, 0) * COALESCE(NEW.unit_price, 0);
  NEW.line_total := ROUND(v_base - (v_base * COALESCE(NEW.discount_percentage, 0) / 100), 2);
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION app_seftec.refresh_invoice_totals()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_invoice_id UUID := COALESCE(NEW.invoice_id, OLD.invoice_id);
  v_subtotal NUMERIC(12, 2) := 0;
  v_tax_rate NUMERIC(5, 2) := 0;
  v_discount NUMERIC(12, 2) := 0;
  v_shipping NUMERIC(12, 2) := 0;
  v_amount_paid NUMERIC(12, 2) := 0;
  v_total NUMERIC(12, 2) := 0;
BEGIN
  SELECT
    COALESCE(SUM(line_total), 0)
  INTO v_subtotal
  FROM app_seftec.invoice_items
  WHERE invoice_id = v_invoice_id;

  SELECT
    COALESCE(tax_rate, 0),
    COALESCE(discount_amount, 0),
    COALESCE(shipping_cost, 0),
    COALESCE(amount_paid, 0)
  INTO
    v_tax_rate,
    v_discount,
    v_shipping,
    v_amount_paid
  FROM app_seftec.invoices
  WHERE id = v_invoice_id;

  v_total := ROUND(v_subtotal + (v_subtotal * v_tax_rate / 100) + v_shipping - v_discount, 2);

  UPDATE app_seftec.invoices
  SET
    subtotal = v_subtotal,
    tax_amount = ROUND(v_subtotal * v_tax_rate / 100, 2),
    total_amount = v_total,
    balance_due = ROUND(v_total - v_amount_paid, 2),
    updated_at = NOW()
  WHERE id = v_invoice_id;

  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE OR REPLACE FUNCTION app_seftec.refresh_invoice_payment_state()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_invoice_id UUID := COALESCE(NEW.invoice_id, OLD.invoice_id);
  v_total_paid NUMERIC(12, 2) := 0;
  v_total_amount NUMERIC(12, 2) := 0;
  v_status TEXT;
BEGIN
  SELECT COALESCE(SUM(amount), 0)
  INTO v_total_paid
  FROM app_seftec.invoice_payments
  WHERE invoice_id = v_invoice_id;

  SELECT total_amount, status
  INTO v_total_amount, v_status
  FROM app_seftec.invoices
  WHERE id = v_invoice_id;

  UPDATE app_seftec.invoices
  SET
    amount_paid = v_total_paid,
    balance_due = ROUND(v_total_amount - v_total_paid, 2),
    status = CASE
      WHEN v_total_paid >= v_total_amount AND v_total_amount > 0 THEN 'paid'
      WHEN v_total_paid > 0 AND status = 'draft' THEN 'sent'
      ELSE status
    END,
    paid_at = CASE
      WHEN v_total_paid >= v_total_amount AND v_total_amount > 0 THEN NOW()
      ELSE paid_at
    END,
    updated_at = NOW()
  WHERE id = v_invoice_id;

  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE OR REPLACE FUNCTION app_seftec.sync_stock_alerts()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.stock_quantity <= 0 THEN
    UPDATE app_seftec.stock_alerts
    SET is_resolved = TRUE, resolved_at = NOW()
    WHERE inventory_item_id = NEW.id
      AND alert_type = 'low_stock'
      AND is_resolved = FALSE;

    INSERT INTO app_seftec.stock_alerts (
      inventory_item_id,
      user_id,
      alert_type,
      current_quantity,
      threshold_quantity,
      is_resolved,
      resolved_at
    )
    VALUES (
      NEW.id,
      NEW.user_id,
      'out_of_stock',
      NEW.stock_quantity,
      0,
      FALSE,
      NULL
    )
    ON CONFLICT (inventory_item_id, alert_type) WHERE is_resolved = FALSE
    DO UPDATE SET
      current_quantity = EXCLUDED.current_quantity,
      threshold_quantity = EXCLUDED.threshold_quantity,
      resolved_at = NULL;
  ELSIF NEW.stock_quantity <= NEW.reorder_point THEN
    UPDATE app_seftec.stock_alerts
    SET is_resolved = TRUE, resolved_at = NOW()
    WHERE inventory_item_id = NEW.id
      AND alert_type = 'out_of_stock'
      AND is_resolved = FALSE;

    INSERT INTO app_seftec.stock_alerts (
      inventory_item_id,
      user_id,
      alert_type,
      current_quantity,
      threshold_quantity,
      is_resolved,
      resolved_at
    )
    VALUES (
      NEW.id,
      NEW.user_id,
      'low_stock',
      NEW.stock_quantity,
      NEW.reorder_point,
      FALSE,
      NULL
    )
    ON CONFLICT (inventory_item_id, alert_type) WHERE is_resolved = FALSE
    DO UPDATE SET
      current_quantity = EXCLUDED.current_quantity,
      threshold_quantity = EXCLUDED.threshold_quantity,
      resolved_at = NULL;
  ELSE
    UPDATE app_seftec.stock_alerts
    SET is_resolved = TRUE, resolved_at = NOW()
    WHERE inventory_item_id = NEW.id
      AND alert_type IN ('low_stock', 'out_of_stock')
      AND is_resolved = FALSE;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS customers_set_updated_at ON app_seftec.customers;
CREATE TRIGGER customers_set_updated_at
  BEFORE UPDATE ON app_seftec.customers
  FOR EACH ROW
  EXECUTE FUNCTION app_seftec.set_updated_at();

DROP TRIGGER IF EXISTS customer_interactions_set_updated_at ON app_seftec.customer_interactions;
CREATE TRIGGER customer_interactions_set_updated_at
  BEFORE UPDATE ON app_seftec.customer_interactions
  FOR EACH ROW
  EXECUTE FUNCTION app_seftec.set_updated_at();

DROP TRIGGER IF EXISTS inventory_items_set_updated_at ON app_seftec.inventory_items;
CREATE TRIGGER inventory_items_set_updated_at
  BEFORE UPDATE ON app_seftec.inventory_items
  FOR EACH ROW
  EXECUTE FUNCTION app_seftec.set_updated_at();

DROP TRIGGER IF EXISTS invoices_set_updated_at ON app_seftec.invoices;
CREATE TRIGGER invoices_set_updated_at
  BEFORE UPDATE ON app_seftec.invoices
  FOR EACH ROW
  EXECUTE FUNCTION app_seftec.set_updated_at();

DROP TRIGGER IF EXISTS invoices_generate_number ON app_seftec.invoices;
CREATE TRIGGER invoices_generate_number
  BEFORE INSERT ON app_seftec.invoices
  FOR EACH ROW
  EXECUTE FUNCTION app_seftec.generate_invoice_number();

DROP TRIGGER IF EXISTS invoice_items_set_line_total ON app_seftec.invoice_items;
CREATE TRIGGER invoice_items_set_line_total
  BEFORE INSERT OR UPDATE OF quantity, unit_price, discount_percentage ON app_seftec.invoice_items
  FOR EACH ROW
  EXECUTE FUNCTION app_seftec.sync_invoice_item_line_total();

DROP TRIGGER IF EXISTS invoice_items_refresh_invoice ON app_seftec.invoice_items;
CREATE TRIGGER invoice_items_refresh_invoice
  AFTER INSERT OR UPDATE OR DELETE ON app_seftec.invoice_items
  FOR EACH ROW
  EXECUTE FUNCTION app_seftec.refresh_invoice_totals();

DROP TRIGGER IF EXISTS invoice_payments_refresh_invoice ON app_seftec.invoice_payments;
CREATE TRIGGER invoice_payments_refresh_invoice
  AFTER INSERT OR UPDATE OR DELETE ON app_seftec.invoice_payments
  FOR EACH ROW
  EXECUTE FUNCTION app_seftec.refresh_invoice_payment_state();

DROP TRIGGER IF EXISTS inventory_items_sync_stock_alerts ON app_seftec.inventory_items;
CREATE TRIGGER inventory_items_sync_stock_alerts
  AFTER INSERT OR UPDATE OF stock_quantity, reorder_point ON app_seftec.inventory_items
  FOR EACH ROW
  EXECUTE FUNCTION app_seftec.sync_stock_alerts();

CREATE OR REPLACE FUNCTION public.adjust_inventory_stock(
  p_inventory_item_id UUID,
  p_user_id UUID,
  p_adjustment_type TEXT,
  p_quantity_change INTEGER,
  p_reason TEXT DEFAULT NULL,
  p_notes TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, app_seftec, marketplace
AS $$
DECLARE
  v_item app_seftec.inventory_items%ROWTYPE;
  v_new_quantity INTEGER;
  v_adjustment_id UUID;
BEGIN
  SELECT *
  INTO v_item
  FROM app_seftec.inventory_items
  WHERE id = p_inventory_item_id
  FOR UPDATE;

  IF v_item.id IS NULL THEN
    RAISE EXCEPTION 'Inventory item not found';
  END IF;

  IF v_item.user_id <> p_user_id THEN
    RAISE EXCEPTION 'Unauthorized access to inventory item';
  END IF;

  v_new_quantity := v_item.stock_quantity + p_quantity_change;

  IF v_new_quantity < 0 THEN
    RAISE EXCEPTION 'Stock cannot be negative. Current: %, Change: %', v_item.stock_quantity, p_quantity_change;
  END IF;

  INSERT INTO app_seftec.inventory_adjustments (
    inventory_item_id,
    user_id,
    created_by,
    adjustment_type,
    quantity_change,
    previous_quantity,
    new_quantity,
    unit_cost,
    total_value,
    reason,
    notes
  )
  VALUES (
    p_inventory_item_id,
    p_user_id,
    p_user_id,
    p_adjustment_type,
    p_quantity_change,
    v_item.stock_quantity,
    v_new_quantity,
    v_item.unit_cost,
    ROUND(ABS(p_quantity_change) * COALESCE(v_item.unit_cost, 0), 2),
    p_reason,
    p_notes
  )
  RETURNING id INTO v_adjustment_id;

  UPDATE app_seftec.inventory_items
  SET
    stock_quantity = v_new_quantity,
    last_restocked_at = CASE
      WHEN p_adjustment_type = 'restock' THEN NOW()
      ELSE last_restocked_at
    END,
    updated_at = NOW()
  WHERE id = p_inventory_item_id;

  RETURN jsonb_build_object(
    'success', TRUE,
    'adjustment_id', v_adjustment_id,
    'previous_quantity', v_item.stock_quantity,
    'new_quantity', v_new_quantity
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.create_invoice_with_items(
  p_user_id UUID,
  p_customer_id UUID DEFAULT NULL,
  p_invoice_date DATE DEFAULT CURRENT_DATE,
  p_due_date DATE DEFAULT NULL,
  p_currency_code TEXT DEFAULT 'USD',
  p_tax_rate NUMERIC DEFAULT 0,
  p_discount_amount NUMERIC DEFAULT 0,
  p_shipping_cost NUMERIC DEFAULT 0,
  p_payment_terms TEXT DEFAULT NULL,
  p_notes TEXT DEFAULT NULL,
  p_terms_and_conditions TEXT DEFAULT NULL,
  p_footer_text TEXT DEFAULT NULL,
  p_items JSONB DEFAULT '[]'::JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, app_seftec, marketplace
AS $$
DECLARE
  v_invoice_id UUID;
  v_invoice_number TEXT;
  v_subtotal NUMERIC(12, 2) := 0;
  v_tax_amount NUMERIC(12, 2) := 0;
  v_total_amount NUMERIC(12, 2) := 0;
  v_item JSONB;
  v_item_total NUMERIC(12, 2);
  v_item_discount NUMERIC(12, 2);
  v_sort_order INTEGER := 0;
BEGIN
  IF p_due_date IS NULL THEN
    RAISE EXCEPTION 'Due date is required';
  END IF;

  IF jsonb_array_length(COALESCE(p_items, '[]'::JSONB)) = 0 THEN
    RAISE EXCEPTION 'At least one line item is required';
  END IF;

  IF p_customer_id IS NOT NULL AND NOT EXISTS (
    SELECT 1
    FROM app_seftec.customers
    WHERE id = p_customer_id
      AND user_id = p_user_id
  ) THEN
    RAISE EXCEPTION 'Customer not found';
  END IF;

  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    v_item_total := ROUND(((v_item->>'quantity')::NUMERIC * (v_item->>'unit_price')::NUMERIC), 2);
    v_item_discount := ROUND(v_item_total * COALESCE((v_item->>'discount_percentage')::NUMERIC, 0) / 100, 2);
    v_subtotal := ROUND(v_subtotal + (v_item_total - v_item_discount), 2);
  END LOOP;

  v_tax_amount := ROUND(v_subtotal * COALESCE(p_tax_rate, 0) / 100, 2);
  v_total_amount := ROUND(v_subtotal + v_tax_amount + COALESCE(p_shipping_cost, 0) - COALESCE(p_discount_amount, 0), 2);

  INSERT INTO app_seftec.invoices (
    user_id,
    customer_id,
    invoice_number,
    invoice_date,
    due_date,
    status,
    currency_code,
    subtotal,
    tax_rate,
    tax_amount,
    discount_amount,
    shipping_cost,
    total_amount,
    amount_paid,
    balance_due,
    payment_terms,
    notes,
    terms_and_conditions,
    footer_text
  )
  VALUES (
    p_user_id,
    p_customer_id,
    '',
    COALESCE(p_invoice_date, CURRENT_DATE),
    p_due_date,
    'draft',
    COALESCE(p_currency_code, 'USD'),
    v_subtotal,
    COALESCE(p_tax_rate, 0),
    v_tax_amount,
    COALESCE(p_discount_amount, 0),
    COALESCE(p_shipping_cost, 0),
    v_total_amount,
    0,
    v_total_amount,
    p_payment_terms,
    p_notes,
    p_terms_and_conditions,
    p_footer_text
  )
  RETURNING id, invoice_number INTO v_invoice_id, v_invoice_number;

  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    INSERT INTO app_seftec.invoice_items (
      invoice_id,
      product_id,
      description,
      quantity,
      unit_price,
      tax_rate,
      discount_percentage,
      line_total,
      sort_order
    )
    VALUES (
      v_invoice_id,
      NULLIF(v_item->>'product_id', '')::UUID,
      v_item->>'description',
      COALESCE((v_item->>'quantity')::NUMERIC, 1),
      COALESCE((v_item->>'unit_price')::NUMERIC, 0),
      COALESCE((v_item->>'tax_rate')::NUMERIC, 0),
      COALESCE((v_item->>'discount_percentage')::NUMERIC, 0),
      0,
      v_sort_order
    );

    v_sort_order := v_sort_order + 1;
  END LOOP;

  RETURN jsonb_build_object(
    'success', TRUE,
    'invoice_id', v_invoice_id,
    'invoice_number', v_invoice_number,
    'total_amount', v_total_amount
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.record_invoice_payment(
  p_invoice_id UUID,
  p_user_id UUID,
  p_amount NUMERIC DEFAULT NULL,
  p_payment_method TEXT DEFAULT 'other',
  p_payment_date DATE DEFAULT CURRENT_DATE,
  p_reference_number TEXT DEFAULT NULL,
  p_notes TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, app_seftec
AS $$
DECLARE
  v_invoice app_seftec.invoices%ROWTYPE;
  v_payment_amount NUMERIC(12, 2);
  v_payment_id UUID;
BEGIN
  SELECT *
  INTO v_invoice
  FROM app_seftec.invoices
  WHERE id = p_invoice_id
  FOR UPDATE;

  IF v_invoice.id IS NULL THEN
    RAISE EXCEPTION 'Invoice not found';
  END IF;

  IF v_invoice.user_id <> p_user_id THEN
    RAISE EXCEPTION 'Unauthorized access to invoice';
  END IF;

  IF v_invoice.status IN ('paid', 'cancelled', 'refunded') THEN
    RAISE EXCEPTION 'Cannot record payment for invoice with status: %', v_invoice.status;
  END IF;

  v_payment_amount := COALESCE(p_amount, v_invoice.balance_due);

  IF v_payment_amount <= 0 THEN
    RAISE EXCEPTION 'Payment amount must be positive';
  END IF;

  IF v_payment_amount > v_invoice.balance_due THEN
    RAISE EXCEPTION 'Payment amount (%) exceeds balance due (%)', v_payment_amount, v_invoice.balance_due;
  END IF;

  INSERT INTO app_seftec.invoice_payments (
    invoice_id,
    user_id,
    payment_date,
    amount,
    payment_method,
    reference_number,
    notes
  )
  VALUES (
    p_invoice_id,
    p_user_id,
    COALESCE(p_payment_date, CURRENT_DATE),
    v_payment_amount,
    COALESCE(p_payment_method, 'other'),
    p_reference_number,
    p_notes
  )
  RETURNING id INTO v_payment_id;

  RETURN jsonb_build_object(
    'success', TRUE,
    'payment_id', v_payment_id,
    'amount_paid', v_payment_amount,
    'new_balance_due', GREATEST(v_invoice.balance_due - v_payment_amount, 0),
    'invoice_status', CASE
      WHEN v_invoice.balance_due - v_payment_amount <= 0 THEN 'paid'
      ELSE v_invoice.status
    END
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.adjust_inventory_stock(UUID, UUID, TEXT, INTEGER, TEXT, TEXT) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.create_invoice_with_items(UUID, UUID, DATE, DATE, TEXT, NUMERIC, NUMERIC, NUMERIC, TEXT, TEXT, TEXT, TEXT, JSONB) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.record_invoice_payment(UUID, UUID, NUMERIC, TEXT, DATE, TEXT, TEXT) TO authenticated, service_role;

CREATE OR REPLACE VIEW public.customers
WITH (security_invoker = true)
AS
SELECT
  id,
  user_id,
  customer_profile_id,
  customer_name,
  email,
  phone,
  company_name,
  customer_type,
  status,
  billing_address,
  shipping_address,
  tax_id,
  credit_limit,
  current_balance,
  lifetime_value,
  total_orders,
  last_order_date,
  first_purchase_date,
  preferred_payment_method,
  notes,
  created_at,
  updated_at
FROM app_seftec.customers;

CREATE OR REPLACE VIEW public.customer_interactions
WITH (security_invoker = true)
AS
SELECT
  id,
  customer_id,
  user_id,
  interaction_type,
  subject,
  description,
  outcome,
  follow_up_date,
  is_completed,
  created_by,
  created_at,
  updated_at
FROM app_seftec.customer_interactions;

CREATE OR REPLACE VIEW public.inventory_items
WITH (security_invoker = true)
AS
SELECT
  id,
  product_id,
  user_id,
  sku,
  barcode,
  stock_quantity,
  reorder_point,
  reorder_quantity,
  unit_cost,
  location,
  supplier_name,
  supplier_contact,
  last_restocked_at,
  created_at,
  updated_at
FROM app_seftec.inventory_items;

CREATE OR REPLACE VIEW public.inventory_adjustments
WITH (security_invoker = true)
AS
SELECT
  id,
  inventory_item_id,
  user_id,
  adjustment_type,
  quantity_change,
  previous_quantity,
  new_quantity,
  unit_cost,
  total_value,
  reason,
  reference_id,
  notes,
  created_by,
  created_at
FROM app_seftec.inventory_adjustments;

CREATE OR REPLACE VIEW public.stock_alerts
WITH (security_invoker = true)
AS
SELECT
  id,
  inventory_item_id,
  user_id,
  alert_type,
  current_quantity,
  threshold_quantity,
  is_resolved,
  resolved_at,
  created_at
FROM app_seftec.stock_alerts;

CREATE OR REPLACE VIEW public.invoices
WITH (security_invoker = true)
AS
SELECT
  id,
  user_id,
  customer_id,
  invoice_number,
  invoice_date,
  due_date,
  status,
  currency_code,
  subtotal,
  tax_rate,
  tax_amount,
  discount_amount,
  shipping_cost,
  total_amount,
  amount_paid,
  balance_due,
  payment_terms,
  notes,
  terms_and_conditions,
  footer_text,
  sent_at,
  paid_at,
  created_at,
  updated_at
FROM app_seftec.invoices;

CREATE OR REPLACE VIEW public.invoice_items
WITH (security_invoker = true)
AS
SELECT
  id,
  invoice_id,
  product_id,
  description,
  quantity,
  unit_price,
  tax_rate,
  discount_percentage,
  line_total,
  sort_order,
  created_at
FROM app_seftec.invoice_items;

CREATE OR REPLACE VIEW public.invoice_payments
WITH (security_invoker = true)
AS
SELECT
  id,
  invoice_id,
  user_id,
  payment_date,
  amount,
  payment_method,
  reference_number,
  notes,
  created_at
FROM app_seftec.invoice_payments;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.customers TO authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.customer_interactions TO authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.inventory_items TO authenticated, service_role;
GRANT SELECT, INSERT ON public.inventory_adjustments TO authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.stock_alerts TO authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.invoices TO authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.invoice_items TO authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.invoice_payments TO authenticated, service_role;

INSERT INTO control_room.feature_flags (name, description, enabled, rollout_pct, created_at, updated_at)
VALUES
  ('sayswitch_payments', 'SaySwitch payment processing integration', TRUE, 100, NOW(), NOW()),
  ('sayswitch_bills', 'SaySwitch bill payment services (airtime, data, TV, electricity)', TRUE, 100, NOW(), NOW()),
  ('sayswitch_transfers', 'SaySwitch money transfer services', TRUE, 100, NOW(), NOW()),
  ('paypal_payments', 'PayPal international payment processing', TRUE, 100, NOW(), NOW()),
  ('ai_recommendations', 'AI-powered business recommendations and insights', TRUE, 100, NOW(), NOW()),
  ('social_auth', 'Enable social authentication (OAuth) for Google, GitHub, Facebook, and Apple', TRUE, 100, NOW(), NOW()),
  ('enhanced_ai_responses', 'Enable enhanced AI responses with improved contextual understanding', FALSE, 0, NOW(), NOW()),
  ('interactive_demo', 'Enable interactive product demos and tutorials', FALSE, 0, NOW(), NOW()),
  ('advanced_analytics', 'Enable advanced analytics dashboard with detailed insights', TRUE, 25, NOW(), NOW()),
  ('mobile_optimizations', 'Enable mobile-specific UI/UX optimizations', TRUE, 100, NOW(), NOW()),
  ('trade_finance_enhancements', 'Enable advanced trade finance workflow enhancements', FALSE, 0, NOW(), NOW())
ON CONFLICT (name) DO UPDATE
SET
  description = EXCLUDED.description,
  updated_at = NOW();

COMMENT ON TABLE app_seftec.customers IS 'SEFTEC-owned CRM customer records';
COMMENT ON TABLE app_seftec.customer_interactions IS 'SEFTEC-owned customer communication history';
COMMENT ON TABLE app_seftec.inventory_items IS 'SEFTEC-owned inventory tracking records';
COMMENT ON TABLE app_seftec.inventory_adjustments IS 'SEFTEC-owned inventory movement ledger';
COMMENT ON TABLE app_seftec.stock_alerts IS 'SEFTEC-owned stock alert records';
COMMENT ON TABLE app_seftec.invoices IS 'SEFTEC-owned invoice headers';
COMMENT ON TABLE app_seftec.invoice_items IS 'SEFTEC-owned invoice line items';
COMMENT ON TABLE app_seftec.invoice_payments IS 'SEFTEC-owned invoice payment records';

COMMIT;
