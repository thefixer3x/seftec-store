/// <reference types="vitest" />
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SaySwitchProvider } from './sayswitch';

describe('SaySwitchProvider', () => {
  let provider: SaySwitchProvider;
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
      contains: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
    };

    provider = new SaySwitchProvider(mockSupabase);
  });

  describe('Provider Configuration', () => {
    it('should have correct provider metadata', () => {
      expect(provider.getType()).toBe('sayswitch');
      expect(provider.getName()).toBe('SaySwitch');
      expect(provider.isEnabled()).toBe(true);
    });

    it('should support bill payment capabilities', () => {
      expect(provider.supports('bill_payments')).toBe(true);
      expect(provider.supports('airtime')).toBe(true);
      expect(provider.supports('data')).toBe(true);
      expect(provider.supports('tv')).toBe(true);
      expect(provider.supports('electricity')).toBe(true);
    });

    it('should not support subscription capabilities', () => {
      expect(provider.supports('subscriptions')).toBe(false);
    });
  });

  describe('Health Check', () => {
    it('should return true when edge function is healthy', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: true, providers: [] },
        error: null,
      });

      const healthy = await provider.healthCheck();
      expect(healthy).toBe(true);
    });

    it('should return false when edge function has error', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: null,
        error: { message: 'Network error' },
      });

      const healthy = await provider.healthCheck();
      expect(healthy).toBe(false);
    });

    it('should return false when edge function returns non-success', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: false, error: 'Service unavailable' },
        error: null,
      });

      const healthy = await provider.healthCheck();
      expect(healthy).toBe(false);
    });
  });

  describe('Get Providers', () => {
    it('should fetch airtime providers successfully', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: {
          success: true,
          providers: [
            { code: 'MTN', name: 'MTN Nigeria' },
            { code: 'AIRTEL', name: 'Airtel' },
          ],
        },
        error: null,
      });

      const result = await provider.getProviders('airtime');

      expect(result.success).toBe(true);
      expect(result.items).toHaveLength(2);
      expect(result.items[0]).toMatchObject({
        code: 'MTN',
        name: 'MTN Nigeria',
        category: 'airtime',
      });
    });

    it('should handle empty provider list', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: true, providers: [] },
        error: null,
      });

      const result = await provider.getProviders('airtime');

      expect(result.success).toBe(true);
      expect(result.items).toHaveLength(0);
    });

    it('should handle provider fetch error', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: null,
        error: { message: 'API error' },
      });

      const result = await provider.getProviders('data');

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error?.code).toBe('GET_PROVIDERS_FAILED');
    });
  });

  describe('Get Data Plans', () => {
    it('should fetch data plans successfully', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: {
          success: true,
          plans: [
            {
              code: 'MTN-1GB',
              name: '1GB Monthly',
              amount: 500,
              validity: '30 days',
            },
          ],
        },
        error: null,
      });

      const result = await provider.getDataPlans('MTN');

      expect(result.success).toBe(true);
      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toMatchObject({
        code: 'MTN-1GB',
        name: '1GB Monthly',
        amount: 500,
        provider: 'MTN',
      });
    });

    it('should handle missing plans', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: false, error: 'Provider not found' },
        error: null,
      });

      const result = await provider.getDataPlans('INVALID');

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('Get TV Packages', () => {
    it('should fetch TV packages successfully', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: {
          success: true,
          packages: [
            {
              code: 'DSTV-COMPACT',
              name: 'DStv Compact',
              amount: 9000,
              duration: '1 month',
            },
          ],
        },
        error: null,
      });

      const result = await provider.getTVPackages('DSTV');

      expect(result.success).toBe(true);
      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toMatchObject({
        code: 'DSTV-COMPACT',
        name: 'DStv Compact',
        amount: 9000,
        provider: 'DSTV',
      });
    });
  });

  describe('Validate Customer', () => {
    it('should validate customer successfully', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: {
          success: true,
          customer: {
            name: 'John Doe',
            address: '123 Main St',
          },
        },
        error: null,
      });

      const result = await provider.validateCustomer({
        provider: 'DSTV',
        customerId: '1234567890',
      });

      expect(result.success).toBe(true);
      expect(result.customerName).toBe('John Doe');
      expect(result.customerInfo).toBeDefined();
    });

    it('should handle invalid customer', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: {
          success: false,
          error: 'Customer not found',
        },
        error: null,
      });

      const result = await provider.validateCustomer({
        provider: 'DSTV',
        customerId: 'INVALID',
      });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('Pay Airtime', () => {
    it('should pay airtime successfully', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: {
          success: true,
          reference: 'AIRTIME-123',
          transaction: { status: 'success' },
        },
        error: null,
      });

      const result = await provider.payAirtime('08012345678', 100, 'MTN');

      expect(result.success).toBe(true);
      expect(result.reference).toBe('AIRTIME-123');
      expect(result.status).toBe('completed');
      expect(result.amount).toBe(100);
      expect(result.provider).toBe('MTN');
    });

    it('should handle airtime payment failure', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: {
          success: false,
          error: 'Insufficient balance',
        },
        error: null,
      });

      const result = await provider.payAirtime('08012345678', 100, 'MTN');

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error?.message).toBe('Insufficient balance');
      expect(result.error?.code).toBe('PAYMENT_FAILED');
    });
  });

  describe('Pay Data', () => {
    it('should pay data successfully', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: {
          success: true,
          reference: 'DATA-456',
          transaction: { status: 'success', amount: 500 },
        },
        error: null,
      });

      const result = await provider.payData('08012345678', 'MTN', 'MTN-1GB');

      expect(result.success).toBe(true);
      expect(result.reference).toBe('DATA-456');
      expect(result.status).toBe('completed');
      expect(result.amount).toBe(500);
    });

    it('should handle data payment failure', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: null,
        error: { message: 'Network error' },
      });

      const result = await provider.payData('08012345678', 'MTN', 'MTN-1GB');

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('Pay TV', () => {
    it('should pay TV subscription successfully', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: {
          success: true,
          reference: 'TV-789',
          transaction: { status: 'success', amount: 9000 },
        },
        error: null,
      });

      const result = await provider.payTV('1234567890', 'DSTV', 'DSTV-COMPACT');

      expect(result.success).toBe(true);
      expect(result.reference).toBe('TV-789');
      expect(result.status).toBe('completed');
    });
  });

  describe('Pay Electricity', () => {
    it('should pay electricity successfully', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: {
          success: true,
          reference: 'POWER-001',
          transaction: { status: 'success' },
          token: '1234-5678-9012',
        },
        error: null,
      });

      const result = await provider.payElectricity('1234567890', 'EKEDC', 5000);

      expect(result.success).toBe(true);
      expect(result.reference).toBe('POWER-001');
      expect(result.token).toBe('1234-5678-9012');
      expect(result.amount).toBe(5000);
    });

    it('should handle different meter types', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: {
          success: true,
          reference: 'POWER-002',
          transaction: { status: 'success' },
        },
        error: null,
      });

      await provider.payElectricity('1234567890', 'EKEDC', 5000, 'postpaid');

      expect(mockSupabase.functions.invoke).toHaveBeenCalledWith(
        'sayswitch-bills',
        expect.objectContaining({
          body: expect.objectContaining({
            meter_type: 'postpaid',
          }),
        })
      );
    });
  });

  describe('Bill Payment Routing', () => {
    it('should route airtime payments correctly', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: true, reference: 'REF', transaction: { status: 'success' } },
        error: null,
      });

      await provider.payBill({
        category: 'airtime',
        provider: 'MTN',
        customerId: '08012345678',
        amount: 100,
      });

      expect(mockSupabase.functions.invoke).toHaveBeenCalledWith(
        'sayswitch-bills',
        expect.objectContaining({
          body: expect.objectContaining({
            action: 'pay_airtime',
          }),
        })
      );
    });

    it('should route data payments correctly', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: true, reference: 'REF', transaction: { status: 'success', amount: 500 } },
        error: null,
      });

      await provider.payBill({
        category: 'data',
        provider: 'MTN',
        customerId: '08012345678',
        planCode: 'MTN-1GB',
      });

      expect(mockSupabase.functions.invoke).toHaveBeenCalledWith(
        'sayswitch-bills',
        expect.objectContaining({
          body: expect.objectContaining({
            action: 'pay_data',
          }),
        })
      );
    });

    it('should handle invalid category', async () => {
      const result = await provider.payBill({
        category: 'invalid' as any,
        provider: 'TEST',
        customerId: '123',
      });

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('INVALID_CATEGORY');
    });
  });

  describe('Get User Transactions', () => {
    it('should fetch user transactions', async () => {
      mockSupabase.from.mockReturnThis();
      mockSupabase.select.mockReturnThis();
      mockSupabase.eq.mockReturnThis();
      mockSupabase.order.mockResolvedValue({
        data: [
          {
            id: '1',
            user_id: 'user123',
            type: 'bill',
            provider: 'MTN',
            amount: 100,
            currency: 'NGN',
            status: 'success',
            reference: 'AIRTIME-123',
            created_at: '2025-01-01T00:00:00Z',
          },
        ],
        error: null,
      });

      const result = await provider.getUserTransactions('user123');

      expect(result.success).toBe(true);
      expect(result.items).toHaveLength(1);
      expect(result.items[0].reference).toBe('AIRTIME-123');
    });

    it('should handle database errors', async () => {
      mockSupabase.order.mockResolvedValue({
        data: null,
        error: { message: 'Database error' },
      });

      const result = await provider.getUserTransactions('user123');

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('Get Transaction', () => {
    it('should fetch transaction by reference', async () => {
      mockSupabase.from.mockReturnThis();
      mockSupabase.select.mockReturnThis();
      mockSupabase.eq.mockReturnThis();
      mockSupabase.single.mockResolvedValue({
        data: {
          id: '1',
          user_id: 'user123',
          reference: 'AIRTIME-123',
          amount: 100,
          currency: 'NGN',
          status: 'success',
          created_at: '2025-01-01T00:00:00Z',
        },
        error: null,
      });

      const result = await provider.getTransaction('AIRTIME-123');

      expect(result.success).toBe(true);
      expect(result.data?.reference).toBe('AIRTIME-123');
    });

    it('should handle transaction not found', async () => {
      mockSupabase.single.mockResolvedValue({
        data: null,
        error: { message: 'Not found' },
      });

      const result = await provider.getTransaction('INVALID');

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('NOT_FOUND');
    });
  });

  describe('Favorites Management', () => {
    it('should get user favorites', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: {
          success: true,
          favorites: [
            {
              id: '1',
              type: 'airtime',
              provider: 'MTN',
              customer_id: '08012345678',
              nickname: 'My MTN',
              created_at: '2025-01-01T00:00:00Z',
            },
          ],
        },
        error: null,
      });

      const result = await provider.getFavorites('user123');

      expect(result.success).toBe(true);
      expect(result.items).toHaveLength(1);
      expect(result.items[0].nickname).toBe('My MTN');
    });

    it('should filter favorites by type', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: true, favorites: [] },
        error: null,
      });

      await provider.getFavorites('user123', 'airtime');

      expect(mockSupabase.functions.invoke).toHaveBeenCalledWith(
        'sayswitch-bills',
        expect.objectContaining({
          body: expect.objectContaining({
            action: 'get_favorites',
            type: 'airtime',
          }),
        })
      );
    });

    it('should delete favorite', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { success: true },
        error: null,
      });

      const result = await provider.deleteFavorite('fav123');

      expect(result.success).toBe(true);
      expect(mockSupabase.functions.invoke).toHaveBeenCalledWith(
        'sayswitch-bills',
        expect.objectContaining({
          body: expect.objectContaining({
            action: 'delete_favorite',
            id: 'fav123',
          }),
        })
      );
    });
  });

  describe('Status Mapping', () => {
    it('should map success status correctly', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: {
          success: true,
          reference: 'REF',
          transaction: { status: 'success' },
        },
        error: null,
      });

      const result = await provider.payAirtime('08012345678', 100, 'MTN');
      expect(result.status).toBe('completed');
    });

    it('should map pending status correctly', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: {
          success: true,
          reference: 'REF',
          transaction: { status: 'pending' },
        },
        error: null,
      });

      const result = await provider.payAirtime('08012345678', 100, 'MTN');
      expect(result.status).toBe('pending');
    });

    it('should map failed status correctly', async () => {
      mockSupabase.functions.invoke.mockResolvedValue({
        data: {
          success: true,
          reference: 'REF',
          transaction: { status: 'failed' },
        },
        error: null,
      });

      const result = await provider.payAirtime('08012345678', 100, 'MTN');
      expect(result.status).toBe('failed');
    });
  });

  describe('Category Inference', () => {
    it('should infer category from reference', async () => {
      mockSupabase.order.mockResolvedValue({
        data: [
          {
            id: '1',
            user_id: 'user123',
            reference: 'AIRTIME-123',
            amount: 100,
            currency: 'NGN',
            status: 'success',
            created_at: '2025-01-01T00:00:00Z',
          },
          {
            id: '2',
            user_id: 'user123',
            reference: 'DATA-456',
            amount: 500,
            currency: 'NGN',
            status: 'success',
            created_at: '2025-01-01T00:00:00Z',
          },
        ],
        error: null,
      });

      const result = await provider.getUserTransactions('user123');

      expect(result.items[0].category).toBe('airtime');
      expect(result.items[1].category).toBe('data');
    });
  });
});
