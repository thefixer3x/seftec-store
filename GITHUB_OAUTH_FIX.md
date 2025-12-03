# 🔐 GitHub OAuth Redirect URI Configuration Fix

## 🎯 Problem

You're getting this error from GitHub:
> "The `redirect_uri` is not associated with this application. The application might be misconfigured or could be trying to redirect you to a website you weren't expecting."

## 🔍 Root Cause

When using Supabase OAuth, the redirect flow works like this:

1. **Your App** → Calls `supabase.auth.signInWithOAuth()` with `redirectTo: http://localhost:9994/auth-callback`
2. **Supabase** → Redirects to GitHub with its own callback URL: `https://mxtsdgkwzjzlttpotole.supabase.co/auth/v1/callback`
3. **GitHub** → Checks if the redirect URI is registered in your GitHub OAuth app
4. **GitHub** → Shows error if Supabase's callback URL is NOT registered

**The Issue**: You registered your app's URL (`http://localhost:9994/auth-callback` or production URL) in GitHub, but GitHub actually receives Supabase's callback URL, not your app's URL.

## ✅ Solution

You need to register **Supabase's callback URL** in your GitHub OAuth app, not your app's callback URL.

### Step 1: Get Your Supabase Callback URL

Your Supabase project callback URL format is:
```
https://[YOUR_PROJECT_REF].supabase.co/auth/v1/callback
```

Based on your code, your Supabase project is:
- **Project Reference**: `mxtsdgkwzjzlttpotole`
- **Callback URL**: `https://mxtsdgkwzjzlttpotole.supabase.co/auth/v1/callback`

### Step 2: Add to GitHub OAuth App

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Find your OAuth app (or create one if needed)
3. Click "Edit" on your OAuth app
4. In the **"Authorization callback URL"** field, add:
   ```
   https://mxtsdgkwzjzlttpotole.supabase.co/auth/v1/callback
   ```
5. If you have multiple environments, add all of them:
   ```
   https://mxtsdgkwzjzlttpotole.supabase.co/auth/v1/callback
   http://localhost:9994/auth-callback  (for local dev - optional)
   https://seftechub.com/auth-callback  (for production - optional)
   ```
6. Click "Update application"

### Step 3: Verify Supabase Configuration

In your Supabase Dashboard:
1. Go to **Authentication** → **URL Configuration**
2. Make sure **Site URL** is set to your app URL:
   - Development: `http://localhost:9994`
   - Production: `https://seftechub.com` (or your production domain)
3. Add **Redirect URLs**:
   - `http://localhost:9994/auth-callback`
   - `https://seftechub.com/auth-callback` (production)
   - `https://seftechub.com/auth-callback?provider=github`

## 📋 Complete OAuth Flow

Here's how the complete flow works:

```
1. User clicks "Sign in with GitHub"
   ↓
2. Your app calls: supabase.auth.signInWithOAuth({ 
     provider: 'github',
     options: { redirectTo: 'http://localhost:9994/auth-callback?provider=github' }
   })
   ↓
3. Supabase redirects to GitHub with:
   redirect_uri=https://mxtsdgkwzjzlttpotole.supabase.co/auth/v1/callback
   ↓
4. GitHub checks: Is this redirect_uri registered? ✅ (after you add it)
   ↓
5. User authorizes on GitHub
   ↓
6. GitHub redirects back to: https://mxtsdgkwzjzlttpotole.supabase.co/auth/v1/callback
   ↓
7. Supabase processes the OAuth response
   ↓
8. Supabase redirects to your app: http://localhost:9994/auth-callback?provider=github
   ↓
9. Your AuthCallback component handles the session
```

## 🔧 Code Reference

Your current OAuth implementation in `src/utils/auth-utils.ts`:

```typescript
export const handleSignInWithOAuth = async (provider: 'google' | 'facebook' | 'github' | 'apple') => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth-callback?provider=${provider}`,
    },
  });
  
  if (error) {
    throw error;
  }
};
```

This is **correct** - the `redirectTo` is where Supabase will send the user AFTER processing the OAuth callback. The issue is just that GitHub needs Supabase's callback URL registered.

## 🌐 Multiple Environments

If you have multiple environments, register all Supabase callback URLs:

### Development
- GitHub OAuth App: `https://mxtsdgkwzjzlttpotole.supabase.co/auth/v1/callback`
- Supabase Redirect: `http://localhost:9994/auth-callback`

### Production
- GitHub OAuth App: `https://mxtsdgkwzjzlttpotole.supabase.co/auth/v1/callback` (same)
- Supabase Redirect: `https://seftechub.com/auth-callback`

**Note**: The Supabase callback URL is the same for all environments because it's tied to your Supabase project, not your app domain.

## ✅ Verification Checklist

After adding the redirect URI:

- [ ] Added `https://mxtsdgkwzjzlttpotole.supabase.co/auth/v1/callback` to GitHub OAuth app
- [ ] Updated Supabase Site URL to match your app domain
- [ ] Added redirect URLs in Supabase dashboard
- [ ] Test GitHub sign-in flow
- [ ] Verify user is redirected back to your app after authorization

## 🚨 Common Mistakes

1. ❌ **Registering app URL in GitHub**: `http://localhost:9994/auth-callback`
   - ✅ **Correct**: Register Supabase callback: `https://mxtsdgkwzjzlttpotole.supabase.co/auth/v1/callback`

2. ❌ **Using wrong Supabase project**: Make sure you're using the correct project reference
   - ✅ **Check**: Your client.ts uses `mxtsdgkwzjzlttpotole.supabase.co`

3. ❌ **Missing redirect URLs in Supabase**: Only setting Site URL
   - ✅ **Correct**: Add both Site URL and Redirect URLs in Supabase dashboard

## 📝 Summary

**The key insight**: GitHub sees Supabase's callback URL, not your app's URL. You must register Supabase's callback URL (`https://mxtsdgkwzjzlttpotole.supabase.co/auth/v1/callback`) in your GitHub OAuth app settings.

Your app's callback URL (`/auth-callback`) is only used by Supabase to redirect the user back to your app after Supabase processes the OAuth response.

---

**Supabase Project**: `mxtsdgkwzjzlttpotole`  
**GitHub OAuth Callback URL**: `https://mxtsdgkwzjzlttpotole.supabase.co/auth/v1/callback`  
**App Callback URL**: `http://localhost:9994/auth-callback` (dev) or `https://seftechub.com/auth-callback` (prod)

