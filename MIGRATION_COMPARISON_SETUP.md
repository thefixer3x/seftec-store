# Migration Comparison Setup - Quick Reference

## ✅ What I've Created

1. **`compare-migrations.js`** - Main comparison tool that:
   - Compares migrations from multiple sources
   - Analyzes migration content (tables, functions, policies, etc.)
   - Generates a priority report

2. **`query-neon-migrations.js`** - Neon database query tool that:
   - Queries applied migrations from Neon
   - Lists schema objects (tables, functions, triggers)
   - Works with PostgreSQL connection strings

3. **`MIGRATION_COMPARISON_GUIDE.md`** - Complete usage guide

## 🔍 Current Status

### ✅ Found
- **Current project migrations**: `supabase/migrations/` (17 migration files)
  - Latest: `20260104000001_add_atomic_rpc_functions.sql`
  - Oldest: `20250101_create_wallet_tables.sql`

### ❓ Need to Locate
- **onasis-core submodule**: Path not found in current workspace
- **auth-Gateway service**: Path not found in current workspace
- **Neon connection string**: Not found in environment

## 🚀 Next Steps

### Step 1: Find onasis-core Paths

Please provide the exact paths to:
- onasis-core submodule directory
- auth-Gateway service directory (likely `/apps/onasis-core/services/auth-Gateway`)

Or run these commands to find them:
```bash
# Search for onasis-core
find ~/DevOps/_project_folders/SEF-PROJECT -type d -name "onasis-core" 2>/dev/null

# Search for auth-gateway
find ~/DevOps/_project_folders/SEF-PROJECT -type d -name "*auth*gateway*" -o -name "*auth*Gateway*" 2>/dev/null
```

### Step 2: Get Neon Connection String

If you have the Neon database connection string exported, provide it:
```bash
# Check if it's already exported
echo $NEON_DATABASE_URL

# Or provide it when running the tool
export NEON_DATABASE_URL="postgres://user:pass@host:port/dbname"
```

### Step 3: Run Comparison

Once you have the paths, run:
```bash
cd /Users/seyederick/DevOps/_project_folders/SEF-PROJECT/seftec-store

node compare-migrations.js \
  --onasis-core-path "/path/to/onasis-core" \
  --auth-gateway-path "/path/to/auth-Gateway" \
  --neon-connection "$NEON_DATABASE_URL" \
  --output migration-priority-report.md
```

## 📊 Current Project Migrations Summary

Based on the migrations in `supabase/migrations/`:

| Migration | Description | Priority |
|-----------|-------------|----------|
| `20250101_create_wallet_tables.sql` | Wallet, bank accounts, profiles | 🔴 Critical |
| `20250413_setup_system_tables.sql` | System error logs, admin functions | 🟠 High |
| `20250413_setup_cron_jobs.sql` | Cron job setup functions | 🟡 Medium |
| `20250506_business_plans.sql` | Business plan tables | 🟠 High |
| `20250528011643_add_ai_consent_system.sql` | AI consent system | 🟡 Medium |
| `20250528011809_add_ai_recommendations.sql` | AI recommendations | 🟡 Medium |
| `20250528090155_add_sayswitch_integration.sql` | SaySwitch payment integration | 🟠 High |
| `20250528110500_add_paypal_integration.sql` | PayPal integration | 🟠 High |
| `20250529000001_create_edoc_integration.sql` | eDoc integration | 🟠 High |
| `20251118000001_enable_feature_flags.sql` | Feature flags | 🟡 Medium |
| `20251118120000_add_marketplace_tables.sql` | Marketplace tables | 🟠 High |
| `20251118130000_add_trade_finance_tables.sql` | Trade finance tables | 🟠 High |
| `20251119000000_create_business_tools.sql` | Business tools | 🟠 High |
| `20251120000000_add_stripe_subscription_columns.sql` | Stripe subscriptions | 🟠 High |
| `20251202000000_add_missing_feature_flags.sql` | Additional feature flags | 🟡 Medium |
| `20260104000000_add_seed_data.sql` | Seed data | 🟢 Low |
| `20260104000001_add_atomic_rpc_functions.sql` | Atomic RPC functions | 🟠 High |

## 🔧 Alternative: Manual Comparison

If the automated tool doesn't work, you can manually:

1. **List onasis-core migrations**:
   ```bash
   ls -la /path/to/onasis-core/supabase/migrations/
   ```

2. **List auth-gateway migrations**:
   ```bash
   ls -la /path/to/auth-Gateway/migrations/
   ```

3. **Query Neon database** (if you have connection string):
   ```bash
   psql "$NEON_DATABASE_URL" -c "SELECT * FROM schema_migrations;"
   ```

4. **Compare manually** or use the comparison tool once paths are known

## 📝 Notes

- The Neon MCP server had issues, so the tool uses PostgreSQL connection strings directly
- All migration files should have `.sql` extension
- Migrations are sorted by timestamp (oldest first)
- The tool analyzes migration content to determine priority

## 🆘 Need Help?

If you can't find the paths, please provide:
1. The exact location of the onasis-core submodule
2. The exact location of the auth-Gateway service
3. The Neon database connection string (if available)

Then I can help you run the comparison!
