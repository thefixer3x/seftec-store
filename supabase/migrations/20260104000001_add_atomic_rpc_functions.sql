-- Atomic RPC functions for data integrity
-- Created: 2026-01-04
-- These functions ensure transactional consistency for multi-step operations

-- ============================================================================
-- 1. ATOMIC STOCK ADJUSTMENT
-- ============================================================================
-- Handles inventory adjustments atomically to prevent race conditions
CREATE OR REPLACE FUNCTION adjust_inventory_stock(
  p_inventory_item_id UUID,
  p_user_id UUID,
  p_adjustment_type TEXT,
  p_quantity_change INTEGER,
  p_reason TEXT DEFAULT NULL,
  p_notes TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_item RECORD;
  v_new_quantity INTEGER;
  v_adjustment_id UUID;
  v_result JSON;
BEGIN
  -- Lock the inventory item row for update to prevent concurrent modifications
  SELECT id, stock_quantity, unit_cost, user_id
  INTO v_item
  FROM inventory_items
  WHERE id = p_inventory_item_id
  FOR UPDATE;

  -- Validate item exists and belongs to user
  IF v_item IS NULL THEN
    RAISE EXCEPTION 'Inventory item not found';
  END IF;

  IF v_item.user_id != p_user_id THEN
    RAISE EXCEPTION 'Unauthorized access to inventory item';
  END IF;

  -- Calculate new quantity
  v_new_quantity := v_item.stock_quantity + p_quantity_change;

  -- Prevent negative stock
  IF v_new_quantity < 0 THEN
    RAISE EXCEPTION 'Stock cannot be negative. Current: %, Change: %', v_item.stock_quantity, p_quantity_change;
  END IF;

  -- Insert adjustment record
  INSERT INTO inventory_adjustments (
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
  ) VALUES (
    p_inventory_item_id,
    p_user_id,
    p_user_id,
    p_adjustment_type,
    p_quantity_change,
    v_item.stock_quantity,
    v_new_quantity,
    v_item.unit_cost,
    ABS(p_quantity_change) * COALESCE(v_item.unit_cost, 0),
    p_reason,
    p_notes
  )
  RETURNING id INTO v_adjustment_id;

  -- Update inventory item
  UPDATE inventory_items
  SET
    stock_quantity = v_new_quantity,
    last_restocked_at = CASE WHEN p_adjustment_type = 'restock' THEN NOW() ELSE last_restocked_at END,
    updated_at = NOW()
  WHERE id = p_inventory_item_id;

  -- Check if we need to create/resolve stock alerts
  IF v_new_quantity = 0 THEN
    INSERT INTO stock_alerts (inventory_item_id, user_id, alert_type, current_quantity, threshold_quantity)
    VALUES (p_inventory_item_id, p_user_id, 'out_of_stock', v_new_quantity, 0)
    ON CONFLICT DO NOTHING;
  ELSIF v_new_quantity <= (SELECT reorder_point FROM inventory_items WHERE id = p_inventory_item_id) THEN
    INSERT INTO stock_alerts (inventory_item_id, user_id, alert_type, current_quantity, threshold_quantity)
    VALUES (p_inventory_item_id, p_user_id, 'low_stock', v_new_quantity,
            (SELECT reorder_point FROM inventory_items WHERE id = p_inventory_item_id))
    ON CONFLICT DO NOTHING;
  ELSE
    -- Resolve any existing alerts if stock is healthy
    UPDATE stock_alerts
    SET is_resolved = true, resolved_at = NOW()
    WHERE inventory_item_id = p_inventory_item_id
      AND is_resolved = false
      AND alert_type IN ('low_stock', 'out_of_stock');
  END IF;

  -- Return result
  v_result := json_build_object(
    'success', true,
    'adjustment_id', v_adjustment_id,
    'previous_quantity', v_item.stock_quantity,
    'new_quantity', v_new_quantity
  );

  RETURN v_result;
END;
$$;

-- ============================================================================
-- 2. ATOMIC INVOICE CREATION WITH ITEMS
-- ============================================================================
-- Creates invoice and all line items in a single transaction
CREATE OR REPLACE FUNCTION create_invoice_with_items(
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
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_invoice_id UUID;
  v_invoice_number TEXT;
  v_subtotal NUMERIC := 0;
  v_tax_amount NUMERIC;
  v_total_amount NUMERIC;
  v_item JSONB;
  v_item_total NUMERIC;
  v_item_discount NUMERIC;
  v_sort_order INTEGER := 0;
  v_result JSON;
BEGIN
  -- Validate due date
  IF p_due_date IS NULL THEN
    RAISE EXCEPTION 'Due date is required';
  END IF;

  -- Validate items
  IF jsonb_array_length(p_items) = 0 THEN
    RAISE EXCEPTION 'At least one line item is required';
  END IF;

  -- Generate invoice number (format: INV-YYYYMMDD-XXXX)
  SELECT 'INV-' || TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || '-' ||
         LPAD((COALESCE(MAX(SUBSTRING(invoice_number FROM 14)::INTEGER), 0) + 1)::TEXT, 4, '0')
  INTO v_invoice_number
  FROM invoices
  WHERE invoice_number LIKE 'INV-' || TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || '-%';

  IF v_invoice_number IS NULL THEN
    v_invoice_number := 'INV-' || TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || '-0001';
  END IF;

  -- Calculate subtotal from items
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    v_item_total := (v_item->>'quantity')::NUMERIC * (v_item->>'unit_price')::NUMERIC;
    v_item_discount := v_item_total * COALESCE((v_item->>'discount_percentage')::NUMERIC, 0) / 100;
    v_subtotal := v_subtotal + (v_item_total - v_item_discount);
  END LOOP;

  -- Calculate totals
  v_tax_amount := v_subtotal * (p_tax_rate / 100);
  v_total_amount := v_subtotal + v_tax_amount + p_shipping_cost - p_discount_amount;

  -- Create invoice
  INSERT INTO invoices (
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
  ) VALUES (
    p_user_id,
    p_customer_id,
    v_invoice_number,
    p_invoice_date,
    p_due_date,
    'draft',
    p_currency_code,
    v_subtotal,
    p_tax_rate,
    v_tax_amount,
    p_discount_amount,
    p_shipping_cost,
    v_total_amount,
    0,
    v_total_amount,
    p_payment_terms,
    p_notes,
    p_terms_and_conditions,
    p_footer_text
  )
  RETURNING id INTO v_invoice_id;

  -- Create invoice items
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    v_item_total := (v_item->>'quantity')::NUMERIC * (v_item->>'unit_price')::NUMERIC;
    v_item_discount := v_item_total * COALESCE((v_item->>'discount_percentage')::NUMERIC, 0) / 100;

    INSERT INTO invoice_items (
      invoice_id,
      product_id,
      description,
      quantity,
      unit_price,
      tax_rate,
      discount_percentage,
      line_total,
      sort_order
    ) VALUES (
      v_invoice_id,
      (v_item->>'product_id')::UUID,
      v_item->>'description',
      (v_item->>'quantity')::INTEGER,
      (v_item->>'unit_price')::NUMERIC,
      COALESCE((v_item->>'tax_rate')::NUMERIC, 0),
      COALESCE((v_item->>'discount_percentage')::NUMERIC, 0),
      v_item_total - v_item_discount,
      v_sort_order
    );

    v_sort_order := v_sort_order + 1;
  END LOOP;

  -- Return result
  v_result := json_build_object(
    'success', true,
    'invoice_id', v_invoice_id,
    'invoice_number', v_invoice_number,
    'total_amount', v_total_amount
  );

  RETURN v_result;
END;
$$;

-- ============================================================================
-- 3. ATOMIC PAYMENT RECORDING
-- ============================================================================
-- Records payment and updates invoice balance atomically
CREATE OR REPLACE FUNCTION record_invoice_payment(
  p_invoice_id UUID,
  p_user_id UUID,
  p_amount NUMERIC DEFAULT NULL,
  p_payment_method TEXT DEFAULT 'other',
  p_payment_date DATE DEFAULT CURRENT_DATE,
  p_transaction_id TEXT DEFAULT NULL,
  p_notes TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_invoice RECORD;
  v_payment_amount NUMERIC;
  v_new_amount_paid NUMERIC;
  v_new_balance_due NUMERIC;
  v_new_status TEXT;
  v_payment_id UUID;
  v_result JSON;
BEGIN
  -- Lock the invoice row for update
  SELECT id, user_id, total_amount, amount_paid, balance_due, status
  INTO v_invoice
  FROM invoices
  WHERE id = p_invoice_id
  FOR UPDATE;

  -- Validate invoice exists and belongs to user
  IF v_invoice IS NULL THEN
    RAISE EXCEPTION 'Invoice not found';
  END IF;

  IF v_invoice.user_id != p_user_id THEN
    RAISE EXCEPTION 'Unauthorized access to invoice';
  END IF;

  -- Check invoice can receive payment
  IF v_invoice.status IN ('paid', 'cancelled', 'refunded') THEN
    RAISE EXCEPTION 'Cannot record payment for invoice with status: %', v_invoice.status;
  END IF;

  -- Calculate payment amount (default to remaining balance)
  v_payment_amount := COALESCE(p_amount, v_invoice.balance_due);

  -- Validate payment amount
  IF v_payment_amount <= 0 THEN
    RAISE EXCEPTION 'Payment amount must be positive';
  END IF;

  IF v_payment_amount > v_invoice.balance_due THEN
    RAISE EXCEPTION 'Payment amount (%) exceeds balance due (%)', v_payment_amount, v_invoice.balance_due;
  END IF;

  -- Calculate new values
  v_new_amount_paid := v_invoice.amount_paid + v_payment_amount;
  v_new_balance_due := v_invoice.total_amount - v_new_amount_paid;
  v_new_status := CASE WHEN v_new_balance_due <= 0 THEN 'paid' ELSE v_invoice.status END;

  -- Insert payment record
  INSERT INTO invoice_payments (
    invoice_id,
    user_id,
    amount,
    payment_method,
    payment_date,
    transaction_id,
    notes
  ) VALUES (
    p_invoice_id,
    p_user_id,
    v_payment_amount,
    p_payment_method,
    p_payment_date,
    p_transaction_id,
    p_notes
  )
  RETURNING id INTO v_payment_id;

  -- Update invoice
  UPDATE invoices
  SET
    amount_paid = v_new_amount_paid,
    balance_due = v_new_balance_due,
    status = v_new_status,
    paid_at = CASE WHEN v_new_balance_due <= 0 THEN NOW() ELSE paid_at END,
    updated_at = NOW()
  WHERE id = p_invoice_id;

  -- Return result
  v_result := json_build_object(
    'success', true,
    'payment_id', v_payment_id,
    'amount_paid', v_payment_amount,
    'new_balance_due', v_new_balance_due,
    'invoice_status', v_new_status
  );

  RETURN v_result;
END;
$$;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION adjust_inventory_stock TO authenticated;
GRANT EXECUTE ON FUNCTION create_invoice_with_items TO authenticated;
GRANT EXECUTE ON FUNCTION record_invoice_payment TO authenticated;

-- Add helpful comments
COMMENT ON FUNCTION adjust_inventory_stock IS 'Atomically adjusts inventory stock with full audit trail and alert management';
COMMENT ON FUNCTION create_invoice_with_items IS 'Creates invoice with line items in a single atomic transaction';
COMMENT ON FUNCTION record_invoice_payment IS 'Records payment and updates invoice balance atomically';
