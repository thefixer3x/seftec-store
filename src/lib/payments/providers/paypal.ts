/**
 * PayPal Payment Provider
 *
 * Implementation of subscription provider using PayPal API.
 * Supports recurring subscription payments and plan management.
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import { PaymentProvider } from '../provider';
import type { ISubscriptionProvider } from '../subscription-provider';
import type {
  PaymentProviderConfig,
  SubscriptionPlan,
  CreateSubscriptionRequest,
  SubscriptionResponse,
  CancelSubscriptionRequest,
  UpdateSubscriptionRequest,
  ProviderResult,
  ListResult,
  Transaction,
  SubscriptionStatus,
  BillingCycle,
} from '../types';

export class PayPalProvider extends PaymentProvider implements ISubscriptionProvider {
  private edgeFunctionName = 'paypal-payment';

  constructor(supabase: SupabaseClient) {
    const config: PaymentProviderConfig = {
      type: 'paypal',
      name: 'PayPal',
      description: 'Subscription payment provider with global currency support',
      enabled: true,
      featureFlagName: 'paypal_payments',
      capabilities: [
        'subscriptions',
        'one_time_payments',
        'refunds',
        'webhooks',
      ],
    };

    super(supabase, config);
  }

  // ============================================================================
  // Base Provider Implementation
  // ============================================================================

  async initialize(): Promise<void> {
    // PayPal edge function handles OAuth token management automatically
    // No client-side initialization needed
  }

  async validateConfig(): Promise<boolean> {
    try {
      // Test edge function connectivity and PayPal credentials
      const { error } = await this.supabase.functions.invoke(this.edgeFunctionName, {
        body: { action: 'list_plans' },
      });

      return !error;
    } catch {
      return false;
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      const { data, error } = await this.supabase.functions.invoke(this.edgeFunctionName, {
        body: { action: 'list_plans' },
      });

      return !error && data?.success === true;
    } catch {
      return false;
    }
  }

  // ============================================================================
  // Plan Management
  // ============================================================================

  async listPlans(): Promise<ListResult<SubscriptionPlan>> {
    try {
      const { data, error } = await this.supabase.functions.invoke(this.edgeFunctionName, {
        body: { action: 'list_plans' },
      });

      if (error) {
        return {
          success: false,
          items: [],
          error: this.createError('LIST_PLANS_FAILED', error.message),
        };
      }

      if (!data?.success) {
        return {
          success: false,
          items: [],
          error: this.createError('LIST_PLANS_FAILED', data?.error || 'Failed to fetch plans'),
        };
      }

      const plans: SubscriptionPlan[] = (data.plans || []).map((p: any) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        status: p.status === 'ACTIVE' ? 'active' : 'inactive',
        billingCycles: this.mapBillingCycles(p.billing_cycles || []),
        createdAt: p.create_time,
      }));

      // Filter only active plans for customers
      const activePlans = plans.filter(p => p.status === 'active');

      return this.createListResult(activePlans, activePlans.length);
    } catch (err: any) {
      return {
        success: false,
        items: [],
        error: this.createError('PROVIDER_ERROR', err.message || 'Unknown error'),
      };
    }
  }

  async getPlan(planId: string): Promise<ProviderResult<SubscriptionPlan>> {
    try {
      // PayPal doesn't have a direct "get single plan" endpoint in our edge function
      // So we list all and filter
      const result = await this.listPlans();

      if (!result.success || !result.items) {
        return this.createFailure(
          result.error || this.createError('GET_PLAN_FAILED', 'Failed to fetch plan')
        );
      }

      const plan = result.items.find(p => p.id === planId);

      if (!plan) {
        return this.createFailure(
          this.createError('NOT_FOUND', `Plan ${planId} not found`)
        );
      }

      return this.createSuccess(plan);
    } catch (err: any) {
      return this.createFailure(
        this.createError('PROVIDER_ERROR', err.message)
      );
    }
  }

  async createPlan(plan: Partial<SubscriptionPlan>): Promise<ProviderResult<SubscriptionPlan>> {
    try {
      const { data, error } = await this.supabase.functions.invoke(this.edgeFunctionName, {
        body: {
          action: 'create_plan',
          product_id: plan.id, // Requires product ID
          name: plan.name,
          description: plan.description,
          billing_cycles: this.unmapBillingCycles(plan.billingCycles || []),
        },
      });

      if (error || !data?.success) {
        return this.createFailure(
          this.createError('CREATE_PLAN_FAILED', error?.message || data?.error || 'Failed to create plan')
        );
      }

      const createdPlan: SubscriptionPlan = {
        id: data.plan.id,
        name: data.plan.name,
        description: data.plan.description,
        status: data.plan.status === 'ACTIVE' ? 'active' : 'inactive',
        billingCycles: this.mapBillingCycles(data.plan.billing_cycles || []),
        createdAt: data.plan.create_time,
      };

      return this.createSuccess(createdPlan);
    } catch (err: any) {
      return this.createFailure(
        this.createError('PROVIDER_ERROR', err.message)
      );
    }
  }

  // ============================================================================
  // Subscription Management
  // ============================================================================

  async createSubscription(request: CreateSubscriptionRequest): Promise<SubscriptionResponse> {
    try {
      const { data, error } = await this.supabase.functions.invoke(this.edgeFunctionName, {
        body: {
          action: 'create_subscription',
          plan_id: request.planId,
          quantity: request.quantity || 1,
          custom_id: request.customId,
          subscriber: request.subscriber,
          return_url: request.returnUrl,
          cancel_url: request.cancelUrl,
          start_time: request.startTime,
        },
      });

      if (error || !data?.success) {
        return {
          success: false,
          subscriptionId: '',
          status: 'APPROVAL_PENDING',
          planId: request.planId,
          error: this.createError('CREATE_SUBSCRIPTION_FAILED', error?.message || data?.error || 'Failed to create subscription'),
        };
      }

      return {
        success: true,
        subscriptionId: data.subscription.id,
        status: this.mapSubscriptionStatus(data.subscription.status),
        planId: request.planId,
        approvalUrl: data.subscription.approval_url,
      };
    } catch (err: any) {
      return {
        success: false,
        subscriptionId: '',
        status: 'APPROVAL_PENDING',
        planId: request.planId,
        error: this.createError('PROVIDER_ERROR', err.message),
      };
    }
  }

  async getSubscription(subscriptionId: string): Promise<ProviderResult<SubscriptionResponse>> {
    try {
      const { data, error } = await this.supabase.functions.invoke(this.edgeFunctionName, {
        body: {
          action: 'get_subscription',
          subscription_id: subscriptionId,
        },
      });

      if (error || !data?.success) {
        return this.createFailure(
          this.createError('GET_SUBSCRIPTION_FAILED', error?.message || data?.error || 'Failed to fetch subscription')
        );
      }

      const response: SubscriptionResponse = {
        success: true,
        subscriptionId: data.subscription.id,
        status: this.mapSubscriptionStatus(data.subscription.status),
        planId: data.subscription.plan_id,
        nextBillingTime: data.subscription.next_billing_time,
      };

      return this.createSuccess(response);
    } catch (err: any) {
      return this.createFailure(
        this.createError('PROVIDER_ERROR', err.message)
      );
    }
  }

  async getUserSubscriptions(userId: string): Promise<ListResult<Transaction>> {
    try {
      const { data, error } = await this.supabase.functions.invoke(this.edgeFunctionName, {
        body: { action: 'get_user_subscriptions' },
      });

      if (error || !data?.success) {
        return {
          success: false,
          items: [],
          error: this.createError('QUERY_FAILED', error?.message || data?.error || 'Failed to fetch subscriptions'),
        };
      }

      const transactions: Transaction[] = (data.subscriptions || []).map((sub: any) => ({
        id: sub.id,
        userId: sub.user_id,
        provider: 'paypal',
        type: 'subscription',
        amount: 0, // PayPal subscriptions don't have a fixed amount in our DB
        currency: 'USD',
        status: this.mapPaymentStatus(sub.status),
        reference: sub.subscription_id,
        providerReference: sub.subscription_id,
        recipientDetails: {
          planId: sub.plan_id,
          customId: sub.custom_id,
        },
        createdAt: sub.created_at,
        completedAt: null,
        cancelledAt: sub.cancelled_at,
      }));

      return this.createListResult(transactions, transactions.length);
    } catch (err: any) {
      return {
        success: false,
        items: [],
        error: this.createError('PROVIDER_ERROR', err.message),
      };
    }
  }

  async cancelSubscription(request: CancelSubscriptionRequest): Promise<ProviderResult<void>> {
    try {
      const { data, error } = await this.supabase.functions.invoke(this.edgeFunctionName, {
        body: {
          action: 'cancel_subscription',
          subscription_id: request.subscriptionId,
          reason: request.reason,
        },
      });

      if (error || !data?.success) {
        return this.createFailure(
          this.createError('CANCEL_FAILED', error?.message || data?.error || 'Failed to cancel subscription')
        );
      }

      return this.createSuccess(undefined);
    } catch (err: any) {
      return this.createFailure(
        this.createError('PROVIDER_ERROR', err.message)
      );
    }
  }

  async updateSubscription(request: UpdateSubscriptionRequest): Promise<ProviderResult<SubscriptionResponse>> {
    try {
      const { data, error } = await this.supabase.functions.invoke(this.edgeFunctionName, {
        body: {
          action: 'update_subscription',
          subscription_id: request.subscriptionId,
          plan_id: request.planId,
          quantity: request.quantity,
        },
      });

      if (error || !data?.success) {
        return this.createFailure(
          this.createError('UPDATE_FAILED', error?.message || data?.error || 'Failed to update subscription')
        );
      }

      const response: SubscriptionResponse = {
        success: true,
        subscriptionId: request.subscriptionId,
        status: 'ACTIVE',
        planId: request.planId || '',
      };

      return this.createSuccess(response);
    } catch (err: any) {
      return this.createFailure(
        this.createError('PROVIDER_ERROR', err.message)
      );
    }
  }

  // ============================================================================
  // Webhook & Event Handling
  // ============================================================================

  async verifyWebhook(payload: string, signature: string): Promise<boolean> {
    // PayPal webhook verification would be implemented here
    // This requires webhook configuration and verification logic
    // For now, return false as it's not implemented in edge function
    return false;
  }

  async processWebhookEvent(event: any): Promise<void> {
    // Process PayPal webhook events (subscription created, cancelled, etc.)
    // This would update database records based on webhook events
    // Implementation depends on webhook structure
  }

  // ============================================================================
  // Utility Methods
  // ============================================================================

  private mapBillingCycles(rawCycles: any[]): BillingCycle[] {
    return rawCycles.map(cycle => ({
      frequency: {
        intervalUnit: cycle.frequency.interval_unit.toLowerCase(),
        intervalCount: cycle.frequency.interval_count,
      },
      tenureType: cycle.tenure_type === 'REGULAR' ? 'regular' : 'trial',
      sequence: cycle.sequence,
      totalCycles: cycle.total_cycles,
      pricingScheme: {
        fixedPrice: {
          value: cycle.pricing_scheme.fixed_price.value,
          currencyCode: cycle.pricing_scheme.fixed_price.currency_code,
        },
      },
    }));
  }

  private unmapBillingCycles(cycles: BillingCycle[]): any[] {
    return cycles.map(cycle => ({
      frequency: {
        interval_unit: cycle.frequency.intervalUnit.toUpperCase(),
        interval_count: cycle.frequency.intervalCount,
      },
      tenure_type: cycle.tenureType === 'regular' ? 'REGULAR' : 'TRIAL',
      sequence: cycle.sequence,
      total_cycles: cycle.totalCycles,
      pricing_scheme: {
        fixed_price: {
          value: cycle.pricingScheme.fixedPrice.value,
          currency_code: cycle.pricingScheme.fixedPrice.currencyCode,
        },
      },
    }));
  }

  private mapSubscriptionStatus(rawStatus: string): SubscriptionStatus {
    const statusMap: Record<string, SubscriptionStatus> = {
      'APPROVAL_PENDING': 'APPROVAL_PENDING',
      'APPROVED': 'APPROVED',
      'ACTIVE': 'ACTIVE',
      'SUSPENDED': 'SUSPENDED',
      'CANCELLED': 'CANCELLED',
      'EXPIRED': 'EXPIRED',
    };

    return statusMap[rawStatus] || 'APPROVAL_PENDING';
  }

  private mapPaymentStatus(subStatus: string): any {
    const statusMap: Record<string, string> = {
      'APPROVAL_PENDING': 'pending',
      'APPROVED': 'approved',
      'ACTIVE': 'active',
      'SUSPENDED': 'suspended',
      'CANCELLED': 'cancelled',
      'EXPIRED': 'expired',
    };

    return statusMap[subStatus] || 'pending';
  }
}
