/**
 * Payment Provider System
 *
 * Unified payment provider interface for SEFTEC Store.
 * Supports multiple payment providers with a consistent API.
 */

// Core Types
export type {
  PaymentProviderType,
  PaymentProviderConfig,
  PaymentCapability,
  PaymentRequest,
  PaymentResponse,
  PaymentStatus,
  PaymentError,
  SubscriptionPlan,
  BillingCycle,
  CreateSubscriptionRequest,
  SubscriptionResponse,
  SubscriptionStatus,
  CancelSubscriptionRequest,
  UpdateSubscriptionRequest,
  BillCategory,
  BillProvider,
  DataPlan,
  TVPackage,
  BillPaymentRequest,
  BillPaymentResponse,
  CustomerValidationRequest,
  CustomerValidationResponse,
  BillFavorite,
  Transaction,
  ProviderResult,
  ListResult,
} from './types';

// Base Provider Classes
export { PaymentProvider } from './provider';
export type { ISubscriptionProvider } from './subscription-provider';
export type { IBillPaymentProvider } from './bill-provider';

// Provider Implementations
export { PayPalProvider } from './providers/paypal';
export { SaySwitchProvider } from './providers/sayswitch';

// Registry & Factory
export {
  PaymentProviderRegistry,
  PaymentProviderFactory,
  usePaymentProviders,
} from './registry';
