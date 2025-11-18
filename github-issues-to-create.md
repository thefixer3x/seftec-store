# GitHub Issues to Create

Use the following commands to create these issues, or create them manually in GitHub.

---

## Issue 1: Fix Broken CI/CD Pipeline - Set Up Test Infrastructure

**Labels:** `priority: critical`, `testing`, `ci/cd`, `infrastructure`

```bash
gh issue create \
  --title "🔧 Fix Broken CI/CD Pipeline - Set Up Test Infrastructure" \
  --label "priority: critical,testing,ci/cd,infrastructure" \
  --body "## Problem
The CI/CD pipeline is currently broken because the GitHub Actions workflow calls \`npm test\` but no test script exists in package.json.

## Tasks
- [ ] Install Vitest as test runner
- [ ] Install @vitest/ui for test UI
- [ ] Install jsdom for DOM simulation
- [ ] Install @vitest/coverage-v8 for coverage reports
- [ ] Create vitest.config.ts configuration file
- [ ] Add test scripts to package.json (\`test\`, \`test:watch\`, \`test:coverage\`, \`test:ui\`)
- [ ] Verify CI/CD pipeline runs successfully

## Priority
**CRITICAL** - This blocks all automated testing

## Acceptance Criteria
- \`npm test\` runs without errors
- CI/CD pipeline passes
- Test infrastructure ready for new tests

## Related Files
- \`.github/workflows/node.js.yml\`
- \`package.json\`
- New file: \`vitest.config.ts\`"
```

---

## Issue 2: Add Authentication System Tests (AuthContext)

**Labels:** `priority: high`, `testing`, `security`, `authentication`

```bash
gh issue create \
  --title "🔐 Add Authentication System Tests (AuthContext)" \
  --label "priority: high,testing,security,authentication" \
  --body "## Overview
The authentication system is critical for security and user experience but currently has no test coverage.

## Test Coverage Needed

### Core Authentication Flows
- [ ] Sign in with email/password (valid credentials)
- [ ] Sign in with invalid credentials (error handling)
- [ ] Sign up new user with valid data
- [ ] Sign up with validation errors
- [ ] Sign out functionality

### Advanced Authentication
- [ ] OAuth providers (Google, GitHub, Apple)
- [ ] Magic link authentication
- [ ] Biometric authentication
- [ ] Password reset flow
- [ ] Email verification

### Multi-Factor Authentication (MFA)
- [ ] MFA setup flow
- [ ] MFA verification with valid code
- [ ] MFA verification with invalid code
- [ ] Get MFA factors

### Session & Profile Management
- [ ] Session state management
- [ ] Profile updates
- [ ] Refresh profile data
- [ ] Get user sessions
- [ ] Remove specific session

### Role-Based Access Control
- [ ] \`hasRole\` function with valid role
- [ ] \`hasRole\` function with invalid role
- [ ] User roles fetching

## Files to Test
- \`src/context/AuthContext.tsx\`
- \`src/hooks/use-auth-state.ts\`
- \`src/utils/auth-utils.ts\`
- \`src/lib/validations/auth.ts\`

## Priority
**HIGH** - Authentication is a critical security feature

## Target Coverage
80%+ code coverage"
```

---

## Issue 3: Add Shopping Cart Tests (CartContext)

**Labels:** `priority: high`, `testing`, `e-commerce`, `cart`

```bash
gh issue create \
  --title "🛒 Add Shopping Cart Tests (CartContext)" \
  --label "priority: high,testing,e-commerce,cart" \
  --body "## Overview
Shopping cart functionality is core to e-commerce operations and handles revenue. Currently has no test coverage.

## Test Coverage Needed

### Cart Operations
- [ ] Add new item to empty cart
- [ ] Add duplicate item (should increase quantity)
- [ ] Remove item from cart
- [ ] Update item quantity (positive numbers)
- [ ] Update quantity to zero (should remove item)
- [ ] Clear entire cart

### Cart Calculations
- [ ] Calculate cart total correctly
- [ ] Calculate cart item count
- [ ] Cart total with multiple items
- [ ] Cart total after quantity updates

### Persistence
- [ ] Cart saves to localStorage
- [ ] Cart loads from localStorage on mount
- [ ] Cart clears from localStorage on clearCart()
- [ ] Handle corrupted localStorage data gracefully

### Checkout Flow
- [ ] Checkout with authenticated user
- [ ] Checkout without authentication (should fail)
- [ ] Checkout with empty cart (should fail)
- [ ] Order creation in database
- [ ] Order items creation
- [ ] Cart cleared after successful checkout
- [ ] Error handling during checkout

### Edge Cases
- [ ] Negative quantity handling
- [ ] Very large quantities
- [ ] Invalid product data
- [ ] Database errors during checkout

## Files to Test
- \`src/context/CartContext.tsx\`
- \`src/pages/Cart.tsx\`

## Priority
**HIGH** - Protects revenue and user experience

## Target Coverage
85%+ code coverage"
```

---

## Issue 4: Add Security Tests for HTML Sanitization

**Labels:** `priority: critical`, `security`, `testing`, `xss-prevention`

```bash
gh issue create \
  --title "🛡️ Add Security Tests for HTML Sanitization" \
  --label "priority: critical,security,testing,xss-prevention" \
  --body "## Overview
HTML sanitization is **SECURITY CRITICAL** to prevent XSS attacks. Must be thoroughly tested.

## Test Coverage Needed

### XSS Prevention
- [ ] Remove \\\`<script>\\\` tags from input
- [ ] Remove event handlers (\\\`onclick\\\`, \\\`onerror\\\`, etc.)
- [ ] Remove javascript: URLs
- [ ] Remove data: URLs with scripts
- [ ] Sanitize nested malicious content
- [ ] Handle obfuscated XSS attempts

### Safe Content Preservation
- [ ] Allow safe HTML tags (p, div, span, etc.)
- [ ] Preserve text content
- [ ] Allow safe attributes (class, id, etc.)
- [ ] Handle empty strings
- [ ] Handle null/undefined inputs

### Edge Cases
- [ ] Very long input strings
- [ ] Deeply nested HTML
- [ ] Unicode characters
- [ ] Special characters
- [ ] Malformed HTML

## Files to Test
- \`src/utils/sanitize.ts\`

## Priority
**CRITICAL** - Security vulnerability if not properly tested

## Security Impact
XSS vulnerabilities can:
- Steal user credentials
- Hijack user sessions
- Deface the website
- Inject malware

## Target Coverage
100% code coverage required"
```

---

## Issue 5: Set Up Test Coverage Goals in CI/CD

**Labels:** `priority: high`, `testing`, `ci/cd`, `coverage`

```bash
gh issue create \
  --title "📊 Set Up Test Coverage Goals in CI/CD" \
  --label "priority: high,testing,ci/cd,coverage" \
  --body "## Overview
Establish and enforce test coverage standards to prevent regression and ensure code quality.

## Tasks

### Coverage Configuration
- [ ] Configure Vitest coverage thresholds
- [ ] Set global coverage target (70%)
- [ ] Set per-file type targets:
  - Utilities: 90%+
  - Business logic: 80%+
  - Components: 70%+

### CI/CD Integration
- [ ] Add coverage reporting to GitHub Actions
- [ ] Generate coverage reports on each PR
- [ ] Block PRs that decrease coverage
- [ ] Upload coverage to code coverage service (optional: Codecov/Coveralls)

### Coverage Reporting
- [ ] Generate HTML coverage reports
- [ ] Add coverage badge to README
- [ ] Set up coverage comments on PRs

### Documentation
- [ ] Document coverage goals in README
- [ ] Add coverage guidelines for contributors

## Configuration Files
- \`vitest.config.ts\` - Coverage thresholds
- \`.github/workflows/node.js.yml\` - CI coverage checks

## Priority
**HIGH** - Prevents test coverage regression

## Acceptance Criteria
- CI fails if coverage drops below threshold
- Coverage reports visible on every PR
- Team aware of coverage standards"
```

---

## Additional Lower Priority Issues

### Issue 6: Add Custom Hooks Tests

**Labels:** `priority: medium`, `testing`, `hooks`

Create tests for 12 custom hooks including:
- use-auth-state.ts
- use-subscription.ts
- use-admin-access.ts
- use-feature-flags.ts
- use-toast.ts
- use-bizgenie-chat.ts
- use-edoc-integration.ts
- use-offline-detection.ts
- And more...

### Issue 7: Add Utility Function Tests

**Labels:** `priority: medium`, `testing`, `utils`

Test coverage for:
- src/utils/translation-helper.ts
- src/lib/utils.ts
- src/lib/translations.ts
- src/lib/supabase-central.ts

### Issue 8: Add Payment Flow Tests

**Labels:** `priority: high`, `testing`, `e-commerce`, `payments`

Test coverage for:
- PaymentSuccess page (expand existing tests)
- PaymentCanceled page
- Bill payment components
- Payment error scenarios

### Issue 9: Add Feature Flag Tests

**Labels:** `priority: medium`, `testing`, `feature-flags`

Test coverage for:
- Feature flag evaluation logic
- Default values
- Feature flag provider
- Flag overrides

### Issue 10: Add Form Validation Tests

**Labels:** `priority: medium`, `testing`, `forms`

Test coverage for:
- Registration forms
- Profile forms
- Zod validation schemas
- Error handling

---

## How to Create These Issues

### Option 1: Using the gh CLI
Run each command above from your terminal.

### Option 2: Manually in GitHub
1. Go to https://github.com/thefixer3x/seftec-store/issues/new
2. Copy the title and body content
3. Add the labels manually
4. Click "Submit new issue"

### Option 3: Create all at once with a script
Save the commands to a file and run them in sequence.
