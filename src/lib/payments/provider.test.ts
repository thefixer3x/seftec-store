/// <reference types="vitest" />
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PaymentProvider } from './provider';
import type { PaymentProviderConfig, PaymentCapability } from './types';

// Create a concrete test class
class TestProvider extends PaymentProvider {
  async initialize(): Promise<void> {
    // Mock implementation
  }

  async validateConfig(): Promise<boolean> {
    return true;
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }
}

describe('PaymentProvider', () => {
  let provider: TestProvider;
  let mockSupabase: any;
  let config: PaymentProviderConfig;

  beforeEach(() => {
    mockSupabase = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
    };

    config = {
      type: 'paypal',
      name: 'Test Provider',
      description: 'Test payment provider',
      enabled: true,
      featureFlagName: 'test_payment',
      capabilities: ['subscriptions', 'one_time_payments'],
    };

    provider = new TestProvider(mockSupabase, config);
  });

  describe('Provider Metadata', () => {
    it('should return provider type', () => {
      expect(provider.getType()).toBe('paypal');
    });

    it('should return provider name', () => {
      expect(provider.getName()).toBe('Test Provider');
    });

    it('should return provider description', () => {
      expect(provider.getDescription()).toBe('Test payment provider');
    });

    it('should check if provider is enabled', () => {
      expect(provider.isEnabled()).toBe(true);
    });

    it('should return false when provider is disabled', () => {
      config.enabled = false;
      const disabledProvider = new TestProvider(mockSupabase, config);
      expect(disabledProvider.isEnabled()).toBe(false);
    });
  });

  describe('Capability Checking', () => {
    it('should support declared capabilities', () => {
      expect(provider.supports('subscriptions')).toBe(true);
      expect(provider.supports('one_time_payments')).toBe(true);
    });

    it('should not support undeclared capabilities', () => {
      expect(provider.supports('bill_payments')).toBe(false);
      expect(provider.supports('airtime')).toBe(false);
    });

    it('should return all capabilities', () => {
      const capabilities = provider.getCapabilities();
      expect(capabilities).toEqual(['subscriptions', 'one_time_payments']);
    });

    it('should handle empty capabilities', () => {
      config.capabilities = [];
      const emptyProvider = new TestProvider(mockSupabase, config);
      expect(emptyProvider.getCapabilities()).toEqual([]);
      expect(emptyProvider.supports('subscriptions')).toBe(false);
    });
  });

  describe('Feature Flag Integration', () => {
    it('should return true when no feature flag is configured', async () => {
      config.featureFlagName = undefined;
      const noFlagProvider = new TestProvider(mockSupabase, config);
      const result = await noFlagProvider.checkFeatureFlag();
      expect(result).toBe(true);
    });

    it('should check feature flag when configured', async () => {
      mockSupabase.single.mockResolvedValue({
        data: { enabled: true, rollout_pct: 100 },
        error: null,
      });

      const result = await provider.checkFeatureFlag();

      expect(mockSupabase.from).toHaveBeenCalledWith('feature_flags');
      expect(mockSupabase.select).toHaveBeenCalledWith('enabled, rollout_pct');
      expect(mockSupabase.eq).toHaveBeenCalledWith('name', 'test_payment');
      expect(result).toBe(true);
    });

    it('should return false when feature flag is disabled', async () => {
      mockSupabase.single.mockResolvedValue({
        data: { enabled: false, rollout_pct: 100 },
        error: null,
      });

      const result = await provider.checkFeatureFlag();
      expect(result).toBe(false);
    });

    it('should handle rollout percentage', async () => {
      mockSupabase.single.mockResolvedValue({
        data: { enabled: true, rollout_pct: 50 },
        error: null,
      });

      // Test with many user IDs to ensure statistical distribution
      const userIds = Array.from({ length: 100 }, (_, i) => `user${i}`);
      const results = await Promise.all(
        userIds.map(id => provider.checkFeatureFlag(id))
      );

      const trueCount = results.filter(r => r).length;
      const falseCount = results.filter(r => !r).length;

      // With 50% rollout and 100 users, we expect roughly 50% true/false
      // Allow for some variance (30-70%)
      expect(trueCount).toBeGreaterThan(30);
      expect(trueCount).toBeLessThan(70);
      expect(falseCount).toBeGreaterThan(30);
      expect(falseCount).toBeLessThan(70);
    });

    it('should handle rollout percentage of 0', async () => {
      mockSupabase.single.mockResolvedValue({
        data: { enabled: true, rollout_pct: 0 },
        error: null,
      });

      const result = await provider.checkFeatureFlag('user123');
      expect(result).toBe(false);
    });

    it('should handle rollout percentage of 100', async () => {
      mockSupabase.single.mockResolvedValue({
        data: { enabled: true, rollout_pct: 100 },
        error: null,
      });

      const result = await provider.checkFeatureFlag('user123');
      expect(result).toBe(true);
    });

    it('should return false on feature flag query error', async () => {
      mockSupabase.single.mockRejectedValue(new Error('Database error'));

      const result = await provider.checkFeatureFlag();
      expect(result).toBe(false);
    });

    it('should use consistent hashing for same user', async () => {
      mockSupabase.single.mockResolvedValue({
        data: { enabled: true, rollout_pct: 50 },
        error: null,
      });

      const result1 = await provider.checkFeatureFlag('user123');
      const result2 = await provider.checkFeatureFlag('user123');
      const result3 = await provider.checkFeatureFlag('user123');

      // Same user should always get same result
      expect(result1).toBe(result2);
      expect(result2).toBe(result3);
    });
  });

  describe('Error Handling', () => {
    it('should create error object with code and message', () => {
      const error = (provider as any).createError('TEST_ERROR', 'Test error message');
      expect(error).toEqual({
        code: 'TEST_ERROR',
        message: 'Test error message',
        details: undefined,
      });
    });

    it('should create error with details', () => {
      const error = (provider as any).createError(
        'VALIDATION_ERROR',
        'Validation failed',
        { field: 'email', value: 'invalid' }
      );
      expect(error).toEqual({
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { field: 'email', value: 'invalid' },
      });
    });

    it('should create failure result', () => {
      const error = (provider as any).createError('FAILED', 'Operation failed');
      const result = (provider as any).createFailure(error);
      expect(result).toEqual({
        success: false,
        error,
      });
    });

    it('should create success result', () => {
      const data = { id: '123', name: 'Test' };
      const result = (provider as any).createSuccess(data);
      expect(result).toEqual({
        success: true,
        data,
      });
    });

    it('should create list result', () => {
      const items = [{ id: '1' }, { id: '2' }];
      const result = (provider as any).createListResult(items, 2, false);
      expect(result).toEqual({
        success: true,
        items,
        total: 2,
        hasMore: false,
      });
    });

    it('should create list result without optional params', () => {
      const items = [{ id: '1' }];
      const result = (provider as any).createListResult(items);
      expect(result).toEqual({
        success: true,
        items,
        total: undefined,
        hasMore: undefined,
      });
    });
  });

  describe('User Hashing', () => {
    it('should hash user ID consistently', () => {
      const hash1 = (provider as any).hashUserId('user123');
      const hash2 = (provider as any).hashUserId('user123');
      expect(hash1).toBe(hash2);
    });

    it('should produce different hashes for different users', () => {
      const hash1 = (provider as any).hashUserId('user123');
      const hash2 = (provider as any).hashUserId('user456');
      expect(hash1).not.toBe(hash2);
    });

    it('should always return positive numbers', () => {
      const hash1 = (provider as any).hashUserId('user123');
      const hash2 = (provider as any).hashUserId('another-user');
      expect(hash1).toBeGreaterThanOrEqual(0);
      expect(hash2).toBeGreaterThanOrEqual(0);
    });

    it('should handle long user IDs', () => {
      const longId = 'a'.repeat(100);
      const hash = (provider as any).hashUserId(longId);
      expect(typeof hash).toBe('number');
      expect(hash).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Abstract Methods', () => {
    it('should require implementation of initialize', async () => {
      await expect(provider.initialize()).resolves.toBeUndefined();
    });

    it('should require implementation of validateConfig', async () => {
      await expect(provider.validateConfig()).resolves.toBe(true);
    });

    it('should require implementation of healthCheck', async () => {
      await expect(provider.healthCheck()).resolves.toBe(true);
    });
  });
});
