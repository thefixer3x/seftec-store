import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Download,
  FileText,
  Calendar,
  Filter,
  Loader2,
  FileSpreadsheet,
  Printer,
} from 'lucide-react';
import { useTradeFinance } from '@/hooks/use-trade-finance';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import {
  exportTradeFinanceApplications,
  exportMarketplaceOrders,
  exportOrders,
  exportTransactions,
  exportAnalyticsData,
  downloadJSON,
  printPage,
} from '@/utils/export';

interface DateRange {
  startDate: string;
  endDate: string;
}

export const Reports: React.FC = () => {
  const { user } = useAuth();
  const { applications } = useTradeFinance();

  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  // Fetch marketplace orders
  const { data: marketplaceOrders, isLoading: isLoadingMarketplace } = useQuery({
    queryKey: ['marketplace-orders-report', user?.id, dateRange],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketplace_orders')
        .select('*')
        .or(`seller_id.eq.${user!.id},buyer_id.eq.${user!.id}`)
        .gte('created_at', dateRange.startDate)
        .lte('created_at', dateRange.endDate)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  // Fetch regular orders
  const { data: orders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['orders-report', user?.id, dateRange],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', user!.id)
        .gte('created_at', dateRange.startDate)
        .lte('created_at', dateRange.endDate)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  // Fetch wallet transactions
  const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ['transactions-report', user?.id, dateRange],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('say_wallet_snapshots')
        .select('*')
        .eq('user_id', user!.id)
        .gte('created_at', dateRange.startDate)
        .lte('created_at', dateRange.endDate)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  // Fetch PayPal subscriptions
  const { data: subscriptions, isLoading: isLoadingSubscriptions } = useQuery({
    queryKey: ['subscriptions-report', user?.id, dateRange],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user!.id)
        .gte('created_at', dateRange.startDate)
        .lte('created_at', dateRange.endDate)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  // Filter applications by date range
  const filteredApplications = applications.filter((app) => {
    const createdDate = new Date(app.created_at).toISOString().split('T')[0];
    return createdDate >= dateRange.startDate && createdDate <= dateRange.endDate;
  });

  const handleDateChange = (field: keyof DateRange, value: string) => {
    setDateRange((prev) => ({ ...prev, [field]: value }));
  };

  const handleExportTradeFinance = (format: 'csv' | 'json') => {
    if (format === 'csv') {
      exportTradeFinanceApplications(filteredApplications);
    } else {
      downloadJSON(filteredApplications, `trade-finance-applications-${Date.now()}`);
    }
  };

  const handleExportMarketplace = (format: 'csv' | 'json') => {
    if (!marketplaceOrders) return;
    if (format === 'csv') {
      exportMarketplaceOrders(marketplaceOrders);
    } else {
      downloadJSON(marketplaceOrders, `marketplace-orders-${Date.now()}`);
    }
  };

  const handleExportOrders = (format: 'csv' | 'json') => {
    if (!orders) return;
    if (format === 'csv') {
      exportOrders(orders);
    } else {
      downloadJSON(orders, `orders-${Date.now()}`);
    }
  };

  const handleExportTransactions = (format: 'csv' | 'json') => {
    if (!transactions) return;
    if (format === 'csv') {
      exportTransactions(transactions);
    } else {
      downloadJSON(transactions, `transactions-${Date.now()}`);
    }
  };

  const handleExportSubscriptions = (format: 'csv' | 'json') => {
    if (!subscriptions) return;
    if (format === 'csv') {
      // We'll create this export function in export.ts
      const exportData = subscriptions.map((sub: any) => ({
        'Subscription ID': sub.subscription_id,
        'Plan ID': sub.plan_id,
        'Status': sub.status,
        'Quantity': sub.quantity || 1,
        'Custom ID': sub.custom_id || '',
        'Created At': new Date(sub.created_at).toLocaleDateString(),
        'Updated At': new Date(sub.updated_at).toLocaleDateString(),
        'Cancelled At': sub.cancelled_at ? new Date(sub.cancelled_at).toLocaleDateString() : '',
        'Cancel Reason': sub.cancel_reason || '',
      }));

      const csv = exportData.map((row) => Object.values(row).join(',')).join('\n');
      const headers = Object.keys(exportData[0] || {}).join(',');
      const blob = new Blob([headers + '\n' + csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `paypal-subscriptions-${Date.now()}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      downloadJSON(subscriptions, `paypal-subscriptions-${Date.now()}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Export and download your data
          </p>
        </div>
        <Button variant="outline" onClick={printPage}>
          <Printer className="h-4 w-4 mr-2" />
          Print Report
        </Button>
      </div>

      {/* Date Range Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filter by Date Range
          </CardTitle>
          <CardDescription>Select a date range for your reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={dateRange.startDate}
                onChange={(e) => handleDateChange('startDate', e.target.value)}
                max={dateRange.endDate}
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={dateRange.endDate}
                onChange={(e) => handleDateChange('endDate', e.target.value)}
                min={dateRange.startDate}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Tabs */}
      <Tabs defaultValue="trade-finance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trade-finance">Trade Finance</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="subscriptions">PayPal Subscriptions</TabsTrigger>
        </TabsList>

        {/* Trade Finance Report */}
        <TabsContent value="trade-finance">
          <Card>
            <CardHeader>
              <CardTitle>Trade Finance Applications</CardTitle>
              <CardDescription>
                {filteredApplications.length} applications in selected date range
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Applications</p>
                    <p className="text-2xl font-bold">{filteredApplications.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
                    <p className="text-2xl font-bold">
                      USD{' '}
                      {filteredApplications
                        .reduce((sum, app) => sum + app.amount, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Approval Rate</p>
                    <p className="text-2xl font-bold">
                      {filteredApplications.length > 0
                        ? (
                            (filteredApplications.filter(
                              (app) =>
                                app.application_status === 'approved' ||
                                app.application_status === 'active'
                            ).length /
                              filteredApplications.length) *
                            100
                          ).toFixed(1)
                        : 0}
                      %
                    </p>
                  </div>
                </div>

                {/* Export Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => handleExportTradeFinance('csv')}>
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Export as CSV
                  </Button>
                  <Button variant="outline" onClick={() => handleExportTradeFinance('json')}>
                    <FileText className="h-4 w-4 mr-2" />
                    Export as JSON
                  </Button>
                </div>

                {/* Preview Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="text-left p-2">Reference</th>
                        <th className="text-left p-2">Type</th>
                        <th className="text-right p-2">Amount</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApplications.slice(0, 10).map((app) => (
                        <tr key={app.id} className="border-t">
                          <td className="p-2">{app.reference_number}</td>
                          <td className="p-2">{app.facility_type}</td>
                          <td className="text-right p-2">
                            {app.currency} {app.amount.toLocaleString()}
                          </td>
                          <td className="p-2">{app.application_status}</td>
                          <td className="p-2">
                            {new Date(app.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredApplications.length > 10 && (
                    <p className="text-sm text-gray-500 text-center mt-2">
                      Showing 10 of {filteredApplications.length} applications. Export to see all.
                    </p>
                  )}
                  {filteredApplications.length === 0 && (
                    <p className="text-center py-8 text-gray-500">
                      No applications found in selected date range
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Marketplace Report */}
        <TabsContent value="marketplace">
          <Card>
            <CardHeader>
              <CardTitle>Marketplace Orders</CardTitle>
              <CardDescription>
                {isLoadingMarketplace
                  ? 'Loading...'
                  : `${marketplaceOrders?.length || 0} orders in selected date range`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingMarketplace ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
                      <p className="text-2xl font-bold">{marketplaceOrders?.length || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
                      <p className="text-2xl font-bold">
                        NGN{' '}
                        {marketplaceOrders
                          ?.reduce((sum, order) => sum + (order.amount || 0), 0)
                          .toLocaleString() || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Order Value</p>
                      <p className="text-2xl font-bold">
                        NGN{' '}
                        {marketplaceOrders && marketplaceOrders.length > 0
                          ? (
                              marketplaceOrders.reduce(
                                (sum, order) => sum + (order.amount || 0),
                                0
                              ) / marketplaceOrders.length
                            ).toLocaleString()
                          : 0}
                      </p>
                    </div>
                  </div>

                  {/* Export Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={() => handleExportMarketplace('csv')}>
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Export as CSV
                    </Button>
                    <Button variant="outline" onClick={() => handleExportMarketplace('json')}>
                      <FileText className="h-4 w-4 mr-2" />
                      Export as JSON
                    </Button>
                  </div>

                  {/* Preview */}
                  {marketplaceOrders && marketplaceOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                          <tr>
                            <th className="text-left p-2">Order ID</th>
                            <th className="text-right p-2">Amount</th>
                            <th className="text-left p-2">Status</th>
                            <th className="text-left p-2">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {marketplaceOrders.slice(0, 10).map((order) => (
                            <tr key={order.id} className="border-t">
                              <td className="p-2">{order.id.substring(0, 8)}...</td>
                              <td className="text-right p-2">
                                {order.currency} {order.amount?.toLocaleString()}
                              </td>
                              <td className="p-2">{order.status}</td>
                              <td className="p-2">
                                {new Date(order.created_at).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-center py-8 text-gray-500">
                      No marketplace orders found in selected date range
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Report */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>E-commerce Orders</CardTitle>
              <CardDescription>
                {isLoadingOrders
                  ? 'Loading...'
                  : `${orders?.length || 0} orders in selected date range`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingOrders ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Export Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={() => handleExportOrders('csv')}>
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Export as CSV
                    </Button>
                    <Button variant="outline" onClick={() => handleExportOrders('json')}>
                      <FileText className="h-4 w-4 mr-2" />
                      Export as JSON
                    </Button>
                  </div>

                  {/* Preview */}
                  {orders && orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                          <tr>
                            <th className="text-left p-2">Order ID</th>
                            <th className="text-right p-2">Total</th>
                            <th className="text-left p-2">Status</th>
                            <th className="text-left p-2">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.slice(0, 10).map((order) => (
                            <tr key={order.id} className="border-t">
                              <td className="p-2">{order.id}</td>
                              <td className="text-right p-2">
                                ${order.total_amount?.toLocaleString()}
                              </td>
                              <td className="p-2">{order.status}</td>
                              <td className="p-2">
                                {new Date(order.created_at).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-center py-8 text-gray-500">
                      No orders found in selected date range
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Report */}
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Transactions</CardTitle>
              <CardDescription>
                {isLoadingTransactions
                  ? 'Loading...'
                  : `${transactions?.length || 0} transactions in selected date range`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingTransactions ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Export Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={() => handleExportTransactions('csv')}>
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Export as CSV
                    </Button>
                    <Button variant="outline" onClick={() => handleExportTransactions('json')}>
                      <FileText className="h-4 w-4 mr-2" />
                      Export as JSON
                    </Button>
                  </div>

                  {/* Preview */}
                  {transactions && transactions.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                          <tr>
                            <th className="text-left p-2">ID</th>
                            <th className="text-right p-2">Balance</th>
                            <th className="text-left p-2">Currency</th>
                            <th className="text-left p-2">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.slice(0, 10).map((txn) => (
                            <tr key={txn.id} className="border-t">
                              <td className="p-2">{txn.id}</td>
                              <td className="text-right p-2">{txn.balance?.toLocaleString()}</td>
                              <td className="p-2">{txn.currency}</td>
                              <td className="p-2">
                                {new Date(txn.created_at).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-center py-8 text-gray-500">
                      No transactions found in selected date range
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* PayPal Subscriptions Report */}
        <TabsContent value="subscriptions">
          <Card>
            <CardHeader>
              <CardTitle>PayPal Subscriptions</CardTitle>
              <CardDescription>
                {isLoadingSubscriptions
                  ? 'Loading...'
                  : `${subscriptions?.length || 0} subscriptions in selected date range`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingSubscriptions ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Summary */}
                  {subscriptions && subscriptions.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Subscriptions</p>
                        <p className="text-2xl font-bold">{subscriptions.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Active Subscriptions</p>
                        <p className="text-2xl font-bold">
                          {subscriptions.filter((sub: any) => sub.status === 'ACTIVE').length}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Cancelled Subscriptions</p>
                        <p className="text-2xl font-bold">
                          {subscriptions.filter((sub: any) => sub.status === 'CANCELLED').length}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Export Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={() => handleExportSubscriptions('csv')} disabled={!subscriptions || subscriptions.length === 0}>
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Export as CSV
                    </Button>
                    <Button variant="outline" onClick={() => handleExportSubscriptions('json')} disabled={!subscriptions || subscriptions.length === 0}>
                      <FileText className="h-4 w-4 mr-2" />
                      Export as JSON
                    </Button>
                  </div>

                  {/* Preview */}
                  {subscriptions && subscriptions.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                          <tr>
                            <th className="text-left p-2">Subscription ID</th>
                            <th className="text-left p-2">Plan ID</th>
                            <th className="text-left p-2">Status</th>
                            <th className="text-center p-2">Quantity</th>
                            <th className="text-left p-2">Created</th>
                            <th className="text-left p-2">Cancelled</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subscriptions.slice(0, 10).map((sub: any) => (
                            <tr key={sub.id} className="border-t">
                              <td className="p-2 font-mono text-xs">{sub.subscription_id}</td>
                              <td className="p-2 font-mono text-xs">{sub.plan_id}</td>
                              <td className="p-2">
                                <span
                                  className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                    sub.status === 'ACTIVE'
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                      : sub.status === 'CANCELLED'
                                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                      : sub.status === 'SUSPENDED'
                                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                  }`}
                                >
                                  {sub.status}
                                </span>
                              </td>
                              <td className="text-center p-2">{sub.quantity || 1}</td>
                              <td className="p-2">
                                {new Date(sub.created_at).toLocaleDateString()}
                              </td>
                              <td className="p-2">
                                {sub.cancelled_at
                                  ? new Date(sub.cancelled_at).toLocaleDateString()
                                  : '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {subscriptions.length > 10 && (
                        <p className="text-sm text-gray-500 mt-2 text-center">
                          Showing 10 of {subscriptions.length} subscriptions. Export to see all.
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-gray-500">
                      No subscriptions found in selected date range
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
