
import React, { useState, useEffect } from 'react';
import { withErrorBoundary } from '@/components/ui/error-boundary';
import { BillPaymentHub } from '@/components/bills/BillPaymentHub';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSupabaseClient } from '@/hooks/use-supabase';
import { Phone, Wifi, Tv, Zap, CreditCard, AlertCircle } from 'lucide-react';
import { FEATURE_FLAGS } from '@/features';

const BillPaymentPageContent = () => {
  const supabase = useSupabaseClient();
  const [activeTab, setActiveTab] = useState('main');
  const [saySwitchEnabled, setSaySwitchEnabled] = useState(false);
  const [paypalEnabled, setPaypalEnabled] = useState(false);

  // Check feature flags
  useEffect(() => {
    const checkFeatureFlags = async () => {
      try {
        // Check if user is admin first (admins get all features)
        const { data: isAdmin } = await supabase.rpc('is_admin');
        
        if (isAdmin) {
          setSaySwitchEnabled(true);
          return;
        }
        
        // Check SaySwitch feature flag
        const { data: saySwitchFlag } = await supabase
          .from('feature_flags')
          .select('enabled')
          .eq('name', FEATURE_FLAGS.SAYSWITCH_BILLS)
          .single();
          
        setSaySwitchEnabled(saySwitchFlag?.enabled || false);
        
        // PayPal would be added in a similar way
        setPaypalEnabled(false); // Not yet implemented
      } catch (error) {
        console.error('Error checking feature flags:', error);
      }
    };
    
    checkFeatureFlags();
  }, [supabase]);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Bill Payment</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="main">Main</TabsTrigger>
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
        </TabsList>

        <TabsContent value="main" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Bill Payments</CardTitle>
              <CardDescription>Pay your bills with multiple options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="overflow-hidden">
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
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Available via SaySwitch
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Coming Soon
                      </Badge>
                    )}
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
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
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Available via SaySwitch
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Coming Soon
                      </Badge>
                    )}
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
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
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Available via SaySwitch
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Coming Soon
                      </Badge>
                    )}
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
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
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Available via SaySwitch
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Coming Soon
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </div>

              {!saySwitchEnabled && !paypalEnabled && (
                <Alert className="mt-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Coming Soon</AlertTitle>
                  <AlertDescription>
                    Bill payment services are coming soon to your account. Stay tuned for updates!
                  </AlertDescription>
                </Alert>
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
            <Card>
              <CardHeader>
                <CardTitle>PayPal Bill Payments</CardTitle>
                <CardDescription>Coming soon</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Feature in Development</AlertTitle>
                  <AlertDescription>
                    PayPal bill payment integration is currently in development and will be available soon.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
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
