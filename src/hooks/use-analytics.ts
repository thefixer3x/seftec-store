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
  // Fetch wallet snapshots for transaction data
  const { data: snapshots, error } = await supabase
    .from('say_wallet_snapshots')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) throw error;

  if (!snapshots || snapshots.length === 0) {
    return {
      totalTransactions: 0,
      totalVolume: 0,
      monthlyGrowth: 0,
      averageTransactionValue: 0,
      transactionsByMonth: [],
      transactionsByProvider: [],
    };
  }

  // Calculate metrics
  const totalTransactions = snapshots.length;
  const totalVolume = snapshots.reduce((sum, s) => sum + (s.balance || 0), 0);
  const averageTransactionValue = totalVolume / totalTransactions;

  // Group by month
  const monthlyData = snapshots.reduce((acc: any, snapshot) => {
    const month = new Date(snapshot.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });

    if (!acc[month]) {
      acc[month] = { count: 0, volume: 0 };
    }

    acc[month].count += 1;
    acc[month].volume += snapshot.balance || 0;

    return acc;
  }, {});

  const transactionsByMonth = Object.entries(monthlyData).map(([month, data]: [string, any]) => ({
    month,
    count: data.count,
    volume: data.volume,
  }));

  // Calculate monthly growth
  const currentMonth = transactionsByMonth[transactionsByMonth.length - 1]?.volume || 0;
  const previousMonth = transactionsByMonth[transactionsByMonth.length - 2]?.volume || 0;
  const monthlyGrowth = previousMonth > 0 ? ((currentMonth - previousMonth) / previousMonth) * 100 : 0;

  // Fetch real PayPal subscription payments
  const { data: paypalPayments } = await supabase
    .from('subscription_payments')
    .select('amount, currency, created_at')
    .eq('user_id', userId);

  // Fetch user payments (consolidated payment history including PayPal)
  const { data: userPayments } = await supabase
    .from('user_payments')
    .select('amount, provider, payment_method, created_at')
    .eq('user_id', userId);

  // Calculate provider breakdown
  const providerData: Record<string, { count: number; volume: number }> = {};

  // Add wallet transactions as SaySwitch
  snapshots.forEach((snapshot) => {
    if (!providerData['SaySwitch']) {
      providerData['SaySwitch'] = { count: 0, volume: 0 };
    }
    providerData['SaySwitch'].count += 1;
    providerData['SaySwitch'].volume += snapshot.balance || 0;
  });

  // Add PayPal subscription payments
  if (paypalPayments && paypalPayments.length > 0) {
    paypalPayments.forEach((payment) => {
      if (!providerData['PayPal']) {
        providerData['PayPal'] = { count: 0, volume: 0 };
      }
      providerData['PayPal'].count += 1;
      providerData['PayPal'].volume += payment.amount || 0;
    });
  }

  // Add user payments by provider
  if (userPayments && userPayments.length > 0) {
    userPayments.forEach((payment) => {
      const provider = payment.provider || payment.payment_method || 'Other';
      if (!providerData[provider]) {
        providerData[provider] = { count: 0, volume: 0 };
      }
      providerData[provider].count += 1;
      providerData[provider].volume += payment.amount || 0;
    });
  }

  // Calculate total for percentages
  const totalProviderVolume = Object.values(providerData).reduce((sum, p) => sum + p.volume, 0);
  const totalProviderCount = Object.values(providerData).reduce((sum, p) => sum + p.count, 0);

  // Build provider array with percentages
  const transactionsByProvider = Object.entries(providerData).map(([provider, data]) => ({
    provider,
    count: data.count,
    volume: data.volume,
    percentage: totalProviderVolume > 0 ? (data.volume / totalProviderVolume) * 100 : 0,
  })).sort((a, b) => b.volume - a.volume); // Sort by volume descending

  return {
    totalTransactions: totalProviderCount,
    totalVolume: totalProviderVolume,
    monthlyGrowth,
    averageTransactionValue: totalProviderVolume / totalProviderCount,
    transactionsByMonth,
    transactionsByProvider,
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
  // Fetch applications for the user
  const { data: applications, error } = await supabase
    .from('trade_finance_applications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) throw error;

  if (!applications || applications.length === 0) {
    return {
      totalApplications: 0,
      totalValue: 0,
      approvalRate: 0,
      averageProcessingTime: 0,
      applicationsByStatus: [],
      applicationsByType: [],
      monthlyTrend: [],
    };
  }

  const totalApplications = applications.length;
  const totalValue = applications.reduce((sum, app) => sum + (app.amount || 0), 0);

  // Calculate approval rate
  const approvedCount = applications.filter(
    (app) => app.application_status === 'approved' || app.application_status === 'active'
  ).length;
  const approvalRate = (approvedCount / totalApplications) * 100;

  // Calculate average processing time
  const processedApplications = applications.filter(
    (app) => app.approved_date && app.submitted_date
  );
  const totalProcessingTime = processedApplications.reduce((sum, app) => {
    const submitted = new Date(app.submitted_date!).getTime();
    const approved = new Date(app.approved_date!).getTime();
    return sum + (approved - submitted) / (1000 * 60 * 60 * 24); // Convert to days
  }, 0);
  const averageProcessingTime = processedApplications.length > 0
    ? totalProcessingTime / processedApplications.length
    : 0;

  // Group by status
  const statusData = applications.reduce((acc: any, app) => {
    const status = app.application_status || 'unknown';
    if (!acc[status]) {
      acc[status] = { count: 0, value: 0 };
    }
    acc[status].count += 1;
    acc[status].value += app.amount || 0;
    return acc;
  }, {});

  const applicationsByStatus = Object.entries(statusData).map(([status, data]: [string, any]) => ({
    status,
    count: data.count,
    value: data.value,
  }));

  // Group by facility type
  const typeData = applications.reduce((acc: any, app) => {
    const type = app.facility_type || 'unknown';
    if (!acc[type]) {
      acc[type] = { count: 0, value: 0 };
    }
    acc[type].count += 1;
    acc[type].value += app.amount || 0;
    return acc;
  }, {});

  const applicationsByType = Object.entries(typeData).map(([facility_type, data]: [string, any]) => ({
    facility_type,
    count: data.count,
    value: data.value,
  }));

  // Group by month
  const monthlyData = applications.reduce((acc: any, app) => {
    const month = new Date(app.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });

    if (!acc[month]) {
      acc[month] = { applications: 0, value: 0 };
    }

    acc[month].applications += 1;
    acc[month].value += app.amount || 0;

    return acc;
  }, {});

  const monthlyTrend = Object.entries(monthlyData).map(([month, data]: [string, any]) => ({
    month,
    applications: data.applications,
    value: data.value,
  }));

  return {
    totalApplications,
    totalValue,
    approvalRate,
    averageProcessingTime,
    applicationsByStatus,
    applicationsByType,
    monthlyTrend,
  };
};

/**
 * Fetch marketplace analytics from database
 */
const fetchMarketplaceMetrics = async (userId: string): Promise<MarketplaceMetrics> => {
  // Fetch marketplace orders
  const { data: orders, error } = await supabase
    .from('marketplace_orders')
    .select('*')
    .or(`seller_id.eq.${userId},buyer_id.eq.${userId}`)
    .order('created_at', { ascending: false });

  if (error) throw error;

  if (!orders || orders.length === 0) {
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
  }

  const totalOrders = orders.length;
  const totalGMV = orders.reduce((sum, order) => sum + (order.amount || 0), 0);

  // Count unique sellers and buyers
  const uniqueSellers = new Set(orders.map((o) => o.seller_id)).size;
  const uniqueBuyers = new Set(orders.map((o) => o.buyer_id)).size;

  // Mock additional data
  const totalListings = Math.floor(totalOrders * 1.5);
  const activeListings = Math.floor(totalListings * 0.7);
  const conversionRate = (totalOrders / totalListings) * 100;

  return {
    totalListings,
    activeListings,
    totalOrders,
    totalGMV,
    sellerCount: uniqueSellers,
    buyerCount: uniqueBuyers,
    conversionRate,
    ordersByCategory: [],
    topSellers: [],
  };
};

/**
 * Fetch dashboard overview metrics
 */
const fetchDashboardMetrics = async (userId: string): Promise<DashboardMetrics> => {
  // Fetch wallet balance
  const { data: wallet } = await supabase
    .from('wallets')
    .select('balance')
    .eq('user_id', userId)
    .single();

  // Fetch AI usage cost
  const { data: aiUsage } = await supabase
    .from('ai_usage_logs')
    .select('estimated_cost')
    .eq('user_id', userId);

  const walletBalance = wallet?.balance || 0;
  const aiUsageCost = aiUsage?.reduce((sum, log) => sum + (log.estimated_cost || 0), 0) || 0;

  // Mock active users and total revenue (would need proper queries)
  const activeUsers = 152;
  const totalRevenue = 125680;

  return {
    activeUsers,
    totalRevenue,
    walletBalance,
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
