import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSupabaseClient } from '@/hooks/use-supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Receipt, 
  ArrowUpRight, 
  Clock, 
  ChevronRight, 
  Zap, 
  RefreshCw, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { MoneyTransferForm } from '@/components/transfers/MoneyTransferForm';
import { BillPaymentHub } from '@/components/bills/BillPaymentHub';
import { useFeatureFlag, FEATURE_FLAGS } from '@/features';
import { format } from 'date-fns';

type Order = {
  id: string;
  user_id: string;
  type: 'payment' | 'bill' | 'transfer';
  currency: string;
  amount: number;
  status: string;
  reference: string;
  say_reference: string;
  recipient_details?: Record<string, any>;
  created_at: string;
  completed_at?: string;
};

type WalletSnapshot = {
  id: string;
  user_id: string;
  balance: number;
  currency: string;
  created_at: string;
};

export const SaySwitchDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);
  
  const supabase = useSupabaseClient();
  const { toast } = useToast();
  
  // Feature flags
  const { isEnabled: isPaymentsEnabled } = useFeatureFlag(FEATURE_FLAGS.SAYSWITCH_PAYMENTS);
  const { isEnabled: isBillsEnabled } = useFeatureFlag(FEATURE_FLAGS.SAYSWITCH_BILLS);
  const { isEnabled: isTransfersEnabled } = useFeatureFlag(FEATURE_FLAGS.SAYSWITCH_TRANSFERS);
  
  // Fetch wallet balance
  const { 
    data: wallet, 
    isLoading: loadingWallet,
    refetch: refetchWallet
  } = useQuery({
    queryKey: ['walletBalance'],
    queryFn: async () => {
      const { data } = await supabase
        .from('say_wallet_snapshots')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      return data as WalletSnapshot;
    },
  });
  
  // Fetch recent transactions
  const { 
    data: recentTransactions, 
    isLoading: loadingTransactions,
    refetch: refetchTransactions
  } = useQuery({
    queryKey: ['recentTransactions'],
    queryFn: async () => {
      const { data } = await supabase
        .from('say_orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      return data as Order[];
    },
  });
  
  // Refresh all data
  const refreshData = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        refetchWallet(),
        refetchTransactions()
      ]);
      
      toast({
        title: "Data Refreshed",
        description: "Latest transactions and balance loaded",
      });
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };
  
  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'success':
        return 'success';
      case 'pending':
      case 'processing':
        return 'secondary';
      case 'failed':
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };
  
  // Get transaction icon
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <CreditCard className="h-4 w-4 text-primary" />;
      case 'bill':
        return <Receipt className="h-4 w-4 text-indigo-500" />;
      case 'transfer':
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };
  
  // Format transaction description
  const getTransactionDescription = (transaction: Order) => {
    switch (transaction.type) {
      case 'payment':
        return 'Card Payment';
      case 'bill':
        if (transaction.recipient_details?.type === 'airtime') {
          return `Airtime - ${transaction.recipient_details?.phone || ''}`;
        } else if (transaction.recipient_details?.type === 'data') {
          return `Data - ${transaction.recipient_details?.phone || ''}`;
        } else if (transaction.recipient_details?.type === 'tv') {
          return `TV - ${transaction.recipient_details?.provider || ''}`;
        } else if (transaction.recipient_details?.type === 'electricity') {
          return `Electricity - ${transaction.recipient_details?.meter_number || ''}`;
        }
        return 'Bill Payment';
      case 'transfer':
        if (transaction.recipient_details?.bulk) {
          return `Bulk Transfer (${transaction.recipient_details?.count || ''} recipients)`;
        }
        return `Transfer to ${transaction.recipient_details?.account_name || ''} - ${transaction.recipient_details?.bank_name || ''}`;
      default:
        return 'Transaction';
    }
  };
  
  // Check if at least one feature is enabled
  const isAnyFeatureEnabled = isPaymentsEnabled || isBillsEnabled || isTransfersEnabled;
  
  if (!isAnyFeatureEnabled) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>SaySwitch Integration</CardTitle>
          <CardDescription>Coming soon</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Feature not available</AlertTitle>
            <AlertDescription>
              SaySwitch integration is coming soon to your account. This will enable seamless payments, bill payments, and money transfers.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>SaySwitch Dashboard</CardTitle>
              <CardDescription>Manage payments, bills, and transfers</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshData}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              {isBillsEnabled && <TabsTrigger value="bills">Bill Payments</TabsTrigger>}
              {isTransfersEnabled && <TabsTrigger value="transfers">Money Transfer</TabsTrigger>}
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              {/* Balance Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Current Balance</h3>
                    <Badge variant="outline" className="font-mono">
                      {wallet?.currency || 'NGN'}
                    </Badge>
                  </div>
                  
                  {loadingWallet ? (
                    <Skeleton className="h-10 w-36" />
                  ) : (
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">
                        ₦{(wallet?.balance || 0).toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        Last updated: {wallet?.created_at ? format(new Date(wallet.created_at), 'MMM d, h:mm a') : 'Never'}
                      </span>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {isPaymentsEnabled && (
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => {}}>
                        <CreditCard className="h-6 w-6 mb-1" />
                        <span>Make Payment</span>
                      </Button>
                    )}
                    {isBillsEnabled && (
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => setActiveTab('bills')}>
                        <Receipt className="h-6 w-6 mb-1" />
                        <span>Pay Bills</span>
                      </Button>
                    )}
                    {isTransfersEnabled && (
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => setActiveTab('transfers')}>
                        <ArrowUpRight className="h-6 w-6 mb-1" />
                        <span>Send Money</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Recent Transactions */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingTransactions ? (
                    <div className="space-y-2">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ) : recentTransactions && recentTransactions.length > 0 ? (
                    <div className="space-y-2">
                      {recentTransactions.map((transaction) => (
                        <div 
                          key={transaction.id}
                          className="flex items-center justify-between p-3 border rounded-md hover:bg-muted"
                        >
                          <div className="flex items-center">
                            <div className="mr-3 p-2 bg-muted rounded-full">
                              {getTransactionIcon(transaction.type)}
                            </div>
                            <div>
                              <p className="font-medium">{getTransactionDescription(transaction)}</p>
                              <p className="text-xs text-muted-foreground">
                                {format(new Date(transaction.created_at), 'MMM d, h:mm a')}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              ₦{transaction.amount.toLocaleString()}
                            </p>
                            <Badge variant={getStatusBadge(transaction.status)}>
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">No Recent Transactions</h3>
                      <p className="text-muted-foreground mb-4">
                        Your transaction history will appear here
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-center border-t pt-4">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All Transactions
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Quick Actions */}
              {(isBillsEnabled || isTransfersEnabled) && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {isBillsEnabled && (
                        <Button variant="outline" className="justify-between" onClick={() => setActiveTab('bills')}>
                          <div className="flex items-center">
                            <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                            Pay Airtime & Data
                          </div>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {isTransfersEnabled && (
                        <Button variant="outline" className="justify-between" onClick={() => setActiveTab('transfers')}>
                          <div className="flex items-center">
                            <ArrowUpRight className="h-4 w-4 mr-2 text-green-500" />
                            Transfer to Bank
                          </div>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            {isBillsEnabled && (
              <TabsContent value="bills">
                <BillPaymentHub />
              </TabsContent>
            )}
            
            {isTransfersEnabled && (
              <TabsContent value="transfers">
                <MoneyTransferForm />
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
