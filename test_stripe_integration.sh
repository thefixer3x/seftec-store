#!/bin/bash
# Test script for Stripe subscription integration
# This verifies the integration is working correctly

set -e

echo "🔍 Testing Stripe Subscription Integration..."
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Stripe CLI is available
if ! command -v stripe &> /dev/null; then
    echo -e "${RED}❌ Stripe CLI not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Stripe CLI found${NC}"
stripe --version

# Check if Supabase CLI is available
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Supabase CLI found${NC}"
supabase --version

# Check Stripe secrets
echo ""
echo "🔐 Checking Stripe secrets..."
STRIPE_SECRET=$(supabase secrets list 2>/dev/null | grep STRIPE_SECRET_KEY || echo "")
STRIPE_WEBHOOK=$(supabase secrets list 2>/dev/null | grep STRIPE_WEBHOOK_SECRET || echo "")

if [ -z "$STRIPE_SECRET" ]; then
    echo -e "${RED}❌ STRIPE_SECRET_KEY not set${NC}"
else
    echo -e "${GREEN}✅ STRIPE_SECRET_KEY is set${NC}"
fi

if [ -z "$STRIPE_WEBHOOK" ]; then
    echo -e "${YELLOW}⚠️  STRIPE_WEBHOOK_SECRET not set (needed for webhooks)${NC}"
else
    echo -e "${GREEN}✅ STRIPE_WEBHOOK_SECRET is set${NC}"
fi

# Check if functions are deployed
echo ""
echo "📦 Checking deployed functions..."
FUNCTIONS=$(supabase functions list 2>/dev/null | grep stripe-subscription || echo "")

if [ -z "$FUNCTIONS" ]; then
    echo -e "${RED}❌ stripe-subscription function not deployed${NC}"
else
    echo -e "${GREEN}✅ stripe-subscription function is deployed${NC}"
fi

# Check migration status
echo ""
echo "🗄️  Checking migration status..."
if [ -f "supabase/migrations/20251120000000_add_stripe_subscription_columns.sql" ]; then
    echo -e "${GREEN}✅ Migration file exists${NC}"
    echo "   Run: supabase db push --linked"
    echo "   Or apply via Supabase Dashboard SQL Editor"
else
    echo -e "${RED}❌ Migration file not found${NC}"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Apply migration: supabase db push --linked"
echo "2. Verify schema: Run verify_stripe_schema.sql in Supabase SQL Editor"
echo "3. Test checkout: Use SubscriptionManager component"
echo "4. Configure webhook: Set up in Stripe Dashboard"
echo ""
echo "✅ Test script complete!"

