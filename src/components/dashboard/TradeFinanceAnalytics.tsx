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
  TrendingUp,
  Clock,
  CheckCircle,
  FileText,
  DollarSign,
  Activity,
  Loader2,
} from 'lucide-react';
import { useTradeFinanceAnalytics } from '@/hooks/use-analytics';

const COLORS = {
  draft: '#9CA3AF',
  submitted: '#F59E0B',
  under_review: '#EF4444',
  approved: '#10B981',
  active: '#3B82F6',
  rejected: '#EF4444',
  withdrawn: '#6B7280',
  completed: '#059669',
  cancelled: '#DC2626',
};

const formatCurrency = (value: number, currency: string = 'USD') => {
  return `${currency} ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatFacilityType = (type: string): string => {
  const labels: Record<string, string> = {
    letter_of_credit: 'Letter of Credit',
    invoice_financing: 'Invoice Financing',
    trade_guarantee: 'Trade Guarantee',
    export_financing: 'Export Financing',
    import_financing: 'Import Financing',
    supply_chain_financing: 'Supply Chain Financing',
  };
  return labels[type] || type;
};

const formatStatus = (status: string): string => {
  return status
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const TradeFinanceAnalytics: React.FC = () => {
  const { data: analytics, isLoading, error } = useTradeFinanceAnalytics();

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

  // Prepare data for charts
  const statusChartData = analytics.applicationsByStatus.map((item) => ({
    name: formatStatus(item.status),
    value: item.count,
    amount: item.value,
  }));

  const typeChartData = analytics.applicationsByType.map((item) => ({
    name: formatFacilityType(item.facility_type),
    count: item.count,
    value: item.value,
  }));

  const trendChartData = analytics.monthlyTrend;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {analytics.totalApplications}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {formatCurrency(analytics.totalValue)}
                </p>
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
                <p className="text-sm text-gray-600 dark:text-gray-400">Approval Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {analytics.approvalRate.toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Processing Time</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {analytics.averageProcessingTime.toFixed(0)} days
                </p>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="status" className="space-y-4">
        <TabsList>
          <TabsTrigger value="status">By Status</TabsTrigger>
          <TabsTrigger value="type">By Type</TabsTrigger>
          <TabsTrigger value="trend">Trend</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Application Count by Status */}
            <Card>
              <CardHeader>
                <CardTitle>Applications by Status</CardTitle>
                <CardDescription>Distribution of applications across different statuses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusChartData.map((entry, index) => {
                        const status = analytics.applicationsByStatus[index].status;
                        return (
                          <Cell key={`cell-${index}`} fill={COLORS[status as keyof typeof COLORS] || '#9CA3AF'} />
                        );
                      })}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Application Value by Status */}
            <Card>
              <CardHeader>
                <CardTitle>Application Value by Status</CardTitle>
                <CardDescription>Total value across different statuses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={statusChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="amount" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Status Table */}
          <Card>
            <CardHeader>
              <CardTitle>Status Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Status</th>
                      <th className="text-right p-2">Count</th>
                      <th className="text-right p-2">Total Value</th>
                      <th className="text-right p-2">Avg. Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.applicationsByStatus.map((item) => (
                      <tr key={item.status} className="border-b">
                        <td className="p-2">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-semibold`}
                            style={{
                              backgroundColor: `${COLORS[item.status as keyof typeof COLORS]}20`,
                              color: COLORS[item.status as keyof typeof COLORS],
                            }}
                          >
                            {formatStatus(item.status)}
                          </span>
                        </td>
                        <td className="text-right p-2">{item.count}</td>
                        <td className="text-right p-2">{formatCurrency(item.value)}</td>
                        <td className="text-right p-2">{formatCurrency(item.value / item.count)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="type" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Application Count by Type */}
            <Card>
              <CardHeader>
                <CardTitle>Applications by Facility Type</CardTitle>
                <CardDescription>Distribution across different facility types</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={typeChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={120} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Application Value by Type */}
            <Card>
              <CardHeader>
                <CardTitle>Value by Facility Type</CardTitle>
                <CardDescription>Total value for each facility type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={typeChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={120} />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="value" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Type Table */}
          <Card>
            <CardHeader>
              <CardTitle>Facility Type Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Facility Type</th>
                      <th className="text-right p-2">Count</th>
                      <th className="text-right p-2">Total Value</th>
                      <th className="text-right p-2">Avg. Value</th>
                      <th className="text-right p-2">% of Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.applicationsByType.map((item) => (
                      <tr key={item.facility_type} className="border-b">
                        <td className="p-2">{formatFacilityType(item.facility_type)}</td>
                        <td className="text-right p-2">{item.count}</td>
                        <td className="text-right p-2">{formatCurrency(item.value)}</td>
                        <td className="text-right p-2">{formatCurrency(item.value / item.count)}</td>
                        <td className="text-right p-2">
                          {((item.value / analytics.totalValue) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trend" className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            {/* Monthly Trend - Applications */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Application Trend</CardTitle>
                <CardDescription>Number of applications over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Trend - Value */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Value Trend</CardTitle>
                <CardDescription>Total application value over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradeFinanceAnalytics;
