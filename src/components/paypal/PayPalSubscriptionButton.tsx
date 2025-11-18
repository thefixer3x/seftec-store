import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSupabaseClient } from '@/hooks/use-supabase';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CreditCard } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PayPalSubscriptionButtonProps {
  planId: string;
  planName: string;
  planPrice: string;
  planDescription?: string;
  buttonText?: string;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  onSuccess?: (subscriptionId: string) => void;
  onError?: (error: string) => void;
  className?: string;
}

/**
 * PayPal Subscription Button Component
 *
 * Creates a PayPal subscription and redirects user to PayPal for approval.
 * Handles the complete subscription creation flow with loading states and error handling.
 */
export const PayPalSubscriptionButton: React.FC<PayPalSubscriptionButtonProps> = ({
  planId,
  planName,
  planPrice,
  planDescription,
  buttonText = `Subscribe with PayPal - ${planPrice}`,
  variant = 'default',
  size = 'default',
  onSuccess,
  onError,
  className = '',
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = useSupabaseClient();
  const { toast } = useToast();

  const handleSubscribe = async () => {
    setLoading(true);
    setError(null);

    try {
      // Create subscription via edge function
      const { data, error: invokeError } = await supabase.functions.invoke('paypal-payment', {
        body: {
          action: 'create_subscription',
          plan_id: planId,
          quantity: 1,
          custom_id: `sub_${Date.now()}`,
          return_url: `${window.location.origin}/subscriptions/success`,
          cancel_url: `${window.location.origin}/subscriptions/cancel`,
        },
      });

      if (invokeError) {
        throw new Error(invokeError.message || 'Failed to create subscription');
      }

      if (!data?.success) {
        throw new Error(data?.error?.message || 'Failed to create subscription');
      }

      const { subscription } = data;

      if (!subscription?.approval_url) {
        throw new Error('No approval URL returned from PayPal');
      }

      // Show success toast
      toast({
        title: 'Redirecting to PayPal',
        description: `Creating subscription for ${planName}...`,
      });

      // Call success callback if provided
      if (onSuccess) {
        onSuccess(subscription.id);
      }

      // Redirect to PayPal for approval
      window.location.href = subscription.approval_url;
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);

      toast({
        variant: 'destructive',
        title: 'Subscription Error',
        description: errorMessage,
      });

      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      <Button
        onClick={handleSubscribe}
        disabled={loading}
        variant={variant}
        size={size}
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating subscription...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            {buttonText}
          </>
        )}
      </Button>

      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {planDescription && !error && (
        <p className="text-xs text-muted-foreground mt-2 text-center">
          {planDescription}
        </p>
      )}
    </div>
  );
};
