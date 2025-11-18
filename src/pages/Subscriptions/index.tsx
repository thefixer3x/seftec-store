import React, { useState } from 'react';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Package, Sparkles } from 'lucide-react';
import { PayPalPlansDisplay, PayPalSubscriptionManager } from '@/components/paypal';
import { useFeatureFlag, FEATURE_FLAGS } from '@/features/feature-flags';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

/**
 * Subscriptions Page
 *
 * Customer portal for managing PayPal subscriptions.
 * Shows available plans and allows users to subscribe or manage existing subscriptions.
 */
export default function SubscriptionsPage() {
  useDocumentTitle('Subscriptions | SEFTEC');
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('browse');

  // Check if PayPal payments feature is enabled
  const { isEnabled: isPayPalEnabled, isLoading: isLoadingFlag } = useFeatureFlag(
    FEATURE_FLAGS.PAYPAL_PAYMENTS
  );

  const handleSubscribeSuccess = (subscriptionId: string) => {
    // Switch to "My Subscriptions" tab after successful subscription
    setActiveTab('manage');

    toast({
      title: 'Subscription Created!',
      description: `Subscription ${subscriptionId} has been created successfully.`,
    });
  };

  const handleSubscribeError = (error: string) => {
    toast({
      variant: 'destructive',
      title: 'Subscription Failed',
      description: error,
    });
  };

  // Show loading state while checking feature flag
  if (isLoadingFlag) {
    return (
      <div className="container py-8">
        <div className="space-y-6">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-4 w-96" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-80 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show message if PayPal is not enabled
  if (!isPayPalEnabled) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-4">Subscriptions</h1>

        <Card>
          <CardHeader>
            <CardTitle>Premium Subscriptions</CardTitle>
            <CardDescription>Coming Soon!</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <Sparkles className="h-4 w-4" />
              <AlertTitle>Feature Not Available</AlertTitle>
              <AlertDescription>
                Premium subscription plans are coming soon to your account. Stay tuned for updates!
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Subscriptions</h1>
          <Badge variant="secondary" className="flex items-center gap-1">
            <CreditCard className="h-3 w-3" />
            PayPal Powered
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Browse subscription plans or manage your existing subscriptions
        </p>
      </div>

      {/* Tabs for Browse Plans and Manage Subscriptions */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="browse" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Browse Plans
          </TabsTrigger>
          <TabsTrigger value="manage" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            My Subscriptions
          </TabsTrigger>
        </TabsList>

        {/* Browse Plans Tab */}
        <TabsContent value="browse" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Subscription Plans</CardTitle>
              <CardDescription>
                Choose a plan that works best for you. All plans are powered by PayPal for secure
                international payments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PayPalPlansDisplay
                onSubscribeSuccess={handleSubscribeSuccess}
                onSubscribeError={handleSubscribeError}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why Subscribe?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Secure Payments</h3>
                  <p className="text-sm text-muted-foreground">
                    All payments are processed securely through PayPal's trusted payment platform.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Easy Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your subscriptions anytime. Cancel or update with just a few clicks.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">International Support</h3>
                  <p className="text-sm text-muted-foreground">
                    PayPal supports payments from customers worldwide in multiple currencies.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manage Subscriptions Tab */}
        <TabsContent value="manage" className="space-y-6">
          <PayPalSubscriptionManager />

          <Card>
            <CardHeader>
              <CardTitle>Subscription Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Need help with your subscription? We're here to assist you.
              </p>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Email:</strong> support@seftec.com
                </div>
                <div>
                  <strong>Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM (WAT)
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
