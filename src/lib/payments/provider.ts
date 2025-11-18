/**
 * Payment Provider Base Class
 *
 * Abstract base class for all payment providers.
 * Provides common functionality and defines the interface all providers must implement.
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  PaymentProviderConfig,
  PaymentProviderType,
  PaymentCapability,
  ProviderResult,
  ListResult,
  PaymentError,
} from './types';

/**
 * Abstract Payment Provider
 *
 * All payment providers (PayPal, SaySwitch, Stripe, etc.) must extend this class
 * and implement its abstract methods.
 */
export abstract class PaymentProvider {
  protected supabase: SupabaseClient;
  protected config: PaymentProviderConfig;

  constructor(supabase: SupabaseClient, config: PaymentProviderConfig) {
    this.supabase = supabase;
    this.config = config;
  }

  // ============================================================================
  // Provider Metadata
  // ============================================================================

  /**
   * Get provider type identifier
   */
  getType(): PaymentProviderType {
    return this.config.type;
  }

  /**
   * Get provider display name
   */
  getName(): string {
    return this.config.name;
  }

  /**
   * Get provider description
   */
  getDescription(): string {
    return this.config.description;
  }

  /**
   * Check if provider is enabled
   */
  isEnabled(): boolean {
    return this.config.enabled;
  }

  /**
   * Check if provider supports a specific capability
   */
  supports(capability: PaymentCapability): boolean {
    return this.config.capabilities.includes(capability);
  }

  /**
   * Get all provider capabilities
   */
  getCapabilities(): PaymentCapability[] {
    return this.config.capabilities;
  }

  // ============================================================================
  // Feature Flag Integration
  // ============================================================================

  /**
   * Check if feature flag allows this provider
   * Can be overridden by specific providers for custom logic
   */
  async checkFeatureFlag(userId?: string): Promise<boolean> {
    if (!this.config.featureFlagName) {
      return this.config.enabled;
    }

    try {
      const { data: flag } = await this.supabase
        .from('feature_flags')
        .select('enabled, rollout_pct')
        .eq('name', this.config.featureFlagName)
        .single();

      if (!flag?.enabled) {
        return false;
      }

      // If rollout percentage is 100 or not set, allow all users
      if (flag.rollout_pct === null || flag.rollout_pct === undefined || flag.rollout_pct >= 100) {
        return true;
      }

      // If rollout is 0%, exclude all users
      if (flag.rollout_pct === 0) {
        return false;
      }

      // Check if specific user is in rollout
      if (userId) {
        // Use consistent hashing to determine if user is in rollout
        const hash = this.hashUserId(userId);
        return (hash % 100) < flag.rollout_pct;
      }

      return false;
    } catch (error) {
      console.error(`Error checking feature flag for ${this.config.type}:`, error);
      return false;
    }
  }

  /**
   * Simple hash function for consistent user rollout
   */
  protected hashUserId(userId: string): number {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      const char = userId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  // ============================================================================
  // Error Handling
  // ============================================================================

  /**
   * Create a standardized error object
   */
  protected createError(code: string, message: string, details?: Record<string, any>): PaymentError {
    return {
      code,
      message,
      details,
    };
  }

  /**
   * Create a failed result
   */
  protected createFailure<T>(error: PaymentError): ProviderResult<T> {
    return {
      success: false,
      error,
    };
  }

  /**
   * Create a successful result
   */
  protected createSuccess<T>(data: T): ProviderResult<T> {
    return {
      success: true,
      data,
    };
  }

  /**
   * Create a list result
   */
  protected createListResult<T>(
    items: T[],
    total?: number,
    hasMore?: boolean
  ): ListResult<T> {
    return {
      success: true,
      items,
      total,
      hasMore,
    };
  }

  // ============================================================================
  // Abstract Methods (Must be implemented by providers)
  // ============================================================================

  /**
   * Initialize the provider
   * Can be used for auth token refresh, config validation, etc.
   */
  abstract initialize(): Promise<void>;

  /**
   * Validate provider configuration
   * Check if all required credentials and settings are present
   */
  abstract validateConfig(): Promise<boolean>;

  /**
   * Health check - verify provider is operational
   */
  abstract healthCheck(): Promise<boolean>;
}
