/// <reference types="vitest" />
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { FeatureFlagManager } from './FeatureFlagManager';
import { supabase } from '@/integrations/supabase/client';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(),
    channel: vi.fn(),
  },
}));

describe('FeatureFlagManager', () => {
  let manager: FeatureFlagManager;
  let mockSubscription: any;
  let realtimeChangeHandler: Function | undefined;

  beforeEach(() => {
    // Setup mock subscription BEFORE creating manager
    mockSubscription = {
      on: vi.fn((event: string, config: any, handler: Function) => {
        // Capture the realtime change handler
        realtimeChangeHandler = handler;
        return mockSubscription;
      }),
      subscribe: vi.fn().mockReturnThis(),
      unsubscribe: vi.fn(),
    };

    // Setup default Supabase mocks BEFORE creating manager
    (supabase.channel as any) = vi.fn(() => mockSubscription);
    (supabase.from as any) = vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
    }));

    // Now create manager instance with mocks in place and testMode enabled
    manager = new FeatureFlagManager({ testMode: true });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getFlag', () => {
    it('should fetch flag from database when not cached', async () => {
      const mockFlag = {
        name: 'test_feature',
        enabled: true,
        rollout_pct: 100,
        description: 'Test feature',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const mockSelect = vi.fn().mockReturnThis();
      const mockEq = vi.fn().mockReturnThis();
      const mockSingle = vi.fn().mockResolvedValue({ data: mockFlag, error: null });

      (supabase.from as any) = vi.fn(() => ({
        select: mockSelect,
        eq: mockEq,
        single: mockSingle,
      }));

      const result = await manager.getFlag('test_feature');

      expect(supabase.from).toHaveBeenCalledWith('feature_flags');
      expect(mockSelect).toHaveBeenCalledWith('*');
      expect(mockEq).toHaveBeenCalledWith('name', 'test_feature');
      expect(result).toEqual(mockFlag);
    });

    it('should return cached flag when cache is fresh', async () => {
      const mockFlag = {
        name: 'test_feature',
        enabled: true,
        rollout_pct: 100,
        description: 'Test feature',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const mockSingle = vi.fn()
        .mockResolvedValueOnce({ data: mockFlag, error: null })
        .mockResolvedValueOnce({ data: { ...mockFlag, enabled: false }, error: null });

      (supabase.from as any) = vi.fn(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: mockSingle,
      }));

      // First call - fetches from database
      const result1 = await manager.getFlag('test_feature');
      expect(result1?.enabled).toBe(true);

      // Second call - should return cached value
      const result2 = await manager.getFlag('test_feature');
      expect(result2?.enabled).toBe(true); // Still true from cache
      expect(mockSingle).toHaveBeenCalledTimes(1); // Only called once
    });

    it('should refresh cache after TTL expires', async () => {
      const mockFlag = {
        name: 'test_feature',
        enabled: true,
        rollout_pct: 100,
        description: 'Test feature',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const mockSingle = vi.fn().mockResolvedValue({ data: mockFlag, error: null });

      (supabase.from as any) = vi.fn(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: mockSingle,
      }));

      // First call
      await manager.getFlag('test_feature');

      // Fast-forward time by 6 minutes (past TTL)
      vi.useFakeTimers();
      vi.advanceTimersByTime(6 * 60 * 1000);

      // Second call should fetch from database again
      await manager.getFlag('test_feature');

      expect(mockSingle).toHaveBeenCalledTimes(2);

      vi.useRealTimers();
    });

    it('should return null when flag does not exist', async () => {
      (supabase.from as any) = vi.fn(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
      }));

      const result = await manager.getFlag('nonexistent_flag');
      expect(result).toBeNull();
    });
  });

  describe('isFeatureEnabled', () => {
    it('should return false when flag is disabled', async () => {
      const mockFlag = {
        name: 'test_feature',
        enabled: false,
        rollout_pct: 100,
        description: 'Test feature',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      (supabase.from as any) = vi.fn(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockFlag, error: null }),
      }));

      const result = await manager.isFeatureEnabled('test_feature');

      expect(result.isEnabled).toBe(false);
      expect(result.reason).toBe('disabled');
    });

    it('should return false when flag does not exist', async () => {
      (supabase.from as any) = vi.fn(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
      }));

      const result = await manager.isFeatureEnabled('nonexistent_flag');

      expect(result.isEnabled).toBe(false);
      expect(result.reason).toBe('not_found');
    });

    it('should return true when flag is enabled with 100% rollout', async () => {
      const mockFlag = {
        name: 'test_feature',
        enabled: true,
        rollout_pct: 100,
        description: 'Test feature',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      (supabase.from as any) = vi.fn(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockFlag, error: null }),
      }));

      const result = await manager.isFeatureEnabled('test_feature', 'user-123');

      expect(result.isEnabled).toBe(true);
      expect(result.reason).toBe('enabled');
    });

    it('should use consistent hashing for user-based rollout', async () => {
      const mockFlag = {
        name: 'test_feature',
        enabled: true,
        rollout_pct: 50,
        description: 'Test feature',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      (supabase.from as any) = vi.fn(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockFlag, error: null }),
      }));

      // Test multiple times with same user ID - should get consistent result
      const userId = 'user-123';
      const result1 = await manager.isFeatureEnabled('test_feature', userId);

      // Clear cache to force re-evaluation
      vi.useFakeTimers();
      vi.advanceTimersByTime(6 * 60 * 1000);
      vi.useRealTimers();

      const result2 = await manager.isFeatureEnabled('test_feature', userId);

      // Same user should always get same result (consistent hashing)
      expect(result1.isEnabled).toBe(result2.isEnabled);
    });

    it('should enable approximately correct percentage of users', async () => {
      const mockFlag = {
        name: 'test_feature',
        enabled: true,
        rollout_pct: 30, // 30% rollout
        description: 'Test feature',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      (supabase.from as any) = vi.fn(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockFlag, error: null }),
      }));

      // Test with 100 different user IDs
      const results = await Promise.all(
        Array.from({ length: 100 }, async (_, i) => {
          const result = await manager.isFeatureEnabled('test_feature', `user-${i}`);
          return result.isEnabled;
        })
      );

      const enabledCount = results.filter(r => r).length;

      // Should be approximately 30% (allow 20% margin of error due to hashing)
      expect(enabledCount).toBeGreaterThan(10); // At least 10%
      expect(enabledCount).toBeLessThan(50); // At most 50%
    });

    it('should use random rollout when no user ID provided', async () => {
      const mockFlag = {
        name: 'test_feature',
        enabled: true,
        rollout_pct: 50,
        description: 'Test feature',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      (supabase.from as any) = vi.fn(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockFlag, error: null }),
      }));

      // Mock Math.random for predictable testing
      const mockRandom = vi.spyOn(Math, 'random');

      // Test with random value below threshold
      mockRandom.mockReturnValue(0.3); // 30% < 50%
      let result = await manager.isFeatureEnabled('test_feature');
      expect(result.isEnabled).toBe(true);

      // Clear cache
      vi.useFakeTimers();
      vi.advanceTimersByTime(6 * 60 * 1000);
      vi.useRealTimers();

      // Test with random value above threshold
      mockRandom.mockReturnValue(0.7); // 70% > 50%
      result = await manager.isFeatureEnabled('test_feature');
      expect(result.isEnabled).toBe(false);

      mockRandom.mockRestore();
    });
  });

  describe('updateFlag', () => {
    it('should update flag enabled status', async () => {
      const mockUpdate = vi.fn().mockReturnThis();
      const mockEq = vi.fn().mockResolvedValue({ error: null });

      (supabase.from as any) = vi.fn(() => ({
        update: mockUpdate,
        eq: mockEq,
      }));

      const result = await manager.updateFlag('test_feature', true);

      expect(result.success).toBe(true);
      expect(supabase.from).toHaveBeenCalledWith('feature_flags');
      expect(mockUpdate).toHaveBeenCalledWith({
        enabled: true,
        updated_at: expect.any(String),
      });
      expect(mockEq).toHaveBeenCalledWith('name', 'test_feature');
    });

    it('should update flag rollout percentage', async () => {
      const mockUpdate = vi.fn().mockReturnThis();
      const mockEq = vi.fn().mockResolvedValue({ error: null });

      (supabase.from as any) = vi.fn(() => ({
        update: mockUpdate,
        eq: mockEq,
      }));

      const result = await manager.updateFlag('test_feature', true, 75);

      expect(result.success).toBe(true);
      expect(mockUpdate).toHaveBeenCalledWith({
        enabled: true,
        rollout_pct: 75,
        updated_at: expect.any(String),
      });
    });

    it('should return error when update fails', async () => {
      (supabase.from as any) = vi.fn(() => ({
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({ error: { message: 'Database error' } }),
      }));

      const result = await manager.updateFlag('test_feature', true);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Database error');
    });

    it('should invalidate cache after update', async () => {
      const mockFlag = {
        name: 'test_feature',
        enabled: true,
        rollout_pct: 100,
        description: 'Test feature',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const mockSelect = vi.fn().mockReturnThis();
      const mockEq = vi.fn().mockReturnThis();
      const mockSingle = vi.fn().mockResolvedValue({ data: mockFlag, error: null });
      const mockUpdate = vi.fn().mockReturnThis();
      const mockUpdateEq = vi.fn().mockResolvedValue({ error: null });

      (supabase.from as any) = vi.fn((table) => {
        if (table === 'feature_flags') {
          return {
            select: mockSelect,
            eq: mockEq,
            single: mockSingle,
            update: mockUpdate,
          };
        }
        return {};
      });

      mockEq.mockImplementation((column, value) => {
        if (column === 'name') {
          return { single: mockSingle };
        }
        return mockUpdateEq({ error: null });
      });

      // Fetch flag to populate cache
      await manager.getFlag('test_feature');
      expect(mockSingle).toHaveBeenCalledTimes(1);

      // Update flag
      await manager.updateFlag('test_feature', false);

      // Fetch again - should re-fetch due to cache invalidation
      await manager.getFlag('test_feature');
      expect(mockSingle).toHaveBeenCalledTimes(2);
    });
  });

  describe('createFlag', () => {
    it('should create new flag with default values', async () => {
      const mockInsert = vi.fn().mockResolvedValue({ error: null });

      (supabase.from as any) = vi.fn(() => ({
        insert: mockInsert,
      }));

      const result = await manager.createFlag('new_feature', false, 0, 'New feature');

      expect(result.success).toBe(true);
      expect(mockInsert).toHaveBeenCalledWith({
        name: 'new_feature',
        description: 'New feature',
        enabled: false,
        rollout_pct: 0,
      });
    });

    it('should create new flag with custom values', async () => {
      const mockInsert = vi.fn().mockResolvedValue({ error: null });

      (supabase.from as any) = vi.fn(() => ({
        insert: mockInsert,
      }));

      const result = await manager.createFlag('new_feature', true, 50, 'New feature');

      expect(result.success).toBe(true);
      expect(mockInsert).toHaveBeenCalledWith({
        name: 'new_feature',
        description: 'New feature',
        enabled: true,
        rollout_pct: 50,
      });
    });

    it('should return error when creation fails', async () => {
      (supabase.from as any) = vi.fn(() => ({
        insert: vi.fn().mockResolvedValue({ error: { message: 'Duplicate key' } }),
      }));

      const result = await manager.createFlag('new_feature', false, 0, 'New feature');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Duplicate key');
    });
  });

  describe('deleteFlag', () => {
    it('should delete flag successfully', async () => {
      const mockDelete = vi.fn().mockReturnThis();
      const mockEq = vi.fn().mockResolvedValue({ error: null });

      (supabase.from as any) = vi.fn(() => ({
        delete: mockDelete,
        eq: mockEq,
      }));

      const result = await manager.deleteFlag('test_feature');

      expect(result.success).toBe(true);
      expect(supabase.from).toHaveBeenCalledWith('feature_flags');
      expect(mockDelete).toHaveBeenCalled();
      expect(mockEq).toHaveBeenCalledWith('name', 'test_feature');
    });

    it('should return error when deletion fails', async () => {
      (supabase.from as any) = vi.fn(() => ({
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({ error: { message: 'Not found' } }),
      }));

      const result = await manager.deleteFlag('test_feature');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Not found');
    });

    it('should invalidate cache after deletion', async () => {
      const mockFlag = {
        name: 'test_feature',
        enabled: true,
        rollout_pct: 100,
        description: 'Test feature',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const mockSingle = vi.fn()
        .mockResolvedValueOnce({ data: mockFlag, error: null })
        .mockResolvedValueOnce({ data: null, error: { code: 'PGRST116' } });

      (supabase.from as any) = vi.fn(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: mockSingle,
        delete: vi.fn().mockReturnThis(),
      }));

      // Fetch to populate cache
      const result1 = await manager.getFlag('test_feature');
      expect(result1).not.toBeNull();

      // Delete flag
      await manager.deleteFlag('test_feature');

      // Fetch again - should return null
      const result2 = await manager.getFlag('test_feature');
      expect(result2).toBeNull();
    });
  });

  describe('subscribe', () => {
    it('should setup real-time subscription', () => {
      const callback = vi.fn();
      manager.subscribe(callback);

      expect(supabase.channel).toHaveBeenCalledWith('feature_flags_changes');
      expect(mockSubscription.on).toHaveBeenCalledWith(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'feature_flags' },
        expect.any(Function)
      );
      expect(mockSubscription.subscribe).toHaveBeenCalled();
    });

    it('should call callback when flag changes', () => {
      const callback = vi.fn();

      manager.subscribe(callback);

      // Simulate a database change using the captured handler
      const payload = {
        eventType: 'INSERT',
        new: {
          name: 'test_feature',
          enabled: true,
          rollout_pct: 100,
          description: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      };
      realtimeChangeHandler!(payload);

      expect(callback).toHaveBeenCalled();
    });

    it('should return unsubscribe function', () => {
      const callback = vi.fn();
      const unsubscribe = manager.subscribe(callback);

      expect(typeof unsubscribe).toBe('function');

      // The unsubscribe function just removes the callback from subscribers
      // It doesn't call mockSubscription.unsubscribe()
      unsubscribe();

      // Verify callback is no longer called after unsubscribe
      const payload = {
        eventType: 'INSERT',
        new: {
          name: 'test_feature',
          enabled: true,
          rollout_pct: 100,
          description: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      };
      callback.mockClear();
      realtimeChangeHandler!(payload);
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('fetchAllFlags', () => {
    it('should fetch all flags from database', async () => {
      const mockFlags = [
        {
          name: 'feature_1',
          enabled: true,
          rollout_pct: 100,
          description: 'Feature 1',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          name: 'feature_2',
          enabled: false,
          rollout_pct: 0,
          description: 'Feature 2',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      (supabase.from as any) = vi.fn(() => ({
        select: vi.fn().mockResolvedValue({ data: mockFlags, error: null }),
      }));

      const result = await manager.fetchAllFlags();

      expect(supabase.from).toHaveBeenCalledWith('feature_flags');
      expect(result).toBeInstanceOf(Map);
      expect(result.size).toBe(2);
      expect(result.get('feature_1')?.enabled).toBe(true);
      expect(result.get('feature_2')?.enabled).toBe(false);
    });

    it('should return empty map when query fails', async () => {
      (supabase.from as any) = vi.fn(() => ({
        select: vi.fn().mockResolvedValue({ data: null, error: { message: 'Error' } }),
      }));

      const result = await manager.fetchAllFlags();

      expect(result).toBeInstanceOf(Map);
      expect(result.size).toBe(0);
    });
  });
});
