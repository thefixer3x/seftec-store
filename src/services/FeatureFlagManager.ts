/**
 * Feature Flag Management Service
 *
 * Centralized service for managing feature flags with database integration,
 * real-time updates, caching, and rollout percentage support.
 */

import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type FeatureFlagRow = Database['public']['Tables']['feature_flags']['Row'];

interface FeatureFlagConfig {
  name: string;
  enabled: boolean;
  rollout_pct: number;
  description: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface FeatureFlagCheckResult {
  isEnabled: boolean;
  reason: 'enabled' | 'disabled' | 'rollout' | 'not_found' | 'error';
  rolloutPercentage?: number;
}

/**
 * Centralized Feature Flag Manager
 *
 * Provides database-backed feature flag management with:
 * - Real-time updates via Supabase subscriptions
 * - In-memory caching with TTL
 * - Rollout percentage support for gradual releases
 * - User-level flag resolution
 * - Dependency validation
 */
export class FeatureFlagManager {
  private cache: Map<string, FeatureFlagConfig> = new Map();
  private cacheTimestamps: Map<string, number> = new Map();
  private subscribers: Set<(flags: Map<string, FeatureFlagConfig>) => void> = new Set();
  private realtimeSubscription: any = null;
  private testMode: boolean = false;

  // Cache TTL: 5 minutes (300000 ms)
  private readonly CACHE_TTL = 5 * 60 * 1000;

  // Development mode defaults
  private readonly devDefaults: Record<string, boolean> = {
    'sayswitch_payments': true,
    'sayswitch_bills': true,
    'sayswitch_transfers': true,
    'paypal_payments': true,
    'ai_recommendations': true,
  };

  constructor(options?: { testMode?: boolean }) {
    this.testMode = options?.testMode ?? false;
    this.initializeRealtimeSubscription();
  }

  /**
   * Initialize real-time subscription for feature flag changes
   */
  private initializeRealtimeSubscription(): void {
    this.realtimeSubscription = supabase
      .channel('feature_flags_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'feature_flags'
        },
        (payload) => {
          console.log('[FeatureFlagManager] Real-time update:', payload);

          // Update cache with new data
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            const flag = payload.new as FeatureFlagRow;
            this.updateCacheEntry(flag.name, {
              name: flag.name,
              enabled: flag.enabled ?? false,
              rollout_pct: flag.rollout_pct ?? 0,
              description: flag.description,
              created_at: flag.created_at,
              updated_at: flag.updated_at,
            });
          } else if (payload.eventType === 'DELETE') {
            const flag = payload.old as FeatureFlagRow;
            this.cache.delete(flag.name);
            this.cacheTimestamps.delete(flag.name);
          }

          // Notify subscribers
          this.notifySubscribers();
        }
      )
      .subscribe();
  }

  /**
   * Update a single cache entry
   */
  private updateCacheEntry(name: string, config: FeatureFlagConfig): void {
    this.cache.set(name, config);
    this.cacheTimestamps.set(name, Date.now());
  }

  /**
   * Notify all subscribers of cache changes
   */
  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback(this.cache));
  }

  /**
   * Subscribe to feature flag changes
   */
  public subscribe(callback: (flags: Map<string, FeatureFlagConfig>) => void): () => void {
    this.subscribers.add(callback);

    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback);
    };
  }

  /**
   * Check if cache entry is still valid
   */
  private isCacheValid(name: string): boolean {
    const timestamp = this.cacheTimestamps.get(name);
    if (!timestamp) return false;

    return (Date.now() - timestamp) < this.CACHE_TTL;
  }

  /**
   * Fetch feature flag from database
   */
  private async fetchFlagFromDatabase(name: string): Promise<FeatureFlagConfig | null> {
    try {
      const { data, error } = await supabase
        .from('feature_flags')
        .select('*')
        .eq('name', name)
        .single();

      if (error) {
        console.error(`[FeatureFlagManager] Error fetching flag "${name}":`, error);
        return null;
      }

      if (data) {
        const config: FeatureFlagConfig = {
          name: data.name,
          enabled: data.enabled ?? false,
          rollout_pct: data.rollout_pct ?? 0,
          description: data.description,
          created_at: data.created_at,
          updated_at: data.updated_at,
        };

        // Update cache
        this.updateCacheEntry(name, config);

        return config;
      }

      return null;
    } catch (error) {
      console.error(`[FeatureFlagManager] Exception fetching flag "${name}":`, error);
      return null;
    }
  }

  /**
   * Fetch all feature flags from database
   */
  public async fetchAllFlags(): Promise<Map<string, FeatureFlagConfig>> {
    try {
      const { data, error } = await supabase
        .from('feature_flags')
        .select('*');

      if (error) {
        console.error('[FeatureFlagManager] Error fetching all flags:', error);
        return this.cache;
      }

      if (data) {
        // Update cache with all flags
        data.forEach((flag) => {
          const config: FeatureFlagConfig = {
            name: flag.name,
            enabled: flag.enabled ?? false,
            rollout_pct: flag.rollout_pct ?? 0,
            description: flag.description,
            created_at: flag.created_at,
            updated_at: flag.updated_at,
          };
          this.updateCacheEntry(flag.name, config);
        });
      }

      return this.cache;
    } catch (error) {
      console.error('[FeatureFlagManager] Exception fetching all flags:', error);
      return this.cache;
    }
  }

  /**
   * Get feature flag configuration
   */
  public async getFlag(name: string): Promise<FeatureFlagConfig | null> {
    // Check cache first
    if (this.isCacheValid(name)) {
      return this.cache.get(name) || null;
    }

    // Fetch from database
    return await this.fetchFlagFromDatabase(name);
  }

  /**
   * Calculate if feature is enabled for a specific user
   * Uses consistent hashing to ensure same user always gets same result
   */
  private isEnabledForUser(rolloutPct: number, userId?: string): boolean {
    if (rolloutPct >= 100) return true;
    if (rolloutPct <= 0) return false;

    // If no user ID, use random (not recommended for production)
    if (!userId) {
      return Math.random() * 100 < rolloutPct;
    }

    // Use consistent hashing based on user ID
    // This ensures the same user always gets the same result
    const hash = this.hashCode(userId);
    const bucket = Math.abs(hash % 100);

    return bucket < rolloutPct;
  }

  /**
   * Simple hash function for consistent user bucketing
   */
  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
  }

  /**
   * Check if feature is enabled
   *
   * @param name - Feature flag name
   * @param userId - Optional user ID for rollout percentage calculation
   * @returns Promise<FeatureFlagCheckResult>
   */
  public async isFeatureEnabled(
    name: string,
    userId?: string
  ): Promise<FeatureFlagCheckResult> {
    // In development mode, use dev defaults (unless in test mode)
    if (import.meta.env.DEV && !this.testMode) {
      const devEnabled = this.devDefaults[name] ?? true;
      return {
        isEnabled: devEnabled,
        reason: devEnabled ? 'enabled' : 'disabled'
      };
    }

    try {
      const config = await this.getFlag(name);

      if (!config) {
        console.warn(`[FeatureFlagManager] Flag "${name}" not found in database`);
        return {
          isEnabled: false,
          reason: 'not_found'
        };
      }

      // If flag is explicitly disabled, return false
      if (!config.enabled) {
        return {
          isEnabled: false,
          reason: 'disabled',
          rolloutPercentage: config.rollout_pct
        };
      }

      // Check rollout percentage
      const rolloutResult = this.isEnabledForUser(config.rollout_pct, userId);

      return {
        isEnabled: rolloutResult,
        reason: rolloutResult ? 'enabled' : 'rollout',
        rolloutPercentage: config.rollout_pct
      };
    } catch (error) {
      console.error(`[FeatureFlagManager] Error checking flag "${name}":`, error);
      return {
        isEnabled: false,
        reason: 'error'
      };
    }
  }

  /**
   * Update feature flag in database
   *
   * @param name - Feature flag name
   * @param enabled - Whether the flag is enabled
   * @param rolloutPct - Rollout percentage (0-100)
   */
  public async updateFlag(
    name: string,
    enabled: boolean,
    rolloutPct?: number
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const updates: any = {
        enabled,
        updated_at: new Date().toISOString()
      };

      if (rolloutPct !== undefined) {
        updates.rollout_pct = Math.max(0, Math.min(100, rolloutPct));
      }

      const { error } = await supabase
        .from('feature_flags')
        .update(updates)
        .eq('name', name);

      if (error) {
        console.error(`[FeatureFlagManager] Error updating flag "${name}":`, error);
        return {
          success: false,
          error: error.message
        };
      }

      // Invalidate cache for this flag
      this.cacheTimestamps.delete(name);

      return { success: true };
    } catch (error: any) {
      console.error(`[FeatureFlagManager] Exception updating flag "${name}":`, error);
      return {
        success: false,
        error: error.message || 'Unknown error'
      };
    }
  }

  /**
   * Create a new feature flag
   */
  public async createFlag(
    name: string,
    enabled: boolean = false,
    rolloutPct: number = 0,
    description?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('feature_flags')
        .insert({
          name,
          enabled,
          rollout_pct: Math.max(0, Math.min(100, rolloutPct)),
          description: description || null
        });

      if (error) {
        console.error(`[FeatureFlagManager] Error creating flag "${name}":`, error);
        return {
          success: false,
          error: error.message
        };
      }

      return { success: true };
    } catch (error: any) {
      console.error(`[FeatureFlagManager] Exception creating flag "${name}":`, error);
      return {
        success: false,
        error: error.message || 'Unknown error'
      };
    }
  }

  /**
   * Delete a feature flag
   */
  public async deleteFlag(name: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('feature_flags')
        .delete()
        .eq('name', name);

      if (error) {
        console.error(`[FeatureFlagManager] Error deleting flag "${name}":`, error);
        return {
          success: false,
          error: error.message
        };
      }

      // Remove from cache
      this.cache.delete(name);
      this.cacheTimestamps.delete(name);

      return { success: true };
    } catch (error: any) {
      console.error(`[FeatureFlagManager] Exception deleting flag "${name}":`, error);
      return {
        success: false,
        error: error.message || 'Unknown error'
      };
    }
  }

  /**
   * Clean up subscriptions
   */
  public cleanup(): void {
    if (this.realtimeSubscription) {
      supabase.removeChannel(this.realtimeSubscription);
      this.realtimeSubscription = null;
    }
    this.subscribers.clear();
    this.cache.clear();
    this.cacheTimestamps.clear();
  }
}

// Singleton instance
let featureFlagManagerInstance: FeatureFlagManager | null = null;

/**
 * Get the singleton instance of FeatureFlagManager
 */
export function getFeatureFlagManager(): FeatureFlagManager {
  if (!featureFlagManagerInstance) {
    featureFlagManagerInstance = new FeatureFlagManager();
  }
  return featureFlagManagerInstance;
}

/**
 * Reset the singleton instance (mainly for testing)
 */
export function resetFeatureFlagManager(): void {
  if (featureFlagManagerInstance) {
    featureFlagManagerInstance.cleanup();
    featureFlagManagerInstance = null;
  }
}
