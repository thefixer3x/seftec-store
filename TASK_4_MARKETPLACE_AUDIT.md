# Task 4: Complete Marketplace Backend - Audit & Implementation Plan

**Date:** 2025-11-18
**Branch:** `claude/testing-mi4kxuhhr7gxilmz-01LZME5nV57aXT16jLQC8McJ`
**Status:** 🚧 In Progress

---

## EXECUTIVE SUMMARY

📊 **Current Marketplace Completeness: 40%**
- ✅ **Products System**: 90% Complete (DB + Frontend working)
- ❌ **Orders System**: 10% Complete (DB exists, no frontend/backend)
- ❌ **Marketplace Dashboard**: 0% Complete (Using mock data)
- ❌ **Search/Filtering**: 0% Complete (Basic listing only)
- ❌ **Bids/Offers**: 0% Complete (UI tabs exist, no backend)

**Key Finding:** Database schema exists and is well-designed, but frontend/backend integration is minimal. Need to build order processing, marketplace dashboard backend, and search functionality.

---

## DATABASE SCHEMA ANALYSIS

### ✅ Existing Tables

#### 1. **`products` Table** (ACTIVE ✅)
```sql
- id: uuid (PK)
- name: text
- price: numeric
- category: text (nullable)
- description: text (nullable)
- image_url: text (nullable)
- stock_quantity: numeric (default 0)
- vendor_id: uuid (FK → profiles)
- created_at: timestamp
- updated_at: timestamp
```

**Status**: Fully functional
- ✅ Used in Products.tsx
- ✅ Image upload working
- ✅ Vendor relationship established

#### 2. **`orders` Table** (EXISTS, UNUSED ❌)
```sql
- id: uuid (PK)
- customer_id: uuid (FK → profiles)
- order_date: timestamp
- shipping_address: text (nullable)
- status: text (default 'pending')
- total_amount: numeric
- created_at: timestamp
- updated_at: timestamp
```

**Status**: Table exists but no integration
- ❌ No order creation endpoint
- ❌ No frontend for placing orders
- ❌ No order items/line items table!
- ❌ Not connected to products

**BLOCKER**: Missing `order_items` table to link orders with products

#### 3. **`marketplace_transactions` Table** (EXISTS, UNUSED ❌)
```sql
- id: uuid (PK)
- order_id: uuid (FK → orders)
- buyer_id: uuid (FK → profiles)
- seller_id: uuid (FK → profiles)
- amount: numeric
- platform_fee: numeric
- seller_amount: numeric
- status: text (default 'pending')
- stripe_charge_id: text (nullable)
- created_at: timestamp
- updated_at: timestamp
```

**Status**: Ready for payment processing
- ✅ Platform fee calculation built-in
- ❌ No Stripe integration yet
- ❌ Not used in any code

### ❌ Missing Tables

#### 1. **`order_items`** (CRITICAL - P0)
Needed to store line items for each order:
```sql
- id: uuid (PK)
- order_id: uuid (FK → orders)
- product_id: uuid (FK → products)
- quantity: integer
- unit_price: numeric
- subtotal: numeric
```

#### 2. **`marketplace_bids`** (OPTIONAL - P3)
For bidding functionality shown in UI:
```sql
- id: uuid (PK)
- product_id: uuid (FK → products)
- bidder_id: uuid (FK → profiles)
- amount: numeric
- status: text (pending, accepted, rejected, expired)
- expires_at: timestamp
```

#### 3. **`marketplace_offers`** (OPTIONAL - P3)
For seller offers shown in UI:
```sql
- id: uuid (PK)
- seller_id: uuid (FK → profiles)
- product_id: uuid (FK → products)
- offer_price: numeric
- valid_until: timestamp
- status: text
```

---

## FRONTEND ANALYSIS

### ✅ Products Page (`src/pages/Products.tsx`) - 90% Complete
**Status**: Functional with real database
- ✅ Product listing from DB
- ✅ Image upload to Supabase Storage
- ✅ Product creation
- ✅ Authentication integration
- ❌ No product editing
- ❌ No product deletion
- ❌ No search/filtering
- ❌ No "Add to Cart" button
- ❌ No product details page

### ❌ Marketplace Dashboard - 0% Complete
**Files**:
- `src/components/dashboard/MarketplaceTab.tsx`
- `src/components/dashboard/marketplace/types.ts` (MOCK DATA ❌)
- `src/components/dashboard/marketplace/OrdersTable.tsx`

**Current State**: Using hardcoded mock data
```typescript
// types.ts - lines 16-57
export const orderData: Order[] = [
  { id: "INV - 17", product: "Electronics", value: "$325", ... },
  // ... hardcoded data
];
```

**Issues**:
- ❌ No connection to real orders table
- ❌ Simulated loading (setTimeout, not real API)
- ❌ Three tabs (Received, Bids, Offers) with no backend
- ❌ No order creation flow

---

## IMPLEMENTATION PLAN

### 📋 Phase 1: Database Schema Completion (3-4 hours)

#### Task 4.1: Create Missing Tables
**Priority**: 🔴 P0 (BLOCKER)

**1.1 Create `order_items` table**
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC NOT NULL CHECK (unit_price >= 0),
  subtotal NUMERIC NOT NULL CHECK (subtotal >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
```

**1.2 Add shopping cart table** (Optional but recommended)
```sql
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);
```

**1.3 Create marketplace bids table** (For bidding feature)
```sql
CREATE TABLE marketplace_bids (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  bidder_id UUID NOT NULL REFERENCES profiles(id),
  amount NUMERIC NOT NULL CHECK (amount > 0),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'expired', 'withdrawn')),
  message TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

### 📋 Phase 2: Backend API Development (8-10 hours)

#### Task 4.2: Order Management Edge Functions
**Priority**: 🔴 P1

**2.1 Create `marketplace-orders` Edge Function**

Endpoints:
- `create_order` - Create new order from cart
- `get_order` - Get order details with items
- `get_user_orders` - List user's orders (as buyer/seller)
- `update_order_status` - Update order status
- `cancel_order` - Cancel pending order

**2.2 Create `marketplace-cart` Edge Function**

Endpoints:
- `add_to_cart` - Add product to cart
- `update_cart_item` - Update quantity
- `remove_from_cart` - Remove item
- `get_cart` - Get user's cart
- `clear_cart` - Empty cart

**2.3 Create `marketplace-products` Edge Function**

Endpoints:
- `search_products` - Search with filters
- `get_product_details` - Get single product
- `create_product` - Vendor creates product
- `update_product` - Vendor updates product
- `delete_product` - Vendor deletes product
- `get_vendor_products` - List vendor's products

#### Task 4.3: Marketplace Bids/Offers (Optional)
**Priority**: 🟡 P3

**3.1 Create `marketplace-bids` Edge Function**

Endpoints:
- `create_bid` - Submit bid on product
- `get_product_bids` - Get all bids for product
- `get_user_bids` - Get user's bids
- `accept_bid` - Seller accepts bid
- `reject_bid` - Seller rejects bid
- `withdraw_bid` - Bidder withdraws bid

---

### 📋 Phase 3: Frontend Integration (10-12 hours)

#### Task 4.4: Shopping Cart UI
**Priority**: 🔴 P1

- Add "Add to Cart" button to Products page
- Create Cart page/drawer
- Cart item management (update quantity, remove)
- Cart summary (subtotal, total)
- Checkout flow

#### Task 4.5: Order Processing UI
**Priority**: 🔴 P1

- Checkout form (shipping address)
- Order confirmation page
- Order success/failure handling
- Payment integration placeholder

#### Task 4.6: Marketplace Dashboard Backend Integration
**Priority**: 🟡 P2

- Replace mock data with real API calls
- Connect to orders table
- Show real order history
- Real-time order updates (optional)

#### Task 4.7: Product Search & Filtering
**Priority**: 🟡 P2

- Search bar component
- Category filters
- Price range filters
- Sort options (price, date, popularity)
- Pagination

#### Task 4.8: Bids/Offers UI (Optional)
**Priority**: 🟢 P3

- Bid submission form
- Bids table for sellers
- Accept/reject bid actions
- Bid notifications

---

### 📋 Phase 4: Testing (6-8 hours)

#### Task 4.9: Backend Tests
**Priority**: 🔴 P1

- Order creation tests
- Cart operations tests
- Product search tests
- Edge function integration tests

#### Task 4.10: Frontend Tests
**Priority**: 🟡 P2

- Cart component tests
- Order flow tests
- Product listing tests
- Search/filter tests

---

## EFFORT ESTIMATION

| Phase | Tasks | Estimated Hours | Priority |
|-------|-------|----------------|----------|
| Phase 1: Database Schema | 4.1 | 3-4h | 🔴 P0 |
| Phase 2: Backend API | 4.2, 4.3 | 8-10h | 🔴 P1 |
| Phase 3: Frontend Integration | 4.4, 4.5, 4.6, 4.7 | 10-12h | 🔴 P1 |
| Phase 4: Testing | 4.9, 4.10 | 6-8h | 🔴 P1 |
| **TOTAL** | | **27-34h** | **~4-5 days** |

*Excluding optional bids/offers feature (adds +6-8h)*

---

## RISKS & BLOCKERS

### Critical Blockers:
1. **Missing `order_items` table** - Cannot create orders without this
2. **No cart system** - Users can't add products to cart
3. **Mock data in marketplace** - Dashboard shows fake data

### Medium Risks:
4. **No payment processing** - Orders created but no payment yet
5. **Stock management** - No inventory deduction on purchase
6. **Concurrent orders** - Race conditions on stock

### Low Risks:
7. **Bids/offers UI exists** - But no backend support
8. **No product reviews** - Common e-commerce feature missing

---

## SUCCESS CRITERIA

- [x] Audit complete
- [ ] `order_items` table created
- [ ] Cart system functional
- [ ] Order creation working
- [ ] Marketplace dashboard shows real data
- [ ] Product search functional
- [ ] Tests passing (>80% coverage)
- [ ] No mock data in production code

---

## NEXT STEPS

**Immediate (Today):**
1. Create database migration for `order_items` table
2. Create database migration for `cart_items` table
3. Update Supabase types

**Short Term (This Week):**
4. Build `marketplace-cart` edge function
5. Build `marketplace-orders` edge function
6. Create cart UI components

**Medium Term (Next Week):**
7. Build product search/filtering
8. Connect marketplace dashboard to real data
9. Write comprehensive tests

---

**Report Created:** 2025-11-18
**Next Task:** Task 4.1 - Create Missing Database Tables
