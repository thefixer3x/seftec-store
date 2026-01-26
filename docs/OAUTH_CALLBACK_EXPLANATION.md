# 🔐 OAuth Callback URL Explanation - Custom Domains vs Default Domains

## ✅ Your Find & Replace Will Solve the Problem

Yes, updating from `ptnrwrgzrsbocgxlpvhd` to `mxtsdgkwzjzlttpotole` will solve the problem, **BUT** there's one critical thing to understand about custom domains.

## 🎯 Key Insight: OAuth Callbacks Always Use Default Supabase Domain

Even though you have a custom domain (`api.lanonasis.com`) for your Supabase project, **OAuth callbacks ALWAYS use the default Supabase domain**:

```
✅ OAuth Callback URL: https://mxtsdgkwzjzlttpotole.supabase.co/auth/v1/callback
❌ NOT: https://api.lanonasis.com/auth/v1/callback
```

### Why?

Supabase's OAuth flow is hardcoded to use the default project domain (`[PROJECT_REF].supabase.co`) for security and reliability reasons. Custom domains are only used for:
- API requests (REST API)
- Database connections
- Edge Functions
- Storage access

**OAuth callbacks always go through the default domain.**

## 🌐 Your Setup (This is Normal!)

Having different URLs is **completely fine** and **expected**:

```
Supabase Project: mxtsdgkwzjzlttpotole
├── Default Domain: https://mxtsdgkwzjzlttpotole.supabase.co
│   └── Used for: OAuth callbacks ✅
│
├── Custom Domain: https://api.lanonasis.com
│   └── Used for: API calls, Edge Functions, Database
│
└── Your App: https://seftechub.com
    └── Used for: Frontend application
```

This is a **standard setup** and won't cause any issues.

## ⚠️ Critical Issue Found: ANON_KEY Mismatch

I noticed your `client.ts` has a **mismatch**:

```typescript
// ✅ Correct URL
const SUPABASE_URL = "https://mxtsdgkwzjzlttpotole.supabase.co";

// ❌ WRONG - This key is for the old project (ptnrwrgzrsbocgxlpvhd)
const SUPABASE_ANON_KEY = "***REMOVED-SUPABASE-CREDENTIAL***";
```

The JWT payload shows `"ref":"ptnrwrgzrsbocgxlpvhd"` but your URL is `mxtsdgkwzjzlttpotole`.

### Fix Required

You need to get the **correct ANON_KEY** for the `mxtsdgkwzjzlttpotole` project:

1. Go to: https://app.supabase.com/project/mxtsdgkwzjzlttpotole/settings/api
2. Copy the **anon public** key
3. Update `src/integrations/supabase/client.ts` with the correct key

## 📋 Complete OAuth Setup Checklist

### 1. GitHub OAuth App Configuration

In your GitHub OAuth app settings, add:
```
https://mxtsdgkwzjzlttpotole.supabase.co/auth/v1/callback
```

**Note**: Even though your API uses `api.lanonasis.com`, the OAuth callback MUST use the default Supabase domain.

### 2. Supabase Dashboard Configuration

In Supabase Dashboard → Authentication → URL Configuration:

**Site URL:**
```
https://seftechub.com
```

**Redirect URLs:**
```
https://seftechub.com/auth-callback
https://seftechub.com/auth-callback?provider=github
http://localhost:9994/auth-callback  (for local dev)
```

### 3. Update ANON_KEY

Get the correct key from:
- https://app.supabase.com/project/mxtsdgkwzjzlttpotole/settings/api
- Copy the **anon public** key
- Update `src/integrations/supabase/client.ts`

## 🔄 Complete OAuth Flow (With Custom Domain)

Here's how it works with your setup:

```
1. User clicks "Sign in with GitHub" on seftechub.com
   ↓
2. Your app calls Supabase OAuth (using mxtsdgkwzjzlttpotole.supabase.co)
   ↓
3. Supabase redirects to GitHub with:
   redirect_uri=https://mxtsdgkwzjzlttpotole.supabase.co/auth/v1/callback
   ↓
4. GitHub checks: Is this redirect_uri registered? ✅ (after you add it)
   ↓
5. User authorizes on GitHub
   ↓
6. GitHub redirects to: https://mxtsdgkwzjzlttpotole.supabase.co/auth/v1/callback
   ↓
7. Supabase processes OAuth (on default domain)
   ↓
8. Supabase redirects to your app: https://seftechub.com/auth-callback
   ↓
9. Your app handles the session
```

**Key Point**: The OAuth callback always uses the default Supabase domain, even if you use a custom domain for API calls.

## ✅ Summary

1. **Find & Replace**: ✅ Good - updating to `mxtsdgkwzjzlttpotole` is correct
2. **Different URLs**: ✅ Fine - `api.lanonasis.com` for API, `seftechub.com` for app is normal
3. **OAuth Callback**: ✅ Must use `https://mxtsdgkwzjzlttpotole.supabase.co/auth/v1/callback` (default domain)
4. **ANON_KEY**: ⚠️ **NEEDS FIX** - Currently using old project's key

## 🚨 Action Items

1. ✅ Add `https://mxtsdgkwzjzlttpotole.supabase.co/auth/v1/callback` to GitHub OAuth app
2. ⚠️ **URGENT**: Update ANON_KEY in `client.ts` to match `mxtsdgkwzjzlttpotole` project
3. ✅ Configure Supabase redirect URLs in dashboard
4. ✅ Test the OAuth flow

---

**Your Setup is Correct**: Having `api.lanonasis.com` for Supabase and `seftechub.com` for your app is perfectly fine. The OAuth callback will work as long as you register the default Supabase domain callback URL in GitHub.

