# ACTION-PLAN.md — seftec-store SEO Fixes

**Priority Order | Estimated Effort | Impact**

---

## Phase 1: Critical (Fix Immediately)

### 1. Add LICENSE File
- **Severity:** 🔴 Critical
- **Effort:** 5 min
- **Action:** Add MIT/Apache/LICENSE file to repo root
- **File:** `LICENSE`
- **Impact:** Unblocks GitHub community health scoring

### 2. Add GitHub Repository Topics
- **Severity:** 🔴 Critical
- **Effort:** 5 min
- **Action:** Add topics via GitHub repo settings
- **Topics to add:** `b2b`, `ecommerce`, `marketplace`, `trade`, `hub`, `business`, `payments`, `stripe`, `react`, `typescript`, `supabase`, `open-source`
- **Impact:** Major improvement in discoverability for intent searches

### 3. Expand Repository Description
- **Severity:** ⚠️ Warning
- **Effort:** 5 min
- **Action:** Update GitHub repo description
- **Suggested:** "SEFTEC B2B Trade Hub — Open-source B2B ecommerce platform with marketplace, payments (Stripe/PayPal), trade finance, AI-powered business tools, and multi-currency support."
- **Impact:** Better SERP presence for competitive queries

---

## Phase 2: High Priority (This Sprint)

### 4. Implement SEOManager Service
- **Severity:** 🔴 Critical (for live site)
- **Effort:** 2-3 hours
- **Action:** Create centralized SEO management
- **Files:**
  - `src/services/SEOManager.ts` — Core SEO logic
  - `src/components/SEOHead.tsx` — Helmet wrapper component
- **Impact:** Enables per-page meta tags across entire app

### 5. Add JSON-LD Structured Data
- **Severity:** 🔴 Critical
- **Effort:** 3-4 hours
- **Action:** Add schema markup to pages
- **Priority schemas:**
  - WebSite (with SearchAction) — homepage
  - Organization — homepage
  - Product — product pages
  - BreadcrumbList — all pages
- **Files:** `src/components/seo/JsonLd.tsx`
- **Impact:** Rich snippets in search results, knowledge panel

### 6. Create llms.txt
- **Severity:** ⚠️ Warning
- **Effort:** 1 hour
- **Action:** Create `/public/llms.txt` describing the site for AI crawlers
- **File:** `public/llms.txt`
- **Impact:** AI search readiness (Perplexity, ChatGPT)

---

## Phase 3: Medium Priority (Next Sprint)

### 7. Fix README Heading Hierarchy
- **Severity:** ⚠️ Warning
- **Effort:** 1 hour
- **Action:** Keep single H1, convert rest to H2
- **File:** `README.md`
- **Impact:** Better accessibility, proper document structure

### 8. Add Governance Artifacts
- **Severity:** ⚠️ Warning
- **Effort:** 2-3 hours total
- **Files to create:**
  - `CONTRIBUTING.md`
  - `CODE_OF_CONDUCT.md`
  - `SECURITY.md`
  - `.github/ISSUE_TEMPLATE/config.yml`
  - `.github/PULL_REQUEST_TEMPLATE.md`
- **Impact:** Raises community health from 28% to 85%+

---

## Phase 4: SEO Enhancements (Backlog)

### 9. Per-Page Open Graph / Twitter Cards
- Add OG tags and Twitter Card meta to all pages
- Use SEOManager to set page-specific social share content

### 10. Dynamic Sitemap Updates
- Auto-generate sitemap from router routes
- Add lastmod from git timestamps

### 11. Canonical URLs
- Add canonical tag to prevent duplicate content issues

---

## Issue Tracker References

| Issue | Title | Phase |
|-------|-------|-------|
| #87 | Implement SEO Management System | Phase 2 |
| #94 | Perform Final SEO and i18n Validation | Phase 4 |
| — | Add GitHub Topics | Phase 1 |
| — | Add LICENSE | Phase 1 |
| — | Fix README structure | Phase 3 |
| — | Add governance artifacts | Phase 3 |
