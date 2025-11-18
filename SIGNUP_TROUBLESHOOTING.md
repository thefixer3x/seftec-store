# SefTec Store Sign-Up Troubleshooting Guide

## Issue: "There was an error signing up. Please try again."

This document outlines common causes and solutions for sign-up errors.

## Root Causes & Solutions

### 1. Invalid Supabase Anon Key

**Symptom**: Sign-up fails with authentication error

**Solution**: 
1. Get the correct anon key from your Supabase project:
   - Go to https://app.supabase.com/project/seftechub/settings/api
   - Copy the `anon` `public` key
   - Update it in `.env` file

2. Check if the key is properly loaded:
   - Open browser console (F12)
   - Look for "Supabase Key: ✓ Set" message
   - If it shows "✗ Missing", restart the dev server

### 2. Wrong Supabase Project URL

**Symptom**: Connection to Supabase fails

**Solution**:
1. Verify the project URL is correct:
   - Current: `https://seftechub.supabase.co`
   - Check: https://app.supabase.com/project/seftechub/settings/api

2. Test the connection:
   ```bash
   curl https://seftechub.supabase.co
   # Should return HTML, not 404
   ```

### 3. Supabase Auth Not Enabled

**Symptom**: Sign-up returns "Email signups are disabled"

**Solution**:
1. Go to Supabase Dashboard → Authentication → Settings
2. Enable "Enable email signup"
3. Save changes

### 4. Email Confirmation Required

**Symptom**: Sign-up appears to work but user is not actually authenticated

**Solution**:
1. Check if email confirmation is enabled
2. Go to Supabase Dashboard → Authentication → Settings
3. Under "Email Auth", check "Confirm email" setting
4. If enabled, user must click link in email to activate account
5. To disable (for development):
   - Set "Confirm email" to OFF
   - Restart dev server

### 5. Row Level Security (RLS) Blocking Inserts

**Symptom**: Profile creation fails after sign-up

**Solution**:
1. Check RLS policies on `profiles` table
2. Run this SQL in Supabase SQL Editor:
   ```sql
   -- Allow users to insert their own profile
   CREATE POLICY "Users can insert their own profile"
   ON profiles FOR INSERT
   WITH CHECK (auth.uid() = id);
   
   -- Allow users to read their own profile
   CREATE POLICY "Users can read their own profile"
   ON profiles FOR SELECT
   USING (auth.uid() = id);
   
   -- Allow users to update their own profile
   CREATE POLICY "Users can update their own profile"
   ON profiles FOR UPDATE
   USING (auth.uid() = id);
   ```

### 6. Missing Profiles Table

**Symptom**: Error during profile creation

**Solution**:
Create the `profiles` table in Supabase:

```sql
-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies (see solution #5 above)
```

### 7. Environment Variables Not Loading

**Symptom**: App uses default/fallback values

**Solution**:
1. Restart the dev server after changing `.env` file
   ```bash
   bun run dev
   ```

2. Check browser console for environment variable logs:
   ```
   Supabase URL: ✓ Set
   Supabase Key: ✓ Set
   ```

3. If not loading:
   - Ensure `.env` is in `apps/seftec-store/` directory
   - Ensure variables use `VITE_` prefix
   - Clear browser cache and reload

## Testing the Sign-Up Flow

### Step 1: Check Console Logs
1. Open browser console (F12)
2. Look for any error messages during sign-up
3. Common errors to look for:
   - "Invalid API key"
   - "Email signups are disabled"
   - "User already registered"
   - "Rate limit exceeded"

### Step 2: Test with Debug Mode
1. Open `apps/seftec-store/src/integrations/supabase/client.ts`
2. The file now logs Supabase configuration on load
3. Check console for: "Supabase URL" and "Supabase Key" messages

### Step 3: Verify in Supabase Dashboard
1. Go to https://app.supabase.com/project/seftechub
2. Navigate to: Authentication → Users
3. Check if the user was created
4. Check if there are any error logs

## Quick Fixes

### Fix 1: Reset .env File
```bash
cd apps/seftec-store
# Backup current .env
cp .env .env.backup

# Create new .env with correct values
cat > .env << 'EOF'
VITE_SUPABASE_URL=https://seftechub.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
EOF
```

### Fix 2: Restart Dev Server
```bash
# Stop the current server (Ctrl+C)
# Then restart
bun run dev
```

### Fix 3: Clear Browser Cache
```bash
# In browser console (F12)
localStorage.clear()
sessionStorage.clear()
# Then reload page
```

## Getting Your Supabase Credentials

1. **Go to Supabase Dashboard**: https://app.supabase.com
2. **Select your project**: `seftechub`
3. **Navigate to**: Settings → API
4. **Copy**:
   - Project URL (under "Project URL")
   - Anon Public Key (under "Project API keys" → "anon" "public")

## Still Not Working?

If the issue persists:

1. **Check Supabase Status**: https://status.supabase.com
2. **Check Network Tab**: In browser DevTools, look for failed requests
3. **Try Different Email**: Might be already registered
4. **Check Error Message**: Look for specific error in browser console
5. **Verify Project**: Ensure you're using the correct Supabase project

## Next Steps

Once sign-up is working:
1. Test the profile creation
2. Test dashboard access
3. Test wallet functionality
4. Test other protected routes

