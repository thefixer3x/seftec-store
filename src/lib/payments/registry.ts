/**
 * Payment Provider Registry
 *
 * Factory and registry for managing payment providers.
 * Provides centralized access to all payment providers with proper initialization.
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PaymentProvider } from './provider';
import type { ISubscriptionProvider } from './subscription-provider';
import type { IBillPaymentProvider } from './bill-provider';
import type { PaymentProviderType } from './types';

import { PayPalProvider } from './providers/paypal';
import { SaySwitchProvider } from './providers/sayswitch';

/**
 * Payment Provider Registry
 *
 * Singleton registry for managing payment provider instances.
 * Ensures providers are properly initialized and reused.
 */
export class PaymentProviderRegistry {
  private static instance: PaymentProviderRegistry;
  private providers: Map<PaymentProviderType, PaymentProvider> = new Map();
  private supabase: SupabaseClient;
  private initialized = false;

  private constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  /**
   * Get or create the singleton registry instance
   */
  static getInstance(supabase: SupabaseClient): PaymentProviderRegistry {
    if (!PaymentProviderRegistry.instance) {
      PaymentProviderRegistry.instance = new PaymentProviderRegistry(supabase);
    }
    return PaymentProviderRegistry.instance;
  }

  /**
   * Initialize all payment providers
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Register all available providers
      this.registerProvider('paypal', new PayPalProvider(this.supabase));
      this.registerProvider('sayswitch', new SaySwitchProvider(this.supabase));

      // Initialize each provider
      const initPromises = Array.from(this.providers.values()).map(provider =>
        provider.initialize().catch(err => {
          console.error(`Failed to initialize ${provider.getName()}:`, err);
        })
      );

      await Promise.all(initPromises);
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize payment provider registry:', error);
      throw error;
    }
  }

  /**
   * Register a payment provider
   */
  private registerProvider(type: PaymentProviderType, provider: PaymentProvider): void {
    this.providers.set(type, provider);
  }

  /**
   * Get a specific payment provider by type
   */
  getProvider(type: PaymentProviderType): PaymentProvider | undefined {
    return this.providers.get(type);
  }

  /**
   * Get a subscription provider
   */
  getSubscriptionProvider(type: PaymentProviderType): ISubscriptionProvider | undefined {
    const provider = this.providers.get(type);
    if (!provider) return undefined;

    // Check if provider supports subscriptions
    if (!provider.supports('subscriptions')) {
      console.warn(`Provider ${type} does not support subscriptions`);
      return undefined;
    }

    return provider as ISubscriptionProvider;
  }

  /**
   * Get a bill payment provider
   */
  getBillPaymentProvider(type: PaymentProviderType): IBillPaymentProvider | undefined {
    const provider = this.providers.get(type);
    if (!provider) return undefined;

    // Check if provider supports bill payments
    if (!provider.supports('bill_payments')) {
      console.warn(`Provider ${type} does not support bill payments`);
      return undefined;
    }

    return provider as IBillPaymentProvider;
  }

  /**
   * Get all registered providers
   */
  getAllProviders(): PaymentProvider[] {
    return Array.from(this.providers.values());
  }

  /**
   * Get all enabled providers
   */
  getEnabledProviders(): PaymentProvider[] {
    return this.getAllProviders().filter(provider => provider.isEnabled());
  }

  /**
   * Get all providers that support a specific capability
   */
  getProvidersByCapability(capability: string): PaymentProvider[] {
    return this.getAllProviders().filter(provider =>
      provider.supports(capability as any)
    );
  }

  /**
   * Get all subscription providers
   */
  getSubscriptionProviders(): ISubscriptionProvider[] {
    return this.getProvidersByCapability('subscriptions') as ISubscriptionProvider[];
  }

  /**
   * Get all bill payment providers
   */
  getBillPaymentProviders(): IBillPaymentProvider[] {
    return this.getProvidersByCapability('bill_payments') as IBillPaymentProvider[];
  }

  /**
   * Health check all providers
   */
  async healthCheckAll(): Promise<Map<PaymentProviderType, boolean>> {
    const results = new Map<PaymentProviderType, boolean>();

    const checks = Array.from(this.providers.entries()).map(async ([type, provider]) => {
      try {
        const healthy = await provider.healthCheck();
        results.set(type, healthy);
      } catch {
        results.set(type, false);
      }
    });

    await Promise.all(checks);
    return results;
  }

  /**
   * Reset the registry (mainly for testing)
   */
  static reset(): void {
    if (PaymentProviderRegistry.instance) {
      PaymentProviderRegistry.instance.providers.clear();
      PaymentProviderRegistry.instance.initialized = false;
    }
    // Reset the singleton instance
    (PaymentProviderRegistry as any).instance = undefined;
  }
}

/**
 * Payment Provider Factory
 *
 * Convenient factory functions for creating and accessing payment providers.
 */
export class PaymentProviderFactory {
  /**
   * Create a PayPal provider instance
   */
  static createPayPalProvider(supabase: SupabaseClient): PayPalProvider {
    return new PayPalProvider(supabase);
  }

  /**
   * Create a SaySwitch provider instance
   */
  static createSaySwitchProvider(supabase: SupabaseClient): SaySwitchProvider {
    return new SaySwitchProvider(supabase);
  }

  /**
   * Create a provider by type
   */
  static createProvider(
    type: PaymentProviderType,
    supabase: SupabaseClient
  ): PaymentProvider | null {
    switch (type) {
      case 'paypal':
        return PaymentProviderFactory.createPayPalProvider(supabase);
      case 'sayswitch':
        return PaymentProviderFactory.createSaySwitchProvider(supabase);
      default:
        console.warn(`Unknown provider type: ${type}`);
        return null;
    }
  }

  /**
   * Get or create registry instance
   */
  static getRegistry(supabase: SupabaseClient): PaymentProviderRegistry {
    return PaymentProviderRegistry.getInstance(supabase);
  }
}

/**
 * Hook-friendly provider access
 *
 * Helper functions for use in React components/hooks.
 */
export const usePaymentProviders = (supabase: SupabaseClient) => {
  const registry = PaymentProviderRegistry.getInstance(supabase);

  return {
    registry,
    paypal: registry.getProvider('paypal') as PayPalProvider | undefined,
    sayswitch: registry.getProvider('sayswitch') as SaySwitchProvider | undefined,
    getProvider: (type: PaymentProviderType) => registry.getProvider(type),
    getSubscriptionProvider: (type: PaymentProviderType) =>
      registry.getSubscriptionProvider(type),
    getBillPaymentProvider: (type: PaymentProviderType) =>
      registry.getBillPaymentProvider(type),
    getAllProviders: () => registry.getAllProviders(),
    getEnabledProviders: () => registry.getEnabledProviders(),
  };
};
