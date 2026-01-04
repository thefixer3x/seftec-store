-- Seed data for products table
-- Created: 2026-01-04

-- Insert sample products for marketplace
INSERT INTO public.products (name, description, price, currency, category, status, stock_quantity, sku, image_url)
VALUES
  ('Business Analytics Pro', 'Advanced analytics dashboard for business insights', 99.99, 'USD', 'software', 'active', 100, 'BAP-001', '/images/products/analytics-pro.jpg'),
  ('Trade Finance Toolkit', 'Complete toolkit for international trade documentation', 199.99, 'USD', 'software', 'active', 50, 'TFT-001', '/images/products/trade-toolkit.jpg'),
  ('E-Commerce Starter Pack', 'Everything you need to start selling online', 49.99, 'USD', 'software', 'active', 200, 'ESP-001', '/images/products/ecommerce-starter.jpg'),
  ('AI Business Advisor - Monthly', 'Monthly subscription to AI-powered business advice', 27.00, 'USD', 'subscription', 'active', 999, 'ABA-M01', '/images/products/ai-advisor.jpg'),
  ('AI Business Advisor - Annual', 'Annual subscription to AI-powered business advice (save 20%)', 259.00, 'USD', 'subscription', 'active', 999, 'ABA-Y01', '/images/products/ai-advisor-annual.jpg'),
  ('Document Processing API', 'API access for automated document processing', 149.99, 'USD', 'api', 'active', 500, 'DPA-001', '/images/products/doc-api.jpg'),
  ('Payment Gateway Integration', 'Multi-provider payment gateway setup service', 299.99, 'USD', 'service', 'active', 25, 'PGI-001', '/images/products/payment-gateway.jpg'),
  ('Custom Business Plan Report', 'AI-generated comprehensive business plan', 79.99, 'USD', 'service', 'active', 100, 'CBP-001', '/images/products/business-plan.jpg'),
  ('SaySwitch Premium Access', 'Premium tier access to SaySwitch payment services', 15.00, 'USD', 'subscription', 'active', 999, 'SSP-001', '/images/products/sayswitch-premium.jpg'),
  ('Enterprise Consultation', '1-hour enterprise solution consultation', 199.99, 'USD', 'service', 'active', 50, 'EC-001', '/images/products/consultation.jpg')
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  updated_at = NOW();

-- Ensure all required feature flags exist
INSERT INTO public.feature_flags (name, description, enabled, rollout_pct)
VALUES
  ('sayswitch_payments', 'SaySwitch payment processing integration', true, 100),
  ('sayswitch_bills', 'SaySwitch bill payment services', true, 100),
  ('sayswitch_transfers', 'SaySwitch money transfer services', true, 100),
  ('paypal_payments', 'PayPal international payment processing', true, 100),
  ('ai_recommendations', 'AI-powered business recommendations', true, 100),
  ('social_auth', 'Social authentication (OAuth) providers', true, 100),
  ('marketplace', 'Marketplace features', true, 100),
  ('trade_finance', 'Trade finance features', true, 100)
ON CONFLICT (name) DO UPDATE SET
  enabled = EXCLUDED.enabled,
  rollout_pct = EXCLUDED.rollout_pct,
  updated_at = NOW();

COMMENT ON TABLE public.products IS 'Product catalog with seed data added 2026-01-04';
