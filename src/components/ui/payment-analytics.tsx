
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ArrowUpRight, CreditCard, DollarSign, ArrowDownRight, Loader2 } from "lucide-react";
import { usePaymentAnalytics } from "@/hooks/use-analytics";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PaymentAnalytics: React.FC = () => {
  const { data: analytics, isLoading, error } = usePaymentAnalytics();

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

  // Calculate total transactions
  const totalTransactions = analytics.totalVolume;
  const hasTransactions = totalTransactions > 0 || analytics.totalTransactions > 0;

  // Get month-over-month growth from analytics
  const growth = analytics.monthlyGrowth;
  const isPositiveGrowth = growth >= 0;

  // Format transaction data for chart
  const transactionData = analytics.transactionsByMonth.map((item) => ({
    month: item.month,
    amount: item.volume,
  }));

  // Format payment method data for chart
  const paymentMethodData = analytics.transactionsByProvider.map((item) => ({
    name: item.provider,
    value: item.percentage,
  }));

  const hasChartData = transactionData.length > 0 && transactionData.some(d => d.amount > 0);
  const hasMethodData = paymentMethodData.length > 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Transaction Volume"
          value={hasTransactions ? `$${(totalTransactions / 1000).toFixed(1)}k` : "$0"}
          icon={<DollarSign className="h-4 w-4" />}
          description={hasTransactions ? `${analytics.totalTransactions} transactions across all gateways` : "No transactions recorded yet"}
        />
        <StatCard
          title="Monthly Growth"
          value={hasTransactions ? `${Math.abs(growth).toFixed(1)}%` : "—"}
          icon={isPositiveGrowth ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
          description={hasTransactions ? `${isPositiveGrowth ? "Increase" : "Decrease"} from last month` : "Not enough data yet"}
          trend={hasTransactions ? (isPositiveGrowth ? "positive" : "negative") : undefined}
        />
        <StatCard
          title="Active Payment Methods"
          value={hasMethodData ? analytics.transactionsByProvider.length.toString() : "0"}
          icon={<CreditCard className="h-4 w-4" />}
          description={hasMethodData ? analytics.transactionsByProvider.map(p => p.provider).join(", ") : "No payment methods configured"}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Transaction Volume</CardTitle>
          </CardHeader>
          <CardContent>
            {hasChartData ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={transactionData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, "Amount"]}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-80 flex flex-col items-center justify-center text-muted-foreground">
                <DollarSign className="h-12 w-12 mb-3 opacity-30" />
                <p className="text-sm font-medium">No transaction data yet</p>
                <p className="text-xs mt-1">Transaction volume will appear here once payments are processed.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            {hasMethodData ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-80 flex flex-col items-center justify-center text-muted-foreground">
                <CreditCard className="h-12 w-12 mb-3 opacity-30" />
                <p className="text-sm font-medium">No payment methods active</p>
                <p className="text-xs mt-1">Configure payment gateways to see distribution data.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  trend?: "positive" | "negative";
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, description, trend }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h4 className="text-2xl font-bold mt-2">{value}</h4>
          </div>
          <div className={`p-2 rounded-full ${
            trend === "positive" 
              ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" 
              : trend === "negative"
                ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
          }`}>
            {icon}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  );
};

export default PaymentAnalytics;
