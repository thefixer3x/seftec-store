/// <reference types="vitest" />
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { PaymentProviderRegistry, PaymentProviderFactory } from './registry';

describe('PaymentProviderRegistry', () => {
  let mockSupabase: any;

  beforeEach(() => {
    mockSupabase = {
      functions: { invoke: vi.fn() },
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
      order: vi.fn().mockReturnThis(),
    };

    // Reset singleton between tests
    PaymentProviderRegistry.reset();
  });

  afterEach(() => {
    PaymentProviderRegistry.reset();
  });

  describe('Singleton Pattern', () => {
    it('should return same instance', () => {
      const registry1 = PaymentProviderRegistry.getInstance(mockSupabase);
      const registry2 = PaymentProviderRegistry.getInstance(mockSupabase);
      expect(registry1).toBe(registry2);
    });

    it('should reset singleton', () => {
      const registry1 = PaymentProviderRegistry.getInstance(mockSupabase);
      PaymentProviderRegistry.reset();
      const registry2 = PaymentProviderRegistry.getInstance(mockSupabase);
      expect(registry1).not.toBe(registry2);
    });
  });

  describe('Initialization', () => {
    it('should initialize providers', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: true },
        error: null,
      });

      const registry = PaymentProviderRegistry.getInstance(mockSupabase);
      await registry.initialize();

      const paypal = registry.getProvider('paypal');
      const sayswitch = registry.getProvider('sayswitch');

      expect(paypal).toBeDefined();
      expect(sayswitch).toBeDefined();
    });

    it('should not initialize twice', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: true },
        error: null,
      });

      const registry = PaymentProviderRegistry.getInstance(mockSupabase);
      await registry.initialize();
      await registry.initialize(); // Second call should be no-op

      const providers = registry.getAllProviders();
      expect(providers.length).toBeGreaterThan(0);
    });

    it('should handle initialization errors gracefully', async () => {
      mockSupabase.functions.invoke.mockRejectedValue(new Error('Init error'));

      const registry = PaymentProviderRegistry.getInstance(mockSupabase);

      // Should not throw - provider initialization errors are caught and logged
      await expect(registry.initialize()).resolves.toBeUndefined();

      // Providers should still be registered even if init fails
      const providers = registry.getAllProviders();
      expect(providers.length).toBeGreaterThan(0);
    });
  });

  describe('Get Providers', () => {
    beforeEach(async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: true },
        error: null,
      });

      const registry = PaymentProviderRegistry.getInstance(mockSupabase);
      await registry.initialize();
    });

    it('should get provider by type', () => {
      const registry = PaymentProviderRegistry.getInstance(mockSupabase);

      const paypal = registry.getProvider('paypal');
      expect(paypal?.getType()).toBe('paypal');

      const sayswitch = registry.getProvider('sayswitch');
      expect(sayswitch?.getType()).toBe('sayswitch');
    });

    it('should return undefined for invalid provider', () => {
      const registry = PaymentProviderRegistry.getInstance(mockSupabase);
      const invalid = registry.getProvider('invalid' as any);
      expect(invalid).toBeUndefined();
    });

    it('should get all providers', () => {
      const registry = PaymentProviderRegistry.getInstance(mockSupabase);
      const providers = registry.getAllProviders();
      expect(providers.length).toBeGreaterThan(0);
      expect(providers.some(p => p.getType() === 'paypal')).toBe(true);
      expect(providers.some(p => p.getType() === 'sayswitch')).toBe(true);
    });

    it('should get enabled providers', () => {
      const registry = PaymentProviderRegistry.getInstance(mockSupabase);
      const enabled = registry.getEnabledProviders();
      expect(enabled.every(p => p.isEnabled())).toBe(true);
    });
  });

  describe('Subscription Providers', () => {
    beforeEach(async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: true },
        error: null,
      });

      const registry = PaymentProviderRegistry.getInstance(mockSupabase);
      await registry.initialize();
    });

    it('should get subscription provider', () => {
      const registry = PaymentProviderRegistry.getInstance(mockSupabase);
      const paypal = registry.getSubscriptionProvider('paypal');

      expect(paypal).toBeDefined();
      expect(paypal?.supports('subscriptions')).toBe(true);
    });

    it('should return undefined for non-subscription provider', () => {
      const registry = PaymentProviderRegistry.getInstance(mockSupabase);
      const sayswitch = registry.getSubscriptionProvider('sayswitch');

      expect(sayswitch).toBeUndefined();
    });

    it('should get all subscription providers', () => {
      const registry = PaymentProviderRegistry.getInstance(mockSupabase);
      const subscriptionProviders = registry.getSubscriptionProviders();

      expect(subscriptionProviders.length).toBeGreaterThan(0);
      expect(subscriptionProviders.every(p => p.supports('subscriptions'))).toBe(true);
    });
  });

  describe('Bill Payment Providers', () => {
    beforeEach(async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: true },
        error: null,
      });

      const registry = PaymentProviderRegistry.getInstance(mockSupabase);
      await registry.initialize();
    });

    it('should get bill payment provider', () => {
      const registry = PaymentProviderRegistry.getInstance(mockSupabase);
      const sayswitch = registry.getBillPaymentProvider('sayswitch');

      expect(sayswitch).toBeDefined();
      expect(sayswitch?.supports('bill_payments')).toBe(true);
    });

    it('should return undefined for non-bill-payment provider', () => {
      const registry = PaymentProviderRegistry.getInstance(mockSupabase);
      const paypal = registry.getBillPaymentProvider('paypal');

      expect(paypal).toBeUndefined();
    });

    it('should get all bill payment providers', () => {
      const registry = PaymentProviderRegistry.getInstance(mockSupabase);
      const billProviders = registry.getBillPaymentProviders();

      expect(billProviders.length).toBeGreaterThan(0);
      expect(billProviders.every(p => p.supports('bill_payments'))).toBe(true);
    });
  });

  describe('Capability Filtering', () => {
    beforeEach(async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: true },
        error: null,
      });

      const registry = PaymentProviderRegistry.getInstance(mockSupabase);
      await registry.initialize();
    });

    it('should filter providers by capability', () => {
      const registry = PaymentProviderRegistry.getInstance(mockSupabase);

      const airtimeProviders = registry.getProvidersByCapability('airtime');
      expect(airtimeProviders.every(p => p.supports('airtime'))).toBe(true);

      const subscriptionProviders = registry.getProvidersByCapability('subscriptions');
      expect(subscriptionProviders.every(p => p.supports('subscriptions'))).toBe(true);
    });

    it('should return empty array for unsupported capability', () => {
      const registry = PaymentProviderRegistry.getInstance(mockSupabase);
      const providers = registry.getProvidersByCapability('unsupported' as any);
      expect(providers).toEqual([]);
    });
  });

  describe('Health Check', () => {
    beforeEach(async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: true },
        error: null,
      });

      const registry = PaymentProviderRegistry.getInstance(mockSupabase);
      await registry.initialize();
    });

    it('should run health check for all providers', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: true },
        error: null,
      });

      const registry = PaymentProviderRegistry.getInstance(mockSupabase);
      const results = await registry.healthCheckAll();

      expect(results.size).toBeGreaterThan(0);
      expect(results.has('paypal')).toBe(true);
      expect(results.has('sayswitch')).toBe(true);
    });

    it('should handle health check failures', async () => {
      mockSupabase.functions.invoke.mockRejectedValue(new Error('Health check failed'));

      const registry = PaymentProviderRegistry.getInstance(mockSupabase);
      const results = await registry.healthCheckAll();

      // All should fail
      expect(Array.from(results.values()).every(v => v === false)).toBe(true);
    });
  });
});

describe('PaymentProviderFactory', () => {
  let mockSupabase: any;

  beforeEach(() => {
    mockSupabase = {
      functions: { invoke: vi.fn() },
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
    };
  });

  describe('Provider Creation', () => {
    it('should create PayPal provider', () => {
      const provider = PaymentProviderFactory.createPayPalProvider(mockSupabase);
      expect(provider.getType()).toBe('paypal');
      expect(provider.getName()).toBe('PayPal');
    });

    it('should create SaySwitch provider', () => {
      const provider = PaymentProviderFactory.createSaySwitchProvider(mockSupabase);
      expect(provider.getType()).toBe('sayswitch');
      expect(provider.getName()).toBe('SaySwitch');
    });

    it('should create provider by type', () => {
      const paypal = PaymentProviderFactory.createProvider('paypal', mockSupabase);
      expect(paypal?.getType()).toBe('paypal');

      const sayswitch = PaymentProviderFactory.createProvider('sayswitch', mockSupabase);
      expect(sayswitch?.getType()).toBe('sayswitch');
    });

    it('should return null for invalid type', () => {
      const invalid = PaymentProviderFactory.createProvider('invalid' as any, mockSupabase);
      expect(invalid).toBeNull();
    });
  });

  describe('Get Registry', () => {
    it('should get registry instance', () => {
      const registry1 = PaymentProviderFactory.getRegistry(mockSupabase);
      const registry2 = PaymentProviderFactory.getRegistry(mockSupabase);
      expect(registry1).toBe(registry2);
    });
  });
});
