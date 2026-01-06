
import React, { useState, useEffect } from 'react';
import { withErrorBoundary } from '@/components/ui/error-boundary';
import { BillPaymentHub } from '@/components/bills/BillPaymentHub';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSupabaseClient } from '@/hooks/use-supabase';
import { Phone, Wifi, Tv, Zap, CreditCard, AlertCircle, History, Loader2, ChevronRight } from 'lucide-react';
import { FEATURE_FLAGS, useFeatureFlags } from '@/features';
import { PaymentProviderRegistry } from '@/lib/payments/registry';
import type { Transaction, SubscriptionPlan } from '@/lib/payments/types';

const BillPaymentPageContent = () => {
  const supabase = useSupabaseClient();
  const [activeTab, setActiveTab] = useState('main');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  
  // Use the unified feature flags hook for both SaySwitch and PayPal
  const { flags, isLoading: isLoadingFlags } = useFeatureFlags([
    FEATURE_FLAGS.SAYSWITCH_BILLS,
    FEATURE_FLAGS.PAYPAL_PAYMENTS,
  ]);
  
  const saySwitchEnabled = flags[FEATURE_FLAGS.SAYSWITCH_BILLS] || false;
  const paypalEnabled = flags[FEATURE_FLAGS.PAYPAL_PAYMENTS] || false;

  // Load transaction history when providers are enabled
  useEffect(() => {
    const loadTransactions = async () => {
      if (!saySwitchEnabled) return;
      
      setLoadingTransactions(true);
      try {
        const registry = PaymentProviderRegistry.getInstance(supabase);
        await registry.initialize();
        
        const saySwitchProvider = registry.getBillPaymentProvider('sayswitch');
        if (saySwitchProvider) {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            const result = await saySwitchProvider.getUserTransactions(user.id);
            if (result.success && result.items) {
              setTransactions(result.items.slice(0, 5)); // Show last 5 transactions
            }
          }
        }
      } catch (error) {
        console.error('Error loading transactions:', error);
      } finally {
        setLoadingTransactions(false);
      }
    };
    
    loadTransactions();
  }, [supabase, saySwitchEnabled]);

  // Navigate to specific service in SaySwitch tab
  const handleServiceClick = (service: string) => {
    if (saySwitchEnabled) {
      setActiveTab('sayswitch');
    }
  };

  // Show loading state while checking feature flags
  if (isLoadingFlags) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Bill Payment</h1>
        <Card>
          <CardContent className="flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-3 text-muted-foreground">Loading payment options...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Bill Payment</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className={`grid w-full ${saySwitchEnabled && paypalEnabled ? 'grid-cols-4' : saySwitchEnabled || paypalEnabled ? 'grid-cols-3' : 'grid-cols-2'}`}>
          <TabsTrigger value="main">Overview</TabsTrigger>
          {saySwitchEnabled && (
            <TabsTrigger value="sayswitch">
              <Badge variant="outline" className="mr-2">NG</Badge>
              SaySwitch
            </TabsTrigger>
          )}
          {paypalEnabled && (
            <TabsTrigger value="paypal">
              <Badge variant="outline" className="mr-2">Global</Badge>
              PayPal
            </TabsTrigger>
          )}
          {(saySwitchEnabled || paypalEnabled) && (
            <TabsTrigger value="history">
              <History className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="main" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Bill Payments</CardTitle>
              <CardDescription>
                {saySwitchEnabled || paypalEnabled 
                  ? 'Choose a service to get started' 
                  : 'Pay your bills with multiple options'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Airtime Card */}
                <Card 
                  className={`overflow-hidden transition-all ${saySwitchEnabled ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02]' : ''}`}
                  onClick={() => saySwitchEnabled && handleServiceClick('airtime')}
                >
                  <CardHeader className="bg-blue-50 dark:bg-blue-900/20 p-4">
                    <CardTitle className="flex items-center text-lg">
                      <Phone className="h-5 w-5 mr-2 text-blue-500" />
                      Airtime
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Purchase airtime for any mobile network
                    </p>
                    {saySwitchEnabled ? (
                      <Button variant="outline" size="sm" className="w-full bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
                        Buy Now <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Coming Soon
                      </Badge>
                    )}
                  </CardContent>
                </Card>

                {/* Data Card */}
                <Card 
                  className={`overflow-hidden transition-all ${saySwitchEnabled ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02]' : ''}`}
                  onClick={() => saySwitchEnabled && handleServiceClick('data')}
                >
                  <CardHeader className="bg-green-50 dark:bg-green-900/20 p-4">
                    <CardTitle className="flex items-center text-lg">
                      <Wifi className="h-5 w-5 mr-2 text-green-500" />
                      Internet Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Buy data bundles for any network
                    </p>
                    {saySwitchEnabled ? (
                      <Button variant="outline" size="sm" className="w-full bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
                        Buy Now <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Coming Soon
                      </Badge>
                    )}
                  </CardContent>
                </Card>

                {/* TV Subscription Card */}
                <Card 
                  className={`overflow-hidden transition-all ${saySwitchEnabled ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02]' : ''}`}
                  onClick={() => saySwitchEnabled && handleServiceClick('tv')}
                >
                  <CardHeader className="bg-purple-50 dark:bg-purple-900/20 p-4">
                    <CardTitle className="flex items-center text-lg">
                      <Tv className="h-5 w-5 mr-2 text-purple-500" />
                      TV Subscription
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Pay for DStv, GOtv, and more
                    </p>
                    {saySwitchEnabled ? (
                      <Button variant="outline" size="sm" className="w-full bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
                        Pay Now <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Coming Soon
                      </Badge>
                    )}
                  </CardContent>
                </Card>

                {/* Electricity Card */}
                <Card 
                  className={`overflow-hidden transition-all ${saySwitchEnabled ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02]' : ''}`}
                  onClick={() => saySwitchEnabled && handleServiceClick('electricity')}
                >
                  <CardHeader className="bg-yellow-50 dark:bg-yellow-900/20 p-4">
                    <CardTitle className="flex items-center text-lg">
                      <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                      Electricity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Pay electricity bills and buy tokens
                    </p>
                    {saySwitchEnabled ? (
                      <Button variant="outline" size="sm" className="w-full bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
                        Pay Now <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Coming Soon
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Show notice only when NO providers are enabled */}
              {!saySwitchEnabled && !paypalEnabled && (
                <Alert className="mt-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Coming Soon</AlertTitle>
                  <AlertDescription>
                    Bill payment services are coming soon to your account. Stay tuned for updates!
                  </AlertDescription>
                </Alert>
              )}

              {/* Quick access when providers are enabled */}
              {(saySwitchEnabled || paypalEnabled) && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {saySwitchEnabled && (
                    <Button variant="outline" onClick={() => setActiveTab('sayswitch')}>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Go to SaySwitch Bills
                    </Button>
                  )}
                  {paypalEnabled && (
                    <Button variant="outline" onClick={() => setActiveTab('paypal')}>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Manage PayPal Subscriptions
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {saySwitchEnabled && (
          <TabsContent value="sayswitch" className="mt-6">
            <BillPaymentHub />
          </TabsContent>
        )}

        {paypalEnabled && (
          <TabsContent value="paypal" className="mt-6">
            <PayPalSubscriptionManagement />
          </TabsContent>
        )}

        {/* Transaction History Tab */}
        {(saySwitchEnabled || paypalEnabled) && (
          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="h-5 w-5 mr-2" />
                  Transaction History
                </CardTitle>
                <CardDescription>Your recent bill payments and subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingTransactions ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg animate-pulse">
                        <div className="space-y-2">
                          <div className="h-4 w-32 bg-muted rounded" />
                          <div className="h-3 w-24 bg-muted rounded" />
                        </div>
                        <div className="h-4 w-20 bg-muted rounded" />
                      </div>
                    ))}
                  </div>
                ) : transactions.length > 0 ? (
                  <div className="space-y-3">
                    {transactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium capitalize">{tx.category || tx.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {tx.reference} • {tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{tx.currency} {tx.amount.toLocaleString()}</p>
                          <Badge 
                            variant={tx.status === 'completed' ? 'default' : tx.status === 'failed' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {tx.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <History className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No transactions yet</p>
                    <p className="text-sm">Your bill payment history will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

/**
 * PayPal Subscription Management Component
 * Displays user's PayPal subscriptions and allows management
 */
const PayPalSubscriptionManagement: React.FC = () => {
  const supabase = useSupabaseClient();
  const [subscriptions, setSubscriptions] = useState<Transaction[]>([]);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPayPalData = async () => {
      setLoading(true);
      setError(null);
      try {
        const registry = PaymentProviderRegistry.getInstance(supabase);
        await registry.initialize();
        
        const paypalProvider = registry.getSubscriptionProvider('paypal');
        if (paypalProvider) {
          // Load available plans
          const plansResult = await paypalProvider.listPlans();
          if (plansResult.success && plansResult.items) {
            setPlans(plansResult.items);
          }
          
          // Load user subscriptions
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            const subsResult = await paypalProvider.getUserSubscriptions(user.id);
            if (subsResult.success && subsResult.items) {
              setSubscriptions(subsResult.items);
            }
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load PayPal data');
        console.error('Error loading PayPal data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadPayPalData();
  }, [supabase]);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-3 text-muted-foreground">Loading PayPal subscriptions...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Subscriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Your Subscriptions</CardTitle>
          <CardDescription>Manage your active PayPal subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          {subscriptions.length > 0 ? (
            <div className="space-y-3">
              {subscriptions.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{sub.recipientDetails?.planId || 'Subscription'}</p>
                    <p className="text-sm text-muted-foreground">
                      Started: {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <Badge variant={sub.status === 'active' ? 'default' : 'secondary'}>
                    {sub.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No active subscriptions</p>
              <p className="text-sm">Subscribe to a plan below to get started</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>Choose a subscription plan</CardDescription>
        </CardHeader>
        <CardContent>
          {plans.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <Card key={plan.id} className="border-2 hover:border-primary transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                    {plan.billingCycles?.[0] && (
                      <p className="text-2xl font-bold">
                        {plan.billingCycles[0].pricingScheme?.fixedPrice?.currencyCode}{' '}
                        {plan.billingCycles[0].pricingScheme?.fixedPrice?.value}
                        <span className="text-sm font-normal text-muted-foreground">
                          /{plan.billingCycles[0].frequency?.intervalUnit}
                        </span>
                      </p>
                    )}
                    <Button 
                      className="w-full mt-4" 
                      variant="outline"
                      onClick={() => {
                        // TODO: Implement subscription creation flow
                        console.log('Subscribe to plan:', plan.id);
                      }}
                    >
                      Subscribe
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No plans available at this time</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const BillPaymentPage = withErrorBoundary(BillPaymentPageContent, {
  onError: (error, errorInfo) => {
    console.error("Bill Payment page error:", error, errorInfo);
  },
  fallback: (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">Bill Payment Error</h2>
        <p className="text-red-600 dark:text-red-300 mt-2">
          We encountered an issue while loading bill payment. Please try refreshing the page.
        </p>
      </div>
    </div>
  )
});

export default BillPaymentPage;
