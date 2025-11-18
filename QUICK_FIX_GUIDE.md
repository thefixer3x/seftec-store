# Quick Fix Guide - Wallet Errors

## ✅ Issues Fixed

1. **CSP Error**: Added WebSocket support to allow Supabase real-time connections
2. **config.toml Error**: Removed invalid `timeout_seconds` key  
3. **Supabase URL**: Fixed to use correct project (`seftechub.supabase.co`)
4. **Real-time Subscriptions**: Temporarily disabled until tables exist

## 🚀 Quick Migration Application

### Option 1: Supabase Dashboard (Easiest) ⭐

1. **Open**: https://app.supabase.com/project/ptnrwrgzrsbocgxlpvhd
2. **Go to**: SQL Editor (left sidebar)
3. **Copy** the entire SQL from: `supabase/migrations/20250101_create_wallet_tables.sql`
4. **Paste** into SQL Editor
5. **Click**: "Run" (or press Ctrl+Enter)

That's it! The tables will be created.

### Option 2: Direct psql Connection

```bash
# If you have DATABASE_URL set
psql $DATABASE_URL < supabase/migrations/20250101_create_wallet_tables.sql
```

## ✅ After Running the Migration

1. **Restart dev server**:
   ```bash
   cd apps/seftec-store
   bun run dev
   ```

2. **Test wallet page**:
   - Go to: http://localhost:9994/profile/wallet
   - Should see: **₦0.00** (no errors!)

3. **Check console**: No CSP or database errors

## What the Migration Creates

- ✅ `wallets` table - For user wallet balances
- ✅ `bank_accounts` table - For linked bank accounts  
- ✅ `profiles` table - For user profiles
- ✅ `user_roles` table - For role management
- ✅ `user_preferences` table - For feature flags
- ✅ **RLS Policies** - Security for all tables
- ✅ **Triggers** - Auto-create wallet for new users

## Verification

After running, check tables exist:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('wallets', 'bank_accounts', 'profiles');
```

Should return: 3 rows.

## Current Status

| Component | Status |
|-----------|--------|
| CSP Fixed | ✅ |
| config.toml Fixed | ✅ |
| Supabase URL Fixed | ✅ |
| Migration File Created | ✅ |
| Database Tables | ⏳ Waiting for migration |

**Just need to run the SQL in Supabase Dashboard!**

## Your Project URLs

- **Vanity Domain**: https://seftechub.supabase.co ✅
- **Direct URL**: https://ptnrwrgzrsbocgxlpvhd.supabase.co ✅
- **Project ID**: `ptnrwrgzrsbocgxlpvhd` ✅

Both URLs work! 🎉

