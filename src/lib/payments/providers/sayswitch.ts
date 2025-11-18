/**
 * SaySwitch Payment Provider
 *
 * Implementation of bill payment provider using SaySwitch API.
 * Supports airtime, data, TV, and electricity payments.
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import { PaymentProvider } from '../provider';
import type { IBillPaymentProvider } from '../bill-provider';
import type {
  PaymentProviderConfig,
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
  PaymentStatus,
} from '../types';

export class SaySwitchProvider extends PaymentProvider implements IBillPaymentProvider {
  private edgeFunctionName = 'sayswitch-bills';

  constructor(supabase: SupabaseClient) {
    const config: PaymentProviderConfig = {
      type: 'sayswitch',
      name: 'SaySwitch',
      description: 'Bill payment provider for airtime, data, TV, and electricity',
      enabled: true,
      featureFlagName: 'sayswitch_bills',
      capabilities: [
        'bill_payments',
        'airtime',
        'data',
        'tv',
        'electricity',
        'one_time_payments',
      ],
    };

    super(supabase, config);
  }

  // ============================================================================
  // Base Provider Implementation
  // ============================================================================

  async initialize(): Promise<void> {
    // SaySwitch doesn't require initialization
    // Edge function handles all authentication
  }

  async validateConfig(): Promise<boolean> {
    try {
      // Test edge function connectivity
      const { error } = await this.supabase.functions.invoke(this.edgeFunctionName, {
        body: { action: 'get_providers', category: 'airtime' },
      });

      return !error;
    } catch {
      return false;
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      const { data, error } = await this.supabase.functions.invoke(this.edgeFunctionName, {
        body: { action: 'get_providers', category: 'airtime' },
      });

      return !error && data?.success === true;
    } catch {
      return false;
    }
  }

  // ============================================================================
  // Provider Discovery
  // ============================================================================

  async getProviders(category: BillCategory): Promise<ListResult<BillProvider>> {
    try {
      const { data, error } = await this.supabase.functions.invoke(this.edgeFunctionName, {
        body: { action: 'get_providers', category },
      });

      if (error) {
        return {
          success: false,
          items: [],
          error: this.createError('GET_PROVIDERS_FAILED', error.message),
        };
      }

      if (!data?.success) {
        return {
          success: false,
          items: [],
          error: this.createError('GET_PROVIDERS_FAILED', data?.error || 'Failed to fetch providers'),
        };
      }

      const providers: BillProvider[] = (data.providers || []).map((p: any) => ({
        id: p.id || p.code,
        name: p.name,
        code: p.code,
        category,
        logo: p.logo,
      }));

      return this.createListResult(providers, providers.length);
    } catch (err: any) {
      return {
        success: false,
        items: [],
        error: this.createError('PROVIDER_ERROR', err.message || 'Unknown error'),
      };
    }
  }

  async getDataPlans(provider: string): Promise<ListResult<DataPlan>> {
    try {
      const { data, error } = await this.supabase.functions.invoke(this.edgeFunctionName, {
        body: { action: 'get_data_plans', provider },
      });

      if (error || !data?.success) {
        return {
          success: false,
          items: [],
          error: this.createError('GET_PLANS_FAILED', error?.message || data?.error || 'Failed to fetch data plans'),
        };
      }

      const plans: DataPlan[] = (data.plans || []).map((p: any) => ({
        id: p.id || p.code,
        name: p.name,
        code: p.code,
        amount: p.amount,
        validity: p.validity || p.duration || 'N/A',
        provider,
      }));

      return this.createListResult(plans, plans.length);
    } catch (err: any) {
      return {
        success: false,
        items: [],
        error: this.createError('PROVIDER_ERROR', err.message),
      };
    }
  }

  async getTVPackages(provider: string): Promise<ListResult<TVPackage>> {
    try {
      const { data, error } = await this.supabase.functions.invoke(this.edgeFunctionName, {
        body: { action: 'get_tv_packages', provider },
      });

      if (error || !data?.success) {
        return {
          success: false,
          items: [],
          error: this.createError('GET_PACKAGES_FAILED', error?.message || data?.error || 'Failed to fetch TV packages'),
        };
      }

      const packages: TVPackage[] = (data.packages || []).map((p: any) => ({
        id: p.id || p.code,
        name: p.name,
        code: p.code,
        amount: p.amount,
        duration: p.duration || 'N/A',
        provider,
      }));

      return this.createListResult(packages, packages.length);
    } catch (err: any) {
      return {
        success: false,
        items: [],
        error: this.createError('PROVIDER_ERROR', err.message),
      };
    }
  }

  // ============================================================================
  // Customer Validation
  // ============================================================================

  async validateCustomer(request: CustomerValidationRequest): Promise<CustomerValidationResponse> {
    try {
      const { data, error } = await this.supabase.functions.invoke(this.edgeFunctionName, {
        body: {
          action: 'validate_customer',
          provider: request.provider,
          customer_id: request.customerId,
        },
      });

      if (error || !data?.success) {
        return {
          success: false,
          error: this.createError('VALIDATION_FAILED', error?.message || data?.error || 'Customer validation failed'),
        };
      }

      return {
        success: true,
        customerName: data.customer?.name,
        customerInfo: data.customer,
      };
    } catch (err: any) {
      return {
        success: false,
        error: this.createError('PROVIDER_ERROR', err.message),
      };
    }
  }

  // ============================================================================
  // Payment Processing
  // ============================================================================

  async payBill(request: BillPaymentRequest): Promise<BillPaymentResponse> {
    switch (request.category) {
      case 'airtime':
        return this.payAirtime(
          request.customerId,
          request.amount!,
          request.provider
        );
      case 'data':
        return this.payData(
          request.customerId,
          request.provider,
          request.planCode!
        );
      case 'tv':
        return this.payTV(
          request.customerId,
          request.provider,
          request.packageCode!
        );
      case 'electricity':
        return this.payElectricity(
          request.customerId,
          request.provider,
          request.amount!,
          request.meterType
        );
      default:
        return {
          success: false,
          reference: '',
          status: 'failed',
          amount: 0,
          provider: request.provider,
          error: this.createError('INVALID_CATEGORY', `Unsupported category: ${request.category}`),
        };
    }
  }

  async payAirtime(
    phone: string,
    amount: number,
    provider: string
  ): Promise<BillPaymentResponse> {
    try {
      const { data, error } = await this.supabase.functions.invoke(this.edgeFunctionName, {
        body: {
          action: 'pay_airtime',
          phone,
          amount,
          provider,
        },
      });

      if (error || !data?.success) {
        return {
          success: false,
          reference: '',
          status: 'failed',
          amount,
          provider,
          error: this.createError('PAYMENT_FAILED', error?.message || data?.error || 'Airtime payment failed'),
        };
      }

      return {
        success: true,
        reference: data.reference,
        status: this.mapStatus(data.transaction?.status),
        amount,
        provider,
      };
    } catch (err: any) {
      return {
        success: false,
        reference: '',
        status: 'failed',
        amount,
        provider,
        error: this.createError('PROVIDER_ERROR', err.message),
      };
    }
  }

  async payData(
    phone: string,
    provider: string,
    planCode: string
  ): Promise<BillPaymentResponse> {
    try {
      const { data, error } = await this.supabase.functions.invoke(this.edgeFunctionName, {
        body: {
          action: 'pay_data',
          phone,
          provider,
          plan_code: planCode,
        },
      });

      if (error || !data?.success) {
        return {
          success: false,
          reference: '',
          status: 'failed',
          amount: 0,
          provider,
          error: this.createError('PAYMENT_FAILED', error?.message || data?.error || 'Data payment failed'),
        };
      }

      return {
        success: true,
        reference: data.reference,
        status: this.mapStatus(data.transaction?.status),
        amount: data.transaction?.amount || 0,
        provider,
      };
    } catch (err: any) {
      return {
        success: false,
        reference: '',
        status: 'failed',
        amount: 0,
        provider,
        error: this.createError('PROVIDER_ERROR', err.message),
      };
    }
  }

  async payTV(
    smartcard: string,
    provider: string,
    packageCode: string
  ): Promise<BillPaymentResponse> {
    try {
      const { data, error } = await this.supabase.functions.invoke(this.edgeFunctionName, {
        body: {
          action: 'pay_tv',
          smartcard,
          provider,
          package_code: packageCode,
        },
      });

      if (error || !data?.success) {
        return {
          success: false,
          reference: '',
          status: 'failed',
          amount: 0,
          provider,
          error: this.createError('PAYMENT_FAILED', error?.message || data?.error || 'TV payment failed'),
        };
      }

      return {
        success: true,
        reference: data.reference,
        status: this.mapStatus(data.transaction?.status),
        amount: data.transaction?.amount || 0,
        provider,
      };
    } catch (err: any) {
      return {
        success: false,
        reference: '',
        status: 'failed',
        amount: 0,
        provider,
        error: this.createError('PROVIDER_ERROR', err.message),
      };
    }
  }

  async payElectricity(
    meterNumber: string,
    provider: string,
    amount: number,
    meterType: 'prepaid' | 'postpaid' = 'prepaid'
  ): Promise<BillPaymentResponse> {
    try {
      const { data, error } = await this.supabase.functions.invoke(this.edgeFunctionName, {
        body: {
          action: 'pay_electricity',
          meter_number: meterNumber,
          provider,
          amount,
          meter_type: meterType,
        },
      });

      if (error || !data?.success) {
        return {
          success: false,
          reference: '',
          status: 'failed',
          amount,
          provider,
          error: this.createError('PAYMENT_FAILED', error?.message || data?.error || 'Electricity payment failed'),
        };
      }

      return {
        success: true,
        reference: data.reference,
        status: this.mapStatus(data.transaction?.status),
        amount,
        provider,
        token: data.token,
      };
    } catch (err: any) {
      return {
        success: false,
        reference: '',
        status: 'failed',
        amount,
        provider,
        error: this.createError('PROVIDER_ERROR', err.message),
      };
    }
  }

  // ============================================================================
  // Transaction History
  // ============================================================================

  async getUserTransactions(userId: string, category?: BillCategory): Promise<ListResult<Transaction>> {
    try {
      let query = this.supabase
        .from('say_orders')
        .select('*')
        .eq('user_id', userId)
        .eq('type', 'bill')
        .order('created_at', { ascending: false });

      if (category) {
        // Filter by category if provider matches category
        // This is a simplified approach; may need refinement
        query = query.contains('recipient_details', { type: category });
      }

      const { data, error } = await query;

      if (error) {
        return {
          success: false,
          items: [],
          error: this.createError('QUERY_FAILED', error.message),
        };
      }

      const transactions: Transaction[] = (data || []).map((order: any) => ({
        id: order.id,
        userId: order.user_id,
        provider: 'sayswitch',
        type: 'bill',
        category: this.inferCategory(order),
        amount: order.amount,
        currency: order.currency || 'NGN',
        status: this.mapStatus(order.status),
        reference: order.reference,
        providerReference: order.say_reference,
        recipientDetails: order.recipient_details,
        createdAt: order.created_at,
        completedAt: order.completed_at,
        cancelledAt: null,
      }));

      return this.createListResult(transactions, transactions.length);
    } catch (err: any) {
      return {
        success: false,
        items: [],
        error: this.createError('PROVIDER_ERROR', err.message),
      };
    }
  }

  async getTransaction(reference: string): Promise<ProviderResult<Transaction>> {
    try {
      const { data, error } = await this.supabase
        .from('say_orders')
        .select('*')
        .eq('reference', reference)
        .single();

      if (error || !data) {
        return this.createFailure(
          this.createError('NOT_FOUND', 'Transaction not found')
        );
      }

      const transaction: Transaction = {
        id: data.id,
        userId: data.user_id,
        provider: 'sayswitch',
        type: 'bill',
        category: this.inferCategory(data),
        amount: data.amount,
        currency: data.currency || 'NGN',
        status: this.mapStatus(data.status),
        reference: data.reference,
        providerReference: data.say_reference,
        recipientDetails: data.recipient_details,
        createdAt: data.created_at,
        completedAt: data.completed_at,
        cancelledAt: null,
      };

      return this.createSuccess(transaction);
    } catch (err: any) {
      return this.createFailure(
        this.createError('PROVIDER_ERROR', err.message)
      );
    }
  }

  // ============================================================================
  // Favorites Management
  // ============================================================================

  async getFavorites(userId: string, type?: BillCategory): Promise<ListResult<BillFavorite>> {
    try {
      const { data, error } = await this.supabase.functions.invoke(this.edgeFunctionName, {
        body: { action: 'get_favorites', type },
      });

      if (error || !data?.success) {
        return {
          success: false,
          items: [],
          error: this.createError('QUERY_FAILED', error?.message || data?.error || 'Failed to fetch favorites'),
        };
      }

      const favorites: BillFavorite[] = (data.favorites || []).map((f: any) => ({
        id: f.id,
        type: f.type,
        provider: f.provider,
        customerId: f.customer_id,
        nickname: f.nickname,
        metadata: f.metadata,
        createdAt: f.created_at,
      }));

      return this.createListResult(favorites, favorites.length);
    } catch (err: any) {
      return {
        success: false,
        items: [],
        error: this.createError('PROVIDER_ERROR', err.message),
      };
    }
  }

  async deleteFavorite(favoriteId: string): Promise<ProviderResult<void>> {
    try {
      const { data, error } = await this.supabase.functions.invoke(this.edgeFunctionName, {
        body: { action: 'delete_favorite', id: favoriteId },
      });

      if (error || !data?.success) {
        return this.createFailure(
          this.createError('DELETE_FAILED', error?.message || data?.error || 'Failed to delete favorite')
        );
      }

      return this.createSuccess(undefined);
    } catch (err: any) {
      return this.createFailure(
        this.createError('PROVIDER_ERROR', err.message)
      );
    }
  }

  // ============================================================================
  // Utility Methods
  // ============================================================================

  private mapStatus(rawStatus: string): PaymentStatus {
    const statusMap: Record<string, PaymentStatus> = {
      'success': 'completed',
      'completed': 'completed',
      'pending': 'pending',
      'processing': 'processing',
      'failed': 'failed',
      'cancelled': 'cancelled',
    };

    return statusMap[rawStatus?.toLowerCase()] || 'pending';
  }

  private inferCategory(order: any): BillCategory | undefined {
    const ref = order.reference?.toLowerCase() || '';
    if (ref.startsWith('airtime')) return 'airtime';
    if (ref.startsWith('data')) return 'data';
    if (ref.startsWith('tv')) return 'tv';
    if (ref.startsWith('power')) return 'electricity';
    return undefined;
  }
}
