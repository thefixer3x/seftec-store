/**
 * Bill Payment Provider Interface
 *
 * Interface for providers that support bill payments (SaySwitch, Flutterwave, etc.)
 */

import type { PaymentProvider } from './provider';
import type {
  BillProvider,
  BillCategory,
  DataPlan,
  TVPackage,
  BillPaymentRequest,
  BillPaymentResponse,
  CustomerValidationRequest,
  CustomerValidationResponse,
  BillFavorite,
  ProviderResult,
  ListResult,
  Transaction,
} from './types';

/**
 * Bill Payment Provider Interface
 *
 * Providers that support bill payments must implement this interface.
 */
export interface IBillPaymentProvider extends PaymentProvider {
  // ============================================================================
  // Provider Discovery
  // ============================================================================

  /**
   * Get list of bill providers for a category
   */
  getProviders(category: BillCategory): Promise<ListResult<BillProvider>>;

  /**
   * Get data plans for a provider
   */
  getDataPlans?(provider: string): Promise<ListResult<DataPlan>>;

  /**
   * Get TV packages for a provider
   */
  getTVPackages?(provider: string): Promise<ListResult<TVPackage>>;

  // ============================================================================
  // Customer Validation
  // ============================================================================

  /**
   * Validate customer details (smartcard, meter number, etc.)
   */
  validateCustomer(request: CustomerValidationRequest): Promise<CustomerValidationResponse>;

  // ============================================================================
  // Payment Processing
  // ============================================================================

  /**
   * Process a bill payment
   */
  payBill(request: BillPaymentRequest): Promise<BillPaymentResponse>;

  /**
   * Pay mobile airtime
   */
  payAirtime?(
    phone: string,
    amount: number,
    provider: string
  ): Promise<BillPaymentResponse>;

  /**
   * Pay mobile data
   */
  payData?(
    phone: string,
    provider: string,
    planCode: string
  ): Promise<BillPaymentResponse>;

  /**
   * Pay TV/Cable subscription
   */
  payTV?(
    smartcard: string,
    provider: string,
    packageCode: string
  ): Promise<BillPaymentResponse>;

  /**
   * Pay electricity bill
   */
  payElectricity?(
    meterNumber: string,
    provider: string,
    amount: number,
    meterType?: 'prepaid' | 'postpaid'
  ): Promise<BillPaymentResponse>;

  // ============================================================================
  // Transaction History
  // ============================================================================

  /**
   * Get user's bill payment history
   */
  getUserTransactions(userId: string, category?: BillCategory): Promise<ListResult<Transaction>>;

  /**
   * Get transaction details
   */
  getTransaction(reference: string): Promise<ProviderResult<Transaction>>;

  // ============================================================================
  // Favorites Management
  // ============================================================================

  /**
   * Save a bill payment as favorite
   */
  saveFavorite?(favorite: Omit<BillFavorite, 'id' | 'createdAt'>): Promise<ProviderResult<BillFavorite>>;

  /**
   * Get user's favorite bill payments
   */
  getFavorites?(userId: string, type?: BillCategory): Promise<ListResult<BillFavorite>>;

  /**
   * Delete a favorite
   */
  deleteFavorite?(favoriteId: string): Promise<ProviderResult<void>>;
}
