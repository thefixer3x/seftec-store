import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabaseClient } from '@/hooks/use-supabase';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, DollarSign, AlertCircle, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface Subscription {
  id: string;
  subscription_id: string;
  plan_id: string;
  status: string;
  quantity: number;
  custom_id?: string;
  cancel_reason?: string;
  created_at: string;
  updated_at: string;
  cancelled_at?: string;
  raw_response?: any;
}

/**
 * PayPal Subscription Manager Component
 *
 * Displays and manages user's PayPal subscriptions with full CRUD operations.
 * Shows subscription status, billing details, and provides cancellation functionality.
 */
export const PayPalSubscriptionManager: React.FC = () => {
  const supabase = useSupabaseClient();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  // Fetch user subscriptions
  const {
    data: subscriptions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['paypal-subscriptions'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('paypal-payment', {
        body: { action: 'get_user_subscriptions' },
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Failed to fetch subscriptions');

      return data.subscriptions as Subscription[];
    },
  });

  // Cancel subscription mutation
  const cancelMutation = useMutation({
    mutationFn: async ({ subscriptionId, reason }: { subscriptionId: string; reason?: string }) => {
      const { data, error } = await supabase.functions.invoke('paypal-payment', {
        body: {
          action: 'cancel_subscription',
          subscription_id: subscriptionId,
          reason,
        },
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Failed to cancel subscription');

      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Subscription Cancelled',
        description: 'Your subscription has been successfully cancelled.',
      });
      queryClient.invalidateQueries({ queryKey: ['paypal-subscriptions'] });
      setCancelDialogOpen(false);
      setSelectedSubscription(null);
      setCancelReason('');
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Cancellation Failed',
        description: error.message,
      });
    },
  });

  const handleCancelClick = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setCancelDialogOpen(true);
  };

  const handleCancelConfirm = () => {
    if (!selectedSubscription) return;

    cancelMutation.mutate({
      subscriptionId: selectedSubscription.subscription_id,
      reason: cancelReason || undefined,
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ReactNode }> = {
      ACTIVE: { variant: 'default', icon: <CheckCircle className="h-3 w-3 mr-1" /> },
      APPROVAL_PENDING: { variant: 'secondary', icon: <AlertCircle className="h-3 w-3 mr-1" /> },
      APPROVED: { variant: 'default', icon: <CheckCircle className="h-3 w-3 mr-1" /> },
      SUSPENDED: { variant: 'destructive', icon: <XCircle className="h-3 w-3 mr-1" /> },
      CANCELLED: { variant: 'outline', icon: <XCircle className="h-3 w-3 mr-1" /> },
      EXPIRED: { variant: 'outline', icon: <XCircle className="h-3 w-3 mr-1" /> },
    };

    const config = statusConfig[status] || { variant: 'secondary' as const, icon: null };

    return (
      <Badge variant={config.variant} className="flex items-center w-fit">
        {config.icon}
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Subscriptions</CardTitle>
          <CardDescription>Loading your PayPal subscriptions...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load subscriptions. Please try again later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!subscriptions || subscriptions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Subscriptions</CardTitle>
          <CardDescription>You don't have any active subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Subscriptions Found</AlertTitle>
            <AlertDescription>
              Browse our plans to get started with a subscription.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>My Subscriptions</CardTitle>
          <CardDescription>
            Manage your PayPal subscriptions ({subscriptions.length} active)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {subscriptions.map((subscription) => (
            <Card key={subscription.id} className="border-2">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">
                      Plan: {subscription.plan_id}
                    </h3>
                    {subscription.custom_id && (
                      <p className="text-sm text-muted-foreground">ID: {subscription.custom_id}</p>
                    )}
                  </div>
                  {getStatusBadge(subscription.status)}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Started</p>
                      <p className="font-medium">{formatDate(subscription.created_at)}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Quantity</p>
                      <p className="font-medium">{subscription.quantity}</p>
                    </div>
                  </div>
                </div>

                {subscription.raw_response?.billing_info?.next_billing_time && (
                  <div className="mb-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Next Billing Date</p>
                    <p className="font-medium">
                      {formatDate(subscription.raw_response.billing_info.next_billing_time)}
                    </p>
                  </div>
                )}

                {subscription.cancel_reason && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Cancellation Reason</AlertTitle>
                    <AlertDescription>{subscription.cancel_reason}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-2">
                  {subscription.status === 'ACTIVE' && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleCancelClick(subscription)}
                      disabled={cancelMutation.isPending}
                    >
                      Cancel Subscription
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Open PayPal manage subscription page
                      window.open(
                        `https://www.paypal.com/myaccount/autopay/manage/${subscription.subscription_id}`,
                        '_blank'
                      );
                    }}
                  >
                    Manage on PayPal
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Subscription?</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this subscription? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="cancel-reason">Reason for cancellation (optional)</Label>
              <Input
                id="cancel-reason"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Tell us why you're cancelling..."
                className="mt-2"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setCancelDialogOpen(false);
                setSelectedSubscription(null);
                setCancelReason('');
              }}
              disabled={cancelMutation.isPending}
            >
              Keep Subscription
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelConfirm}
              disabled={cancelMutation.isPending}
            >
              {cancelMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cancelling...
                </>
              ) : (
                'Cancel Subscription'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
