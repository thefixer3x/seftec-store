# BizGenie AI Architecture & Branding

**Platform:** SefTec BizGenie AI
**Last Updated:** 2025-11-19
**Version:** 2.0 (Multi-Provider Architecture)

---

## 🎯 Executive Summary

BizGenie AI is a **multi-provider AI platform** that presents a unified "BizGenie" brand to users while leveraging multiple AI providers on the backend. The system is designed to be provider-agnostic, allowing seamless switching between AI vendors without user-facing changes.

---

## 🏗️ Multi-Provider Architecture

### **Provider Configuration**

The platform supports **three AI providers** configured via environment variables:

```typescript
// Primary AI Provider (OpenAI/Custom)
BizGenie_API_key = process.env.BizGenie_API_key

// Backup Provider (Perplexity for research)
PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY

// Premium Features (OpenAI GPT-4)
OPENAI_API_KEY = process.env.OPENAI_API_KEY
```

### **Provider Routing Logic**

**1. Regular Chat (`handleAIChat`)**
```
User Query → Complexity Classification
           ↓
    BizGenie_API_key (Primary)
           ↓ [If fails]
    PERPLEXITY_API_KEY (Backup)
           ↓ [If fails]
    Generic Fallback Response
```

**2. Business Plan Generation (`handleBusinessPlan`)**
```
User Request → Premium Feature Check
            ↓
     OPENAI_API_KEY (GPT-4 only)
            ↓
     Generate comprehensive plan
```

**3. Model Selection by Complexity**
- **Simple queries:** `o1-mini` (fast, lightweight)
- **Moderate queries:** `o3-mini-high` (balanced)
- **Complex queries:** `gpt-4` (premium tier only)

---

## 🎨 BizGenie Branding Strategy

### **User-Facing Brand: "BizGenie"**

All user interfaces, error messages, and communications refer to the AI as **"BizGenie AI"** with NO vendor disclosure:

✅ **Correct:**
- "BizGenie AI Assistant"
- "The AI service is currently unavailable"
- Model badges: "Pro", "Premium", "Pro+"

❌ **Incorrect:**
- "OpenAI"
- "GPT-4"
- "Powered by Perplexity"

### **Tier Display Names**

| Internal Model | User Sees | Badge Color |
|---------------|-----------|-------------|
| `o1-mini`, `o3-mini` | **Pro** | Blue |
| `gpt-4`, `premium` | **Premium** | Purple |
| `perplexity-sonar-pro` | **Pro+** | Emerald |
| Fallback | **BizGenie** | Gray |

---

## 📊 Current Provider Usage

### **1. BizGenie_API_key (Primary - OpenAI Compatible)**
- **Purpose:** Main chat interface
- **Models:** o1-mini, o3-mini-high, gpt-4
- **Features:**
  - Complexity-based model selection
  - Tier-based response styling (Pro vs Premium)
  - Personalized system prompts
  - Caching and cost tracking

### **2. PERPLEXITY_API_KEY (Backup)**
- **Purpose:** Fallback when primary fails
- **Model:** sonar-pro
- **Features:**
  - Real-time web search capabilities
  - Recent data access (month filter)
  - Lower latency for research queries
- **Status:** ✅ **ACTIVE** - Configured as automatic fallback

### **3. OPENAI_API_KEY (Premium)**
- **Purpose:** Business plan generation ONLY
- **Model:** gpt-4
- **Features:**
  - 4096 token output
  - Comprehensive business analysis
  - HTML-formatted reports
  - 30-day caching

---

## 🔄 Perplexity Integration Status

### **Question: "Has Perplexity support changed?"**

**Answer:** ✅ **NO - Still fully configured!**

Perplexity is **actively used** as a backup provider:

**Location:** `supabase/functions/bizgenie-router/modules/ai-chat.ts`

**Implementation:**
```typescript
// Lines 8-48: Perplexity API client
async function callPerplexity({
  prompt,
  systemPrompt,
  apiKey
}) {
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    model: 'sonar-pro',
    search_recency_filter: 'month',
    // ... configuration
  });
}

// Lines 232-268: Automatic fallback logic
try {
  // Try BizGenie API first
  const responseData = await callOpenAI({ /* ... */ });
} catch (bizgenieError) {
  // Fallback to Perplexity
  const perplexityResponse = await callPerplexity({ /* ... */ });
}
```

**When Perplexity is used:**
1. BizGenie_API_key fails or unavailable
2. User gets seamless fallback experience
3. Response still branded as "BizGenie Pro+"

---

## 💡 Future: Bring Your Own Key (BYOK)

### **Premium User Feature (Planned)**

```typescript
// Future implementation concept
interface UserAIConfig {
  userId: string;
  provider: 'openai' | 'anthropic' | 'perplexity' | 'custom';
  apiKey: string; // Encrypted in database
  tier: 'custom';
  customModels: string[];
}

// Would allow:
- Users to use their own API keys
- Choose preferred AI provider
- Access to latest models (GPT-4-turbo, Claude 3, etc.)
- Full cost transparency
- Unlimited usage on their own key
```

**Current Status:** Not yet implemented (planned for Premium tier)

---

## 🔒 Security & Privacy

### **Vendor Information Hiding**

**Error Messages:**
```typescript
// ❌ OLD (Exposed vendor)
"OpenAI API key not configured"

// ✅ NEW (Generic)
"The AI service is currently unavailable. Please contact an administrator."
```

**Console Logs:**
```typescript
// Internal logs (server-side only) - OK
console.log('OpenAI API response successful');

// User-facing errors - Generic only
return { error: "AI service unavailable" }
```

### **API Endpoint Branding**

**Endpoints:**
- ❌ `/api/openai-personal` (OLD)
- ✅ `/api/bizgenie-chat` (NEW)
- ✅ `/api/bizgenie-router` (Edge function)

---

## 📈 Provider Fallback Chain

### **For Regular Chat:**

```
┌─────────────────┐
│  User Query     │
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│ Complexity Classifier│
└────────┬─────────────┘
         │
         ▼
┌─────────────────────┐
│ Try BizGenie API    │◄── Primary (OpenAI/Custom)
│ (o1-mini/o3/gpt-4)  │
└────────┬─────────────┘
         │
         │ [Fails]
         ▼
┌─────────────────────┐
│ Try Perplexity API  │◄── Backup (Research-focused)
│ (sonar-pro)         │
└────────┬─────────────┘
         │
         │ [Fails]
         ▼
┌─────────────────────┐
│ Generic Fallback    │◄── Last Resort
│ "Try again later"   │
└─────────────────────┘
```

### **For Business Plans:**

```
┌─────────────────┐
│  User Request   │
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│ Check OPENAI_API_KEY│
└────────┬─────────────┘
         │
         │ [Available]
         ▼
┌─────────────────────┐
│ Generate with GPT-4 │◄── No fallback
│ (4096 tokens max)   │    (Premium only)
└────────┬─────────────┘
         │
         ▼
┌─────────────────────┐
│ Cache for 30 days   │
└─────────────────────┘
```

---

## 🎯 Branding Files Modified

### **UI Components:**
1. `src/components/ai/chat/ChatMessage.tsx`
   - Hides vendor model names
   - Shows "Pro", "Premium", "Pro+" instead
   - BizGenie color scheme

2. `src/components/ai/dashboard/BizGenieDashboardContainer.tsx`
   - Updated API endpoint to `/api/bizgenie-chat`
   - Removed "OpenAI" references

### **Backend Functions:**
3. `supabase/functions/bizgenie-router/index.ts`
   - Generic error messages
   - No vendor disclosure

4. `supabase/functions/ai-chat/index.ts`
   - Generic error messages

5. `supabase/functions/personalized-ai-chat/index.ts`
   - Generic error messages

---

## 🚀 Deployment Checklist

When deploying BizGenie AI:

### **Required Environment Variables:**
```bash
# Primary AI (Required)
BizGenie_API_key=sk-... # OpenAI or compatible

# Backup AI (Recommended)
PERPLEXITY_API_KEY=pplx-... # For fallback

# Premium Features (Required for business plans)
OPENAI_API_KEY=sk-... # GPT-4 access

# Database
SUPABASE_URL=https://...
SUPABASE_SERVICE_ROLE_KEY=...
```

### **Provider Priority:**
1. **BizGenie_API_key** - Must be set for basic functionality
2. **PERPLEXITY_API_KEY** - Highly recommended for reliability
3. **OPENAI_API_KEY** - Required for business plan generation

---

## 📝 Summary

### **Key Points:**

✅ **Multi-provider architecture** - BizGenie can use OpenAI, Perplexity, or custom providers
✅ **Perplexity still active** - Configured as automatic fallback for chat
✅ **Vendor-agnostic branding** - Users only see "BizGenie", never vendor names
✅ **Flexible for future** - Easy to add new providers (Anthropic Claude, Google Gemini, etc.)
✅ **BYOK ready** - Architecture supports user-provided API keys (future feature)

### **Current Usage:**
- **Chat:** BizGenie API → Perplexity fallback → Generic fallback
- **Business Plans:** OpenAI GPT-4 only (no fallback)
- **Branding:** "BizGenie AI" everywhere, zero vendor disclosure

---

**For questions or updates, contact the development team.**
