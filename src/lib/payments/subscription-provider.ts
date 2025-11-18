/**
 * Subscription Provider Interface
 *
 * Interface for providers that support recurring subscription payments (PayPal, Stripe, etc.)
 */

import type { PaymentProvider } from './provider';
import type {
  SubscriptionPlan,
  CreateSubscriptionRequest,
  SubscriptionResponse,
  CancelSubscriptionRequest,
  UpdateSubscriptionRequest,
  ProviderResult,
  ListResult,
  Transaction,
} from './types';

/**
 * Subscription Provider Interface
 *
 * Providers that support subscription-based payments must implement this interface.
 */
export interface ISubscriptionProvider extends PaymentProvider {
  // ============================================================================
  // Plan Management
  // ============================================================================

  /**
   * List all available subscription plans
   */
  listPlans(): Promise<ListResult<SubscriptionPlan>>;

  /**
   * Get details of a specific plan
   */
  getPlan(planId: string): Promise<ProviderResult<SubscriptionPlan>>;

  /**
   * Create a new subscription plan (admin only)
   */
  createPlan?(plan: Partial<SubscriptionPlan>): Promise<ProviderResult<SubscriptionPlan>>;

  /**
   * Update an existing plan (admin only)
   */
  updatePlan?(planId: string, updates: Partial<SubscriptionPlan>): Promise<ProviderResult<SubscriptionPlan>>;

  /**
   * Deactivate a plan (admin only)
   */
  deactivatePlan?(planId: string): Promise<ProviderResult<void>>;

  // ============================================================================
  // Subscription Management
  // ============================================================================

  /**
   * Create a new subscription
   */
  createSubscription(request: CreateSubscriptionRequest): Promise<SubscriptionResponse>;

  /**
   * Get details of a specific subscription
   */
  getSubscription(subscriptionId: string): Promise<ProviderResult<SubscriptionResponse>>;

  /**
   * Get all subscriptions for the current user
   */
  getUserSubscriptions(userId: string): Promise<ListResult<Transaction>>;

  /**
   * Cancel a subscription
   */
  cancelSubscription(request: CancelSubscriptionRequest): Promise<ProviderResult<void>>;

  /**
   * Update a subscription (change plan, quantity, etc.)
   */
  updateSubscription?(request: UpdateSubscriptionRequest): Promise<ProviderResult<SubscriptionResponse>>;

  /**
   * Suspend a subscription temporarily
   */
  suspendSubscription?(subscriptionId: string, reason?: string): Promise<ProviderResult<void>>;

  /**
   * Resume a suspended subscription
   */
  resumeSubscription?(subscriptionId: string): Promise<ProviderResult<void>>;

  // ============================================================================
  // Webhook & Event Handling
  // ============================================================================

  /**
   * Verify webhook signature
   */
  verifyWebhook?(payload: string, signature: string): Promise<boolean>;

  /**
   * Process webhook event
   */
  processWebhookEvent?(event: any): Promise<void>;
}
