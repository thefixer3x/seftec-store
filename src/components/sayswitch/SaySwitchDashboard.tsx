import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSupabaseClient } from '@/hooks/use-supabase';
import { useAuth } from '@/context/AuthContext';
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
import { FEATURE_FLAGS as BACKEND_SURFACES } from '@/lib/feature-flags';
import { PaymentProviderRegistry } from '@/lib/payments/registry';
import type { Transaction } from '@/lib/payments/types';
import { format } from 'date-fns';

type WalletBalance = {
  balance: number | null;
  created_at: string | null;
  currency: string | null;
  id: string | null;
  is_active: boolean | null;
  updated_at: string | null;
  user_id: string | null;
};

export const SaySwitchDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);

  const supabase = useSupabaseClient();
  const { user } = useAuth();
  const { toast } = useToast();

  const { isEnabled: isPaymentsEnabled } = useFeatureFlag(FEATURE_FLAGS.SAYSWITCH_PAYMENTS);
  const { isEnabled: isBillsEnabled } = useFeatureFlag(FEATURE_FLAGS.SAYSWITCH_BILLS);
  const { isEnabled: isTransfersEnabled } = useFeatureFlag(FEATURE_FLAGS.SAYSWITCH_TRANSFERS);

  const isAnyFeatureEnabled = isPaymentsEnabled || isBillsEnabled || isTransfersEnabled;
  const isLedgerReady = BACKEND_SURFACES.SAY_ORDERS;

  const {
    data: wallet,
    isLoading: loadingWallet,
    refetch: refetchWallet,
  } = useQuery({
    queryKey: ['walletBalance', user?.id],
    enabled: !!user,
    queryFn: async (): Promise<WalletBalance | null> => {
      if (!user) {
        return null;
      }

      const { data, error } = await supabase
        .from('vortex_wallets')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return data as WalletBalance | null;
    },
  });

  const {
    data: recentTransactions = [],
    isLoading: loadingTransactions,
    refetch: refetchTransactions,
  } = useQuery({
    queryKey: ['recentTransactions', user?.id],
    enabled: !!user && isLedgerReady,
    queryFn: async (): Promise<Transaction[]> => {
      if (!user || !isLedgerReady) {
        return [];
      }

      const registry = PaymentProviderRegistry.getInstance(supabase);
      await registry.initialize();

      const provider = registry.getBillPaymentProvider('sayswitch');
      if (!provider) {
        return [];
      }

      const result = await provider.getUserTransactions(user.id);
      if (!result.success || !result.items) {
        return [];
      }

      return result.items.slice(0, 5);
    },
  });

  const refreshData = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        refetchWallet(),
        isLedgerReady ? refetchTransactions() : Promise.resolve(null),
      ]);

      toast({
        title: 'Data Refreshed',
        description: isLedgerReady
          ? 'Latest wallet and transaction data loaded'
          : 'Latest wallet data loaded',
      });
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const getStatusClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'success':
        return 'border-green-200 bg-green-50 text-green-700';
      case 'pending':
      case 'processing':
        return 'border-blue-200 bg-blue-50 text-blue-700';
      case 'failed':
      case 'cancelled':
        return 'border-red-200 bg-red-50 text-red-700';
      default:
        return 'border-slate-200 bg-slate-50 text-slate-700';
    }
  };

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'payment':
        return <CreditCard className="h-4 w-4 text-primary" />;
      case 'bill':
        return <Receipt className="h-4 w-4 text-indigo-500" />;
      default:
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
    }
  };

  const getTransactionDescription = (transaction: Transaction) => {
    if (transaction.type === 'bill') {
      switch (transaction.category) {
        case 'airtime':
          return `Airtime - ${transaction.recipientDetails?.phone || ''}`;
        case 'data':
          return `Data - ${transaction.recipientDetails?.phone || ''}`;
        case 'tv':
          return `TV - ${transaction.recipientDetails?.provider || ''}`;
        case 'electricity':
          return `Electricity - ${transaction.recipientDetails?.meter_number || ''}`;
        default:
          return 'Bill Payment';
      }
    }

    return 'Transaction';
  };

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
                        Last updated: {wallet?.updated_at || wallet?.created_at
                          ? format(new Date(wallet?.updated_at || wallet?.created_at || ''), 'MMM d, h:mm a')
                          : 'Never'}
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {isPaymentsEnabled && (
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center" disabled>
                        <CreditCard className="h-6 w-6 mb-1" />
                        <span>Card Payments</span>
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

              {!isLedgerReady && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Transaction ledger reconnecting</AlertTitle>
                  <AlertDescription>
                    Wallet balances are now reading from the real `vortex_wallets` surface. SaySwitch history and checkout remain paused until the deferred transaction ledger is aligned.
                  </AlertDescription>
                </Alert>
              )}

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  {!isLedgerReady ? (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>History temporarily unavailable</AlertTitle>
                      <AlertDescription>
                        Transaction history depends on the deferred SaySwitch ledger surface, so this panel is intentionally hidden until the write path is reconnected.
                      </AlertDescription>
                    </Alert>
                  ) : loadingTransactions ? (
                    <div className="space-y-2">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ) : recentTransactions.length > 0 ? (
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
                                {format(new Date(transaction.createdAt), 'MMM d, h:mm a')}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {transaction.currency} {transaction.amount.toLocaleString()}
                            </p>
                            <Badge variant="outline" className={getStatusClasses(transaction.status)}>
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
                  <Button variant="ghost" size="sm" className="gap-1" disabled={!isLedgerReady}>
                    View All Transactions
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

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
