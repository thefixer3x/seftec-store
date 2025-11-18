/// <reference types="vitest" />
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PayPalProvider } from './paypal';

describe('PayPalProvider', () => {
  let provider: PayPalProvider;
  let mockSupabase: any;

  beforeEach(() => {
    mockSupabase = {
      functions: {
        invoke: vi.fn(),
      },
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
      order: vi.fn().mockReturnThis(),
    };

    provider = new PayPalProvider(mockSupabase);
  });

  describe('Provider Configuration', () => {
    it('should have correct provider metadata', () => {
      expect(provider.getType()).toBe('paypal');
      expect(provider.getName()).toBe('PayPal');
      expect(provider.isEnabled()).toBe(true);
    });

    it('should support subscription capabilities', () => {
      expect(provider.supports('subscriptions')).toBe(true);
      expect(provider.supports('one_time_payments')).toBe(true);
      expect(provider.supports('refunds')).toBe(true);
      expect(provider.supports('webhooks')).toBe(true);
    });

    it('should not support bill payment capabilities', () => {
      expect(provider.supports('bill_payments')).toBe(false);
      expect(provider.supports('airtime')).toBe(false);
    });
  });

  describe('Health Check', () => {
    it('should return true when edge function is healthy', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: true, plans: [] },
        error: null,
      });

      const healthy = await provider.healthCheck();
      expect(healthy).toBe(true);
    });

    it('should return false on error', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: null,
        error: { message: 'Error' },
      });

      const healthy = await provider.healthCheck();
      expect(healthy).toBe(false);
    });
  });

  describe('List Plans', () => {
    it('should list active subscription plans', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: {
          success: true,
          plans: [
            {
              id: 'P-123',
              name: 'Basic Plan',
              description: 'Basic subscription',
              status: 'ACTIVE',
              create_time: '2025-01-01T00:00:00Z',
              billing_cycles: [
                {
                  frequency: { interval_unit: 'MONTH', interval_count: 1 },
                  tenure_type: 'REGULAR',
                  sequence: 1,
                  total_cycles: 0,
                  pricing_scheme: {
                    fixed_price: { value: '9.99', currency_code: 'USD' },
                  },
                },
              ],
            },
          ],
        },
        error: null,
      });

      const result = await provider.listPlans();

      expect(result.success).toBe(true);
      expect(result.items).toHaveLength(1);
      expect(result.items[0].name).toBe('Basic Plan');
      expect(result.items[0].status).toBe('active');
    });

    it('should filter out inactive plans', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: {
          success: true,
          plans: [
            { id: 'P-1', name: 'Active', status: 'ACTIVE', billing_cycles: [] },
            { id: 'P-2', name: 'Inactive', status: 'INACTIVE', billing_cycles: [] },
          ],
        },
        error: null,
      });

      const result = await provider.listPlans();

      expect(result.items).toHaveLength(1);
      expect(result.items[0].name).toBe('Active');
    });

    it('should handle list plans error', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: null,
        error: { message: 'API error' },
      });

      const result = await provider.listPlans();

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('LIST_PLANS_FAILED');
    });
  });

  describe('Get Plan', () => {
    it('should get a specific plan by ID', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: {
          success: true,
          plans: [
            {
              id: 'P-123',
              name: 'Target Plan',
              status: 'ACTIVE',
              billing_cycles: [],
            },
          ],
        },
        error: null,
      });

      const result = await provider.getPlan('P-123');

      expect(result.success).toBe(true);
      expect(result.data?.id).toBe('P-123');
    });

    it('should handle plan not found', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: true, plans: [] },
        error: null,
      });

      const result = await provider.getPlan('P-999');

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('NOT_FOUND');
    });
  });

  describe('Create Subscription', () => {
    it('should create subscription successfully', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: {
          success: true,
          subscription: {
            id: 'I-123',
            status: 'APPROVAL_PENDING',
            approval_url: 'https://paypal.com/approve/123',
          },
        },
        error: null,
      });

      const result = await provider.createSubscription({
        planId: 'P-123',
        returnUrl: 'https://example.com/success',
        cancelUrl: 'https://example.com/cancel',
      });

      expect(result.success).toBe(true);
      expect(result.subscriptionId).toBe('I-123');
      expect(result.approvalUrl).toBe('https://paypal.com/approve/123');
    });

    it('should handle subscription creation error', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: false, error: 'Invalid plan' },
        error: null,
      });

      const result = await provider.createSubscription({
        planId: 'INVALID',
        returnUrl: 'https://example.com/success',
        cancelUrl: 'https://example.com/cancel',
      });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('Get Subscription', () => {
    it('should get subscription details', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: {
          success: true,
          subscription: {
            id: 'I-123',
            status: 'ACTIVE',
            plan_id: 'P-123',
            next_billing_time: '2025-02-01T00:00:00Z',
          },
        },
        error: null,
      });

      const result = await provider.getSubscription('I-123');

      expect(result.success).toBe(true);
      expect(result.data?.subscriptionId).toBe('I-123');
      expect(result.data?.status).toBe('ACTIVE');
    });

    it('should handle subscription not found', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: false, error: 'Not found' },
        error: null,
      });

      const result = await provider.getSubscription('INVALID');

      expect(result.success).toBe(false);
    });
  });

  describe('Get User Subscriptions', () => {
    it('should fetch user subscriptions', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: {
          success: true,
          subscriptions: [
            {
              id: '1',
              user_id: 'user123',
              subscription_id: 'I-123',
              plan_id: 'P-123',
              status: 'ACTIVE',
              created_at: '2025-01-01T00:00:00Z',
            },
          ],
        },
        error: null,
      });

      const result = await provider.getUserSubscriptions('user123');

      expect(result.success).toBe(true);
      expect(result.items).toHaveLength(1);
      expect(result.items[0].reference).toBe('I-123');
    });
  });

  describe('Cancel Subscription', () => {
    it('should cancel subscription successfully', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: true },
        error: null,
      });

      const result = await provider.cancelSubscription({
        subscriptionId: 'I-123',
        reason: 'Customer request',
      });

      expect(result.success).toBe(true);
      expect(mockSupabase.functions.invoke).toHaveBeenCalledWith(
        'paypal-payment',
        expect.objectContaining({
          body: expect.objectContaining({
            action: 'cancel_subscription',
            subscription_id: 'I-123',
            reason: 'Customer request',
          }),
        })
      );
    });

    it('should handle cancellation error', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: false, error: 'Cannot cancel' },
        error: null,
      });

      const result = await provider.cancelSubscription({
        subscriptionId: 'I-123',
      });

      expect(result.success).toBe(false);
    });
  });

  describe('Update Subscription', () => {
    it('should update subscription successfully', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: true },
        error: null,
      });

      const result = await provider.updateSubscription({
        subscriptionId: 'I-123',
        planId: 'P-456',
      });

      expect(result.success).toBe(true);
    });
  });

  describe('Billing Cycles Mapping', () => {
    it('should map billing cycles correctly', async () => {
      const paypalCycle = {
        frequency: { interval_unit: 'MONTH', interval_count: 1 },
        tenure_type: 'REGULAR',
        sequence: 1,
        total_cycles: 0,
        pricing_scheme: {
          fixed_price: { value: '9.99', currency_code: 'USD' },
        },
      };

      mockSupabase.functions.invoke.mockResolvedValue({
        data: {
          success: true,
          plans: [
            {
              id: 'P-123',
              name: 'Test',
              status: 'ACTIVE',
              billing_cycles: [paypalCycle],
            },
          ],
        },
        error: null,
      });

      const result = await provider.listPlans();
      const cycle = result.items[0].billingCycles[0];

      expect(cycle.frequency.intervalUnit).toBe('month');
      expect(cycle.frequency.intervalCount).toBe(1);
      expect(cycle.tenureType).toBe('regular');
      expect(cycle.pricingScheme.fixedPrice.value).toBe('9.99');
    });
  });

  describe('Status Mapping', () => {
    it('should map subscription statuses correctly', async () => {
      const statuses = ['ACTIVE', 'APPROVAL_PENDING', 'CANCELLED', 'SUSPENDED'];

      for (const status of statuses) {
        mockSupabase.functions.invoke.mockResolvedValue({
          data: {
            success: true,
            subscription: {
              id: 'I-123',
              status,
              plan_id: 'P-123',
            },
          },
          error: null,
        });

        const result = await provider.getSubscription('I-123');
        expect(result.data?.status).toBe(status);
      }
    });
  });
});
