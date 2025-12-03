import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

// Analytics data types
export interface PaymentMetrics {
  totalTransactions: number;
  totalVolume: number;
  monthlyGrowth: number;
  averageTransactionValue: number;
  transactionsByMonth: {
    month: string;
    count: number;
    volume: number;
  }[];
  transactionsByProvider: {
    provider: string;
    count: number;
    volume: number;
    percentage: number;
  }[];
}

export interface OrderMetrics {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: {
    status: string;
    count: number;
  }[];
  ordersByMonth: {
    month: string;
    count: number;
    revenue: number;
  }[];
  topProducts: {
    product_id: string;
    product_name: string;
    quantity_sold: number;
    revenue: number;
  }[];
}

export interface TradeFinanceMetrics {
  totalApplications: number;
  totalValue: number;
  approvalRate: number;
  averageProcessingTime: number; // in days
  applicationsByStatus: {
    status: string;
    count: number;
    value: number;
  }[];
  applicationsByType: {
    facility_type: string;
    count: number;
    value: number;
  }[];
  monthlyTrend: {
    month: string;
    applications: number;
    value: number;
  }[];
}

export interface MarketplaceMetrics {
  totalListings: number;
  activeListings: number;
  totalOrders: number;
  totalGMV: number; // Gross Merchandise Value
  sellerCount: number;
  buyerCount: number;
  conversionRate: number;
  ordersByCategory: {
    category: string;
    count: number;
    revenue: number;
  }[];
  topSellers: {
    seller_id: string;
    seller_name: string;
    total_sales: number;
    order_count: number;
  }[];
}

export interface DashboardMetrics {
  activeUsers: number;
  totalRevenue: number;
  walletBalance: number;
  aiUsageCost: number;
}

/**
 * Fetch payment analytics from database
 */
const fetchPaymentMetrics = async (userId: string): Promise<PaymentMetrics> => {
  // Note: Many tables referenced here don't exist yet (say_wallet_snapshots, subscription_payments, user_payments)
  // Return default empty metrics until tables are created
  return {
    totalTransactions: 0,
    totalVolume: 0,
    monthlyGrowth: 0,
    averageTransactionValue: 0,
    transactionsByMonth: [],
    transactionsByProvider: [],
  };
};

/**
 * Fetch order analytics from database
 */
const fetchOrderMetrics = async (userId: string): Promise<OrderMetrics> => {
  // Fetch orders for the user
  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        product_id,
        quantity,
        unit_price,
        subtotal
      )
    `)
    .eq('customer_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  if (!orders || orders.length === 0) {
    return {
      totalOrders: 0,
      totalRevenue: 0,
      averageOrderValue: 0,
      ordersByStatus: [],
      ordersByMonth: [],
      topProducts: [],
    };
  }

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
  const averageOrderValue = totalRevenue / totalOrders;

  // Group by status
  const statusData = orders.reduce((acc: any, order) => {
    const status = order.status || 'unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const ordersByStatus = Object.entries(statusData).map(([status, count]) => ({
    status,
    count: count as number,
  }));

  // Group by month
  const monthlyData = orders.reduce((acc: any, order) => {
    const month = new Date(order.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });

    if (!acc[month]) {
      acc[month] = { count: 0, revenue: 0 };
    }

    acc[month].count += 1;
    acc[month].revenue += order.total_amount || 0;

    return acc;
  }, {});

  const ordersByMonth = Object.entries(monthlyData).map(([month, data]: [string, any]) => ({
    month,
    count: data.count,
    revenue: data.revenue,
  }));

  // Calculate top products
  const productData = orders.reduce((acc: any, order) => {
    if (order.order_items) {
      order.order_items.forEach((item: any) => {
        const productId = item.product_id;
        if (!acc[productId]) {
          acc[productId] = {
            product_id: productId,
            product_name: `Product ${productId}`,
            quantity_sold: 0,
            revenue: 0,
          };
        }
        acc[productId].quantity_sold += item.quantity || 0;
        acc[productId].revenue += item.subtotal || 0;
      });
    }
    return acc;
  }, {});

  const topProducts = Object.values(productData)
    .sort((a: any, b: any) => b.revenue - a.revenue)
    .slice(0, 10);

  return {
    totalOrders,
    totalRevenue,
    averageOrderValue,
    ordersByStatus,
    ordersByMonth,
    topProducts: topProducts as any[],
  };
};

/**
 * Fetch trade finance analytics from database
 */
const fetchTradeFinanceMetrics = async (userId: string): Promise<TradeFinanceMetrics> => {
  // Note: trade_finance_applications table doesn't exist in the database schema
  // Return default empty metrics until table is created
  return {
    totalApplications: 0,
    totalValue: 0,
    approvalRate: 0,
    averageProcessingTime: 0,
    applicationsByStatus: [],
    applicationsByType: [],
    monthlyTrend: [],
  };
};

/**
 * Fetch marketplace analytics from database
 */
const fetchMarketplaceMetrics = async (userId: string): Promise<MarketplaceMetrics> => {
  // Note: marketplace_orders table doesn't exist - use marketplace_transactions instead
  // Return default empty metrics for now
  return {
    totalListings: 0,
    activeListings: 0,
    totalOrders: 0,
    totalGMV: 0,
    sellerCount: 0,
    buyerCount: 0,
    conversionRate: 0,
    ordersByCategory: [],
    topSellers: [],
  };
};

/**
 * Fetch dashboard overview metrics
 */
const fetchDashboardMetrics = async (userId: string): Promise<DashboardMetrics> => {
  // Note: Many tables referenced don't exist (wallets, marketplace_orders, say_orders, subscription_payments)
  // Return default metrics until tables are created
  
  // Only fetch from tables that exist
  const { data: aiUsage } = await supabase
    .from('ai_usage_logs')
    .select('estimated_cost')
    .eq('user_id', userId);

  const aiUsageCost = aiUsage?.reduce((sum, log) => sum + (log.estimated_cost || 0), 0) || 0;

  // Get orders revenue from existing orders table
  const { data: orders } = await supabase
    .from('orders')
    .select('total_amount')
    .eq('customer_id', userId);

  const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;

  return {
    activeUsers: 0,
    totalRevenue,
    walletBalance: 0,
    aiUsageCost,
  };
};

/**
 * Hook for payment analytics
 */
export const usePaymentAnalytics = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['payment-analytics', user?.id],
    queryFn: () => fetchPaymentMetrics(user!.id),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook for order analytics
 */
export const useOrderAnalytics = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['order-analytics', user?.id],
    queryFn: () => fetchOrderMetrics(user!.id),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook for trade finance analytics
 */
export const useTradeFinanceAnalytics = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['trade-finance-analytics', user?.id],
    queryFn: () => fetchTradeFinanceMetrics(user!.id),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook for marketplace analytics
 */
export const useMarketplaceAnalytics = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['marketplace-analytics', user?.id],
    queryFn: () => fetchMarketplaceMetrics(user!.id),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook for dashboard overview metrics
 */
export const useDashboardAnalytics = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['dashboard-analytics', user?.id],
    queryFn: () => fetchDashboardMetrics(user!.id),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });
};
