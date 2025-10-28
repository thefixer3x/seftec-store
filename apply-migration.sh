#!/bin/bash

# Apply migration to Supabase database
# This script applies the wallet tables migration to your Supabase project

echo "🚀 Applying wallet tables migration to Supabase..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Please install it:"
    echo "brew install supabase/tap/supabase"
    exit 1
fi

# Check if user is logged in
if ! supabase projects list &> /dev/null; then
    echo "❌ Please login to Supabase first:"
    echo "supabase login"
    exit 1
fi

# Get project reference
read -p "Enter your Supabase project reference (seftechub): " PROJECT_REF
PROJECT_REF=${PROJECT_REF:-seftechub}

echo "📝 Applying migration to project: $PROJECT_REF"

# Push migration
supabase db push --project-ref $PROJECT_REF

echo "✅ Migration applied successfully!"
echo ""
echo "Next steps:"
echo "1. Restart your dev server: bun run dev"
echo "2. Test the wallet page at http://localhost:9994/profile/wallet"
echo "3. Verify that wallet balance shows ₦0.00 (no errors)"

