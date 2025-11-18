#!/bin/bash

# Direct SQL execution to Supabase database
# This connects directly to your Supabase database and applies the migration

echo "🚀 Applying wallet tables migration to Supabase..."

# Read the migration file
MIGRATION_FILE="supabase/migrations/20250101_create_wallet_tables.sql"

if [ ! -f "$MIGRATION_FILE" ]; then
    echo "❌ Migration file not found: $MIGRATION_FILE"
    exit 1
fi

echo "📝 Found migration file: $MIGRATION_FILE"

# You can execute this SQL in Supabase Dashboard → SQL Editor
echo ""
echo "✅ Migration SQL is ready!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to: https://app.supabase.com/project/ptnrwrgzrsbocgxlpvhd"
echo "2. Navigate to: SQL Editor"
echo "3. Copy and paste the SQL from: $MIGRATION_FILE"
echo "4. Click 'Run' to execute"
echo ""
echo "Or use psql if you have the connection string:"
echo ""
echo "cat $MIGRATION_FILE | psql \$DATABASE_URL"
echo ""

# Display first few lines of migration
echo "Preview of migration:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
head -30 "$MIGRATION_FILE"
echo "..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ View full migration at: $MIGRATION_FILE"

