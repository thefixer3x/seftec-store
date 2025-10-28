# Manual Database Setup for Wallet Features

Since the `config.toml` error has been fixed, here are the options to create the database tables:

## Option 1: Using Supabase Dashboard (Recommended)

1. **Go to your Supabase project**: https://app.supabase.com/project/seftechub
2. **Navigate to**: SQL Editor
3. **Open the migration file**: `apps/seftec-store/supabase/migrations/20250101_create_wallet_tables.sql`
4. **Copy all the SQL** from that file
5. **Paste into SQL Editor** and click "Run"

This will create all the necessary tables.

## Option 2: Using Supabase CLI

```bash
# Navigate to the project
cd apps/seftec-store

# Link to your project (if not already linked)
supabase link --project-ref seftechub

# Push migrations
supabase db push
```

## Option 3: Direct SQL (Quick Manual Setup)

Go to Supabase Dashboard → SQL Editor and run this simplified version:

```sql
-- Create wallets table
CREATE TABLE IF NOT EXISTS public.wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  balance NUMERIC(12, 2) DEFAULT 0.00,
  currency TEXT DEFAULT 'NGN',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create bank_accounts table
CREATE TABLE IF NOT EXISTS public.bank_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_number TEXT NOT NULL,
  bank_name TEXT NOT NULL,
  account_name TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank_accounts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own wallet"
  ON wallets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own wallet"
  ON wallets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own wallet"
  ON wallets FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own bank accounts"
  ON bank_accounts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bank accounts"
  ON bank_accounts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bank accounts"
  ON bank_accounts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bank accounts"
  ON bank_accounts FOR DELETE
  USING (auth.uid() = user_id);
```

## What Was Fixed

✅ **config.toml**: Removed invalid `timeout_seconds` key  
✅ **CSP Headers**: Added WebSocket support  
✅ **Supabase URL**: Fixed to use correct project  
✅ **Migration File**: Created with complete schema  

## After Running the SQL

1. **Restart dev server**: 
   ```bash
   cd apps/seftec-store
   bun run dev
   ```

2. **Test the wallet**:
   - Go to http://localhost:9994/profile/wallet
   - Should show ₦0.00 (no errors)

3. **Check console**:
   - No CSP errors
   - No database errors
   - Page loads without crashing

## Verification

After applying the SQL, you should see these tables in Supabase Dashboard:
- ✅ `wallets`
- ✅ `bank_accounts`
- ✅ `profiles` (if it doesn't exist yet)
- ✅ `user_roles` (if it doesn't exist yet)
- ✅ `user_preferences` (if it doesn't exist yet)

