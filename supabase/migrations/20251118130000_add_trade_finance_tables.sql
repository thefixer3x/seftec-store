-- ============================================================================
-- Trade Finance System - Database Migration
-- Description: Complete trade finance backend with applications, documents,
--              credit limits, and transaction tracking
-- Created: 2025-11-18
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- Table: trade_finance_applications
-- Purpose: Store trade finance facility applications (LC, Invoice Financing, etc.)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.trade_finance_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Application Details
  reference_number TEXT UNIQUE NOT NULL,
  facility_type TEXT NOT NULL CHECK (
    facility_type IN (
      'letter_of_credit',
      'invoice_financing',
      'trade_guarantee',
      'export_financing',
      'import_financing',
      'supply_chain_financing'
    )
  ),

  -- Financial Details
  amount NUMERIC NOT NULL CHECK (amount > 0),
  currency TEXT NOT NULL DEFAULT 'NGN',

  -- Parties Involved
  beneficiary_name TEXT NOT NULL,
  beneficiary_details JSONB,  -- Address, bank details, etc.

  -- Description
  title TEXT NOT NULL,
  description TEXT,
  purpose TEXT,

  -- Status Workflow
  application_status TEXT NOT NULL DEFAULT 'draft' CHECK (
    application_status IN (
      'draft',           -- Being prepared
      'submitted',       -- Submitted for review
      'under_review',    -- Being reviewed by admin
      'approved',        -- Approved, waiting activation
      'active',          -- Active facility
      'rejected',        -- Application rejected
      'withdrawn',       -- Withdrawn by user
      'completed',       -- Facility completed
      'cancelled'        -- Cancelled
    )
  ),

  -- Important Dates
  application_date TIMESTAMP WITH TIME ZONE,
  submitted_date TIMESTAMP WITH TIME ZONE,
  reviewed_date TIMESTAMP WITH TIME ZONE,
  approved_date TIMESTAMP WITH TIME ZONE,
  activation_date TIMESTAMP WITH TIME ZONE,
  expiry_date TIMESTAMP WITH TIME ZONE,
  completion_date TIMESTAMP WITH TIME ZONE,

  -- Review Information
  reviewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewer_notes TEXT,
  rejection_reason TEXT,

  -- Additional Details
  terms_and_conditions JSONB,  -- Custom T&Cs for this facility
  metadata JSONB,               -- Additional custom fields

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_tf_applications_user_id ON public.trade_finance_applications(user_id);
CREATE INDEX idx_tf_applications_status ON public.trade_finance_applications(application_status);
CREATE INDEX idx_tf_applications_facility_type ON public.trade_finance_applications(facility_type);
CREATE INDEX idx_tf_applications_reference ON public.trade_finance_applications(reference_number);
CREATE INDEX idx_tf_applications_created_at ON public.trade_finance_applications(created_at DESC);

-- ============================================================================
-- Table: trade_finance_documents
-- Purpose: Store documents uploaded for trade finance applications
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.trade_finance_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES public.trade_finance_applications(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Document Details
  document_type TEXT NOT NULL CHECK (
    document_type IN (
      'invoice',
      'purchase_order',
      'contract',
      'proforma_invoice',
      'bill_of_lading',
      'packing_list',
      'certificate_of_origin',
      'insurance_certificate',
      'bank_statement',
      'business_registration',
      'tax_clearance',
      'financial_statements',
      'other'
    )
  ),

  -- File Information
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,

  -- Verification
  verified BOOLEAN DEFAULT FALSE,
  verified_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  verified_at TIMESTAMP WITH TIME ZONE,
  verification_notes TEXT,

  -- Metadata
  description TEXT,
  metadata JSONB,

  -- Timestamps
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_tf_documents_application_id ON public.trade_finance_documents(application_id);
CREATE INDEX idx_tf_documents_user_id ON public.trade_finance_documents(user_id);
CREATE INDEX idx_tf_documents_type ON public.trade_finance_documents(document_type);
CREATE INDEX idx_tf_documents_verified ON public.trade_finance_documents(verified);

-- ============================================================================
-- Table: trade_finance_credit_limits
-- Purpose: Track user credit limits and utilization
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.trade_finance_credit_limits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Credit Limits
  total_limit NUMERIC NOT NULL DEFAULT 0 CHECK (total_limit >= 0),
  used_limit NUMERIC NOT NULL DEFAULT 0 CHECK (used_limit >= 0),
  available_limit NUMERIC GENERATED ALWAYS AS (total_limit - used_limit) STORED,

  -- Currency
  currency TEXT NOT NULL DEFAULT 'NGN',

  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  suspended_reason TEXT,

  -- Risk Rating
  risk_rating TEXT CHECK (risk_rating IN ('low', 'medium', 'high', 'critical')),

  -- Timestamps
  limit_set_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_review_date TIMESTAMP WITH TIME ZONE,
  next_review_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_tf_credit_limits_user_id ON public.trade_finance_credit_limits(user_id);
CREATE INDEX idx_tf_credit_limits_active ON public.trade_finance_credit_limits(is_active);

-- ============================================================================
-- Table: trade_finance_transactions
-- Purpose: Track all financial transactions related to trade finance
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.trade_finance_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES public.trade_finance_applications(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Transaction Details
  transaction_type TEXT NOT NULL CHECK (
    transaction_type IN (
      'disbursement',      -- Funds disbursed to user
      'repayment',         -- User repayment
      'fee',               -- Service fee
      'interest',          -- Interest charge
      'penalty',           -- Late payment penalty
      'refund',            -- Refund to user
      'adjustment'         -- Manual adjustment
    )
  ),

  -- Amount
  amount NUMERIC NOT NULL CHECK (amount > 0),
  currency TEXT NOT NULL DEFAULT 'NGN',

  -- Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'processing', 'completed', 'failed', 'reversed')
  ),

  -- References
  reference_number TEXT UNIQUE NOT NULL,
  external_reference TEXT,  -- Reference from payment gateway

  -- Payment Details
  payment_method TEXT,
  payment_details JSONB,

  -- Description
  description TEXT,
  notes TEXT,

  -- Timestamps
  transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_tf_transactions_application_id ON public.trade_finance_transactions(application_id);
CREATE INDEX idx_tf_transactions_user_id ON public.trade_finance_transactions(user_id);
CREATE INDEX idx_tf_transactions_type ON public.trade_finance_transactions(transaction_type);
CREATE INDEX idx_tf_transactions_status ON public.trade_finance_transactions(status);
CREATE INDEX idx_tf_transactions_date ON public.trade_finance_transactions(transaction_date DESC);
CREATE INDEX idx_tf_transactions_reference ON public.trade_finance_transactions(reference_number);

-- ============================================================================
-- Row Level Security (RLS) Policies
-- ============================================================================

-- Enable RLS
ALTER TABLE public.trade_finance_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trade_finance_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trade_finance_credit_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trade_finance_transactions ENABLE ROW LEVEL SECURITY;

-- Applications Policies
CREATE POLICY "Users can view their own applications"
  ON public.trade_finance_applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications"
  ON public.trade_finance_applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own draft/submitted applications"
  ON public.trade_finance_applications FOR UPDATE
  USING (
    auth.uid() = user_id AND
    application_status IN ('draft', 'submitted')
  )
  WITH CHECK (auth.uid() = user_id);

-- Documents Policies
CREATE POLICY "Users can view their own documents"
  ON public.trade_finance_documents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upload documents to their applications"
  ON public.trade_finance_documents FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.trade_finance_applications
      WHERE id = application_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own documents"
  ON public.trade_finance_documents FOR DELETE
  USING (auth.uid() = user_id);

-- Credit Limits Policies
CREATE POLICY "Users can view their own credit limit"
  ON public.trade_finance_credit_limits FOR SELECT
  USING (auth.uid() = user_id);

-- Transactions Policies
CREATE POLICY "Users can view their own transactions"
  ON public.trade_finance_transactions FOR SELECT
  USING (auth.uid() = user_id);

-- ============================================================================
-- Triggers
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tf_applications_updated_at
  BEFORE UPDATE ON public.trade_finance_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tf_documents_updated_at
  BEFORE UPDATE ON public.trade_finance_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tf_credit_limits_updated_at
  BEFORE UPDATE ON public.trade_finance_credit_limits
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tf_transactions_updated_at
  BEFORE UPDATE ON public.trade_finance_transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Helper Functions
-- ============================================================================

-- Generate unique reference number
CREATE OR REPLACE FUNCTION generate_tf_reference_number(facility_type TEXT)
RETURNS TEXT AS $$
DECLARE
  prefix TEXT;
  random_num TEXT;
BEGIN
  -- Set prefix based on facility type
  CASE facility_type
    WHEN 'letter_of_credit' THEN prefix := 'LC';
    WHEN 'invoice_financing' THEN prefix := 'IF';
    WHEN 'trade_guarantee' THEN prefix := 'TG';
    WHEN 'export_financing' THEN prefix := 'EF';
    WHEN 'import_financing' THEN prefix := 'IMF';
    WHEN 'supply_chain_financing' THEN prefix := 'SCF';
    ELSE prefix := 'TF';
  END CASE;

  -- Generate random 6-digit number
  random_num := LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0');

  RETURN prefix || random_num;
END;
$$ LANGUAGE plpgsql;

-- Get user's total active facilities value
CREATE OR REPLACE FUNCTION get_user_active_facilities_total(p_user_id UUID)
RETURNS NUMERIC AS $$
  SELECT COALESCE(SUM(amount), 0)
  FROM public.trade_finance_applications
  WHERE user_id = p_user_id
    AND application_status = 'active';
$$ LANGUAGE sql STABLE;

-- Get user's pending applications count
CREATE OR REPLACE FUNCTION get_user_pending_applications_count(p_user_id UUID)
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER
  FROM public.trade_finance_applications
  WHERE user_id = p_user_id
    AND application_status IN ('submitted', 'under_review');
$$ LANGUAGE sql STABLE;

-- Check if user has available credit
CREATE OR REPLACE FUNCTION has_available_credit(p_user_id UUID, p_amount NUMERIC)
RETURNS BOOLEAN AS $$
  SELECT COALESCE(
    (SELECT available_limit >= p_amount
     FROM public.trade_finance_credit_limits
     WHERE user_id = p_user_id AND is_active = TRUE),
    FALSE
  );
$$ LANGUAGE sql STABLE;

-- Update credit limit utilization
CREATE OR REPLACE FUNCTION update_credit_utilization(
  p_user_id UUID,
  p_amount NUMERIC,
  p_operation TEXT  -- 'increase' or 'decrease'
)
RETURNS VOID AS $$
BEGIN
  IF p_operation = 'increase' THEN
    UPDATE public.trade_finance_credit_limits
    SET used_limit = used_limit + p_amount
    WHERE user_id = p_user_id;
  ELSIF p_operation = 'decrease' THEN
    UPDATE public.trade_finance_credit_limits
    SET used_limit = GREATEST(0, used_limit - p_amount)
    WHERE user_id = p_user_id;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- Sample Data (Optional - for development/testing)
-- ============================================================================

-- Uncomment to insert sample credit limits
/*
INSERT INTO public.trade_finance_credit_limits (user_id, total_limit, used_limit, currency, is_active)
SELECT
  id,
  300000.00,  -- 300k NGN total limit
  0.00,       -- No used limit initially
  'NGN',
  TRUE
FROM auth.users
WHERE email = 'demo@example.com'
ON CONFLICT (user_id) DO NOTHING;
*/

-- ============================================================================
-- Migration Complete
-- ============================================================================

COMMENT ON TABLE public.trade_finance_applications IS 'Trade finance facility applications including LC, Invoice Financing, Trade Guarantees';
COMMENT ON TABLE public.trade_finance_documents IS 'Documents uploaded for trade finance applications';
COMMENT ON TABLE public.trade_finance_credit_limits IS 'User credit limits and utilization tracking';
COMMENT ON TABLE public.trade_finance_transactions IS 'Financial transactions for trade finance facilities';
