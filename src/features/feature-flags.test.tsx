/// <reference types="vitest" />
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import {
  useFeatureFlag,
  useFeatureFlags,
  useFeatureFlagForCurrentUser,
  isFeatureEnabled,
  FEATURE_FLAGS,
} from './feature-flags';
import { getFeatureFlagManager } from '@/services/FeatureFlagManager';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

// Mock dependencies
vi.mock('@/services/FeatureFlagManager', () => ({
  getFeatureFlagManager: vi.fn(),
}));

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
    },
  },
}));

describe('Feature Flags', () => {
  let mockManager: any;
  let mockUnsubscribe: any;

  beforeEach(() => {
    mockUnsubscribe = vi.fn();

    mockManager = {
      isFeatureEnabled: vi.fn(),
      subscribe: vi.fn(() => mockUnsubscribe),
      getFlag: vi.fn(),
    };

    (getFeatureFlagManager as any).mockReturnValue(mockManager);

    (useAuth as any).mockReturnValue({
      user: { id: 'user-123' },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('FEATURE_FLAGS constants', () => {
    it('should have all required feature flags defined', () => {
      expect(FEATURE_FLAGS.SAYSWITCH_PAYMENTS).toBe('sayswitch_payments');
      expect(FEATURE_FLAGS.SAYSWITCH_BILLS).toBe('sayswitch_bills');
      expect(FEATURE_FLAGS.SAYSWITCH_TRANSFERS).toBe('sayswitch_transfers');
      expect(FEATURE_FLAGS.PAYPAL_PAYMENTS).toBe('paypal_payments');
      expect(FEATURE_FLAGS.AI_RECOMMENDATIONS).toBe('ai_recommendations');
    });
  });

  describe('isFeatureEnabled', () => {
    it('should call manager and return enabled status', async () => {
      mockManager.isFeatureEnabled.mockResolvedValue({
        isEnabled: true,
        reason: 'enabled',
      });

      const result = await isFeatureEnabled(FEATURE_FLAGS.SAYSWITCH_PAYMENTS);

      expect(mockManager.isFeatureEnabled).toHaveBeenCalledWith(
        FEATURE_FLAGS.SAYSWITCH_PAYMENTS,
        undefined
      );
      expect(result).toBe(true);
    });

    it('should pass user ID when provided', async () => {
      mockManager.isFeatureEnabled.mockResolvedValue({
        isEnabled: true,
        reason: 'enabled',
      });

      await isFeatureEnabled(FEATURE_FLAGS.SAYSWITCH_PAYMENTS, 'user-456');

      expect(mockManager.isFeatureEnabled).toHaveBeenCalledWith(
        FEATURE_FLAGS.SAYSWITCH_PAYMENTS,
        'user-456'
      );
    });

    it('should return false when flag is disabled', async () => {
      mockManager.isFeatureEnabled.mockResolvedValue({
        isEnabled: false,
        reason: 'disabled',
      });

      const result = await isFeatureEnabled(FEATURE_FLAGS.PAYPAL_PAYMENTS);

      expect(result).toBe(false);
    });

    it('should return false when rollout excludes user', async () => {
      mockManager.isFeatureEnabled.mockResolvedValue({
        isEnabled: false,
        reason: 'rollout',
      });

      const result = await isFeatureEnabled(
        FEATURE_FLAGS.AI_RECOMMENDATIONS,
        'user-999'
      );

      expect(result).toBe(false);
    });
  });

  describe('useFeatureFlag', () => {
    it('should return loading state initially', () => {
      mockManager.isFeatureEnabled.mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );

      const { result } = renderHook(() =>
        useFeatureFlag(FEATURE_FLAGS.SAYSWITCH_PAYMENTS)
      );

      expect(result.current.isLoading).toBe(true);
      expect(result.current.isEnabled).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should return enabled state when flag is enabled', async () => {
      mockManager.isFeatureEnabled.mockResolvedValue({
        isEnabled: true,
        reason: 'enabled',
      });

      const { result } = renderHook(() =>
        useFeatureFlag(FEATURE_FLAGS.SAYSWITCH_PAYMENTS)
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isEnabled).toBe(true);
      expect(result.current.error).toBeNull();
    });

    it('should return disabled state when flag is disabled', async () => {
      mockManager.isFeatureEnabled.mockResolvedValue({
        isEnabled: false,
        reason: 'disabled',
      });

      const { result } = renderHook(() =>
        useFeatureFlag(FEATURE_FLAGS.PAYPAL_PAYMENTS)
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isEnabled).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should handle errors gracefully', async () => {
      const error = new Error('Database connection failed');
      mockManager.isFeatureEnabled.mockRejectedValue(error);

      const { result } = renderHook(() =>
        useFeatureFlag(FEATURE_FLAGS.SAYSWITCH_BILLS)
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isEnabled).toBe(false);
      expect(result.current.error).toEqual(error);
    });

    it('should subscribe to real-time updates', async () => {
      mockManager.isFeatureEnabled.mockResolvedValue({
        isEnabled: false,
        reason: 'disabled',
      });

      const { result } = renderHook(() =>
        useFeatureFlag(FEATURE_FLAGS.AI_RECOMMENDATIONS)
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockManager.subscribe).toHaveBeenCalled();
    });

    it('should update when subscription triggers', async () => {
      let subscriptionCallback: Function;

      mockManager.isFeatureEnabled
        .mockResolvedValueOnce({ isEnabled: false, reason: 'disabled' })
        .mockResolvedValueOnce({ isEnabled: true, reason: 'enabled' });

      mockManager.subscribe.mockImplementation((callback: Function) => {
        subscriptionCallback = callback;
        return mockUnsubscribe;
      });

      const { result } = renderHook(() =>
        useFeatureFlag(FEATURE_FLAGS.SAYSWITCH_PAYMENTS)
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isEnabled).toBe(false);

      // Trigger subscription callback
      await act(async () => {
        await subscriptionCallback!();
      });

      await waitFor(() => {
        expect(result.current.isEnabled).toBe(true);
      });
    });

    it('should unsubscribe on unmount', async () => {
      mockManager.isFeatureEnabled.mockResolvedValue({
        isEnabled: true,
        reason: 'enabled',
      });

      const { unmount } = renderHook(() =>
        useFeatureFlag(FEATURE_FLAGS.SAYSWITCH_TRANSFERS)
      );

      await waitFor(() => {
        expect(mockManager.subscribe).toHaveBeenCalled();
      });

      unmount();

      expect(mockUnsubscribe).toHaveBeenCalled();
    });

    it('should re-check flag when flag name changes', async () => {
      mockManager.isFeatureEnabled.mockResolvedValue({
        isEnabled: true,
        reason: 'enabled',
      });

      const { result, rerender } = renderHook(
        ({ flag }) => useFeatureFlag(flag),
        {
          initialProps: { flag: FEATURE_FLAGS.SAYSWITCH_PAYMENTS },
        }
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockManager.isFeatureEnabled).toHaveBeenCalledWith(
        FEATURE_FLAGS.SAYSWITCH_PAYMENTS,
        undefined
      );

      // Change flag
      rerender({ flag: FEATURE_FLAGS.PAYPAL_PAYMENTS });

      await waitFor(() => {
        expect(mockManager.isFeatureEnabled).toHaveBeenCalledWith(
          FEATURE_FLAGS.PAYPAL_PAYMENTS,
          undefined
        );
      });
    });

    it('should use provided user ID', async () => {
      mockManager.isFeatureEnabled.mockResolvedValue({
        isEnabled: true,
        reason: 'enabled',
      });

      renderHook(() =>
        useFeatureFlag(FEATURE_FLAGS.SAYSWITCH_PAYMENTS, 'user-456')
      );

      await waitFor(() => {
        expect(mockManager.isFeatureEnabled).toHaveBeenCalledWith(
          FEATURE_FLAGS.SAYSWITCH_PAYMENTS,
          'user-456'
        );
      });
    });
  });

  describe('useFeatureFlags', () => {
    it('should check multiple flags simultaneously', async () => {
      mockManager.isFeatureEnabled.mockImplementation((flagName: string) => {
        if (flagName === FEATURE_FLAGS.SAYSWITCH_PAYMENTS) {
          return Promise.resolve({ isEnabled: true, reason: 'enabled' });
        } else if (flagName === FEATURE_FLAGS.PAYPAL_PAYMENTS) {
          return Promise.resolve({ isEnabled: false, reason: 'disabled' });
        } else if (flagName === FEATURE_FLAGS.AI_RECOMMENDATIONS) {
          return Promise.resolve({ isEnabled: true, reason: 'enabled' });
        }
        return Promise.resolve({ isEnabled: false, reason: 'disabled' });
      });

      const { result } = renderHook(() =>
        useFeatureFlags([
          FEATURE_FLAGS.SAYSWITCH_PAYMENTS,
          FEATURE_FLAGS.PAYPAL_PAYMENTS,
          FEATURE_FLAGS.AI_RECOMMENDATIONS,
        ])
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.flags).toEqual({
        [FEATURE_FLAGS.SAYSWITCH_PAYMENTS]: true,
        [FEATURE_FLAGS.PAYPAL_PAYMENTS]: false,
        [FEATURE_FLAGS.AI_RECOMMENDATIONS]: true,
      });
    });

    it('should show loading while checking flags', () => {
      mockManager.isFeatureEnabled.mockImplementation(
        () => new Promise(() => {})
      );

      const { result } = renderHook(() =>
        useFeatureFlags([
          FEATURE_FLAGS.SAYSWITCH_PAYMENTS,
          FEATURE_FLAGS.PAYPAL_PAYMENTS,
        ])
      );

      expect(result.current.isLoading).toBe(true);
      expect(result.current.flags).toEqual({});
    });

    it('should handle errors for individual flags', async () => {
      mockManager.isFeatureEnabled.mockImplementation((flagName: string) => {
        if (flagName === FEATURE_FLAGS.SAYSWITCH_PAYMENTS) {
          return Promise.resolve({ isEnabled: true, reason: 'enabled' });
        } else if (flagName === FEATURE_FLAGS.PAYPAL_PAYMENTS) {
          return Promise.reject(new Error('Database error'));
        }
        return Promise.resolve({ isEnabled: false, reason: 'disabled' });
      });

      const { result } = renderHook(() =>
        useFeatureFlags([
          FEATURE_FLAGS.SAYSWITCH_PAYMENTS,
          FEATURE_FLAGS.PAYPAL_PAYMENTS,
        ])
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // When Promise.all rejects, all flags default to false
      expect(result.current.flags).toEqual({
        [FEATURE_FLAGS.SAYSWITCH_PAYMENTS]: false,
        [FEATURE_FLAGS.PAYPAL_PAYMENTS]: false,
      });
      expect(result.current.error).toBeTruthy();
    });

    it('should update all flags on subscription trigger', async () => {
      let subscriptionCallback: Function;

      mockManager.isFeatureEnabled
        .mockResolvedValueOnce({ isEnabled: false, reason: 'disabled' })
        .mockResolvedValueOnce({ isEnabled: false, reason: 'disabled' })
        .mockResolvedValueOnce({ isEnabled: true, reason: 'enabled' })
        .mockResolvedValueOnce({ isEnabled: true, reason: 'enabled' });

      mockManager.subscribe.mockImplementation((callback: Function) => {
        subscriptionCallback = callback;
        return mockUnsubscribe;
      });

      const { result } = renderHook(() =>
        useFeatureFlags([
          FEATURE_FLAGS.SAYSWITCH_PAYMENTS,
          FEATURE_FLAGS.PAYPAL_PAYMENTS,
        ])
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.flags).toEqual({
        [FEATURE_FLAGS.SAYSWITCH_PAYMENTS]: false,
        [FEATURE_FLAGS.PAYPAL_PAYMENTS]: false,
      });

      // Trigger subscription
      await act(async () => {
        await subscriptionCallback!();
      });

      await waitFor(() => {
        expect(result.current.flags).toEqual({
          [FEATURE_FLAGS.SAYSWITCH_PAYMENTS]: true,
          [FEATURE_FLAGS.PAYPAL_PAYMENTS]: true,
        });
      });
    });

    it('should use provided user ID for all flags', async () => {
      mockManager.isFeatureEnabled.mockResolvedValue({
        isEnabled: true,
        reason: 'enabled',
      });

      renderHook(() =>
        useFeatureFlags(
          [FEATURE_FLAGS.SAYSWITCH_PAYMENTS, FEATURE_FLAGS.PAYPAL_PAYMENTS],
          'user-789'
        )
      );

      await waitFor(() => {
        expect(mockManager.isFeatureEnabled).toHaveBeenCalledWith(
          FEATURE_FLAGS.SAYSWITCH_PAYMENTS,
          'user-789'
        );
        expect(mockManager.isFeatureEnabled).toHaveBeenCalledWith(
          FEATURE_FLAGS.PAYPAL_PAYMENTS,
          'user-789'
        );
      });
    });
  });

  describe('useFeatureFlagForCurrentUser', () => {
    it('should use current user ID from Supabase session', async () => {
      mockManager.isFeatureEnabled.mockResolvedValue({
        isEnabled: true,
        reason: 'enabled',
      });

      // Mock Supabase session
      (supabase.auth.getSession as any).mockResolvedValue({
        data: {
          session: {
            user: { id: 'user-123' },
          },
        },
        error: null,
      });

      renderHook(() =>
        useFeatureFlagForCurrentUser(FEATURE_FLAGS.AI_RECOMMENDATIONS)
      );

      await waitFor(() => {
        expect(mockManager.isFeatureEnabled).toHaveBeenCalledWith(
          FEATURE_FLAGS.AI_RECOMMENDATIONS,
          'user-123'
        );
      }, { timeout: 2000 });
    });

    it('should handle no logged-in user', async () => {
      mockManager.isFeatureEnabled.mockResolvedValue({
        isEnabled: false,
        reason: 'disabled',
      });

      // Mock no session
      (supabase.auth.getSession as any).mockResolvedValue({
        data: {
          session: null,
        },
        error: null,
      });

      renderHook(() =>
        useFeatureFlagForCurrentUser(FEATURE_FLAGS.PAYPAL_PAYMENTS)
      );

      await waitFor(() => {
        expect(mockManager.isFeatureEnabled).toHaveBeenCalledWith(
          FEATURE_FLAGS.PAYPAL_PAYMENTS,
          undefined
        );
      }, { timeout: 2000 });
    });

    it('should handle session errors gracefully', async () => {
      mockManager.isFeatureEnabled.mockResolvedValue({
        isEnabled: false,
        reason: 'disabled',
      });

      // Mock session error
      (supabase.auth.getSession as any).mockRejectedValue(
        new Error('Session error')
      );

      renderHook(() =>
        useFeatureFlagForCurrentUser(FEATURE_FLAGS.AI_RECOMMENDATIONS)
      );

      await waitFor(() => {
        expect(mockManager.isFeatureEnabled).toHaveBeenCalledWith(
          FEATURE_FLAGS.AI_RECOMMENDATIONS,
          undefined
        );
      }, { timeout: 2000 });
    });
  });

  describe('Development mode behavior', () => {
    it('should work correctly in development mode', async () => {
      mockManager.isFeatureEnabled.mockResolvedValue({
        isEnabled: true,
        reason: 'enabled',
      });

      const { result } = renderHook(() =>
        useFeatureFlag(FEATURE_FLAGS.SAYSWITCH_PAYMENTS)
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isEnabled).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty flag array', async () => {
      const { result } = renderHook(() => useFeatureFlags([]));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.flags).toEqual({});
    });

    it('should handle concurrent flag checks', async () => {
      mockManager.isFeatureEnabled.mockImplementation((flag: string) =>
        Promise.resolve({
          isEnabled: flag === FEATURE_FLAGS.SAYSWITCH_PAYMENTS,
          reason: 'enabled',
        })
      );

      const { result: result1 } = renderHook(() =>
        useFeatureFlag(FEATURE_FLAGS.SAYSWITCH_PAYMENTS)
      );
      const { result: result2 } = renderHook(() =>
        useFeatureFlag(FEATURE_FLAGS.PAYPAL_PAYMENTS)
      );

      await waitFor(() => {
        expect(result1.current.isLoading).toBe(false);
        expect(result2.current.isLoading).toBe(false);
      });

      expect(result1.current.isEnabled).toBe(true);
      expect(result2.current.isEnabled).toBe(false);
    });

    it('should deduplicate subscription setup', async () => {
      mockManager.isFeatureEnabled.mockResolvedValue({
        isEnabled: true,
        reason: 'enabled',
      });

      const { result: result1 } = renderHook(() =>
        useFeatureFlag(FEATURE_FLAGS.SAYSWITCH_PAYMENTS)
      );
      const { result: result2 } = renderHook(() =>
        useFeatureFlag(FEATURE_FLAGS.SAYSWITCH_PAYMENTS)
      );

      await waitFor(() => {
        expect(result1.current.isLoading).toBe(false);
        expect(result2.current.isLoading).toBe(false);
      });

      // Should subscribe for each hook instance
      expect(mockManager.subscribe).toHaveBeenCalledTimes(2);
    });
  });
});
