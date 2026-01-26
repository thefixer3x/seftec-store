#!/bin/bash

# GitHub Issue Creation Script
# Creates all issues from enable-placeholder-features specification
# Generated: January 26, 2026

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}Error: GitHub CLI (gh) is not installed${NC}"
    echo "Install it from: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${RED}Error: Not authenticated with GitHub CLI${NC}"
    echo "Run: gh auth login"
    exit 1
fi

# Get repository from current directory
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || echo "")

if [ -z "$REPO" ]; then
    echo -e "${RED}Error: Not in a GitHub repository directory${NC}"
    echo "Navigate to your repository or specify with --repo flag"
    exit 1
fi

echo -e "${BLUE}=== Creating GitHub Issues for SefTec Store ===${NC}"
echo -e "Repository: ${GREEN}$REPO${NC}"
echo ""

# Confirmation prompt
read -p "Create 20 issues in $REPO? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled"
    exit 0
fi

echo ""
echo -e "${YELLOW}Creating issues...${NC}"
echo ""

# Track created issues
CREATED_ISSUES=()

# Function to create issue
create_issue() {
    local title="$1"
    local body="$2"
    local labels="$3"

    echo -e "${BLUE}Creating:${NC} $title"

    # Create the issue and capture the URL
    ISSUE_URL=$(gh issue create \
        --title "$title" \
        --body "$body" \
        --label "$labels" \
        2>&1)

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Created:${NC} $ISSUE_URL"
        CREATED_ISSUES+=("$ISSUE_URL")
        echo ""
        sleep 1  # Rate limiting
    else
        echo -e "${RED}✗ Failed to create issue${NC}"
        echo ""
    fi
}

# ============================================================================
# PRIORITY 1: CRITICAL BUSINESS FEATURES
# ============================================================================

echo -e "${RED}=== PRIORITY 1: CRITICAL BUSINESS FEATURES ===${NC}"
echo ""

# Issue #1: Implement Dashboard Marketplace Component
create_issue \
"Implement Dashboard Marketplace Component" \
"**Priority**: 🔴 Critical
**Estimated Time**: 1 week
**Section**: 5.2

## Description
Implement functional marketplace component for the dashboard to enable product listing management, search, filtering, and order processing.

## Current Status
- ❌ No marketplace component exists
- ❌ No integration with product database
- ❌ Missing from dashboard navigation

## Tasks
- [ ] Create product listing management interface
- [ ] Add search and filtering capabilities
- [ ] Implement order processing workflow
- [ ] Connect to real product database (\`seftec_store\` schema)
- [ ] Add product detail view
- [ ] Implement inventory tracking display
- [ ] Add seller/vendor management UI

## Acceptance Criteria
- [ ] Users can view all marketplace products
- [ ] Search by product name, category, price range works
- [ ] Filter by categories, vendors, availability works
- [ ] Order creation and tracking functional
- [ ] Component is responsive (mobile/tablet/desktop)
- [ ] Loading states and error handling implemented
- [ ] Feature flag \`marketplace_dashboard\` controls visibility

## Files to Create/Modify
- \`src/components/dashboard/MarketplaceComponent.tsx\` (new)
- \`src/components/dashboard/ProductGrid.tsx\` (new)
- \`src/components/dashboard/ProductFilters.tsx\` (new)
- \`src/pages/Dashboard.tsx\` (modify - add routing)
- \`src/types/marketplace.ts\` (new)

## Dependencies
- Feature flag system (✅ complete)
- Database schema \`seftec_store.products\` table
- Database schema \`seftec_store.orders\` table

## References
- Spec: \`.kiro/specs/enable-placeholder-features/design.md\` - Section 5.2
- Verification: \`.kiro/specs/enable-placeholder-features/VERIFICATION_REPORT.md\` - Section 5.2" \
"priority:critical,feature,dashboard,section-5"

# Issue #2: Implement Dashboard Wallet Component
create_issue \
"Implement Dashboard Wallet Component" \
"**Priority**: 🔴 Critical
**Estimated Time**: 1 week
**Section**: 5.3

## Description
Implement functional wallet component for balance management, transaction history, fund transfers, and statement generation.

## Current Status
- ❌ No wallet component exists
- ❌ No balance display or management
- ❌ Missing from dashboard navigation

## Tasks
- [ ] Add balance management functionality
- [ ] Create transaction history display (paginated)
- [ ] Implement fund transfer capabilities
- [ ] Add statement generation (PDF export)
- [ ] Show real-time balance updates
- [ ] Display transaction categories and filters
- [ ] Add withdrawal/deposit functionality

## Acceptance Criteria
- [ ] Current wallet balance displayed prominently
- [ ] Transaction history shows all wallet activities
- [ ] Users can transfer funds to other users/accounts
- [ ] Monthly statements can be downloaded as PDF
- [ ] Real-time balance updates via Supabase subscriptions
- [ ] Transaction filtering by date, type, amount works
- [ ] Feature flag \`wallet_dashboard\` controls visibility

## Files to Create/Modify
- \`src/components/dashboard/WalletComponent.tsx\` (new)
- \`src/components/dashboard/TransactionHistory.tsx\` (new)
- \`src/components/dashboard/FundTransferForm.tsx\` (new)
- \`src/components/dashboard/StatementGenerator.tsx\` (new)
- \`src/pages/Dashboard.tsx\` (modify - add routing)
- \`src/types/wallet.ts\` (new)

## Dependencies
- Feature flag system (✅ complete)
- Payment gateway integration (✅ complete)
- Database schema \`seftec_store.wallets\` table
- Database schema \`seftec_store.wallet_transactions\` table

## References
- Spec: \`.kiro/specs/enable-placeholder-features/design.md\` - Section 5.3
- Verification: \`.kiro/specs/enable-placeholder-features/VERIFICATION_REPORT.md\` - Section 5.3" \
"priority:critical,feature,dashboard,section-5"

# Issue #3: Implement Dashboard Trade Finance Component
create_issue \
"Implement Dashboard Trade Finance Component" \
"**Priority**: 🔴 Critical
**Estimated Time**: 1 week
**Section**: 5.4

## Description
Implement functional trade finance component for loan applications, credit management, and financing options.

## Current Status
- ❌ No trade finance component exists
- ❌ No loan application interface
- ❌ Missing from dashboard navigation

## Tasks
- [ ] Add loan application functionality
- [ ] Create credit management interface
- [ ] Implement financing options display
- [ ] Connect to financial services APIs (external)
- [ ] Show loan status and repayment schedule
- [ ] Add credit score display
- [ ] Implement loan calculator

## Acceptance Criteria
- [ ] Users can apply for business loans
- [ ] Loan application form validates all required fields
- [ ] Current loans and repayment schedules displayed
- [ ] Available financing options shown with terms
- [ ] Credit score/rating displayed (if available)
- [ ] Loan calculator estimates monthly payments
- [ ] Integration with external credit APIs works
- [ ] Feature flag \`trade_finance_dashboard\` controls visibility

## Files to Create/Modify
- \`src/components/dashboard/TradeFinanceComponent.tsx\` (new)
- \`src/components/dashboard/LoanApplication.tsx\` (new)
- \`src/components/dashboard/LoanStatus.tsx\` (new)
- \`src/components/dashboard/LoanCalculator.tsx\` (new)
- \`src/pages/Dashboard.tsx\` (modify - add routing)
- \`src/types/finance.ts\` (new)
- \`src/lib/finance/credit-api.ts\` (new)

## Dependencies
- Feature flag system (✅ complete)
- Database schema \`seftec_store.loans\` table
- Database schema \`seftec_store.credit_applications\` table
- External credit API integration (to be configured)

## References
- Spec: \`.kiro/specs/enable-placeholder-features/design.md\` - Section 5.4
- Verification: \`.kiro/specs/enable-placeholder-features/VERIFICATION_REPORT.md\` - Section 5.4
- Future integration: \`apps/seftec-credit-api/\` (placeholder exists)" \
"priority:critical,feature,dashboard,finance,section-5"

# Issue #4: Implement Business Inventory Management System
create_issue \
"Implement Business Inventory Management System" \
"**Priority**: 🔴 Critical
**Estimated Time**: 3 days
**Section**: 10.2

## Description
Implement inventory management system for product catalog management, stock tracking, and reorder alerts.

## Current Status
- ❌ No inventory management component exists
- ❌ No stock tracking functionality
- ❌ No reorder alert system

## Tasks
- [ ] Create product catalog management
- [ ] Add stock tracking functionality
- [ ] Implement reorder alerts
- [ ] Support SKU and barcode management
- [ ] Add low stock warnings
- [ ] Implement stock adjustment history
- [ ] Support bulk import/export

## Acceptance Criteria
- [ ] Users can add/edit/delete products in inventory
- [ ] Real-time stock levels displayed
- [ ] Low stock alerts trigger at configurable thresholds
- [ ] Reorder alerts sent via notification system
- [ ] Stock adjustment history tracked with reasons
- [ ] Bulk CSV import/export works
- [ ] Search and filter by category, SKU, status
- [ ] Feature flag \`inventory_management\` controls visibility

## Files to Create/Modify
- \`src/components/business-tools/InventoryManagement.tsx\` (new)
- \`src/components/business-tools/ProductCatalog.tsx\` (new)
- \`src/components/business-tools/StockTracker.tsx\` (new)
- \`src/components/business-tools/ReorderAlerts.tsx\` (new)
- \`src/types/inventory.ts\` (new)
- \`src/lib/inventory/inventory-service.ts\` (new)

## Dependencies
- Feature flag system (✅ complete)
- Notification system (❌ must be implemented - see #7)
- Database schema \`seftec_store.inventory\` table
- Database schema \`seftec_store.stock_adjustments\` table

## References
- Spec: \`.kiro/specs/enable-placeholder-features/design.md\` - Section 10.2
- Verification: \`.kiro/specs/enable-placeholder-features/VERIFICATION_REPORT.md\` - Section 10.2" \
"priority:critical,feature,business-tools,section-10"

# Issue #5: Implement Business Customer Management System
create_issue \
"Implement Business Customer Management System" \
"**Priority**: 🔴 Critical
**Estimated Time**: 3 days
**Section**: 10.3

## Description
Implement customer management system for customer profiles, interaction history tracking, and communication tools.

## Current Status
- ❌ No customer management component exists
- ❌ No customer profile management
- ❌ No interaction history tracking

## Tasks
- [ ] Create customer profile management
- [ ] Add interaction history tracking
- [ ] Implement communication tools (email, SMS)
- [ ] Support customer segmentation
- [ ] Add customer notes and tags
- [ ] Implement customer lifecycle stages
- [ ] Add customer analytics dashboard

## Acceptance Criteria
- [ ] Users can create/edit/view customer profiles
- [ ] All customer interactions (orders, support, communications) tracked
- [ ] Communication tools send emails/SMS to customers
- [ ] Customer segmentation by purchase history, location, tags works
- [ ] Customer lifecycle stages (lead, active, inactive) tracked
- [ ] Customer analytics show LTV, purchase frequency, etc.
- [ ] Search and filter customers by multiple criteria
- [ ] Feature flag \`customer_management\` controls visibility

## Files to Create/Modify
- \`src/components/business-tools/CustomerManagement.tsx\` (new)
- \`src/components/business-tools/CustomerProfile.tsx\` (new)
- \`src/components/business-tools/CustomerInteractions.tsx\` (new)
- \`src/components/business-tools/CustomerCommunication.tsx\` (new)
- \`src/types/customer.ts\` (new)
- \`src/lib/customer/customer-service.ts\` (new)

## Dependencies
- Feature flag system (✅ complete)
- Notification system (❌ must be implemented - see #7)
- Database schema \`seftec_store.customers\` table
- Database schema \`seftec_store.customer_interactions\` table

## References
- Spec: \`.kiro/specs/enable-placeholder-features/design.md\` - Section 10.3
- Verification: \`.kiro/specs/enable-placeholder-features/VERIFICATION_REPORT.md\` - Section 10.3" \
"priority:critical,feature,business-tools,section-10"

# Issue #6: Implement Business Financial Reporting System
create_issue \
"Implement Business Financial Reporting System" \
"**Priority**: 🔴 Critical
**Estimated Time**: 3 days
**Section**: 10.4

## Description
Implement financial reporting system for report generation, real transaction data integration, and export capabilities.

## Current Status
- ❌ No financial reporting component exists
- ❌ No report generation functionality
- ❌ No export capabilities

## Tasks
- [ ] Create report generation functionality
- [ ] Add real transaction data integration
- [ ] Implement export capabilities (PDF, CSV, Excel)
- [ ] Support multiple report types (P&L, balance sheet, cash flow)
- [ ] Add customizable date ranges
- [ ] Implement report scheduling
- [ ] Add data visualization (charts, graphs)

## Acceptance Criteria
- [ ] Users can generate standard financial reports (P&L, balance sheet)
- [ ] Reports pull real transaction data from database
- [ ] Export to PDF, CSV, Excel formats works
- [ ] Custom date ranges can be selected
- [ ] Reports can be scheduled for automatic generation
- [ ] Visual charts and graphs display key metrics
- [ ] Report templates customizable
- [ ] Feature flag \`financial_reporting\` controls visibility

## Files to Create/Modify
- \`src/components/business-tools/FinancialReporting.tsx\` (new)
- \`src/components/business-tools/ReportGenerator.tsx\` (new)
- \`src/components/business-tools/ReportTemplates.tsx\` (new)
- \`src/components/business-tools/ReportExporter.tsx\` (new)
- \`src/types/reports.ts\` (new)
- \`src/lib/reporting/report-service.ts\` (new)

## Dependencies
- Feature flag system (✅ complete)
- Payment gateway integration (✅ complete) - for transaction data
- Database schema \`seftec_store.transactions\` table
- Database schema \`seftec_store.financial_reports\` table

## References
- Spec: \`.kiro/specs/enable-placeholder-features/design.md\` - Section 10.4
- Verification: \`.kiro/specs/enable-placeholder-features/VERIFICATION_REPORT.md\` - Section 10.4" \
"priority:critical,feature,business-tools,reporting,section-10"

# ============================================================================
# PRIORITY 2: INFRASTRUCTURE & CROSS-CUTTING CONCERNS
# ============================================================================

echo -e "${YELLOW}=== PRIORITY 2: INFRASTRUCTURE & CROSS-CUTTING CONCERNS ===${NC}"
echo ""

# Issue #7: Implement Real-Time Notification System
create_issue \
"Implement Real-Time Notification System" \
"**Priority**: 🟠 High
**Estimated Time**: 1 week
**Section**: 6

## Description
Implement comprehensive real-time notification system with multi-channel support (in-app, email, SMS) and notification management interface.

## Current Status
- ❌ No NotificationService exists
- ❌ No notification management interface
- ❌ No multi-channel delivery

## Tasks
- [ ] Create NotificationService with database integration
- [ ] Add multi-channel notification support (in-app, email, SMS)
- [ ] Implement notification queuing and delivery
- [ ] Build notification history display
- [ ] Add notification settings management
- [ ] Implement mark as read functionality
- [ ] Integrate notifications with business events
- [ ] Add notification templates

## Acceptance Criteria
- [ ] NotificationService class created and functional
- [ ] In-app notifications display in real-time
- [ ] Email notifications send successfully
- [ ] SMS notifications send via provider (e.g., Twilio)
- [ ] Users can view notification history
- [ ] Users can configure notification preferences
- [ ] Notifications trigger on key events (payments, orders, etc.)
- [ ] Notification templates support variables
- [ ] Feature flag \`notifications_system\` controls features

## Files to Create/Modify
- \`src/services/NotificationService.ts\` (new)
- \`src/components/notifications/NotificationCenter.tsx\` (new)
- \`src/components/notifications/NotificationSettings.tsx\` (new)
- \`src/components/notifications/NotificationList.tsx\` (new)
- \`src/types/notifications.ts\` (new)
- \`src/hooks/use-notifications.ts\` (new)
- Database migration for \`notifications\` table (new)

## Dependencies
- Feature flag system (✅ complete)
- Supabase real-time subscriptions
- Email service provider (e.g., SendGrid, Resend)
- SMS service provider (e.g., Twilio, Africa's Talking)
- Database schema \`seftec_store.notifications\` table

## Blocks
- #4 (inventory alerts)
- #5 (customer communications)

## References
- Spec: \`.kiro/specs/enable-placeholder-features/design.md\` - Section 6
- Verification: \`.kiro/specs/enable-placeholder-features/VERIFICATION_REPORT.md\` - Section 6" \
"priority:high,feature,infrastructure,section-6"

# Issue #8: Complete Internationalization (i18n) Implementation
create_issue \
"Complete Internationalization (i18n) Implementation" \
"**Priority**: 🟠 High
**Estimated Time**: 1 week
**Section**: 8

## Description
Complete internationalization implementation by updating all components to use translation functions, creating TranslationManager service, and ensuring 100% translation coverage.

## Current Status
- ⚠️ Translation infrastructure exists but not fully utilized
- ❌ Components use hardcoded text (e.g., BillPaymentPage.tsx)
- ❌ No TranslationManager service exists

## Tasks
- [ ] Scan all components for hardcoded text
- [ ] Update all components to use \`t()\` function
- [ ] Create TranslationManager service
- [ ] Add missing translation detection
- [ ] Implement translation validation
- [ ] Update all locale files with new keys
- [ ] Ensure consistency across all supported languages
- [ ] Write i18n system tests

## Acceptance Criteria
- [ ] 100% of user-facing text uses \`t()\` function
- [ ] No hardcoded strings in components
- [ ] TranslationManager service created and functional
- [ ] Missing translation keys logged to console in dev mode
- [ ] All locale files updated (en, fr, yo, ig, ha)
- [ ] Language switching works across all pages
- [ ] i18n system tests pass
- [ ] Feature flag \`advanced_i18n\` controls features

## Files to Create/Modify
- \`src/services/TranslationManager.ts\` (new)
- \`src/pages/BillPaymentPage.tsx\` (modify - add translations)
- \`src/components/**/*.tsx\` (modify - replace hardcoded text)
- \`locales/en/translation.json\` (update)
- \`locales/fr/translation.json\` (update)
- \`locales/yo/translation.json\` (update)
- \`locales/ig/translation.json\` (update)
- \`locales/ha/translation.json\` (update)
- \`src/services/TranslationManager.test.ts\` (new)

## Dependencies
- Feature flag system (✅ complete)
- Existing i18n infrastructure (react-i18next)

## References
- Spec: \`.kiro/specs/enable-placeholder-features/design.md\` - Section 8
- Verification: \`.kiro/specs/enable-placeholder-features/VERIFICATION_REPORT.md\` - Section 8" \
"priority:high,enhancement,i18n,section-8"

# Issue #9: Implement SEO Management System
create_issue \
"Implement SEO Management System" \
"**Priority**: 🟠 High
**Estimated Time**: 3-5 days
**Section**: 9

## Description
Implement comprehensive SEO management system with dynamic meta tag generation, structured data, and automatic sitemap generation.

## Current Status
- ⚠️ Basic files exist (sitemap.xml, robots.txt) but appear static
- ❌ No SEOManager service exists
- ❌ No NavigationManager service exists

## Tasks
- [ ] Create SEOManager service
- [ ] Add dynamic meta tag generation
- [ ] Implement structured data for all pages
- [ ] Create NavigationManager service
- [ ] Implement route validation
- [ ] Add breadcrumb generation
- [ ] Implement automatic sitemap generation
- [ ] Add hreflang tags for multi-language support
- [ ] Write SEO and navigation tests

## Acceptance Criteria
- [ ] SEOManager service created and functional
- [ ] Meta tags (title, description, og:, twitter:) generate per page
- [ ] JSON-LD structured data on all pages
- [ ] NavigationManager handles routing consistently
- [ ] Breadcrumbs display on all pages
- [ ] Sitemap.xml auto-generates on build
- [ ] hreflang tags present for all languages
- [ ] Robots.txt dynamically generated
- [ ] SEO tests validate meta tags and structure

## Files to Create/Modify
- \`src/services/SEOManager.ts\` (new)
- \`src/services/NavigationManager.ts\` (new)
- \`src/components/seo/SEOHead.tsx\` (new)
- \`src/components/navigation/Breadcrumbs.tsx\` (new)
- \`scripts/generate-sitemap.ts\` (new)
- \`public/sitemap.xml\` (auto-generated)
- \`public/robots.txt\` (convert to template)
- \`src/services/SEOManager.test.ts\` (new)

## Dependencies
- Feature flag system (✅ complete)
- Internationalization (⚠️ in progress - see #8)

## References
- Spec: \`.kiro/specs/enable-placeholder-features/design.md\` - Section 9
- Verification: \`.kiro/specs/enable-placeholder-features/VERIFICATION_REPORT.md\` - Section 9" \
"priority:high,enhancement,seo,section-9"

# Issue #10: Integrate Dashboard Navigation and Business Tools
create_issue \
"Integrate Dashboard Navigation and Business Tools" \
"**Priority**: 🟠 High
**Estimated Time**: 2 days
**Section**: 5.5, 10.5

## Description
Integrate all dashboard components and business tools into unified navigation, implement cross-tool data sharing, and ensure consistent user experience.

## Current Status
- ❌ Dashboard components not integrated
- ❌ Business tools not in main navigation
- ❌ No unified data synchronization

## Tasks
- [ ] Add all components to dashboard navigation
- [ ] Ensure consistent navigation across dashboard sections
- [ ] Implement proper breadcrumb generation
- [ ] Add route validation and error handling
- [ ] Create unified data synchronization
- [ ] Implement cross-tool data sharing
- [ ] Add loading states for navigation transitions

## Acceptance Criteria
- [ ] Dashboard navigation includes all sections (marketplace, wallet, trade finance)
- [ ] Business tools menu accessible from main navigation
- [ ] Breadcrumbs display current location accurately
- [ ] 404 error pages for invalid routes
- [ ] Data syncs across related components (e.g., inventory ↔ marketplace)
- [ ] Navigation transitions smooth with loading states
- [ ] Mobile navigation responsive

## Files to Create/Modify
- \`src/pages/Dashboard.tsx\` (modify - add all routes)
- \`src/components/layout/DashboardNav.tsx\` (modify)
- \`src/components/layout/BusinessToolsMenu.tsx\` (new)
- \`src/App.tsx\` (modify - add routes)
- \`src/lib/navigation/routes.ts\` (new)

## Dependencies
- Dashboard components (#1, #2, #3)
- Business tools (#4, #5, #6)
- NavigationManager (#9)

## References
- Spec: \`.kiro/specs/enable-placeholder-features/design.md\` - Sections 5.5, 10.5
- Verification: \`.kiro/specs/enable-placeholder-features/VERIFICATION_REPORT.md\` - Sections 5.5, 10.5" \
"priority:high,integration,dashboard,section-5,section-10"

# ============================================================================
# PRIORITY 3: TESTING & QUALITY ASSURANCE
# ============================================================================

echo -e "${YELLOW}=== PRIORITY 3: TESTING & QUALITY ASSURANCE ===${NC}"
echo ""

# Issue #11: Write AI System Tests
create_issue \
"Write AI System Tests" \
"**Priority**: 🟡 Medium
**Estimated Time**: 3 days
**Section**: 4.5

## Description
Create comprehensive test suite for AI assistant system including unit tests, integration tests, and conversation flow tests.

## Current Status
- ✅ AI system implemented and functional
- ❌ No test files exist for AI components

## Tasks
- [ ] Unit tests for AI response processing
- [ ] Integration tests with AI services
- [ ] Test conversation flow management
- [ ] Test feedback system
- [ ] Mock AI responses for consistent testing
- [ ] Test error handling
- [ ] Test premium vs free tier routing

## Acceptance Criteria
- [ ] Test coverage > 80% for AI components
- [ ] All AI response processing tested
- [ ] Integration tests for bizgenie-router edge function
- [ ] Conversation flow scenarios tested
- [ ] Feedback submission tested
- [ ] Error handling scenarios tested
- [ ] Mock responses consistent and realistic
- [ ] Tests run in CI/CD pipeline

## Files to Create
- \`src/components/ai/BizGenieDashboard.test.tsx\`
- \`src/components/ai/AIChatInterface.test.tsx\`
- \`src/hooks/use-bizgenie-chat/use-bizgenie-chat.test.ts\`
- \`src/services/ai/ai-service.test.ts\`
- \`supabase/functions/bizgenie-router/index.test.ts\`

## Dependencies
- AI system (✅ complete)
- Testing infrastructure (Jest, React Testing Library)

## References
- Spec: \`.kiro/specs/enable-placeholder-features/design.md\` - Section 4.5
- Verification: \`.kiro/specs/enable-placeholder-features/VERIFICATION_REPORT.md\` - Section 4.5" \
"priority:medium,testing,ai,section-4"

# Issue #12: Write Dashboard Component Tests
create_issue \
"Write Dashboard Component Tests" \
"**Priority**: 🟡 Medium
**Estimated Time**: 2 days
**Section**: 5.6

## Description
Create comprehensive test suite for all dashboard components including marketplace, wallet, and trade finance.

## Tasks
- [ ] Unit tests for each dashboard component
- [ ] Integration tests with data sources
- [ ] End-to-end dashboard workflow tests
- [ ] Test loading states
- [ ] Test error handling
- [ ] Test responsive layouts

## Acceptance Criteria
- [ ] Test coverage > 80% for dashboard components
- [ ] All component rendering tested
- [ ] Data loading scenarios tested
- [ ] Error states tested
- [ ] User interactions tested (clicks, form submissions)
- [ ] Responsive behavior tested
- [ ] Tests run in CI/CD pipeline

## Files to Create
- \`src/components/dashboard/MarketplaceComponent.test.tsx\`
- \`src/components/dashboard/WalletComponent.test.tsx\`
- \`src/components/dashboard/TradeFinanceComponent.test.tsx\`

## Dependencies
- Dashboard components (#1, #2, #3)
- Testing infrastructure

## References
- Spec: \`.kiro/specs/enable-placeholder-features/design.md\` - Section 5.6
- Verification: \`.kiro/specs/enable-placeholder-features/VERIFICATION_REPORT.md\` - Section 5.6" \
"priority:medium,testing,dashboard,section-5"

# Issue #13: Write Business Tools Tests
create_issue \
"Write Business Tools Tests" \
"**Priority**: 🟡 Medium
**Estimated Time**: 2 days
**Section**: 10.6

## Description
Create comprehensive test suite for all business tools including inventory, customer management, and financial reporting.

## Tasks
- [ ] Unit tests for each business tool
- [ ] Integration tests with data sources
- [ ] End-to-end business workflow tests
- [ ] Test data import/export
- [ ] Test report generation
- [ ] Test notification triggers

## Acceptance Criteria
- [ ] Test coverage > 80% for business tools
- [ ] All tool functionality tested
- [ ] Data operations (CRUD) tested
- [ ] Import/export tested with sample files
- [ ] Report generation tested
- [ ] Notification integration tested
- [ ] Tests run in CI/CD pipeline

## Files to Create
- \`src/components/business-tools/InventoryManagement.test.tsx\`
- \`src/components/business-tools/CustomerManagement.test.tsx\`
- \`src/components/business-tools/FinancialReporting.test.tsx\`

## Dependencies
- Business tools (#4, #5, #6)
- Testing infrastructure

## References
- Spec: \`.kiro/specs/enable-placeholder-features/design.md\` - Section 10.6
- Verification: \`.kiro/specs/enable-placeholder-features/VERIFICATION_REPORT.md\` - Section 10.6" \
"priority:medium,testing,business-tools,section-10"

# Issue #14: Write Notification System Tests
create_issue \
"Write Notification System Tests" \
"**Priority**: 🟡 Medium
**Estimated Time**: 2 days
**Section**: 6.5

## Description
Create comprehensive test suite for notification system including delivery, preferences, and multi-channel support.

## Tasks
- [ ] Unit tests for notification service
- [ ] Integration tests with delivery channels
- [ ] Test notification preferences management
- [ ] Test real-time delivery
- [ ] Mock email/SMS providers for testing

## Acceptance Criteria
- [ ] Test coverage > 80% for notification system
- [ ] NotificationService methods tested
- [ ] Multi-channel delivery tested (mocked)
- [ ] Preferences management tested
- [ ] Real-time updates tested
- [ ] Tests run in CI/CD pipeline

## Files to Create
- \`src/services/NotificationService.test.ts\`
- \`src/components/notifications/NotificationCenter.test.tsx\`

## Dependencies
- Notification system (#7)
- Testing infrastructure

## References
- Spec: \`.kiro/specs/enable-placeholder-features/design.md\` - Section 6.5
- Verification: \`.kiro/specs/enable-placeholder-features/VERIFICATION_REPORT.md\` - Section 6.5" \
"priority:medium,testing,notifications,section-6"

# ============================================================================
# PRIORITY 4: FINAL INTEGRATION & DEPLOYMENT
# ============================================================================

echo -e "${GREEN}=== PRIORITY 4: FINAL INTEGRATION & DEPLOYMENT ===${NC}"
echo ""

# Issue #15: Execute Full Test Suite and Validate Build
create_issue \
"Execute Full Test Suite and Validate Build" \
"**Priority**: 🟢 Low
**Estimated Time**: 1 day
**Section**: 11.2, 11.3

## Description
Execute comprehensive test suite, validate TypeScript compilation, ensure all linting passes, and test production build.

## Tasks
- [ ] Run all unit tests and ensure 100% pass rate
- [ ] Execute integration tests for all features
- [ ] Perform end-to-end testing of complete workflows
- [ ] Ensure error-free TypeScript compilation
- [ ] Validate all linting rules pass
- [ ] Test production build generation
- [ ] Test in multiple browsers

## Acceptance Criteria
- [ ] All tests pass (unit, integration, e2e)
- [ ] Test coverage > 80% overall
- [ ] TypeScript compiles without errors
- [ ] ESLint passes with no warnings
- [ ] Production build generates successfully
- [ ] Build size within acceptable limits
- [ ] App works in Chrome, Firefox, Safari, Edge
- [ ] Mobile responsive testing passed

## Commands
\`\`\`bash
bun nx test seftec-store
bun nx lint seftec-store
bun nx build seftec-store
bun nx type-check seftec-store
\`\`\`

## Dependencies
- All test suites (#11-14)
- All features (#1-10)

## References
- Spec: \`.kiro/specs/enable-placeholder-features/design.md\` - Section 11
- Verification: \`.kiro/specs/enable-placeholder-features/VERIFICATION_REPORT.md\` - Section 11" \
"priority:low,testing,ci-cd,section-11"

# Issue #16: Perform Final SEO and i18n Validation
create_issue \
"Perform Final SEO and i18n Validation" \
"**Priority**: 🟢 Low
**Estimated Time**: 1 day
**Section**: 11.4

## Description
Validate 100% translation coverage, test SEO compliance across all pages, and verify sitemap/robots.txt accuracy.

## Tasks
- [ ] Validate 100% translation coverage
- [ ] Test language switching on all pages
- [ ] Test SEO compliance across all pages
- [ ] Verify sitemap.xml accuracy
- [ ] Verify robots.txt accuracy
- [ ] Test structured data validity
- [ ] Test meta tags on all pages

## Acceptance Criteria
- [ ] All user-facing text has translations
- [ ] No missing translation keys
- [ ] Language switching works on all pages
- [ ] All pages have proper meta tags
- [ ] Structured data validates (Google Rich Results Test)
- [ ] Sitemap includes all public pages
- [ ] Robots.txt configured correctly
- [ ] hreflang tags correct for all languages

## Tools
- Google Rich Results Test
- Lighthouse SEO audit
- i18n-ally VSCode extension
- Sitemap validator

## Dependencies
- i18n implementation (#8)
- SEO system (#9)

## References
- Spec: \`.kiro/specs/enable-placeholder-features/design.md\` - Section 11.4
- Verification: \`.kiro/specs/enable-placeholder-features/VERIFICATION_REPORT.md\` - Section 11.4" \
"priority:low,validation,seo,i18n,section-11"

# Issue #17: Create Deployment and Rollback Procedures
create_issue \
"Create Deployment and Rollback Procedures" \
"**Priority**: 🟢 Low
**Estimated Time**: 2 days
**Section**: 11.5

## Description
Document feature flag rollout strategy, create rollback procedures for each feature, and prepare user communication templates.

## Tasks
- [ ] Document feature flag rollout strategy
- [ ] Create rollback procedures for each feature
- [ ] Prepare user communication templates
- [ ] Document database migration procedures
- [ ] Create monitoring and alerting checklist
- [ ] Document incident response procedures

## Acceptance Criteria
- [ ] Deployment checklist created
- [ ] Feature flag rollout percentages documented
- [ ] Rollback procedures for each major feature
- [ ] User communication templates (email, in-app)
- [ ] Database migration rollback scripts
- [ ] Monitoring setup documented
- [ ] Incident response runbook created

## Files to Create
- \`docs/deployment/ROLLOUT_STRATEGY.md\`
- \`docs/deployment/ROLLBACK_PROCEDURES.md\`
- \`docs/deployment/USER_COMMUNICATIONS.md\`
- \`docs/deployment/MONITORING_CHECKLIST.md\`
- \`docs/deployment/INCIDENT_RESPONSE.md\`

## Dependencies
- All features (#1-10)
- Feature flag system (✅ complete)

## References
- Spec: \`.kiro/specs/enable-placeholder-features/design.md\` - Section 11.5
- Verification: \`.kiro/specs/enable-placeholder-features/VERIFICATION_REPORT.md\` - Section 11.5" \
"priority:low,documentation,deployment,section-11"

# ============================================================================
# SUMMARY
# ============================================================================

echo ""
echo -e "${GREEN}=== Issue Creation Complete ===${NC}"
echo ""
echo "Total issues created: ${#CREATED_ISSUES[@]}"
echo ""
echo "Created issues:"
for issue in "${CREATED_ISSUES[@]}"; do
    echo "  - $issue"
done
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Review issues in GitHub: https://github.com/$REPO/issues"
echo "2. Set up project board with sprints"
echo "3. Assign issues to developers"
echo "4. Begin Sprint 1 with critical business features"
echo ""
echo -e "${GREEN}✓ All done!${NC}"
