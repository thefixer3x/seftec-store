import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  ShoppingCart,
  TrendingUp,
  Users,
  Package,
  DollarSign,
  Activity,
  Loader2,
  PercentIcon,
} from 'lucide-react';
import { useMarketplaceAnalytics } from '@/hooks/use-analytics';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

const formatCurrency = (value: number, currency: string = 'NGN') => {
  return `${currency} ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const MarketplaceAnalytics: React.FC = () => {
  const { data: analytics, isLoading, error } = useMarketplaceAnalytics();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading analytics...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load analytics. Please try again.</p>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Listings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {analytics.totalListings}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  {analytics.activeListings} active
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {analytics.totalOrders}
                </p>
                <p className="text-xs text-gray-500 mt-1">All time</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                <ShoppingCart className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">GMV</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {formatCurrency(analytics.totalGMV)}
                </p>
                <p className="text-xs text-gray-500 mt-1">Gross Merchandise Value</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {analytics.conversionRate.toFixed(1)}%
                </p>
                <p className="text-xs text-gray-500 mt-1">Orders / Listings</p>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                <PercentIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Sellers</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {analytics.sellerCount}
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Buyers</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {analytics.buyerCount}
                </p>
              </div>
              <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-full">
                <Users className="h-6 w-6 text-pink-600 dark:text-pink-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="sellers">Top Sellers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Marketplace Performance</CardTitle>
              <CardDescription>
                Key performance indicators for the marketplace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Listings Status */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Active Listings</span>
                    <span className="text-sm text-gray-600">
                      {analytics.activeListings} / {analytics.totalListings}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(analytics.activeListings / analytics.totalListings) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Conversion Metrics */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Conversion Rate</span>
                    <span className="text-sm text-gray-600">
                      {analytics.conversionRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${analytics.conversionRate}%` }}
                    />
                  </div>
                </div>

                {/* Average Order Value */}
                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Order Value</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                        {formatCurrency(
                          analytics.totalOrders > 0 ? analytics.totalGMV / analytics.totalOrders : 0
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Listing Value</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                        {formatCurrency(
                          analytics.totalListings > 0
                            ? analytics.totalGMV / analytics.totalListings
                            : 0
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>
                {analytics.ordersByCategory.length > 0
                  ? 'Breakdown of orders across different product categories'
                  : 'No category data available yet'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analytics.ordersByCategory.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.ordersByCategory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#3B82F6" name="Orders" />
                    <Bar dataKey="revenue" fill="#10B981" name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No category data available yet</p>
                  <p className="text-sm mt-2">Data will appear as orders are placed</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sellers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Sellers</CardTitle>
              <CardDescription>
                {analytics.topSellers.length > 0
                  ? 'Best performing sellers by revenue'
                  : 'No seller data available yet'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analytics.topSellers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Rank</th>
                        <th className="text-left p-2">Seller</th>
                        <th className="text-right p-2">Orders</th>
                        <th className="text-right p-2">Total Sales</th>
                        <th className="text-right p-2">Avg. Order Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.topSellers.map((seller, index) => (
                        <tr key={seller.seller_id} className="border-b">
                          <td className="p-2">
                            <span className="font-bold text-blue-600">#{index + 1}</span>
                          </td>
                          <td className="p-2">{seller.seller_name}</td>
                          <td className="text-right p-2">{seller.order_count}</td>
                          <td className="text-right p-2">
                            {formatCurrency(seller.total_sales)}
                          </td>
                          <td className="text-right p-2">
                            {formatCurrency(seller.total_sales / seller.order_count)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No seller data available yet</p>
                  <p className="text-sm mt-2">Rankings will appear as sales are made</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketplaceAnalytics;
