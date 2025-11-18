/**
 * Payment Provider Types
 *
 * Unified type system for all payment providers (PayPal, SaySwitch, etc.)
 * Supports both subscription-based and one-time payment models.
 */

// ============================================================================
// Provider Metadata
// ============================================================================

export type PaymentProviderType = 'paypal' | 'sayswitch' | 'stripe' | 'flutterwave';

export interface PaymentProviderConfig {
  type: PaymentProviderType;
  name: string;
  description: string;
  enabled: boolean;
  featureFlagName?: string;
  capabilities: PaymentCapability[];
}

export type PaymentCapability =
  | 'subscriptions'           // Recurring payments
  | 'one_time_payments'       // One-time payments
  | 'bill_payments'           // Utility bill payments
  | 'airtime'                 // Mobile airtime
  | 'data'                    // Mobile data
  | 'tv'                      // Cable/TV subscriptions
  | 'electricity'             // Electricity bills
  | 'refunds'                 // Payment refunds
  | 'webhooks';               // Webhook support

// ============================================================================
// Payment Request/Response Types
// ============================================================================

export interface PaymentRequest {
  amount: number;
  currency: string;
  description?: string;
  metadata?: Record<string, any>;
  customerId?: string;
  returnUrl?: string;
  cancelUrl?: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  approvalUrl?: string;
  metadata?: Record<string, any>;
  error?: PaymentError;
}

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'approved'
  | 'active'
  | 'completed'
  | 'cancelled'
  | 'failed'
  | 'suspended'
  | 'expired';

export interface PaymentError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// ============================================================================
// Subscription Types (PayPal, Stripe, etc.)
// ============================================================================

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  billingCycles: BillingCycle[];
  createdAt: string;
}

export interface BillingCycle {
  frequency: {
    intervalUnit: 'day' | 'week' | 'month' | 'year';
    intervalCount: number;
  };
  tenureType: 'regular' | 'trial';
  sequence: number;
  totalCycles: number;
  pricingScheme: {
    fixedPrice: {
      value: string;
      currencyCode: string;
    };
  };
}

export interface CreateSubscriptionRequest {
  planId: string;
  quantity?: number;
  customId?: string;
  subscriber?: {
    givenName?: string;
    surname?: string;
    emailAddress?: string;
  };
  returnUrl?: string;
  cancelUrl?: string;
  startTime?: string;
}

export interface SubscriptionResponse {
  success: boolean;
  subscriptionId: string;
  status: SubscriptionStatus;
  planId: string;
  approvalUrl?: string;
  nextBillingTime?: string;
  error?: PaymentError;
}

export type SubscriptionStatus =
  | 'APPROVAL_PENDING'
  | 'APPROVED'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'CANCELLED'
  | 'EXPIRED';

export interface CancelSubscriptionRequest {
  subscriptionId: string;
  reason?: string;
}

export interface UpdateSubscriptionRequest {
  subscriptionId: string;
  planId?: string;
  quantity?: number;
}

// ============================================================================
// Bill Payment Types (SaySwitch, etc.)
// ============================================================================

export type BillCategory = 'airtime' | 'data' | 'tv' | 'electricity';

export interface BillProvider {
  id: string;
  name: string;
  code: string;
  category: BillCategory;
  logo?: string;
}

export interface DataPlan {
  id: string;
  name: string;
  code: string;
  amount: number;
  validity: string;
  provider: string;
}

export interface TVPackage {
  id: string;
  name: string;
  code: string;
  amount: number;
  duration: string;
  provider: string;
}

export interface BillPaymentRequest {
  category: BillCategory;
  provider: string;
  customerId: string;  // Phone, smartcard, meter number
  amount?: number;
  planCode?: string;
  packageCode?: string;
  meterType?: 'prepaid' | 'postpaid';
  saveAsFavorite?: boolean;
  nickname?: string;
}

export interface BillPaymentResponse {
  success: boolean;
  reference: string;
  status: PaymentStatus;
  amount: number;
  provider: string;
  token?: string;  // For electricity
  error?: PaymentError;
}

export interface CustomerValidationRequest {
  provider: string;
  customerId: string;
}

export interface CustomerValidationResponse {
  success: boolean;
  customerName?: string;
  customerInfo?: Record<string, any>;
  error?: PaymentError;
}

export interface BillFavorite {
  id: string;
  type: BillCategory;
  provider: string;
  customerId: string;
  nickname: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

// ============================================================================
// Transaction History Types
// ============================================================================

export interface Transaction {
  id: string;
  userId: string;
  provider: PaymentProviderType;
  type: 'subscription' | 'bill' | 'payment';
  category?: BillCategory;
  amount: number;
  currency: string;
  status: PaymentStatus;
  reference: string;
  providerReference?: string;
  recipientDetails?: Record<string, any>;
  createdAt: string;
  completedAt?: string;
  cancelledAt?: string;
}

// ============================================================================
// Provider Response Wrappers
// ============================================================================

export interface ProviderResult<T> {
  success: boolean;
  data?: T;
  error?: PaymentError;
}

export interface ListResult<T> {
  success: boolean;
  items: T[];
  total?: number;
  hasMore?: boolean;
  error?: PaymentError;
}
